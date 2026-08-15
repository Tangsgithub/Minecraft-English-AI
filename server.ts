import express from "express";
import path from "path";
import crypto from "crypto";
import { GoogleGenAI } from "@google/genai";
import { tts as edgeTts } from "edge-tts";
import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";

dotenv.config();
const app = express();

// In-memory fallback ONLY when Neon DATABASE_URL is not configured yet in local environment
const memoryUsersFallback = new Map<string, any>();
const memoryCodesFallback = new Map<string, any>();

// Neon PostgreSQL Serverless Client
const getNeonSql = () => {
  const connStr = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING;
  if (!connStr) return null;
  try {
    return neon(connStr);
  } catch (e) {
    console.warn("Neon database client initialization warning:", e);
    return null;
  }
};

let neonTableInitialized = false;
async function ensureNeonTable() {
  const sql = getNeonSql();
  if (!sql || neonTableInitialized) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        account VARCHAR(255) PRIMARY KEY,
        uid VARCHAR(255),
        nickname VARCHAR(255),
        salt TEXT,
        hash TEXT,
        password TEXT,
        created_at BIGINT,
        updated_at BIGINT,
        profile JSONB
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS activation_codes (
        code VARCHAR(255) PRIMARY KEY,
        is_used BOOLEAN DEFAULT FALSE,
        used_by_account VARCHAR(255),
        used_at BIGINT,
        devices JSONB DEFAULT '[]'::jsonb,
        max_devices INT DEFAULT 3,
        created_at BIGINT
      );
    `;
    neonTableInitialized = true;
    console.log("[Neon Postgres] Database tables 'users' and 'activation_codes' initialized successfully!");
  } catch (e) {
    console.warn("[Neon Postgres] Table initialization warning:", e);
  }
}

// Activation Codes Database Handlers
async function getCloudCode(code: string): Promise<any | null> {
  if (!code) return null;
  const cleanCode = code.trim().toUpperCase();
  const rawNoHyphen = cleanCode.replace(/[^A-Z0-9]/g, '');

  const memCode = memoryCodesFallback.get(cleanCode) || memoryCodesFallback.get(rawNoHyphen);
  if (memCode) return memCode;

  // Search in memory code list by raw normalized string
  for (const [k, v] of memoryCodesFallback.entries()) {
    if (k.replace(/[^A-Z0-9]/g, '') === rawNoHyphen) {
      return v;
    }
  }

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureNeonTable();
      const rows = await sql`
        SELECT * FROM activation_codes 
        WHERE UPPER(code) = ${cleanCode} 
           OR UPPER(REPLACE(REPLACE(code, '-', ''), ' ', '')) = ${rawNoHyphen}
        LIMIT 1
      `;
      if (rows && rows.length > 0) {
        const r: any = rows[0];
        let parsedDevices = r.devices;
        if (typeof parsedDevices === 'string') {
          try { parsedDevices = JSON.parse(parsedDevices); } catch { parsedDevices = []; }
        }
        const cObj = {
          code: r.code,
          isUsed: Boolean(r.is_used),
          usedByAccount: r.used_by_account || '',
          usedAt: Number(r.used_at || 0),
          devices: Array.isArray(parsedDevices) ? parsedDevices : [],
          maxDevices: Number(r.max_devices || 3),
          createdAt: Number(r.created_at || Date.now())
        };
        memoryCodesFallback.set(cleanCode, cObj);
        return cObj;
      }
      return null;
    } catch (e) {
      console.warn("Neon Postgres get code error:", e);
      return null;
    }
  }

  return memoryCodesFallback.get(cleanCode) || null;
}

async function saveCloudCode(cObj: any): Promise<boolean> {
  if (!cObj || !cObj.code) return false;
  const cleanCode = cObj.code.trim().toUpperCase();
  memoryCodesFallback.set(cleanCode, cObj);

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureNeonTable();
      const devicesJson = JSON.stringify(cObj.devices || []);
      await sql`
        INSERT INTO activation_codes (code, is_used, used_by_account, used_at, devices, max_devices, created_at)
        VALUES (
          ${cleanCode},
          ${Boolean(cObj.isUsed)},
          ${cObj.usedByAccount || ''},
          ${cObj.usedAt || 0},
          ${devicesJson}::jsonb,
          ${cObj.maxDevices || 3},
          ${cObj.createdAt || Date.now()}
        )
        ON CONFLICT (code) DO UPDATE SET
          is_used = EXCLUDED.is_used,
          used_by_account = EXCLUDED.used_by_account,
          used_at = EXCLUDED.used_at,
          devices = EXCLUDED.devices,
          max_devices = EXCLUDED.max_devices;
      `;
      return true;
    } catch (e) {
      console.warn("Neon Postgres save code error:", e);
      return false;
    }
  }
  return true;
}

async function getAllCloudCodes(): Promise<any[]> {
  const codeMap = new Map<string, any>();

  for (const [k, v] of memoryCodesFallback.entries()) {
    codeMap.set(k.toUpperCase(), v);
  }

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureNeonTable();
      const rows = await sql`SELECT * FROM activation_codes ORDER BY created_at DESC`;
      if (rows && rows.length > 0) {
        (rows as any[]).forEach(r => {
          let parsedDevices = r.devices;
          if (typeof parsedDevices === 'string') {
            try { parsedDevices = JSON.parse(parsedDevices); } catch { parsedDevices = []; }
          }
          const cleanCode = String(r.code).toUpperCase();
          codeMap.set(cleanCode, {
            code: r.code,
            isUsed: Boolean(r.is_used),
            usedByAccount: r.used_by_account || '',
            usedAt: Number(r.used_at || 0),
            devices: Array.isArray(parsedDevices) ? parsedDevices : [],
            maxDevices: Number(r.max_devices || 3),
            createdAt: Number(r.created_at || Date.now())
          });
        });
      }
    } catch (e) {
      console.warn("Neon Postgres getAllCodes error:", e);
    }
  }

  return Array.from(codeMap.values());
}

async function clearAllCloudCodes(): Promise<void> {
  memoryCodesFallback.clear();
  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureNeonTable();
      await sql`DELETE FROM activation_codes`;
    } catch (e) {
      console.warn("Neon Postgres clearAllCodes error:", e);
    }
  }
}

// Exclusive Neon PostgreSQL Database Handlers
async function getCloudUser(accountOrUid: string): Promise<any | null> {
  if (!accountOrUid) return null;
  const clean = accountOrUid.trim().toLowerCase();

  // 1. Direct match in memory fallback
  const memUser = memoryUsersFallback.get(clean);
  if (memUser) return memUser;

  // 2. Iterate memory fallback for cross-key lookup (account, uid, profile.id, profile.account)
  for (const u of memoryUsersFallback.values()) {
    if (
      (u.account && u.account.toLowerCase() === clean) ||
      (u.uid && u.uid.toLowerCase() === clean) ||
      (u.profile?.id && String(u.profile.id).toLowerCase() === clean) ||
      (u.profile?.account && String(u.profile.account).toLowerCase() === clean)
    ) {
      memoryUsersFallback.set(clean, u);
      return u;
    }
  }

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureNeonTable();
      const rows = await sql`
        SELECT * FROM users 
        WHERE LOWER(account) = ${clean} 
           OR LOWER(uid) = ${clean} 
           OR LOWER(profile->>'account') = ${clean}
           OR profile->>'id' = ${clean}
        ORDER BY updated_at DESC
        LIMIT 1
      `;
      if (rows && rows.length > 0) {
        const r: any = rows[0];
        let parsedProfile = r.profile;
        if (typeof parsedProfile === 'string') {
          try { parsedProfile = JSON.parse(parsedProfile); } catch (e) { parsedProfile = {}; }
        }
        const u = {
          uid: r.uid || r.account,
          account: r.account,
          nickname: r.nickname,
          salt: r.salt,
          hash: r.hash,
          password: r.password,
          createdAt: Number(r.created_at || Date.now()),
          updatedAt: Number(r.updated_at || Date.now()),
          profile: parsedProfile || {}
        };
        memoryUsersFallback.set(clean, u);
        if (u.account) memoryUsersFallback.set(u.account.toLowerCase(), u);
        if (u.uid) memoryUsersFallback.set(u.uid.toLowerCase(), u);
        return u;
      }
      return null;
    } catch (e) {
      console.warn("Neon Postgres get error:", e);
      return null;
    }
  }

  return null;
}

async function saveCloudUser(account: string, userObj: any): Promise<boolean> {
  if (!account || !userObj) return false;
  const clean = account.trim().toLowerCase();

  // Index by clean account, uid, and profile id in memory map
  memoryUsersFallback.set(clean, userObj);
  if (userObj.account) memoryUsersFallback.set(userObj.account.trim().toLowerCase(), userObj);
  if (userObj.uid) memoryUsersFallback.set(userObj.uid.trim().toLowerCase(), userObj);
  if (userObj.profile?.id) memoryUsersFallback.set(String(userObj.profile.id).trim().toLowerCase(), userObj);

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureNeonTable();
      const profileJson = JSON.stringify(userObj.profile || {});
      const primaryAccount = (userObj.account || clean).trim().toLowerCase();
      await sql`
        INSERT INTO users (account, uid, nickname, salt, hash, password, created_at, updated_at, profile)
        VALUES (
          ${primaryAccount},
          ${userObj.uid || clean},
          ${userObj.nickname || userObj.profile?.nickname || '玩家'},
          ${userObj.salt || ''},
          ${userObj.hash || ''},
          ${userObj.password || ''},
          ${userObj.createdAt || Date.now()},
          ${Date.now()},
          ${profileJson}::jsonb
        )
        ON CONFLICT (account) DO UPDATE SET
          uid = EXCLUDED.uid,
          nickname = EXCLUDED.nickname,
          salt = EXCLUDED.salt,
          hash = EXCLUDED.hash,
          password = EXCLUDED.password,
          updated_at = EXCLUDED.updated_at,
          profile = EXCLUDED.profile;
      `;
      return true;
    } catch (e) {
      console.warn("Neon Postgres save error:", e);
      return false;
    }
  }

  return true;
}

async function getAllCloudUsers(): Promise<any[]> {
  const userMap = new Map<string, any>();

  for (const [k, v] of memoryUsersFallback.entries()) {
    userMap.set(k.toLowerCase(), v);
  }

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureNeonTable();
      const rows = await sql`SELECT * FROM users ORDER BY updated_at DESC`;
      if (rows && rows.length > 0) {
        (rows as any[]).forEach(r => {
          let parsedProfile = r.profile;
          if (typeof parsedProfile === 'string') {
            try { parsedProfile = JSON.parse(parsedProfile); } catch (e) { parsedProfile = {}; }
          }
          const acc = String(r.account).toLowerCase();
          userMap.set(acc, {
            uid: r.uid || r.account,
            account: r.account,
            nickname: r.nickname,
            salt: r.salt,
            hash: r.hash,
            password: r.password,
            createdAt: Number(r.created_at || Date.now()),
            updatedAt: Number(r.updated_at || Date.now()),
            profile: parsedProfile || {}
          });
        });
      }
    } catch (e) {
      console.warn("Neon Postgres getAllUsers error:", e);
    }
  }

  return Array.from(userMap.values());
}


function hashPassword(password: string, salt: string): string {
  try {
    const safeSalt = salt || 'mc_salt_2026';
    return crypto.pbkdf2Sync(password, safeSalt, 1000, 64, 'sha512').toString('hex');
  } catch {
    return crypto.createHash('sha256').update(password + (salt || '')).digest('hex');
  }
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use((req, _res, next) => {
  if (req.url.startsWith('/api/index')) {
    req.url = req.url.replace('/api/index', '/api');
  }
  if (!req.url.startsWith('/api') && (
    req.url.startsWith('/tts') ||
    req.url.startsWith('/chat') ||
    req.url.startsWith('/auth') ||
    req.url.startsWith('/health') ||
    req.url.startsWith('/test-key')
  )) {
    req.url = '/api' + req.url;
  }
  next();
});

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
      let cleanText = text
        .replace(/[*#_`~]/g, '')
        .replace(/\[.*?\]/g, '')
        .replace(/（.*?[\u4e00-\u9fa5].*?）/g, '')
        .replace(/\(.*?\u4e00-\u9fa5.*?\)/g, '')
        .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
        .trim();

      // If voice is an English voice and text contains English + Chinese, remove Chinese and keep English punctuation
      if (voice.startsWith('en-') && /[a-zA-Z]/.test(cleanText)) {
        cleanText = cleanText
          .replace(/[\u4e00-\u9fa5]/g, '')
          .replace(/[（）【】《》、]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
      }

      if (!cleanText) {
        return res.status(400).json({ error: "Cleaned text is empty" });
      }

      let audioBuffer: Buffer;
      try {
        audioBuffer = await edgeTts(cleanText, {
          voice: voice,
          rate: rate || '+0%'
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
      const userApiKey = config?.apiKey?.trim() || '';
      const baseUrl = config?.baseUrl || 'https://api.deepseek.com';
      const model = config?.model || (provider === 'deepseek' ? 'deepseek-chat' : 'gemini-3.7-flash');

      // Helper to call Gemini backend
      const callGemini = async (): Promise<string> => {
        const geminiKey = process.env.GEMINI_API_KEY || (provider === 'gemini' ? userApiKey : '');
        if (!geminiKey) {
          throw new Error("Missing Gemini API Key in environment");
        }
        const ai = new GoogleGenAI({
          apiKey: geminiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });
        const promptText = `${systemPrompt}\n\nConversation History:\n` +
          messages.map((m: any) => `${m.role === 'user' ? 'Student' : 'Alex Teacher'}: ${m.content}`).join('\n');

        let requestModel = config?.model || 'gemini-3.7-flash';
        if (
          requestModel.includes('deepseek') ||
          requestModel.includes('openai') ||
          requestModel.includes('llama') ||
          requestModel.includes('3.6') ||
          requestModel.includes('pro')
        ) {
          requestModel = 'gemini-3.7-flash';
        }
        const candidateModels = Array.from(new Set([
          requestModel,
          'gemini-3.7-flash',
          'gemini-3.1-flash-lite',
          'gemini-flash-latest'
        ]));

        let responseText = '';
        let lastError: any = null;

        for (const mod of candidateModels) {
          try {
            const response = await ai.models.generateContent({
              model: mod,
              contents: promptText
            });
            responseText = response.text || '';
            if (responseText) break;
          } catch (err: any) {
            console.warn(`Gemini model ${mod} attempt failed:`, err?.message || err);
            lastError = err;
          }
        }

        if (!responseText && lastError) {
          console.warn("All Gemini candidate models returned error, providing graceful companion fallback:", lastError?.message);
          return "Alex: Great English practice in Minecraft! Let's keep exploring and learning new words together! [太棒的 Minecraft 英语练习！让我们继续探索并一起学习新单词吧！]";
        }
        return responseText || "Alex: Great effort! Keep exploring!";
      };

      // 1. Direct Gemini Provider or default fallback when no user key configured
      if (provider === 'gemini' || (!userApiKey && process.env.GEMINI_API_KEY)) {
        try {
          const text = await callGemini();
          return res.json({ text });
        } catch (geminiErr: any) {
          console.error("Gemini call failed:", geminiErr);
          return res.status(500).json({ error: geminiErr?.message || "Gemini AI generation failed" });
        }
      }

      // 2. DeepSeek / OpenAI-compatible Custom Provider with user API Key
      if (userApiKey) {
        const endpoint = `${baseUrl.replace(/\/+$/, '')}/v1/chat/completions`;
        const payloadMessages = [
          { role: 'system', content: systemPrompt },
          ...messages
        ];

        try {
          const dsRes = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userApiKey}`
            },
            body: JSON.stringify({
              model: model || 'deepseek-chat',
              messages: payloadMessages,
              temperature: 0.7,
              max_tokens: 800
            })
          });

          if (dsRes.ok) {
            const dsData = await dsRes.json();
            const replyText = dsData.choices?.[0]?.message?.content || "Alex: Great English practice!";
            return res.json({ text: replyText });
          } else {
            const errorText = await dsRes.text();
            console.warn("DeepSeek API error response:", errorText);
            // If user key fails and server Gemini is available, failover seamlessly
            if (process.env.GEMINI_API_KEY) {
              console.log("Falling back to Gemini AI due to DeepSeek API error...");
              const fallbackText = await callGemini();
              return res.json({ text: fallbackText });
            }
            return res.status(dsRes.status).json({
              error: `DeepSeek API Error (${dsRes.status}): ${errorText || dsRes.statusText}`
            });
          }
        } catch (fetchErr: any) {
          console.warn("DeepSeek fetch failed:", fetchErr);
          if (process.env.GEMINI_API_KEY) {
            const fallbackText = await callGemini();
            return res.json({ text: fallbackText });
          }
          throw fetchErr;
        }
      }

      // 3. If neither user key nor Gemini key available
      return res.status(400).json({ error: "Please configure your DeepSeek API Key in Settings ⚙️" });

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
      const apiKey = config?.apiKey || (provider === 'deepseek' ? process.env.DEEPSEEK_API_KEY : process.env.GEMINI_API_KEY) || process.env.GEMINI_API_KEY || '';
      const baseUrl = config?.baseUrl || 'https://api.deepseek.com';

      if (provider === 'gemini' || (!config?.apiKey && process.env.GEMINI_API_KEY)) {
        const geminiKey = process.env.GEMINI_API_KEY || apiKey;
        if (!geminiKey) {
          return res.json({ success: false, message: "No API Key provided" });
        }
        const ai = new GoogleGenAI({
          apiKey: geminiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });
        try {
          await ai.models.generateContent({
            model: 'gemini-3.7-flash',
            contents: 'Say Hello in one word'
          });
        } catch {
          await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: 'Say Hello in one word'
          });
        }
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

  // ===== Direct Authentication API Routes (China Mainland VPN-free direct access) =====
  
  // Register Endpoint
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { account, password, nickname, initialProfile: clientProfile } = req.body || {};
      if (!account || typeof account !== 'string' || account.trim().length < 3) {
        return res.status(200).json({ success: false, error: "账号至少需要3个字符" });
      }
      if (!password || typeof password !== 'string' || password.length < 6) {
        return res.status(200).json({ success: false, error: "密码至少需要6位" });
      }

      const cleanAccount = account.trim().toLowerCase();
      
      // Check if account exists in Cloud DB
      const existingUser = await getCloudUser(cleanAccount);
      if (existingUser) {
        return res.status(200).json({ success: false, error: "该账号已被注册，请直接登录" });
      }

      const salt = crypto.randomBytes(16).toString('hex');
      const hash = hashPassword(password, salt);
      const uid = 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      const userNickname = nickname?.trim() || account.trim();

      // Merge client profile if available so user doesn't lose progress made before registering
      const initialProfile = {
        id: uid,
        nickname: userNickname,
        account: cleanAccount,
        selectedVolumeId: clientProfile?.selectedVolumeId || 'vol1',
        currentLessonId: clientProfile?.currentLessonId || 1,
        unlockedLessonIds: clientProfile?.unlockedLessonIds?.length ? clientProfile.unlockedLessonIds : [1],
        completedLessonIds: clientProfile?.completedLessonIds || [],
        completedMissionIds: clientProfile?.completedMissionIds || [],
        unlockedBadgeIds: clientProfile?.unlockedBadgeIds || ['badge_first_words'],
        masteredWords: clientProfile?.masteredWords || [],
        emeralds: typeof clientProfile?.emeralds === 'number' ? clientProfile.emeralds : 100,
        xp: typeof clientProfile?.xp === 'number' ? clientProfile.xp : 0,
        level: clientProfile?.level || 1,
        avatar: clientProfile?.avatar || 'steve',
        selectedAvatar: clientProfile?.selectedAvatar || '👦',
        customAvatarUrl: clientProfile?.customAvatarUrl || '',
        learningGoal: clientProfile?.learningGoal || 15,
        todayMinutes: clientProfile?.todayMinutes || 0,
        streakDays: clientProfile?.streakDays || 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        vocabulary: clientProfile?.vocabulary || [],
        completedMissions: clientProfile?.completedMissions || [],
        unlockedCraftingIds: clientProfile?.unlockedCraftingIds || [],
        enderChestCount: clientProfile?.enderChestCount || 0,
        eyeCareEnabled: clientProfile?.eyeCareEnabled ?? false,
        eyeCareMinutes: clientProfile?.eyeCareMinutes || 20,
        isVip: Boolean(clientProfile?.isVip),
        apiKeyConfig: clientProfile?.apiKeyConfig || {
          provider: 'deepseek',
          apiKey: '',
          baseUrl: 'https://api.deepseek.com',
          model: 'deepseek-chat'
        },
        parentSettings: clientProfile?.parentSettings || {
          dailyTimeLimitMinutes: 45,
          continuousTimeLimitMinutes: 20,
          eyeProtectionEnabled: true,
          speechRate: 0.9,
          correctionStrictness: 'standard'
        },
        isInitialSetupDone: true
      };

      const userObj = {
        uid,
        account: cleanAccount,
        nickname: userNickname,
        salt,
        hash,
        password, // Saved for backward fallback compatibility
        createdAt: Date.now(),
        updatedAt: Date.now(),
        profile: initialProfile
      };

      await saveCloudUser(cleanAccount, userObj);

      return res.json({
        success: true,
        message: "注册成功！学习进度与账户已打通云端数据库",
        user: { uid, account: userObj.account, nickname: userObj.nickname },
        profile: userObj.profile,
        token: `mc_token_${uid}_${Date.now()}`
      });
    } catch (err: any) {
      console.error("Auth Register Error:", err);
      return res.status(200).json({ success: false, error: "注册服务响应异常，请重试" });
    }
  });

  // Login Endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { account, password } = req.body || {};
      if (!account || !password) {
        return res.status(200).json({ success: false, error: "请提供账号和密码" });
      }

      const cleanAccount = account.trim().toLowerCase();
      const userObj = await getCloudUser(cleanAccount);

      if (!userObj) {
        return res.status(200).json({ success: false, error: "账号不存在，请先注册" });
      }

      const candidateHash = hashPassword(password, userObj.salt || '');
      const isPasswordValid = (userObj.salt && candidateHash === userObj.hash) || (userObj.password && userObj.password === password);

      if (!isPasswordValid) {
        return res.status(200).json({ success: false, error: "密码不正确，请重新输入" });
      }

      userObj.updatedAt = Date.now();
      await saveCloudUser(cleanAccount, userObj);

      return res.json({
        success: true,
        message: "登录成功！已从云端实时同步您的学习进度",
        user: { uid: userObj.uid, account: userObj.account, nickname: userObj.nickname },
        profile: userObj.profile,
        token: `mc_token_${userObj.uid}_${Date.now()}`
      });
    } catch (err: any) {
      console.error("Auth Login Error:", err);
      return res.status(200).json({ success: false, error: "登录服务响应异常，请重试" });
    }
  });

  // Sync Progress Endpoint
  app.post("/api/auth/sync", async (req, res) => {
    try {
      const { uid, account: reqAccount, profile } = req.body || {};
      if (!profile) {
        return res.status(200).json({ success: false, error: "缺少同步参数" });
      }

      const targetAccount = (reqAccount || profile.account || uid || profile.id || '').trim().toLowerCase();
      if (!targetAccount) {
        return res.status(200).json({ success: false, error: "无法识别用户账号" });
      }

      let userObj = await getCloudUser(targetAccount);
      if (!userObj && uid) {
        userObj = await getCloudUser(uid);
      }

      if (!userObj) {
        userObj = {
          uid: uid || profile.id || 'user_' + Date.now(),
          account: targetAccount,
          nickname: profile.nickname || '玩家',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          profile: profile
        };
      } else {
        userObj.profile = {
          ...userObj.profile,
          ...profile,
          // Ensure arrays are merged or updated
          unlockedLessonIds: profile.unlockedLessonIds || userObj.profile?.unlockedLessonIds || [1],
          completedLessonIds: profile.completedLessonIds || userObj.profile?.completedLessonIds || [],
          masteredWords: profile.masteredWords || userObj.profile?.masteredWords || [],
          completedMissionIds: profile.completedMissionIds || userObj.profile?.completedMissionIds || []
        };
        userObj.updatedAt = Date.now();
      }

      await saveCloudUser(userObj.account || targetAccount, userObj);

      return res.json({
        success: true,
        message: "学习进度已实时同步至云端数据库",
        profile: userObj.profile
      });
    } catch (err: any) {
      console.error("Auth Sync Error:", err);
      return res.status(200).json({ success: false, error: "同步进度失败" });
    }
  });

  // Fetch Profile Endpoint
  app.post("/api/auth/profile", async (req, res) => {
    try {
      const { uid, account } = req.body || {};
      const target = account || uid;
      if (target) {
        const userObj = await getCloudUser(target);
        if (userObj && userObj.profile) {
          return res.json({ success: true, profile: userObj.profile });
        }
      }
      return res.status(200).json({ success: false, error: "未找到用户档案" });
    } catch (err: any) {
      return res.status(200).json({ success: false, error: "读取用户档案失败" });
    }
  });

  // Reset Password Endpoint
  app.post("/api/auth/reset-password", async (req, res) => {
    try {
      const { account, newPassword } = req.body || {};
      if (!account || !newPassword || newPassword.length < 6) {
        return res.status(200).json({ success: false, error: "请提供账号与至少6位新密码" });
      }

      const cleanAccount = account.trim().toLowerCase();
      const userObj = await getCloudUser(cleanAccount);

      if (!userObj) {
        return res.status(200).json({ success: false, error: "找不到对应注册账号" });
      }

      const salt = crypto.randomBytes(16).toString('hex');
      const hash = hashPassword(newPassword, salt);
      userObj.salt = salt;
      userObj.hash = hash;
      userObj.password = newPassword;
      userObj.updatedAt = Date.now();
      await saveCloudUser(cleanAccount, userObj);

      return res.json({ success: true, message: "密码重置成功，已在全网设备生效" });
    } catch (err: any) {
      return res.status(200).json({ success: false, error: "重置密码处理失败" });
    }
  });

  // ===== Activation Code Activation Endpoint =====
  app.post("/api/auth/activate-code", async (req, res) => {
    try {
      const { code, account, deviceId } = req.body || {};
      if (!code || typeof code !== 'string') {
        return res.status(200).json({ success: false, error: "请输入 16 位 VIP 激活码" });
      }
      if (!account || typeof account !== 'string') {
        return res.status(200).json({ success: false, error: "请先登录或注册账号再进行激活" });
      }

      const cleanCode = code.trim().toUpperCase().replace(/\s+/g, '');
      const cleanAccount = account.trim().toLowerCase();
      const currentDeviceId = deviceId || 'device_' + cleanAccount;

      // Find code in DB
      let codeObj = await getCloudCode(cleanCode);

      // Support master codes or fallback format for instant demo/testing
      const rawCodeOnly = cleanCode.replace(/[^A-Z0-9]/g, '');
      const isMasterOrTestCode = 
        cleanCode.includes('MC144') ||
        cleanCode.includes('VIP') ||
        cleanCode.includes('2026') ||
        cleanCode.startsWith('MCB') ||
        cleanCode.startsWith('MCV') ||
        cleanCode.startsWith('XHS') ||
        rawCodeOnly === '8888' ||
        rawCodeOnly === '6666';

      if (!codeObj && isMasterOrTestCode) {
        codeObj = {
          code: cleanCode,
          isUsed: false,
          usedByAccount: '',
          usedAt: 0,
          devices: [],
          maxDevices: 3,
          createdAt: Date.now()
        };
      }

      if (!codeObj) {
        return res.status(200).json({
          success: false,
          error: "激活码不存在！请核对您从小红书客服领取的 16 位激活码"
        });
      }
      
      // Determine target volume from codeObj or code prefix
      let targetVolume: any = (codeObj as any).targetVolume;
      if (!targetVolume) {
        if (cleanCode.startsWith('MCV1') || cleanCode.startsWith('MCB1')) targetVolume = 'vol1';
        else if (cleanCode.startsWith('MCV2') || cleanCode.startsWith('MCB2')) targetVolume = 'vol2';
        else if (cleanCode.startsWith('MCV3') || cleanCode.startsWith('MCB3')) targetVolume = 'vol3';
        else if (cleanCode.startsWith('MCV4') || cleanCode.startsWith('MCB4')) targetVolume = 'vol4';
        else targetVolume = 'all'; 
      }

      const applyVipToProfile = (profile: any, volume: string) => {
        const newProfile = { ...profile };
        newProfile.activatedVolumes = Array.from(new Set([...(newProfile.activatedVolumes || []), volume]));
        
        const vol1Ids = Array.from({ length: 144 }, (_, i) => i + 1);
        const vol2Ids = Array.from({ length: 96 }, (_, i) => i + 1);
        const vol3Ids = Array.from({ length: 60 }, (_, i) => i + 1);
        const vol4Ids = Array.from({ length: 48 }, (_, i) => i + 1);

        if (!newProfile.volumeProgress) newProfile.volumeProgress = {};
        
        if (volume === 'vol1' || volume === 'all') {
          newProfile.volumeProgress.vol1 = {
            ...(newProfile.volumeProgress.vol1 || { currentLessonId: 1, completedLessonIds: [] }),
            unlockedLessonIds: vol1Ids
          };
          newProfile.unlockedLessonIds = Array.from(new Set([...(newProfile.unlockedLessonIds || []), ...vol1Ids]));
        }
        if (volume === 'vol2' || volume === 'all') {
          newProfile.volumeProgress.vol2 = {
            ...(newProfile.volumeProgress.vol2 || { currentLessonId: 1, completedLessonIds: [] }),
            unlockedLessonIds: vol2Ids
          };
        }
        if (volume === 'vol3' || volume === 'all') {
          newProfile.volumeProgress.vol3 = {
            ...(newProfile.volumeProgress.vol3 || { currentLessonId: 1, completedLessonIds: [] }),
            unlockedLessonIds: vol3Ids
          };
        }
        if (volume === 'vol4' || volume === 'all') {
          newProfile.volumeProgress.vol4 = {
            ...(newProfile.volumeProgress.vol4 || { currentLessonId: 1, completedLessonIds: [] }),
            unlockedLessonIds: vol4Ids
          };
        }
        
        if (volume === 'all') {
          newProfile.isVip = true;
          newProfile.vipActivatedAt = Date.now();
        }
        return newProfile;
      };

      // Check if code is already used
      if (codeObj.isUsed) {
        // If used by the SAME account
        if (codeObj.usedByAccount && codeObj.usedByAccount.toLowerCase() === cleanAccount) {
          const deviceList: string[] = Array.isArray(codeObj.devices) ? codeObj.devices : [];
          if (!deviceList.includes(currentDeviceId)) {
            if (deviceList.length >= (codeObj.maxDevices || 3)) {
              return res.status(200).json({
                success: false,
                error: `⚠️ 激活失败：该账号已绑定 ${deviceList.length}/${codeObj.maxDevices || 3} 台设备（已达上限）。如更换设备请联系小红书客服解绑。`
              });
            }
            deviceList.push(currentDeviceId);
            codeObj.devices = deviceList;
            await saveCloudCode(codeObj);
          }

          // Ensure user profile in DB is VIP
          const userObj = await getCloudUser(cleanAccount);
          if (userObj) {
            userObj.profile = applyVipToProfile(userObj.profile || {}, targetVolume);
            await saveCloudUser(cleanAccount, userObj);
          }
          
          let volName = "全套 1~4 册";
          if (targetVolume === 'vol1') volName = "《新概念一册》";
          else if (targetVolume === 'vol2') volName = "《新概念二册》";
          else if (targetVolume === 'vol3') volName = "《新概念三册》";
          else if (targetVolume === 'vol4') volName = "《新概念四册》";

          return res.json({
            success: true,
            message: `✨ 该账号已成功激活！设备已打通 (${codeObj.devices.length}/${codeObj.maxDevices || 3} 台)`,
            profile: userObj?.profile
          });
        }

        // If used by a DIFFERENT account
        return res.status(200).json({
          success: false,
          error: `❌ 该激活码已被账号 (${codeObj.usedByAccount}) 绑定使用！每个激活码仅可激活 1 个账号。`
        });
      }

      // Code is UNUSED: Activate now!
      const initialDevices = [currentDeviceId];
      codeObj.isUsed = true;
      codeObj.usedByAccount = cleanAccount;
      codeObj.usedAt = Date.now();
      codeObj.devices = initialDevices;
      await saveCloudCode(codeObj);

      // Upgrade User Profile to VIP & Unlock Lessons
      const userObj = await getCloudUser(cleanAccount) || {
        uid: 'user_' + Date.now(),
        account: cleanAccount,
        nickname: cleanAccount,
        profile: {}
      };

      userObj.profile = applyVipToProfile(userObj.profile || {}, targetVolume);
      await saveCloudUser(cleanAccount, userObj);
      
      let volName = "全套 1~4 册 348 关卡";
      if (targetVolume === 'vol1') volName = "《新概念一册》 144 关卡";
      else if (targetVolume === 'vol2') volName = "《新概念二册》 96 关卡";
      else if (targetVolume === 'vol3') volName = "《新概念三册》 60 关卡";
      else if (targetVolume === 'vol4') volName = "《新概念四册》 48 关卡";

      return res.json({
        success: true,
        message: `🎉 激活成功！${volName}与 Alex AI 实时对练已永久解锁 (已绑定 1/3 台设备)`,
        profile: userObj.profile
      });

    } catch (err: any) {
      console.error("Activate Code Error:", err);
      return res.status(200).json({ success: false, error: "激活代码处理失败，请稍后重试" });
    }
  });

  // ===== Admin: Generate Batch Activation Codes Endpoint =====
  app.post("/api/admin/generate-codes", async (req, res) => {
    try {
      const { count = 10, prefix = 'MC144', maxDevices = 3, targetVolume = 'all' } = req.body || {};
      const numToGenerate = Math.min(Math.max(Number(count) || 10, 1), 500);

      const generatedCodes: string[] = [];
      const now = Date.now();

      for (let i = 0; i < numToGenerate; i++) {
        const randPart1 = crypto.randomBytes(2).toString('hex').toUpperCase();
        const randPart2 = crypto.randomBytes(2).toString('hex').toUpperCase();
        const randPart3 = crypto.randomBytes(2).toString('hex').toUpperCase();
        const code = `${prefix}-${randPart1}-${randPart2}-${randPart3}`;

        const cObj = {
          code,
          isUsed: false,
          usedByAccount: '',
          usedAt: 0,
          devices: [],
          maxDevices: Number(maxDevices) || 3,
          targetVolume: targetVolume,
          createdAt: now
        };

        await saveCloudCode(cObj);
        generatedCodes.push(code);
      }

      return res.json({
        success: true,
        message: `成功批量生成 ${generatedCodes.length} 张独一无二的 VIP 激活码！`,
        codes: generatedCodes
      });

    } catch (err: any) {
      console.error("Generate Codes Error:", err);
      return res.status(200).json({ success: false, error: "批量生成激活码失败" });
    }
  });

  // ===== Admin: Fetch All Activation Codes Endpoint =====
  app.get("/api/admin/codes", async (_req, res) => {
    try {
      let codes = await getAllCloudCodes();

      return res.json({
        success: true,
        count: codes.length,
        neonConnected: Boolean(getNeonSql()),
        codes
      });
    } catch (err: any) {
      console.error("Admin fetch codes error:", err);
      return res.status(200).json({ success: false, error: "读取激活码列表失败" });
    }
  });

  // ===== Admin: Sync / Import Codes Endpoint =====
  app.post("/api/admin/sync-codes", async (req, res) => {
    try {
      const { codes } = req.body || {};
      if (!Array.isArray(codes) || codes.length === 0) {
        return res.status(200).json({ success: false, error: "未传入有效激活码数组" });
      }

      let savedCount = 0;
      for (const item of codes) {
        if (!item || !item.code) continue;
        const cleanCode = item.code.trim().toUpperCase();
        const existing = await getCloudCode(cleanCode);
        const codeObj = {
          code: cleanCode,
          isUsed: Boolean(item.isUsed ?? existing?.isUsed ?? false),
          usedByAccount: item.usedByAccount || existing?.usedByAccount || '',
          usedAt: item.usedAt || existing?.usedAt || 0,
          devices: Array.isArray(item.devices) ? item.devices : (existing?.devices || []),
          maxDevices: item.maxDevices || existing?.maxDevices || 3,
          createdAt: item.createdAt || existing?.createdAt || Date.now()
        };
        await saveCloudCode(codeObj);
        savedCount++;
      }

      const allCodes = await getAllCloudCodes();
      return res.json({
        success: true,
        message: `成功同步/导入 ${savedCount} 个激活码到云端数据库！当前共 ${allCodes.length} 个卡密。`,
        totalCount: allCodes.length,
        codes: allCodes
      });
    } catch (err: any) {
      console.error("Sync codes error:", err);
      return res.status(200).json({ success: false, error: "同步激活码失败" });
    }
  });

  // ===== Admin: Revoke / Unbind Devices Endpoint =====
  app.post("/api/admin/revoke-code", async (req, res) => {
    try {
      const { code, action } = req.body || {}; // action: 'unbind' | 'reset'
      if (!code) {
        return res.status(200).json({ success: false, error: "缺少激活码参数" });
      }

      const cObj = await getCloudCode(code);
      if (!cObj) {
        return res.status(200).json({ success: false, error: "未找到该激活码" });
      }

      if (action === 'unbind') {
        cObj.devices = [];
        await saveCloudCode(cObj);
        return res.json({ success: true, message: `已成功清空激活码 (${code}) 绑定的所有设备列表` });
      }

      if (action === 'reset') {
        cObj.isUsed = false;
        cObj.usedByAccount = '';
        cObj.usedAt = 0;
        cObj.devices = [];
        await saveCloudCode(cObj);
        return res.json({ success: true, message: `已成功重置激活码 (${code}) 为全新【未使用】状态！` });
      }

      return res.status(200).json({ success: false, error: "未知操作类型" });
    } catch (err: any) {
      return res.status(200).json({ success: false, error: "卡密重置处理失败" });
    }
  });

  // ===== Admin: Clear All Codes Endpoint =====
  app.post("/api/admin/clear-codes", async (req, res) => {
    try {
      await clearAllCloudCodes();
      return res.json({ success: true, message: "已成功清空所有激活码！" });
    } catch (err: any) {
      console.error("Clear codes error:", err);
      return res.status(200).json({ success: false, error: "清空激活码失败" });
    }
  });

  // ===== Admin Login Verification Endpoint =====
  app.post("/api/admin/verify-login", async (req, res) => {
    try {
      const { account, password } = req.body || {};
      if (!account || !password) {
        return res.status(200).json({ success: false, error: "请输入管理员账号与密码" });
      }

      const cleanAccount = String(account).trim().toLowerCase();
      const cleanPassword = String(password).trim();

      // Official Admin credentials check
      // 1. Dedicated Admin Root Accounts
      const isOfficialAdminAccount = 
        cleanAccount === 'admin' || 
        cleanAccount === 'deantang' || 
        cleanAccount === 'deantang2014@gmail.com' ||
        cleanAccount === 'minecraft_admin';

      // 2. Verified admin passwords
      const isOfficialAdminPassword = 
        cleanPassword === '2026888' || 
        cleanPassword === 'Admin@2026888' ||
        cleanPassword === 'DeanTang2026';

      if (isOfficialAdminAccount && isOfficialAdminPassword) {
        return res.json({
          success: true,
          message: "管理员身份核验通过，欢迎进入系统后台！",
          adminUser: {
            account: cleanAccount,
            role: 'super_admin'
          }
        });
      }

      // 3. Fallback: check if the user is registered in Neon DB with admin role or matching credentials
      const userObj = await getCloudUser(cleanAccount);
      if (userObj) {
        let passwordValid = false;
        if (userObj.salt && userObj.hash) {
          const candidateHash = hashPassword(cleanPassword, userObj.salt);
          passwordValid = candidateHash === userObj.hash;
        } else if (userObj.password) {
          passwordValid = userObj.password === cleanPassword;
        }

        if (passwordValid && (userObj.profile?.isAdmin === true || cleanAccount === 'admin' || cleanAccount === 'deantang2014@gmail.com')) {
          return res.json({
            success: true,
            message: "管理员身份核验通过",
            adminUser: {
              account: userObj.account,
              nickname: userObj.nickname,
              role: 'super_admin'
            }
          });
        }
      }

      return res.status(200).json({
        success: false,
        error: "管理员账号或密码错误！非管理员禁止访问后台控制台。"
      });
    } catch (err: any) {
      console.error("Admin verify login error:", err);
      return res.status(200).json({ success: false, error: "管理员验证处理异常" });
    }
  });

  // Admin Users Data Endpoint
  app.get("/api/admin/users", async (_req, res) => {
    try {
      const users = await getAllCloudUsers();
      const isNeonConnected = Boolean(getNeonSql());
      const userList = users.map(u => {
        const p = u.profile || {};
        return {
          uid: u.uid || u.account,
          account: u.account || p.account || '未名账号',
          nickname: u.nickname || p.nickname || '玩家学员',
          createdAt: u.createdAt || Date.now(),
          updatedAt: u.updatedAt || Date.now(),
          level: p.level || 1,
          emeralds: p.emeralds || 0,
          xp: p.xp || 0,
          streakDays: p.streakDays || 1,
          lastActiveDate: p.lastActiveDate || '',
          unlockedLessonsCount: p.unlockedLessonIds?.length || 0,
          profile: p
        };
      });
      return res.json({
        success: true,
        count: userList.length,
        neonConnected: isNeonConnected,
        databaseUrlConfigured: Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING),
        users: userList
      });
    } catch (err: any) {
      return res.status(200).json({ success: false, error: "读取注册用户数据失败" });
    }
  });

  // Global API error handler ensuring all /api requests return JSON
  app.use("/api", (err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("API Express Error:", err);
    res.status(500).json({ success: false, error: "服务器内部异常，请稍后重试" });
  });

  
// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
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

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", async () => {
    console.log(`Minecraft English AI Server running on http://localhost:${PORT}`);
    
    // Initialize Neon PostgreSQL table on startup if DATABASE_URL is connected
    const sql = getNeonSql();
    if (sql) {
      await ensureNeonTable();
      console.log("[Neon Postgres] Server ready with Neon PostgreSQL database.");
    } else {
      console.log("[Neon Postgres] DATABASE_URL not set yet. Waiting for Neon database connection.");
    }
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;

