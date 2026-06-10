/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, ShieldCheck, Cpu, RefreshCw, Layers, Check, 
  HelpCircle, ArrowRight, User, Mail, FolderHeart, Globe 
} from "lucide-react";
import DonmayLogo from "../components/DonmayLogo";

export default function ActivatePage() {
  const navigate = useNavigate();

  // Onboarding credentials and workflow triggers
  const [productType, setProductType] = useState<"quantsync" | "agency">("quantsync");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [mt5Id, setMt5Id] = useState("");
  const [pageName, setPageName] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileSteps, setCompileSteps] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [nodeId, setNodeId] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleCompilationProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;
    if (productType === "quantsync" && !mt5Id) return;
    if (productType === "agency" && !pageName) return;
    if (!termsAgreed) return;

    setIsCompiling(true);
    setCompileSteps([]);

    // Custom steps indicating standard server initialization, dataset encryption and portal enrolling
    const steps = [
      "ESTABLISHING CRYPTOGRAPHIC ESCROW DEPLOYMENT...",
      "SYNCING CLIENT SECURE HANDSHAKES FOR PROTOCOL...",
      "PARSING USER STRUCTURAL DIRECTIVES FOR VALIDATION...",
      productType === "quantsync" 
        ? "MIGRATING QUANT_CORE FOR MT5 ID NODE..." 
        : "ALLOCATING CAMPAIGN REVENUE DIRECTIVES...",
      "VERIFYING SELAR PAYMENT AUTH GATES...",
      "GENERATING PERMANENT UNIQUE ROUTER PORT KEY..."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 550));
      setCompileSteps((prev) => [...prev, steps[i]]);
    }

    await new Promise((resolve) => setTimeout(resolve, 600));
    
    // Enroll the newly activated item into the live contracts cache
    const generatedNodeId = `DOM-GW-${Math.floor(1000 + Math.random() * 9000)}`;
    setNodeId(generatedNodeId);

    const activeContract = {
      id: generatedNodeId,
      title: productType === "quantsync" ? "QuantSync Suite Suite Core" : "Premium Custom Agency Service",
      price: productType === "quantsync" ? "$1,500 USD / MO" : "$1,200 USD / MO",
      username: clientEmail,
      status: "ACTIVE PIPELINE ENROLLED",
      date: new Date().toLocaleDateString()
    };

    const saved = localStorage.getItem("donmay_active_contracts");
    let current: any[] = [];
    if (saved) {
      try {
        current = JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    const next = [activeContract, ...current];
    localStorage.setItem("donmay_active_contracts", JSON.stringify(next));

    setIsCompiling(false);
    setIsSuccess(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#040714] text-white relative py-20 px-6 overflow-hidden flex items-center justify-center select-none" id="activation-terminal-scene">
      {/* Visual cyber mesh background */}
      <div className="absolute inset-0 digital-grid opacity-45 pointer-events-none" />
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#1C64F2]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-xl bg-[#080B1C]/90 border border-[#1C64F2]/25 rounded-md p-6 relative z-10 shadow-[0_0_50px_rgba(28,100,242,0.15)] overflow-hidden">
        
        {/* Subtle cyan border line on top */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#1C64F2] via-[#10B981] to-[#00F0FF]" />

        {/* Console Header */}
        <div className="flex items-center justify-between border-b border-[#1C64F2]/20 pb-4 mb-6">
          <DonmayLogo compact={true} />
          
          <div className="flex items-center gap-2 font-mono text-[9px] text-[#00F0FF] tracking-wider uppercase font-extrabold bg-[#00F0FF]/5 py-1 px-2.5 rounded border border-[#00F0FF]/15 animate-pulse">
            <Terminal className="w-3 h-3" />
            <span>Deployment Terminal V.1.5</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="activation-form-block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h1 className="font-display font-black text-lg md:text-xl text-white tracking-widest uppercase mb-1 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                  GATEWAY REGISTRATION PORTAL
                </h1>
                <p className="font-mono text-[9.5px] text-[#A0AEC0] uppercase tracking-wider">
                  Post-payment credential lockup. Please input correct parameters below.
                </p>
              </div>

              {/* Form Input Container */}
              <form onSubmit={handleCompilationProcess} className="space-y-4">
                
                {/* Active Product selector tabs */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[8.5px] text-[#A0AEC0] uppercase tracking-wider font-extrabold flex items-center gap-1">
                    <Layers className="w-3 h-3 text-[#00F0FF]" />
                    <span>01 // SELECT THE PURCHASED PROTOCOL PRODUCT:</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setProductType("quantsync")}
                      className={`py-2 px-3 border rounded text-[9.5px] font-mono uppercase tracking-widest transition-all cursor-pointer ${
                        productType === "quantsync"
                          ? "border-[#00F0FF] bg-[#00F0FF]/15 text-white"
                          : "border-[#1C64F2]/20 text-neutral-400 bg-black/40 hover:border-[#1C64F2]/50 hover:text-white"
                      }`}
                    >
                      QuantSync Suite (Forex Algorithmic Suite)
                    </button>
                    <button
                      type="button"
                      onClick={() => setProductType("agency")}
                      className={`py-2 px-3 border rounded text-[9.5px] font-mono uppercase tracking-widest transition-all cursor-pointer ${
                        productType === "agency"
                          ? "border-[#00F0FF] bg-[#00F0FF]/15 text-white"
                          : "border-[#1C64F2]/20 text-neutral-400 bg-black/40 hover:border-[#1C64F2]/50 hover:text-white"
                      }`}
                    >
                      Creative Agency Services (Marketing / Editing)
                    </button>
                  </div>
                </div>

                {/* Name field */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[8.5px] text-[#A0AEC0] uppercase tracking-wider font-extrabold flex items-center gap-1">
                    <User className="w-3 h-3 text-neutral-500" />
                    <span>02 // CLIENT REGISTRATION NAME:</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter your legal full name"
                    className="w-full bg-[#040714] border border-[#1C64F2]/25 focus:border-[#00F0FF] outline-none text-white px-3.5 py-2.5 rounded text-xs uppercase focus:ring-1 focus:ring-[#00F0FF]/25 font-mono"
                  />
                </div>

                {/* Email field */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[8.5px] text-[#A0AEC0] uppercase tracking-wider font-extrabold flex items-center gap-1">
                    <Mail className="w-3 h-3 text-neutral-500" />
                    <span>03 // ACCOUNT BILLING EMAIL:</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="protocol@domain.com"
                    className="w-full bg-[#040714] border border-[#1C64F2]/25 focus:border-[#00F0FF] outline-none text-white px-3.5 py-2.5 rounded text-xs uppercase focus:ring-1 focus:ring-[#00F0FF]/25 font-mono"
                  />
                </div>

                {/* DYNAMIC SHIFTING PORT PARAMETERS */}
                <AnimatePresence mode="wait">
                  {productType === "quantsync" ? (
                    <motion.div
                      key="fields-quantsync"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col gap-1.5 overflow-hidden"
                    >
                      <label className="font-mono text-[8.5px] text-[#00F0FF] uppercase tracking-wider font-extrabold flex items-center gap-1">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>04 // ENTER MT5 TRADING ID (QUANT ACCOUNT INDEX):</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={mt5Id}
                        onChange={(e) => setMt5Id(e.target.value)}
                        placeholder="MT5 Account Number (e.g. 8459422)"
                        className="w-full bg-[#040714] border border-[#00F0FF]/35 focus:border-[#00F0FF] outline-none text-white px-3.5 py-2.5 rounded text-xs focus:ring-1 focus:ring-[#00F0FF]/25 font-mono tracking-widest font-black"
                      />
                      <span className="font-sans text-[7.5px] text-[#A0AEC0] uppercase tracking-wider mt-0.5">
                        * Essential for binding the QuantSync algorithmic indicators & license hooks to your active workspace.
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="fields-agency"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col gap-1.5 overflow-hidden"
                    >
                      <label className="font-mono text-[8.5px] text-amber-500 uppercase tracking-wider font-extrabold flex items-center gap-1">
                        <FolderHeart className="w-3.5 h-3.5" />
                        <span>04 // ENTER SOCIAL MEDIA PAGE / BRAND NAME:</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={pageName}
                        onChange={(e) => setPageName(e.target.value)}
                        placeholder="Page username or Channel Link (e.g. @MyBrand)"
                        className="w-full bg-[#040714] border border-amber-500/35 focus:border-amber-400 outline-none text-white px-3.5 py-2.5 rounded text-xs uppercase focus:ring-1 focus:ring-amber-500/25 font-mono"
                      />
                      <span className="font-sans text-[7.5px] text-[#A0AEC0] uppercase tracking-wider mt-0.5">
                        * Required to initiate page analysis, structure creative media specs, and configure editorial calendars.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Terms checkbox */}
                <div className="pt-2 border-t border-[#1C64F2]/10 mt-3 flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="terms-agreed"
                    required
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                    className="mt-0.5 border-[#1C64F2]/30 bg-black text-[#00F0FF] focus:ring-[#00F0FF] cursor-pointer"
                  />
                  <label htmlFor="terms-agreed" className="font-mono text-[8px] text-neutral-400 uppercase tracking-wide cursor-pointer select-none leading-relaxed">
                    I attest that my deposit payments are settled, and I verify that all above identities, email addresses, and server indexes are precise and complete.
                  </label>
                </div>

                {/* Submission button */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="w-full py-3 border border-red-500/30 hover:border-red-500 hover:bg-red-500/5 text-red-400 hover:text-white font-mono text-[10.5px] uppercase tracking-[0.2em] font-black rounded cursor-pointer transition-colors text-center"
                  >
                    CANCEL &amp; EXIT PAGE
                  </button>
                  <button
                    type="submit"
                    disabled={isCompiling}
                    className="w-full py-3 bg-gradient-to-r from-[#1C64F2] via-[#10B981] to-[#00F0FF] text-white hover:text-black font-mono text-[10.5px] uppercase tracking-[0.2em] font-black rounded cursor-pointer transition-colors hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] relative overflow-hidden flex items-center justify-center gap-2"
                  >
                    {isCompiling ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        <span>COMPILING BUILD...</span>
                      </>
                    ) : (
                      <>
                        <span>COMPILE &amp; DEPLOY</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </form>

              {/* Terminal Logging during compilation */}
              {isCompiling && (
                <div className="mt-5 p-3 rounded bg-black/95 border border-[#1C64F2]/30 font-mono text-[8px] text-emerald-400 uppercase tracking-widest space-y-1 select-none min-h-[90px]">
                  {compileSteps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-gray-600 font-extrabold">&gt;</span>
                      <span>{step}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 animate-pulse mt-1">
                    <span className="text-gray-600 font-extrabold">&gt;</span>
                    <span className="w-1.5 h-3 bg-emerald-400 inline-block" />
                    <span className="text-neutral-500">PENDING KERNEL RESPONSE...</span>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="activation-success-block"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center flex flex-col items-center py-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-bounce" style={{ animationDuration: '4s' }}>
                <ShieldCheck className="w-9 h-9" />
              </div>

              <h2 className="font-display font-black text-xl md:text-2xl text-emerald-400 tracking-widest uppercase mb-2">
                ACTIVATION LOCK SUCCESSFUL
              </h2>
              <span className="font-mono text-[9px] text-[#A0AEC0] tracking-[0.25em] uppercase block mb-6">
                ONBOARDER GATEWAY FULLY DEPLOYED
              </span>

              {/* Secure receipt table */}
              <div className="w-full text-left font-mono text-[10px] bg-black/75 border border-emerald-500/25 rounded p-4 mb-8 leading-relaxed uppercase divide-y divide-[#1C64F2]/10">
                <div className="py-2 flex justify-between items-center text-white/50">
                  <span>DEPLOYED NODE KEY ID:</span>
                  <span className="text-emerald-400 font-black tracking-widest">{nodeId}</span>
                </div>
                <div className="py-2 flex justify-between items-center text-white/50">
                  <span>TRANSACTION CLIENT:</span>
                  <span className="text-white font-bold">{clientName}</span>
                </div>
                <div className="py-2 flex justify-between items-center text-white/50">
                  <span>ACCOUNT INTEGRATION FILE:</span>
                  <span className="text-white">{clientEmail}</span>
                </div>
                <div className="py-2 flex justify-between items-center text-white/50">
                  <span>SYSTEM SPEC REGISTERED:</span>
                  <span className="text-[#00F0FF] font-extrabold">
                    {productType === "quantsync" ? `MT5_ID [${mt5Id}]` : `PAGE [${pageName}]`}
                  </span>
                </div>
                <div className="py-2 flex justify-between items-center text-white/50">
                  <span>PIPELINE ENGINE:</span>
                  <span className="text-emerald-400 font-extrabold">ACTIVE CONTRACT PIPELINE ENROLLED</span>
                </div>
              </div>

              <p className="font-sans text-[11px] text-[#A0AEC0] uppercase tracking-wider mb-8 max-w-sm leading-relaxed mx-auto">
                Your portal indicators has successfully enrolled. You can now track your active contract details live on our Services hub page monitor!
              </p>

              <div className="flex gap-4 w-full">
                <button
                  onClick={() => navigate("/services")}
                  className="flex-1 py-3 border border-emerald-500/30 hover:border-emerald-400 bg-emerald-500/10 text-emerald-300 font-mono text-[9px] tracking-widest uppercase font-black cursor-pointer transition-all hover:bg-emerald-500/15 text-center"
                >
                  MONITOR MY CONTRACT NODE
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="flex-1 py-3 border border-[#1C64F2]/30 hover:border-[#00F0FF] bg-black/40 text-neutral-400 hover:text-white font-mono text-[9px] tracking-widest uppercase cursor-pointer transition-all text-center"
                >
                  RETURN TO HOME
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
