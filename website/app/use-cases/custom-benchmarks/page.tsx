"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BarChart3, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CustomBenchmarksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />

      <div className="max-w-[1000px] mx-auto px-6 py-20 flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border b order-blue-100 text-[#0066FF] text-[12px] font-bold mb-6">
          <BarChart3 className="w-3.5 h-3.5" /> Use Cases
        </div>

        <h1 className="text-[44px] md:text-[56px] font-black text-slate-900 tracking-tight mb-6">Custom Benchmarks</h1>
        <p className="text-[18px] text-slate-600 font-medium leading-relaxed mb-10">
          Measure model drift, accuracy, and safety against your enterprise-specific evaluation suites before every deployment.
        </p>

        <div className="flex gap-4 mb-16">
          <Link href="/register" className="px-6 py-3.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold rounded-xl transition-colors shado w-sm flex items-center gap-2">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-6">
          {[
            { title: "Domain-Specific Safety Scoring", desc: "Test your LLMs against proprietary regulatory standards and industry-specific compliance rubrics." },
              { title: "Automated Regression Testing", desc: "Catch unexpected behavioral shifts in foundation models when providers update their weights." },
              { title: "Continuous CI/CD Integration", desc: "Trigger benchmark suites automatically via GitHub Actions prior to merging agentic code updates." }
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
