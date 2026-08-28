"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Shield, Lock, FileCheck, Terminal, Database, Server, Hexagon, ArrowRight, Activity, Cpu
} from "lucide-react";

// --- PURE CSS & SVG DITHERED GRADIENT MESH (Hero Banner İçin) ---
const AnimatedBlueWave = () => (
  <div className="absolute inset-0 overflo w-hidden bg-white">
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
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#0066FF] rounded-full mes h-blob"></div>
      <div className="absolute top-[20%] right-[-20%] w-[80%] h-[80%] bg-[#33CCFF] rounded-full mes h-blob mes h-delay-1"></div>
      <div className="absolute bottom-[-30%] left-[10%] w-[90%] h-[90%] bg-[#002299] rounded-full mes h-blob mes h-delay-2"></div>
    </div>

    <svg className="absolute inset-0 w-full h-full opacity-[0.25] pointer-events-none mix-blend-multiply">
      <filter id="grainy-noise-hero">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#grainy-noise-hero)" />
    </svg>
  </div>
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] font-sans">
      <Navbar />

      <main className="flex-1">

        {/* ========================================= */}
        {/* 1. HERO SECTION */}
        {/* ========================================= */}
        <section className="pt-20 md:pt-32 pb-16 bg-[#FAFAFA] px-4">
          <div className="max-w-[1000px] mx-auto text-center">
            <h1 className="text-[52px] sm:text-[72px] md:text-[88px] font-black text-slate-900 leading-[0.95] tracking-[-0.04em] mb-8">
              The AI Runtime <br className="hidden md:block"/> Governance Platform
            </h1>
            <p className="text-[20px] md:text-[24px] text-slate-600 leading-snug max-w-3xl mx-auto mb-10 font-medium tracking-tight">
              The deterministic framework for securing, governing, and scaling autonomous AI agents across any enterprise environment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/platform" className="w-full sm:w-auto px-8 py-3.5 text-[15px] font-bold text-slate-900 bg-[#FFC107] hover:bg-[#FFCA28] rounded-lg shado w-sm transition-colors">
                Aegisora OSS
              </Link>
              <Link href="/contact" className="w-full sm:w-auto px-8 py-3.5 text-[15px] font-bold text-slate-700 bg-white border b order-slate-200 hover:bg-slate-50 rounded-lg shado w-sm transition-colors">
                Talk to Us
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 2. FULL WIDTH DITHERED BANNER */}
        {/* ========================================= */}
        <div className="w-full h-[250px] md:h-[350px] relative overflo w-hidden b order-y b order-slate-200 shado w-[inset_0_0_50px_rgba(0,0,0,0.05)]">
          <AnimatedBlueWave />
        </div>

        {/* ========================================= */}
        {/* 3. LOGO CAROUSEL (Trusted By) */}
        {/* ========================================= */}
        <section className="py-20 md:py-32 bg-[#FAFAFA] b order-b b order-slate-200 px-6">
          <div className="max-w-[1200px] mx-auto text-center">
            <h3 className="text-[22px] md:text-[28px] font-medium text-slate-600 tracking-tight mb-16 max-w-2xl mx-auto leading-snug">
              Trusted by the world's leading enterprises, startups and government agencies.
            </h3>

            <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12 opacity-60 grayscale hover:gray scale-0 transition-all duration-500">
              {/* Logo Placeholders (Abstract Tech Icons) */}
              <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-slate-900"><Hexagon className="w-8 h-8"/> VOLTEX</div>
              <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-slate-900"><Cpu className="w-8 h-8"/> NEURAL</div>
              <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-slate-900"><Server className="w-8 h-8"/> DATASYN</div>
              <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-slate-900"><Activity className="w-8 h-8"/> SYNAPSE</div>
              <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-slate-900"><Terminal className="w-8 h-8"/> OMNI</div>
            </div>

            <h2 className="text-[36px] md:text-[48px] font-extrabold text-slate-900 tracking-[-0.04em] mt-32">
              AI reliability wherever you <br className="hidden md:block"/> are in your AI lifecycle
            </h2>
          </div>
        </section>

        {/* ========================================= */}
        {/* 4. FEATURE 1: Heatmap / Matrix */}
        {/* ========================================= */}
        <section className="py-24 bg-white b order-b b order-slate-200 px-6 overflo w-hidden">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Sol: Abstract UI (Heatmap Matrix) */}
            <div className="relative w-full aspect-square md:aspect-[4/3] bg-[#FAFAFA] rounded-2xl border b order-slate-200 p-8 flex flex-col justify-between overflo w-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>

              <div className="relative z-10 w-full grid grid-cols-4 gap-2">
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, delay: i * 0.1, repeat: Infinity }}
                    className={`aspect-square rounded-md ${
                      [2, 5, 11].includes(i) ? 'bg-rose-400' :
                      [7, 8].includes(i) ? 'bg-amber-400' :
                      'bg-emerald-400/80'
                    }`}
                  />
                ))}
              </div>

              <div className="relative z-10 bg-white border b order-slate-200 rounded-xl p-4 shado w-lg self-start mt-8">
                <div className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Failure Rate</div>
                <div className="text-3xl font-black text-slate-900">2.4%</div>
              </div>
            </div>

            {/* Sağ: Text */}
            <div>
              <h3 className="text-[32px] md:text-[40px] font-bold text-slate-900 tracking-[-0.03em] mb-6 leading-tight">
                Find Where Your Agent Breaks
              </h3>
              <p className="text-[18px] text-slate-600 leading-relaxed mb-8 font-medium">
                Generate dynamic eval datasets targeting edge cases and risky outcomes. Quantify failure modes before your users discover them.
              </p>
              <Link href="/products/gateway" className="inline-flex items-center gap-2 text-[#0066FF] font-bold hover:gap-3 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </section>

        {/* ========================================= */}
        {/* 5. FEATURE 2: Orbiting Nodes */}
        {/* ========================================= */}
        <section className="py-24 bg-[#FAFAFA] b order-b b order-slate-200 px-6 overflo w-hidden">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Sol: Text */}
            <div className="order-2 lg:order-1">
              <h3 className="text-[32px] md:text-[40px] font-bold text-slate-900 tracking-[-0.03em] mb-6 leading-tight">
                Control What Ships to Production
              </h3>
              <p className="text-[18px] text-slate-600 leading-relaxed mb-8 font-medium">
                Deploy runtime guardrails that detect policy violations, hallucinations, and data leakage. Block bad outputs before they reach users.
              </p>
              <Link href="/products/policy-engine" className="inline-flex items-center gap-2 text-[#0066FF] font-bold hover:gap-3 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Sağ: Abstract UI (Orbit) */}
            <div className="order-1 lg:order-2 relative w-full aspect-square md:aspect-[4/3] bg-white rounded-2xl border b order-slate-200 flex items-center justify-center overflo w-hidden">
              <div className="absolute w-[80%] h-[80%] b order-2 b order-dashed b order-slate-200 rounded-full animate-[spin_30s_linear_infinite]"></div>
              <div className="absolute w-[50%] h-[50%] b order-2 b order-slate-100 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>

              <div className="absolute w-4 h-4 bg-emerald-400 rounded-full top-[20%] left-[20%] shado w-[0_0_20px_rgba(52,211,153,0.5)]"></div>
              <div className="absolute w-6 h-6 bg-[#0066FF] rounded-full bottom-[20%] right-[30%] shado w-[0_0_30px_rgba(0,102,255,0.4)]"></div>
              <div className="absolute w-3 h-3 bg-rose-400 rounded-full top-[40%] right-[20%] shado w-[0_0_15px_rgba(251,113,133,0.5)]"></div>

              <div className="z-10 bg-white/90 backdrop-blur border b order-slate-200 rounded-xl p-6 shado w-xl text-center">
                <Shield className="w-8 h-8 text-[#0066FF] mx-auto mb-3" />
                <div className="text-[14px] font-bold text-slate-900">App Guard Active</div>
                <div className="text-[12px] text-slate-500 font-medium mt-1">Intercepting 12k req/s</div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================= */}
        {/* 6. TESTIMONIAL SECTION */}
        {/* ========================================= */}
        <section className="py-24 bg-white b order-b b order-slate-200 px-6 relative overflo w-hidden">
           {/* Arka planda uçuşan küçük grid dekorasyonları */}
           <div className="absolute top-10 left-10 opacity-20"><div className="w-16 h-16 bg-[#0066FF] rounded-tl-full"></div></div>
           <div className="absolute bottom-10 right-10 opacity-20"><div className="w-24 h-24 bg-emerald-400 rounded-br-full"></div></div>

          <div className="max-w-[800px] mx-auto text-center relative z-10">
            <p className="text-[20px] md:text-[28px] font-medium text-slate-800 leading-relaxed tracking-tight mb-10">
              "Good synthetic data is hard to generate, with the chief reason being that it's hard to create diversity of content. When we started using Aegisora, the clearest difference we saw was how realistic the agent personas felt. We have completely switched to using Aegisora for our security data."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full overflo w-hidden">
                 <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <div className="font-bold text-slate-900">Dr. Julian Weber</div>
                <div className="text-[14px] text-slate-500 font-medium">Head of AI, DataSyn GmbH</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 7. RESOURCES CAROUSEL */}
        {/* ========================================= */}
        <section className="py-24 bg-[#FAFAFA] px-6">
          <div className="max-w-[1200px] mx-auto">

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <h2 className="text-[32px] md:text-[40px] font-bold text-slate-900 tracking-[-0.03em] leading-tight max-w-md">
                Discover more resources to help you build safe, reliable AI.
              </h2>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full border b order-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors">
                  <ArrowRight className="w-4 h-4 rotate-180 text-slate-600" />
                </button>
                <button className="w-10 h-10 rounded-full border b order-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors">
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Card 1 */}
              <Link href="/blog" className="group block bg-white rounded-2xl border b order-slate-200 overflo w-hidden shado w-sm hover:shado w-xl transition-all duration-300">
                <div className="h-[200px] w-full bg-[#0066FF] relative overflo w-hidden flex items-center justify-center">
                   {/* Dither pattern arka plan dekoru */}
                   <div className="absolute inset-0 opacity-20 mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
                   <Database className="w-20 h-20 text-white opacity-90 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="text-[22px] font-bold text-slate-900 mb-3 tracking-tight">Sign up for on-demand webinar</h3>
                  <p className="text-[15px] text-slate-600 leading-relaxed font-medium">Discover practical guardrail techniques that help you build safer, more reliable AI applications.</p>
                </div>
              </Link>

              {/* Card 2 */}
              <Link href="/docs" className="group block bg-white rounded-2xl border b order-slate-200 overflo w-hidden shado w-sm hover:shado w-xl transition-all duration-300">
                <div className="h-[200px] w-full bg-emerald-500 relative overflo w-hidden flex items-center justify-center">
                   <div className="absolute inset-0 opacity-20 mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
                   <Hexagon className="w-20 h-20 text-white opacity-90 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="text-[22px] font-bold text-slate-900 mb-3 tracking-tight">Enterprise Runtime Security</h3>
                  <p className="text-[15px] text-slate-600 leading-relaxed font-medium">Learn to build production-ready, failure-resistant AI agent workflows aligned with SOC2 standards.</p>
                </div>
              </Link>

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
