import { Client } from "@gradio/client";

export interface ChatterboxParams {
  exaggeration?: number;
  temperature?: number;
  cfgw?: number;
  seed?: number;
  vadTrim?: boolean;
}

const DEFAULT_PARAMS: ChatterboxParams = {
  exaggeration: 0.5,
  temperature: 0.8,
  cfgw: 0.5,
  seed: 0,
  vadTrim: false,
};

const DEFAULT_CHATTERBOX_SPACE = "ResembleAI/Chatterbox";
const CHATTERBOX_ENDPOINT = "/generate_tts_audio";

function getChatterboxSpace(): string {
  return import.meta.env.VITE_CHATTERBOX_SPACE?.trim() || DEFAULT_CHATTERBOX_SPACE;
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function extractErrorText(error: unknown): string {
  if (typeof error === "string") return error;
  if (error instanceof Error && error.message) return error.message;
  if (!error || typeof error !== "object") return "";

  const record = error as Record<string, unknown>;
  return [record.title, record.message, record.original_msg]
    .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    .join(": ");
}

function isZeroGpuTimeout(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const record = error as Record<string, unknown>;
  const haystack = [record.title, record.message, record.stage, record.endpoint]
    .filter((value): value is string => typeof value === "string")
    .join(" ")
    .toLowerCase();

  return haystack.includes("zerogpu") || haystack.includes("no gpu was available");
}

export function getChatterboxErrorMessage(error: unknown): string {
  if (isZeroGpuTimeout(error)) {
    return "The public Chatterbox GPU did not become available within 60 seconds. Your voice purchase is valid, but TTS generation needs GPU capacity. Try again later or set VITE_CHATTERBOX_SPACE to your own GPU-backed Chatterbox Space.";
  }

  const message = stripHtml(extractErrorText(error));
  return message || "Chatterbox TTS failed. Please try again.";
}

async function predictChatterbox(payload: Record<string, unknown>): Promise<Blob> {
  try {
    const client = await Client.connect(getChatterboxSpace());
    const result = await client.predict(CHATTERBOX_ENDPOINT, payload);
    return audioResultToBlob(result.data);
  } catch (error) {
    throw new Error(getChatterboxErrorMessage(error));
  }
}

/**
 * Convert Gradio audio result to Blob
 */
async function audioResultToBlob(data: any): Promise<Blob> {
  const audio = Array.isArray(data) ? data[0] : data;

  if (audio instanceof Blob) return audio;

  if (typeof audio === "string") {
    const res = await fetch(audio);
    return res.blob();
  }

  // Gradio file descriptor with url property
  if (audio?.url) {
    const res = await fetch(audio.url);
    return res.blob();
  }

  // Gradio base64 data in .data field
  if (audio?.data) {
    const res = await fetch(audio.data);
    return res.blob();
  }

  throw new Error("Unexpected audio output format from Chatterbox");
}

/**
 * Generate speech using Chatterbox TTS (no voice cloning)
 */
export async function chatterboxTTS(text: string, params: ChatterboxParams = {}): Promise<Blob> {
  const p = { ...DEFAULT_PARAMS, ...params };

  return predictChatterbox({
    text_input: text,
    audio_prompt_path_input: null,
    exaggeration_input: p.exaggeration,
    temperature_input: p.temperature,
    seed_num_input: p.seed,
    cfgw_input: p.cfgw,
    vad_trim_input: p.vadTrim,
  });
}

/**
 * Generate speech using Chatterbox with voice cloning.
 * Pass the reference audio file to clone the voice style.
 */
export async function chatterboxVoiceClone(
  text: string,
  audioFile: File | Blob,
  params: ChatterboxParams = {}
): Promise<Blob> {
  const p = { ...DEFAULT_PARAMS, ...params };

  return predictChatterbox({
    text_input: text,
    audio_prompt_path_input: audioFile,
    exaggeration_input: p.exaggeration,
    temperature_input: p.temperature,
    seed_num_input: p.seed,
    cfgw_input: p.cfgw,
    vad_trim_input: p.vadTrim,
  });
}
