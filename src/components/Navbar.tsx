/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ShieldCheck, Cpu } from "lucide-react";
import DonmayLogo from "./DonmayLogo";

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
          <DonmayLogo symbolSize={34} />
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
            GET A CUSTOM QUOTE
          </motion.button>
        </div>
      </div>
    </nav>
  );
}
