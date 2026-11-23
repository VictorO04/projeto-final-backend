import { Router } from "express";
import {
    cadastrar,
    login,
    buscarTodos,
    buscarPorId,
    atualizar,
    deletar
} from "../controllers/usuariosController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", buscarTodos);
router.get("/:id", buscarPorId);
router.post("/", cadastrar);
router.post("/login", login);

router.put("/:id", authMiddleware, atualizar);
router.delete("/:id", authMiddleware, deletar);

export default router;