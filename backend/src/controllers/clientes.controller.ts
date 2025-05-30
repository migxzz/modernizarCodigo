import { Request, Response } from 'express';
import { ClienteService } from '../services/clientes.service';

/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do cliente
 *         nome:
 *           type: string
 *           description: Nome do cliente
 *         cpf:
 *           type: string
 *           description: CPF do cliente
 *         email:
 *           type: string
 *           format: email
 *           description: Email do cliente
 *         telefone:
 *           type: string
 *           description: Telefone do cliente
 *       required:
 *         - nome
 *         - cpf
 *         - email
 *         - telefone
 */

export class ClienteController {
  private clienteService: ClienteService;

  constructor() {
    this.clienteService = new ClienteService();
  }

  /**
   * Busca todos os clientes
   */
  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const clientes = await this.clienteService.findAll();
      return res.json(clientes);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  /**
   * Busca um cliente pelo ID
   */
  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const cliente = await this.clienteService.findById(Number(id));
      
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }
      
      return res.json(cliente);
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  /**
   * Cria um novo cliente
   */
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, cpf, email, telefone } = req.body;
      
      // Validação básica
      if (!nome || !cpf || !email || !telefone) {
        return res.status(400).json({ 
          message: 'Todos os campos são obrigatórios: nome, cpf, email, telefone' 
        });
      }
      
      const cliente = await this.clienteService.create({
        nome,
        cpf,
        email,
        telefone
      });
      
      return res.status(201).json(cliente);
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  /**
   * Atualiza um cliente existente
   */
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { nome, cpf, email, telefone } = req.body;
      
      // Verificar se o cliente existe
      const clienteExistente = await this.clienteService.findById(Number(id));
      if (!clienteExistente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }
      
      const cliente = await this.clienteService.update(Number(id), {
        nome,
        cpf,
        email,
        telefone
      });
      
      return res.json(cliente);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  /**
   * Remove um cliente
   */
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      // Verificar se o cliente existe
      const clienteExistente = await this.clienteService.findById(Number(id));
      if (!clienteExistente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }
      
      await this.clienteService.delete(Number(id));
      
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}