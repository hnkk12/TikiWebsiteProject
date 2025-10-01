// ================== GIỎ HÀNG ==================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render giỏ hàng
function renderCart() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name} x ${item.quantity}</span>
      <span>${(item.price * item.quantity).toLocaleString("vi-VN")}₫</span>
      <button onclick="removeFromCart(${index})">Xóa</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total.toLocaleString("vi-VN") + "₫";
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Xóa sản phẩm khỏi giỏ
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
  showToast("Đã xóa sản phẩm!", "info");
}

// ================== TOAST THÔNG BÁO ==================
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

// ================== THÊM SẢN PHẨM VÀO GIỎ ==================
function addToCart(name, price) {
  const item = cart.find((it) => it.name === name);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  renderCart();
  showToast("Đã thêm vào giỏ hàng!", "success");
}

// ================== SLIDESHOW ==================
let slideIndex = 0;
function showSlides() {
  const slides = document.querySelectorAll(".mySlides");
  slides.forEach((s) => (s.style.display = "none"));
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000); // đổi slide mỗi 3s
}
document.addEventListener("DOMContentLoaded", showSlides);

// ================== LỌC & TÌM KIẾM ==================
document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".filter-checkbox");
  const productsEls = document.querySelectorAll(".shop-card");
  const searchInput = document.getElementById("searchInput");
  const suggestionsBox = document.getElementById("suggestions");

  // Danh sách sản phẩm demo để gợi ý
  const productNames = [
    "Nghệ Thuật Tư Duy Phản Biện",
    "Rèn Luyện Tư Duy Hệ Thống Trong Công Việc",
    "Vận Mệnh Tiền Kiếp",
    "Phương Pháp Làm Việc Siêu Hiệu Quả Của Toyota",
    "LapTop Lenovo V14 IIL-82C400W3VN",
    "Tai nghe bluetooth nhét tai Neckband",
    "Nồi cơm điện Locknlock Nemo",
    "Máy Xay Sinh Tố Lock&Lock",
    "Sữa Lúa Mạch Nestlé MILO Teen Protein Canxi",
    "Trà sữa NESTEA trân châu hộp 5 gói",
    "Kéo Văn Phòng SC-014",
    "Ống Cắm Bút, Đựng Cọ MakeUp, Văn phòng phẩm Thỏ Mori",
  ];

  // Hàm lọc sản phẩm
  function filterProducts() {
    const checked = Array.from(checkboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    const keyword = searchInput?.value.toLowerCase() || "";

    productsEls.forEach((item) => {
      const category = item.dataset.category;
      const name = item.querySelector("h3").textContent.toLowerCase();

      const matchCategory = checked.length === 0 || checked.includes(category);
      const matchSearch = name.includes(keyword);

      item.style.display = matchCategory && matchSearch ? "block" : "none";
    });
  }

  // Hàm tìm kiếm (chuyển trang)
  function search() {
    const keyword = searchInput.value.trim();
    if (keyword) {
      window.location.href = `shop.html?search=${encodeURIComponent(keyword)}`;
    }
  }

  // Gợi ý khi nhập
  searchInput?.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    suggestionsBox.innerHTML = "";

    if (!query) {
      suggestionsBox.style.display = "none";
      filterProducts();
      return;
    }

    const filtered = productNames.filter((p) =>
      p.toLowerCase().includes(query)
    );

    if (filtered.length > 0) {
      filtered.forEach((item) => {
        const div = document.createElement("div");
        div.textContent = item;
        div.classList.add("suggestion-item");
        div.onclick = () => {
          searchInput.value = item;
          suggestionsBox.style.display = "none";
          filterProducts();
        };
        suggestionsBox.appendChild(div);
      });
      suggestionsBox.style.display = "block";
    } else {
      suggestionsBox.style.display = "none";
    }

    filterProducts(); // lọc trực tiếp khi nhập
  });

  // Nhấn Enter để tìm kiếm
  searchInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") search();
  });

  // Checkbox lọc danh mục
  checkboxes.forEach((cb) => cb.addEventListener("change", filterProducts));
});

// ================== CHATBOT ==================
document.addEventListener("DOMContentLoaded", () => {
  const chatbotBtn = document.getElementById("chatbotBtn");
  const chatbotBox = document.getElementById("chatbotBox");
  const chatbotClose = document.getElementById("chatbotClose");

  chatbotBtn?.addEventListener("click", () => {
    chatbotBox.style.display = "block";
  });

  chatbotClose?.addEventListener("click", () => {
    chatbotBox.style.display = "none";
  });
});

// ================== CHẠY BAN ĐẦU ==================
renderCart();
