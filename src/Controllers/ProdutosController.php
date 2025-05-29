<?php

namespace Controllers;

use Core\View;
use Models\Produto;

class ProdutosController {
    private $produtoModel;

    public function __construct() {
        $this->produtoModel = new Produto();
    }

    public function index() {
        $produtos = $this->produtoModel->getAll();
        
        View::render('produto/index', [
            'titulo' => 'Listagem de Produtos',
            'produtos' => $produtos
        ]);
    }

    public function create() {
        View::render('produto/form', [
            'titulo' => 'Adicionar Novo Produto',
            'acao' => 'add',
            'produto' => null
        ]);
    }

    public function store() {
        $erros = [];
        $dados = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $dados = [
                'nome' => trim($_POST['nome'] ?? ''),
                'descricao' => trim($_POST['descricao'] ?? ''),
                'preco' => trim($_POST['preco'] ?? ''),
                'quantidade' => (int)($_POST['quantidade'] ?? 0)
            ];

            if (empty($dados['nome'])) {
                $erros[] = "O nome é obrigatório.";
            }
            if (empty($dados['preco'])) {
                $erros[] = "O preço é obrigatório.";
            } elseif (!is_numeric($dados['preco']) || (float)$dados['preco'] <= 0) {
                $erros[] = "O preço deve ser um número válido e maior que zero.";
            }
            if ($dados['quantidade'] < 0) {
                $erros[] = "A quantidade não pode ser negativa.";
            }

            if (empty($erros)) {
                if ($this->produtoModel->create($dados)) {
                    header('Location: index.php?url=produtos');
                    exit;
                } else {
                    $erros[] = "Erro ao salvar o produto no banco de dados.";
                }
            }
        }

        View::render('produto/form', [
            'titulo' => 'Adicionar Novo Produto',
            'acao' => 'add',
            'produto' => $dados,
            'erros' => $erros
        ]);
    }

    public function edit($id) {
        if (!filter_var($id, FILTER_VALIDATE_INT) || (int)$id <= 0) {
            View::render('errors/404', ['message' => 'ID de produto inválido.'], 404);
            return;
        }
        
        $produto = $this->produtoModel->getById((int)$id);

        if (!$produto) {
            View::render('errors/404', ['message' => 'Produto não encontrado.'], 404);
            return;
        }

        View::render('produto/form', [
            'titulo' => 'Editar Produto',
            'acao' => 'edit',
            'produto' => $produto
        ]);
    }

    public function update($id) {
        if (!filter_var($id, FILTER_VALIDATE_INT) || (int)$id <= 0) {
            View::render('errors/404', ['message' => 'ID de produto inválido para atualização.'], 404);
            return;
        }
        $erros = [];
        $dadosSubmetidos = [];
        
        $produtoOriginal = $this->produtoModel->getById((int)$id);

        if (!$produtoOriginal) {
            View::render('errors/404', ['message' => 'Produto não encontrado para atualização.'], 404);
            return;
        }
        
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            View::render('produto/form', [
                'titulo' => 'Editar Produto',
                'acao' => 'edit',
                'produto' => $produtoOriginal, 
                'erros' => $erros
            ]);
            return;
        }

        $dadosParaAtualizar = [
            'nome' => trim($_POST['nome'] ?? ''),
            'descricao' => trim($_POST['descricao'] ?? ''),
            'preco' => trim($_POST['preco'] ?? ''),
            'quantidade' => (int)($_POST['quantidade'] ?? 0)
        ];

        if (empty($dadosParaAtualizar['nome'])) {
            $erros[] = "O nome é obrigatório.";
        }
        if (empty($dadosParaAtualizar['preco'])) {
            $erros[] = "O preço é obrigatório.";
        } elseif (!is_numeric($dadosParaAtualizar['preco']) || (float)$dadosParaAtualizar['preco'] <= 0) {
            $erros[] = "O preço deve ser um número válido e maior que zero.";
        }
        if ($dadosParaAtualizar['quantidade'] < 0) {
            $erros[] = "A quantidade não pode ser negativa.";
        }

        if (empty($erros)) {
            if ($this->produtoModel->update((int)$id, $dadosParaAtualizar)) {
                header('Location: index.php?url=produtos');
                exit;
            } else {
                $erros[] = "Erro ao atualizar o produto no banco de dados.";
            }
        }
        
        $dadosSubmetidos = $dadosParaAtualizar;
        $dadosSubmetidos['id'] = (int)$id;
        View::render('produto/form', [
            'titulo' => 'Editar Produto',
            'acao' => 'edit',
            'produto' => $dadosSubmetidos, 
            'erros' => $erros
        ]);
    }

    public function delete($id) {
        if (!filter_var($id, FILTER_VALIDATE_INT) || (int)$id <= 0) {
            View::render('errors/404', ['message' => 'ID de produto inválido para exclusão.'], 404);
            return;
        }

        if ($this->produtoModel->delete((int)$id)) {
        } else {
        }
        header('Location: index.php?url=produtos');
        exit;
    }
}
?>
