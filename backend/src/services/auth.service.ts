import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const criarUsuario = async (email: string, senha: string) => {
  // Verificar se o usuário já existe
  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email }
  });

  if (usuarioExistente) {
    throw new Error('Usuário já existe');
  }

  // Criptografar a senha
  const salt = await bcrypt.genSalt(10);
  const senhaCriptografada = await bcrypt.hash(senha, salt);

  // Criar o usuário
  const novoUsuario = await prisma.usuario.create({
    data: {
      email,
      senha: senhaCriptografada
    }
  });

  return {
    id: novoUsuario.usuario_id,
    email: novoUsuario.email
  };
};