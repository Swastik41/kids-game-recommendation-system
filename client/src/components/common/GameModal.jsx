import React, { useEffect, useRef, useState } from "react";

export default function GameModal({ open, game, onClose }) {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);

  // ===============================
  // 🔥 STATE FOR PLAYING DEMO
  // ===============================
  const [showGamePlay, setShowGamePlay] = useState(false);
  const [timer, setTimer] = useState(45);

  // ===============================
  // 🔥 START GAME (45 sec)
  // ===============================
  function startGame() {
    setShowGamePlay(true);
    setTimer(45);

    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setShowGamePlay(false);
        }
        return t - 1;
      });
    }, 1000);
  }

  function closeGame() {
    setShowGamePlay(false);
  }

  // ===============================
  // 🔥 ESC CLOSE
  // ===============================
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        if (showGamePlay) return setShowGamePlay(false);
        onClose?.();
      }
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, showGamePlay, onClose]);

  // ===============================
  // 🔥 Auto focus close button
  // ===============================
  useEffect(() => {
    if (open && closeBtnRef.current) closeBtnRef.current.focus();
  }, [open]);

  if (!open || !game) return null;

  // ===============================
  // 🔥 CLEAN DESCRIPTION TEXT
  // ===============================
  let cleanDesc = (game.description || "")
    .replace(/\\n/g, " ")
    .replace(/\\u[0-9a-fA-F]{4}/g, "")
    .replace(/\s\s+/g, " ")
    .trim();

  const shortDesc =
    cleanDesc.length > 240 ? cleanDesc.substring(0, 240) + "..." : cleanDesc;

  const genreBadges = Array.isArray(game.genres)
    ? game.genres.slice(0, 3)
    : [];

  // =============================================
  // ⭐ RETURN UI
  // =============================================

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
      ref={dialogRef}
    >

      {/* ===================================================== */}
      {/* 🎮 PLAY GAME POPUP (45 sec DEMO) */}
      {/* ===================================================== */}
      {showGamePlay && (
        <div className="modal">
          <div className="modal__dialog" style={{ width: "100%", height: "100vh" }}>
            <button className="modal__close" onClick={closeGame}>
              ✖
            </button>

            <h2 style={{ marginBottom: "10px" }}>
              {game.title} — Demo Play ({timer}s)
            </h2>

            <iframe
              src={game.embed_url}
              width="100%"
              height="600"
              frameBorder="0"
              allowFullScreen
              title={game ? `${game.title} gameplay` : "Game preview"}
            />


            <p style={{ marginTop: "10px", textAlign: "center", color: "#666" }}>
              Demo auto-closes in {timer} seconds
            </p>
          </div>
        </div>
      )}

      {/* ===================================================== */}
      {/* 🎮 MAIN GAME DETAILS */}
      {/* ===================================================== */}

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
            className={`source-tag ${game.platform_type === "Mobile" ? "mobile-tag" : "video-tag"
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

            {/* Meta info */}
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
              <button className="btn btn-dark" onClick={startGame}>
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
