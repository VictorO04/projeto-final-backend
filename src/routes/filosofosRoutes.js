import { Router } from "express";
import { getAllFilosofos, getFilosofoById, deleteFilosofo, postFilosofo, putFilosofo } from "../controllers/filosofosController.js";

const router = Router();

router.get("/", getAllFilosofos);
router.get("/:id", getFilosofoById);
router.delete("/:id", deleteFilosofo);
router.post("/", postFilosofo);
router.put("/:id", putFilosofo);

export default router;