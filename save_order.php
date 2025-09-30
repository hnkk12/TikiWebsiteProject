<?php
include "connect.php"; // file này có sẵn biến $conn kết nối CSDL

header("Content-Type: application/json");

// Nhận dữ liệu từ Ajax
$data = json_decode(file_get_contents("php://input"), true);

$name     = $data["name"];
$phone    = $data["phone"];
$address  = $data["address"];
$payment  = $data["payment"]; // <-- thêm phương thức thanh toán
$cart     = $data["cart"];
$total    = $data["total"];

// Lưu thông tin khách hàng + đơn hàng
$sql = "INSERT INTO orders (fullname, phone, address, payment, total_price) 
        VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssd", $name, $phone, $address, $payment, $total);
$stmt->execute();
$order_id = $stmt->insert_id;

// Lưu chi tiết sản phẩm
foreach ($cart as $item) {
    // Lấy giá trị số từ price (vd: "100,000₫" -> 100000)
    $price = (int)preg_replace("/[^0-9]/", "", $item["price"]);

    $sql_item = "INSERT INTO order_items (order_id, product_name, quantity, price) 
                 VALUES (?, ?, ?, ?)";
    $stmt_item = $conn->prepare($sql_item);
    $stmt_item->bind_param("isid", $order_id, $item["name"], $item["quantity"], $price);
    $stmt_item->execute();
}

echo json_encode(["status" => "success", "message" => "Đơn hàng đã được lưu thành công!"]);
$conn->close();
?>
