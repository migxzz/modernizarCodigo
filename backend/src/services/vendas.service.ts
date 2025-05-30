import prisma from '../config/prisma';
import { PrismaClient, Prisma } from '@prisma/client';
import { VendaInput } from '../interfaces/VendaInput';
import { VendaUpdateInput } from '../interfaces/VendaUpdateInput';

export class VendasService {
  /**
   * Lista todas as vendas com seus itens
   */
  async listarVendas() {
    return prisma.venda.findMany({
      include: {
        cliente: true,
        itens: {
          include: {
            produto: true
          }
        }
      }
    });
  }

  /**
   * Busca uma venda específica pelo ID
   */
  async buscarVendaPorId(id: number) {
    return prisma.venda.findUnique({
      where: { id },
      include: {
        cliente: true,
        itens: {
          include: {
            produto: true
          }
        }
      }
    });
  }

  /**
   * Cria uma nova venda com seus itens
   */
  async criarVenda(dados: VendaInput) {
    // Verificar se o cliente existe
    const clienteExiste = await prisma.cliente.findUnique({
      where: { id: dados.cliente_id }
    });

    if (!clienteExiste) {
      throw new Error('Cliente não encontrado');
    }

    // Verificar se todos os produtos existem e têm estoque suficiente
    for (const item of dados.itens) {
      const produto = await prisma.produto.findUnique({
        where: { id: item.produto_id }
      });

      if (!produto) {
        throw new Error(`Produto com ID ${item.produto_id} não encontrado`);
      }

      if (produto.quantidade < item.quantidade) {
        throw new Error(`Estoque insuficiente para o produto ${produto.nome}`);
      }
    }

    // Criar a venda e seus itens em uma transação
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Criar a venda
      const venda = await tx.venda.create({
        data: {
          cliente_id: dados.cliente_id,
          forma_pagamento: dados.forma_pagamento,
        }
      });

      // Criar os itens da venda e atualizar o estoque
      for (const item of dados.itens) {
        const produto = await tx.produto.findUnique({
          where: { id: item.produto_id }
        });

        if (!produto) continue;

        // Adicionar o item à venda
        await tx.itemVenda.create({
          data: {
            venda_id: venda.id,
            produto_id: item.produto_id,
            quantidade: item.quantidade,
            preco_unitario: produto.preco
          }
        });

        // Atualizar o estoque do produto
        await tx.produto.update({
          where: { id: item.produto_id },
          data: {
            quantidade: produto.quantidade - item.quantidade
          }
        });
      }

      // Retornar a venda completa
      return tx.venda.findUnique({
        where: { id: venda.id },
        include: {
          cliente: true,
          itens: {
            include: {
              produto: true
            }
          }
        }
      });
    });
  }

  /**
   * Atualiza uma venda existente
   * Nota: Apenas a forma de pagamento pode ser alterada
   */
  async atualizarVenda(id: number, dados: VendaUpdateInput) {
    // Verificar se a venda existe
    const vendaExiste = await prisma.venda.findUnique({
      where: { id }
    });

    if (!vendaExiste) {
      return null;
    }

    // Atualizar apenas a forma de pagamento
    return prisma.venda.update({
      where: { id },
      data: {
        forma_pagamento: dados.forma_pagamento
      },
      include: {
        cliente: true,
        itens: {
          include: {
            produto: true
          }
        }
      }
    });
  }

  /**
   * Remove uma venda e seus itens
   */
  async removerVenda(id: number) {
    // Verificar se a venda existe
    const vendaExiste = await prisma.venda.findUnique({
      where: { id },
      include: {
        itens: true
      }
    });

    if (!vendaExiste) {
      return false;
    }

    // Remover a venda e seus itens em uma transação
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Restaurar o estoque dos produtos
      for (const item of vendaExiste.itens) {
        const produto = await tx.produto.findUnique({
          where: { id: item.produto_id }
        });

        if (produto) {
          await tx.produto.update({
            where: { id: item.produto_id },
            data: {
              quantidade: produto.quantidade + item.quantidade
            }
          });
        }
      }

      // Remover os itens da venda
      await tx.itemVenda.deleteMany({
        where: { venda_id: id }
      });

      // Remover a venda
      await tx.venda.delete({
        where: { id }
      });
    });

    return true;
  }
}