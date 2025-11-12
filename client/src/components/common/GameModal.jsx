import React, { useEffect, useRef } from "react";

export default function GameModal({ open, game, onClose, onPlay }) {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Focus management
  useEffect(() => {
    if (open && closeBtnRef.current) closeBtnRef.current.focus();
  }, [open]);

  if (!open || !game) return null;

  // Shorten long descriptions to 2–3 lines
  const shortDesc =
    game.description && game.description.length > 220
      ? game.description.substring(0, 220) + "..."
      : game.description || "No description available.";

  // Helper to clean up genres array
  const genreList = Array.isArray(game.genres)
    ? game.genres.filter(Boolean).join(", ")
    : game.genres || "—";

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      ref={dialogRef}
    >
      <div className="modal__dialog">
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Close game details"
          ref={closeBtnRef}
        >
          ✕
        </button>

        <header className="modal__header">
          <h2 id="game-modal-title" className="modal__title">
            {game.title || "Untitled Game"}
          </h2>
          <span
            className={`source-tag ${
              game.platform_type === "Mobile" ? "mobile-tag" : "video-tag"
            }`}
          >
            {game.platform_type === "Mobile" ? "📱 Mobile Game" : "🎮 Video Game"}
          </span>
        </header>

        <div className="modal__body">
          {/* Thumbnail */}
          <div className="modal__media">
            <img
              src={game.thumbnail_url || "/placeholder.png"}
              alt={`${game.title} cover`}
              className="modal__thumb"
            />
          </div>

          {/* Content */}
          <div className="modal__content">
            <div className="modal__meta">
              <div className="meta__row">
                <span className="meta__label">⭐ Rating</span>
                <span className="meta__value">
                  {game.average_user_rating ? game.average_user_rating.toFixed(1) : "N/A"}
                </span>
              </div>

              <div className="meta__row">
                <span className="meta__label">🎮 Category</span>
                <span className="meta__value">{genreList}</span>
              </div>

              <div className="meta__row">
                <span className="meta__label">👥 Reviews</span>
                <span className="meta__value">{game.rating_count || 0}</span>
              </div>

              <div className="meta__row">
                <span className="meta__label">🧠 Difficulty</span>
                <span className="meta__value">{game.difficulty_level || "Easy"}</span>
              </div>
            </div>

            <hr className="modal__divider" />

            <p className="modal__desc">{shortDesc}</p>

            <div className="modal__actions">
              <button className="btn btn-dark" onClick={() => onPlay?.(game)}>
                Play Game
              </button>
              <button className="btn btn-light" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
