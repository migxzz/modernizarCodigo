import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { produtosService } from '../../services/api';
import './Produtos.css';

const ProdutosList = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const data = await produtosService.getAll();
        setProdutos(data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar produtos. Por favor, tente novamente.');
        setLoading(false);
        console.error('Erro ao buscar produtos:', err);
      }
    };

    fetchProdutos();
  }, []);

  const handleDelete = async id => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await produtosService.delete(id);
        setProdutos(produtos.filter(produto => produto.id !== id));
      } catch (err) {
        setError('Erro ao excluir produto. Por favor, tente novamente.');
        console.error('Erro ao excluir produto:', err);
      }
    }
  };

  const formatCurrency = value => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (loading) {
    return <div className="loading">Carregando produtos...</div>;
  }

  return (
    <div className="produtos-list">
      <div className="page-header">
        <h1>Produtos</h1>
        <Link to="/produtos/novo" className="btn btn-primary">
          Novo Produto
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {produtos.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum produto cadastrado.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map(produto => (
                <tr key={produto.id}>
                  <td>{produto.id}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.descricao || '-'}</td>
                  <td>{formatCurrency(produto.preco)}</td>
                  <td>{produto.estoque}</td>
                  <td className="actions">
                    <Link
                      to={`/produtos/editar/${produto.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(produto.id)}
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

export default ProdutosList;
