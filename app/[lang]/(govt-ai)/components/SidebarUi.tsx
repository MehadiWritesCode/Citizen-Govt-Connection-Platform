"use client";

import React from "react";
import { Bot, Home, MessageSquare, Trash2, X } from "lucide-react";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
};

const chats = [
  { id: "1", title: "New chat" },
  { id: "2", title: "NID issue" },
  { id: "3", title: "Passport help" },
];

export default function SidebarUI({ sidebarOpen, setSidebarOpen }: Props) {
  return (
    <aside
      className={[
        "fixed z-40 top-0 left-0 h-full w-72 border-r border-slate-200/70 bg-white/95 backdrop-blur",
        "dark:border-slate-800 dark:bg-slate-950/90",
        "transition-transform md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
      ].join(" ")}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200/70 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-semibold">Government AI</span>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* New chat */}
        <div className="p-3">
          <button className="w-full rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-3 py-2 text-sm font-semibold">
            + New chat
          </button>
        </div>

        {/* Chat list */}
        <div className="px-2 pb-3 flex-1 overflow-auto">
          {chats.map((c, idx) => {
            const isActive = idx === 0;
            return (
              <div
                key={c.id}
                className={[
                  "group w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm",
                  isActive
                    ? "bg-slate-100 dark:bg-slate-900"
                    : "hover:bg-slate-100 dark:hover:bg-slate-900",
                ].join(" ")}
              >
                <button className="flex-1 flex items-center gap-2 text-left min-w-0">
                  <MessageSquare className="h-4 w-4 text-slate-500" />
                  <span className="truncate">{c.title}</span>
                </button>

                <button
                  className="opacity-0 group-hover:opacity-100 transition text-slate-400 hover:text-red-500"
                  aria-label="Delete chat"
                  title="Delete chat"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom */}
        <div className="px-4 py-3 border-t border-slate-200/70 dark:border-slate-800">
          <button
            className="w-full mb-2 flex items-center justify-center gap-2 rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900"
            aria-label="Back to home"
            title="Back to home"
          >
            <Home className="h-4 w-4" />
            Home
          </button>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
            Don’t share OTP/passwords.
          </p>
        </div>
      </div>
    </aside>
  );
}
