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
    <main className="min-h-screen bg-[#030712] text-white overflow-x-hidden relative w-full">
      {/* 🌊 GLOBAL AKIŞKAN ARKA PLAN */}
      <GlobalBackground />

      <Navbar />

      {/* Sayfa İçi Dinamik Hızlı Gezinme Çubuğu */}
      <SectionNavigator />

      {/* Hero Section */}
      <div id="hero">
        <Hero />
      </div>

      {/* 🚀 CANLI ÜRÜN DEMO VİDEOSU SEKSİYONU */}
      <section
        id="demo"
        className="w-full py-20 px-4 sm:px-6 bg-black/40 backdrop-blur-md relative flex flex-col items-center justify-center my-12 border-y border-zinc-800/60 overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[600px] h-[300px] sm:h-[400px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-[1000px] w-full relative z-10 flex flex-col items-center">
          <div className="text-center mb-8 sm:mb-10 space-y-3 px-2">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 bg-blue-950/80 border border-blue-800/50 px-3.5 py-1.5 rounded-full">
              Live Product Demo
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              Operational Control in Action
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto">
              Watch how our narrow control plane blocks unauthorized tool calls,
              prevents PII leakage, and generates readable audit logs in
              real-time.
            </p>
          </div>

          <div className="relative p-[1px] rounded-2xl overflow-hidden shadow-2xl w-full aspect-video group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-emerald-400/30 rounded-2xl" />

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

              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* 🛡️ ENTERPRISE ARCHITECTURE & TRUST TRANSPARENCY (Koyu Uyumlu) */}
      <section className="w-full py-20 px-6 max-w-[1200px] mx-auto z-20 relative my-8">
        <div className="bg-zinc-900/70 backdrop-blur-2xl p-8 sm:p-14 rounded-[2.5rem] border border-zinc-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-blue-400 bg-blue-950/80 border border-blue-800/50 px-3.5 py-1.5 rounded-full">
              Enterprise Trust & Compliance
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mt-5 mb-3 tracking-tight">
              Built for Strict Security Reviews
            </h3>
            <p className="text-zinc-400 text-sm sm:text-base">
              We know what CISO and security teams look for. Here is how
              Aegisora guarantees zero infrastructure compromise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kart 1 */}
            <div className="bg-zinc-950/60 p-7 rounded-2xl border border-zinc-800/80 shadow-sm flex flex-col justify-between hover:border-zinc-700 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold mb-4 font-mono border border-blue-500/20">
                  01
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  Local VPC & Sidecar Proxy
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Aegisora deploys as a lightweight sidecar proxy inside your
                  secure perimeter. Raw payloads and PII never touch external
                  third-party infrastructure.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-900 text-[11px] font-mono text-blue-400 font-semibold">
                ✓ Zero External Leakage
              </div>
            </div>

            {/* Kart 2 */}
            <div className="bg-zinc-950/60 p-7 rounded-2xl border border-zinc-800/80 shadow-sm flex flex-col justify-between hover:border-zinc-700 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold mb-4 font-mono border border-blue-500/20">
                  02
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  Fail-Closed Compliance
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  In the event of a proxy or network disruption, policies
                  strictly default to{" "}
                  <strong className="text-white">fail-closed</strong> for
                  critical security violations to prevent unverified execution.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-900 text-[11px] font-mono text-blue-400 font-semibold">
                ✓ Strict Runtime Enforcements
              </div>
            </div>

            {/* Kart 3 */}
            <div className="bg-zinc-950/60 p-7 rounded-2xl border border-zinc-800/80 shadow-sm flex flex-col justify-between hover:border-zinc-700 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold mb-4 font-mono border border-blue-500/20">
                  03
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  Immutable Audit Logs
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Every tool call, payload interception, and policy decision is
                  recorded into structured, human-readable audit trails for
                  instant SOC2 and ISO compliance reviews.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-900 text-[11px] font-mono text-blue-400 font-semibold">
                ✓ Complete Observability
              </div>
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
