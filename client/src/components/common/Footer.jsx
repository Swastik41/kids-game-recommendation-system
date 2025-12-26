import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaTwitter,
  FaYoutube,
  FaHome,
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
          <Link to="/recommendation">Recommendations</Link>
          <Link to="/donation">Donation</Link>
        </div>

        <div className="footer__column">
          <h4>Parents</h4>
          <Link to="#">Safety Tips</Link>
          <Link to="#">Screen Balance</Link>
          <Link to="#">Learning Games</Link>
        </div>

        <div className="footer__column">
          <h4>Teachers</h4>
          <Link to="#">Classroom Games</Link>
          <Link to="#">Skill Builders</Link>
          <Link to="#">Resources</Link>
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
