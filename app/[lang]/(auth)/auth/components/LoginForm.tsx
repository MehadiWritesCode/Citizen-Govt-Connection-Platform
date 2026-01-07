export default function LoginForm({ dict }: { dict: Record<string, string>}) {
  return (
    <form className="space-y-4">
      <div>
        <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          {dict.numberLabel}
        </label>
        <input
          type="text"
          placeholder={dict.numberPlaceholder}
          className="
            mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition
            border-slate-200 bg-white text-slate-900
            focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100
            dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100
            dark:focus:border-emerald-400 dark:focus:ring-emerald-900/40
          "
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {dict.passwordLabel}
          </label>
          <button
            type="button"
            className="text-[11px] font-semibold text-red-600 hover:underline dark:text-red-400"
          >
            {dict.forgotPassword}
          </button>
        </div>

        <input
          type="password"
          placeholder={dict.passwordPlaceholder}
          className="
            mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition
            border-slate-200 bg-white text-slate-900
            focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100
            dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100
            dark:focus:border-emerald-400 dark:focus:ring-emerald-900/40
          "
        />
      </div>

      <button
        type="submit"
        className="
          mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3
          text-sm font-semibold text-white shadow-sm transition active:scale-[0.99]
          bg-emerald-800 hover:bg-emerald-900
          dark:bg-emerald-700 dark:hover:bg-emerald-600
        "
      >
        {dict.SignInBtn}<span className="text-base">→</span>
      </button>

      <div
        className="
          mt-4 flex items-start gap-2 rounded-xl p-3 text-[11px] ring-1
          bg-emerald-50 text-slate-600 ring-emerald-600/15
          dark:bg-emerald-950/30 dark:text-slate-300 dark:ring-emerald-400/20
        "
      >
        <span className="mt-0.5 text-emerald-700 dark:text-emerald-300">🛡️</span>
        <p>{dict.officialNotice} <b>999</b>.
        </p>
      </div>
    </form>
  );
}
