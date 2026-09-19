"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  showBackHome?: boolean;
}

export default function Navbar({ showBackHome = true }: NavbarProps) {
  return (
    <header className="top-navbar">
      <div className="navbar-container">
        <Link href="/" className="nav-brand">
          <span style={{ fontSize: "1.35rem" }}>⚡</span>
          <span>Aadhi Code</span>
        </Link>

        <nav aria-label="Sections Navigation">
          <ul className="nav-links">
            {showBackHome && (
              <li>
                <Link href="/" className="nav-item-link">
                  Home
                </Link>
              </li>
            )}
            <li>
              <a href="#about" className="nav-item-link">
                About Us
              </a>
            </li>
            <li>
              <a href="#members" className="nav-item-link">
                Members
              </a>
            </li>
            <li>
              <a href="#works" className="nav-item-link">
                Previous Works
              </a>
            </li>
            <li>
              <a href="#projects" className="nav-item-link">
                Projects
              </a>
            </li>
            <li>
              <a href="#manpower" className="nav-item-link">
                Manpower
              </a>
            </li>
            <li>
              <a href="#collaborations" className="nav-item-link">
                Collaborations
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-item-link">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          <Link
            href="/admin/dashboard"
            style={{
              fontSize: "0.85rem",
              fontWeight: "600",
              color: "var(--text-muted)",
              padding: "0.4rem 0.6rem",
              borderRadius: "6px",
              border: "1px solid var(--border-color)",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            <span>🔒</span>
            <span>Admin</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
