import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';

// Carrega as variáveis de ambiente
dotenv.config();

// Inicializa o app Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

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
});

export default app;