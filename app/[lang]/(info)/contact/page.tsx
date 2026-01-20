"use client";
import Image from "next/image";
import { useMemo, useState } from "react";

type Contact = {
  name: string;
  number: string;
  note?: string;
  tag?: string;
};

type Section = {
  title: string;
  icon: string;
  description?: string;
  contacts: Contact[];
};

const sections: Section[] = [
  {
    title: "Emergency Services",
    icon: "🚨",
    description: "Nationwide emergency and rapid response lines.",
    contacts: [
      {
        name: "National Emergency Service",
        number: "999",
        note: "Police • Fire • Ambulance",
        tag: "Primary",
      },
      { name: "Fire Service", number: "199", tag: "Fire" },
      { name: "Ambulance", number: "106", tag: "Medical" },
    ],
  },
  {
    title: "Police & Safety",
    icon: "👮",
    description: "Reporting, protection, and specialized support.",
    contacts: [
      {
        name: "Police (via National Emergency)",
        number: "999",
        note: "Report crime or urgent threats",
        tag: "Police",
      },
      { name: "Women & Child Helpline", number: "109", tag: "Support" },
      { name: "Cyber Crime Help", number: "121", tag: "Cyber" },
    ],
  },
  {
    title: "Health & Medical",
    icon: "🏥",
    description: "Health advice lines and medical assistance.",
    contacts: [
      { name: "Health Service (Shastho Batayon)", number: "16263", tag: "Health" },
      {
        name: "Govt Information/Help",
        number: "333",
        note: "General public service information",
        tag: "Info",
      },
      { name: "Blood / Medical Help", number: "106", tag: "Medical" },
    ],
  },
  {
    title: "Utilities & Public Services",
    icon: "⚡",
    description: "Common utility complaint lines (extend by provider/region).",
    contacts: [{ name: "Electricity Complaint", number: "16116", tag: "Utility" }],
  },
];

const filterOptions = [
  "All",
  "Primary",
  "Police",
  "Fire",
  "Medical",
  "Health",
  "Support",
  "Cyber",
  "Utility",
  "Info",
] as const;

type Filter = (typeof filterOptions)[number];

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950 " +
        (active
          ? "bg-emerald-600 text-white ring-emerald-600 dark:bg-emerald-500 dark:ring-emerald-400"
          : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900/60 dark:text-slate-200 dark:ring-slate-800 dark:hover:bg-slate-900")
      }
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-inset ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
      {children}
    </span>
  );
}

function CallButton({
  number,
  variant,
}: {
  number: string;
  variant?: "primary" | "subtle";
}) {
  const isPrimary = variant === "primary";
  return (
    <a
      href={`tel:${number}`}
      className={
        "inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950 " +
        (isPrimary
          ? "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          : "bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900/60 dark:text-slate-100 dark:ring-slate-800 dark:hover:bg-slate-900")
      }
      aria-label={`Call ${number}`}
    >
      Call {number}
    </a>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-slate-200 dark:bg-slate-900/60 dark:ring-slate-800">
      <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
        {value}
      </div>
    </div>
  );
}

export default function EmergencyContactsPreview() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const { filteredSections, totalContacts } = useMemo(() => {
    const q = query.trim().toLowerCase();

    const matches = (c: Contact, sectionTitle: string) => {
      const inSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.number.includes(q) ||
        (c.note ?? "").toLowerCase().includes(q) ||
        (c.tag ?? "").toLowerCase().includes(q) ||
        sectionTitle.toLowerCase().includes(q);

      const inFilter = filter === "All" ? true : (c.tag ?? "") === filter;
      return inSearch && inFilter;
    };

    const next = sections
      .map((s) => ({
        ...s,
        contacts: s.contacts.filter((c) => matches(c, s.title)),
      }))
      .filter((s) => s.contacts.length > 0);

    const count = next.reduce((acc, s) => acc + s.contacts.length, 0);
    return { filteredSections: next, totalContacts: count };
  }, [query, filter]);

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-sm overflow-hidden bg-white/80 dark:bg-slate-900
                              flex items-center justify-center ring-1 ring-slate-200 dark:ring-slate-800"
                      >
                        <Image
                          src="/images/logo.png"
                          alt="App Logo"
                          width={36}
                          height={36}
                          className="object-contain"
                          priority
                        />
                      </div>

            <div className="leading-tight">
              <div className="text-sm font-semibold">Emergency Contacts</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Bangladesh helpline directory
              </div>
            </div>
          </div>

          <a
            href="tel:999"
            className="hidden rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-2 focus:ring-offset-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:ring-offset-slate-950 sm:inline-flex"
          >
            Call 999
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.04)] ring-1 ring-slate-200 sm:p-8 dark:bg-slate-900/60 dark:ring-slate-800">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Bangladesh Emergency Helplines
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              Quick access to essential services. Use search or filters to find the
              right hotline. Tap a button to call instantly.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <a
              href="tel:999"
              className="group rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100 transition hover:bg-emerald-100/60 dark:bg-emerald-500/10 dark:ring-emerald-500/20 dark:hover:bg-emerald-500/15"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Call 999
                  </div>
                  <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    Police • Fire • Ambulance
                  </div>
                </div>
                <span className="text-lg" aria-hidden>
                  🚨
                </span>
              </div>
              <div className="mt-3 text-xs font-medium text-emerald-700 group-hover:text-emerald-800 dark:text-emerald-300 dark:group-hover:text-emerald-200">
                Recommended for emergencies
              </div>
            </a>

            <a
              href="tel:199"
              className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 transition hover:bg-slate-100/60 dark:bg-slate-900/40 dark:ring-slate-800 dark:hover:bg-slate-900/60"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">Call 199</div>
                  <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    Fire Service
                  </div>
                </div>
                <span className="text-lg" aria-hidden>
                  🔥
                </span>
              </div>
            </a>

            <a
              href="tel:106"
              className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 transition hover:bg-slate-100/60 dark:bg-slate-900/40 dark:ring-slate-800 dark:hover:bg-slate-900/60"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">Call 106</div>
                  <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    Ambulance
                  </div>
                </div>
                <span className="text-lg" aria-hidden>
                  🏥
                </span>
              </div>
            </a>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <StatPill label="Available sections" value={`${filteredSections.length}`} />
            <StatPill label="Visible contacts" value={`${totalContacts}`} />
            <StatPill label="Primary emergency" value="999" />
          </div>
        </div>
      </section>

      {/* Controls + Directory */}
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-5 ring-1 ring-slate-200 sm:p-6 dark:bg-slate-900/60 dark:ring-slate-800">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Search
              </label>
              <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200 dark:bg-slate-950/40 dark:ring-slate-800">
                <span className="text-slate-400" aria-hidden>
                  🔎
                </span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by service name, number, or keyword"
                  className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="rounded-xl px-2 py-1 text-xs font-medium text-slate-500 hover:bg-white hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200"
                  >
                    Clear
                  </button>
                ) : null}
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  Filter by tag
                </div>
                <button
                  type="button"
                  onClick={() => setFilter("All")}
                  className="text-xs font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
                >
                  Reset
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 p-3">
                {filterOptions.map((f) => (
                  <Chip key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6">
            {filteredSections.map((section) => (
              <div
                key={section.title}
                className="rounded-3xl bg-[#FAFBFC] p-5 ring-1 ring-slate-200/70 dark:bg-slate-950/30 dark:ring-slate-800"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl" aria-hidden>
                        {section.icon}
                      </span>
                      <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                        {section.title}
                      </h2>
                    </div>
                    {section.description ? (
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        {section.description}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.contacts.map((c) => {
                    const isPrimary = c.number === "999" && c.tag === "Primary";
                    return (
                      <div
                        key={`${section.title}-${c.name}-${c.number}`}
                        className="flex flex-col justify-between rounded-3xl bg-white p-4 shadow-[0_1px_0_rgba(15,23,42,0.04)] ring-1 ring-slate-200 dark:bg-slate-900/70 dark:ring-slate-800"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                {c.name}
                              </div>
                              <div className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
                                <span className="font-semibold text-slate-900 dark:text-slate-100">
                                  {c.number}
                                </span>
                              </div>
                            </div>
                            {c.tag ? <Badge>{c.tag}</Badge> : null}
                          </div>
                          {c.note ? (
                            <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                              {c.note}
                            </p>
                          ) : null}
                        </div>

                        <div className="mt-4">
                          <CallButton number={c.number} variant={isPrimary ? "primary" : "subtle"} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {filteredSections.length === 0 ? (
              <div className="rounded-3xl bg-white p-10 text-center ring-1 ring-slate-200 dark:bg-slate-900/60 dark:ring-slate-800">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  No results found
                </div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Try a different keyword or reset filters.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setFilter("All");
                  }}
                  className="mt-4 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400/40 focus:ring-offset-2 focus:ring-offset-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus:ring-offset-slate-950"
                >
                  Reset
                </button>
              </div>
            ) : null}
          </div>

          {/* Footer note */}
          <div className="mt-8 rounded-3xl bg-white p-5 text-sm text-slate-600 ring-1 ring-slate-200 dark:bg-slate-900/60 dark:text-slate-300 dark:ring-slate-800">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Implementation note
            </p>
            <p className="mt-1 leading-6">
              In your platform, you can auto-detect user location to show nearby hospitals, police stations,
              and fire service units, and add a “Report Incident” CTA that opens your report flow with GPS + media.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/90 p-3 backdrop-blur sm:hidden dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto max-w-6xl px-1">
          <a
            href="tel:999"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-2 focus:ring-offset-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:ring-offset-slate-950"
          >
            Call 999 (Emergency)
          </a>
        </div>
      </div>

      {/* Bottom spacing for mobile sticky bar */}
      <div className="h-16 sm:hidden" />
    </main>
  );
}
