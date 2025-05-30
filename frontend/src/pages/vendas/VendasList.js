import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { vendasService } from '../../services/api';
import './Vendas.css';

const VendasList = () => {
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const data = await vendasService.getAll();
        setVendas(data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar vendas. Por favor, tente novamente.');
        setLoading(false);
        console.error('Erro ao buscar vendas:', err);
      }
    };

    fetchVendas();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta venda?')) {
      try {
        await vendasService.delete(id);
        setVendas(vendas.filter(venda => venda.id !== id));
      } catch (err) {
        setError('Erro ao excluir venda. Por favor, tente novamente.');
        console.error('Erro ao excluir venda:', err);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  if (loading) {
    return <div className="loading">Carregando vendas...</div>;
  }

  return (
    <div className="vendas-list">
      <div className="page-header">
        <h1>Vendas</h1>
        <Link to="/vendas/nova" className="btn btn-primary">Nova Venda</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {vendas.length === 0 ? (
        <div className="empty-state">
          <p>Nenhuma venda registrada.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Forma de Pagamento</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {vendas.map(venda => (
                <tr key={venda.id}>
                  <td>{venda.id}</td>
                  <td>{venda.cliente_nome}</td>
                  <td>{venda.forma_pagamento}</td>
                  <td>{formatDate(venda.dt_venda)}</td>
                  <td className="actions">
                    <Link to={`/vendas/${venda.id}`} className="btn btn-secondary btn-sm">
                      Detalhes
                    </Link>
                    <button 
                      onClick={() => handleDelete(venda.id)} 
                      className="btn btn-danger btn-sm"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VendasList;