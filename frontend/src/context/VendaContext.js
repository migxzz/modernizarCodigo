import React, { createContext, useState, useContext, useEffect } from 'react';
import { vendasService } from '../services/api';

// Criando o contexto de vendas
const VendaContext = createContext(null);

// Provedor do contexto de vendas
export const VendaProvider = ({ children }) => {
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar vendas ao inicializar
  useEffect(() => {
    fetchVendas();
  }, []);

  // Buscar todas as vendas
  const fetchVendas = async () => {
    try {
      setLoading(true);
      const data = await vendasService.getAll();
      setVendas(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar vendas');
      console.error('Erro ao buscar vendas:', err);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar uma nova venda
  const addVenda = async venda => {
    try {
      const novaVenda = await vendasService.create(venda);
      setVendas([...vendas, novaVenda]);
      return novaVenda;
    } catch (err) {
      setError('Erro ao adicionar venda');
      throw err;
    }
  };

  // Excluir uma venda
  const deleteVenda = async id => {
    try {
      await vendasService.delete(id);
      setVendas(vendas.filter(v => v.id !== id));
    } catch (err) {
      setError('Erro ao excluir venda');
      throw err;
    }
  };

  // Valores disponibilizados pelo contexto
  const value = {
    vendas,
    loading,
    error,
    fetchVendas,
    addVenda,
    deleteVenda,
  };

  return <VendaContext.Provider value={value}>{children}</VendaContext.Provider>;
};

// Hook personalizado para usar o contexto de vendas
export const useVendas = () => {
  const context = useContext(VendaContext);
  if (!context) {
    throw new Error('useVendas deve ser usado dentro de um VendaProvider');
  }
  return context;
};

export default VendaContext;
