/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import DonmayLogo from "./DonmayLogo";

interface LaunchAnimationProps {
  onComplete: () => void;
  key?: string;
}

export default function LaunchAnimation({ onComplete }: LaunchAnimationProps) {
  const [stage, setStage] = useState<"click_to_start" | "approaching" | "rippling" | "logo_reveal" | "terminal" | "complete">("click_to_start");
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [printedLines, setPrintedLines] = useState<string[]>([]);
  const [activeLineText, setActiveLineText] = useState("");
  const [terminalSequenceComplete, setTerminalSequenceComplete] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<{ text: string; isCommandResult?: boolean }[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const fullTextLines = [
    "Initiating Onboarding Sequence... [OK]",
    "Establishing Secure Connection to Donmay Media & Tech Gateway... [CONNECTED]",
    "Authentication Token Validated.",
    "DONMAY_MEDIA_OS_LOADER [0.0.1]",
    "",
    "Welcome, USER_0182.",
    "Your journey into High-Scale Media Engineering begins here.",
    "To continue, type 'REGISTER' or explore our 'SERVICES'."
  ];

  // Retro computer sound synthesizer (Optimized single instance to prevent browser block)
  const playBeep = (freq = 800, duration = 0.04, type: OscillatorType = "sine", volume = 0.05) => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (err) {
      // Audio autoplay restrictions caught gracefully
    }
  };

  const handleStartSequence = () => {
    // Unlocks browser audio context and plays start sound
    playBeep(220, 0.15, "sawtooth", 0.03);
    setTimeout(() => playBeep(440, 0.2, "triangle", 0.04), 100);
    setTimeout(() => playBeep(880, 0.4, "sine", 0.05), 200);

    setStage("approaching");

    const t1 = setTimeout(() => {
      setStage("rippling");
    }, 2200);

    const t2 = setTimeout(() => {
      setStage("logo_reveal");
    }, 3400);

    const t3 = setTimeout(() => {
      setStage("terminal");
    }, 5600);

    timersRef.current.push(t1, t2, t3);
  };

  useEffect(() => {
    return () => {
      // Clean up all timers when component unmounts
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  // Handle Load Progress counting up
  useEffect(() => {
    if (stage !== "terminal" || loaderFinished) return;

    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Play central double chime alert
          playBeep(880, 0.08, "sine", 0.04);
          setTimeout(() => {
            playBeep(1320, 0.12, "sine", 0.04);
          }, 80);
          setTimeout(() => {
            setLoaderFinished(true);
          }, 250);
          return 100;
        }
        const next = prev + 4; // Fast loading increment
        // Pitch climbing sound effect (adjusted for faster loader)
        if (next % 8 === 0) {
          playBeep(300 + next * 6.5, 0.012, "triangle", 0.02);
        }
        return next > 100 ? 100 : next;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [stage, loaderFinished]);

  // Handle Typewriter sequentials
  useEffect(() => {
    if (!loaderFinished || stage !== "terminal" || terminalSequenceComplete) return;

    const targetLine = fullTextLines[currentLineIdx];
    
    // Empty separator lines
    if (targetLine === "") {
      const timer = setTimeout(() => {
        setPrintedLines((prev) => [...prev, ""]);
        setCurrentLineIdx((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      const step = 4; // print 4 characters at a time for high-speed feel
      if (currentCharIdx < targetLine.length) {
        const nextCharIdx = Math.min(currentCharIdx + step, targetLine.length);
        setActiveLineText(targetLine.substring(0, nextCharIdx));
        setCurrentCharIdx(nextCharIdx);
        // Realistic micro clicking sound
        playBeep(900 + Math.random() * 250, 0.01, "sine", 0.02);
      } else {
        // Complete current line, push to collection
        setPrintedLines((prev) => [...prev, targetLine]);
        setActiveLineText("");
        setCurrentCharIdx(0);
        
        if (currentLineIdx + 1 < fullTextLines.length) {
          setCurrentLineIdx((prev) => prev + 1);
        } else {
          setTerminalSequenceComplete(true);
          // End chime
          playBeep(1000, 0.08, "sine", 0.03);
        }
      }
    }, 6); // Very short timeout for fast performance

    return () => clearTimeout(timer);
  }, [loaderFinished, stage, currentLineIdx, currentCharIdx, terminalSequenceComplete]);

  // Scroll to bottom whenever history updates
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [printedLines, activeLineText, commandHistory, loaderFinished, stage]);

  // Set up redirect countdown when terminal is complete
  useEffect(() => {
    if (terminalSequenceComplete) {
      setRedirectCountdown(3); // Start a snappy 3-second countdown to auto-bypass
    }
  }, [terminalSequenceComplete]);

  // Handle countdown ticks
  useEffect(() => {
    if (!terminalSequenceComplete || redirectCountdown === null) return;
    if (redirectCountdown <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setRedirectCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [terminalSequenceComplete, redirectCountdown, onComplete]);

  // If user starts interacting, pause the countdown so they aren't forced out
  useEffect(() => {
    if (inputValue.trim() !== "" || commandHistory.length > 0) {
      setRedirectCountdown(null);
    }
  }, [inputValue, commandHistory]);

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleShortcutTrigger = (cmd: string) => {
    playBeep(600, 0.08, "sine", 0.04);
    if (cmd === "REGISTER") {
      sessionStorage.setItem("launch_redirect_path", "/contact");
      onComplete();
    } else if (cmd === "SERVICES") {
      sessionStorage.setItem("launch_redirect_path", "/services");
      onComplete();
    } else if (cmd === "BYPASS") {
      onComplete();
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const trimmedCmd = inputValue.trim();
    const cmdUpper = trimmedCmd.toUpperCase();

    const newHistory = [
      ...commandHistory,
      { text: `> ${trimmedCmd}`, isCommandResult: false }
    ];

    playBeep(700, 0.05, "sine", 0.03);

    if (cmdUpper === "REGISTER") {
      newHistory.push({ text: "> ACCESSING CREDENTIAL SECURITY REGISTRATION...", isCommandResult: true });
      setCommandHistory(newHistory);
      setInputValue("");
      playBeep(950, 0.15, "sine", 0.05);
      setTimeout(() => {
        sessionStorage.setItem("launch_redirect_path", "/contact");
        onComplete();
      }, 700);
    } else if (cmdUpper === "SERVICES") {
      newHistory.push({ text: "> LAUNCHING SERVICES SYSTEM LOGS...", isCommandResult: true });
      setCommandHistory(newHistory);
      setInputValue("");
      playBeep(950, 0.15, "sine", 0.05);
      setTimeout(() => {
        sessionStorage.setItem("launch_redirect_path", "/services");
        onComplete();
      }, 700);
    } else if (cmdUpper === "BYPASS" || cmdUpper === "ENTER" || cmdUpper === "EXIT" || cmdUpper === "HOME") {
      newHistory.push({ text: "> BYPASSING SECURITY LAYER... WELCOME TO DONMAY MAIN NET.", isCommandResult: true });
      setCommandHistory(newHistory);
      setInputValue("");
      playBeep(1200, 0.2, "sine", 0.04);
      setTimeout(() => {
        onComplete();
      }, 700);
    } else if (cmdUpper === "CLEAR") {
      setCommandHistory([]);
      setInputValue("");
    } else if (cmdUpper === "HELP") {
      newHistory.push(
        { text: "> VALID ACCESS DIRECTIVES:", isCommandResult: true },
        { text: "  - REGISTER : Launch secure client enrollment form", isCommandResult: true },
        { text: "  - SERVICES : Explore advanced services grid modules", isCommandResult: true },
        { text: "  - BYPASS   : Bypass terminal gate and load home network", isCommandResult: true },
        { text: "  - CLEAR    : Clear console output lines", isCommandResult: true }
      );
      setCommandHistory(newHistory);
      setInputValue("");
    } else {
      newHistory.push({ 
        text: `> Command not recognized: '${trimmedCmd}'. Type 'HELP' to show available protocols.`, 
        isCommandResult: true 
      });
      setCommandHistory(newHistory);
      setInputValue("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#040714] digital-grid select-none overflow-hidden">
      {/* Top indicator bar */}
      {stage !== "click_to_start" && (
        <div className="absolute top-6 left-8 right-8 flex items-center justify-between font-mono text-[10px] tracking-widest text-[#A0AEC0]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-ping" />
            <span>SYSTEM CORRELATION FEED</span>
          </div>
          <div>
            <span>INITIATIVE: DONMAY</span>
          </div>
        </div>
      )}

      {/* Skip Button */}
      {stage !== "click_to_start" && (
        <button
          onClick={onComplete}
          className="absolute bottom-10 px-4 py-2 font-display text-xs tracking-widest text-[#A0AEC0] border border-[#1C64F2]/30 hover:border-[#00F0FF] hover:text-[#FFFFFF] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] rounded bg-[#080B1C]/50 transition-all cursor-pointer z-50"
          id="btn-skip-intro"
        >
          SKIP INIT_SEQUENCE
        </button>
      )}

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1C64F2]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Animation Arena */}
      <div className="relative w-full max-w-4xl min-h-[400px] flex items-center justify-center">
        {/* Phase 0: Click to Start */}
        {stage === "click_to_start" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center px-4"
          >
            <div className="mb-8 relative flex items-center justify-center">
              <div className="absolute w-24 h-24 bg-[#00F0FF]/15 rounded-full blur-xl animate-pulse" />
              <DonmayLogo symbolSize={84} compact={true} />
            </div>

            <h2 className="font-display text-xl md:text-3xl font-extrabold tracking-[0.25em] text-white">
              DONMAY PORTAL ACCESS
            </h2>
            <p className="font-mono text-xs text-[#00F0FF]/80 tracking-widest mt-2 uppercase font-bold">
              SECURE MEDIA &amp; SYSTEM ENVIRONMENT
            </p>

            <button
              onClick={handleStartSequence}
              className="mt-10 px-8 py-4 font-mono text-xs tracking-[0.3em] font-bold text-white border border-[#00F0FF]/40 bg-gradient-to-r from-[#1C64F2]/20 to-[#00F0FF]/20 hover:from-[#1C64F2]/40 hover:to-[#00F0FF]/40 rounded cursor-pointer transition-all duration-300 relative group overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_30px_rgba(0,240,255,0.35)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                INITIALIZE SECURE SYSTEM
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/20 to-[#1C64F2]/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </button>

            <p className="font-sans text-[10px] text-[#A0AEC0] tracking-widest mt-6 uppercase leading-relaxed max-w-xs">
              Tap or click above to boot technical core diagnostics and activate high-fidelity audio telemetry sounds.
            </p>
          </motion.div>
        )}

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

        {/* Phase 4: Interactive Onboarding Terminal Gate */}
        {stage === "terminal" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-3xl px-6"
          >
            {/* TERMINAL WINDOW OUTER CONTAINER */}
            <div
              onClick={handleTerminalClick}
              className="relative w-full rounded-lg border border-emerald-500/30 bg-[#020202] shadow-[0_0_50px_rgba(16,185,129,0.12)] p-4 md:p-6 font-mono text-xs md:text-sm text-emerald-400 cursor-text min-h-[420px] flex flex-col justify-between"
            >
              {/* Window Header */}
              <div className="flex justify-between items-center border-b border-emerald-500/15 pb-3 mb-4 select-none">
                <div className="flex gap-2 items-center">
                  <span className="w-3 h-3 rounded-full bg-[#ef4444]/70" />
                  <span className="w-3 h-3 rounded-full bg-[#eab308]/70" />
                  <span className="w-3 h-3 rounded-full bg-[#22c55e]/70" />
                  <span className="ml-2 font-bold text-[10px] text-emerald-500/80 tracking-widest hidden sm:inline">
                    OS v1.0
                  </span>
                </div>
                
                <div className="text-emerald-400 font-extrabold text-[10px] md:text-xs tracking-wider">
                  [DONMAY OS v1.0 ONBOARDING TERMINAL]
                </div>

                <div className="flex items-center gap-3">
                  {/* Mute toggle button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMuted(!isMuted);
                    }}
                    className="p-1 hover:bg-emerald-500/10 rounded transition-all text-emerald-400/70 hover:text-emerald-300 cursor-pointer"
                    title={isMuted ? "Unmute sounds" : "Mute sounds"}
                  >
                    {isMuted ? (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 18.75V5.25L7.75 9.5H4.5v5h3.25L12 18.75z" />
                      </svg>
                    )}
                  </button>
                  <span className="text-[9px] text-emerald-500/40 font-semibold tracking-wider">
                    SEC_CORE_0
                  </span>
                </div>
              </div>

              {/* Terminal Screen Body */}
              <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2 max-h-[290px] scrollbar-thin">
                {/* 1. Loader Phase */}
                {!loaderFinished ? (
                  <div className="flex flex-col gap-2 select-none py-4">
                    <div className="text-emerald-500/75">&gt; INITIALIZING SYSTEM DIAGNOSTICS...</div>
                    <div className="text-emerald-500/75">&gt; ESCROW GATEWAY: ONLINE</div>
                    <div className="text-emerald-500/75">&gt; SECURITY ENCRYPTION MODEL: AES-256</div>
                    <div className="text-emerald-400 font-extrabold animate-pulse">&gt; DEPLOYING PROTOCOL INSTANCE ON NODE_0182...</div>
                    
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-emerald-400 font-bold">BOOT SEQUENCE:</span>
                      <div className="flex-1 max-w-md h-3.5 bg-black/80 border border-emerald-500/30 rounded overflow-hidden flex items-center px-0.5">
                        <div 
                          className="h-2.5 bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-75"
                          style={{ width: `${loadProgress}%` }}
                        />
                      </div>
                      <span className="text-emerald-400 font-extrabold tracking-widest">{loadProgress}%</span>
                    </div>
                  </div>
                ) : (
                  /* 2. Main Typewriter Feed */
                  <div className="flex flex-col gap-1.5">
                    {printedLines.map((lineText, idx) => (
                      <div key={idx} className={`leading-relaxed whitespace-pre-wrap ${lineText ? "before:content-['>_']" : ""}`}>
                        {lineText}
                      </div>
                    ))}
                    
                    {/* Active typing line */}
                    {!terminalSequenceComplete && (
                      <div className={`leading-relaxed whitespace-pre-wrap ${activeLineText ? "before:content-['>_']" : ""}`}>
                        {activeLineText}
                        <span className="w-2 h-4 bg-emerald-400 inline-block animate-pulse" />
                      </div>
                    )}

                    {/* Custom Command History logs */}
                    {commandHistory.map((cmdLine, idx) => (
                      <div 
                        key={idx} 
                        className={`leading-relaxed whitespace-pre-wrap ${
                          cmdLine.isCommandResult ? "text-emerald-300/80 pl-4" : "text-emerald-400 font-bold"
                        }`}
                      >
                        {cmdLine.text}
                      </div>
                    ))}

                    {/* Active Prompt Form input */}
                    {terminalSequenceComplete && (
                      <form onSubmit={handleCommandSubmit} className="flex items-center gap-1.5 mt-2">
                        <span className="font-extrabold text-emerald-400 shrink-0">{`>`}</span>
                        <div className="relative flex-1 flex items-center">
                          <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="absolute inset-0 bg-transparent text-transparent caret-transparent focus:outline-none border-none resize-none overflow-hidden h-full w-full font-mono text-xs md:text-sm"
                            autoFocus
                            maxLength={50}
                            aria-label="Onboarding Terminal Command"
                            placeholder="Type REGISTER, SERVICES, HELP or bypass..."
                          />
                          {/* Visible simulated command text */}
                          <span className="text-emerald-400 font-extrabold z-10 whitespace-pre">
                            {inputValue}
                          </span>
                          {/* Simulated authentic blinking block cursor */}
                          <span className="w-2 h-4 bg-emerald-400 ml-1 shrink-0 animate-pulse z-10" />
                        </div>
                      </form>
                    )}
                  </div>
                )}
                <div ref={terminalEndRef} />
              </div>

              {/* Bottom Quick Bypass Buttons & Encryption indicator */}
              <div className="border-t border-emerald-500/15 pt-4 mt-4 flex flex-col gap-3 select-none">
                {/* Redirect countdown info banner */}
                {redirectCountdown !== null && (
                  <div className="text-[10px] text-emerald-400/80 font-bold tracking-widest text-center sm:text-left animate-pulse pb-1">
                    &gt;&gt; REDIRECTING TO DESKTOP IN {redirectCountdown}s... [TYPE OR CLICK TO PAUSE]
                  </div>
                )}

                {/* Micro Action Panel (only visible when typing sequence complete) */}
                {terminalSequenceComplete && (
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <button
                      onClick={() => handleShortcutTrigger("REGISTER")}
                      className="px-3 py-1.5 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-500/10 text-emerald-400 hover:text-white rounded text-[10px] font-mono tracking-widest uppercase font-black transition-all cursor-pointer"
                    >
                      [1] EXECUTE REGISTER
                    </button>
                    <button
                      onClick={() => handleShortcutTrigger("SERVICES")}
                      className="px-3 py-1.5 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-500/10 text-emerald-400 hover:text-white rounded text-[10px] font-mono tracking-widest uppercase font-black transition-all cursor-pointer"
                    >
                      [2] LAUNCH SERVICES
                    </button>
                    <button
                      onClick={() => handleShortcutTrigger("BYPASS")}
                      className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 hover:border-emerald-300 text-white rounded text-[10px] font-mono tracking-widest uppercase font-black transition-all cursor-pointer"
                    >
                      [3] BYPASS HOME INTERFACE
                    </button>
                  </div>
                )}

                <div className="flex justify-between text-[8px] text-emerald-500/40 font-bold uppercase tracking-widest">
                  <span>KEYBOARD INPUT: CONNECTED</span>
                  <span>SECURE LAYER: CH-802</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
