import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criar clientes
  const cliente1 = await prisma.cliente.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nome: 'Maria Silva',
      cpf: '123.456.789-00',
      email: 'maria@exemplo.com',
      telefone: '(11) 98765-4321'
    }
  });

  const cliente2 = await prisma.cliente.upsert({
    where: { id: 2 },
    update: {},
    create: {
      nome: 'João Santos',
      cpf: '987.654.321-00',
      email: 'joao@exemplo.com',
      telefone: '(11) 91234-5678'
    }
  });

  // Criar produtos
  const produto1 = await prisma.produto.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nome: 'Rosa Vermelha',
      descricao: 'Rosa vermelha natural',
      preco: 15.90,
      quantidade: 100
    }
  });

  const produto2 = await prisma.produto.upsert({
    where: { id: 2 },
    update: {},
    create: {
      nome: 'Orquídea',
      descricao: 'Orquídea branca',
      preco: 45.50,
      quantidade: 30
    }
  });

  const produto3 = await prisma.produto.upsert({
    where: { id: 3 },
    update: {},
    create: {
      nome: 'Vaso Decorativo',
      descricao: 'Vaso de cerâmica',
      preco: 29.90,
      quantidade: 50
    }
  });

  // Criar uma venda com itens
  const venda = await prisma.venda.create({
    data: {
      cliente_id: cliente1.id,
      forma_pagamento: 'Cartão de Crédito',
      itens: {
        create: [
          {
            produto_id: produto1.id,
            quantidade: 5,
            preco_unitario: produto1.preco
          },
          {
            produto_id: produto3.id,
            quantidade: 1,
            preco_unitario: produto3.preco
          }
        ]
      }
    }
  });

  console.log('Dados de exemplo criados com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });