import mongoose from "mongoose";
import dotenv from "dotenv";
import Game from "../models/Game.js";

dotenv.config();

async function clearGames() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected!");

    // Delete all game documents
    const result = await Game.deleteMany({});
    console.log(`🗑️  Deleted ${result.deletedCount} games from the database.`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error deleting games:", error.message);
    process.exit(1);
  }
}

clearGames();
