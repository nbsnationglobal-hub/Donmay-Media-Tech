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
import OnboardingTerminal from "./OnboardingTerminal";

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
  const [activeTab, setActiveTab] = useState<"targeted_ads" | "social_media" | "video_commercials" | "cartoon_animation" | "video_editing" | "software_dev" | "website_building">("targeted_ads");
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
  const [initialStep, setInitialStep] = useState<"brief" | "payment" | "activation" | "success">("brief");

  useEffect(() => {
    const saved = localStorage.getItem("donmay_active_contracts");
    if (saved) {
      try {
        setActiveNodes(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }

    // Auto-resume onboarding if returned from Selar redirect
    const redirected = localStorage.getItem("donmay_onboarding_redirected");
    const savedOnboarding = localStorage.getItem("donmay_pending_onboarding");
    if (redirected === "true" && savedOnboarding) {
      try {
        const parsed = JSON.parse(savedOnboarding);
        if (parsed.session) {
          setCheckoutSession(parsed.session);
          setInitialStep("activation");
        }
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
    setInitialStep("brief");
  };

  const handleOnboardingComplete = (data: {
    title: string;
    price: string;
    email: string;
    mt5Id: string;
    directives: string;
    filesCount: number;
  }) => {
    const newNode: ActiveNode = {
      id: `DOM-GW-${Math.floor(1000 + Math.random() * 9000)}`,
      title: data.title,
      price: data.price,
      username: data.email,
      status: "ACTIVE PIPELINE ENROLLED",
      date: new Date().toLocaleDateString()
    };
    const next = [newNode, ...activeNodes];
    saveNodesToStore(next);
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
              { id: "video_editing", name: "Video Editing" },
              { id: "software_dev", name: "Software & App Dev" },
              { id: "website_building", name: "Website Building" }
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
                          <th className="p-5 font-bold tracking-widest text-[#A0AEC0] w-1/4 select-none">CAPABILITY PLAN ELEMENT</th>
                          <th className="p-5 font-extrabold tracking-widest text-white text-center bg-black/10 select-none">STARTER ADS (CORE Retainer)</th>
                          <th className="p-5 font-extrabold tracking-widest text-[#00F0FF] text-center bg-[#00F0FF]/5 select-none">GROWTH ADS (ACCELERATOR)</th>
                          <th className="p-5 font-extrabold tracking-widest text-amber-500 text-center bg-amber-500/5 select-none font-bold">OMNIPRESENCE ADS (DOMINANCE)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1C64F2]/10 leading-relaxed">
                        <tr>
                          <td className="p-5 font-bold text-white select-none">INVESTMENT MATRIX</td>
                          <td className="p-5 text-center text-white bg-black/10 font-bold">$500 USD / MO</td>
                          <td className="p-5 text-center text-[#00F0FF] bg-[#00F0FF]/5 font-black">$1,200 USD / MO</td>
                          <td className="p-5 text-center text-amber-400 bg-amber-500/5 font-black">$2,800 USD / MO</td>
                        </tr>
                        <tr>
                          <td className="p-5 font-bold text-[#A0AEC0] select-none">CHANNELS FULFILLMENT</td>
                          <td className="p-5 text-center bg-black/10 text-white/80">1 Primary Network Channel</td>
                          <td className="p-5 text-center bg-[#00F0FF]/5 text-[#00F0FF] font-bold">3 Primary Network Channels</td>
                          <td className="p-5 text-center bg-amber-500/5 text-amber-300 font-bold">5 Omnidirectional Channels</td>
                        </tr>
                        <tr>
                          <td className="p-5 font-bold text-[#A0AEC0] select-none">STATIC GRAPHICS DELIVERY</td>
                          <td className="p-5 text-center bg-black/10 text-white/70">5 Premium Designs / Week</td>
                          <td className="p-5 text-center bg-[#00F0FF]/5 text-white/90">10 Premium Designs / Week</td>
                          <td className="p-5 text-center bg-amber-500/5 text-white/100">15 Premium Designs / Week</td>
                        </tr>
                        <tr>
                          <td className="p-5 font-bold text-[#A0AEC0] select-none">CINEMATIC VIDEO FULFILLMENT</td>
                          <td className="p-5 bg-black/10 text-center text-white/70">2 High-Retention Videos / Week</td>
                          <td className="p-5 bg-[#00F0FF]/5 text-center text-white/90">4 High-Retention Videos / Week</td>
                          <td className="p-5 bg-amber-500/5 text-center text-white/100 font-bold">8 High-Retention Videos / Week</td>
                        </tr>
                        <tr>
                          <td className="p-5 font-bold text-[#A0AEC0] select-none">SUPPORT &amp; TRAFFIC TRIAGE</td>
                          <td className="p-5 bg-black/10 font-sans tracking-wide text-[10.5px] text-[#A0AEC0]">
                            <ul className="list-disc pl-4 space-y-1">
                              <li>Real-time traffic monitoring &amp; performance checks</li>
                              <li>Active inbox &amp; comment triage</li>
                              <li>Weekly performance reporting</li>
                            </ul>
                          </td>
                          <td className="p-5 bg-[#00F0FF]/5 font-sans tracking-wide text-[10.5px] text-[#A0AEC0]">
                            <ul className="list-disc pl-4 space-y-1">
                              <li>Real-time traffic monitoring &amp; feedback loops</li>
                              <li>Comment &amp; inbox customer triage</li>
                              <li>Bi-weekly strategy call consultation</li>
                            </ul>
                          </td>
                          <td className="p-5 bg-amber-500/5 font-sans tracking-wide text-[10.5px] text-[#A0AEC0]">
                            <ul className="list-disc pl-4 space-y-1">
                              <li>Active 24/7 dedicated inbox moderation</li>
                              <li>Dedicated copywriting &amp; visual director</li>
                              <li>Direct Slack SLA support gateway (Real-time)</li>
                            </ul>
                          </td>
                        </tr>
                        <tr className="bg-black/20">
                          <td className="p-5 font-bold text-white select-none">DEPLOY SYSTEM NODE</td>
                          <td className="p-5 text-center bg-black/15">
                            <button
                              onClick={() => handleOpenCheckout("Starter Ads Core Node", "Targeted Advertising", "$500 USD / MO", "Starter Retainer")}
                              className="px-3 py-2 bg-[#040714] border border-[#1C64F2]/30 text-[#A0AEC0] hover:text-[#00F0FF] hover:border-[#00F0FF] tracking-wider uppercase font-semibold text-[8px] cursor-pointer"
                            >
                              Initialize Core Ads Node // Deploy
                            </button>
                          </td>
                          <td className="p-5 text-center bg-[#00F0FF]/5">
                            <button
                              onClick={() => handleOpenCheckout("Growth Ads Accelerator", "Targeted Advertising", "$1,200 USD / MO", "Growth Retainer")}
                              className="px-3 py-2 rounded bg-[#00F0FF] text-black tracking-widest uppercase font-black text-[8px] cursor-pointer animate-pulse shrink-0"
                            >
                              Initialize Ads Accelerator // Deploy
                            </button>
                          </td>
                          <td className="p-5 text-center bg-amber-500/5">
                            <button
                              onClick={() => handleOpenCheckout("Omnipresence Ads Dominance", "Targeted Advertising", "$2,800 USD / MO", "Dominance Retainer")}
                              className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-black tracking-widest uppercase font-black text-[8px] cursor-pointer"
                            >
                              Initialize Omnipresence Ads // Deploy
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
                        SMM // STARTER CORE SYSTEM
                      </span>
                      <div className="relative w-full h-28 bg-black/45 rounded border border-[#1C64F2]/10 overflow-hidden flex flex-col justify-center items-center mb-5">
                        <Terminal className="w-8 h-8 text-[#A0AEC0] mb-2" />
                        <span className="font-mono text-[7px] text-[#00F0FF]">CORE RETENTION LEVEL 01 //</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">
                        Starter Pack (Core Node Retainer)
                      </h3>
                      <p className="font-sans text-[11px] text-[#A0AEC0] uppercase tracking-wide leading-relaxed mb-4">
                        Elite profile initialization and full channel curation for 1 selected network (LinkedIn, X, Facebook, Instagram, or TikTok).
                      </p>
                      <ul className="space-y-1.5 font-sans text-[10px] text-neutral-400 uppercase tracking-wider mb-6">
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-[#00F0FF] shrink-0" />
                          <span>5 Premium Static Designs / Week</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-[#00F0FF] shrink-0" />
                          <span>2 Cinematic Video Edits / Week</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-[#00F0FF] shrink-0" />
                          <span>Inbox &amp; Comment Triage Daily</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline border-t border-[#1C64F2]/10 pt-4 mb-4">
                        <span className="font-mono text-[10px] text-[#A0AEC0] uppercase font-bold">MONTHLY RETENTION:</span>
                        <span className="font-mono text-sm text-[#00F0FF] font-black">$450 USD / MO</span>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout("Starter Pack SMM Core Node", "Social Media Management", "$450 USD / MO", "Starter Retainer")}
                        className="w-full py-3 bg-[#080B1C] hover:bg-[#00F0FF] border border-[#1C64F2]/40 hover:border-[#00F0FF] text-white hover:text-black font-mono text-[10.5px] uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Select Starter // Deploy Node
                      </button>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="p-6 rounded border border-purple-500/30 bg-[#080B1C]/50 flex flex-col justify-between group hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.08)] transition-all">
                    <div>
                      <span className="font-mono text-[9px] text-[#8B5CF6] tracking-widest uppercase block mb-3 font-semibold">
                        SMM // GROWTH MATRIX DEPLOY
                      </span>
                      <div className="relative w-full h-28 bg-[#8B5CF6]/5 rounded border border-[#8B5CF6]/30 overflow-hidden flex flex-col justify-center items-center mb-5">
                        <Cpu className="w-8 h-8 text-[#8B5CF6] mb-2 animate-spin" style={{ animationDuration: '8s' }} />
                        <span className="font-mono text-[7px] text-[#8B5CF6]">CORE RETENTION LEVEL 02 //</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">
                        Growth Pack (Revenue Accelerator)
                      </h3>
                      <p className="font-sans text-[11px] text-[#A0AEC0] uppercase tracking-wide leading-relaxed mb-4">
                        Comprehensive pages management and accelerated reach across 3 network platforms of your choice.
                      </p>
                      <ul className="space-y-1.5 font-sans text-[10px] text-neutral-400 uppercase tracking-wider mb-6">
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-[#8B5CF6] shrink-0" />
                          <span>10 Premium Static Designs / Week</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-[#8B5CF6] shrink-0" />
                          <span>4 Cinematic Video Edits / Week</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-[#8B5CF6] shrink-0" />
                          <span>Active Community Engagement Loops</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline border-t border-[#8B5CF6]/20 pt-4 mb-4">
                        <span className="font-mono text-[10px] text-[#A0AEC0] uppercase font-bold">MONTHLY RETENTION:</span>
                        <span className="font-mono text-sm text-[#8B5CF6] font-black">$950 USD / MO</span>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout("Growth Pack SMM Accelerated Node", "Social Media Management", "$950 USD / MO", "Growth Retainer")}
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
                        SMM // OMNIPRESENCE COMMAND TIER
                      </span>
                      <div className="relative w-full h-28 bg-amber-500/5 rounded border border-amber-500/20 overflow-hidden flex flex-col justify-center items-center mb-5">
                        <HardDrive className="w-8 h-8 text-[#F59E0B] mb-2" />
                        <span className="font-mono text-[7px] text-[#F59E0B]">CORE RETENTION LEVEL 03 //</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">
                        Dominance Command Retainer
                      </h3>
                      <p className="font-sans text-[11px] text-[#A0AEC0] uppercase tracking-wide leading-relaxed mb-4">
                        Full-scale omnipresent management, brand security, and high-pacing content scaling across 5 network platforms.
                      </p>
                      <ul className="space-y-1.5 font-sans text-[10px] text-neutral-400 uppercase tracking-wider mb-6">
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-[#F59E0B] shrink-0" />
                          <span>15 Premium Static Designs / Week</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-[#F59E0B] shrink-0" />
                          <span>8 Cinematic Video Edits / Week</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-[#F59E0B] shrink-0" />
                          <span>24/7 Moderation &amp; Direct Slack SLA</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline border-t border-amber-500/20 pt-4 mb-4">
                        <span className="font-mono text-[10px] text-[#A0AEC0] uppercase font-bold">MONTHLY RETENTION:</span>
                        <span className="font-mono text-sm text-[#F59E0B] font-black">$1,800 USD / MO</span>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout("Dominance Command SMM Node", "Social Media Management", "$1,800 USD / MO", "Dominance Retainer")}
                        className="w-full py-3 bg-[#080B1C] hover:bg-amber-500 border border-amber-500/40 hover:border-amber-500 text-white hover:text-black font-mono text-[10.5px] uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Select Dominance // Deploy
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

              {/* SOFTWARE DEVELOPMENT TAB */}
              {activeTab === "software_dev" && (
                <motion.div
                  key="software-dev-pane"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  {/* Card 1 */}
                  <div className="p-6 rounded border border-[#1C64F2]/20 bg-[#080B1C]/50 flex flex-col justify-between group hover:border-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all">
                    <div>
                      <span className="font-mono text-[9px] text-[#00F0FF] tracking-widest uppercase block mb-3 font-semibold">
                        DEV // INTERACTIVE MVP CORE
                      </span>
                      <div className="relative w-full h-28 bg-black/45 rounded border border-[#1C64F2]/10 overflow-hidden flex flex-col justify-center items-center mb-5">
                        <Cpu className="w-8 h-8 text-white/50" />
                        <span className="font-mono text-[7px] text-[#00F0FF] mt-1">SINGLE-PAGE STATE FRAME</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">
                        MVP Software Core Node
                      </h3>
                      <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed mb-6">
                        Custom software prototype or lightweight interactive business product application engineered with a clean, responsive web front and persistent state storage.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline border-t border-[#1C64F2]/10 pt-4 mb-4">
                        <span className="font-mono text-[10px] text-[#A0AEC0] uppercase">INVESTMENT:</span>
                        <span className="font-mono text-sm text-[#00F0FF] font-black">$1,200 USD</span>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout("MVP Software Core Node", "Software & App Dev", "$1,200 USD", "MVP Core")}
                        className="w-full py-3 bg-[#080B1C] hover:bg-[#00F0FF] border border-[#1C64F2]/40 hover:border-[#00F0FF] text-white hover:text-black font-mono text-[10.5px] uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Select MVP Development // Deploy
                      </button>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="p-6 rounded border border-purple-500/30 bg-[#080B1C]/50 flex flex-col justify-between group hover:border-[#8B5CF6] hover:shadow-[0_0_20px_rgba(139,92,246,0.08)] transition-all">
                    <div>
                      <span className="font-mono text-[9px] text-[#8B5CF6] tracking-widest uppercase block mb-3 font-semibold">
                        DEV // FULL STACK CORE SYSTEM
                      </span>
                      <div className="relative w-full h-28 bg-black/45 rounded border border-purple-500/20 overflow-hidden flex flex-col justify-center items-center mb-5">
                        <Sliders className="w-8 h-8 text-[#8B5CF6]" />
                        <span className="font-mono text-[7px] text-[#8B5CF6] mt-1">SERVER &amp; PERSISTENT DATABASE</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">
                        Professional Scaled System
                      </h3>
                      <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed mb-6">
                        Bespoke full-stack web or mobile configurations integrated with modern database structures (Firebase / PostgreSQL REST nodes) and authentication panels.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline border-t border-[#8B5CF6]/20 pt-4 mb-4">
                        <span className="font-mono text-[10px] text-[#A0AEC0] uppercase">INVESTMENT:</span>
                        <span className="font-mono text-sm text-[#8B5CF6] font-black">$3,500 USD</span>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout("Professional Scaled System", "Software & App Dev", "$3,500 USD", "Professional System")}
                        className="w-full py-3 bg-[#080B1C] hover:bg-[#8B5CF6] border border-[#8B5CF6]/40 hover:border-[#8B5CF6] text-white hover:text-black font-mono text-[10.5px] uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Select Pro System // Deploy
                      </button>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="p-6 rounded border border-amber-500/20 bg-[#080B1C]/50 flex flex-col justify-between group hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.08)] transition-all">
                    <div>
                      <span className="font-mono text-[9px] text-[#F59E0B] tracking-widest uppercase block mb-3 font-semibold">
                        DEV // COGNITIVE AGENT CLUSTER
                      </span>
                      <div className="relative w-full h-28 bg-black/45 rounded border border-amber-500/20 overflow-hidden flex flex-col justify-center items-center mb-5">
                        <Terminal className="w-8 h-8 text-amber-500 animate-pulse" />
                        <span className="font-mono text-[7px] text-amber-500 mt-1">GEMINI AI REASONING FRAME</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">
                        Enterprise Quantum Pipeline
                      </h3>
                      <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed mb-6">
                        Advanced multi-tenant service, integrated natively with generative AI reasoning engines, Docker clustering setups, and comprehensive support SLAs.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline border-t border-amber-500/20 pt-4 mb-4">
                        <span className="font-mono text-[10px] text-[#A0AEC0] uppercase">INVESTMENT:</span>
                        <span className="font-mono text-sm text-[#F59E0B] font-black">$8,500 USD</span>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout("Enterprise Quantum Pipeline", "Software & App Dev", "$8,500 USD", "Enterprise Quantum")}
                        className="w-full py-3 bg-[#080B1C] hover:bg-amber-400 border border-amber-500/40 hover:border-amber-500 text-white hover:text-black font-mono text-[10.5px] uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Select Enterprise dev // Deploy
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* WEBSITE BUILDING TAB */}
              {activeTab === "website_building" && (
                <motion.div
                  key="website-building-pane"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  {/* Card 1 */}
                  <div className="p-6 rounded border border-[#1C64F2]/20 bg-[#080B1C]/50 flex flex-col justify-between group hover:border-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all">
                    <div>
                      <span className="font-mono text-[9px] text-[#00F0FF] tracking-widest uppercase block mb-3 font-semibold">
                        AESTHETIC // SINGLE-PAGE PRESENCE
                      </span>
                      <div className="relative w-full h-28 bg-black/45 rounded border border-[#1C64F2]/10 overflow-hidden flex flex-col justify-center items-center mb-5">
                        <Sparkles className="w-8 h-8 text-white/50" />
                        <span className="font-mono text-[7px] text-[#00F0FF] mt-1">PARALLAX MOTION EFFECT</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">
                        Aesthetic Business Landing Page
                      </h3>
                      <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed mb-6">
                        Hyper-polished single page representation featuring eye-safe dark backdrops, fluid custom layout transitions, and embedded lead tracking pixels.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline border-t border-[#1C64F2]/10 pt-4 mb-4">
                        <span className="font-mono text-[10px] text-[#A0AEC0] uppercase">INVESTMENT:</span>
                        <span className="font-mono text-sm text-[#00F0FF] font-black">$400 USD</span>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout("Aesthetic Business Landing Page", "Website Building", "$400 USD", "Aesthetic Landing")}
                        className="w-full py-3 bg-[#080B1C] hover:bg-[#00F0FF] border border-[#1C64F2]/40 hover:border-[#00F0FF] text-white hover:text-black font-mono text-[10.5px] uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Select Landing // Deploy Node
                      </button>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="p-6 rounded border border-purple-500/30 bg-[#080B1C]/50 flex flex-col justify-between group hover:border-[#8B5CF6] hover:shadow-[0_0_20px_rgba(139,92,246,0.08)] transition-all">
                    <div>
                      <span className="font-mono text-[9px] text-[#8B5CF6] tracking-widest uppercase block mb-3 font-semibold">
                        AESTHETIC // BESPOKE MULTI-PAGE
                      </span>
                      <div className="relative w-full h-28 bg-black/45 rounded border border-[#8B5CF6]/20 overflow-hidden flex flex-col justify-center items-center mb-5">
                        <Sliders className="w-8 h-8 text-[#8B5CF6]" />
                        <span className="font-mono text-[7px] text-[#8B5CF6] mt-1">HEADLESS CMS CONTROL HUB</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">
                        Dynamic Corporate Site
                      </h3>
                      <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed mb-6">
                        Multi-page comprehensive internet portal detailing corporate features, structured team directories, on-page SEO schema triggers, and full CMS support.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline border-t border-[#8B5CF6]/20 pt-4 mb-4">
                        <span className="font-mono text-[10px] text-[#A0AEC0] uppercase">INVESTMENT:</span>
                        <span className="font-mono text-sm text-[#8B5CF6] font-black">$950 USD</span>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout("Dynamic Corporate Site", "Website Building", "$950 USD", "Corporate Site")}
                        className="w-full py-3 bg-[#080B1C] hover:bg-[#8B5CF6] border border-[#8B5CF6]/40 hover:border-[#8B5CF6] text-white hover:text-black font-mono text-[10.5px] uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Select Corporate Site // Deploy
                      </button>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="p-6 rounded border border-amber-500/20 bg-[#080B1C]/50 flex flex-col justify-between group hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.08)] transition-all">
                    <div>
                      <span className="font-mono text-[9px] text-[#F59E0B] tracking-widest uppercase block mb-3 font-semibold">
                        AESTHETIC // HYPER E-COMMERCE
                      </span>
                      <div className="relative w-full h-28 bg-black/45 rounded border border-amber-500/20 overflow-hidden flex flex-col justify-center items-center mb-5">
                        <Terminal className="w-8 h-8 text-amber-400 animate-pulse" />
                        <span className="font-mono text-[7px] text-[#F59E0B] mt-1">LOCALIZED PAYMENTS ENGINE</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">
                        Premium E-Commerce Vault
                      </h3>
                      <p className="font-sans text-xs text-[#A0AEC0] uppercase tracking-wide leading-relaxed mb-6">
                        Complete digital commerce platform configured with product categories, stock level triggers, and automatic customer invoice dispatch routines.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline border-t border-amber-500/20 pt-4 mb-4">
                        <span className="font-mono text-[10px] text-[#A0AEC0] uppercase">INVESTMENT:</span>
                        <span className="font-mono text-sm text-[2,200 USD] font-black">$2,200 USD</span>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout("Premium E-Commerce Vault", "Website Building", "$2,200 USD", "E-Commerce Vault")}
                        className="w-full py-3 bg-[#080B1C] hover:bg-amber-500 border border-amber-500/40 hover:border-amber-500 text-white hover:text-black font-mono text-[10.5px] uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Select E-Commerce Store // Deploy
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
          <OnboardingTerminal
            session={checkoutSession}
            onClose={() => setCheckoutSession(null)}
            onComplete={handleOnboardingComplete}
            initialStep={initialStep}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
