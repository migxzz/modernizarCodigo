import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import logoImage from '../assets/logo.png';

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logoImage} alt="Logo" className="logo-img" />
          <h1>Floricultura</h1>
        </div>
        <nav className="navbar-menu">
          <ul>
            {isAuthenticated ? (
              <>
                <li className={location.pathname === '/dashboard' ? 'active' : ''}>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className={location.pathname.includes('/clientes') ? 'active' : ''}>
                  <Link to="/clientes">Clientes</Link>
                </li>
                <li className={location.pathname.includes('/produtos') ? 'active' : ''}>
                  <Link to="/produtos">Produtos</Link>
                </li>
                <li className={location.pathname.includes('/vendas') ? 'active' : ''}>
                  <Link to="/vendas">Vendas</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-button">
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className={location.pathname === '/' ? 'active' : ''}>
                  <Link to="/">Início</Link>
                </li>
                <li className={location.pathname === '/login' ? 'active' : ''}>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
