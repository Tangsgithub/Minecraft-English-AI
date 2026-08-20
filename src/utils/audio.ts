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
  triggerHapticFeedback('light');
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

export type HapticPattern = 'light' | 'medium' | 'heavy' | 'success' | 'loot';

export function triggerHapticFeedback(pattern: HapticPattern = 'light') {
  if (typeof window === 'undefined' || !('vibrate' in navigator)) return;
  try {
    switch (pattern) {
      case 'light':
        navigator.vibrate?.(10);
        break;
      case 'medium':
        navigator.vibrate?.(25);
        break;
      case 'heavy':
        navigator.vibrate?.([30, 30, 30]);
        break;
      case 'success':
        navigator.vibrate?.([15, 35, 25, 45]);
        break;
      case 'loot':
        navigator.vibrate?.([20, 40, 30, 60]);
        break;
    }
  } catch {
    // Ignore unsupported or rejected vibrate requests
  }
}

export function playEmeraldSound() {
  unlockAudio();
  triggerHapticFeedback('loot');
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
  triggerHapticFeedback('success');
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
  triggerHapticFeedback('success');
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

export function playAnvilSound() {
  unlockAudio();
  if (!getSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
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
    if (saved === 'webspeech' || saved === 'edge') {
      currentTtsEngine = saved as TtsEngineType;
    } else {
      currentTtsEngine = 'edge'; // 默认极速高品质神经网络声音 (服务器端)
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

export interface SpeakOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  voice?: string;
  speaker?: string;
  gender?: 'male' | 'female';
}

export function resolveVoiceForSpeaker(speaker?: string, gender?: 'male' | 'female', explicitVoice?: string): string {
  if (explicitVoice) return explicitVoice;

  const currentVoice = getSelectedEdgeVoice();
  const voiceLower = (currentVoice || '').toLowerCase();
  const isBritish = voiceLower.includes('gb') || voiceLower.includes('uk') || voiceLower.includes('sonia') || voiceLower.includes('ryan');
  const isAustralian = voiceLower.includes('au') || voiceLower.includes('natasha');

  if (speaker) {
    const s = speaker.toLowerCase().trim();

    // Child character voices (Ana, etc.)
    const isChild = s.includes('ana') || s.includes('kid') || s.includes('child') || s.includes('peter') || s.includes('ruby');
    if (isChild) {
      if (isBritish) return 'en-GB-SoniaNeural';
      if (isAustralian) return 'en-AU-NatashaNeural';
      return 'en-US-AnaNeural';
    }

    // Male character voices (Steve, Dave, Tom, Mr., etc.)
    const isMale = 
      s.includes('steve') ||
      s.includes('dave') ||
      s.includes('tom') ||
      s.includes('hans') ||
      s.includes('sam') ||
      s.includes('paul') ||
      s.includes('robert') ||
      s.includes('george') ||
      s.includes('john') ||
      s.includes('jack') ||
      s.includes('mr.') ||
      s.includes('mr ') ||
      s.includes('sir') ||
      s.includes('father') ||
      s.includes('dad') ||
      s.includes('boy') ||
      s.includes('brother') ||
      s.includes('uncle') ||
      s.includes('man') ||
      s.includes('blacksmith') ||
      s.includes('villager') ||
      s.includes('golem');

    if (isMale) {
      if (isBritish) return 'en-GB-RyanNeural';
      if (isAustralian) return 'en-AU-NatashaNeural';
      return 'en-US-GuyNeural';
    }

    // Female character voices (Alex, Karen, Mrs., etc.)
    const isFemale = 
      s.includes('alex') ||
      s.includes('karen') ||
      s.includes('penny') ||
      s.includes('mary') ||
      s.includes('jane') ||
      s.includes('stella') ||
      s.includes('linda') ||
      s.includes('sarah') ||
      s.includes('mrs.') ||
      s.includes('mrs ') ||
      s.includes('ms.') ||
      s.includes('ms ') ||
      s.includes('lady') ||
      s.includes('mother') ||
      s.includes('mom') ||
      s.includes('girl') ||
      s.includes('sister') ||
      s.includes('witch') ||
      s.includes('queen') ||
      s.includes('teacher');

    if (isFemale) {
      if (isBritish) return 'en-GB-SoniaNeural';
      if (isAustralian) return 'en-AU-NatashaNeural';
      return 'en-US-JennyNeural';
    }
  }

  if (gender === 'male') {
    if (isBritish) return 'en-GB-RyanNeural';
    if (isAustralian) return 'en-AU-NatashaNeural';
    return 'en-US-GuyNeural';
  }
  
  if (gender === 'female') {
    if (isBritish) return 'en-GB-SoniaNeural';
    if (isAustralian) return 'en-AU-NatashaNeural';
    return 'en-US-JennyNeural';
  }

  return currentVoice || 'en-US-JennyNeural';
}

export async function speakText(
  text: string,
  onEndOrOptions?: (() => void) | SpeakOptions,
  opts?: SpeakOptions
) {
  if (typeof window === 'undefined') return;
  unlockAudio();

  let onEnd: (() => void) | undefined;
  let options: SpeakOptions | undefined;

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
    .replace(/（.*?[\u4e00-\u9fa5].*?）/g, '') // remove full-width parenthesized Chinese
    .replace(/\(.*?\u4e00-\u9fa5.*?\)/g, '') // remove half-width parenthesized Chinese
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .trim();

  // Standardize curly/fancy apostrophes to standard straight single quote '
  cleanText = cleanText
    .replace(/[‘’′`]/g, "'")
    .replace(/[“”″]/g, '"');

  // If we are reading English words, strip remaining Chinese characters and Chinese-only punctuation, keeping English punctuation intact
  const hasEnglish = /[a-zA-Z]/.test(cleanText);
  const hasChinese = /[\u4e00-\u9fa5]/.test(cleanText);

  let targetLang = options?.lang || 'en-US';
  if (targetLang.startsWith('en') && hasEnglish && hasChinese) {
    cleanText = cleanText.replace(/[\u4e00-\u9fa5]/g, '').trim();
    // Remove Chinese-specific punctuation, keep English .,!?'"
    cleanText = cleanText.replace(/[，。！？：；【】《》、（）]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  if (!cleanText) return;

  // Stop any currently playing speech
  stopSpeech();

  const engine = getTtsEngine();

  // 1. High Quality Edge Neural Speech (Ultra natural, 100-200ms latency)
  if (engine === 'edge') {
    const edgeVoice = resolveVoiceForSpeaker(options?.speaker, options?.gender, options?.voice);
    // Convert numeric rate (e.g. 0.85 -> -15%, 1.0 -> +0%)
    let rateParam = '+0%';
    if (options?.rate !== undefined && options?.rate !== 1.0) {
      const diffPercent = Math.round((options.rate - 1.0) * 100);
      rateParam = diffPercent >= 0 ? `+${diffPercent}%` : `${diffPercent}%`;
    }
    const success = await speakEdgeTtsText(cleanText, {
      voice: edgeVoice,
      rate: rateParam,
      onEnd
    });
    if (success) {
      return true; // Edge Neural Speech played successfully!
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
      return true;
    }
  }

  // 3. Fallback to Web Speech API
  if (!('speechSynthesis' in window)) return false;

  window.speechSynthesis.cancel();

  if (cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices();
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = targetLang;
  utterance.rate = options?.rate ?? 0.95;
  utterance.pitch = options?.pitch ?? 1.0;

  if (cachedVoices.length > 0) {
    const isMale = (options?.speaker && resolveVoiceForSpeaker(options.speaker, options.gender).includes('Guy')) || options?.gender === 'male';
    const isFemale = (options?.speaker && resolveVoiceForSpeaker(options.speaker, options.gender).includes('Jenny')) || options?.gender === 'female';

    let bestVoice = cachedVoices.find(v => {
      const matchLang = v.lang.startsWith(targetLang.slice(0, 2));
      const name = v.name.toLowerCase();
      if (!matchLang) return false;
      if (isMale) return name.includes('david') || name.includes('guy') || name.includes('mark') || name.includes('george') || name.includes('male');
      if (isFemale) return name.includes('zira') || name.includes('jenny') || name.includes('samantha') || name.includes('victoria') || name.includes('female');
      return name.includes('natural') || name.includes('online') || name.includes('google');
    });

    if (!bestVoice) {
      bestVoice = cachedVoices.find(v => v.lang.startsWith(targetLang.slice(0, 2)));
    }

    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    if (isMale) {
      utterance.pitch = options?.pitch ?? 0.88;
    } else if (isFemale) {
      utterance.pitch = options?.pitch ?? 1.12;
    }
  }

  return new Promise<boolean>((resolve) => {
    let finished = false;
    const finish = (res: boolean) => {
      if (finished) return;
      finished = true;
      if (onEnd) onEnd();
      resolve(res);
    };

    utterance.onend = () => finish(true);
    utterance.onerror = () => finish(false);

    // Fallback safety timeout for Web Speech API
    const estimateMs = Math.max(2500, (cleanText.length / 8) * 1000);
    setTimeout(() => {
      if (!finished) finish(true);
    }, estimateMs + 2000);

    window.speechSynthesis.speak(utterance);
  });
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
