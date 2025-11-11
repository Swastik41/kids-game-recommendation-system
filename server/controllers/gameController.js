import Game from "../models/Game.js";

// @desc   Get featured games for Home Page
// @route  GET /api/games/home
export const getHomeGames = async (req, res) => {
  try {
    const games = await Game.find({})
      .sort({ average_user_rating: -1, rating_count: -1 })
      .limit(12)
      .lean();
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch games" });
  }
};

// @desc   Get recommendations (filter by genre, skill, difficulty, platform)
// @route  GET /api/games/recommendations
export const getRecommendations = async (req, res) => {
  try {
    const { genre, skill, difficulty } = req.query;
    const filter = {};

    if (genre) filter.genres = { $regex: genre, $options: "i" };
    if (skill) filter.target_skills = { $regex: skill, $options: "i" };
    if (difficulty) filter.difficulty_level = { $regex: difficulty, $options: "i" };

    const games = await Game.find(filter)
      .sort({ popularity_score: -1, average_user_rating: -1 })
      .limit(20)
      .lean();

    res.status(200).json(games);
  } catch (err) {
    console.error("Error fetching recommendations:", err);
    res.status(500).json({ error: "Server error" });
  }
};
