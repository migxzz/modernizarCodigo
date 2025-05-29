<?php
session_start();
if (!isset($_SESSION['usuario'])) {
    header('Location: login.php');
    exit;
}

require_once '../db/conexao.php';

// Buscar clientes
$sql = "SELECT id, nome FROM clientes ORDER BY nome";
$stmt = $pdo->query($sql);
$clientes = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Buscar produtos
$sql = "SELECT id, nome, preco FROM produtos ORDER BY nome";
$stmt = $pdo->query($sql);
$produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);

$erro = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cliente_id = (int) $_POST['cliente_id'];
    $forma_pagamento = trim($_POST['forma_pagamento']);
    $produtos_ids = $_POST['produto_id'];
    $quantidades = $_POST['quantidade'];

    if ($cliente_id && $forma_pagamento && !empty($produtos_ids)) {
        try {
            $pdo->beginTransaction();

            // Criar a venda
            $sql = "INSERT INTO vendas (cliente_id, forma_pagamento) VALUES (:cliente_id, :forma_pagamento)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                'cliente_id' => $cliente_id,
                'forma_pagamento' => $forma_pagamento
            ]);
            $venda_id = $pdo->lastInsertId();

            // Adicionar os itens
            $sql = "INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco_unitario)
                    VALUES (:venda_id, :produto_id, :quantidade, :preco_unitario)";
            $stmt = $pdo->prepare($sql);

            foreach ($produtos_ids as $index => $produto_id) {
                $quantidade = (int) $quantidades[$index];
                // Buscar preço atual do produto
                $sql_preco = "SELECT preco FROM produtos WHERE id = :id";
                $stmt_preco = $pdo->prepare($sql_preco);
                $stmt_preco->execute(['id' => $produto_id]);
                $preco = $stmt_preco->fetchColumn();

                $stmt->execute([
                    'venda_id' => $venda_id,
                    'produto_id' => $produto_id,
                    'quantidade' => $quantidade,
                    'preco_unitario' => $preco
                ]);
            }

            $pdo->commit();
            header('Location: vendas.php');
            exit;
        } catch (PDOException $e) {
            $pdo->rollBack();
            $erro = "Erro ao registrar venda: " . $e->getMessage();
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
<title>Nova Venda</title>
<script>
function adicionarProduto() {
    const produtosDiv = document.getElementById('produtos');
    const novoProduto = produtosDiv.firstElementChild.cloneNode(true);
    novoProduto.querySelector('input[name="quantidade[]"]').value = 1;
    produtosDiv.appendChild(novoProduto);
}
</script>
</head>
<body>
<h2>Nova Venda</h2>
<?php if ($erro): ?>
<p style="color:red;"><?php echo htmlspecialchars($erro); ?></p>
<?php endif; ?>
<form method="POST" action="">
    <label>Cliente:</label><br>
    <select name="cliente_id" required>
        <option value="">Selecione</option>
        <?php foreach ($clientes as $c): ?>
        <option value="<?php echo $c['id']; ?>"><?php echo htmlspecialchars($c['nome']); ?></option>
        <?php endforeach; ?>
    </select><br><br>

    <label>Forma de Pagamento:</label><br>
    <select name="forma_pagamento" required>
        <option value="">Selecione</option>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão">Cartão</option>
        <option value="Pix">Pix</option>
    </select><br><br>

    <label>Produtos:</label><br>
    <div id="produtos">
        <div>
            <select name="produto_id[]" required>
                <option value="">Selecione</option>
                <?php foreach ($produtos as $p): ?>
                <option value="<?php echo $p['id']; ?>"><?php echo htmlspecialchars($p['nome']); ?> (R$<?php echo number_format($p['preco'], 2, ',', '.'); ?>)</option>
                <?php endforeach; ?>
            </select>
            Quantidade: <input type="number" name="quantidade[]" value="1" min="1" required>
        </div>
    </div>
    <button type="button" onclick="adicionarProduto()">Adicionar Produto</button><br><br>

    <input type="submit" value="Finalizar Venda">
</form>
<p><a href="index.php">Página Inicial</a></p>
</body>
</html>