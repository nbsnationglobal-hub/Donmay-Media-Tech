/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { motion } from "motion/react";
import ServiceCatalog from "../components/ServiceCatalog";

export default function ServicesPage() {
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="w-full min-h-[75vh] flex flex-col bg-[#040714] pt-12 animate-fade-in" id="services-page-root">
      {/* Complete integrated agency capabilities dashboard */}
      <ServiceCatalog />
    </div>
  );
}
