<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);

    $to = "m.taha.murat@gmail.com"; // Bu kısmı kendi e-posta adresinizle değiştirin
    $subject = "Web Sitesi İletişim Formu Mesajı";
    $body = "İsim: $name\nEmail: $email\nTelefon: $phone\nMesaj:\n$message";

    // E-posta başlıklarını oluştur
    $headers = "From: $email";

    // E-postayı gönder
    if (mail($to, $subject, $body, $headers)) {
        echo "Mesajınız başarıyla gönderildi!";
    } else {
        echo "Mesajınız gönderilirken bir hata oluştu.";
    }
}
?>

