import express from 'express';
import * as controller from '../controllers/noticiasController.js';
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', controller.criar);
router.get('/', controller.buscarTodos);
router.get('/:id', controller.buscarPorId);

router.put('/:id', authMiddleware ,controller.atualizar)
router.delete('/:id', authMiddleware, controller.deletar)

export default router;