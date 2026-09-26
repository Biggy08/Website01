"use client";

import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import BrandLogo from "./BrandLogo";

interface NavbarProps {
  showBackHome?: boolean;
}

export default function Navbar({ showBackHome = true }: NavbarProps) {
  const router = useRouter();
  const brandClickCount = useRef(0);
  const brandClickTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function handleBrandClick() {
    brandClickCount.current += 1;

    if (brandClickTimeout.current) {
      clearTimeout(brandClickTimeout.current);
    }

    if (brandClickCount.current === 3) {
      brandClickCount.current = 0;
      router.push("/admin/login");
      return;
    }

    brandClickTimeout.current = setTimeout(() => {
      brandClickCount.current = 0;
    }, 700);
  }

  return (
    <header className="top-navbar">
      <div className="navbar-container">
        <button
          type="button"
          className="nav-brand admin-entry-trigger"
          onClick={handleBrandClick}
          aria-label="Aadi Code Pvt Ltd"
        >
          <BrandLogo />
          <span>Aadi Code Pvt Ltd</span>
        </button>

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
              <a href="#vision" className="nav-item-link">
                Vision
              </a>
            </li>
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
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
