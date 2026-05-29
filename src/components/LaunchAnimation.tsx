/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import DonmayLogo from "./DonmayLogo";

interface LaunchAnimationProps {
  onComplete: () => void;
  key?: string;
}

export default function LaunchAnimation({ onComplete }: LaunchAnimationProps) {
  const [stage, setStage] = useState<"approaching" | "rippling" | "logo_reveal" | "complete">("approaching");

  useEffect(() => {
    // 1. Approaches take 2.2 seconds
    const rippleTimer = setTimeout(() => {
      setStage("rippling");
    }, 2200);

    // 2. Ripple wave expands for 1.2 seconds
    const logoTimer = setTimeout(() => {
      setStage("logo_reveal");
    }, 3400);

    // 3. Logo reveal takes 2.6 seconds
    const completeTimer = setTimeout(() => {
      setStage("complete");
      onComplete();
    }, 6000);

    return () => {
      clearTimeout(rippleTimer);
      clearTimeout(logoTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#040714] digital-grid select-none overflow-hidden">
      {/* Top indicator bar */}
      <div className="absolute top-6 left-8 right-8 flex items-center justify-between font-mono text-[10px] tracking-widest text-[#A0AEC0]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-ping" />
          <span>SYSTEM CORRELATION FEED</span>
        </div>
        <div>
          <span>INITIATIVE: DONMAY</span>
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute bottom-10 px-4 py-2 font-display text-xs tracking-widest text-[#A0AEC0] border border-[#1C64F2]/30 hover:border-[#00F0FF] hover:text-[#FFFFFF] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] rounded bg-[#080B1C]/50 transition-all cursor-pointer"
        id="btn-skip-intro"
      >
        SKIP INIT_SEQUENCE
      </button>

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1C64F2]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Animation Arena */}
      <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center">
        {/* Phase 1: Approaching Vectors */}
        {stage === "approaching" && (
          <div className="absolute inset-0 flex items-center justify-between px-10">
            {/* Sleek Abstract Media UI (Left glides to center) */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "calc(50vw - 320px)", opacity: 1 }}
              transition={{ duration: 2.1, ease: "easeOut" }}
              className="w-80 h-48 rounded-lg border border-[#00F0FF]/40 bg-[#080B1C]/90 p-4 relative panel-glow flex flex-col justify-between"
            >
              <div className="flex items-center justify-between border-b border-[#00F0FF]/20 pb-2">
                <span className="font-mono text-[10px] text-[#00F0FF] tracking-widest">MEDIA_NODE_01 // ACTIVE</span>
                <span className="text-[#00F0FF] text-xs">●</span>
              </div>
              
              {/* Animated waveform in the slider preview */}
              <div className="flex items-end justify-center gap-1 h-14 my-2">
                {[12, 18, 8, 22, 35, 14, 28, 42, 30, 16, 24, 10, 32, 15, 20, 8].map((val, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ height: [val, val * 0.4, val * 1.2, val] }}
                    transition={{ repeat: Infinity, duration: 1.2 + idx * 0.05, ease: "easeInOut" }}
                    className="w-1 bg-gradient-to-t from-[#1C64F2] to-[#00F0FF] rounded-t"
                    style={{ height: val }}
                  />
                ))}
              </div>

              <div className="flex justify-between items-center font-mono text-[8px] text-[#A0AEC0]">
                <span>FPS: 60.00</span>
                <span>CH: INTERACTIVE-HIFI</span>
                <span>SAMP: 96.0 KHZ</span>
              </div>
            </motion.div>

            {/* Highly detailed Cybernetic Technical Arm (Right glides to center) */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "calc(-50vw + 320px)", opacity: 1 }}
              transition={{ duration: 2.1, ease: "easeOut" }}
              className="w-80 h-48 flex items-center justify-end font-mono"
            >
              <svg className="w-full h-full" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Arm base mount on right */}
                <path d="M320 100 L240 100" stroke="#1C64F2" strokeWidth="4" strokeDasharray="3 3" />
                <rect x="250" y="80" width="20" height="40" fill="#080B1C" stroke="#1C64F2" strokeWidth="2" rx="4" />
                {/* Cybernetic Hydraulic cylinders */}
                <path d="M250 90 L160 60" stroke="#1C64F2" strokeWidth="3" />
                <path d="M250 110 L160 140" stroke="#1C64F2" strokeWidth="3" />
                {/* Cylinder sleeves */}
                <rect x="210" y="75" width="30" height="8" transform="rotate(-18 210 75)" fill="#A0AEC0" stroke="#1C64F2" />
                <rect x="210" y="115" width="30" height="8" transform="rotate(18 210 115)" fill="#A0AEC0" stroke="#1C64F2" />
                {/* Core Arm Joint */}
                <circle cx="160" cy="100" r="16" fill="#080B1C" stroke="#00F0FF" strokeWidth="2" className="animate-pulse" />
                <circle cx="160" cy="100" r="6" fill="#00F0FF" />
                {/* Lower Arm segment */}
                <path d="M160 100 L60 100" stroke="#A0AEC0" strokeWidth="6" />
                <path d="M150 110 L80 110" stroke="#00F0FF" strokeWidth="1.5" />
                {/* Gripper Wrist */}
                <rect x="50" y="85" width="12" height="30" fill="#080B1C" stroke="#1C64F2" strokeWidth="2" />
                {/* Cybernetic Actuators */}
                <path d="M50 90 L10 75 L0 80" stroke="#1C64F2" strokeWidth="2" strokeLinecap="round" />
                <path d="M50 110 L10 125 L0 120" stroke="#1C64F2" strokeWidth="2" strokeLinecap="round" />
                {/* Energy spark at tip */}
                <circle cx="0" cy="100" r="4" fill="#00F0FF" className="animate-ping" />
              </svg>
            </motion.div>
          </div>
        )}

        {/* Phase 2: Ripple Wave Expansion */}
        {stage === "rippling" && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* The Central Fusion Core */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: [0.5, 1.5, 1], opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#1C64F2] to-[#00F0FF] flex items-center justify-center relative cyan-pulse-glow"
            >
              <div className="absolute inset-1 rounded-full bg-[#040714] flex items-center justify-center">
                <span className="font-mono text-xs text-[#00F0FF] animate-pulse">Ω</span>
              </div>
            </motion.div>

            {/* Expansive concentric rings */}
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                initial={{ width: 40, height: 40, opacity: 0.8 }}
                animate={{ width: 800, height: 800, opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeOut", delay: (ring - 1) * 0.3 }}
                className="absolute rounded-full border border-dashed border-[#00F0FF] pointer-events-none"
              />
            ))}

            <motion.div
              initial={{ scale: 1, opacity: 0.9 }}
              animate={{ scale: 40, opacity: 0 }}
              transition={{ duration: 1.3, ease: "linear" }}
              className="absolute w-12 h-12 bg-gradient-to-r from-[#1C64F2]/30 to-[#00F0FF]/30 rounded-full filter blur-md"
            />
          </div>
        )}

        {/* Phase 3: Logo and Brand Reveal */}
        {stage === "logo_reveal" && (
          <div className="absolute flex flex-col items-center justify-center text-center">
            {/* Ambient Particle Sparks */}
            <div className="absolute inset-x-0 -top-24 flex justify-center gap-12 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: -60, opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8 + i * 0.2, ease: "easeOut" }}
                  className="w-1 h-3 bg-[#00F0FF]"
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              {/* Genuine Donmay Soundways Symbol */}
              <div className="mb-6 flex items-center justify-center relative">
                <div className="absolute inset-x-0 -inset-y-2 bg-[#00F0FF]/10 filter blur-xl rounded-full animate-pulse pointer-events-none" />
                <DonmayLogo symbolSize={76} compact={true} />
              </div>

              {/* Company Logo Text */}
              <h1 className="font-display text-2xl md:text-4xl font-extrabold tracking-[0.35em] text-white">
                DONMAY
              </h1>
              <span className="font-mono text-xs md:text-sm tracking-[0.5em] text-[#00F0FF] mt-3 uppercase font-semibold">
                MEDIA &amp; TECHNOLOGY
              </span>

              {/* Sub-line */}
              <p className="font-sans text-xs tracking-widest text-[#A0AEC0] mt-6 max-w-md line-clamp-2 uppercase leading-relaxed text-center">
                ENGINEERING THE FUTURE OF SOFTWARE &amp; MEDIA EXECUTION
              </p>

              {/* Progress bar simulation */}
              <div className="w-48 h-1 bg-[#080B1C] rounded overflow-hidden mt-8 border border-[#1C64F2]/20">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-[#1C64F2] to-[#00F0FF]"
                />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
