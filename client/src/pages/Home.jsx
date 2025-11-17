import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get("/api/games/home")
      .then(res => setGames(res.data))
      .catch(err => console.error("Error fetching home games:", err));
  }, []);

  return (
    <section className="home">
      <div className="container">
        <div className="hero">
          <h1>Kids Game<br/>Recommendation System</h1>
          <p>Find fun and educational games for kids</p>
          <Link to="/recommendation" className="btn btn-dark">Find Games</Link>
        </div>

        <section className="features">
          <h2>Why Choose PixiPlay?</h2>
          <div className="feature-grid">
            <div className="feature">🎯 <h3>Personalized Picks</h3><p>Games tailored to kids’ skills and interests.</p></div>
            <div className="feature">🧠 <h3>Learn Through Play</h3><p>Enhance creativity, logic, and problem-solving.</p></div>
            <div className="feature">💡 <h3>Safe & Educational</h3><p>All games are kid-friendly and educational.</p></div>
          </div>
        </section>

        <section className="popular">
          <h2>Popular Games</h2>
          <div className="cards">
            {games.length > 0 ? (
              games.map((g) => (
                <div key={g._id} className="game-card">
                  <div className="thumb">
                    <img
                      src={g.thumbnail_url || "/placeholder.png"}
                      alt={g.title}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="game-body">
                    <div className="game-title">{g.title}</div>
                    <div className="game-meta">
                      ⭐ {g.average_user_rating?.toFixed(1) || "N/A"}
                    </div>
                    <Link to="/recommendation" className="btn btn-light">View Details</Link>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading games...</p>
            )}
          </div>
        </section>

        <section className="cta-banner">
          <h2>Start Exploring Fun & Learning Today!</h2>
          <Link to="/recommendation" className="btn btn-dark">Browse Games</Link>
        </section>
      </div>
    </section>
  );
}
