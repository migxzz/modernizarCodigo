<?php
$formAction = ($acao === 'add') ? 'index.php?url=produtos/store' : 'index.php?url=produtos/update/' . Core\View::e($produto['id'] ?? '');
$nomeProduto = $produto['nome'] ?? '';
$descricaoProduto = $produto['descricao'] ?? '';
$precoProduto = $produto['preco'] ?? '';
$quantidadeProduto = $produto['quantidade'] ?? '';
?>

<h1><?php echo Core\View::e($titulo ?? 'Formulário de Produto'); ?></h1>

<?php if (!empty($erros)): ?>
    <div style="color: red; border: 1px solid red; padding: 10px; margin-bottom: 15px;">
        <strong>Por favor, corrija os seguintes erros:</strong>
        <ul>
            <?php foreach ($erros as $erro): ?>
                <li><?php echo Core\View::e($erro); ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
<?php endif; ?>

<form action="<?php echo $formAction; ?>" method="POST">
    <?php if ($acao === 'edit'): ?>
        <input type="hidden" name="id" value="<?php echo Core\View::e($produto['id'] ?? ''); ?>">
    <?php endif; ?>

    <div>
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" value="<?php echo Core\View::e($nomeProduto); ?>" required>
    </div>
    <br>
    <div>
        <label for="descricao">Descrição:</label>
        <textarea id="descricao" name="descricao" rows="4" cols="50"><?php echo Core\View::e($descricaoProduto); ?></textarea>
    </div>
    <br>
    <div>
        <label for="preco">Preço (ex: 10.99):</label>
        <input type="text" id="preco" name="preco" value="<?php echo Core\View::e($precoProduto); ?>" pattern="^\d+(\.\d{1,2})?$" title="Preço deve ser um número com até duas casas decimais, ex: 10.99" required>
    </div>
    <br>
    <div>
        <label for="quantidade">Quantidade:</label>
        <input type="number" id="quantidade" name="quantidade" value="<?php echo Core\View::e($quantidadeProduto); ?>" min="0" required>
    </div>
    <br>
    <button type="submit"><?php echo ($acao === 'add') ? 'Adicionar' : 'Salvar Alterações'; ?></button>
    <a href="index.php?url=produtos">Cancelar</a>
</form>
