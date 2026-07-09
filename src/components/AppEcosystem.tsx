/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { AppNode } from "../types";
import { APPLICATIONS_DATA } from "../data";
import { 
  ArrowRight, 
  Server, 
  Video, 
  TrendingUp, 
  Flame, 
  Wallet, 
  Trophy,
  Utensils 
} from "lucide-react";

interface AppEcosystemProps {
  onSelectApp: (app: AppNode) => void;
}

export default function AppEcosystem({ onSelectApp }: AppEcosystemProps) {
  // Assign customized premium icons to our proprietary apps
  const getAppIcon = (type: string) => {
    switch (type) {
      case "kamsir":
        return <Video className="w-5 h-5 text-purple-400" />;
      case "quantsync":
        return <TrendingUp className="w-5 h-5 text-[#00F0FF]" />;
      case "media_hero":
        return <Flame className="w-5 h-5 text-orange-400" />;
      case "budget":
        return <Wallet className="w-5 h-5 text-emerald-400" />;
      case "aura":
        return <Trophy className="w-5 h-5 text-amber-500" />;
      case "culina":
        return <Utensils className="w-5 h-5 text-[#FF7A18]" />;
      default:
        return <Server className="w-5 h-5 text-[#1C64F2]" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "kamsir":
        return "border-purple-500/30 text-purple-400 bg-purple-500/5";
      case "quantsync":
        return "border-[#00F0FF]/30 text-[#00F0FF] bg-[#00F0FF]/5";
      case "media_hero":
        return "border-orange-500/30 text-orange-400 bg-orange-500/5";
      case "budget":
        return "border-emerald-500/30 text-emerald-400 bg-emerald-500/5";
      case "aura":
        return "border-amber-500/30 text-amber-400 bg-amber-500/5";
      case "culina":
        return "border-[#FF7A18]/30 text-[#FF7A18] bg-[#FF7A18]/5";
      default:
        return "border-[#1C64F2]/30 text-[#1C64F2] bg-[#1C64F2]/5";
    }
  };

  return (
    <section 
      id="app-ecosystem" 
      className="py-24 px-6 md:px-12 bg-[#040714] border-t border-[#1C64F2]/10 relative overflow-hidden select-none"
    >
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1C64F2]/4 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 digital-grid opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#00F0FF] font-mono text-xs tracking-wider mb-3">
              <Server className="w-4 h-4 animate-pulse" />
              <span>INFRASTRUCTURE NODE CLUSTER Map // RUNNING</span>
            </div>
            <h2 className="font-display font-black text-2xl md:text-4xl text-white tracking-widest uppercase">
              OUR APPS
            </h2>
            <p className="font-sans text-sm text-[#A0AEC0] mt-3 uppercase tracking-wide max-w-xl">
              Click individual terminals below to initialize active live simulation grids and premium pipeline channels.
            </p>
          </div>
          <span className="font-mono text-[10px] text-[#A0AEC0] tracking-widest uppercase self-center md:self-end">
            SYS_HEALTH: OPTIMAL // ONLINE_NODES: {APPLICATIONS_DATA.length < 10 ? `0${APPLICATIONS_DATA.length}` : APPLICATIONS_DATA.length}
          </span>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="app-cluster-grid">
          {APPLICATIONS_DATA.map((app, idx) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => onSelectApp(app)}
              className="group p-6 rounded-lg border border-[#1C64F2]/20 hover:border-[#00F0FF] bg-[#080B1C]/65 hover:bg-[#080B1C]/90 relative overflow-hidden cursor-pointer transition-all hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] flex flex-col justify-between min-h-[250px] panel-glow"
              id={`node-${app.id}`}
            >
              {/* Header section with node icon and small tag */}
              <div className="flex items-start justify-between">
                <div className="p-2 bg-[#040714] border border-[#1C64F2]/20 group-hover:border-[#00F0FF]/50 rounded text-white transition-colors">
                  {getAppIcon(app.simulationType)}
                </div>
                <span className={`px-2.5 py-1 text-[8px] font-mono tracking-widest uppercase border rounded ${getBadgeColor(app.simulationType)}`}>
                  NODE_STATUS: ONLINE
                </span>
              </div>

              {/* Contents body (Display/body dynamic typography) */}
              <div className="my-6">
                <h3 className="font-display text-sm md:text-base font-bold text-white tracking-wide uppercase group-hover:text-[#00F0FF] transition-colors">
                  {app.title}
                </h3>
                <span className="font-mono text-[9px] text-[#A0AEC0]/70 uppercase tracking-widest mt-1 block">
                  {app.subtitle}
                </span>

                {/* Micro-Tags Badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {app.microTags && app.microTags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className={`text-[8px] font-mono font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${getBadgeColor(app.simulationType)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="font-sans text-xs text-[#A0AEC0] mt-4 leading-relaxed uppercase group-hover:text-white transition-colors line-clamp-3">
                  {app.shortDescription}
                </p>
              </div>

              {/* Bottom technical specifications */}
              <div className="flex items-center justify-between border-t border-[#1C64F2]/10 pt-4 font-mono text-[9px] text-[#A0AEC0]">
                <span>TECH: {app.architectureStack[0]} + {app.architectureStack[1]}</span>
                <div className="flex items-center gap-1.5 text-[#00F0FF] group-hover:translate-x-1 transition-transform">
                  <span className="font-display tracking-widest uppercase text-[8px] font-bold">DEEP DIVE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
