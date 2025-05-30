import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import ClientesList from './pages/clientes/ClientesList';
import ClienteForm from './pages/clientes/ClienteForm';
import ProdutosList from './pages/produtos/ProdutosList';
import ProdutoForm from './pages/produtos/ProdutoForm';
import VendasList from './pages/vendas/VendasList';
import VendaForm from './pages/vendas/VendaForm';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';

// Providers de contexto
import { AuthProvider } from './context/AuthContext';
import { ClienteProvider } from './context/ClienteContext';
import { ProdutoProvider } from './context/ProdutoContext';
import { VendaProvider } from './context/VendaContext';

function App() {
  return (
    <AuthProvider>
      <ClienteProvider>
        <ProdutoProvider>
          <VendaProvider>
            <div className="app">
              <Navbar />
              <div className="container">
                <Routes>
                  {/* Rotas públicas */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />

                  {/* Rotas protegidas */}
                  <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />

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
                  </Route>

                  {/* Rota 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </VendaProvider>
        </ProdutoProvider>
      </ClienteProvider>
    </AuthProvider>
  );
}

export default App;
