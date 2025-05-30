const request = require('supertest');
const app = require('../../../backend/server');
const mongoose = require('mongoose');

describe('API de Clientes', () => {
  beforeAll(async () => {
    // Conectar ao banco de dados de teste
    // await mongoose.connect(process.env.TEST_MONGODB_URI);
  });

  afterAll(async () => {
    // Desconectar do banco de dados
    // await mongoose.connection.close();
  });

  describe('GET /api/clientes', () => {
    it('deve retornar todos os clientes', async () => {
      const response = await request(app).get('/api/clientes');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/clientes/:id', () => {
    it('deve retornar um cliente específico', async () => {
      // Primeiro, crie um cliente para testar
      const clienteResponse = await request(app)
        .post('/api/clientes')
        .send({
          nome: 'Cliente Teste',
          email: 'cliente@teste.com',
          telefone: '11999999999'
        });

      const clienteId = clienteResponse.body.id;
      
      const response = await request(app).get(`/api/clientes/${clienteId}`);
      expect(response.status).toBe(200);
      expect(response.body.nome).toBe('Cliente Teste');
    });

    it('deve retornar 404 para um ID inválido', async () => {
      const response = await request(app).get('/api/clientes/999999');
      expect(response.status).toBe(404);
    });
  });
});
