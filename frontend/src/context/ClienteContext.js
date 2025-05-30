import React, { createContext, useState, useContext, useEffect } from 'react';
import { clientesService } from '../services/api';

const ClienteContext = createContext();

export const ClienteProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const data = await clientesService.getAll();
      setClientes(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar clientes');
      console.error('Erro ao buscar clientes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const addCliente = async cliente => {
    try {
      const response = await clientesService.create(cliente);
      await fetchClientes(); // Recarregar a lista após adicionar
      return { success: true, data: response };
    } catch (err) {
      console.error('Erro ao adicionar cliente:', err);
      return { success: false, error: err.message };
    }
  };

  const updateCliente = async (id, cliente) => {
    try {
      const response = await clientesService.update(id, cliente);
      await fetchClientes(); // Recarregar a lista após atualizar
      return { success: true, data: response };
    } catch (err) {
      console.error('Erro ao atualizar cliente:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteCliente = async id => {
    try {
      await clientesService.delete(id);
      await fetchClientes(); // Recarregar a lista após excluir
      return { success: true };
    } catch (err) {
      console.error('Erro ao excluir cliente:', err);
      return { success: false, error: err.message };
    }
  };

  return (
    <ClienteContext.Provider
      value={{
        clientes,
        loading,
        error,
        fetchClientes,
        addCliente,
        updateCliente,
        deleteCliente,
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
};

export const useClientes = () => {
  const context = useContext(ClienteContext);
  if (!context) {
    throw new Error('useClientes deve ser usado dentro de um ClienteProvider');
  }
  return context;
};

export default ClienteContext;
