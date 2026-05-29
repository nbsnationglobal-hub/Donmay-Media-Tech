/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AppNode, UserSubscription } from "../types";
import { 
  ArrowLeft, 
  Sparkles, 
  Cpu, 
  Play, 
  RefreshCw, 
  CheckCircle, 
  ShieldCheck, 
  Flame, 
  Sliders, 
  Activity, 
  Tv, 
  Database,
  Mail,
  Lock,
  ExternalLink,
  Film,
  TrendingUp,
  Briefcase,
  Trophy,
  ArrowRight,
  Plus,
  Trash2,
  AlertTriangle,
  Utensils,
  MapPin,
  ChefHat,
  BookOpen
} from "lucide-react";

interface DeepDiveViewProps {
  appNode: AppNode;
  onBack: () => void;
}

export default function DeepDiveView({ appNode, onBack }: DeepDiveViewProps) {
  // Funnel execution state machine:
  // "idle": standard visual simulator left pane & feature catalog/purchasing on the right
  // "redirecting": handshaking with Selar payment checkout simulation Gateway
  // "simulating_checkout": Selar Gateway responsive payment visual interface
  // "activation_form": subscriber identity logging form
  // "active_success": active portal success message containing the glowing Launch trigger link
  const [checkoutState, setCheckoutState] = useState<"idle" | "redirecting" | "simulating_checkout" | "activation_form" | "active_success">("idle");
  const [activationEmail, setActivationEmail] = useState("");
  const [activationIdentifier, setActivationIdentifier] = useState("");
  const [savedUser, setSavedUser] = useState<UserSubscription | null>(null);

  const isCulina = appNode.simulationType === "culina";

  const culinaryDiscoveryItems = [
    { name: "Nigerian Jollof Rice with Grilled Herbs", origin: "West Africa", prepTime: "45 Mins", difficulty: "Medium" },
    { name: "South African Bobotie Cake", origin: "Southern Africa", prepTime: "60 Mins", difficulty: "High" },
    { name: "Moroccan Spiced Lamb Tagine", origin: "North Africa", prepTime: "90 Mins", difficulty: "High" },
    { name: "Ethiopian Injera Platter & Wot", origin: "East Africa", prepTime: "50 Mins", difficulty: "Medium" }
  ];

  const localVendors = [
    { name: "Abiola Specialty Organic Hub (Lagos)", item: "Native Rice & Scent Leaves", distance: "0.8 km", status: "Active" },
    { name: "Sahara Spice Route Importer", item: "Berbere & Tagine Spices", distance: "2.1 km", status: "Connected" },
    { name: "The Green Canopy Farms", item: "Organic Herb bundles", distance: "4.3 km", status: "Active" }
  ];

  // Vora timeline tracker playhead simulation
  const [timelinePlayhead, setTimelinePlayhead] = useState(0);
  // QuantSync live pulsing chart simulated coordinate arrays
  const [tickerPrice, setTickerPrice] = useState(1.0825);
  const [candleData, setCandleData] = useState<number[]>([45, 60, 52, 70, 65, 80, 75, 90]);
  // Media Hero interactive rows state
  const [viralPatterns, setViralPatterns] = useState([
    { pattern: "Hook Retention Phase A", status: "Secure", score: "94%" },
    { pattern: "Veo Cinematic Transition Buffer", status: "Optimized", score: "91%" },
    { pattern: "Social Algorithm Tag Matcher", status: "Secure", score: "99%" },
    { pattern: "Imagen Thumbnail Visual Saturation", status: "Optimal", score: "96%" }
  ]);
  // MyBudgetHero budget ledger active bars
  const [projectBudgets, setProjectBudgets] = useState([
    { category: "Site Architecture Blueprinting", planned: 25000, activeSpend: 21200 },
    { category: "Structural Engineering & Steel Foundations", planned: 95000, activeSpend: 82300 },
    { category: "Full-Stack System Cloud Infrastructure Sync", planned: 15000, activeSpend: 15000 },
    { category: "Operational Contractor Labor Retainers", planned: 60000, activeSpend: 42000 }
  ]);
  // Aura Match Matrices State
  const [matchOdds, setMatchOdds] = useState([
    { home: "Chelsea FC", away: "Real Madrid", algorithmValue: "HOME WON CO-ML", calculatedOdds: 1.95, strengthFactor: "88% / 84%" },
    { home: "Manchester City", away: "Bayern Munich", algorithmValue: "OVER 2.5 REALISM", calculatedOdds: 1.62, strengthFactor: "92% / 89%" },
    { home: "Paris SG", away: "Arsenal", algorithmValue: "DRAW PROB MATRIX", calculatedOdds: 3.40, strengthFactor: "85% / 87%" }
  ]);
  const [customStake, setCustomStake] = useState("100");

  // Culina Simulation State
  const [activeRecipe, setActiveRecipe] = useState("Nigerian Jollof Rice with Grilled Herbs");
  const [cookingProgress, setCookingProgress] = useState(65);
  const [selectedProfileMode, setSelectedProfileMode] = useState<"Guided" | "Baking" | "Buffet">("Guided");

  // Culina cooking timer oscillation loop
  useEffect(() => {
    if (appNode.simulationType !== "culina") return;
    const interval = setInterval(() => {
      setCookingProgress(prev => {
        if (prev >= 100) return 10;
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [appNode.simulationType]);

  // Load persistent record from LocalStorage on mount
  useEffect(() => {
    const key = `donmay_sub_${appNode.id}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email) {
          setSavedUser(parsed);
          setActivationEmail(parsed.email);
          setActivationIdentifier(parsed.mt5Id || parsed.teamName || "");
          setCheckoutState("active_success");
        }
      } catch (e) {
        console.error("Corrupted local storage parsed schema error", e);
      }
    }
  }, [appNode.id]);

  // Vora Studio timeline loop
  useEffect(() => {
    if (appNode.simulationType !== "vora") return;
    const interval = setInterval(() => {
      setTimelinePlayhead(prev => {
        if (prev >= 100) return 0;
        return prev + 2.5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [appNode.simulationType]);

  // QuantSync live price oscillator ticker loop
  useEffect(() => {
    if (appNode.simulationType !== "quantsync") return;
    const interval = setInterval(() => {
      setTickerPrice(prev => {
        const movement = (Math.random() - 0.5) * 0.00040;
        return parseFloat((prev + movement).toFixed(5));
      });
      setCandleData(prev => {
        const next = [...prev.slice(1)];
        next.push(Math.floor(Math.random() * 60) + 35);
        return next;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [appNode.simulationType]);

  // 1. Trigger Payment gateway redirections handler simulation
  const handleInitializeSubscription = () => {
    setCheckoutState("redirecting");
    setTimeout(() => {
      setCheckoutState("simulating_checkout");
    }, 1500);
  };

  // 2. Trigger secure successful Selar validation response
  const handleSimulateSuccessfulPayment = () => {
    setCheckoutState("activation_form");
  };

  // 3. Save subscriber activation credentials record
  const handleSaveActivationCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activationEmail) return;

    const record: UserSubscription = {
      email: activationEmail,
      appName: appNode.title,
      subscribedAt: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
      status: "active",
      mt5Id: appNode.simulationType === "quantsync" ? activationIdentifier : undefined,
      teamName: appNode.simulationType !== "quantsync" ? activationIdentifier : undefined
    };

    localStorage.setItem(`donmay_sub_${appNode.id}`, JSON.stringify(record));
    setSavedUser(record);
    setCheckoutState("active_success");
  };

  const handleDeactivateSubscription = () => {
    localStorage.removeItem(`donmay_sub_${appNode.id}`);
    setSavedUser(null);
    setCheckoutState("idle");
    setActivationEmail("");
    setActivationIdentifier("");
  };

  const getOptionalLabel = () => {
    switch (appNode.simulationType) {
      case "quantsync":
        return "MetaTrader 5 (MT5) ID";
      case "budget":
        return "Bento Construction Project Name";
      case "vora":
        return "Primary Cinema Studio Studio Handle";
      case "media_hero":
        return "Social YouTube or Instagram Handle";
      case "aura":
        return "Aura Football Bookmaker Affiliation";
      case "culina":
        return "Preferred Culinary Profile Mode (Guided, Baking, Buffet)";
      default:
        return "Optional Identifier";
    }
  };

  return (
    <section className="min-h-screen py-24 px-6 md:px-12 bg-[#040714] relative z-10 select-none text-white transition-all">
      <div className="absolute inset-0 digital-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Back navigation button */}
        <button
          onClick={onBack}
          className="group flex items-center gap-2 mb-10 px-4 py-2 font-display text-xs tracking-widest text-[#A0AEC0] hover:text-[#00F0FF] border border-[#1C64F2]/25 hover:border-[#00F0FF] rounded bg-[#080B1C]/60 backdrop-blur-sm transition-all cursor-pointer"
          id="btn-back-to-grid"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO APP DIRECTORY</span>
        </button>

        {/* Header summary info */}
        <div className="mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-[#1C64F2]/20 pb-10">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 text-[#00F0FF] font-mono text-xs tracking-wider mb-3">
              <Cpu className="w-4 h-4 animate-spin-slow text-[#00F0FF]" />
              <span>{appNode.subtitle} // ACTIVE FUNNEL PROTOCOL</span>
            </div>
            <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-widest uppercase">
              {appNode.title}
            </h2>
            <p className="font-sans text-[#A0AEC0] mt-5 text-sm md:text-base leading-relaxed max-w-3xl uppercase">
              {appNode.longDescription}
            </p>

            {/* Display Micro-Tags on Deep Dive */}
            <div className="flex flex-wrap gap-2.5 mt-4">
              {appNode.microTags.map((tag, tIdx) => (
                <span 
                  key={tIdx} 
                  className="text-[10px] font-mono font-bold px-3 py-1 bg-[#1C64F2]/10 border border-[#1C64F2]/30 text-[#00F0FF] tracking-wider rounded uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3 w-full self-end">
            <div className="p-4 rounded border border-[#1C64F2]/20 bg-[#080B1C]/50 flex flex-col gap-1 w-full relative">
              <span className="font-mono text-[9px] text-[#A0AEC0] tracking-widest uppercase">CORE LICENSE ACCESS TIER</span>
              <span className="font-display text-xs text-white uppercase font-black tracking-widest flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                PREMIUM ALL-INCLUSIVE SECURE FEED
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Area structured as requested: Left/Right Split Canvas, except when payments are ongoing */}
        <AnimatePresence mode="wait">
          {checkoutState === "idle" || checkoutState === "active_success" ? (
            <motion.div 
              key="split-canvas"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              id="subscription-funnel-grid"
            >
              {/* =============== LEFT PANE: VISUAL SIMULATION ZONE =============== */}
              <div className="lg:col-span-7 flex flex-col" id="visual-simulation-zone">
                <div className={`flex items-center justify-between px-6 py-4 rounded-t-lg border-t border-x bg-[#080B1C] ${isCulina ? "border-[#FF7A18]/30" : "border-[#1C64F2]/30"}`}>
                  <div className="flex items-center gap-2">
                    <Activity className={`w-4 h-4 ${isCulina ? "text-[#FF8A35] animate-pulse" : "text-[#00F0FF]"}`} />
                    <span className={`text-xs text-white font-bold tracking-widest uppercase ${isCulina ? "font-sora text-[#FFB347]" : "font-display"}`}>
                      {isCulina ? "CULINA KITCHEN TERMINAL WORKSPACE" : "PROPRIETARY RUNTIME GRAPH SIMULATOR"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isCulina ? "bg-[#FF7A18]" : "bg-[#00F0FF]"}`} />
                    <span className="font-mono text-[8.5px] text-[#A0AEC0] tracking-widest uppercase">
                      {isCulina ? "CINEMATIC EMULATION" : "ONLINE EMULATION"}
                    </span>
                  </div>
                </div>

                <div className={`flex-1 min-h-[460px] rounded-b-lg border p-6 relative flex flex-col justify-between overflow-hidden ${isCulina ? "border-[#FF7A18]/30 bg-[#0F0F0F]" : "border-[#1C64F2]/30 bg-[#040714]"}`}>
                  <div className="absolute inset-0 digital-grid opacity-35 pointer-events-none" />

                  {/* 1. VORA STUDIO SIMULATOR (Timeline Frame Animation) */}
                  {appNode.simulationType === "vora" && (
                    <div className="relative z-10 flex flex-col justify-between h-full gap-6" id="sim-vora">
                      <div className="flex justify-between items-center bg-[#080B1C]/90 p-4 border border-[#1C64F2]/25 rounded">
                        <div className="flex items-center gap-3">
                          <Film className="w-5 h-5 text-purple-400 animate-pulse" />
                          <div>
                            <p className="font-display text-xs text-white font-bold tracking-widest uppercase">
                              VORA VIDEO CHOREOGRAPHY FEED
                            </p>
                            <p className="font-mono text-[9px] text-[#A0AEC0] tracking-wide mt-0.5">
                              GEMINI VISION // FRAMING RENDERING CAPTURE MATRIX
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-[10px] text-purple-400 tracking-wider">
                          FPS: 60 // 4K CINEMATIC
                        </span>
                      </div>

                      {/* Timeline graphic preview */}
                      <div className="flex-1 my-4 bg-black/80 rounded border border-[#1C64F2]/10 p-5 flex flex-col justify-between relative">
                        <div className="flex items-center justify-between border-b border-[#1C64F2]/15 pb-2 mb-4">
                          <span className="font-mono text-[9px] text-[#00F0FF] tracking-widest uppercase">MULTICHARACTER CINEMATIC STENCIL</span>
                          <span className="font-mono text-[9px] text-purple-400">STATUS: INTERPOLATING FACE_SYNC</span>
                        </div>

                        {/* Rendering Canvas Preview */}
                        <div className="h-28 rounded bg-[#080B1C]/70 border border-[#1C64F2]/5 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-around opacity-20 pointer-events-none">
                            <div className="w-12 h-12 rounded-full border border-purple-500 animate-ping" />
                            <div className="w-16 h-16 border border-[#00F0FF] rotate-45 animate-spin-slow" />
                          </div>
                          <div className="z-10 text-center">
                            <span className="font-mono text-[11px] text-white/90 tracking-widest uppercase block font-bold">
                              ACTIVE VIDEO COMPOSITION TIMELINE
                            </span>
                            <span className="font-mono text-[8.5px] text-[#A0AEC0] block mt-1">
                              RENDERING SEQUENCE : {Math.round(timelinePlayhead)}% COMPLETED OUT OF 300 FRAMES
                            </span>
                          </div>
                        </div>

                        {/* Animated Scrubber playhead timeline */}
                        <div className="mt-4">
                          <div className="flex justify-between font-mono text-[8px] text-[#A0AEC0] mb-1.5 uppercase">
                            <span>00:00:00:00</span>
                            <span className="text-[#00F0FF]">SCRUBBING TIMELINE SEQUENCE</span>
                            <span>00:00:12:30</span>
                          </div>
                          <div className="h-6 bg-[#040714] rounded border border-[#1C64F2]/20 relative overflow-hidden flex items-center">
                            {/* Running timeline stripes */}
                            <div className="absolute inset-0 opacity-[0.03] bg-repeat-x bg-[linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:10px_100%]" />
                            {/* Animated scrubbing bar representing playhead */}
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500/20 to-[#00F0FF]/40 border-r-2 border-[#00F0FF] relative transition-all duration-150" 
                              style={{ width: `${timelinePlayhead}%` }}
                            >
                              <div className="absolute right-0 top-0 w-2 h-2 bg-[#00F0FF] rotate-45 -translate-y-1/2 translate-x-1/2" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Video tracks */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-2.5 bg-[#080B1C]/60 rounded border border-[#1C64F2]/10 font-mono text-[8.5px] text-[#A0AEC0] uppercase">
                          <span className="text-white block font-bold mb-1">TRACK 1: CINEMA GEOMETRY</span>
                          Active face coordinate vectors: 4,096 nodes matched
                        </div>
                        <div className="p-2.5 bg-[#080B1C]/60 rounded border border-[#1C64F2]/10 font-mono text-[8.5px] text-[#A0AEC0] uppercase block">
                          <span className="text-white block font-bold mb-1">TRACK 2: CHOREOGRAPHY SYST</span>
                          Auto beat-synchronized timing ratio: 1/16 frames
                        </div>
                        <div className="p-2.5 bg-[#080B1C]/60 rounded border border-[#1C64F2]/10 font-mono text-[8.5px] text-[#A0AEC0] uppercase block">
                          <span className="text-white block font-bold mb-1">TRACK 3: AUDIO FEED FLUX</span>
                          Lossless 24-bit surround-sound dynamic filter sync
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. QUANT_SYNC SIMULATOR (Pulsing Tech Chart) */}
                  {appNode.simulationType === "quantsync" && (
                    <div className="relative z-10 flex flex-col justify-between h-full gap-5" id="sim-quantsync">
                      <div className="flex justify-between items-center bg-[#080B1C]/90 p-4 border border-[#1C64F2]/25 rounded">
                        <div className="flex items-center gap-3">
                          <TrendingUp className="w-5 h-5 text-[#00F0FF] animate-pulse" />
                          <div>
                            <p className="font-display text-xs text-white font-bold tracking-widest uppercase">
                              QUANT_SYNC MT5 CLOUD ANALYTICAL STREAM
                            </p>
                            <p className="font-mono text-[9px] text-[#A0AEC0] tracking-wide mt-0.5">
                              NEURAL RESEARCH CORE // LATENCY FEED CONTROL
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-[10px] text-emerald-400 font-bold block">
                            ACTIVE INDEX RATE: {tickerPrice.toFixed(5)}
                          </span>
                        </div>
                      </div>

                      {/* Tech chart grids & oscillator */}
                      <div className="flex-1 my-4 bg-black/85 rounded border border-[#1C64F2]/15 p-4 flex flex-col justify-between">
                        <div className="flex justify-between font-mono text-[9px] text-[#A0AEC0] border-b border-[#1C64F2]/15 pb-2">
                          <span>Pair: EURUSD (Live ticks oscillator)</span>
                          <span className="text-[#00F0FF] animate-pulse">BRIDGE CONNECTION: RUNNING via MQL5</span>
                        </div>

                        {/* Pulsing bars mimicking trading candlesticks & MACD */}
                        <div className="h-32 flex items-end justify-between gap-1.5 pt-4">
                          {candleData.map((height, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                              {/* Simulated candle stem */}
                              <div className="w-[1.5px] h-4 bg-emerald-400/40" />
                              {/* Simulated candle body block */}
                              <motion.div 
                                animate={{ height: `${height}%` }}
                                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                                className={`w-full rounded-sm transition-all shadow-[0_0_10px_rgba(34,197,94,0.15)] ${idx % 2 === 0 ? "bg-emerald-500" : "bg-[#1C64F2]"}`} 
                              />
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#1C64F2]/15 font-mono text-[8.5px] text-[#A0AEC0] uppercase">
                          <div>
                            <span className="text-white block font-bold">LATENCY HANDSHAKE</span>
                            12.4ms MT5 Core Cloud Server
                          </div>
                          <div>
                            <span className="text-white block font-bold">VOLATILITY COEFFICIENT</span>
                            82.45% dynamic range ratio
                          </div>
                          <div>
                            <span className="text-white block font-bold">TOTAL POSITION EXECUTED</span>
                            0.25 standard active lots
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#080B1C]/60 p-3.5 rounded border border-[#1C64F2]/10 font-mono text-[9px] text-[#00F0FF] uppercase flex items-center justify-between">
                        <span>SYS ARCH: FIRESTORE SECURE DATABASE TELEMETRY CHANNEL</span>
                        <span>HEALTH: 100% ONLINE</span>
                      </div>
                    </div>
                  )}

                  {/* 3. MEDIA HERO SIMULATOR (Data tables for pattern detection) */}
                  {appNode.simulationType === "media_hero" && (
                    <div className="relative z-10 flex flex-col justify-between h-full gap-5" id="sim-media-hero">
                      <div className="flex justify-between items-center bg-[#080B1C]/90 p-4 border border-[#1C64F2]/25 rounded">
                        <div className="flex items-center gap-3">
                          <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
                          <div>
                            <p className="font-display text-xs text-white font-bold tracking-widest uppercase">
                              MEDIA HERO ALGORITHMIC CO-PILOT
                            </p>
                            <p className="font-mono text-[9px] text-[#A0AEC0] mt-0.5 uppercase tracking-wider">
                              VIRAL PATTERN AUDITING MATRIX // IMAGEN &amp; VEO GATEWAY
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-[9px] text-orange-400 tracking-wider">
                          ALGO SECURE RATIO: 100%
                        </span>
                      </div>

                      {/* Data table representation */}
                      <div className="flex-1 my-3 bg-black/80 rounded border border-[#1C64F2]/15 p-4 overflow-x-auto">
                        <div className="min-w-[450px]">
                          <div className="grid grid-cols-12 font-mono text-[9.5px] text-[#00F0FF] border-b border-[#1C64F2]/20 pb-2 mb-2 font-bold uppercase tracking-wider">
                            <span className="col-span-5">AUDITED SOCIAL VIRAL PATTERN</span>
                            <span className="col-span-4">VULNERABILITY AUDIT SECURE</span>
                            <span className="col-span-3 text-right">IMPACT RATINGS</span>
                          </div>

                          <div className="flex flex-col gap-2.5">
                            {viralPatterns.map((item, idx) => (
                              <div key={idx} className="grid grid-cols-12 font-mono text-[9px] text-[#A0AEC0] py-2 border-b border-[#1C64F2]/5 hover:bg-[#1C64F2]/5 px-1 rounded transition-colors uppercase">
                                <span className="col-span-5 text-white font-semibold flex items-center gap-1.5">
                                  <span className="w-1 h-1 bg-orange-400 rounded-full" />
                                  {item.pattern}
                                </span>
                                <span className="col-span-4 text-emerald-400 font-bold">
                                  {item.status} // CONFIRMED PASS
                                </span>
                                <span className="col-span-3 text-right text-[#00F0FF] font-bold">
                                  {item.score}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 font-mono text-[8.5px] text-[#A0AEC0] uppercase">
                        <div className="bg-[#080B1C]/50 p-2.5 border border-[#1C64F2]/10 rounded block">
                          <span className="text-white block font-bold mb-1">IMAGEN OPTIMIZATION ENGINE</span>
                          Automatic neural color grading is fully locked &amp; calibrated.
                        </div>
                        <div className="bg-[#080B1C]/50 p-2.5 border border-[#1C64F2]/10 rounded block">
                          <span className="text-white block font-bold mb-1">VEO VIDEO RESHAPING STREAM</span>
                          Interpolation timeline filters calculated synchronously.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. MY_BUDGET_HERO SIMULATOR (Budget Bars Dashboard) */}
                  {appNode.simulationType === "budget" && (
                    <div className="relative z-10 flex flex-col justify-between h-full gap-5" id="sim-budget">
                      <div className="flex justify-between items-center bg-[#080B1C]/90 p-4 border border-[#1C64F2]/25 rounded">
                        <div className="flex items-center gap-3">
                          <Briefcase className="w-5 h-5 text-emerald-400 animate-pulse" />
                          <div>
                            <p className="font-display text-xs text-white font-bold tracking-widest uppercase">
                              MyBudgetHero HYBRID CAD SLATE LEDGERS
                            </p>
                            <p className="font-mono text-[9px] text-[#A0AEC0] mt-0.5 uppercase tracking-wider">
                              STRUCTURAL CONSTRUCTION // WEB Wealth SPREADSHEET SYNC
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-[9px] text-emerald-400 tracking-wider">
                          DB REPLICA: SUPABASE OK
                        </span>
                      </div>

                      {/* Budget cost-progress bars */}
                      <div className="flex-1 my-3 bg-black/80 rounded border border-[#1C64F2]/15 p-4 flex flex-col gap-3 justify-center">
                        <span className="font-mono text-[9px] text-[#00F0FF] block border-b border-[#1C64F2]/15 pb-1.5 uppercase font-bold tracking-wider">
                          REAL-TIME EXPENSE METRICS vs BUDGET LIMIT CORES
                        </span>

                        <div className="flex flex-col gap-3.5">
                          {projectBudgets.map((b, idx) => {
                            const ratio = Math.round((b.activeSpend / b.planned) * 100);
                            return (
                              <div key={idx} className="flex flex-col gap-1 font-mono text-[9px]">
                                <div className="flex justify-between text-[#A0AEC0] uppercase">
                                  <span className="text-white font-semibold truncate max-w-[280px]">{b.category}</span>
                                  <span>${b.activeSpend.toLocaleString()} / ${b.planned.toLocaleString()} ({ratio}%)</span>
                                </div>
                                <div className="w-full h-2.5 bg-[#040714] rounded border border-[#1C64F2]/20 overflow-hidden flex">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${ratio}%` }}
                                    transition={{ duration: 1, delay: idx * 0.1 }}
                                    className={`h-full ${ratio >= 100 ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" : "bg-cyan-500"}`}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="font-mono text-[8.5px] text-[#A0AEC0] uppercase bg-[#080B1C]/60 p-3 rounded border border-[#1C64F2]/10 flex justify-between">
                        <span>CAD Blueprints Sync Factor: Active</span>
                        <span>Site cost replication ledger: Live</span>
                      </div>
                    </div>
                  )}

                  {/* 5. AURA PREDICTOR PRO SIMULATOR (High contrast match matrices matrices) */}
                  {appNode.simulationType === "aura" && (
                    <div className="relative z-10 flex flex-col justify-between h-full gap-5" id="sim-aura">
                      <div className="flex justify-between items-center bg-[#080B1C]/90 p-4 border border-[#1C64F2]/25 rounded">
                        <div className="flex items-center gap-3">
                          <Trophy className="w-5 h-5 text-amber-500 animate-pulse" />
                          <div>
                            <p className="font-display text-xs text-white font-bold tracking-widest uppercase">
                              AURA SPORTS VALUE PROBABILITY MATRICES
                            </p>
                            <p className="font-mono text-[9px] text-[#A0AEC0] mt-0.5 uppercase tracking-wider">
                              ANTI-BIAS SQUAD STRENGTH OPTIMIZER // COMBO REALISM ENGINE
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-[9px] text-amber-500 tracking-wider">
                          INDEXER: RAW SLIP
                        </span>
                      </div>

                      {/* Football matrices table list */}
                      <div className="flex-1 my-3 bg-black/80 rounded border border-[#1C64F2]/15 p-3 overflow-y-auto max-h-[220px]">
                        <div className="flex flex-col gap-2">
                          <div className="grid grid-cols-12 font-mono text-[9px] text-[#00F0FF] border-b border-[#1C64F2]/15 pb-2 font-bold mb-1 uppercase tracking-wider">
                            <span className="col-span-5">FOOTBALL MATCH</span>
                            <span className="col-span-3">STRENGTHS</span>
                            <span className="col-span-4 text-right">VALUE SELECTION</span>
                          </div>

                          {matchOdds.map((m, id) => (
                            <div key={id} className="grid grid-cols-12 font-mono text-[9.5px] text-[#A0AEC0] py-1.5 border-b border-[#1C64F2]/5 uppercase items-center">
                              <span className="col-span-5 text-white font-semibold">{m.home} vs {m.away}</span>
                              <span className="col-span-3 text-cyan-400">{m.strengthFactor}</span>
                              <span className="col-span-4 text-right text-emerald-400 font-bold">
                                {m.algorithmValue} (@{m.calculatedOdds.toFixed(2)})
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Realistic ticket generator block code */}
                      <div className="bg-[#080B1C]/80 rounded p-3 border border-[#1C64F2]/15 flex flex-col justify-between">
                        <div className="flex items-center justify-between font-mono text-[9px] text-[#A0AEC0] border-b border-[#1C64F2]/5 pb-1 uppercase mb-1.5">
                          <span>Aura Combos Accumulator Slip Summary</span>
                          <span>3 Legs Active</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[9px] text-[#A0AEC0]">STAKE (USD):</span>
                            <input
                              type="number"
                              value={customStake}
                              onChange={(e) => setCustomStake(e.target.value)}
                              className="bg-[#040714] border border-[#1C64F2]/30 text-white font-mono text-xs w-16 px-1.5 py-0.5 rounded focus:outline-none focus:border-[#00F0FF]"
                            />
                          </div>
                          <span className="font-mono text-[10px] text-white">
                             Estimated True Return: <span className="text-[#00F0FF] font-black">${(parseFloat(customStake || "0") * (1.95 * 1.62 * 3.40)).toFixed(2)}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {appNode.simulationType === "culina" && (
                    <div className="relative z-10 flex flex-col justify-between h-full gap-5 font-poppins text-white animate-fade-in" id="sim-culina">
                      {/* Top Banner with Flame Gradient for structural headers & Sora Font */}
                      <div className="bg-gradient-to-r from-[#FF7A18] via-[#FF8A35] to-[#FFB347] p-4 rounded text-black flex justify-between items-center shadow-[0_4px_20px_rgba(255,122,24,0.15)] select-none">
                        <div className="flex items-center gap-3">
                          <ChefHat className="w-6 h-6 text-black animate-pulse" />
                          <div>
                            <h4 className="font-sora font-black text-xs tracking-wider uppercase text-black leading-tight">
                              Culina Cinematic Chef Core // Active
                            </h4>
                            <p className="font-mono text-[8.5px] text-black/85 font-semibold tracking-wide uppercase mt-0.5">
                              Sora Geometric Platform // AI Kitchen Terminal V1.96
                            </p>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-[9px] px-2 py-0.5 rounded border border-black/30 bg-black/10 uppercase">
                          Mode: {selectedProfileMode}
                        </span>
                      </div>

                      {/* Bento Grid layout with food blocks & vendor directory */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Left Column: Bento Food Discovery block */}
                        <div className="p-4 rounded bg-[#171717] border border-[#FF7A18]/15 flex flex-col justify-between min-h-[190px]">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <BookOpen className="w-3.5 h-3.5 text-[#FFB347]" />
                              <span className="font-sora font-semibold text-[8px] text-[#FFB347] uppercase tracking-wider">
                                African &amp; World Culinary Discovery
                              </span>
                            </div>
                            <div className="flex flex-col gap-1.5 mt-2">
                              {culinaryDiscoveryItems.map((item, id) => (
                                <button
                                  key={id}
                                  onClick={() => {
                                    setActiveRecipe(item.name);
                                    setCookingProgress(25); // reset progress on select to show interactive reactivity
                                  }}
                                  className={`w-full text-left p-1.5 rounded transition-all flex items-center justify-between group cursor-pointer ${activeRecipe === item.name ? "bg-[#FF7A18]/10 border border-[#FF7A18]/30" : "bg-black/30 hover:bg-[#FF7A18]/5 border border-transparent"}`}
                                >
                                  <div className="truncate pr-1 text-left">
                                    <span className={`text-[9.5px] font-bold block truncate uppercase ${activeRecipe === item.name ? "text-[#FF8A35]" : "text-white/85 group-hover:text-[#FF7A18]"}`}>
                                      {item.name}
                                    </span>
                                    <span className="font-mono text-[7px] text-[#A0AEC0] block lowercase">
                                      {item.origin} // {item.prepTime}
                                    </span>
                                  </div>
                                  <span className={`text-[7px] font-mono font-bold px-1 rounded uppercase ${item.difficulty === "High" ? "text-red-400 bg-red-400/5" : "text-amber-400 bg-amber-400/5"}`}>
                                    {item.difficulty}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Simulated Local Vendor Directory Map */}
                        <div className="p-4 rounded bg-[#171717] border border-[#FF7A18]/15 flex flex-col justify-between min-h-[190px]">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="w-3.5 h-3.5 text-[#FFB347]" />
                              <span className="font-sora font-semibold text-[8px] text-[#FFB347] uppercase tracking-wider">
                                Raw Ingredients &amp; Local Vendor Map
                              </span>
                            </div>
                            
                            {/* The schematic map representation */}
                            <div className="relative h-20 bg-black/50 rounded border border-[#FF7A18]/10 flex items-center justify-center overflow-hidden mb-3">
                              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#FF7A18_1px,transparent_1px)] [background-size:12px_12px]" />
                              {/* Pulsing focal orange ring radar represent position */}
                              <div className="absolute top-[35%] left-[55%] w-6 h-6 rounded-full border border-[#FF7A18] animate-ping" />
                              <div className="absolute top-[35%] left-[55%] w-2 h-2 rounded-full bg-[#FF7A18]" />
                              <span className="font-mono text-[8.5px] text-white/50 absolute bottom-1 right-2 uppercase">
                                LAGOS COORD NODES
                              </span>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              {localVendors.map((vendor, vidx) => (
                                <div key={vidx} className="flex justify-between items-center text-[8px] font-mono py-1 border-b border-white/5 text-[#A0AEC0] uppercase">
                                  <div className="truncate pr-1 text-left">
                                    <span className="text-white block font-bold truncate">{vendor.name}</span>
                                    <span className="text-[#A0AEC0]/85 lowercase block">{vendor.item}</span>
                                  </div>
                                  <div className="text-right whitespace-nowrap">
                                    <span className="text-[#FF7A18] font-bold block">{vendor.distance}</span>
                                    <span className="text-emerald-400 block">{vendor.status}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* STEP-BY-STEP COOKING PROGRESS MODULE (Interactive bar) */}
                      <div className="p-4 rounded bg-[#121212] border border-[#FF7A18]/20 flex flex-col gap-2.5">
                        <div className="flex justify-between items-baseline">
                          <span className="font-sora text-[9px] font-bold text-[#FFB347] uppercase tracking-wider">
                            Active Chef Guided Step Tracker
                          </span>
                          <span className="font-mono text-[8.5px] text-[#A0AEC0] uppercase">
                            Step 3 of 5 // Simulating Timer
                          </span>
                        </div>
                        
                        {/* Animated cooking progress bar */}
                        <div className="relative">
                          <div className="flex justify-between font-mono text-[7.5px] text-[#A0AEC0] mb-1">
                            <span className="truncate max-w-[250px] text-white uppercase text-left">Active recipe: {activeRecipe}</span>
                            <span className="text-[#FF7A18] font-black">{cookingProgress}% Done</span>
                          </div>
                          <div className="h-4 bg-black rounded border border-[#FF7A18]/30 relative overflow-hidden flex items-center">
                            <div 
                              className="h-full bg-gradient-to-r from-[#FF7A18] to-[#FFB347] relative transition-all duration-300"
                              style={{ width: `${cookingProgress}%` }}
                            >
                              <div className="absolute right-0 top-0 bottom-0 w-1 bg-white animate-pulse" />
                            </div>
                          </div>
                        </div>

                        {/* Dynamic step instructions depending on selected recipe */}
                        <div className="bg-black/40 p-2.5 rounded border border-[#FF7A18]/10 font-mono text-[8.5px] text-[#A0AEC0] leading-relaxed uppercase text-left">
                          <span className="text-[#FFB347] font-bold block mb-1">CURRENT DIRECTIVE:</span>
                          {activeRecipe.includes("Jollof") 
                            ? "Pour parboiled long-grain rice into the robust red tomato-pepper reduction. Seal the container lid to capture moisture and secure sensory flavor alignment."
                            : activeRecipe.includes("Bobotie")
                            ? "Lightly pour the golden egg-custard mixture over the spiced minced lamb layers. Toss a selection of fresh bay leaves across the workspace surface."
                            : activeRecipe.includes("Tagine")
                            ? "Simmer spiced mutton cuts over steady low fireplace heat. Infuse specialty dates and roasted honeyed almonds during the final frame cycle."
                            : "Lay out the freshly fermented teff injera bread. Neatly arrange spiced beef wots and vegetarian lentils across the organic plate matrix."
                          }
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* =============== RIGHT PANE: THE FEATURE CATALOG OR ACTIVATION =============== */}
              <div className="lg:col-span-5 flex flex-col gap-6" id="right-feature-catalog-and-checkout">
                
                {/* Feature catalog list */}
                <div className="p-6 rounded-lg border border-[#1C64F2]/20 bg-[#080B1C]/60 backdrop-blur-sm relative overflow-hidden">
                  <span className="font-mono text-[10px] text-[#00F0FF] tracking-widest uppercase block mb-4 font-bold">
                    CORE CREATIVE ARCHITECTURAL PILLARS
                  </span>
                  
                  <div className="flex flex-col gap-4">
                    {appNode.capabilities.map((cap, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-[#040714]/65 p-3.5 rounded border border-[#1C64F2]/10 hover:border-[#00F0FF]/30 transition-all font-sans text-xs">
                        <div className="p-1.5 bg-[#1C64F2]/10 border border-[#1C64F2]/20 text-[#00F0FF] rounded mt-0.5 flex-shrink-0">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="font-display font-bold text-white tracking-wide uppercase">{cap}</p>
                          <p className="text-[10px] text-[#A0AEC0] mt-1 uppercase">INTEGRATED ON STANDALONE INSTANT PORT STACKS</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Active backend software framework tags info */}
                  <div className="mt-6 pt-5 border-t border-[#1C64F2]/15">
                    <span className="font-mono text-[9px] text-[#A0AEC0] uppercase tracking-wider block mb-2 font-semibold">
                      INCORPORATED PLATFORM STACKS:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {appNode.architectureStack.map((stack, sIdx) => (
                        <span key={sIdx} className="font-mono text-[9px] text-white bg-[#040714] border border-[#1C64F2]/15 px-2.5 py-1 rounded">
                          {stack}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* THE CONVERSION BASE OR INSTANT ACTIVE PORTAL PANEL */}
                <div className="p-6 rounded-lg border border-[#10B981]/30 bg-[#040914]/85 relative overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.06)] flex flex-col justify-between" id="conversion-base-card">
                  {/* Subtle decorative pulsing layout */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1C64F2]/5 via-transparent to-[#10B981]/5" />
                  
                  {checkoutState === "active_success" ? (
                    <div className="relative z-10 text-center py-4 flex flex-col items-center">
                      <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-400 rounded-full flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h3 className="font-display text-base font-bold text-white uppercase tracking-widest">
                        SECURE ACTIVE PORT STATE REGISTERED
                      </h3>
                      <p className="font-sans text-xs text-slate-350 bg-[#080B1C] border border-[#1C64F2]/15 p-3 rounded mt-4 max-w-sm uppercase leading-relaxed text-[#A0AEC0]">
                        Identity: <span className="text-white font-bold">{savedUser?.email}</span>
                        {savedUser?.mt5Id ? (
                          <> <br /> {appNode.simulationType === "quantsync" ? "Account MT5 ID" : "BRAND NAME"}: <span className="text-white font-bold uppercase">{savedUser.mt5Id}</span></>
                        ) : savedUser?.teamName ? (
                          <> <br /> {appNode.simulationType === "culina" ? "Culinary Profile Mode" : "Variable Tag"}: <span className={`${appNode.simulationType === "culina" ? "text-[#FF8A35]" : "text-[#00F0FF]"} font-bold`}>{savedUser.teamName}</span></>
                        ) : null}
                      </p>

                      {/* Pulled from Target Links mapping */}
                      <a
                        href={appNode.targetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full mt-6 py-4 px-6 rounded bg-gradient-to-r from-emerald-500 to-teal-400 text-[#040714] font-display font-black text-xs tracking-[0.2em] hover:from-teal-400 hover:to-emerald-500 transition-all duration-300 text-center uppercase cursor-pointer hover:shadow-[0_0_30px_rgba(16,185,129,0.59)] block"
                      >
                        LAUNCH APPLICATION
                      </a>

                      <button
                        onClick={handleDeactivateSubscription}
                        className="mt-5 font-mono text-[9px] text-[#A0AEC0] hover:text-red-400 transition-colors uppercase cursor-pointer flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>DEACTIVATE MOCK SUBSCRIPTION</span>
                      </button>
                    </div>
                  ) : (
                    <div className="relative z-10 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-mono text-[9px] text-[#10B981] font-black uppercase tracking-widest block mb-1">
                            STRATEGY A // PREMIUM PORT TIERS
                          </span>
                          <h3 className="font-display text-sm text-white font-bold uppercase tracking-wider">
                            EXCLUSIVE CLOUD ACCESS TIER
                          </h3>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-[9px] text-[#A0AEC0] uppercase block">ACCESS RATE</span>
                          <span className="font-mono text-xs text-white font-black block mt-0.5">
                            $150 USD / MONTH
                          </span>
                        </div>
                      </div>

                      <p className="font-sans text-[11px] text-[#A0AEC0] mt-4 uppercase leading-relaxed">
                        Subscription validates credentials instantly across our Firestore backend nodes on Google Cloud. Grants 100% unrestricted priority access.
                      </p>

                      <button
                        onClick={handleInitializeSubscription}
                        className="w-full mt-6 py-3.5 bg-gradient-to-r from-[#1C64F2] via-[#10B981] to-[#00F0FF] font-display text-xs text-[#040714] font-black tracking-[0.15em] rounded transition-all duration-500 cursor-pointer animate-pulse-slow uppercase hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] block hover:scale-[1.01]"
                        id="btn-initialize-subscription"
                      >
                        Get Instant Access
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          ) : (
            // =============== STEP 2-3 FUNNEL PAYMENTS AND ACTIVATION MODAL SCREEN ===============
            <motion.div
              key="checkout-gateways"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-xl mx-auto my-12 bg-[#080B1C] border border-[#1C64F2]/30 rounded-lg p-8 relative shadow-[0_0_40px_rgba(28,100,242,0.15)]"
            >
              {/* Foreground Grid Mesh Layer */}
              <div className="absolute inset-0 digital-grid opacity-35 pointer-events-none" />

              {/* ACTION ENDPOINT redirect spinner state */}
              {checkoutState === "redirecting" && (
                <div className="text-center py-10 relative z-10 flex flex-col items-center justify-center">
                  <RefreshCw className="w-10 h-10 text-[#00F0FF] animate-spin mb-4" />
                  <h4 className="font-display text-sm text-white font-black tracking-widest uppercase">
                    ESTABLISHING PAYMENT HANDSHAKE TUNNEL
                  </h4>
                  <p className="font-mono text-[10px] text-[#A0AEC0] uppercase mt-2">
                    RE-ROUTING SECURE REQUEST TO THE CHECKOUT GATEWAY GATE...
                  </p>
                </div>
              )}

              {/* SELAR checkout gateway mockup state */}
              {checkoutState === "simulating_checkout" && (
                <div className="relative z-10 text-center py-4 flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#1D4ED8]/10 border border-blue-500 rounded-full flex items-center justify-center text-[#1C64F2] mb-4">
                    <Database className="w-5 h-5 animate-pulse text-[#00F0FF]" />
                  </div>
                  <h4 className="font-display text-[#00F0FF] text-xs tracking-[0.2em] font-black uppercase">
                    SELAR CHECKOUT SIMULATION GATEWAY
                  </h4>
                  <p className="font-sans text-sm text-white font-bold uppercase mt-2 tracking-wide">
                    SECURED INCOMING PAYMENT CHANNEL FOR {appNode.title.toUpperCase()}
                  </p>

                  <div className="my-6 p-4 rounded bg-[#040714] border border-[#1C64F2]/15 max-w-sm w-full text-left font-mono text-xs text-[#A0AEC0] flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span>Gateway Vendor ID:</span>
                      <span className="text-white font-bold uppercase">7234X_SELAR</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Billed Amount Price:</span>
                      <span className="text-[#00F0FF] font-black">$150.00 USD</span>
                    </div>
                    <div className="flex justify-between border-t border-[#1C64F2]/10 pt-2 text-[10px]">
                      <span>Dynamic Security token:</span>
                      <span className="truncate max-w-[120px] text-white">sha256_0x3F2AE16B7</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-[#A0AEC0] uppercase max-w-sm leading-relaxed mb-6">
                    This simulation mirrors our official Selar secure payment gateway. Simply authorize below to simulate a successful mock credit dispatch.
                  </p>

                  <div className="flex gap-4 w-full">
                    <button
                      onClick={() => setCheckoutState("idle")}
                      className="flex-1 py-3 border border-[#1C64F2]/30 text-white rounded font-display text-[10px] tracking-widest uppercase transition-all cursor-pointer hover:bg-white/5 active:bg-white/10"
                    >
                      ABORT TRANS
                    </button>
                    <button
                      onClick={handleSimulateSuccessfulPayment}
                      className="flex-grow flex-1 py-3 bg-gradient-to-r from-[#1C64F2] to-[#00F0FF] text-[#040714] font-display text-[10px] font-black tracking-widest uppercase rounded cursor-pointer transition-all hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] block"
                    >
                      CONFIRM PAYMENT
                    </button>
                  </div>
                </div>
              )}

              {/* Identity Activation account form state */}
              {checkoutState === "activation_form" && (
                <div className="relative z-10">
                  <h4 className="font-display text-sm text-white font-black tracking-widest uppercase text-center mb-1">
                    ACCOUNT ACTIVATION PORTAL
                  </h4>
                  <p className="font-mono text-[9px] text-[#00F0FF] tracking-wider text-center block mb-6 uppercase">
                    STEP 2 OF 3 : ENTER SUBSCRIBER KEY METRICS
                  </p>

                  <form onSubmit={handleSaveActivationCredentials} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] text-[#A0AEC0] uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#00F0FF]" />
                        <span>Subscriber Email Address (REQUIRED) *</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. user@domain.com"
                        value={activationEmail}
                        onChange={(e) => setActivationEmail(e.target.value)}
                        className="bg-[#040714] border border-[#1C64F2]/30 focus:border-[#00F0FF] outline-none text-white text-xs px-3 py-2.5 rounded font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] text-[#A0AEC0] uppercase tracking-wider flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-purple-400" />
                        <span>{getOptionalLabel()}</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. unique-identifier-token"
                        value={activationIdentifier}
                        onChange={(e) => setActivationIdentifier(e.target.value)}
                        className="bg-[#040714] border border-[#1C64F2]/30 focus:border-[#00F0FF] outline-none text-white text-xs px-3 py-2.5 rounded font-sans"
                      />
                    </div>

                    <div className="flex items-center gap-2.5 bg-[#040714] border border-[#1C64F2]/10 p-3 rounded text-[9.5px] uppercase font-mono text-[#A0AEC0] leading-snug">
                      <CheckCircle className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                      <span>Upon activation, the credentials will be securely bounded and persistent inside the database schema registers.</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-400 text-[#040714] font-display font-black text-xs tracking-[0.2em] uppercase rounded cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] block"
                      id="btn-register-activation"
                    >
                      ACTIVATE LICENSE SYSTEM
                    </button>
                  </form>
                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
