// Game model for the kids game recommendation system

import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "No description available." },
  developer: String,
  publisher: String,
  release_year: Number,

  primary_genre: String,
  genres: [String],
  gameplay_style: String,

  average_user_rating: { type: Number, min:0, max:5 },
  rating_count: { type: Number, default:0 },
  meta_score: Number,
  popularity_score: { type: Number, default:0 },
  content_suitability: { type: String, default:"Everyone" },

  target_skills: [String],
  difficulty_level: { type: String, enum:["Easy","Medium","Challenging"], default:"Easy" },

  platform_type: { type:String, enum:["Mobile","Console","PC","Cross-Platform","Web"], required:true },
  platform: [String],
  embed_url: String,
  thumbnail_url: String,

  created_at:{ type:Date, default:Date.now },
  updated_at:{ type:Date, default:Date.now }
});
gameSchema.pre("save", function(n){ this.updated_at = Date.now(); n(); });

export default mongoose.model("Game", gameSchema);
