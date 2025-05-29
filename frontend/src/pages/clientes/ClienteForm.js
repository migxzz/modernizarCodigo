import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { clientesService } from '../../services/api';
import './Clientes.css';

const ClienteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [cliente, setCliente] = useState({
    nome: '',
    email: '',
    telefone: ''
  });
  
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchCliente = async () => {
      if (!isEditMode) return;
      
      try {
        const data = await clientesService.getById(id);
        setCliente({
          nome: data.nome,
          email: data.email || '',
          telefone: data.telefone || ''
        });
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados do cliente. Por favor, tente novamente.');
        setLoading(false);
        console.error('Erro ao buscar cliente:', err);
      }
    };

    fetchCliente();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validações básicas
      if (!cliente.nome.trim()) {
        setError('Nome é obrigatório.');
        return;
      }
      
      if (isEditMode) {
        await clientesService.update(id, cliente);
        setSuccess('Cliente atualizado com sucesso!');
      } else {
        await clientesService.create(cliente);
        setSuccess('Cliente cadastrado com sucesso!');
      }
      
      setTimeout(() => {
        navigate('/clientes');
      }, 2000);
    } catch (err) {
      setError(`Erro ao ${isEditMode ? 'atualizar' : 'cadastrar'} cliente. Por favor, tente novamente.`);
      console.error(`Erro ao ${isEditMode ? 'atualizar' : 'cadastrar'} cliente:`, err);
    }
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="cliente-form">
      <div className="page-header">
        <h1>{isEditMode ? 'Editar Cliente' : 'Novo Cliente'}</h1>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={cliente.email}
            onChange={handleChange}
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
          <Link to="/clientes" className="btn btn-secondary">
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary">
            {isEditMode ? 'Atualizar' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClienteForm;