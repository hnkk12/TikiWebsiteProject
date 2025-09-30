<?php
session_start();
include 'connect.php';

if(!isset($_SESSION['email'])){
    echo "Vui lòng nhập email trước!";
    exit;
}

$email = $_SESSION['email'];
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $otp = trim($_POST['otp']);
    $new_password = trim($_POST['new_password']);

    // Lấy OTP và thời gian hết hạn từ DB
    $stmt = $conn->prepare("SELECT reset_otp, otp_expiry FROM users WHERE email=?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    if($row){
        $current_time = date("Y-m-d H:i:s");
        if($otp === $row['reset_otp']){
            if($current_time <= $row['otp_expiry']){
                // Mã OTP đúng và chưa hết hạn → cập nhật mật khẩu mới
                $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
                $stmt2 = $conn->prepare("UPDATE users SET password=?, reset_otp=NULL, otp_expiry=NULL WHERE email=?");
                $stmt2->bind_param("ss", $hashed_password, $email);
                $stmt2->execute();

                // Xóa session email
                unset($_SESSION['email']);

                // Chuyển hướng sang trang thành công
                header("Location: ChangePassSuccess.html");
                exit;
            } else {
                echo "OTP đã hết hạn!";
            }
        } else {
            echo "OTP không đúng!";
        }
    } else {
        echo "Email không tồn tại!";
    }
}
?>
