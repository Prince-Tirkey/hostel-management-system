import { GeminiProvider } from "./gemini.provider.js";
import type { AIProvider } from "./ai.provider.js";

const provider: AIProvider = new GeminiProvider();

export function classifyComplaint(input: { title: string; description: string }) {
  return provider.classifyComplaint(input);
}

export function summarizeComplaints(input: Array<{ title: string; description: string; category: string; severity: string }>) {
  return provider.summarizeComplaints(input);
}
