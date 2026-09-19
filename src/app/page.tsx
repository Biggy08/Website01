import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <>
      <header style={{ position: "absolute", top: "1.25rem", right: "1.5rem", display: "flex", gap: "1rem", zIndex: 100, alignItems: "center" }}>
        <Link
          href="/admin/dashboard"
          style={{
            color: "var(--text-muted)",
            textDecoration: "none",
            fontSize: "0.875rem",
            fontWeight: "600",
            padding: "0.4rem 0.75rem",
            borderRadius: "6px",
            border: "1px solid var(--border-color)",
            backgroundColor: "var(--secondary-color)",
          }}
        >
          🔒 Admin
        </Link>
        <ThemeToggle />
      </header>

      <main className="main-content">
        <div className="hero-badge">
          <span>🚀</span>
          <span>Digital Excellence • Baluwatar, Kathmandu</span>
        </div>

        <h1 className="hero-title">
          Welcome to <span className="hero-title-highlight">Aadhi Code</span>
        </h1>

        <p className="hero-subtitle">
          Turning ideas into reliable, scalable digital products through thoughtful engineering,
          modern technology, and collaborative innovation.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/info" className="btn-primary" id="explore-info-btn">
            <span>Explore Company Info</span>
            <span aria-hidden="true">→</span>
          </Link>

          <Link href="/info#contact" className="btn-secondary">
            <span>Contact Us</span>
          </Link>
        </div>
      </main>
    </>
  );
}
