// Web Audio API Synthesizer for retro Minecraft-style sound effects
import { speakKokoroText, stopKokoroAudio, KokoroVoiceId } from '../services/kokoroService';
import { speakEdgeTtsText, stopEdgeTtsAudio, unlockMobileAudio } from '../services/edgeTtsService';

let isSoundEnabled = true;

export function toggleSoundEffects(enabled?: boolean): boolean {
  if (enabled !== undefined) {
    isSoundEnabled = enabled;
  } else {
    isSoundEnabled = !isSoundEnabled;
  }
  localStorage.setItem('mc_sound_enabled', JSON.stringify(isSoundEnabled));
  return isSoundEnabled;
}

export function getSoundEnabled(): boolean {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('mc_sound_enabled');
    if (saved !== null) {
      try {
        isSoundEnabled = JSON.parse(saved);
      } catch {
        isSoundEnabled = true;
      }
    }
  }
  return isSoundEnabled;
}

let globalAudioCtx: AudioContext | null = null;
let isAudioUnlocked = false;

export function unlockAudio() {
  if (typeof window === 'undefined') return;

  // 1. Resume Web Audio API AudioContext
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      if (!globalAudioCtx) {
        globalAudioCtx = new AudioCtx();
      }
      if (globalAudioCtx.state === 'suspended') {
        globalAudioCtx.resume().catch(() => {});
      }
    }
  } catch (e) {
    console.warn('Failed to unlock Web Audio API:', e);
  }

  // 2. Unlock Mobile/Browser HTMLAudioElement
  unlockMobileAudio();
  isAudioUnlocked = true;
}

// Automatically register gesture listeners to unlock audio on first user touch/click/keypress
if (typeof window !== 'undefined') {
  const handleUserGesture = () => {
    unlockAudio();
    window.removeEventListener('click', handleUserGesture);
    window.removeEventListener('pointerdown', handleUserGesture);
    window.removeEventListener('keydown', handleUserGesture);
    window.removeEventListener('touchstart', handleUserGesture);
  };

  window.addEventListener('click', handleUserGesture, { once: true });
  window.addEventListener('pointerdown', handleUserGesture, { once: true });
  window.addEventListener('keydown', handleUserGesture, { once: true });
  window.addEventListener('touchstart', handleUserGesture, { once: true });
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!globalAudioCtx) {
    globalAudioCtx = new AudioCtx();
  }
  if (globalAudioCtx.state === 'suspended') {
    globalAudioCtx.resume().catch(() => {});
  }
  return globalAudioCtx;
}

export function playClickSound() {
  unlockAudio();
  if (!getSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    console.error('Audio play error', e);
  }
}

export function playEmeraldSound() {
  unlockAudio();
  if (!getSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now); // B5
    osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  } catch (e) {
    console.error(e);
  }
}

export function playLevelUpSound() {
  unlockAudio();
  if (!getSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.2, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.2);
    });
  } catch (e) {
    console.error(e);
  }
}

export function playMissionCompleteSound() {
  unlockAudio();
  if (!getSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);
      gain.gain.setValueAtTime(0.12, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.25);
    });
  } catch (e) {
    console.error(e);
  }
}

export function playBlockBreakSound() {
  unlockAudio();
  if (!getSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Low crunchy noise for breaking a Minecraft block
    const bufferSize = ctx.sampleRate * 0.12;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(350, now);
    filter.frequency.exponentialRampToValueAtTime(120, now + 0.12);
    filter.Q.setValueAtTime(3, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.12);
  } catch (e) {
    console.error(e);
  }
}

export type TtsEngineType = 'edge' | 'kokoro' | 'webspeech';

let currentTtsEngine: TtsEngineType = 'edge';
let currentKokoroVoice: KokoroVoiceId = 'af_heart';
let currentEdgeVoice: string = 'en-US-AnaNeural';

export function getTtsEngine(): TtsEngineType {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('mc_tts_engine');
    if (saved === 'webspeech' || saved === 'kokoro' || saved === 'edge') {
      currentTtsEngine = saved as TtsEngineType;
    } else {
      currentTtsEngine = 'edge'; // 默认极速高品质神经网络声音
    }
  }
  return currentTtsEngine;
}

export function setTtsEngine(engine: TtsEngineType) {
  currentTtsEngine = engine;
  if (typeof window !== 'undefined') {
    localStorage.setItem('mc_tts_engine', engine);
  }
}

export function getSelectedEdgeVoice(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('mc_edge_voice');
    if (saved) {
      currentEdgeVoice = saved;
    }
  }
  return currentEdgeVoice;
}

export function setSelectedEdgeVoice(voice: string) {
  currentEdgeVoice = voice;
  if (typeof window !== 'undefined') {
    localStorage.setItem('mc_edge_voice', voice);
  }
}

export function getSelectedKokoroVoice(): KokoroVoiceId {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('mc_kokoro_voice');
    if (saved) {
      currentKokoroVoice = saved as KokoroVoiceId;
    }
  }
  return currentKokoroVoice;
}

export function setSelectedKokoroVoice(voice: KokoroVoiceId) {
  currentKokoroVoice = voice;
  if (typeof window !== 'undefined') {
    localStorage.setItem('mc_kokoro_voice', voice);
  }
}

// Web Speech API for Alex's text-to-speech
let cachedVoices: SpeechSynthesisVoice[] = [];

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const populateVoices = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
  populateVoices();
  if ('onvoiceschanged' in window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = populateVoices;
  }
}

export async function speakText(
  text: string,
  onEndOrOptions?: (() => void) | { lang?: string; rate?: number; pitch?: number },
  opts?: { lang?: string; rate?: number; pitch?: number }
) {
  if (typeof window === 'undefined') return;
  unlockAudio();

  let onEnd: (() => void) | undefined;
  let options: { lang?: string; rate?: number; pitch?: number } | undefined;

  if (typeof onEndOrOptions === 'function') {
    onEnd = onEndOrOptions;
    options = opts;
  } else if (typeof onEndOrOptions === 'object' && onEndOrOptions !== null) {
    options = onEndOrOptions;
  }

  // Clean formatted text
  let cleanText = text
    .replace(/[*#_`~]/g, '')
    .replace(/\[.*?\]/g, '') // remove bracketed notes
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .trim();

  // If we are reading English words, strip remaining Chinese characters
  const hasEnglish = /[a-zA-Z]/.test(cleanText);
  const hasChinese = /[\u4e00-\u9fa5]/.test(cleanText);

  let targetLang = options?.lang || 'en-US';
  if (targetLang.startsWith('en') && hasEnglish && hasChinese) {
    cleanText = cleanText.replace(/[\u4e00-\u9fa5]/g, '').trim();
  }

  if (!cleanText) return;

  // Stop any currently playing speech
  stopSpeech();

  const engine = getTtsEngine();

  // 1. High Quality Edge Neural Speech (Ultra natural, 100-200ms latency)
  if (engine === 'edge') {
    const edgeVoice = getSelectedEdgeVoice();
    const success = await speakEdgeTtsText(cleanText, {
      voice: edgeVoice,
      onEnd
    });
    if (success) {
      return; // Edge Neural Speech played successfully!
    }
  }

  // 2. Kokoro-82M AI Engine if explicitly selected
  if (engine === 'kokoro') {
    const voice = getSelectedKokoroVoice();
    const kokoroPromise = speakKokoroText(cleanText, {
      voice,
      speed: options?.rate || 1.0,
      onEnd
    });

    const timeoutPromise = new Promise<boolean>(res => setTimeout(() => res(false), 1200));

    const result = await Promise.race([kokoroPromise, timeoutPromise]);
    if (result) {
      return;
    }
  }

  // 3. Fallback to Web Speech API
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();

  if (cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices();
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = targetLang;
  utterance.rate = options?.rate ?? 0.95;
  utterance.pitch = options?.pitch ?? 1.0;

  if (cachedVoices.length > 0) {
    let bestVoice = cachedVoices.find(v => 
      v.lang.startsWith(targetLang.slice(0, 2)) && 
      (v.name.includes('Natural') || v.name.includes('Online') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Jenny') || v.name.includes('Zira'))
    );

    if (!bestVoice) {
      bestVoice = cachedVoices.find(v => v.lang.startsWith(targetLang.slice(0, 2)));
    }

    if (bestVoice) {
      utterance.voice = bestVoice;
    }
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeech() {
  stopEdgeTtsAudio();
  stopKokoroAudio();
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function testAudioSound() {
  unlockAudio();
  playEmeraldSound();
  setTimeout(() => {
    speakText("Welcome to Minecraft English! Sound is working perfectly.");
  }, 400);
}
