"use client";

import { useState } from "react";
import AuthNavbar from "./components/AuthNavbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

export default function Page() {
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen bg-[#f6fbf9] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <AuthNavbar />

      {/* Main */}
      <main className="relative">
        {/* dotted background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(15,23,42,0.08) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        {/* dotted background darker on dark mode */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage:
              "radial-gradient(rgba(148,163,184,0.18) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        {/* center glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),transparent_55%)] dark:bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.10),transparent_55%)]" />

        <div className="relative mx-auto flex max-w-7xl justify-center px-4 py-12 md:px-8">
          <div className="w-full max-w-md">
            {/* Title */}
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">
                <span className="text-2xl text-emerald-700 dark:text-emerald-300">
                  🏛️
                </span>
              </div>

              <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Citizen Digital Services
              </h1>
              <p className="mt-1 text-xs tracking-wide text-slate-500 dark:text-slate-400">
                PEOPLE&apos;S REPUBLIC OF BANGLADESH
              </p>
            </div>

            {/* Card */}
            <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(2,6,23,0.08)] ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800 dark:shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
              {/* Tabs */}
              <div className="flex gap-2 p-3">
                <button
                  onClick={() => setTab("login")}
                  className={`flex-1 rounded-xl py-2 text-sm font-semibold transition ${
                    tab === "login"
                      ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/20 dark:bg-emerald-950/35 dark:text-emerald-200 dark:ring-emerald-400/25"
                      : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900"
                  }`}
                >
                  LOGIN
                </button>

                <button
                  onClick={() => setTab("register")}
                  className={`flex-1 rounded-xl py-2 text-sm font-semibold transition ${
                    tab === "register"
                      ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/20 dark:bg-emerald-950/35 dark:text-emerald-200 dark:ring-emerald-400/25"
                      : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900"
                  }`}
                >
                  REGISTER
                </button>
              </div>

              <div className="px-6 pb-6 pt-2">
                {tab === "login" ? <LoginForm /> : <RegisterForm />}
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
              Need help? Call <span className="font-semibold">333</span> or{" "}
              <span className="font-semibold">16122</span>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 text-xs text-slate-600 dark:text-slate-400 md:grid-cols-3 md:px-8">
          <div>
            <p className="mb-2 font-semibold text-slate-800 dark:text-slate-200">
              GOVERNMENT SUPPORT
            </p>
            <p>
              The National Digital Service Portal is the primary point of access
              for citizen-centric government services.
            </p>
          </div>

          <div>
            <p className="mb-2 font-semibold text-slate-800 dark:text-slate-200">
              IMPORTANT LINKS
            </p>
            <ul className="space-y-1">
              <li className="hover:text-emerald-700 hover:underline dark:hover:text-emerald-300">
                Privacy Policy
              </li>
              <li className="hover:text-emerald-700 hover:underline dark:hover:text-emerald-300">
                Terms of Use
              </li>
              <li className="hover:text-emerald-700 hover:underline dark:hover:text-emerald-300">
                Data Security
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-2 font-semibold text-slate-800 dark:text-slate-200">
              CONTACT US
            </p>
            <p>Helpline: 333 or 999</p>
            <p className="hover:text-emerald-600 underline">Email: support@digitalportal.gov.bd</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
