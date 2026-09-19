"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "var(--secondary-color)",
          borderRadius: "12px",
          border: "1px solid var(--border-color)",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🎉</span>
        <h4 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Thank You, {formData.name || "Friend"}!</h4>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", maxWidth: "340px" }}>
          Your placeholder inquiry has been received. Our team will get back to you shortly.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", message: "" });
          }}
          className="btn-secondary"
          style={{ marginTop: "1.25rem", padding: "0.5rem 1rem", fontSize: "0.85rem" }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
      <div className="form-group">
        <label htmlFor="contact-name">Full Name</label>
        <input
          type="text"
          id="contact-name"
          placeholder="e.g. John Doe"
          className="form-input"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-email">Email Address</label>
        <input
          type="email"
          id="contact-email"
          placeholder="e.g. john@example.com"
          className="form-input"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder="Tell us about your project or inquiry..."
          className="form-textarea"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        />
      </div>

      <button
        type="submit"
        className="btn-primary"
        style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
      >
        Send Message
      </button>
    </form>
  );
}
