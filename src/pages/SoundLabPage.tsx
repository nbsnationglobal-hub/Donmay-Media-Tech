/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AcousticSynthesisLab from "../components/AcousticSynthesisLab";

export default function SoundLabPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleEnrollContract = (contract: any) => {
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
    
    // Redirect cleanly to the /services page where active pipeline deployments are monitored
    navigate("/services");
  };

  return (
    <div className="w-full min-h-[75vh] flex flex-col bg-[#040714] pt-12 animate-fade-in" id="sound-lab-page-root">
      {/* Immersive Audio Synthesizer and Logo Extrusion Lab */}
      <AcousticSynthesisLab 
        onBackToHome={() => navigate("/")}
        onEnrollContract={handleEnrollContract}
      />
    </div>
  );
}
