import { Router } from "express";
import { getHomeGames, getRecommendations } from "../controllers/gameController.js";

const router = Router();

// Routes
router.get("/home", getHomeGames);
router.get("/recommendations", getRecommendations);

export default router;
