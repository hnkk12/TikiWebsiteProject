// ================= Danh sách mã giảm giá =================
const coupons = [
  { code: "SALE5", type: "percent", value: 5 },
  { code: "SALE10", type: "percent", value: 10 },
  { code: "SALE50K", type: "fixed", value: 50000 },
  { code: "SALE100K", type: "fixed", value: 100000 },
];

let appliedCoupon = null;

// Đổ coupon vào select
const couponSelect = document.getElementById("coupon");
coupons.forEach((c) => {
  const opt = document.createElement("option");
  opt.value = c.code;
  opt.textContent =
    c.type === "percent"
      ? `${c.code} - Giảm ${c.value}%`
      : `${c.code} - Giảm ${c.value.toLocaleString("vi-VN")}₫`;
  couponSelect.appendChild(opt);
});

// Nút áp dụng
document.getElementById("applyCoupon").addEventListener("click", () => {
  const code = couponSelect.value;
  const messageEl = document.getElementById("coupon-message");

  const found = coupons.find((c) => c.code === code);

  if (found) {
    appliedCoupon = found;
    messageEl.style.color = "green";
    messageEl.textContent = `Mã ${found.code} đã áp dụng.`;
  } else {
    appliedCoupon = null;
    messageEl.style.color = "red";
    messageEl.textContent = `Không áp dụng mã giảm giá`;
  }
  renderCart(); // render lại để cập nhật tổng
});

// Ghi đè renderCart có hỗ trợ giảm giá
const _oldRenderCart = renderCart;
renderCart = function () {
  _oldRenderCart();

  // Lấy tổng gốc từ orderTotal
  let total = orderTotal;

  if (appliedCoupon) {
    let discountAmount = 0;

    if (appliedCoupon.type === "percent") {
      discountAmount = Math.floor((total * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === "fixed") {
      discountAmount = appliedCoupon.value;
    }

    if (discountAmount > total) discountAmount = total; // ko âm tiền

    let newTotal = total - discountAmount;

    totalEl.innerHTML = `
  Tổng tiền hàng: <span class="old-total">${total.toLocaleString(
    "vi-VN"
  )}₫</span>
  <br>
  Số tiền giảm: <span class="discount-amount">-${discountAmount.toLocaleString(
    "vi-VN"
  )}₫</span>
  <hr style="margin: 8px 0; border: 0; border-top: 1px dashed #999;">
  Tổng thanh toán: <span class="new-total">${newTotal.toLocaleString(
    "vi-VN"
  )}₫</span>
`;
    // cập nhật lại QR
    const qrAmount = document.getElementById("qrAmount");
    if (qrAmount) qrAmount.innerText = newTotal.toLocaleString("vi-VN");

    // cập nhật orderTotal = tổng mới (cho checkout)
    orderTotal = newTotal;
  }
};
