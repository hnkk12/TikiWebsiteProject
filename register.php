<?php
include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    // Kiểm tra username hoặc email đã tồn tại chưa
    $stmt = $conn->prepare("SELECT id FROM users WHERE username=? OR email=?");
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Trùng username hoặc email → quay lại trang đăng ký kèm lỗi
        header("Location: register.html?error=1");
        exit();
    } else {
        // Mã hoá mật khẩu và lưu
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $username, $email, $hashedPassword);

        if ($stmt->execute()) {
            // Thành công → chuyển qua login.html kèm thông báo
            header("Location: login.html?success=1");
            exit();
        } else {
            header("Location: register.html?error=2");
            exit();
        }
    }
}
?>
