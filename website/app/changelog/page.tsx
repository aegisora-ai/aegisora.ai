"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Rss, Sparkles } from "lucide-react";

export default function ChangelogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />

      <div className="max-w-[800px] mx-auto px-6 py-20 flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border b order-blue-100 text-[#0066FF] text-[12px] font-bold mb-6">
          <Rss className="w-3.5 h-3.5" /> Changelog
        </div>

        <h1 className="text-[44px] font-black text-slate-900 tracking-tight mb-4">Product Updates</h1>
        <p className="text-[18px] text-slate-600 font-medium mb-16">Latest releases, SDK improvements, and platform security enhancements.</p>

        <div className="space-y-16 b order-l-2 b order-slate-100 pl-8 ml-4">

          <div className="relative">
            <span className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-[#0066FF] b order-4 b order-white shado w-sm"></span>
            <div className="text-[13px] font-bold text-[#0066FF] uppercase tracking-wider mb-2">August 28, 2026</div>
            <h3 className="text-[22px] font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" /> V2.4 Enterprise Control Plane & Live Monitor
            </h3>
            <p className="text-[15px] text-slate-600 leading-relaxed mb-4">
              We are releasing the fully upgraded Enterprise Control Plane featuring real-time telemetry streaming, multi-region gateway failovers, and custom fuzzy matching ban lists.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[14px] text-slate-700">
              <li>Sub-10ms Rust proxy optimizations in EU and US regions.</li>
              <li>New Role-Based Access Control (RBAC) configurations for teams.</li>
              <li>Enhanced audit log immutable ledger exports.</li>
            </ul>
          </div>

          <div className="relative">
            <span className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-slate-300 b order-4 b order-white shado w-sm"></span>
            <div className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2">August 10, 2026</div>
            <h3 className="text-[22px] font-bold text-slate-900 mb-3">V2.3 Node.js & Python SDK Updates</h3>
            <p className="text-[15px] text-slate-600 leading-relaxed mb-4">
              Major stability updates to `@aegisora/node` and `aegisora-ai` Python packages. Added native support for LangChain and LlamaIndex middleware wrappers.
            </p>
          </div>

        </div>

      </div>
      <Footer />
    </div>
  );
}
