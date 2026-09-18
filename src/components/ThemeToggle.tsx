"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        backgroundColor: "var(--secondary-color)",
        color: "var(--text-main)",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
