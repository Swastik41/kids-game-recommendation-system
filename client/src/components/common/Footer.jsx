import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__row">
        <p>© {new Date().getFullYear()} PixiPlay — Kids Game Recommendation System</p>
        <nav className="footer__nav">
          <Link to="/">Home</Link>
          <Link to="/recommendation">Exploration</Link>
          <Link to="/about">About</Link>
          <Link to="/donation">Donation</Link>
        </nav>
      </div>
    </footer>
  );
}
