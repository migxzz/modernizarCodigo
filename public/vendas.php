<?php
session_start();
if (!isset($_SESSION['usuario'])) {
    header('Location: login.php');
    exit;
}

require_once '../db/conexao.php';

$sql = "SELECT v.id, c.nome AS cliente, v.forma_pagamento, v.dt_venda
        FROM vendas v
        JOIN clientes c ON v.cliente_id = c.id
        ORDER BY v.dt_venda DESC";
$stmt = $pdo->query($sql);
$vendas = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>Vendas</title>
</head>
<body>
<h2>Vendas</h2>
<p><a href="venda_add.php">Nova Venda</a> | <a href="index.php">Página Inicial</a></p>
<table border="1" cellpadding="5" cellspacing="0">
    <tr>
        <th>ID</th>
        <th>Cliente</th>
        <th>Forma Pagamento</th>
        <th>Data</th>
    </tr>
    <?php foreach ($vendas as $v): ?>
    <tr>
        <td><?php echo htmlspecialchars($v['id']); ?></td>
        <td><?php echo htmlspecialchars($v['cliente']); ?></td>
        <td><?php echo htmlspecialchars($v['forma_pagamento']); ?></td>
        <td><?php echo htmlspecialchars($v['dt_venda']); ?></td>
    </tr>
    <?php endforeach; ?>
</table>
</body>
</html>