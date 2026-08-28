"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Lock, Cpu, Server, CheckCircle2 } from "lucide-react";

export default function SecurityArchitecturePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />

      <div className="max-w-[1000px] mx-auto px-6 py-20 flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border b order-blue-100 text-[#0066FF] text-[12px] font-bold mb-6">
          <Shield className="w-3.5 h-3.5" /> Security
        </div>

        <h1 className="text-[44px] font-black text-slate-900 tracking-tight mb-6">Enterprise Security Architecture</h1>
        <p className="text-[18px] text-slate-600 font-medium leading-relaxed mb-12">
          Aegisora is architected from the ground up to protect enterprise AI workflows without introducing latency bottlenecks or compromising data sovereignty.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 border b order-slate-200 rounded-2xl bg-[#FAFAFA]">
            <Lock className="w-8 h-8 text-[#0066FF] mb-4" />
            <h3 className="text-[20px] font-bold text-slate-900 mb-2">In-Memory Processing</h3>
            <p className="text-[15px] text-slate-600 leading-relaxed">All LLM inputs and outputs are inspected in volatile memory. No user payloads are ever persisted to disk or used for training.</p>
          </div>
          <div className="p-8 border b order-slate-200 rounded-2xl bg-[#FAFAFA]">
            <Server className="w-8 h-8 text-[#0066FF] mb-4" />
            <h3 className="text-[20px] font-bold text-slate-900 mb-2">Edge Deployment</h3>
            <p className="text-[15px] text-slate-600 leading-relaxed">Deploy Aegisora runtime proxies as sidecars inside your own VPC or Kubernetes cluster for absolute data locality.</p>
          </div>
        </div>

        <h3 className="text-[24px] font-bold text-slate-900 mb-6">Defense in Depth Layers</h3>
        <div className="space-y-4">
          {[
            { title: "Layer 1: Prompt Injection & Jailbreak Defense", desc: "Heuristic and ML-based models block adversarial attacks before they reach the provider." },
            { title: "Layer 2: Real-time PII & Secret Redaction", desc: "Microsoft Presidio and custom regex engines strip sensitive tokens on the fly." },
            { title: "Layer 3: Cryptographic Audit Ledger", desc: "Every validation decision is cryptographically signed and streamed to your SIEM." }
          ].map((layer, idx) => (
            <div key={idx} className="p-6 border b order-slate-200 rounded-xl flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[16px] font-bold text-slate-900 mb-1">{layer.title}</h4>
                <p className="text-[14px] text-slate-600">{layer.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </div>
  );
}
