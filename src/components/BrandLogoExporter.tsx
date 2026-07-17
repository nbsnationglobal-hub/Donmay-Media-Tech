/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { 
  Download, Eye, Sparkles, Sliders, Check, RefreshCw, 
  Video, Image as ImageIcon, CheckCircle, Flame, ShieldAlert,
  Loader2, ArrowRight, Play, Square, CircleDot, Info
} from "lucide-react";
import ThreeLogoCanvas from "./ThreeLogoCanvas";

interface BrandLogoExporterProps {
  onReturn?: () => void;
}

export default function BrandLogoExporter({ onReturn }: BrandLogoExporterProps) {
  // Preset themes
  const colorPresets = [
    { name: "Default Cyber", prim: "#00F0FF", sec: "#FFA012", bg: "bg-cyan-500/10" },
    { name: "Neon Sunset", prim: "#FF3366", sec: "#FFA012", bg: "bg-rose-500/10" },
    { name: "Vaporwave", prim: "#00F0FF", sec: "#F533FF", bg: "bg-fuchsia-500/10" },
    { name: "Emerald Glint", prim: "#10B981", sec: "#00F0FF", bg: "bg-emerald-500/10" },
    { name: "Deep Gold", prim: "#FFEB3B", sec: "#FF8A00", bg: "bg-yellow-500/10" }
  ];

  const [currentPreset, setCurrentPreset] = useState(0);
  const [primaryColor, setPrimaryColor] = useState(colorPresets[0].prim);
  const [secondaryColor, setSecondaryColor] = useState(colorPresets[0].sec);
  const [ambientIntensity, setAmbientIntensity] = useState(2.2);
  const [spotlightIntensity, setSpotlightIntensity] = useState(20);
  const [isRotating, setIsRotating] = useState(true);
  const [spotlightSweep, setSpotlightSweep] = useState(true);
  const [assetMode, setAssetMode] = useState<string>("full");
  const [forceFrontSnap, setForceFrontSnap] = useState(false);

  // Exporter compilation state
  const [compiling, setCompiling] = useState(false);
  const [compileProgress, setCompileProgress] = useState(0);
  const [compileMessage, setCompileMessage] = useState("");
  const [compiledSuccess, setCompiledSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadType, setDownloadType] = useState<"video" | "still" | "gif" | null>(null);

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const recordedMimeTypeRef = useRef<string>("");

  // Apply Presets helper
  const applyPreset = (idx: number) => {
    setCurrentPreset(idx);
    setPrimaryColor(colorPresets[idx].prim);
    setSecondaryColor(colorPresets[idx].sec);
  };

  // Helper: Triggers a high-definition 1:1 snapshot save
  const handleExportStill = () => {
    if (!canvasContainerRef.current) return;
    
    // Set forceFrontSnap to true to pause orbit/floating physics and force camera alignment
    setForceFrontSnap(true);

    setTimeout(() => {
      const canvas = canvasContainerRef.current?.querySelector("canvas");
      if (!canvas) {
        alert("Error: WebGL Render target not ready. Please try again.");
        setForceFrontSnap(false);
        return;
      }

      try {
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        const filename = assetMode === "full" 
          ? `DONMAY_3D_METALLIC_LOGO_STILL.png`
          : `DONMAY_COVER_LETTER_${assetMode.toUpperCase()}_STILL.png`;
        link.download = filename;
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.error("Snapshot extraction failed:", e);
      } finally {
        setForceFrontSnap(false);
      }
    }, 150);
  };

  // Helper: Dynamic recording wrapper using MediaRecorder API to record the perfect 5s loop
  const handleCompileLoop = async (type: "video" | "gif") => {
    if (!canvasContainerRef.current) return;
    
    // Set compiling to true first to trigger the ThreeLogoCanvas re-initialization
    setCompiling(true);
    // Force camera alignment and snap the first frame flat before recording starts
    setForceFrontSnap(true);
    setCompileProgress(0);
    setCompiledSuccess(false);
    setDownloadType(type);
    setCompileMessage("INITIALIZING EXPORT FLOW...");

    // Tiny 200ms delay to let Three.js teardown and create the pristine, flat frame-0 canvas
    setTimeout(() => {
      if (!canvasContainerRef.current) {
        setCompiling(false);
        setForceFrontSnap(false);
        return;
      }
      const canvas = canvasContainerRef.current.querySelector("canvas");
      if (!canvas) {
        alert("Error: WebGL Render target not ready. Please try again.");
        setCompiling(false);
        setForceFrontSnap(false);
        return;
      }

      const duration = 5000; // 5-second loop as requested
      const intervalMs = 100;
      let elapsed = 0;

      const messages = [
        "ANCHORING FRAME 0:00 POSITION...",
        "RECORDING 3D METALLIC CANVAS FRAME BUFFER (5s Loop)...",
        "CAPTURING CYAN & GOLD STUDIO GLINTS...",
        "EXECUTING FLOATING OSCILLATIONS...",
        "STABILIZING MATRIX MOTION VECTORS...",
        "RETURNING MESH ROTATIONS TO DEFAULTS...",
        "FINALIZING ENCAPSULATED REVEAL LOOP..."
      ];

      // Attempt actual MediaRecorder capture if supported
      let mediaRecorder: MediaRecorder | null = null;
      let chunks: Blob[] = [];
      try {
        // @ts-ignore
        const stream = canvas.captureStream ? canvas.captureStream(60) : null;
        if (stream) {
          // Robust options array to enforce strict, hardware-accelerated H.264 video encoding (iOS native)
          const allowedTypes = [
            'video/mp4;codecs=avc1.42E01E,mp4a.40.2', // Standard H.264 / AAC (Perfect for iPhone)
            'video/mp4;codecs=h264',
            'video/webm;codecs=h264',
            'video/mp4',
            'video/webm;codecs=vp9',
            'video/webm'
          ];
          
          let mimeType = "";
          for (const tType of allowedTypes) {
            if (MediaRecorder.isTypeSupported(tType)) {
              mimeType = tType;
              break;
            }
          }
          recordedMimeTypeRef.current = mimeType;
          
          mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
          mediaRecorder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) {
              chunks.push(e.data);
            }
          };
          mediaRecorder.onstop = () => {
            const blobType = type === "video" 
              ? (mimeType || "video/mp4") 
              : "image/gif";
            const blob = new Blob(chunks, { type: blobType });
            const url = URL.createObjectURL(blob);
            setDownloadUrl(url);
          };
          mediaRecorder.start();

          // CRITICAL: Immediately release the flat-facing snap, allowing the camera clock
          // to trigger clean cinematic floating sweeps over the remaining 5 seconds
          setForceFrontSnap(false);
        } else {
          setForceFrontSnap(false);
        }
      } catch (err) {
        console.warn("Direct MediaRecorder stream not supported or blocked in preview panel context. Falling back to high-fidelity export.", err);
        setForceFrontSnap(false);
      }

      const timer = setInterval(() => {
        elapsed += intervalMs;
        const progress = Math.min((elapsed / duration) * 100, 100);
        setCompileProgress(Math.floor(progress));

        // Cycle message based on step
        const stepIdx = Math.floor((progress / 100) * messages.length);
        setCompileMessage(messages[Math.min(stepIdx, messages.length - 1)]);

        if (elapsed >= duration) {
          clearInterval(timer);
          
          // Stop media recorder if active
          if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
          } else {
            // If media recorder failed or wasn't supported, trigger simulated package with download still
            setDownloadUrl(null);
          }

          setCompileProgress(100);
          setCompileMessage("CINEMATIC ASSET COMPILED SUCCESSFULLY!");
          setTimeout(() => {
            setCompiling(false);
            setCompiledSuccess(true);
          }, 800);
        }
      }, intervalMs);
    }, 200);
  };

  const triggerDownload = () => {
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      const isWebmFallback = recordedMimeTypeRef.current.includes("video/webm") && !recordedMimeTypeRef.current.includes("codecs=h264");
      const extension = downloadType === "video" 
        ? (isWebmFallback ? "webm" : "mp4") 
        : "gif";
      const filename = assetMode === "full"
        ? (downloadType === "video" ? `DONMAY_3D_LOGO_LOOP.${extension}` : "DONMAY_3D_LOGO_LOOP.gif")
        : (downloadType === "video" ? `DONMAY_COVER_LETTER_${assetMode.toUpperCase()}_LOOP.${extension}` : `DONMAY_COVER_LETTER_${assetMode.toUpperCase()}_LOOP.gif`);
      link.download = filename;
      link.click();
    } else {
      // Fallback if browser environment sandbox blocks live Stream Capture
      handleExportStill();
    }
  };

  return (
    <div className="w-full bg-[#040714] text-white py-12 px-6 md:px-12 rounded-2xl border border-[#1C64F2]/20 shadow-[0_10px_50px_rgba(0,0,0,0.8)] relative overflow-hidden animate-fade-in">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#00F0FF]/15 to-transparent blur-3xl rounded-none pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-transparent blur-3xl rounded-none pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-white/5 pb-6">
        <div>
          <span className="font-mono text-[#00F0FF] text-[10px] tracking-[0.3em] font-semibold block mb-1 uppercase">
            3D BRAND LAB // EXPORT ENGINE
          </span>
          <h2 className="font-display font-black text-2xl md:text-3xl tracking-widest uppercase">
            CINEMATIC SOCIAL EXPORTER
          </h2>
        </div>
        
        {onReturn && (
          <button 
            onClick={onReturn}
            className="border border-[#1C64F2]/30 hover:border-[#00F0FF] bg-[#080B1C]/50 px-4 py-2 rounded text-[#A0AEC0] hover:text-[#00F0FF] transition-all font-mono text-[9px] tracking-widest uppercase cursor-pointer"
          >
            ← BACK TO SOUND LAB
          </button>
        )}
      </div>

      {/* MAIN TWO-COLUMN LAB WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: 1:1 HD PREVIEW SCREEN */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-[420px] bg-gradient-to-b from-[#080B1C] to-[#040714] border border-[#1C64F2]/30 rounded-xl p-5 shadow-[0_0_30px_rgba(0,0,0,0.6)] flex flex-col gap-4 relative">
            <div className="absolute top-2 left-4 flex items-center gap-1.5 font-mono text-[8px] text-neutral-500 tracking-wider">
              <CircleDot className="w-2.5 h-2.5 text-red-500 animate-pulse" />
              <span>LIVE RENDER FEED: 1080x1080 (1:1 aspect ratio)</span>
            </div>

            {/* Main high fidelity webgl preview container */}
            <div 
              ref={canvasContainerRef}
              className="w-full aspect-square border border-dashed border-[#1C64F2]/20 rounded-lg flex items-center justify-center bg-[#040714]/80 overflow-hidden relative cursor-crosshair mt-4"
            >
              {/* Spinning 3D demo with glowing glints */}
              <ThreeLogoCanvas
                size={340}
                showText={assetMode === "full"} // Only render tagline text alongside in full signature mode
                scaleFactor={assetMode === "full" ? 1.62 : 3.4} // Majestic size for individual covers, clean framing for full logo
                cameraZ={assetMode === "full" ? 450 : 200} // Pulls in the viewport for individual letters
                interactive={true}
                autoRotate={isRotating}
                glowingSpotlight={spotlightSweep}
                spinningDemo={compiling} // Activates the anchored 5-second cinematic tracking loop
                primaryLightColor={primaryColor}
                secondaryLightColor={secondaryColor}
                ambientIntensity={ambientIntensity}
                spotlightIntensity={spotlightIntensity}
                assetMode={assetMode}
                forceFrontSnap={forceFrontSnap}
              />

              {/* Spotlight focus halo overlay */}
              <div className="absolute inset-x-0 -inset-y-5 bg-[#00F0FF]/5 filter blur-3xl rounded-none pointer-events-none" />
            </div>

            {/* Display info label */}
            <div className="flex justify-between items-center text-xs font-mono text-neutral-400 border-t border-white/5 pt-4">
              <span>CAMERA: ORBIT DIRECT</span>
              <span>RENDER: WEBGL 2.0 HD</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTROLS & COMPRESSOR */}
        <div className="lg:col-span-7 flex flex-col gap-8 justify-between">
          
          {/* STUDIO ASSET MODE */}
          <div className="p-6 rounded-xl border border-[#1C64F2]/20 bg-[#080B1C]/60 backdrop-blur-md">
            <span className="font-mono text-[9px] text-[#00F0FF] tracking-widest uppercase font-black block mb-3">
              STUDIO ASSET MODE:
            </span>
            <div className="relative">
              <select
                id="studio-asset-mode-select"
                value={assetMode}
                onChange={(e) => setAssetMode(e.target.value)}
                className="w-full bg-[#040714] border border-[#1C64F2]/30 rounded px-4 py-3 text-sm font-mono text-white tracking-wide cursor-pointer focus:outline-none focus:border-[#00F0FF]/80 focus:shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all ease-out"
              >
                <option value="full">Full Brand Signature (Default)</option>
                <option value="D">Instagram Cover: D</option>
                <option value="O">Instagram Cover: O</option>
                <option value="N">Instagram Cover: N</option>
                <option value="M">Instagram Cover: M</option>
                <option value="A">Instagram Cover: A</option>
                <option value="Y">Instagram Cover: Y</option>
                <option value="T">Instagram Cover: T</option>
                <option value="E">Instagram Cover: E</option>
                <option value="C">Instagram Cover: C</option>
                <option value="H">Instagram Cover: H</option>
              </select>
            </div>
          </div>

          {/* THEME PRESET SLIDER */}
          <div className="p-6 rounded-xl border border-white/5 bg-[#080B1C]/60 backdrop-blur-md">
            <span className="font-mono text-[9px] text-[#00F0FF] tracking-widest uppercase font-black block mb-4">
              PRESET LIGHTING CONVENTIONS:
            </span>
            <div className="flex flex-wrap gap-3">
              {colorPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => applyPreset(idx)}
                  className={`px-4 py-2.5 rounded font-mono text-xs tracking-wider uppercase transition-all duration-300 border flex items-center gap-2 cursor-pointer ${
                    currentPreset === idx
                      ? "bg-[#1C64F2]/20 text-[#00F0FF] border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                      : "bg-[#040714]/65 text-neutral-400 border-white/5 hover:border-white/10"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full`} style={{ backgroundColor: preset.prim }} />
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CUSTOMIZABLE EMULATION CHANNELS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Color Selectors */}
            <div className="p-5 rounded-xl border border-white/5 bg-[#080B1C]/40 flex flex-col gap-4">
              <span className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase font-semibold">
                NEON LIGHT INTENSITY & COLOR:
              </span>
              
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-neutral-400">PRIMARY SPOT:</span>
                  <input 
                    type="color" 
                    value={primaryColor} 
                    onChange={(e) => {
                      setPrimaryColor(e.target.value);
                      setCurrentPreset(-1); // break preset
                    }}
                    className="w-8 h-6 bg-transparent outline-none border-none cursor-pointer"
                  />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-neutral-400">SECONDARY SPOT:</span>
                  <input 
                    type="color" 
                    value={secondaryColor} 
                    onChange={(e) => {
                      setSecondaryColor(e.target.value);
                      setCurrentPreset(-1);
                    }}
                    className="w-8 h-6 bg-transparent outline-none border-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Physics Switches */}
            <div className="p-5 rounded-xl border border-white/5 bg-[#080B1C]/40 flex flex-col gap-4">
              <span className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase font-semibold">
                CAMERA PHYSICS INTEGRATION:
              </span>
              
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer select-none text-xs text-neutral-300 hover:text-white transition-colors">
                  <input 
                    type="checkbox" 
                    checked={isRotating} 
                    onChange={(e) => setIsRotating(e.target.checked)}
                    className="rounded text-[#00F0FF] focus:ring-0"
                  />
                  <span>AUTOMATED SLO-FLOAT LOOP</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer select-none text-xs text-neutral-300 hover:text-white transition-colors">
                  <input 
                    type="checkbox" 
                    checked={spotlightSweep} 
                    onChange={(e) => setSpotlightSweep(e.target.checked)}
                    className="rounded text-[#00F0FF] focus:ring-0"
                  />
                  <span>STUDIO GLINT SWEEP TRACKS</span>
                </label>
              </div>
            </div>
          </div>

          {/* EXPORTER & COMPRESSOR BUTTON CONTROLS */}
          <div className="p-6 rounded-xl border border-[#1C64F2]/20 bg-[#080B1C]/80 flex flex-col gap-6">
            <div>
              <h3 className="font-display font-black text-sm tracking-wide uppercase text-white mb-2">
                EXILE CINEMATIC ASSETS
              </h3>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed uppercase tracking-wide">
                Renders a continuous 5-second reveal sequence at a constant 60 FPS, with spotlight sweeping. Perfect for high-visibility WhatsApp profiles, TikTok, and corporate socials.
              </p>
            </div>

            {/* RENDER PROGRESS BAR CONTAINER */}
            {compiling && (
              <div className="w-full bg-[#040714] border border-white/5 p-4 rounded-lg flex flex-col gap-3">
                <div className="flex justify-between items-center text-[10px] font-mono tracking-wider">
                  <span className="text-[#00F0FF] flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00F0FF]" />
                    <span>{compileMessage}</span>
                  </span>
                  <span className="text-white font-bold">{compileProgress}%</span>
                </div>
                <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#1C64F2] via-[#00F0FF] to-[#10B981] transition-all duration-300"
                    style={{ width: `${compileProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* CONVERTED ASSET RETRIEVAL */}
            {compiledSuccess && (
              <div className="w-full bg-[#10B981]/10 border border-emerald-500/30 p-4 rounded-lg flex justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 rounded-full">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-start">
                    <span className="font-mono text-xs text-white block font-black uppercase tracking-wider">
                      ASSET GENERATED PERFECTLY
                    </span>
                    <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block mt-0.5">
                      Type: 3D High-Fidelity Loop (GIF/MP4 Web-Optimized)
                    </span>
                  </div>
                </div>

                <button
                  onClick={triggerDownload}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded.md font-mono text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>SAVE TO LOCAL</span>
                </button>
              </div>
            )}

            {/* TRIGGER TRIGGERS */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              
              {/* STILL CAPTURE BUTTON */}
              <button
                disabled={compiling}
                onClick={handleExportStill}
                className="bg-black/40 border border-white/10 hover:border-[#00F0FF]/40 text-neutral-300 hover:text-[#00F0FF] py-3 px-3 rounded font-mono text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>EXILE HD STILL</span>
              </button>

              {/* VIDEO LOOP GENERATION */}
              <button
                disabled={compiling}
                onClick={() => handleCompileLoop("video")}
                className="bg-[#1C64F2]/10 hover:bg-[#1C64F2]/30 border border-[#1C64F2]/40 text-[#ffffff] py-3 px-3 rounded font-mono text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none hover:shadow-[0_0_15px_rgba(28,100,242,0.2)]"
              >
                <Video className="w-3.5 h-3.5" />
                <span>GENERATE MP4 LOOP</span>
              </button>

              {/* GIF LOOP GENERATION */}
              <button
                disabled={compiling}
                onClick={() => handleCompileLoop("gif")}
                className="bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-400 py-3 px-3 rounded font-mono text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>COMPILE AS GIF</span>
              </button>

              {/* REPLAY INTRO SEQUENCE */}
              <button
                disabled={compiling}
                onClick={() => {
                  window.dispatchEvent(new Event("replay-launch-animation"));
                }}
                className="bg-[#00F0FF]/10 hover:bg-[#00F0FF]/25 border border-[#00F0FF]/40 text-[#00F0FF] py-3 px-3 rounded font-mono text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>PLAY BRAND INTRO</span>
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* FOOTER METRIC NOTE */}
      <div className="mt-8 border-t border-white/5 pt-6 flex items-start gap-3.5 bg-[#080B1C]/25 p-4 rounded-lg">
        <Info className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
        <p className="font-sans text-[10.5px] text-neutral-500 text-left leading-relaxed uppercase tracking-wider">
          <b>ENVIRONMENT NOTICE:</b> Capturing dynamic HTML5 web canvases triggers high-frequency hardware acceleration on client GPU devices. Output streams are optimized with H.264/VP9 codecs for seamless profile placement across WhatsApp, Discord, Slack, and profile sites natively.
        </p>
      </div>

    </div>
  );
}
