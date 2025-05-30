import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { testConnection } from './config/database';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

// Carrega as variáveis de ambiente
dotenv.config();

// Inicializa o app Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Floricultura',
      version: '1.0.0',
      description: 'Documentação da API da Floricultura',
      contact: {
        name: 'Suporte',
        email: 'suporte@floricultura.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Testa a conexão com o banco de dados
testConnection()
  .then(() => {
    console.log('Banco de dados conectado e pronto para uso');
  })
  .catch((error) => {
    console.error('Falha ao conectar ao banco de dados:', error);
  });

// Rota básica para teste
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API funcionando!' });
});

// Rotas da API
app.use('/api', routes);

// Porta do servidor
const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});

export default app;