import { Router } from "express";
import * as filosofosController from "../controllers/filosofosController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", filosofosController.getFilosofos);
router.get("/:id", filosofosController.getFilosofoPeloId);
router.post("/", filosofosController.postFilosofo);

router.put('/:id', authMiddleware ,filosofosController.postFilosofo)
router.delete('/:id', authMiddleware, filosofosController.deleteFilosofo)

export default router;