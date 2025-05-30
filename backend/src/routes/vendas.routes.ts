import { Router } from 'express';
import { VendasController } from '../controllers/vendas.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const vendasController = new VendasController();
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Vendas
 *   description: Gerenciamento de vendas
 */

/**
 * @swagger
 * /vendas:
 *   get:
 *     summary: Lista todas as vendas
 *     tags: [Vendas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vendas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venda'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, vendasController.listarVendas);

/**
 * @swagger
 * /vendas/{id}:
 *   get:
 *     summary: Busca uma venda pelo ID
 *     tags: [Vendas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da venda
 *     responses:
 *       200:
 *         description: Venda encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venda'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Venda não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, vendasController.buscarVendaPorId);

/**
 * @swagger
 * /vendas:
 *   post:
 *     summary: Cria uma nova venda
 *     tags: [Vendas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cliente_id
 *               - forma_pagamento
 *               - itens
 *             properties:
 *               cliente_id:
 *                 type: integer
 *                 description: ID do cliente
 *               forma_pagamento:
 *                 type: string
 *                 description: Forma de pagamento
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - produto_id
 *                     - quantidade
 *                   properties:
 *                     produto_id:
 *                       type: integer
 *                       description: ID do produto
 *                     quantidade:
 *                       type: integer
 *                       description: Quantidade do produto
 *             example:
 *               cliente_id: 1
 *               forma_pagamento: "Cartão de Crédito"
 *               itens:
 *                 - produto_id: 1
 *                   quantidade: 2
 *                 - produto_id: 3
 *                   quantidade: 1
 *     responses:
 *       201:
 *         description: Venda criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venda'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, vendasController.criarVenda);

/**
 * @swagger
 * /vendas/{id}:
 *   put:
 *     summary: Atualiza uma venda existente
 *     tags: [Vendas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da venda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - forma_pagamento
 *             properties:
 *               forma_pagamento:
 *                 type: string
 *                 description: Nova forma de pagamento
 *             example:
 *               forma_pagamento: "Pix"
 *     responses:
 *       200:
 *         description: Venda atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venda'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Venda não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, vendasController.atualizarVenda);

/**
 * @swagger
 * /vendas/{id}:
 *   delete:
 *     summary: Remove uma venda
 *     tags: [Vendas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da venda
 *     responses:
 *       204:
 *         description: Venda removida com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Venda não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authMiddleware, vendasController.removerVenda);

export default router;