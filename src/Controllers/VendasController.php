<?php

namespace Controllers;

use Core\View;
use Models\Venda; 
use Models\Cliente; 
use Models\Produto; 

class VendasController {
    private $vendaModel;
    private $clienteModel;
    private $produtoModel;

    public function __construct() {
        $this->vendaModel = new Venda();
        $this->clienteModel = new Cliente();
        $this->produtoModel = new Produto();
    }

    public function index() {
        $vendas = $this->vendaModel->getAllWithDetails();
        
        View::render('venda/index', [
            'titulo' => 'Listagem de Vendas',
            'vendas' => $vendas
        ]);
    }

    public function create() {
        $clientes = $this->clienteModel->getAll();
        $produtos = $this->produtoModel->getAll();
        
        View::render('venda/form', [
            'titulo' => 'Registrar Nova Venda',
            'acao' => 'add',
            'venda' => null,
            'clientes' => $clientes,
            'produtos' => $produtos,
            'erros' => []
        ]);
    }

    public function store() {
        $erros = [];
        $dadosVenda = [];
        $itensVendaInput = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $dadosVenda = [
                'cliente_id' => filter_input(INPUT_POST, 'cliente_id', FILTER_VALIDATE_INT),
                'forma_pagamento' => trim($_POST['forma_pagamento'] ?? '')
            ];
            
            $itensVendaInput = $_POST['itens'] ?? [];

            if (empty($dadosVenda['cliente_id'])) {
                $erros[] = "Cliente é obrigatório.";
            }
            if (empty($dadosVenda['forma_pagamento'])) {
                $erros[] = "Forma de pagamento é obrigatória.";
            }
            if (empty($itensVendaInput)) {
                $erros[] = "Pelo menos um produto deve ser adicionado à venda.";
            } else {
                foreach ($itensVendaInput as $index => $item) {
                    if (empty($item['produto_id']) || !filter_var($item['produto_id'], FILTER_VALIDATE_INT)) {
                        $erros[] = "Produto inválido selecionado no item " . ($index + 1) . ".";
                    }
                    if (empty($item['quantidade']) || !filter_var($item['quantidade'], FILTER_VALIDATE_INT) || (int)$item['quantidade'] <= 0) {
                        $erros[] = "Quantidade inválida para o produto no item " . ($index + 1) . ". Deve ser um número maior que 0.";
                    }
                }
            }

            if (empty($erros)) {
                $vendaId = $this->vendaModel->create($dadosVenda, $itensVendaInput);
                if ($vendaId) {
                    header('Location: index.php?url=vendas');
                    exit;
                } else {
                    $erros[] = "Erro ao registrar a venda no banco de dados. Verifique os logs para mais detalhes.";
                }
            }
        }

        $clientes = $this->clienteModel->getAll();
        $produtos = $this->produtoModel->getAll();

        View::render('venda/form', [
            'titulo' => 'Registrar Nova Venda',
            'acao' => 'add',
            'venda' => $dadosVenda,
            'itens_input' => $itensVendaInput,
            'clientes' => $clientes,
            'produtos' => $produtos,
            'erros' => $erros
        ]);
    }
}
?>
