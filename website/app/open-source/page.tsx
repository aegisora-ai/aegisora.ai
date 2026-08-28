"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, GitFork, Users, BookOpen, ShieldCheck } from "lucide-react";

// Özel Github İkonu
const GithubIcon = (props: React.ComponentProps<"svg">) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

export default function OpenSourcePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />

      <section className="py-24 px-6 text-center">
        <div className="max-w-[800px] mx-auto">
          <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-8 shado w-xl">
             <GithubIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-[44px] md:text-[56px] font-black text-slate-900 tracking-tight mb-6">
            Building the Standard <br/>for AI Security
          </h1>
          <p className="text-[18px] text-slate-600 font-medium leading-relaxed mb-10">
            Aegisora's core engine and policy validators are 100% open-source. We believe that critical AI safety infrastructure should be transparent, verifiable, and built by the community.
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://github.com/aegisora" className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors">
              View on GitHub
            </a>
            <a href="/docs" className="flex items-center gap-2 px-6 py-3.5 bg-white border b order-slate-200 hover:bg-slate-50 text-slate-900 font-bold rounded-lg transition-colors">
              <BookOpen className="w-4 h-4" /> Read Docs
            </a>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="b order-y b order-slate-200 bg-[#FAFAFA] py-12 px-6">
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-200">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-slate-500 font-bold mb-2 uppercase text-[12px] tracking-wider"><Star className="w-4 h-4"/> Github Stars</div>
            <div className="text-[32px] font-black text-slate-900">4.2k</div>
          </div>
          <div className="text-center hidden md:block">
            <div className="flex items-center justify-center gap-2 text-slate-500 font-bold mb-2 uppercase text-[12px] tracking-wider"><GitFork className="w-4 h-4"/> Forks</div>
            <div className="text-[32px] font-black text-slate-900">385</div>
          </div>
          <div className="text-center hidden md:block">
            <div className="flex items-center justify-center gap-2 text-slate-500 font-bold mb-2 uppercase text-[12px] tracking-wider"><Users className="w-4 h-4"/> Contributors</div>
            <div className="text-[32px] font-black text-slate-900">112</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-slate-500 font-bold mb-2 uppercase text-[12px] tracking-wider"><ShieldCheck className="w-4 h-4"/> Validators</div>
            <div className="text-[32px] font-black text-slate-900">65+</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
