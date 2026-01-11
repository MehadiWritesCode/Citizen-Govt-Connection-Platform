"use client";

import React, { RefObject } from "react";
import { Paperclip, Send } from "lucide-react";

type Props = {
  fileInputRef: RefObject<HTMLInputElement | null>;
};

export default function ComposerUI({ fileInputRef }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 border-t border-slate-200/70 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 md:pl-72">
      <div className="mx-auto max-w-3xl px-4 py-4">
        <div className="flex gap-2 items-end">
          <input ref={fileInputRef} type="file" className="hidden" multiple />

          <button
            type="button"
            className="h-11 w-11 rounded-xl border border-slate-200/70 bg-white/80 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900 flex items-center justify-center"
            aria-label="Attach file"
            title="Attach file"
          >
            <Paperclip className="h-5 w-5" />
          </button>

          <input
            placeholder="Type your message…"
            className="flex-1 h-11 rounded-xl border border-slate-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/40 dark:border-slate-700 dark:bg-slate-900"
          />

          <button
            className="h-11 w-11 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 flex items-center justify-center"
            aria-label="Send"
            title="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
          Tip: Add your district/upazila for faster help.
        </p>
      </div>
    </div>
  );
}
