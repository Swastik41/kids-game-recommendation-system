import React, { useState, useEffect } from "react";
import axios from "axios";
import GameModal from "../components/common/GameModal.jsx";

export default function Recommendation() {
  const defaultFilters = {
    genre: "",
    platform: "",
    content: "",
    minRating: "",
    minReviews: "",
    search: "",
    sort: "popularity",
  };

  const [filters, setFilters] = useState({
    ...defaultFilters,
  });

  const [games, setGames] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecommendations = async (reset = false) => {
    try {
      setLoading(true);
      setError("");

      const params = { ...filters, page, limit: 15 };
      const res = await axios.get("/api/games/recommendations", { params });
      const { games: newGames, totalPages: apiTotalPages } = res.data;

      setGames((prev) => (reset ? newGames : [...prev, ...newGames]));
      setTotalPages(apiTotalPages || 1);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError("We couldn’t load games right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on first load or filter change
  useEffect(() => {
    setPage(1);
    fetchRecommendations(true);
    // eslint-disable-next-line
  }, [filters]);

  // Fetch next page whenever page changes
  useEffect(() => {
    if (page > 1) fetchRecommendations();
    // eslint-disable-next-line
  }, [page]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleLoadMore = () => {
    if (page < totalPages && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const handleResetFilters = () => {
    setFilters({ ...defaultFilters });
  };

  const formatRating = (value) => {
    if (!value && value !== 0) return "0.0";
    const num = Number(value);
    if (Number.isNaN(num)) return "0.0";
    return num.toFixed(1);
  };

  return (
    <section className="reco fullwidth">
      <header className="reco-hero">
        <h1 className="reco-hero__title">Effective Game Exploration</h1>
        <p className="reco-hero__subtitle">
          Explore high-quality games by age suitability, rating, and platform
          so every session is engaging, safe, and purposeful.
        </p>
      </header>

      <div className="filter-bar">
        <label htmlFor="reco-search" className="sr-only">
          Search games by name
        </label>

        <input
          id="reco-search"
          name="search"
          type="text"
          placeholder="Search by game name..."
          value={filters.search}
          onChange={handleChange}
          className="filter-search-input"
        />

        <select name="genre" value={filters.genre} onChange={handleChange}>
          <option value="">Genre</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Strategy">Strategy</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Games">Games</option>
        </select>

        <select name="platform" value={filters.platform} onChange={handleChange}>
          <option value="">Platform</option>
          <option value="Mobile">Mobile</option>
          <option value="Cross-Platform">Video (Cross-Platform)</option>
        </select>

        <select name="content" value={filters.content} onChange={handleChange}>
          <option value="">Content Rating</option>
          <option value="4+">4+</option>
          <option value="9+">9+</option>
          <option value="12+">12+</option>
          <option value="Everyone">Everyone</option>
        </select>

        <select
          name="minRating"
          value={filters.minRating}
          onChange={handleChange}
        >
          <option value="">Min Rating</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="4.5">4.5+</option>
          <option value="5">5</option>
        </select>

        <select
          name="minReviews"
          value={filters.minReviews}
          onChange={handleChange}
        >
          <option value="">Min Reviews</option>
          <option value="100">100+</option>
          <option value="500">500+</option>
          <option value="1000">1000+</option>
          <option value="2000">2000+</option>
        </select>

        <select name="sort" value={filters.sort} onChange={handleChange}>
          <option value="popularity">Sort: Popularity</option>
          <option value="rating">Sort: Rating</option>
          <option value="reviews">Sort: Reviews</option>
          <option value="recent">Sort: Newest</option>
        </select>

        <button
          type="button"
          className="btn btn-outline filter-reset-btn"
          onClick={handleResetFilters}
        >
          Reset Filters
        </button>
      </div>

      {/* Small meta row above cards – text only, no layout change */}
      <div className="reco-meta-row">
        <span className="reco-meta-row__left">
          {games.length} game{games.length !== 1 ? "s" : ""} shown
        </span>
        {loading && <span className="reco-meta-row__right">Loading…</span>}
        {error && (
          <span className="reco-meta-row__right reco-meta-row__right--error">
            {error}
          </span>
        )}
      </div>

      {/* Empty state (still above cards) */}
      {!loading && !error && games.length === 0 && (
        <p className="reco-status">
          No games match these filters yet. Try removing one or two filters.
        </p>
      )}

      {/* 🧩 Game Cards */}
      <div className="cards">
        {games.map((g) => (
          <div key={g._id} className="game-card">
            {/* Game Source Tag */}
            <div
              className={`source-tag ${
                g.platform_type === "Mobile" ? "mobile-tag" : "video-tag"
              }`}
            >
              {g.platform_type === "Mobile" ? "📱 Mobile Game" : "🎮 Video Game"}
            </div>

            {/* Thumbnail */}
            <div className="thumb">
              <img src={g.thumbnail_url || "/placeholder.png"} alt={g.title} />
            </div>

            {/* Game Info */}
            <div className="game-body">
              <div className="game-title">{g.title}</div>
              <div className="game-meta">
                ⭐ {formatRating(g.average_user_rating)} | Reviews:{" "}
                {g.rating_count || 0}
              </div>
              <button
                className="btn btn-light"
                onClick={() => setSelected(g)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More – same placement, just class instead of inline style */}
      {page < totalPages && games.length > 0 && (
        <div className="reco-loadmore-wrapper">
          <button
            onClick={handleLoadMore}
            className="btn btn-dark"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {/* Game Modal */}
      <GameModal
        open={!!selected}
        game={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
