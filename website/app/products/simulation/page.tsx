"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Play, Plus, Hexagon, Cpu, Server, Activity, Terminal, Check, ChevronDown 
} from "lucide-react";

// --- SEKME (TABS) VERİSİ ---
const howItWorksData = [
  {
    id: "connect",
    title: "Connect",
    heading: "Connect Your Agent",
    desc: "Bring your API or easily integrate using our SDK to connect your conversational AI agent with minimal effort.",
    image: (
      <div className="w-full h-full bg-slate-50 border b order-slate-200 rounded-xl p-6 flex flex-col gap-4">
        <div className="w-full h-10 bg-white border b order-slate-200 rounded flex items-center px-4 text-sm font-mono text-slate-400">API Endpoint: https://api.aegisora.com/v1/chat</div>
        <div className="w-full h-10 bg-white border b order-slate-200 rounded flex items-center px-4 text-sm font-mono text-slate-400">Auth Token: ********************</div>
        <div className="mt-auto w-full py-3 bg-[#0066FF] text-white rounded text-center font-bold text-sm">Connect & Continue</div>
      </div>
    )
  },
  {
    id: "configure",
    title: "Configure",
    heading: "Configure & Launch",
    desc: "Set personas, conversation count and scenarios, then let Aegisora run automatically.",
    image: (
      <div className="w-full h-full bg-slate-50 border b order-slate-200 rounded-xl p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center pb-2 b order-b b order-slate-200">
           <span className="text-sm font-bold text-slate-700">Number of personas</span>
           <span className="text-xl font-black text-[#0066FF]">25</span>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-[#0066FF] flex items-center justify-center"><Check className="w-3 h-3 text-white"/></div><span className="text-sm font-medium text-slate-600">Hallucination</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-[#0066FF] flex items-center justify-center"><Check className="w-3 h-3 text-white"/></div><span className="text-sm font-medium text-slate-600">Jailbreak</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded border b order-slate-300"></div><span className="text-sm font-medium text-slate-600">Tone Mismatch</span></div>
        </div>
        <div className="mt-auto w-full py-3 bg-slate-200 text-slate-700 rounded text-center font-bold text-sm">Run the simulation</div>
      </div>
    )
  },
  {
    id: "explore",
    title: "Explore",
    heading: "Simulate Scenarios at Scale",
    desc: "Thousands of realistic conversations unfold across diverse personas with varied interaction styles.",
    image: (
      <div className="w-full h-full bg-slate-50 border b order-slate-200 rounded-xl p-6 relative overflo w-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:10px_10px] opacity-50"></div>
        <div className="relative z-10 flex flex-wrap gap-2">
           {[...Array(40)].map((_, i) => (
             <motion.div 
               key={i} 
               initial={{ scale: 0 }} 
               animate={{ scale: 1 }} 
               transition={{ delay: i * 0.05 }}
               className={`w-4 h-4 rounded-full ${i % 7 === 0 ? 'bg-rose-400' : 'bg-emerald-400'}`}
             />
           ))}
        </div>
      </div>
    )
  },
  {
    id: "analyze",
    title: "Analyze",
    heading: "Get Detailed Insights",
    desc: "Comprehensive report reveals failure patterns, edge cases, and performance across user types.",
    image: (
      <div className="w-full h-full bg-slate-50 border b order-slate-200 rounded-xl p-6 flex flex-col gap-4">
        <div className="flex items-end gap-4 h-32 b order-b b order-slate-200 pb-2">
          <div className="w-8 bg-blue-200 h-[40%] rounded-t-sm"></div>
          <div className="w-8 bg-blue-300 h-[70%] rounded-t-sm"></div>
          <div className="w-8 bg-[#0066FF] h-[100%] rounded-t-sm"></div>
          <div className="w-8 bg-rose-400 h-[30%] rounded-t-sm"></div>
          <div className="w-8 bg-emerald-400 h-[80%] rounded-t-sm"></div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="h-2 w-16 bg-slate-200 rounded-full"></div>
          <div className="h-2 w-16 bg-slate-200 rounded-full"></div>
          <div className="h-2 w-16 bg-slate-200 rounded-full"></div>
        </div>
      </div>
    )
  }
];

// --- SSS (FAQ) VERİSİ ---
const faqs = [
  { q: "What is AI agent simulation?", a: "It's the practice of simulating real user conversations with your agent to create data at scale. Aegisora generates those conversations and labels outcomes so you can evaluate and train reliably." },
  { q: "How does Aegisora help with eval and testing?", a: "We run hundreds of simulated conversations in minutes and return judge-labeled eval datasets plus failing transcripts, so you can catch production-breaking failures before launch." },
  { q: "Can Aegisora generate training data for fine-tuning?", a: "Yes. By analyzing the simulation results, Aegisora can export high-quality, formatted data sets ready for DPO or SFT to improve your base models." },
  { q: "Will this help reduce hallucinations?", a: "Absolutely. By creating complex, multi-turn edge cases, Aegisora forces your model into challenging scenarios, identifying hallucination triggers before real users do." },
];

export default function SimulationPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("connect");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />
      
      <main className="flex-1">
        
        {/* ========================================= */}
        {/* 1. HERO SECTION (Mavi Grid Arka Plan) */}
        {/* ========================================= */}
        <section className="relative pt-24 pb-16 overflo w-hidden b order-b b order-slate-200">
          {/* Arka Plan Grid (Pembe yerine Kurumsal Mavi tonlarında ince ızgara) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0066FF10_1px,transparent_1px),linear-gradient(to_bottom,#0066FF10_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          
          <div className="max-w-[1000px] mx-auto px-6 text-center relative z-10">
            <h1 className="text-[52px] sm:text-[64px] md:text-[80px] font-black text-slate-900 leading-[0.95] tracking-[-0.04em] mb-6">
              Fast Simulation for <br className="hidden md:block"/> Reliable AI Agents
            </h1>
            <p className="text-[18px] md:text-[22px] text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto mb-10">
              Deploy realistic personas to run hundreds of conversations in minutes, reveal failures manual testing misses, and generate judge-labeled datasets for evals and fine-tuning.
            </p>
            <button className="inline-flex items-center justify-center px-8 py-4 text-[15px] font-bold text-slate-900 bg-[#FFC107] hover:bg-[#FFCA28] rounded-lg shado w-sm transition-colors mb-16">
              Start Simulating Now
            </button>

            {/* MOCKUP (Mac Window) */}
            <div className="w-full max-w-[800px] mx-auto bg-white rounded-t-3xl b order-t-8 b order-x-8 b order-slate-900 shado w-2xl relative overflo w-hidden flex flex-col items-center p-12">
               <div className="w-16 h-16 bg-[#0066FF]/10 rounded-full flex items-center justify-center mb-6">
                 <Play className="w-6 h-6 text-[#0066FF] ml-1" />
               </div>
               <div className="text-3xl font-black text-slate-900 flex items-center gap-3 mb-10">
                 <img src="/logo.png" alt="Aegisora" className="h-8 w-auto" /> Aegisora
               </div>
               <div className="w-full bg-slate-50 border b order-slate-200 rounded-xl flex items-center px-6 py-4 shado w-inner">
                 <span className="text-slate-400 font-medium mr-3">Chatbot for</span>
                 <span className="text-slate-900 font-bold b order-l-2 b order-[#0066FF] pl-2 animate-pulse">|</span>
               </div>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 2. LOGO STRIP */}
        {/* ========================================= */}
        <section className="py-10 bg-white b order-b b order-slate-200">
          <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-[13px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
              By the Makers of <span className="text-slate-900">Aegisora OSS</span>
            </div>
            <div className="w-px h-6 bg-slate-200 hidden md:block"></div>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 grayscale hover:gray scale-0 transition-all duration-500">
              <div className="flex items-center gap-2 font-black text-lg tracking-tighter text-slate-900"><Hexagon className="w-5 h-5"/> VOLTEX</div>
              <div className="flex items-center gap-2 font-black text-lg tracking-tighter text-slate-900"><Cpu className="w-5 h-5"/> NEURAL</div>
              <div className="flex items-center gap-2 font-black text-lg tracking-tighter text-slate-900"><Server className="w-5 h-5"/> DATASYN</div>
              <div className="flex items-center gap-2 font-black text-lg tracking-tighter text-slate-900"><Activity className="w-5 h-5"/> SYNAPSE</div>
              <div className="flex items-center gap-2 font-black text-lg tracking-tighter text-slate-900"><Terminal className="w-5 h-5"/> OMNI</div>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 3. TESTIMONIAL 1 */}
        {/* ========================================= */}
        <section className="py-24 bg-white b order-b b order-slate-100">
          <div className="max-w-[800px] mx-auto px-6 text-center">
            <p className="text-[22px] md:text-[26px] font-medium text-slate-800 leading-relaxed tracking-tight mb-10">
              "Good synthetic data is hard to generate, with the chief reason being that it's hard to create diversity of content. When we started using Aegisora, the clearest difference we saw was how realistic the synthetic user personas felt compared to any synthetic data that we'd seen before."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full overflo w-hidden">
                 <img src="https://i.pravatar.cc/150?img=68" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <div className="font-bold text-slate-900">Aman Gupta</div>
                <div className="text-[14px] text-slate-500 font-medium">Head of AI, Masterclass</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 4. DOT ANIMATION SECTION (Manual vs Scale) */}
        {/* ========================================= */}
        <section className="py-32 bg-[#FAFAFA] b order-b b order-slate-200">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-[36px] md:text-[48px] font-black text-slate-900 tracking-[-0.03em] leading-tight mb-16 max-w-2xl">
              Stop hand-building agent scenarios
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Sol: Manual Testing */}
              <div className="flex flex-col gap-6">
                <div className="h-[300px] bg-slate-100 rounded-3xl border b order-slate-200 flex items-center justify-center relative overflo w-hidden">
                  <div className="flex gap-4">
                    {[...Array(8)].map((_, i) => (
                      <motion.div 
                        key={`manual-${i}`}
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                        className={`w-6 h-6 rounded-full ${i === 3 ? 'bg-rose-400' : 'bg-slate-300'}`}
                      />
                    ))}
                  </div>
                  <div className="absolute bottom-6 left-6 bg-white border b order-slate-200 rounded-lg px-4 py-2 shado w-sm flex items-center gap-4">
                    <div><div className="text-[10px] font-bold text-slate-400 uppercase">Datapoints</div><div className="font-black text-slate-900">8</div></div>
                    <div><div className="text-[10px] font-bold text-slate-400 uppercase">Failure Rate</div><div className="font-black text-slate-900">12%</div></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-[24px] font-bold text-slate-900 mb-2 tracking-tight">Manual testing is slow and shallow</h3>
                  <p className="text-[16px] text-slate-600 leading-relaxed font-medium">Writing conversations one by one limits coverage to what humans think of. Weeks of work, still missing edge cases.</p>
                </div>
              </div>

              {/* Sağ: Simulate at Scale */}
              <div className="flex flex-col gap-6">
                <div className="h-[300px] bg-slate-100 rounded-3xl border b order-slate-200 relative overflo w-hidden flex items-center justify-center p-8">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[...Array(120)].map((_, i) => (
                      <motion.div 
                        key={`scale-${i}`}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: Math.random() * 2, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}
                        className={`rounded-full ${i % 11 === 0 ? 'bg-rose-400' : 'bg-emerald-400'} ${i % 5 === 0 ? 'w-6 h-6' : 'w-4 h-4'}`}
                      />
                    ))}
                  </div>
                  <div className="absolute bottom-6 left-6 bg-white border b order-slate-200 rounded-lg px-4 py-2 shado w-xl flex items-center gap-4">
                    <div><div className="text-[10px] font-bold text-slate-400 uppercase">Datapoints</div><div className="font-black text-slate-900">1,250</div></div>
                    <div><div className="text-[10px] font-bold text-slate-400 uppercase">Failure Rate</div><div className="font-black text-rose-500">22%</div></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-[24px] font-bold text-slate-900 mb-2 tracking-tight">Simulate realistic users at scale</h3>
                  <p className="text-[16px] text-slate-600 leading-relaxed font-medium">Run hundreds of conversations in minutes across varied intents, personas, tones, goals, and adversarial tactics.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 5. HOW IT WORKS (TABS) */}
        {/* ========================================= */}
        <section className="py-32 bg-white b order-b b order-slate-200">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-[36px] md:text-[48px] font-black text-slate-900 tracking-[-0.03em] leading-tight text-center mb-12">
              How it works?
            </h2>
            
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
              {howItWorksData.map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full text-[15px] font-bold transition-all ${
                    activeTab === tab.id ? 'bg-slate-100 text-slate-900 shado w-sm border b order-slate-200' : 'bg-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            <div className="bg-[#FAFAFA] rounded-3xl border b order-slate-200 p-8 md:p-12">
              <AnimatePresence mode="wait">
                {howItWorksData.map((tab) => (
                  activeTab === tab.id && (
                    <motion.div 
                      key={tab.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                    >
                      <div>
                        <div className="inline-flex px-3 py-1 bg-white border b order-slate-200 rounded text-[12px] font-bold text-slate-500 mb-6">
                          Step 0{howItWorksData.findIndex(t => t.id === tab.id) + 1}
                        </div>
                        <h3 className="text-[28px] font-bold text-slate-900 tracking-tight mb-4">{tab.heading}</h3>
                        <p className="text-[16px] text-slate-600 leading-relaxed font-medium">{tab.desc}</p>
                      </div>
                      <div className="h-[250px]">
                        {tab.image}
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 6. COLORED USE CASE CARDS */}
        {/* ========================================= */}
        <section className="py-32 bg-[#FAFAFA] b order-b b order-slate-200 overflo w-hidden">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-4 flex flex-col justify-center">
              <h2 className="text-[36px] md:text-[44px] font-black text-slate-900 tracking-[-0.03em] leading-tight mb-6">
                Use Cases Powered by Simulation
              </h2>
              <p className="text-[18px] text-slate-600 font-medium">Simulated user conversations you can test with and train on.</p>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="bg-[#E6F0FF] border b order-[#B3D1FF] p-8 rounded-2xl shado w-sm hover:shado w-md transition-shadow">
                <h3 className="text-[24px] font-bold text-[#0047B3] tracking-tight mb-3">Eval Sets for Chatbots</h3>
                <p className="text-[16px] text-[#003380] leading-relaxed font-medium">Generate judge-labeled test datasets from simulated user conversations in minutes. Cover real behavior across intents, personas, tones, and multi-turn flows. Export to your eval tools.</p>
              </div>
              <div className="bg-[#E6FFF2] border b order-[#99E6C3] p-8 rounded-2xl shado w-sm hover:shado w-md transition-shadow">
                <h3 className="text-[24px] font-bold text-[#006633] tracking-tight mb-3">Fine-tuning Datasets</h3>
                <p className="text-[16px] text-[#004D26] leading-relaxed font-medium">Generate high-signal training data from the same runs: judge labels, preference pairs for DPO or reward models, and critique-and-revise triples for SFT. Export clean JSONL ready for training.</p>
              </div>
              <div className="bg-[#F0E6FF] border b order-[#CCB3FF] p-8 rounded-2xl shado w-sm hover:shado w-md transition-shadow">
                <h3 className="text-[24px] font-bold text-[#4700B3] tracking-tight mb-3">QA at Release Speed</h3>
                <p className="text-[16px] text-[#330080] leading-relaxed font-medium">Run hundreds of realistic conversations per build to catch issues manual testing misses. Save suites for regression and track error rates so problems don't reach production.</p>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================= */}
        {/* 7. 3-COLUMN TESTIMONIALS */}
        {/* ========================================= */}
        <section className="py-24 bg-white b order-b b order-slate-200">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-6">
              <p className="text-[15px] text-slate-600 leading-relaxed font-medium italic">"AI agent simulation is emerging as a powerful way to catch unreliable agent behavior before deployment. Aegisora's pioneering simulation engine delivers high-coverage, realistic insights into how agents will actually behave in the real world."</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 bg-slate-200 rounded-full overflo w-hidden"><img src="https://i.pravatar.cc/150?img=11" alt="Avatar"/></div>
                <div><div className="font-bold text-slate-900 text-[14px]">Justin Zhao</div><div className="text-[12px] text-slate-500 font-medium">Safety Evals @ Meta Superintelligence</div></div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-[15px] text-slate-600 leading-relaxed font-medium italic">"Aegisora simulated hundreds of conversations to test for AI risks such as hallucination and toxicity, helping us identify previously overlooked or under tested cases. Their risk report was also informative by highlighting areas that need further improvements."</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 bg-slate-200 rounded-full overflo w-hidden"><img src="https://i.pravatar.cc/150?img=33" alt="Avatar"/></div>
                <div><div className="font-bold text-slate-900 text-[14px]">Joe Chiu</div><div className="text-[12px] text-slate-500 font-medium">VP Data Management, Changi Airport</div></div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-[15px] text-slate-600 leading-relaxed font-medium italic">"Good synthetic data is hard to generate... When we started using Aegisora, the clearest difference we saw was how realistic the synthetic user personas felt. We have completely switched to using Aegisora for this data."</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 bg-slate-200 rounded-full overflo w-hidden"><img src="https://i.pravatar.cc/150?img=68" alt="Avatar"/></div>
                <div><div className="font-bold text-slate-900 text-[14px]">Aman Gupta</div><div className="text-[12px] text-slate-500 font-medium">Head of AI, Masterclass</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 8. FAQ ACCORDION */}
        {/* ========================================= */}
        <section className="py-32 bg-[#FAFAFA] b order-b b order-slate-200">
          <div className="max-w-[800px] mx-auto px-6">
            <h2 className="text-[36px] md:text-[48px] font-black text-slate-900 tracking-[-0.03em] leading-tight text-center mb-16">
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col b order-t b order-slate-200">
              {faqs.map((faq, idx) => (
                <div key={idx} className="b order-b b order-slate-200">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="text-[18px] font-bold text-slate-900">{faq.q}</span>
                    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center shrink-0 ml-4 transition-transform duration-300">
                      <Plus className={`w-4 h-4 text-slate-600 transition-transform duration-300 ${openFaq === idx ? 'rotate-45' : ''}`} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflo w-hidden"
                      >
                        <p className="pb-8 text-[16px] text-slate-600 leading-relaxed font-medium pr-12">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}