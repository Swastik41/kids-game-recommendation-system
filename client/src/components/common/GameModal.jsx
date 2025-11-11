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

  // Focus the close button when opened (simple focus management)
  useEffect(() => {
    if (open && closeBtnRef.current) closeBtnRef.current.focus();
  }, [open]);

  if (!open || !game) return null;

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.(); // click backdrop to close
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
            {game.title}
          </h2>
        </header>

        <div className="modal__body">
          <div className="modal__media">
            {/* replace with <img src={game.imageUrl} alt={`${game.title} cover`} /> when you have images */}
            <div className="thumb modal__thumb">Game Image</div>
          </div>

          <div className="modal__content">
            <div className="modal__meta">
              <div className="meta__row">
                <span className="meta__label">Rating</span>
                <span className="meta__value">{game.rating}</span>
              </div>
              <div className="meta__row">
                <span className="meta__label">Category</span>
                <span className="meta__value">{game.category || "—"}</span>
              </div>
              <div className="meta__row">
                <span className="meta__label">Age</span>
                <span className="meta__value">{game.ageRange || "—"}</span>
              </div>
            </div>

            <hr className="modal__divider" />

            <p className="modal__desc">
              {game.description ||
                "A fun, adaptive game designed to build skills through play. Great for your selected age and category."}
            </p>

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
