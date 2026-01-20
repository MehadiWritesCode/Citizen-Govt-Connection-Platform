"use client";

export default function Footer() {
  return (
    <footer className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-700">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
        <div>© {new Date().getFullYear()} Citizen Government Connection Platform</div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            className="hover:text-slate-700 active:text-slate-900 dark:hover:text-slate-200 dark:active:text-white"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Privacy
          </a>

          <span className="text-slate-300 dark:text-slate-600">•</span>

          <a
            className="hover:text-slate-700 active:text-slate-900 dark:hover:text-slate-200 dark:active:text-white"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Terms
          </a>

          <span className="text-slate-300 dark:text-slate-600">•</span>

          <a
            className="hover:text-slate-700 active:text-slate-900 dark:hover:text-slate-200 dark:active:text-white"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
