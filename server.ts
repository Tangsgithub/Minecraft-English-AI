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
    neonTableInitialized = true;
    console.log("[Neon Postgres] Database table 'users' initialized successfully!");
  } catch (e) {
    console.warn("[Neon Postgres] Table initialization warning:", e);
  }
}

// Exclusive Neon PostgreSQL Database Handlers
async function getCloudUser(accountOrUid: string): Promise<any | null> {
  if (!accountOrUid) return null;
  const clean = accountOrUid.trim().toLowerCase();

  const memUser = memoryUsersFallback.get(clean);
  if (memUser) return memUser;

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureNeonTable();
      const rows = await sql`SELECT * FROM users WHERE LOWER(account) = ${clean} OR uid = ${clean} LIMIT 1`;
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
        return u;
      }
      return null;
    } catch (e) {
      console.warn("Neon Postgres get error:", e);
      return null;
    }
  }

  // Fallback if DATABASE_URL is missing
  return memoryUsersFallback.get(clean) || null;
}

async function saveCloudUser(account: string, userObj: any): Promise<boolean> {
  if (!account || !userObj) return false;
  const clean = account.trim().toLowerCase();

  memoryUsersFallback.set(clean, userObj);

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureNeonTable();
      const profileJson = JSON.stringify(userObj.profile || {});
      await sql`
        INSERT INTO users (account, uid, nickname, salt, hash, password, created_at, updated_at, profile)
        VALUES (
          ${clean},
          ${userObj.uid || clean},
          ${userObj.nickname || '玩家'},
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
      const apiKey = config?.apiKey || (provider === 'deepseek' ? process.env.DEEPSEEK_API_KEY : process.env.GEMINI_API_KEY) || process.env.GEMINI_API_KEY || '';
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

        let requestModel = config?.model || 'gemini-3.6-flash';
        if (requestModel.includes('deepseek') || requestModel.includes('openai') || requestModel.includes('llama')) {
          requestModel = 'gemini-3.6-flash';
        }
        const candidateModels = Array.from(new Set([requestModel, 'gemini-3.6-flash', 'gemini-3.1-pro-preview']));

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
            console.warn(`Gemini model ${mod} failed, trying fallback model:`, err?.message || err);
            lastError = err;
          }
        }

        if (!responseText && lastError) {
          throw lastError;
        }

        const replyText = responseText || "Alex: Great effort! Keep exploring!";
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
      const apiKey = config?.apiKey || (provider === 'deepseek' ? process.env.DEEPSEEK_API_KEY : process.env.GEMINI_API_KEY) || process.env.GEMINI_API_KEY || '';
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

  // ===== Direct Authentication API Routes (China Mainland VPN-free direct access) =====
  
  // Register Endpoint
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { account, password, nickname } = req.body || {};
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

      const initialProfile = {
        id: uid,
        nickname: userNickname,
        account: account.trim(),
        selectedVolumeId: 'vol1',
        currentLessonId: 1,
        unlockedLessonIds: [1, 2],
        completedMissionIds: [],
        unlockedBadgeIds: ['badge_first_words'],
        masteredWords: [],
        emeralds: 100,
        xp: 0,
        level: 1,
        avatar: 'steve',
        selectedAvatar: '👦',
        customAvatarUrl: '',
        learningGoal: 15,
        todayMinutes: 0,
        streakDays: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        vocabulary: [],
        completedMissions: [],
        unlockedCraftingIds: [],
        enderChestCount: 0,
        eyeCareEnabled: false,
        eyeCareMinutes: 20,
        apiKeyConfig: {
          provider: 'deepseek',
          apiKey: '',
          baseUrl: 'https://api.deepseek.com',
          model: 'deepseek-chat'
        },
        isInitialSetupDone: true
      };

      const userObj = {
        uid,
        account: account.trim(),
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
        message: "注册成功！账号已打通云端数据库",
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
        message: "登录成功！已从 Firebase 云端同步您的学习进度",
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
      const { uid, profile } = req.body || {};
      if (!profile) {
        return res.status(200).json({ success: false, error: "缺少同步参数" });
      }

      const account = profile.account || profile.id || uid;
      const userObj = await getCloudUser(account) || { uid: uid || profile.id, account, profile };

      userObj.profile = { ...userObj.profile, ...profile };
      userObj.updatedAt = Date.now();
      await saveCloudUser(account, userObj);

      return res.json({ success: true, message: "学习进度已实时同步至云端" });
    } catch (err: any) {
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

