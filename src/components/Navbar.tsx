/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ShieldCheck, Cpu } from "lucide-react";

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
  onStartProjectClick: () => void;
}

export default function Navbar({ onNavClick, activeSection, onStartProjectClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
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
    { label: "Our Apps", id: "app-ecosystem" },
    { label: "Services", id: "services-section" },
    { label: "Pricing", id: "pricing-section" }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#040714]/85 backdrop-blur-md py-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)]" 
          : "bg-transparent py-6"
      }`}
      style={{
        borderBottom: isScrolled
          ? "1px solid rgba(28, 100, 242, 0.4)"
          : "1px solid rgba(28, 100, 242, 0)"
      }}
      id="main-navbar"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left Side Logo */}
        <div 
          onClick={() => onNavClick("hero-section")} 
          className="flex items-center gap-3 cursor-pointer group select-none"
          id="nav-logo"
        >
          <div className="relative flex items-center justify-center w-8 h-8 border border-[#1C64F2]/50 group-hover:border-[#00F0FF] rounded rotate-45 bg-[#080B1C] transition-colors overflow-hidden">
            <Cpu className="w-4 h-4 text-[#1C64F2] group-hover:text-[#00F0FF] transition-colors -rotate-45" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1C64F2]/10 to-[#00F0FF]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-[#FFFFFF] text-sm md:text-base font-bold tracking-[0.25em] leading-none">
              DONMAY
            </span>
            <span className="font-mono text-[8px] tracking-[0.45em] text-[#00F0FF]">
              MEDIA &amp; TECH
            </span>
          </div>
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

        {/* Right side magnetic action button */}
        <div className="flex items-center" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <motion.button
            ref={buttonRef}
            onClick={onStartProjectClick}
            style={{ x: buttonX, y: buttonY }}
            className="px-5 py-2.5 font-display text-xs tracking-widest text-white rounded bg-gradient-to-r from-[#1C64F2] via-[#10B981] to-[#00F0FF] bg-[length:200%_auto] hover:bg-right transition-all duration-500 font-bold hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] border border-[#00F0FF]/25 cursor-pointer shadow-lg uppercase"
            id="btn-nav-action"
          >
            START PROJECT
          </motion.button>
        </div>
      </div>
    </nav>
  );
}
