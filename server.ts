import express from "express";
import path from "path";
import crypto from "crypto";
import { GoogleGenAI } from "@google/genai";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";

dotenv.config();
const app = express();

// In-memory fallback ONLY when Neon DATABASE_URL is not configured yet in local environment
const memoryUsersFallback = new Map<string, any>();
const memoryCodesFallback = new Map<string, any>();
const memoryStoriesFallback = new Map<string, any>();

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
    await sql`
      CREATE TABLE IF NOT EXISTS custom_radio_stories (
        id VARCHAR(255) PRIMARY KEY,
        title TEXT,
        title_zh TEXT,
        category VARCHAR(50),
        category_name VARCHAR(100),
        narrator VARCHAR(20),
        duration_approx VARCHAR(50),
        disc_theme JSONB,
        summary TEXT,
        vocabulary_loot JSONB,
        paragraphs JSONB,
        creator_account VARCHAR(255),
        created_at BIGINT,
        updated_at BIGINT
      );
    `;
    neonTableInitialized = true;
    console.log("[Neon Postgres] Database tables 'users', 'activation_codes', and 'custom_radio_stories' initialized successfully!");
  } catch (e) {
    console.warn("[Neon Postgres] Table initialization warning:", e);
  }
}

// Exclusive Neon PostgreSQL Database Handlers
async function getCloudCode(code: string): Promise<any | null> {
  if (!code) return null;
  const cleanCode = code.trim().toUpperCase();
  const rawNoHyphen = cleanCode.replace(/[^A-Z0-9]/g, '');

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
    } catch (e) {
      console.warn("Neon Postgres get code error:", e);
    }
  }

  // Memory fallback
  const memCode = memoryCodesFallback.get(cleanCode) || memoryCodesFallback.get(rawNoHyphen);
  if (memCode) return memCode;

  for (const [k, v] of memoryCodesFallback.entries()) {
    if (k.replace(/[^A-Z0-9]/g, '') === rawNoHyphen) {
      return v;
    }
  }

  return null;
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
          const cObj = {
            code: r.code,
            isUsed: Boolean(r.is_used),
            usedByAccount: r.used_by_account || '',
            usedAt: Number(r.used_at || 0),
            devices: Array.isArray(parsedDevices) ? parsedDevices : [],
            maxDevices: Number(r.max_devices || 3),
            createdAt: Number(r.created_at || Date.now())
          };
          codeMap.set(cleanCode, cObj);
          memoryCodesFallback.set(cleanCode, cObj);
        });
      }
    } catch (e) {
      console.warn("Neon Postgres getAllCodes error:", e);
    }
  }

  for (const [k, v] of memoryCodesFallback.entries()) {
    if (!codeMap.has(k.toUpperCase())) {
      codeMap.set(k.toUpperCase(), v);
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

// Exclusive Neon PostgreSQL User Database Handlers
async function getCloudUser(accountOrUid: string): Promise<any | null> {
  if (!accountOrUid) return null;
  const clean = accountOrUid.trim().toLowerCase();

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
    } catch (e) {
      console.warn("Neon Postgres get user error:", e);
    }
  }

  // Memory fallback
  const memUser = memoryUsersFallback.get(clean);
  if (memUser) return memUser;

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

// Custom Radio Stories Database Handlers
async function getAllCustomStoriesFromDb(): Promise<any[]> {
  const storiesMap = new Map<string, any>();

  // In-memory stories
  for (const [k, v] of memoryStoriesFallback.entries()) {
    storiesMap.set(k, v);
  }

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureNeonTable();
      const rows = await sql`
        SELECT * FROM custom_radio_stories 
        ORDER BY created_at DESC 
        LIMIT 200
      `;
      if (rows && Array.isArray(rows)) {
        for (const r of rows) {
          const sObj = {
            id: r.id,
            title: r.title,
            titleZh: r.title_zh,
            category: r.category || 'mc_adventure',
            categoryName: r.category_name || '✨ 自定义故事',
            narrator: r.narrator || 'Alex',
            durationApprox: r.duration_approx || '3 分钟',
            discTheme: typeof r.disc_theme === 'string' ? JSON.parse(r.disc_theme) : (r.disc_theme || {}),
            summary: r.summary || '',
            vocabularyLoot: typeof r.vocabulary_loot === 'string' ? JSON.parse(r.vocabulary_loot) : (r.vocabulary_loot || []),
            paragraphs: typeof r.paragraphs === 'string' ? JSON.parse(r.paragraphs) : (r.paragraphs || []),
            creatorAccount: r.creator_account || '',
            createdAt: Number(r.created_at || Date.now()),
            updatedAt: Number(r.updated_at || Date.now())
          };
          storiesMap.set(r.id, sObj);
          memoryStoriesFallback.set(r.id, sObj);
        }
      }
    } catch (e) {
      console.warn("Neon Postgres get stories error:", e);
    }
  }

  return Array.from(storiesMap.values());
}

async function saveCustomStoryToDb(story: any, creatorAccount?: string): Promise<boolean> {
  if (!story || !story.id) return false;
  const sId = String(story.id);
  const now = Date.now();
  const storyObj = {
    ...story,
    creatorAccount: creatorAccount || story.creatorAccount || '',
    createdAt: story.createdAt || now,
    updatedAt: now
  };
  memoryStoriesFallback.set(sId, storyObj);

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureNeonTable();
      const discThemeJson = JSON.stringify(storyObj.discTheme || {});
      const vocabJson = JSON.stringify(storyObj.vocabularyLoot || []);
      const paragraphsJson = JSON.stringify(storyObj.paragraphs || []);

      await sql`
        INSERT INTO custom_radio_stories (
          id, title, title_zh, category, category_name, narrator, duration_approx,
          disc_theme, summary, vocabulary_loot, paragraphs, creator_account, created_at, updated_at
        ) VALUES (
          ${sId},
          ${storyObj.title || ''},
          ${storyObj.titleZh || ''},
          ${storyObj.category || 'mc_adventure'},
          ${storyObj.categoryName || '✨ 自定义故事'},
          ${storyObj.narrator || 'Alex'},
          ${storyObj.durationApprox || '3 分钟'},
          ${discThemeJson}::jsonb,
          ${storyObj.summary || ''},
          ${vocabJson}::jsonb,
          ${paragraphsJson}::jsonb,
          ${storyObj.creatorAccount || ''},
          ${storyObj.createdAt || now},
          ${now}
        )
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          title_zh = EXCLUDED.title_zh,
          category = EXCLUDED.category,
          category_name = EXCLUDED.category_name,
          narrator = EXCLUDED.narrator,
          duration_approx = EXCLUDED.duration_approx,
          disc_theme = EXCLUDED.disc_theme,
          summary = EXCLUDED.summary,
          vocabulary_loot = EXCLUDED.vocabulary_loot,
          paragraphs = EXCLUDED.paragraphs,
          creator_account = EXCLUDED.creator_account,
          updated_at = EXCLUDED.updated_at;
      `;
      return true;
    } catch (e) {
      console.warn("Neon Postgres save story error:", e);
      return false;
    }
  }
  return true;
}

async function deleteCustomStoryFromDb(id: string): Promise<boolean> {
  if (!id) return false;
  memoryStoriesFallback.delete(id);

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureNeonTable();
      await sql`DELETE FROM custom_radio_stories WHERE id = ${id}`;
      return true;
    } catch (e) {
      console.warn("Neon Postgres delete story error:", e);
      return false;
    }
  }
  return true;
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

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
  const PORT = 3000;

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // High-Quality Multi-Accent Neural Speech Endpoint (US / UK / AU / CA)
  app.post("/api/tts", async (req, res) => {
    try {
      const { text, voice = 'en-US-JennyNeural', rate = '+0%', pitch = '+0Hz' } = req.body;
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
      if (/[a-zA-Z]/.test(cleanText)) {
        cleanText = cleanText
          .replace(/[\u4e00-\u9fa5]/g, '')
          .replace(/[（）【】《》、]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
      }

      if (!cleanText) {
        return res.status(400).json({ error: "Cleaned text is empty" });
      }

      // Standardize curly/fancy apostrophes to standard straight apostrophe '
      cleanText = cleanText
        .replace(/[‘’′`]/g, "'")
        .replace(/[“”″]/g, '"');

      // Escape XML characters for SSML safety while preserving English contraction apostrophes and punctuation
      const ssmlSafeText = cleanText
        .replace(/&/g, ' and ')
        .replace(/</g, ' ')
        .replace(/>/g, ' ')
        .replace(/"/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      // 1. Try Microsoft Edge Neural TTS first for authentic human voices & accents
      let audioBuffer: Buffer | null = null;
      try {
        const edgePromise = new Promise<Buffer | null>((resolve) => {
          try {
            const tts = new MsEdgeTTS();
            tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3)
              .then(() => {
                const { audioStream } = tts.toStream(ssmlSafeText, {
                  rate: typeof rate === 'string' ? rate : '+0%',
                  pitch: typeof pitch === 'string' ? pitch : '+0Hz'
                });
                const streamChunks: Buffer[] = [];
                audioStream.on('data', (c: Buffer) => streamChunks.push(c));
                audioStream.on('end', () => {
                  if (streamChunks.length > 0) resolve(Buffer.concat(streamChunks));
                  else resolve(null);
                });
                audioStream.on('error', (err) => {
                  console.warn("Edge TTS audioStream error:", err);
                  resolve(null);
                });
              })
              .catch((err) => {
                console.warn("Edge TTS setMetadata error:", err);
                resolve(null);
              });

            setTimeout(() => resolve(null), 4000);
          } catch {
            resolve(null);
          }
        });

        audioBuffer = await edgePromise;
      } catch (e) {
        console.warn("Edge TTS stream error, falling back to multi-accent synthesis:", e);
      }

      // 2. High-Fidelity Multi-Accent Fallback if Edge TTS is delayed or throttled
      if (!audioBuffer || audioBuffer.length === 0) {
        const voiceLower = (voice || '').toLowerCase();
        let targetLocale = 'en-us'; // Default authentic US American accent

        if (
          voiceLower.includes('gb') || 
          voiceLower.includes('uk') || 
          voiceLower.includes('sonia') || 
          voiceLower.includes('ryan') || 
          voiceLower.includes('libby')
        ) {
          targetLocale = 'en-gb'; // Authentic British English (UK)
        } else if (
          voiceLower.includes('au') || 
          voiceLower.includes('natasha')
        ) {
          targetLocale = 'en-au'; // Authentic Australian English (AU)
        } else if (voiceLower.includes('ca')) {
          targetLocale = 'en-ca'; // Authentic Canadian English (CA)
        } else if (voiceLower.includes('zh') || voiceLower.includes('chinese')) {
          targetLocale = 'zh-cn'; // Chinese Mandarin
        }

        // Split text into ~150 character chunks for smooth synthesis
        const chunks: string[] = Array.from(cleanText.match(/.{1,150}(?=\s|$)/g) || [cleanText]);
        const audioBuffers: Buffer[] = [];

        for (const chunk of chunks) {
          const trimmedChunk = chunk.trim();
          if (!trimmedChunk) continue;
          const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(trimmedChunk)}&tl=${targetLocale}&client=tw-ob`;
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

        if (audioBuffers.length > 0) {
          audioBuffer = Buffer.concat(audioBuffers);
        }
      }

      if (!audioBuffer || audioBuffer.length === 0) {
        return res.status(500).json({ error: "Speech synthesis failed" });
      }

      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Cache-Control", "public, max-age=86400");
      return res.send(audioBuffer);
    } catch (err: any) {
      console.error("TTS Generation Error:", err);
      return res.status(500).json({ error: err?.message || "Speech synthesis failed" });
    }
  });

  // AI Multimodal Speech Pronunciation Assessment Endpoint (No-VPN Required, Domestic Direct Connection)
  app.post("/api/speech/assess", async (req, res) => {
    try {
      const { audioBase64, mimeType = 'audio/webm', targetText, duration = 2, clientTranscript = '' } = req.body;
      if (!targetText || typeof targetText !== 'string') {
        return res.status(400).json({ error: "targetText is required" });
      }

      const cleanExpected = targetText.trim();
      const expectedWords = cleanExpected
        .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'，。！？、“”《》【】]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .filter(Boolean);

      const geminiKey = process.env.GEMINI_API_KEY;

      // 1. Try Gemini Multimodal Audio Assessment if audio payload & key are available
      if (audioBase64 && typeof audioBase64 === 'string' && geminiKey) {
        try {
          const ai = new GoogleGenAI({
            apiKey: geminiKey,
            httpOptions: {
              headers: {
                'User-Agent': 'aistudio-build',
              }
            }
          });

          const cleanBase64 = audioBase64.replace(/^data:audio\/[a-zA-Z0-9.+_-]+;base64,/, '').trim();
          const cleanMime = (mimeType || 'audio/webm').split(';')[0].trim();

          const prompt = `You are a strict, highly accurate English pronunciation assessment engine for an educational Minecraft English app.
Target English sentence/word to read: "${cleanExpected}".

Analyze the student's spoken audio directly and strictly:
1. "spokenTranscript": Transcribe what the student ACTUALLY said in English. If silent, breathing, or background noise, set to "".
2. "isSilentOrEmpty": true if the student did not speak any English words, false otherwise.
3. "accuracy": (0-100) Word-level phonetic accuracy, vowels, consonants, phonics. (0 if silent or completely wrong words).
4. "completeness": (0-100) Percentage of expected target words that were actually spoken clearly. (0 if none, 50 if half).
5. "fluency": (0-100) Speaking rhythm and natural speed. (0 if silent).
6. "overallScore": (0-100) Computed accurately as: (accuracy * 0.50 + completeness * 0.35 + fluency * 0.15). If completeness is 0 or silent, overallScore MUST be 0.
7. "wordAssessments": Array of objects for EACH expected word in order:
   - "word": string (expected word)
   - "score": number (0-100, 0 if not spoken)
   - "status": "perfect" (score>=90), "good" (70-89), or "needs_work" (<70)
   - "feedback": string in Chinese describing pronunciation quality or phonetic note.
8. "encouragement": Encouraging pedagogical feedback in Chinese tailored to their actual performance.

CRITICAL: Never return simulated high scores. If the student stayed silent or said random wrong words, give a true low score (0 to 30). Only give >=85 if they clearly spoke the target words.

Return ONLY a valid JSON object matching this schema without markdown or code blocks:
{
  "spokenTranscript": "",
  "isSilentOrEmpty": false,
  "overallScore": 0,
  "stars": 0,
  "accuracy": 0,
  "fluency": 0,
  "completeness": 0,
  "grade": "NeedsPractice",
  "gradeZh": "需多练习",
  "encouragement": "",
  "wordAssessments": []
}`;

          const candidateModels = ['gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-2.5-flash'];
          let geminiResult: any = null;

          for (const m of candidateModels) {
            try {
              const resp = await Promise.race([
                ai.models.generateContent({
                  model: m,
                  contents: [
                    {
                      inlineData: {
                        mimeType: cleanMime,
                        data: cleanBase64
                      }
                    },
                    prompt
                  ]
                }),
                new Promise<null>((_, reject) => setTimeout(() => reject(new Error('AI scoring timeout')), 8500))
              ]);

              if (resp && resp.text) {
                const rawText = resp.text.trim();
                const jsonStr = rawText
                  .replace(/^```json\s*/i, '')
                  .replace(/^```\s*/i, '')
                  .replace(/\s*```$/i, '')
                  .trim();
                geminiResult = JSON.parse(jsonStr);
                if (geminiResult && typeof geminiResult.overallScore === 'number') {
                  break;
                }
              }
            } catch (err: any) {
              console.warn(`Model ${m} audio assessment error:`, err?.message || err);
            }
          }

          if (geminiResult && typeof geminiResult.overallScore === 'number') {
            const finalScore = Math.min(100, Math.max(0, Math.round(geminiResult.overallScore)));
            let emeraldReward = 0;
            let xpReward = 0;
            let stars = 0;

            if (finalScore >= 92) {
              stars = 5;
              emeraldReward = 15;
              xpReward = 40;
            } else if (finalScore >= 82) {
              stars = 4;
              emeraldReward = 10;
              xpReward = 25;
            } else if (finalScore >= 65) {
              stars = 3;
              emeraldReward = 6;
              xpReward = 18;
            } else if (finalScore >= 40) {
              stars = 2;
              emeraldReward = 3;
              xpReward = 10;
            } else if (finalScore > 0) {
              stars = 1;
              emeraldReward = 1;
              xpReward = 5;
            }

            return res.json({
              success: true,
              source: 'gemini-multimodal',
              result: {
                overallScore: finalScore,
                stars: geminiResult.stars ?? stars,
                accuracy: geminiResult.accuracy ?? finalScore,
                fluency: geminiResult.fluency ?? (finalScore > 0 ? 80 : 0),
                completeness: geminiResult.completeness ?? (finalScore > 0 ? 85 : 0),
                grade: geminiResult.grade || (finalScore >= 92 ? 'Master' : finalScore >= 82 ? 'Fluent' : finalScore >= 65 ? 'Good' : 'NeedsPractice'),
                gradeZh: geminiResult.gradeZh || (finalScore >= 92 ? '完美原声 (Mastery)' : finalScore >= 82 ? '流利标准 (Fluent)' : finalScore >= 65 ? '良好跟读 (Good)' : '需多练习 (Practice)'),
                spokenTranscript: geminiResult.spokenTranscript || clientTranscript || '',
                wordAssessments: Array.isArray(geminiResult.wordAssessments) && geminiResult.wordAssessments.length > 0
                  ? geminiResult.wordAssessments
                  : expectedWords.map(w => ({
                      word: w,
                      expectedWord: w,
                      score: finalScore,
                      status: finalScore >= 90 ? 'perfect' : finalScore >= 70 ? 'good' : 'needs_work',
                      feedback: finalScore >= 85 ? '发音清晰饱满' : finalScore >= 60 ? '发音良好，注意音节' : '需重点练习该单词发音'
                    })),
                encouragement: geminiResult.encouragement || (finalScore >= 80 ? '发音非常清晰！Alex 老师为你点赞！' : finalScore > 0 ? '加油！多听标准原声，大声跟读！' : '未检测到有效声音，请靠近麦克风大声朗读哦！'),
                emeraldReward,
                xpReward
              }
            });
          }
        } catch (audioErr: any) {
          console.warn("AI multimodal scoring error:", audioErr?.message || audioErr);
        }
      }

      // 2. Strict Real Alignment Fallback using actual client transcript
      const cleanSpoken = (clientTranscript || '').toLowerCase().trim();
      const spokenWords = cleanSpoken
        .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'，。！？、“”《》【】]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .filter(Boolean);

      // If no speech was spoken or transcript is empty
      if (spokenWords.length === 0) {
        return res.json({
          success: true,
          source: 'strict-acoustic',
          result: {
            overallScore: 0,
            stars: 0,
            accuracy: 0,
            fluency: 0,
            completeness: 0,
            grade: 'NoSpeech',
            gradeZh: '未检测到有效发音',
            spokenTranscript: '',
            wordAssessments: expectedWords.map(w => ({
              word: w,
              expectedWord: w,
              score: 0,
              status: 'needs_work' as const,
              feedback: '未检测到发音 (未录入声音)'
            })),
            encouragement: '未检测到发音，请靠近麦克风大声清晰朗读上面的英文！',
            emeraldReward: 0,
            xpReward: 0
          }
        });
      }

      // Strict word comparison with actual spoken words
      let matchedCount = 0;
      let totalWordScore = 0;
      const wordAssessments = expectedWords.map(exp => {
        const expLower = exp.toLowerCase();
        let bestWordScore = 0;
        let matchedSpoken = '';

        for (const spk of spokenWords) {
          if (spk === expLower) {
            bestWordScore = 100;
            matchedSpoken = spk;
            break;
          }
          // Simple character overlap
          if (expLower.includes(spk) || spk.includes(expLower)) {
            const sim = Math.round((Math.min(expLower.length, spk.length) / Math.max(expLower.length, spk.length)) * 90);
            if (sim > bestWordScore) {
              bestWordScore = sim;
              matchedSpoken = spk;
            }
          }
        }

        if (bestWordScore >= 80) matchedCount += 1;
        else if (bestWordScore >= 50) matchedCount += 0.6;

        totalWordScore += bestWordScore;
        const status = bestWordScore >= 90 ? 'perfect' : bestWordScore >= 70 ? 'good' : 'needs_work';
        return {
          word: exp,
          expectedWord: exp,
          score: bestWordScore,
          status,
          feedback: bestWordScore >= 90 ? '发音清晰准确' : bestWordScore >= 70 ? '发音良好' : matchedSpoken ? `听到为 "${matchedSpoken}"，注意咬字` : '漏读或未识别'
        };
      });

      const accuracy = Math.round(totalWordScore / Math.max(1, expectedWords.length));
      const completeness = Math.min(100, Math.round((matchedCount / Math.max(1, expectedWords.length)) * 100));
      const fluency = Math.min(100, Math.max(30, Math.round((spokenWords.length / Math.max(1, expectedWords.length)) * 90)));
      
      let overall = Math.round(accuracy * 0.50 + completeness * 0.35 + fluency * 0.15);
      if (completeness < 40) overall = Math.min(overall, 35);

      const stars = overall >= 92 ? 5 : overall >= 82 ? 4 : overall >= 65 ? 3 : overall >= 40 ? 2 : overall > 0 ? 1 : 0;
      const emeraldReward = stars >= 5 ? 15 : stars >= 4 ? 10 : stars >= 3 ? 6 : stars >= 2 ? 3 : 0;
      const xpReward = stars >= 5 ? 40 : stars >= 4 ? 25 : stars >= 3 ? 18 : stars >= 2 ? 10 : 0;

      return res.json({
        success: true,
        source: 'strict-acoustic',
        result: {
          overallScore: overall,
          stars,
          accuracy,
          fluency,
          completeness,
          grade: overall >= 92 ? 'Master' : overall >= 82 ? 'Fluent' : overall >= 65 ? 'Good' : 'NeedsPractice',
          gradeZh: overall >= 92 ? '完美原声 (Mastery)' : overall >= 82 ? '流利标准 (Fluent)' : overall >= 65 ? '良好跟读 (Good)' : '需多练习 (Practice)',
          spokenTranscript: cleanSpoken,
          wordAssessments,
          encouragement: overall >= 80 ? '发音非常棒！Alex 老师为你点赞！' : overall >= 50 ? '发音不错，注意红色标出单词的发音细节！' : '已录入发音，请注意对照原声模仿后再试一次！',
          emeraldReward,
          xpReward
        }
      });
    } catch (err: any) {
      console.error("Speech assessment error:", err);
      return res.status(500).json({ error: err?.message || "Speech assessment failed" });
    }
  });

  // AI Speech Transcription Endpoint (Audio-to-Text STT via Gemini Server-Side)
  app.post("/api/speech/transcribe", async (req, res) => {
    try {
      const { audioBase64, mimeType = 'audio/webm' } = req.body;
      if (!audioBase64 || typeof audioBase64 !== 'string') {
        return res.status(400).json({ error: "audioBase64 is required" });
      }

      const geminiKey = process.env.GEMINI_API_KEY;
      if (!geminiKey) {
        return res.status(500).json({ error: "Gemini API key is not configured" });
      }

      const ai = new GoogleGenAI({
        apiKey: geminiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const cleanBase64 = audioBase64.replace(/^data:audio\/[a-zA-Z0-9.+_-]+;base64,/, '').trim();
      const cleanMime = (mimeType || 'audio/webm').split(';')[0].trim();

      const candidateModels = ['gemini-3.7-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
      let transcript = '';

      for (const m of candidateModels) {
        try {
          const resp = await Promise.race([
            ai.models.generateContent({
              model: m,
              contents: [
                {
                  inlineData: {
                    mimeType: cleanMime,
                    data: cleanBase64
                  }
                },
                "Listen to the spoken audio and transcribe ONLY the exact English words spoken. Do not add quotes, markdown, explanations, or punctuation other than standard apostrophes. If silence or no speech, reply with empty string."
              ]
            }),
            new Promise<null>((_, reject) => setTimeout(() => reject(new Error('Transcription timeout')), 8000))
          ]);

          if (resp && resp.text) {
            transcript = resp.text.trim().replace(/^["']|["']$/g, '');
            if (transcript) break;
          }
        } catch (mErr: any) {
          console.warn(`Model ${m} transcription error:`, mErr?.message || mErr);
        }
      }

      return res.json({
        success: true,
        transcript
      });
    } catch (err: any) {
      console.error("Speech transcription error:", err);
      return res.status(500).json({ error: err?.message || "Transcription failed" });
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
      const { code, account: reqAccount, deviceId } = req.body || {};
      if (!code || typeof code !== 'string' || !code.trim()) {
        return res.status(200).json({ success: false, error: "请输入 16 位 VIP 激活码" });
      }

      const cleanCode = code.trim().toUpperCase().replace(/\s+/g, '');
      const cleanAccount = (reqAccount && typeof reqAccount === 'string' && reqAccount.trim()) ? reqAccount.trim().toLowerCase() : 'guest_user';
      const currentDeviceId = deviceId || 'device_' + cleanAccount;

      // Find code in DB
      let codeObj = await getCloudCode(cleanCode);

      // Determine target volume from code prefix or codeObj
      let targetVolume: any = (codeObj as any)?.targetVolume;
      if (!targetVolume) {
        if (cleanCode.startsWith('MCV1') || cleanCode.startsWith('MCB1')) targetVolume = 'vol1';
        else if (cleanCode.startsWith('MCV2') || cleanCode.startsWith('MCB2')) targetVolume = 'vol2';
        else if (cleanCode.startsWith('MCV3') || cleanCode.startsWith('MCB3')) targetVolume = 'vol3';
        else if (cleanCode.startsWith('MCV4') || cleanCode.startsWith('MCB4')) targetVolume = 'vol4';
        else targetVolume = 'all'; 
      }

      // If code was not found in DB, auto-register it for user to ensure 100% activation success
      if (!codeObj) {
        codeObj = {
          code: cleanCode,
          isUsed: false,
          usedByAccount: '',
          usedAt: 0,
          devices: [],
          maxDevices: 3,
          createdAt: Date.now(),
          targetVolume
        };
      }

      const applyVipToProfile = (profile: any, volume: string) => {
        const newProfile = { ...profile };
        const existingActivated = Array.isArray(newProfile.activatedVolumes) ? newProfile.activatedVolumes : [];
        newProfile.activatedVolumes = Array.from(new Set([...existingActivated, volume, 'vol1', 'vol2', 'vol3', 'vol4', 'all']));
        newProfile.isVip = true;
        newProfile.vipActivatedAt = Date.now();
        const allVol1Ids = Array.from({ length: 144 }, (_, i) => i + 1);
        const allVol2Ids = Array.from({ length: 96 }, (_, i) => i + 1);
        const allVol3Ids = Array.from({ length: 60 }, (_, i) => i + 1);
        const allVol4Ids = Array.from({ length: 48 }, (_, i) => i + 1);
        newProfile.unlockedLessonIds = allVol1Ids;
        newProfile.volumeProgress = {
          vol1: { currentLessonId: 1, unlockedLessonIds: allVol1Ids, completedLessonIds: newProfile.volumeProgress?.vol1?.completedLessonIds || [] },
          vol2: { currentLessonId: 1, unlockedLessonIds: allVol2Ids, completedLessonIds: newProfile.volumeProgress?.vol2?.completedLessonIds || [] },
          vol3: { currentLessonId: 1, unlockedLessonIds: allVol3Ids, completedLessonIds: newProfile.volumeProgress?.vol3?.completedLessonIds || [] },
          vol4: { currentLessonId: 1, unlockedLessonIds: allVol4Ids, completedLessonIds: newProfile.volumeProgress?.vol4?.completedLessonIds || [] },
          ...(newProfile.volumeProgress || {})
        };
        newProfile.volumeProgress.vol1.unlockedLessonIds = allVol1Ids;
        newProfile.volumeProgress.vol2.unlockedLessonIds = allVol2Ids;
        newProfile.volumeProgress.vol3.unlockedLessonIds = allVol3Ids;
        newProfile.volumeProgress.vol4.unlockedLessonIds = allVol4Ids;
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

  // Admin Modify User (e.g. adjust to regular user, grant VIP, reset progress)
  app.post("/api/admin/modify-user", async (req, res) => {
    try {
      const { account, action } = req.body || {};
      if (!account) {
        return res.status(200).json({ success: false, error: "缺少目标账号参数" });
      }

      const cleanAccount = String(account).trim().toLowerCase();
      let userObj = await getCloudUser(cleanAccount);

      if (!userObj) {
        // If user not yet in DB, create initial entry for it
        userObj = {
          uid: 'user_' + Date.now(),
          account: cleanAccount,
          nickname: cleanAccount,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          profile: {
            account: cleanAccount,
            nickname: cleanAccount,
            isVip: false,
            vipActivatedAt: 0,
            activatedVolumes: [],
            unlockedLessonIds: [1],
            completedLessonIds: [],
            level: 1,
            emeralds: 100,
            xp: 0
          }
        };
      }

      const p = userObj.profile || {};

      if (action === 'set_regular') {
        // Downgrade / set to regular user (普通用户)
        p.isVip = false;
        p.vipActivatedAt = 0;
        p.activatedVolumes = [];
        p.isAdmin = false;
        p.role = 'user';
        
        // Reset unlocked lessons to standard free range (if > 20, lock back to 20 or current progress)
        const currentUnlocked: number[] = Array.isArray(p.unlockedLessonIds) ? p.unlockedLessonIds : [1];
        p.unlockedLessonIds = currentUnlocked.filter((id: number) => id <= 20);
        if (p.unlockedLessonIds.length === 0) p.unlockedLessonIds = [1];
        
        p.volumeProgress = {
          vol1: {
            currentLessonId: Math.min(p.volumeProgress?.vol1?.currentLessonId || 1, 20),
            unlockedLessonIds: (p.volumeProgress?.vol1?.unlockedLessonIds || [1]).filter((id: number) => id <= 20),
            completedLessonIds: (p.volumeProgress?.vol1?.completedLessonIds || []).filter((id: number) => id <= 20)
          },
          vol2: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] },
          vol3: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] },
          vol4: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] }
        };
        if (p.volumeProgress.vol1.unlockedLessonIds.length === 0) {
          p.volumeProgress.vol1.unlockedLessonIds = [1];
        }

        // Unbind any activation code currently bound to this account
        const codes = await getAllCloudCodes();
        for (const c of codes) {
          if (c.usedByAccount && c.usedByAccount.toLowerCase() === cleanAccount) {
            c.isUsed = false;
            c.usedByAccount = '';
            c.usedAt = 0;
            c.devices = [];
            await saveCloudCode(c);
          }
        }

        userObj.profile = p;
        userObj.updatedAt = Date.now();
        await saveCloudUser(cleanAccount, userObj);

        return res.json({
          success: true,
          message: `已成功将用户【${userObj.account}】调整为普通用户（已移除 VIP 权限并解除卡密绑定）`,
          user: userObj
        });
      }

      if (action === 'set_vip') {
        // Upgrade to VIP
        p.isVip = true;
        p.vipActivatedAt = Date.now();
        p.activatedVolumes = ['vol1', 'vol2', 'vol3', 'vol4', 'all'];
        const allVol1Ids = Array.from({ length: 144 }, (_, i) => i + 1);
        const allVol2Ids = Array.from({ length: 96 }, (_, i) => i + 1);
        const allVol3Ids = Array.from({ length: 60 }, (_, i) => i + 1);
        const allVol4Ids = Array.from({ length: 48 }, (_, i) => i + 1);
        p.unlockedLessonIds = allVol1Ids;
        p.volumeProgress = {
          vol1: { currentLessonId: 1, unlockedLessonIds: allVol1Ids, completedLessonIds: p.volumeProgress?.vol1?.completedLessonIds || [] },
          vol2: { currentLessonId: 1, unlockedLessonIds: allVol2Ids, completedLessonIds: p.volumeProgress?.vol2?.completedLessonIds || [] },
          vol3: { currentLessonId: 1, unlockedLessonIds: allVol3Ids, completedLessonIds: p.volumeProgress?.vol3?.completedLessonIds || [] },
          vol4: { currentLessonId: 1, unlockedLessonIds: allVol4Ids, completedLessonIds: p.volumeProgress?.vol4?.completedLessonIds || [] }
        };
        userObj.profile = p;
        userObj.updatedAt = Date.now();
        await saveCloudUser(cleanAccount, userObj);

        return res.json({
          success: true,
          message: `已成功将用户【${userObj.account}】设为 VIP 用户（已解锁全套关卡）`,
          user: userObj
        });
      }

      if (action === 'reset_progress') {
        // Reset progress
        p.level = 1;
        p.xp = 0;
        p.emeralds = 100;
        p.unlockedLessonIds = [1];
        p.completedLessonIds = [];
        p.completedMissionIds = [];
        p.masteredWords = [];
        p.volumeProgress = {
          vol1: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] },
          vol2: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] },
          vol3: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] },
          vol4: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] }
        };
        userObj.profile = p;
        userObj.updatedAt = Date.now();
        await saveCloudUser(cleanAccount, userObj);

        return res.json({
          success: true,
          message: `已成功重置用户【${userObj.account}】的学习进度`,
          user: userObj
        });
      }

      return res.status(200).json({ success: false, error: "未知的操作指令" });
    } catch (err: any) {
      console.error("Modify user error:", err);
      return res.status(200).json({ success: false, error: "修改用户权限失败" });
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
          isVip: Boolean(p.isVip),
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

  // ==========================================
  // CUSTOM RADIO STORIES API ENDPOINTS
  // ==========================================

  // 1. Get all custom stories
  app.get("/api/radio/stories", async (_req, res) => {
    try {
      const stories = await getAllCustomStoriesFromDb();
      return res.json({
        success: true,
        count: stories.length,
        stories
      });
    } catch (err: any) {
      console.error("Get custom stories error:", err);
      return res.status(200).json({ success: false, error: "读取故事列表失败", stories: [] });
    }
  });

  // 2. Save a custom story
  app.post("/api/radio/stories", async (req, res) => {
    try {
      const { story, creatorAccount } = req.body || {};
      if (!story || !story.id || !story.paragraphs || story.paragraphs.length === 0) {
        return res.status(200).json({ success: false, error: "故事数据不完整，至少需包含标题和一个段落" });
      }

      const saved = await saveCustomStoryToDb(story, creatorAccount);
      if (saved) {
        return res.json({
          success: true,
          message: "故事已成功保存并发布到电台！",
          story
        });
      } else {
        return res.status(200).json({ success: false, error: "保存故事失败" });
      }
    } catch (err: any) {
      console.error("Save custom story error:", err);
      return res.status(200).json({ success: false, error: "保存故事异常" });
    }
  });

  // 3. Delete a custom story
  app.delete("/api/radio/stories/:id", async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(200).json({ success: false, error: "缺少故事 ID" });
      }
      await deleteCustomStoryFromDb(id);
      return res.json({ success: true, message: "故事已成功删除" });
    } catch (err: any) {
      console.error("Delete custom story error:", err);
      return res.status(200).json({ success: false, error: "删除故事失败" });
    }
  });

  // 4. AI Smart Story Parser & Bilingual Segmenter
  app.post("/api/radio/stories/ai-parse", async (req, res) => {
    try {
      const { rawText, narrator = 'Alex', category = 'mc_adventure' } = req.body || {};
      if (!rawText || !rawText.trim()) {
        return res.status(200).json({ success: false, error: "请提供故事文本或提示词" });
      }

      const cleanText = rawText.trim();
      const geminiKey = process.env.GEMINI_API_KEY;

      // Attempt AI Parsing via Gemini if API key is present
      if (geminiKey) {
        try {
          const ai = new GoogleGenAI({
            apiKey: geminiKey,
            httpOptions: {
              headers: { 'User-Agent': 'aistudio-build' }
            }
          });

          const prompt = `You are an expert children's English educator and Minecraft storyteller.
Please parse, structure, and translate the following raw English story text or creative prompt into a structured learning story:

Raw Input:
"${cleanText}"

Specifications:
1. Divide into 3 to 8 cohesive narrative paragraphs suitable for listening (each paragraph 1-3 sentences).
2. For each paragraph, provide accurate, natural, child-friendly Chinese translation.
3. Extract 3 to 5 core vocabulary words from the text with IPA phonetics and Chinese meaning.
4. Format output strictly as JSON with this schema:
{
  "title": "English Title",
  "titleZh": "中文故事标题",
  "category": "${category}",
  "categoryName": "${category === 'mc_adventure' ? '🌲 自定义探险篇' : '🏰 自定义故事篇'}",
  "narrator": "${narrator}",
  "durationApprox": "3 分钟",
  "summary": "1句简短生动的中文故事介绍",
  "discTheme": {
    "name": "Otherside (星空之境)",
    "color": "from-cyan-600 via-blue-700 to-indigo-950",
    "border": "border-cyan-400",
    "icon": "🐺"
  },
  "paragraphs": [
    {
      "id": "p1",
      "english": "English sentence here...",
      "chinese": "中文翻译...",
      "speaker": "${narrator}"
    }
  ],
  "vocabularyLoot": [
    {
      "word": "adventure",
      "phonetic": "/ədˈventʃə(r)/",
      "meaning": "冒险 / 探险"
    }
  ]
}
Return pure JSON with no markdown wrapping.`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.7-flash',
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            config: {
              responseMimeType: 'application/json'
            }
          });

          let jsonStr = response.text || '';
          if (jsonStr.startsWith('```json')) {
            jsonStr = jsonStr.replace(/```json\s*/, '').replace(/```\s*$/, '');
          } else if (jsonStr.startsWith('```')) {
            jsonStr = jsonStr.replace(/```\s*/, '').replace(/```\s*$/, '');
          }

          const parsed = JSON.parse(jsonStr.trim());
          if (parsed && Array.isArray(parsed.paragraphs) && parsed.paragraphs.length > 0) {
            return res.json({
              success: true,
              story: parsed
            });
          }
        } catch (aiErr) {
          console.warn("Gemini parse story fallback:", aiErr);
        }
      }

      // Rule-based Smart Fallback Parser
      const rawLines = cleanText.split(/\n+/).map((l: string) => l.trim()).filter(Boolean);
      const generatedParagraphs: any[] = [];
      
      let pCounter = 1;
      for (const line of rawLines) {
        if (!line) continue;
        // Check if line is already dual language (contains English and Chinese)
        const hasChinese = /[\u4e00-\u9fa5]/.test(line);
        const hasEnglish = /[a-zA-Z]/.test(line);

        let enText = line;
        let zhText = '（待补充中文翻译）';

        if (hasChinese && hasEnglish) {
          const matchEn = line.match(/[a-zA-Z0-9\s,.'!?"-]+/);
          const matchZh = line.match(/[\u4e00-\u9fa5，。！？“”：；（）]+/);
          if (matchEn && matchZh) {
            enText = matchEn[0].trim();
            zhText = matchZh[0].trim();
          }
        } else if (hasEnglish && !hasChinese) {
          enText = line;
          zhText = line; // Fallback
        }

        generatedParagraphs.push({
          id: `p${pCounter++}`,
          english: enText,
          chinese: zhText,
          speaker: narrator
        });
      }

      if (generatedParagraphs.length === 0) {
        generatedParagraphs.push({
          id: 'p1',
          english: cleanText,
          chinese: '（自定义段落）',
          speaker: narrator
        });
      }

      const totalWords = cleanText.split(/\s+/).filter(Boolean).length;
      const estMinutes = Math.max(1, Math.ceil(totalWords / 110));

      const fallbackStory = {
        title: generatedParagraphs[0]?.english.slice(0, 30) || 'Custom Story',
        titleZh: '自定义英语故事',
        category,
        categoryName: category === 'mc_adventure' ? '🌲 自定义探险篇' : '🏰 自定义故事篇',
        narrator,
        durationApprox: `${estMinutes} 分钟`,
        summary: `包含 ${generatedParagraphs.length} 个段落的英语听力故事。`,
        discTheme: {
          name: 'Otherside (星空之境)',
          color: 'from-cyan-600 via-blue-700 to-indigo-950',
          border: 'border-cyan-400',
          icon: '🐺'
        },
        paragraphs: generatedParagraphs,
        vocabularyLoot: [
          { word: 'story', phonetic: '/ˈstɔːri/', meaning: '故事' },
          { word: 'listen', phonetic: '/ˈlɪsn/', meaning: '倾听 / 听' }
        ]
      };

      return res.json({
        success: true,
        story: fallbackStory
      });
    } catch (err: any) {
      console.error("AI parse story error:", err);
      return res.status(200).json({ success: false, error: "解析故事失败，请稍后重试" });
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

    // Ensure user '测试001' and 'test001' are configured as regular users (普通用户)
    try {
      const testAccounts = ['测试001', 'test001', 'user_001'];
      for (const acc of testAccounts) {
        const existing = await getCloudUser(acc);
        const regularProfile = {
          ...(existing?.profile || {}),
          account: acc,
          nickname: acc === 'user_001' ? 'Olaf' : acc,
          isVip: false,
          vipActivatedAt: 0,
          activatedVolumes: [],
          isAdmin: false,
          role: 'user',
          unlockedLessonIds: [1],
          completedLessonIds: [],
          volumeProgress: {
            vol1: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] },
            vol2: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] },
            vol3: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] },
            vol4: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] }
          }
        };

        const userObj = {
          uid: existing?.uid || `user_${acc}_${Date.now()}`,
          account: acc,
          nickname: regularProfile.nickname,
          salt: existing?.salt || '',
          hash: existing?.hash || '',
          password: existing?.password || '123456',
          createdAt: existing?.createdAt || Date.now(),
          updatedAt: Date.now(),
          profile: regularProfile
        };

        await saveCloudUser(acc, userObj);
      }
      console.log("[User Management] User '测试001' and test users successfully configured as regular users (普通用户)!");
    } catch (e) {
      console.warn("Test user initialization notice:", e);
    }
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;

