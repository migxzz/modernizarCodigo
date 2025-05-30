import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Esta rota só pode ser acessada por usuários autenticados
router.get('/protegida', authMiddleware, (req, res) => {
  // O middleware já verificou o token e adicionou as informações do usuário à requisição
  return res.json({
    message: 'Rota protegida acessada com sucesso',
    usuario: req.usuario
  });
});

export default router;