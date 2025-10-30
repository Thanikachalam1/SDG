import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Donate from "./components/Donate";
import FoodShare from "./components/FoodShare";
import FoodList from "./components/FoodList";
import Dashboard from "./components/Dashboard";

import seedFood from "./data/foodData.json";
import "./App.css";

export default function App() {
  const [foodPosts, setFoodPosts] = useState(seedFood || []);
  const [donations, setDonations] = useState([]);

  // ---- Add new food share post ----
  const addFoodPost = (post) => {
    const withTime = {
      ...post,
      time: new Date().toLocaleString(),
      status: "Available",
    };
    setFoodPosts([withTime, ...foodPosts]);
  };

  // ---- Add new donation ----
  const addDonation = (don) => {
    const withTime = { ...don, time: new Date().toLocaleString() };
    setDonations([withTime, ...donations]);
  };

  // ---- Mark a food post as collected ----
  const markCollected = (index) => {
    setFoodPosts((prev) => {
      const copy = [...prev];
      if (copy[index]) copy[index].status = "Collected";
      return copy;
    });
  };

  return (
    <Router basename="/SDG">
      {/* -------- Navbar -------- */}
      <div className="navbar">
        <div className="container navbar-inner">
          <div className="brand">
            <div className="logo">SE</div>
            <div>
              <div className="brand-title">ShareEase</div>
              <div className="brand-sub">Donate • Share • Care</div>
            </div>
          </div>

          <div className="nav-actions">
            <Link to="/" className="nav-btn">Home</Link>
            <Link to="/donate" className="nav-btn">Donate</Link>
            <Link to="/share" className="nav-btn">Share Food</Link>
            <Link to="/list" className="nav-btn">Listings</Link>
          </div>
        </div>
      </div>

      {/* -------- Main Container -------- */}
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <div className="hero">
                <div style={{ flex: 1 }}>
                  <div className="card">
                    <h1 style={{ margin: 0, fontSize: "28px" }}>
                      ShareEase — Give a little, feed many
                    </h1>
                    <p className="small" style={{ marginTop: 8 }}>
                      Convert small parts of your spend into direct support. Post leftover food so volunteers can pick it up.
                    </p>
                    <div style={{ marginTop: 16 }}>
                      <Link to="/donate" className="btn btn-primary" style={{ marginRight: 10 }}>
                        Donate Now
                      </Link>
                      <Link to="/share" className="btn btn-ghost">
                        Share Food
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          <Route path="/donate" element={<Donate onDonate={addDonation} />} />
          <Route path="/share" element={<FoodShare onPost={addFoodPost} />} />
          <Route path="/list" element={<FoodList posts={foodPosts} onCollect={markCollected} />} />
        </Routes>

        {/* -------- Dashboard -------- */}
        <Dashboard donations={donations} foodPosts={foodPosts} />

        {/* -------- Food Listings -------- */}
        <section style={{ marginTop: 28 }}>
          <h2>Available Food Listings</h2>
          <div style={{ marginTop: 12 }}>
            <FoodList posts={foodPosts} onCollect={markCollected} />
          </div>
        </section>

        {/* -------- Recent Donations -------- */}
        <section style={{ marginTop: 28 }}>
          <h2>Recent Donations</h2>
          <div style={{ marginTop: 12 }}>
            {donations.length === 0 && (
              <div className="small">No donations yet (demo).</div>
            )}
            {donations.map((d, i) => (
              <div
                key={i}
                className="card"
                style={{
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>
                    {d.name || "Anonymous"} — ₹{d.amount}
                  </div>
                  <div className="small">{d.phone || ""}</div>
                </div>
                <div className="small">{d.time}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Router>
  );
}
