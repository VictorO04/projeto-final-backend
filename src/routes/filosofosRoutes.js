import { Router } from "express";
import * as filosofosController from "../controllers/filosofosController.js";

const router = Router();

router.get("/", filosofosController.getFilosofos);
router.get("/:id", filosofosController.getFilosofoPeloId);
router.post("/", filosofosController.postFilosofo);
router.delete("/:id", filosofosController.deleteFilosofo);

export default router;