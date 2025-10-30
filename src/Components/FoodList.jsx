import React from "react";

export default function FoodList({ posts = [], onCollect = () => {} }) {
  if (!posts || posts.length === 0) {
    return <div className="small">No food listings right now ,be the first to share.</div>;
  }

  return (
    <div className="food-list">
      {posts.map((p, idx) => (
        <div key={idx} className="food-item">
          <div className="food-main">
            <div className="food-title">{p.description}</div>
            <div className="food-meta">{p.quantity || "—"} • {p.location} {p.contact ? `• ${p.contact}` : ""}</div>
            <div className="small" style={{ marginTop:6 }}>{p.postedBy} • {p.time}</div>
          </div>

          <div className="food-actions">
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8 }}>
              <div style={{ fontSize:12, padding:"6px 10px", borderRadius:8, background: p.status === "Available" ? "#ecfdf5" : "#f1f5f9", color: p.status === "Available" ? "#166534" : "#475569", fontWeight:700 }}>
                {p.status}
              </div>
              <button className="btn btn-ghost" onClick={() => onCollect(idx)} disabled={p.status !== "Available"}>Mark Collected</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
