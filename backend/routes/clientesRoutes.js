// Rotas para Clientes
const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Obter todos os clientes
router.get('/', clientesController.getAllClientes);

// Obter um cliente específico pelo ID
router.get('/:id', clientesController.getClienteById);

// Criar um novo cliente
router.post('/', clientesController.createCliente);

// Atualizar um cliente existente
router.put('/:id', clientesController.updateCliente);

// Excluir um cliente
router.delete('/:id', clientesController.deleteCliente);

module.exports = router;
