import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Rotas Protegidas
 *   description: Exemplos de rotas protegidas por autenticação
 */

/**
 * @swagger
 * /teste/protegida:
 *   get:
 *     summary: Exemplo de rota protegida
 *     tags: [Rotas Protegidas]
 *     description: Esta rota só pode ser acessada por usuários autenticados
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acesso bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/protegida', authMiddleware, (req, res) => {
  // O middleware já verificou o token e adicionou as informações do usuário à requisição
  return res.json({
    message: 'Rota protegida acessada com sucesso',
    usuario: req.usuario
  });
});

export default router;