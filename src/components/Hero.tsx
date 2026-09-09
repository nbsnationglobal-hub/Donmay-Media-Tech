/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Smartphone, 
  ArrowRight,
  Maximize2,
  X,
  Sparkles
} from "lucide-react";

import founderAtWork from "../assets/images/Founder.jpg";
import jubileeFlyer from "../assets/images/jubilee_50th_flyer_1788666936232.png";
import moniepointScreenshot from "../assets/images/moniepoint_mockup_1788734262925.jpg";
import brightsolarFlyer from "../assets/images/brightsolar_flyer_1788666962712.jpg";

interface HeroProps {
  onGetQuote?: () => void;
  onExploreServices?: () => void;
  onExploreApps?: () => void;
  onOrderCustomBuild?: () => void;
}

interface CarouselSlide {
  id: string;
  image: string;
  tag: string;
  caption: string;
  subcaption: string;
}

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: "founder-work",
    image: founderAtWork,
    tag: "AGENCY STUDIO // CRAFTSMANSHIP",
    caption: "Founder at work — engineering custom web platforms & visual direction",
    subcaption: "Precision delivery across code, high-retention media, and branding systems."
  },
  {
    id: "jubilee-flyer",
    image: jubileeFlyer,
    tag: "MILESTONE CELEBRATIONS",
    caption: "Church celebration flyer — 50th Jubilee",
    subcaption: "High-contrast royal print vector with metallic gold accents."
  },
  {
    id: "moniepoint-site",
    image: moniepointScreenshot,
    tag: "FINTECH & PLATFORM ARCHITECTURE",
    caption: "Moniepoint site screenshot — Agency banking & merchant platform",
    subcaption: "Clean, responsive financial dashboard with real-time settlement telemetry."
  },
  {
    id: "brightsolar-flyer",
    image: brightsolarFlyer,
    tag: "BUSINESS & MARKETING CAMPAIGNS",
    caption: "Client work — BrightSolar Solutions, event flyer",
    subcaption: "Lead-generating solar workshop campaign asset designed for high conversion."
  }
];

export default function Hero({ 
  onGetQuote, 
  onExploreServices,
  onExploreApps, 
  onOrderCustomBuild 
}: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<CarouselSlide | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  // Auto-advance carousel every 6s when not paused
  useEffect(() => {
    if (!isAutoPlaying) return;
    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 6000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, currentIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleQuoteClick = () => {
    if (onGetQuote) {
      onGetQuote();
    } else if (onOrderCustomBuild) {
      onOrderCustomBuild();
    }
  };

  return (
    <section
      id="hero-section"
      className="relative flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden bg-[#040714]"
    >
      {/* Background Subtle Digital Mesh & Ambient Radial Blurs */}
      <div className="absolute inset-0 digital-grid opacity-75 pointer-events-none" />
      <div className="absolute top-[20%] left-1/4 -translate-y-1/2 -translate-x-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-[#1C64F2]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-1/4 -translate-y-1/2 translate-x-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#8B5CF6]/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#00F0FF]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Decorative lateral border lines */}
      <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#1C64F2]/15 to-transparent hidden lg:block" />
      <div className="absolute right-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#1C64F2]/15 to-transparent hidden lg:block" />

      <div className="relative max-w-5xl mx-auto px-6 text-center flex flex-col items-center z-10 w-full">
        
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080B1C]/90 border border-[#1C64F2]/30 text-[#00F0FF] text-[10px] sm:text-xs font-mono tracking-widest mb-6 shadow-[0_0_15px_rgba(0,240,255,0.12)]"
        >
          <span className="w-2 h-2 bg-[#00F0FF] rounded-full animate-ping" />
          <span>AGENCY &amp; TECHNOLOGY STUDIO // NIGERIA &amp; GLOBAL</span>
        </motion.div>

        {/* Benefit-first Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] uppercase max-w-4xl"
        >
          Websites, Social Media, and Design That Make Your Business{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-purple-300 to-[#F59E0B]">
            Look Credible
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-sm sm:text-base md:text-lg text-[#A0AEC0] mt-6 max-w-2xl leading-relaxed"
        >
          We build professional websites, manage social media, and create graphic design that helps your business stay visible and grow.
        </motion.p>

        {/* Primary and Secondary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center items-center px-4"
        >
          {/* Primary: Get a Custom Quote */}
          <button
            onClick={handleQuoteClick}
            id="btn-hero-quote"
            className="w-full sm:w-auto px-8 py-4 font-mono text-xs sm:text-sm font-bold tracking-widest text-[#040714] bg-gradient-to-r from-[#00F0FF] via-[#1C64F2] to-[#8B5CF6] hover:brightness-110 rounded transition-all shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] flex items-center justify-center gap-2.5 cursor-pointer uppercase group"
          >
            <span>Get a Custom Quote</span>
            <ArrowRight className="w-4 h-4 text-[#040714] group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary: Explore Services */}
          {onExploreServices && (
            <button
              onClick={onExploreServices}
              id="btn-hero-services"
              className="w-full sm:w-auto px-7 py-4 font-mono text-xs sm:text-sm tracking-widest text-white bg-[#080B1C]/80 border border-[#1C64F2]/40 hover:border-[#00F0FF] hover:text-[#00F0FF] rounded transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] flex items-center justify-center gap-2 cursor-pointer uppercase"
            >
              <span>Explore Services</span>
            </button>
          )}
        </motion.div>

        {/* SWIPEABLE / DRAGGABLE IMAGE CAROUSEL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-4xl mt-12 relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Carousel Frame Container */}
          <div className="relative rounded-xl border border-[#1C64F2]/30 bg-[#080B1C]/85 shadow-[0_0_40px_rgba(28,100,242,0.12)] p-3 sm:p-4 overflow-hidden backdrop-blur-md">
            
            {/* Top Bar with Slide Counter & Category Tag */}
            <div className="flex justify-between items-center px-2 pb-3 mb-2 border-b border-[#1C64F2]/15">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                <span className="font-mono text-[9px] sm:text-[10px] text-[#00F0FF] tracking-widest uppercase font-bold">
                  {CAROUSEL_SLIDES[currentIndex].tag}
                </span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] text-[#A0AEC0]">
                <span className="hidden sm:inline text-[9px] text-[#A0AEC0]/70 uppercase">
                  Swipe / Drag to Navigate
                </span>
                <span className="px-2 py-0.5 rounded bg-black/50 border border-white/10 text-white font-bold">
                  0{currentIndex + 1} / 0{CAROUSEL_SLIDES.length}
                </span>
              </div>
            </div>

            {/* Draggable Slide Viewer with Smooth Swipe Animation */}
            <div className="relative aspect-[16/9] sm:aspect-[16/9] w-full rounded-lg overflow-hidden bg-black/70 border border-white/5 select-none touch-pan-y">
              <AnimatePresence mode="wait">
                <motion.div
                  key={CAROUSEL_SLIDES[currentIndex].id}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(_e, info) => {
                    if (info.offset.x < -40 || info.velocity.x < -300) {
                      handleNext();
                    } else if (info.offset.x > 40 || info.velocity.x > 300) {
                      handlePrev();
                    }
                  }}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full h-full relative cursor-grab active:cursor-grabbing group"
                >
                  <img
                    src={CAROUSEL_SLIDES[currentIndex].image}
                    alt={CAROUSEL_SLIDES[currentIndex].caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center pointer-events-none"
                  />

                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Expand to Lightbox Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImage(CAROUSEL_SLIDES[currentIndex]);
                    }}
                    className="absolute top-3 right-3 px-2.5 py-1.5 rounded bg-black/60 hover:bg-[#00F0FF] hover:text-black text-white text-[9px] font-mono tracking-wider uppercase border border-white/20 hover:border-[#00F0FF] transition-all flex items-center gap-1.5 opacity-85 hover:opacity-100 cursor-pointer backdrop-blur-sm"
                    title="View Full Resolution"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Expand</span>
                  </button>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Navigation Overlay Buttons */}
              <button
                onClick={handlePrev}
                aria-label="Previous Slide"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/65 hover:bg-[#00F0FF] text-white hover:text-black border border-white/15 hover:border-[#00F0FF] transition-all cursor-pointer backdrop-blur-sm shadow-lg z-20"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Slide"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/65 hover:bg-[#00F0FF] text-white hover:text-black border border-white/15 hover:border-[#00F0FF] transition-all cursor-pointer backdrop-blur-sm shadow-lg z-20"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Slide Caption Details & Dot Indicators */}
            <div className="pt-3 px-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="text-left">
                <p className="font-sans text-xs sm:text-sm font-semibold text-white tracking-wide">
                  {CAROUSEL_SLIDES[currentIndex].caption}
                </p>
                <p className="font-sans text-[11px] sm:text-xs text-[#A0AEC0] mt-0.5">
                  {CAROUSEL_SLIDES[currentIndex].subcaption}
                </p>
              </div>

              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5 self-center sm:self-auto shrink-0">
                {CAROUSEL_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx
                        ? "w-7 bg-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.7)]"
                        : "w-2 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </motion.div>

        {/* TRUST / STATS ROW DIRECTLY BELOW HERO */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="w-full max-w-4xl mt-8 pt-6 border-t border-[#1C64F2]/20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Stat 1: 50+ Projects Delivered */}
            <div className="p-4 rounded-lg bg-[#080B1C]/70 border border-[#1C64F2]/20 hover:border-[#00F0FF]/40 flex items-center gap-3.5 transition-all group">
              <div className="p-2.5 rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/25 group-hover:scale-105 transition-transform">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="font-display text-base sm:text-lg font-black text-white tracking-wider block">
                  50+ Projects
                </span>
                <span className="font-mono text-[10.5px] text-[#A0AEC0] uppercase tracking-wider">
                  Delivered &amp; Live
                </span>
              </div>
            </div>

            {/* Stat 2: Response within 24hrs */}
            <div className="p-4 rounded-lg bg-[#080B1C]/70 border border-purple-500/20 hover:border-purple-400/40 flex items-center gap-3.5 transition-all group">
              <div className="p-2.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/25 group-hover:scale-105 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="font-display text-base sm:text-lg font-black text-white tracking-wider block">
                  &lt; 24hr Response
                </span>
                <span className="font-mono text-[10.5px] text-[#A0AEC0] uppercase tracking-wider">
                  Direct WhatsApp &amp; Briefing
                </span>
              </div>
            </div>

            {/* Stat 3: 100% Mobile-Optimized */}
            <div className="p-4 rounded-lg bg-[#080B1C]/70 border border-amber-500/20 hover:border-amber-400/40 flex items-center gap-3.5 transition-all group">
              <div className="p-2.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/25 group-hover:scale-105 transition-transform">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="font-display text-base sm:text-lg font-black text-white tracking-wider block">
                  100% Mobile
                </span>
                <span className="font-mono text-[10.5px] text-[#A0AEC0] uppercase tracking-wider">
                  Optimized &amp; High Speed
                </span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL FOR CAROUSEL IMAGES */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full bg-[#080B1C] border border-[#1C64F2]/40 rounded-xl overflow-hidden p-4 sm:p-5 cursor-default shadow-[0_0_50px_rgba(0,240,255,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Header */}
              <div className="flex justify-between items-center pb-3 border-b border-[#1C64F2]/20 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#00F0FF] tracking-widest uppercase font-bold">
                    {lightboxImage.tag}
                  </span>
                </div>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-1.5 text-[#A0AEC0] hover:text-white rounded border border-white/10 hover:border-white/30 bg-black/40 transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Lightbox Image */}
              <div className="relative rounded overflow-hidden max-h-[70vh] flex items-center justify-center bg-black/70 border border-white/5">
                <img
                  src={lightboxImage.image}
                  alt={lightboxImage.caption}
                  referrerPolicy="no-referrer"
                  className="max-h-[68vh] w-auto max-w-full object-contain rounded"
                />
              </div>

              {/* Lightbox Caption & Close Button */}
              <div className="pt-3 border-t border-[#1C64F2]/20 mt-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <p className="font-sans text-xs sm:text-sm text-white font-medium">
                    {lightboxImage.caption}
                  </p>
                  <p className="font-sans text-[11px] text-[#A0AEC0]">
                    {lightboxImage.subcaption}
                  </p>
                </div>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="self-start sm:self-auto px-3 py-1 text-[9.5px] font-mono uppercase rounded border border-[#1C64F2]/40 bg-[#1C64F2]/15 hover:bg-[#00F0FF] hover:text-black text-white transition-colors cursor-pointer"
                >
                  CLOSE [ESC]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
