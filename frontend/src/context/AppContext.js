import React, { createContext, useContext } from 'react';
import { AuthProvider } from './AuthContext';
import { ClienteProvider } from './ClienteContext';
import { ProdutoProvider } from './ProdutoContext';
import { VendaProvider } from './VendaContext';

// Contexto compartilhado para comunicação entre os diferentes contextos
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ClienteProvider>
        <ProdutoProvider>
          <VendaProvider>{children}</VendaProvider>
        </ProdutoProvider>
      </ClienteProvider>
    </AuthProvider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
