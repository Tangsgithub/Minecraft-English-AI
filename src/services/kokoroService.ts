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

export function subscribeKokoroStatus(
  callback: (status: { loading: boolean; progress: number; ready: boolean; error: string | null }) => void
) {
  callback({
    loading: false,
    progress: 100,
    ready: true,
    error: null
  });
  return () => {};
}

export function preloadKokoroModelInBackground() {
  // Browser model preloader disabled to keep application lightweight and zero-footprint
}

export function stopKokoroAudio() {
  // Audio stopping handled globally by edgeTtsService / Web Speech API
}

export async function speakKokoroText(
  _text: string,
  _options?: { voice?: KokoroVoiceId; speed?: number; onEnd?: () => void }
): Promise<boolean> {
  // Browser model synthesis disabled - automatically fallback to online server TTS
  return false;
}

