import { Router } from 'express';
import { cadastrar, login } from '../controllers/usuariosController.js';

const router = Router();

router.post('/', cadastrar);       // POST /usuarios
router.post('/login', login);      // POST /usuarios/login

export default router;