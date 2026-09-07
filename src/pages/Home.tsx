/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import ServicesStrip from "../components/ServicesStrip";
import AppEcosystem from "../components/AppEcosystem";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col pt-10" id="home-view-container">
      {/* 1. HERO SECTION: Benefit-first headline, quote CTA, swipeable carousel & trust stats row */}
      <Hero 
        onGetQuote={() => navigate("/contact")}
        onExploreServices={() => navigate("/services")}
        onExploreApps={() => navigate("/apps")} 
        onOrderCustomBuild={() => navigate("/contact")} 
      />

      {/* 2. SERVICES PREVIEW STRIP: Condensed 3-image services strip with See All Services link */}
      <ServicesStrip 
        onSelectService={(categoryKey) => navigate(`/services?category=${categoryKey}`)}
        onSeeAllServices={() => navigate("/services")}
      />

      {/* 3. "OUR APPS" TEASER: Condensed 3-card teaser (Kamsir, QuantSync, MediaHero) with See All Apps button */}
      <AppEcosystem 
        isTeaser={true}
        limit={3}
        onSelectApp={(app) => navigate(`/apps?app=${app.id}`)}
        onSeeAllApps={() => navigate("/apps")}
      />
    </div>
  );
}
