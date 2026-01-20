"use client";

import React, { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import type { Category, Report, Status } from "../../types";
import { formatDate } from "../../lib/util";
import PageTitle from "../ui/PageTitle";
import Select from "../ui/Select";
import StatusBadge from "../ui/StatusBadge";

export default function MyReports({
  reports,
  onOpen,
}: {
  reports: Report[];
  onOpen: (r: Report) => void;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [status, setStatus] = useState<Status | "All">("All");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const base = reports.filter((r) => {
      const matchesQuery = !q
        ? true
        : [r.id, r.category, r.location, r.details].some((x) =>
            x.toLowerCase().includes(q)
          );

      const matchesCat = category === "All" ? true : r.category === category;
      const matchesStatus = status === "All" ? true : r.status === status;

      return matchesQuery && matchesCat && matchesStatus;
    });

    base.sort((a, b) => {
      const da = new Date(a.createdAt).getTime();
      const db = new Date(b.createdAt).getTime();
      return sort === "newest" ? db - da : da - db;
    });

    return base;
  }, [reports, query, category, status, sort]);

  return (
    <div className="space-y-4">
      <PageTitle
        title="My reports"
        subtitle="Search, filter and open any report."
        right={
          <>
            <div className="hidden md:flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
              <Search className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by ID, location, details…"
                className="w-[280px] bg-transparent text-sm outline-none text-slate-900 placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                aria-label="Search reports"
              />
            </div>

            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:active:bg-slate-700"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </>
        }
      />

      <div className="md:hidden">
        <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
          <Search className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reports…"
            className="w-full bg-transparent text-sm outline-none text-slate-900 placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
            aria-label="Search reports"
          />
        </div>
      </div>

      {filtersOpen ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4 dark:border-slate-700 dark:bg-slate-900">
          <div className="grid gap-3 sm:grid-cols-3">
            <Select
              label="Category"
              value={category}
              onChange={setCategory}
              options={[
                "All",
                "Road",
                "Electricity",
                "Water",
                "Crime",
                "Emergency",
                "Other",
              ] as const}
            />
            <Select
              label="Status"
              value={status}
              onChange={setStatus}
              options={["All", "Pending", "In Progress", "Resolved"] as const}
            />
            <Select
              label="Sort"
              value={sort}
              onChange={setSort}
              options={["newest", "oldest"] as const}
              renderLabel={(o) =>
                o === "newest" ? "Newest first" : "Oldest first"
              }
            />
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                setQuery("");
                setCategory("All");
                setStatus("All");
                setSort("newest");
              }}
              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-900 hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:active:bg-slate-700"
            >
              Reset
            </button>

            <div className="text-xs text-slate-500 dark:text-slate-400">
              Showing{" "}
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {filtered.length}
              </span>{" "}
              of {reports.length}
            </div>
          </div>
        </div>
      ) : null}

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden dark:border-slate-700 dark:bg-slate-900">
        <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-3 text-[11px] font-medium text-slate-600 bg-slate-50 border-b border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700">
          <div className="col-span-3">ID</div>
          <div className="col-span-3">Category</div>
          <div className="col-span-4">Location</div>
          <div className="col-span-2 text-right">Status</div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {filtered.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-slate-600 dark:text-slate-300">
              No reports found.
            </div>
          ) : (
            filtered.map((r) => (
              <button
                key={r.id}
                onClick={() => onOpen(r)}
                className="w-full text-left hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:hover:bg-slate-800 dark:active:bg-slate-700"
              >
                <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-3 text-sm items-center">
                  <div className="col-span-3 font-medium text-slate-900 dark:text-slate-100">
                    {r.id}
                  </div>
                  <div className="col-span-3 text-slate-700 dark:text-slate-300">
                    {r.category}
                  </div>
                  <div className="col-span-4 text-slate-600 truncate dark:text-slate-400">
                    {r.location}
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <StatusBadge status={r.status} />
                  </div>
                  <div className="col-span-12 text-[11px] text-slate-500 dark:text-slate-400">
                    {formatDate(r.createdAt)}
                  </div>
                </div>

                <div className="sm:hidden p-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {r.id}
                        </div>
                        <div className="mt-1 text-[11px] text-slate-500 truncate dark:text-slate-400">
                          {r.category} • {r.location}
                        </div>
                        <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                          {formatDate(r.createdAt)}
                        </div>
                      </div>
                      <StatusBadge status={r.status} />
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
