// src/components/Dashboard.jsx
import React from "react";
import "./Dashboard.css";

export default function Dashboard({ donations, foodPosts }) {
  const totalAmount = donations.reduce((sum, d) => sum + Number(d.amount || 0), 0);
  const totalShared = foodPosts.length;
  const totalCollected = foodPosts.filter((f) => f.status === "Collected").length;

  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Donations</h3>
          <p className="value">₹{totalAmount}</p>
        </div>

        <div className="stat-card">
          <h3>Food Shared</h3>
          <p className="value">{totalShared}</p>
        </div>

        <div className="stat-card">
          <h3>Food Collected</h3>
          <p className="value">{totalCollected}</p>
        </div>
      </div>
    </div>
  );
}
