/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AboutAndMetrics from "../components/AboutAndMetrics";

export default function AboutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="w-full min-h-[75vh] flex flex-col bg-[#040714] pt-12 animate-fade-in" id="about-page-root">
      {/* Brand narrative, corporate focus, global pillars, and 4-column Live Telemetry Bento Grid */}
      <AboutAndMetrics onOpenAcousticLab={() => navigate("/sound-lab")} />
    </div>
  );
}
