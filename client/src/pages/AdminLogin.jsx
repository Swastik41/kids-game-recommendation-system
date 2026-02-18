import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function AdminLogin() {
  const { login } = useAuth();
  const [role, setRole] = useState("Parent");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      const u = await login({ email, password });

      // Optional: role consistency check
      const want = (role || "").toLowerCase();
      const got = (u?.role || "").toLowerCase();
      if (want && got && want !== got) {
        setMessage(`You selected "${role}" but this account is "${u?.role ?? "unknown"}".`);
        setLoading(false);
        return;
      }

      // ✅ Navigate to home after successful login
      navigate("/");
    } catch (err) {
      setMessage(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login">
      <div className="login__card">
        <h1 className="login__title">Welcome Back</h1>
        <p className="login__subtitle">
          Sign in to continue your game exploration journey with personalized,
          age-appropriate recommendations.
        </p>

        <form onSubmit={handleSubmit} className="login__form" autoComplete="off">
          <div className="field">
            <label className="label">Role (optional)</label>
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setMessage("");
              }}
              className="select"
            >
              <option>Parent</option>
              <option>Admin</option>
              
            </select>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage("");
              }}
              placeholder="you@example.com"
              required
              autoComplete="off"
            />
          </div>

          <div className="field">
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setMessage("");
              }}
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />
          </div>

          {message && <div className="login__msg">{message}</div>}

          <div className="login__actions">
            <button
              type="submit"
              disabled={loading}
              className="btn btn--primary"
            >
              {loading ? "Signing in…" : "Log In"}
            </button>

            <div className="login__help">
              Don’t have an account?{" "}
              <Link to="/signup" className="link">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
