import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clientesService } from '../../services/api';
import './Clientes.css';

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await clientesService.getAll();
        setClientes(data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar clientes. Por favor, tente novamente.');
        setLoading(false);
        console.error('Erro ao buscar clientes:', err);
      }
    };

    fetchClientes();
  }, []);

  const handleDelete = async id => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await clientesService.delete(id);
        setClientes(clientes.filter(cliente => cliente.id !== id));
      } catch (err) {
        setError('Erro ao excluir cliente. Por favor, tente novamente.');
        console.error('Erro ao excluir cliente:', err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Carregando clientes...</div>;
  }

  return (
    <div className="clientes-list">
      <div className="page-header">
        <h1>Clientes</h1>
        <Link to="/clientes/novo" className="btn btn-primary">
          Novo Cliente
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {clientes.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum cliente cadastrado.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.email || '-'}</td>
                  <td>{cliente.telefone || '-'}</td>
                  <td className="actions">
                    <Link
                      to={`/clientes/editar/${cliente.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(cliente.id)}
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

export default ClientesList;
