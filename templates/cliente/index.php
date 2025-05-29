<?php

?>

<h1><?php echo Core\View::e($titulo ?? 'Clientes'); ?></h1>

<p><a href="index.php?url=clientes/create">Adicionar Novo Cliente</a></p>

<?php if (empty($clientes)): ?>
    <p>Nenhum cliente cadastrado.</p>
<?php else: ?>
    <table border="1" cellpadding="5" cellspacing="0">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($clientes as $cliente): ?>
                <tr>
                    <td><?php echo Core\View::e($cliente['id'] ?? ''); ?></td>
                    <td><?php echo Core\View::e($cliente['nome'] ?? ''); ?></td>
                    <td><?php echo Core\View::e($cliente['cpf'] ?? ''); ?></td>
                    <td><?php echo Core\View::e($cliente['email'] ?? ''); ?></td>
                    <td><?php echo Core\View::e($cliente['telefone'] ?? ''); ?></td>
                    <td>
                        <a href="index.php?url=clientes/edit/<?php echo Core\View::e($cliente['id'] ?? ''); ?>">Editar</a>
                        <a href="index.php?url=clientes/delete/<?php echo Core\View::e($cliente['id'] ?? ''); ?>" onclick="return confirm('Tem certeza que deseja excluir este cliente?');">Excluir</a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
<?php endif; ?>
