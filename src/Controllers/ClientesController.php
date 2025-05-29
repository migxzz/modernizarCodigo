<?php

namespace Controllers;

use Core\View;
use Models\Cliente;

class ClientesController {
    private $clienteModel;

    public function __construct() {
        $this->clienteModel = new Cliente();
    }

    public function index() {
        $clientes = $this->clienteModel->getAll();
        
        View::render('cliente/index', [
            'titulo' => 'Listagem de Clientes',
            'clientes' => $clientes
        ]);
    }

    public function create() {
        View::render('cliente/form', [
            'titulo' => 'Adicionar Novo Cliente',
            'acao' => 'add',
            'cliente' => null
        ]);
    }

    public function store() {
        $erros = [];
        $dados = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $dados = [
                'nome' => trim($_POST['nome'] ?? ''),
                'cpf' => trim($_POST['cpf'] ?? ''),
                'email' => trim($_POST['email'] ?? ''),
                'telefone' => trim($_POST['telefone'] ?? '')
            ];

            if (empty($dados['nome'])) {
                $erros[] = "O nome é obrigatório.";
            }
            if (empty($dados['cpf'])) {
                $erros[] = "O CPF é obrigatório.";
            }

            if (empty($erros)) {
                if ($this->clienteModel->create($dados)) {
                    header('Location: index.php?url=clientes');
                    exit;
                } else {
                    $erros[] = "Erro ao salvar o cliente no banco de dados.";
                }
            }
        }

        View::render('cliente/form', [
            'titulo' => 'Adicionar Novo Cliente',
            'acao' => 'add',
            'cliente' => $dados,
            'erros' => $erros
        ]);
    }

    public function edit($id) {
        if (!filter_var($id, FILTER_VALIDATE_INT) || (int)$id <= 0) {
             View::render('errors/404', ['message' => 'ID de cliente inválido.'], 404);
            return;
        }
        $cliente = $this->clienteModel->getById((int)$id);

        if (!$cliente) {
            View::render('errors/404', ['message' => 'Cliente não encontrado.'], 404);
            return;
        }

        View::render('cliente/form', [
            'titulo' => 'Editar Cliente',
            'acao' => 'edit',
            'cliente' => $cliente
        ]);
    }

    public function update($id) {
         if (!filter_var($id, FILTER_VALIDATE_INT) || (int)$id <= 0) {
             View::render('errors/404', ['message' => 'ID de cliente inválido para atualização.'], 404);
            return;
        }
        $erros = [];
        $clienteOriginal = $this->clienteModel->getById((int)$id);
        $dadosSubmetidos = $clienteOriginal;

        if (!$clienteOriginal) {
            View::render('errors/404', ['message' => 'Cliente não encontrado para atualização.'], 404);
            return;
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $dadosSubmetidos = [
                'id' => (int)$id,
                'nome' => trim($_POST['nome'] ?? ''),
                'cpf' => trim($_POST['cpf'] ?? ''),
                'email' => trim($_POST['email'] ?? ''),
                'telefone' => trim($_POST['telefone'] ?? '')
            ];

            if (empty($dadosSubmetidos['nome'])) {
                $erros[] = "O nome é obrigatório.";
            }
            if (empty($dadosSubmetidos['cpf'])) {
                $erros[] = "O CPF é obrigatório.";
            }

            if (empty($erros)) {
                if ($this->clienteModel->update((int)$id, $dadosSubmetidos)) {
                    header('Location: index.php?url=clientes');
                    exit;
                } else {
                    $erros[] = "Erro ao atualizar o cliente no banco de dados.";
                }
            }
        }
        
        View::render('cliente/form', [
            'titulo' => 'Editar Cliente',
            'acao' => 'edit',
            'cliente' => $dadosSubmetidos,
            'erros' => $erros
        ]);
    }

    public function delete($id) {
        if (!filter_var($id, FILTER_VALIDATE_INT) || (int)$id <= 0) {
             View::render('errors/404', ['message' => 'ID de cliente inválido para exclusão.'], 404);
            return;
        }

        if ($this->clienteModel->delete((int)$id)) {
        } else {
        }
        header('Location: index.php?url=clientes');
        exit;
    }
}
?>
