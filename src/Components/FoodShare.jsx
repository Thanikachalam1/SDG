import React, { useState } from "react";

export default function FoodShare({ onPost }) {
  const [form, setForm] = useState({ postedBy: "", description: "", quantity: "", location: "", contact: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.postedBy || !form.description || !form.location) {
      alert("Please fill at least Posted By, Description and Location");
      return;
    }
    if (onPost) onPost(form);
    setForm({ postedBy: "", description: "", quantity: "", location: "", contact: "" });
    alert("Food posted (in-memory). Volunteers/NGOs can pick it up.");
  };

  return (
    <div style={{ marginTop:20 }}>
      <div className="card">
        <h2 style={{ margin:0 }}>Share Leftover Food</h2>
        <div className="small" style={{ marginTop:6 }}>Quickly post leftover food details so someone can pick it up.</div>

        <form onSubmit={handleSubmit} style={{ marginTop:12 }}>
          <div style={{ marginBottom:10 }}>
            <input className="input" name="postedBy" value={form.postedBy} onChange={handleChange} placeholder="Your name / Restaurant" />
          </div>

          <div style={{ marginBottom:10 }}>
            <input className="input" name="description" value={form.description} onChange={handleChange} placeholder="Food description (e.g., 10 veg boxes - rice + curry)" />
          </div>

          <div style={{ marginBottom:10, display:"flex", gap:10 }}>
            <input className="input" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity (approx)" />
            <input className="input" name="contact" value={form.contact} onChange={handleChange} placeholder="Contact (optional)" />
          </div>

          <div style={{ marginBottom:12 }}>
            <input className="input" name="location" value={form.location} onChange={handleChange} placeholder="Pickup location / address" />
          </div>

          <div style={{ display:"flex", justifyContent:"flex-end" }}>
            <button className="btn btn-primary" type="submit">Post Food</button>
          </div>
        </form>
      </div>
    </div>
  );
}
