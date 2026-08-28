"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Server, Shield, Zap } from "lucide-react";

export default function StatusPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] font-sans">
      <Navbar />

      <div className="max-w-[900px] mx-auto px-6 py-20 flex-1">

        {/* Banner */}
        <div className="bg-emerald-50 border b order-emerald-200 rounded-2xl p-6 mb-10 flex items-center gap-4 shado w-sm">
           <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white shrink-0 shado w-md">
             <CheckCircle2 className="w-7 h-7" />
           </div>
           <div>
             <h1 className="text-[20px] font-black text-emerald-900">All Systems Operational</h1>
             <p className="text-[14px] text-emerald-700 font-medium">100% uptime across all global gateway regions over the past 90 days.</p>
           </div>
        </div>

        {/* Services List */}
        <div className="bg-white border b order-slate-200 rounded-2xl shado w-sm overflo w-hidden mb-12">
           <div className="px-6 py-4 bg-slate-50 b order-b b order-slate-200 font-bold text-[13px] text-slate-700 uppercase tracking-wider">
              Core Infrastructure Services
           </div>
           <div className="divide-y divide-slate-100">
              {[
                { name: "Global Runtime Gateway (EU)", uptime: "99.99%", latency: "14ms" },
                { name: "Global Runtime Gateway (US)", uptime: "100.0%", latency: "22ms" },
                { name: "Policy Evaluation Engine", uptime: "99.99%", latency: "4ms" },
                { name: "Control Plane API", uptime: "99.95%", latency: "65ms" },
                { name: "Enterprise Audit Ledger", uptime: "100.0%", latency: "30ms" },
              ].map((service, idx) => (
                <div key={idx} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                   <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                      <span className="text-[15px] font-bold text-slate-900">{service.name}</span>
                   </div>
                   <div className="flex items-center gap-8 text-[13px] font-mono">
                      <span className="text-slate-500">Latency: <strong className="text-slate-900">{service.latency}</strong></span>
                      <span className="text-emerald-600 font-bold">{service.uptime} Uptime</span>
                   </div>
                </div>
              ))}
           </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
