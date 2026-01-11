export default function LoginForm({ dict }: { dict: Record<string, string> }) {
  return (
    <form className="space-y-5">
      {/* Number */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {dict.numberLabel}
        </label>

        <div className="relative">
          <input
            type="text"
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
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="
          mt-1 inline-flex w-full items-center justify-center gap-2
          rounded-xl px-4 py-3 text-sm font-semibold
          bg-slate-900 text-white
          hover:opacity-95 transition
          active:scale-[0.99]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50
          dark:bg-slate-100 dark:text-slate-900
        "
      >
        {dict.SignInBtn}
        <span className="text-base leading-none">→</span>
      </button>

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

