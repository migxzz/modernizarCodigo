import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const authController = new AuthController();

const router = Router();

// Rota de login
router.post('/login', authController.login);

// Rota de registro
router.post('/registro', authController.registro);

export default router;