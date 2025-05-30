import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Floricultura</h3>
            <p>Sistema de gerenciamento para sua floricultura.</p>
          </div>

          <div className="footer-section">
            <h3>Links Rápidos</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/clientes">Clientes</Link>
              </li>
              <li>
                <Link to="/produtos">Produtos</Link>
              </li>
              <li>
                <Link to="/vendas">Vendas</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contato</h3>
            <ul className="footer-links">
              <li>Email: contato@floricultura.com</li>
              <li>Telefone: (11) 1234-5678</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Floricultura. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
