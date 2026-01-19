import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
export const runtime = "nodejs";

type OpenAIStyleMsg = {
  role: "user" | "assistant" | "system";
  content: string;
};

type GeminiStyleMsg = {
  role: "user" | "model";
  parts: { text: string }[];
};

type IncomingMsg = OpenAIStyleMsg | GeminiStyleMsg;

type GeminiPart =
  | { text: string }
  | {
      inlineData: {
        mimeType: string;
        data: string;
      };
    };

type GeminiMsg = {
  role: "user" | "model";
  parts: { text: string }[];
};

function getText(m: IncomingMsg): string {
  // OpenAI / UI style
  if ("content" in m && typeof m.content === "string") {
    return m.content.trim();
  }

  // Gemini style
  if ("parts" in m && Array.isArray(m.parts) && m.parts[0]?.text) {
    return (m.parts[0].text ?? "").trim();
  }

  return "";
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const lang = (form.get("lang")?.toString() === "en" ? "en" : "bn") as
      | "bn"
      | "en";
    const rawHistory = form.get("messages")?.toString() ?? "[]";

    let messages: IncomingMsg[] = [];
    try {
      messages = JSON.parse(rawHistory);
      if (!Array.isArray(messages)) messages = [];
    } catch {
      messages = [];
    }

    const files = form.getAll("files").filter(Boolean) as File[];
    const message = (form.get("message")?.toString() ?? "").trim();

    const hasImage = files.some((f) => f.type?.startsWith("image/"));
    if (!message && !hasImage) {
      return NextResponse.json({ error: "Empty input" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 },
      );
    }

    const systemInstruction =
      lang === "bn"
        ? "তুমি বাংলাদেশ সরকারের একটি সহায়ক তথ্য সেবা। সংক্ষিপ্ত, পরিষ্কার ও ভদ্রভাবে উত্তর দাও আর সালাম দিবা আসসালামু আলাইকুম।"
        : "You are a government information assistant. Answer clearly and politely.";

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      systemInstruction,
    });

    const history: GeminiMsg[] = messages
     .filter((m) => m.role !== "system")
      .map((m) => {
        const text = getText(m);
        const role: "user" | "model" =
          m.role === "assistant" || m.role === "model" ? "model" : "user";
        return { role, parts: [{ text }] };
      })
      .filter((h) => h.parts[0].text.length > 0);
    // history must start with user
      while (history.length && history[0].role !== "user") {
      history.shift();
    }

    const parts: GeminiPart[] = [];
    if (message) parts.push({ text: message });

    for (const f of files) {
      if (!f.type?.startsWith("image/")) continue;
      const bytes = Buffer.from(await f.arrayBuffer());
      parts.push({
        inlineData: { mimeType: f.type, data: bytes.toString("base64") },
      });
    }

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(parts);


    return NextResponse.json({ reply: result.response.text() });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json(
      { error: "AI service unavailable" },
      { status: 500 },
    );
  }
}
