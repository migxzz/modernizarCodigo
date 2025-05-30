import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ClientesList from '../../../../frontend/src/pages/clientes/ClientesList';
import { ClienteContext } from '../../../../frontend/src/context/ClienteContext';

// Mock do contexto
const mockClientes = [
  { id: 1, nome: 'Cliente 1', email: 'cliente1@example.com', telefone: '11999999991' },
  { id: 2, nome: 'Cliente 2', email: 'cliente2@example.com', telefone: '11999999992' }
];

const mockContextValue = {
  clientes: mockClientes,
  loading: false,
  error: null,
  getClientes: jest.fn()
};

describe('ClientesList Component', () => {
  it('deve renderizar a lista de clientes', async () => {
    render(
      <BrowserRouter>
        <ClienteContext.Provider value={mockContextValue}>
          <ClientesList />
        </ClienteContext.Provider>
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Cliente 1')).toBeInTheDocument();
      expect(screen.getByText('Cliente 2')).toBeInTheDocument();
    });
  });

  it('deve mostrar mensagem de carregamento', async () => {
    render(
      <BrowserRouter>
        <ClienteContext.Provider value={{ ...mockContextValue, loading: true }}>
          <ClientesList />
        </ClienteContext.Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });
});
