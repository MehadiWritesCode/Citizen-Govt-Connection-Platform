"use client";

import React from "react";

export default function PageTitle({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-lg font-medium text-slate-900 dark:text-slate-100">
          {title}
        </h1>

        {subtitle ? (
          <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {subtitle}
          </div>
        ) : null}
      </div>

      {right ? <div className="flex items-center gap-2">{right}</div> : null}
    </div>
  );
}
