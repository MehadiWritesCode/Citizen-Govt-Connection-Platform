"use client";

import { useRef, useState } from "react";
import SidebarUI from "./SidebarUi";
import TopbarUI from "./TopbarUi";
import MessageListUI from "./MessageListUI";
import ComposerUI from "./ComposerUI";


export default function GovernmentChatUI() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <SidebarUI sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main */}
      <div className="md:pl-72">
        <TopbarUI title="New chat" onMenu={() => setSidebarOpen(true)} />

        <MessageListUI />

        <ComposerUI fileInputRef={fileInputRef} />
      </div>
    </div>
  );
}
