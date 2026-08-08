export interface EdgeVoiceOption {
  id: string;
  name: string;
  gender: string;
  accent: string;
  description: string;
}

export const EDGE_VOICES: EdgeVoiceOption[] = [
  { id: 'en-US-AnaNeural', name: 'Ana (美音女童/小玩家)', gender: 'Female', accent: '美音 (US)', description: '活泼亲切的 Minecraft 小助手音色，极具感染力' },
  { id: 'en-US-JennyNeural', name: 'Jenny (美音导师)', gender: 'Female', accent: '美音 (US)', description: '发音极具抑扬顿挫，标准柔和的外教老师音' },
  { id: 'en-US-GuyNeural', name: 'Guy (美音男声)', gender: 'Male', accent: '美音 (US)', description: '清晰从容，标准阳光美音男声' },
  { id: 'en-GB-SoniaNeural', name: 'Sonia (优雅英音)', gender: 'Female', accent: '英音 (UK)', description: '标准优雅英音，发音精准自然' },
  { id: 'en-US-AriaNeural', name: 'Aria (情感美音)', gender: 'Female', accent: '美音 (US)', description: '自然丰富的情感表达，极具对话真实感' }
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

export function stopEdgeTtsAudio() {
  if (sharedAudioElement) {
    try {
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

  const audio = getSharedAudio();
  if (!audio) return false;

  // Prime the shared audio element immediately during user gesture
  if (!isMobileAudioUnlocked) {
    unlockMobileAudio();
  }

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

    const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
    if (activeAudioObjectUrl) {
      try { URL.revokeObjectURL(activeAudioObjectUrl); } catch {}
    }
    const audioUrl = URL.createObjectURL(blob);
    activeAudioObjectUrl = audioUrl;

    audio.src = audioUrl;
    audio.volume = 1.0;

    return new Promise((resolve) => {
      let isDone = false;

      const finish = (success: boolean) => {
        if (isDone) return;
        isDone = true;
        if (options?.onEnd) options.onEnd();
        resolve(success);
      };

      audio.onended = () => finish(true);
      audio.onerror = (e) => {
        console.warn('Edge TTS play error, fallbacking:', e);
        finish(false);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Audio successfully started
          })
          .catch(err => {
            console.warn('Audio play prevented on browser:', err);
            finish(false);
          });
      } else {
        // Synchronous start
      }
    });
  } catch (err) {
    console.error('Edge TTS service error:', err);
    return false;
  }
}
