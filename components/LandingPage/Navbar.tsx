"use client";

import React from "react";
import { ShieldCheck, Menu, X, Moon } from "lucide-react";
import { redirect } from "next/navigation";
import { ModeToggleBtn } from "../../app/components/client/ThemeToogleBtn";

export type Lang = "bn" | "en";

type NavbarProps = {
  isScrolled: boolean;
  lang: string;
};

export default function Navbar({ isScrolled, lang }: NavbarProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <nav
      className={[
        "fixed inset-x-0 top-0 z-50",
        "transition-colors duration-300",
        // Always keep a subtle separation line (best practice)
        "border-b",
        isScrolled
          ? "bg-white/96 dark:bg-slate-950/96 border-slate-200 dark:border-slate-800"
          : "bg-white/70 dark:bg-slate-950/55 border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-sm bg-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-lg text-slate-900 dark:text-slate-100">
            Civic<span className="text-emerald-600">Sync</span>
          </span>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            {["Explorer", "Departments", "Safe Routes"].map((item) => (
              <a
                key={item}
                href="#"
                className="px-2 py-1 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-900
                           hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />

          <div className="flex items-center gap-2">
            {/* Language (UI only) */}
            <div className="relative">
              <select
                defaultValue={lang}
                className="h-9 pl-3 pr-8 rounded-sm text-sm font-medium
                           border border-slate-200 dark:border-slate-800
                           bg-white dark:bg-slate-900
                           text-slate-700 dark:text-slate-200
                           hover:bg-slate-50 dark:hover:bg-slate-800
                           focus:outline-none"
                aria-label="Select language"
              >
                <option value="en">EN</option>
                <option value="bn">BN</option>
              </select>
              <svg
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Theme (UI only) */}
            <ModeToggleBtn />


            <button
              onClick={() => redirect(`/${lang}/auth`)}
              className="px-3 py-2 rounded-sm text-sm font-medium
                         text-slate-700 dark:text-slate-300
                         hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              Login / Register
            </button>

            <button
              className="px-4 py-2 rounded-sm text-sm font-semibold
                         bg-slate-900 dark:bg-slate-100
                         text-white dark:text-slate-900
                         hover:bg-slate-800 dark:hover:bg-slate-200
                         transition-colors"
            >
              Join Portal
            </button>
          </div>
        </div>

        {/* Mobile: only hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden w-9 h-9 rounded-sm border border-slate-200 dark:border-slate-800
                     flex items-center justify-center
                     text-slate-700 dark:text-slate-200
                     hover:bg-slate-100 dark:hover:bg-slate-900
                     transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu: includes theme + lang */}
      {open && (
        <div className="lg:hidden mx-4 sm:mx-6 mb-3 rounded-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex flex-col divide-y divide-slate-200 dark:divide-slate-800">
            {["Explorer", "Departments", "Safe Routes"].map((item) => (
              <a
                key={item}
                href="#"
                className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200
                           hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {item}
              </a>
            ))}

            {/* Theme + Language row */}
            <div className="px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <select
                    defaultValue={lang}
                    className="w-full h-9 pl-3 pr-8 rounded-sm text-sm font-medium
                               border border-slate-200 dark:border-slate-800
                               bg-white dark:bg-slate-950
                               text-slate-700 dark:text-slate-200
                               focus:outline-none"
                    aria-label="Select language"
                  >
                    <option value="en">EN</option>
                    <option value="bn">BN</option>
                  </select>
                  <svg
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <button
                  type="button"
                  className="h-9 w-9 rounded-sm
                             border border-slate-200 dark:border-slate-800
                             bg-white dark:bg-slate-950
                             text-slate-700 dark:text-slate-200
                             hover:bg-slate-100 dark:hover:bg-slate-800
                             transition-colors"
                  aria-label="Toggle theme"
                  title="Toggle theme"
                >
                  <Moon className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>

            <button
              onClick={() => redirect(`/${lang}/auth`)}
              className="px-4 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-200
                         hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Login / Register
            </button>

            <button
              className="px-4 py-3 text-left text-sm font-semibold text-emerald-600 dark:text-emerald-400
                         hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Join Portal
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

