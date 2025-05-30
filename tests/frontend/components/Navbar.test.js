// Teste básico para verificar se o Jest está funcionando
describe('Teste básico frontend', () => {
  it('deve passar', () => {
    expect(true).toBe(true);
  });
});

// Testes reais seriam implementados aqui
// Por exemplo:

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../../frontend/src/components/Navbar';

describe('Navbar Component', () => {
  it('deve renderizar o componente corretamente', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    // Verifica se elementos importantes estão presentes
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});