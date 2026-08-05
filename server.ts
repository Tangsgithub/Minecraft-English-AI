import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { tts as edgeTts } from "edge-tts";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Edge Neural TTS High-Quality Speech Endpoint
  app.post("/api/tts", async (req, res) => {
    try {
      const { text, voice = 'en-US-AnaNeural', rate = '+0%' } = req.body;
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: "Text parameter is required" });
      }

      // Clean markdown tags, emojis and bracket notes for pristine pronunciation
      const cleanText = text
        .replace(/[*#_`~]/g, '')
        .replace(/\[.*?\]/g, '')
        .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
        .trim();

      if (!cleanText) {
        return res.status(400).json({ error: "Cleaned text is empty" });
      }

      let audioBuffer: Buffer;
      try {
        audioBuffer = await edgeTts(cleanText, {
          voice: voice,
          rate: rate
        });
      } catch (_edgeErr) {
        // Fallback to Google TTS gracefully if Edge TTS websocket endpoint is restricted in container
        const lang = voice.toLowerCase().includes('gb') ? 'en-gb' : 'en';
        // Split cleanText into ~150 char chunks if long
        const chunks: string[] = Array.from(cleanText.match(/.{1,150}(?=\s|$)/g) || [cleanText]);
        const audioBuffers: Buffer[] = [];

        for (const chunk of chunks) {
          if (!chunk.trim()) continue;
          const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunk.trim())}&tl=${lang}&client=tw-ob`;
          const resp = await fetch(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
            }
          });
          if (resp.ok) {
            const ab = await resp.arrayBuffer();
            audioBuffers.push(Buffer.from(ab));
          }
        }

        if (audioBuffers.length === 0) {
          throw new Error("TTS fallback audio synthesis returned empty result");
        }
        audioBuffer = Buffer.concat(audioBuffers);
      }

      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Cache-Control", "public, max-age=86400");
      return res.send(audioBuffer);
    } catch (err: any) {
      console.error("Edge TTS Generation Error:", err);
      return res.status(500).json({ error: err?.message || "Speech synthesis failed" });
    }
  });

  // DeepSeek / Gemini AI Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, systemPrompt, config } = req.body;
      const provider = config?.provider || 'deepseek';
      const apiKey = config?.apiKey || process.env.GEMINI_API_KEY || '';
      const baseUrl = config?.baseUrl || 'https://api.deepseek.com';
      const model = config?.model || (provider === 'deepseek' ? 'deepseek-chat' : 'gemini-3.6-flash');

      if (provider === 'gemini' || (!config?.apiKey && process.env.GEMINI_API_KEY)) {
        // Use Gemini API
        const geminiKey = process.env.GEMINI_API_KEY || apiKey;
        if (!geminiKey) {
          return res.status(400).json({ error: "Missing Gemini API Key" });
        }
        const ai = new GoogleGenAI({ apiKey: geminiKey });
        
        // Format prompt
        const promptText = `${systemPrompt}\n\nConversation History:\n` +
          messages.map((m: any) => `${m.role === 'user' ? 'Student' : 'Alex Teacher'}: ${m.content}`).join('\n');

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: promptText
        });

        const replyText = response.text || "Alex: Great effort! Keep exploring!";
        return res.json({ text: replyText });
      }

      // DeepSeek or OpenAI-compatible endpoint
      if (!apiKey) {
        return res.status(400).json({ error: "Please configure your DeepSeek API Key in Settings ⚙️" });
      }

      const endpoint = `${baseUrl.replace(/\/+$/, '')}/v1/chat/completions`;
      const payloadMessages = [
        { role: 'system', content: systemPrompt },
        ...messages
      ];

      const dsRes = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: payloadMessages,
          temperature: 0.7,
          max_tokens: 800
        })
      });

      if (!dsRes.ok) {
        const errorText = await dsRes.text();
        console.error("DeepSeek API Response Error:", errorText);
        return res.status(dsRes.status).json({
          error: `DeepSeek API Error (${dsRes.status}): ${errorText || dsRes.statusText}`
        });
      }

      const dsData = await dsRes.json();
      const replyText = dsData.choices?.[0]?.message?.content || "Alex: Great English practice!";
      return res.json({ text: replyText });

    } catch (err: any) {
      console.error("Chat API endpoint error:", err);
      return res.status(500).json({ error: err.message || "Internal server error" });
    }
  });

  // Test API Key endpoint
  app.post("/api/test-key", async (req, res) => {
    try {
      const { config } = req.body;
      const provider = config?.provider || 'deepseek';
      const apiKey = config?.apiKey || process.env.GEMINI_API_KEY || '';
      const baseUrl = config?.baseUrl || 'https://api.deepseek.com';

      if (provider === 'gemini' || (!config?.apiKey && process.env.GEMINI_API_KEY)) {
        const geminiKey = process.env.GEMINI_API_KEY || apiKey;
        if (!geminiKey) {
          return res.json({ success: false, message: "No API Key provided" });
        }
        const ai = new GoogleGenAI({ apiKey: geminiKey });
        await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: 'Say Hello in one word'
        });
        return res.json({ success: true, message: "Gemini AI connection successful! Alex is ready to teach." });
      }

      if (!apiKey) {
        return res.json({ success: false, message: "DeepSeek API Key is empty." });
      }

      const endpoint = `${baseUrl.replace(/\/+$/, '')}/v1/chat/completions`;
      const dsRes = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: config?.model || 'deepseek-chat',
          messages: [{ role: 'user', content: 'Hi Alex!' }],
          max_tokens: 10
        })
      });

      if (dsRes.ok) {
        return res.json({ success: true, message: `Connected to ${provider === 'deepseek' ? 'DeepSeek API' : 'Custom API'} successfully! Alex is online.` });
      } else {
        const errText = await dsRes.text();
        return res.json({ success: false, message: `API Key test failed (${dsRes.status}): ${errText}` });
      }
    } catch (err: any) {
      return res.json({ success: false, message: `Connection error: ${err.message}` });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Minecraft English AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
