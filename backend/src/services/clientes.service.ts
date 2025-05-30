import prisma from '../config/prisma';

export class ClienteService {
  async findAll() {
    return await prisma.cliente.findMany();
  }

  async findById(id: number) {
    return await prisma.cliente.findUnique({
      where: { id },
      include: { vendas: true }
    });
  }

  async create(data: {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
  }) {
    return await prisma.cliente.create({
      data
    });
  }

  async update(id: number, data: {
    nome?: string;
    cpf?: string;
    email?: string;
    telefone?: string;
  }) {
    return await prisma.cliente.update({
      where: { id },
      data
    });
  }

  async delete(id: number) {
    return await prisma.cliente.delete({
      where: { id }
    });
  }
}