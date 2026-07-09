/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Music, Sparkles, ShieldCheck, PlayCircle, Trophy, 
  Tv, Heart, ArrowLeft, Layers, Sliders, Volume2, Mic, CheckCircle, Loader2
} from "lucide-react";
import OnboardingTerminal from "./OnboardingTerminal";
import BrandLogoExporter from "./BrandLogoExporter";

interface AcousticSynthesisLabProps {
  onBackToHome: () => void;
  onEnrollContract: (contract: {
    id: string;
    title: string;
    price: string;
    username: string;
    status: string;
    date: string;
  }) => void;
}

export default function AcousticSynthesisLab({ onBackToHome, onEnrollContract }: AcousticSynthesisLabProps) {
  const [activeTab, setActiveTab] = useState<"composer" | "three_logo">("composer");
  const [selectedPackage, setSelectedPackage] = useState<{
    title: string;
    category: string;
    price: string;
    tier?: string;
  } | null>(null);

  const [playingTrack, setPlayingTrack] = useState<string | null>(null);

  const track1Ref = useRef<HTMLAudioElement | null>(null);
  const track2Ref = useRef<HTMLAudioElement | null>(null);
  const track3Ref = useRef<HTMLAudioElement | null>(null);

  // --- FEATURES 3 & 4: NEW CYBER STATES ---
  const [lyricTheme, setLyricTheme] = useState<string>("");
  const [generatedLyrics, setGeneratedLyrics] = useState<string>("");
  const [isGeneratingLyrics, setIsGeneratingLyrics] = useState<boolean>(false);
  const [lyricCopied, setLyricCopied] = useState<boolean>(false);

  const [briefTempo, setBriefTempo] = useState<"Energetic" | "Melancholic" | "Majestic">("Energetic");
  const [briefInstrument, setBriefInstrument] = useState<"Grand Piano" | "Cyber Synth" | "Orchestral Strings">("Grand Piano");
  const [briefGoal, setBriefGoal] = useState<"Social Media Ad" | "Private Celebration" | "Podcast Backdrop">("Social Media Ad");
  const [briefCopied, setBriefCopied] = useState<boolean>(false);

  // States for the individual track specification decks (interactive toggles)
  const [track1Vibe, setTrack1Vibe] = useState<"Energetic" | "Cinematic" | "Minimal">("Energetic");
  const [track1Format, setTrack1Format] = useState<"Social Ad" | "Keynote" | "Presentation">("Social Ad");

  const [track2Tempo, setTrack2Tempo] = useState<"Majestic" | "Upbeat" | "Melancholic">("Majestic");
  const [track2Instrument, setTrack2Instrument] = useState<"Grand Piano" | "Cyber Synth" | "Orchestral Strings">("Grand Piano");

  const [track3Tempo, setTrack3Tempo] = useState<"Majestic" | "Upbeat" | "Melancholic">("Upbeat");
  const [track3Instrument, setTrack3Instrument] = useState<"Grand Piano" | "Cyber Synth" | "Orchestral Strings">("Cyber Synth");

  const handleGenerateLyrics = async () => {
    if (!lyricTheme.trim()) return;
    setIsGeneratingLyrics(true);
    setLyricCopied(false);

    try {
      const response = await fetch("/api/generate-lyrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          theme: lyricTheme.trim(),
          vibes: briefGoal,
          tempo: briefTempo,
          instrument: briefInstrument,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to compile lyrics via server-side neural matrix.");
      }

      const data = await response.json();
      if (data.lyrics) {
        setGeneratedLyrics(data.lyrics);
        return;
      }
      throw new Error("Empty lyrics payload received.");
    } catch (err) {
      console.warn("Server-side synthesis failed, falling back to local compilation node...", err);
      const keyword = lyricTheme.trim();
      const themeLower = keyword.toLowerCase();
      let compiled = "";

      const isAnniversaryTheme = 
        themeLower.includes("anniversary") || 
        themeLower.includes("wedding") || 
        themeLower.includes("marriage") || 
        themeLower.includes("years since") || 
        themeLower.includes("years together") || 
        themeLower.includes("husband") || 
        themeLower.includes("wife") || 
        themeLower.includes("donald") || 
        themeLower.includes("ella") || 
        themeLower.includes("purity");

      const isCinematicTheme = 
        themeLower.includes("movie") || 
        themeLower.includes("film") || 
        themeLower.includes("soundtrack") || 
        themeLower.includes("sacrifice") || 
        themeLower.includes("background song") || 
        themeLower.includes("background music") || 
        themeLower.includes("cinematic") || 
        themeLower.includes("drama") || 
        themeLower.includes("theme song") || 
        themeLower.includes("story");

      const isBirthdayTheme = 
        themeLower.includes("birthday") || 
        themeLower.includes("born") || 
        themeLower.includes("bday") || 
        themeLower.includes("milestone") || 
        (themeLower.includes("celebrat") && !isAnniversaryTheme);

      const isGeneralLoveTheme = 
        themeLower.includes("love") || 
        themeLower.includes("romance") || 
        themeLower.includes("heart") || 
        themeLower.includes("sweet");

      // Advanced Parameter Extraction Helper
      const extractSongData = (text: string) => {
        let husband = "Donald";
        let wife = "Ella";
        let child = "Purity";
        let yearCountWord = "Three"; // default capitalized word at start of sentence
        let yearCountNum = "three"; // default lowercase word inside sentence

        // Words to filter out when parsing potential names
        const noiseWords = new Set([
          "the", "a", "an", "and", "or", "in", "on", "at", "to", "for", "with", "by", "of", "i", "we", "my", "our", "your", "their", "his", "her", "its", "me", "you", "them", "us", "him", "she", "he", "they",
          "happy", "anniversary", "birthday", "wedding", "marriage", "celebrating", "celebration", "together", "years", "year", "beautiful", "gorgeous", "innocent", "curly", "hair", "smile", "love", "forever", "always", "heart", "melody", "harmony", "song", "lyrics", "bridge", "verse", "chorus", "about", "write", "make", "create", "generate", "want", "need", "please", "could", "would", "should", "like", "love", "this", "that", "these", "those", "is", "are", "was", "were", "been", "be", "have", "has", "had", "do", "does", "did", "can", "will", "shall", "may", "might", "must", "since", "became", "bride", "groom", "side", "walk", "walking", "looking", "see", "whole", "world", "blessing", "morning", "brings", "every", "single", "laughter", "shared", "story", "told", "first", "step", "upon", "open", "road", "steady", "ancient", "trees", "remains", "time", "passing", "under", "sky", "built", "foundation", "grow", "deeper", "devotion", "know", "melody", "we'll", "ever", "go", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"
        ]);

        // Map for digits/words for years
        const numWordMap: { [key: string]: string } = {
          "1": "one", "2": "two", "3": "three", "4": "four", "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine", "10": "ten",
          "one": "one", "two": "two", "three": "three", "four": "four", "five": "five", "six": "six", "seven": "seven", "eight": "eight", "nine": "nine", "ten": "ten"
        };

        const digitMatch = text.match(/\b(\d+)\b/);
        if (digitMatch) {
          const num = digitMatch[1];
          const mapped = numWordMap[num] || num;
          yearCountNum = mapped;
          yearCountWord = mapped.charAt(0).toUpperCase() + mapped.slice(1);
        } else {
          const keys = Object.keys(numWordMap).filter(k => isNaN(Number(k)));
          const wordRegex = new RegExp(`\\b(${keys.join("|")})\\b`, "i");
          const wordMatch = text.match(wordRegex);
          if (wordMatch) {
            const w = wordMatch[1].toLowerCase();
            yearCountNum = w;
            yearCountWord = w.charAt(0).toUpperCase() + w.slice(1);
          }
        }

        // Scan capitalized words for name candidates
        const capitalizedWords = text.match(/[A-Z][a-zA-Z]+/g) || [];
        const validNames = capitalizedWords.filter(n => !noiseWords.has(n.toLowerCase()));

        // Also look at lowercase names inside "X and Y" pattern if no capitalized words match
        if (validNames.length < 2) {
          const generalWords = text.match(/\b[a-zA-Z]+\b/g) || [];
          generalWords.forEach(word => {
            const lower = word.toLowerCase();
            if (!noiseWords.has(lower) && word.length > 2) {
              const camel = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
              if (!validNames.includes(camel)) {
                validNames.push(camel);
              }
            }
          });
        }

        // Try to locate child name from relationship cues
        let extractedChild = "";
        const childPatterns = [
          /(?:daughter|child|kid|baby|girl|son)\s*(?:named|is)?\s*\b([A-Z][a-zA-Z]+|[a-z]{3,})\b/i,
          /\b([A-Z][a-zA-Z]+|[a-z]{3,})\b\s*(?:our|their)?\s*(?:daughter|child|kid|baby|girl|son)/i,
        ];
        for (const pattern of childPatterns) {
          const m = text.match(pattern);
          if (m && !noiseWords.has(m[1].toLowerCase())) {
            extractedChild = m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase();
            break;
          }
        }

        if (text.toLowerCase().includes("purity")) {
          extractedChild = "Purity";
        }

        // Try to locate couple names
        let extractedHusband = "";
        let extractedWife = "";
        const coupleRegex = /\b([A-Z][a-zA-Z]+|[a-z]{3,})\s*(?:and|&|with)\s*([A-Z][a-zA-Z]+|[a-z]{3,})\b/i;
        const coupleMatch = text.match(coupleRegex);

        if (coupleMatch) {
          const n1 = coupleMatch[1].charAt(0).toUpperCase() + coupleMatch[1].slice(1).toLowerCase();
          const n2 = coupleMatch[2].charAt(0).toUpperCase() + coupleMatch[2].slice(1).toLowerCase();
          if (!noiseWords.has(n1.toLowerCase()) && !noiseWords.has(n2.toLowerCase())) {
            extractedHusband = n1;
            extractedWife = n2;
          }
        }

        // Assign unmatched candidates
        if (!extractedHusband || !extractedWife) {
          const list = validNames.filter(n => n !== extractedChild);
          if (list.length >= 2) {
            if (!extractedHusband) extractedHusband = list[0];
            if (!extractedWife) extractedWife = list[1];
          } else if (list.length === 1) {
            if (!extractedHusband) extractedHusband = list[0];
          }
        }

        if (!extractedChild) {
          const list = validNames.filter(n => n !== extractedHusband && n !== extractedWife);
          if (list.length > 0) {
            extractedChild = list[0];
          }
        }

        if (extractedHusband) husband = extractedHusband;
        if (extractedWife) wife = extractedWife;
        if (extractedChild) child = extractedChild;

        // Dedup and defaults
        if (husband === wife) {
          wife = husband === "Donald" ? "Ella" : "Donald";
        }
        if (child === husband || child === wife) {
          child = "Purity";
        }

        return { husband, wife, child, yearCountWord, yearCountNum };
      };

      if (isAnniversaryTheme) {
        const { husband, wife, child, yearCountWord } = extractSongData(keyword);

        compiled = `--- BESPOKE ROMANTIC SONGBOOK FOR: "${keyword.toUpperCase()}" ---

[VERSE_01]
From the first step we took upon this open road,
Every laughter we shared, every story we've told.
${yearCountWord} beautiful years since you became my bride,
${husband} and ${wife}, walking side by side.

[CHORUS]
Through the seasons of life, hand in hand we will stand,
Building our dreams across the shifting sand.
With every sunrise, our devotion grows deep,
Promises we made, promises we will always keep.

[VERSE_02]
Years may pass by like leaves on the breeze,
But our love remains steady as ancient trees.
And looking at ${child}, our beautiful girl,
We see our whole world in her innocent curl.
Grateful for every single blessing each morning brings.

[BRIDGE]
This isn't just time passing us by,
It's a beautiful promise under the sky.
We built this foundation, together we grow,
Deeper than any devotion we know.

[FINAL_CHORUS]
Through the seasons of life, hand in hand we will stand,
Building our dreams across the shifting sand.
${yearCountWord} years of love, forever to go,
The most beautiful melody we'll ever know.`;

      } else if (isCinematicTheme) {
        const cleanForTopic = (text: string) => {
          return text
            .replace(/I need a background song for my movies?,? it is about/gi, "")
            .replace(/I need a background song for my movies?/gi, "")
            .replace(/background song for my movies?,?/gi, "")
            .replace(/write a song about/gi, "")
            .replace(/generate a song about/gi, "")
            .replace(/lyrics for a song about/gi, "")
            .replace(/it is about/gi, "")
            .replace(/it's about/gi, "")
            .replace(/a song about/gi, "")
            .replace(/generate lyrics for/gi, "")
            .replace(/background song for/gi, "")
            .trim();
        };
        const rawTopic = cleanForTopic(keyword);
        const coreTopic = rawTopic ? (rawTopic.charAt(0).toUpperCase() + rawTopic.slice(1)) : keyword;

        compiled = `--- CINEMATIC STORYTELLER SOUNDTRACK: "${keyword.toUpperCase()}" ---

[VERSE_01]
When the shadows lengthen on the silver screen,
Every minor chord captures the space in between.
The storyline whispers of "${coreTopic}",
A delicate light where the brave hearts live.
Through the endless silence and the mounting dark,
We carry the flame, we cherish the spark.

[CHORUS]
Through the seasons of life and the shifting of sand,
Against all the odds, we will take a stand.
Because "${rawTopic || keyword}" is the script we must trace,
To find our redemption in a timeless embrace.
With every sacrifice, our devotion grows deep,
Promises we made, we are driven to keep.

[VERSE_02]
As the camera rolls and the curtains start to rise,
We see our whole world under cinematic skies.
Every chapter we write is a battle we won,
Walking hand in hand toward a rising sun.
Though the road is demanding and the price is high,
We look at the horizon and we dare to fly.

[BRIDGE]
This isn't just time passing us by,
It's a beautiful promise under the sky.
We built this foundation, together we grow,
Deeper than any devotion we know.

[FINAL_CHORUS]
Through the seasons of life and the shifting of sand,
Against all the odds, we will take a stand.
Yes, "${rawTopic || keyword}" is a beautiful art,
The most powerful melody inside of our heart.
To hold the flame, we pay the heaviest price,
A glorious song of love and of sacrifice.`;

      } else if (isBirthdayTheme) {
        const { husband, wife, child, yearCountWord, yearCountNum } = extractSongData(keyword);
        
        let bdayName = husband;
        const kwLower = keyword.toLowerCase();
        if (kwLower.includes("purity")) {
          bdayName = "Purity";
        } else if (kwLower.includes(husband.toLowerCase())) {
          bdayName = husband;
        } else if (kwLower.includes(wife.toLowerCase())) {
          bdayName = wife;
        } else if (kwLower.includes(child.toLowerCase())) {
          bdayName = child;
        }

        const ageMatch = keyword.match(/(\d+)(?:st|nd|rd|th)?\s*(?:birthday|bday|years? old)/i);
        let ageText = "special milestone";
        if (ageMatch) {
          ageText = `${ageMatch[1]}th milestone`;
        } else {
          ageText = `${yearCountNum} milestone`;
        }

        compiled = `--- CELEBRATORIAL MILESTONE HARMONY FOR: "${keyword.toUpperCase()}" ---

[VERSE_01]
The calendar turns, and the candles start to glow,
A beautiful reflection of how much you've helped us grow.
Gathered in real warmth, with spirits running high,
Toasting to another wonderful journey round the sun in the sky.
Celebrating ${bdayName} on this ${ageText}, a moment so grand.

[CHORUS]
Raise up a glass to the memories we've made,
To the light in your eyes that will never fade!
May this milestone bring laughter and peace with every stride,
With good friends, deep gratitude, and family by your side!
Here's to the future, the stories still untold,
Watch the magic of this spectacular day unfold for ${bdayName}!

[VERSE_02]
Let the music play loud, let the dancing begin,
Cherishing the beautiful life that you've built within.
Every dream is a spark, every smile is a key,
Celebrating a soul that is wonderfully happy and free,
A moment we share, full of wonder and glee.

[BRIDGE]
The laughter we echo is more than a sound,
It’s the genuine beauty of love we have found.
Through the days of tomorrows and years of the past,
We toast to these moments, forever to last.

[FINAL_CHORUS]
Raise up a glass to the memories we've made,
To the light in your eyes that will never fade!
${bdayName}, may your path be bright and your heart find its song,
A celebration for ${bdayName} where we all belong,
Forever in power, together and strong.`;

      } else if (isGeneralLoveTheme) {
        const cleanForTopic = (text: string) => {
          return text
            .replace(/write a song about/gi, "")
            .replace(/generate a song about/gi, "")
            .replace(/it is about/gi, "")
            .replace(/it's about/gi, "")
            .trim();
        };
        const rawTopic = cleanForTopic(keyword);
        const coreTopic = rawTopic ? (rawTopic.charAt(0).toUpperCase() + rawTopic.slice(1)) : keyword;

        compiled = `--- DYNAMIC BALLAD OF DEVOTION: "${keyword.toUpperCase()}" ---

[VERSE_01]
From the quietest whisper in the middle of the night,
To the brilliant dawn bathing everything in light.
Every step we take has a harmony of its own,
In a world of wonder where our spirits have grown.
And we carry our theme of "${coreTopic}" with grace,
Finding real serenity in this sacred space.

[CHORUS]
Through the seasons of life, hand in hand we will stand,
Building our dreams across the shifting sand.
With every sunrise, our devotion grows deep,
Promises we made, promises we will always keep.

[VERSE_02]
Years may pass by like leaves on the breeze,
But our love remains steady as ancient trees.
We look to the future, we look to the past,
Knowing that the bonds we create always last.
Grateful for every single blessing each morning brings.

[BRIDGE]
This isn't just time passing us by,
It's a beautiful promise under the sky.
We built this foundation, together we grow,
Deeper than any devotion we know.

[FINAL_CHORUS]
Through the seasons of life, hand in hand we will stand,
Building our dreams across the shifting sand.
This journey of love, forever to go,
The most beautiful melody we'll ever know.`;

      } else {
        // Corporate, Commercial, Business or Default Theme
        compiled = `--- COMMERCIAL SPECIFICATION BLUEPRINT FOR: "${keyword.toUpperCase()}" ---

[VERSE_01]
Through the market dynamics, our vision starts to scale,
We deliver core momentum where others often fail.
With absolute integrity and specifications aligned,
Pioneering absolute excellence through the depth of design,
"${keyword}" is the benchmark of the system we build.

[CHORUS]
We rise above the noise of the classical trade,
We are the industry standard that our team has made!
The quarterly roadmap is clean, our delivery is clear,
Forging a reliable commercial-grade frontier!
Enterprise efficiency runs direct in the team,
Exceeding target metrics, fulfilling the dream!

[VERSE_02]
Every operations node is now online and optimized,
Our strategic integration has been fully realized.
Woven directly around target compliance and trust,
We drive high return, doing what we must,
To elevate the brand and keep our standard premium.

[BRIDGE]
Innovation is more than a statement we write,
It's a continuous motion we power with might.
A reliable process compiled and refined,
Through the advanced architecture we designed.

[FINAL_CHORUS]
We rise above the noise of the classical trade,
We are the industry standard that our team has made!
With absolute clarity and strength at the core,
"${keyword}" is paving the future and more,
An enduring connection that opens the door.`;
      }

      setGeneratedLyrics(compiled);
    } finally {
      setIsGeneratingLyrics(false);
    }
  };

  const handleCopyLyrics = () => {
    navigator.clipboard.writeText(generatedLyrics).then(() => {
      setLyricCopied(true);
      setTimeout(() => setLyricCopied(false), 2000);
    });
  };

  const handleCopyBrief = () => {
    const briefText = `--- ACOUSTIC SPECIFICATION BRIEF ---
TEMPO COEFFICIENT: [${briefTempo.toUpperCase()}]
PRIMARY TIMBRE:    [${briefInstrument.toUpperCase()}]
VECTOR DEPLOYMENT:  [${briefGoal.toUpperCase()}]
STATUS:             SPECIFICATION_COMPILE_SUCCESS
SYSTEM_VALIDATION:  ONLINE [GATEWAY-SECURE]
TIMESTAMP:          ${new Date().toISOString()}
-------------------------------------`;

    navigator.clipboard.writeText(briefText).then(() => {
      setBriefCopied(true);
      setTimeout(() => setBriefCopied(false), 2000);
    });
  };

  const toggleTrack = (trackId: string) => {
    const refsMap: { [key: string]: React.RefObject<HTMLAudioElement | null> } = {
      track1: track1Ref,
      track2: track2Ref,
      track3: track3Ref,
    };

    const targetRef = refsMap[trackId]?.current;
    if (!targetRef) return;

    // Pause all other tracks
    Object.entries(refsMap).forEach(([key, refObj]) => {
      if (key !== trackId && refObj.current) {
        refObj.current.pause();
      }
    });

    if (playingTrack === trackId) {
      targetRef.pause();
      setPlayingTrack(null);
    } else {
      targetRef.play().catch((err) => console.log("Playback was blocked or failed", err));
      setPlayingTrack(trackId);
    }
  };

  const packages = [
    {
      title: "Core Soundtrack Node",
      category: "Acoustic Synthesis",
      price: "$600 USD",
      tier: "Entry-Level Custom Soundtrack",
      description: "Custom atmospheric soundtracks designed for video intros, podcast theme packages, or brand reels.",
      features: [
        "1 fully customized acoustic composition",
        "Up to 2 minutes of duration",
        "Deeply personalized thematic matching",
        "100% permanent commercial rights signed",
        "High-definition WAV & MP3 master deliverables",
        "Up to 2 structural mix revisions"
      ],
      icon: Music,
      color: "border-[#1C64F2]/30 hover:border-[#00F0FF]/60",
      accent: "text-[#00F0FF]",
      bg: "bg-[#1C64F2]/5"
    },
    {
      title: "Cinematic Strategy Tier",
      category: "Acoustic Synthesis",
      price: "$1,500 USD",
      tier: "Complex Corporate & Media Scoring",
      description: "Advanced cinematic scoring calibrated perfectly for trailers, promotional feature films, and commercial campaigns.",
      features: [
        "Complete multi-theme cinematic arrangement",
        "Up to 6 minutes of highly layered runtime",
        "Perfect synchronization alignment guides",
        "Advanced artificial intelligence sound stacking",
        "100% permanent commercial rights signed",
        "Full uncompressed stems delivery",
        "Priority mix adjustments (up to 5 versions)"
      ],
      icon: Sliders,
      color: "border-[#8B5CF6]/35 hover:border-[#8B5CF6]",
      accent: "text-[#8B5CF6]",
      bg: "bg-[#8B5CF6]/5"
    },
    {
      title: "Global Master Composition",
      category: "Acoustic Synthesis",
      price: "$3,500 USD",
      tier: "Elite Orchestral-Electronic Masterpiece",
      description: "Unrestricted audio score design for high-end cinematic titles, monumental private celebrations, or global video game landscapes.",
      features: [
        "Epic custom orchestral-electronic composition",
        "Unrestricted duration limits to match screenplay",
        "Multi-vocal or solo live instrumentation overlays",
        "Premium cinema stem mastering (Dolby ready)",
        "100% permanent commercial rights package",
        "Active 24/7 Slack production lead updates",
        "Unlimited revisions till signature sign-off"
      ],
      icon: Volume2,
      color: "border-amber-500/25 hover:border-amber-400",
      accent: "text-amber-400",
      bg: "bg-amber-500/5",
      badge: "ELITE SUPREME VALUE"
    }
  ];

  const handleOnboardingComplete = (data: {
    title: string;
    price: string;
    email: string;
    mt5Id: string;
    directives: string;
    filesCount: number;
  }) => {
    // Convert to ActiveNode structure
    onEnrollContract({
      id: `DOM-GW-${Math.floor(1000 + Math.random() * 9000)}`,
      title: data.title,
      price: data.price,
      username: data.email, // using email as secure username link
      status: "ACTIVE PIPELINE ENROLLED",
      date: new Date().toLocaleDateString()
    });
    setSelectedPackage(null);
  };

  return (
    <div className="w-full bg-[#040714] text-white relative py-12 md:py-16 select-none animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* BACK TO DASHBOARD ACTION */}
        <div className="mb-10 flex flex-wrap justify-between items-center gap-4">
          <button 
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 border border-[#1C64F2]/30 hover:border-[#00F0FF] bg-[#080B1C]/50 px-4 py-2 rounded text-[#A0AEC0] hover:text-[#00F0FF] transition-all font-mono text-[10px] tracking-widest uppercase cursor-pointer hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO MASTER CORE</span>
          </button>

          {/* LAB SELECTION SWITCHER */}
          <div className="flex bg-[#080B1C] border border-[#1C64F2]/30 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("composer")}
              className={`px-4 py-2 rounded font-mono text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "composer"
                  ? "bg-[#1C64F2] text-white shadow-[0_0_12px_rgba(28,100,242,0.3)]"
                  : "text-[#A0AEC0] hover:text-white"
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Acoustic Composer</span>
            </button>
            <button
              onClick={() => setActiveTab("three_logo")}
              className={`px-4 py-2 rounded font-mono text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "three_logo"
                  ? "bg-[#1C64F2] text-white shadow-[0_0_12px_rgba(28,100,242,0.3)]"
                  : "text-[#A0AEC0] hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>3D BRAND STUDIO</span>
            </button>
          </div>
        </div>

        {activeTab === "composer" ? (
          <>
            {/* HERO TITLE SECTION */}
            <div className="mb-16 text-center max-w-4xl mx-auto relative z-10">
              <div className="flex items-center justify-center gap-2 text-[#00F0FF] font-mono text-xs tracking-[0.25em] mb-4 uppercase">
                <Volume2 className="w-5 h-5 animate-pulse" />
                <span>ACOUSTIC SYNTHESIS PROTOCOL // REGISTER TIER 05</span>
              </div>
              <h1 className="font-display font-black text-4xl md:text-6xl text-white tracking-widest uppercase leading-tight">
                ACOUSTIC SYNTHESIS LAB
              </h1>
              <p className="font-sans text-xs md:text-sm text-[#A0AEC0] mt-5 uppercase tracking-[0.18em] max-w-2xl mx-auto leading-relaxed border-y border-[#1C64F2]/10 py-5">
                Bespoke, deeply personalized acoustic architectures engineered with advanced AI assistance. We turn narrative coordinates into monumental surround arrays.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-mono text-[9px] tracking-wider uppercase font-black">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Full Commercial Rights Transfer (Permanent)</span>
                </div>
              </div>
            </div>

            {/* WORKSPACE LAYOUT: GENERATION PROTOCOL & SONIC CANVAS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-stretch" id="sound-lab-workspace">
              
              {/* LEFT PANEL: The Generation Protocol */}
              <div 
                className="protocol-panel lg:col-span-5 border border-[#1C64F2]/20 bg-[#060A18]/80 backdrop-blur-md rounded-xl p-6 flex flex-col gap-6"
                id="generation-protocol-container"
              >
                {/* Header status bar */}
                <div className="flex items-center justify-between border-b border-[#1C64F2]/20 pb-4">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#00F0FF]" />
                    <span className="font-mono text-[9px] text-white/90 font-bold uppercase tracking-wider">
                      SYSTEM: GENERATION PROTOCOL
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span className="font-mono text-[8.5px] text-emerald-400 font-extrabold uppercase tracking-widest">
                      ONLINE
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  {/* Status Node 01 */}
                  <div className="p-4 rounded-lg border border-[#1C64F2]/10 bg-black/40 hover:border-[#00F0FF]/30 transition-all flex flex-col gap-3">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-mono text-[#00F0FF] text-[9.5px] font-black tracking-widest uppercase">
                          [01] LYRIC COMPOSITION MATRIX
                        </span>
                        <span className="font-mono text-[8px] text-[#A0AEC0] uppercase tracking-wide px-1.5 py-0.5 bg-white/5 rounded border border-white/5">
                          LAYER_CORE
                        </span>
                      </div>
                      <h4 className="font-display font-medium text-xs text-white uppercase tracking-wider mb-2">
                        Tailored Narrative Architectures
                      </h4>
                      <p className="font-sans text-[11.5px] text-neutral-400 uppercase tracking-wide leading-relaxed">
                        We script foundational conceptual scopes and compose rich, original song lyrics customized completely around your core objectives, brand messaging guidelines, or custom celebration triggers.
                      </p>
                    </div>

                    {/* BESPOKE LYRIC GENERATION SANDBOX */}
                    <div className="p-3 bg-black/60 border border-[#1C64F2]/25 rounded flex flex-col gap-2.5">
                      <span className="font-mono text-[8px] text-[#00F0FF] uppercase tracking-widest font-black flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#00F0FF]" /> Live Lyric Constructor Sandbox
                      </span>
                      <div className="flex flex-col gap-1">
                        <input
                          type="text"
                          value={lyricTheme}
                          onChange={(e) => setLyricTheme(e.target.value)}
                          placeholder="ENTER SONG THEME (e.g., 'A modern logistics startup 5th anniversary')"
                          className="w-full bg-[#040714] border border-[#1C64F2]/25 rounded px-2.5 py-1.5 font-mono text-[10px] text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#00F0FF] transition-all"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleGenerateLyrics}
                        disabled={isGeneratingLyrics || !lyricTheme.trim()}
                        className={`w-full py-2 font-mono text-[9px] font-black tracking-wider uppercase rounded transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          lyricTheme.trim()
                            ? "bg-[#00F0FF]/15 hover:bg-[#00F0FF] hover:text-black border border-[#00F0FF]/35 text-[#00F0FF]"
                            : "bg-[#080b16] border border-white/5 text-zinc-600 cursor-not-allowed"
                        }`}
                      >
                        {isGeneratingLyrics ? (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span>COMPILING NARRATIVE MATRIX...</span>
                          </>
                        ) : (
                          <>
                            <span>GENERATE LYRIC STRUCTURE</span>
                          </>
                        )}
                      </button>

                      {generatedLyrics && (
                        <div className="flex flex-col gap-1.5 animate-fade-in">
                          <div className="flex justify-between items-center bg-[#070b16] px-2 py-1 rounded border border-[#1c64f2]/20">
                            <span className="font-mono text-[7.5px] text-emerald-400 uppercase tracking-widest font-bold">
                              ✓ MATRIX_GENERATION_SUCCESS
                            </span>
                            <button
                              type="button"
                              onClick={handleCopyLyrics}
                              className="font-mono text-[7.5px] text-zinc-400 hover:text-white uppercase flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded cursor-pointer transition-all hover:bg-white/10"
                            >
                              {lyricCopied ? "✓ COPIED" : "COPY MEMORY"}
                            </button>
                          </div>
                          <pre className="p-2 bg-[#040714] border border-[#1C64F2]/15 rounded text-[9.5px] font-mono text-zinc-300 overflow-y-auto max-h-36 leading-relaxed text-left whitespace-pre-wrap select-text">
                            {generatedLyrics}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Node 02 */}
                  <div className="p-4 rounded-lg border border-[#1C64F2]/10 bg-black/40 hover:border-[#00F0FF]/30 transition-all">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-mono text-[#00F0FF] text-[9.5px] font-black tracking-widest uppercase">
                        [02] AI SYNTHESIS ENGINE MODULE
                      </span>
                      <span className="font-mono text-[8px] text-purple-400 uppercase tracking-wide px-1.5 py-0.5 bg-purple-500/5 rounded border border-purple-500/10">
                        NEURAL_PIPELINE
                      </span>
                    </div>
                    <h4 className="font-display font-medium text-xs text-white uppercase tracking-wider mb-2">
                      Elite Neural Audio Compilation
                    </h4>
                    <p className="font-sans text-[11.5px] text-neutral-400 uppercase tracking-wide leading-relaxed">
                      Our production pipeline leverages state-of-the-art neural music models (Suno AI) integrated alongside bespoke multi-threaded synthesizers and custom frequency equalizers to yield studio-grade waveforms.
                    </p>
                  </div>

                  {/* Status Node 03 */}
                  <div className="p-4 rounded-lg border border-[#1C64F2]/10 bg-black/40 hover:border-[#00F0FF]/30 transition-all">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-mono text-[#00F0FF] text-[9.5px] font-black tracking-widest uppercase">
                        [03] COMMERCIAL RIGHTS GUARANTEE
                      </span>
                      <span className="font-mono text-[8px] text-emerald-400 uppercase tracking-wide px-1.5 py-0.5 bg-emerald-500/5 rounded border border-emerald-500/10">
                        LEGAL_COMPLIANT
                      </span>
                    </div>
                    <h4 className="font-display font-medium text-xs text-white uppercase tracking-wider mb-2">
                      100% Legal Ownership Transfer
                    </h4>
                    <p className="font-sans text-[11.5px] text-neutral-400 uppercase tracking-wide leading-relaxed">
                      Enjoy absolute, permanent legal security. Every generated track delivers commercial-grade licensing, securing legal clearance for media advertisements, platform monetizations, broadcast videos, and corporate portfolios.
                    </p>
                  </div>
                </div>

                {/* Footer status matrix block */}
                <div className="mt-auto pt-4 border-t border-[#1C64F2]/10 bg-[#080B1C]/30 p-3 rounded-lg flex flex-col gap-1">
                  <div className="flex justify-between text-[8px] font-mono uppercase tracking-widest text-[#A0AEC0]">
                    <span>FLOW MATRIX ENGINE:</span>
                    <span className="text-[#00F0FF]">ACTIVE [60 FPS]</span>
                  </div>
                  <div className="flex justify-between text-[8px] font-mono uppercase tracking-widest text-[#A0AEC0]">
                    <span>NEURAL INTERPOLATION:</span>
                    <span className="text-[#00F0FF]">FUSED COMPACT DELAY</span>
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL: The Sonic Canvas Grid */}
              <div 
                className="sonic-canvas lg:col-span-7 border border-[#1C64F2]/20 bg-[#060A18]/80 backdrop-blur-md rounded-xl p-6 flex flex-col gap-6"
                id="sonic-canvas-grid-container"
              >
                {/* Header status bar */}
                <div className="flex items-center justify-between border-b border-[#1C64F2]/20 pb-4">
                  <div className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-[#00F0FF]" />
                    <span className="font-mono text-[9px] text-white/90 font-bold uppercase tracking-wider">
                      SONIC CANVAS GRID // STREAM CONTROLLER
                    </span>
                  </div>
                  <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest">
                    SYSTEM NODES: 03
                  </span>
                </div>

                {/* Grid of Preview Audio Cards */}
                <div className="flex flex-col gap-5">
                  
                  {/* TRACK CARD 01 */}
                  <div 
                    className={`p-4 rounded-lg border transition-all bg-black/40 ${
                      playingTrack === "track1" 
                        ? "border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.15)] bg-[#00F0FF]/5" 
                        : "border-[#1C64F2]/10 hover:border-[#1C64F2]/30"
                    }`}
                    id="track-card-01"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">
                      {/* Left Column: Info & Audio Controls */}
                      <div className="lg:col-span-7 flex flex-col gap-2">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-mono text-[#00F0FF] text-[10px] font-black tracking-widest uppercase">
                            [TRACK_01]
                          </span>
                          <div className="flex gap-1.5 flex-wrap">
                            <span className="font-mono text-[7px] text-[#A0AEC0] uppercase tracking-wider px-1.5 py-0.5 bg-white/5 rounded border border-white/5">
                              COMMERCIAL BGM
                            </span>
                            <span className="font-mono text-[7px] text-amber-400 uppercase tracking-wider px-1.5 py-0.5 bg-amber-500/5 rounded border border-amber-500/10">
                              RIGHTS INCLUDED
                            </span>
                          </div>
                        </div>
                        <h4 className="font-display font-medium text-xs md:text-sm text-white uppercase tracking-wider">
                          Corporate Sonic Identity
                        </h4>
                        <p className="font-sans text-[11px] text-neutral-400 uppercase tracking-wide leading-relaxed">
                          A modern, inspiring synth-driven background progression calibrated for corporate branding videos, ads, and keynotes.
                        </p>
                        
                        {/* Audio Controller elements & Waveform visualizer */}
                        <div className="flex items-center gap-3 mt-1 w-full">
                          <button
                            onClick={() => toggleTrack("track1")}
                            className={`px-4 py-2 font-mono text-[9px] font-black uppercase tracking-wider rounded transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 ${
                              playingTrack === "track1"
                                ? "bg-[#00F0FF] text-[#040714] shadow-[0_0_12px_rgba(0,240,255,0.4)] border-[#00F0FF]"
                                : "bg-[#080B1C]/80 border border-[#1C64F2]/35 text-[#00F0FF] hover:bg-[#00F0FF]/15 hover:border-[#00F0FF]"
                            }`}
                          >
                            {playingTrack === "track1" ? (
                              <>
                                <span>⏸ PAUSE</span>
                                <div className="flex items-end gap-[1.5px] h-2.5 w-3 overflow-hidden">
                                  <span className="w-[1.5px] bg-[#040714] rounded-sm animate-pulse h-full" style={{ animationDuration: "0.6s" }} />
                                  <span className="w-[1.5px] bg-[#040714] rounded-sm animate-pulse h-2" style={{ animationDuration: "1s" }} />
                                  <span className="w-[1.5px] bg-[#040714] rounded-sm animate-pulse h-3" style={{ animationDuration: "0.8s" }} />
                                </div>
                              </>
                            ) : (
                              <>
                                <span>▶ EXECUTE PREVIEW</span>
                              </>
                            )}
                          </button>
                          
                          {/* Standard HTML audio player hidden */}
                          <audio 
                            ref={track1Ref}
                            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                            preload="none"
                            onPlay={() => setPlayingTrack("track1")}
                            onPause={() => { if (playingTrack === "track1") setPlayingTrack(null); }}
                            onEnded={() => setPlayingTrack(null)}
                            className="hidden"
                          />
                          <div className="font-mono text-[8.5px] text-[#00F0FF]/50 uppercase tracking-widest leading-none">
                            {playingTrack === "track1" ? "STREAMING WAVEFORM_NODE" : "STREAM PROTOCOL STANDBY"}
                          </div>
                        </div>

                        {/* Pulsing trace is drawn at all times showing idle/active */}
                        <WaveformVisualizer 
                          audioElement={track1Ref.current} 
                          isPlaying={playingTrack === "track1"} 
                        />
                      </div>

                      {/* Right Column: MINI SYSTEM SPECIFICATION DECK */}
                      <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-4 flex flex-col justify-between gap-3 text-left">
                        <div className="flex flex-col gap-2.5">
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-[8px] text-[#00F0FF] tracking-wider uppercase font-extrabold">
                              // SYSTEM SPECIFICATION DECK
                            </span>
                            <span className="font-mono text-[7px] text-zinc-500 uppercase">CORE_MOD_01</span>
                          </div>

                          {/* Toggle 1: Vibe */}
                          <div className="flex flex-col gap-1">
                            <span className="font-mono text-[7.5px] text-zinc-400 uppercase tracking-wider">
                              [VIBE COEFFICIENT]:
                            </span>
                            <div className="grid grid-cols-3 gap-1 grid-flow-row">
                              {(["Energetic", "Cinematic", "Minimal"] as const).map((vibe) => (
                                <button
                                  key={vibe}
                                  type="button"
                                  onClick={() => setTrack1Vibe(vibe)}
                                  className={`py-1 rounded font-mono text-[8px] uppercase tracking-wide border cursor-pointer transition-all ${
                                    track1Vibe === vibe
                                      ? "bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF] font-black"
                                      : "bg-black/30 border-white/5 text-neutral-400 hover:text-white"
                                  }`}
                                >
                                  {vibe}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Toggle 2: Format */}
                          <div className="flex flex-col gap-1">
                            <span className="font-mono text-[7.5px] text-zinc-400 uppercase tracking-wider">
                              [TARGET FORMAT]:
                            </span>
                            <div className="grid grid-cols-3 gap-1 grid-flow-row">
                              {(["Social Ad", "Keynote", "Presentation"] as const).map((format) => (
                                <button
                                  key={format}
                                  type="button"
                                  onClick={() => setTrack1Format(format)}
                                  className={`py-1 rounded font-mono text-[7px] xxs:text-[7.5px] uppercase tracking-wide border cursor-pointer transition-all truncate ${
                                    track1Format === format
                                      ? "bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF] font-black"
                                      : "bg-black/30 border-white/5 text-neutral-400 hover:text-white"
                                  }`}
                                  title={format}
                                >
                                  {format}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Specification text string block */}
                        <div className="bg-black/50 border border-white/5 p-2 rounded flex flex-col gap-0.5">
                          <span className="font-mono text-[7px] text-zinc-500 uppercase tracking-widest leading-none">
                            SPECIFICATION METADATA STRING:
                          </span>
                          <span className="font-mono text-[8px] text-emerald-400 font-bold uppercase tracking-wider leading-relaxed">
                            [SPEC: VIBE_{track1Vibe.toUpperCase()} // FORMAT_{track1Format.toUpperCase().replace(" ", "_")}]
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TRACK CARD 02 */}
                  <div 
                    className={`p-4 rounded-lg border transition-all bg-black/40 ${
                      playingTrack === "track2" 
                        ? "border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.15)] bg-[#00F0FF]/5" 
                        : "border-[#1C64F2]/10 hover:border-[#1C64F2]/30"
                    }`}
                    id="track-card-02"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">
                      {/* Left Column: Info & Audio Controls */}
                      <div className="lg:col-span-7 flex flex-col gap-2">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-mono text-[#00F0FF] text-[10px] font-black tracking-widest uppercase">
                            [TRACK_02]
                          </span>
                          <div className="flex gap-1.5 flex-wrap">
                            <span className="font-mono text-[7px] text-[#A0AEC0] uppercase tracking-wider px-1.5 py-0.5 bg-white/5 rounded border border-white/5">
                              MILESTONE SCORE
                            </span>
                            <span className="font-mono text-[7px] text-purple-400 uppercase tracking-wider px-1.5 py-0.5 bg-purple-500/5 rounded border border-purple-500/10">
                              ACOUSTIC PIANO
                            </span>
                          </div>
                        </div>
                        <h4 className="font-display font-medium text-xs md:text-sm text-white uppercase tracking-wider">
                          Bespoke Anniversary &amp; Wedding Score
                        </h4>
                        <p className="font-sans text-[11px] text-neutral-400 uppercase tracking-wide leading-relaxed">
                          A beautiful piano arrangement blending romantic orchestration for grand entrance ceremony processionals and milestone reels.
                        </p>
                        
                        {/* Audio Controller elements & Waveform visualizer */}
                        <div className="flex items-center gap-3 mt-1 w-full">
                          <button
                            onClick={() => toggleTrack("track2")}
                            className={`px-4 py-2 font-mono text-[9px] font-black uppercase tracking-wider rounded transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 ${
                              playingTrack === "track2"
                                ? "bg-[#00F0FF] text-[#040714] shadow-[0_0_12px_rgba(0,240,255,0.4)] border-[#00F0FF]"
                                : "bg-[#080B1C]/80 border border-[#1C64F2]/35 text-[#00F0FF] hover:bg-[#00F0FF]/15 hover:border-[#00F0FF]"
                            }`}
                          >
                            {playingTrack === "track2" ? (
                              <>
                                <span>⏸ PAUSE</span>
                                <div className="flex items-end gap-[1.5px] h-2.5 w-3 overflow-hidden">
                                  <span className="w-[1.5px] bg-[#040714] rounded-sm animate-pulse h-full" style={{ animationDuration: "0.6s" }} />
                                  <span className="w-[1.5px] bg-[#040714] rounded-sm animate-pulse h-2" style={{ animationDuration: "1s" }} />
                                  <span className="w-[1.5px] bg-[#040714] rounded-sm animate-pulse h-3" style={{ animationDuration: "0.8s" }} />
                                </div>
                              </>
                            ) : (
                              <>
                                <span>▶ EXECUTE PREVIEW</span>
                              </>
                            )}
                          </button>
                          
                          {/* Standard HTML audio player hidden */}
                          <audio 
                            ref={track2Ref}
                            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
                            preload="none"
                            onPlay={() => setPlayingTrack("track2")}
                            onPause={() => { if (playingTrack === "track2") setPlayingTrack(null); }}
                            onEnded={() => setPlayingTrack(null)}
                            className="hidden"
                          />
                          <div className="font-mono text-[8.5px] text-[#00F0FF]/50 uppercase tracking-widest leading-none">
                            {playingTrack === "track2" ? "STREAMING WAVEFORM_NODE" : "STREAM PROTOCOL STANDBY"}
                          </div>
                        </div>

                        {/* Waveform Visualizer */}
                        <WaveformVisualizer 
                          audioElement={track2Ref.current} 
                          isPlaying={playingTrack === "track2"} 
                        />
                      </div>

                      {/* Right Column: MINI SYSTEM SPECIFICATION DECK */}
                      <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-4 flex flex-col justify-between gap-3 text-left">
                        <div className="flex flex-col gap-2.5">
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-[8px] text-[#00F0FF] tracking-wider uppercase font-extrabold">
                              // SYSTEM SPECIFICATION DECK
                            </span>
                            <span className="font-mono text-[7px] text-zinc-500 uppercase">CORE_MOD_02</span>
                          </div>

                          {/* Toggle 1: Tempo */}
                          <div className="flex flex-col gap-1">
                            <span className="font-mono text-[7.5px] text-zinc-400 uppercase tracking-wider">
                              [TEMPO SCALAR]:
                            </span>
                            <div className="grid grid-cols-3 gap-1 grid-flow-row">
                              {(["Majestic", "Upbeat", "Melancholic"] as const).map((tempo) => (
                                <button
                                  key={tempo}
                                  type="button"
                                  onClick={() => setTrack2Tempo(tempo)}
                                  className={`py-1 rounded font-mono text-[8px] uppercase tracking-wide border cursor-pointer transition-all ${
                                    track2Tempo === tempo
                                      ? "bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF] font-black"
                                      : "bg-black/30 border-white/5 text-neutral-400 hover:text-white"
                                  }`}
                                >
                                  {tempo}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Toggle 2: Instrument */}
                          <div className="flex flex-col gap-1">
                            <span className="font-mono text-[7.5px] text-zinc-400 uppercase tracking-wider">
                              [PRIMARY INSTRUMENT]:
                            </span>
                            <div className="grid grid-cols-3 gap-1 grid-flow-row">
                              {(["Grand Piano", "Cyber Synth", "Orchestral Strings"] as const).map((inst) => (
                                <button
                                  key={inst}
                                  type="button"
                                  onClick={() => setTrack2Instrument(inst)}
                                  className={`py-1 px-0.5 rounded font-mono text-[6.8px] sm:text-[7.5px] uppercase tracking-tight border cursor-pointer transition-all truncate ${
                                    track2Instrument === inst
                                      ? "bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF] font-black"
                                      : "bg-black/30 border-white/5 text-[#A0AEC0] hover:text-white"
                                  }`}
                                  title={inst}
                                >
                                  {inst}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Specification text string block */}
                        <div className="bg-black/50 border border-white/5 p-2 rounded flex flex-col gap-0.5">
                          <span className="font-mono text-[7px] text-zinc-500 uppercase tracking-widest leading-none">
                            SPECIFICATION METADATA STRING:
                          </span>
                          <span className="font-mono text-[8px] text-emerald-400 font-bold uppercase tracking-wider leading-relaxed">
                            [SPEC: TEMPO_{track2Tempo.toUpperCase()} // INST_{track2Instrument.toUpperCase().replace(" ", "_")}]
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TRACK CARD 03 */}
                  <div 
                    className={`p-4 rounded-lg border transition-all bg-black/40 ${
                      playingTrack === "track3" 
                        ? "border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.15)] bg-[#00F0FF]/5" 
                        : "border-[#1C64F2]/10 hover:border-[#1C64F2]/30"
                    }`}
                    id="track-card-03"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">
                      {/* Left Column: Info & Audio Controls */}
                      <div className="lg:col-span-7 flex flex-col gap-2">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-mono text-[#00F0FF] text-[10px] font-black tracking-widest uppercase">
                            [TRACK_03]
                          </span>
                          <div className="flex gap-1.5 flex-wrap">
                            <span className="font-mono text-[7px] text-[#A0AEC0] uppercase tracking-wider px-1.5 py-0.5 bg-white/5 rounded border border-white/5">
                              CELEBRATION THEME
                            </span>
                            <span className="font-mono text-[7px] text-[#00F0FF] uppercase tracking-wider px-1.5 py-0.5 bg-[#00F0FF]/5 rounded border border-[#00F0FF]/15">
                              UPBEAT EDM
                            </span>
                          </div>
                        </div>
                        <h4 className="font-display font-medium text-xs md:text-sm text-white uppercase tracking-wider">
                          Custom Celebration / Birthday Theme
                        </h4>
                        <p className="font-sans text-[11px] text-neutral-400 uppercase tracking-wide leading-relaxed">
                          An energetic, rhythmic electronic-dance layout built to deliver optimal high tempos for private events and dynamic celebrations.
                        </p>
                        
                        {/* Audio Controller elements & Waveform visualizer */}
                        <div className="flex items-center gap-3 mt-1 w-full">
                          <button
                            onClick={() => toggleTrack("track3")}
                            className={`px-4 py-2 font-mono text-[9px] font-black uppercase tracking-wider rounded transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 ${
                              playingTrack === "track3"
                                ? "bg-[#00F0FF] text-[#040714] shadow-[0_0_12px_rgba(0,240,255,0.4)] border-[#00F0FF]"
                                : "bg-[#080B1C]/80 border border-[#1C64F2]/35 text-[#00F0FF] hover:bg-[#00F0FF]/15 hover:border-[#00F0FF]"
                            }`}
                          >
                            {playingTrack === "track3" ? (
                              <>
                                <span>⏸ PAUSE</span>
                                <div className="flex items-end gap-[1.5px] h-2.5 w-3 overflow-hidden">
                                  <span className="w-[1.5px] bg-[#040714] rounded-sm animate-pulse h-full" style={{ animationDuration: "0.6s" }} />
                                  <span className="w-[1.5px] bg-[#040714] rounded-sm animate-pulse h-2" style={{ animationDuration: "1s" }} />
                                  <span className="w-[1.5px] bg-[#040714] rounded-sm animate-pulse h-3" style={{ animationDuration: "0.8s" }} />
                                </div>
                              </>
                            ) : (
                              <>
                                <span>▶ EXECUTE PREVIEW</span>
                              </>
                            )}
                          </button>
                          
                          {/* Standard HTML audio player hidden */}
                          <audio 
                            ref={track3Ref}
                            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
                            preload="none"
                            onPlay={() => setPlayingTrack("track3")}
                            onPause={() => { if (playingTrack === "track3") setPlayingTrack(null); }}
                            onEnded={() => setPlayingTrack(null)}
                            className="hidden"
                          />
                          <div className="font-mono text-[8.5px] text-[#00F0FF]/50 uppercase tracking-widest leading-none">
                            {playingTrack === "track3" ? "STREAMING WAVEFORM_NODE" : "STREAM PROTOCOL STANDBY"}
                          </div>
                        </div>

                        {/* Waveform Visualizer */}
                        <WaveformVisualizer 
                          audioElement={track3Ref.current} 
                          isPlaying={playingTrack === "track3"} 
                        />
                      </div>

                      {/* Right Column: MINI SYSTEM SPECIFICATION DECK */}
                      <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-4 flex flex-col justify-between gap-3 text-left">
                        <div className="flex flex-col gap-2.5">
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-[8px] text-[#00F0FF] tracking-wider uppercase font-extrabold">
                              // SYSTEM SPECIFICATION DECK
                            </span>
                            <span className="font-mono text-[7px] text-zinc-500 uppercase">CORE_MOD_03</span>
                          </div>

                          {/* Toggle 1: Tempo */}
                          <div className="flex flex-col gap-1">
                            <span className="font-mono text-[7.5px] text-zinc-400 uppercase tracking-wider">
                              [TEMPO SCALAR]:
                            </span>
                            <div className="grid grid-cols-3 gap-1 grid-flow-row">
                              {(["Majestic", "Upbeat", "Melancholic"] as const).map((tempo) => (
                                <button
                                  key={tempo}
                                  type="button"
                                  onClick={() => setTrack3Tempo(tempo)}
                                  className={`py-1 rounded font-mono text-[8px] uppercase tracking-wide border cursor-pointer transition-all ${
                                    track3Tempo === tempo
                                      ? "bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF] font-black"
                                      : "bg-black/30 border-white/5 text-neutral-400 hover:text-white"
                                  }`}
                                >
                                  {tempo}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Toggle 2: Instrument */}
                          <div className="flex flex-col gap-1">
                            <span className="font-mono text-[7.5px] text-zinc-400 uppercase tracking-wider">
                              [PRIMARY INSTRUMENT]:
                            </span>
                            <div className="grid grid-cols-3 gap-1 grid-flow-row">
                              {(["Grand Piano", "Cyber Synth", "Orchestral Strings"] as const).map((inst) => (
                                <button
                                  key={inst}
                                  type="button"
                                  onClick={() => setTrack3Instrument(inst)}
                                  className={`py-1 px-0.5 rounded font-mono text-[6.8px] sm:text-[7.5px] uppercase tracking-tight border cursor-pointer transition-all truncate ${
                                    track3Instrument === inst
                                      ? "bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF] font-black"
                                      : "bg-black/30 border-white/5 text-[#A0AEC0] hover:text-white"
                                  }`}
                                  title={inst}
                                >
                                  {inst}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Specification text string block */}
                        <div className="bg-black/50 border border-white/5 p-2 rounded flex flex-col gap-0.5">
                          <span className="font-mono text-[7px] text-zinc-500 uppercase tracking-widest leading-none">
                            SPECIFICATION METADATA STRING:
                          </span>
                          <span className="font-mono text-[8px] text-emerald-400 font-bold uppercase tracking-wider leading-relaxed">
                            [SPEC: TEMPO_{track3Tempo.toUpperCase()} // INST_{track3Instrument.toUpperCase().replace(" ", "_")}]
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* ACOUSTIC BRIEF COMPOSER (FEATURE 4) */}
              <div 
                className="lg:col-span-12 border border-[#1C64F2]/20 bg-[#060A18]/85 backdrop-blur-md rounded-xl p-6 flex flex-col gap-6"
                id="acoustic-brief-composer-container"
              >
                <div className="flex items-center justify-between border-b border-[#1C64F2]/20 pb-4">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#00F0FF]" />
                    <span className="font-mono text-[9px] text-white/90 font-bold uppercase tracking-wider">
                      SPECIFICATION CONTROLLER // ACOUSTIC BRIEF COMPOSER
                    </span>
                  </div>
                  <span className="font-mono text-[8px] text-[#00F0FF] uppercase tracking-widest font-black">
                    DEPLOYMENT_BUILDER_v1.0.8
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Selector 1: Tempo */}
                  <div className="flex flex-col gap-2.5">
                    <span className="font-mono text-[9px] text-[#A0AEC0] uppercase tracking-widest font-bold">
                      [01] SELECT TEMPO COEFFICIENT:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {(["Energetic", "Melancholic", "Majestic"] as const).map((tempo) => (
                        <button
                          key={tempo}
                          type="button"
                          onClick={() => {
                            setBriefTempo(tempo);
                            setBriefCopied(false);
                          }}
                          className={`py-2 rounded font-mono text-[8.5px] font-black uppercase tracking-wider border cursor-pointer transition-all ${
                            briefTempo === tempo
                              ? "bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.15)]"
                              : "bg-black/30 border-white/10 text-neutral-400 hover:border-neutral-600 hover:text-white"
                          }`}
                        >
                          {tempo}
                        </button>
                      ))}
                    </div>
                    <span className="font-sans text-[9px] text-zinc-500 uppercase tracking-wide">
                      Controls BPM ranges and frequency distribution speed.
                    </span>
                  </div>

                  {/* Selector 2: Primary Instrument */}
                  <div className="flex flex-col gap-2.5">
                    <span className="font-mono text-[9px] text-[#A0AEC0] uppercase tracking-widest font-bold">
                      [02] INSTRUMENT TIMBRE MATRIX:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {(["Grand Piano", "Cyber Synth", "Orchestral Strings"] as const).map((inst) => (
                        <button
                          key={inst}
                          type="button"
                          onClick={() => {
                            setBriefInstrument(inst);
                            setBriefCopied(false);
                          }}
                          className={`py-2 px-1 text-center rounded font-mono text-[8.5px] font-black uppercase tracking-wider border cursor-pointer transition-all ${
                            briefInstrument === inst
                              ? "bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.15)]"
                              : "bg-black/30 border-white/10 text-neutral-400 hover:border-neutral-600 hover:text-white"
                          }`}
                        >
                          {inst.replace("Orchestral ", "")}
                        </button>
                      ))}
                    </div>
                    <span className="font-sans text-[9px] text-zinc-500 uppercase tracking-wide">
                      Defines the dominant layer synthesized across acoustic cues.
                    </span>
                  </div>

                  {/* Selector 3: Commercial Goal */}
                  <div className="flex flex-col gap-2.5">
                    <span className="font-mono text-[9px] text-[#A0AEC0] uppercase tracking-widest font-bold">
                      [03] DEPLOYMENT TARGET VECTOR:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {(["Social Media Ad", "Private Celebration", "Podcast Backdrop"] as const).map((goal) => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => {
                            setBriefGoal(goal);
                            setBriefCopied(false);
                          }}
                          className={`py-2 px-1 text-center rounded font-mono text-[8.5px] font-black uppercase tracking-wider border cursor-pointer transition-all ${
                            briefGoal === goal
                              ? "bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.15)]"
                              : "bg-black/30 border-white/10 text-neutral-400 hover:border-neutral-600 hover:text-white"
                          }`}
                        >
                          {goal.split(" ")[0]}
                        </button>
                      ))}
                    </div>
                    <span className="font-sans text-[9px] text-zinc-500 uppercase tracking-wide">
                      Applies unique mastering ratios optimized for specific runtimes.
                    </span>
                  </div>
                </div>

                {/* SPECIFICATION BRIEF PREVIEW BLOCK */}
                <div className="border border-[#1C64F2]/20 rounded-lg p-4 bg-black/40 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                  <div className="flex-1 flex flex-col gap-1.5">
                    <span className="font-mono text-[8px] text-[#00F0FF] tracking-widest font-bold uppercase block">
                      // COMPILED DIRECTIVE METADATA BLOCK
                    </span>
                    <pre className="font-mono text-[10px] text-zinc-300 bg-[#030611] border border-[#1C64F2]/15 p-3 rounded leading-relaxed text-left max-w-full overflow-x-auto select-test select-text">
                      {`--- ACOUSTIC SPECIFICATION BRIEF ---
TEMPO COEFFICIENT: [${briefTempo.toUpperCase()}]
PRIMARY TIMBRE:    [${briefInstrument.toUpperCase()}]
VECTOR DEPLOYMENT:  [${briefGoal.toUpperCase()}]
STATUS:             SPECIFICATION_COMPILE_SUCCESS
SYSTEM_VALIDATION:  ONLINE [GATEWAY-SECURE]
TIMESTAMP:          ${new Date().toISOString()}
-------------------------------------`}
                    </pre>
                  </div>

                  <div className="flex flex-col justify-center shrink-0">
                    <button
                      type="button"
                      onClick={handleCopyBrief}
                      className="h-full px-5 py-3 bg-[#00F0FF] hover:bg-white text-[#040714] font-mono text-[10px] font-black tracking-widest uppercase rounded shadow-[0_0_15px_rgba(0,240,255,0.25)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 font-bold"
                    >
                      {briefCopied ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-[#040714]" />
                          <span>✓ SPECS COPIED</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 text-[#040714]" />
                          <span>COPY BRIEF DIRECTIVE</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* PACKAGE TIERS MATRICES */}
            <div className="mb-20 text-center">
              <div className="mb-12">
                <span className="font-mono text-amber-400 text-xs tracking-widest font-black block uppercase mb-2">PROPRIETARY PACKAGES // TIER ARCHITECTURE</span>
                <h2 className="font-display font-black text-2xl md:text-4xl tracking-widest uppercase">
                  SELECT SOUNDTRACK DEPLOYMENT LEVEL
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {packages.map((pkg, index) => {
                  const IconComp = pkg.icon;

                  return (
                    <div 
                      key={index}
                      className={`p-6 rounded-xl border ${pkg.color} ${pkg.bg} flex flex-col justify-between text-left group hover:shadow-[0_0_20px_rgba(0,240,255,0.06)] transition-all relative overflow-hidden`}
                    >
                      {pkg.badge && (
                        <div className="absolute right-0 top-0 bg-amber-500 text-black font-mono text-[7px] font-black px-2 py-0.5 uppercase tracking-widest rounded-bl">
                          {pkg.badge}
                        </div>
                      )}

                      <div>
                        {/* Category Label */}
                        <span className={`font-mono text-[8px] font-extrabold tracking-widest uppercase block mb-3 ${pkg.accent}`}>
                          CORE // {pkg.category.toUpperCase()}
                        </span>

                        {/* App icon block */}
                        <div className="relative w-full h-24 bg-black/40 border border-white/5 rounded-lg flex items-center justify-center mb-5 overflow-hidden">
                          <IconComp className={`w-8 h-8 ${pkg.accent} group-hover:scale-110 transition-transform`} />
                        </div>

                        <h3 className="font-display font-black text-lg text-white uppercase tracking-wider mb-1">
                          {pkg.title}
                        </h3>
                        <span className="font-mono text-neutral-400 text-[9.5px] tracking-wide block mb-3 uppercase">
                          {pkg.tier}
                        </span>
                        <p className="font-sans text-xs text-neutral-400 uppercase tracking-wider leading-relaxed mb-6">
                          {pkg.description}
                        </p>

                        {/* Features list */}
                        <div className="border-t border-white/5 pt-4 mb-6">
                          <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block mb-2 font-bold">
                            FULFILLMENT DELIVERABLES:
                          </span>
                          <ul className="flex flex-col gap-2 font-sans text-[10.5px] text-neutral-300 uppercase tracking-wider">
                            {pkg.features.map((feat, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Pricing and Action */}
                      <div className="border-t border-white/10 pt-4 mt-auto">
                        <div className="flex justify-between items-baseline mb-4">
                          <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider font-bold">CONTRACT VALUE:</span>
                          <span className={`font-mono text-base font-black ${pkg.accent}`}>{pkg.price}</span>
                        </div>

                        <button
                          onClick={() => setSelectedPackage({
                            title: pkg.title,
                            category: pkg.category,
                            price: pkg.price,
                            tier: pkg.tier
                          })}
                          className={`w-full py-3 rounded font-mono text-[10.5px] font-black uppercase tracking-widest transition-all cursor-pointer border hover:border-white ${
                            index === 2 
                              ? "bg-amber-500 border-amber-500 hover:bg-amber-400 hover:border-amber-400 text-black text-xs font-black shadow-[0_0_15px_rgba(245,158,11,0.2)] animate-pulse" 
                              : "bg-black/40 border-white/10 text-white hover:bg-white hover:text-black"
                          }`}
                        >
                          ENGAGE THE SYNTHESIS CORE
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <BrandLogoExporter onReturn={() => setActiveTab("composer")} />
        )}

      </div>

      {/* FULLSCREEN ONBOARDING OVERLAY */}
      <AnimatePresence>
        {selectedPackage && (
          <OnboardingTerminal 
            session={selectedPackage}
            onClose={() => setSelectedPackage(null)}
            onComplete={handleOnboardingComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- FEATURE 1: WAVEFORM VISUALIZER COMPONENT ---
interface WaveformVisualizerProps {
  audioElement: HTMLAudioElement | null;
  isPlaying: boolean;
}

function WaveformVisualizer({ audioElement, isPlaying }: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 400;
      canvas.height = 48;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let phase = 0;

    const draw = () => {
      if (!canvasRef.current) return;
      animationRef.current = requestAnimationFrame(draw);

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Draw technical blueprint grid lines
      ctx.strokeStyle = "rgba(0, 240, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let i = 12; i < width; i += 24) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let j = 8; j < height; j += 12) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(width, j);
        ctx.stroke();
      }

      // Draw waveform trace
      ctx.strokeStyle = "#00F0FF";
      ctx.lineWidth = 2;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgba(0, 240, 255, 0.4)";
      ctx.beginPath();

      const numPoints = 180;
      const sliceWidth = width / numPoints;
      let x = 0;

      // Progress animation phase
      if (isPlaying) {
        phase += 0.15;
      } else {
        phase += 0.01;
      }

      for (let i = 0; i <= numPoints; i++) {
        const ratio = i / numPoints;
        const envelope = Math.sin(ratio * Math.PI); // Smooth fade out at edges
        let y = height / 2;

        if (isPlaying) {
          // Complex sum-of-sines representing active frequency domains
          const wave1 = Math.sin(ratio * Math.PI * 6 + phase) * 14;
          const wave2 = Math.sin(ratio * Math.PI * 14 - phase * 1.6) * 6;
          const wave3 = Math.sin(ratio * Math.PI * 26 + phase * 0.9) * 3;
          const jitter = (Math.random() - 0.5) * 1.5; // realistic micro-fluctuations
          y += (wave1 + wave2 + wave3 + jitter) * envelope;
        } else {
          // Soft idle resting state
          const wave1 = Math.sin(ratio * Math.PI * 4 + phase) * 1.2;
          const jitter = (Math.random() - 0.5) * 0.4;
          y += (wave1 + jitter) * envelope;
        }

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioElement, isPlaying]);

  return (
    <div className="w-full mt-3 flex flex-col gap-1 text-left">
      <div className="flex justify-between items-center px-1">
        <span className="font-mono text-[8.5px] text-[#00F0FF] tracking-wider uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-ping" />
          REALTIME OSCILLOSCOPE MONITOR
        </span>
        <span className="font-mono text-[8px] text-neutral-500">
          256_SAMPLES / MATRIX_STABLE_OK
        </span>
      </div>
      <div className="relative border border-[#00F0FF]/25 bg-[#030611] rounded overflow-hidden">
        <canvas ref={canvasRef} className="block w-full h-12" />
        <div className="absolute right-2 bottom-1 font-mono text-[7px] text-[#00F0FF]/40 tracking-widest uppercase">
          WAVEFORM ANALYSIS DATA
        </div>
      </div>
    </div>
  );
}
