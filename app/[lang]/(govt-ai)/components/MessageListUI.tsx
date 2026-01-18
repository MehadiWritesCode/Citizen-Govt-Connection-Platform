"use client";

import { useEffect, useRef } from "react";
import { Landmark } from "lucide-react";
import { useChat } from "./chatContext";

export default function MessageListUI() {
  const { messages, loading } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <main className="mx-auto max-w-3xl px-4 pt-6 pb-28">
      <div className="space-y-4">
        {/* Render all messages */}
        {messages.map((m, index) => {
          const isUser = m.role === "user";

          return (
            <div
              key={index}
              className={`flex ${isUser ? "justify-end" : "justify-start"} gap-2`}
            >
              {!isUser && (
                <div
                  className="mt-1 h-7 w-7 flex items-center justify-center rounded-full
                                bg-slate-200 dark:bg-slate-700"
                >
                  <Landmark className="h-4 w-4 text-green-600 dark:text-[#22D3EE]" />
                </div>
              )}

              <div
                className={[
                  "max-w-[82%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap",
                  isUser
                    ? "bg-slate-900 text-white dark:bg-[#1D4ED8] dark:text-[#F8FAFC]"
                    : "bg-slate-100 text-slate-900 dark:bg-transparent dark:text-slate-100",
                ].join(" ")}
              >
                {m.content}
              </div>
            </div>
          );
        })}

        {/* Show ONLY while reply is not yet added */}
        {loading && (

          <div className="flex justify-start gap-2">
            <div
              className="mt-1 h-7 w-7 flex items-center justify-center rounded-full
               bg-slate-200 dark:bg-[#0B1220] border border-transparent dark:border-[#1F2937]"
            >
              <Landmark className="h-4 w-4 text-green-600 dark:text-[#22D3EE]" />
            </div>

            <div
              className="rounded-2xl px-4 py-2 text-sm font-medium
               bg-slate-100 text-slate-900
               dark:bg-[#111827] dark:text-[#22D3EE]
               border border-transparent dark:border-[#1F2937]"
            >
              <span className="animate-pulse font-bold">…</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </main>
  );
}
