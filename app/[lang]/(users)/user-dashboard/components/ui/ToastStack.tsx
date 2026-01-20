"use client";

import { X, Info } from "lucide-react";
import type { Toast } from "../../hooks/useToasts";

export default function ToastStack({
  toasts,
  onClose,
}: {
  toasts: Toast[];
  onClose: (id: string) => void;
}) {
  return (
    <div className="fixed right-4 top-4 z-50 space-y-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="w-[320px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm
                     dark:border-slate-700 dark:bg-slate-900"
        >
          <div className="flex items-start gap-2">
            <div className="mt-0.5 grid h-8 w-8 place-items-center rounded-lg bg-slate-50 text-slate-700
                            dark:bg-slate-800 dark:text-slate-200">
              <Info className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {t.title}
              </div>

              {t.message ? (
                <div className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                  {t.message}
                </div>
              ) : null}
            </div>

            <button
              onClick={() => onClose(t.id)}
              className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 active:bg-slate-200
                         dark:text-slate-400 dark:hover:bg-slate-800 dark:active:bg-slate-700"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
