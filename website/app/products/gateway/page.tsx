"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Zap, ArrowRight, Code, Cpu } from "lucide-react";
import Link from "next/link";

export default function RuntimeGatewayPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />

      <div className="max-w-[1000px] mx-auto px-6 py-20 flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border b order-blue-100 text-[#0066FF] text-[12px] font-bold mb-6">
          <Cpu className="w-3.5 h-3.5" /> Products
        </div>

        <h1 className="text-[44px] md:text-[56px] font-black text-slate-900 tracking-tight mb-6">Aegisora Runtime Gateway</h1>
        <p className="text-[18px] text-slate-600 font-medium leading-relaxed mb-10">
          The ultra-fast, deterministic security proxy sitting between your AI applications and LLM providers.
        </p>

        <div className="flex gap-4 mb-16">
          <Link href="/register" className="px-6 py-3.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold rounded-xl transition-colors shado w-sm flex items-center gap-2">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/docs" className="px-6 py-3.5 bg-white border b order-slate-200 hover:bg-slate-50 text-slate-900 font-bold rounded-xl transition-colors">
            Read Docs
          </Link>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-2xl shado w-xl border b order-slate-800 mb-12">
          <h3 className="text-[20px] font-bold mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-amber-400"/> Sub-10ms Overhead</h3>
          <p className="text-slate-400 text-[15px] leading-relaxed">Written entirely in Rust and optimized for edge environments, Aegisora Gateway adds negligible latency to your LLM pipeline while enforcing hundreds of enterprise rules.</p>
        </div>

      </div>
      <Footer />
    </div>
  );
}
