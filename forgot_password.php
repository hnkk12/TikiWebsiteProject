<?php
session_start();
include 'connect.php';
require './phpMailer/PHPMailer.php';
require './phpMailer/SMTP.php';
require './phpMailer/Exception.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email']);

    $stmt = $conn->prepare("SELECT username FROM users WHERE email=?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        $_SESSION['email'] = $email;
        $otp = rand(100000, 999999);
        $expiry = date("Y-m-d H:i:s", strtotime("+10 minutes"));

        $stmt2 = $conn->prepare("UPDATE users SET reset_otp=?, otp_expiry=? WHERE email=?");
        $stmt2->bind_param("sss", $otp, $expiry, $email);
        $stmt2->execute();

        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'komikafevietnam@gmail.com';
            $mail->Password   = 'ufwx prnh mqxx fdcm';
            $mail->SMTPSecure = 'tls';
            $mail->Port       = 587;

            $mail->setFrom('komikafevietnam@gmail.com', 'TIBIKI');
            $mail->addAddress($email);

            $mail->isHTML(true);
            $mail->Subject = 'TIBIKI XIN CHAO MN';
            $mail->Body    = "Bọn mình gửi OTP nhé: <b>$otp</b>. Sẽ hết hạn sau 10 phút nè.";

            $mail->send();

            header("Location: otp.html");
            exit;

        } catch (Exception $e) {
            header("Location: forgot_password.html?error=mailfail");
            exit;
        }

    } else {
        header("Location: forgot_password.html?error=noemail");
        exit;
    }
} else {
    // Nếu truy cập trực tiếp PHP
    header("Location: forgot_password.html");
    exit;
}
?>
