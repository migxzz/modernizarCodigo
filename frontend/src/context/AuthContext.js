import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

// Criando o contexto de autenticação
const AuthContext = createContext(null);

// Provedor do contexto de autenticação
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verificar autenticação ao carregar a página
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Função de login
  const login = async (email, senha) => {
    const result = await authService.login(email, senha);
    setIsAuthenticated(true);
    return result;
  };

  // Função de registro
  const register = async userData => {
    return await authService.register(userData);
  };

  // Função de logout
  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  // Valores disponibilizados pelo contexto
  const value = {
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export default AuthContext;
