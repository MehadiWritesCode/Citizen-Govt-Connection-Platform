"use client";

import Image from "next/image";
import logo from "@/public/images/logo.png"
export default function Brand({ compact }: { compact?: boolean }) {

  return (
    <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="App Logo"
            width={60}
            height={60}
            className="object-contain p-0"
            priority
          />

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
          CGCP
        </div>
      )}
    </div>
  );
}
