export interface EdgeVoiceOption {
  id: string;
  name: string;
  gender: string;
  accent: string;
  accentType: 'US' | 'UK' | 'AU';
  description: string;
  previewSentence: string;
}

export const EDGE_VOICES: EdgeVoiceOption[] = [
  { 
    id: 'en-US-JennyNeural', 
    name: 'Jenny (美音导师 · Alex)', 
    gender: 'Female', 
    accent: '美音 (US)', 
    accentType: 'US',
    description: '标准纯正美语女声，发音抑扬顿挫，柔和亲切的外教老师音',
    previewSentence: 'Hello! I am Alex. Welcome to Minecraft English!'
  },
  { 
    id: 'en-US-AnaNeural', 
    name: 'Ana (美音童声 · 活泼助手)', 
    gender: 'Female', 
    accent: '美音童声 (US)', 
    accentType: 'US',
    description: '活泼清脆的小玩家童声音色，极具代入感与探险趣味',
    previewSentence: 'Let us build a craft table together and explore the cave!'
  },
  { 
    id: 'en-US-GuyNeural', 
    name: 'Guy (美音男声 · Steve)', 
    gender: 'Male', 
    accent: '美音 (US)', 
    accentType: 'US',
    description: '清晰从容、阳光自信的标准美语男声，经典史蒂夫探险家音色',
    previewSentence: 'Watch out! There are creepers near the dark oak forest!'
  },
  { 
    id: 'en-GB-SoniaNeural', 
    name: 'Sonia (英音优雅 · 牛津音)', 
    gender: 'Female', 
    accent: '英音 (UK)', 
    accentType: 'UK',
    description: '标准优雅英伦女声，经典 RP 牛津发音，清晰高雅自然',
    previewSentence: 'Good afternoon. Excuse me, is this your handbag?'
  },
  { 
    id: 'en-GB-RyanNeural', 
    name: 'Ryan (英音绅士 · BBC男声)', 
    gender: 'Male', 
    accent: '英音 (UK)', 
    accentType: 'UK',
    description: '沉稳绅士的伦敦男声，典雅纯正的英式英语发音',
    previewSentence: 'Pardon me, sir. Could you please show me your passport?'
  },
  { 
    id: 'en-AU-NatashaNeural', 
    name: 'Natasha (澳音阳光 · 澳洲原声)', 
    gender: 'Female', 
    accent: '澳音 (AU)', 
    accentType: 'AU',
    description: '自然阳光的澳大利亚原声英语，开阔清亮',
    previewSentence: 'Good day mate! Have a wonderful adventure in the outback!'
  }
];

// Reusable shared audio element for preserving browser autoplay gesture permission
let sharedAudioElement: HTMLAudioElement | null = null;
let isMobileAudioUnlocked = false;

// Currently playing audio URL object for cleanup
let activeAudioObjectUrl: string | null = null;

function getSharedAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  if (!sharedAudioElement) {
    sharedAudioElement = new Audio();
    sharedAudioElement.setAttribute('playsinline', 'true');
    sharedAudioElement.setAttribute('webkit-playsinline', 'true');
  }
  return sharedAudioElement;
}

/**
 * Mobile Audio Unlocker: Call on user touchstart/click to bypass iOS/Android/Chrome autoplay restrictions
 */
export function unlockMobileAudio() {
  if (typeof window === 'undefined') return;

  const audio = getSharedAudio();
  if (!audio) return;

  if (!isMobileAudioUnlocked) {
    // Play short silent sound on the shared audio element to unlock browser media session
    audio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAARKwAAESsAAAABAAgAZGF0YQAAAAA=';
    audio.play()
      .then(() => {
        isMobileAudioUnlocked = true;
      })
      .catch((err) => {
        console.log('Mobile audio unlock gesture listener active:', err);
      });
  }
}

// In-memory audio cache for zero-latency replay of repeated words/sentences
const audioCache = new Map<string, ArrayBuffer>();

// Active Web Audio API source node for precise pitch modulation & stopping
let activeAudioSource: AudioBufferSourceNode | null = null;
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function stopEdgeTtsAudio() {
  if (activeAudioSource) {
    try {
      activeAudioSource.onended = null;
      activeAudioSource.stop();
      activeAudioSource.disconnect();
    } catch {}
    activeAudioSource = null;
  }
  if (sharedAudioElement) {
    try {
      sharedAudioElement.onended = null;
      sharedAudioElement.onerror = null;
      sharedAudioElement.pause();
      sharedAudioElement.currentTime = 0;
    } catch {}
  }
  if (activeAudioObjectUrl) {
    try {
      URL.revokeObjectURL(activeAudioObjectUrl);
    } catch {}
    activeAudioObjectUrl = null;
  }
}

/**
 * Synthesize and play natural speech via Edge Neural TTS server endpoint
 */
export async function speakEdgeTtsText(
  text: string,
  options?: { voice?: string; rate?: string; onEnd?: () => void }
): Promise<boolean> {
  stopEdgeTtsAudio();

  const voice = options?.voice || 'en-US-AnaNeural';
  const rate = options?.rate || '+0%';

  const cacheKey = `${voice}:${rate}:${text.trim()}`;

  try {
    let arrayBuffer = audioCache.get(cacheKey);

    if (!arrayBuffer) {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text,
          voice,
          rate
        })
      });

      if (!response.ok) {
        throw new Error(`TTS server responded status ${response.status}`);
      }

      arrayBuffer = await response.arrayBuffer();
      // Cache up to 100 recent audio clips in client memory
      if (audioCache.size > 100) {
        const firstKey = audioCache.keys().next().value;
        if (firstKey) audioCache.delete(firstKey);
      }
      audioCache.set(cacheKey, arrayBuffer);
    }

    // Try Web Audio API decoding first for zero-latency, crisp neural voice playback
    const ctx = getAudioContext();
    if (ctx) {
      try {
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer.slice(0));
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.playbackRate.value = 1.0;

        return new Promise((resolve) => {
          let isDone = false;
          const finish = (success: boolean) => {
            if (isDone) return;
            isDone = true;
            activeAudioSource = null;
            if (options?.onEnd) options.onEnd();
            resolve(success);
          };

          source.onended = () => finish(true);
          source.connect(ctx.destination);
          activeAudioSource = source;
          source.start(0);
        });
      } catch (decodeErr) {
        console.warn('Web Audio API decode failed, falling back to HTML5 Audio:', decodeErr);
      }
    }

    // Fallback: HTML5 Audio element
    const audio = getSharedAudio();
    if (!audio) return false;

    if (!isMobileAudioUnlocked) {
      unlockMobileAudio();
    }

    const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
    if (activeAudioObjectUrl) {
      try { URL.revokeObjectURL(activeAudioObjectUrl); } catch {}
    }
    const audioUrl = URL.createObjectURL(blob);
    activeAudioObjectUrl = audioUrl;

    audio.onended = null;
    audio.onerror = null;
    audio.src = audioUrl;
    audio.volume = 1.0;
    audio.playbackRate = 1.0;

    return new Promise((resolve) => {
      let isDone = false;

      const finish = (success: boolean) => {
        if (isDone) return;
        isDone = true;
        try {
          audio.onended = null;
          audio.onerror = null;
        } catch {}
        if (options?.onEnd) options.onEnd();
        resolve(success);
      };

      audio.onended = () => finish(true);
      audio.onerror = (e) => {
        console.warn('Edge TTS play error:', e);
        finish(false);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {})
          .catch(err => {
            console.warn('Audio play prevented on browser:', err);
            finish(false);
          });
      }
    });
  } catch (err) {
    console.error('Edge TTS service error:', err);
    return false;
  }
}
