// ================== GIỎ HÀNG ==================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Cập nhật số lượng hiển thị trên icon giỏ
function updateCartCount()
{
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById("cart-count");

    if (cartCountEl)
    {
        if (count > 0)
        {
            cartCountEl.textContent = count;
            cartCountEl.classList.remove("hidden");
        } else
        {
            cartCountEl.classList.add("hidden");
        }
    }
}

// ================== THÔNG BÁO THÊM SẢN PHẨM VÀO GIỎ HÀNG ==================
function showToast(message, type = "success", product = null)
{
    const toast = document.getElementById("toast");
    if (!toast) return;

    let icon = "";
    let bg = "#333";

    if (type === "success")
    {
        icon = '<i class="fa-solid fa-circle-check"></i>';
        bg = "#4caf50";
    }
    if (type === "error")
    {
        icon = '<i class="fa-solid fa-circle-xmark"></i>';
        bg = "#f44336";
    }
    if (type === "info")
    {
        icon = '<i class="fa-solid fa-circle-info"></i>';
        bg = "#2196f3";
    }

    if (product)
    {
        toast.innerHTML = `
            ${icon}
            <img src="${product.image}" width="40" style="border-radius:6px">
            <div>
                <strong>${message}</strong><br>
                <small>${product.name}</small>
            </div>
        `;
    } else
    {
        toast.innerHTML = `${icon} <span>${message}</span>`;
    }

    toast.style.background = bg;

    toast.className = "show";

    setTimeout(() =>
    {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

// ================== THÊM SẢN PHẨM ==================
function addToCart(product)
{
    let existing = cart.find(item => item.name === product.name);
    if (existing)
    {
        existing.quantity += 1;
    } else
    {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    showToast("Đã thêm vào giỏ hàng!", "success", product);
}

// Lắng nghe sự kiện khi bấm nút "Thêm"
document.querySelectorAll(".add-to-cart").forEach((btn) =>
{
    btn.addEventListener("click", (e) =>
    {
        let card = e.target.closest(".product-card, .shop-card");

        let product = {
            name: card.querySelector("h3").innerText,
            price: card.querySelector(".price").childNodes[0].textContent.trim(),
            image: card.querySelector("img").src
        }; addToCart(product);
    });
});

// Khi load trang thì cập nhật số lượng luôn
updateCartCount();

// ================== SLIDESHOW ==================
document.addEventListener("DOMContentLoaded", () =>
{
    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) { showSlides(slideIndex += n); }
    function currentSlide(n) { showSlides(slideIndex = n); }

    function showSlides(n)
    {
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");

        if (slides.length === 0) return;

        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;

        for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
        for (let i = 0; i < dots.length; i++) dots[i].className = dots[i].className.replace(" active", "");

        slides[slideIndex - 1].style.display = "block";
        if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";
    }

    // Expose functions
    window.plusSlides = plusSlides;
    window.currentSlide = currentSlide;

    // Auto slide
    setInterval(() => plusSlides(1), 4000);
});

// ================== LỌC & TÌM KIẾM ==================
document.addEventListener("DOMContentLoaded", () =>
{
    const checkboxes = document.querySelectorAll(".filter-checkbox");
    const products = document.querySelectorAll(".shop-card");
    const searchInput = document.getElementById("searchInput");

    function filterProducts()
    {
        const checked = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
        const keyword = searchInput?.value.toLowerCase() || "";

        products.forEach(item =>
        {
            const category = item.dataset.category;
            const name = item.querySelector("h3").textContent.toLowerCase();
            const matchCategory = checked.includes(category);
            const matchSearch = name.includes(keyword);

            item.style.display = (matchCategory && matchSearch) ? "block" : "none";
        });
    }

    checkboxes.forEach(cb => cb.addEventListener("change", filterProducts));
    searchInput?.addEventListener("input", filterProducts);
});

// TÍNH NĂNG THANH TÌM KIẾM
function search()
{
    let input = document.getElementById("searchInput").value.toLowerCase();
    let products = document.querySelectorAll(".product");

    products.forEach(product =>
    {
        let name = product.querySelector(".product-name").textContent.toLowerCase();

        if (name.includes(input))
        {
            product.style.display = "block"; // Hiện sản phẩm
        } else
        {
            product.style.display = "none"; // Ẩn sản phẩm
        }
    });
}

// CHATBOT
document.addEventListener("DOMContentLoaded", () =>
{
    const chatToggle = document.getElementById("chat-toggle");
    const chatbot = document.getElementById("chatbot");
    const chatClose = document.getElementById("chat-close");
    const chatSend = document.getElementById("chat-send");
    const chatInput = document.getElementById("chat-input");
    const chatBox = document.getElementById("chat-body");

    // Câu trả lời mẫu
    // Câu trả lời mẫu (mở rộng FAQ)
    const botReplies = [
        { keywords: ["chào", "hi", "hello", "xin chào"], reply: "Xin chào bạn 👋! Rất vui được hỗ trợ bạn." },
        { keywords: ["tạm biệt", "bye", "hẹn gặp lại"], reply: "Hẹn gặp lại bạn 👋. Chúc bạn một ngày tốt lành!" },
        { keywords: ["giá", "bao nhiêu", "cost", "price"], reply: "Bạn vui lòng cho mình biết tên sản phẩm để mình báo giá nhé 💰." },
        { keywords: ["mua", "đặt hàng", "order"], reply: "Bạn có thể bấm nút 'Thêm vào giỏ' hoặc 'Mua ngay' để đặt hàng 🛒." },
        { keywords: ["ship", "giao hàng", "vận chuyển"], reply: "Bên mình hỗ trợ giao hàng toàn quốc 🚚. Thời gian từ 2-5 ngày tuỳ khu vực." },
        { keywords: ["liên hệ", "contact", "hỗ trợ"], reply: "Bạn có thể liên hệ qua email support@tibiki.vn hoặc hotline 0123-456-789 ☎️." },
        { keywords: ["khuyến mãi", "sale", "giảm giá"], reply: "Hiện tại shop có nhiều chương trình khuyến mãi hấp dẫn 🎉. Bạn vào mục *Khuyến mãi* để xem chi tiết nhé." },
        { keywords: ["thanh toán", "payment", "trả tiền"], reply: "Shop hỗ trợ thanh toán qua COD (nhận hàng trả tiền) 💵 và chuyển khoản ngân hàng 💳." },
        { keywords: ["địa chỉ", "ở đâu", "shop ở đâu"], reply: "Địa chỉ shop: 123 Nguyễn Huệ, Quận 1, TP.HCM 🏬." },
        { keywords: ["giờ mở cửa", "giờ làm việc", "opening hours"], reply: "Shop mở cửa từ 8:00 – 21:00 (T2 – CN) ⏰." },
        { keywords: ["bảo hành", "warranty"], reply: "Các sản phẩm điện tử được bảo hành chính hãng từ 6 đến 24 tháng 🔧." },
        { keywords: ["đổi trả", "return", "refund"], reply: "Bạn được đổi trả trong vòng 7 ngày nếu sản phẩm lỗi do nhà sản xuất 📦." },
        { keywords: ["ưu đãi", "voucher", "coupon"], reply: "Bạn có thể nhập mã 'TIBIKI10' để được giảm 10% cho đơn hàng đầu tiên 🎟️." },
        { keywords: ["thời gian giao", "bao lâu", "ship mấy ngày"], reply: "Nội thành TP.HCM: 1-2 ngày 🚴. Ngoại tỉnh: 3-5 ngày 🚚." },
        { keywords: ["free ship", "miễn phí vận chuyển"], reply: "Đơn hàng trên 500k sẽ được miễn phí vận chuyển 🆓." },
        { keywords: ["sản phẩm mới", "hàng mới"], reply: "Bạn có thể xem danh mục *Sản phẩm mới* để cập nhật mẫu hot nhất 🔥." },
        { keywords: ["hết hàng", "còn hàng không"], reply: "Bạn vui lòng cho mình tên sản phẩm để kiểm tra tình trạng còn hàng 🛒." },
        { keywords: ["cách mua", "hướng dẫn mua"], reply: "Bạn chọn sản phẩm ➝ bấm 'Thêm vào giỏ' ➝ vào giỏ hàng ➝ 'Thanh toán' 📝." },
        { keywords: ["feedback", "đánh giá", "review"], reply: "Bạn có thể xem đánh giá sản phẩm ở cuối trang chi tiết sản phẩm ⭐." },
        { keywords: ["hỗ trợ kỹ thuật", "kỹ thuật"], reply: "Đội ngũ kỹ thuật sẽ hỗ trợ bạn từ 8h-21h mỗi ngày 🛠️." }
    ];


    // Hàm tìm câu trả lời
    function getBotReply(msg)
    {
        msg = msg.toLowerCase();
        for (let item of botReplies)
        {
            if (item.keywords.some(k => msg.includes(k)))
            {
                return "Bot: " + item.reply;
            }
        }
        return "Bot: Xin lỗi, mình chưa hiểu ý bạn 😅. Bạn có thể hỏi về: chào, giá, mua, ship, liên hệ.";
    }

    // Thêm tin nhắn vào khung chat
    function addMessage(sender, text)
    {
        const msg = document.createElement("div");
        msg.className = sender === "bot" ? "bot-msg" : "user-msg";
        msg.textContent = text;
        chatBox.appendChild(msg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Khi mở chatbot ==> chào
    chatToggle.addEventListener("click", () =>
    {
        chatbot.style.display = "flex";
        chatBox.innerHTML = "";
        addMessage("bot", "Xin chào! Mình là Tibiki. Bạn cần hỗ trợ gì?");
    });

    if (chatClose)
    {
        chatClose.addEventListener("click", () =>
        {
            chatbot.style.display = "none";
        });
    }

    // Gửi tin nhắn
    function sendChat()
    {
        const msg = chatInput.value.trim();
        if (!msg) return;

        addMessage("user", "Bạn: " + msg);
        chatInput.value = "";

        setTimeout(() =>
        {
            let reply = getBotReply(msg);
            addMessage("bot", reply);
        }, 500);
    }

    if (chatSend) chatSend.addEventListener("click", sendChat);
    if (chatInput) chatInput.addEventListener("keypress", e =>
    {
        if (e.key === "Enter") sendChat();
    });
});





