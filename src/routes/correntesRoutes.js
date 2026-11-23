import { Router } from "express";
import { getCorrentes, getCorrenteById, postCorrente, deleteCorrente, putCorrente } from "../controllers/correntesController.js";

const router = Router();

router.get("/", getCorrentes);
router.get("/:id", getCorrenteById);
router.post("/", postCorrente);
router.delete("/:id", deleteCorrente);
router.put("/:id", putCorrente);

export default router;