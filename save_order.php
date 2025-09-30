<?php
session_start();
include "connect.php"; // kết nối CSDL
require './phpMailer/PHPMailer.php';
require './phpMailer/SMTP.php';
require './phpMailer/Exception.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header("Content-Type: application/json");

// Nhận dữ liệu từ Ajax
$data = json_decode(file_get_contents("php://input"), true);

// --- DEBUG: kiểm tra dữ liệu nhận từ frontend ---
// var_dump($data); die();

$name = trim($data["name"] ?? '');
$phone = trim($data["phone"] ?? '');
$address = trim($data["address"] ?? '');
$payment = trim($data["payment"] ?? '');
$email = trim($data["email"] ?? '');
$cart = $data["cart"] ?? [];
$total = $data["total"] ?? 0;

// Kiểm tra dữ liệu bắt buộc
if(!$name || !$phone || !$address || !$email || empty($cart)){
    echo json_encode([
        "status" => "error",
        "message" => "Vui lòng điền đầy đủ thông tin và chọn sản phẩm."
    ]);
    exit;
}

// --- Hàm sinh mã đơn hàng 8 ký tự ---
function generateOrderCode($length = 8) {
    return strtoupper(substr(bin2hex(random_bytes($length)), 0, $length));
}
$order_code = generateOrderCode();

// --- Lưu thông tin khách hàng + đơn hàng ---
$sql = "INSERT INTO orders (fullname, phone, address, payment, total_price, email) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssds", $name, $phone, $address, $payment, $total, $email);
if(!$stmt->execute()){
    echo json_encode([
        "status" => "error",
        "message" => "Lỗi lưu đơn hàng: " . $stmt->error
    ]);
    exit;
}
$order_id = $stmt->insert_id;

// --- Lưu chi tiết sản phẩm ---
foreach ($cart as $item) {
    $price = (int)preg_replace("/[^0-9]/", "", $item["price"]);
    $status = "pending"; // trạng thái mặc định
    $sql_item = "INSERT INTO order_items (order_id, product_name, quantity, price, status, order_code) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt_item = $conn->prepare($sql_item);
    $stmt_item->bind_param("isidss", $order_id, $item["name"], $item["quantity"], $price, $status, $order_code);
    if(!$stmt_item->execute()){
        echo json_encode([
            "status" => "error",
            "message" => "Lỗi lưu chi tiết sản phẩm: " . $stmt_item->error
        ]);
        exit;
    }
}

// --- Gửi email xác nhận ---
// --- Gửi email xác nhận ---
if (!empty($email)) {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->SMTPDebug = 0;
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'komikafevietnam@gmail.com';
        $mail->Password   = 'ufwx prnh mqxx fdcm'; // App Password
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        $mail->setFrom('komikafevietnam@gmail.com', 'TIBIKI');
        $mail->addAddress($email, $name);
        $mail->isHTML(true);
        $mail->Subject = 'Xac nhan don hang cua ban';

        $body = "<h3>Xin chào $name,</h3>";
        $body .= "<p>Cảm ơn bạn đã đặt hàng bọn mình nhé!<br><b>Mã đơn hàng của bạn là: $order_code</b></p>";
        $body .= "<p><b>Chi tiết sản phẩm:</b></p>";
        $body .= "<ol>"; // đổi ul thành ol để rõ thứ tự
        foreach ($cart as $item) {
            $priceFormatted = number_format((int)preg_replace("/[^0-9]/", "", $item["price"]), 0, ",", ".");
            $body .= "<li>{$item['name']} x {$item['quantity']} - {$priceFormatted} VNĐ</li>";
        }
        $body .= "</ol>";
        $body .= "<p><b>Trị giá: </b>" . number_format($total, 0, ",", ".") . " VNĐ</p>";
        $body .= "<p><b>Trạng thái: </b>Đã tiếp nhận</p>";

        $mail->Body = $body;
        $mail->send();
    } catch (Exception $e) {
        error_log("Mail Error: " . $mail->ErrorInfo);
    }
}


// --- Trả về JSON ---
echo json_encode([
    "status" => "success",
    "message" => "Đơn hàng đã được lưu thành công!",
    "order_code" => $order_code
]);

$conn->close();
?>
