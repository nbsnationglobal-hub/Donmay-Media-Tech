/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sliders, Sparkles, Clock, Coins, ChevronRight, CheckCircle, 
  Check, Lock, Cpu, ArrowRight, X, Shield, Terminal, RefreshCw, Trash2,
  FileVideo, FileImage, Upload, HelpCircle, HardDrive
} from "lucide-react";

interface CheckoutSession {
  title: string;
  category: string;
  price: string;
  tier?: string;
}

interface ActiveNode {
  id: string;
  title: string;
  price: string;
  username: string;
  status: string;
  date: string;
}

export default function ServiceCatalog() {
  const [activeTab, setActiveTab] = useState<"targeted_ads" | "social_media" | "video_commercials" | "cartoon_animation" | "video_editing">("targeted_ads");
  const [checkoutSession, setCheckoutSession] = useState<CheckoutSession | null>(null);
  
  // Checkout Multi-Step Funnel State
  const [currentStep, setCurrentStep] = useState<"brief" | "payment" | "activation" | "success">("brief");
  const [orgName, setOrgName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [directives, setDirectives] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  
  // File upload state for Payment Persistence
  const [attachedFiles, setAttachedFiles] = useState<{name: string; size: string; type: string}[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // Activation credentials state
  const [clientUsername, setClientUsername] = useState("");
  const [clientPin, setClientPin] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  
  // Local persistence for Active Client Nodes (Virtual Deployments)
  const [activeNodes, setActiveNodes] = useState<ActiveNode[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("donmay_active_contracts");
    if (saved) {
      try {
        setActiveNodes(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveNodesToStore = (nodes: ActiveNode[]) => {
    setActiveNodes(nodes);
    localStorage.setItem("donmay_active_contracts", JSON.stringify(nodes));
  };

  const deleteNode = (id: string) => {
    const next = activeNodes.filter(n => n.id !== id);
    saveNodesToStore(next);
  };

  // Launch overlay
  const handleOpenCheckout = (title: string, category: string, price: string, tier?: string) => {
    setCheckoutSession({ title, category, price, tier });
    setCurrentStep("brief");
    setOrgName("");
    setContactEmail("");
    setDirectives("");
    setAttachedFiles([]);
    setClientUsername("");
    setClientPin("");
    setTermsAgreed(false);
  };

  const handleBriefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !contactEmail || !directives) return;
    setIsCompiling(true);
    setTimeout(() => {
      setIsCompiling(false);
      setCurrentStep("payment");
    }, 1200);
  };

  const handleTriggerPayment = () => {
    // Open external payment handler link
    window.open("https://selar.co/m/donmay-media-tech", "_blank", "referrer");
    // Advanced immediately to activation segment
    setCurrentStep("activation");
  };

  const handleActivationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientUsername || !clientPin || !termsAgreed || !checkoutSession) return;

    const newNode: ActiveNode = {
      id: `DOM-GW-${Math.floor(1000 + Math.random() * 9000)}`,
      title: checkoutSession.title,
      price: checkoutSession.price,
      username: clientUsername,
      status: "ACTIVE PIPELINE ENROLLED",
      date: new Date().toLocaleDateString()
    };

    const next = [newNode, ...activeNodes];
    saveNodesToStore(next);
    setCurrentStep("success");
  };

  return (
    <div id="services-anchor" className="bg-[#040714] select-none text-white relative">
      
      {/* 1. PRIMARY DETAILED SERVICES SECTION */}
      <section 
        id="services-section" 
        className="py-24 px-6 md:px-12 border-t border-[#1C64F2]/10 relative overflow-hidden"
      >
        <div className="absolute top-[8%] right-10 w-[350px] h-[350px] bg-[#1C64F2]/3 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 digital-grid opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="mb-14 text-center">
            <div className="flex items-center justify-center gap-2 text-[#00F0FF] font-mono text-xs tracking-[0.2em] mb-3 uppercase">
              <Sliders className="w-4 h-4 animate-pulse" />
              <span>CAPABILITIES DIRECT PROTOCOL // NETWORK CAPABILITIES</span>
            </div>
            <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-widest uppercase">
              ON-DEMAND REVENUE NETWORK
            </h2>
            <p className="font-sans text-xs text-[#A0AEC0] mt-3 uppercase tracking-widest max-w-xl mx-auto leading-relaxed">
              We guide elite organizations using high-density production networks aligned with high-performance specs.
            </p>
          </div>

          {/* TAB CAPABILITY CHIPS GROUP */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-16" id="services-tabs-bar">
            {[
              { id: "targeted_ads", name: "Targeted Advertising" },
              { id: "social_media", name: "Social Media Management" },
              { id: "video_commercials", name: "Video Commercials" },
              { id: "cartoon_animation", name: "Cartoon Animation" },
              { id: "video_editing", name: "Video Editing" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3 rounded border font-mono text-[10.5px] uppercase tracking-[0.15em] transition-all duration-350 cursor-pointer ${activeTab === tab.id ? "border-[#00F0FF] bg-[#00F0FF]/10 text-white font-bold shadow-[0_0_15px_rgba(0,240,255,0.15)]" : "border-[#1C64F2]/20 text-[#A0AEC0] bg-[#080B1C]/40 hover:border-[#1C64F2]/60 hover:text-white"}`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* DYNAMIC VIEWPORTS CARDS VS MATRICES */}
          <div className="min-h-[480px]">
            <AnimatePresence mode="wait">
              
              {/* TARGETED ADVERTISING TAB */}
              {activeTab === "targeted_ads" && (
                <motion.div
                  key="targeted-ads-pane"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-10"
                >
                  <div className="text-center max-w-3xl mx-auto">
                    <p className="font-sans text-[#A0AEC0] text-sm leading-relaxed uppercase tracking-wider">
                      We engineer <span className="text-[#00F0FF] font-bold">data-driven promotion campaigns</span> intended specifically to expand your brand page's authority, drive hyperqualified lead streams, and maximize active product transactions.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-[#00F0FF]/5 border border-[#00F0FF]/25 px-4 py-1.5 rounded-full text-[9px] font-mono uppercase tracking-widest text-[#00F0FF]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>HIGHLIGHTED SPECIFICATION: LASER-FOCUS DEMOGRAPHIC FILTERS</span>
                    </div>
                  </div>

                  {/* Comparative Matrix highlighting custom search filters */}
                  <div className="w-full overflow-x-auto border border-[#1C64F2]/20 rounded-lg bg-[#080B1C]/75 backdrop-blur-md">
                    <table className="w-full min-w-[850px] border-collapse text-left font-mono text-xs uppercase select-none">
                      <thead>
                        <tr className="border-b border-[#1C64F2]/20 bg-[#040714]/65">
                          <th className="p-5 font-bold tracking-widest text-[#A0AEC0] w-1/4">CAPABILITY STRUCTURE</th>
                          <th className="p-5 font-extrabold tracking-widest text-white text-center bg-black/10">STARTER ADS PLAN</th>
                          <th className="p-5 font-extrabold tracking-widest text-[#00F0FF] text-center bg-[#00F0FF]/5">GROWTH ACCELERATOR</th>
                          <th className="p-5 font-extrabold tracking-widest text-amber-500 text-center bg-amber-500/5">OMNIPRESENCE SUITE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1C64F2]/10 leading-relaxed">
                        <tr>
                          <td className="p-5 font-bold text-white">INVESTMENT MATRIX</td>
                          <td className="p-5 text-center text-white bg-black/10 font-bold">$500 USD</td>
                          <td className="p-5 text-center text-[#00F0FF] bg-[#00F0FF]/5 font-black">$1,200 USD</td>
                          <td className="p-5 text-center text-amber-400 bg-amber-500/5 font-black">$2,800 USD</td>
                        </tr>
                        <tr>
                          <td className="p-5 font-bold text-[#A0AEC0]">GEOGRAPHIC LOCATIONS</td>
                          <td className="p-5 text-center bg-black/10 text-white/80">Select Cities &amp; States</td>
                          <td className="p-5 text-center bg-[#00F0FF]/5 text-[#00F0FF] font-bold">Countrywide + Regional nodes</td>
                          <td className="p-5 text-center bg-amber-500/5 text-amber-300 font-bold">Global Coordinates Match</td>
                        </tr>
                        <tr>
                          <td className="p-5 font-bold text-[#A0AEC0]">AGE CALIBRATION</td>
                          <td className="p-5 text-center bg-black/10 text-white/70">Broad range filters</td>
                          <td className="p-5 text-center bg-[#00F0FF]/5 text-white/90">Precise age group clusters</td>
                          <td className="p-5 text-center bg-amber-500/5 text-white/100">Micro-targeted age nodes</td>
                        </tr>
                        <tr>
                          <td className="p-5 font-bold text-[#A0AEC0]">INDUSTRIES &amp; ROLES</td>
                          <td className="p-5 bg-black/10 text-center text-white/60">General professional fields</td>
                          <td className="p-5 bg-[#00F0FF]/5 text-center text-white/90">Specific industries &amp; Job titles</td>
                          <td className="p-5 bg-amber-500/5 text-center text-white/100">Senior decision makers &amp; Exact corporate roles</td>
                        </tr>
                        <tr>
                          <td className="p-5 font-bold text-[#A0AEC0]">AD CONVERSION UTILITY</td>
                          <td className="p-5 bg-black/10 font-sans tracking-wide text-[10.5px] text-[#A0AEC0]">
                            <ul className="list-disc pl-4 space-y-1">
                              <li>1 active platform campaign setup</li>
                              <li>Basic pixel integration diagnostics</li>
                            </ul>
                          </td>
                          <td className="p-5 bg-[#00F0FF]/5 font-sans tracking-wide text-[10.5px] text-[#A0AEC0]">
                            <ul className="list-disc pl-4 space-y-1">
                              <li>Multi-variant copy arrays</li>
                              <li>Retargeting campaign setup</li>
                              <li>Conversion funnel diagnostics</li>
                            </ul>
                          </td>
                          <td className="p-5 bg-amber-500/5 font-sans tracking-wide text-[10.5px] text-[#A0AEC0]">
                            <ul className="list-disc pl-4 space-y-1">
                              <li>Omnidirectional ad channel setup</li>
                              <li>Dynamic creative production assets</li>
                              <li>Direct Slack SLA support gateway</li>
                            </ul>
                          </td>
                        </tr>
                        <tr className="bg-black/20">
                          <td className="p-5 font-bold text-white">DEPLOY ACTION</td>
                          <td className="p-5 text-center bg-black/15">
                            <button
                              onClick={() => handleOpenCheckout("Starter Ads Plan", "Targeted Advertising", "$500 USD", "Basic Plan")}
                              className="px-3 py-2 bg-[#040714] border border-[#1C64F2]/30 text-[#A0AEC0] hover:text-[#00F0FF] hover:border-[#00F0FF] tracking-wider uppercase font-semibold text-[8px] cursor-pointer"
                            >
                              Initialize Basic Ads Plan // Deploy
                            </button>
                          </td>
                          <td className="p-5 text-center bg-[#00F0FF]/5">
                            <button
                              onClick={() => handleOpenCheckout("Growth Accelerator", "Targeted Advertising", "$1,200 USD", "Growth Plan")}
                              className="px-3 py-2 rounded bg-[#00F0FF] text-black tracking-widest uppercase font-black text-[8px] cursor-pointer animate-pulse shrink-0"
                            >
                              Initialize Growth Accelerator // Deploy
                            </button>
                          </td>
                          <td className="p-5 text-center bg-amber-500/5">
                            <button
                              onClick={() => handleOpenCheckout("Market Leader Omnipresence", "Targeted Advertising", "$2,800 USD", "Omnipresence Plan")}
                              className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-black tracking-widest uppercase font-black text-[8px] cursor-pointer"
                            >
                              Initialize Omnipresence Suite // Deploy
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* SOCIAL MEDIA MANAGEMENT TAB */}
              {activeTab === "social_media" && (
                <motion.div
                  key="social-media-pane"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  {/* Card 1 */}
                  <div className="p-6 rounded border border-[#1C64F2]/20 bg-[#080B1C]/50 flex flex-col justify-between group hover:border-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all">
                    <div>
                      <span className="font-mono text-[9px] text-[#00F0FF] tracking-widest uppercase block mb-3 font-semibold">
                        SMM // ESSENTIALS
                      </span>
                      <div className="relative w-full h-28 bg-black/45 rounded border border-[#1C64F2]/10 overflow-hidden flex flex-col justify-center items-center mb-5">
                        <Terminal className="w-8 h-8 text-[#A0AEC0] mb-2" />
                        <span className="font-mono text-[7px] text-[#00F0FF]">CORES ACTIVE: 2 PLATS</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">
                        Essentials Core
                      </h3>
                      <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed mb-6">
                        Perfect profile optimization, consistent schedule curation containing 3 high-quality postings weekly across 2 platforms, hashtag setup, and scheduling setup.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline border-t border-[#1C64F2]/10 pt-4 mb-4">
                        <span className="font-mono text-[10px] text-[#A0AEC0] uppercase">MONTHLY INVESTMENT:</span>
                        <span className="font-mono text-sm text-[#00F0FF] font-black">$450 USD / MO</span>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout("Essentials SMM Core", "Social Media Management", "$450 USD / MO", "Essentials Tier")}
                        className="w-full py-3 bg-[#080B1C] hover:bg-[#00F0FF] border border-[#1C64F2]/40 hover:border-[#00F0FF] text-white hover:text-black font-mono text-[10.5px] uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Select Essentials // Deploy
                      </button>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="p-6 rounded border border-purple-500/30 bg-[#080B1C]/50 flex flex-col justify-between group hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.08)] transition-all">
                    <div>
                      <span className="font-mono text-[9px] text-[#8B5CF6] tracking-widest uppercase block mb-3 font-semibold">
                        SMM // ADVANCED BRAND GROWTH
                      </span>
                      <div className="relative w-full h-28 bg-[#8B5CF6]/5 rounded border border-[#8B5CF6]/30 overflow-hidden flex flex-col justify-center items-center mb-5">
                        <Cpu className="w-8 h-8 text-[#8B5CF6] mb-2 animate-spin" style={{ animationDuration: '8s' }} />
                        <span className="font-mono text-[7px] text-[#8B5CF6]">CORES ACTIVE: 4 PLATS</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">
                        Professional Brand Growth
                      </h3>
                      <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed mb-6">
                        Seamless, professional pages administration including daily custom postings, customized templates, active engagement loops with your global community, and detailed audits.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline border-t border-[#8B5CF6]/20 pt-4 mb-4">
                        <span className="font-mono text-[10px] text-[#A0AEC0] uppercase">MONTHLY INVESTMENT:</span>
                        <span className="font-mono text-sm text-[#8B5CF6] font-black">$950 USD / MO</span>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout("Professional Brand Growth", "Social Media Management", "$950 USD / MO", "Professional Tier")}
                        className="w-full py-3 bg-[#080B1C] hover:bg-[#8B5CF6] border border-[#8B5CF6]/40 hover:border-[#8B5CF6] text-white hover:text-black font-mono text-[10.5px] uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Select Brand Growth // Deploy
                      </button>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="p-6 rounded border border-amber-500/20 bg-[#080B1C]/50 flex flex-col justify-between group hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.08)] transition-all">
                    <div>
                      <span className="font-mono text-[9px] text-[#F59E0B] tracking-widest uppercase block mb-3 font-semibold">
                        SMM // ELITE MATRIX Omnidirectional
                      </span>
                      <div className="relative w-full h-28 bg-amber-500/5 rounded border border-amber-500/20 overflow-hidden flex flex-col justify-center items-center mb-5">
                        <HardDrive className="w-8 h-8 text-[#F59E0B] mb-2" />
                        <span className="font-mono text-[7px] text-[#F59E0B]">CORES ACTIVE: OMNICHANNEL</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">
                        Elite Scale Matrix
                      </h3>
                      <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed mb-6">
                        Complete omnichannel management containing daily custom short-form video releases, professional copywriter and community lead assigned, and 24/7 moderation metrics.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline border-t border-amber-500/20 pt-4 mb-4">
                        <span className="font-mono text-[10px] text-[#A0AEC0] uppercase">MONTHLY INVESTMENT:</span>
                        <span className="font-mono text-sm text-[#F59E0B] font-black">$1,800 USD / MO</span>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout("Elite Scale Matrix", "Social Media Management", "$1,800 USD / MO", "Elite Tier")}
                        className="w-full py-3 bg-[#080B1C] hover:bg-amber-500 border border-amber-500/40 hover:border-amber-500 text-white hover:text-black font-mono text-[10.5px] uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Select Elite Matrix // Deploy
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* VIDEO COMMERCIALS TAB */}
              {activeTab === "video_commercials" && (
                <motion.div
                  key="video-commercials-pane"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  {/* Card 1 */}
                  <div className="p-6 rounded border border-[#1C64F2]/20 bg-[#080B1C]/50 flex flex-col justify-between group hover:border-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all">
                    <div>
                      <span className="font-mono text-[9px] text-[#00F0FF] tracking-widest uppercase block mb-3 font-semibold">
                        CINEMA // RUNTIME 30S
                      </span>
                      <div className="relative w-full h-28 bg-black/45 rounded border border-[#1C64F2]/10 overflow-hidden flex flex-col justify-center items-center mb-5">
                        <FileVideo className="w-8 h-8 text-white/50" />
                        <span className="font-mono text-[7px] text-[#A0AEC0] mt-1">30 SEC SOCIAL CUT</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">
                        Social Hype Commercial
                      </h3>
                      <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed mb-6">
                        Launch attention-grabbing social media ads designed originally to boost product sales, promote local events, or go viral on reels and shorts channels.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline border-t border-[#1C64F2]/10 pt-4 mb-4">
                        <span className="font-mono text-[10px] text-[#A0AEC0] uppercase">INVESTMENT:</span>
                        <span className="font-mono text-sm text-[#00F0FF] font-black">$600 USD</span>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout("Social Hype Commercial (30s)", "Video Commercials", "$600 USD", "Starter Commercial")}
                        className="w-full py-3 bg-[#080B1C] hover:bg-[#00F0FF] border border-[#1C64F2]/40 hover:border-[#00F0FF] text-white hover:text-black font-mono text-[10.5px] uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Select Commercial // Deploy
                      </button>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="p-6 rounded border border-[#8B5CF6]/30 bg-[#080B1C]/50 flex flex-col justify-between group hover:border-[#8B5CF6] hover:shadow-[0_0_20px_rgba(139,92,246,0.08)] transition-all">
                    <div>
                      <span className="font-mono text-[9px] text-[#8B5CF6] tracking-widest uppercase block mb-3 font-semibold">
                        CINEMA // RUNTIME 90S
                      </span>
                      <div className="relative w-full h-28 bg-black/45 rounded border border-[#8B5CF6]/20 overflow-hidden flex flex-col justify-center items-center mb-5">
                        <FileVideo className="w-8 h-8 text-[#8B5CF6]" />
                        <span className="font-mono text-[7px] text-[#A0AEC0] mt-1">90 SEC CINEMATIC GRID</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">
                        Corporate Event Feature
                      </h3>
                      <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed mb-6">
                        Premium narrative commercial edits, developed specifically to showcase major corporate events, launch complex platforms, or introduce service capabilities.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline border-t border-[#8B5CF6]/20 pt-4 mb-4">
                        <span className="font-mono text-[10px] text-[#A0AEC0] uppercase">INVESTMENT:</span>
                        <span className="font-mono text-sm text-[#8B5CF6] font-black">$1,500 USD</span>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout("Corporate Event Feature (90s)", "Video Commercials", "$1,500 USD", "Corporate Commercial")}
                        className="w-full py-3 bg-[#080B1C] hover:bg-[#8B5CF6] border border-[#8B5CF6]/40 hover:border-[#8B5CF6] text-white hover:text-black font-mono text-[10.5px] uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Select Corporate Feature // Deploy
                      </button>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="p-6 rounded border border-amber-500/20 bg-[#080B1C]/50 flex flex-col justify-between group hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.08)] transition-all">
                    <div>
                      <span className="font-mono text-[9px] text-[#F59E0B] tracking-widest uppercase block mb-3 font-semibold">
                        CINEMA // RENDER PACK 4K
                      </span>
                      <div className="relative w-full h-28 bg-black/45 rounded border border-amber-500/20 overflow-hidden flex flex-col justify-center items-center mb-5">
                        <FileVideo className="w-8 h-8 text-[#F59E0B] animate-pulse" />
                        <span className="font-mono text-[7px] text-amber-400 mt-1">ULTRA PRESETS MASTER</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">
                        Premium Product Launch Suite
                      </h3>
                      <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed mb-6">
                        Complete custom high-spec corporate promotional master pack, detailing product launch metrics, high-retention cinematic storytelling scripts, and sound engineering design.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline border-t border-amber-500/20 pt-4 mb-4">
                        <span className="font-mono text-[10px] text-[#A0AEC0] uppercase">INVESTMENT:</span>
                        <span className="font-mono text-sm text-amber-400 font-black">$3,000 USD</span>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout("Premium Product Launch Suite", "Video Commercials", "$3,000 USD", "Launch Master")}
                        className="w-full py-3 bg-[#080B1C] hover:bg-amber-400 border border-amber-500/40 hover:border-amber-500 text-white hover:text-black font-mono text-[10.5px] uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Select Launch Suite // Deploy
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* CARTOON ANIMATION TAB */}
              {activeTab === "cartoon_animation" && (
                <motion.div
                  key="cartoon-animation-pane"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  {/* Card 1 */}
                  <div className="p-6 rounded border border-[#1C64F2]/20 bg-[#080B1C]/50 flex flex-col justify-between group hover:border-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all">
                    <div>
                      <span className="font-mono text-[9px] text-[#00F0FF] tracking-widest uppercase block mb-3 font-semibold">
                        CARTOON // 15S LOOP
                      </span>
                      <div className="relative w-full h-28 bg-black/45 rounded border border-[#1C64F2]/10 overflow-hidden flex flex-col justify-center items-center mb-5">
                        <FileImage className="w-8 h-8 text-white/50" />
                        <span className="font-mono text-[7px] text-[#A0AEC0] mt-1">VECTOR CHARACTER CONCEPT</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">
                        Short Character Asset
                      </h3>
                      <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed mb-6">
                        Custom original vector character concept designs, featuring up to 15 seconds of clean loop animatic sequences, ideal for branding icons.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline border-t border-[#1C64F2]/10 pt-4 mb-4">
                        <span className="font-mono text-[10px] text-[#A0AEC0] uppercase">INVESTMENT:</span>
                        <span className="font-mono text-sm text-[#00F0FF] font-black">$750 USD</span>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout("Short Character Asset (15s)", "Cartoon Animation", "$750 USD", "Asset Plan")}
                        className="w-full py-3 bg-[#080B1C] hover:bg-[#00F0FF] border border-[#1C64F2]/40 hover:border-[#00F0FF] text-white hover:text-black font-mono text-[10.5px] uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Select Character // Deploy
                      </button>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="p-6 rounded border border-purple-500/30 bg-[#080B1C]/50 flex flex-col justify-between group hover:border-[#8B5CF6] hover:shadow-[0_0_20px_rgba(139,92,246,0.08)] transition-all">
                    <div>
                      <span className="font-mono text-[9px] text-[#8B5CF6] tracking-widest uppercase block mb-3 font-semibold">
                        CARTOON // 60S SPOT
                      </span>
                      <div className="relative w-full h-28 bg-black/45 rounded border border-[#8B5CF6]/20 overflow-hidden flex flex-col justify-center items-center mb-5">
                        <svg className="w-8 h-8 text-[#8B5CF6]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                        </svg>
                        <span className="font-mono text-[7px] text-[#A0AEC0] mt-1">STORYBOARD ANIMATIC</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">
                        Animated Narrative Spot
                      </h3>
                      <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed mb-6">
                        Complete 60s narrative animation. From conceptual storyboard sketch outlines to beautiful final rendering with complete synchronized audio elements.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline border-t border-[#8B5CF6]/20 pt-4 mb-4">
                        <span className="font-mono text-[10px] text-[#A0AEC0] uppercase">INVESTMENT:</span>
                        <span className="font-mono text-sm text-[#8B5CF6] font-black">$1,800 USD</span>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout("Animated Narrative Spot (60s)", "Cartoon Animation", "$1,800 USD", "Spot Plan")}
                        className="w-full py-3 bg-[#080B1C] hover:bg-[#8B5CF6] border border-[#8B5CF6]/40 hover:border-[#8B5CF6] text-white hover:text-black font-mono text-[10.5px] uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Select Narrative Spot // Deploy
                      </button>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="p-6 rounded border border-amber-500/20 bg-[#080B1C]/50 flex flex-col justify-between group hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.08)] transition-all">
                    <div>
                      <span className="font-mono text-[9px] text-[#F59E0B] tracking-widest uppercase block mb-3 font-semibold">
                        CARTOON // 3 MIN MASTER
                      </span>
                      <div className="relative w-full h-28 bg-black/45 rounded border border-amber-500/20 overflow-hidden flex flex-col justify-center items-center mb-5">
                        <Terminal className="w-8 h-8 text-amber-500 animate-[spin_6s_linear_infinite]" />
                        <span className="font-mono text-[7px] text-amber-400 mt-1">EPISODIC PILOT PRESETS</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">
                        Premium Pilot Episode
                      </h3>
                      <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed mb-6">
                        Elite production of up to a 3-minute sequence, including active character lip sync algorithms, custom color atmospheres, and total commercial licensing.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline border-t border-amber-500/20 pt-4 mb-4">
                        <span className="font-mono text-[10px] text-[#A0AEC0] uppercase">INVESTMENT:</span>
                        <span className="font-mono text-sm text-[#F59E0B] font-black">$4,500 USD</span>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout("Premium Pilot Episode (3m)", "Cartoon Animation", "$4,500 USD", "Pilot Plan")}
                        className="w-full py-3 bg-[#080B1C] hover:bg-amber-500 border border-amber-500/40 hover:border-amber-500 text-white hover:text-black font-mono text-[10.5px] uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Select Campaign Pilot // Deploy
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* VIDEO EDITING TAB */}
              {activeTab === "video_editing" && (
                <motion.div
                  key="video-editing-pane"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  {/* Card 1 */}
                  <div className="p-6 rounded border border-[#1C64F2]/20 bg-[#080B1C]/50 flex flex-col justify-between group hover:border-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all">
                    <div>
                      <span className="font-mono text-[9px] text-[#00F0FF] tracking-widest uppercase block mb-3 font-semibold">
                        EDIT // RETENTION PACK LITE
                      </span>
                      <div className="relative w-full h-28 bg-black/45 rounded border border-[#1C64F2]/10 overflow-hidden flex flex-col justify-center items-center mb-5">
                        <Sliders className="w-8 h-8 text--[#A0AEC0] group-hover:text-[#00F0FF] transition-colors" />
                        <span className="font-mono text-[7px] text-[#00F0FF] mt-1 font-semibold">ALGO PACING BOOST</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">
                        Retention Edit Lite
                      </h3>
                      <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed mb-6">
                        Up to 1 minute of meticulous video trimming, professional visual pacing layouts, dynamic subtitle integrations, and high retention sound stacking.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline border-t border-[#1C64F2]/10 pt-4 mb-4">
                        <span className="font-mono text-[10px] text-[#A0AEC0] uppercase">INVESTMENT:</span>
                        <span className="font-mono text-sm text-[#00F0FF] font-black">$300 USD</span>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout("Retention Edit Lite", "Video Editing", "$300 USD", "Lite Editing")}
                        className="w-full py-3 bg-[#080B1C] hover:bg-[#00F0FF] border border-[#1C64F2]/40 hover:border-[#00F0FF] text-white hover:text-black font-mono text-[10.5px] uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Select Lite Trim // Deploy
                      </button>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="p-6 rounded border border-[#8B5CF6]/30 bg-[#080B1C]/50 flex flex-col justify-between group hover:border-[#8B5CF6] hover:shadow-[0_0_20px_rgba(139,92,246,0.08)] transition-all">
                    <div>
                      <span className="font-mono text-[9px] text-[#8B5CF6] tracking-widest uppercase block mb-3 font-semibold">
                        EDIT // ADVANCED PACING
                      </span>
                      <div className="relative w-full h-28 bg-black/45 rounded border border-[#8B5CF6]/20 overflow-hidden flex flex-col justify-center items-center mb-5">
                        <RefreshCw className="w-8 h-8 text-[#8B5CF6] animate-[spin_5s_linear_infinite]" />
                        <span className="font-mono text-[7px] text-[#8B5CF6] mt-1">CINEMATIC COLOR SCIENCE</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">
                        Pro Narrative Trim
                      </h3>
                      <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed mb-6">
                        Compiling raw footprints into clean, cinematic masterpieces. Features detailed color balance adjustments, standard voice-cleaning loops, and titles.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline border-t border-[#8B5CF6]/20 pt-4 mb-4">
                        <span className="font-mono text-[10px] text-[#A0AEC0] uppercase">INVESTMENT:</span>
                        <span className="font-mono text-sm text-[#8B5CF6] font-black">$800 USD</span>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout("Pro Narrative Trim", "Video Editing", "$800 USD", "Pro Editing")}
                        className="w-full py-3 bg-[#080B1C] hover:bg-[#8B5CF6] border border-[#8B5CF6]/40 hover:border-[#8B5CF6] text-white hover:text-black font-mono text-[10.5px] uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Select Pro Editing // Deploy
                      </button>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="p-6 rounded border border-amber-500/20 bg-[#080B1C]/50 flex flex-col justify-between group hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.08)] transition-all">
                    <div>
                      <span className="font-mono text-[9px] text-[#F59E0B] tracking-widest uppercase block mb-3 font-semibold">
                        EDIT // COMPLETE DOCUMENTARY
                      </span>
                      <div className="relative w-full h-28 bg-black/45 rounded border border-amber-500/20 overflow-hidden flex flex-col justify-center items-center mb-5">
                        <Sliders className="w-8 h-8 text-amber-500 animate-pulse" />
                        <span className="font-mono text-[7px] text-amber-400 mt-1">HIGH-FIDELITY AUDIO MIX</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">
                        Cinematic Masterpiece
                      </h3>
                      <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed mb-6">
                        Complete premium narrative structuring for complex documentaries, multi-camera raw logs, professional color science grade tables, and surround audio.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline border-t border-amber-500/20 pt-4 mb-4">
                        <span className="font-mono text-[10px] text-[#A0AEC0] uppercase">INVESTMENT:</span>
                        <span className="font-mono text-sm text-[#F59E0B] font-black">$2,000 USD</span>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout("Cinematic Masterpiece", "Video Editing", "$2,000 USD", "Masterpiece Editing")}
                        className="w-full py-3 bg-[#080B1C] hover:bg-amber-500 border border-amber-500/40 hover:border-amber-500 text-white hover:text-black font-mono text-[10.5px] uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Select Masterpiece // Deploy
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* ACTIVE SECURE CLIENT DEPLOYMENTS (IMMERSIVE TERMINAL TRACKER) */}
          <div className="mt-20 border border-[#1C64F2]/20 rounded-lg p-6 bg-black/75 backdrop-blur-md text-left" id="active-deployments-box">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#1C64F2]/10 pb-4 mb-4 gap-4">
              <div>
                <div className="flex items-center gap-2 text-[#00F0FF] text-[10px] uppercase font-bold tracking-widest">
                  <Terminal className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
                  <span>CLIENT ACCOUNT GRID NODES // LIVE ENROLLMENT STATUS</span>
                </div>
                <p className="font-sans text-[10px] text-[#A0AEC0] uppercase mt-1">
                  Active server deployments synchronized locally to this browser workstation.
                </p>
              </div>
              <span className="text-[9.5px] font-bold text-[#00F0FF] border border-[#00F0FF]/25 bg-[#00F0FF]/5 px-2.5 py-1 rounded">
                SECURE NODES CONNECTED: {activeNodes.length} GLOBAL
              </span>
            </div>

            {activeNodes.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-[#1C64F2]/20 bg-black/60 rounded text-[#A0AEC0] text-[10.5px] uppercase">
                NO ACTIVE SERVER NODES DETECTED. SELECT A SERVICE TIER ABOVE TO INITIALIZE ENROLLMENT CORES.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeNodes.map((node) => (
                  <div key={node.id} className="p-4 rounded border border-emerald-500/20 bg-emerald-500/[0.02] flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-white font-bold text-xs uppercase">{node.title}</span>
                      </div>
                      <div className="flex flex-col gap-1 mt-2 text-[#A0AEC0] text-[9.5px]">
                        <span>NODE ID: <span className="text-white font-bold">{node.id}</span></span>
                        <span>ACCOUNT KEY: <span className="text-white">{node.username}</span></span>
                        <span>DEPLOYMENT DATE: {node.date}</span>
                        <span>TRANS_VALUE: <span className="text-emerald-400 font-bold">{node.price}</span></span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3 justify-between h-full">
                      <span className="text-[8.5px] px-2 py-0.5 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-bold tracking-widest uppercase">
                        {node.status}
                      </span>
                      <button 
                        onClick={() => deleteNode(node.id)}
                        className="p-1 px-2 rounded border border-red-500/20 hover:border-red-500 bg-red-500/5 text-red-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[8.5px]"
                        title="Decommission system node"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>DECOMMISSION</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 2. REVENUE FUNNEL / ONBOARDING OVERLAY MASTER */}
      <AnimatePresence>
        {checkoutSession && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040714]/90 backdrop-blur-md overflow-y-auto select-none" id="onboarding-funnel-node">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className={`relative w-full ${currentStep === "brief" ? "max-w-3xl" : "max-w-lg"} rounded-lg border border-[#1C64F2]/30 bg-[#080B1C]/95 p-6 md:p-8 hover:border-[#00F0FF]/50 transition-all font-mono text-left shadow-[0_0_40px_rgba(0,240,255,0.15)] my-8`}
            >
              
              {/* Header section */}
              <div className="flex justify-between items-start border-b border-[#1C64F2]/20 pb-4 mb-6">
                <div>
                  <h3 className="font-display font-black text-sm md:text-base text-white tracking-widest uppercase">
                    DONMAY WORKSPACE ONBOARDING
                  </h3>
                  <span className="text-[10px] text-[#00F0FF] uppercase mt-0.5 block tracking-widest">
                    SECURE SHIELD PIPELINE PROTOCOL V2.9
                  </span>
                </div>
                <button
                  onClick={() => setCheckoutSession(null)}
                  className="p-1 text-[#A0AEC0] hover:text-white border border-[#1C64F2]/20 hover:border-red-400 rounded transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Steps Indicator */}
              <div className="grid grid-cols-4 gap-2 mb-6 text-[8.5px] text-center border-b border-[#1C64F2]/10 pb-5">
                {[
                  { id: "brief", label: "01 BRIEF" },
                  { id: "payment", label: "02 PAYMENT" },
                  { id: "activation", label: "03 ACTIVATE" },
                  { id: "success", label: "04 OK" }
                ].map((step) => {
                  const isActive = currentStep === step.id;
                  const isDone = 
                    (currentStep === "payment" && step.id === "brief") ||
                    (currentStep === "activation" && (step.id === "brief" || step.id === "payment")) ||
                    (currentStep === "success");
                  
                  return (
                    <div 
                      key={step.id}
                      className={`py-1 border rounded uppercase font-bold tracking-widest transition-all ${isActive ? "border-[#00F0FF] bg-[#00F0FF]/15 text-white shadow-[0_0_10px_rgba(0,240,255,0.1)]" : isDone ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400" : "border-[#1C64F2]/10 text-white/30"}`}
                    >
                      {step.label}
                    </div>
                  );
                })}
              </div>

              {/* Summary of Selected item */}
              <div className="mb-6 p-4 rounded bg-[#040714] border border-[#1C64F2]/15 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[8.5px] text-[#A0AEC0] block uppercase tracking-widest">Assigned Contract Element:</span>
                  <span className="text-white font-black block mt-0.5 uppercase tracking-wide">{checkoutSession.title}</span>
                  {checkoutSession.tier && (
                    <span className="text-[8.5px] font-semibold text-purple-400 uppercase tracking-widest">{checkoutSession.tier}</span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-[8.5px] text-[#A0AEC0] block uppercase tracking-widest">Pricing Matrix:</span>
                  <span className="text-emerald-400 font-extrabold text-sm block mt-0.5">{checkoutSession.price}</span>
                </div>
              </div>

              {/* STEP 1: BRIEF OUTLINE COMPILER */}
              {currentStep === "brief" && (
                <form onSubmit={handleBriefSubmit} className="flex flex-col gap-4">
                  
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9.5px] text-[#A0AEC0] uppercase tracking-wider">01 // ENTERPRISE OR CIVILIAN ID</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. ABIOLA LABS INC"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        className="w-full bg-[#040714] border border-[#1C64F2]/30 focus:border-[#00F0FF] outline-none text-white p-3 rounded text-[11px] uppercase"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9.5px] text-[#A0AEC0] uppercase tracking-wider">02 // PRIMARY COMMUNICATION CHANNEL</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. pipeline@domain.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full bg-[#040714] border border-[#1C64F2]/30 focus:border-[#00F0FF] outline-none text-white p-3 rounded text-[11px]"
                      />
                    </div>
                  </div>

                  {/* Mandated side-by-side Layout for description & attachment */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                    
                    {/* Left portion: narrative description */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9.5px] text-[#00F0FF] uppercase tracking-wider font-extrabold flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Describe what you want us to do for your project *</span>
                      </label>
                      <textarea
                        required
                        placeholder="DESCRIBE THE GOALS, DESIRED OUTCOMES, TARGET DEMOGRAPHICS AND SPECIFICATIONS..."
                        rows={7}
                        value={directives}
                        onChange={(e) => setDirectives(e.target.value)}
                        className="w-full h-full min-h-[140px] bg-[#040714] border border-[#1C64F2]/30 focus:border-[#00F0FF] outline-none text-white p-3 rounded text-[11px] uppercase placeholder:text-neutral-700 resize-none font-sans"
                      />
                    </div>

                    {/* Right portion: premium secure file attachment zone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9.5px] text-[#00F0FF] uppercase tracking-wider font-extrabold flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload your media files (images, logos, reference videos, or footage)</span>
                      </label>
                      
                      <div 
                        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragActive(false);
                          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                            const filesList = Array.from(e.dataTransfer.files).map((f: any) => ({
                              name: f.name,
                              size: (f.size / (1024 * 1024)).toFixed(2) + " MB",
                              type: f.type || "unknown"
                            }));
                            setAttachedFiles(prev => [...prev, ...filesList]);
                          }
                        }}
                        className={`group relative flex-1 min-h-[140px] border-2 border-dashed rounded p-4 flex flex-col justify-center items-center text-center transition-all cursor-pointer ${dragActive ? "border-[#00F0FF] bg-[#00F0FF]/5" : "border-[#1C64F2]/20 hover:border-[#00F0FF]/30 bg-[#040714]"}`}
                      >
                        <input 
                          type="file" 
                          multiple 
                          onChange={(e) => {
                            if (e.target.files) {
                              const filesList = Array.from(e.target.files).map((f: any) => ({
                                name: f.name,
                                size: (f.size / (1024 * 1024)).toFixed(2) + " MB",
                                type: f.type || "unknown"
                              }));
                              setAttachedFiles(prev => [...prev, ...filesList]);
                            }
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                        />
                        <div className="flex flex-col items-center gap-1 pointer-events-none">
                          <Upload className="w-6 h-6 text-[#A0AEC0] group-hover:text-[#00F0FF] transition-colors mb-1" />
                          <span className="font-mono text-[8px] text-[#A0AEC0] uppercase tracking-wider group-hover:text-white block px-4">
                            Drag &amp; Drop or click to attach logo, brief details, designs, or raw video media
                          </span>
                        </div>
                      </div>

                      {/* Display attached file list */}
                      {attachedFiles.length > 0 && (
                        <div className="mt-2 bg-[#040714] border border-[#1C64F2]/10 p-2 rounded max-h-[85px] overflow-y-auto space-y-1 text-[8px] font-mono">
                          <div className="flex justify-between items-center text-[#A0AEC0] border-b border-[#1C64F2]/10 pb-1 mb-1 font-bold">
                            <span>ATTACHED METADATA ({attachedFiles.length})</span>
                            <button 
                              type="button" 
                              onClick={() => setAttachedFiles([])} 
                              className="text-red-400 hover:text-white cursor-pointer"
                            >
                              CLEAR ALL
                            </button>
                          </div>
                          {attachedFiles.map((file, idx) => (
                            <div key={idx} className="flex justify-between items-center text-white bg-[#080B1C]/85 px-1.5 py-0.5 rounded">
                              <span className="truncate max-w-[170px] text-emerald-400">{file.name}</span>
                              <span className="text-white/60 font-semibold">{file.size}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>

                  <button
                    type="submit"
                    disabled={isCompiling}
                    className="w-full py-4 bg-[#00F0FF] hover:bg-white text-[#040714] font-display text-[11px] font-black tracking-widest uppercase rounded flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-3 transition-all shadow-[0_0_15px_rgba(0,240,255,0.25)]"
                  >
                    {isCompiling ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>PROCESSING PROJECT SUBMISSION...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project &amp; Secure Deposit</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* STEP 2: ESCROW & SELAR PAYMENT MATRIX CHANNEL WITH ATTACHED ASSETS PERSISTENCE */}
              {currentStep === "payment" && (
                <div className="flex flex-col gap-5 text-center py-2 animate-fade-in animate-[fadeIn_0.35s_ease-out]">
                  <div className="w-12 h-12 rounded-full border border-purple-500/35 bg-purple-500/10 flex items-center justify-center mx-auto text-purple-400">
                    <Shield className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-wide">
                      TRANSACTION FLOW AUTHORIZATION SEGMENT
                    </h4>
                    <p className="font-sans text-[10px] text-[#A0AEC0] uppercase tracking-wider max-w-sm mx-auto mt-2 leading-relaxed">
                      Your specifications and uploaded visual files are completely secured in the checkout memory. Proceed to authorize your deposit via Selar payment loop.
                    </p>
                  </div>

                  {/* Payment specs persistence display details */}
                  <div className="p-4 rounded border border-purple-500/25 bg-[#040714] text-left text-[9px] text-[#A0AEC0] space-y-2.5">
                    <div className="flex justify-between">
                      <span className="font-bold">ORG REGISTER ID:</span>
                      <span className="text-white font-black">{orgName.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">SECURE CHANNEL CONTACT:</span>
                      <span className="text-white font-semibold">{contactEmail}</span>
                    </div>
                    <div>
                      <span className="font-bold block mb-1 text-[#00F0FF]">PERSISTENT SPECIFICATIONS MATRIX:</span>
                      <p className="text-white italic line-clamp-2 bg-[#080B1C]/80 p-2 rounded border border-[#1C64F2]/10 text-[8.5px] uppercase">
                        {directives}
                      </p>
                    </div>
                    {attachedFiles.length > 0 && (
                      <div>
                        <span className="font-bold block mb-1 text-emerald-400">SECURELY LOCKED IN &amp; PERSISTENT ATTACHED ASSETS ({attachedFiles.length}):</span>
                        <div className="grid grid-cols-2 gap-1.5 max-h-[80px] overflow-y-auto">
                          {attachedFiles.map((file, idx) => (
                            <div key={idx} className="bg-[#080B1C] p-1.5 rounded border border-[#1C64F2]/15 flex items-center justify-between text-[7.5px]">
                              <span className="truncate text-white max-w-[100px]">{file.name}</span>
                              <span className="text-emerald-400 font-extrabold uppercase">LOCKED SECURE</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <button
                      onClick={handleTriggerPayment}
                      className="w-full py-4 bg-[#00F0FF] hover:bg-white text-[#040714] font-display text-[10.5px] font-black tracking-widest uppercase rounded flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
                    >
                      <span>AUTHORIZE VIA SELAR ESCROW ({checkoutSession.price})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-sans text-[7.5px] text-[#A0AEC0] uppercase tracking-widest leading-relaxed">
                      *NOTICE: Redirection connects secure external billing. Media files and brief specifications are cached securely and will be synchronized upon grid member enrollment.
                    </span>
                  </div>
                </div>
              )}

              {/* STEP 3: ACCOUNT ACTIVATION & GRID ENROLLMENT */}
              {currentStep === "activation" && (
                <form onSubmit={handleActivationSubmit} className="flex flex-col gap-4 animate-fade-in">
                  <div className="text-center mb-1">
                    <div className="inline-flex items-center gap-1 text-emerald-400 text-[9px] font-bold uppercase border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 rounded">
                      <Lock className="w-3 h-3 text-emerald-400 animate-pulse" />
                      <span>SECURE BILLING LINK FORWARD PASSED OK</span>
                    </div>
                    <h4 className="text-white font-bold text-xs uppercase mt-3 tracking-wide">
                      INITIALIZE GRID CLIENT VAULT
                    </h4>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9.5px] text-[#A0AEC0] uppercase tracking-wider">CHOOSE CHASSIS ADMIN USERNAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DONMAY_MEMBER_01"
                      value={clientUsername}
                      onChange={(e) => setClientUsername(e.target.value)}
                      className="w-full bg-[#040714] border border-[#1C64F2]/30 focus:border-[#00F0FF] outline-none text-white p-3 rounded text-[11px] uppercase"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9.5px] text-[#A0AEC0] uppercase tracking-wider">CHOOSE SECURITY NODE PASS-KEY / PIN</label>
                    <input
                      type="password"
                      required
                      placeholder="••••"
                      maxLength={8}
                      value={clientPin}
                      onChange={(e) => setClientPin(e.target.value)}
                      className="w-full bg-[#040714] border border-[#1C64F2]/30 focus:border-[#00F0FF] outline-none text-white p-3 rounded text-[11px]"
                    />
                  </div>

                  <label className="flex items-start gap-2.5 p-3 rounded border border-[#1C64F2]/10 bg-[#040714] cursor-pointer text-[9px] uppercase leading-relaxed text-[#A0AEC0] hover:border-[#1C64F2]/30 transition-colors">
                    <input
                      type="checkbox"
                      required
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                      className="mt-0.5"
                    />
                    <span>
                      I AGREE TO REGISTER THIS NODE ID ON THE SECURED SYSTEM GRID. I AGREE TO TERMS &amp; SCRIPT COV POLICY CODES.
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#00F0FF] hover:bg-white text-[#040714] font-display text-[10.5px] font-black tracking-widest uppercase rounded flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>ACTIVATE CLIENT ACCOUNT PROTOCOL // ENROLL</span>
                    <CheckCircle className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              {/* STEP 4: SUCCESS TELEMETRY VAULT */}
              {currentStep === "success" && (
                <div className="flex flex-col gap-6 text-center animate-fade-in py-2">
                  <div className="w-12 h-12 rounded-full border border-emerald-500/40 bg-emerald-500/15 flex items-center justify-center mx-auto text-emerald-400">
                    <Check className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-xs uppercase tracking-wide">
                      ACCOUNT ENROLLMENT REGISTER COMPLETION SUCCESS
                    </h4>
                    <p className="font-sans text-[10px] text-[#A0AEC0] uppercase tracking-widest max-w-sm mx-auto mt-2 leading-relaxed">
                      Client node activated as ONLINE. Secure specifications database register synchronized with local control panel.
                    </p>
                  </div>

                  {/* Mock system license card */}
                  <div className="bg-[#040714] p-5 rounded border border-emerald-500/30 text-left relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-2 font-mono text-[7px] text-emerald-400 bg-emerald-500/10 uppercase tracking-widest rounded-bl select-none">
                      LICENSED CORE
                    </div>
                    <span className="font-display font-bold text-[#00F0FF] text-[10px] block uppercase tracking-wide">
                      DONMAY DIGITAL CLIENT KEYCARD
                    </span>
                    <div className="grid grid-cols-2 gap-4 mt-4 font-mono text-[9px] uppercase text-[#A0AEC0]">
                      <div>
                        <span>NODE ID:</span>
                        <p className="text-white font-bold select-all">DOM-GW-{Math.floor(1000 + Math.random() * 9000)}</p>
                      </div>
                      <div>
                        <span>OPERATIONAL STATUS:</span>
                        <p className="text-emerald-400 font-extrabold">ONLINE</p>
                      </div>
                      <div>
                        <span>ENROLLED CORE:</span>
                        <p className="text-white font-bold truncate">{checkoutSession.title}</p>
                      </div>
                      <div>
                        <span>CLIENT ID_TAG:</span>
                        <p className="text-white font-bold">{clientUsername.toUpperCase()}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutSession(null)}
                    className="w-full py-4 bg-[#080B1C] hover:bg-neutral-800 border border-[#1C64F2]/30 hover:border-white text-white font-mono text-[10.5px] uppercase tracking-widest transition-all cursor-pointer"
                  >
                    RETURN TO TERMINAL WORKSPACE
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
