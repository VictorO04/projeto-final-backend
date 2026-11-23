import { Router } from "express";
import {
    cadastrar,
    login,
    buscarTodos,
    buscarPorId,
    atualizar,
    deletar
} from "../controllers/usuariosController.js";

const router = Router();

router.get("/", buscarTodos);
router.get("/:id", buscarPorId);
router.post("/", cadastrar);
router.post("/login", login);
router.put("/:id", atualizar);
router.delete("/:id", deletar);

export default router;