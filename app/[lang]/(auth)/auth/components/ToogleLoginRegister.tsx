"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type AuthDict = {
  toggleBtn: { login: string; register: string };
  login: Record<string, string>;
  register: Record<string, string>;
};
export default function ToogleLoginRegister({ dict }: { dict:AuthDict}) {
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
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
          {dict.toggleBtn.login}
        </button>

        <button
          onClick={() => setTab("register")}
          className={`flex-1 rounded-xl py-2 text-sm font-semibold transition ${
            tab === "register"
              ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/20 dark:bg-emerald-950/35 dark:text-emerald-200 dark:ring-emerald-400/25"
              : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900"
          }`}
        >
          {dict.toggleBtn.register}
        </button>
      </div>

      <div className="px-6 pb-6 pt-2">

        {tab === "login" ? <LoginForm  dict={dict.login} /> : <RegisterForm dict={dict.register} />}
      </div>
    </div>
  );
}
