"use client";

import { useRouter } from "next/navigation";

export default function PagePath({ current }: { current: string }) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
      <span
      onClick={()=> router.push('/')}
       className="hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-950 rounded-md border border-slate-200 bg-white px-2 py-1 active:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:active:bg-slate-800">
        Home
      </span>

      <span className="text-slate-400 dark:text-slate-600">/</span>

      <span className="rounded-md border border-slate-200 bg-white px-2 py-1 active:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:active:bg-slate-800">
        User Dashboard
      </span>

      <span className="text-slate-400 dark:text-slate-600">/</span>

      <span className="font-medium text-slate-800 dark:text-slate-100">
        {current}
      </span>
    </div>
  );
}
