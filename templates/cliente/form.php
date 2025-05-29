<?php
$formAction = ($acao === 'add') ? 'index.php?url=clientes/store' : 'index.php?url=clientes/update/' . Core\View::e($cliente['id'] ?? '');
$nomeCliente = $cliente['nome'] ?? '';
$cpfCliente = $cliente['cpf'] ?? '';
$emailCliente = $cliente['email'] ?? '';
$telefoneCliente = $cliente['telefone'] ?? '';
$senhaCliente = '';
?>

<h1><?php echo Core\View::e($titulo ?? 'Formulário de Cliente'); ?></h1>

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
        <input type="hidden" name="id" value="<?php echo Core\View::e($cliente['id'] ?? ''); ?>">
    <?php endif; ?>

    <div>
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" value="<?php echo Core\View::e($nomeCliente); ?>" required>
    </div>
    <br>
    <div>
        <label for="cpf">CPF:</label>
        <input type="text" id="cpf" name="cpf" value="<?php echo Core\View::e($cpfCliente); ?>" required>
    </div>
    <br>
    <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value="<?php echo Core\View::e($emailCliente); ?>">
    </div>
    <br>
    <div>
        <label for="telefone">Telefone:</label>
        <input type="text" id="telefone" name="telefone" value="<?php echo Core\View::e($telefoneCliente); ?>">
    </div>
    <br>
    <button type="submit"><?php echo ($acao === 'add') ? 'Adicionar' : 'Salvar Alterações'; ?></button>
    <a href="index.php?url=clientes">Cancelar</a>
</form>
