/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Terminal, Upload, Shield, ArrowRight, Lock, 
  CheckCircle, Check, FileText, RefreshCw, Layers
} from "lucide-react";

interface CheckoutSession {
  title: string;
  category: string;
  price: string;
  tier?: string;
}

interface OnboardingTerminalProps {
  session: CheckoutSession;
  onClose: () => void;
  onComplete: (nodeData: {
    title: string;
    price: string;
    email: string;
    mt5Id: string;
    directives: string;
    filesCount: number;
  }) => void;
  initialStep?: "brief" | "payment" | "activation" | "success";
}

export default function OnboardingTerminal({ 
  session, 
  onClose, 
  onComplete,
  initialStep = "brief"
}: OnboardingTerminalProps) {
  const [currentStep, setCurrentStep] = useState<"brief" | "payment" | "activation" | "success">(initialStep);
  const [directives, setDirectives] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; size: string; type: string }[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Activation Info
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [mt5Id, setMt5Id] = useState("");
  const [brandName, setBrandName] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [generatedNodeId, setGeneratedNodeId] = useState("");

  // Mode B Questionnaire states
  const [bizDescription, setBizDescription] = useState("");
  const [promoteDirectives, setPromoteDirectives] = useState("");
  const [channelsToTarget, setChannelsToTarget] = useState<string[]>([]);
  const [targetAudience, setTargetAudience] = useState("");

  // Determine operational category mode
  const isAlgoTrading = 
    session?.title?.toLowerCase().includes("quantsync") || 
    session?.category?.toLowerCase().includes("trading") || 
    session?.category?.toLowerCase().includes("forex") || 
    session?.category?.toLowerCase().includes("mt5") ||
    session?.title?.toLowerCase().includes("mt5") ||
    session?.title?.toLowerCase().includes("trading") ||
    session?.title?.toLowerCase().includes("algorithmic") ||
    session?.title?.toLowerCase().includes("quant");

  // Check storage on mount to auto-hydrate if this is the active session
  useEffect(() => {
    const saved = localStorage.getItem("donmay_pending_onboarding");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.session?.title === session.title) {
          setDirectives(parsed.directives || "");
          setAttachedFiles(parsed.attachedFiles || []);
          if (parsed.email) setClientEmail(parsed.email);
          if (parsed.mt5Id) setMt5Id(parsed.mt5Id);
          if (parsed.clientName) setClientName(parsed.clientName);
          if (parsed.brandName) setBrandName(parsed.brandName);
          if (parsed.bizDescription) setBizDescription(parsed.bizDescription);
          if (parsed.promoteDirectives) setPromoteDirectives(parsed.promoteDirectives);
          if (parsed.channelsToTarget) setChannelsToTarget(parsed.channelsToTarget || []);
          if (parsed.targetAudience) setTargetAudience(parsed.targetAudience);
        }
      } catch (e) {
        console.error("Failed to parse onboarding state from localStorage", e);
      }
    }
  }, [session.title]);

  // Handle step completion and cache state
  const handleCacheState = (nextStep: "brief" | "payment" | "activation" | "success") => {
    const stateToSave = {
      session,
      directives,
      attachedFiles,
      clientName,
      email: clientEmail,
      mt5Id,
      brandName,
      bizDescription,
      promoteDirectives,
      channelsToTarget,
      targetAudience,
      step: nextStep
    };
    localStorage.setItem("donmay_pending_onboarding", JSON.stringify(stateToSave));
    localStorage.setItem("donmay_onboarding_redirected", "true");
  };

  const toggleChannel = (channel: string) => {
    setChannelsToTarget(prev => 
      prev.includes(channel) 
        ? prev.filter(c => c !== channel) 
        : [...prev, channel]
    );
  };

  // Step 1 & 2 validation to show Step 3 gate
  const isStep1And2Populated = directives.trim().length >= 3 && attachedFiles.length > 0;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesList = Array.from(e.dataTransfer.files).map((f: File) => ({
        name: f.name,
        size: (f.size / (1024 * 1024)).toFixed(2) + " MB",
        type: f.type || "unknown"
      }));
      setAttachedFiles(prev => [...prev, ...filesList]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesList = Array.from(e.target.files).map((f: File) => ({
        name: f.name,
        size: (f.size / (1024 * 1024)).toFixed(2) + " MB",
        type: f.type || "unknown"
      }));
      setAttachedFiles(prev => [...prev, ...filesList]);
    }
  };

  const removeFile = (idxToRemove: number) => {
    setAttachedFiles(prev => prev.filter((_, idx) => idx !== idxToRemove));
  };

  // Submit Step 1 & 2 to Step 3 Escrow gate
  const handleGateTransition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep1And2Populated) return;

    setIsCompiling(true);
    // Simulate compilation telemetry
    setTimeout(() => {
      setIsCompiling(false);
      handleCacheState("payment");
      setCurrentStep("payment");
    }, 1100);
  };

  // External loop trigger to Selar Checkout
  const handleAuthorizeDeposit = () => {
    handleCacheState("activation");
    // Trigger the actual Selar URL
    window.open("https://selar.co/m/donmay-media-tech", "_blank", "noreferrer");
    
    // Smoothly transition our internal view to Activation Step for when they completepayment or return
    setCurrentStep("activation");
  };

  const handleActivation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail || !clientName) return;
    if (!isAlgoTrading && !termsAgreed) return;

    const nodeId = `DOM-GW-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedNodeId(nodeId);

    // Format full compiled directive info for storage & display in active listings
    let compiledDirectives = directives;
    if (!isAlgoTrading) {
      compiledDirectives = `
🏢 BUSINESS / BRAND NAME: ${brandName.toUpperCase()}
📝 DESCRIPTION: ${bizDescription}
🚀 RANGE OF FOCUS: ${promoteDirectives}
🎯 TARGET AUDIENCE: ${targetAudience}
📡 TARGET DISTRIBUTION CHANNELS: ${channelsToTarget.join(", ").toUpperCase() || "NONE SELECTED"}
      `.trim();
    } else {
      compiledDirectives = `
👤 CLIENT NAME: ${clientName.toUpperCase()}
💻 METATRADER ALGORITHMIC SEED PORTFOLIO
      `.trim();
    }

    // Persist finalized active contract
    onComplete({
      title: session.title,
      price: session.price,
      email: clientEmail,
      mt5Id: isAlgoTrading ? (mt5Id || "N/A") : (brandName || "N/A"),
      directives: compiledDirectives,
      filesCount: attachedFiles.length
    });

    // Clear session cache
    localStorage.removeItem("donmay_pending_onboarding");
    localStorage.removeItem("donmay_onboarding_redirected");

    setCurrentStep("success");
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030611]/95 backdrop-blur-md overflow-y-auto"
      id="fullscreen-onboarding-terminal"
    >
      <div className="absolute inset-0 bg-radial-at-t from-[#00F0FF]/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 digital-grid opacity-15 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -30 }}
        transition={{ duration: 0.4, type: "spring", bounce: 0.15 }}
        className={`relative w-full ${currentStep === "brief" || (currentStep === "activation" && !isAlgoTrading) ? "max-w-4xl" : "max-w-xl"} rounded-xl border border-[#00F0FF]/25 bg-[#050818]/90 p-6 md:p-8 hover:border-[#00F0FF]/40 transition-all font-mono text-left shadow-[0_0_50px_rgba(0,240,255,0.2)] my-4`}
      >
        {/* Floating background decorative indicators */}
        <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-r from-transparent via-[#00F0FF] to-[#8B5CF6] rounded-tr-xl" />

        {/* HEADER */}
        <div className="flex justify-between items-start border-b border-[#1C64F2]/20 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 border border-[#00F0FF]/30 rounded bg-[#00F0FF]/5">
              <Terminal className="w-5 h-5 text-[#00F0FF] animate-pulse" />
            </div>
            <div>
              <h3 className="font-display font-black text-sm md:text-base text-white tracking-[0.15em] uppercase flex items-center gap-2">
                DONMAY SPECIFICATION VAULT
              </h3>
              <span className="text-[9px] text-[#A0AEC0] uppercase tracking-[0.2em] block mt-0.5">
                ONBOARDING MODULE SECURE SHIELD V2.9 // CHANNEL_ACTIVE
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white border border-[#1C64F2]/20 hover:border-red-400/50 rounded bg-[#070b1c] transition-all cursor-pointer shadow-md"
            aria-label="Close terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* PROGRESS TABS CHIPS */}
        <div className="grid grid-cols-4 gap-2 mb-6 text-[8px] md:text-[9px] text-center border-b border-[#1C64F2]/10 pb-5">
          {[
            { id: "brief", label: "01 DESIGN DIRECTIVE" },
            { id: "payment", label: "02 DEPOSIT ROUTING" },
            { id: "activation", label: "03 ACCOUNT ENROLL" },
            { id: "success", label: "04 COMPLETED OK" }
          ].map((step, idx) => {
            const stepsOrder = ["brief", "payment", "activation", "success"];
            const currentIdx = stepsOrder.indexOf(currentStep);
            const stepIdx = stepsOrder.indexOf(step.id);
            const isActive = currentStep === step.id;
            const isDone = stepIdx < currentIdx;

            return (
              <div 
                key={step.id}
                className={`py-2 px-1 border rounded uppercase font-bold tracking-widest transition-all ${
                  isActive 
                    ? "border-[#00F0FF] bg-[#00F0FF]/15 text-white shadow-[0_0_12px_rgba(0,240,255,0.15)]" 
                    : isDone 
                      ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400" 
                      : "border-[#1C64F2]/10 text-white/30 bg-[#040611]/30"
                }`}
              >
                {step.label}
              </div>
            );
          })}
        </div>

        {/* SERVICE SUMMARY BANNER */}
        <div className="mb-6 p-4 rounded-lg bg-[#03050f] border border-[#1C64F2]/15 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs gap-3">
          <div>
            <span className="text-[8.5px] text-[#A0AEC0] block uppercase tracking-widest">ASSIGNED SYSTEM CORE:</span>
            <span className="text-white font-black block mt-0.5 uppercase tracking-wider text-sm md:text-base">
              {session.title}
            </span>
            <span className="text-[8.5px] font-bold text-[#8B5CF6] uppercase tracking-widest mt-1 block">
              CATEGORY // {session.category}
            </span>
          </div>
          <div className="sm:text-right border-t sm:border-t-0 border-[#1C64F2]/10 pt-2 sm:pt-0 w-full sm:w-auto">
            <span className="text-[8.5px] text-[#A0AEC0] block uppercase tracking-widest">FEE VALUATION:</span>
            <span className="text-[#00F0FF] font-black text-base mt-0.5 block">{session.price}</span>
          </div>
        </div>

        {/* STEP 1 & 2 SCREEN */}
        {currentStep === "brief" && (
          <form onSubmit={handleGateTransition} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="onboarding-side-by-side-grid">
              
              {/* STEP 01 // SCOPE VECTOR DIRECTIVE (TEXTBOX) */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20 px-2 py-0.5 rounded font-extrabold">STEP 01</span>
                  <label className="text-[9.5px] text-white font-black uppercase tracking-wider">
                    SCOPE VECTOR DIRECTIVE *
                  </label>
                </div>
                <p className="text-[9px] text-neutral-400 uppercase tracking-widest leading-relaxed mb-1">
                  Input your precise project goals and instructions for our engineering team...
                </p>
                <textarea
                  required
                  placeholder="EXPLAIN THE SOUNDTRACK THEME / MEDIA SCENCE REQUIREMENTS / AD TARGETS / SOCIAL FOCUS..."
                  rows={8}
                  value={directives}
                  onChange={(e) => {
                    setDirectives(e.target.value);
                    handleCacheState("brief");
                  }}
                  className="w-full flex-1 min-h-[180px] bg-[#03050f] border border-[#1C64F2]/30 focus:border-[#00F0FF] outline-none text-white p-3 rounded text-[11px] uppercase placeholder:text-neutral-700 resize-none font-sans transition-all focus:ring-1 focus:ring-[#00F0FF]/20"
                />
                <div className="flex justify-between text-[8px] text-[#A0AEC0] uppercase tracking-wider font-semibold">
                  <span>SYSTEM METRE LIMIT: {directives.length} CHARS</span>
                  <span className={directives.trim().length >= 10 ? "text-emerald-400" : "text-neutral-500"}>
                    {directives.trim().length >= 10 ? "VALID INPUT DETECTED" : "MINIMUM 10 CHARS REQUIRED"}
                  </span>
                </div>
              </div>

              {/* STEP 02 // MEDIA FILE INGESTION LAYER (DRAG & DROP) */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20 px-2 py-0.5 rounded font-extrabold">STEP 02</span>
                  <label className="text-[9.5px] text-white font-black uppercase tracking-wider">
                    MEDIA FILE INGESTION LAYER *
                  </label>
                </div>
                <p className="text-[9px] text-neutral-400 uppercase tracking-widest leading-relaxed mb-1 font-sans">
                  Upload visual files, images, logos, or reference footage to utilize...
                </p>
                
                <div 
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`group relative flex-1 min-h-[180px] border-2 border-dashed rounded-lg p-5 flex flex-col justify-center items-center text-center transition-all cursor-pointer select-none ${
                    dragActive 
                      ? "border-[#00F0FF] bg-[#00F0FF]/10 shadow-[0_0_15px_rgba(0,240,255,0.15)]" 
                      : "border-[#1C64F2]/30 hover:border-[#00F0FF]/50 bg-[#03050f]"
                  }`}
                >
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    multiple 
                    onChange={handleFileInput}
                    className="hidden" 
                  />
                  <Upload className="w-8 h-8 text-neutral-500 group-hover:text-[#00F0FF] transition-colors mb-2 animate-bounce" />
                  <span className="font-mono text-[9px] text-[#A0AEC0] uppercase tracking-wider group-hover:text-white block px-4 leading-normal">
                    DRAG &amp; DROP OR CLICK TO ATTACH MEDIA
                  </span>
                  <span className="font-sans text-[7.5px] text-[#A0AEC0] block mt-1">
                    SUPPORTS JPG, PNG, MP4, MOV, WAV, MP3
                  </span>
                </div>

                {/* ATTACHED FILE LIST */}
                <div className="min-h-[40px] max-h-[80px] overflow-y-auto bg-[#03050f] border border-[#1C64F2]/20 p-2 rounded text-[8px] flex flex-col gap-1.5 scrollbar-thin">
                  {attachedFiles.length === 0 ? (
                    <span className="text-neutral-600 block text-center uppercase py-2">
                      Awaiting secure asset transmission... (Attach at least 1 file)
                    </span>
                  ) : (
                    <>
                      <div className="flex justify-between items-center text-[#A0AEC0] border-b border-[#1C64F2]/10 pb-1 mb-1 font-extrabold uppercase">
                        <span>ATTACHED DATASETS ({attachedFiles.length})</span>
                        <button 
                          type="button" 
                          onClick={() => setAttachedFiles([])} 
                          className="text-red-400 hover:text-white cursor-pointer"
                        >
                          CLEAR ALL
                        </button>
                      </div>
                      {attachedFiles.map((file, idx) => (
                        <div key={idx} className="flex justify-between items-center text-white bg-[#070c20] px-2 py-1 rounded border border-[#1C64F2]/10">
                          <span className="truncate max-w-[200px] text-emerald-400 text-[8.5px] font-semibold">{file.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-white/50">{file.size}</span>
                            <button 
                              type="button" 
                              onClick={() => removeFile(idx)}
                              className="text-red-400 hover:text-white cursor-pointer text-[10px] font-bold"
                            >
                              &times;
                            </button>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

            </div>

            {/* STEP 03 // ESCROW ROUTING GATE */}
            <div className="pt-4 border-t border-[#1C64F2]/15 flex flex-col gap-3">
              {!isStep1And2Populated && (
                <div className="bg-[#03050f]/60 p-4 rounded-lg text-left text-neutral-400 text-[10px] uppercase tracking-wide flex flex-col gap-3 border border-amber-500/10">
                  <div className="flex items-center gap-2 text-amber-500 font-bold shrink-0">
                    <Shield className="w-4 h-4 shrink-0 select-none animate-pulse" />
                    <span>AWAITING CORE SPECIFICATION COMPLIANCE PROTOCOLS:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-1 text-[9px] tracking-widest font-mono">
                    <div className="flex items-center gap-2 py-1.5 px-3 rounded bg-black/35 border border-white/5">
                      <span className={`w-2 h-2 rounded-full ${directives.trim().length >= 3 ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" : "bg-red-500 animate-pulse"}`} />
                      <span>DIRECTIVE METRE: {directives.trim().length}/3 CHARS</span>
                      {directives.trim().length >= 3 ? (
                        <span className="text-emerald-400 font-black ml-auto">[OK]</span>
                      ) : (
                        <span className="text-red-400 font-black ml-auto">[PENDING]</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 py-1.5 px-3 rounded bg-black/35 border border-white/5">
                      <span className={`w-2 h-2 rounded-full ${attachedFiles.length > 0 ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" : "bg-red-500 animate-pulse"}`} />
                      <span>ATTACHED FILES: {attachedFiles.length} ATTACHED</span>
                      {attachedFiles.length > 0 ? (
                        <span className="text-emerald-400 font-black ml-auto">[OK]</span>
                      ) : (
                        <span className="text-red-400 font-black ml-auto">[PENDING]</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {isStep1And2Populated && (
                <div className="flex items-center gap-2 text-[#00F0FF] text-[9.5px] uppercase font-black bg-[#00F0FF]/5 p-3 rounded border border-[#00F0FF]/25 shadow-[0_0_15px_rgba(0,240,255,0.05)]">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 select-none" />
                  <span>SECURE CHECKS OK: DIRECTIVES &amp; REFERENCE METADATA PACKED SUCCESSFULLY</span>
                </div>
              )}

              <p className="text-[8.5px] text-neutral-400 uppercase tracking-widest leading-relaxed">
                STEP 03 // Click below to initialize escrow compilation. The system will compile your directive matrix and visual reference payloads into persistent memory before loading the payment router.
              </p>

              <button
                type="submit"
                disabled={isCompiling || !isStep1And2Populated}
                className={`w-full py-4 font-display text-[11px] font-black tracking-[0.2em] uppercase rounded-lg flex items-center justify-center gap-2.5 cursor-pointer transition-all ${
                  isStep1And2Populated 
                    ? "bg-[#00F0FF] hover:bg-white text-[#040714] shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-[1.01] active:scale-[0.99]" 
                    : "bg-[#0c1630] border border-[#1C64F2]/20 text-neutral-500 cursor-not-allowed opacity-50"
                }`}
              >
                {isCompiling ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>COMPILING PAYLOAD DIRECTIVES...</span>
                  </>
                ) : (
                  <>
                    <span>{!isStep1And2Populated ? "COMPLETE PROTOCOLS TO PROCEED" : "SUBMIT SPECIFICATIONS & AUTHORIZE SECURE DEPOSIT"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: ESCROW & SELAR ROUTER */}
        {currentStep === "payment" && (
          <div className="flex flex-col gap-6 text-center py-4 animate-fade-in">
            <div className="w-14 h-14 rounded-full border-2 border-purple-500/40 bg-purple-500/10 flex items-center justify-center mx-auto text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <Shield className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <h4 className="text-white font-extrabold text-sm uppercase tracking-wide">
                TRANSACTION DEPOSIT REDIRECTGATEWAY
              </h4>
              <p className="font-sans text-[10px] text-[#A0AEC0] uppercase tracking-wider max-w-sm mx-auto mt-2 leading-relaxed">
                Your asset blueprints &amp; text instructions are cached securely in local client buffer. Proceed to authenticate the official payment channel on Selar.
              </p>
            </div>

            {/* Persistence specifications box */}
            <div className="p-4 rounded-lg border border-purple-500/25 bg-[#03050f] text-left text-[9px] text-[#A0AEC0] space-y-3.5 max-h-[220px] overflow-y-auto">
              <div className="flex justify-between items-center bg-[#070b1c] p-2 rounded">
                <span className="font-bold">SYSTEM ESCROW VALUE:</span>
                <span className="text-emerald-400 font-black text-sm">{session.price}</span>
              </div>
              
              <div>
                <span className="font-bold block mb-1 text-[#00F0FF] uppercase">BLOCKED SPECIFICATION DIRECTIVES:</span>
                <p className="text-white bg-[#050818] p-2.5 rounded border border-[#1C64F2]/10 text-[8.5px] leading-relaxed uppercase max-h-[80px] overflow-y-auto">
                  {directives}
                </p>
              </div>

              {attachedFiles.length > 0 && (
                <div>
                  <span className="font-bold block mb-1 text-emerald-400 uppercase">
                    PERSISTED REFERENCE PAYLOAD GRAPHICS ({attachedFiles.length}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {attachedFiles.map((file, idx) => (
                      <div key={idx} className="bg-[#050818] p-2 rounded border border-[#1C64F2]/15 flex items-center justify-between text-[7.5px]">
                        <span className="truncate text-white max-w-[110px] font-bold">{file.name}</span>
                        <span className="text-emerald-400 font-extrabold uppercase text-[7px]">LOCKED OK</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleAuthorizeDeposit}
                className="w-full py-4.5 bg-gradient-to-r from-[#00F0FF] to-purple-500 hover:from-white hover:to-white text-[#040714] font-display text-[11px] font-black tracking-[0.2em] uppercase rounded-lg flex items-center justify-center gap-2.5 cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all transform hover:scale-[1.01]"
              >
                <span>AUTHORIZE VIA SELAR ESCROW ({session.price})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="font-sans text-[7.5px] text-[#A0AEC0] uppercase tracking-widest leading-relaxed px-2">
                *SYSTEM CONFIRMED: redirection opens secure, encrypted external terminal. Specifications and attachments have been successfully linked and will not be lost.
              </span>
            </div>
          </div>
        )}

        {/* STEP 3: ACCOUNT ACTIVATION */}
        {currentStep === "activation" && (
          <form onSubmit={handleActivation} className="flex flex-col gap-6 animate-fade-in text-left">
            <div className="text-center mb-1 border-b border-[#1C64F2]/10 pb-4">
              <div className="inline-flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/25 bg-emerald-500/5 px-3 py-1 rounded select-none">
                <Lock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>SECURE PAYMENT DEPOSIT DETECTED // AUTHORIZED</span>
              </div>
              
              <h4 className="text-white font-black text-sm uppercase mt-4 tracking-[0.1em]">
                {isAlgoTrading 
                  ? "INITIALIZE ALGORITHMIC CORE PORTFOLIO ACTIVATION" 
                  : "DONMAY DIGITAL AGENCY CORE ONBOARDING"}
              </h4>
              <p className="text-[9px] text-[#A0AEC0] uppercase mt-1.5 tracking-widest leading-normal">
                {isAlgoTrading 
                  ? "Capture secure MT5 credentials and details to bind your custom algorithmic client node." 
                  : "Complete our premium master intake questionnaire below to customize your distribution brand pipeline."}
              </p>
            </div>

            {/* DYNAMIC TRACKING MODE FIELD INPUTS */}
            <div className="bg-[#03050f]/80 p-4 rounded-lg border border-[#1C64F2]/25 space-y-4 shadow-[0_0_20px_rgba(28,100,242,0.05)]">
              <div className="flex items-center gap-1.5 border-b border-[#1C64F2]/10 pb-2 mb-2">
                <Shield className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                <span className="text-[9.5px] font-black uppercase text-[#00F0FF] tracking-wider">
                  {isAlgoTrading ? "MODE A: ALGORITHMIC TRADING INTEGRATION" : "MODE B: MARKETING & AGENCY BLUEPRINT"}
                </span>
                <span className="ml-auto text-[7px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase tracking-widest animate-pulse select-none">
                  ACTIVE PIPELINE
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Field 1: Client Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] text-[#A0AEC0] uppercase tracking-wider font-bold">
                    [Client Name] *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe / Organization Name"
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                      handleCacheState("activation");
                    }}
                    className="w-full bg-[#040714] border border-[#1C64F2]/30 focus:border-[#00F0FF] outline-none text-white px-3 py-2.5 rounded text-[11px] uppercase placeholder:text-neutral-700 font-mono tracking-wide transition-all focus:ring-1 focus:ring-[#00f0ff]/10"
                  />
                </div>

                {/* Field 2: Account Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] text-[#A0AEC0] uppercase tracking-wider font-bold">
                    [Account Email] *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. john@yourdomain.com"
                    value={clientEmail}
                    onChange={(e) => {
                      setClientEmail(e.target.value);
                      handleCacheState("activation");
                    }}
                    className="w-full bg-[#040714] border border-[#1C64F2]/30 focus:border-[#00F0FF] outline-none text-white px-3 py-2.5 rounded text-[11px] placeholder:text-neutral-700 font-mono transition-all focus:ring-1 focus:ring-[#00f0ff]/10"
                  />
                </div>

                {/* Field 3: Specialized Field (MT5 or Brand Name) */}
                {isAlgoTrading ? (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-[#00F0FF] uppercase tracking-wider font-extrabold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                      [MT5 Trading ID] *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MT5-908123"
                      value={mt5Id}
                      onChange={(e) => {
                        setMt5Id(e.target.value);
                        handleCacheState("activation");
                      }}
                      className="w-full bg-[#040714] border border-[#1C64F2]/30 focus:border-[#00F0FF] outline-none text-white px-3 py-2.5 rounded text-[11px] uppercase placeholder:text-neutral-700 font-mono tracking-wide transition-all focus:ring-1 focus:ring-[#00f0ff]/10"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-[#00F0FF] uppercase tracking-wider font-extrabold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                      [Page / Brand Name] *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Tech / MyBrand Corp"
                      value={brandName}
                      onChange={(e) => {
                        setBrandName(e.target.value);
                        handleCacheState("activation");
                      }}
                      className="w-full bg-[#040714] border border-[#1C64F2]/30 focus:border-[#00F0FF] outline-none text-white px-3 py-2.5 rounded text-[11px] uppercase placeholder:text-neutral-700 font-mono tracking-wide transition-all focus:ring-1 focus:ring-[#00f0ff]/10"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* DEPLOY THE DONMAY MASTER ONBOARDING CANVASES FOR MODE B */}
            {!isAlgoTrading && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-[#040714]/60 border border-[#1C64F2]/20 p-5 rounded-lg text-[10px] uppercase font-mono tracking-wide">
                
                {/* Left Column Questionnaire Questions */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-b border-[#1C64F2]/10 pb-1.5">
                    <span className="text-[8px] bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 px-1.5 py-0.5 rounded font-black font-mono">Q1-Q2</span>
                    <span className="font-extrabold text-[#A0AEC0] tracking-widest text-[9px]">CORE BUSINESS & PRODUCT SCOPE</span>
                  </div>

                  {/* Question 1 */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-[#00F0FF] uppercase tracking-wider font-extrabold leading-normal text-left">
                      1. Briefly tell us about your business, ministry, or brand: *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="DESCRIBE SERVICE / CORE AUDIENCE / VALUES / LOGO SCHEMES..."
                      value={bizDescription}
                      onChange={(e) => {
                        setBizDescription(e.target.value);
                        handleCacheState("activation");
                      }}
                      className="w-full bg-[#03050f] border border-[#1C64F2]/35 focus:border-[#00F0FF] outline-none text-white p-2 text-[10px] rounded resize-none font-sans overflow-y-auto uppercase transition-all"
                    />
                  </div>

                  {/* Question 2 */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-[#00F0FF] uppercase tracking-wider font-extrabold leading-normal text-left">
                      2. What services, products, or links would you like us to promote the most? *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="e.g. WWW.WEBSITE.COM, NEW RELEASES, BRAND SERVICES, OFFERS..."
                      value={promoteDirectives}
                      onChange={(e) => {
                        setPromoteDirectives(e.target.value);
                        handleCacheState("activation");
                      }}
                      className="w-full bg-[#03050f] border border-[#1C64F2]/35 focus:border-[#00F0FF] outline-none text-white p-2 text-[10px] rounded resize-none font-sans overflow-y-auto uppercase transition-all"
                    />
                  </div>

                  {/* Question 4 */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-[#00F0FF] uppercase tracking-wider font-extrabold leading-normal text-left">
                      4. Who is your target audience? *
                    </label>
                    <span className="text-[7.5px] text-neutral-400 block -mt-1 leading-normal uppercase">
                      Specify geographic location targets, age brackets, or professional fields
                    </span>
                    <textarea
                      required
                      rows={2}
                      placeholder="e.g. 18-35 INDIVIDUALS, LOCATED IN LONDON/LAGOS, CREATIVES..."
                      value={targetAudience}
                      onChange={(e) => {
                        setTargetAudience(e.target.value);
                        handleCacheState("activation");
                      }}
                      className="w-full bg-[#03050f] border border-[#1C64F2]/35 focus:border-[#00F0FF] outline-none text-white p-2 text-[10px] rounded resize-none font-sans overflow-y-auto uppercase transition-all"
                    />
                  </div>
                </div>

                {/* Right Column Channels & Drag & Drop File Upload */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-b border-[#1C64F2]/10 pb-1.5">
                    <span className="text-[8px] bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 px-1.5 py-0.5 rounded font-black font-mono">Q3-Q4</span>
                    <span className="font-extrabold text-[#A0AEC0] tracking-widest text-[9px]">CHANNELS & ASSET COLLECTION</span>
                  </div>

                  {/* Question 3 Checkbox Panel */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-[#00F0FF] uppercase tracking-wider font-extrabold">
                      3. Which channels would you like us to target/manage? *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mt-1">
                      {["Facebook", "Instagram", "TikTok", "LinkedIn", "YouTube", "X"].map((channel) => {
                        const isChecked = channelsToTarget.includes(channel);
                        return (
                          <button
                            type="button"
                            key={channel}
                            onClick={() => {
                              toggleChannel(channel);
                              handleCacheState("activation");
                            }}
                            className={`py-1.5 border rounded text-[8.5px] font-black uppercase tracking-wider transition-all text-center cursor-pointer ${
                              isChecked
                                ? "border-[#00F0FF] bg-[#00F0FF]/15 text-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.15)]"
                                : "border-[#1C64F2]/10 bg-black/45 text-neutral-400 hover:border-[#1C64F2]/35 hover:text-white"
                            }`}
                          >
                            {channel}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Unified Upload Real Estate */}
                  <div className="flex flex-col gap-1.5 mt-1">
                    <label className="text-[9px] text-emerald-400 uppercase tracking-wider font-extrabold flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <span>UPLOAD BRIEF ASSETS *</span>
                    </label>
                    <p className="text-[7.5px] text-neutral-400 block -mt-1 leading-normal uppercase">
                      Position reference designs, branding materials or documents (Attach at least 1 file)
                    </p>
                    
                    <div 
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`group relative border-2 border-dashed rounded-lg p-3 flex flex-col justify-center items-center text-center transition-all cursor-pointer select-none min-h-[90px] ${
                        dragActive 
                          ? "border-[#00F0FF] bg-[#00F0FF]/10 shadow-[0_0_10px_rgba(0,240,255,0.15)]" 
                          : "border-[#1C64F2]/20 hover:border-[#00F0FF]/40 bg-black/45 hover:bg-[#03050f]"
                      }`}
                    >
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        multiple 
                        onChange={handleFileInput}
                        className="hidden" 
                      />
                      <Upload className="w-5 h-5 text-neutral-500 group-hover:text-[#00F0FF] transition-colors mb-1.5 animate-pulse" />
                      <span className="font-mono text-[7.5px] text-[#A0AEC0] uppercase tracking-wider group-hover:text-white leading-normal">
                        DRAG &amp; DROP OR CLICK TO ATTACH BRIEF FILE
                      </span>
                    </div>

                    {/* Attached file checklist inside activation screen */}
                    <div className="max-h-[70px] overflow-y-auto bg-black/35 border border-[#1C64F2]/10 p-1.5 rounded text-[7.5px] flex flex-col gap-1.5 scrollbar-thin mt-1">
                      {attachedFiles.length === 0 ? (
                        <span className="text-neutral-500 text-center block uppercase py-1 select-none animate-pulse">
                          Awaiting graphics/brief upload... (Locked)
                        </span>
                      ) : (
                        <div className="space-y-1">
                          {attachedFiles.map((file, idx) => (
                            <div key={idx} className="flex justify-between items-center text-white bg-[#070c20] px-2 py-0.5 rounded border border-[#1C64F2]/5">
                              <span className="truncate max-w-[130px] text-emerald-400 font-extrabold">{file.name}</span>
                              <div className="flex items-center gap-1.5">
                                <span className="text-white/40">{file.size}</span>
                                <button 
                                  type="button" 
                                  onClick={() => removeFile(idx)}
                                  className="text-red-400 hover:text-white cursor-pointer font-bold text-[9px]"
                                >
                                  &times;
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Terms and conditions */}
            <label className="flex items-start gap-3 p-3.5 rounded border border-[#1C64F2]/20 bg-[#03050f]/60 cursor-pointer text-[8.5px] uppercase leading-relaxed text-[#A0AEC0] hover:border-[#1C64F2]/30 transition-colors">
              <input
                type="checkbox"
                required
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                className="mt-0.5"
              />
              <span className="font-sans leading-normal select-none">
                {isAlgoTrading 
                  ? "I agree to bind this secure email and optional MT5 client keys to our active trading core. I agree to terms of server authorization and SLA performance tracking loops."
                  : "I agree to lock this complete blueprint specification into our dynamic CRM. I agree that all attachments are compiled securely under Donmay Media licensing parameters."}
              </span>
            </label>

            {/* Dynamically configured submission buttons */}
            <button
              type="submit"
              disabled={
                !clientEmail || 
                !clientName || 
                (isAlgoTrading && !mt5Id) || 
                (!isAlgoTrading && (
                  !termsAgreed || 
                  attachedFiles.length === 0 || 
                  !bizDescription.trim() || 
                  !promoteDirectives.trim() || 
                  !targetAudience.trim() || 
                  channelsToTarget.length === 0
                ))
              }
              className={`w-full py-4.5 font-display text-[11px] font-black tracking-[0.2em] uppercase rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:scale-[1.01] active:scale-[0.99] ${
                (clientEmail && clientName && (isAlgoTrading ? !!mt5Id : (termsAgreed && attachedFiles.length > 0 && bizDescription.trim() && promoteDirectives.trim() && targetAudience.trim() && channelsToTarget.length > 0)))
                  ? "bg-[#00F0FF] hover:bg-white text-[#040714] shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:scale-[1.01]" 
                  : "bg-neutral-800 text-neutral-500 cursor-not-allowed opacity-50 border border-white/5"
              }`}
            >
              <span>{isAlgoTrading ? "INITIALIZE SYSTEM TIER VAULT // REGISTER" : "INITIALIZE AGENCY ONBOARDING // SUBMIT"}</span>
              <CheckCircle className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 4: SUCCESS TELEMETRY VAULT */}
        {currentStep === "success" && (
          <div className="flex flex-col gap-6 text-center animate-fade-in py-2">
            <div className="w-14 h-14 rounded-full border border-emerald-500/40 bg-emerald-500/15 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
              <Check className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <h4 className="text-white font-black text-sm uppercase tracking-wider">
                NODE DEPLOYMENT SYNCHRONIZED SUCCESSFULLY
              </h4>
              <p className="font-sans text-[10px] text-[#A0AEC0] uppercase tracking-widest max-w-sm mx-auto mt-2 leading-relaxed">
                Client node activated as ONLINE. Secure specifications database register synchronized with local control panel.
              </p>
            </div>

            {/* Mock system license card */}
            <div className="bg-[#03050f] p-5 rounded-lg border border-emerald-500/35 text-left relative overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.05)]">
              {/* Abstract decorative graphic */}
              <div className="absolute right-[-10px] bottom-[-10px] opacity-10 text-emerald-400">
                <Layers className="w-24 h-24 rotate-12" />
              </div>
              
              <div className="absolute right-0 top-0 p-2 font-mono text-[7px] text-emerald-400 bg-emerald-500/10 border-bl border-emerald-500/20 uppercase tracking-widest rounded-bl select-none">
                LICENSED DIGITAL KEY
              </div>
              <span className="font-display font-black text-[#00F0FF] text-[10px] block uppercase tracking-[0.2em]">
                DONMAY CLIENT CORE PASSCARD
              </span>
              
              <div className="grid grid-cols-2 gap-4 mt-4 font-mono text-[9px] uppercase text-[#A0AEC0] relative z-10 leading-normal">
                <div>
                  <span className="text-[8px] text-[#718096]">ENROLLED NODE ID //</span>
                  <p className="text-white font-black mt-0.5 select-all">{generatedNodeId || "DOM-GW-7193"}</p>
                </div>
                <div>
                  <span className="text-[8px] text-[#718096]">OPERATIONAL STATUS //</span>
                  <p className="text-emerald-400 font-extrabold mt-0.5">ONLINE (ENROLLED)</p>
                </div>
                <div>
                  <span className="text-[8px] text-[#718096]">SERVICE ELEMENT //</span>
                  <p className="text-white font-black mt-0.5 truncate">{session.title}</p>
                </div>
                <div>
                  <span className="text-[8px] text-[#718096]">ACCOUNT EMAIL //</span>
                  <p className="text-white font-bold mt-0.5 truncate select-all">{clientEmail.toUpperCase()}</p>
                </div>
                {mt5Id && (
                  <div className="col-span-2 border-t border-[#1C64F2]/10 pt-2.5">
                    <span className="text-[8px] text-[#718096]">METATRADER 5 BOUND SYSTEM ID //</span>
                    <p className="text-emerald-300 font-mono mt-0.5 tracking-wider select-all">{mt5Id.toUpperCase()}</p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-4.5 bg-[#03050f] hover:bg-[#070c20] border border-emerald-500/40 hover:border-emerald-400 text-white font-mono text-[11px] uppercase tracking-[0.15em] rounded-lg transition-all cursor-pointer shadow-md"
            >
              RETURN TO CONTROL GATEWAY
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
