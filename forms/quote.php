
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Geri kalan PHP kodunuz burada


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $message = trim($_POST["message"]);

    if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($phone) || empty($message)) {
        echo "<h2>Lütfen tüm form alanlarını doğru doldurun.</h2>";
        exit;
    }

    $recipient = "m.taha.murat@gmail.com";
    $subject = "Yeni mesaj: $name";

    $email_content = "İsim: $name\n";
    $email_content .= "E-posta: $email\n";
    $email_content .= "Telefon: $phone\n\n";
    $email_content .= "Mesaj:\n$message\n";

    $email_headers = "From: $name <$email>";

    if (mail($recipient, $subject, $email_content, $email_headers)) {
        echo "<h2>Mesajınız başarıyla gönderildi.</h2>";
    } else {
        echo "<h2>Mesaj gönderilirken bir hata oluştu.</h2>";
    }
} else {
    echo "<h2>Hatalı istek.</h2>";
}
?>
