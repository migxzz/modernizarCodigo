import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Bem-vindo ao Sistema de Gerenciamento da Floricultura</h1>
        <p>Gerencie clientes, produtos e vendas de forma simples e eficiente.</p>
      </div>

      <div className="features">
        <div className="feature-card">
          <h2>Clientes</h2>
          <p>Cadastre e gerencie informações dos seus clientes.</p>
          <Link to="/clientes" className="btn btn-primary">
            Gerenciar Clientes
          </Link>
        </div>

        <div className="feature-card">
          <h2>Produtos</h2>
          <p>Controle seu estoque e catálogo de produtos.</p>
          <Link to="/produtos" className="btn btn-primary">
            Gerenciar Produtos
          </Link>
        </div>

        <div className="feature-card">
          <h2>Vendas</h2>
          <p>Registre vendas e acompanhe o histórico de transações.</p>
          <Link to="/vendas" className="btn btn-primary">
            Gerenciar Vendas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
