import { Router } from 'express';
import authRoutes from './auth.routes';
import protegidaRoute from './exemplo-rota-protegida';
import produtosRoutes from './produtos.routes';

const router = Router();

// Rotas de autenticação
router.use('/auth', authRoutes);

router.use('/teste', protegidaRoute);

// Rotas de produtos
router.use('/produtos', produtosRoutes);

// Aqui você pode adicionar suas outras rotas
// Exemplo: router.use('/users', userRoutes);

export default router;