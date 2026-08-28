"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Shield, Check, Search, Lock, AlertTriangle, Hexagon, Terminal, 
  Cpu, Server, Activity, ArrowRight, LayoutTemplate, MessageSquare, Database
} from "lucide-react";

// --- DITHERED MESH (Hero Arka Planı İçin) ---
const AnimatedBlueWave = () => (
  <div className="absolute inset-0 overflow-hidden bg-[#0066FF]">
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes gradientMesh {
        0% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(5%, -5%) scale(1.1); }
        66% { transform: translate(-5%, 5%) scale(0.9); }
        100% { transform: translate(0, 0) scale(1); }
      }
      .mesh-blob { animation: gradientMesh 20s infinite alternate ease-in-out; }
    `}} />
    <div className="absolute inset-0" style={{ 
      backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', 
      backgroundSize: '12px 12px',
      opacity: 0.15
    }}></div>
    <div className="absolute inset-0 mix-blend-screen filter blur-[80px] opacity-60">
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#33CCFF] rounded-full mesh-blob"></div>
      <div className="absolute bottom-[-30%] right-[-10%] w-[80%] h-[80%] bg-[#002299] rounded-full mesh-blob" style={{animationDelay: '-5s'}}></div>
    </div>
  </div>
);

// --- VİDEODAKİ KART MOCKUP'I (Unleash the power of Validators) ---
const ValidatorMockup = () => {
  const validators = [
    { name: "PII Detection", desc: "Validates that user-generated input does not contain Personally Identifiable Information.", status: "ALLOWED" },
    { name: "Competitor Check", desc: "Detects mentions of direct competitors in the prompt and redacts them.", status: "ALLOWED" },
    { name: "Jailbreak Attempt", desc: "Identifies common prompt injection and system override attempts.", status: "BLOCKED", isBlocked: true },
    { name: "Tone & Toxicity", desc: "Ensures the input does not contain toxic, offensive, or NSFW language.", status: "ALLOWED" },
    { name: "Hallucination Check", desc: "Cross-references LLM output with provided context to prevent made-up facts.", status: "ALLOWED" },
    { name: "Data Leakage", desc: "Prevents the model from outputting internal system prompts or secrets.", status: "BLOCKED", isBlocked: true },
  ];

  return (
    <div className="w-full max-w-[1000px] mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative z-20 -mt-16 sm:-mt-24 md:-mt-32">
      {/* Mac Toolbar */}
      <div className="px-4 py-3 border-b border-slate-100 bg-[#FAFAFA] flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
        <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
      </div>
      
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-slate-100 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-[24px] font-bold text-slate-900 mb-1">Unleash the power of Aegisora Guards</h3>
          <p className="text-slate-500 text-[14px]">Search and explore vast world of guardrails validators through lightning fast search</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-medium text-slate-500 w-full md:w-64">
            <Search className="w-4 h-4" /> Search validators...
          </div>
          <div className="text-[12px] font-bold text-slate-400 uppercase tracking-widest hidden sm:block">65+ GUARDS</div>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="p-6 md:p-8 bg-slate-50/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {validators.map((val, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#0066FF]/50 transition-colors shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${val.isBlocked ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {val.isBlocked ? <AlertTriangle className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                  </div>
                  <h4 className="font-bold text-slate-900 text-[16px]">{val.name}</h4>
                </div>
                <div className={`text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider ${val.isBlocked ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  {val.status}
                </div>
              </div>
              <p className="text-[13px] text-slate-500 leading-relaxed mt-3">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function OpenSourcePage() {
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
        <section className="relative pt-24 pb-48 md:pb-64 border-b border-blue-900/10">
          <AnimatedBlueWave />
          <div className="relative z-10 max-w-[1000px] mx-auto px-6 text-center text-white">
            <h1 className="text-[44px] sm:text-[64px] md:text-[80px] font-black leading-[1.0] tracking-[-0.04em] mb-6">
              #1 Open Source Security <br className="hidden md:block"/> Framework for AI
            </h1>
            <p className="text-[18px] md:text-[22px] text-blue-100 font-medium leading-relaxed max-w-3xl mx-auto mb-10">
              A production-ready framework that puts safety, compliance, and policy enforcement at the center of every AI workflow.
            </p>
            <Link 
              href="/docs" 
              className="inline-flex items-center justify-center px-10 py-4 text-[16px] font-bold text-slate-900 bg-[#FFC107] hover:bg-[#FFCA28] rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Get Started with OSS
            </Link>
          </div>
        </section>

        {/* MOCKUP UI (Taşan Kısım) */}
        <div className="px-4 sm:px-6">
          <ValidatorMockup />
        </div>

        {/* ========================================= */}
        {/* 2. LOGO STRIP (Trusted By) */}
        {/* ========================================= */}
        <section className="py-24 bg-white border-b border-slate-100">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <h3 className="text-[20px] font-medium text-slate-500 tracking-tight mb-12">
              Trusted by the world's leading enterprises, startups and government agencies.
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-slate-900"><Hexagon className="w-7 h-7"/> VOLTEX</div>
              <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-slate-900"><Cpu className="w-7 h-7"/> NEURAL</div>
              <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-slate-900"><Server className="w-7 h-7"/> DATASYN</div>
              <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-slate-900"><Activity className="w-7 h-7"/> SYNAPSE</div>
              <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-slate-900"><Terminal className="w-7 h-7"/> OMNI</div>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 3. DİYAGRAM 1: Prompt -> LLM -> Output */}
        {/* ========================================= */}
        <section className="py-32 bg-[#FAFAFA] border-b border-slate-200 overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-[36px] md:text-[48px] font-black text-slate-900 tracking-[-0.03em] leading-tight mb-6">
                Ship to production with confidence and AI-powered validation
              </h2>
            </div>
            
            {/* The Visual Diagram from the Video */}
            <div className="relative w-full max-w-[900px] mx-auto h-[400px] bg-white border border-slate-200 rounded-3xl shadow-sm flex items-center justify-center p-8">
              
              {/* Arkadaki Ok Çizgisi */}
              <div className="absolute top-1/2 left-[10%] right-[10%] h-1 bg-slate-200 -translate-y-1/2"></div>
              
              {/* Ana Kutular */}
              <div className="relative z-10 flex justify-between w-[80%]">
                
                {/* PROMPT BOX & INPUT GUARDS */}
                <div className="relative">
                  {/* Floating Input Guards */}
                  <div className="absolute bottom-[calc(100%+24px)] left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="text-[12px] font-bold text-slate-500 mb-2 whitespace-nowrap">Input Guards</div>
                    <div className="flex gap-2">
                      <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[12px] font-bold rounded-md whitespace-nowrap">Contains PII</div>
                      <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[12px] font-bold rounded-md whitespace-nowrap">Proprietary Info</div>
                      <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[12px] font-bold rounded-md whitespace-nowrap">Jailbreak attempt</div>
                    </div>
                    {/* Ok Dikey */}
                    <div className="w-px h-6 bg-slate-300 mt-2"></div>
                  </div>
                  <div className="px-8 py-5 bg-white border-2 border-slate-200 rounded-xl font-bold text-xl text-slate-900 shadow-sm relative">Prompt</div>
                </div>

                {/* LLM BOX */}
                <div className="px-10 py-5 bg-slate-900 rounded-xl font-bold text-xl text-white shadow-xl relative z-10">LLM</div>

                {/* OUTPUT BOX & OUTPUT GUARDS */}
                <div className="relative">
                  <div className="px-8 py-5 bg-white border-2 border-slate-200 rounded-xl font-bold text-xl text-slate-900 shadow-sm relative">Output</div>
                  {/* Floating Output Guards */}
                  <div className="absolute top-[calc(100%+24px)] left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-px h-6 bg-slate-300 mb-2"></div>
                    <div className="flex gap-2 mb-2">
                      <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[12px] font-bold rounded-md whitespace-nowrap">Hallucinations</div>
                      <div className="px-3 py-1.5 bg-rose-50 border border-rose-200 text-rose-700 text-[12px] font-bold rounded-md whitespace-nowrap">NSFW</div>
                      <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[12px] font-bold rounded-md whitespace-nowrap">Sensitive Topics</div>
                    </div>
                    <div className="text-[12px] font-bold text-slate-500 whitespace-nowrap">Output Guard</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ========================================= */}
        {/* 4. DİYAGRAM 2: Detect risks, enforce policies... */}
        {/* ========================================= */}
        <section className="py-24 bg-white border-b border-slate-200 px-6">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Sol: Animasyonlu Validator Akışı */}
            <div className="relative h-[450px] bg-[#FAFAFA] border border-slate-200 rounded-3xl p-8 overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
               <div className="relative z-10 flex flex-col gap-4 animate-[slideUp_20s_linear_infinite]">
                 <style dangerouslySetInnerHTML={{__html: `
                    @keyframes slideUp {
                      0% { transform: translateY(0); }
                      100% { transform: translateY(-50%); }
                    }
                 `}}/>
                 {[1,2,3,4,5,6].map((i) => (
                   <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                     <div className="font-bold text-slate-900">{i % 2 === 0 ? "Jailbreaking" : "PII Detection"}</div>
                     <div className="w-12 h-2 bg-emerald-200 rounded-full"></div>
                   </div>
                 ))}
                 {[1,2,3,4,5,6].map((i) => (
                   <div key={`dup-${i}`} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                     <div className="font-bold text-slate-900">{i % 2 === 0 ? "Topic Restriction" : "Hallucination"}</div>
                     <div className="w-12 h-2 bg-emerald-200 rounded-full"></div>
                   </div>
                 ))}
               </div>
               <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FAFAFA] to-transparent z-20"></div>
               <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FAFAFA] to-transparent z-20"></div>
            </div>
            
            {/* Sağ: Text */}
            <div>
              <h2 className="text-[32px] md:text-[40px] font-bold text-slate-900 tracking-[-0.03em] mb-6 leading-tight">
                Detect risks, enforce policies and control every interaction
              </h2>
              <p className="text-[18px] text-slate-600 leading-relaxed font-medium">
                Low-latency, real-time, protection that wraps your LLM application to catch PII leaks, hallucination, jailbreak or any custom policy you define.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 5. ÖZELLİKLER GRID (Largest Collection...) */}
        {/* ========================================= */}
        <section className="py-32 bg-[#FAFAFA] border-b border-slate-200 px-6">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Sol Text */}
            <div>
              <h2 className="text-[32px] md:text-[44px] font-bold text-slate-900 tracking-[-0.03em] mb-6 leading-tight">
                Largest collection of community-driven open source AI guardrails
              </h2>
              <p className="text-[18px] text-slate-600 leading-relaxed font-medium">
                65+ community-built guardrails covering every risk category - from hallucination and PII to jailbreaks and content moderation. Ready to deploy out of the box, or customize to your needs.
              </p>
            </div>
            {/* Sağ Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {["Jailbreaking", "PII Detection", "Content Moderation", "Topic Restriction", "Hallucination", "Competitor Check"].map((item, idx) => (
                 <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                   <div className="font-bold text-slate-900 text-lg">{item}</div>
                   <div className="flex gap-2">
                     <div className="w-1/3 h-1.5 bg-emerald-400 rounded-full"></div>
                     <div className="w-1/4 h-1.5 bg-slate-200 rounded-full"></div>
                   </div>
                   <div className="flex gap-2">
                     <div className="w-1/2 h-1.5 bg-slate-200 rounded-full"></div>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 6. DİYAGRAM 3: Any LLM, Any Use Cases */}
        {/* ========================================= */}
        <section className="py-32 bg-white border-b border-slate-200 px-6">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Sol: Mimari Şema */}
            <div className="relative h-[450px] bg-[#FAFAFA] border border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-8">
               {/* Uygulamalar */}
               <div className="flex gap-3 flex-wrap justify-center">
                 <div className="px-4 py-2 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-lg border border-emerald-200">Internal Chat</div>
                 <div className="px-4 py-2 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-lg border border-emerald-200">RAG Application</div>
                 <div className="px-4 py-2 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-lg border border-emerald-200">Agent Workflow</div>
                 <div className="px-4 py-2 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-lg border border-emerald-200">AI Summaries</div>
               </div>
               
               <div className="w-px h-8 bg-slate-300"></div>
               
               {/* Merkez Logo Kutusu */}
               <div className="px-10 py-6 bg-white border-2 border-slate-200 shadow-xl rounded-2xl flex items-center gap-4">
                 <img src="/logo.png" alt="Aegisora" className="h-8 w-auto" />
                 <span className="text-2xl font-black text-slate-900">Aegisora AI</span>
               </div>
               
               <div className="w-px h-8 bg-slate-300"></div>

               {/* LLM'ler */}
               <div className="flex gap-3 flex-wrap justify-center">
                 <div className="px-4 py-2 bg-slate-800 text-white text-sm font-bold rounded-lg">OpenAI</div>
                 <div className="px-4 py-2 bg-slate-800 text-white text-sm font-bold rounded-lg">Anthropic</div>
                 <div className="px-4 py-2 bg-slate-800 text-white text-sm font-bold rounded-lg">Custom LLMs</div>
               </div>
            </div>

            {/* Sağ Text */}
            <div>
              <h2 className="text-[32px] md:text-[40px] font-bold text-slate-900 tracking-[-0.03em] mb-6 leading-tight">
                Any LLM, As many Use Cases, Any Deployment Options
              </h2>
              <p className="text-[18px] text-slate-600 leading-relaxed font-medium">
                Meta, Anthropic - doesn't matter. Run it in your cloud or fully on-prem. Aegisora AI fits into your stack whether you're building chatbots, RAG pipelines, or full agent workflows.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 7. RESOURCES (Alt Kartlar) */}
        {/* ========================================= */}
        <section className="py-24 bg-[#FAFAFA] px-6">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-[32px] md:text-[40px] font-bold text-slate-900 tracking-[-0.03em] leading-tight max-w-lg mb-12">
              Discover more resources to help you build safe, reliable AI.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/platform" className="group block bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="h-[200px] w-full bg-[#0066FF] relative overflow-hidden flex items-center justify-center">
                   <div className="absolute inset-0 opacity-20 mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
                   <LayoutTemplate className="w-24 h-24 text-white opacity-90 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="text-[22px] font-bold text-slate-900 mb-3 tracking-tight">Aegisora Hub</h3>
                  <p className="text-[15px] text-slate-600 leading-relaxed font-medium">Browse, explore, and use components to prevent unsafe or faulty AI responses before they reach end-users.</p>
                </div>
              </Link>
              <Link href="/docs" className="group block bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="h-[200px] w-full bg-emerald-500 relative overflow-hidden flex items-center justify-center">
                   <div className="absolute inset-0 opacity-20 mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
                   <Hexagon className="w-24 h-24 text-white opacity-90 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="text-[22px] font-bold text-slate-900 mb-3 tracking-tight">Aegisora OSS Docs</h3>
                  <p className="text-[15px] text-slate-600 leading-relaxed font-medium">Learn how guardrails operate, integrate them into your stack, and start building with confidence.</p>
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