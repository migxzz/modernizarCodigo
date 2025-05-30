import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Opções de configuração do Swagger
const options: swaggerJsdoc.Options = {
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
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/models/*.ts']
};

// Gerar especificação do Swagger
const swaggerSpec = swaggerJsdoc(options);

// Configuração do Swagger UI
const swaggerDocs = (app: any) => {
  // Rota para a documentação do Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
  // Rota para obter a especificação do Swagger em formato JSON
  app.get('/api-docs.json', (req: any, res: any) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  
  console.log('Documentação Swagger disponível em /api-docs');
};

export default swaggerDocs;