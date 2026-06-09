/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import ContactCanvas from "../components/ContactCanvas";

export default function ContactPage() {
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="w-full min-h-[75vh] flex flex-col bg-[#040714] pt-12 animate-fade-in" id="contact-page-root">
      {/* Premium secure form system for custom requests, system architectures, and quote calculations */}
      <ContactCanvas />
    </div>
  );
}
