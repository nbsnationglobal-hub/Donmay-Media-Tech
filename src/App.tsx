/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AppEcosystem from "./components/AppEcosystem";
import DeepDiveView from "./components/DeepDiveView";
import ServiceCatalog from "./components/ServiceCatalog";
import AboutAndMetrics from "./components/AboutAndMetrics";
import ContactCanvas from "./components/ContactCanvas";
import Footer from "./components/Footer";
import LaunchAnimation from "./components/LaunchAnimation";
import AcousticSynthesisLab from "./components/AcousticSynthesisLab";
import { AppNode } from "./types";
import { APPLICATIONS_DATA } from "./data";

export default function App() {
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(() => {
    // Check session storage so rapid reloads don't force infinite long waits
    const stored = sessionStorage.getItem("donmay_intro_sequence_complete");
    return stored === "true";
  });

  const [activeSection, setActiveSection] = useState<string>("hero-section");
  const [selectedApp, setSelectedApp] = useState<AppNode | null>(null);
  const [isAcousticLabActive, setIsAcousticLabActive] = useState<boolean>(false);

  // Trigger scroll-bound navigation highlight
  useEffect(() => {
    if (!isIntroComplete || selectedApp || isAcousticLabActive) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      const sections = ["hero-section", "app-ecosystem", "services-section", "about-section", "contact-section"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isIntroComplete, selectedApp, isAcousticLabActive]);

  // Handle smooth scroll clicks
  const handleNavClick = (sectionId: string) => {
    // If we have an active app deep dive or acoustic lab, clicking any navigation link clears them
    setSelectedApp(null);
    
    if (sectionId === "services-soundlab") {
      setIsAcousticLabActive(true);
      setActiveSection("services-soundlab");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsAcousticLabActive(false);
    setActiveSection(sectionId);

    // Give it a tiny tick to re-render standard pages and then scroll
    setTimeout(() => {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 80);
  };

  const handleStartProject = () => {
    handleNavClick("contact-section");
  };

  const handleAnimationComplete = () => {
    sessionStorage.setItem("donmay_intro_sequence_complete", "true");
    setIsIntroComplete(true);
  };

  return (
    <div className="min-h-screen bg-[#040714] text-white overflow-x-hidden font-sans">
      <AnimatePresence mode="wait">
        {!isIntroComplete ? (
          <LaunchAnimation key="launch-intro" onComplete={handleAnimationComplete} />
        ) : (
          <motion.div
            key="dashboard-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col min-h-screen relative"
          >
            {/* 1. Header Navigation */}
            <Navbar 
              onNavClick={handleNavClick} 
              activeSection={selectedApp ? "app-ecosystem" : isAcousticLabActive ? "services-soundlab" : activeSection}
              onStartProjectClick={handleStartProject}
            />

            {/* 2. Primary layout body area */}
            <main className="flex-1 w-full flex flex-col pt-16">
              <AnimatePresence mode="wait">
                {selectedApp ? (
                  <motion.div
                    key={`deep-dive-${selectedApp.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45 }}
                    className="w-full"
                  >
                    <DeepDiveView 
                      appNode={selectedApp} 
                      onBack={() => {
                        setSelectedApp(null);
                        // Mini delay to scroll to the app section smoothly
                        setTimeout(() => {
                          const el = document.getElementById("app-ecosystem");
                          if (el) el.scrollIntoView({ behavior: "instant" });
                        }, 50);
                      }} 
                    />
                  </motion.div>
                ) : isAcousticLabActive ? (
                  <motion.div
                    key="acoustic-lab"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45 }}
                    className="w-full"
                  >
                    <AcousticSynthesisLab 
                      onBackToHome={() => setIsAcousticLabActive(false)}
                      onEnrollContract={(contract) => {
                        const saved = localStorage.getItem("donmay_active_contracts");
                        let current: any[] = [];
                        if (saved) {
                          try {
                            current = JSON.parse(saved);
                          } catch (e) {
                            console.error(e);
                          }
                        }
                        const next = [contract, ...current];
                        localStorage.setItem("donmay_active_contracts", JSON.stringify(next));
                        setIsAcousticLabActive(false);
                        
                        // Scroll smoothly to active nodes monitor area after enrollment
                        setTimeout(() => {
                          const el = document.getElementById("services-section");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }, 120);
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="home-panels"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full flex flex-col"
                  >
                    {/* Component B: Hero */}
                    <Hero 
                      onExploreApps={() => handleNavClick("app-ecosystem")} 
                      onOrderCustomBuild={() => handleNavClick("contact-section")} 
                    />

                    {/* Component C: Infrastructure Node Grid Ecosystem */}
                    <AppEcosystem 
                      onSelectApp={(app) => {
                        setSelectedApp(app);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    />

                    {/* Component E: On-Demand Services Deliverables & Quote Calculator */}
                    <ServiceCatalog />

                    {/* Component F: About Us & Live Data Telemetry Metrics (Bento Grid) */}
                    <AboutAndMetrics onOpenAcousticLab={() => handleNavClick("services-soundlab")} />

                    {/* Component G: Get in Touch Premium Contact Canvas */}
                    <ContactCanvas />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            {/* 3. Footer row metadata */}
            <Footer 
              onSelectApp={(appId) => {
                const found = APPLICATIONS_DATA.find(a => a.id === appId);
                if (found) {
                  setSelectedApp(found);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              onNavClick={handleNavClick}
              onOpenAcousticLab={() => handleNavClick("services-soundlab")}
            />

            {/* Floating Premium WhatsApp Support Button */}
            <a 
              href="https://wa.me/2348133005835?text=Hello%20Donmay%20Media%20%26%20Tech%2C%20I'm%20interested%20in%20your%20services!"
              target="_blank"
              rel="noreferrer"
              className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
              aria-label="Contact via WhatsApp"
              id="whatsapp-floating-trigger"
            >
              {/* Tooltip text showing on hover */}
              <span className="hidden md:flex flex-col items-end px-3 py-1.5 rounded border border-[#10B981]/20 bg-[#040714]/95 text-[#10B981] font-mono text-[8px] tracking-[0.2em] uppercase transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 shadow-[0_0_15px_rgba(16,185,129,0.15)] select-none">
                <span>SUPPORT INTEGRATION</span>
                <span className="text-[6.5px] text-white mt-0.5">CHAT ON WHATSAPP</span>
              </span>

              {/* Main outer glow/gradient button wrapper */}
              <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-[#10B981] to-green-600 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer">
                {/* Ping/ripple ring background */}
                <span className="absolute inset-0 rounded-full border border-emerald-400 animate-ping opacity-60" style={{ animationDuration: '3s' }} />
                
                <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 24 24" id="whatsapp-custom-svg-logo">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.936 9.936 0 0 0 4.777 1.218c5.508 0 9.99-4.478 9.99-10.04a9.98 9.98 0 0 0-9.988-9.807zM17.48 16.2c-.22.617-1.12 1.205-1.545 1.25-.375.04-1.13.08-2.61-.51-1.92-.77-3.15-2.73-3.25-2.86-.09-.13-.77-1.02-.77-1.95 0-.93.49-1.38.67-1.58.18-.2.39-.25.52-.25h.37c.12 0 .28-.05.44.33.16.39.56 1.37.61 1.47.05.1.09.21.02.35-.07.13-.1.21-.21.33-.1.12-.22.28-.31.37-.11.11-.23.23-.1.45.13.22.58.95 1.24 1.54.85.76 1.56 1 1.78 1.11.22.11.35.09.48-.06.13-.15.56-.65.71-.87.15-.22.31-.19.52-.11.22.08 1.38.65 1.62.77.24.12.4.18.46.28.06.11.06.63-.16 1.25z" />
                </svg>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
