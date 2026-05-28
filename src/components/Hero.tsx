/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ChevronDown, Layers, Terminal } from "lucide-react";

interface HeroProps {
  onExploreApps: () => void;
  onOrderCustomBuild: () => void;
}

export default function Hero({ onExploreApps, onOrderCustomBuild }: HeroProps) {
  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden bg-[#040714] select-none"
    >
      {/* Background Subtle Digital Mesh Overlay */}
      <div className="absolute inset-0 digital-grid opacity-85 pointer-events-none" />
      
      {/* Low-opacity ambient radial blue/cyan blurs for three-dimensional depth */}
      <div className="absolute top-[40%] left-1/4 -translate-y-1/2 -translate-x-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-[#1C64F2]/8 blur-[100px] md:blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-[50%] right-1/4 -translate-y-1/2 translate-x-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#00F0FF]/6 blur-[90px] md:blur-[120px] rounded-full pointer-events-none" />

      {/* Futuristic Ring Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[700px] h-[400px] md:h-[700px] border border-[#1C64F2]/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[450px] h-[250px] md:h-[450px] border border-[#00F0FF]/5 rounded-full border-dashed pointer-events-none" />

      {/* Tech Line Grid Borders */}
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#1C64F2]/10 to-transparent Hidden lg:block" />
      <div className="absolute right-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#1C64F2]/10 to-transparent Hidden lg:block" />

      <div className="relative max-w-5xl mx-auto px-6 text-center flex flex-col items-center z-10">
        {/* Modern Little Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#080B1C] border border-[#1C64F2]/30 text-[#00F0FF] text-[10px] md:text-xs font-mono tracking-wider mb-8 shadow-[0_0_15px_rgba(28,100,242,0.15)]"
        >
          <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-ping" />
          <span>GLOBAL TECH INFRASTRUCTURE MODULE // ACTIVE</span>
        </motion.div>

        {/* Hero Main Brand Statement */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display font-black text-3xl sm:text-4xl md:text-6xl text-[#FFFFFF] tracking-[0.06em] leading-[1.12] uppercase max-w-4xl"
        >
          Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#1C64F2] to-[#00F0FF]">Future</span> of Media &amp; Software Execution
        </motion.h2>

        {/* Supporting description (Clean body font) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="font-sans text-sm md:text-base text-[#A0AEC0] mt-8 max-w-2xl leading-relaxed tracking-wide uppercase"
        >
          High-performance trading automation cores, mathematical analytics, and bespoke digital assets custom forged to advance critical global enterprises.
        </motion.p>

        {/* Two CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-12 w-full justify-center px-4"
        >
          {/* Explore Proprietary Apps */}
          <button
            onClick={onExploreApps}
            className="px-6 py-3.5 font-display text-xs tracking-widest text-[#FFFFFF] bg-[#080B1C] border border-[#00F0FF] hover:border-[#1C64F2] rounded hover:shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:text-[#00F0FF] transition-all flex items-center justify-center gap-2 cursor-pointer group"
            id="btn-hero-explore"
          >
            <Layers className="w-4 h-4 text-[#00F0FF] group-hover:scale-110 transition-transform" />
            <span>EXPLORE PROPRIETARY APPS</span>
          </button>

          {/* Order Custom Build */}
          <button
            onClick={onOrderCustomBuild}
            className="px-6 py-3.5 font-display text-xs tracking-widest text-[#040714] bg-gradient-to-r from-[#1C64F2] to-[#00F0FF] hover:from-[#00F0FF] hover:to-[#1C64F2] font-semibold rounded hover:shadow-[0_0_20px_rgba(28,100,242,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer group"
            id="btn-hero-order"
          >
            <Terminal className="w-4 h-4 text-[#040714]" />
            <span>ORDER CUSTOM BUILD</span>
          </button>
        </motion.div>
      </div>

      {/* Down Chevron indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 flex flex-col items-center gap-1 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        onClick={onExploreApps}
      >
        <span className="font-mono text-[9px] tracking-widest text-[#A0AEC0]">ECOSYSTEM AT RUNTIME</span>
        <ChevronDown className="w-4 h-4 text-[#1C64F2]" />
      </motion.div>
    </section>
  );
}
