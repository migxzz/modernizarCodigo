import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>Página não encontrada</h1>
      <p>A página que você está procurando não existe ou foi movida.</p>
      <Link to="/" className="btn btn-primary">
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default NotFound;
