import { Router } from 'express';
import authRoutes from './auth.routes';
import protegidaRoute from './exemplo-rota-protegida';
import vendasRoutes from './vendas.routes';
import clientesRoutes from './clientes.routes';

const router = Router();

// Rotas de autenticação
router.use('/auth', authRoutes);

router.use('/teste', protegidaRoute);

// Rotas de vendas
router.use('/vendas', vendasRoutes);

// Rotas de clientes
router.use('/clientes', clientesRoutes);

// Aqui você pode adicionar suas outras rotas
// Exemplo: router.use('/users', userRoutes);

export default router;