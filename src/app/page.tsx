import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import BrandLogo from "@/components/BrandLogo";

export default function Home() {
  return (
    <>
      <header style={{ position: "absolute", top: "1.25rem", right: "1.5rem", zIndex: 100 }}>
        <ThemeToggle />
      </header>

      <main className="main-content">
        <BrandLogo className="home-logo" />
        <div className="hero-badge">
          <span>{"\u{1F680}"}</span>
          <span>Digital Excellence {"\u2022"} Baluwatar, Kathmandu</span>
        </div>

        <h1 className="hero-title">
          Welcome to <span className="hero-title-highlight">Aadi Code Pvt Ltd</span>
        </h1>

        <p className="hero-subtitle">
          Turning ideas into reliable, scalable digital products through thoughtful engineering,
          modern technology, and collaborative innovation.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/info" className="btn-primary" id="explore-info-btn">
            <span>Explore Company Info</span>
            <span aria-hidden="true">{"\u2192"}</span>
          </Link>

          <Link href="/info#contact" className="btn-secondary">
            <span>Contact Us</span>
          </Link>
        </div>
      </main>
    </>
  );
}
