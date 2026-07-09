import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for dynamic lyric generation
  app.post("/api/generate-lyrics", async (req, res) => {
    try {
      const { theme, vibes, tempo, instrument } = req.body;
      if (!theme || typeof theme !== "string") {
        return res.status(400).json({ error: "A valid lyric theme is required." });
      }

      // Initialize Gemini SDK with telemetry User-Agent as instructed in skill guidelines
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // System instruction explaining song formatting, strict 5-section rule, custom names, year counts
      const systemInstruction = `You are a professional songwriter and lyricist.
Your goal is to generate beautiful, context-aware song lyrics based on the user's prompt (theme).
You MUST follow these rules:

1. THE SONG STRUCTURE (Strictly 5 Sections):
The generated output framework must strictly include only the following section headers, marked clearly:
[VERSE_01]
[CHORUS]
[VERSE_02]
[BRIDGE]
[FINAL_CHORUS]
Do not include any other markdown header sections, intro conversation, or metadata.

2. TEXT PARSING & INTEGRATION RULES:
If the user's text box input mentions specific custom names or details:
- Extract and use the husband's name if mentioned (e.g., "Donald").
- Extract and use the wife's name if mentioned (e.g., "Ella").
- Extract and use the child's name if mentioned (e.g., "Purity").
- Extract and use the specific year count if mentioned (e.g., "3" or "three").
If these are mentioned, write a beautiful romantic or themed song utilizing these names and year count contextually, with no broken phrases, bad grammar, or wrong pronouns.

3. SPECIAL ROMANTIC ANNIVERSARY TEMPLATE EXAMPLE (Few-Shot/Pattern matching or guide):
If you detect names or details resembling the Donald, Ella, and Purity anniversary theme (or if the user requests it), output a custom variation based on this template, keeping the wording cleanly stitched:
[VERSE_01]
From the first step we took upon this open road,
Every laughter we shared, every story we've told.
Three beautiful years since you became my bride,
Donald and Ella, walking side by side.

[CHORUS]
Through the seasons of life, hand in hand we will stand,
Building our dreams across the shifting sand.
With every sunrise, our devotion grows deep,
Promises we made, promises we will always keep.

[VERSE_02]
Years may pass by like leaves on the breeze,
But our love remains steady as ancient trees.
And looking at Purity, our beautiful girl,
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
Three years of love, forever to go,
The most beautiful melody we'll ever know.

4. DYNAMIC GENERATION FOR OTHER THEMES (e.g. Movies, Ads, Podcasts, Other Vibes):
If the user prompts for anything else (e.g., "I need a background song for my movies, it is about love is sweet but sacrifice", or any other creative idea), do NOT use the anniversary names or elements unless they match. Instead, dynamically generate highly creative, high-quality, professional, poetic lyrics specifically capturing the user's exact theme, while strictly maintaining the same 5-section layout: [VERSE_01], [CHORUS], [VERSE_02], [BRIDGE], and [FINAL_CHORUS]. DO NOT use hardcoded placeholders or template blocks. Make the song cohesive, touching, flowing, and deeply adapted to the provided prompt.

IMPORTANT guidelines:
- Return ONLY the compiled song lyrics with the headers. No intro conversational preamble, no trailing commentary. Just the song format.`;

      // Prompt the model
      const model = "gemini-3.5-flash"; // Basic/general text task model recommended in skill guidelines
      
      const userPrompt = `Generate lyrics for the theme: "${theme}". 
Vibes: ${vibes || "Not specified"}.
Tempo: ${tempo || "Not specified"}.
Instrument: ${instrument || "Not specified"}.`;

      const response = await ai.models.generateContent({
        model,
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const generatedText = response.text || "Failed to generate lyrics.";
      res.json({ lyrics: generatedText });
    } catch (error: any) {
      console.error("Gemini Generation Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate lyrics." });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
