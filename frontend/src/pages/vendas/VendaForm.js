import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { vendasService, clientesService, produtosService } from '../../services/api';
import { useVendas } from '../../context/VendaContext';
import { useProdutos } from '../../context/ProdutoContext';
import './Vendas.css';

const VendaForm = ({ view = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isViewMode = view || (id && view !== false);

  // Acessar os contextos
  const { fetchVendas } = useVendas();
  const { fetchProdutos } = useProdutos();

  const [venda, setVenda] = useState({
    cliente_id: '',
    forma_pagamento: '',
    itens: [{ produto_id: '', quantidade: 1 }],
  });

  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carregar clientes e produtos
        const [clientesData, produtosData] = await Promise.all([
          clientesService.getAll(),
          produtosService.getAll(),
        ]);

        setClientes(clientesData);
        setProdutos(produtosData);

        // Se estiver no modo de visualização ou edição, carregar dados da venda
        if (id) {
          const vendaData = await vendasService.getById(id);
          setVenda({
            cliente_id: vendaData.cliente_id,
            forma_pagamento: vendaData.forma_pagamento,
            itens: vendaData.itens.map(item => ({
              produto_id: item.produto_id,
              quantidade: item.quantidade,
            })),
          });
        }

        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados. Por favor, tente novamente.');
        setLoading(false);
        console.error('Erro ao buscar dados:', err);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setVenda(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItens = [...venda.itens];
    updatedItens[index] = { ...updatedItens[index], [name]: value };
    setVenda(prev => ({ ...prev, itens: updatedItens }));
  };

  const addItem = () => {
    setVenda(prev => ({
      ...prev,
      itens: [...prev.itens, { produto_id: '', quantidade: 1 }],
    }));
  };

  const removeItem = index => {
    const updatedItens = [...venda.itens];
    updatedItens.splice(index, 1);
    setVenda(prev => ({ ...prev, itens: updatedItens }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (isViewMode) return;

    try {
      // Validações básicas
      if (!venda.cliente_id) {
        setError('Selecione um cliente.');
        return;
      }

      if (!venda.forma_pagamento) {
        setError('Informe a forma de pagamento.');
        return;
      }

      if (venda.itens.length === 0) {
        setError('Adicione pelo menos um item à venda.');
        return;
      }

      for (const item of venda.itens) {
        if (!item.produto_id || !item.quantidade || item.quantidade <= 0) {
          setError('Todos os itens devem ter um produto selecionado e quantidade maior que zero.');
          return;
        }
      }

      // Enviar dados para a API
      await vendasService.create(venda);

      // Atualizar os contextos
      await Promise.all([
        fetchVendas(), // Atualiza a lista de vendas
        fetchProdutos(), // Atualiza a lista de produtos (estoque)
      ]);

      setSuccess('Venda registrada com sucesso!');
      setTimeout(() => {
        navigate('/vendas');
      }, 2000);
    } catch (err) {
      setError('Erro ao registrar venda. Por favor, tente novamente.');
      console.error('Erro ao registrar venda:', err);
    }
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="venda-form">
      <div className="page-header">
        <h1>{isViewMode ? 'Detalhes da Venda' : 'Nova Venda'}</h1>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Informações da Venda</h2>

          <div className="form-group">
            <label htmlFor="cliente_id">Cliente</label>
            <select
              id="cliente_id"
              name="cliente_id"
              value={venda.cliente_id}
              onChange={handleChange}
              disabled={isViewMode}
              required
            >
              <option value="">Selecione um cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="forma_pagamento">Forma de Pagamento</label>
            <select
              id="forma_pagamento"
              name="forma_pagamento"
              value={venda.forma_pagamento}
              onChange={handleChange}
              disabled={isViewMode}
              required
            >
              <option value="">Selecione</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de Crédito">Cartão de Crédito</option>
              <option value="Cartão de Débito">Cartão de Débito</option>
              <option value="PIX">PIX</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h2>Itens da Venda</h2>

          <div className="itens-venda">
            {venda.itens.map((item, index) => (
              <div key={index} className="item-row">
                <div className="form-group">
                  <label htmlFor={`produto_id_${index}`}>Produto</label>
                  <select
                    id={`produto_id_${index}`}
                    name="produto_id"
                    value={item.produto_id}
                    onChange={e => handleItemChange(index, e)}
                    disabled={isViewMode}
                    required
                  >
                    <option value="">Selecione um produto</option>
                    {produtos.map(produto => (
                      <option key={produto.id} value={produto.id}>
                        {produto.nome} - R$ {produto.preco.toFixed(2)} - Estoque:{' '}
                        {produto.quantidade}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor={`quantidade_${index}`}>Quantidade</label>
                  <input
                    type="number"
                    id={`quantidade_${index}`}
                    name="quantidade"
                    value={item.quantidade}
                    onChange={e => handleItemChange(index, e)}
                    min="1"
                    disabled={isViewMode}
                    required
                  />
                </div>

                {!isViewMode && venda.itens.length > 1 && (
                  <button
                    type="button"
                    className="remove-item-btn"
                    onClick={() => removeItem(index)}
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}

            {!isViewMode && (
              <button type="button" className="btn btn-secondary add-item-btn" onClick={addItem}>
                Adicionar Item
              </button>
            )}
          </div>
        </div>

        <div className="form-actions">
          <Link to="/vendas" className="btn btn-secondary">
            Voltar
          </Link>

          {!isViewMode && (
            <button type="submit" className="btn btn-primary">
              Registrar Venda
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default VendaForm;
