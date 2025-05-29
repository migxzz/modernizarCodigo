<?php

?>

<h1><?php echo Core\View::e($titulo ?? 'Vendas'); ?></h1>

<p><a href="index.php?url=vendas/create">Registrar Nova Venda</a></p>

<?php if (empty($vendas)): ?>
    <p>Nenhuma venda registrada.</p>
<?php else: ?>
    <table border="1" cellpadding="5" cellspacing="0">
        <thead>
            <tr>
                <th>ID Venda</th>
                <th>Cliente</th>
                <th>Forma de Pagamento</th>
                <th>Data da Venda</th>
                
            </tr>
        </thead>
        <tbody>
            <?php foreach ($vendas as $venda): ?>
                <tr>
                    <td><?php echo Core\View::e($venda['id'] ?? ''); ?></td>
                    <td><?php echo Core\View::e($venda['cliente'] ?? $venda['cliente_nome'] ?? ''); ?></td>
                    <td><?php echo Core\View::e($venda['forma_pagamento'] ?? ''); ?></td>
                    <td><?php echo Core\View::e(isset($venda['dt_venda']) ? date('d/m/Y H:i:s', strtotime($venda['dt_venda'])) : ''); ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
<?php endif; ?>
