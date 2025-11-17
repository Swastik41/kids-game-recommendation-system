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

  // Focus close button when opened
  useEffect(() => {
    if (open && closeBtnRef.current) closeBtnRef.current.focus();
  }, [open]);

  if (!open || !game) return null;

  // 🔥 Clean description (remove \n, unicode garbage)
  let cleanDesc = (game.description || "")
    .replace(/\\n/g, " ")               // remove \n
    .replace(/\\u[0-9a-fA-F]{4}/g, "")  // remove unicode blocks like \u25a0
    .replace(/\s\s+/g, " ")             // remove double spaces
    .trim();

  const shortDesc =
    cleanDesc.length > 240 ? cleanDesc.substring(0, 240) + "..." : cleanDesc;

  // 🎨 Category BADGES instead of long text
  const genreBadges = Array.isArray(game.genres)
    ? game.genres.slice(0, 3) // max 3 badges
    : [];

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
      ref={dialogRef}
    >
      <div className="modal__dialog">
        {/* CLOSE BUTTON */}
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Close game details"
          ref={closeBtnRef}
        >
          ✕
        </button>

        {/* HEADER */}
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

        {/* BODY */}
        <div className="modal__body">
          {/* THUMBNAIL */}
          <div className="modal__media">
            <img
              src={game.thumbnail_url || "/placeholder.png"}
              alt={game.title || "Game image"}
              className="modal__thumb"
              onError={(e) => (e.target.src = "/placeholder.png")}
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="modal__content">

            {/* META INFO */}
            <div className="modal__meta">

              <div className="meta__row">
                <span className="meta__label">⭐ Rating</span>
                <span className="meta__value">
                  {game.average_user_rating
                    ? game.average_user_rating.toFixed(1)
                    : "N/A"}
                </span>
              </div>

              <div className="meta__row">
                <span className="meta__label">👥 Reviews</span>
                <span className="meta__value">{game.rating_count || 0}</span>
              </div>

              <div className="meta__row full">
                <span className="meta__label">🎮 Categories</span>
                <span className="badge-container">
                  {genreBadges.length > 0
                    ? genreBadges.map((g, i) => (
                        <span key={i} className="genre-badge">
                          {g}
                        </span>
                      ))
                    : "—"}
                </span>
              </div>

              <div className="meta__row">
                <span className="meta__label">🧠 Difficulty</span>
                <span className="meta__value">
                  {game.difficulty_level || "Easy"}
                </span>
              </div>
            </div>

            <hr className="modal__divider" />

            {/* DESCRIPTION */}
            <p className="modal__desc">{shortDesc}</p>

            {/* ACTION BUTTONS */}
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
