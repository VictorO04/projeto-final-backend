import express from "express";
import * as obrasControllers from "../controllers/obrasControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", obrasControllers.criar);
router.get("/", obrasControllers.buscarTodos);
router.get("/:id", obrasControllers.buscarPorId);

router.put("/:id", authMiddleware, obrasControllers.atualizar);
router.delete("/:id", authMiddleware, obrasControllers.deletar);

export default router;