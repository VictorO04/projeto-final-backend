import { Router } from "express";
import * as filosofosController from "../controllers/filosofosController.js";

const router = Router();

router.get("/", filosofosController.getFilosofos);
router.post("/", filosofosController.postFilosofos);

export default router;