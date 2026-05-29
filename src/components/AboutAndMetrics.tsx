/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Info, Layers, Users, Globe, Activity, Terminal, Shield, Share2, Music, Film } from "lucide-react";

interface AboutAndMetricsProps {
  onOpenAcousticLab: () => void;
}

export default function AboutAndMetrics({ onOpenAcousticLab }: AboutAndMetricsProps) {
  return (
    <section 
      id="about-section" 
      className="py-24 px-6 md:px-12 border-t border-[#1C64F2]/10 bg-[#040714] relative overflow-hidden select-none"
    >
      {/* Decorative background radial glows */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#1C64F2]/3 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 digital-grid opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* =============== ABOUT US RECONSTRUCTION =============== */}
        <div className="mb-24">
          <div className="flex flex-col items-center text-center gap-4 mb-16">
            <div className="inline-flex items-center gap-2 text-[#00F0FF] font-mono text-xs tracking-[0.2em] uppercase">
              <Info className="w-4 h-4 text-[#00F0FF] animate-pulse" />
              <span>CORPORATE NARRATIVE // FULL-SUITE AGENCY PORTFOLIO</span>
            </div>
            
            <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-widest uppercase leading-tight mt-2 max-w-4xl">
              Bespoke <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#1C64F2] to-[#00F0FF]">Software &amp; Creative</span> Execution
            </h2>

            <div className="w-24 h-[2px] bg-gradient-to-r from-[#1C64F2] to-[#00F0FF] mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Pillar 1: Global Growth & Social Architecture */}
            <div className="p-8 transition-all duration-300 rounded-lg border border-[#1C64F2]/15 bg-[#080B1C]/55 hover:border-[#00F0FF]/50 relative group flex flex-col justify-between hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]">
              <div>
                <div className="w-12 h-12 rounded bg-[#1C64F2]/10 border border-[#1C64F2]/30 flex items-center justify-center mb-6 group-hover:border-[#00F0FF] transition-colors">
                  <Share2 className="w-5 h-5 text-[#00F0FF]" />
                </div>
                <h3 className="font-display font-black text-lg text-white tracking-wider uppercase mb-4">
                  01 // Global Growth &amp; Social Architecture
                </h3>
                <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed font-medium">
                  Donmay Media &amp; Technology actively manages and scales the social media presence for clients around the world. We specialize in the "Growth Experience"—how we reverse-engineer viral patterns and execute data-driven distribution models to systematically expand reach, drive engagement, and transform ordinary channels into authoritative global platforms.
                </p>
              </div>
              <div className="font-mono text-[9px] text-[#00F0FF] tracking-widest uppercase mt-6 pt-4 border-t border-[#1C64F2]/10">
                ACTIVE DIGITAL OUTPOSTS
              </div>
            </div>

            {/* Pillar 2: Custom Acoustic & Sound Synthesis */}
            <div className="p-8 transition-all duration-300 rounded-lg border border-[#1C64F2]/15 bg-[#080B1C]/55 hover:border-purple-500/50 relative group flex flex-col justify-between hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
              <div>
                <div className="w-12 h-12 rounded bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-6 group-hover:border-purple-400 transition-colors">
                  <Music className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="font-display font-black text-lg text-white tracking-wider uppercase mb-4">
                  02 // Custom Acoustic &amp; Sound Synthesis
                </h3>
                <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed font-medium">
                  We explicitly highlight our custom music and soundtrack production services. Our studio composes high-end, tailored audio projects ranging from cinematic modeling scoring for commercial films and movies, to deeply personal custom soundtracks for monumental celebrations such as weddings, birthdays, and anniversaries with full commercial licensing rights.
                </p>
                
                <button
                  onClick={onOpenAcousticLab}
                  className="mt-5 w-full py-2.5 rounded border border-purple-500/30 hover:border-purple-400 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-mono text-[9.5px] uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Music className="w-3.5 h-3.5" />
                  <span>OPEN MUSIC PROTOCOL →</span>
                </button>
              </div>
              <div className="font-mono text-[9px] text-purple-400 tracking-widest uppercase mt-6 pt-4 border-t border-[#1C64F2]/10">
                100% EXCLUSIVE LICENSE
              </div>
            </div>

            {/* Pillar 3: Next-Gen Creative Media & Visuals */}
            <div className="p-8 transition-all duration-300 rounded-lg border border-[#1C64F2]/15 bg-[#080B1C]/55 hover:border-emerald-500/50 relative group flex flex-col justify-between hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <div>
                <div className="w-12 h-12 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 group-hover:border-emerald-400 transition-colors">
                  <Film className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-display font-black text-lg text-white tracking-wider uppercase mb-4">
                  03 // Next-Gen Creative Media &amp; Visuals
                </h3>
                <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed font-medium">
                  Detailing our premium visual editing studio capabilities, we showcase our expertise in advanced, high-density cinematic video editing and high-fidelity custom cartoon animations designed for modern digital publishers, creators, and corporate brands.
                </p>
              </div>
              <div className="font-mono text-[9px] text-emerald-400 tracking-widest uppercase mt-6 pt-4 border-t border-[#1C64F2]/10">
                STUDIO PIPELINE v3.9
              </div>
            </div>

          </div>
        </div>

        {/* =============== LIVE DATA METRICS DASHBOARD (BENTO GRID) =============== */}
        <div className="border-t border-[#1C64F2]/15 pt-16">
          <div className="mb-12 text-center md:text-left">
            <span className="font-mono text-[10px] text-[#00F0FF] tracking-[0.25em] block mb-2 uppercase font-black">
              REAL-TIME ANALYTICS CORE // TELEMETRY
            </span>
            <h3 className="font-display font-black text-2xl text-white tracking-widest uppercase">
              Live Data Metrics Dashboard
            </h3>
          </div>

          {/* Bento grid panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="telemetry-bento-grid">
            
            {/* Card 1 */}
            <div className="p-6 rounded-lg bg-black/95 border border-[#1C64F2]/20 flex flex-col justify-between min-h-[140px] hover:border-[#00F0FF]/50 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] group">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] text-[#A0AEC0] tracking-widest uppercase font-bold">
                  PROPRIETARY MODULES
                </span>
                <Layers className="w-4 h-4 text-[#00F0FF] group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-4">
                <span className="font-display text-2xl md:text-3xl font-black text-[#00F0FF] tracking-tight block">
                  06 Active
                </span>
                <span className="font-mono text-[8px] text-[#A0AEC0]/70 uppercase tracking-wider block mt-1">
                  100% ONLINE REPLICAS
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-lg bg-black/95 border border-[#1C64F2]/20 flex flex-col justify-between min-h-[140px] hover:border-[#00F0FF]/50 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] group">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] text-[#A0AEC0] tracking-widest uppercase font-bold">
                  TOTAL ACTIVE USERS
                </span>
                <Users className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-4">
                <span className="font-display text-2xl md:text-3xl font-black text-purple-400 tracking-tight block">
                  12K+
                </span>
                <span className="font-mono text-[8px] text-[#A0AEC0]/70 uppercase tracking-wider block mt-1">
                  SECURE PORT CONNECTIONS
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-lg bg-black/95 border border-[#1C64F2]/20 flex flex-col justify-between min-h-[140px] hover:border-[#00F0FF]/50 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] group">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] text-[#A0AEC0] tracking-widest uppercase font-bold">
                  GEO-NODES CONNECTED
                </span>
                <Globe className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-4">
                <span className="font-display text-2xl md:text-3xl font-black text-emerald-400 tracking-tight block">
                  14 Global
                </span>
                <span className="font-mono text-[8px] text-[#A0AEC0]/70 uppercase tracking-wider block mt-1">
                  LATENCY CORE STREAMS
                </span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-lg bg-black/95 border border-[#1C64F2]/20 flex flex-col justify-between min-h-[140px] hover:border-[#00F0FF]/50 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] group">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] text-[#A0AEC0] tracking-widest uppercase font-bold">
                  TRANSACTION CHANNELS
                </span>
                <ThemeActivityIcon className="w-4 h-4 text-amber-500 animate-pulse" />
              </div>
              <div className="mt-4">
                <span className="font-display text-2xl md:text-3xl font-black text-amber-500 tracking-tight block">
                  24/7 Live
                </span>
                <span className="font-mono text-[8px] text-[#A0AEC0]/70 uppercase tracking-wider block mt-1">
                  SELAR GATEWAY LINK ACTIVE
                </span>
              </div>
            </div>

            {/* Bottom Long Bar spanning the bento grid */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-4 p-4 rounded-lg bg-black/90 border border-[#1C64F2]/20 hover:border-[#1C64F2]/45 transition-all flex items-center justify-between shadow-[0_0_15px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-[10px] text-white tracking-[0.15em] uppercase font-bold">
                  SYSTEM CORE V2.0 // OPTIMAL EXECUTION
                </span>
              </div>
              <span className="font-mono text-[8.5px] text-[#A0AEC0] uppercase tracking-widest hidden sm:inline">
                FIREBASE STACK HEALTHY // SSL TERMINAL VERIFIED
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

// Low-profile helper to render standard lucide Activity without namespace bugs
function ThemeActivityIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
