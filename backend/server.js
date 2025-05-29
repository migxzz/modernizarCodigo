// Servidor principal da aplicação
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { testConnection } = require('./config/database');

// Carregar variáveis de ambiente
dotenv.config();

// Importar rotas
const clientesRoutes = require('./routes/clientesRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const vendasRoutes = require('./routes/vendasRoutes');

// Importar middleware de erro
const errorHandler = require('./middleware/errorHandler');

// Inicializar o app Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/clientes', clientesRoutes);
app.use('/api/produtos', produtosRoutes);
app.use('/api/vendas', vendasRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API da Floricultura funcionando!' });
});

// Middleware de tratamento de erros
app.use(errorHandler);

// Iniciar o servidor
const startServer = async () => {
  try {
    // Testar conexão com o banco de dados
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('Não foi possível conectar ao banco de dados. Verifique as configurações.');
      process.exit(1);
    }
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};

startServer();