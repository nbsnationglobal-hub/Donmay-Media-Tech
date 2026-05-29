/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppNode, ServiceItem } from "./types";

export const APPLICATIONS_DATA: AppNode[] = [
  {
    id: "vora",
    title: "Vora Studio // AI Cinema & Video Generator",
    subtitle: "AI Video System",
    shortDescription: "Instantly turn music tracks or scripts into high-quality music videos, films, and animations. Upload your photo to keep your exact face consistent across every scene.",
    longDescription: "Instantly turn music tracks or scripts into high-quality music videos, films, and animations. Upload any high-resolution photo to keep your exact facial features fully consistent across every scene.",
    architectureStack: ["Gemini Vision", "Vite / React", "Stable Video API", "Node.js Web Server"],
    capabilities: [
      "Instantly turn audio tracks or ideas into full videos",
      "Upload your photo to keep your personal face consistent in every scene",
      "Create high-quality cinematic results and custom animations on any script",
      "Full 4K resolutions suitable for social media or professional use"
    ],
    simulationType: "vora",
    microTags: ["Core: Gemini Vision", "Output: 4K Cinematic"],
    targetUrl: "https://aistudio.google.com/apps/c65074cc-b709-4349-9b32-6f3fea46e067?showPreview=true&showAssistant=true"
  },
  {
    id: "quantsync",
    title: "QuantSync // Smart Forex Trading Terminal",
    subtitle: "MetaTrader 5 Client",
    shortDescription: "An advanced trading dashboard built for MetaTrader 5 (MT5). Tracks market patterns, records your trading history automatically, and connects live to the cloud.",
    longDescription: "An advanced trading dashboard built for MetaTrader 5 (MT5). Tracks market patterns, records your trading history automatically, and connects live to a secure cloud backend.",
    architectureStack: ["MQL5 EA Bridge", "Express / Firestore", "Volex Pricing Core", "NodeJS Proxy"],
    capabilities: [
      "Seamless connection to MetaTrader 5 (MT5)",
      "Auto-records all trading activities in real-time",
      "Monitors multiple currency pairs and indexes simultaneously",
      "Secure cloud database syncing to protect your trading history"
    ],
    simulationType: "quantsync",
    microTags: ["Bridge: MQL5 EA", "Engine: Express / Firestore"],
    targetUrl: "https://aistudio.google.com/apps/a3bbd08f-f0a8-4d1d-ad0d-77188e518b6b?showPreview=true&showAssistant=true"
  },
  {
    id: "media-hero",
    title: "Media Hero // Social Media Growth Co-Pilot",
    subtitle: "Distribution Engine",
    shortDescription: "Automatically fixes your posts to prevent shadowbans, extracts trending hashtags, and rewrites your content to go viral on TikTok, Instagram, and YouTube.",
    longDescription: "Automatically fixes your posts to prevent shadowbans, extracts trending hashtags, and rewrites your content to go viral on TikTok, Instagram, and YouTube.",
    architectureStack: ["Imagen & Veo Core", "Tailwind Engine", "Viral Pattern Analytics", "JSON CDN Store"],
    capabilities: [
      "Ensures shadowban protection before you publish content",
      "Finds current viral hashtags and trending triggers instantly",
      "AI Copywriter rewrites titles and post hooks for maximum views",
      "Provides estimated reach scores before uploading"
    ],
    simulationType: "media_hero",
    microTags: ["Models: Imagen & Veo", "Audit: Algorithm Guard"],
    targetUrl: "https://aistudio.google.com/apps/4c1f953b-d3b9-4683-ae4b-7ce240bcbf45?showPreview=true&showAssistant=true"
  },
  {
    id: "budget-hero",
    title: "MyBudgetHero // Smart Finance & Project Tracker",
    subtitle: "Financial Intelligence",
    shortDescription: "Easily manage your daily personal spending alongside major business project budgets, material invoices, and contractor costs in multiple currencies.",
    longDescription: "Easily manage your daily personal spending alongside major business project budgets, material invoices, and contractor costs in multiple currencies.",
    architectureStack: ["Supabase Cloud DB", "Bento Cyber-Slate GUI", "SaaS Billing Core", "React 18 / Vite"],
    capabilities: [
      "Tracks personal daily spending together with business assets",
      "Manage contractor costs, invoices, and material receipts on site",
      "Supports multi-currency conversions automatically",
      "Secure backend ledger backup so you never lose financial data"
    ],
    simulationType: "budget",
    microTags: ["DB: Supabase Cloud", "UI: Bento Cyber-Slate"],
    targetUrl: "https://aistudio.google.com/apps/cf1cd6ff-303c-4555-9a29-b564840ac637?showPreview=true&showAssistant=true"
  },
  {
    id: "aura-predictor",
    title: "Aura Predictor Pro // Advanced Football Analytics Suite",
    subtitle: "Sports Value Suite",
    shortDescription: "Uses smart statistics and team injury data to find true value in soccer matches and instantly generates realistic accumulator betting slips.",
    longDescription: "Uses smart statistics and team injury data to find true value in soccer matches and instantly generates realistic accumulator betting slips.",
    architectureStack: ["Strength Modifiers", "Poisson Distribution", "Vite / React Routing", "Tailwind GUI"],
    capabilities: [
      "Uses smart algorithms to evaluate soccer statistics and team layouts",
      "Monitors live player injury data and dynamic roster adjustments",
      "Instantly generates realistic values and accumulator betting slips",
      "Includes strict anti-risk variables to calculate true stakes"
    ],
    simulationType: "aura",
    microTags: ["Alg: Squad Strength Modifier", "Slip: Combo Realism"],
    targetUrl: "https://aistudio.google.com/apps/fc2ac243-09fb-4217-9d89-e9e482cd4903?showPreview=true&showAssistant=true"
  },
  {
    id: "culina",
    title: "Culina // Global Recipe & AI Cooking Companion",
    subtitle: "AI Culinary Assistant",
    shortDescription: "Explore thousands of traditional African and world recipes, use an interactive AI kitchen assistant for step-by-step cooking, and find nearby luxury restaurants.",
    longDescription: "Explore thousands of traditional African and world recipes, use an interactive AI kitchen assistant for step-by-step cooking, and find nearby luxury restaurants.",
    architectureStack: ["Sora Geometric Core", "CookAssistant LLM", "Google Maps Places", "React / Tailwind"],
    capabilities: [
      "Explore hundreds of traditional African and world recipes",
      "Interactive Step-by-Step cooking helper with custom sound timers",
      "Instant sourcing for nearby luxury restaurants and direct quality ingredient vendors"
    ],
    simulationType: "culina",
    microTags: ["Core: Sora Geometric", "Engine: CookAssistant AI"],
    targetUrl: "https://culina.donmay.africa"
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "targeted-advertising",
    title: "Targeted Advertising (Targeted Ads Services)",
    subtitle: "Data-Driven Hyper Reach",
    category: "marketing",
    description: "Launch highly optimized, data-driven promotion campaigns built specifically to expand your digital page authority, create new conversion leads, and scale brand product sales. Features advanced laser-focused audience filters.",
    deliverables: [
      "Advanced Demographic Filtering: Geolocation targeting (specific cities/states)",
      "Precise Age Group & Gender calibration",
      "Professional Targeting: Industry matching, specific job roles, and corporate seniority",
      "Dynamic ad copywriting & creative multi-channel design arrays",
      "Fully integrated tracking pixels (Meta, Google, TikTok) & growth dashboard logs"
    ],
    priceRange: "From $500 USD",
    deliveryTime: "5 - 10 Days"
  },
  {
    id: "social-media",
    title: "Social Media Management",
    subtitle: "Full-Service Page Optimization",
    category: "marketing",
    description: "Secure consistent global brand growth with our comprehensive, automated management arrays. Includes profile structure optimization, consistent posting schedules, and active audience engagement.",
    deliverables: [
      "Strategic content calendar & automated scheduling matrices",
      "Daily high-converting copy, trending hashtag extraction, and hooks",
      "Direct audience response management & sentiment monitoring",
      "Monthly comprehensive performance audits and shadowban guard scans"
    ],
    priceRange: "From $450 USD / Month",
    deliveryTime: "Monthly Retention"
  },
  {
    id: "video-commercials",
    title: "Video Commercials (Advertising)",
    subtitle: "High-Impact Commercial Suite",
    category: "media",
    description: "Promote key corporate events, announce groundbreaking new product releases, and scale brand visibility with custom high-production commercial edits.",
    deliverables: [
      "Complete visual narrative planning & commercial script writing",
      "Cinematic composition, royalty-free licensing, & sound master engineering",
      "Targeted cuts optimized for social platforms (YouTube, Instagram Reels, TikTok)",
      "Completed 4K ultra-resolutions with high-retention pacing models"
    ],
    priceRange: "From $600 USD",
    deliveryTime: "7 - 14 Days"
  },
  {
    id: "cartoon-animation",
    title: "Cartoon Animation",
    subtitle: "High-Fidelity Cartoon & Storytelling",
    category: "media",
    description: "Communicate complex concepts and build deep viewer loyalty with creative storytelling cartoon animations and high-fidelity custom animated characters.",
    deliverables: [
      "Custom cartoon character concepts and scene background vectors",
      "Storyboard orchestration and custom storyboard layout drafts",
      "Premium character lip-sync matching and acting movement animations",
      "Bespoke sound effects & commercial broadcast license certificates"
    ],
    priceRange: "From $750 USD",
    deliveryTime: "10 - 20 Days"
  },
  {
    id: "video-editing",
    title: "Video Editing",
    subtitle: "Professional Post-Production Splicing",
    category: "media",
    description: "Transform raw footage into professional, high-retention stories. Features premium pacing adjustments, color science matching, voice cleaning, and cinematic grading.",
    deliverables: [
      "High-retention pace editing conforming to digital algorithms",
      "Professional color grading matching cinema standards (LUT application)",
      "Audio enhancement, noise extraction, sound effect stacking, and subtitles",
      "Multi-camera sync engineering and motion graphics titles"
    ],
    priceRange: "From $300 USD",
    deliveryTime: "3 - 7 Days"
  }
];
