/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import ThreeLogoCanvas from "./ThreeLogoCanvas";

interface DonmayLogoSymbolProps {
  className?: string;
  size?: number;
}

export function DonmayLogoSymbol({ className = "", size = 32 }: DonmayLogoSymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
    >
      <defs>
        {/* Sky-Blue / Cyan to Amber / Gold vertical gradient for the soundbars */}
        <linearGradient id="blueYellowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="35%" stopColor="#00A2FF" />
          <stop offset="100%" stopColor="#FFA012" />
        </linearGradient>

        {/* Neon blue gradient for the letter D and left M leg */}
        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="100%" stopColor="#0055FF" />
        </linearGradient>

        {/* Golden yellow gradient for the right M leg */}
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFEB3B" />
          <stop offset="100%" stopColor="#FF8A00" />
        </linearGradient>

        {/* Glow filters to give the media-tech look */}
        <filter id="logoGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g filter="url(#logoGlow)">
        {/* Left Side soundwave/EQ equalizer bars */}
        <rect x="8" y="24" width="4.2" height="32" rx="2.1" fill="url(#blueYellowGrad)" />
        <rect x="15.5" y="14" width="4.2" height="52" rx="2.1" fill="url(#blueYellowGrad)" />
        <rect x="23" y="4" width="4.2" height="72" rx="2.1" fill="url(#blueYellowGrad)" />
        <rect x="30.5" y="18" width="4.2" height="44" rx="2.1" fill="url(#blueYellowGrad)" />

        {/* Big Blue "D" Arc */}
        <path
          d="M 46 22 H 54 C 66.5 22, 77 30, 77 40 C 77 50, 66.5 58, 54 58 H 46"
          fill="none"
          stroke="url(#blueGrad)"
          strokeWidth="4.8"
          strokeLinecap="round"
        />

        {/* Futuristic Stylized "M" legs */}
        {/* Left blue leg of M */}
        <path
          d="M 50 58 V 34 L 60 46"
          fill="none"
          stroke="url(#blueGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right golden leg of M */}
        <path
          d="M 60 46 L 70 34 V 58"
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Central interactive glowing vertex circle tag */}
        <circle cx="60" cy="46" r="3.2" fill="#FFEB3B" stroke="#040714" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

interface DonmayLogoProps {
  className?: string;
  symbolSize?: number;
  compact?: boolean;
}

export default function DonmayLogo({ className = "", symbolSize = 34, compact = false }: DonmayLogoProps) {
  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* High Fidelity 3D Extruded Symbol with Slow Float and Interactive Mouse Physics */}
      <ThreeLogoCanvas
        size={symbolSize + 6} // Give slightly more padding to allow 3D rotations without clipping
        scaleFactor={(symbolSize + 6) / 50} // Beautiful proportionate responsive scaling to completely fill bounding box
        cameraZ={65} // Significantly closer along Z-axis for clear framing
        className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
      />

      {/* Corporate Typography Lockup */}
      {!compact && (
        <div className="flex flex-col text-start justify-center">
          <span className="font-display text-white text-sm md:text-base font-extrabold tracking-[0.22em] leading-none uppercase">
            DONMAY
          </span>
          <span className="font-mono text-[8px] tracking-[0.42em] text-[#00F0FF] mt-1 uppercase font-semibold">
            MEDIA &amp; TECH
          </span>
        </div>
      )}
    </div>
  );
}
