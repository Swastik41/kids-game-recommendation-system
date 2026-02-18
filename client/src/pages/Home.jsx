// client/src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";

export default function Home() {
  return (
    <main className="page home">
      {/* HERO */}
      <section className="hero">
        <div className="hero__content container">
          <div className="hero__text">
            <p className="hero__eyebrow">For kids, parents & teachers</p>
            <h1 className="hero__title">
              Smarter game recommendations
              <span> for curious young minds.</span>
            </h1>
            <p className="hero__subtitle">
              PixiPlay helps families and schools discover safe, age-appropriate,
              and skill-building games. No endless scrolling. Just the right game,
              at the right time, for the right child.
            </p>

            <div className="hero__actions">
              <Link to="/recommendation" className="btn btn-primary">
                Explore games
              </Link>
              <Link to="/about" className="btn btn-outline">
                How PixiPlay works
              </Link>
            </div>

            <p className="hero__note">
              🎯 Designed for ages <strong>6–12</strong> · 👨‍👩‍👧‍👦 Built for families & classrooms
            </p>
          </div>

          <div className="hero__panel">
            <div className="hero-card">
              <h2>Build a better play routine</h2>
              <ul>
                <li>✔ Filter games by age, skills, and category.</li>
                <li>✔ Mix fun titles with learning-focused games.</li>
                <li>✔ Track difficulty to keep kids challenged, not frustrated.</li>
              </ul>
              <p className="hero-card__footer">
                Start by answering a few simple questions – PixiPlay suggests a
                curated list in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS / TRUST STRIP */}
      <section className="stats">
        <div className="container stats__row">
          <div className="stats__item">
            <span className="stats__value">150+</span>
            <span className="stats__label">Curated games in the library</span>
          </div>
          <div className="stats__item">
            <span className="stats__value">3</span>
            <span className="stats__label">Roles: Kids · Parents · Teachers</span>
          </div>
          <div className="stats__item">
            <span className="stats__value">100%</span>
            <span className="stats__label">Ad-free recommendation experience</span>
          </div>
        </div>
      </section>

      {/* WHO IT’S FOR */}
      <section className="section section--light">
        <div className="container">
          <header className="section__header">
            <h2>One platform, three perspectives.</h2>
            <p>
              PixiPlay is built for the people who care the most about kids’ digital
              time: <strong>parents, teachers, and the kids themselves.</strong>
            </p>
          </header>

          <div className="grid grid--3">
            <article className="card persona">
              <h3>For Parents</h3>
              <p>
                Replace “random YouTube games” with guided, trustworthy options.
                Filter by age, category, and time available so screen time becomes
                intentional, not accidental.
              </p>
              <ul>
                <li>⭐ Age-appropriate filters</li>
                <li>⭐ Difficulty & focus level</li>
                <li>⭐ Quick recommendations for busy evenings</li>
              </ul>
            </article>

            <article className="card persona">
              <h3>For Teachers</h3>
              <p>
                Find games that reinforce classroom concepts, support group work,
                and keep students engaged while practicing real skills.
              </p>
              <ul>
                <li>📚 Category tags for subjects</li>
                <li>📊 Skill-building focus (logic, math, reading)</li>
                <li>👥 Great for stations and early finishers</li>
              </ul>
            </article>

            <article className="card persona">
              <h3>For Kids</h3>
              <p>
                Kids enjoy discovering new games that feel fun first, but still help
                them learn, think, and explore new worlds safely.
              </p>
              <ul>
                <li>🎮 Fun, colourful game thumbnails</li>
                <li>🧩 Recommended by play style</li>
                <li>🏆 Clear difficulty indicators</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container">
          <header className="section__header">
            <h2>How PixiPlay makes smart suggestions</h2>
            <p>
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
            <p>
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
            <p>Short feedback from the perspectives that matter.</p>
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
