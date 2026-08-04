import { KokoroTTS } from 'kokoro-js';

export type KokoroVoiceId =
  | 'af_heart'
  | 'am_michael'
  | 'af_bella'
  | 'af_nicole'
  | 'am_adam'
  | 'bf_emma'
  | 'bm_george';

export interface KokoroVoiceOption {
  id: KokoroVoiceId;
  name: string;
  gender: string;
  accent: string;
  description: string;
}

export const KOKORO_VOICES: KokoroVoiceOption[] = [
  { id: 'af_heart', name: 'Heart', gender: 'Female', accent: '美音 (US)', description: '温和自然，极具亲和力' },
  { id: 'am_michael', name: 'Michael', gender: 'Male', accent: '美音 (US)', description: '清晰从容，标准男声' },
  { id: 'af_bella', name: 'Bella', gender: 'Female', accent: '美音 (US)', description: '生动活泼，节奏明快' },
  { id: 'bf_emma', name: 'Emma', gender: 'Female', accent: '英音 (UK)', description: '优雅英音，发音精准' },
  { id: 'bm_george', name: 'George', gender: 'Male', accent: '英音 (UK)', description: '沉稳庄重，经典英音' }
];

let kokoroInstance: KokoroTTS | null = null;
let isLoadingKokoro = false;
let kokoroLoadProgress = 0;
let currentPlayingSource: AudioBufferSourceNode | null = null;
let currentAudioContext: AudioContext | null = null;

// Callbacks for UI state
let loadStatusSubscribers: ((status: { loading: boolean; progress: number; ready: boolean; error: string | null }) => void)[] = [];

export function subscribeKokoroStatus(
  callback: (status: { loading: boolean; progress: number; ready: boolean; error: string | null }) => void
) {
  loadStatusSubscribers.push(callback);
  // Send initial state
  callback({
    loading: isLoadingKokoro,
    progress: kokoroLoadProgress,
    ready: !!kokoroInstance,
    error: null
  });
  return () => {
    loadStatusSubscribers = loadStatusSubscribers.filter(cb => cb !== callback);
  };
}

function notifySubscribers(error: string | null = null) {
  loadStatusSubscribers.forEach(cb =>
    cb({
      loading: isLoadingKokoro,
      progress: kokoroLoadProgress,
      ready: !!kokoroInstance,
      error
    })
  );
}

/**
 * Lazy loading of Kokoro-82M model via kokoro-js (ONNX Runtime Web) with timeout and error protection
 */
export async function getKokoroInstance(): Promise<KokoroTTS | null> {
  if (kokoroInstance) return kokoroInstance;

  // If already loading, wait up to 5s for it to finish rather than returning null immediately
  if (isLoadingKokoro) {
    let checkCount = 0;
    while (isLoadingKokoro && checkCount < 20) {
      await new Promise(r => setTimeout(r, 250));
      checkCount++;
      if (kokoroInstance) return kokoroInstance;
    }
    if (!isLoadingKokoro && kokoroInstance) return kokoroInstance;
    return null;
  }

  isLoadingKokoro = true;
  kokoroLoadProgress = 15;
  notifySubscribers();

  try {
    const modelId = 'onnx-community/Kokoro-82M-ONNX';

    // Timeout promise (10 seconds max for ONNX model initialization)
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Kokoro ONNX 82M 加载超时（网络或浏览器极速智能降级）')), 10000);
    });
    
    // Load model using kokoro-js with q8 quantized format
    const loadPromise = KokoroTTS.from_pretrained(modelId, {
      dtype: 'q8',
      device: 'wasm',
      progress_callback: (progressInfo: any) => {
        if (progressInfo && typeof progressInfo.progress === 'number') {
          kokoroLoadProgress = Math.min(99, Math.round(progressInfo.progress * 100));
          notifySubscribers();
        }
      }
    });

    const tts = await Promise.race([loadPromise, timeoutPromise]);

    kokoroInstance = tts;
    isLoadingKokoro = false;
    kokoroLoadProgress = 100;
    notifySubscribers();
    return tts;
  } catch (err: any) {
    console.warn('Kokoro-82M direct model load info:', err?.message || err);
    isLoadingKokoro = false;
    notifySubscribers(err?.message || '已自动智能切至高品质标准引擎');
    return null;
  }
}

/**
 * Stop any currently playing audio
 */
export function stopKokoroAudio() {
  if (currentPlayingSource) {
    try {
      currentPlayingSource.stop();
      currentPlayingSource.disconnect();
    } catch {}
    currentPlayingSource = null;
  }
}

/**
 * Generate and speak audio using Kokoro-82M
 */
export async function speakKokoroText(
  text: string,
  options?: { voice?: KokoroVoiceId; speed?: number; onEnd?: () => void }
): Promise<boolean> {
  stopKokoroAudio();

  const voice = options?.voice || 'af_heart';
  const speed = options?.speed || 1.0;

  try {
    const tts = await getKokoroInstance();
    if (!tts) {
      return false; // Fallback to WebSpeech
    }

    const rawAudio = await tts.generate(text, {
      voice: voice as any,
      speed
    });

    if (!rawAudio || !rawAudio.audio) {
      return false;
    }

    // Play using Web Audio API
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return false;

    if (!currentAudioContext || currentAudioContext.state === 'closed') {
      currentAudioContext = new AudioCtx({ sampleRate: rawAudio.sampling_rate });
    }

    if (currentAudioContext.state === 'suspended') {
      await currentAudioContext.resume();
    }

    const buffer = currentAudioContext.createBuffer(
      1,
      rawAudio.audio.length,
      rawAudio.sampling_rate
    );
    buffer.getChannelData(0).set(rawAudio.audio);

    const source = currentAudioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(currentAudioContext.destination);

    if (options?.onEnd) {
      source.onended = () => {
        currentPlayingSource = null;
        options.onEnd!();
      };
    }

    currentPlayingSource = source;
    source.start(0);
    return true;
  } catch (e) {
    console.error('Kokoro synthesis error, falling back:', e);
    return false;
  }
}
