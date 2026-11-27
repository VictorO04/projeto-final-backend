import { Router } from "express";
<<<<<<< HEAD
import { getAllCorrentes, getCorrenteById, deleteCorrente, postCorrente, putCorrente } from "../controllers/correntesFilosoficasController.js";
=======
import { getAllCorrentes, getCorrenteById } from "../controllers/correntesFilosoficasController.js";
>>>>>>> 2df086054de3b7e24f6412748a6b07ba76cb984b

const router = Router();

router.get("/", getAllCorrentes);
router.get("/:id", getCorrenteById);
<<<<<<< HEAD
router.delete("/:id", deleteCorrente);
router.post("/", postCorrente);
router.put("/:id", putCorrente);
=======
>>>>>>> 2df086054de3b7e24f6412748a6b07ba76cb984b

export default router;