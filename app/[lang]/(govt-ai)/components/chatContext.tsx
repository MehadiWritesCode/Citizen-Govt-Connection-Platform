"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type attachment = {
  name: string;
  type: string;
  url?: string;
};
export type ChatMsg = {
  role: "user" | "assistant";
  content: string;
  attachments?: attachment[];
};

type context = {
  lang: "bn" | "en";
  setLang: (lang: "bn" | "en") => void;
  messages: ChatMsg[];
  loading: boolean;
  sendMessage: (formData: FormData) => Promise<void>;
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

  const sendMessage = async (formData: FormData) => {
    const fileList = formData.getAll("files") as File[];

    const attachments: attachment[] = fileList.map((f) => ({
      name: f.name,
      type: f.type,
      url: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
    }));

    const userText = (formData.get("message")?.toString() ?? "").trim();
    formData.set("lang", lang);

    if (!userText && formData.getAll("files").length === 0) return;

    //show user message in ui
    const nextMsg: ChatMsg[] =
      userText || attachments.length
        ? [...messages, { role: "user", content: userText, attachments }]
        : messages;

    if (userText || attachments.length) setMessages(nextMsg);

    formData.set(
      "messages",
      JSON.stringify(
        nextMsg.map((m) => ({ role: m.role, content: m.content })),
      ),
    );

    setLoading(true);
    try {
      const response = await fetch(`/api/govt-ai/chat`, {
        method: "POST",
        body: formData,
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
              ? "দুঃখিত, সার্ভার সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।"
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
