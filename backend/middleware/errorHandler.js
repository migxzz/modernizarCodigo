// Middleware para tratamento de erros
const errorHandler = (err, req, res, next) => {
  console.error(`Erro: ${err.message}`);
  console.error(err.stack);
  
  res.status(err.statusCode || 500).json({
    message: err.message || 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack
  });
};

module.exports = errorHandler;