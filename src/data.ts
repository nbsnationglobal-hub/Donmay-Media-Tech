/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppNode, ServiceItem } from "./types";

export const APPLICATIONS_DATA: AppNode[] = [
  {
    id: "forex-intel",
    title: "Forex Market Intelligence",
    subtitle: "MT5 Algorithmic Core",
    shortDescription: "Automated trading file brain integrating with MT5 for real-time market learning and reporting via structured CSV data.",
    longDescription: "An advanced, sub-millisecond execution engine designed for MetaTrader 5 (MT5). The system analyzes multi-pair market flows synchronously, generates robust statistical reports, and outputs optimized CSV data streams to power downstream intelligence layers securely.",
    architectureStack: ["MQL5", "TypeScript / Node", "Python Pandas", "REST Proxy Gateway", "CSV File Store"],
    capabilities: [
      "Continuous MT5 Active Feed Synchronization",
      "Adaptive Micro-Slip Protection Algorithms",
      "Automated CSV Backup & Ledger Database",
      "Multi-Asset Mathematical Probability Filter"
    ],
    simulationType: "forex"
  },
  {
    id: "predictive-analytics",
    title: "Predictive Analytics Core",
    subtitle: "Football Odds Processor",
    shortDescription: "High-accuracy match probability analysis and custom ticket building platform.",
    longDescription: "A state-of-the-art sports science modeling suite utilizing Poisson distribution matrices, historical performance indexes, and actual dynamic betting margins to generate high-probability forecasts and custom ticket architectures.",
    architectureStack: ["React 19 & Vite", "Tailwind CSS Engine", "Poisson Distribution Models", "Local Data Store"],
    capabilities: [
      "Dynamic Live Odds Poisson Calculator",
      "Interactive Match Accumulator Builder",
      "Detailed Dynamic Team Form Overlays",
      "Custom Risk-to-Reward Margin Optimization"
    ],
    simulationType: "football"
  },
  {
    id: "sound-synthesis",
    title: "Quantum Sound Synthesis",
    subtitle: "Next-Gen Audio Forge",
    shortDescription: "High-definition soundscape synthesis tool leveraging AI for commercial audio workflows.",
    longDescription: "An interactive soundboard and generative waveform synthesizer tailored for advertising filmmakers, content developers, and visual editors, rendering state-of-the-art acoustics in milliseconds.",
    architectureStack: ["Web Audio API", "WebAssembly Engine", "Audio Worklets", "Vite Framework"],
    capabilities: [
      "Dynamic Stereo Waveform Pipeline",
      "Lossless WAV Sample Pack Export",
      "Sub-bass Layer Harmonic Resonator",
      "Creative Soundscape Seed Variations"
    ],
    simulationType: "media"
  },
  {
    id: "crypto-sentinel",
    title: "Cryptographic Sentinel",
    subtitle: "Decentralized Access Proxy",
    shortDescription: "Enterprise edge proxy server with ironclad cryptographic handshake authenticators.",
    longDescription: "A solid, zero-trust cryptographic edge gate built for high-throughput media servers. Manages bulletproof authorization handshakes, active IP rotate policies, and telemetry verification metrics.",
    architectureStack: ["Rust Core", "gRPC Handshakes", "AES-256-GCM Encryption", "React Monitoring"],
    capabilities: [
      "Micro-latency Routing Edge Gateway",
      "Instant Credential Multi-Shuffle Protocol",
      "Adaptive Request Flooding Limiter",
      "Visual Attack Node Interactive Vector Map"
    ],
    simulationType: "security"
  },
  {
    id: "bento-cdn",
    title: "Bento CDN Engine",
    subtitle: "Global Video Cache Node",
    shortDescription: "Super-optimized local routing caching solution for high-density 4K video streamers.",
    longDescription: "An intelligent media caching matrix that completely routes around congestion nodes. Leverages smart WebRTC local pairing to distribute raw chunk files with zero playback delay.",
    architectureStack: ["Go Routing Core", "WebRTC Peer-to-Peer", "Redis Cache Indexer", "Responsive UI Panel"],
    capabilities: [
      "Autonomous Multi-Thread Video Chunking",
      "Intelligent Region Geo-Routing Optimizer",
      "Real-time Cache Hit/Miss Telemetry Grid",
      "Dynamic Image and Video Asset Compress"
    ],
    simulationType: "cloud"
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "dev-service",
    title: "Software & Web Development",
    subtitle: "Corporate Systems & Custom SaaS",
    category: "development",
    description: "Tailor-made web applications, high-performance SaaS MVPs, and premium high-converting corporate layouts styled according to precise specifications.",
    deliverables: [
      "Production-Ready React & Node Architectures",
      "Stripe or Selar Checkout Systems API Integration",
      "Extremely Clean, Dynamic Visual Layouts",
      "Comprehensive Database Schemas & Secure API Gateways"
    ],
    priceRange: "From $1,500 USD",
    deliveryTime: "14 - 21 Days"
  },
  {
    id: "audio-service",
    title: "Next-Gen Audio Design",
    subtitle: "Soundtracks & Sonic Identity",
    category: "audio",
    description: "Acoustically superior soundtracks, commercial-grade ambient loops, and custom-made celebration anthems featuring professional standard engineering.",
    deliverables: [
      "Lossless Stereo Master Files (WAV / FLAC)",
      "100% Comprehensive Commercial Exploitation Rights",
      "Seamless Looping Background Tracks",
      "Bespoke High-Impact Sound Logo Stingers"
    ],
    priceRange: "From $450 USD",
    deliveryTime: "4 - 7 Days"
  },
  {
    id: "media-service",
    title: "Creative Media Studio",
    subtitle: "Cinematics & Cartoon Visuals",
    category: "media",
    description: "Highly engaging cartoon animations, premium commercials, advanced transition effects, and cohesive digital assets optimized for modern brand engagement.",
    deliverables: [
      "Custom Crafted Character Animation Sequences",
      "Pro Color correction, Sound Overlay & Splicing",
      "Ultra-Crisp 4K UHD Ultra-High Framerate Renders",
      "Platform-specific aspect ratio optimizations"
    ],
    priceRange: "From $800 USD",
    deliveryTime: "7 - 14 Days"
  },
  {
    id: "marketing-service",
    title: "Growth Marketing Core",
    subtitle: "Ad Funnels & Algorithm Optimization",
    category: "marketing",
    description: "Data-focused advertisement setups, strategic audience analysis, hyper-optimized growth loops, and fully managed brand authorities across socials.",
    deliverables: [
      "High-converting visual copies & texts",
      "Detailed pixel tracking and audience filter sets",
      "Comprehensive weekly optimization review",
      "Automated growth pipeline systems"
    ],
    priceRange: "From $600 USD / Month",
    deliveryTime: "Monthly Retention"
  }
];
