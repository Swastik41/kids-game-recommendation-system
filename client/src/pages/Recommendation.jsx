import React, { useState, useEffect } from "react";
import axios from "axios";
import GameModal from "../components/common/GameModal.jsx";

export default function Recommendation() {
  const [filters, setFilters] = useState({
    genre: "",
    platform: "",
    content: "",
    minRating: "",
    minReviews: "",
    search: "",
    sort: "popularity",
  });

  const [games, setGames] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async (reset = false) => {
    setLoading(true);
    const params = { ...filters, page, limit: 12 };
    const res = await axios.get("/api/games/recommendations", { params });
    const { games: newGames, totalPages } = res.data;

    setGames((prev) => (reset ? newGames : [...prev, ...newGames]));
    setTotalPages(totalPages);
    setLoading(false);
  };

  // 🔁 Fetch on first load or filter change
  useEffect(() => {
    setPage(1);
    fetchRecommendations(true);
    // eslint-disable-next-line
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  // Fetch next page whenever page changes
  useEffect(() => {
    if (page > 1) fetchRecommendations();
    // eslint-disable-next-line
  }, [page]);

  return (
    <section className="reco fullwidth">
      <h2 className="page-title">Game Recommendations</h2>

      {/* 🔍 Filters + Search */}
      <div className="filter-bar">
        <input
          name="search"
          type="text"
          placeholder="Search by game name..."
          value={filters.search}
          onChange={handleChange}
          style={{ padding: "0.5rem", borderRadius: "6px", width: "220px" }}
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
          <option value="PC">Video (PC)</option>
        </select>


        <select name="content" value={filters.content} onChange={handleChange}>
          <option value="">Content Rating</option>
          <option value="4+">4+</option>
          <option value="9+">9+</option>
          <option value="12+">12+</option>
          <option value="Everyone">Everyone</option>
        </select>


        <select name="minRating" value={filters.minRating} onChange={handleChange}>
          <option value="">Min Rating</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="4.5">4.5+</option>
          <option value="5">5</option>
        </select>

        <select name="minReviews" value={filters.minReviews} onChange={handleChange}>
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
      </div>

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
          ⭐ {g.average_user_rating || 0} | Reviews: {g.rating_count || 0}
        </div>
        <button className="btn btn-light" onClick={() => setSelected(g)}>View Details</button>
      </div>
    </div>
  ))}
</div>


      {/* Load More */}
      {page < totalPages && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
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
        onPlay={() => alert("Launching Game Demo...")}
      />
    </section>
  );
}
