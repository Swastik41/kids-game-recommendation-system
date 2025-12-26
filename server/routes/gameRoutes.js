import { Router } from "express";
import Game from "../models/Game.js";
import { getHomeGames, getRecommendations } from "../controllers/gameController.js";

const router = Router();

// Routes
router.get("/home", getHomeGames);
router.get("/recommendations", getRecommendations);

/* ------------------ ADMIN CRUD ROUTES ------------------ */

// GET all games
router.get("/", async (req, res) => {
  try {
    const games = await Game.find().sort({ created_at: -1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch games", error: err.message });
  }
});

// GET game by ID
router.get("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
});

// CREATE new game
router.post("/", async (req, res) => {
  try {
    const game = await Game.create(req.body);
    res.status(201).json(game);
  } catch (err) {
    res.status(400).json({ message: "Failed to create game", error: err.message });
  }
});

// UPDATE game
router.put("/:id", async (req, res) => {
  try {
    const updated = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: "Game not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update game", error: err.message });
  }
});

// DELETE game
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Game.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Game not found" });
    res.json({ message: "Game deleted", deleted });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete game", error: err.message });
  }
});

export default router;
