"use client";

import { MessageSquare } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

const AIChatWidget = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === "/govt-ai";

  const handleClick = useCallback(() => {
    router.push("/govt-ai");
  }, [router]);

  return (
    <div className="fixed right-4 bottom-[75px] sm:bottom-11 sm:right-6 z-50">
      <button
        onClick={handleClick}
        aria-label="Open AI Assistance"
        className={[
          "group relative grid place-items-center",
          "h-12 w-12 rounded-full",
          "border shadow-md transition-all duration-200",
          "active:scale-[0.96] hover:shadow-lg",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30",
          // light
          "bg-white border-slate-200 text-slate-800 hover:border-slate-300",
          // dark
          "dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 dark:hover:border-slate-600",
          // active
          isActive ? "ring-2 ring-emerald-500/25 border-emerald-300 dark:border-emerald-700" : "",
        ].join(" ")}
      >
        <MessageSquare className="h-5 w-5" />

        {/* Online dot */}
        <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />

        {/* Tooltip */}
        <span
          className={[
            "pointer-events-none absolute right-full mr-3",
            "whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium",
            "opacity-0 translate-x-1 transition-all duration-150",
            "group-hover:opacity-100 group-hover:translate-x-0",
            "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900",
          ].join(" ")}
        >
          AI Assistance
        </span>
      </button>
    </div>
  );
};

export default AIChatWidget;

