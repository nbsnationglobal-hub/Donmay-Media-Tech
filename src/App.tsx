/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

// Layout and Global Shared Structures
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LaunchAnimation from "./components/LaunchAnimation";

// Modular Page Route Components
import Home from "./pages/Home";
import AppsPage from "./pages/AppsPage";
import ServicesPage from "./pages/ServicesPage";
import SoundLabPage from "./pages/SoundLabPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ActivatePage from "./pages/ActivatePage";

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top of page on route shifts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle post-launch terminal redirects
  useEffect(() => {
    const redirectPath = sessionStorage.getItem("launch_redirect_path");
    if (redirectPath) {
      sessionStorage.removeItem("launch_redirect_path");
      navigate(redirectPath);
    }
  }, [navigate]);

  // Translate routing paths to the appropriate navbar section state underlines
  const getActiveSection = (pathname: string) => {
    if (pathname === "/") return "hero-section";
    if (pathname.startsWith("/apps")) return "app-ecosystem";
    if (pathname.startsWith("/services")) return "services-section";
    if (pathname.startsWith("/sound-lab")) return "services-soundlab";
    if (pathname.startsWith("/about")) return "about-section";
    if (pathname.startsWith("/contact")) return "contact-section";
    return "";
  };

  const activeSection = getActiveSection(location.pathname);

  // Smooth standard navigation clicks
  const handleNavClick = (sectionId: string) => {
    switch (sectionId) {
      case "hero-section":
        navigate("/");
        break;
      case "app-ecosystem":
        navigate("/apps");
        break;
      case "services-section":
        navigate("/services");
        break;
      case "services-soundlab":
        navigate("/sound-lab");
        break;
      case "about-section":
        navigate("/about");
        break;
      case "contact-section":
        navigate("/contact");
        break;
      default:
        navigate("/");
    }
  };

  const handleStartProject = () => {
    navigate("/contact");
  };

  const isActivatePage = location.pathname === "/activate";

  return (
    <div className="flex flex-col min-h-screen relative" id="master-layout-container">
      {/* 1. Header Navigation - Hidden only on stand-alone /activate onboarding terminal */}
      {!isActivatePage && (
        <Navbar 
          onNavClick={handleNavClick} 
          activeSection={activeSection}
          onStartProjectClick={handleStartProject}
        />
      )}

      {/* 2. Primary layout body area */}
      <main className={`flex-1 w-full flex flex-col ${!isActivatePage ? "pt-16" : ""}`}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apps" element={<AppsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/sound-lab" element={<SoundLabPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/activate" element={<ActivatePage />} />
            {/* Fallback routing */}
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* 3. Footer row metadata - Hidden only on /activate */}
      {!isActivatePage && (
        <Footer 
          onSelectApp={(appId) => {
            navigate(`/apps?app=${appId}`);
          }}
          onNavClick={handleNavClick}
          onOpenAcousticLab={() => navigate("/sound-lab")}
        />
      )}

      {/* Floating Premium WhatsApp Support Buddy - Hidden on /activate */}
      {!isActivatePage && (
        <a 
          href="https://wa.me/2348133005835?text=Hello%20Donmay%20Media%20%26%20Tech%2C%20I'm%20interested%20in%20your%20services!"
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group animate-bounce"
          style={{ animationDuration: '4s' }}
          aria-label="Contact via WhatsApp"
          id="whatsapp-floating-trigger"
        >
          {/* Hover tooltips */}
          <span className="hidden md:flex flex-col items-end px-3 py-1.5 rounded border border-[#10B981]/20 bg-[#040714]/95 text-[#10B981] font-mono text-[8px] tracking-[0.2em] uppercase transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 shadow-[0_0_15px_rgba(16,185,129,0.15)] select-none">
            <span>SUPPORT INTEGRATION</span>
            <span className="text-[6.5px] text-white mt-0.5">CHAT ON WHATSAPP</span>
          </span>

          {/* Main glowing radial background circle */}
          <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-[#10B981] to-green-600 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer">
            <span className="absolute inset-0 rounded-full border border-emerald-400 animate-ping opacity-60" style={{ animationDuration: '3s' }} />
            
            <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 24 24" id="whatsapp-custom-svg-logo">
              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.936 9.936 0 0 0 4.777 1.218c5.508 0 9.99-4.478 9.99-10.04a9.98 9.98 0 0 0-9.988-9.807zM17.48 16.2c-.22.617-1.12 1.205-1.545 1.25-.375.04-1.13.08-2.61-.51-1.92-.77-3.15-2.73-3.25-2.86-.09-.13-.77-1.02-.77-1.95 0-.93.49-1.38.67-1.58.18-.2.39-.25.52-.25h.37c.12 0 .28-.05.44.33.16.39.56 1.37.61 1.47.05.1.09.21.02.35-.07.13-.1.21-.21.33-.1.12-.22.28-.31.37-.11.11-.23.23-.1.45.13.22.58.95 1.24 1.54.85.76 1.56 1 1.78 1.11.22.11.35.09.48-.06.13-.15.56-.65.71-.87.15-.22.31-.19.52-.11.22.08 1.38.65 1.62.77.24.12.4.18.46.28.06.11.06.63-.16 1.25z" />
            </svg>
          </div>
        </a>
      )}
    </div>
  );
}

export default function App() {
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(false);

  useEffect(() => {
    // Capture the initial pathname if it is a subpage so we can restore it after launch completes
    const initialPath = window.location.pathname;
    if (initialPath && initialPath !== "/" && !sessionStorage.getItem("launch_redirect_path")) {
      sessionStorage.setItem("launch_redirect_path", initialPath);
    }
  }, []);

  useEffect(() => {
    const handleReplay = () => {
      setIsIntroComplete(false);
    };
    window.addEventListener("replay-launch-animation", handleReplay);
    return () => window.removeEventListener("replay-launch-animation", handleReplay);
  }, []);

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
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        )}
      </AnimatePresence>
    </div>
  );
}
