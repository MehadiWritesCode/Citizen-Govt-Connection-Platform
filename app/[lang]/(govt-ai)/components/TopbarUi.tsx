"use client";

import React from "react";
import { Menu } from "lucide-react";

type Props = {
  title: string;
  onMenu: () => void;
};

export default function TopbarUI({ title, onMenu }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <button
            className="md:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
            onClick={onMenu}
            aria-label="Open sidebar"
            title="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <span className="text-sm font-semibold truncate">{title}</span>
        </div>

        <button className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
          New chat
        </button>
      </div>
    </header>
  );
}
