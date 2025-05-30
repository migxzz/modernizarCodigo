import { Request, Response } from 'express';
import { ProdutosService, ProdutoCreateInput, ProdutoUpdateInput } from '../services/produtos.service';

const produtosService = new ProdutosService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do produto
 *         nome:
 *           type: string
 *           description: Nome do produto
 *         descricao:
 *           type: string
 *           description: Descrição do produto
 *         preco:
 *           type: number
 *           format: float
 *           description: Preço do produto
 *         quantidade:
 *           type: integer
 *           description: Quantidade em estoque
 *       example:
 *         id: 1
 *         nome: "Rosa Vermelha"
 *         descricao: "Rosa vermelha natural"
 *         preco: 15.90
 *         quantidade: 100
 */

export class ProdutosController {
  /**
   * @swagger
   * /produtos:
   *   get:
   *     summary: Lista todos os produtos
   *     tags: [Produtos]
   *     responses:
   *       200:
   *         description: Lista de produtos
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Produto'
   *       500:
   *         description: Erro interno do servidor
   */
  async listarProdutos(req: Request, res: Response): Promise<Response> {
    try {
      const produtos = await produtosService.findAll();
      return res.json(produtos);
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      return res.status(500).json({ message: 'Erro ao listar produtos' });
    }
  }

  /**
   * @swagger
   * /produtos/{id}:
   *   get:
   *     summary: Obtém um produto pelo ID
   *     tags: [Produtos]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do produto
   *     responses:
   *       200:
   *         description: Produto encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Produto'
   *       404:
   *         description: Produto não encontrado
   *       500:
   *         description: Erro interno do servidor
   */
  async obterProduto(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
      }
      
      const produto = await produtosService.findById(id);
      
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      
      return res.json(produto);
    } catch (error) {
      console.error('Erro ao obter produto:', error);
      return res.status(500).json({ message: 'Erro ao obter produto' });
    }
  }

  /**
   * @swagger
   * /produtos:
   *   post:
   *     summary: Cria um novo produto
   *     tags: [Produtos]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nome
   *               - preco
   *               - quantidade
   *             properties:
   *               nome:
   *                 type: string
   *               descricao:
   *                 type: string
   *               preco:
   *                 type: number
   *                 format: float
   *               quantidade:
   *                 type: integer
   *             example:
   *               nome: "Girassol"
   *               descricao: "Girassol amarelo"
   *               preco: 12.50
   *               quantidade: 50
   *     responses:
   *       201:
   *         description: Produto criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Produto'
   *       400:
   *         description: Dados inválidos
   *       500:
   *         description: Erro interno do servidor
   */
  async criarProduto(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, descricao, preco, quantidade } = req.body;
      
      // Validações básicas
      if (!nome || nome.trim() === '') {
        return res.status(400).json({ message: 'Nome é obrigatório' });
      }
      
      if (preco === undefined || isNaN(preco) || preco <= 0) {
        return res.status(400).json({ message: 'Preço deve ser um número positivo' });
      }
      
      if (quantidade === undefined || isNaN(quantidade) || quantidade < 0) {
        return res.status(400).json({ message: 'Quantidade deve ser um número não negativo' });
      }
      
      const produtoData: ProdutoCreateInput = {
        nome,
        descricao,
        preco: Number(preco),
        quantidade: Number(quantidade)
      };
      
      const novoProduto = await produtosService.create(produtoData);
      return res.status(201).json(novoProduto);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      return res.status(500).json({ message: 'Erro ao criar produto' });
    }
  }

  /**
   * @swagger
   * /produtos/{id}:
   *   put:
   *     summary: Atualiza um produto existente
   *     tags: [Produtos]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do produto
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *               descricao:
   *                 type: string
   *               preco:
   *                 type: number
   *                 format: float
   *               quantidade:
   *                 type: integer
   *             example:
   *               nome: "Rosa Branca"
   *               descricao: "Rosa branca natural"
   *               preco: 16.90
   *               quantidade: 80
   *     responses:
   *       200:
   *         description: Produto atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Produto'
   *       400:
   *         description: Dados inválidos
   *       404:
   *         description: Produto não encontrado
   *       500:
   *         description: Erro interno do servidor
   */
  async atualizarProduto(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
      }
      
      // Verificar se o produto existe
      const produtoExistente = await produtosService.findById(id);
      
      if (!produtoExistente) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      
      const { nome, descricao, preco, quantidade } = req.body;
      
      // Validações para os campos fornecidos
      if (nome !== undefined && nome.trim() === '') {
        return res.status(400).json({ message: 'Nome não pode ser vazio' });
      }
      
      if (preco !== undefined && (isNaN(preco) || preco <= 0)) {
        return res.status(400).json({ message: 'Preço deve ser um número positivo' });
      }
      
      if (quantidade !== undefined && (isNaN(quantidade) || quantidade < 0)) {
        return res.status(400).json({ message: 'Quantidade deve ser um número não negativo' });
      }
      
      const produtoData: ProdutoUpdateInput = {};
      
      if (nome !== undefined) produtoData.nome = nome;
      if (descricao !== undefined) produtoData.descricao = descricao;
      if (preco !== undefined) produtoData.preco = Number(preco);
      if (quantidade !== undefined) produtoData.quantidade = Number(quantidade);
      
      const produtoAtualizado = await produtosService.update(id, produtoData);
      return res.json(produtoAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      return res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
  }

  /**
   * @swagger
   * /produtos/{id}:
   *   delete:
   *     summary: Remove um produto
   *     tags: [Produtos]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do produto
   *     responses:
   *       200:
   *         description: Produto removido com sucesso
   *       404:
   *         description: Produto não encontrado
   *       500:
   *         description: Erro interno do servidor
   */
  async removerProduto(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
      }
      
      // Verificar se o produto existe
      const produtoExistente = await produtosService.findById(id);
      
      if (!produtoExistente) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      
      await produtosService.delete(id);
      return res.json({ message: 'Produto removido com sucesso' });
    } catch (error) {
      console.error('Erro ao remover produto:', error);
      return res.status(500).json({ message: 'Erro ao remover produto' });
    }
  }
}