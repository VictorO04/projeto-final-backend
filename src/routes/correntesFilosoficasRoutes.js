import { Router } from "express";
import { getAllCorrentes, getCorrenteById } from "../controllers/correntesFilosoficasController.js";

const router = Router();

router.get("/", getAllCorrentes);
router.get("/:id", getCorrenteById);

export default router;