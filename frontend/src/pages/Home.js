import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { clientesService, produtosService, vendasService } from '../services/api';
import './Home.css';

const Home = () => {
  const [stats, setStats] = useState({
    clientes: 0,
    produtos: 0,
    vendas: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [clientes, produtos, vendas] = await Promise.all([
          clientesService.getAll(),
          produtosService.getAll(),
          vendasService.getAll(),
        ]);

        setStats({
          clientes: clientes.length,
          produtos: produtos.length,
          vendas: vendas.length,
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <h1>Bem-vindo ao Sistema de Gerenciamento da Floricultura</h1>
        <p>Gerencie clientes, produtos e vendas de forma simples e eficiente.</p>
      </div>

      {!loading && (
        <div className="stats">
          <div className="stat-card">
            <div className="stat-number">{stats.clientes}</div>
            <div className="stat-label">Clientes</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.produtos}</div>
            <div className="stat-label">Produtos</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.vendas}</div>
            <div className="stat-label">Vendas</div>
          </div>
        </div>
      )}

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h2>Clientes</h2>
          <p>Cadastre e gerencie informações dos seus clientes.</p>
          <Link to="/clientes" className="btn btn-primary">
            Gerenciar Clientes
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🌸</div>
          <h2>Produtos</h2>
          <p>Controle seu estoque e catálogo de produtos.</p>
          <Link to="/produtos" className="btn btn-primary">
            Gerenciar Produtos
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💰</div>
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
