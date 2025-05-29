import api from './api';

// Serviço de autenticação
const authService = {
  // Login do usuário
  login: async (email, senha) => {
    try {
      const response = await api.post('/auth/login', { email, senha });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },

  // Logout do usuário
  logout: () => {
    localStorage.removeItem('token');
  },

  // Verificar se o usuário está autenticado
  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  },

  // Obter o token JWT
  getToken: () => {
    return localStorage.getItem('token');
  }
};

export default authService;