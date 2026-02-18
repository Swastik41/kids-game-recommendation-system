import { Router } from "express";
import Game from "../models/Game.js";
import { getHomeGames, getRecommendations } from "../controllers/gameController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { sanitizeGameData } from "../utils/sanitize.js";
import { adminLimiter } from "../middleware/rateLimiter.js";

const router = Router();

// Public routes
router.get("/home", getHomeGames);
router.get("/recommendations", getRecommendations);

/* ------------------ ADMIN CRUD ROUTES (PROTECTED) ------------------ */

// Apply admin rate limiting
router.use(adminLimiter);

// GET all games (admin only)
router.get("/", requireAuth, async (req, res) => {
  try {
    // ✅ SECURITY: Verify admin role
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: "Access denied. Admin role required." });
    }
    
    const games = await Game.find().sort({ created_at: -1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch games", error: err.message });
  }
});

// GET game by ID (admin only)
router.get("/:id", requireAuth, async (req, res) => {
  try {
    // ✅ SECURITY: Verify admin role
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: "Access denied. Admin role required." });
    }
    
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
});

// CREATE new game (admin only)
router.post("/", requireAuth, async (req, res) => {
  try {
    // ✅ SECURITY: Verify admin role
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: "Access denied. Admin role required." });
    }
    
    // ✅ SECURITY: Sanitize input to prevent XSS
    const sanitizedData = sanitizeGameData(req.body);
    
    const game = await Game.create(sanitizedData);
    res.status(201).json(game);
  } catch (err) {
    res.status(400).json({ message: "Failed to create game", error: err.message });
  }
});

// UPDATE game (admin only)
router.put("/:id", requireAuth, async (req, res) => {
  try {
    // ✅ SECURITY: Verify admin role
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: "Access denied. Admin role required." });
    }
    
    // ✅ SECURITY: Sanitize input to prevent XSS
    const sanitizedData = sanitizeGameData(req.body);
    
    const updated = await Game.findByIdAndUpdate(req.params.id, sanitizedData, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: "Game not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update game", error: err.message });
  }
});

// DELETE game (admin only)
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    // ✅ SECURITY: Verify admin role
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: "Access denied. Admin role required." });
    }
    
    const deleted = await Game.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Game not found" });
    res.json({ message: "Game deleted", deleted });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete game", error: err.message });
  }
});

export default router;
