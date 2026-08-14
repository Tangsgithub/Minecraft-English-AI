import { ApiKeyConfig, ChatMessage } from '../types';

export interface ChatApiRequest {
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
  systemPrompt: string;
  config: ApiKeyConfig;
}

export interface ChatApiResponse {
  text: string;
  grammarCorrection?: string;
  betterExpression?: string;
  encouragement?: string;
  error?: string;
}

async function sendDirectChatMessage(
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
  systemPrompt: string,
  config: ApiKeyConfig
): Promise<ChatApiResponse> {
  const baseUrl = (config.baseUrl || 'https://api.deepseek.com').replace(/\/+$/, '');
  const endpoint = `${baseUrl}/v1/chat/completions`;
  const model = config.model || 'deepseek-chat';

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey.trim()}`
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 800
    })
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`直连 API 错误 (${res.status}): ${errText || res.statusText}`);
  }

  const data = await res.json();
  const replyText = data.choices?.[0]?.message?.content || "Alex: Great English practice!";
  return { text: replyText };
}

export async function sendChatMessageToAlex(
  messages: ChatMessage[],
  systemPrompt: string,
  config: ApiKeyConfig
): Promise<ChatApiResponse> {
  const formattedMessages = messages.map(m => ({
    role: (m.sender === 'alex' ? 'assistant' : m.sender) as 'user' | 'assistant' | 'system',
    content: m.text
  }));

  // Direct Client-Side Request (No server proxy needed, 100% privacy direct to provider)
  if (config.requestMode === 'direct' && config.apiKey && config.provider === 'deepseek') {
    try {
      return await sendDirectChatMessage(formattedMessages, systemPrompt, config);
    } catch (directError) {
      console.warn('Direct client request failed, falling back to server proxy mode:', directError);
    }
  }

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: formattedMessages,
        systemPrompt,
        config
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP error ${response.status}`);
    }

    const data = await response.json();
    return {
      text: data.text || 'Awesome try in Minecraft!',
      grammarCorrection: data.grammarCorrection,
      betterExpression: data.betterExpression,
      encouragement: data.encouragement
    };
  } catch (error: any) {
    console.warn('AI Chat API fallback activated:', error);
    // Offline / Fallback Alex response generator so learning is uninterrupted
    const lastUserMsg = messages[messages.length - 1]?.text || '';
    return generateLocalAlexFallback(lastUserMsg);
  }
}

export async function testApiKeyConnection(config: ApiKeyConfig): Promise<{ success: boolean; message: string; latencyMs?: number }> {
  const startTime = Date.now();

  // Test Direct Client Connection
  if (config.requestMode === 'direct' && config.apiKey && config.provider === 'deepseek') {
    try {
      const baseUrl = (config.baseUrl || 'https://api.deepseek.com').replace(/\/+$/, '');
      const endpoint = `${baseUrl}/v1/chat/completions`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey.trim()}`
        },
        body: JSON.stringify({
          model: config.model || 'deepseek-chat',
          messages: [{ role: 'user', content: 'Hi' }],
          max_tokens: 5
        })
      });
      const latencyMs = Date.now() - startTime;
      if (res.ok) {
        return { success: true, message: `浏览器直连成功！(延迟: ${latencyMs}ms)`, latencyMs };
      }
      const errText = await res.text().catch(() => '');
      return { success: false, message: `直连失败 (${res.status}): ${errText || res.statusText}` };
    } catch (err: any) {
      console.warn('Direct test failed, testing via proxy:', err);
    }
  }

  // Fallback / Proxy Test
  try {
    const response = await fetch('/api/test-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ config })
    });
    const latencyMs = Date.now() - startTime;
    const data = await response.json();
    return {
      ...data,
      message: data.success ? `${data.message} (${latencyMs}ms)` : data.message,
      latencyMs
    };
  } catch (err: any) {
    return { success: false, message: err.message || '网络连接失败，请检查网络或密钥配置' };
  }
}

function generateLocalAlexFallback(userMessage: string): ChatApiResponse {
  const msgLower = userMessage.toLowerCase();
  
  if (msgLower.includes('hello') || msgLower.includes('hi') || msgLower.includes('hey')) {
    return {
      text: "Hello there, adventurer! 🌲 Welcome to our Minecraft English village! What are you building today? [你好，探险家！欢迎来到我们的 Minecraft 英语村庄！你今天在建造什么呢？]",
      encouragement: "Great greeting! 💎 +5 Emeralds"
    };
  } else if (msgLower.includes('gift') || msgLower.includes('for you') || msgLower.includes('here is') || msgLower.includes('sword') || msgLower.includes('apple') || msgLower.includes('sandwich') || msgLower.includes('diamond') || msgLower.includes('wood')) {
    return {
      text: "Wow! Thank you so much for this wonderful gift! You are such a generous and brave adventurer! [哇！非常感谢你的精彩礼物！你真是一位大方又勇敢的探险家！]",
      betterExpression: "Here is a special gift for you!",
      encouragement: "Kind companion! 💎 +10 Emeralds"
    };
  } else if (msgLower.includes('teacher') || msgLower.includes('are you') || msgLower.includes('who')) {
    return {
      text: "I am Alex, your Minecraft village English teacher! Are you ready for today's exciting mission? [我是 Alex，你的 Minecraft 村庄英语老师！你准备好迎接今天的精彩任务了吗？]",
      encouragement: "Excellent question! 💎 +5 Emeralds"
    };
  } else if (msgLower.includes('house') || msgLower.includes('build') || msgLower.includes('shelter')) {
    return {
      text: "That sounds awesome! I love building houses with oak wood and cobblestone. What blocks are you using? [听起来太棒了！我喜欢用橡木和原石盖房子。你正在用什么方块呢？]",
      betterExpression: "I want to build a wooden house.",
      encouragement: "Master Builder! 🟩 +10 XP"
    };
  } else if (msgLower.includes('mine') || msgLower.includes('pickaxe') || msgLower.includes('iron') || msgLower.includes('gold') || msgLower.includes('cave')) {
    return {
      text: "Let's go deep into the cave and mine some shiny ores! Don't forget your torches and iron pickaxe! [让我们深入洞穴去挖些闪亮的矿石吧！别忘了带上火把和铁镐！]",
      betterExpression: "Let's go mining in the deep cave!",
      encouragement: "Brave Miner! ⛏️ +10 XP"
    };
  } else if (msgLower.includes('creeper') || msgLower.includes('zombie') || msgLower.includes('monster') || msgLower.includes('fight') || msgLower.includes('watch out')) {
    return {
      text: "Watch out for the green creeper! Draw your diamond sword and shield! Sssss... boom! [小心那只绿色的苦力怕！拔出你的钻石剑和盾牌！嘶嘶……轰！]",
      betterExpression: "Watch out! A dangerous creeper is nearby!",
      encouragement: "Hero of the Village! ⚔️ +15 XP"
    };
  } else if (msgLower.includes('book') || msgLower.includes('lesson') || msgLower.includes('learn') || msgLower.includes('english')) {
    return {
      text: "You are doing fantastic in New Concept English! Every sentence brings you closer to becoming a Minecraft English Master! [你的新概念英语学得棒极了！每一句话都在让你成为 Minecraft 英语大师！]",
      betterExpression: "I am practicing New Concept English.",
      encouragement: "Star Scholar! 📚 +10 Emeralds"
    };
  } else {
    return {
      text: `Wonderful practice! You said: "${userMessage}". Let us keep exploring the Minecraft world together! What shall we do next? [太棒的尝试！让我们继续一起探索 Minecraft 世界吧！接下来我们要做什么？]`,
      encouragement: "Keep practicing! 💎 +5 Emeralds"
    };
  }
}
