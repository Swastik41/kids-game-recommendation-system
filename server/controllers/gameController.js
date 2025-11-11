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

// Enhanced Recommendations with Search + Sorting + Pagination
export const getRecommendations = async (req, res) => {
  try {
    const {
      genre,
      platform,
      content,
      minRating,
      minReviews,
      search,
      sort,
      page = 1,
      limit = 12,
    } = req.query;

    const query = {};

    // ✅ Dynamic filters
    if (genre) query.genres = { $regex: genre, $options: "i" };
    if (platform) query.platform_type = { $regex: platform, $options: "i" };
    if (content) query.content_suitability = { $regex: content, $options: "i" };
    if (minRating) query.average_user_rating = { $gte: Number(minRating) };
    if (minReviews) query.rating_count = { $gte: Number(minReviews) };
    if (search) query.title = { $regex: search, $options: "i" };

    // ✅ Sorting logic
    let sortQuery = {};
    switch (sort) {
      case "rating":
        sortQuery = { average_user_rating: -1 };
        break;
      case "reviews":
        sortQuery = { rating_count: -1 };
        break;
      case "recent":
        sortQuery = { release_year: -1 };
        break;
      default:
        sortQuery = { popularity_score: -1, average_user_rating: -1, rating_count: -1 };
    }

    // ✅ Pagination logic
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Game.countDocuments(query);
    const games = await Game.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(Number(limit))
      .lean();

    res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
      games,
    });
  } catch (error) {
    console.error("Error fetching recommendations:", error.message);
    res.status(500).json({ error: "Server error while fetching games." });
  }
};
