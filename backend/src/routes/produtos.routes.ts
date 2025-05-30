import { Router } from 'express';
import { ProdutosController } from '../controllers/produtos.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const produtosController = new ProdutosController();
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Gerenciamento de produtos
 */

// Rotas públicas
router.get('/', produtosController.listarProdutos);
router.get('/:id', produtosController.obterProduto);

// Rotas protegidas (requerem autenticação)
router.post('/', authMiddleware, produtosController.criarProduto);
router.put('/:id', authMiddleware, produtosController.atualizarProduto);
router.delete('/:id', authMiddleware, produtosController.removerProduto);

export default router;