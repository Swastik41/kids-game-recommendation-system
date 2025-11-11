import React, { useState, useEffect } from "react";
import axios from "axios";
import GameModal from "../components/common/GameModal.jsx";

export default function Recommendation() {
  const [category, setCategory] = useState("");
  const [skill, setSkill] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [games, setGames] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchRecommendations(); // initial load
  }, []);

  const fetchRecommendations = () => {
    axios
      .get("/api/games/recommendations", {
        params: {
          genre: category,
          skill: skill,
          difficulty: difficulty,
        },
      })
      .then(res => setGames(res.data))
      .catch(err => console.error("Error fetching recommendations:", err));
  };

  return (
    <section className="reco fullwidth">
      <h2 className="page-title">Game Recommendations</h2>

      {/* Filter Bar */}
      <div className="filter-bar">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Category</option>
          <option value="Math">Math</option>
          <option value="Reading">Reading</option>
          <option value="Logic">Logic</option>
          <option value="Creativity">Creativity</option>
        </select>

        <select value={skill} onChange={(e) => setSkill(e.target.value)}>
          <option value="">Skill</option>
          <option value="Numeracy">Numeracy</option>
          <option value="Problem Solving">Problem Solving</option>
          <option value="Comprehension">Comprehension</option>
          <option value="Artistic Thinking">Artistic Thinking</option>
        </select>

        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="">Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Challenging">Challenging</option>
        </select>

        <button className="btn btn-dark" onClick={fetchRecommendations}>
          Apply Filters
        </button>
      </div>

      {/* Cards */}
      <h3 className="section-title">Recommended Games</h3>
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
                <button className="btn btn-light" onClick={() => setSelected(g)}>
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No games found for the selected filters.</p>
        )}
      </div>

      <GameModal
        open={!!selected}
        game={selected}
        onClose={() => setSelected(null)}
        onPlay={(g) => {
          alert(`Launching ${g.title}`);
          setSelected(null);
        }}
      />
    </section>
  );
}
