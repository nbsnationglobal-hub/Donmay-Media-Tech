/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Music, Sparkles, ShieldCheck, PlayCircle, Trophy, 
  Tv, Heart, ArrowLeft, Layers, Sliders, Volume2, Mic, CheckCircle
} from "lucide-react";
import OnboardingTerminal from "./OnboardingTerminal";

interface AcousticSynthesisLabProps {
  onBackToHome: () => void;
  onEnrollContract: (contract: {
    id: string;
    title: string;
    price: string;
    username: string;
    status: string;
    date: string;
  }) => void;
}

export default function AcousticSynthesisLab({ onBackToHome, onEnrollContract }: AcousticSynthesisLabProps) {
  const [selectedPackage, setSelectedPackage] = useState<{
    title: string;
    category: string;
    price: string;
    tier?: string;
  } | null>(null);

  const packages = [
    {
      title: "Core Soundtrack Node",
      category: "Acoustic Synthesis",
      price: "$600 USD",
      tier: "Entry-Level Custom Soundtrack",
      description: "Custom atmospheric soundtracks designed for video intros, podcast theme packages, or brand reels.",
      features: [
        "1 fully customized acoustic composition",
        "Up to 2 minutes of duration",
        "Deeply personalized thematic matching",
        "100% permanent commercial rights signed",
        "High-definition WAV & MP3 master deliverables",
        "Up to 2 structural mix revisions"
      ],
      icon: Music,
      color: "border-[#1C64F2]/30 hover:border-[#00F0FF]/60",
      accent: "text-[#00F0FF]",
      bg: "bg-[#1C64F2]/5"
    },
    {
      title: "Cinematic Strategy Tier",
      category: "Acoustic Synthesis",
      price: "$1,500 USD",
      tier: "Complex Corporate & Media Scoring",
      description: "Advanced cinematic scoring calibrated perfectly for trailers, promotional feature films, and commercial campaigns.",
      features: [
        "Complete multi-theme cinematic arrangement",
        "Up to 6 minutes of highly layered runtime",
        "Perfect synchronization alignment guides",
        "Advanced artificial intelligence sound stacking",
        "100% permanent commercial rights signed",
        "Full uncompressed stems delivery",
        "Priority mix adjustments (up to 5 versions)"
      ],
      icon: Sliders,
      color: "border-[#8B5CF6]/35 hover:border-[#8B5CF6]",
      accent: "text-[#8B5CF6]",
      bg: "bg-[#8B5CF6]/5"
    },
    {
      title: "Global Master Composition",
      category: "Acoustic Synthesis",
      price: "$3,500 USD",
      tier: "Elite Orchestral-Electronic Masterpiece",
      description: "Unrestricted audio score design for high-end cinematic titles, monumental private celebrations, or global video game landscapes.",
      features: [
        "Epic custom orchestral-electronic composition",
        "Unrestricted duration limits to match screenplay",
        "Multi-vocal or solo live instrumentation overlays",
        "Premium cinema stem mastering (Dolby ready)",
        "100% permanent commercial rights package",
        "Active 24/7 Slack production lead updates",
        "Unlimited revisions till signature sign-off"
      ],
      icon: Volume2,
      color: "border-amber-500/25 hover:border-amber-400",
      accent: "text-amber-400",
      bg: "bg-amber-500/5",
      badge: "ELITE SUPREME VALUE"
    }
  ];

  const handleOnboardingComplete = (data: {
    title: string;
    price: string;
    email: string;
    mt5Id: string;
    directives: string;
    filesCount: number;
  }) => {
    // Convert to ActiveNode structure
    onEnrollContract({
      id: `DOM-GW-${Math.floor(1000 + Math.random() * 9000)}`,
      title: data.title,
      price: data.price,
      username: data.email, // using email as secure username link
      status: "ACTIVE PIPELINE ENROLLED",
      date: new Date().toLocaleDateString()
    });
    setSelectedPackage(null);
  };

  return (
    <div className="w-full bg-[#040714] text-white relative py-12 md:py-16 select-none animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* BACK TO DASHBOARD ACTION */}
        <div className="mb-10 text-start">
          <button 
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 border border-[#1C64F2]/30 hover:border-[#00F0FF] bg-[#080B1C]/50 px-4 py-2 rounded text-[#A0AEC0] hover:text-[#00F0FF] transition-all font-mono text-[10px] tracking-widest uppercase cursor-pointer hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO MASTER CORE</span>
          </button>
        </div>

        {/* HERO TITLE SECTION */}
        <div className="mb-16 text-center max-w-4xl mx-auto relative z-10">
          <div className="flex items-center justify-center gap-2 text-[#00F0FF] font-mono text-xs tracking-[0.25em] mb-4 uppercase">
            <Volume2 className="w-5 h-5 animate-pulse" />
            <span>ACOUSTIC SYNTHESIS PROTOCOL // REGISTER TIER 05</span>
          </div>
          <h1 className="font-display font-black text-4xl md:text-6xl text-white tracking-widest uppercase leading-tight">
            ACOUSTIC SYNTHESIS LAB
          </h1>
          <p className="font-sans text-xs md:text-sm text-[#A0AEC0] mt-5 uppercase tracking-[0.18em] max-w-2xl mx-auto leading-relaxed border-y border-[#1C64F2]/10 py-5">
            Bespoke, deeply personalized acoustic architectures engineered with advanced AI assistance. We turn narrative coordinates into monumental surround arrays.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-mono text-[9px] tracking-wider uppercase font-black">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Full Commercial Rights Transfer (Permanent)</span>
            </div>
          </div>
        </div>

        {/* SPECIALIZATION CORES */}
        <div className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          
          {/* SPECIALIZATION 1 */}
          <div className="relative p-8 rounded-xl border border-[#1C64F2]/20 bg-[#080B1C]/60 backdrop-blur-md hover:border-[#00F0FF]/40 transition-all flex flex-col gap-5">
            <div className="absolute right-4 top-4 p-2 bg-[#00F0FF]/5 rounded-full border border-[#00F0FF]/15">
              <Tv className="w-5 h-5 text-[#00F0FF]" />
            </div>
            <div>
              <span className="font-mono text-[#00F0FF] text-[9.5px] font-black uppercase tracking-widest block mb-1">SPECIFICATION LAYER_01 //</span>
              <h3 className="font-display font-black text-xl text-white tracking-wider uppercase">
                CINEMATIC MEDIA SCORING
              </h3>
            </div>
            <p className="font-sans text-neutral-400 text-xs md:text-sm leading-relaxed uppercase tracking-wider">
              High-pacing theatrical movie background scores, dynamic trailers, and immersive television landscapes. We custom-mix electronic arrangements, synth basslines, and traditional orchestral elements to fit your visual keyframes.
            </p>
            <div className="flex flex-col gap-2.5 mt-2">
              <div className="flex items-center gap-2 text-white font-mono text-[9.5px] uppercase">
                <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full" />
                <span>Trailer and Promo Cuts (Full Intensity Mix)</span>
              </div>
              <div className="flex items-center gap-2 text-white font-mono text-[9.5px] uppercase">
                <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full" />
                <span>Atmospheric soundscapes &amp; drone pads</span>
              </div>
              <div className="flex items-center gap-2 text-white font-mono text-[9.5px] uppercase">
                <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full" />
                <span>AI-assisted orchestral synthesis integration</span>
              </div>
            </div>
          </div>

          {/* SPECIALIZATION 2 */}
          <div className="relative p-8 rounded-xl border border-purple-500/25 bg-[#080B1C]/60 backdrop-blur-md hover:border-purple-400/40 transition-all flex flex-col gap-5">
            <div className="absolute right-4 top-4 p-2 bg-purple-500/5 rounded-full border border-purple-500/15">
              <Heart className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <span className="font-mono text-purple-400 text-[9.5px] font-black uppercase tracking-widest block mb-1">SPECIFICATION LAYER_02 //</span>
              <h3 className="font-display font-black text-xl text-white tracking-wider uppercase">
                MONUMENTAL CELEBRATIONS
              </h3>
            </div>
            <p className="font-sans text-neutral-400 text-xs md:text-sm leading-relaxed uppercase tracking-wider">
              Highly emotional, tailored personalized soundtracks engineered specifically for historic life events (Weddings, Anniversaries, Milestones, and Birthdays). Let us draft your bespoke audio masterpiece reflecting your exact journey.
            </p>
            <div className="flex flex-col gap-2.5 mt-2">
              <div className="flex items-center gap-2 text-white font-mono text-[9.5px] uppercase">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                <span>Tailored Wedding Processionals (Bespoke Themes)</span>
              </div>
              <div className="flex items-center gap-2 text-white font-mono text-[9.5px] uppercase">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                <span>Original milestone celebration scores</span>
              </div>
              <div className="flex items-center gap-2 text-white font-mono text-[9.5px] uppercase">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                <span>Original lyrics options &amp; custom vocals synchronization</span>
              </div>
            </div>
          </div>

        </div>

        {/* PACKAGE TIERS MATRICES */}
        <div className="mb-20 text-center">
          <div className="mb-12">
            <span className="font-mono text-amber-400 text-xs tracking-widest font-black block uppercase mb-2">PROPRIETARY PACKAGES // TIER ARCHITECTURE</span>
            <h2 className="font-display font-black text-2xl md:text-4xl tracking-widest uppercase">
              SELECT SOUNDTRACK DEPLOYMENT LEVEL
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => {
              const IconComp = pkg.icon;

              return (
                <div 
                  key={index}
                  className={`p-6 rounded-xl border ${pkg.color} ${pkg.bg} flex flex-col justify-between text-left group hover:shadow-[0_0_20px_rgba(0,240,255,0.06)] transition-all relative overflow-hidden`}
                >
                  {pkg.badge && (
                    <div className="absolute right-0 top-0 bg-amber-500 text-black font-mono text-[7px] font-black px-2 py-0.5 uppercase tracking-widest rounded-bl">
                      {pkg.badge}
                    </div>
                  )}

                  <div>
                    {/* Category Label */}
                    <span className={`font-mono text-[8px] font-extrabold tracking-widest uppercase block mb-3 ${pkg.accent}`}>
                      CORE // {pkg.category.toUpperCase()}
                    </span>

                    {/* App icon block */}
                    <div className="relative w-full h-24 bg-black/40 border border-white/5 rounded-lg flex items-center justify-center mb-5 overflow-hidden">
                      <IconComp className={`w-8 h-8 ${pkg.accent} group-hover:scale-110 transition-transform`} />
                    </div>

                    <h3 className="font-display font-black text-lg text-white uppercase tracking-wider mb-1">
                      {pkg.title}
                    </h3>
                    <span className="font-mono text-neutral-400 text-[9.5px] tracking-wide block mb-3 uppercase">
                      {pkg.tier}
                    </span>
                    <p className="font-sans text-xs text-neutral-400 uppercase tracking-wider leading-relaxed mb-6">
                      {pkg.description}
                    </p>

                    {/* Features list */}
                    <div className="border-t border-white/5 pt-4 mb-6">
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block mb-2 font-bold">
                        FULFILLMENT DELIVERABLES:
                      </span>
                      <ul className="flex flex-col gap-2 font-sans text-[10.5px] text-neutral-300 uppercase tracking-wider">
                        {pkg.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="border-t border-white/10 pt-4 mt-auto">
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider font-bold">CONTRACT VALUE:</span>
                      <span className={`font-mono text-base font-black ${pkg.accent}`}>{pkg.price}</span>
                    </div>

                    <button
                      onClick={() => setSelectedPackage({
                        title: pkg.title,
                        category: pkg.category,
                        price: pkg.price,
                        tier: pkg.tier
                      })}
                      className={`w-full py-3 rounded font-mono text-[10.5px] font-black uppercase tracking-widest transition-all cursor-pointer border hover:border-white ${
                        index === 2 
                          ? "bg-amber-500 border-amber-500 hover:bg-amber-400 hover:border-amber-400 text-black text-xs font-black shadow-[0_0_15px_rgba(245,158,11,0.2)] animate-pulse" 
                          : "bg-black/40 border-white/10 text-white hover:bg-white hover:text-black"
                      }`}
                    >
                      ENGAGE THE SYNTHESIS CORE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* FULLSCREEN ONBOARDING OVERLAY */}
      <AnimatePresence>
        {selectedPackage && (
          <OnboardingTerminal 
            session={selectedPackage}
            onClose={() => setSelectedPackage(null)}
            onComplete={handleOnboardingComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
