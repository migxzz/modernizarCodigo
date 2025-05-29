// Rotas para Vendas
const express = require('express');
const router = express.Router();
const vendasController = require('../controllers/vendasController');

// Obter todas as vendas
router.get('/', vendasController.getAllVendas);

// Obter uma venda específica pelo ID
router.get('/:id', vendasController.getVendaById);

// Criar uma nova venda
router.post('/', vendasController.createVenda);

// Excluir uma venda
router.delete('/:id', vendasController.deleteVenda);

module.exports = router;
