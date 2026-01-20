"use client";

import Image from "next/image";

export default function Brand({ compact }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2">
                <div
                  className="w-9 h-9 rounded-sm overflow-hidden bg-white/80 dark:bg-slate-900
                        flex items-center justify-center ring-1 ring-slate-200 dark:ring-slate-800"
                >
                  <Image
                    src="/images/logo.png"
                    alt="App Logo"
                    width={36}
                    height={36}
                    className="object-contain"
                    priority
                  />
                </div>

      {!compact ? (
        <div className="leading-tight">
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            CGCP
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Dashboard
          </div>
        </div>
      ) : (
        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          GovConnect
        </div>
      )}
    </div>
  );
}
