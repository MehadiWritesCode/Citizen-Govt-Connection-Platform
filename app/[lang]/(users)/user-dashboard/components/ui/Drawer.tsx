"use client";

import { useEffect, useRef } from "react";

export default function Drawer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) window.setTimeout(() => panelRef.current?.focus(), 0);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/30 dark:bg-black/60"
        onClick={onClose}
      />

      {/* panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white border-l border-slate-200 outline-none dark:bg-slate-900 dark:border-slate-700"
        role="dialog"
        aria-modal="true"
        aria-label="Report details"
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-700">
          <div className="min-w-0">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Report
            </div>
            <div className="text-base font-medium truncate text-slate-900 dark:text-slate-100">
              {title}
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 active:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* content */}
        <div className="p-4 text-slate-900 dark:text-slate-100">{children}</div>
      </div>
    </div>
  );
}
