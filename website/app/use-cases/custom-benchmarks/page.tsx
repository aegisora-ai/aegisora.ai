"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  BarChart3, Activity, CheckCircle2, SplitSquareHorizontal, Shield, 
  ArrowRight, Layers, Gauge, Database, Terminal
} from "lucide-react";

// --- PURE CSS & SVG DITHERED GRADIENT MESH ---
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
      .mesh-delay-1 { animation-delay: -6s; }
      .mesh-delay-2 { animation-delay: -12s; }
    `}} />
    <div className="absolute inset-0" style={{ 
      backgroundColor: '#ffffff', 
      backgroundImage: 'radial-gradient(circle, #000000 1.5px, #ffffff 2px)', 
      backgroundSize: '10px 10px',
      backgroundPosition: 'center'
    }}></div>
    <div className="absolute inset-0 mix-blend-screen filter blur-[60px] opacity-90">
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#0066FF] rounded-full mesh-blob"></div>
      <div className="absolute top-[20%] right-[-20%] w-[80%] h-[80%] bg-[#33CCFF] rounded-full mesh-blob mesh-delay-1"></div>
      <div className="absolute bottom-[-30%] left-[10%] w-[90%] h-[90%] bg-[#002299] rounded-full mesh-blob mesh-delay-2"></div>
    </div>
    <svg className="absolute inset-0 w-full h-full opacity-[0.25] pointer-events-none mix-blend-multiply">
      <filter id="grainy-noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter>
      <rect width="100%" height="100%" filter="url(#grainy-noise)" />
    </svg>
  </div>
);

export default function CustomBenchmarksPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />
      <main className="flex-1">
        
        {/* ========================================= */}
        {/* 1. HERO SECTION */}
        {/* ========================================= */}
        <section className="pt-20 md:pt-32 pb-0 bg-white overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white shadow-sm mb-8 md:mb-10">
              <div className="w-6 h-6 rounded bg-emerald-100 flex items-center justify-center border border-emerald-200/60">
                <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <span className="text-[14px] font-semibold text-slate-700 tracking-tight">Custom Benchmarks</span>
            </div>

            <h1 className="text-[52px] sm:text-[72px] md:text-[88px] font-black text-slate-900 leading-[0.95] tracking-[-0.04em] mb-6 max-w-5xl">
              Custom Benchmarks
            </h1>
            
            <p className="text-[20px] md:text-[24px] text-slate-600 leading-snug max-w-3xl mb-12 font-medium tracking-tight">
              Build and run domain-specific benchmarks at scale — compare models or application versions on your exact scenarios and metrics.
            </p>
          </div>

          {/* HAREKETLİ DITHERED EFEKT ALANI */}
          <div className="w-full relative h-[150px] md:h-[250px] border-y border-slate-200 overflow-hidden bg-white">
              <AnimatedBlueWave />
          </div>
        </section>

        {/* ========================================= */}
        {/* 2. 3-COLUMN FEATURE CARDS (Videodaki Mockuplar) */}
        {/* ========================================= */}
        <section className="py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              
              {/* Card 1: Gauge (Göstergeler) */}
              <div className="flex flex-col gap-8">
                <div className="h-64 bg-[#F3F4F6] rounded-2xl flex items-center justify-center p-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
                  <div className="flex items-end gap-6 relative z-10 w-full justify-center">
                     {/* Gauge 1 */}
                     <div className="relative w-24 h-12 overflow-hidden flex flex-col items-center">
                        <div className="absolute w-24 h-24 border-8 border-slate-200 rounded-full"></div>
                        <motion.div initial={{ rotate: -180 }} animate={{ rotate: -45 }} transition={{ duration: 2, ease: "easeOut" }} className="absolute w-24 h-24 border-8 border-transparent border-t-rose-400 border-r-rose-400 rounded-full origin-center"></motion.div>
                     </div>
                     {/* Gauge 2 */}
                     <div className="relative w-32 h-16 overflow-hidden flex flex-col items-center">
                        <div className="absolute w-32 h-32 border-8 border-slate-200 rounded-full"></div>
                        <motion.div initial={{ rotate: -180 }} animate={{ rotate: 15 }} transition={{ duration: 2, delay: 0.2, ease: "easeOut" }} className="absolute w-32 h-32 border-8 border-transparent border-t-[#0066FF] border-r-[#0066FF] rounded-full origin-center"></motion.div>
                     </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight">Model & Provider Comparison</h3>
                  <p className="text-slate-600 leading-relaxed text-[16px] font-medium">Generate identical conversation scenarios across multiple LLMs/providers. Score performance side-by-side using built-in or custom metrics for accuracy, latency, safety, and tone.</p>
                </div>
              </div>

              {/* Card 2: Custom Metric (Listeler) */}
              <div className="flex flex-col gap-8">
                <div className="h-64 bg-[#F3F4F6] rounded-2xl flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
                  <div className="w-full max-w-[240px] bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col gap-3 relative z-10">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                        <div className="flex flex-col gap-1.5">
                          <div className="w-20 h-1.5 bg-slate-200 rounded-full"></div>
                          <div className="w-12 h-1.5 bg-slate-100 rounded-full"></div>
                        </div>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center ${i === 3 ? 'bg-rose-100' : 'bg-emerald-100'}`}>
                          {i === 3 ? <Activity className="w-3 h-3 text-rose-500" /> : <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight">Custom Metric Benchmarks</h3>
                  <p className="text-slate-600 leading-relaxed text-[16px] font-medium">Define your own risk or performance metrics (e.g., domain expertise, multi-turn coherence, constitution adherence). Aegisora runs thousands of tests and aggregates results into clear benchmark reports.</p>
                </div>
              </div>

              {/* Card 3: A/B Testing (Split Boxes) */}
              <div className="flex flex-col gap-8">
                <div className="h-64 bg-[#F3F4F6] rounded-2xl flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
                  <div className="w-full max-w-[280px] flex gap-3 relative z-10 h-32">
                    <div className="w-1/2 bg-white rounded-xl border border-slate-200 shadow-sm p-3 flex flex-col gap-2 relative">
                      <div className="w-1/2 h-2 bg-slate-200 rounded-full mb-2"></div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full"></div>
                      <div className="w-4/5 h-1.5 bg-slate-100 rounded-full"></div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full"></div>
                      <div className="absolute bottom-3 right-3 text-[9px] font-bold text-slate-400">V1.0</div>
                    </div>
                    <div className="w-1/2 bg-white rounded-xl border-2 border-[#0066FF] shadow-md p-3 flex flex-col gap-2 relative transform -translate-y-2">
                      <div className="w-1/2 h-2 bg-blue-200 rounded-full mb-2"></div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full"></div>
                      <div className="w-4/5 h-1.5 bg-slate-100 rounded-full"></div>
                      <div className="w-[90%] h-1.5 bg-slate-100 rounded-full"></div>
                      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-[#0066FF] text-white rounded text-[9px] font-bold">V1.1 <br/> WINNER</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight">Configuration & Prompt Testing</h3>
                  <p className="text-slate-600 leading-relaxed text-[16px] font-medium">Test prompt variations, system instructions, or tool setups. Identify which configuration holds up best on your edge cases and production-like data.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 3. WHY CUSTOM BENCHMARKS (Sol Başlık, Sağ Liste) */}
        {/* ========================================= */}
        <section className="py-32 bg-[#FAFAFA] border-t border-slate-200">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              <div className="lg:col-span-4">
                <h2 className="text-[40px] md:text-[56px] font-black text-slate-900 tracking-[-0.04em] leading-[1.05] sticky top-32">
                  Why Custom <br/> Benchmarks?
                </h2>
              </div>
              
              <div className="lg:col-span-8 flex flex-col">
                <div className="pb-12 border-b border-slate-200">
                  <h3 className="text-[28px] font-bold text-slate-900 mb-4 tracking-tight">Benchmarks built for your reality</h3>
                  <p className="text-[18px] text-slate-600 leading-relaxed font-medium">
                    Public benchmarks don't reflect your real use case, users, or risks. Aegisora creates benchmarks grounded in your context.
                  </p>
                </div>
                <div className="py-12 border-b border-slate-200">
                  <h3 className="text-[28px] font-bold text-slate-900 mb-4 tracking-tight">Evaluations that don't go stale</h3>
                  <p className="text-[18px] text-slate-600 leading-relaxed font-medium">
                    Standard evals are static and obsolete quickly. Aegisora runs dynamic, adaptive benchmarks that stay fresh.
                  </p>
                </div>
                <div className="pt-12">
                  <h3 className="text-[28px] font-bold text-slate-900 mb-4 tracking-tight">Results you can actually act on</h3>
                  <p className="text-[18px] text-slate-600 leading-relaxed font-medium">
                    Get actionable comparisons — raw scores, failure traces, and exportable reports with no manual aggregation.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 4. PATTERN GRID SECTION (Built for Production) */}
        {/* ========================================= */}
        <section className="relative py-32 bg-white overflow-hidden border-y border-slate-200">
          <div className="absolute inset-0">
             <AnimatedBlueWave />
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="bg-[#FCFCFC]/90 backdrop-blur-md border border-slate-200 rounded-[2rem] p-8 md:p-16 shadow-2xl">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-[36px] md:text-[48px] font-extrabold text-slate-900 tracking-[-0.03em] mb-4">
                  Built for Production AI Teams
                </h2>
                <p className="text-[18px] text-slate-600 leading-relaxed font-medium">
                  For teams building production AI systems who need evaluation data that's realistic, comprehensive, and fast.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                  <h4 className="text-[17px] font-bold text-slate-900 mb-3 tracking-tight">~500 scenarios in 30 minutes</h4>
                  <p className="text-[15px] text-slate-600 leading-relaxed">Replace weeks of manual curation with automated generation</p>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                  <h4 className="text-[17px] font-bold text-slate-900 mb-3 tracking-tight">Enterprise context grounding</h4>
                  <p className="text-[15px] text-slate-600 leading-relaxed">Scenarios reflect your domain, terminology, and user patterns</p>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                  <h4 className="text-[17px] font-bold text-slate-900 mb-3 tracking-tight">Live system interaction</h4>
                  <p className="text-[15px] text-slate-600 leading-relaxed">Tests adapt to actual AI responses, not assumed behavior</p>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                  <h4 className="text-[17px] font-bold text-slate-900 mb-3 tracking-tight">Multi-turn conversation support</h4>
                  <p className="text-[15px] text-slate-600 leading-relaxed">Evaluate complex dialogue flows, not single-exchange Q&A</p>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                  <h4 className="text-[17px] font-bold text-slate-900 mb-3 tracking-tight">Programmatic edge case discovery</h4>
                  <p className="text-[15px] text-slate-600 leading-relaxed">Systematically explore failure modes humans wouldn't think to test</p>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                  <h4 className="text-[17px] font-bold text-slate-900 mb-3 tracking-tight">Risk quantification</h4>
                  <p className="text-[15px] text-slate-600 leading-relaxed">Move from "we tested it" to "here's our measured risk surface"</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}