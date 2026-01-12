"use client";

import { useActionState } from "react";
import { SignInUser,type LoginActionResult } from "../login.action";
import AuthButton from "./AuthButton";

export default function LoginForm({ dict }: { dict: Record<string, string> }) {

  const initialState:LoginActionResult = {ok:true}
  const [state,action] = useActionState(SignInUser,initialState);

  const topError = !state.ok && !state.field && state.message ? state.message : null;
  const phoneError = !state.ok && state.field === "phone" ? state.message : null;
  const passwordError =!state.ok && state.field === "password" ? state.message : null;

  return (
    <form className="space-y-5" action={action}>
      {/* Number */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {dict.numberLabel}
        </label>

        <div className="relative">
          <input
            type="text"
            name="phone"
            placeholder={dict.numberPlaceholder}
            className="
              w-full rounded-xl border bg-white px-3 py-3 text-sm text-slate-900
              border-slate-200/80
              placeholder:text-slate-400
              outline-none transition
              focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100
              dark:bg-slate-950 dark:text-slate-100 dark:border-slate-800
              dark:placeholder:text-slate-500
              dark:focus:border-emerald-400 dark:focus:ring-emerald-900/35
            "
          />
        </div>
          {phoneError && (
          <p className="text-xs font-medium text-red-600 dark:text-red-300">
            {phoneError}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-3">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {dict.passwordLabel}
          </label>

          <button
            type="button"
            className="
              text-xs font-semibold text-slate-700 dark:text-slate-300
              hover:underline underline-offset-4
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/30
              rounded-md px-1
            "
          >
            {dict.forgotPassword}
          </button>
        </div>

        <input
          type="password"
          name="password"
          placeholder={dict.passwordPlaceholder}
          className="
            w-full rounded-xl border bg-white px-3 py-3 text-sm text-slate-900
            border-slate-200/80
            placeholder:text-slate-400
            outline-none transition
            focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100
            dark:bg-slate-950 dark:text-slate-100 dark:border-slate-800
            dark:placeholder:text-slate-500
            dark:focus:border-emerald-400 dark:focus:ring-emerald-900/35
          "
        />
                {passwordError && (
          <p className="text-xs font-medium text-red-600 dark:text-red-300">
            {passwordError}
          </p>
        )}
      </div>


      {topError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
          {topError}
        </div>
      )}
      {/* Submit */}
      <AuthButton Btnlabel={dict.SignInBtn}/>

      {/* Official notice */}
      <div
        className="
          mt-4 rounded-xl border border-slate-200/70 dark:border-slate-800
          bg-slate-50 dark:bg-slate-900/40
          p-3.5
        "
      >
        <div className="flex items-start gap-2.5">
          <span
            className="
              mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg
              bg-emerald-50 text-emerald-800 border border-emerald-200/60
              dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-500/20
              text-xs font-bold
            "
            aria-hidden="true"
          >
            !
          </span>

          <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            {dict.officialNotice} <b className="text-slate-900 dark:text-slate-100">999</b>.
          </p>
        </div>
      </div>
    </form>
  );
}

