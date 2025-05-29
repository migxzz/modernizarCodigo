// Controller de Vendas
const Venda = require('../models/Venda');
const Cliente = require('../models/Cliente');
const Produto = require('../models/Produto');

// Obter todas as vendas
exports.getAllVendas = async (req, res) => {
  try {
    const vendas = await Venda.getAllWithDetails();
    res.json(vendas);
  } catch (error) {
    console.error('Erro ao buscar vendas:', error);
    res.status(500).json({ message: 'Erro ao buscar vendas', error: error.message });
  }
};

// Obter uma venda específica pelo ID
exports.getVendaById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const venda = await Venda.getById(id);

    if (!venda) {
      return res.status(404).json({ message: `Venda ID ${id} não encontrada` });
    }

    res.json(venda);
  } catch (error) {
    console.error(`Erro ao buscar venda ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erro ao buscar venda', error: error.message });
  }
};

// Criar uma nova venda
exports.createVenda = async (req, res) => {
  try {
    const { cliente_id, forma_pagamento, itens } = req.body;

    // Validações
    if (!cliente_id || !forma_pagamento || !itens || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({
        message:
          'Dados inválidos. Verifique se cliente_id, forma_pagamento e itens foram fornecidos corretamente',
      });
    }

    // Verificar se o cliente existe
    const cliente = await Cliente.getById(cliente_id);
    if (!cliente) {
      return res.status(404).json({ message: `Cliente ID ${cliente_id} não encontrado` });
    }

    // Validar cada item da venda
    for (const item of itens) {
      if (!item.produto_id || !item.quantidade || item.quantidade <= 0) {
        return res.status(400).json({
          message: 'Dados de item inválidos. Cada item deve ter produto_id e quantidade > 0',
        });
      }

      // Verificar se o produto existe
      const produto = await Produto.getById(item.produto_id);
      if (!produto) {
        return res.status(404).json({ message: `Produto ID ${item.produto_id} não encontrado` });
      }
    }

    // Criar a venda
    const vendaId = await Venda.create({ cliente_id, forma_pagamento }, itens);

    res.status(201).json({
      message: 'Venda registrada com sucesso',
      venda_id: vendaId,
    });
  } catch (error) {
    console.error('Erro ao criar venda:', error);
    res.status(500).json({ message: 'Erro ao registrar venda', error: error.message });
  }
};

// Excluir uma venda
exports.deleteVenda = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Verificar se a venda existe
    const venda = await Venda.getById(id);
    if (!venda) {
      return res.status(404).json({ message: `Venda ID ${id} não encontrada` });
    }

    // Excluir a venda
    await Venda.delete(id);

    res.json({ message: `Venda ID ${id} excluída com sucesso` });
  } catch (error) {
    console.error(`Erro ao excluir venda ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erro ao excluir venda', error: error.message });
  }
};
