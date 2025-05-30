import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Bem-vindo ao sistema de gerenciamento</p>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>Clientes</h2>
          <p>Gerenciar cadastro de clientes</p>
          <Link to="/clientes" className="dashboard-link">
            Acessar
          </Link>
        </div>

        <div className="dashboard-card">
          <h2>Produtos</h2>
          <p>Gerenciar catálogo de produtos</p>
          <Link to="/produtos" className="dashboard-link">
            Acessar
          </Link>
        </div>

        <div className="dashboard-card">
          <h2>Vendas</h2>
          <p>Gerenciar registro de vendas</p>
          <Link to="/vendas" className="dashboard-link">
            Acessar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
