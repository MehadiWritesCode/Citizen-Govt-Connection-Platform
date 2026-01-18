"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type ChatMsg = { role: "user" | "assistant"; content: string };

type context = {
  lang: "bn" | "en";
  setLang: (lang: "bn" | "en") => void;
  messages: ChatMsg[];
  loading: boolean;
  sendMessage: (text: string) => Promise<void>;
};

const ChatContext = createContext<context | null>(null);

export function useChat() {
  const cont = useContext(ChatContext);
  if (!cont) throw new Error("useChat must be used within a ChatProvider");
  return cont;
}
export function ChatProvider({
  children,
  initialLang = "bn",
}: {
  children: React.ReactNode;
  initialLang?: "bn" | "en";
}) {
  const [lang, setLang] = useState<"bn" | "en">(initialLang);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async (text: string) => {
    const userText = text.trim();
    if (!userText) return;

    //show user message in ui
    let nextMsg: ChatMsg[] = [];
    setMessages((prev) => {
      nextMsg = [...prev, { role: "user", content: userText }];
      return nextMsg;
    });

    setLoading(true);
    try {
      const response = await fetch(`/api/govt-ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          messages: nextMsg.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Request failed!");
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? "" },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            lang === "bn"
              ? "দুঃখিত, সার্ভার সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।"
              : "Sorry, there was a server issue. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({ lang, setLang, messages, loading, sendMessage }),
    [lang, messages, loading],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

