import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY is missing. Check your .env.local file.");
}

const genAI = new GoogleGenerativeAI(apiKey ?? "");

export interface LeadAnalysis {
  category: string;
  urgency: "low" | "medium" | "high";
  summary: string;
  draft: string;
}

const FALLBACK: LeadAnalysis = {
  category: "uncategorized",
  urgency: "medium",
  summary: "AI analysis unavailable — review manually.",
  draft: "",
};

export async function analyzeLead(
  name: string,
  message: string
): Promise<LeadAnalysis> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are helping a small AI automation agency called Kravex AI triage inbound contact form messages.

A person named "${name}" submitted this message:
"""
${message}
"""

Respond with ONLY valid JSON, no markdown formatting, no code fences, matching exactly this shape:
{
  "category": "one short label, e.g. 'real estate automation', 'general inquiry', 'pricing question', 'partnership'",
  "urgency": "low" | "medium" | "high",
  "summary": "one sentence summarizing what they need",
  "draft": "a short, warm, professional 2-3 sentence reply draft, ready to send, in Kravex AI's voice"
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    const cleaned = text.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
    const parsed = JSON.parse(cleaned);

    return {
      category: parsed.category ?? FALLBACK.category,
      urgency: ["low", "medium", "high"].includes(parsed.urgency)
        ? parsed.urgency
        : FALLBACK.urgency,
      summary: parsed.summary ?? FALLBACK.summary,
      draft: parsed.draft ?? FALLBACK.draft,
    };
  } catch (err) {
    console.error("Gemini analysis error:", err);
    return FALLBACK;
  }
}