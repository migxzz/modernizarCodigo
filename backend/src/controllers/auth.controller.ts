import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { criarUsuario } from '../services/auth.service';

const prisma = new PrismaClient();

export class AuthController {

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, senha } = req.body;

      // Validação básica
      if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
      }
      
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Formato de email inválido' });
      }
      
      // Validar tamanho da senha
      if (senha.length < 6) {
        return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres' });
      }

      // Buscar usuário pelo email
      const usuario = await prisma.usuario.findUnique({
        where: { email }
      });

      // Verificar se o usuário existe
      if (!usuario) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      // Verificar se a senha está correta
      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      if (!senhaCorreta) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      // Gerar token JWT
      const token = jwt.sign(
        { id: usuario.usuario_id, email: usuario.email },
        process.env.JWT_SECRET || 'secret_key',
        { expiresIn: '8h' }
      );

      // Retornar token
      return res.json({
        token
      });
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  };

  async registro(req: Request, res: Response): Promise<Response> {
    try {
      const { email, senha } = req.body;

      // Validação básica
      if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
      }
      
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Formato de email inválido' });
      }
      
      // Validar tamanho da senha
      if (senha.length < 6) {
        return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres' });
      }

      // Criar usuário usando o serviço
      const usuario = await criarUsuario(email, senha);

      // Gerar token JWT
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET || 'secret_key',
        { expiresIn: '8h' }
      );

      // Retornar token e informações do usuário
      return res.status(201).json({
        token,
        usuario
      });
    } catch (error: any) {
      if (error.message === 'Usuário já existe') {
        return res.status(409).json({ message: error.message });
      }
      console.error('Erro no registro:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  };

}
