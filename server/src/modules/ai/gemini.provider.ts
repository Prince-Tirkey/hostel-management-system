import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AIProvider, ComplaintAIResult, ComplaintSummaryResult } from "./ai.provider.js";

function getModel() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY is not configured");
  const genAI = new GoogleGenerativeAI(key);
  return genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL ?? "gemini-2.5-flash" });
}

function parseJson(text: string) {
  const cleaned = text.replace(/^```json\s*/i, "").replace(/\s*```$/i, "").trim();
  return JSON.parse(cleaned);
}

export class GeminiProvider implements AIProvider {
  async classifyComplaint(input: { title: string; description: string }): Promise<ComplaintAIResult> {
    const prompt = `Classify this hostel complaint. Return ONLY valid JSON with keys:
category (HEALTH|MAINTENANCE|ELECTRICITY|PLUMBING|CLEANLINESS|WATER|INTERNET|SECURITY|MESS|OTHER),
severity (LOW|MEDIUM|HIGH|CRITICAL), urgencyScore (0-100), priorityScore (0-100), reason (short string).
Complaint title: ${input.title}
Complaint description: ${input.description}`;
    const result = await getModel().generateContent(prompt);
    return parseJson(result.response.text()) as ComplaintAIResult;
  }

  async summarizeComplaints(input: Array<{ title: string; description: string; category: string; severity: string }>): Promise<ComplaintSummaryResult> {
    const prompt = `Analyze these hostel complaints. Return ONLY valid JSON with:
summary (short supervisor report) and hotTopics (array of objects with topic, count, severity).
Identify repeated/common issues and major risks.
Complaints: ${JSON.stringify(input)}`;
    const result = await getModel().generateContent(prompt);
    return parseJson(result.response.text()) as ComplaintSummaryResult;
  }
}
