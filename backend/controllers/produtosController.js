// Controller de Produtos
const Produto = require('../models/Produto');

// Obter todos os produtos
exports.getAllProdutos = async (req, res) => {
  try {
    const produtos = await Produto.getAll();
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ message: 'Erro ao buscar produtos', error: error.message });
  }
};

// Obter um produto específico pelo ID
exports.getProdutoById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const produto = await Produto.getById(id);
    
    if (!produto) {
      return res.status(404).json({ message: `Produto ID ${id} não encontrado` });
    }
    
    res.json(produto);
  } catch (error) {
    console.error(`Erro ao buscar produto ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erro ao buscar produto', error: error.message });
  }
};

// Criar um novo produto
exports.createProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, estoque } = req.body;
    
    // Validações
    if (!nome || nome.trim() === '') {
      return res.status(400).json({ message: 'Nome é obrigatório' });
    }
    
    if (!preco || isNaN(preco) || parseFloat(preco) <= 0) {
      return res.status(400).json({ message: 'Preço deve ser um número maior que zero' });
    }
    
    // Criar o produto
    const produtoId = await Produto.create({ 
      nome, 
      descricao: descricao || '', 
      preco: parseFloat(preco), 
      estoque: estoque ? parseInt(estoque) : 0 
    });
    
    res.status(201).json({ 
      message: 'Produto cadastrado com sucesso', 
      produto_id: produtoId 
    });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ message: 'Erro ao cadastrar produto', error: error.message });
  }
};

// Atualizar um produto existente
exports.updateProduto = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, descricao, preco, estoque } = req.body;
    
    // Verificar se o produto existe
    const produto = await Produto.getById(id);
    if (!produto) {
      return res.status(404).json({ message: `Produto ID ${id} não encontrado` });
    }
    
    // Validações
    if (!nome || nome.trim() === '') {
      return res.status(400).json({ message: 'Nome é obrigatório' });
    }
    
    if (!preco || isNaN(preco) || parseFloat(preco) <= 0) {
      return res.status(400).json({ message: 'Preço deve ser um número maior que zero' });
    }
    
    // Atualizar o produto
    const success = await Produto.update(id, { 
      nome, 
      descricao: descricao || '', 
      preco: parseFloat(preco), 
      estoque: estoque ? parseInt(estoque) : 0 
    });
    
    if (success) {
      res.json({ message: `Produto ID ${id} atualizado com sucesso` });
    } else {
      res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
  } catch (error) {
    console.error(`Erro ao atualizar produto ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erro ao atualizar produto', error: error.message });
  }
};

// Excluir um produto
exports.deleteProduto = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    // Verificar se o produto existe
    const produto = await Produto.getById(id);
    if (!produto) {
      return res.status(404).json({ message: `Produto ID ${id} não encontrado` });
    }
    
    // Excluir o produto
    const success = await Produto.delete(id);
    
    if (success) {
      res.json({ message: `Produto ID ${id} excluído com sucesso` });
    } else {
      res.status(500).json({ message: 'Erro ao excluir produto' });
    }
  } catch (error) {
    console.error(`Erro ao excluir produto ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erro ao excluir produto', error: error.message });
  }
};