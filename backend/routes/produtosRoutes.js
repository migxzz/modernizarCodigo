// Rotas para Produtos
const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

// Obter todos os produtos
router.get('/', produtosController.getAllProdutos);

// Obter um produto específico pelo ID
router.get('/:id', produtosController.getProdutoById);

// Criar um novo produto
router.post('/', produtosController.createProduto);

// Atualizar um produto existente
router.put('/:id', produtosController.updateProduto);

// Excluir um produto
router.delete('/:id', produtosController.deleteProduto);

module.exports = router;