import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Signup() {
  const { register } = useAuth();
  const [role, setRole] = useState("Parent");
  const [fullName, setFullName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!agree) { setMessage("Please agree to the terms to continue."); return; }
    if (password !== confirm) { setMessage("Passwords do not match."); return; }

    try {
      setLoading(true);

      // Create the account (do NOT log in here)
      await register({
        name: fullName,
        role,
        email,
        password,
        childAge: childAge || undefined,
      });

      // Make sure no token/user remains (in case register() stored them)
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }

      // ✅ Go to LOGIN page after sign up (not Home)
      navigate("/admin", {
        state: { flash: "Account created successfully! Please log in." },
        replace: true,
      });
    } catch (err) {
      setMessage(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="signup">
      <div className="signup__card">
        <h1 className="signup__title">Create an Account</h1>
        <p className="signup__subtitle">
          Build your family or classroom profile to get safer, smarter, and
          more effective game exploration results.
        </p>

        <form className="signup__form" onSubmit={handleSubmit} autoComplete="off">
          <div className="field">
            <label className="label">Role</label>
            <select
              className="select"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setMessage("");
              }}
            >
              <option value="Parent">Parent</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="field">
            <label className="label">Full Name</label>
            <input
              className="input"
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setMessage("");
              }}
              placeholder="Your full name"
              required
              autoComplete="off"
            />
          </div>

          <div className="field">
            <label className="label">Child Age (optional)</label>
            <input
              className="input"
              type="number"
              value={childAge}
              onChange={(e) => {
                setChildAge(e.target.value);
                setMessage("");
              }}
              min="1"
              max="18"
              placeholder="e.g., 7"
              autoComplete="off"
            />
          </div>

          <div className="field">
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
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
              className="input"
              type="password"
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

          <div className="field">
            <label className="label">Confirm Password</label>
            <input
              className="input"
              type="password"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                setMessage("");
              }}
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />
          </div>

          <div className="field field--full">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => {
                  setAgree(e.target.checked);
                  setMessage("");
                }}
              />
              I agree to the Terms
            </label>
          </div>

          {message && <div className="msg msg--error">{message}</div>}

          <div className="actions">
            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? "Creating account…" : "Sign Up"}
            </button>
            <div className="help">
              Already have an account?{" "}
              <Link className="link" to="/admin">Log in</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}