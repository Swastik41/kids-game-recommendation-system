// client/src/pages/AdminDashboard.jsx

import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { GamesAPI } from "../api/games.js";
import "../styles/index.css";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAdd, setShowAdd] = useState(false);
  const [editGame, setEditGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const emptyGame = {
    title: "",
    description: "",
    primary_genre: "",
    genres: "",
    gameplay_style: "",
    average_user_rating: 0,
    rating_count: 0,
    difficulty_level: "Easy",
    platform_type: "",
    embed_url: "",
    thumbnail_url: "",
  };

  const [newGame, setNewGame] = useState(emptyGame);

  // ---------------- LOAD GAMES ----------------
  async function loadGames() {
    try {
      setLoading(true);
      const data = await GamesAPI.getAll();
      setGames(data || []);
    } catch (err) {
      console.error("Failed to load games:", err);
      alert("Could not load games. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGames();
  }, []);

  // ---------------- HELPERS ----------------
  function parseGenres(raw) {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    return raw
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean);
  }

  function normalizeNumbers(payload) {
    return {
      ...payload,
      average_user_rating: Number(payload.average_user_rating) || 0,
      rating_count: Number(payload.rating_count) || 0,
    };
  }

  // ---------------- CREATE GAME ----------------
  async function handleAdd(e) {
    e.preventDefault();

    try {
      const payload = normalizeNumbers({
        ...newGame,
        genres: parseGenres(newGame.genres),
      });

      await GamesAPI.create(payload);
      setShowAdd(false);
      setNewGame(emptyGame);
      await loadGames();
    } catch (err) {
      console.error("Create failed:", err);
      alert("Failed to create game: " + err.message);
    }
  }

  // ---------------- UPDATE GAME ----------------
  async function handleUpdate(e) {
    e.preventDefault();
    if (!editGame?._id) return;

    try {
      const payload = normalizeNumbers({
        ...editGame,
        genres: parseGenres(editGame.genres),
      });

      await GamesAPI.update(editGame._id, payload);
      setEditGame(null);
      await loadGames();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update game: " + err.message);
    }
  }

  // ---------------- DELETE GAME ----------------
  async function handleDelete(id) {
    if (!window.confirm("Delete this game?")) return;
    try {
      await GamesAPI.delete(id);
      await loadGames();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete game: " + err.message);
    }
  }

  // ---------------- FILTER / STATS ----------------
  const filteredGames = games.filter((g) => {
    if (!searchTerm.trim()) return true;
    const text = searchTerm.toLowerCase();

    const title = (g.title || "").toLowerCase();
    const primaryGenre = (g.primary_genre || "").toLowerCase();
    const genres = Array.isArray(g.genres)
      ? g.genres.join(", ").toLowerCase()
      : (g.genres || "").toLowerCase();

    return (
      title.includes(text) ||
      primaryGenre.includes(text) ||
      genres.includes(text)
    );
  });

  const totalGames = games.length;
  const avgRating =
    totalGames > 0
      ? (
        games.reduce(
          (sum, g) => sum + (Number(g.average_user_rating) || 0),
          0
        ) / totalGames
      ).toFixed(1)
      : "0.0";

  const easyCount = games.filter(
    (g) => (g.difficulty_level || "").toLowerCase() === "easy"
  ).length;
  const mediumCount = games.filter(
    (g) => (g.difficulty_level || "").toLowerCase() === "medium"
  ).length;
  const hardCount = games.filter(
    (g) => (g.difficulty_level || "").toLowerCase() === "hard"
  ).length;

  const genreSet = new Set();
  games.forEach((g) => {
    if (g.primary_genre) genreSet.add(g.primary_genre);
    const gs = Array.isArray(g.genres) ? g.genres : parseGenres(g.genres);
    gs.forEach((x) => genreSet.add(x));
  });
  const uniqueGenres = genreSet.size;

  if (loading) {
    return (
      <div className="admin-dashboard admin-dashboard--loading">
        <h2 className="loading-text">Loading admin dashboard…</h2>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* HEADER */}
      <header className="admin-header">
        <div className="admin-header__left">
          <h1 className="admin-header__title">Game Library Admin</h1>
          <p className="admin-header__subtitle">
            Review, edit and organize the PixiPlay games in one place.
          </p>
        </div>

        <div className="admin-header__right">
          <div className="admin-header__userline">
            <span className="admin-header__welcome">
              {user?.name || user?.email || "Admin"}
            </span>
            <span className="admin-header__role">Administrator</span>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="btn btn-dark admin-header__cta"
          >
            + Add game
          </button>
        </div>
      </header>

      {/* STATS ROW */}
      <div className="admin-stats">
        <div className="admin-stat-card">
          <span className="admin-stat-card__label">Total games</span>
          <span className="admin-stat-card__value">{totalGames}</span>
          <span className="admin-stat-card__hint">
            Currently in the library
          </span>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-card__label">Average rating</span>
          <span className="admin-stat-card__value">{avgRating}</span>
          <span className="admin-stat-card__hint">Across all titles</span>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-card__label">Difficulty split</span>
          <span className="admin-stat-card__value">
            E: {easyCount} · M: {mediumCount} · H: {hardCount}
          </span>
          <span className="admin-stat-card__hint">
            Helps balance easy vs. hard games
          </span>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-card__label">Unique genres</span>
          <span className="admin-stat-card__value">{uniqueGenres}</span>
          <span className="admin-stat-card__hint">
            Primary + secondary genres
          </span>
        </div>
      </div>

      {/* SEARCH BAR – FULL WIDTH BELOW STATS */}
      <div className="admin-search-wide">
  <label className="sr-only" htmlFor="admin-search">
    Search games by title or genre
  </label>

  <div className="admin-search__wrapper">
    <span className="admin-search__icon">🔍</span>
    <input
      id="admin-search"
      className="admin-search__input"
      type="text"
      placeholder="Search by title or genre…"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  <p className="admin-search__hint">
    Showing <strong>{filteredGames.length}</strong> of{" "}
    <strong>{totalGames}</strong> games
  </p>
</div>

      {/* TABLE */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Game</th>
              <th>Genre(s)</th>
              <th>Difficulty</th>
              <th>Rating</th>
              <th>Platform</th>
              <th style={{ width: "220px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGames.map((g) => (
              <tr key={g._id}>
                <td>
                  <div className="admin-game-cell">
                    {g.thumbnail_url && (
                      <img
                        src={g.thumbnail_url}
                        alt={g.title}
                        className="admin-game-cell__thumb"
                      />
                    )}
                    <div>
                      <div className="admin-game-cell__title">
                        {g.title || "Untitled Game"}
                      </div>
                      {g.description && (
                        <div className="admin-game-cell__desc">
                          {g.description.length > 80
                            ? g.description.slice(0, 80) + "…"
                            : g.description}
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                <td>
                  <div className="admin-game-tags">
                    {g.primary_genre && (
                      <span className="tag tag--primary">
                        {g.primary_genre}
                      </span>
                    )}
                    {Array.isArray(g.genres)
                      ? g.genres.map((genre) => (
                        <span key={genre} className="tag">
                          {genre}
                        </span>
                      ))
                      : parseGenres(g.genres).map((genre) => (
                        <span key={genre} className="tag">
                          {genre}
                        </span>
                      ))}
                  </div>
                </td>

                <td>
                  <span
                    className={`badge badge--${(
                      g.difficulty_level || "Easy"
                    )
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {g.difficulty_level || "Easy"}
                  </span>
                </td>

                <td>
                  <div className="admin-rating">
                    <span className="admin-rating__value">
                      {g.average_user_rating ?? 0}
                    </span>
                    <span className="admin-rating__count">
                      ({g.rating_count ?? 0})
                    </span>
                  </div>
                </td>

                <td>
                  <span className="pill pill--platform">
                    {g.platform_type || "N/A"}
                  </span>
                </td>

                <td className="admin-actions">
                  <button
                    className="btn-light admin-row-btn"
                    onClick={() =>
                      setEditGame({
                        ...g,
                        genres: Array.isArray(g.genres)
                          ? g.genres.join(", ")
                          : g.genres || "",
                      })
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn-light admin-row-btn admin-row-btn--danger"
                    onClick={() => handleDelete(g._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredGames.length === 0 && (
              <tr>
                <td colSpan="6" className="admin-empty">
                  No games match your search yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* ADD MODAL */}
      {showAdd && (
        <div className="modal">
          <div className="modal__dialog admin-modal">
            <button
              className="modal__close"
              onClick={() => setShowAdd(false)}
            >
              ✕
            </button>

            <h2 className="modal__title">Add new game</h2>

            <form onSubmit={handleAdd} className="admin-form">
              <div className="admin-form__grid">
                <label>
                  Title
                  <input
                    placeholder="Game title"
                    value={newGame.title}
                    onChange={(e) =>
                      setNewGame({ ...newGame, title: e.target.value })
                    }
                  />
                </label>

                <label>
                  Primary genre
                  <input
                    placeholder="e.g., Action, Puzzle"
                    value={newGame.primary_genre}
                    onChange={(e) =>
                      setNewGame({
                        ...newGame,
                        primary_genre: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Genres (comma separated)
                  <input
                    placeholder="e.g., Shooting, Platformer, Retro"
                    value={newGame.genres}
                    onChange={(e) =>
                      setNewGame({ ...newGame, genres: e.target.value })
                    }
                  />
                </label>

                <label>
                  Difficulty
                  <select
                    value={newGame.difficulty_level}
                    onChange={(e) =>
                      setNewGame({
                        ...newGame,
                        difficulty_level: e.target.value,
                      })
                    }
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </label>

                <label>
                  Average rating
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={newGame.average_user_rating}
                    onChange={(e) =>
                      setNewGame({
                        ...newGame,
                        average_user_rating: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Rating count
                  <input
                    type="number"
                    min="0"
                    value={newGame.rating_count}
                    onChange={(e) =>
                      setNewGame({
                        ...newGame,
                        rating_count: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Platform type (Mobile/Web/PC/Cross-Platform)
                  <input
                    placeholder="e.g., Web, Mobile, Cross-Platform"
                    value={newGame.platform_type}
                    onChange={(e) =>
                      setNewGame({
                        ...newGame,
                        platform_type: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Thumbnail URL (image)
                  <input
                    placeholder="https://example.com/image.png"
                    value={newGame.thumbnail_url}
                    onChange={(e) =>
                      setNewGame({
                        ...newGame,
                        thumbnail_url: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Embed URL (game link / iFrame)
                  <input
                    placeholder="https://..."
                    value={newGame.embed_url}
                    onChange={(e) =>
                      setNewGame({
                        ...newGame,
                        embed_url: e.target.value,
                      })
                    }
                  />
                </label>
              </div>

              <label className="admin-form__full">
                Short description
                <textarea
                  rows="3"
                  placeholder="Short description of the game..."
                  value={newGame.description}
                  onChange={(e) =>
                    setNewGame({
                      ...newGame,
                      description: e.target.value,
                    })
                  }
                />
              </label>

              <div className="admin-form__actions">
                <button
                  type="button"
                  className="btn-light admin-form__cancel"
                  onClick={() => setShowAdd(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-dark">
                  Save game
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editGame && (
        <div className="modal">
          <div className="modal__dialog admin-modal">
            <button
              className="modal__close"
              onClick={() => setEditGame(null)}
            >
              ✕
            </button>

            <h2 className="modal__title">Edit game</h2>

            <form onSubmit={handleUpdate} className="admin-form">
              <div className="admin-form__grid">
                <label>
                  Title
                  <input
                    value={editGame.title}
                    onChange={(e) =>
                      setEditGame({ ...editGame, title: e.target.value })
                    }
                  />
                </label>

                <label>
                  Primary genre
                  <input
                    value={editGame.primary_genre}
                    onChange={(e) =>
                      setEditGame({
                        ...editGame,
                        primary_genre: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Genres (comma separated)
                  <input
                    value={editGame.genres}
                    onChange={(e) =>
                      setEditGame({
                        ...editGame,
                        genres: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Difficulty
                  <select
                    value={editGame.difficulty_level}
                    onChange={(e) =>
                      setEditGame({
                        ...editGame,
                        difficulty_level: e.target.value,
                      })
                    }
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </label>

                <label>
                  Average rating
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={editGame.average_user_rating}
                    onChange={(e) =>
                      setEditGame({
                        ...editGame,
                        average_user_rating: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Rating count
                  <input
                    type="number"
                    min="0"
                    value={editGame.rating_count}
                    onChange={(e) =>
                      setEditGame({
                        ...editGame,
                        rating_count: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Platform type
                  <input
                    value={editGame.platform_type}
                    onChange={(e) =>
                      setEditGame({
                        ...editGame,
                        platform_type: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Thumbnail URL
                  <input
                    value={editGame.thumbnail_url}
                    onChange={(e) =>
                      setEditGame({
                        ...editGame,
                        thumbnail_url: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Embed URL
                  <input
                    value={editGame.embed_url}
                    onChange={(e) =>
                      setEditGame({
                        ...editGame,
                        embed_url: e.target.value,
                      })
                    }
                  />
                </label>
              </div>

              <label className="admin-form__full">
                Short description
                <textarea
                  rows="3"
                  value={editGame.description}
                  onChange={(e) =>
                    setEditGame({
                      ...editGame,
                      description: e.target.value,
                    })
                  }
                />
              </label>

              <div className="admin-form__actions">
                <button
                  type="button"
                  className="btn-light admin-form__cancel"
                  onClick={() => setEditGame(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-dark">
                  Update game
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
