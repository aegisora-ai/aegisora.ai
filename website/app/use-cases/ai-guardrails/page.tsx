"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AIGuardrailsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />

      <div className="max-w-[1000px] mx-auto px-6 py-20 flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border b order-blue-100 text-[#0066FF] text-[12px] font-bold mb-6">
          <ShieldCheck className="w-3.5 h-3.5" /> Use Cases
        </div>

        <h1 className="text-[44px] md:text-[56px] font-black text-slate-900 tracking-tight mb-6">Real-Time AI Guardrails</h1>
        <p className="text-[18px] text-slate-600 font-medium leading-relaxed mb-10">
          Intercept toxic language, hallucinations, and data leaks instantly before responses reach your end users.
        </p>

        <div className="flex gap-4 mb-16">
          <Link href="/register" className="px-6 py-3.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold rounded-xl transition-colors shado w-sm flex items-center gap-2">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-6">
          {[
            { title: "Dynamic Toxicity Filtering", desc: "Block offensive content, hate speech, and brand-damaging outputs using high-speed classification models." },
            { title: "Hallucination Detection", desc: "Verify model outputs against your trusted knowledge bases to ensure factual accuracy." },
            { title: "Deterministic Output Formatting", desc: "Ensure your LLMs always respond in strict JSON or required structural schemas." }
          ].map((item, idx) => (
            <div key={idx} className="p-6 border b order-slate-200 rounded-2xl bg-[#FAFAFA] flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-[#0066FF] shrink-0 mt-1" />
              <div>
                <h3 className="text-[18px] font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-[15px] text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </div>
  );
}
