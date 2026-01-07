"use client";

import { useEffect, useRef, useState } from "react";
import { ModeToggleBtn } from "../../../../components/client/ThemeToogleBtn";
import Image from "next/image";
import { usePathname, useRouter } from 'next/navigation';

import { Dictionary } from "../../../../../dict_interface/dict_interface";
export default function AuthNavbar({dict}:{dict:Dictionary}) {

  const [openMobile, setOpenMobile] = useState(false);
  const [openLang, setOpenLang] = useState(false);

  const langRef = useRef<HTMLDivElement | null>(null);


    //Language change section
  const pathName = usePathname();
  const router = useRouter();

  const handleLanguageChange =(newLanguage : string)=>{
       if(!pathName) return;

       const segments = pathName.split("/");
       segments[1] = newLanguage;
       const newPath = segments.join("/");
       console.log(newPath)

       router.push(newPath);
       setOpenLang(false);
  }


  // outside click close (lang dropdown)
  useEffect(() => {
    function handler(e: MouseEvent) {
      const t = e.target as Node;
      if (langRef.current && !langRef.current.contains(t)) setOpenLang(false);
    }

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);


  return (
    <div className="w-full bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* top strip */}
      <div className="h-1 w-full bg-linear-to-r from-emerald-700 via-red-600 to-emerald-700" />

      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700/10 ring-1 ring-emerald-700/20 dark:bg-emerald-400/10 dark:ring-emerald-300/20">
            <Image
              src={"/images/logo.png"}
              width={36}
              height={36}
              alt="CGCP Logo"
            />
          </div>

          <div className="leading-tight">
            <p className="text-sm font-semibold">{dict.auth.authNavbar.title}</p>
            <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {dict.auth.authNavbar.subtitle}
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            <button className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-emerald-300">
              {dict.auth.authNavbar.helpDesk}
            </button>

            <button className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-emerald-300">
              {dict.auth.authNavbar.accesibility}
            </button>

            {/* Language dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setOpenLang((s) => !s)}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 dark:text-slate-200 dark:ring-slate-800 dark:hover:bg-slate-900"
              >
                🌐 {dict.auth.authNavbar.language} <span className="text-slate-400">▾</span>
              </button>

              {openLang && (
                <div className="absolute right-0 mt-2 z-50 w-48 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">
                  <button
                  onClick={()=> handleLanguageChange("bn")}
                  className="flex w-full items-center justify-between px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900">
                    বাংলা <span className="text-xs text-slate-400">BN</span>
                  </button>
                  <button
                      onClick={()=> handleLanguageChange("en")}
                  className="flex w-full items-center justify-between px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900">
                    English <span className="text-xs text-slate-400">EN</span>
                  </button>
                </div>
              )}
            </div>

            {/* Theme toggle button (your shadcn toggle) */}
            <ModeToggleBtn />
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpenMobile((s) => !s)}
            className="inline-flex items-center justify-center rounded-lg p-2 ring-1 ring-slate-200 hover:bg-slate-50 dark:ring-slate-800 dark:hover:bg-slate-900 md:hidden"
            aria-label="Open menu"
          >
            <span className="text-xl text-slate-700 dark:text-slate-200">
              {openMobile ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {openMobile && (
        <div className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3">
            <button
            className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900">
              {dict.auth.authNavbar.helpDesk}
            </button>

            <button className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900">
              {dict.auth.authNavbar.accesibility}
            </button>

            {/* Mobile Language */}
            <details className="rounded-lg ring-1 ring-slate-200 dark:ring-slate-800">
              <summary className="cursor-pointer list-none px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                🌐 Language
              </summary>
              <div className="border-t border-slate-200 dark:border-slate-800">
                <button
                onClick={() => handleLanguageChange("bn")}
                className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900">
                  বাংলা
                </button>
                <button
                onClick={()=>{handleLanguageChange("en")}}
                className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900">
                  English
                </button>
              </div>
            </details>

            {/* Mobile Theme */}
            <div className="rounded-lg ring-1 ring-slate-200 p-2 dark:ring-slate-800">
              <div className="px-1 pb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                {dict.auth.authNavbar.theme}
              </div>
              <ModeToggleBtn />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
