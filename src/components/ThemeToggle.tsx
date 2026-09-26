"use client";

import { useTheme } from "./ThemeProvider";
import SiteIcon from "./SiteIcon";

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
      <span style={{ display: "inline-flex", verticalAlign: "middle", marginRight: "0.4rem" }}><SiteIcon name={theme === "light" ? "moon" : "sun"} size={16} /></span>
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
