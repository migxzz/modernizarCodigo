<?php
$host = 'localhost';
$db = 'legacy_ap';
$user = 'root'; // ajuste se necessário
$pass = '';     // ajuste se necessário

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro de conexão: " . $e->getMessage());
}
?>