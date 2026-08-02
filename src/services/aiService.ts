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

export async function sendChatMessageToAlex(
  messages: ChatMessage[],
  systemPrompt: string,
  config: ApiKeyConfig
): Promise<ChatApiResponse> {
  const formattedMessages = messages.map(m => ({
    role: (m.sender === 'alex' ? 'assistant' : m.sender) as 'user' | 'assistant' | 'system',
    content: m.text
  }));

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

export async function testApiKeyConnection(config: ApiKeyConfig): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/test-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ config })
    });
    const data = await response.json();
    return data;
  } catch (err: any) {
    return { success: false, message: err.message || 'Network connection failed' };
  }
}

function generateLocalAlexFallback(userMessage: string): ChatApiResponse {
  const msgLower = userMessage.toLowerCase();
  
  if (msgLower.includes('hello') || msgLower.includes('hi')) {
    return {
      text: "Hello there, young adventurer! 🌲 Welcome to our Minecraft English village! What are you building today? [你好，年轻的探险家！欢迎来到我们的 Minecraft 英语村庄！你今天在建造什么呢？]",
      encouragement: "Great greeting! 💎 +5 Emeralds"
    };
  } else if (msgLower.includes('teacher') || msgLower.includes('are you')) {
    return {
      text: "Yes, I am Alex! I am your Minecraft village English teacher. Are you ready for our English mission? [是的，我是 Alex！我是你的 Minecraft 村庄英语老师。你准备好参加我们的英语任务了吗？]",
      encouragement: "Excellent question! 💎 +5 Emeralds"
    };
  } else if (msgLower.includes('house') || msgLower.includes('build')) {
    return {
      text: "That sounds awesome! I love building block houses with oak wood and bricks. Can you say: 'I like building a wooden house'? [听起来太棒了！我喜欢用橡木和红砖盖方块房子。你能试着说：'I like building a wooden house' 吗？]",
      betterExpression: "I like building a wooden house.",
      encouragement: "Great Builder spirit! 🟩 +10 XP"
    };
  } else {
    return {
      text: `Wonderful effort! You said: "${userMessage}". Let us keep exploring the Minecraft world together! What block would you like to craft next? [太棒的尝试！让我们继续一起探索 Minecraft 世界吧！接下来你想合成什么方块？]`,
      encouragement: "Keep practicing! 💎 +5 Emeralds"
    };
  }
}
