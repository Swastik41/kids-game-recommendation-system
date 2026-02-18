import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer footer--premium">
      {/* main columns */}
      <div className="container footer__inner">
        <div className="footer__column">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/recommendation">Game Exploration</Link>
          <Link to="/donation">Support PixiPlay</Link>
        </div>

        <div className="footer__column">
          <h4>Support</h4>
          <Link to="/faq">Help Center & FAQ</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/about">Safety Tips</Link>
          <Link to="/about">Resources</Link>
        </div>

        <div className="footer__column">
          <h4>Legal</h4>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/accessibility">Accessibility</Link>
          <Link to="/about">Child Safety</Link>
        </div>

        <div className="footer__column">
          <h4>Community</h4>
          <Link to="/recommendation">For Parents</Link>
          <Link to="/recommendation">For Teachers</Link>
          <Link to="/recommendation">For Kids</Link>
          <Link to="/about">Our Mission</Link>
        </div>
      </div>

      {/* follow us row */}
      <div className="footer__social-bottom">
        <h4>Follow Us</h4>
        <div className="footer__social-icons">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      {/* copyright */}
      <div className="footer__bottom">
        <p>© {year} PixiPlay — Capstone Project</p>
      </div>
    </footer>
  );
}
