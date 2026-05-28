/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SERVICES_DATA } from "../data";
import { ServiceItem } from "../types";
import { 
  Terminal, 
  Clock, 
  Coins, 
  Send, 
  Sliders, 
  Sparkles, 
  ChevronRight, 
  FileText, 
  CheckCircle,
  HelpCircle
} from "lucide-react";

export default function ServiceCatalog() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("dev-service");
  const [customInstructions, setCustomInstructions] = useState("");
  const [deliverySpeed, setDeliverySpeed] = useState<"standard" | "critical">("standard");
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
  const [submittedDetails, setSubmittedDetails] = useState<any>(null);

  // Calculate dynamic quote prices based on selected service and delivery priority coefficient.
  const getSelectedService = () => {
    return SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];
  };

  const calculateDynamicPrice = () => {
    const service = getSelectedService();
    // Parse baseline numbers
    const num = parseInt(service.priceRange.replace(/[^0-9]/g, ""));
    const isRetainer = service.priceRange.includes("Month");

    if (deliverySpeed === "critical") {
      const urgentPrice = Math.round(num * 1.35); // +35% urgent fee
      return isRetainer ? `$${urgentPrice} USD / Mo` : `$${urgentPrice} USD`;
    }
    return service.priceRange;
  };

  const calculateDynamicDays = () => {
    const service = getSelectedService();
    if (deliverySpeed === "critical") {
      if (service.id === "dev-service") return "9 - 13 Days // CRITICAL PRIORITY";
      if (service.id === "audio-service") return "2 - 3 Days // CRITICAL PRIORITY";
      if (service.id === "media-service") return "4 - 6 Days // CRITICAL PRIORITY";
      return "Accelerated Feed Loop";
    }
    return service.deliveryTime;
  };

  const handleCompileQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const service = getSelectedService();
    
    const details = {
      orderId: `DOM-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toLocaleDateString(),
      serviceTitle: service.title,
      price: calculateDynamicPrice(),
      delivery: calculateDynamicDays(),
      priority: deliverySpeed.toUpperCase(),
      directives: customInstructions || "Standard global specification parameters applied by default."
    };

    setSubmittedDetails(details);
    setIsOrderSubmitted(true);
  };

  const handleResetQuote = () => {
    setIsOrderSubmitted(false);
    setSubmittedDetails(null);
    setCustomInstructions("");
    setDeliverySpeed("standard");
  };

  return (
    <div id="services-anchor" className="bg-[#040714] select-none">
      
      {/* 1. SERVICES SECTION */}
      <section 
        id="services-section" 
        className="py-24 px-6 md:px-12 border-t border-[#1C64F2]/10 relative overflow-hidden"
      >
        <div className="absolute top-[10%] right-10 w-[400px] h-[400px] bg-[#10B981]/3 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 digital-grid opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="mb-16 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#00F0FF] font-mono text-xs tracking-wider mb-3">
              <Sliders className="w-4 h-4" />
              <span>CAPABILITIES DIRECT PROTOCOL // SERVICES</span>
            </div>
            <h2 className="font-display font-black text-2xl md:text-4xl text-white tracking-widest uppercase">
              On-Demand Deliverables
            </h2>
            <p className="font-sans text-sm text-[#A0AEC0] mt-3 uppercase tracking-wide max-w-xl">
              We engineer specialized high-fidelity assets custom forged to advance critical global enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="services-grid">
            {SERVICES_DATA.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -15 : 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-lg border border-[#1C64F2]/20 hover:border-[#10B981] bg-[#080B1C]/50 relative flex flex-col justify-between hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all overflow-hidden panel-glow group"
                id={`service-${service.id}`}
              >
                <div>
                  <div className="flex justify-between items-start border-b border-[#1C64F2]/10 pb-4 mb-5">
                    <div>
                      <h3 className="font-display text-sm md:text-base text-white font-bold tracking-wide uppercase group-hover:text-[#10B981] transition-colors">
                        {service.title}
                      </h3>
                      <span className="font-mono text-[9px] text-[#A0AEC0] uppercase tracking-widest mt-1 block">
                        {service.subtitle}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-mono text-emerald-400 bg-emerald-500/5 px-2.5 py-1 border border-emerald-500/25 rounded select-none">
                      DELIVERABLE_ID: 0{idx + 1}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-[#A0AEC0] uppercase leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="flex flex-col gap-2.5 mb-6">
                    {service.deliverables.map((item, i) => (
                      <div key={i} className="flex gap-2.5 text-start items-center">
                        <ChevronRight className="w-3.5 h-3.5 text-[#1C64F2]" />
                        <span className="font-sans text-xs text-white uppercase tracking-wide">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center border-t border-[#1C64F2]/10 pt-4 mt-2 justify-between gap-3 text-start">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span className="font-mono text-[10px] text-[#A0AEC0] uppercase">SPEED: {service.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Coins className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-mono text-[10px] text-white uppercase font-black uppercase">FEE: {service.priceRange}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. PRICING CATALOG & COMPILE CUSTOM ORDER INQUIRY */}
      <section 
        id="pricing-section" 
        className="py-24 px-6 md:px-12 border-t border-[#1C64F2]/10 relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#1C64F2]/4 blur-[110px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 digital-grid opacity-40 pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          
          <div className="mb-14 text-center">
            <div className="flex items-center justify-center gap-2 text-[#00F0FF] font-mono text-xs tracking-wider mb-2">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>CUSTOM CONTRACT COMPILING LAYER // PRICING</span>
            </div>
            <h2 className="font-display font-black text-2xl md:text-3xl text-white tracking-widest uppercase">
              Custom Quote Calculator
            </h2>
            <p className="font-sans text-xs text-[#A0AEC0] mt-3 uppercase tracking-wide max-w-lg mx-auto">
              Choose your project core, tweak execution speeds, specify parameters, and instantly compile a secure contract quotation statement list.
            </p>
          </div>

          <div className="p-8 rounded-lg border border-[#1C64F2]/30 bg-[#080B1C]/90 shadow-[0_0_20px_rgba(28,100,242,0.1)] relative overflow-hidden hover:border-[#00F0FF]/60 transition-all panel-glow">
            
            <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-[#A0AEC0] tracking-widest border-b border-l border-[#1C64F2]/20 bg-black/40 rounded-bl uppercase">
              QUOTE ENGINE
            </div>

            <AnimatePresence mode="wait">
              {!isOrderSubmitted ? (
                <motion.form 
                  key="calculator-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleCompileQuote} 
                  className="flex flex-col gap-6 text-start"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Service Type Selection */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] text-white uppercase tracking-wider">
                        Select CORE PROJECT TYPE
                      </label>
                      <select
                        value={selectedServiceId}
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                        className="bg-[#040714] border border-[#1C64F2]/35 focus:border-[#00F0FF] text-white text-xs px-3 py-2.5 font-display font-bold uppercase rounded outline-none cursor-pointer"
                      >
                        {SERVICES_DATA.map(s => (
                          <option key={s.id} value={s.id}>
                            {s.title.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Delivery Cycle Priority */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] text-white uppercase tracking-wider">
                        DELIVERY CYCLE SPEED INDEX
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setDeliverySpeed("standard")}
                          className={`py-2 px-3 text-center border font-display text-[10px] tracking-widest rounded transition-all uppercase cursor-pointer ${deliverySpeed === "standard" ? "border-[#00F0FF] bg-[#00F0FF]/10 text-white font-bold" : "border-[#1C64F2]/20 text-[#A0AEC0] hover:border-[#1C64F2]"}`}
                        >
                          STANDARD TIMELINE
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliverySpeed("critical")}
                          className={`py-2 px-3 text-center border font-display text-[10px] tracking-widest rounded transition-all uppercase cursor-pointer ${deliverySpeed === "critical" ? "border-amber-400 bg-amber-400/10 text-white font-bold block" : "border-[#1C64F2]/20 text-[#A0AEC0] hover:border-[#1C64F2]"}`}
                        >
                          CRITICAL PRIORITY (+35%)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Special parameters text-area */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] text-white uppercase tracking-wider">
                      SPECULATIVE DESIGN DIRECTIVES
                    </label>
                    <textarea
                      placeholder="ENTER HIGH SPECIFICATION SCOPE OUTLINE FOR OUR ENGINEERING TEAM..."
                      value={customInstructions}
                      onChange={(e) => setCustomInstructions(e.target.value)}
                      rows={3}
                      className="bg-[#040714] border border-[#1C64F2]/30 focus:border-[#00F0FF] rounded text-white p-3 font-sans text-xs outline-none w-full"
                    />
                  </div>

                  {/* Realtime estimation ledger block */}
                  <div className="bg-black/60 p-4 rounded border border-[#1C64F2]/15 flex items-center justify-between gap-5 font-mono">
                    <div className="text-left flex flex-col gap-1">
                      <span className="text-[9.5px] text-[#A0AEC0] uppercase">PROJECT COMPRESS TIME</span>
                      <span className="text-white text-xs font-bold uppercase">{calculateDynamicDays()}</span>
                    </div>
                    <div className="text-right flex flex-col gap-1">
                      <span className="text-[9.5px] text-[#A0AEC0] uppercase">PROJECT QUOTE COEFFICIENT</span>
                      <span className="text-emerald-400 text-sm font-bold uppercase">{calculateDynamicPrice()}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#00F0FF] hover:bg-white text-[#040714] font-display text-xs font-black tracking-widest uppercase rounded cursor-pointer transition-colors"
                    id="btn-compile-contract"
                  >
                    COMPILE SPECIFICATION CONTRACT
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="calculator-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-4 text-center"
                >
                  <div className="w-12 h-12 rounded-full border border-[#10B981] bg-[#10B981]/10 flex items-center justify-center mx-auto mb-4 text-[#10B981]">
                    <CheckCircle className="w-6 h-6 animate-pulse" />
                  </div>
                  <h3 className="font-display text-base text-white font-bold tracking-widest uppercase">
                    Specification contract compiled securely
                  </h3>
                  <p className="font-mono text-[9px] text-emerald-400 uppercase mt-1">
                    CONTRACT CODE: {submittedDetails?.orderId} // REGISTERED ACTIVE
                  </p>

                  <div className="mt-6 bg-[#040714] p-5 rounded border border-[#1C64F2]/20 max-w-lg mx-auto text-left font-mono text-xs">
                    <div className="flex justify-between border-b border-[#1C64F2]/10 pb-2 mb-2 text-[#A0AEC0] text-[9.5px]">
                      <span>PARAMETER METRIC</span>
                      <span>SECURE RECORD</span>
                    </div>
                    <div className="flex justify-between py-1 text-white uppercase">
                      <span>Assigned core:</span>
                      <span className="font-bold text-[#00F0FF]">{submittedDetails?.serviceTitle}</span>
                    </div>
                    <div className="flex justify-between py-1 text-white">
                      <span>Speed Tier:</span>
                      <span className="font-bold text-[#10B981]">{submittedDetails?.priority}</span>
                    </div>
                    <div className="flex justify-between py-1 text-white uppercase">
                      <span>Delivery Target:</span>
                      <span>{submittedDetails?.delivery}</span>
                    </div>
                    <div className="flex justify-between py-1 text-white">
                      <span>Price Range Target:</span>
                      <span className="font-bold text-[#10B981]">{submittedDetails?.price}</span>
                    </div>
                    <div className="border-t border-[#1C64F2]/10 mt-3 pt-3">
                      <span className="text-[9.5px] text-[#A0AEC0] uppercase block mb-1">Directives Metadata:</span>
                      <p className="text-[#A0AEC0] italic truncate uppercase">{submittedDetails?.directives}</p>
                    </div>
                  </div>

                  <p className="font-sans text-[11px] text-[#A0AEC0] uppercase mt-6 max-w-sm mx-auto leading-relaxed">
                    Our team has captured your compiled specifications securely. You can lock in your project slot on our active grid or reset calculations.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                    <button
                      onClick={handleResetQuote}
                      className="px-5 py-2.5 border border-[#1C64F2]/40 hover:border-[#1C64F2] text-[#A0AEC0] hover:text-white rounded font-mono text-[10px] tracking-wide uppercase transition-colors cursor-pointer"
                    >
                      RESET ENGINE PARAMETERS
                    </button>
                    <a
                      href="https://selar.co/m/donmay-media-tech"
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="px-5 py-2.5 bg-gradient-to-r from-[#1C64F2] to-[#00F0FF] text-[#040714] font-display text-[10px] font-bold tracking-widest uppercase rounded flex items-center justify-center gap-1.5 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                    >
                      <span>RESERVE PROJECT ON SELAR</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </section>

    </div>
  );
}
