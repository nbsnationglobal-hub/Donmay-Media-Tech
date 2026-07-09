/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Cpu, Twitter, Linkedin, Instagram, Github, Facebook, ArrowUp, Check, Send } from "lucide-react";
import DonmayLogo from "./DonmayLogo";

interface FooterProps {
  onSelectApp?: (appId: string) => void;
  onNavClick?: (sectionId: string) => void;
  onOpenAcousticLab?: () => void;
}

export default function Footer({ onSelectApp, onNavClick, onOpenAcousticLab }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail("");
    }, 900);
  };

  const currentYear = 2026;

  return (
    <footer 
      className="w-full bg-[#040714] border-t border-[#1C64F2]/10 relative z-30 overflow-hidden select-none"
      id="global-footer"
    >
      {/* Structural subtle digital background grids and radial lighting */}
      <div className="absolute inset-0 digital-grid opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-[#1C64F2]/3 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Glassmorphic Master Box Wrapper */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10 relative z-10">
        
        {/* Elite 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          
          {/* COLUMN 1: BRAND ARCHITECT CORE (5/12 span for widescreen structure) */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-start">
            {/* Branding Logo identical to Navbar */}
            <div 
              onClick={() => onNavClick?.("hero-section")}
              className="flex items-center gap-3 cursor-pointer group w-fit"
            >
              <DonmayLogo symbolSize={34} />
            </div>

            {/* Inspiring Subtitle */}
            <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed max-w-sm mt-2">
              The premium architect of global digital ecosystems. Engineering high-performance code frameworks and next-generation creative media execution.
            </p>

            {/* Social Hub Block */}
            <div className="flex items-center gap-3 mt-2" id="social-hub-block">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="X Twitter"
                className="w-8 h-8 rounded-full border border-[#1C64F2]/25 hover:border-[#00F0FF] hover:shadow-[0_0_10px_rgba(0,240,255,0.4)] flex items-center justify-center text-[#A0AEC0] hover:text-[#00F0FF] transition-all bg-[#080B1C]"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-[#1C64F2]/25 hover:border-[#00F0FF] hover:shadow-[0_0_10px_rgba(0,240,255,0.4)] flex items-center justify-center text-[#A0AEC0] hover:text-[#00F0FF] transition-all bg-[#080B1C]"
              >
                <Linkedin className="w-4 h-4 bg-transparent" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-[#1C64F2]/25 hover:border-[#00F0FF] hover:shadow-[0_0_10px_rgba(0,240,255,0.4)] flex items-center justify-center text-[#A0AEC0] hover:text-[#00F0FF] transition-all bg-[#080B1C]"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-[#1C64F2]/25 hover:border-[#00F0FF] hover:shadow-[0_0_10px_rgba(0,240,255,0.4)] flex items-center justify-center text-[#A0AEC0] hover:text-[#00F0FF] transition-all bg-[#080B1C]"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="TikTok"
                className="w-8 h-8 rounded-full border border-[#1C64F2]/25 hover:border-[#00F0FF] hover:shadow-[0_0_10px_rgba(0,240,255,0.4)] flex items-center justify-center text-[#A0AEC0] hover:text-[#00F0FF] transition-all bg-[#080B1C]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" id="tiktok-custom-svg">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-full border border-[#1C64F2]/25 hover:border-[#00F0FF] hover:shadow-[0_0_10px_rgba(0,240,255,0.4)] flex items-center justify-center text-[#A0AEC0] hover:text-[#00F0FF] transition-all bg-[#080B1C]"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COLUMN 2: PROPRIETARY ECOSYSTEM (2/12 span for widescreen structure) */}
          <div className="lg:col-span-2 flex flex-col gap-4 text-start">
            <h4 className="font-mono text-[10px] text-[#A0AEC0] tracking-[0.25em] font-bold uppercase">
              OUR APPS
            </h4>
            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={() => onSelectApp?.("kamsir")}
                className="font-mono text-[10.5px] uppercase tracking-wider text-[#A0AEC0] hover:text-[#00F0FF] transition-colors text-left"
              >
                KAMSIR STUDIO
              </button>
              <button
                onClick={() => onSelectApp?.("quantsync")}
                className="font-mono text-[10.5px] uppercase tracking-wider text-[#A0AEC0] hover:text-purple-400 transition-colors text-left"
              >
                QuantSync
              </button>
              <button
                onClick={() => onSelectApp?.("media-hero")}
                className="font-mono text-[10.5px] uppercase tracking-wider text-[#A0AEC0] hover:text-sky-400 transition-colors text-left"
              >
                Media Hero
              </button>
              <button
                onClick={() => onSelectApp?.("budget-hero")}
                className="font-mono text-[10.5px] uppercase tracking-wider text-[#A0AEC0] hover:text-emerald-400 transition-colors text-left"
              >
                MyBudgetHero
              </button>
              <button
                onClick={() => onSelectApp?.("culina")}
                className="font-mono text-[10.5px] uppercase tracking-wider text-[#A0AEC0] hover:text-[#FF7A18] transition-colors text-left font-semibold"
              >
                Culina
              </button>
            </div>
          </div>

          {/* COLUMN 3: STRATEGIC SOLUTIONS (2/12 span for widescreen structure) */}
          <div className="lg:col-span-2 flex flex-col gap-4 text-start">
            <h4 className="font-mono text-[10px] text-[#A0AEC0] tracking-[0.25em] font-bold uppercase">
              SERVICES
            </h4>
            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={() => onNavClick?.("services-section")}
                className="font-mono text-[10.5px] uppercase tracking-wider text-[#A0AEC0] hover:text-[#00F0FF] transition-colors text-left"
              >
                Software Engineering
              </button>
              <button
                onClick={() => onOpenAcousticLab ? onOpenAcousticLab() : onNavClick?.("services-section")}
                className="font-mono text-[10.5px] uppercase tracking-wider text-[#A0AEC0] hover:text-[#00F0FF] transition-colors text-left"
              >
                Next-Gen Audio Design
              </button>
              <button
                onClick={() => onNavClick?.("services-section")}
                className="font-mono text-[10.5px] uppercase tracking-wider text-[#A0AEC0] hover:text-[#00F0FF] transition-colors text-left"
              >
                Creative Media Production
              </button>
              <button
                onClick={() => onNavClick?.("services-section")}
                className="font-mono text-[10.5px] uppercase tracking-wider text-[#A0AEC0] hover:text-[#00F0FF] transition-colors text-left"
              >
                Growth Intelligence
              </button>
            </div>
          </div>

          {/* COLUMN 4: KERNEL INTEGRATION (3/12 span for subscriber module) */}
          <div className="lg:col-span-3 flex flex-col gap-4 text-start">
            <h4 className="font-mono text-[10px] text-[#A0AEC0] tracking-[0.25em] font-bold uppercase">
              INITIALIZE STREAM
            </h4>
            <p className="font-sans text-[11px] text-[#A0AEC0] uppercase tracking-wider leading-relaxed mt-2">
              Join innovators getting weekly technical updates and proprietary architecture deployments from our engineering lab.
            </p>

            {/* Newsletter input layout */}
            <div className="mt-2" id="newsletter-form-node">
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-sm">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="protocol@domain.com"
                    className="flex-1 bg-black/95 border border-[#1C64F2]/30 focus:border-[#00F0FF] outline-none text-white px-3.5 py-2.5 rounded text-xs uppercase focus:ring-1 focus:ring-[#00F0FF]/25 font-mono"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 bg-[#00F0FF] hover:bg-[#1C64F2] text-[#040714] hover:text-white font-display font-black text-xs tracking-wider rounded transition-all flex items-center justify-center cursor-pointer disabled:opacity-50 hover:shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                  >
                    {isSubmitting ? "..." : "JOIN"}
                  </button>
                </form>
              ) : (
                <div className="p-3 border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 rounded font-mono text-[9px] uppercase tracking-widest flex items-center gap-2 animate-fade-in">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>STREAM INITIALIZED // ENCRYPTED REGISTER OK</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* THE ABSOLUTE BOTTOM BRANDING GUARD */}
        <div className="border-t border-[#1C64F2]/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright Branding Label */}
          <span className="font-mono text-[9px] text-[#A0AEC0] tracking-[0.15em] uppercase text-center sm:text-left">
            &copy; {currentYear} DONMAY MEDIA &amp; TECHNOLOGY. ALL RIGHTS RESERVED.
          </span>

          {/* Reboot anchor link to top */}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex items-center gap-2 border border-[#1C64F2]/30 hover:border-[#00F0FF] bg-[#080B1C]/50 px-4 py-2 rounded text-[#A0AEC0] hover:text-[#00F0FF] transition-all font-mono text-[9px] tracking-widest uppercase cursor-pointer hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
          >
            <span>SYSTEM CORE REBOOT</span>
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
