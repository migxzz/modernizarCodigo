import prisma from '../config/prisma';
import { Produto } from '@prisma/client';

export interface ProdutoCreateInput {
  nome: string;
  descricao?: string;
  preco: number;
  quantidade: number;
}

export interface ProdutoUpdateInput {
  nome?: string;
  descricao?: string;
  preco?: number;
  quantidade?: number;
}

export class ProdutosService {
  async findAll(): Promise<Produto[]> {
    return prisma.produto.findMany();
  }

  async findById(id: number): Promise<Produto | null> {
    return prisma.produto.findUnique({
      where: { id }
    });
  }

  async create(data: ProdutoCreateInput): Promise<Produto> {
    return prisma.produto.create({
      data
    });
  }

  async update(id: number, data: ProdutoUpdateInput): Promise<Produto> {
    return prisma.produto.update({
      where: { id },
      data
    });
  }

  async delete(id: number): Promise<Produto> {
    return prisma.produto.delete({
      where: { id }
    });
  }
}