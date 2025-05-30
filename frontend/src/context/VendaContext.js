import React, { createContext, useState, useContext, useEffect } from 'react';
import { vendasService } from '../services/api';

const VendaContext = createContext();

export const VendaProvider = ({ children }) => {
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchVendas();
  }, []);

  const addVenda = async venda => {
    try {
      const response = await vendasService.create(venda);
      await fetchVendas();
      return { success: true, data: response };
    } catch (err) {
      console.error('Erro ao adicionar venda:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteVenda = async id => {
    try {
      await vendasService.delete(id);
      await fetchVendas();
      return { success: true };
    } catch (err) {
      console.error('Erro ao excluir venda:', err);
      return { success: false, error: err.message };
    }
  };

  return (
    <VendaContext.Provider
      value={{
        vendas,
        loading,
        error,
        fetchVendas,
        addVenda,
        deleteVenda,
      }}
    >
      {children}
    </VendaContext.Provider>
  );
};

export const useVendas = () => {
  const context = useContext(VendaContext);
  if (!context) {
    throw new Error('useVendas deve ser usado dentro de um VendaProvider');
  }
  return context;
};

export default VendaContext;
