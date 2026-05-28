/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  AppNode, 
  UserSubscription 
} from "../types";
import { 
  ArrowLeft, 
  Sparkles, 
  Cpu, 
  Download, 
  Play, 
  RefreshCw, 
  CheckCircle, 
  ShieldCheck, 
  Flame, 
  Sliders, 
  Activity, 
  Coins, 
  Tv, 
  Database,
  Mail,
  Lock,
  ExternalLink
} from "lucide-react";

interface DeepDiveViewProps {
  appNode: AppNode;
  onBack: () => void;
}

export default function DeepDiveView({ appNode, onBack }: DeepDiveViewProps) {
  // Account Activation & Checkout simulation states
  const [checkoutState, setCheckoutState] = useState<"idle" | "redirecting" | "simulating_checkout" | "activation_form" | "active_success">("idle");
  const [activationEmail, setActivationEmail] = useState("");
  const [activationMt5, setActivationMt5] = useState("");
  const [activationTeam, setActivationTeam] = useState("");
  const [savedUser, setSavedUser] = useState<UserSubscription | null>(null);

  // Load from local storage on load
  useEffect(() => {
    const key = `donmay_sub_${appNode.id}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setSavedUser(JSON.parse(stored));
        setCheckoutState("active_success");
      } catch (e) {
        // ignore
      }
    }
  }, [appNode.id]);

  // General Simulators State
  // 1. Forex Tick Ticker
  const [forexTicks, setForexTicks] = useState<{ pair: string; bid: number; ask: number; dir: "up" | "down" }[]>([
    { pair: "EURUSD", bid: 1.08542, ask: 1.08553, dir: "up" },
    { pair: "GBPUSD", bid: 1.27218, ask: 1.27231, dir: "down" },
    { pair: "USDJPY", bid: 156.425, ask: 156.438, dir: "up" },
    { pair: "AUDUSD", bid: 0.66245, ask: 0.66258, dir: "up" },
    { pair: "BTCUSD", bid: 68420.50, ask: 68422.30, dir: "down" }
  ]);
  const [eaLogs, setEaLogs] = useState<string[]>([
    "[SYSTEM] EA Forex Core initialized successfully on MT5 Terminal.",
    "[STATUS] Port mapping tunnel online."
  ]);

  // 2. Football Predictor State
  const [footballMatch, setFootballMatch] = useState({ home: "Chelsea", away: "Real Madrid" });
  const [strengths, setStrengths] = useState({ home: 82, away: 85 });
  const [predictorResult, setPredictorResult] = useState<{
    homeWin: number;
    draw: number;
    awayWin: number;
    over25: number;
    under25: number;
    ticketValue: string;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [betSlip, setBetSlip] = useState<{ match: string; pick: string; odd: number }[]>([]);
  const [betStake, setBetStake] = useState("100");

  // 3. Audio Synthesizer State
  const [synthFeedback, setSynthFeedback] = useState("Oscillator idle. Click a wave form below to play Synthesizer.");
  const [activeSynthWave, setActiveSynthWave] = useState<"sine" | "sawtooth" | "triangle" | "square" | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // 4. Cryptographic Sentinel State
  const [securityLogs, setSecurityLogs] = useState<string[]>([]);
  const [activeKey, setActiveKey] = useState("6A4F98E9B1203FD3AC0145E9F88A23BC12D90E002");
  const [isShufflingKeys, setIsShufflingKeys] = useState(false);

  // 5. Bento CDN State
  const [cdnStatus, setCdnStatus] = useState<"idle" | "buffering" | "optimized">("idle");
  const [cdnSpeed, setCdnSpeed] = useState(420); // mbps
  const [activeChunkProgress, setActiveChunkProgress] = useState<number[]>([100, 100, 80, 45, 0, 0, 0, 0]);

  // --- FX Simulation Logs Trigger ---
  useEffect(() => {
    if (appNode.simulationType !== "forex") return;
    const interval = setInterval(() => {
      // Fluctuate rates
      setForexTicks(prev => prev.map(t => {
        const factor = t.pair.includes("JPY") ? 0.05 : t.pair.includes("BTC") ? 15.2 : 0.00018;
        const change = (Math.random() - 0.5) * factor;
        const newBid = parseFloat((t.bid + change).toFixed(t.pair.includes("JPY") ? 3 : t.pair.includes("BTC") ? 2 : 5));
        const newAsk = parseFloat((newBid + Math.random() * (factor / 2)).toFixed(t.pair.includes("JPY") ? 3 : t.pair.includes("BTC") ? 2 : 5));
        return {
          ...t,
          bid: newBid,
          ask: newAsk,
          dir: change > 0 ? "up" : "down"
        };
      }));

      // Append EA Log
      const events = [
        `[TICK] Market feed updated sync. Ticks captured: ${Math.floor(Math.random() * 8) + 1}`,
        `[DECISION] Calculating probability distribution vector on MT5...`,
        `[CSV EXPORT] Generated tick packet write line: ${new Date().toISOString().substring(11, 19)},EURUSD,${(1.08 + Math.random() * 0.01).toFixed(5)}`,
        `[INTELLIGENCE] Risk score checks calculated: 0.04% slippage threshold. Passed.`,
        `[ACCOUNT] Trading Capital protection guard verified active.`
      ];
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      setEaLogs(prev => [randomEvent, ...prev.slice(0, 15)]);
    }, 2500);

    return () => clearInterval(interval);
  }, [appNode.simulationType]);

  // --- Crypto Sentinel Log Trigger ---
  useEffect(() => {
    if (appNode.simulationType !== "security") return;
    const ips = ["185.42.103.44", "102.33.20.198", "45.112.5.122", "190.22.90.1", "88.243.14.9"];
    const actions = [
      "Access block handshake initiated",
      "Dynamic token credential validated successfully",
      "gRPC tunnel channel established",
      "Encrypted payload packet decryption completed securely",
      "Rate limits analyzed. Threat metrics zero-level status verified"
    ];

    const interval = setInterval(() => {
      const log = `[${new Date().toISOString().slice(11, 19)}] [PROXY] ${ips[Math.floor(Math.random() * ips.length)]} - ${actions[Math.floor(Math.random() * actions.length)]}`;
      setSecurityLogs(prev => [log, ...prev.slice(0, 10)]);
    }, 2000);

    return () => clearInterval(interval);
  }, [appNode.simulationType]);

  // --- CDN Stream Buffering Simulation ---
  useEffect(() => {
    if (appNode.simulationType !== "cloud" || cdnStatus !== "buffering") return;
    const interval = setInterval(() => {
      setActiveChunkProgress(prev => {
        const next = [...prev];
        const indexToUpdate = next.findIndex(val => val < 100);
        if (indexToUpdate !== -1) {
          next[indexToUpdate] = Math.min(next[indexToUpdate] + 20, 100);
          return next;
        } else {
          setCdnStatus("optimized");
          setCdnSpeed(1450); // Speed up dramatically after cached optimize
          return next;
        }
      });
    }, 800);

    return () => clearInterval(interval);
  }, [appNode.simulationType, cdnStatus]);

  // --- CSV Export Logic for Forex ---
  const handleDownloadCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Timestamp,Asset,BidValue,AskValue,VolumeTraded,ExecutionLatencyMs\n"
      + forexTicks.map(t => `${new Date().toISOString()},${t.pair},${t.bid},${t.ask},${(Math.random()*12+1).toFixed(2)},${(Math.random()*15+2).toFixed(2)}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `donmay_live_ticks_${appNode.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setEaLogs(prev => [`[CSV SYSTEM] User successfully extracted live ticks database file.`, ...prev]);
  };

  // --- Football Predictor Runner ---
  const handleRunFootballAnalysis = () => {
    setIsAnalyzing(true);
    setPredictorResult(null);
    setTimeout(() => {
      // Simple formula based on dynamic parameters
      const totalStrength = strengths.home + strengths.away;
      const homeWinProb = Math.round((strengths.home / totalStrength) * 100 + (Math.random() * 8 - 4));
      const drawProb = Math.round(20 + (Math.random() * 6 - 3));
      const awayWinProb = 100 - homeWinProb - drawProb;

      const overProb = Math.round(40 + (strengths.home * strengths.away) / 180 + (Math.random() * 10 - 5));
      const underProb = 100 - overProb;

      // Select recommended ticket option
      let ticketOption = "Home Win (1X)";
      if (homeWinProb < awayWinProb) ticketOption = "Away Win (2X)";
      if (overProb > 65) ticketOption = "Over 2.5 Goals (Multi-Combo)";

      setPredictorResult({
        homeWin: homeWinProb,
        draw: drawProb,
        awayWin: awayWinProb,
        over25: overProb,
        under25: underProb,
        ticketValue: ticketOption
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  // Football Accumulator Slip Adder
  const handleAddToBetSlip = (pick: string, odd: number) => {
    const item = {
      match: `${footballMatch.home} vs ${footballMatch.away}`,
      pick,
      odd
    };
    setBetSlip(prev => [...prev, item]);
  };

  // --- Web Audio Synthesizer Player ---
  const handlePlaySynthTone = (type: "sine" | "sawtooth" | "triangle" | "square") => {
    try {
      setActiveSynthWave(type);
      
      // Initialize AudioContext if not created
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Determine pitch base on waveforms
      const freqs = { sine: 349.23, sawtooth: 130.81, triangle: 261.63, square: 196.00 };
      const frequency = freqs[type];

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = type;
      osc.frequency.value = frequency;

      // Make a beautiful high tech envelopes
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.3);

      setSynthFeedback(`Synth Audio Active: Waveform: ${type.toUpperCase()} @ ${frequency} Hz synthesized via standard Web Audio pipelines successfully.`);
    } catch (err) {
      setSynthFeedback("Browser Audio Engine requires interaction. Click Node Synthesizers below to trigger dynamic audio loop.");
    }
  };

  // --- Shuffling credentials for sentinel security ---
  const handleShuffleCredentials = () => {
    setIsShufflingKeys(true);
    setTimeout(() => {
      const hexChars = "0123456789ABCDEF";
      let key = "";
      for (let i = 0; i < 40; i++) {
        key += hexChars[Math.floor(Math.random() * 16)];
      }
      setActiveKey(key);
      setSecurityLogs(prev => [
        `[${new Date().toISOString().slice(11, 19)}] [SENTINEL] Master authorization credential shuffled successfully. New SHA256 Signature registered.`,
        ...prev
      ]);
      setIsShufflingKeys(false);
    }, 1200);
  };

  // --- CDN Optimizer trigger ---
  const handleTriggerCdnBuffering = () => {
    setCdnStatus("buffering");
    setCdnSpeed(78);
    setActiveChunkProgress([100, 100, 0, 0, 0, 0, 0, 0]);
  };

  // --- Premium Subscription and simulated Selar Integration ---
  const handleInitializeSubscription = () => {
    setCheckoutState("redirecting");
    
    // Step 1: Simulate redirection to external checkout domain (Selar URL)
    setTimeout(() => {
      setCheckoutState("simulating_checkout");
    }, 1800);
  };

  const handleSimulateSuccessfulPayment = () => {
    // Stage 2: payment success, redirect back to application custom built-in account activation form
    setCheckoutState("activation_form");
  };

  const handleSaveActivationCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activationEmail) return;

    // Save to local state and localStorage for persistence
    const subscriptionRecord: UserSubscription = {
      email: activationEmail,
      mt5Id: appNode.simulationType === "forex" ? activationMt5 : undefined,
      teamName: appNode.simulationType === "football" ? activationTeam : undefined,
      appName: appNode.title,
      subscribedAt: new Date().toLocaleDateString(),
      status: "active"
    };

    localStorage.setItem(`donmay_sub_${appNode.id}`, JSON.stringify(subscriptionRecord));
    setSavedUser(subscriptionRecord);
    setCheckoutState("active_success");
  };

  const handleDeleteSubscription = () => {
    localStorage.removeItem(`donmay_sub_${appNode.id}`);
    setSavedUser(null);
    setCheckoutState("idle");
    setActivationEmail("");
    setActivationMt5("");
    setActivationTeam("");
  };

  return (
    <section className="min-h-screen py-24 px-6 md:px-12 bg-[#040714] relative z-10 select-none">
      <div className="absolute inset-0 digital-grid opacity-60 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        {/* Back navigation button */}
        <button
          onClick={onBack}
          className="group flex items-center gap-2 mb-10 px-4 py-2 font-display text-xs tracking-widest text-[#A0AEC0] hover:text-[#00F0FF] border border-[#1C64F2]/25 hover:border-[#00F0FF] rounded bg-[#080B1C]/60 backdrop-blur-sm transition-all cursor-pointer"
          id="btn-back-to-grid"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO APP CLUSTER</span>
        </button>

        {/* Header summary info for deep dive app */}
        <div className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-[#1C64F2]/20 pb-10">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 text-[#00F0FF] font-mono text-xs tracking-wider mb-3">
              <Cpu className="w-4 h-4 animate-spin-slow" />
              <span>{appNode.subtitle} // ACTIVE CLUSTER MODE</span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-widest uppercase">
              {appNode.title}
            </h2>
            <p className="font-sans text-[#A0AEC0] mt-6 text-sm md:text-base leading-relaxed max-w-3xl uppercase">
              {appNode.longDescription}
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 w-full">
            <div className="p-4 rounded border border-[#1C64F2]/20 bg-[#080B1C]/40 flex flex-col gap-1 w-full">
              <span className="font-mono text-[9px] text-[#A0AEC0] tracking-widest uppercase">CORE LICENSE STATUS</span>
              <span className="font-display text-xs text-white uppercase font-bold flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
                GLOBAL PRODUCTION READY
              </span>
            </div>
            <div className="p-4 rounded border border-[#1C64F2]/20 bg-[#080B1C]/40 flex flex-col gap-1 w-full">
              <span className="font-mono text-[9px] text-[#A0AEC0] tracking-widest uppercase">INTEGRATED PIPELINE</span>
              <span className="font-display text-xs text-[#00F0FF] uppercase font-bold mt-1">
                SECURED PORT TERMINAL
              </span>
            </div>
          </div>
        </div>

        {/* Core Double Column: Visual Hook Side vs Technical Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch" id="app-deep-dive-grid">
          
          {/* VISUAL HOOK SIDE (Interactive high-fidelity simulation controls) */}
          <div className="lg:col-span-7 flex flex-col" id="col-visual-hook">
            <div className="flex items-center justify-between px-6 py-4 rounded-t-lg border-t border-x border-[#1C64F2]/30 bg-[#080B1C]/90">
              <div className="flex items-center gap-2">
                <Activity className="w-4.5 h-4.5 text-[#00F0FF]" />
                <span className="font-display text-xs text-white font-bold tracking-widest uppercase">
                  SIMULATED HIGH-TECH RUNTIME GRAPH
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                <span className="font-mono text-[8.5px] text-[#A0AEC0] tracking-widest uppercase">
                  STREAMING REAL-TIME
                </span>
              </div>
            </div>

            {/* Canvas viewport for specialized simulators */}
            <div className="flex-1 min-h-[460px] rounded-b-lg border border-[#1C64F2]/30 bg-[#040714]/95 p-6 relative flex flex-col justify-between overflow-hidden">
              
              {/* Foreground Grid Mesh layer */}
              <div className="absolute inset-0 digital-grid opacity-35 pointer-events-none" />

              {/* 1. FOREX MARKET INTELLIGENCE SIMULATOR */}
              {appNode.simulationType === "forex" && (
                <div className="relative z-10 flex flex-col gap-6 h-full justify-between" id="simulator-forex">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {forexTicks.map((tick, idx) => (
                      <div 
                        key={idx} 
                        className="p-3 rounded border border-[#122A5E]/40 bg-[#080B1C]/85 flex flex-col justify-between transition-colors hover:border-[#1C64F2]/50"
                      >
                        <span className="font-mono text-[10px] text-[#A0AEC0]">{tick.pair}</span>
                        <div className="flex flex-col mt-2">
                          <span className={`font-mono text-xs font-bold ${tick.dir === "up" ? "text-emerald-400" : "text-rose-400"}`}>
                            {tick.bid.toFixed(tick.pair.includes("JPY") ? 3 : tick.pair.includes("BTC") ? 1 : 5)}
                          </span>
                          <span className="font-mono text-[9px] text-[#A0AEC0]/60 mt-0.5">
                            Ask: {tick.ask.toFixed(tick.pair.includes("JPY") ? 3 : tick.pair.includes("BTC") ? 1 : 5)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Terminal Log Console */}
                  <div className="flex-1 my-4 bg-black/85 rounded p-4 font-mono text-[10px] text-emerald-400 overflow-y-auto max-h-[220px] scrollbar-thin border border-[#1C64F2]/10">
                    <div className="flex items-center gap-2 text-[#00F0FF] border-b border-[#1C64F2]/20 pb-2 mb-2 font-bold uppercase tracking-wider">
                      <span>MT5 EXPERT ADVISOR LIVE CONSOLE LOGS</span>
                      <span className="animate-pulse">_</span>
                    </div>
                    {eaLogs.map((log, idx) => (
                      <div key={idx} className="mb-1 leading-normal">
                        <span className="text-[#A0AEC0] mr-2">[{new Date().toLocaleDateString()}]</span>
                        {log}
                      </div>
                    ))}
                  </div>

                  {/* Simulator action links */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1C64F2]/20 pt-4">
                    <span className="font-mono text-[9.5px] text-[#A0AEC0] tracking-wide uppercase">
                      CSV PACKETS RECOGNITION FLOW RATIO: 100% SECURE
                    </span>
                    <button
                      onClick={handleDownloadCsv}
                      className="px-4 py-2 bg-[#080B1C] border border-[#1C64F2] text-white hover:text-[#00F0FF] hover:border-[#00F0FF] rounded font-display text-[10px] tracking-widest uppercase cursor-pointer flex items-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                    >
                      <Download className="w-3.5 h-3.5 text-[#00F0FF]" />
                      <span>DOWNLOAD LIVE CSV REPORT</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 2. FOOTBALL ODDS PREDICTION SIMULATOR */}
              {appNode.simulationType === "football" && (
                <div className="relative z-10 flex flex-col justify-between h-full gap-5" id="simulator-football">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Controls */}
                    <div className="p-4 bg-[#080B1C]/80 rounded border border-[#1C64F2]/20 flex flex-col gap-4">
                      <span className="font-display text-[10px] tracking-widest text-[#00F0FF] uppercase border-b border-[#1C64F2]/15 pb-2">
                        POISSON MATRIX CONFIG
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 flex flex-col gap-1">
                          <label className="font-mono text-[9px] text-[#A0AEC0] uppercase">Home Team</label>
                          <input 
                            type="text" 
                            className="bg-[#040714] border border-[#1C64F2]/30 rounded text-xs px-2.5 py-1.5 font-sans uppercase font-bold text-white outline-none focus:border-[#00F0FF]"
                            value={footballMatch.home}
                            onChange={(e) => setFootballMatch(prev => ({ ...prev, home: e.target.value }))}
                          />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                          <label className="font-mono text-[9px] text-[#A0AEC0] uppercase">Away Team</label>
                          <input 
                            type="text" 
                            className="bg-[#040714] border border-[#1C64F2]/30 rounded text-xs px-2.5 py-1.5 font-sans uppercase font-bold text-white outline-none focus:border-[#00F0FF]"
                            value={footballMatch.away}
                            onChange={(e) => setFootballMatch(prev => ({ ...prev, away: e.target.value }))}
                          />
                        </div>
                      </div>

                      {/* Power sliders */}
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between font-mono text-[9px] text-[#A0AEC0]">
                            <span>HOME STRENGTH INDEX ({strengths.home})</span>
                          </div>
                          <input
                            type="range"
                            min="30"
                            max="100"
                            value={strengths.home}
                            onChange={(e) => setStrengths(prev => ({ ...prev, home: parseInt(e.target.value) }))}
                            className="accent-[#1C64F2] cursor-pointer"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between font-mono text-[9px] text-[#A0AEC0]">
                            <span>WAY STRENGTH INDEX ({strengths.away})</span>
                          </div>
                          <input
                            type="range"
                            min="30"
                            max="100"
                            value={strengths.away}
                            onChange={(e) => setStrengths(prev => ({ ...prev, away: parseInt(e.target.value) }))}
                            className="accent-[#00F0FF] cursor-pointer"
                          />
                        </div>
                      </div>

                      <button
                        onClick={handleRunFootballAnalysis}
                        disabled={isAnalyzing}
                        className="w-full py-2 bg-gradient-to-r from-[#1C64F2] to-[#00F0FF] disabled:from-slate-800 disabled:to-slate-700 font-display text-[11px] font-bold text-[#040714] tracking-widest uppercase rounded cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] mt-2 flex items-center justify-center gap-2"
                      >
                        {isAnalyzing ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>COMPUTING IN PROGRESS...</span>
                          </>
                        ) : (
                          <>
                            <Sliders className="w-3.5 h-3.5" />
                            <span>RUN PROBABILITY CORE</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Results Simulation Display */}
                    <div className="p-4 bg-[#080B1C]/80 rounded border border-[#1C64F2]/20 flex flex-col gap-3 justify-between">
                      <span className="font-display text-[10px] tracking-widest text-[#00F0FF] uppercase border-b border-[#1C64F2]/15 pb-2">
                        POISSON DISTRIBUTION OUTCOME
                      </span>

                      {!predictorResult && !isAnalyzing && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                          <Play className="w-8 h-8 text-[#1C64F2]/40 mb-2 animate-pulse" />
                          <p className="font-mono text-[10px] text-[#A0AEC0] uppercase">
                            Set team metrics left &amp; execute algorithm run.
                          </p>
                        </div>
                      )}

                      {isAnalyzing && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                          <RefreshCw className="w-8 h-8 text-[#00F0FF] mb-2 animate-spin" />
                          <p className="font-mono text-[10px] text-[#00F0FF] uppercase tracking-widest">
                            SIMULATING POISSON DENSITY MATRICES
                          </p>
                        </div>
                      )}

                      {predictorResult && !isAnalyzing && (
                        <div className="flex-grow flex flex-col gap-3">
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between font-mono text-[9px] text-[#A0AEC0] uppercase">
                              <span>{footballMatch.home} Win Prob</span>
                              <span>{predictorResult.homeWin}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-[#040714] rounded overflow-hidden">
                              <div className="h-full bg-[#1C64F2]" style={{ width: `${predictorResult.homeWin}%` }} />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between font-mono text-[9px] text-[#A0AEC0] uppercase">
                              <span>Draw Match Prob</span>
                              <span>{predictorResult.draw}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-[#040714] rounded overflow-hidden">
                              <div className="h-full bg-[#A0AEC0]" style={{ width: `${predictorResult.draw}%` }} />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between font-mono text-[9px] text-[#A0AEC0] uppercase">
                              <span>{footballMatch.away} Win Prob</span>
                              <span>{predictorResult.awayWin}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-[#040714] rounded overflow-hidden">
                              <div className="h-full bg-[#00F0FF]" style={{ width: `${predictorResult.awayWin}%` }} />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-[#1C64F2]/10">
                            <div className="bg-[#040714] p-2 rounded border border-[#1C64F2]/10 text-center cursor-pointer hover:border-[#1C64F2]" onClick={() => handleAddToBetSlip(`Over 2.5 Goals`, 1.82)}>
                              <p className="font-mono text-[8px] text-[#A0AEC0] uppercase">Over 2.5 Odd</p>
                              <p className="font-mono text-xs text-white font-bold mt-1">1.82 ({(predictorResult.over25)}%)</p>
                            </div>
                            <div className="bg-[#040714] p-2 rounded border border-[#1C64F2]/10 text-center cursor-pointer hover:border-[#00F0FF]" onClick={() => handleAddToBetSlip(`${footballMatch.home} ML`, 2.15)}>
                              <p className="font-mono text-[8px] text-[#A0AEC0] uppercase">Home Odd</p>
                              <p className="font-mono text-xs text-white font-bold mt-1">2.15 ({(predictorResult.homeWin)}%)</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Interactive Ticket Accumulator Slip */}
                  <div className="min-h-[140px] bg-black/60 rounded p-4 border border-[#1C64F2]/15 flex flex-col justify-between">
                    <div className="flex justify-between items-center border-b border-[#1C64F2]/15 pb-2 mb-2 font-mono text-[10px]">
                      <span className="font-bold text-[#00F0FF] uppercase">CUSTOM INTERACTIVE TICKET SLIP</span>
                      <span className="text-[#A0AEC0]">{betSlip.length} LEGS REGISTERED</span>
                    </div>

                    {betSlip.length === 0 ? (
                      <p className="font-mono text-[9.5px] text-[#A0AEC0]/60 text-center my-4 uppercase">
                        Click odds tags in recommendations to compile interactive ticket
                      </p>
                    ) : (
                      <div className="flex flex-col gap-2 max-h-[100px] overflow-y-auto pr-1">
                        {betSlip.map((item, id) => (
                          <div key={id} className="flex justify-between items-center font-mono text-[9.5px] bg-[#080B1C]/70 p-2 rounded border border-[#1C64F2]/10">
                            <span className="text-white uppercase truncate">{item.match} // {item.pick}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-[#00F0FF] font-bold">@{item.odd.toFixed(2)}</span>
                              <button 
                                onClick={() => setBetSlip(prev => prev.filter((_, idx) => idx !== id))}
                                className="text-red-400 hover:text-red-300 font-bold"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 pt-3 mt-3 border-t border-[#1C64F2]/15 items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9.5px] text-[#A0AEC0] uppercase">STAKE:</span>
                        <input
                          type="number"
                          value={betStake}
                          onChange={(e) => setBetStake(e.target.value)}
                          className="bg-[#040714] border border-[#1C64F2]/35 focus:border-[#00F0FF] outline-none text-white font-mono text-xs w-20 px-2 py-1 rounded"
                        />
                        <span className="font-mono text-[10px] text-white">USD</span>
                      </div>
                      <div className="font-display text-xs text-white uppercase text-right">
                        <span>EST. PAYOUT: </span>
                        <span className="text-[#00F0FF] font-bold">
                          ${(
                            parseFloat(betStake || "0") * 
                            (betSlip.reduce((acc, current) => acc * current.odd, 1))
                          ).toFixed(2)} USD
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. QUANTUM SOUND SYNTHESIS SIMULATOR */}
              {appNode.simulationType === "media" && (
                <div className="relative z-10 flex flex-col justify-between h-full gap-5 animate-fadeIn" id="simulator-sound">
                  <div className="p-4 rounded border border-[#1C64F2]/15 bg-[#080B1C]/60">
                    <p className="font-mono text-[11px] text-[#A0AEC0] mb-3 leading-relaxed uppercase">
                      This module interfaces directly with standard browser **Web Audio Synthesis API Engines** on your local machine to render pure auditory celebration cues. Click sound boards:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                      {[
                        { label: "Soft Ambient Wave", type: "sine" as const, color: "text-[#00F0FF] hover:bg-[#00F0FF]/10 hover:border-[#00F0FF]" },
                        { label: "Deep Saw Synth", type: "sawtooth" as const, color: "text-amber-400 hover:bg-amber-400/10 hover:border-amber-400" },
                        { label: "Retro Square Wave", type: "square" as const, color: "text-emerald-400 hover:bg-emerald-400/10 hover:border-emerald-400" },
                        { label: "Purity Triangle", type: "triangle" as const, color: "text-indigo-400 hover:bg-indigo-400/10 hover:border-indigo-400" }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handlePlaySynthTone(item.type)}
                          className={`p-3 rounded border border-[#1C64F2]/25 bg-[#040714] text-center font-display text-[10px] tracking-wider uppercase font-bold transition-all cursor-pointer ${item.color} ${activeSynthWave === item.type ? "border-solid bg-white/5 shadow-[0_0_12px_rgba(28,100,242,0.3)]" : ""}`}
                        >
                          <Play className="w-3.5 h-3.5 mx-auto mb-2" />
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Waveform graphic visualization */}
                  <div className="flex-1 min-h-[120px] bg-black/60 rounded border border-[#1C64F2]/15 flex items-center justify-center p-4">
                    {activeSynthWave ? (
                      <div className="w-full flex flex-col items-center text-center">
                        <div className="flex items-end justify-center w-full gap-1 h-14 mb-2">
                          {[...Array(40)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                height: activeSynthWave === "sine" 
                                  ? [12, 38, 12] 
                                  : activeSynthWave === "sawtooth" 
                                  ? [4, 46, 4] 
                                  : activeSynthWave === "square" 
                                  ? [46, 46, 4, 4] 
                                  : [4, 40, 4] 
                              }}
                              transition={{ 
                                repeat: Infinity, 
                                duration: 0.8 + (i % 4) * 0.1, 
                                ease: "easeInOut" 
                              }}
                              className={`w-1 rounded-t ${
                                activeSynthWave === "sine"
                                  ? "bg-[#00F0FF]"
                                  : activeSynthWave === "sawtooth"
                                  ? "bg-amber-400"
                                  : activeSynthWave === "square"
                                  ? "bg-emerald-400"
                                  : "bg-indigo-400"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-mono text-[9px] text-[#A0AEC0] uppercase tracking-wider">
                          GENERATING REALTIME SYNTH CODES
                        </span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Activity className="w-8 h-8 text-[#1C64F2]/30 mx-auto mb-2 animate-pulse" />
                        <span className="font-mono text-[9.5px] text-[#A0AEC0]/40 uppercase">
                          No audio sequence loaded. Click custom wave pads above to trigger synthesized sounds.
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-[#1C64F2]/15 pt-3 font-mono text-[9.5px] text-[#00F0FF] uppercase italic">
                    {synthFeedback}
                  </div>
                </div>
              )}

              {/* 4. CRYPTOGRAPHIC SENTINEL SIMULATOR */}
              {appNode.simulationType === "security" && (
                <div className="relative z-10 flex flex-col justify-between h-full gap-5" id="simulator-crypto">
                  <div className="p-4 bg-[#080B1C]/80 rounded border border-[#1C64F2]/20">
                    <span className="font-mono text-[10px] text-[#A0AEC0] uppercase tracking-wider block mb-3">
                      CURRENT ENCRYPTED GATEWAY SIGNATURE (AES-256-GCM)
                    </span>
                    <div className="flex flex-col sm:flex-row items-center gap-4 bg-black/50 p-4 rounded border border-[#1C64F2]/10">
                      <div className="flex-1 font-mono text-xs text-white break-all uppercase tracking-widest bg-black px-3 py-2 rounded border border-[#1C64F2]/5">
                        {activeKey}
                      </div>
                      <button
                        onClick={handleShuffleCredentials}
                        disabled={isShufflingKeys}
                        className="px-5 py-2.5 bg-[#080B1C] border border-[#00F0FF] text-white hover:text-[#00F0FF] hover:border-[#00F0FF] rounded font-display text-[10px] font-bold tracking-widest uppercase cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isShufflingKeys ? "animate-spin" : ""}`} />
                        <span>SHUFFLE INTERACTIVE KEY</span>
                      </button>
                    </div>
                  </div>

                  {/* Scrolling firewall logs */}
                  <div className="flex- grow bg-[#040714] border border-[#1C64F2]/15 rounded p-4 font-mono text-[9.5px] text-orange-400 h-[170px] overflow-y-auto">
                    <div className="flex justify-between border-b border-[#1C64F2]/15 pb-2 mb-2 font-bold text-[#00F0FF] uppercase tracking-wider">
                      <span>SECURE DECENTRALIZED PACKET HANDSHAKE STREAM</span>
                      <span>ACTIVE GATE</span>
                    </div>
                    {securityLogs.length === 0 ? (
                      <div className="text-[#A0AEC0]/40 text-center my-10 uppercase">
                        Monitoring dynamic tunnel endpoints...
                      </div>
                    ) : (
                      securityLogs.map((log, idx) => (
                        <div key={idx} className="mb-1">
                          {log}
                        </div>
                      ))
                    )}
                  </div>

                  <div className="border-t border-[#1C64F2]/10 pt-2 font-mono text-[9px] text-[#A0AEC0] uppercase tracking-wider">
                    TUNNEL ENCRYPTION PIPELINE GUARANTEES 100% EXPLOIT IMMUNITY
                  </div>
                </div>
              )}

              {/* 5. BENTO CDN ENGINE SIMULATOR */}
              {appNode.simulationType === "cloud" && (
                <div className="relative z-10 flex flex-col justify-between h-full gap-5" id="simulator-cdn">
                  <div className="p-4 bg-[#080B1C]/80 rounded border border-[#1C64F2]/20 flex flex-col gap-4">
                    <div className="flex justify-between items-center bg-black/40 p-3 rounded border border-[#1C64F2]/10">
                      <div className="flex flex-col">
                        <span className="font-mono text-[9px] text-[#A0AEC0] uppercase">PEER TUNNES HANDSHAKE STATUS</span>
                        <span className="font-display text-xs text-white font-bold tracking-widest mt-0.5 uppercase">
                          {cdnStatus === "idle" ? "IDLE SYSTEM" : cdnStatus === "buffering" ? "UP-BUFFERING PACKETS" : "OPTIMIZED CACHE NODES"}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-[9px] text-[#A0AEC0] uppercase">CDN THROUGHPUT</span>
                        <span className="font-mono text-xs text-[#00F0FF] font-bold block mt-0.5">
                          {cdnSpeed} MBPS
                        </span>
                      </div>
                    </div>

                    {/* Performance bars */}
                    <div className="grid grid-cols-8 gap-2">
                      {activeChunkProgress.map((val, idx) => (
                        <div key={idx} className="bg-black/60 p-2.5 rounded border border-[#1C64F2]/10 flex flex-col items-center gap-2">
                          <span className="font-mono text-[7px] text-[#A0AEC0]">NODE_0{idx}</span>
                          <div className="w-1.5 h-16 bg-[#040714] rounded-full overflow-hidden flex flex-col justify-end">
                            <div 
                              className={`w-full rounded-full transition-all duration-300 ${val === 100 ? "bg-emerald-400" : "bg-cyan-400 animate-pulse"}`} 
                              style={{ height: `${val}%` }} 
                            />
                          </div>
                          <span className="font-mono text-[7px] text-white font-bold">{val}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#1C64F2]/15 pt-4 mt-2">
                    <span className="font-mono text-[9px] text-[#A0AEC0] uppercase tracking-wide">
                      MULTIPATH CHUNKING MODEL OPTIMIZES LATENCY DECAY BY 94%.
                    </span>
                    <button
                      onClick={handleTriggerCdnBuffering}
                      className="px-4 py-2 bg-[#080B1C] border border-[#1C64F2] text-white hover:text-[#00F0FF] hover:border-[#00F0FF] rounded font-display text-[10px] tracking-widest uppercase cursor-pointer flex items-center gap-2 transition-all"
                    >
                      <span>TEST BUFFER SPEED</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* TECHNICAL DETAILS SIDE (Glass-morphic parameters / Stack specs) */}
          <div className="lg:col-span-5 flex flex-col gap-6" id="col-technical-details">
            
            {/* Tech Stack card */}
            <div className="p-6 rounded-lg border border-[#1C64F2]/20 bg-[#080B1C]/65 backdrop-blur-sm relative overflow-hidden radar-sweep">
              <span className="font-mono text-[10px] text-[#00F0FF] tracking-widest uppercase block mb-4">
                ENGINEERED FRAMEWORK SPECIFICATIONS
              </span>
              <h3 className="font-display text-sm text-white font-bold tracking-wider mb-6 border-b border-[#1C64F2]/10 pb-3 uppercase">
                ENGINE SYSTEM COMPILER STACK
              </h3>
              <div className="grid grid-cols-2 gap-3" id="tech-stack-items">
                {appNode.architectureStack.map((tech, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 bg-[#040714]/65 border border-[#1C64F2]/10 rounded flex items-center gap-2.5 hover:border-[#00F0FF]/30 transition-colors"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shrink-0" />
                    <span className="font-mono text-xs text-[#A0AEC0] tracking-wide whitespace-nowrap">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Capabilities card */}
            <div className="p-6 rounded-lg border border-[#1C64F2]/20 bg-[#080B1C]/65 backdrop-blur-sm">
              <span className="font-mono text-[10px] text-[#00F0FF] tracking-widest uppercase block mb-4">
                PLATFORM CAPABILITIES OVERVIEW
              </span>
              <h3 className="font-display text-sm text-white font-bold tracking-wider mb-6 border-b border-[#1C64F2]/10 pb-3 uppercase">
                HIGH THRU-PUT VECTOR PARAMETERS
              </h3>
              <div className="flex flex-col gap-4" id="capability-items">
                {appNode.capabilities.map((cap, idx) => (
                  <div key={idx} className="flex gap-3 text-start">
                    <CheckCircle className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="font-sans text-xs text-white font-bold uppercase tracking-wide">
                        CAPABILITY_NODE_0{idx + 1}
                      </span>
                      <p className="font-sans text-xs text-[#A0AEC0] mt-1 uppercase leading-relaxed">
                        {cap}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Component D's Bottom: THE PREMIUM SUBSCRIPTION TAB & ACCOUNT ACTIVATION FORM */}
        <div className="mt-14 border-t border-[#1C64F2]/20 pt-14" id="subscription-anchor">
          <div className="max-w-3xl mx-auto">
            
            {/* Standalone card with pulsing border */}
            <div className="p-8 rounded-lg border-2 border-dashed border-[#1C64F2] hover:border-[#00F0FF] bg-[#080B1C]/80 relative overflow-hidden panel-glow group shadow-[0_0_30px_rgba(28,100,242,0.1)] transition-all">
              
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-[#00F0FF] tracking-widest border-b border-l border-[#1C64F2]/20 bg-black/40 rounded-bl">
                MODULE ENTIRETY VALUE
              </div>

              {/* State A: Idle (Prompting Subscription) */}
              {checkoutState === "idle" && (
                <div className="text-center py-6 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border border-[#00F0FF] flex items-center justify-center bg-[#040714] mb-4 text-[#00F0FF]">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <h3 className="font-display text-lg md:text-xl text-white font-bold tracking-widest uppercase">
                    Initialize Premium Subscription Node
                  </h3>
                  <p className="font-sans text-xs text-[#A0AEC0] mt-3 uppercase max-w-lg mx-auto leading-relaxed">
                    Unlock exclusive global commercial rights, sub-millisecond API endpoints, custom CSV log exports, and direct priority compiler pipelines on our secure hosts.
                  </p>
                  
                  {/* Glowing Activation Button */}
                  <div className="mt-8 relative">
                    <div className="absolute -inset-1 rounded bg-gradient-to-r from-[#1C64F2] to-[#00F0FF] blur opacity-65 animate-pulse group-hover:opacity-100 transition-opacity" />
                    <button
                      onClick={handleInitializeSubscription}
                      className="relative px-8 py-4 bg-[#040714] border border-[#00F0FF] hover:border-white font-display text-xs font-bold tracking-widest text-[#00F0FF] hover:text-white rounded transition-all uppercase cursor-pointer"
                      id="btn-init-sub"
                    >
                      INITIALIZE SUBSCRIPTION
                    </button>
                  </div>
                </div>
              )}

              {/* State B: Redirecting to External Gateway */}
              {checkoutState === "redirecting" && (
                <div className="text-center py-8">
                  <RefreshCw className="w-10 h-10 text-[#00F0FF] animate-spin mx-auto mb-4" />
                  <h3 className="font-display text-xs text-white font-bold tracking-widest uppercase mb-2">
                    REDIRECTING TO SECURE EXTERNAL PAYMENT HANDLER (SELAR CHECKOUT)
                  </h3>
                  <p className="font-mono text-[10px] text-[#A0AEC0] uppercase max-w-sm mx-auto">
                    Loading encrypted Selar merchant gateway configuration. Do not reload or shut the current viewport.
                  </p>
                </div>
              )}

              {/* State C: Simulated Checkout Form (High-Fidelity Merchant Mock) */}
              {checkoutState === "simulating_checkout" && (
                <div className="rounded border border-[#1C64F2]/30 bg-[#040714] p-6 max-w-md mx-auto relative">
                  <div className="flex justify-between items-center border-b border-[#1C64F2]/25 pb-3 mb-4 font-mono text-[10px] text-[#A0AEC0]">
                    <span className="font-bold text-[#00F0FF] uppercase">SELAR SECURE MERCHANT</span>
                    <span>GATEWAY SECURED</span>
                  </div>

                  <h3 className="font-display text-xs text-white font-bold tracking-widest uppercase mb-2">
                    PROPRIETARY CHEKOUT ORDER DE109
                  </h3>
                  
                  <div className="flex justify-between items-center bg-[#080B1C]/90 p-3 rounded border border-[#1C64F2]/10 my-4">
                    <span className="font-mono text-[10px] text-white uppercase">{appNode.title} Premium license</span>
                    <span className="font-mono text-xs text-[#00F0FF] font-black">$450.00 USD</span>
                  </div>

                  <p className="font-sans text-[11px] text-[#A0AEC0] mb-6 leading-relaxed uppercase">
                    This is an interactive simulation of the outbound Selar checkout response. Confirm successful testing receipt below.
                  </p>

                  <button
                    onClick={handleSimulateSuccessfulPayment}
                    className="w-full py-3 bg-[#10B981] text-[#040714] hover:bg-emerald-300 font-display text-[11px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors"
                  >
                    SIMULATE SECULAR SUCCESSFUL CHECKOUT
                  </button>
                </div>
              )}

              {/* State D: Built-in Account Activation Form (Requested Details) */}
              {checkoutState === "activation_form" && (
                <div className="max-w-md mx-auto">
                  <div className="text-center mb-6">
                    <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                    <h3 className="font-display text-sm text-white font-bold tracking-widest uppercase">
                      PAYMENT CONFIRMED // SYSTEM ACTIVATION SHEET
                    </h3>
                    <p className="font-mono text-[9px] text-[#A0AEC0] uppercase mt-1">
                      Provide activation parameters below to compile authentication key.
                    </p>
                  </div>

                  <form onSubmit={handleSaveActivationCredentials} className="flex flex-col gap-4">
                    {/* Unique Email address (All modules) */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[9px] text-[#A0AEC0] uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-[#00F0FF]" />
                        <span>Registered Email Address *</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ENTER REGISTERED EMAIL"
                        value={activationEmail}
                        onChange={(e) => setActivationEmail(e.target.value)}
                        className="bg-[#040714] border border-[#1C64F2]/30 focus:border-[#00F0FF] rounded px-3 py-2 font-mono text-xs text-white outline-none w-full"
                      />
                    </div>

                    {/* MT5 Code (Forex) */}
                    {appNode.simulationType === "forex" && (
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[9px] text-[#A0AEC0] uppercase tracking-wider flex items-center gap-1.5">
                          <Lock className="w-3 h-3 text-[#00F0FF]" />
                          <span>MT5 Trading ID *</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="ENTER MT5 TRADING ID"
                          value={activationMt5}
                          onChange={(e) => setActivationMt5(e.target.value)}
                          className="bg-[#040714] border border-[#1C64F2]/30 focus:border-[#00F0FF] rounded px-3 py-2 font-mono text-xs text-white outline-none w-full"
                        />
                      </div>
                    )}

                    {/* Team Identifier (Football) */}
                    {appNode.simulationType === "football" && (
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[9px] text-[#A0AEC0] uppercase tracking-wider flex items-center gap-1.5">
                          <Lock className="w-3 h-3 text-[#00F0FF]" />
                          <span>Predictive Core Identification *</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="ASSIGN UNIQUE TEAM OR TICKET ID"
                          value={activationTeam}
                          onChange={(e) => setActivationTeam(e.target.value)}
                          className="bg-[#040714] border border-[#1C64F2]/30 focus:border-[#00F0FF] rounded px-3 py-2 font-mono text-xs text-white outline-none w-full"
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-[#1C64F2] to-[#00F0FF] hover:opacity-90 font-display text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer transition-opacity mt-2 text-white"
                      id="btn-save-sub"
                    >
                      COMPILE ACTIVE SYSTEM HANDSHAKE
                    </button>
                  </form>
                </div>
              )}

              {/* State E: Activation Success Display */}
              {checkoutState === "active_success" && savedUser && (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full border border-emerald-400 bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 text-emerald-400">
                    <CheckCircle className="w-6 h-6 animate-pulse" />
                  </div>
                  <h3 className="font-display text-base text-white font-bold tracking-widest uppercase">
                    Premium subscription validated &amp; active
                  </h3>
                  <p className="font-mono text-[10px] text-emerald-400 tracking-wide mt-2 uppercase">
                    LICENSE STATUS: VERIFIED AUTHENTICATED
                  </p>

                  <div className="mt-6 bg-[#040714] p-4 rounded border border-emerald-400/20 max-w-md mx-auto text-left font-mono text-xs">
                    <div className="flex justify-between border-b border-[#1C64F2]/10 pb-2 mb-2 text-[#A0AEC0] text-[9.5px]">
                      <span>PARAMETER KEY</span>
                      <span>SECURE RECORD</span>
                    </div>
                    <div className="flex justify-between py-1 text-white uppercase">
                      <span>Assigned APP:</span>
                      <span className="font-bold text-[#00F0FF]">{savedUser.appName}</span>
                    </div>
                    <div className="flex justify-between py-1 text-white">
                      <span>Registered User:</span>
                      <span className="font-bold">{savedUser.email}</span>
                    </div>
                    {savedUser.mt5Id && (
                      <div className="flex justify-between py-1 text-white">
                        <span>MT5 Trading ID:</span>
                        <span className="font-bold text-yellow-400">{savedUser.mt5Id}</span>
                      </div>
                    )}
                    {savedUser.teamName && (
                      <div className="flex justify-between py-1 text-white uppercase">
                        <span>Team/Ticket ID:</span>
                        <span className="font-bold text-yellow-400">{savedUser.teamName}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-1 text-white uppercase">
                      <span>Activation Date:</span>
                      <span>{savedUser.subscribedAt}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleDeleteSubscription}
                    className="mt-6 px-4 py-2 bg-rose-500/10 border border-rose-500/30 hover:border-rose-500 hover:text-white rounded font-mono text-[9px] tracking-wider text-rose-400 uppercase transition-colors cursor-pointer"
                  >
                    WIPE LICENSE CACHE (HARD RESET)
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
