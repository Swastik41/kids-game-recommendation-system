import Game from "../models/Game.js";

// @desc   Get featured games for Home Page
// @route  GET /api/games/home
export const getHomeGames = async (req, res) => {
  try {
    const games = await Game.find({})
      .sort({ average_user_rating: -1, rating_count: -1 })
      .limit(9)
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

    // ✅ Input validation to prevent ReDoS attacks
    const sanitizeInput = (input, maxLength = 50) => {
      if (!input || typeof input !== 'string') return null;
      return input.slice(0, maxLength).trim();
    };

    // ✅ Dynamic filters with sanitization
    const safeGenre = sanitizeInput(genre);
    const safePlatform = sanitizeInput(platform);
    const safeContent = sanitizeInput(content);
    const safeSearch = sanitizeInput(search, 100);

    if (safeGenre) query.genres = { $regex: safeGenre, $options: "i" };
    if (safePlatform) query.platform_type = { $regex: safePlatform, $options: "i" };
    if (safeContent) query.content_suitability = { $regex: safeContent, $options: "i" };
    if (minRating) {
      const rating = Number(minRating);
      if (rating >= 0 && rating <= 5) query.average_user_rating = { $gte: rating };
    }
    if (minReviews) {
      const reviews = Number(minReviews);
      if (reviews >= 0 && reviews <= 1000000) query.rating_count = { $gte: reviews };
    }
    if (safeSearch) query.title = { $regex: safeSearch, $options: "i" };

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
