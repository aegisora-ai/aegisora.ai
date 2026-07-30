"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import PrivacyAutopilot from "@/components/PrivacyAutopilot";
import InteractiveAnalysis from "@/components/InteractiveAnalysis";
import PrivateInvestigator from "@/components/PrivateInvestigator";
import ChatMockup from "@/components/ChatMockup";
import SecureByDefault from "@/components/SecureByDefault";
import MadeForAnyone from "@/components/MadeForAnyone";
import Pricing from "@/components/Pricing";
import BlogNews from "@/components/BlogNews";
import Footer from "@/components/Footer";
import GlobalBackground from "@/components/GlobalBackground";
import SectionNavigator from "@/components/ui/SectionNavigator";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f8ff] overflow-x-hidden relative">
      {/* 🌊 TÜM SAYFANIN ARKASINI TEK BLOK YAPAN GLOBAL AKIŞKAN ARKA PLAN */}
      <GlobalBackground />

      <Navbar />

      {/* Sayfa İçi Dinamik Hızlı Gezinme Çubuğu */}
      <SectionNavigator />

      {/* Her section'a id eklendi */}
      <div id="hero">
        <Hero />
      </div>

      <div id="trusted-by">
        <TrustedBy />
      </div>

      <div id="privacy-autopilot">
        <PrivacyAutopilot />
      </div>

      <div id="interactive-analysis">
        <InteractiveAnalysis />
      </div>

      <div id="private-investigator">
        <PrivateInvestigator />
      </div>

      <div id="chat-mockup">
        <ChatMockup />
      </div>

      <div id="secure-by-default">
        <SecureByDefault />
      </div>

      <div id="made-for-anyone">
        <MadeForAnyone />
      </div>

      <div id="pricing">
        <Pricing />
      </div>

      <div id="blog">
        <BlogNews />
      </div>

      <Footer />
    </main>
  );
}
