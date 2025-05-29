import React, { createContext, useState, useContext, useEffect } from 'react';
import { produtosService } from '../services/api';

// Criando o contexto de produtos
const ProdutoContext = createContext(null);

// Provedor do contexto de produtos
export const ProdutoProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar produtos ao inicializar
  useEffect(() => {
    fetchProdutos();
  }, []);

  // Buscar todos os produtos
  const fetchProdutos = async () => {
    try {
      setLoading(true);
      const data = await produtosService.getAll();
      setProdutos(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar produtos');
      console.error('Erro ao buscar produtos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar um novo produto
  const addProduto = async (produto) => {
    try {
      const novoProduto = await produtosService.create(produto);
      setProdutos([...produtos, novoProduto]);
      return novoProduto;
    } catch (err) {
      setError('Erro ao adicionar produto');
      throw err;
    }
  };

  // Atualizar um produto existente
  const updateProduto = async (id, produto) => {
    try {
      await produtosService.update(id, produto);
      setProdutos(produtos.map(p => p.id === id ? { ...p, ...produto } : p));
    } catch (err) {
      setError('Erro ao atualizar produto');
      throw err;
    }
  };

  // Excluir um produto
  const deleteProduto = async (id) => {
    try {
      await produtosService.delete(id);
      setProdutos(produtos.filter(p => p.id !== id));
    } catch (err) {
      setError('Erro ao excluir produto');
      throw err;
    }
  };

  // Valores disponibilizados pelo contexto
  const value = {
    produtos,
    loading,
    error,
    fetchProdutos,
    addProduto,
    updateProduto,
    deleteProduto
  };

  return (
    <ProdutoContext.Provider value={value}>
      {children}
    </ProdutoContext.Provider>
  );
};

// Hook personalizado para usar o contexto de produtos
export const useProdutos = () => {
  const context = useContext(ProdutoContext);
  if (!context) {
    throw new Error('useProdutos deve ser usado dentro de um ProdutoProvider');
  }
  return context;
};

export default ProdutoContext;