import express from "express";
import * as obrasControllers from "../controllers/obrasControllers.js";

const router = express.Router();

router.post("/", obrasControllers.criar);
router.get("/", obrasControllers.buscarTodos);
router.get("/:id", obrasControllers.buscarPorId);
router.put("/:id", obrasControllers.atualizar);
router.delete("/:id", obrasControllers.deletar);

export default router;