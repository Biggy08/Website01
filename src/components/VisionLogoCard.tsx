"use client";

import { useState } from "react";
import BrandLogo from "./BrandLogo";

export default function VisionLogoCard() {
  const [flipped, setFlipped] = useState(false);
  return <button type="button" className={`vision-logo-card ${flipped ? "is-flipped" : ""}`} onClick={() => setFlipped(!flipped)} aria-label={flipped ? "Show company logo" : "Show office location map"}>
    <span className="vision-logo-card-inner">
      <span className="vision-logo-face vision-logo-front"><BrandLogo className="vision-logo" /><span>Click to find us in Baluwatar</span></span>
      <span className="vision-logo-face vision-logo-back"><iframe title="Aadi Code Pvt Ltd placeholder office location" src="https://www.google.com/maps?q=27.7243,85.3285&z=15&output=embed" loading="lazy" /><span>Baluwatar, Kathmandu · Click to return</span></span>
    </span>
  </button>;
}
