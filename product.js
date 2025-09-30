// Danh sách sản phẩm 
const products = [
    {
        id: 1,
        name: "Sữa Lúa Mạch Nestlé MILO Teen Protein Canxi (24 x 210ml)",
        price: "264.629₫",
        oldPrice: "310.000₫",
        image: "image/sp1.png",
        description: "Sữa MILO hương vị lúa mạch giàu protein và canxi, giúp trẻ phát triển khoẻ mạnh.",
        rating: "★★★★★ (690 đánh giá)",
        features: [
            "Giàu protein & canxi",
            "Đóng gói 24 hộp tiện lợi",
            "Thương hiệu Nestlé nổi tiếng"
        ]
    },
    {
        id: 2,
        name: "Combo Harry Potter (Trọn Bộ 7 Cuốn) + Tặng Bản Đồ Phép Thuật",
        price: "1.720.000₫",
        oldPrice: "1.750.000₫",
        image: "image/sp2.png",
        description: "Trọn bộ tiểu thuyết Harry Potter bản đẹp, tặng kèm bản đồ phép thuật.",
        rating: "★★★★★ (690 đánh giá)",
        features: [
            "7 cuốn trọn bộ đầy đủ",
            "Tặng bản đồ phép thuật",
            "Bản in đẹp, chất lượng giấy tốt"
        ]
    },
    {
        id: 3,
        name: "Combo Bút Bi Thiên Long PRO 027 (0.5mm) – TL-105",
        price: "22.000₫",
        oldPrice: "40.000₫",
        image: "image/sp3.png",
        description: "Bút bi Thiên Long PRO nét mảnh 0.5mm, trơn mượt, thích hợp cho học sinh và văn phòng.",
        rating: "★★★★★ (690 đánh giá)",
        features: [
            "Ngòi 0.5mm nét mảnh",
            "Mực ra đều, trơn tru",
            "Thích hợp cho học sinh & văn phòng"
        ]
    },
    {
        id: 4,
        name: "Điện Thoại Samsung Galaxy S24 FE (8GB/128GB) - Hàng Chính Hãng",
        price: "10.190.000₫",
        oldPrice: "16.690.000₫",
        image: "image/sp4.png",
        description: "Samsung Galaxy S24 FE màn hình AMOLED, hiệu năng mạnh mẽ, camera sắc nét.",
        rating: "★★★★★ (690 đánh giá)",
        features: [
            "Màn hình AMOLED sắc nét",
            "Bộ nhớ 8GB RAM / 128GB ROM",
            "Camera chụp ảnh chất lượng cao"
        ]
    },
    {
        id: 5,
        name: "Nghệ Thuật Tư Duy Phản Biện",
        price: "81.270₫",
        oldPrice: "129.000₫",
        image: "image/sach1.png",
        description: "Cuốn sách giúp bạn rèn luyện tư duy phản biện, nâng cao khả năng phân tích và ra quyết định.",
        rating: "★★★★★ (690 đánh giá)",
        features: [
            "Rèn luyện tư duy phản biện",
            "Phát triển kỹ năng phân tích",
            "Hỗ trợ ra quyết định chính xác"
        ]
    },
    {
        id: 6,
        name: "Rèn Luyện Tư Duy Hệ Thống Trong Công Việc",
        price: "87.700₫",
        oldPrice: "129.000₫",
        image: "image/sach2.png",
        description: "Khám phá phương pháp tư duy hệ thống để giải quyết công việc hiệu quả hơn.",
        rating: "★★★★☆ (690 đánh giá)",
        features: [
            "Áp dụng tư duy hệ thống",
            "Cải thiện hiệu quả làm việc",
            "Dành cho cá nhân & tổ chức"
        ]
    },
    {
        id: 7,
        name: "Vận Mệnh Tiền Kiếp",
        price: "82.560₫",
        oldPrice: "129.000₫",
        image: "image/sach3.png",
        description: "Cuốn sách về hành trình tâm linh và sự kết nối giữa tiền kiếp và hiện tại.",
        rating: "★★★★★ (690 đánh giá)",
        features: [
            "Khám phá tiền kiếp & nhân quả",
            "Tư duy tâm linh sâu sắc",
            "Sách dành cho người yêu triết lý"
        ]
    },
    {
        id: 8,
        name: "Phương Pháp Làm Việc Siêu Hiệu Quả Của Toyota",
        price: "84.900₫",
        oldPrice: "129.000₫",
        image: "image/sach4.png",
        description: "Khám phá bí quyết quản lý và làm việc siêu hiệu quả từ Toyota.",
        rating: "★★★★★ (690 đánh giá)",
        features: [
            "Phương pháp quản lý Toyota",
            "Tối ưu hiệu suất làm việc",
            "Ứng dụng thực tế trong doanh nghiệp"
        ]
    },
    {
        id: 9,
        name: "Laptop Lenovo V14 IIL-82C400W3VN",
        price: "10.120.000₫",
        oldPrice: "10.150.000₫",
        image: "image/laptop.png",
        description: "Laptop Lenovo V14 IIL hiệu năng ổn định, thiết kế mỏng nhẹ, phù hợp cho học tập và văn phòng.",
        rating: "★★★★☆ (690 đánh giá)",
        features: [
            "CPU ổn định cho công việc văn phòng",
            "Thiết kế mỏng nhẹ, dễ di chuyển",
            "Màn hình sắc nét, pin lâu"
        ]
    },
    {
        id: 10,
        name: "Tai nghe bluetooth nhét tai Neckband",
        price: "83.000₫",
        oldPrice: "250.000₫",
        image: "image/headphone.png",
        description: "Tai nghe bluetooth Neckband, thiết kế gọn nhẹ, âm thanh ổn định, phù hợp nghe nhạc và gọi điện.",
        rating: "★★☆☆☆ (690 đánh giá)",
        features: [
            "Kết nối Bluetooth nhanh chóng",
            "Âm thanh ổn định",
            "Thiết kế nhỏ gọn, dễ đeo"
        ]
    },
    {
        id: 11,
        name: "Nồi cơm điện Locknlock Nemo",
        price: "1.656.900₫",
        oldPrice: "2.825.000₫",
        image: "image/giadung1.png",
        description: "Nồi cơm điện Locknlock Nemo hiện đại, dung tích lớn, giữ ấm lâu, tiết kiệm điện năng.",
        rating: "★★★★☆ (690 đánh giá)",
        features: [
            "Dung tích lớn, phù hợp gia đình",
            "Giữ ấm lâu, cơm ngon",
            "Tiết kiệm điện năng"
        ]
    },
    {
        id: 12,
        name: "Máy Xay Sinh Tố Lock&Lock",
        price: "524.700₫",
        oldPrice: "966.000₫",
        image: "image/giadung2.png",
        description: "Máy xay sinh tố Lock&Lock công suất mạnh, lưỡi dao inox, xay nhuyễn nhanh chóng.",
        rating: "★★★★★ (690 đánh giá)",
        features: [
            "Công suất mạnh, xay nhanh",
            "Lưỡi dao inox bền chắc",
            "Thiết kế gọn nhẹ, dễ vệ sinh"
        ]
    },
    {
        id: 13,
        name: "Trà sữa NESTEA trân châu hộp 5 gói x 17 g",
        price: "64.000₫",
        oldPrice: "73.000₫",
        image: "image/trasua.png",
        description: "Thức uống trà sữa NESTEA hòa tan tiện lợi, kèm trân châu dẻo thơm ngon.",
        rating: "★★★★★ (690 đánh giá)",
        features: [
            "Dạng hòa tan tiện lợi",
            "Có kèm trân châu dẻo ngon",
            "Dễ pha chế tại nhà"
        ]
    },
    {
        id: 14,
        name: "Kéo Văn Phòng SC-014 (17cm) - Xanh",
        price: "33.800₫",
        oldPrice: "36.000₫",
        image: "image/keo.png",
        description: "Kéo SC-014 kích thước 17cm, lưỡi thép bén, tay cầm nhựa xanh chắc chắn.",
        rating: "★★★★☆ (690 đánh giá)",
        features: [
            "Lưỡi thép bén, cắt gọn",
            "Tay cầm nhựa chắc chắn",
            "Chiều dài 17cm tiện dụng"
        ]
    },
    {
        id: 15,
        name: "Ống Cắm Bút, Đựng Cọ MakeUp, Văn phòng phẩm Thỏ Mori",
        price: "189.000₫",
        oldPrice: "",
        image: "image/ongcambut.png",
        description: "Ống cắm bút đa năng Thỏ Mori, thích hợp cho bàn học, văn phòng hoặc đựng cọ trang điểm.",
        rating: "★★★★★ (690 đánh giá)",
        features: [
            "Đa năng: cắm bút, cọ makeup",
            "Thiết kế dễ thương hình Thỏ Mori",
            "Phù hợp cho bàn học & văn phòng"
        ]
    }
];


// Lấy ID từ URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const product = products.find(p => p.id === id);
const container = document.getElementById("product-detail");

if (product)
{
    container.innerHTML = `
    <div class="product-page">
      <div class="image-box">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="info-box">
        <h1>${product.name}</h1>
        <p class="rating">${product.rating}</p>
        <p class="price">
          ${product.price} 
          ${product.oldPrice ? `<span class="old">${product.oldPrice}</span>` : ""}
        </p>
        <p class="desc">${product.description}</p>

        <div class="actions">
          <button class="buy-now">Mua ngay</button>
          <button class="add-to-cart"><i class="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng</button>
        </div>

        ${product.features.length > 0 ? `
        <div class="features">
          <h3>Đặc điểm nổi bật</h3>
          <ul>
            ${product.features.map(f => `<li>${f}</li>`).join("")}
          </ul>
        </div>` : ""}
      </div>
    </div>
  `;
} else
{
    container.innerHTML = "<p>❌ Không tìm thấy sản phẩm.</p>";
}

// Lấy giỏ hàng từ localStorage
function getCart()
{
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Lưu giỏ hàng
function saveCart(cart)
{
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(product, quantity)
{
    let cart = getCart();
    let existing = cart.find(item => item.id === product.id);

    if (existing)
    {
        existing.quantity += quantity;
    } else
    {
        cart.push({ ...product, quantity });
    }
    saveCart(cart);
}

// THÔNG BÁO THÊM SP THÀNH CÔNG
function showToast(message, type = "success")
{
    let container = document.querySelector(".toast-container");
    if (!container)
    {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;

    container.appendChild(toast);

    setTimeout(() =>
    {
        toast.remove();
    }, 4000);
}

// POPUP CHỌN SỐ LƯỢNG SP
function showQuantityPopup(product, isBuyNow = false)
{
    // Xóa popup cũ (nếu có)
    const oldPopup = document.querySelector(".popup-overlay");
    if (oldPopup) oldPopup.remove();

    const popup = document.createElement("div");
    popup.classList.add("popup-overlay");
    popup.innerHTML = `
        <div class="popup-box">
            <h3>Chọn số lượng</h3>
            <div class="qty-wrapper">
                <button class="decrease">-</button>
                <input type="text" class="qty-input" value="1" readonly>
                <button class="increase">+</button>
            </div>
            <div class="popup-actions">
                <button class="confirm">Xác nhận</button>
                <button class="cancel">Hủy</button>
            </div>
        </div>
    `;

    document.body.appendChild(popup);

    let qty = 1;
    const qtyInput = popup.querySelector(".qty-input");

    // Nút tăng giảm
    popup.querySelector(".increase").addEventListener("click", () =>
    {
        qty++;
        qtyInput.value = qty;
    });

    popup.querySelector(".decrease").addEventListener("click", () =>
    {
        if (qty > 1) qty--;
        qtyInput.value = qty;
    });

    // Nút hủy
    popup.querySelector(".cancel").addEventListener("click", () => popup.remove());

    // Nút xác nhận
    popup.querySelector(".confirm").addEventListener("click", () =>
    {
        addToCart(product, qty);
        popup.remove();

        if (isBuyNow)
        {
            // Mua ngay -> chuyển qua trang giỏ hàng để thanh toán
            window.location.href = "cart.html";
        } else
        {
            // Thêm vào giỏ -> hiện toast thông báo
            showToast(`Đã thêm ${qty} sản phẩm vào giỏ hàng!`, "success");
        }
    });
}

// Gắn sự kiện cho nút sản phẩm
if (typeof product !== "undefined" && container)
{
    container.querySelector(".add-to-cart").addEventListener("click", () =>
        showQuantityPopup(product, false)
    );
    container.querySelector(".buy-now").addEventListener("click", () =>
        showQuantityPopup(product, true)
    );
}

