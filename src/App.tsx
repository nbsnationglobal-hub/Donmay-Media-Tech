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
import Footer from "./components/Footer";
import LaunchAnimation from "./components/LaunchAnimation";
import { AppNode } from "./types";

export default function App() {
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(() => {
    // Check session storage so rapid reloads don't force infinite long waits
    const stored = sessionStorage.getItem("donmay_intro_sequence_complete");
    return stored === "true";
  });

  const [activeSection, setActiveSection] = useState<string>("hero-section");
  const [selectedApp, setSelectedApp] = useState<AppNode | null>(null);

  // Trigger scroll-bound navigation highlight
  useEffect(() => {
    if (!isIntroComplete || selectedApp) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      const sections = ["hero-section", "app-ecosystem", "services-section", "pricing-section"];
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
  }, [isIntroComplete, selectedApp]);

  // Handle smooth scroll clicks
  const handleNavClick = (sectionId: string) => {
    // If we have an active app deep dive, clicking any navigation link clears the deep dive
    setSelectedApp(null);
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
    handleNavClick("pricing-section");
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
              activeSection={selectedApp ? "app-ecosystem" : activeSection}
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
                      onOrderCustomBuild={() => handleNavClick("pricing-section")} 
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
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            {/* 3. Footer row metadata */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
