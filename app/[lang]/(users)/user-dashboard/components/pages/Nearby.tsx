"use client";

import {
  Hospital,
  ShieldCheck,
  Flame,
  MapPin,
  Search,
  Filter,
} from "lucide-react";
import { useMemo, useState } from "react";

type nearbyLocations = {
  service_name: string;
  service_type: "hospital" | "police" | "fire_station" | string;
  map_link: string;
};

interface NearbyProps {
  nearbyLocations: nearbyLocations[];
}

const FILTERS = ["all", "hospital", "police", "fire_station"] as const;
type TypeFilter = (typeof FILTERS)[number];

function isTypeFilter(v: string): v is TypeFilter {
  return (FILTERS as readonly string[]).includes(v);
}

function ServiceIcon({ type }: { type: string }) {
  const common = "h-5 w-5";

  if (type === "hospital")
    return <Hospital className={`${common} text-emerald-600 dark:text-emerald-400`} />;

  if (type === "police")
    return <ShieldCheck className={`${common} text-blue-600 dark:text-blue-400`} />;

  if (type === "fire_station")
    return <Flame className={`${common} text-red-600 dark:text-red-400`} />;

}


function TypeBadge({ type }: { type: string }) {
  const label =
    type === "hospital"
      ? "Hospital"
      : type === "police"
        ? "Police"
        : type === "fire_station"
          ? "Fire Station"
          : type;

  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
      {label}
    </span>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
          <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
        </div>
        <div className="h-8 w-24 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
      </div>
    </div>
  );
}

export default function Nearby({ nearbyLocations }: NearbyProps) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return nearbyLocations.filter((item) => {
      const matchQuery =
        !q ||
        item.service_name?.toLowerCase().includes(q) ||
        item.service_type?.toLowerCase().includes(q);

      const matchType =
        typeFilter === "all" ? true : item.service_type === typeFilter;

      return matchQuery && matchType;
    });
  }, [nearbyLocations, query, typeFilter]);

  const [copyIndex, setCopyIndex] = useState<number | null>(null);

  //  shared input style
  const fieldBase =
    "h-11 w-full rounded-xl border text-sm outline-none ring-0 transition " +
    "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 " +
    "focus:border-slate-300 focus:ring-2 focus:ring-slate-100 " +
    "active:border-slate-300 active:ring-2 active:ring-slate-100 " + //  mobile active feedback
    "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 " +
    "dark:focus:border-slate-700 dark:focus:ring-slate-800 " +
    "dark:active:border-slate-700 dark:active:ring-slate-800";

  //  active feel for select on mobile
  const selectActive =
    typeFilter !== "all"
      ? "border-slate-300 ring-2 ring-slate-100 dark:border-slate-700 dark:ring-slate-800"
      : "";

  return (
    <div className="space-y-4">
      {/* Header  */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Nearby Services
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Find nearby emergency and public services quickly.
            </p>
          </div>

          {/* Search + Filter */}
          <div className="flex w-full flex-col gap-2 sm:w-[520px] sm:flex-row">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or type..."
                className={`${fieldBase} pl-10 pr-3`}
              />
            </div>

            {/*  Mobile responsive */}
            <div className="relative w-full sm:w-auto">
              <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <select
                value={typeFilter}
                onChange={(e) => {
                  const v = e.target.value;
                  if (isTypeFilter(v)) setTypeFilter(v);
                }}
                className={`${fieldBase} ${selectActive} appearance-none pl-10 pr-10 sm:w-44`}
              >
                <option value="all">All</option>
                <option value="hospital">Hospital</option>
                <option value="police">Police</option>
                <option value="fire_station">Fire Station</option>
              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                ▾
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-600 dark:text-slate-300" />
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Results
            </h2>
            <span className="rounded-full bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-200">
              {filtered.length}
            </span>
          </div>

          <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
            Tip: Use search to quickly find a service.
          </p>
        </div>

        <div className="mt-4 grid gap-3">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-950">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-slate-900">
                <Search className="h-5 w-5 text-slate-500 dark:text-slate-300" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                No services found
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Try a different keyword or change the filter.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setTypeFilter("all");
                }}
                className="mt-4 inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Reset
              </button>
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={`${item.service_name}-${idx}`}
                className="group max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
              >
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  {/* LEFT */}
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
                      <ServiceIcon type={item.service_type} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <h3 className="min-w-0 flex-1 text-sm font-semibold text-slate-900 dark:text-slate-100 sm:truncate">
                          {item.service_name}
                        </h3>
                        <div className="shrink-0">
                          <TypeBadge type={item.service_type} />
                        </div>
                      </div>

                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Click “View on Map” to open directions.
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex min-w-0 shrink-0 max-w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                    <a
                      href={item.map_link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 w-full max-w-full items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-800 sm:w-auto dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                    >
                      View on Map
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        if (navigator?.clipboard?.writeText) {
                          navigator.clipboard.writeText(item.map_link);
                          setCopyIndex(idx);
                          setTimeout(() => setCopyIndex(null), 1500);
                        }
                      }}
                      className="inline-flex h-10 w-full max-w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 active:scale-[0.99] sm:w-auto dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                      title="Copy map link"
                    >
                      {copyIndex === idx ? "copied" : "copy"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
