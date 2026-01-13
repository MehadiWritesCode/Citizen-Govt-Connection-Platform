"use client";

import React from "react";

const messages = [
  {
    id: "a1",
    role: "assistant",
    text: `Hello! 👋

Tell me your problem in one line.

Example: My NID information was misused.`,
  },
  {
    id: "u1",
    role: "user",
    text: "My NID info was misused.",
  },
  {
    id: "a2",
    role: "assistant",
    text: `Thanks.

Please share:
1) District/Upazila
2) What happened (short)
3) What you want to do`,
  },
];

export default function MessageListUI() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-6 pb-28">
      <div className="space-y-4">
        {messages.map((m) => {
          const isUser = m.role === "user";
          return (
            <div key={m.id} className={["flex", isUser ? "justify-end" : ""].join(" ")}>
              <div
                className={[
                  "max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  isUser
                    ? "bg-slate-900 text-white dark:bg-[#532D8C] dark:text-white"
                    : "bg-slate-100 text-slate-900 dark:bg-transparent dark:text-slate-100",
                ].join(" ")}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
