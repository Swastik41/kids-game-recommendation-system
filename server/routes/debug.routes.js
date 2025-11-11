import { Router } from "express";
import User from "../models/User.js";
const router = Router();

router.get("/users", async (_req, res) => {
  const users = await User.find().select("name email role createdAt").limit(20).lean();
  res.json(users);
});

export default router;
