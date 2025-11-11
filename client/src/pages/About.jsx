import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="about">
      <div className="container">

        {/* Intro */}
        <header className="about__header">
          <h1>About PixiPlay</h1>
          <p>
            PixiPlay is a playful recommendation system that helps parents and kids
            discover safe, educational games. We match play with learning goals so
            kids build skills while having fun.
          </p>
        </header>

        {/* How it works */}
        <section className="about__section">
          <h2>How It Works</h2>
          <ol className="how">
            <li className="how__step">
              <div className="how__icon">🧒</div>
              <div>
                <h3>Tell us about your child</h3>
                <p>Pick age, skills, and difficulty level to personalize results.</p>
              </div>
            </li>
            <li className="how__step">
              <div className="how__icon">🎯</div>
              <div>
                <h3>We recommend games</h3>
                <p>Our rules + curation suggest titles that are fun and age-appropriate.</p>
              </div>
            </li>
            <li className="how__step">
              <div className="how__icon">🚀</div>
              <div>
                <h3>Play & learn</h3>
                <p>Kids explore math, reading, logic and creativity through play.</p>
              </div>
            </li>
          </ol>
        </section>

        {/* Values */}
        <section className="about__section">
          <h2>What We Value</h2>
          <div className="grid-3">
            <div className="card vcard">
              <div className="vcard__icon">🔒</div>
              <h3>Safety First</h3>
              <p>Kid-friendly content, ad-light picks, and simple controls.</p>
            </div>
            <div className="card vcard">
              <div className="vcard__icon">🧠</div>
              <h3>Learning by Doing</h3>
              <p>Each title targets skills like problem-solving, memory, and language.</p>
            </div>
            <div className="card vcard">
              <div className="vcard__icon">💛</div>
              <h3>Inclusive Fun</h3>
              <p>Recommendations across ages, interests, and difficulty levels.</p>
            </div>
          </div>
        </section>

        {/* FAQ / tiny blurb */}
        <section className="about__section">
          <h2>FAQs</h2>
          <div className="faq">
            <details>
              <summary>Are these real games?</summary>
              <p>This is a capstone demo. You can integrate your own catalog or APIs.</p>
            </details>
            <details>
              <summary>How do recommendations work?</summary>
              <p>We filter by age/skills/difficulty and apply curated rules. You can plug in ML later.</p>
            </details>
            <details>
              <summary>Can parents sign up?</summary>
              <p>Yes — a simple signup/login flow is included for demonstration.</p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-banner about__cta">
          <h2>Ready to explore games?</h2>
          <Link to="/recommendation" className="btn btn-dark">Browse Recommendations</Link>
        </section>

      </div>
    </section>
  );
}
