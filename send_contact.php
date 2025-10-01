<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpMailer/PHPMailer.php';
require 'phpMailer/SMTP.php';
require 'phpMailer/Exception.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(['status' => 'error', 'message' => 'Vui lòng điền đầy đủ thông tin']);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'komikafevietnam@gmail.com';
            $mail->Password   = 'ufwx prnh mqxx fdcm';
            $mail->SMTPSecure = 'tls';
            $mail->Port       = 587;

        $mail->setFrom('komikafe@gmail.com', 'Tibiki Store');
        $mail->addAddress('hachanhsu39@gmail.com', 'Tư vấn viên'); // email nhận
        $mail->addReplyTo($email, $name);

        $mail->isHTML(true);
        $mail->Subject = 'Cham soc khach hang';
        $mail->Body    = "
            <h2>Thông tin liên hệ từ khách hàng</h2>
            <p><strong>Họ tên:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Nội dung:</strong> {$message}</p>
        ";

        $mail->send();
        echo json_encode(['status' => 'success', 'message' => 'Gửi thành công! Chúng tôi sẽ liên hệ sớm.']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => "Gửi email thất bại: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Phương thức không hợp lệ']);
}
?>
