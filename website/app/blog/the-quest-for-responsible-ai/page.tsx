"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Download } from "lucide-react";

export default function BlogPost() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />
      <main className="flex-1">
        
        {/* Blog Header Image (Soyut Kurumsal Mavi Grafik) */}
        <div className="w-full h-[300px] md:h-[400px] bg-[#F0F5FF] flex items-center justify-center b order-b b order-slate-200 overflo w-hidden">
          <svg viewBox="0 0 800 400" className="w-full h-full max-w-[800px]" preserveAspectRatio="xMidYMid slice">
             <circle cx="250" cy="200" r="100" fill="#0066FF" />
             <rect x="300" y="120" width="160" height="160" fill="#33CCFF" rx="40" />
             <circle cx="550" cy="200" r="80" fill="#002299" />
             <path d="M350,300 L450,200 L550,300 Z" fill="#80B2FF" opacity="0.8"/>
          </svg>
        </div>

        <div className="max-w-[800px] mx-auto px-6 py-16">
          
          <Link href="/blog" className="inline-flex items-center gap-2 text-[14px] font-bold text-slate-500 hover:text-[#0066FF] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <h1 className="text-[36px] md:text-[52px] font-black text-slate-900 tracking-[-0.03em] leading-tight mb-8">
            The Quest for Responsible AI: Navigating Enterprise Safety Guardrails
          </h1>

          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-[18px] md:text-[20px] text-slate-700 leading-relaxed mb-6">
              As an AI developer or LLMOps engineer, you're at the forefront of today's technological revolution. The potential of generative AI to transform industries and reshape the way we work is truly inspiring. Yet, an essential question remains: <strong>how can we responsibly bring these powerful applications into production while safeguarding against risks?</strong>
            </p>
            <p className="text-[18px] md:text-[20px] text-slate-700 leading-relaxed mb-12">
              It's a dilemma that keeps many AI leaders and enthusiasts, including us, up at night. You've witnessed the incredible capabilities of Large Language Models (LLMs), but you also understand the inherent challenges they pose. From data privacy and content moderation to hallucination and jailbreak risks, the path to enterprise-ready AI is full of complex challenges.
            </p>

            <h2 className="text-[28px] font-bold text-slate-900 mb-6 tracking-tight">Introducing the AI Guardrails Index: Your Compass for Responsible AI</h2>
            <p className="text-[18px] text-slate-700 leading-relaxed mb-6">
              We're thrilled to unveil the <strong>Aegisora Guardrails Index</strong> - a comprehensive benchmark that empowers AI teams to select the optimal safety guardrails for their specific use cases. This index is the result of extensive research and analysis, evaluating 60+ leading guardrail solutions across 6 critical safety domains:
            </p>

            <ul className="list-disc pl-6 mb-12 space-y-3 text-[18px] text-slate-700">
              <li><strong>Jailbreak Prevention:</strong> Safeguarding against unauthorized system access.</li>
              <li><strong>PII Detection:</strong> Protecting sensitive personal information from exposure.</li>
              <li><strong>Content Moderation:</strong> Ensuring appropriate and compliant content generation.</li>
              <li><strong>Hallucination Detection:</strong> Identifying and mitigating inaccurate outputs.</li>
              <li><strong>Competitor Presence:</strong> Preventing unauthorized use of proprietary data.</li>
            </ul>

            {/* MOCKUP: Model Leaderboard (Siyah Grafik) */}
            <div className="w-full bg-slate-900 rounded-2xl p-6 md:p-8 mb-12 shado w-2xl border b order-slate-800">
              <div className="flex justify-between items-start mb-8 b order-b b order-slate-800 pb-6">
                 <div>
                   <h3 className="text-2xl font-bold text-white mb-2">Model Leaderboard</h3>
                   <p className="text-slate-400 text-sm max-w-md">A comprehensive visual comparison of how top-performing models stack up across key benchmarks like hallucinations, PII data exposure, and alignment.</p>
                 </div>
                 <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-900 text-sm font-bold rounded-lg hover:bg-slate-200 transition-colors">
                   <Download className="w-4 h-4" /> Download PDF
                 </button>
              </div>
              
              <div className="w-full h-[300px] relative">
                 {/* X/Y Axes */}
                 <div className="absolute left-10 top-0 bottom-8 w-px bg-slate-700"></div>
                 <div className="absolute left-10 right-0 bottom-8 h-px bg-slate-700"></div>
                 <div className="absolute left-0 top-0 text-[10px] text-slate-500 font-mono">F1 Score</div>
                 <div className="absolute right-0 bottom-0 text-[10px] text-slate-500 font-mono">Latency (s)</div>
                 
                 {/* Scatter Plot Points */}
                 <div className="absolute top-[20%] left-[30%] w-4 h-4 rounded-full b order-2 b order-emerald-400 bg-emerald-400/20 shado w-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                 <div className="absolute top-[40%] left-[25%] w-4 h-4 rounded-full b order-2 b order-[#0066FF] bg-[#0066FF]/20 shado w-[0_0_10px_rgba(0,102,255,0.5)]"></div>
                 <div className="absolute top-[60%] left-[70%] w-4 h-4 rounded-full b order-2 b order-rose-400 bg-rose-400/20 shado w-[0_0_10px_rgba(251,113,133,0.5)]"></div>
                 <div className="absolute top-[30%] left-[45%] w-4 h-4 rounded-full b order-2 b order-amber-400 bg-amber-400/20 shado w-[0_0_10px_rgba(251,191,36,0.5)]"></div>
              </div>
            </div>

            <h2 className="text-[28px] font-bold text-slate-900 mb-6 tracking-tight">Key Insights for Informed Decision-Making</h2>
            <p className="text-[18px] text-slate-700 leading-relaxed mb-6">
              The Aegisora Guardrails Index offers a wealth of insights to guide your guardrail selection process. Here are some key takeaways:
            </p>
            <ul className="list-disc pl-6 mb-12 space-y-3 text-[18px] text-slate-700">
              <li><strong>Focus on Relevant Subcategories:</strong> Rather than relying on generic performance metrics, prioritize the specific safety domains that align with your use case requirements.</li>
              <li><strong>Balance Performance and Usability:</strong> Seek out solutions that offer robust protection without compromising on user experience.</li>
              <li><strong>Prioritize Latency for Real-Time Applications:</strong> For interactive AI systems like chatbots, low latency is critical.</li>
            </ul>

            <h2 className="text-[28px] font-bold text-slate-900 mb-6 tracking-tight">Conclusion</h2>
            <p className="text-[18px] text-slate-700 leading-relaxed mb-12">
              We encourage AI teams to leverage the Aegisora AI Index in their decision-making processes. By selecting the right guardrails, organizations can significantly enhance the safety and reliability of their AI systems, ultimately accelerating innovation while mitigating risks. Together, let's build a safer, more reliable AI ecosystem.
            </p>
          </div>
        </div>

        {/* Similar Articles */}
        <section className="bg-[#FAFAFA] py-24 b order-t b order-slate-200">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-[32px] font-bold text-slate-900 mb-12 tracking-tight">See Similar Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Orijinal blog array'inin ilk 3 elemanını kopyalıyoruz */}
              {[1, 2, 3].map((i) => (
                <Link href="/blog/the-quest-for-responsible-ai" key={i} className="group block bg-white rounded-2xl border b order-slate-200 overflo w-hidden shado w-sm hover:shado w-xl transition-all duration-300">
                  <div className="w-full h-[200px] bg-slate-50 flex items-center justify-center b order-b b order-slate-100 overflo w-hidden group-hover:scale-105 transition-transform duration-500">
                    <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                      <rect x="100" y="50" width="200" height="100" fill="#E6F0FF" rx="20" />
                      <circle cx="200" cy="100" r="40" fill="#0066FF" />
                    </svg>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      <span className="px-2 py-1 text-[10px] font-bold bg-[#0066FF] text-white rounded">Guardrails</span>
                    </div>
                    <h3 className="text-[18px] font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#0066FF] transition-colors">
                      Aegisora x MLflow: Deterministic Safety
                    </h3>
                    <div className="text-[12px] text-slate-400 font-medium">Mar 4, 2026</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}