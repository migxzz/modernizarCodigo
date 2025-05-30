import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Componente para proteger rotas que requerem autenticação
const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Enquanto verifica a autenticação, mostra um indicador de carregamento
  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  // Se não estiver autenticado, redireciona para a página de login
  // Se estiver autenticado, renderiza o componente filho (Outlet)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
