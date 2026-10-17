import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini client with aistudio-build telemetry header per guidelines
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

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '15mb' }));

  // --- API Routes ---

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      hasApiKey: Boolean(apiKey),
      timestamp: new Date().toISOString(),
    });
  });

  // 1. Multi-turn Chatbot endpoint with role-based system instructions
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      if (!ai) {
        return res.status(503).json({
          error: 'مفتاح Gemini API غير مهيأ في بيئة الخادم. يرجى ضبط GEMINI_API_KEY.',
        });
      }

      const { messages, model = 'gemini-3.8-flash', systemInstruction } = req.body;

      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'قائمة الرسائل مطلوبة' });
      }

      // Allowed models per requirements
      const validModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-4-argon'];
      const selectedModel = validModels.includes(model) ? model : 'gemini-3.8-flash';

      const defaultSystemInstruction =
        'أنت "المستشار الذكي لمنصة BeInSkills"، خبير تنمية القدرات والمهارات وسوق التكوينات الاحترافية في العالم العربي والمغرب العربي. ' +
        'تحدث بلغة عربية احترافية، مشجعة وواضحة ومرتبة مع نقاط ونبرة ملهمة. شعارنا هو "انغمس في المهارة، أصنع المستقبل". ' +
        'ساعد المتدربين على اختيار أفضل التكوينات، فهم جواز المهارات، تخطيط مسارهم الوظيفي، وبناء مشاريع حقيقية.';

      // Format conversation history for Gemini API
      const formattedContents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: formattedContents,
        config: {
          systemInstruction: systemInstruction || defaultSystemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || 'عذراً، لم أتمكن من صياغة إجابة في الوقت الحالي. يرجى المحاولة ثانية.';
      return res.json({ reply, modelUsed: selectedModel });
    } catch (err: any) {
      console.error('Error in /api/chat:', err);
      return res.status(500).json({
        error: err?.message || 'حدث خطأ أثناء معالجة المحادثة الذكية.',
      });
    }
  });

  // 2. Low-latency instant advice endpoint powered by gemini-3.1-flash-lite
  app.post('/api/quick-advice', async (req: Request, res: Response) => {
    try {
      if (!ai) {
        return res.status(503).json({
          error: 'مفتاح Gemini API غير مهيأ في الخادم.',
        });
      }

      const { query, currentSkill } = req.body;
      const prompt = `أنت محرك التوصيات السريع لمنصة BeInSkills. قدم نصيحة مهارية فورية وموجزة جداً (3 إلى 4 أسطر فقط) وبسرعة فائقة باللغة العربية حول: "${query || currentSkill || 'تطوير المهارات الأكثر طلباً في 2026'}". ركز على الخطوة العملية الأولى.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: {
          systemInstruction: 'أنت مساعد مهاري سريع، ردودك مباشرة وعملية وموجزة بالعربية.',
        },
      });

      return res.json({
        advice: response.text || 'اختر مهارة رقمية محددة وابدأ بمشروع تطبيقي صغير مدته أسبوع.',
        latency: 'ultra-fast',
        model: 'gemini-3.1-flash-lite',
      });
    } catch (err: any) {
      console.error('Error in /api/quick-advice:', err);
      return res.status(500).json({
        error: err?.message || 'تعذر جلب التوصية السريعة.',
      });
    }
  });

  // 3. High-quality image generation using gemini-3-pro-image-preview with 1K, 2K, and 4K support
  app.post('/api/generate-image', async (req: Request, res: Response) => {
    try {
      if (!ai) {
        return res.status(503).json({
          error: 'مفتاح Gemini API غير مهيأ في الخادم.',
        });
      }

      const {
        prompt,
        imageSize = '1K',
        aspectRatio = '1:1',
      } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'يرجى تقديم وصف للصورة' });
      }

      // Valid sizes: 1K, 2K, 4K
      const validSizes = ['1K', '2K', '4K'];
      const selectedSize = validSizes.includes(imageSize) ? imageSize : '1K';

      // Enhance prompt for BeInSkills visual identity if applicable
      const enhancedPrompt = `${prompt}. Premium 3D isometric badge / vector certificate graphic for BeInSkills learning platform, deep navy background (#0F172A), vibrant glowing purple (#7C3AED) and turquoise neon (#06B6D4) accents, professional mastery emblem, high resolution, hyper-detailed, clean modern aesthetic.`;

      let imageUrl: string | null = null;
      let modelUsed = 'gemini-3-pro-image-preview';

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: {
            parts: [{ text: enhancedPrompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: aspectRatio || '1:1',
              imageSize: selectedSize as '1K' | '2K' | '4K',
            },
          },
        });

        const candidates = response.candidates;
        if (candidates && candidates[0]?.content?.parts) {
          for (const part of candidates[0].content.parts) {
            if (part.inlineData?.data) {
              const mime = part.inlineData.mimeType || 'image/png';
              imageUrl = `data:${mime};base64,${part.inlineData.data}`;
              break;
            }
          }
        }
      } catch (firstErr: any) {
        console.warn('Initial model gemini-3-pro-image-preview call encountered issue, attempting compatible fallback:', firstErr?.message);
        // Fallback to gemini-nano-banana-2.1 or gemini-3.1-flash-lite-image if needed
        try {
          modelUsed = 'gemini-nano-banana-2.1';
          const fallbackResp = await ai.models.generateContent({
            model: 'gemini-nano-banana-2.1',
            contents: { parts: [{ text: enhancedPrompt }] },
            config: {
              imageConfig: {
                aspectRatio: aspectRatio || '1:1',
                imageSize: selectedSize as '1K' | '2K' | '4K',
              },
            },
          });
          const candidates = fallbackResp.candidates;
          if (candidates && candidates[0]?.content?.parts) {
            for (const part of candidates[0].content.parts) {
              if (part.inlineData?.data) {
                const mime = part.inlineData.mimeType || 'image/png';
                imageUrl = `data:${mime};base64,${part.inlineData.data}`;
                break;
              }
            }
          }
        } catch (secondErr: any) {
          console.warn('Secondary fallback failed, trying gemini-3.1-flash-lite-image:', secondErr?.message);
          modelUsed = 'gemini-3.1-flash-lite-image';
          const thirdResp = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite-image',
            contents: { parts: [{ text: enhancedPrompt }] },
          });
          const candidates = thirdResp.candidates;
          if (candidates && candidates[0]?.content?.parts) {
            for (const part of candidates[0].content.parts) {
              if (part.inlineData?.data) {
                const mime = part.inlineData.mimeType || 'image/png';
                imageUrl = `data:${mime};base64,${part.inlineData.data}`;
                break;
              }
            }
          }
        }
      }

      if (!imageUrl) {
        return res.status(500).json({
          error: 'لم تتمكن الخدمة من إرجاع بيانات الصورة. تأكد من تفعيل صلاحيات توليد الصور.',
        });
      }

      return res.json({
        imageUrl,
        size: selectedSize,
        modelUsed,
      });
    } catch (err: any) {
      console.error('Error in /api/generate-image:', err);
      return res.status(500).json({
        error: err?.message || 'فشل توليد الصورة بالذكاء الاصطناعي.',
      });
    }
  });

  // --- Serve Frontend ---
  const isProduction = process.env.NODE_ENV === 'production';
  if (isProduction) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BeInSkills platform running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
