"use client";

import { useEffect, useState } from "react";
import Hero from "./Hero";
import SafetyNavigator from "./SafetyNavigator";
import Departments from "./Departments";
import TrustImpact from "./TrustImpact";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function LandingPage({ lang }: {lang:string}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<"recent" | "resolved">("recent");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-900 font-sans selection:bg-emerald-100">
      <Navbar isScrolled={isScrolled} lang={lang} />
      <Hero activeTab={activeTab} setActiveTab={setActiveTab} />
      <SafetyNavigator />
      <Departments />
      <TrustImpact />
      <Footer />
    </div>
  );
}
