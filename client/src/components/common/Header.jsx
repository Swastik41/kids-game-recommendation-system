import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import logo from "../../assets/Logo.jpg";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const headerRef = useRef(null);

  const displayName = user?.name?.trim() || "Account";
  const first = displayName.split(" ")[0] || displayName;
  const initials =
    displayName
      .split(" ")
      .map((w) => w[0]?.toUpperCase())
      .slice(0, 2)
      .join("") || "U";

  useEffect(() => {
    setOpen(false);
    setNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function onPointerDown(event) {
      if (!headerRef.current?.contains(event.target)) {
        setOpen(false);
        setNavOpen(false);
      }
    }

    function onKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
        setNavOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <header className="hdr" ref={headerRef}>
      <div className="hdr__row">

        {/* BRAND */}
        <Link to="/" className="brand">
          <img src={logo} alt="PixiPlay Logo" className="brand__img" />
        </Link>

        <button
          className={`nav-toggle ${navOpen ? "is-open" : ""}`}
          onClick={() => {
            setNavOpen((v) => !v);
            setOpen(false);
          }}
          aria-label="Toggle navigation menu"
          aria-expanded={navOpen}
          aria-controls="main-nav"
        >
          <span />
          <span />
          <span />
        </button>

        {/* NAV */}
        <nav id="main-nav" className={`nav ${navOpen ? "is-open" : ""}`}>
          <NavLink to="/" end className="nav__link" onClick={() => setNavOpen(false)}>Home</NavLink>
          <NavLink to="/recommendation" className="nav__link" onClick={() => setNavOpen(false)}>Exploration</NavLink>
          <NavLink to="/about" className="nav__link" onClick={() => setNavOpen(false)}>About</NavLink>
          <NavLink to="/donation" className="nav__link" onClick={() => setNavOpen(false)}>Donation</NavLink>

          {user?.role === "Admin" && (
            <NavLink to="/admin/dashboard" className="nav__link" onClick={() => setNavOpen(false)}>
              Admin
            </NavLink>
          )}
        </nav>

        {/* USER DROPDOWN */}
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
            <div className="user__menu is-open" onMouseLeave={() => setOpen(false)}>
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
