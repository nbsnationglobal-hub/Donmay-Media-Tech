/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import AppEcosystem from "../components/AppEcosystem";
import DeepDiveView from "../components/DeepDiveView";
import { APPLICATIONS_DATA } from "../data";

export default function AppsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const appId = searchParams.get("app");

  // Lookup the targeted app model from APPLICATIONS_DATA
  const selectedApp = APPLICATIONS_DATA.find((a) => a.id === appId);

  // Scroll to top automatically when selected app changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [appId]);

  return (
    <div className="w-full min-h-[70vh] flex flex-col bg-[#040714] pt-12" id="apps-page-root">
      <AnimatePresence mode="wait">
        {selectedApp ? (
          <motion.div
            key={`apps-deepdive-${selectedApp.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {/* Direct view containing interactive simulations, tier cards, and checkout hooks */}
            <DeepDiveView 
              appNode={selectedApp} 
              onBack={() => {
                setSearchParams({});
              }} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="apps-grid-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {/* Showcase grid of all 6 products in high density styling */}
            <AppEcosystem 
              onSelectApp={(app) => {
                setSearchParams({ app: app.id });
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
