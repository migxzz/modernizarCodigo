import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Obter o token do cabeçalho Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    // Formato esperado: "Bearer TOKEN"
    const parts = authHeader.split(' ');
    
    if (parts.length !== 2) {
      return res.status(401).json({ message: 'Erro no formato do token' });
    }

    const [scheme, token] = parts;
    
    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ message: 'Formato de token inválido' });
    }

    // Verificar e decodificar o token
    jwt.verify(token, process.env.JWT_SECRET || 'secret_key', (err, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
      }

      // Adicionar informações do usuário ao objeto de requisição
      req.usuario = {
        id: decoded.id,
        email: decoded.email
      };

      return next();
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro na autenticação' });
  }
};