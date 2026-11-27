import { Router } from "express";
import { getAllCorrentes, getCorrenteById, deleteCorrente, postCorrente, putCorrente } from "../controllers/correntesFilosoficasController.js";

const router = Router();

router.get("/", getAllCorrentes);
router.get("/:id", getCorrenteById);
router.delete("/:id", deleteCorrente);
router.post("/", postCorrente);
router.put("/:id", putCorrente);

export default router;