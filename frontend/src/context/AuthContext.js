import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um token no localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Aqui você poderia fazer uma chamada para verificar o token
      // Por simplicidade, apenas definimos o usuário como autenticado
      setUser({ authenticated: true });
    }
    setLoading(false);
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await authService.login({ email, senha });
      localStorage.setItem('token', response.token);
      setUser({ authenticated: true });
      return { success: true };
    } catch (error) {
      console.error('Erro no login:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao fazer login',
      };
    }
  };

  const register = async (email, senha) => {
    try {
      const response = await authService.register({ email, senha });
      localStorage.setItem('token', response.token);
      setUser({ authenticated: true });
      return { success: true };
    } catch (error) {
      console.error('Erro no registro:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao registrar',
      };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
