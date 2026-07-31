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

      {/* 🚀 REDDIT GERİ BİLDİRİMİ İÇİN EKLENEN CANLI ÜRÜN DEMO VİDEOSU SEKSİYONU */}
      <section
        id="demo"
        className="w-full py-20 px-6 bg-black/90 relative flex flex-col items-center justify-center my-12 border-y border-zinc-800/80"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-[1000px] w-full relative z-10 flex flex-col items-center">
          <div className="text-center mb-10 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 bg-blue-950/60 border border-blue-800/60 px-3 py-1 rounded-full">
              Live Product Demo
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              See Aegisora in Action
            </h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto">
              Watch how our Zero-Trust proxy intercepts malicious payloads and
              enforces AI governance in real-time.
            </p>
          </div>

          {/* Video Konteyneri - Şık Kenarlık ve Gölge Efektiyle */}
          <div className="relative p-[1px] rounded-2xl overflow-hidden shadow-2xl w-full aspect-video group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-emerald-400/40 rounded-2xl" />

            <div className="relative w-full h-full bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800/80 flex items-center justify-center">
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Üst yansıma detayı */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

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
