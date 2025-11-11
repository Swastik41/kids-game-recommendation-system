
import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import logo from "../../assets/Logo.jpg";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAdminArea = location.pathname.startsWith("/admin/");
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
        {/* Brand */}
        <Link to="/" className="brand">
          <img src={logo} alt="PixiPlay Logo" className="brand__img" />
        </Link>
        {/* Nav */}
        {!isAdminArea && (
          <nav className="nav">
            <NavLink to="/" end className="nav__link">Home</NavLink>
            <NavLink to="/recommendation" className="nav__link">Recommendation</NavLink>
            <NavLink to="/about" className="nav__link">About</NavLink>
          </nav>
        )}
        {/* User */}
        <div className="user">
          <button className="user__btn" onClick={() => setOpen(v => !v)} aria-label="User menu">
            <span className="user__avatar">{initials}</span>
            <span className="user__name" title={displayName}>👋 {first}</span>
          </button>

          {open && (
            <div className="user__menu" onMouseLeave={() => setOpen(false)}>
              {user ? (
                <>
                  <div className="user__hi">Signed in as <b>{displayName}</b></div>
                  {!isAdminArea && (
                    <button className="user__item" onClick={() => { setOpen(false); logout(); }}>
                      Logout
                    </button>
                  )}
                </>
              ) : (
                <>
                  <Link className="user__item" to="/signup" onClick={() => setOpen(false)}>Sign Up</Link>
                  <Link className="user__item" to="/admin" onClick={() => setOpen(false)}>Login</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
