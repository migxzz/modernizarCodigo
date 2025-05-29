<?php

?>

<h1><?php echo Core\View::e($titulo ?? 'Registrar Venda'); ?></h1>

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

<form action="index.php?url=vendas/store" method="POST">
    <div>
        <label for="cliente_id">Cliente:</label><br>
        <select name="cliente_id" id="cliente_id" required>
            <option value="">Selecione um cliente</option>
            <?php foreach ($clientes as $cliente): ?>
                <option value="<?php echo Core\View::e($cliente['id']); ?>">
                    <?php echo Core\View::e($cliente['nome']); ?>
                </option>
            <?php endforeach; ?>
        </select>
    </div>
    <br>
    <div>
        <label for="forma_pagamento">Forma de Pagamento:</label><br>
        <select name="forma_pagamento" id="forma_pagamento" required>
            <option value="">Selecione</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
            <option value="Pix">Pix</option>
            <option value="Transferência">Transferência</option>
        </select>
    </div>
    <br>

    <h3>Produtos da Venda</h3>
    <div id="itens_venda_container">
        <div class="item-venda">
            <label>Produto:</label>
            <select name="itens[0][produto_id]" class="produto-select" required>
                <option value="">Selecione um produto</option>
                <?php foreach ($produtos as $produto): ?>
                    <option value="<?php echo Core\View::e($produto['id']); ?>" data-preco="<?php echo Core\View::e($produto['preco']); ?>">
                        <?php echo Core\View::e($produto['nome']); ?> (R$ <?php echo Core\View::e(number_format($produto['preco'], 2, ',', '.')); ?>)
                    </option>
                <?php endforeach; ?>
            </select>
            <label>Quantidade:</label>
            <input type="number" name="itens[0][quantidade]" class="quantidade-input" value="1" min="1" required style="width: 60px;">
            <button type="button" class="remover-item" style="display:none;">Remover</button>
        </div>
    </div>
    <button type="button" id="adicionar_item_venda">Adicionar Outro Produto</button>
    <br><br>

    <button type="submit">Finalizar Venda</button>
    <a href="index.php?url=vendas">Cancelar</a>
</form>

<script>
document.addEventListener('DOMContentLoaded', function () {
    let itemIndex = 0; // Para garantir nomes de array únicos para novos itens

    function atualizarBotoesRemover() {
        const itens = document.querySelectorAll('#itens_venda_container .item-venda');
        itens.forEach((item, index) => {
            const botaoRemover = item.querySelector('.remover-item');
            if (itens.length > 1) {
                botaoRemover.style.display = 'inline-block';
            } else {
                botaoRemover.style.display = 'none';
            }
        });
    }

    document.getElementById('adicionar_item_venda').addEventListener('click', function () {
        itemIndex++;
        const container = document.getElementById('itens_venda_container');
        const primeiroItem = container.querySelector('.item-venda');
        const novoItem = primeiroItem.cloneNode(true);

        // Limpar valores e ajustar nomes
        novoItem.querySelector('.produto-select').name = `itens[${itemIndex}][produto_id]`;
        novoItem.querySelector('.produto-select').selectedIndex = 0;
        novoItem.querySelector('.quantidade-input').name = `itens[${itemIndex}][quantidade]`;
        novoItem.querySelector('.quantidade-input').value = 1;
        
        container.appendChild(novoItem);
        atualizarBotoesRemover();
    });

    document.getElementById('itens_venda_container').addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('remover-item')) {
            const itensContainer = document.getElementById('itens_venda_container');
            if (itensContainer.querySelectorAll('.item-venda').length > 1) {
                e.target.closest('.item-venda').remove();
                atualizarBotoesRemover();
            }
        }
    });
    
    atualizarBotoesRemover(); // Chamada inicial
});
</script>
