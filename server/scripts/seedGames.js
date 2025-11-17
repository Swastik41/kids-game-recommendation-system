/**
 * Seeder Script for PixiPlay (Kids Game Recommendation System)
 * Cleans descriptions, removes unicode artifacts, and imports both datasets.
 */

import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Game from "../models/Game.js";

dotenv.config();

// Path resolver
const jsonPath = (file) => path.join(process.cwd(), "data", file);

// -------------------------------
// 🧼 TEXT CLEANER (Fixes \n, \uXXXX, quotes, whitespace)
// -------------------------------
function cleanText(str = "") {
  return String(str)
    .replace(/\\n/g, " ")                      // real newlines instead of \n
    .replace(/\\u[0-9A-Fa-f]{4}/g, "")         // remove unicode escapes
    .replace(/\\"/g, '"')                      // fix escaped quotes
    .replace(/\\'/g, "'")
    .replace(/\s+/g, " ")                      // collapse spaces
    .trim();
}

// 🔪 Trim descriptions to 2–3 lines max
function shortenDescription(text) {
  const clean = cleanText(text);
  return clean.length > 260 ? clean.substring(0, 260) + "..." : clean;
}

// -------------------------------
// 🎮 Genre Thumbnails (same as yours)
// -------------------------------
const genreThumbnails = {
  "Action": "https://cdn-icons-png.flaticon.com/512/3209/3209278.png",
  "Adventure": "https://cdn-icons-png.flaticon.com/512/4321/4321374.png",
  "Strategy": "https://cdn-icons-png.flaticon.com/512/4315/4315445.png",
  "Puzzle": "https://cdn-icons-png.flaticon.com/512/4466/4466824.png",
  "Games": "https://cdn-icons-png.flaticon.com/512/1055/1055646.png",
  "Default": "https://cdn-icons-png.flaticon.com/512/1055/1055646.png"
};

// -------------------------------
// 🔄 MAIN DECODING FUNCTION
// -------------------------------
const decodeRecord = (record, map, source) => {
  if (source === "mobile") {
    return {
      title: cleanText(record[Object.keys(map).find(k => map[k] === "Name")]),
      description: shortenDescription(
        record[Object.keys(map).find(k => map[k] === "Description")] || ""
      ),
      developer: cleanText(
        record[Object.keys(map).find(k => map[k] === "Developer")] || "Unknown"
      ),
      publisher: "",
      release_year: null,

      primary_genre: cleanText(
        record[Object.keys(map).find(k => map[k] === "Primary Genre")] || "General"
      ),

      genres:
        (record[Object.keys(map).find(k => map[k] === "Genres")] || "")
          .split(",")
          .map(g => cleanText(g.trim()))
          .filter(Boolean),

      gameplay_style: "",
      average_user_rating:
        Number(record[Object.keys(map).find(k => map[k] === "Average User Rating")]) || 0,

      rating_count:
        Number(record[Object.keys(map).find(k => map[k] === "User Rating Count")]) || 0,

      meta_score: 0,
      popularity_score: 0,

      content_suitability:
        cleanText(record[Object.keys(map).find(k => map[k] === "Age Rating")] || "Everyone"),

      target_skills: [],
      difficulty_level: "Easy",
      platform_type: "Mobile",
      platform: ["Mobile"],
      embed_url: "",
      thumbnail_url: cleanText(
        record[Object.keys(map).find(k => map[k] === "Icon URL")] || ""
      )
    };
  }

  // -------------------------
  // 🎮 VIDEO GAME RECORD
  // -------------------------
  let rawGenres = record["H"];
  let cleanedGenres = [];

  if (typeof rawGenres === "string") {
    cleanedGenres = rawGenres
      .replace(/[\[\]"]/g, "")
      .replace(/'/g, "")
      .split(",")
      .map(g => cleanText(g));
  }

  const mainGenre = cleanedGenres[0] || "Default";
  const matchedThumbnail = genreThumbnails[mainGenre] || genreThumbnails["Default"];

  return {
    title: cleanText(record["B"]),
    description: shortenDescription(record["I"] || ""),
    developer: cleanText(record["D"]),
    publisher: "",
    release_year: parseInt(record["C"]) || null,

    primary_genre: cleanText(mainGenre),
    genres: cleanedGenres,

    gameplay_style: "",
    average_user_rating: Number(record["E"]) || 0,
    rating_count: parseInt((record["G"] || "0").replace(/[^\d]/g, "")) || 0,
    popularity_score: parseInt((record["F"] || "0").replace(/[^\d]/g, "")) || 0,
    meta_score: 0,

    content_suitability: "Teen",
    target_skills: [],
    difficulty_level: "Medium",
    platform_type: "Cross-Platform",
    platform: ["PC", "Console"],
    embed_url: "",
    thumbnail_url: matchedThumbnail
  };
};

// -------------------------------
// 🌱 SEED FUNCTION
// -------------------------------
async function seedGames() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected!");

    const mobilePath = jsonPath("newmobilegames.json");
    const videoPath = jsonPath("newvideogames.json");

    const mobileRaw = JSON.parse(fs.readFileSync(mobilePath, "utf8"));
    const videoRaw = JSON.parse(fs.readFileSync(videoPath, "utf8"));

    const mobileMap = mobileRaw[0];
    const videoMap = videoRaw[0];

    const mobileRecords = mobileRaw.slice(1);
    const videoRecords = videoRaw.slice(1);

    const allGames = [
      ...mobileRecords.map(r => decodeRecord(r, mobileMap, "mobile")),
      ...videoRecords.map(r => decodeRecord(r, videoMap, "video"))
    ];

    console.log(`Preparing to insert ${allGames.length} games...`);

    const result = await Game.insertMany(allGames, { ordered: false });
    console.log(`🎮 Inserted ${result.length} games successfully!`);

    process.exit(0);
  } catch (err) {
    console.error("Error seeding games:", err);
    process.exit(1);
  }
}

seedGames();
