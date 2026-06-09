/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import AppEcosystem from "../components/AppEcosystem";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col pt-10" id="home-view-container">
      {/* Cinematic intro and service triggers */}
      <Hero 
        onExploreApps={() => navigate("/apps")} 
        onOrderCustomBuild={() => navigate("/contact")} 
      />

      {/* Proprietary 6-Module grid showcase, linking directly to the specific apps' deep dives */}
      <AppEcosystem 
        onSelectApp={(app) => navigate(`/apps?app=${app.id}`)}
      />
    </div>
  );
}
