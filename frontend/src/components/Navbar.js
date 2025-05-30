import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Floricultura
        </Link>

        {isAuthenticated ? (
          <>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/clientes" className="nav-link">
                  Clientes
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/produtos" className="nav-link">
                  Produtos
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/vendas" className="nav-link">
                  Vendas
                </Link>
              </li>
            </ul>
            <div className="nav-auth">
              <button onClick={handleLogout} className="btn-logout">
                Sair
              </button>
            </div>
          </>
        ) : (
          <div className="nav-auth">
            <Link to="/login" className="btn-login">
              Login
            </Link>
            <Link to="/register" className="btn-register">
              Registrar
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
