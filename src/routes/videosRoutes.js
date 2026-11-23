import { Router } from "express";
import { getAllVideos, getVideoById, postVideo, deleteVideo, putVideo } from "../controllers/videosController";

const router = Router();

router.get("/", getAllVideos);
router.get("/:id", getVideoById);
router.delete("/:id", deleteVideo);
router.post("/", postVideo);
router.put("/:id", putVideo);

export default router;