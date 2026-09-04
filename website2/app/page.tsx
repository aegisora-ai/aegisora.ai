"use client";
import React from "react";
import Link from "next/link";
import { 
  Shield, Zap, Lock, Activity, ChevronRight, CheckCircle2, 
  Terminal, Database, Network, Server, ArrowRight, Menu, ShieldCheck
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-slate-200 font-sans selection:bg-blue-600/30">
      
      {/* ENTERPRISE NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#000000]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <img src="/brand/aegisora-logo-blue.png" alt="Aegisora Logo" className="w-8 h-auto object-contain" />
            <span className="text-2xl font-bold text-white tracking-tight">Aegisora</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <button className="hover:text-white transition-colors flex items-center gap-1">Products <ChevronRight className="w-3 h-3 rotate-90"/></button>
            <button className="hover:text-white transition-colors flex items-center gap-1">Use Cases <ChevronRight className="w-3 h-3 rotate-90"/></button>
            <button className="hover:text-white transition-colors flex items-center gap-1">Resources <ChevronRight className="w-3 h-3 rotate-90"/></button>
            <Link href="/company" className="hover:text-white transition-colors">Company</Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-white hover:text-slate-300 transition-colors px-4 py-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10">
              Log in
            </Link>
            <Link href="/login" className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-lg hover:bg-slate-200 transition-colors">
              Book a demo
            </Link>
          </div>
          <button className="lg:hidden text-white"><Menu className="w-6 h-6"/></button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="pt-40 pb-20 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-700/20 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-medium text-white tracking-tight leading-[1.05] mb-8">
            The <span className="text-blue-600 font-bold">leading security platform</span><br />
            to secure your AI future
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-10">
            Stay ahead of emerging threats while accelerating GenAI, agents, and MCPs for enterprise teams. Deterministic control meets cryptographic evidence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="w-full sm:w-auto px-8 py-4 bg-white text-black text-sm font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
              Get Started
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-slate-700 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
              Talk to Sales
            </button>
          </div>
        </div>
      </main>

      {/* SCROLLING MARQUEE (Simulated with CSS animation classes in real project, static display here) */}
      <div className="border-y border-white/10 bg-[#0A0A0A] py-4 overflow-hidden flex items-center justify-center gap-12 text-sm font-bold text-slate-400 whitespace-nowrap">
         <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-blue-500"/> Sub-50 ms runtime latency</span>
         <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-500"/> Immutable Cryptographic Evidence</span>
         <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-rose-500"/> Zero-Trust Agent Architecture</span>
         <span className="flex items-center gap-2"><Database className="w-4 h-4 text-amber-500"/> Protecting 1B+ Tokens Daily</span>
      </div>

      {/* SOCIAL PROOF / TRUST */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-medium text-white mb-12">Trusted by the world's leading <span className="text-blue-500">AI companies</span></h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Mock Logos */}
             <div className="text-2xl font-black tracking-tighter">Dropbox</div>
             <div className="text-2xl font-black tracking-tighter">aws</div>
             <div className="text-2xl font-black tracking-tighter text-rose-500">asana</div>
             <div className="text-2xl font-black tracking-tighter text-emerald-500">Hinge Health</div>
             <div className="text-2xl font-black tracking-tighter text-blue-400">Pearson</div>
          </div>
        </div>
      </section>

      {/* CORE PRODUCTS (Lakera Style Features) */}
      <section className="py-24 bg-white text-black rounded-t-[3rem]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              AI-native <span className="text-blue-600">security</span><br/>that scales with you
            </h2>
            <p className="text-slate-600 text-lg">Aegisora is trusted by industry leaders, from Fortune 500 companies to startups.</p>
          </div>

          <div className="space-y-6">
            {/* Feature 1 */}
            <div className="group border border-slate-200 rounded-2xl p-8 hover:shadow-xl transition-all cursor-pointer bg-slate-50 hover:bg-white">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center"><Network className="w-6 h-6"/></div>
                <div className="flex items-center gap-1 text-sm font-bold text-slate-500 group-hover:text-blue-600 transition-colors">Learn more <ArrowRight className="w-4 h-4"/></div>
              </div>
              <h3 className="text-2xl font-bold mb-2">AI Agent Security</h3>
              <p className="text-slate-600 mb-6 font-medium">Runtime protection for autonomous AI applications and MCPs.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-700 font-medium"><div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div> Real-time intent detection</li>
                <li className="flex items-center gap-3 text-slate-700 font-medium"><div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div> Deterministic API execution blocks</li>
                <li className="flex items-center gap-3 text-slate-700 font-medium"><div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div> Data leakage prevention</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="group border border-slate-200 rounded-2xl p-8 hover:shadow-xl transition-all cursor-pointer bg-slate-50 hover:bg-white">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center"><ShieldCheck className="w-6 h-6"/></div>
                <div className="flex items-center gap-1 text-sm font-bold text-slate-500 group-hover:text-emerald-600 transition-colors">Learn more <ArrowRight className="w-4 h-4"/></div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Policy Governance Studio</h3>
              <p className="text-slate-600 mb-6 font-medium">Centrally manage rules for all your internal and external AI traffic.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-700 font-medium"><div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div> Shadow AI discovery across apps</li>
                <li className="flex items-center gap-3 text-slate-700 font-medium"><div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div> Context-aware data protection</li>
                <li className="flex items-center gap-3 text-slate-700 font-medium"><div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div> Granular controls by user, app, and action</li>
              </ul>
            </div>
            
            {/* Feature 3 */}
            <div className="group border border-slate-200 rounded-2xl p-8 hover:shadow-xl transition-all cursor-pointer bg-slate-50 hover:bg-white">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center"><Lock className="w-6 h-6"/></div>
                <div className="flex items-center gap-1 text-sm font-bold text-slate-500 group-hover:text-rose-600 transition-colors">Learn more <ArrowRight className="w-4 h-4"/></div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Cryptographic Provenance</h3>
              <p className="text-slate-600 mb-6 font-medium">Immutable audit logs for compliance, SOC2, and trust verification.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-700 font-medium"><div className="w-1.5 h-1.5 rounded-full bg-rose-600"></div> Step-by-step decision explainability</li>
                <li className="flex items-center gap-3 text-slate-700 font-medium"><div className="w-1.5 h-1.5 rounded-full bg-rose-600"></div> Human-in-the-loop escalation flows</li>
                <li className="flex items-center gap-3 text-slate-700 font-medium"><div className="w-1.5 h-1.5 rounded-full bg-rose-600"></div> Exportable cryptographic hashes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE DIAGRAM SECTION */}
      <section className="py-32 bg-[#0A0A0A] relative border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-medium text-white mb-20">
            <span className="text-blue-500">Continuous AI security</span> powered by<br/>deterministic execution
          </h2>
          
          {/* Abstract Architecture Graph */}
          <div className="relative max-w-4xl mx-auto h-96 border border-slate-800 rounded-3xl bg-[#050505] overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050505] to-[#050505]"></div>
             
             {/* Center Node */}
             <div className="relative z-10 w-48 h-32 bg-slate-900 border-2 border-blue-600 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.3)]">
                <Shield className="w-8 h-8 text-blue-500 mb-2"/>
                <span className="text-sm font-bold text-white">Aegisora Edge Engine</span>
             </div>

             {/* Connection Lines (Mock) */}
             <div className="absolute top-1/2 left-0 w-[calc(50%-6rem)] h-0.5 bg-gradient-to-r from-transparent to-blue-600/50 -translate-y-1/2"></div>
             <div className="absolute top-1/2 right-0 w-[calc(50%-6rem)] h-0.5 bg-gradient-to-l from-transparent to-emerald-600/50 -translate-y-1/2"></div>
             
             {/* Edge Nodes */}
             <div className="absolute left-10 top-1/2 -translate-y-1/2 p-4 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-slate-300">Agent Requests</div>
             <div className="absolute right-10 top-1/2 -translate-y-1/2 p-4 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-slate-300">LLM / Tools</div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-32 bg-black text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-8">
            Join the companies securing the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Internet of Agents</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Link href="/login" className="w-full sm:w-auto px-10 py-5 bg-white text-black text-base font-bold rounded-lg hover:bg-slate-200 transition-colors">
              Get Started
            </Link>
            <button className="w-full sm:w-auto px-10 py-5 bg-transparent border border-slate-700 text-white text-base font-bold rounded-lg hover:bg-slate-800 transition-colors">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-6 h-6 text-white" />
              <span className="text-lg font-black text-white tracking-tight">AEGISORA</span>
            </div>
            <p className="text-slate-500 text-sm font-medium mb-6 max-w-xs">San Francisco, CA 94105<br/>1-800-AEGISORA</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Products</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li className="hover:text-white cursor-pointer transition-colors">Agent Security</li>
              <li className="hover:text-white cursor-pointer transition-colors">Policy Studio</li>
              <li className="hover:text-white cursor-pointer transition-colors">Approval Engine</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li className="hover:text-white cursor-pointer transition-colors">Documentation</li>
              <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
              <li className="hover:text-white cursor-pointer transition-colors">Security Guides</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Careers <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded ml-1">Hiring</span></li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-sm text-slate-600 font-medium flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-8">
          <div>©1994-2026 Aegisora Technologies Ltd. All rights reserved.</div>
          <div className="flex gap-4 mt-4 md:mt-0">
             <span>Terms & Conditions</span>
             <span>Privacy Policy</span>
          </div>
        </div>
      </footer>

    </div>
  );
}