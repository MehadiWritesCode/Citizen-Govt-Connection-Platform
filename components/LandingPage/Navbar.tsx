"use client";

import React, { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { ModeToggleBtn } from "../../app/components/client/ThemeToogleBtn";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import ServicesMenu from "./ServicesMenu";

export type Lang = "bn" | "en";

type NavbarProps = {
  isScrolled: boolean;
  lang: string;
  dict: {
    title: string;
    explorer: string;
    departments: string;
    safeRoutes: string;
    loginRegister: string;
    aiAssitance: string;
    language: string;
  };
};

export default function Navbar({ isScrolled, lang, dict }: NavbarProps) {
  const router = useRouter(); // ✅ moved up
  const pathName = usePathname();

  const [open, setOpen] = React.useState(false);
  const [openLang, setOpenLang] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);

  // handle language change
  const handleLanguageChange = (newLanguage: string) => {
    if (!pathName) return;

    const segments = pathName.split("/");
    segments[1] = newLanguage;
    const newPath = segments.join("/");

    router.push(newPath);
    setOpenLang(false);
  };

  const services = String(dict.explorer);

  const desktopServicesBtn =
    "inline-flex items-center gap-1.5 leading-none px-2 py-1 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors";
  const mobileServicesBtn =
    "px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center w-full justify-between";
  return (
    <nav
      className={[
        "fixed inset-x-0 top-0 z-50",
        "transition-colors duration-300",
        "border-b",
        isScrolled
          ? "bg-white/96 dark:bg-slate-950/96 border-slate-200 dark:border-slate-800"
          : "bg-white/70 dark:bg-slate-950/55 border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
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

          <span className="font-semibold text-lg text-slate-900 dark:text-slate-100">
            {dict.title}
          </span>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <ServicesMenu explorer={services} design={desktopServicesBtn} />
            {[
              // { label: dict.explorer, href: "#explorer" },
              { label: dict.departments, href: "#departments" },
              { label: dict.safeRoutes, href: "#safeRoutes" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-2 py-1 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-900
                           hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />

          <div className="flex items-center gap-2">
            {/* Language (desktop dropdown) */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setOpenLang((s) => !s)}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 dark:text-slate-200 dark:ring-slate-800 dark:hover:bg-slate-900"
              >
                🌐 <span className="text-slate-700">{dict.language}▾</span>
              </button>

              {openLang && (
                <div className="absolute right-0 mt-2 z-50 w-48 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">
                  <button
                    onClick={() => handleLanguageChange("bn")}
                    className="flex w-full items-center justify-between px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
                  >
                    বাংলা <span className="text-xs text-slate-400">BN</span>
                  </button>
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className="flex w-full items-center justify-between px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
                  >
                    English <span className="text-xs text-slate-400">EN</span>
                  </button>
                </div>
              )}
            </div>

            <ModeToggleBtn />

            <button
              onClick={() => router.push(`/${lang}/auth`)}
              className="px-3 py-2 rounded-sm text-sm font-medium
                         text-slate-700 dark:text-slate-300
                         hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              {dict.loginRegister}
            </button>

            <button
              onClick={() => router.push(`/govt-ai`)}
              className="px-4 py-2 rounded-sm text-sm font-semibold
                         bg-slate-900 dark:bg-slate-100
                         text-white dark:text-slate-900
                         hover:bg-slate-800 dark:hover:bg-slate-200
                         transition-colors"
            >
              {dict.aiAssitance}
            </button>
          </div>
        </div>

        {/* Mobile hamburger */}
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

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden mx-4 sm:mx-6 mb-3 rounded-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex flex-col divide-y divide-slate-200 dark:divide-slate-800">
            <ServicesMenu explorer={services} design={mobileServicesBtn} />
            {[
              { label: dict.departments, href: "#departments" },
              { label: dict.safeRoutes, href: "#safeRoutes" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200
                           hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {item.label}
              </a>
            ))}

            {/* Theme + Language row (mobile) */}
            <div className="px-4 py-3">
              <div className="flex items-center gap-2 w-full justify-between">
                <div className="relative">
                  <button
                    onClick={() => setOpenLang((s) => !s)}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 dark:text-slate-200 dark:ring-slate-800 dark:hover:bg-slate-900"
                  >
                    🌐 <span className="text-slate-700">{dict.language}▾</span>
                  </button>

                  {openLang && (
                    <div className="absolute left-0 mt-2 z-50 w-48 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">
                      <button
                        onClick={() => handleLanguageChange("bn")}
                        className="flex w-full items-center justify-between px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
                      >
                        বাংলা <span className="text-xs text-slate-400">BN</span>
                      </button>
                      <button
                        onClick={() => handleLanguageChange("en")}
                        className="flex w-full items-center justify-between px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
                      >
                        English{" "}
                        <span className="text-xs text-slate-400">EN</span>
                      </button>
                    </div>
                  )}
                </div>
                <ModeToggleBtn />
              </div>
            </div>

            <button
              onClick={() => router.push(`/${lang}/auth`)}
              className="px-4 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-200
                         hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {dict.loginRegister}
            </button>

            <button
            onClick={()=> router.push('/govt-ai')}
              className="px-4 py-3 text-left text-sm font-semibold text-emerald-600 dark:text-emerald-400
                         hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {dict.aiAssitance}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
