import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { produtosService } from '../../services/api';
import './Produtos.css';

const ProdutoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [produto, setProduto] = useState({
    nome: '',
    descricao: '',
    preco: '',
    estoque: 0
  });
  
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProduto = async () => {
      if (!isEditMode) return;
      
      try {
        const data = await produtosService.getById(id);
        setProduto({
          nome: data.nome,
          descricao: data.descricao || '',
          preco: data.preco,
          estoque: data.estoque
        });
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados do produto. Por favor, tente novamente.');
        setLoading(false);
        console.error('Erro ao buscar produto:', err);
      }
    };

    fetchProduto();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validações básicas
      if (!produto.nome.trim()) {
        setError('Nome é obrigatório.');
        return;
      }
      
      if (!produto.preco || isNaN(produto.preco) || parseFloat(produto.preco) <= 0) {
        setError('Preço deve ser um número maior que zero.');
        return;
      }
      
      const produtoData = {
        ...produto,
        preco: parseFloat(produto.preco),
        estoque: parseInt(produto.estoque)
      };
      
      if (isEditMode) {
        await produtosService.update(id, produtoData);
        setSuccess('Produto atualizado com sucesso!');
      } else {
        await produtosService.create(produtoData);
        setSuccess('Produto cadastrado com sucesso!');
      }
      
      setTimeout(() => {
        navigate('/produtos');
      }, 2000);
    } catch (err) {
      setError(`Erro ao ${isEditMode ? 'atualizar' : 'cadastrar'} produto. Por favor, tente novamente.`);
      console.error(`Erro ao ${isEditMode ? 'atualizar' : 'cadastrar'} produto:`, err);
    }
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="produto-form">
      <div className="page-header">
        <h1>{isEditMode ? 'Editar Produto' : 'Novo Produto'}</h1>
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
            value={produto.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            value={produto.descricao}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="preco">Preço *</label>
          <div className="price-input">
            <input
              type="number"
              id="preco"
              name="preco"
              value={produto.preco}
              onChange={handleChange}
              step="0.01"
              min="0.01"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="estoque">Estoque</label>
          <input
            type="number"
            id="estoque"
            name="estoque"
            value={produto.estoque}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-actions">
          <Link to="/produtos" className="btn btn-secondary">
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

export default ProdutoForm;