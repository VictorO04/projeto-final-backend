import { Router } from "express";
import { getCorrentes } from "../controllers/correntesController.js";

const router = Router();

router.get("/", getCorrentes);

export default router;