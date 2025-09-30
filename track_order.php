<?php
header("Content-Type: application/json");
include "connect.php";

$data = json_decode(file_get_contents("php://input"), true);
$code = trim($data['order_code'] ?? '');

if(!$code){
    echo json_encode(["status"=>"error","message"=>"Chưa nhập mã đơn hàng"]);
    exit;
}

// Lấy thông tin đơn hàng
$stmt = $conn->prepare("SELECT * FROM orders WHERE id IN (SELECT order_id FROM order_items WHERE order_code=?) LIMIT 1");
$stmt->bind_param("s", $code);
$stmt->execute();
$result = $stmt->get_result();
$order = $result->fetch_assoc();

if(!$order){
    echo json_encode(["status"=>"error","message"=>"Không tìm thấy đơn hàng"]);
    exit;
}

// Lấy chi tiết sản phẩm
$stmt2 = $conn->prepare("SELECT product_name, quantity, price, status FROM order_items WHERE order_code=?");
$stmt2->bind_param("s", $code);
$stmt2->execute();
$res2 = $stmt2->get_result();
$items = $res2->fetch_all(MYSQLI_ASSOC);

echo json_encode([
    "status"=>"success",
    "order"=>$order,
    "items"=>$items
]);
$conn->close();
?>
