"use client";
import { useEffect, useState } from "react";
import Hero from "./Hero";
import SafetyNavigator from "./SafetyNavigator";
import Departments from "./Departments";
import TrustImpact from "./TrustImpact";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Dictionary } from "../../dict_interface/dict_interface";


interface landingInterface {
       lang:string,
       dict:Dictionary
}

export default  function LandingPage({ lang ,dict }:landingInterface) {

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<"recent" | "resolved">("recent");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-900 font-sans selection:bg-emerald-100">
      <Navbar isScrolled={isScrolled} lang={lang} dict={dict.landingPage.navbar}/>
      <Hero activeTab={activeTab} setActiveTab={setActiveTab} dict={dict.landingPage.hero} />
      <SafetyNavigator dict={dict.landingPage.safetyNavigator}/>
      <Departments />
      <TrustImpact />
      <Footer />
    </div>
  );
}
