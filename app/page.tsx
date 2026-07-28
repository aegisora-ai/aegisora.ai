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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f8ff] overflow-x-hidden relative">
      {/* 🌊 TÜM SAYFANIN ARKASINI TEK BLOK YAPAN GLOBAL AKIŞKAN ARKA PLAN */}
      <GlobalBackground />

      <Navbar />

      {/* AiChatButton buradan tamamen kaldırıldı! Artık sadece Dashboard'da kullanılacak. */}

      <Hero />
      <TrustedBy />
      <PrivacyAutopilot />
      <InteractiveAnalysis />
      <PrivateInvestigator />
      <ChatMockup />
      <SecureByDefault />
      <MadeForAnyone />
      <Pricing />
      <BlogNews />
      <Footer />
    </main>
  );
}
