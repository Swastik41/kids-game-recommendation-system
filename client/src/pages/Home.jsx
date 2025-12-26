// client/src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";

export default function Home() {
  return (
    <section className="home">
      <div className="container">
        <div className="hero">
          <h1>Kids Game<br/>Recommendation System</h1>
          <p>Find fun and educational games for kids</p>
          <Link to="/recommendation" className="btn btn-dark">Find Games</Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container">
          <header className="section__header">
            <h2>How PixiPlay makes smart suggestions</h2>
            <p style={{color: "#000000"}}>
              Behind the scenes, PixiPlay combines simple inputs with a curated
              game library to generate a tailored list of options.
            </p>
          </header>

          <div className="steps">
            <div className="step">
              <span className="step__badge">Step 1</span>
              <h3>Tell us about the player</h3>
              <p>
                Choose age range, preferred device, and what the session is for:
                fun, skill practice, or a bit of both.
              </p>
            </div>
            <div className="step">
              <span className="step__badge">Step 2</span>
              <h3>Pick the mood & category</h3>
              <p>
                Filter by categories like puzzles, coding, creativity, strategy, or
                quick mini-games for short breaks.
              </p>
            </div>
            <div className="step">
              <span className="step__badge">Step 3</span>
              <h3>Get a curated game lineup</h3>
              <p>
                PixiPlay surfaces a short, focused list of games with clear labels
                for difficulty, focus level, and learning benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="section section--alt">
        <div className="container">
          <header className="section__header">
            <h2>Why families trust PixiPlay</h2>
            <p style={{color: "#000000"}}>
              Not every game is a good fit. PixiPlay looks at more than just “popular”
              – it focuses on healthy digital habits.
            </p>
          </header>

          <div className="grid grid--3">
            <div className="card feature">
              <h3>Safety first</h3>
              <p>
                Games are checked for age-appropriateness, content, and type of
                in-game ads or purchases so you can make informed choices.
              </p>
            </div>
            <div className="card feature">
              <h3>Balanced gaming</h3>
              <p>
                Mix purely fun games with titles that strengthen memory, logic,
                problem-solving, and creativity – without losing engagement.
              </p>
            </div>
            <div className="card feature">
              <h3>Designed for real life</h3>
              <p>
                Need a 10-minute break game? Or something deeper for weekend play?
                Use time & difficulty filters to match your schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <header className="section__header">
            <h2>What people say about PixiPlay</h2>
            <p style={{color: "#000000"}}>Short feedback from the perspectives that matter.</p>
          </header>

          <div className="grid grid--3 testimonials">
            <figure className="testimonial">
              <blockquote>
                “It saves me so much time. Instead of searching the app store, I
                open PixiPlay, pick a category, and we’re ready to go.”
              </blockquote>
              <figcaption>— Parent of a 9-year-old</figcaption>
            </figure>
            <figure className="testimonial">
              <blockquote>
                “I use PixiPlay to find quick logic and math games for my students
                who finish early. They feel like it’s play – I know it’s practice.”
              </blockquote>
              <figcaption>— Grade 5 Teacher</figcaption>
            </figure>
            <figure className="testimonial">
              <blockquote>
                “The games are actually fun. I like checking the ‘challenge’ level
                and picking a harder one each week.”
              </blockquote>
              <figcaption>— 11-year-old player</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section cta">
        <div className="container cta__content">
          <div>
            <h2>Ready to improve your screen time routine?</h2>
            <p>
              Start using PixiPlay as your “first stop” before any new game. It
              takes less than a minute to find a better option.
            </p>
          </div>
          <div className="cta__actions">
            <Link to="/recommendation" className="btn btn-primary">
              Start exploring games
            </Link>
            <Link to="/donation" className="btn btn-outline">
              Support the project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
