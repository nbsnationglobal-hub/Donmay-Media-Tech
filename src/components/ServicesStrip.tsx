/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Globe, Share2, Palette, Sparkles } from "lucide-react";

import webDevImage from "../assets/images/web_dev_service_1788734276018.jpg";
import smmImage from "../assets/images/smm_service_1788734289267.jpg";
import graphicDesignImage from "../assets/images/graphic_design_service_1788734302505.jpg";

interface ServicesStripProps {
  onSelectService: (serviceKey: string) => void;
  onSeeAllServices: () => void;
}

interface ServiceTile {
  id: string;
  categoryKey: string;
  title: string;
  tag: string;
  caption: string;
  image: string;
  linkText: string;
  accentColor: "cyan" | "purple" | "amber";
  icon: React.ReactNode;
}

const SERVICE_TILES: ServiceTile[] = [
  {
    id: "web-dev",
    categoryKey: "website_building",
    title: "Website Development",
    tag: "WEB & E-COMMERCE",
    caption: "High-performance business websites, WhatsApp ordering stores, and high-converting landing pages built to convert visitors into clients.",
    image: webDevImage,
    linkText: "Explore Website Development",
    accentColor: "cyan",
    icon: <Globe className="w-4 h-4 text-[#00F0FF]" />
  },
  {
    id: "smm",
    categoryKey: "social_media",
    title: "Social Media Management",
    tag: "ORGANIC GROWTH & ENGAGEMENT",
    caption: "Full-service page management, daily high-converting hooks, trend monitoring, and active engagement matrices to scale your brand authority.",
    image: smmImage,
    linkText: "Explore Social Media",
    accentColor: "purple",
    icon: <Share2 className="w-4 h-4 text-[#8B5CF6]" />
  },
  {
    id: "graphic-design",
    categoryKey: "graphic_design",
    title: "Graphic Design",
    tag: "VISUAL IDENTITY & ASSETS",
    caption: "Church & milestone event flyers, bespoke brand logotypes, print packages, and complete corporate identity suites crafted for maximum prestige.",
    image: graphicDesignImage,
    linkText: "Explore Graphic Design",
    accentColor: "amber",
    icon: <Palette className="w-4 h-4 text-[#F59E0B]" />
  }
];

export default function ServicesStrip({ 
  onSelectService, 
  onSeeAllServices 
}: ServicesStripProps) {
  
  const getBorderColor = (color: "cyan" | "purple" | "amber") => {
    switch (color) {
      case "cyan":
        return "border-[#1C64F2]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.12)]";
      case "purple":
        return "border-purple-500/25 group-hover:border-[#8B5CF6] group-hover:shadow-[0_0_25px_rgba(139,92,246,0.12)]";
      case "amber":
        return "border-amber-500/25 group-hover:border-amber-400 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.12)]";
    }
  };

  const getTagColor = (color: "cyan" | "purple" | "amber") => {
    switch (color) {
      case "cyan":
        return "text-[#00F0FF] bg-[#00F0FF]/10 border-[#00F0FF]/30";
      case "purple":
        return "text-[#8B5CF6] bg-purple-500/10 border-purple-500/30";
      case "amber":
        return "text-amber-400 bg-amber-500/10 border-amber-500/30";
    }
  };

  const getLinkColor = (color: "cyan" | "purple" | "amber") => {
    switch (color) {
      case "cyan":
        return "text-[#00F0FF] group-hover:text-[#00F0FF]";
      case "purple":
        return "text-purple-300 group-hover:text-[#8B5CF6]";
      case "amber":
        return "text-amber-300 group-hover:text-amber-400";
    }
  };

  return (
    <section 
      id="services-preview-strip" 
      className="py-20 px-6 md:px-12 bg-[#040714] border-t border-[#1C64F2]/15 relative overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#1C64F2]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#00F0FF] font-mono text-xs tracking-widest mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>CORE CAPABILITIES // WHAT WE DELIVER</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-widest uppercase">
              SERVICES PREVIEW
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#A0AEC0] mt-2 max-w-xl">
              Engineered solutions across websites, organic brand growth, and visual assets designed for high market credibility.
            </p>
          </div>

          <button
            onClick={onSeeAllServices}
            className="self-center md:self-end inline-flex items-center gap-2 font-mono text-xs text-[#00F0FF] hover:text-white uppercase tracking-wider transition-colors cursor-pointer group"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3-Image Condensed Services Strip (Tile Row) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICE_TILES.map((tile, idx) => (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              onClick={() => onSelectService(tile.categoryKey)}
              className={`group p-5 rounded-xl border bg-[#080B1C]/75 hover:bg-[#080B1C]/95 transition-all duration-300 flex flex-col justify-between cursor-pointer ${getBorderColor(tile.accentColor)}`}
            >
              {/* Tile Image with 16:9 Aspect Ratio and Hover Scale */}
              <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-black/60 border border-white/5 mb-4">
                <img
                  src={tile.image}
                  alt={tile.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[8.5px] font-mono tracking-wider uppercase backdrop-blur-md">
                  {tile.icon}
                  <span className={`font-semibold ${getTagColor(tile.accentColor)} px-1.5 py-0.5 rounded border`}>
                    {tile.tag}
                  </span>
                </div>
              </div>

              {/* Text & Description */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-white tracking-wide uppercase group-hover:text-white transition-colors">
                    {tile.title}
                  </h3>
                  <p className="font-sans text-xs text-[#A0AEC0] mt-2 leading-relaxed line-clamp-3">
                    {tile.caption}
                  </p>
                </div>

                {/* Arrow Link */}
                <div className="mt-5 pt-4 border-t border-[#1C64F2]/15 flex items-center justify-between font-mono text-[11px] tracking-wider uppercase">
                  <span className={`font-semibold flex items-center gap-1.5 ${getLinkColor(tile.accentColor)}`}>
                    <span>{tile.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                  <span className="text-[9px] text-[#A0AEC0]/60">
                    DIRECT DISPATCH
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center See All Services Link Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onSeeAllServices}
            id="btn-see-all-services"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#080B1C] border border-[#1C64F2]/40 hover:border-[#00F0FF] hover:bg-[#1C64F2]/15 text-white hover:text-[#00F0FF] font-mono text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(28,100,242,0.15)] cursor-pointer group"
          >
            <span>See All Services</span>
            <ArrowRight className="w-4 h-4 text-[#00F0FF] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
