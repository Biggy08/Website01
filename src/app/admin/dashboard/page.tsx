"use client";

import { signOut } from "next-auth/react";

export default function AdminDashboard() {
  return (
    <div style={{ padding: "2rem", color: "var(--text-main)" }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Aadhi Code admin panel!</p>
      <button 
        onClick={() => signOut()}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#ff7b72",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
