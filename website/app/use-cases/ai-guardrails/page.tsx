"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, ShieldCheck, Activity, Layers, CheckCircle2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const AnimatedBlueWave = () => (
  <div className="absolute inset-0 overflow-hidden bg-white">
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes gradientMesh {
        0% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(8%, -8%) scale(1.15); }
        66% { transform: translate(-8%, 8%) scale(0.85); }
        100% { transform: translate(0, 0) scale(1); }
      }
      .mesh-blob { animation: gradientMesh 18s infinite alternate ease-in-out; }
    `}} />
    <div className="absolute inset-0" style={{ backgroundColor: '#ffffff', backgroundImage: 'radial-gradient(circle, #000000 1.5px, #ffffff 2px)', backgroundSize: '10px 10px', backgroundPosition: 'center'}}></div>
    <div className="absolute inset-0 mix-blend-screen filter blur-[60px] opacity-90">
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#0066FF] rounded-full mesh-blob"></div>
      <div className="absolute top-[20%] right-[-20%] w-[80%] h-[80%] bg-[#33CCFF] rounded-full mesh-blob" style={{animationDelay: '-6s'}}></div>
    </div>
    <svg className="absolute inset-0 w-full h-full opacity-[0.25] pointer-events-none mix-blend-multiply"><filter id="grainy-noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#grainy-noise)" /></svg>
  </div>
);export default function AIGuardrails() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />
      <main className="flex-1">
        <section className="pt-24 pb-0 bg-white overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white shadow-sm mb-8">
              <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center"><ShieldCheck className="w-3.5 h-3.5 text-blue-600" /></div>
              <span className="text-[14px] font-semibold text-slate-700 tracking-tight">AI Guardrails</span>
            </div>
            <h1 className="text-[52px] sm:text-[72px] md:text-[88px] font-black text-slate-900 leading-[0.95] tracking-[-0.04em] mb-6 max-w-4xl mx-auto">
              Real-time Protection <br/> for Gen AI
            </h1>
            <p className="text-[20px] md:text-[24px] text-slate-600 leading-snug max-w-3xl mx-auto mb-16 font-medium tracking-tight">
              Mitigate Gen AI risks with Aegisora. Enforce strict safety policies, block PII, and prevent hallucinations instantly.
            </p>
          </div>
          <div className="w-full relative h-[300px] border-y border-slate-200 overflow-hidden bg-white flex items-center justify-center">
              <AnimatedBlueWave />
              {/* Security Mockup */}
              <div className="relative z-10 w-full max-w-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col gap-3">
                 <div className="flex justify-between items-center p-3 border border-emerald-200 bg-emerald-50 rounded-lg">
                    <div className="font-bold text-slate-900 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-600"/> PII Detection</div>
                    <div className="text-[10px] bg-emerald-200 text-emerald-800 font-bold px-2 py-1 rounded">CLEAN</div>
                 </div>
                 <div className="flex justify-between items-center p-3 border border-rose-200 bg-rose-50 rounded-lg">
                    <div className="font-bold text-slate-900 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-rose-600"/> Jailbreak Attempt</div>
                    <div className="text-[10px] bg-rose-200 text-rose-800 font-bold px-2 py-1 rounded">BLOCKED</div>
                 </div>
              </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}