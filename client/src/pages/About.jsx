// client/src/pages/About.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";

export default function About() {
  return (
    <main className="page about">
      {/* HERO */}
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__eyebrow">About PixiPlay</p>
          <h1>Helping kids play smarter, not just longer.</h1>
          <p className="page-hero__subtitle">
            PixiPlay is a kid-focused game recommendation platform that helps
            parents and teachers turn random screen time into intentional,
            age-appropriate play time – without spending hours searching.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="section section--light">
        <div className="container grid grid--2">
          <div>
            <h2>Our story</h2>
            <p>
              We noticed something simple: kids discover games faster than
              adults can check whether they’re actually a good fit. App stores
              are full of “trending” and “top free” lists – but not every title
              is right for a 7, 9 or 12-year-old.
            </p>
            <p>
              PixiPlay was created to bridge that gap. Instead of being another
              game, PixiPlay acts as a{" "}
              <strong>decision helper for families and classrooms</strong>. It
              pulls together information about games and presents it in a way
              that makes sense to the people who care most about kids: parents
              and teachers.
            </p>
          </div>

          <div>
            <h3>What PixiPlay is (and isn’t)</h3>
            <ul className="list">
              <li>• A place to discover kid-friendly games with context.</li>
              <li>
                • A way to balance fun with learning, problem-solving and
                creativity.
              </li>
              <li>• A shared starting point for families and classrooms.</li>
              <li>✘ Not a replacement for parental or teacher judgment.</li>
              <li>✘ Not a pay-to-promote ad platform for game studios.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* HOW WE RECOMMEND */}
      <section className="section">
        <div className="container">
          <header className="section__header">
            <h2>How our recommendations work</h2>
            <p>
              PixiPlay uses structured information about each game plus a few
              simple questions from adults. The goal isn’t to be mysterious –
              it’s to be clear and transparent.
            </p>
          </header>

          <div className="grid grid--3">
            <article className="card feature">
              <h3>1. Curated game profiles</h3>
              <p>
                Every game in our library includes details like age range,
                genre, difficulty level, estimated session length, and whether
                it includes in-game ads or purchases.
              </p>
            </article>
            <article className="card feature">
              <h3>2. Inputs from parents & teachers</h3>
              <p>
                Adults select the child’s age, the device, how much time they
                have, and what they’re aiming for – pure fun, practice, or a
                mix of both.
              </p>
            </article>
            <article className="card feature">
              <h3>3. A focused, tailored list</h3>
              <p>
                PixiPlay then narrows things down to a short list of games that
                match those choices, with clear labels so adults can make the
                final call quickly and confidently.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* WHO IT’S FOR */}
      <section className="section section--alt">
        <div className="container">
          <header className="section__header">
            <h2>Designed for everyone around the kids</h2>
            <p>
              PixiPlay keeps the child at the center while supporting the
              people who guide their digital habits day to day.
            </p>
          </header>

          <div className="grid grid--3">
            <article className="card persona">
              <h3>Parents</h3>
              <p>
                Get a quick overview of what each game offers – and what to be
                aware of – before saying “yes” to a new download or website.
              </p>
              <ul className="list">
                <li>• Filter by age, genre and mood.</li>
                <li>• Spot difficulty and focus level at a glance.</li>
                <li>• Use PixiPlay as a “first check” for new games.</li>
              </ul>
            </article>

            <article className="card persona">
              <h3>Teachers</h3>
              <p>
                Find titles that feel like play for students but still support
                core skills like logic, numeracy, literacy and collaboration.
              </p>
              <ul className="list">
                <li>• Plan quick game sessions for early finishers.</li>
                <li>• Match games to topics or skills.</li>
                <li>• Mix solo and group-friendly options.</li>
              </ul>
            </article>

            <article className="card persona">
              <h3>Kids</h3>
              <p>
                Kids experience PixiPlay as a fun gallery of games with bright
                visuals and clear difficulty tags – not a long list of rules.
              </p>
              <ul className="list">
                <li>• Discover new games safely.</li>
                <li>• Pick their own “challenge level”.</li>
                <li>• Feel proud progressing to harder games.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* SAFETY & VALUES */}
      <section className="section">
        <div className="container grid grid--2">
          <div>
            <h2>Our approach to safety</h2>
            <p>
              We believe fun and safety shouldn’t compete. PixiPlay looks at
              more than just star ratings – it focuses on how a game actually
              feels to play for a child in a specific age range.
            </p>
            <ul className="list">
              <li>• Content flags for violence or mature themes.</li>
              <li>• Notes on in-game ads and purchase mechanics.</li>
              <li>• Guidance on age suitability and intensity.</li>
            </ul>
          </div>

          <div>
            <h3>What we value</h3>
            <ul className="list">
              <li>
                <strong>Healthy screen habits.</strong> Games should feel
                rewarding, not manipulative or endless.
              </li>
              <li>
                <strong>Partnership with adults.</strong> PixiPlay supports
                parents and teachers – it doesn’t replace them.
              </li>
              <li>
                <strong>Balanced development.</strong> Entertainment matters,
                but so do curiosity, problem-solving and creativity.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--light">
        <div className="container">
          <header className="section__header">
            <h2>Frequently asked questions</h2>
          </header>

          <div className="faq">
            <details>
              <summary>Do you host or sell the games in PixiPlay?</summary>
              <p>
                No. PixiPlay is a recommendation and discovery layer. It helps
                you choose which games to consider, but the games themselves are
                hosted on their original platforms or websites.
              </p>
            </details>

            <details>
              <summary>Can I use PixiPlay in a classroom?</summary>
              <p>
                Yes. Many categories and tags are designed with classrooms in
                mind – including short-session games, logic challenges and
                activities that work well in pairs or small groups.
              </p>
            </details>

            <details>
              <summary>Does PixiPlay replace parental controls?</summary>
              <p>
                No. We recommend that PixiPlay is used alongside device or
                platform parental controls. Parental controls set the limits;
                PixiPlay helps decide what fills that time.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section cta">
        <div className="cta__content">
          <div>
            <h2>See how PixiPlay changes the “What should we play?” question.</h2>
            <p>
              Try building a recommendation for a real child in your life.
              You’ll see how quickly conversations shift from scrolling to
              choosing together.
            </p>
          </div>
          <div className="cta__actions">
            <Link to="/recommendation" className="btn btn-primary">
              Build a game list
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
