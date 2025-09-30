<?php
session_start();
include 'connect.php'; // file này chứa kết nối $conn = new mysqli(...);

// Kiểm tra khi form được submit bằng POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    // Chuẩn bị câu lệnh SQL an toàn
    $sql = $conn->prepare("SELECT id, username, password FROM users WHERE username=? LIMIT 1");
    $sql->bind_param("s", $username);
    $sql->execute();
    $sql->store_result();

    if ($sql->num_rows > 0) {
        $sql->bind_result($id, $user_name, $hashed_password);
        $sql->fetch();

        // So sánh mật khẩu nhập vào với hash trong DB
        if (password_verify($password, $hashed_password)) {
            // Lưu session
            $_SESSION['user_id'] = $id;
            $_SESSION['username'] = $user_name;

            // Chuyển hướng về trang chủ
            header("Location: index.php");
            exit;
        } else {
            echo "<script>alert('Sai mật khẩu!'); window.location.href='login.html';</script>";
        }
    } else {
        echo "<script>alert('Tên đăng nhập không tồn tại!'); window.location.href='login.html';</script>";
    }

    $sql->close();
    $conn->close();
} else {
    // Nếu truy cập trực tiếp login.php mà không POST thì đưa về login.html
    header("Location: login.html");
    exit;
}
?>
