"use client";

export default function BrandLogo({ className = "brand-logo", alt = "Aadi Code Pvt Ltd" }: { className?: string; alt?: string }) {
  return <span className={`${className} theme-logo`}>
    <img className="theme-logo-light" src="/images/logo-light.png" alt={alt} />
    <img className="theme-logo-dark" src="/images/logo-dark.png" alt="" aria-hidden="true" />
  </span>;
}
