import axios from 'axios';

// Criando uma instância do axios com a URL base da API
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

// Serviços para Clientes
export const clientesService = {
  getAll: async () => {
    const response = await api.get('/clientes');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
  },
  
  create: async (cliente) => {
    const response = await api.post('/clientes', cliente);
    return response.data;
  },
  
  update: async (id, cliente) => {
    const response = await api.put(`/clientes/${id}`, cliente);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/clientes/${id}`);
    return response.data;
  }
};

// Serviços para Produtos
export const produtosService = {
  getAll: async () => {
    const response = await api.get('/produtos');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/produtos/${id}`);
    return response.data;
  },
  
  create: async (produto) => {
    const response = await api.post('/produtos', produto);
    return response.data;
  },
  
  update: async (id, produto) => {
    const response = await api.put(`/produtos/${id}`, produto);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/produtos/${id}`);
    return response.data;
  }
};

// Serviços para Vendas
export const vendasService = {
  getAll: async () => {
    const response = await api.get('/vendas');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/vendas/${id}`);
    return response.data;
  },
  
  create: async (venda) => {
    const response = await api.post('/vendas', venda);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/vendas/${id}`);
    return response.data;
  }
};

export default api;