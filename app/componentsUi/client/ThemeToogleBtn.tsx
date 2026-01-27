"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function ModeToggleBtn() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  // ✅ SSR mismatch avoid
  if (!mounted) {
    return (
      <div className="h-10 w-[92px] rounded-full border border-slate-200/70 bg-white/60 dark:border-slate-800 dark:bg-slate-900/40" />
    )
  }

  const isDark = theme === "dark"

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-200/70 bg-white/70 p-1 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/50">
      <button
        onClick={() => setTheme("light")}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full transition",
          !isDark
            ? "bg-emerald-600 text-white shadow-sm"
            : "text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
        )}
        aria-label="Light mode"
      >
        <Sun className="h-4 w-4" />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full transition",
          isDark
            ? "bg-slate-900 text-white shadow-sm dark:bg-slate-800"
            : "text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
        )}
        aria-label="Dark mode"
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  )
}

