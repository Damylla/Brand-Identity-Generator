import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '15mb' }));

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Helper to sanitize SVG
function cleanSvg(raw: string): string {
  if (!raw) return '';
  let svg = raw.trim();
  const match = svg.match(/<svg[\s\S]*?<\/svg>/i);
  if (match) {
    svg = match[0];
  }
  return svg;
}

// 1. Generate Brand Bible Endpoint
app.post('/api/brand/generate', async (req, res) => {
  try {
    const { mission, industry, archetype, mood, brandNameHint } = req.body;

    if (!mission || typeof mission !== 'string' || mission.trim().length === 0) {
      return res.status(400).json({ error: 'Company mission is required.' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured. Please configure your key in Secrets or use one of the curated presets.',
      });
    }

    const prompt = `You are a world-renowned brand identity designer and corporate identity director (like Pentagram, Collins, Wolff Olins).
Create a complete, comprehensive "Brand Bible" for a company with the following mission:
Mission: "${mission}"
${industry ? `Industry: ${industry}` : ''}
${archetype ? `Brand Archetype: ${archetype}` : ''}
${mood ? `Aesthetic Mood & Keywords: ${mood}` : ''}
${brandNameHint ? `Brand Name Preferred: ${brandNameHint}` : ''}

Generate an exquisite, high-craft Brand Identity containing:
1. Brand Core: brandName, evocative tagline, mission statement, sharp positioning statement, archetype, industry, 3 core values (title + description).
2. Voice and Tone: 5 attributes, 3 DOs, 3 DONTs, formality index (0-100), energy index (0-100).
3. Primary Logo:
   - concept description
   - clearspace rule
   - minimum size recommendation
   - svgContent: MUST be a completely valid, self-contained, beautiful SVG vector string with viewBox="0 0 400 120", containing clean geometric paths/shapes, aesthetic gradients, and crisp wordmark typography.
4. Secondary Marks: 4 distinct marks (type: 'icon', 'monochrome', 'badge', 'lockup') with name, description, and valid self-contained SVG strings (viewBox="0 0 100 100" for icon, viewBox="0 0 400 120" for monochrome and lockup, viewBox="0 0 160 160" for badge).
5. 5-Color Hex Palette with exact usage notes following the classic 60-30-10 design system rule:
   - Dominant (60%): main canvas/backdrop/structural anchor
   - Secondary (30%): cards, navigation, supporting sections
   - Accent (10%): CTA buttons, active state indicators, key focal points
   - Neutral Dark (System): typography, heavy borders
   - Neutral Light (System): clean background tint, high contrast
   Provide hex (#RRGGBB), color name, percentage, usage notes, and accessibility summary.
6. Typography:
   - Suggested Google Font pairings for headers (Display or Serif/Sans) and body text (hyper-legible Sans or Serif)
   - Include actual Google Font family names (e.g. 'Cinzel', 'Plus Jakarta Sans', 'Space Grotesk', 'Playfair Display', 'Syne', 'Inter', 'Outfit', 'Cabinet Grotesk', 'Fraunces', 'DM Sans', 'Lora', 'Manrope')
   - Weights, category, pairing rationale, and evocative preview text.
   - Type scale with 7 steps.
7. Imagery Guidelines:
   - Art direction summary, 5 mood keywords, lighting & composition notes.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction:
          'You are a master brand designer. Output strictly valid JSON conforming to the requested Brand Bible structure. Ensure all SVGs are valid, beautifully styled, and render crisp vectors.',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            brandName: { type: Type.STRING },
            tagline: { type: Type.STRING },
            mission: { type: Type.STRING },
            positioning: { type: Type.STRING },
            archetype: { type: Type.STRING },
            industry: { type: Type.STRING },
            brandValues: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ['title', 'description'],
              },
            },
            voiceAndTone: {
              type: Type.OBJECT,
              properties: {
                attributes: { type: Type.ARRAY, items: { type: Type.STRING } },
                dos: { type: Type.ARRAY, items: { type: Type.STRING } },
                donts: { type: Type.ARRAY, items: { type: Type.STRING } },
                formality: { type: Type.INTEGER },
                energy: { type: Type.INTEGER },
              },
              required: ['attributes', 'dos', 'donts', 'formality', 'energy'],
            },
            logos: {
              type: Type.OBJECT,
              properties: {
                primary: {
                  type: Type.OBJECT,
                  properties: {
                    concept: { type: Type.STRING },
                    clearspace: { type: Type.STRING },
                    minSize: { type: Type.STRING },
                    svgContent: { type: Type.STRING },
                  },
                  required: ['concept', 'clearspace', 'minSize', 'svgContent'],
                },
                secondaryMarks: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      type: { type: Type.STRING },
                      name: { type: Type.STRING },
                      description: { type: Type.STRING },
                      svgContent: { type: Type.STRING },
                    },
                    required: ['type', 'name', 'description', 'svgContent'],
                  },
                },
              },
              required: ['primary', 'secondaryMarks'],
            },
            palette: {
              type: Type.OBJECT,
              properties: {
                colors: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      role: { type: Type.STRING },
                      hex: { type: Type.STRING },
                      name: { type: Type.STRING },
                      percentage: { type: Type.STRING },
                      usageNotes: { type: Type.STRING },
                    },
                    required: ['role', 'hex', 'name', 'percentage', 'usageNotes'],
                  },
                },
                accessibilityNotes: { type: Type.STRING },
                applicationGuidelines: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['colors', 'accessibilityNotes', 'applicationGuidelines'],
            },
            typography: {
              type: Type.OBJECT,
              properties: {
                headerFont: {
                  type: Type.OBJECT,
                  properties: {
                    family: { type: Type.STRING },
                    weights: { type: Type.ARRAY, items: { type: Type.STRING } },
                    category: { type: Type.STRING },
                    pairingRationale: { type: Type.STRING },
                    previewText: { type: Type.STRING },
                  },
                  required: ['family', 'weights', 'category', 'pairingRationale'],
                },
                bodyFont: {
                  type: Type.OBJECT,
                  properties: {
                    family: { type: Type.STRING },
                    weights: { type: Type.ARRAY, items: { type: Type.STRING } },
                    category: { type: Type.STRING },
                    pairingRationale: { type: Type.STRING },
                    previewText: { type: Type.STRING },
                  },
                  required: ['family', 'weights', 'category', 'pairingRationale'],
                },
                typeScale: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      level: { type: Type.STRING },
                      size: { type: Type.STRING },
                      lineHeight: { type: Type.STRING },
                      weight: { type: Type.STRING },
                      fontTarget: { type: Type.STRING },
                    },
                    required: ['level', 'size', 'lineHeight', 'weight', 'fontTarget'],
                  },
                },
                cssSnippet: { type: Type.STRING },
              },
              required: ['headerFont', 'bodyFont', 'typeScale'],
            },
            imageryGuidelines: {
              type: Type.OBJECT,
              properties: {
                artDirection: { type: Type.STRING },
                moodKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                lightingAndComposition: { type: Type.STRING },
              },
              required: ['artDirection', 'moodKeywords', 'lightingAndComposition'],
            },
          },
          required: [
            'brandName',
            'tagline',
            'mission',
            'positioning',
            'archetype',
            'industry',
            'brandValues',
            'voiceAndTone',
            'logos',
            'palette',
            'typography',
            'imageryGuidelines',
          ],
        },
      },
    });

    const rawJson = response.text || '{}';
    const parsed = JSON.parse(rawJson);

    // Sanitize SVGs
    if (parsed.logos?.primary?.svgContent) {
      parsed.logos.primary.svgContent = cleanSvg(parsed.logos.primary.svgContent);
    }
    if (Array.isArray(parsed.logos?.secondaryMarks)) {
      parsed.logos.secondaryMarks = parsed.logos.secondaryMarks.map((m: any) => ({
        ...m,
        svgContent: cleanSvg(m.svgContent),
      }));
    }
    parsed.imageryGuidelines.generatedAssets = [];

    return res.json({ brandBible: parsed });
  } catch (err: any) {
    console.error('Error in /api/brand/generate:', err);
    return res.status(500).json({
      error: err.message || 'Failed to generate Brand Bible.',
    });
  }
});

// 2. Multi-Turn Gemini Chatbot Endpoint
app.post('/api/chat/message', async (req, res) => {
  try {
    const { messages, brandBibleContext, model } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages history is required.' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured. Please configure your key in Secrets.',
      });
    }

    // Supported models specified in user instructions:
    // gemini-4-carbon (deep reasoning), gemini-4-argon (complex interactive),
    // gemini-3.8-flash (general tasks), gemini-3.1-flash-lite (fast tasks)
    const validModels = [
      'gemini-3.8-flash',
      'gemini-4-carbon',
      'gemini-4-argon',
      'gemini-3.1-flash-lite',
    ];
    const selectedModel = validModels.includes(model) ? model : 'gemini-3.8-flash';

    const brandSummary = brandBibleContext
      ? `CURRENT ACTIVE BRAND BIBLE CONTEXT:
Brand Name: ${brandBibleContext.brandName || 'N/A'}
Tagline: ${brandBibleContext.tagline || 'N/A'}
Mission: ${brandBibleContext.mission || 'N/A'}
Positioning: ${brandBibleContext.positioning || 'N/A'}
Archetype: ${brandBibleContext.archetype || 'N/A'}
Voice Attributes: ${brandBibleContext.voiceAndTone?.attributes?.join(', ') || 'N/A'}
Palette: ${brandBibleContext.palette?.colors?.map((c: any) => `${c.role}: ${c.hex} (${c.name})`).join(', ') || 'N/A'}
Typography: Header=${brandBibleContext.typography?.headerFont?.family}, Body=${brandBibleContext.typography?.bodyFont?.family}`
      : 'No active brand bible generated yet.';

    const systemInstruction = `You are "Aura", an Executive Brand Strategist and Identity Director at a world-class creative agency.
Your role: Provide brilliant, actionable, refined advice on brand strategy, positioning, copywriting, messaging hierarchy, marketing campaigns, color psychology, and design application.
Reference the active Brand Bible whenever relevant to give concrete, bespoke suggestions.
Maintain a sophisticated, inspiring, and direct tone. Format answers with clear headings, bullet points, and concise examples where appropriate.

${brandSummary}`;

    // Convert messages into Gemini contents format
    // Map previous user/assistant turns
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config: {
        systemInstruction,
      },
    });

    const reply = response.text || "I couldn't formulate a response. Please try again.";
    return res.json({
      role: 'assistant',
      content: reply,
      modelUsed: selectedModel,
    });
  } catch (err: any) {
    console.error('Error in /api/chat/message:', err);
    return res.status(500).json({
      error: err.message || 'Chat generation failed.',
    });
  }
});

// 3. High-Quality Image Generation Endpoint (using gemini-3-pro-image-preview with 1K, 2K, 4K)
app.post('/api/image/generate', async (req, res) => {
  try {
    const { prompt, size, aspectRatio } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required for image generation.' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured. Please configure your key in Secrets.',
      });
    }

    // Affordance validation for image size (1K, 2K, 4K)
    const validSizes = ['1K', '2K', '4K'];
    const validAspectRatios = ['1:1', '16:9', '4:3', '9:16'];
    const selectedSize = validSizes.includes(size) ? size : '1K';
    const selectedAspectRatio = validAspectRatios.includes(aspectRatio) ? aspectRatio : '1:1';

    // Model per user requirement: gemini-3-pro-image-preview
    // With fallback chain to gemini-3-pro-image and gemini-nano-banana-2.1
    const candidateModels = [
      'gemini-3-pro-image-preview',
      'gemini-3-pro-image',
      'gemini-nano-banana-2.1',
    ];

    let lastError: any = null;
    let imageUrl: string | null = null;
    let successfulModel = '';

    for (const modelCandidate of candidateModels) {
      try {
        console.log(`Attempting image generation with model: ${modelCandidate}, size: ${selectedSize}, aspect: ${selectedAspectRatio}`);
        const response = await ai.models.generateContent({
          model: modelCandidate,
          contents: {
            parts: [{ text: prompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: selectedAspectRatio,
              imageSize: selectedSize,
            },
          },
        });

        const parts = response.candidates?.[0]?.content?.parts ?? [];
        for (const part of parts) {
          if (part.inlineData?.data) {
            const base64Data = part.inlineData.data;
            const mime = part.inlineData.mimeType || 'image/png';
            imageUrl = `data:${mime};base64,${base64Data}`;
            successfulModel = modelCandidate;
            break;
          }
        }

        if (imageUrl) break;
      } catch (err: any) {
        console.warn(`Model ${modelCandidate} failed:`, err.message);
        lastError = err;
      }
    }

    if (!imageUrl) {
      throw lastError || new Error('No image was returned by the generation model.');
    }

    return res.json({
      imageUrl,
      modelUsed: successfulModel,
      size: selectedSize,
      aspectRatio: selectedAspectRatio,
    });
  } catch (err: any) {
    console.error('Error in /api/image/generate:', err);
    return res.status(500).json({
      error: err.message || 'Image generation failed.',
    });
  }
});

// Mount Vite or serve static
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const port = process.env.PORT || 3000;

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: Number(port) },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
