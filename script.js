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
document.addEventListener("DOMContentLoaded", () => {
  let slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }
  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    if (slides.length === 0) return;

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
    for (let i = 0; i < dots.length; i++)
      dots[i].className = dots[i].className.replace(" active", "");

    slides[slideIndex - 1].style.display = "block";
    if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";
  }

  // Expose functions
  window.plusSlides = plusSlides;
  window.currentSlide = currentSlide;

  // Auto slide
  setInterval(() => plusSlides(1), 5000);
});

// ================== LỌC & TÌM KIẾM ==================
document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".filter-checkbox");
  const products = document.querySelectorAll(".shop-card");
  const searchInput = document.getElementById("searchInput");

  function filterProducts() {
    const checked = Array.from(checkboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);
    const keyword = searchInput?.value.toLowerCase() || "";

    products.forEach((item) => {
      const category = item.dataset.category;
      const name = item.querySelector("h3").textContent.toLowerCase();
      const matchCategory = checked.includes(category);
      const matchSearch = name.includes(keyword);

      item.style.display = matchCategory && matchSearch ? "block" : "none";
    });
  }

  checkboxes.forEach((cb) => cb.addEventListener("change", filterProducts));
  searchInput?.addEventListener("input", filterProducts);
});

// TÍNH NĂNG THANH TÌM KIẾM
function search() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let products = document.querySelectorAll(".product");

  products.forEach((product) => {
    let name = product.querySelector(".product-name").textContent.toLowerCase();

    if (name.includes(input)) {
      product.style.display = "block"; // Hiện sản phẩm
    } else {
      product.style.display = "none"; // Ẩn sản phẩm
    }
  });
}

// Danh sách sản phẩm demo
const products = [
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

const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");

// Hàm tìm kiếm
function search() {
  const keyword = searchInput.value.trim();
  if (keyword) {
    window.location.href = `shop.html?search=${encodeURIComponent(keyword)}`;
  }
}

// Gợi ý khi nhập
searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  suggestionsBox.innerHTML = "";

  if (!query) {
    suggestionsBox.style.display = "none";
    return;
  }

  const filtered = products.filter((p) => p.toLowerCase().includes(query));

  if (filtered.length > 0) {
    filtered.forEach((item) => {
      const div = document.createElement("div");
      div.textContent = item;
      div.onclick = () => {
        searchInput.value = item;
        suggestionsBox.style.display = "none";
        search(); // Tìm luôn khi click gợi ý
      };
      suggestionsBox.appendChild(div);
    });
    suggestionsBox.style.display = "block";
  } else {
    suggestionsBox.style.display = "none";
  }
});

// Nhấn Enter để tìm kiếm
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    search();
  }
});

// Gợi ý khi nhập
searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  suggestionsBox.innerHTML = "";

  if (!query) {
    suggestionsBox.style.display = "none";
    return;
  }

  // Lấy sản phẩm bắt đầu đúng với chữ nhập
  const filtered = products.filter((p) => p.toLowerCase().startsWith(query));

  if (filtered.length > 0) {
    filtered.forEach((item) => {
      const div = document.createElement("div");
      div.textContent = item;
      div.onclick = () => {
        searchInput.value = item;
        suggestionsBox.style.display = "none";
        search();
      };
      suggestionsBox.appendChild(div);
    });
    suggestionsBox.style.display = "block";
  } else {
    suggestionsBox.style.display = "none";
  }
});

searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  suggestionsBox.innerHTML = "";

  if (!query) {
    suggestionsBox.style.display = "none";
    document.querySelector(".search-box").classList.remove("active");
    return;
  }

  const filtered = products.filter((p) => p.toLowerCase().startsWith(query));

  if (filtered.length > 0) {
    filtered.forEach((item) => {
      const div = document.createElement("div");
      div.textContent = item;
      div.onclick = () => {
        searchInput.value = item;
        suggestionsBox.style.display = "none";
        document.querySelector(".search-box").classList.remove("active");
        search();
      };
      suggestionsBox.appendChild(div);
    });
    suggestionsBox.style.display = "block";
    document.querySelector(".search-box").classList.add("active");
  } else {
    suggestionsBox.style.display = "none";
    document.querySelector(".search-box").classList.remove("active");
  }
});
