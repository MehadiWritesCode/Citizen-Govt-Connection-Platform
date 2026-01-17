import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

type OpenAIStyleMsg = {
  role: "user" | "assistant" | "system";
  content: string;
};

type GeminiStyleMsg = {
  role: "user" | "model";
  parts: { text: string }[];
};

type IncomingMsg = OpenAIStyleMsg | GeminiStyleMsg;

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
    const body = (await req.json()) as { messages?: IncomingMsg[]; lang?: "bn" | "en" };

    const messages: IncomingMsg[] = Array.isArray(body.messages) ? body.messages : [];
    const lang: "bn" | "en" = body.lang ?? "bn";

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
    }

    if (messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const systemInstruction =
      lang === "bn"
        ? "তুমি বাংলাদেশ সরকারের একটি সহায়ক তথ্য সেবা। সংক্ষিপ্ত, পরিষ্কার ও ভদ্রভাবে উত্তর দাও।"
        : "You are a government information assistant. Answer clearly and politely.";

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction,
    });

    // Find last non-empty text message (safer than just taking last element)
    let lastText = "";
    for (let i = messages.length - 1; i >= 0; i--) {
      const t = getText(messages[i]);
      if (t) {
        lastText = t;
        break;
      }
    }

    if (!lastText) {
      return NextResponse.json({ error: "Last message is empty" }, { status: 400 });
    }

    // Build history: everything before the last non-empty message
    const lastIndex = messages.map(getText).lastIndexOf(lastText);

    const history: GeminiMsg[] = messages
      .slice(0, lastIndex)
      .map((m) => {
        const text = getText(m);
        const role: "user" | "model" =
          m.role === "assistant" || m.role === "model" ? "model" : "user";

        return { role, parts: [{ text }] };
      })
      .filter((h) => h.parts[0].text.length > 0);

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastText);

    return NextResponse.json({ reply: result.response.text() });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json({ error: "AI service unavailable" }, { status: 500 });
  }
}
