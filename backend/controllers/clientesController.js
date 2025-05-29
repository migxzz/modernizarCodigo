// Controller de Clientes
const Cliente = require('../models/Cliente');

// Obter todos os clientes
exports.getAllClientes = async (req, res) => {
  try {
    const clientes = await Cliente.getAll();
    res.json(clientes);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ message: 'Erro ao buscar clientes', error: error.message });
  }
};

// Obter um cliente específico pelo ID
exports.getClienteById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const cliente = await Cliente.getById(id);

    if (!cliente) {
      return res.status(404).json({ message: `Cliente ID ${id} não encontrado` });
    }

    res.json(cliente);
  } catch (error) {
    console.error(`Erro ao buscar cliente ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erro ao buscar cliente', error: error.message });
  }
};

// Criar um novo cliente
exports.createCliente = async (req, res) => {
  try {
    const { nome, email, telefone } = req.body;

    // Validações
    if (!nome || nome.trim() === '') {
      return res.status(400).json({ message: 'Nome é obrigatório' });
    }

    // Criar o cliente
    const clienteId = await Cliente.create({ nome, email, telefone });

    res.status(201).json({
      message: 'Cliente cadastrado com sucesso',
      cliente_id: clienteId,
    });
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ message: 'Erro ao cadastrar cliente', error: error.message });
  }
};

// Atualizar um cliente existente
exports.updateCliente = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, email, telefone } = req.body;

    // Verificar se o cliente existe
    const cliente = await Cliente.getById(id);
    if (!cliente) {
      return res.status(404).json({ message: `Cliente ID ${id} não encontrado` });
    }

    // Validações
    if (!nome || nome.trim() === '') {
      return res.status(400).json({ message: 'Nome é obrigatório' });
    }

    // Atualizar o cliente
    const success = await Cliente.update(id, { nome, email, telefone });

    if (success) {
      res.json({ message: `Cliente ID ${id} atualizado com sucesso` });
    } else {
      res.status(500).json({ message: 'Erro ao atualizar cliente' });
    }
  } catch (error) {
    console.error(`Erro ao atualizar cliente ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erro ao atualizar cliente', error: error.message });
  }
};

// Excluir um cliente
exports.deleteCliente = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Verificar se o cliente existe
    const cliente = await Cliente.getById(id);
    if (!cliente) {
      return res.status(404).json({ message: `Cliente ID ${id} não encontrado` });
    }

    // Excluir o cliente
    const success = await Cliente.delete(id);

    if (success) {
      res.json({ message: `Cliente ID ${id} excluído com sucesso` });
    } else {
      res.status(500).json({ message: 'Erro ao excluir cliente' });
    }
  } catch (error) {
    console.error(`Erro ao excluir cliente ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erro ao excluir cliente', error: error.message });
  }
};
