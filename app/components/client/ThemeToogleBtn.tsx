// "use client";

// import { Moon, Sun, Monitor } from "lucide-react";
// import { useTheme } from "next-themes";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// export function ModeToggleBtn() {
//   const { setTheme } = useTheme();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="outline"
//           size="icon"
//           className="
//     relative h-10 w-10 rounded-xl
//     border-slate-200 bg-white/80 backdrop-blur shadow-sm
//     hover:bg-slate-50 hover:shadow-md
//     dark:border-slate-700 dark:bg-slate-900/60 dark:hover:bg-slate-900
//   "
//         >
//           <Sun className="h-[1.15rem] w-[1.15rem] text-slate-700 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
//           <Moon
//             className="
//       absolute h-[1.15rem] w-[1.15rem]
//       text-slate-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]
//       rotate-90 scale-0 transition-all duration-300
//       dark:rotate-0 dark:scale-100
//     "
//           />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent
//         align="end"
//         className="
//           w-44 rounded-2xl p-2
//           border border-slate-200 bg-white shadow-lg
//           dark:border-slate-800 dark:bg-slate-950
//         "
//       >
//         <DropdownMenuItem
//           onClick={() => setTheme("light")}
//           className="
//             flex items-center gap-2 rounded-xl px-3 py-2 text-sm
//             focus:bg-emerald-50 focus:text-emerald-900
//             dark:focus:bg-emerald-500/10 dark:focus:text-emerald-200
//           "
//         >
//           <Sun className="h-4 w-4" />
//           Light
//         </DropdownMenuItem>

//         <DropdownMenuItem
//           onClick={() => setTheme("dark")}
//           className="
//             flex items-center gap-2 rounded-xl px-3 py-2 text-sm
//             focus:bg-emerald-50 focus:text-emerald-900
//             dark:focus:bg-emerald-500/10 dark:focus:text-emerald-200
//           "
//         >
//           <Moon className="h-4 w-4" />
//           Dark
//         </DropdownMenuItem>

//         <DropdownMenuItem
//           onClick={() => setTheme("system")}
//           className="
//             flex items-center gap-2 rounded-xl px-3 py-2 text-sm
//             focus:bg-emerald-50 focus:text-emerald-900
//             dark:focus:bg-emerald-500/10 dark:focus:text-emerald-200
//           "
//         >
//           <Monitor className="h-4 w-4" />
//           System
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }


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

