import React from 'react';
import { Link } from 'react-router-dom';
import { useClientes } from '../../context/ClienteContext';
import './Clientes.css';

const ClientesList = () => {
  const { clientes, loading, error, deleteCliente } = useClientes();

  const handleDelete = async id => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await deleteCliente(id);
      } catch (err) {
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