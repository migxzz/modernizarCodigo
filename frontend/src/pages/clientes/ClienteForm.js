import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useClientes } from '../../context/ClienteContext';
import './Clientes.css';

const ClienteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const { addCliente, updateCliente, clientes } = useClientes();

  const [cliente, setCliente] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (isEditMode && clientes.length > 0) {
      const clienteEncontrado = clientes.find(c => c.id === parseInt(id));
      if (clienteEncontrado) {
        setCliente(clienteEncontrado);
      }
    }
  }, [id, isEditMode, clientes]);

  const handleChange = e => {
    const { name, value } = e.target;
    setCliente(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      // Validações básicas
      if (!cliente.nome || !cliente.cpf || !cliente.email) {
        setError('Nome, CPF e email são obrigatórios');
        setLoading(false);
        return;
      }

      let result;
      if (isEditMode) {
        result = await updateCliente(id, cliente);
        if (result.success) {
          setSuccess('Cliente atualizado com sucesso!');
        }
      } else {
        result = await addCliente(cliente);
        if (result.success) {
          setSuccess('Cliente cadastrado com sucesso!');
          // Redirecionar após criar um novo cliente
          setTimeout(() => {
            navigate('/clientes');
          }, 2000);
        }
      }

      if (!result.success) {
        setError(result.error || 'Erro ao salvar cliente');
      }
    } catch (err) {
      setError(err.message || 'Erro ao salvar cliente');
      console.error('Erro ao salvar cliente:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="cliente-form">
      <div className="form-header">
        <h2>{isEditMode ? 'Editar Cliente' : 'Novo Cliente'}</h2>
        <Link to="/clientes" className="btn btn-secondary">
          Voltar
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome *</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={cliente.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cpf">CPF *</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={cliente.cpf}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={cliente.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={cliente.telefone}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
          <Link to="/clientes" className="btn btn-outline">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ClienteForm;
