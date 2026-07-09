/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { ShieldCheck, Cpu, Menu, X } from "lucide-react";
import DonmayLogo from "./DonmayLogo";

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
  onStartProjectClick: () => void;
}

export default function Navbar({ onNavClick, activeSection, onStartProjectClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Magnetic motion springs
  const buttonX = useSpring(useMotionValue(0), { damping: 15, stiffness: 150 });
  const buttonY = useSpring(useMotionValue(0), { damping: 15, stiffness: 150 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate center
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;

    // Distance from center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Limit pull to max 12px
    const magneticPull = 12;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 90; // distance threshold to feel pull

    if (distance < maxDistance) {
      const scale = (maxDistance - distance) / maxDistance;
      buttonX.set(deltaX * scale * 0.35);
      buttonY.set(deltaY * scale * 0.35);
    } else {
      buttonX.set(0);
      buttonY.set(0);
    }
  };

  const handleMouseLeave = () => {
    buttonX.set(0);
    buttonY.set(0);
  };

  const menuItems = [
    { label: "Home", id: "hero-section" },
    { label: "OUR APPS", id: "app-ecosystem" },
    { label: "Services", id: "services-section" },
    { label: "SOUND LAB", id: "services-soundlab" },
    { label: "About Us", id: "about-section" },
    { label: "Contact", id: "contact-section" }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#040714]/85 backdrop-blur-md py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]" 
          : "bg-transparent py-5"
      }`}
      style={{
        borderBottom: isScrolled
          ? "1px solid rgba(28, 100, 242, 0.4)"
          : "1px solid rgba(28, 100, 242, 0)"
      }}
      id="main-navbar"
    >
      <div className="max-w-7xl mx-auto px-3.5 xs:px-6 md:px-12 flex items-center justify-between gap-2">
        {/* Left Side Logo */}
        <div 
          onClick={() => onNavClick("hero-section")} 
          className="flex items-center gap-2 cursor-pointer group select-none shrink-0"
          id="nav-logo"
        >
          <DonmayLogo symbolSize={30} />
        </div>

        {/* Center navigation links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12" id="nav-center-menu">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className={`font-display text-xs tracking-widest uppercase relative py-1 transition-all duration-200 cursor-pointer ${
                activeSection === item.id 
                  ? "text-[#00F0FF]" 
                  : "text-[#A0AEC0] hover:text-[#FFFFFF]"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00F0FF]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right side controls: CTA button and Hamburger Menu */}
        <div className="flex items-center gap-2 xs:gap-3 shrink-0">
          {/* Main Action Button (shown on all screen sizes, dynamically scaled) */}
          <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="flex">
            <motion.button
              ref={buttonRef}
              onClick={onStartProjectClick}
              style={{ x: buttonX, y: buttonY }}
              className="px-2.5 py-1.5 xs:px-3.5 xs:py-2 sm:px-5 sm:py-2.5 font-display text-[8.5px] xs:text-[9.5px] sm:text-xs tracking-normal xs:tracking-wider sm:tracking-widest text-white rounded bg-gradient-to-r from-[#1C64F2] via-[#10B981] to-[#00F0FF] bg-[length:200%_auto] hover:bg-right transition-all duration-500 font-bold hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] border border-[#00F0FF]/25 cursor-pointer shadow-lg uppercase whitespace-nowrap"
              id="btn-nav-action"
            >
              GET A CUSTOM QUOTE
            </motion.button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 xs:p-2.5 text-[#A0AEC0] hover:text-[#00F0FF] hover:bg-[#111928]/80 bg-[#040714]/80 border border-[#1C64F2]/30 rounded transition-all cursor-pointer flex items-center justify-center self-center shrink-0"
            id="hamburger-menu-toggle"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-3.5 h-3.5 text-[#00F0FF]" /> : <Menu className="w-3.5 h-3.5 text-[#00F0FF]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden w-full border-b border-[#1C64F2]/40 bg-[#040714]/95 backdrop-blur-lg overflow-hidden absolute left-0"
            style={{ top: "100%" }} // Placed perfectly below the navbar container
            id="mobile-nav-panel"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavClick(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left font-display text-[11px] tracking-widest uppercase py-3 border-b border-white/5 transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    activeSection === item.id 
                      ? "text-[#00F0FF] font-bold" 
                      : "text-[#A0AEC0] hover:text-[#FFFFFF]"
                  }`}
                >
                  <span>{item.label}</span>
                  {activeSection === item.id ? (
                    <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full shadow-[0_0_8px_rgba(0,240,255,1)]" />
                  ) : (
                    <span className="text-[9px] text-zinc-600 font-mono">// GO</span>
                  )}
                </button>
              ))}

              {/* Mobile CTA inside menu drawer */}
              <div className="pt-4 flex flex-col gap-2.5">
                <span className="font-mono text-[8px] text-[#00F0FF] uppercase tracking-widest font-black">
                  // ACTION SYSTEM DIRECTIVE
                </span>
                <button
                  onClick={() => {
                    onStartProjectClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 font-display text-xs tracking-widest text-[#040714] font-black rounded bg-gradient-to-r from-[#1C64F2] via-[#10B981] to-[#00F0FF] hover:opacity-90 active:scale-[0.99] transition-all uppercase cursor-pointer text-center"
                >
                  GET A CUSTOM QUOTE
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
