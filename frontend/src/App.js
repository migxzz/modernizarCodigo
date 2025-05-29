import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ClientesList from './pages/clientes/ClientesList';
import ClienteForm from './pages/clientes/ClienteForm';
import ProdutosList from './pages/produtos/ProdutosList';
import ProdutoForm from './pages/produtos/ProdutoForm';
import VendasList from './pages/vendas/VendasList';
import VendaForm from './pages/vendas/VendaForm';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Rotas de Clientes */}
          <Route path="/clientes" element={<ClientesList />} />
          <Route path="/clientes/novo" element={<ClienteForm />} />
          <Route path="/clientes/editar/:id" element={<ClienteForm />} />

          {/* Rotas de Produtos */}
          <Route path="/produtos" element={<ProdutosList />} />
          <Route path="/produtos/novo" element={<ProdutoForm />} />
          <Route path="/produtos/editar/:id" element={<ProdutoForm />} />

          {/* Rotas de Vendas */}
          <Route path="/vendas" element={<VendasList />} />
          <Route path="/vendas/nova" element={<VendaForm />} />
          <Route path="/vendas/:id" element={<VendaForm view={true} />} />

          {/* Rota 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
