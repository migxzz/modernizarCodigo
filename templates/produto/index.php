<?php

?>

<h1><?php echo Core\View::e($titulo ?? 'Produtos'); ?></h1>

<p><a href="index.php?url=produtos/create">Adicionar Novo Produto</a></p>

<?php if (empty($produtos)): ?>
    <p>Nenhum produto cadastrado.</p>
<?php else: ?>
    <table border="1" cellpadding="5" cellspacing="0">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($produtos as $produto): ?>
                <tr>
                    <td><?php echo Core\View::e($produto['id'] ?? ''); ?></td>
                    <td><?php echo Core\View::e($produto['nome'] ?? ''); ?></td>
                    <td><?php echo Core\View::e($produto['descricao'] ?? ''); ?></td>
                    <td>R$ <?php echo Core\View::e(number_format($produto['preco'] ?? 0, 2, ',', '.')); ?></td>
                    <td><?php echo Core\View::e($produto['quantidade'] ?? 0); ?></td>
                    <td>
                        <a href="index.php?url=produtos/edit/<?php echo Core\View::e($produto['id'] ?? ''); ?>">Editar</a>
                        <a href="index.php?url=produtos/delete/<?php echo Core\View::e($produto['id'] ?? ''); ?>" onclick="return confirm('Tem certeza que deseja excluir este produto?');">Excluir</a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
<?php endif; ?>
