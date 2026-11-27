import { Router } from "express";
import {
  getQuestoes,
  getQuestaoById,
  postQuestao,
  putQuestao,
  deleteQuestao,
  postResponderQuestao,
  postCorrigirSimulado,
} from "../controllers/questoesController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();
router.get("/", getQuestoes);
router.post("/corrigir", postCorrigirSimulado); 
router.get("/:id", getQuestaoById);
router.post("/:id/responder", postResponderQuestao);


router.post("/", verificarToken, postQuestao);
router.put("/:id", verificarToken, putQuestao);
router.delete("/:id", verificarToken, deleteQuestao);

export default router;


