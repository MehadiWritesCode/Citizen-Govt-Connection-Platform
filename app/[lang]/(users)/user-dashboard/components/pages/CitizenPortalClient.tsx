"use client";

import {  useRef, useState } from "react";
import { Bell, ChevronDown, Plus, ShieldCheck, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { User} from "lucide-react";
import { Report, Status, View } from "../../types";
import { useToasts } from "../../hooks/useToasts";
import { nextReportId } from "../../lib/report";
import ToastStack from "../ui/ToastStack";
import { ModeToggleBtn } from "../../../../../componentsUi/client/ThemeToogleBtn";
import Brand from "../layout/Brand";
import SideNav from "../layout/SideNav";
import Dashboard from "./Dashboard";
import NewReport from "./NewReport";
import MyReports from "./MyReports";
import Nearby from "./Nearby";
import Profile from "./Profile";
import SettingsPage from "./SettingsPage";
import Help from "./Help";
import Footer from "../layout/Footer";
import { LogoutModal } from "../ui/LogoutModal";
import AIChatWidget from "../ui/FloatingAiWindgets";
import Drawer from "../ui/Drawer";
import ReportDetails from "../ui/ReportDetails";
import PagePath from "../layout/PagePath";
import { viewTitle } from "../../lib/util";

interface NearbyLocation {
  service_name: string;
  service_type: string;
  map_link: string;
}
interface Props {
  userName:string
  nearbyLocations:NearbyLocation[]
}
export default function CitizenPortalMVP({userName,nearbyLocations}:Props) {

  const [view, setView] = useState<View>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { toasts, push, remove } = useToasts();

  const [reports, setReports] = useState<Report[]>([
    {
      id: "RC-1001",
      category: "Road",
      location: "Jessore Sadar",
      details: "Road broken near bridge. Needs quick repair.",
      createdAt: new Date("2026-01-19T09:10:00.000Z").toISOString(),
      status: "In Progress",
    },
  ]);

  const [selected, setSelected] = useState<Report | null>(null);

  function submitReport(data: Omit<Report, "id" | "createdAt" | "status">) {
    const id = nextReportId(reports);
    const newReport: Report = {
      id,
      createdAt: new Date().toISOString(),
      status: "Pending",
      ...data,
    };
    setReports((prev) => [newReport, ...prev]);
    push({ title: "Report submitted", message: `${id} created.` });
    setView("reports");
  }

  //logout handler
  const [open,setOpen] = useState<boolean>(false);

  function logout() {
    setOpen(true);

  }

  function updateReportStatus(id: string, status: Status) {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    push({ title: "Status updated", message: `${id} → ${status}` });
  }

  //language toogle
  const router = useRouter();
  const pathName = usePathname();
  const [openLang, setOpenLang] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);

  // handle language change
  const handleLanguageChange = (newLanguage: string) => {
    if (!pathName) return;

    const segments = pathName.split("/");
    segments[1] = newLanguage;
    const newPath = segments.join("/");

    router.push(newPath);
    setOpenLang(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <ToastStack toasts={toasts} onClose={remove} />

      {/* Utility strip */}
      <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              Citizen Government Connection Platform
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline hover:underline">Support: 999</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setOpenLang((s) => !s)}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 dark:text-slate-200 dark:ring-slate-800 dark:hover:bg-slate-900"
              >
                🌐 <span className="text-slate-700">language▾</span>
              </button>

              {openLang && (
                <div className="absolute right-0 mt-2 z-50 w-48 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">
                  <button
                    onClick={() => handleLanguageChange("bn")}
                    className="flex w-full items-center justify-between px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
                  >
                    বাংলা <span className="text-xs text-slate-400">BN</span>
                  </button>
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className="flex w-full items-center justify-between px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
                  >
                    English <span className="text-xs text-slate-400">EN</span>
                  </button>
                </div>
              )}
            </div>

            <ModeToggleBtn/>

          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50 active:bg-slate-100
                       dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:active:bg-slate-700"
            aria-label="Open menu"
          >
            ☰
          </button>

          <Brand />

          <div className="ml-auto flex items-center gap-2">
            <button
              className="hidden md:flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50 active:bg-slate-100
                         dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:active:bg-slate-700"
              onClick={() => setView("new")}
            >
              <Plus className="h-4 w-4" />
              New report
            </button>

            <button
              className="relative rounded-md border border-slate-200 bg-white p-2 hover:bg-slate-50 active:bg-slate-100
                         dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:active:bg-slate-700"
              aria-label="Notifications"
              title="Notifications"
              onClick={() =>
                push({ title: "Notifications", message: "Demo only." })
              }
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-rose-600 text-[10px] font-bold text-white">
                2
              </span>
            </button>

            <button
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50 active:bg-slate-100
                         dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:active:bg-slate-700"
              onClick={() => setView("profile")}
              aria-label="Profile"
            >
              {/* <span className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-700" /> */}
              <User className="rounded-full h-5 w-5"/>
              <span className="hidden sm:inline">{userName}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Layout */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-6 md:grid-cols-[240px_1fr]">
        <aside className="hidden md:block">
          <SideNav view={view} setView={setView} onLogout={logout} />
        </aside>

        <main className="min-w-0">
        <PagePath current={viewTitle(view)} />

          <div className="mt-3 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="p-4 sm:p-6">
              {view === "dashboard" && (
                <Dashboard
                  setView={setView}
                  reports={reports}
                  onOpenReport={(r) => setSelected(r)}
                />
              )}

              {view === "new" && (
                <NewReport
                  onSubmit={submitReport}
                  onBack={() => setView("dashboard")}
                />
              )}

              {view === "reports" && (
                <MyReports reports={reports} onOpen={(r) => setSelected(r)} />
              )}

              {view === "nearby" && <Nearby nearbyLocations={nearbyLocations} />}

              {view === "profile" && (
                <Profile/>
              )}

              {view === "settings" && (
                <SettingsPage />
              )}

              {view === "help" && <Help />}
            </div>
          </div>

          <Footer />
        </main>
      </div>

      {/* Mobile nav drawer */}
      {sidebarOpen ? (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setSidebarOpen(false)}
          />

          <div
            className="fixed left-0 top-0 z-50 h-full w-[290px] border-r border-slate-200 bg-white
                          dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-3 dark:border-slate-800">
              <Brand compact />
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 active:bg-slate-200
                           dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-3">
              <SideNav
                view={view}
                setView={(v) => {
                  setView(v);
                  setSidebarOpen(false);
                }}
                onLogout={logout}
              />
            </div>
          </div>
        </div>
      ) : null}


      {/* logout modal */}
      {open && <LogoutModal setOpen={setOpen} />}


      {/* Floating ai Widgets */}
      <AIChatWidget />

      {/* Report details drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? selected.id : ""}
      >
        {selected ? (
          <ReportDetails
            report={selected}
            onUpdateStatus={updateReportStatus}
          />
        ) : null}
      </Drawer>
    </div>
  );
}
