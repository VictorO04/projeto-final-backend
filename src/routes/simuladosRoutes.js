import express from "express";
import * as simuladosController from "../controllers/simuladosController.js";

const router = express.Router();

router.get("/", simuladosController.getSimulados);
router.get("/:id", simuladosController.getSimuladoById);

export default router;