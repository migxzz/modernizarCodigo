import { Request, Response } from 'express';
import { VendasService } from '../services/vendas.service';

const vendasService = new VendasService();

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemVenda:
 *       type: object
 *       properties:
 *         produto_id:
 *           type: integer
 *           description: ID do produto
 *         quantidade:
 *           type: integer
 *           description: Quantidade do produto
 *         preco_unitario:
 *           type: number
 *           format: float
 *           description: Preço unitário do produto
 *     Venda:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da venda
 *         cliente_id:
 *           type: integer
 *           description: ID do cliente
 *         forma_pagamento:
 *           type: string
 *           description: Forma de pagamento
 *         dt_venda:
 *           type: string
 *           format: date-time
 *           description: Data da venda
 *         itens:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ItemVenda'
 */

export class VendasController {
  /**
   * Busca todas as vendas
   */
  async listarVendas(req: Request, res: Response): Promise<Response> {
    try {
      const vendas = await vendasService.listarVendas();
      return res.json(vendas);
    } catch (error: any) {
      console.error('Erro ao listar vendas:', error);
      return res.status(500).json({ message: 'Erro ao listar vendas', error: error.message });
    }
  }

  /**
   * Busca uma venda pelo ID
   */
  async buscarVendaPorId(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const venda = await vendasService.buscarVendaPorId(Number(id));
      
      if (!venda) {
        return res.status(404).json({ message: 'Venda não encontrada' });
      }
      
      return res.json(venda);
    } catch (error: any) {
      console.error(`Erro ao buscar venda ${req.params.id}:`, error);
      return res.status(500).json({ message: 'Erro ao buscar venda', error: error.message });
    }
  }

  /**
   * Cria uma nova venda
   */
  async criarVenda(req: Request, res: Response): Promise<Response> {
    try {
      const { cliente_id, forma_pagamento, itens } = req.body;
      
      // Validações básicas
      if (!cliente_id || !forma_pagamento || !itens || !Array.isArray(itens) || itens.length === 0) {
        return res.status(400).json({ 
          message: 'Dados inválidos. Forneça cliente_id, forma_pagamento e pelo menos um item' 
        });
      }
      
      // Validar cada item
      for (const item of itens) {
        if (!item.produto_id || !item.quantidade || item.quantidade <= 0) {
          return res.status(400).json({ 
            message: 'Cada item deve ter produto_id e quantidade maior que zero' 
          });
        }
      }
      
      const novaVenda = await vendasService.criarVenda({
        cliente_id,
        forma_pagamento,
        itens
      });
      
      return res.status(201).json(novaVenda);
    } catch (error: any) {
      console.error('Erro ao criar venda:', error);
      return res.status(500).json({ message: 'Erro ao criar venda', error: error.message });
    }
  }

  /**
   * Atualiza uma venda existente
   */
  async atualizarVenda(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { forma_pagamento } = req.body;
      
      // Validações básicas
      if (!forma_pagamento) {
        return res.status(400).json({ message: 'Forma de pagamento é obrigatória' });
      }
      
      const vendaAtualizada = await vendasService.atualizarVenda(Number(id), { forma_pagamento });
      
      if (!vendaAtualizada) {
        return res.status(404).json({ message: 'Venda não encontrada' });
      }
      
      return res.json(vendaAtualizada);
    } catch (error: any) {
      console.error(`Erro ao atualizar venda ${req.params.id}:`, error);
      return res.status(500).json({ message: 'Erro ao atualizar venda', error: error.message });
    }
  }

  /**
   * Remove uma venda
   */
  async removerVenda(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      const removido = await vendasService.removerVenda(Number(id));
      
      if (!removido) {
        return res.status(404).json({ message: 'Venda não encontrada' });
      }
      
      return res.status(204).send();
    } catch (error: any) {
      console.error(`Erro ao remover venda ${req.params.id}:`, error);
      return res.status(500).json({ message: 'Erro ao remover venda', error: error.message });
    }
  }
}