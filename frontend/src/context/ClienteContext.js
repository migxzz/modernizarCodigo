import React, { createContext, useState, useContext, useEffect } from 'react';
import { clientesService } from '../services/api';

// Criando o contexto de clientes
const ClienteContext = createContext(null);

// Provedor do contexto de clientes
export const ClienteProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar clientes ao inicializar
  useEffect(() => {
    fetchClientes();
  }, []);

  // Buscar todos os clientes
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

  // Adicionar um novo cliente
  const addCliente = async cliente => {
    try {
      const novoCliente = await clientesService.create(cliente);
      setClientes([...clientes, novoCliente]);
      return novoCliente;
    } catch (err) {
      setError('Erro ao adicionar cliente');
      throw err;
    }
  };

  // Atualizar um cliente existente
  const updateCliente = async (id, cliente) => {
    try {
      await clientesService.update(id, cliente);
      setClientes(clientes.map(c => (c.id === id ? { ...c, ...cliente } : c)));
    } catch (err) {
      setError('Erro ao atualizar cliente');
      throw err;
    }
  };

  // Excluir um cliente
  const deleteCliente = async id => {
    try {
      await clientesService.delete(id);
      setClientes(clientes.filter(c => c.id !== id));
    } catch (err) {
      setError('Erro ao excluir cliente');
      throw err;
    }
  };

  // Valores disponibilizados pelo contexto
  const value = {
    clientes,
    loading,
    error,
    fetchClientes,
    addCliente,
    updateCliente,
    deleteCliente,
  };

  return <ClienteContext.Provider value={value}>{children}</ClienteContext.Provider>;
};

// Hook personalizado para usar o contexto de clientes
export const useClientes = () => {
  const context = useContext(ClienteContext);
  if (!context) {
    throw new Error('useClientes deve ser usado dentro de um ClienteProvider');
  }
  return context;
};

export default ClienteContext;
