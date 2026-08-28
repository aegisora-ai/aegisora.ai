"use client";

import { useSyncExternalStore } from "react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Menu, Shield, Lock, Zap, ArrowRight, Check, Server, FileKey,
  Terminal, Activity, ChevronDown, X, Sun, Moon, UserCog, ScrollText,
  Search, Landmark, Bot, Code, Building, FileCheck, Book, Code2,
  ShieldCheck, CheckCircle, FileText, BookOpen, Database, Globe,
  Fingerprint, Layers, Key, BarChart3, Gauge, Bell
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- CUSTOM ICONS ---
function GithubIcon(props: React.ComponentProps<"svg">) { return (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>); }
function LinkedinIcon(props: React.ComponentProps<"svg">) { return (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>); }

// --- ENTERPRISE MENU DATA ---
const MENU_DATA: Record<string, { title: string; desc: string; icon: React.ElementType; href: string }[]> = {
  Product: [
    { title: "Runtime Security", desc: "Protect AI actions before execution.", icon: Shield, href: "/platform/security" },
    { title: "Agent Governance", desc: "Control identities, permissions and scope.", icon: UserCog, href: "/platform/agents" },
    { title: "Policy Engine", desc: "Define deterministic runtime policies.", icon: ScrollText, href: "/platform/policies" },
    { title: "Runtime Enforcement", desc: "ALLOW, BLOCK, and ESCALATE decisions.", icon: Zap, href: "/platform/enforcement" },
    { title: "Audit & Evidence", desc: "Trace decisions and preserve evidence.", icon: Search, href: "/platform/audit" },
    { title: "Observability", desc: "Monitor runtime behavior and telemetry.", icon: Activity, href: "/platform/observability" },
  ],
  Solutions: [
    { title: "AI Security", desc: "Secure AI applications and agentic systems.", icon: Lock, href: "/solutions/ai-security" },
    { title: "AI Governance", desc: "Establish policies and controls for AI workloads.", icon: Landmark, href: "/solutions/ai-governance" },
    { title: "Agent Security", desc: "Govern autonomous agents and tool access.", icon: Bot, href: "/solutions/agent-security" },
    { title: "Developer Security", desc: "Integrate runtime security into existing apps.", icon: Code, href: "/solutions/developer-security" },
    { title: "Enterprise Security", desc: "Centralize controls across teams and environments.", icon: Building, href: "/solutions/enterprise-security" },
    { title: "Compliance & Risk", desc: "Connect runtime decisions with governance evidence.", icon: FileCheck, href: "/solutions/compliance-risk" },
  ],
  Resources: [
    { title: "Documentation", desc: "The complete guide to Aegisora.", icon: Book, href: "/docs" },
    { title: "Developers", desc: "SDKs, integrations, and tools.", icon: Code2, href: "/developers" },
    { title: "API Reference", desc: "REST and GraphQL API specifications.", icon: Terminal, href: "/docs/api" },
    { title: "Security", desc: "Architecture and security model.", icon: ShieldCheck, href: "/security" },
    { title: "Trust Center", desc: "Privacy, data handling, and security.", icon: CheckCircle, href: "/trust" },
    { title: "GitHub", desc: "Source code and open-source projects.", icon: GithubIcon, href: "https://github.com/aegisora-ai" },
    { title: "Changelog", desc: "Product release updates.", icon: FileText, href: "/changelog" },
    { title: "Blog", desc: "Technical articles and announcements.", icon: BookOpen, href: "/blog" },
  ]
};

export default function ObservabilityPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>("Product");
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0f] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900/50 transition-colors duration-300">

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[100] bg-[#f8fafc] dark:bg-[#0a0a0c] flex flex-col overflo w-y-auto lg:hidden">
            <div className="flex items-center justify-between px-6 py-5 b order-b b order-slate-200 dark:b order-white/10 bg-white dark:bg-[#0d0d0f]">
               <Link href="/" className="flex items-center outline-none">
                 <img src="/aegisora-logo-blue.png" alt="Aegisora" className="h-8 w-auto dark:hidden" />
                 <img src="/aegisora-logo-white.png" alt="Aegisora" className="h-8 w-auto hidden dark:block" />
               </Link>
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 outline-none text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"><X className="w-7 h-7 stroke-[1.5]" /></button>
            </div>
            <div className="flex flex-col px-4 py-4 flex-1">
               <Link href="/" className="px-2 py-4 b order-b b order-slate-200 dark:b order-white/10 text-slate-900 dark:text-white text-[16px] font-bold w-full text-left">Homepage</Link>
               {["Product", "Solutions", "Resources"].map(item => {
                  const isExpanded = expandedMobileItem === item;
                  return (
                    <div key={item} className="flex flex-col b order-b b order-slate-200 dark:b order-white/10">
                      <button onClick={() => setExpandedMobileItem(isExpanded ? null : item)} className="flex justify-between items-center px-2 py-5 text-slate-900 dark:text-white text-[16px] font-bold w-full outline-none text-left">
                        {item} <ChevronDown className={"w-5 h-5 text-slate-400 transition-transform duration-300 " + (isExpanded ? "rotate-180" : "")} />
                      </button>
                      <AnimatePresence>
                        {isExpanded && MENU_DATA[item] && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflo w-hidden">
                            <div className="pb-6 pt-2 flex flex-col gap-5 px-2">
                              {MENU_DATA[item].map((sub: any, idx: number) => (
                                <Link key={idx} href={sub.href} className="flex items-start gap-4 group">
                                  {sub.icon && (<div className="w-11 h-11 rounded-[10px] bg-white dark:bg-[#111113] border b order-slate-200 dark:b order-white/10 flex items-center justify-center shrink-0 shado w-sm group-hover:b order-blue-500 transition-colors"><sub.icon className="w-[20px] h-[20px] text-blue-600 dark:text-blue-500" /></div>)}
                                  <div className="flex flex-col pt-0.5">
                                    <div className="text-[15px] font-bold text-slate-900 dark:text-white mb-0.5">{sub.title}</div>
                                    <div className="text-[13px] text-slate-500 dark:text-slate-400 leading-snug">{sub.desc}</div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
               })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <header className="flex items-center justify-between px-6 py-4 b order-b b order-slate-200 dark:b order-white/10 bg-white/90 dark:bg-[#0d0d0f]/90 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center outline-none">
          <img src="/aegisora-logo-blue.png" alt="Aegisora" className="h-8 w-auto dark:hidden" />
          <img src="/aegisora-logo-white.png" alt="Aegisora" className="h-8 w-auto hidden dark:block" />
        </Link>
        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-semibold text-slate-600 dark:text-slate-300">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
          <Link href="/platform/observability" className="text-blue-600 dark:text-blue-400 transition-colors">Observability</Link>
          <Link href="/pricing" className="hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</Link>
        </nav>
        <div className="flex items-center gap-4 lg:gap-6">
          {mounted && (<button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 transition-colors">{theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>)}
          <Link href="/login" className="hidden lg:block text-[14px] font-semibold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">Log in</Link>
          <button className="hidden lg:block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md text-[14px] font-bold transition-colors">Start building</button>
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-1 outline-none text-slate-900 dark:text-white"><Menu className="w-7 h-7 stroke-[1.5]" /></button>
        </div>
      </header>

      <main className="pb-0">
        {/* HERO SECTION */}
        <section className="relative max-w-[1400px] mx-auto px-6 md:px-12 pt-16 md:pt-28 pb-20 overflo w-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl z-10">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border b order-blue-200 dark:b order-blue-800/50 text-slate-800 dark:text-blue-100 text-[13px] font-bold tracking-wide uppercase mb-8">
                <div className="w-5 h-5 rounded flex items-center justify-center bg-blue-100 dark:bg-blue-800"><Activity className="w-3 h-3 text-blue-600 dark:text-blue-300" /></div>
                Product / Observability
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="text-[40px] sm:text-[56px] lg:text-[72px] font-bold tracking-[-0.03em] text-slate-900 dark:text-white leading-[1.05] mb-6">
                Understand every <br />
                agent action.
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="text-[18px] md:text-[20px] text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
                Gain deep, real-time insights into your AI architecture. Monitor latency, track policy block rates, and visualize agent interactions across your entire infrastructure.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="flex items-center gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-[16px] font-bold transition-colors">View Dashboard</button>
              </motion.div>
            </div>

            {/* ABSTRACT DASHBOARD GRAPHIC */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative z-10 w-full rounded-2xl bg-white dark:bg-[#111113] border b order-slate-200 dark:b order-white/10 shado w-2xl overflo w-hidden p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[16px] font-bold text-slate-900 dark:text-white">Live Telemetry</h3>
                <div className="flex items-center gap-2"><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span></span><span className="text-[12px] font-bold text-blue-600 dark:text-blue-400 uppercase">Live</span></div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl border b order-slate-100 dark:b order-white/5 bg-slate-50 dark:bg-white/5">
                  <div className="text-[12px] text-slate-500 mb-1">Total Executions</div>
                  <div className="text-[24px] font-bold text-slate-900 dark:text-white">1.2M</div>
                </div>
                <div className="p-4 rounded-xl border b order-slate-100 dark:b order-white/5 bg-slate-50 dark:bg-white/5">
                  <div className="text-[12px] text-slate-500 mb-1">Block Rate</div>
                  <div className="text-[24px] font-bold text-blue-500">4.8%</div>
                </div>
                <div className="p-4 rounded-xl border b order-slate-100 dark:b order-white/5 bg-slate-50 dark:bg-white/5">
                  <div className="text-[12px] text-slate-500 mb-1">Avg Latency</div>
                  <div className="text-[24px] font-bold text-blue-500">2.4ms</div>
                </div>
              </div>

              {/* Pseudo Chart */}
              <div>
                <div className="text-[12px] font-bold text-slate-400 uppercase mb-4">Traffic (Last 60m)</div>
                <div className="flex items-end gap-2 h-24">
                  {[40, 60, 45, 80, 55, 90, 75, 40, 100, 85, 60, 70].map((h, i) => (
                    <div key={i} className="flex-1 bg-blue-100 dark:bg-blue-900/30 rounded-t-sm relative group">
                      <div className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm transition-all duration-1000" style={{ height: `${h}%` }}></div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-600/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        </section>

        {/* DETAILS */}
        <section className="b order-t b order-slate-200 dark:b order-white/10 bg-slate-50 dark:bg-[#0a0a0c] py-24 transition-colors">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-[#111113] border b order-slate-200 dark:b order-white/10 p-8 rounded-2xl">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6"><BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" /></div>
                <h3 className="text-[20px] font-bold text-slate-900 dark:text-white mb-3">Policy Hit Analysis</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Visualize which policies are triggered most frequently to understand your agents&apos; behavior patterns and tune your prompts accordingly.</p>
              </div>
              <div className="bg-white dark:bg-[#111113] border b order-slate-200 dark:b order-white/10 p-8 rounded-2xl">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6"><Gauge className="w-6 h-6 text-blue-600 dark:text-blue-400" /></div>
                <h3 className="text-[20px] font-bold text-slate-900 dark:text-white mb-3">Performance Metrics</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Track latency percentiles (P95, P99) of your AI architecture. Ensure Aegisora&apos;s runtime layer never slows down your end-user experience.</p>
              </div>
              <div className="bg-white dark:bg-[#111113] border b order-slate-200 dark:b order-white/10 p-8 rounded-2xl">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6"><Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" /></div>
                <h3 className="text-[20px] font-bold text-slate-900 dark:text-white mb-3">Instant Alerting</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Set up proactive webhooks, Slack pings, or PagerDuty alerts whenever an agent repeatedly attempts restricted actions.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
