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
);export default function AgentOptimization() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />
      <main className="flex-1">
        <section className="pt-24 pb-0 bg-white overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white shadow-sm mb-8">
              <div className="w-6 h-6 rounded bg-rose-100 flex items-center justify-center"><Activity className="w-3.5 h-3.5 text-rose-600" /></div>
              <span className="text-[14px] font-semibold text-slate-700 tracking-tight">Automated Agent Optimization</span>
            </div>
            <h1 className="text-[52px] sm:text-[72px] md:text-[88px] font-black text-slate-900 leading-[0.95] tracking-[-0.04em] mb-6 max-w-4xl mx-auto">
              Optimize Autonomous Workflows
            </h1>
            <p className="text-[20px] md:text-[24px] text-slate-600 leading-snug max-w-3xl mx-auto mb-16 font-medium tracking-tight">
              Mitigate Gen AI risks while ensuring your agents complete multi-step tasks faster, cheaper, and without infinite loops.
            </p>
          </div>
          <div className="w-full relative h-[300px] border-y border-slate-200 overflow-hidden bg-white flex items-center justify-center">
              <AnimatedBlueWave />
              {/* Node Mockup */}
              <div className="relative z-10 flex items-center gap-4 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-slate-200">
                 <div className="px-6 py-4 bg-slate-900 text-white rounded-xl font-bold">Task Planning</div>
                 <div className="w-12 h-1 bg-emerald-400"></div>
                 <div className="px-6 py-4 bg-slate-900 text-white rounded-xl font-bold">Tool Execution</div>
                 <div className="w-12 h-1 bg-emerald-400"></div>
                 <div className="px-6 py-4 bg-[#0066FF] text-white rounded-xl font-bold flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> Success</div>
              </div>
          </div>
        </section>
        
        <section className="py-24 bg-[#FAFAFA]">
          <div className="max-w-[1000px] mx-auto px-6 text-center">
            <h2 className="text-[36px] font-black text-slate-900 tracking-[-0.03em] mb-12">Identify Bottlenecks Instantly</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm"><h3 className="font-bold text-xl mb-3 text-slate-900">Reduce Latency</h3><p className="text-slate-600 font-medium">Cut down reasoning cycles by intercepting poor tool selection early.</p></div>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm"><h3 className="font-bold text-xl mb-3 text-slate-900">Prevent Infinite Loops</h3><p className="text-slate-600 font-medium">Automatically halt agents stuck in repetitive error-correction paths.</p></div>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm"><h3 className="font-bold text-xl mb-3 text-slate-900">Cost Control</h3><p className="text-slate-600 font-medium">Limit token usage and API costs by enforcing strict execution boundaries.</p></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}