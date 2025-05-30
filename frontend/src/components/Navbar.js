import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Floricultura</h1>
        <nav className="navbar-menu">
          <ul>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/">Início</Link>
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;