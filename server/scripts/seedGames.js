/**
 * Seeder Script for PixiPlay (Kids Game Recommendation System)
 * Inserts both Mobile & Video game datasets into MongoDB.
 * Keeps old data, allows duplicates, and skips validation issues safely.
 */

import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Game from "../models/Game.js";

dotenv.config();

// Correct path for when run inside `/server`
const jsonPath = (file) => path.join(process.cwd(), "data", file);

// Decode function for letter-based key mapping (A–P)
const decodeRecord = (record, map, source) => ({
  title: record[Object.keys(map).find((k) => map[k] === "Name")] || "Untitled Game",
  description:
    record[Object.keys(map).find((k) => map[k] === "Description")]?.trim() ||
    "No description available.",
  developer: record[Object.keys(map).find((k) => map[k] === "Developer")] || "Unknown Developer",
  publisher: "", // Not in dataset
  release_year: null, // Not provided
  primary_genre: record[Object.keys(map).find((k) => map[k] === "Primary Genre")] || "General",
  genres:
    (record[Object.keys(map).find((k) => map[k] === "Genres")] || "")
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean) || [],
  gameplay_style: "",
  average_user_rating:
    Number(record[Object.keys(map).find((k) => map[k] === "Average User Rating")]) || 0,
  rating_count:
    Number(record[Object.keys(map).find((k) => map[k] === "User Rating Count")]) || 0,
  meta_score: 0,
  popularity_score: 0,
  content_suitability:
    record[Object.keys(map).find((k) => map[k] === "Age Rating")] || "Everyone",
  target_skills: [],
  difficulty_level: "Easy",
  platform_type: source === "mobile" ? "Mobile" : "Cross-Platform",
  platform: [source === "mobile" ? "Mobile" : "PC"],
  embed_url: "",
  thumbnail_url:
    record[Object.keys(map).find((k) => map[k] === "Icon URL")] || "",
});

async function seedGames() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB!");

    // Load both JSON files
    const mobilePath = jsonPath("newmobilegames.json");
    const videoPath = jsonPath("newvideogames.json");

    if (!fs.existsSync(mobilePath) || !fs.existsSync(videoPath)) {
      throw new Error("One or both dataset files not found in /server/data/");
    }

    const mobileRaw = JSON.parse(fs.readFileSync(mobilePath, "utf8"));
    const videoRaw = JSON.parse(fs.readFileSync(videoPath, "utf8"));

    // Extract column mapping (first row)
    const mobileMap = mobileRaw[0];
    const videoMap = videoRaw[0];

    // Actual records (skip header)
    const mobileRecords = mobileRaw.slice(1);
    const videoRecords = videoRaw.slice(1);

    // Convert to schema format
    const allGames = [
      ...mobileRecords.map((r) => decodeRecord(r, mobileMap, "mobile")),
      ...videoRecords.map((r) => decodeRecord(r, videoMap, "video")),
    ];

    console.log(`Preparing to insert ${allGames.length} games...`);

    // Direct insert (no deletion, no deduplication)
    const result = await Game.insertMany(allGames, { ordered: false });
    console.log(`🎮 Successfully inserted ${result.length} games!`);

    process.exit(0);
  } catch (err) {
    console.error("Error seeding games:", err.message);
    process.exit(1);
  }
}

seedGames();
