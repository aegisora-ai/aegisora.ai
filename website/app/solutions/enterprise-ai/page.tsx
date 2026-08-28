"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase, ShieldAlert, Zap, Layers, CheckCircle2 } from "lucide-react";

export default function EnterpriseAIPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-6 overflo w-hidden b order-b b order-slate-200">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0066FF10_1px,transparent_1px),linear-gradient(to_bottom,#0066FF10_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="max-w-[1200px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border b order-slate-200 bg-white shado w-sm mb-6">
              <Briefcase className="w-4 h-4 text-[#0066FF]" />
              <span className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">For Large Enterprises</span>
            </div>
            <h1 className="text-[48px] md:text-[64px] font-black text-slate-900 tracking-[-0.03em] leading-tight mb-6">
              Deploy Generative AI <br/>With Confidence
            </h1>
            <p className="text-[18px] text-slate-600 font-medium leading-relaxed mb-8">
              Aegisora provides the missing governance layer for enterprise AI. Centralize policy enforcement, redact sensitive data, and monitor thousands of agents from a single control plane.
            </p>
            <div className="flex items-center gap-4">
              <button className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors shado w-lg">Contact Sales</button>
              <button className="px-6 py-3.5 bg-white border b order-slate-200 hover:bg-slate-50 text-slate-900 font-bold rounded-lg transition-colors">Read the Whitepaper</button>
            </div>
          </div>

          <div className="relative h-[400px] bg-slate-900 rounded-2xl shado w-2xl border b order-slate-800 p-8 flex flex-col justify-center gap-6 overflo w-hidden">
             {/* Mockup Dashboard UI */}
             <div className="flex justify-between items-center pb-4 b order-b b order-slate-800">
                <span className="text-white font-bold">Live Risk Monitoring</span>
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded">SYSTEM OPTIMAL</span>
             </div>
             <div className="flex gap-4">
                <div className="flex-1 bg-white/5 border b order-white/10 p-4 rounded-xl">
                   <div className="text-slate-400 text-[11px] font-bold mb-1">PII BLOCKED</div>
                   <div className="text-white text-[24px] font-black">1.2M</div>
                </div>
                <div className="flex-1 bg-white/5 border b order-white/10 p-4 rounded-xl">
                   <div className="text-slate-400 text-[11px] font-bold mb-1">ACTIVE AGENTS</div>
                   <div className="text-white text-[24px] font-black">340</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 px-6 bg-[#FAFAFA]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-black text-slate-900 tracking-tight mb-4">Enterprise-Grade Controls</h2>
            <p className="text-[18px] text-slate-600 max-w-2xl mx-auto">Designed for CISO approval. Built for developer velocity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border b order-slate-200 rounded-2xl shado w-sm">
              <ShieldAlert className="w-8 h-8 text-[#0066FF] mb-6" />
              <h3 className="text-[20px] font-bold text-slate-900 mb-3">Centralized Policy Engine</h3>
              <p className="text-[15px] text-slate-600 leading-relaxed">Update safety rules across all your company's AI applications instantly without redeploying code.</p>
            </div>
            <div className="bg-white p-8 border b order-slate-200 rounded-2xl shado w-sm">
              <Zap className="w-8 h-8 text-[#0066FF] mb-6" />
              <h3 className="text-[20px] font-bold text-slate-900 mb-3">Ultra-Low Latency</h3>
              <p className="text-[15px] text-slate-600 leading-relaxed">Rust-based proxy architecture ensures sub-10ms overhead on your API calls. Your users won't notice a thing.</p>
            </div>
            <div className="bg-white p-8 border b order-slate-200 rounded-2xl shado w-sm">
              <Layers className="w-8 h-8 text-[#0066FF] mb-6" />
              <h3 className="text-[20px] font-bold text-slate-900 mb-3">Provider Agnostic</h3>
              <p className="text-[15px] text-slate-600 leading-relaxed">Switch between OpenAI, Anthropic, or self-hosted open-source models without changing your security posture.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
