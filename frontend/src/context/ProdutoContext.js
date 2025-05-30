import React, { createContext, useState, useContext, useEffect } from 'react';
import { produtosService } from '../services/api';

const ProdutoContext = createContext();

export const ProdutoProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchProdutos();
  }, []);

  const addProduto = async produto => {
    try {
      const response = await produtosService.create(produto);
      await fetchProdutos();
      return { success: true, data: response };
    } catch (err) {
      console.error('Erro ao adicionar produto:', err);
      return { success: false, error: err.message };
    }
  };

  const updateProduto = async (id, produto) => {
    try {
      const response = await produtosService.update(id, produto);
      await fetchProdutos();
      return { success: true, data: response };
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteProduto = async id => {
    try {
      await produtosService.delete(id);
      await fetchProdutos();
      return { success: true };
    } catch (err) {
      console.error('Erro ao excluir produto:', err);
      return { success: false, error: err.message };
    }
  };

  return (
    <ProdutoContext.Provider
      value={{
        produtos,
        loading,
        error,
        fetchProdutos,
        addProduto,
        updateProduto,
        deleteProduto,
      }}
    >
      {children}
    </ProdutoContext.Provider>
  );
};

export const useProdutos = () => {
  const context = useContext(ProdutoContext);
  if (!context) {
    throw new Error('useProdutos deve ser usado dentro de um ProdutoProvider');
  }
  return context;
};

export default ProdutoContext;
