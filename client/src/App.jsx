// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";

import Home from "./pages/Home.jsx";
import Recommendation from "./pages/Recommendation.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import Signup from "./pages/Signup.jsx";
import About from "./pages/About.jsx";

import "./styles/index.css";

export default function App() {
  return (
    <div className="app-shell">
      <Header />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
