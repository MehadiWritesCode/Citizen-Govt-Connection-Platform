"use client";

import {
  LayoutDashboard,
  Plus,
  ClipboardList,
  MapPin,
  User,
  Settings,
  FileText,
  LogOut,
} from "lucide-react";

import type { View } from "../../types";
import NavItem from "./NavItem";

export default function SideNav({
  view,
  setView,
  onLogout,
}: {
  view: View;
  setView: (v: View) => void;
  onLogout: () => void;
}) {
  return (
    <nav className="rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900">
      <div className="px-2 py-2">
        <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
          MENU
        </div>
      </div>

      <div className="space-y-1">
        <NavItem
          icon={<LayoutDashboard className="h-4 w-4" />}
          label="Dashboard"
          active={view === "dashboard"}
          onClick={() => setView("dashboard")}
        />
        <NavItem
          icon={<Plus className="h-4 w-4" />}
          label="New Report"
          active={view === "new"}
          onClick={() => setView("new")}
        />
        <NavItem
          icon={<ClipboardList className="h-4 w-4" />}
          label="My Reports"
          active={view === "reports"}
          onClick={() => setView("reports")}
        />
        <NavItem
          icon={<MapPin className="h-4 w-4" />}
          label="Nearby"
          active={view === "nearby"}
          onClick={() => setView("nearby")}
        />

        <div className="my-2 h-px bg-slate-200 dark:bg-slate-700" />

        <NavItem
          icon={<User className="h-4 w-4" />}
          label="Profile"
          active={view === "profile"}
          onClick={() => setView("profile")}
        />
        <NavItem
          icon={<Settings className="h-4 w-4" />}
          label="Settings"
          active={view === "settings"}
          onClick={() => setView("settings")}
        />
        <NavItem
          icon={<FileText className="h-4 w-4" />}
          label="Help"
          active={view === "help"}
          onClick={() => setView("help")}
        />

        <NavItem
          icon={<LogOut className="h-4 w-4" />}
          label="Logout"
          danger
          onClick={onLogout}
        />
      </div>
    </nav>
  );
}
