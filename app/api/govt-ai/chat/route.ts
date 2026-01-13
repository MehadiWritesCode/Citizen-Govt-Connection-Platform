// import { NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// type IncomingMsg =
//   | { role: string; content?: string }
//   | { role: string; parts?: { text?: string }[] };

// type GeminiMsg = {
//   role: "user" | "model";
//   parts: { text: string }[];
// };

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// function getText(m: IncomingMsg): string {
//   // UI/OpenAI style
//   const c = (m as any).content;
//   if (typeof c === "string" && c.trim()) return c.trim();

//   // Gemini style
//   const p0 = (m as any).parts?.[0]?.text;
//   if (typeof p0 === "string" && p0.trim()) return p0.trim();

//   return "";
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const messages: IncomingMsg[] = body.messages ?? [];
//     const lang: "bn" | "en" = body.lang ?? "bn";

//     if (!process.env.GEMINI_API_KEY) {
//       return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
//     }
//     if (messages.length === 0) {
//       return NextResponse.json({ error: "No messages provided" }, { status: 400 });
//     }

//     const systemInstruction =
//       lang === "bn"
//         ? "তুমি বাংলাদেশ সরকারের একটি সহায়ক তথ্য সেবা। সংক্ষিপ্ত, পরিষ্কার ও ভদ্রভাবে উত্তর দাও।"
//         : "You are a government information assistant. Answer clearly and politely.";

//     const model = genAI.getGenerativeModel({
//       model: "gemini-1.5-flash",
//       systemInstruction,
//     });

//     // last user input
//     const lastText = getText(messages[messages.length - 1]);
//     if (!lastText) {
//       return NextResponse.json({ error: "Last message is empty" }, { status: 400 });
//     }

//     // history (exclude last)
//     const history: GeminiMsg[] = messages.slice(0, -1).map((m) => {
//       const roleRaw = (m as any).role;
//       const text = getText(m);
//       return {
//         role: roleRaw === "assistant" || roleRaw === "model" ? "model" : "user",
//         parts: [{ text }],
//       };
//     });

//     const chat = model.startChat({ history });
//     const result = await chat.sendMessage(lastText);

//     return NextResponse.json({ reply: result.response.text() });
//   } catch (error) {
//     console.error("Gemini error:", error);
//     return NextResponse.json({ error: "AI service unavailable" }, { status: 500 });
//   }
// }
