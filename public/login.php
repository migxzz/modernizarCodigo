<?php
session_start();
require_once '../db/conexao.php';

$erro = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = trim($_POST['usuario']);
    $senha = trim($_POST['senha']);

    if ($usuario && $senha) {
        $sql = "SELECT * FROM usuarios WHERE usuario = :usuario AND senha = MD5(:senha)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['usuario' => $usuario, 'senha' => $senha]);

        if ($stmt->rowCount() === 1) {
            $_SESSION['usuario'] = $usuario;
            header('Location: index.php');
            exit;
        } else {
            $erro = "Usuário ou senha inválidos!";
        }
    } else {
        $erro = "Preencha todos os campos!";
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>Login</title>
</head>
<body>
<h2>Login</h2>
<?php if ($erro): ?>
<p style="color:red;"><?php echo htmlspecialchars($erro); ?></p>
<?php endif; ?>
<form method="POST" action="">
    <label>Usuário:</label><br>
    <input type="text" name="usuario" required><br><br>
    <label>Senha:</label><br>
    <input type="password" name="senha" required><br><br>
    <input type="submit" value="Entrar">
</form>
</body>
</html>