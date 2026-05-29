/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, Send, ArrowRight, CheckCircle2, ShieldAlert, Upload, Terminal } from "lucide-react";

export default function ContactCanvas() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<{name: string; size: string}[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
      });
      setAttachedFiles([]);
    }, 1200);
  };

  return (
    <section 
      id="contact-section" 
      className="py-24 px-6 md:px-12 border-t border-[#1C64F2]/10 bg-[#040714] relative overflow-hidden select-none"
    >
      {/* Mesh and radial gradient background overlays */}
      <div className="absolute inset-0 digital-grid opacity-35 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[450px] h-[450px] bg-[#00F0FF]/3 blur-[110px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ================ LEFT COLUMN: BRAND DIRECTORIES ================ */}
          <div className="lg:col-span-5 flex flex-col text-start justify-between min-h-full">
            <div>
              <span className="font-mono text-[10px] text-[#00F0FF] tracking-[0.25em] block mb-2 uppercase font-black">
                SECURE ENDPOINT DISPATCH // CONTACT
              </span>
              <h2 className="font-display font-black text-3xl md:text-4xl text-white tracking-widest uppercase mb-6">
                Initialize Connection
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#A0AEC0] uppercase leading-relaxed max-w-md tracking-wide mb-12">
                Have a project architecture in mind or looking to secure a platform subscription? Let us deploy the future together. Let our engineers answer your specifications.
              </p>
            </div>

            <div className="flex flex-col gap-6 pt-6 border-t border-[#1C64F2]/15">
              
              {/* Email support */}
              <div className="flex items-center gap-4 bg-[#080B1C]/60 p-4 border border-[#1C64F2]/15 rounded hover:border-[#00F0FF]/40 transition-colors">
                <div className="p-2.5 bg-[#1C64F2]/10 border border-[#1C64F2]/20 text-[#00F0FF] rounded">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[8px] text-[#A0AEC0] uppercase tracking-wider block">
                    EMAIL US PROTOCOL
                  </span>
                  <a 
                    href="mailto:donmaymediaandtech@gmail.com" 
                    className="font-sans text-xs sm:text-sm font-bold text-white hover:text-[#00F0FF] transition-colors block mt-0.5"
                  >
                    donmaymediaandtech@gmail.com
                  </a>
                </div>
              </div>

              {/* Call support */}
              <div className="flex items-center gap-4 bg-[#080B1C]/60 p-4 border border-[#1C64F2]/15 rounded hover:border-[#10B981]/40 transition-colors">
                <div className="p-2.5 bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] rounded">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[8px] text-[#A0AEC0] uppercase tracking-wider block">
                    TELEPHONIC CALL GATEWAY
                  </span>
                  <a 
                    href="tel:+2348133005835" 
                    className="font-sans text-xs sm:text-sm font-bold text-white hover:text-emerald-400 transition-colors block mt-0.5"
                  >
                    +234 813 300 5835
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* ================ RIGHT COLUMN: DARK MODE FORM CONTAINER ================ */}
          <div className="lg:col-span-7 w-full">
            <div className="p-8 rounded-lg border border-[#1C64F2]/20 bg-black/95 relative shadow-[0_0_35px_rgba(28,100,242,0.06)] hover:border-[#1C64F2]/35 transition-all overflow-hidden">
              <span className="absolute top-0 right-0 py-1.5 px-3 font-mono text-[7.5px] text-[#A0AEC0] tracking-widest border-b border-l border-[#1C64F2]/15 bg-black/50 rounded-bl uppercase font-bold">
                ENCRYPTED INPUT MATRIX
              </span>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="contact-form-node"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="flex flex-col gap-5 text-start pt-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* First Name Input */}
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[9px] text-[#A0AEC0] uppercase tracking-wider">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="e.g. Kelvin"
                          className="font-sans text-xs bg-[#040714] border border-[#1C64F2]/30 focus:border-[#00F0FF] outline-none text-white px-3.5 py-3 rounded uppercase focus:ring-1 focus:ring-[#00F0FF]/25"
                        />
                      </div>

                      {/* Last Name Input */}
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[9px] text-[#A0AEC0] uppercase tracking-wider">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="e.g. Johnson"
                          className="font-sans text-xs bg-[#040714] border border-[#1C64F2]/30 focus:border-[#00F0FF] outline-none text-white px-3.5 py-3 rounded uppercase focus:ring-1 focus:ring-[#00F0FF]/25"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Email Address Input */}
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[9px] text-[#A0AEC0] uppercase tracking-wider">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. caller@domain.com"
                          className="font-sans text-xs bg-[#040714] border border-[#1C64F2]/30 focus:border-[#00F0FF] outline-none text-white px-3.5 py-3 rounded uppercase focus:ring-1 focus:ring-[#00F0FF]/25"
                        />
                      </div>

                      {/* Subject Input */}
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[9px] text-[#A0AEC0] uppercase tracking-wider">
                          Subject Parameter
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="e.g. Platform Subscription"
                          className="font-sans text-xs bg-[#040714] border border-[#1C64F2]/30 focus:border-[#00F0FF] outline-none text-white px-3.5 py-3 rounded uppercase focus:ring-1 focus:ring-[#00F0FF]/25"
                        />
                      </div>
                    </div>

                    {/* Mandated side-by-side description & drag-and-drop layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      
                      {/* Left Field: Narrative Description */}
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[9px] text-[#00F0FF] font-black uppercase tracking-wider flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Describe what you want us to do for your project *</span>
                        </label>
                        <textarea
                          required
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={6}
                          placeholder="SPELLS OUT CORE SPECS AND DESIRED PARAMETERS HERE..."
                          className="font-mono text-xs bg-[#040714] border border-[#1C64F2]/30 focus:border-[#00F0FF] outline-none text-white px-3.5 py-3 rounded uppercase focus:ring-1 focus:ring-[#00F0FF]/25 resize-none leading-relaxed h-full min-h-[140px]"
                        />
                      </div>

                      {/* Right Field: Secure Drag and Drop */}
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[9px] text-[#00F0FF] font-black uppercase tracking-wider flex items-center gap-1.5">
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
                                size: (f.size / (1024 * 1024)).toFixed(2) + " MB"
                              }));
                              setAttachedFiles(prev => [...prev, ...filesList]);
                            }
                          }}
                          className={`group relative flex-1 min-h-[140px] border border-dashed rounded p-4 flex flex-col justify-center items-center text-center transition-all cursor-pointer ${dragActive ? "border-[#00F0FF] bg-[#00F0FF]/5" : "border-[#1C64F2]/20 hover:border-[#00F0FF]/30 bg-[#040714]"}`}
                        >
                          <input 
                            type="file" 
                            multiple 
                            onChange={(e) => {
                              if (e.target.files) {
                                const filesList = Array.from(e.target.files).map((f: any) => ({
                                  name: f.name,
                                  size: (f.size / (1024 * 1024)).toFixed(2) + " MB"
                                }));
                                setAttachedFiles(prev => [...prev, ...filesList]);
                              }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                          />
                          <div className="flex flex-col items-center gap-1 pointer-events-none">
                            <Upload className="w-6 h-6 text-[#A0AEC0] group-hover:text-[#00F0FF] transition-colors mb-1" />
                            <span className="font-mono text-[8px] text-[#A0AEC0] uppercase tracking-wider group-hover:text-white px-2">
                              Drag &amp; Drop or click to attach image, logotype, videos or reference layouts
                            </span>
                          </div>
                        </div>

                        {/* File list feedback row */}
                        {attachedFiles.length > 0 && (
                          <div className="mt-1 bg-[#040714] border border-[#1C64F2]/10 p-2 rounded max-h-[75px] overflow-y-auto space-y-1 text-[8px] font-mono">
                            <div className="flex justify-between items-center text-[#A0AEC0] border-b border-[#1C64F2]/10 pb-0.5 mb-1 font-bold">
                              <span>FILES ATTACHED ({attachedFiles.length})</span>
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
                                <span className="truncate max-w-[150px] text-emerald-400">{file.name}</span>
                                <span className="text-white/60 font-semibold">{file.size}</span>
                              </div>
                            ))}
                          </div>
                        )}

                      </div>

                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full mt-2 py-4 bg-[#00F0FF] hover:bg-[#1C64F2] text-[#040714] hover:text-white font-display font-black text-xs tracking-[0.25em] rounded transition-all duration-300 uppercase cursor-pointer flex items-center justify-center gap-2 group hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] block disabled:opacity-50"
                    >
                      <span>{submitting ? "SENDING STATEMENT..." : "SEND MESSAGE"}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="thank-you-node"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center flex flex-col items-center justify-center gap-4"
                  >
                    <div className="w-14 h-14 bg-[#10B981]/10 border border-[#10B981] rounded-full flex items-center justify-center text-[#10B981] mb-2 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-white uppercase tracking-widest">
                      DISPATCH SUCCESSFULLY FILED
                    </h3>
                    <p className="font-sans text-xs text-[#A0AEC0] uppercase max-w-sm leading-relaxed mb-6">
                      Your query packets have been compiled and routed directly to our developer team. We will review your build parameters within 24 standard business hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 border border-[#1C64F2]/30 text-white hover:text-[#00F0FF] hover:border-[#00F0FF] transition-all font-mono text-[9px] tracking-widest uppercase rounded cursor-pointer"
                    >
                      TRANSMIT NEW DISPATCH
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
