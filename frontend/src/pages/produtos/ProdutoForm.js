import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProdutos } from '../../context/ProdutoContext';
import './Produtos.css';

const ProdutoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const { produtos, addProduto, updateProduto } = useProdutos();

  const [produto, setProduto] = useState({
    nome: '',
    descricao: '',
    preco: '',
    quantidade: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (isEditMode && produtos.length > 0) {
      const produtoEncontrado = produtos.find(p => p.id === parseInt(id));
      if (produtoEncontrado) {
        setProduto({
          nome: produtoEncontrado.nome,
          descricao: produtoEncontrado.descricao || '',
          preco: produtoEncontrado.preco,
          quantidade: produtoEncontrado.quantidade,
        });
      }
    }
  }, [id, isEditMode, produtos]);

  const handleChange = e => {
    const { name, value } = e.target;
    setProduto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      // Validações básicas
      if (!produto.nome.trim()) {
        setError('Nome é obrigatório.');
        setLoading(false);
        return;
      }

      if (!produto.preco || isNaN(produto.preco) || parseFloat(produto.preco) <= 0) {
        setError('Preço deve ser um número maior que zero.');
        setLoading(false);
        return;
      }

      const produtoData = {
        ...produto,
        preco: parseFloat(produto.preco),
        quantidade: parseInt(produto.quantidade),
      };

      console.log('Enviando produto:', produtoData);

      let result;
      if (isEditMode) {
        result = await updateProduto(id, produtoData);
      } else {
        result = await addProduto(produtoData);
      }

      if (result.success) {
        setSuccess(`Produto ${isEditMode ? 'atualizado' : 'cadastrado'} com sucesso!`);
        setTimeout(() => {
          navigate('/produtos');
        }, 2000);
      } else {
        setError(result.error || `Erro ao ${isEditMode ? 'atualizar' : 'cadastrar'} produto.`);
      }
    } catch (err) {
      setError(
        `Erro ao ${isEditMode ? 'atualizar' : 'cadastrar'} produto. Por favor, tente novamente.`
      );
      console.error(`Erro ao ${isEditMode ? 'atualizar' : 'cadastrar'} produto:`, err);
    } finally {
      setLoading(false);
    }
  };

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
          <label htmlFor="quantidade">Quantidade *</label>
          <input
            type="number"
            id="quantidade"
            name="quantidade"
            value={produto.quantidade}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="form-actions">
          <Link to="/produtos" className="btn btn-secondary">
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Salvando...' : isEditMode ? 'Atualizar' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProdutoForm;
