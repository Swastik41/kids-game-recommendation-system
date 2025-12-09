import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import logo from "../../assets/Logo.jpg";

export default function Header() {
  const [open, setOpen] = useState(false);       // user dropdown
  const [menuOpen, setMenuOpen] = useState(false); // mobile navigation
  const { user, logout } = useAuth();

  const displayName = user?.name?.trim() || "Account";
  const first = displayName.split(" ")[0] || displayName;
  const initials =
    displayName
      .split(" ")
      .map((w) => w[0]?.toUpperCase())
      .slice(0, 2)
      .join("") || "U";

  return (
    <header className="hdr">
      <div className="hdr__row">

        {/* LOGO */}
        <Link to="/" className="brand">
          <img src={logo} alt="PixiPlay Logo" className="brand__img" />
        </Link>

        {/* ==== HAMBURGER MENU (MOBILE ONLY) ==== */}
        <button
          className={`hdr__menu-toggle ${menuOpen ? "hdr__menu-toggle--open" : ""}`}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="hdr__menu-icon"></span>
        </button>

        {/* ==== NAVIGATION ==== */}
        <nav
          className={`nav ${menuOpen ? "nav--open" : ""}`}
          aria-label="Main Navigation"
        >
          <NavLink
            to="/"
            end
            className="nav__link"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/recommendation"
            className="nav__link"
            onClick={() => setMenuOpen(false)}
          >
            Exploration
          </NavLink>

          <NavLink
            to="/about"
            className="nav__link"
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>

          <NavLink
            to="/donation"
            className="nav__link"
            onClick={() => setMenuOpen(false)}
          >
            Donation
          </NavLink>

          {user?.role === "Admin" && (
            <NavLink
              to="/admin/dashboard"
              className="nav__link"
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </NavLink>
          )}

          {/* ==== USER MENU INSIDE MOBILE NAV ==== */}
          <div className="nav__mobile-user">
            {user ? (
              <>
                <div className="nav__user-info">Hello, {displayName}</div>

                {user.role === "Admin" && (
                  <NavLink
                    to="/admin/dashboard"
                    className="nav__link nav__mobile-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    Admin Dashboard
                  </NavLink>
                )}

                <button
                  className="nav__mobile-link"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/signup"
                  className="nav__mobile-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </NavLink>
                <NavLink
                  to="/admin"
                  className="nav__mobile-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>
              </>
            )}
          </div>
        </nav>

        {/* ==== USER DROPDOWN (DESKTOP ONLY) ==== */}
        <div className="user">
          <button
            className="user__btn"
            onClick={() => setOpen((v) => !v)}
            aria-label="User menu"
          >
            <span className="user__avatar">{initials}</span>
            <span className="user__name" title={displayName}>👋 {first}</span>
          </button>

          {open && (
            <div className="user__menu" onMouseLeave={() => setOpen(false)}>
              {user ? (
                <>
                  <div className="user__hi">
                    Signed in as <b>{displayName}</b>
                  </div>

                  {user.role === "Admin" && (
                    <Link
                      to="/admin/dashboard"
                      className="user__item"
                      onClick={() => setOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  <button
                    className="user__item"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    className="user__item"
                    to="/signup"
                    onClick={() => setOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link
                    className="user__item"
                    to="/admin"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
