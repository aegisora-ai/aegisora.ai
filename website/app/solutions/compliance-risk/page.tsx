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
  Fingerprint, Layers, Key, FileCode, GitMerge, SlidersHorizontal, ShieldAlert, Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function GithubIcon(props: React.ComponentProps<"svg">) { return (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>); }
function LinkedinIcon(props: React.ComponentProps<"svg">) { return (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>); }

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

export default function ComplianceRiskPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>("Solutions");
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
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[100] bg-[#f8fafc] dark:bg-[#0a0a0c] flex flex-col overflow-y-auto lg:hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0d0d0f]">
               <Link href="/" className="flex items-center outline-none">
                 <img src="/aegisora-logo-blue.png" alt="Aegisora" className="h-8 w-auto dark:hidden" />
                 <img src="/aegisora-logo-white.png" alt="Aegisora" className="h-8 w-auto hidden dark:block" />
               </Link>
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 outline-none text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"><X className="w-7 h-7 stroke-[1.5]" /></button>
            </div>
            <div className="flex flex-col px-4 py-4 flex-1">
               <Link href="/" className="px-2 py-4 border-b border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-[16px] font-bold w-full text-left">Homepage</Link>
               {["Product", "Solutions", "Resources"].map(item => {
                  const isExpanded = expandedMobileItem === item;
                  return (
                    <div key={item} className="flex flex-col border-b border-slate-200 dark:border-white/10">
                      <button onClick={() => setExpandedMobileItem(isExpanded ? null : item)} className="flex justify-between items-center px-2 py-5 text-slate-900 dark:text-white text-[16px] font-bold w-full outline-none text-left">
                        {item} <ChevronDown className={"w-5 h-5 text-slate-400 transition-transform duration-300 " + (isExpanded ? "rotate-180" : "")} />
                      </button>
                      <AnimatePresence>
                        {isExpanded && MENU_DATA[item] && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="pb-6 pt-2 flex flex-col gap-5 px-2">
                              {MENU_DATA[item].map((sub: any, idx: number) => (
                                <Link key={idx} href={sub.href} className="flex items-start gap-4 group">
                                  {sub.icon && (<div className="w-11 h-11 rounded-[10px] bg-white dark:bg-[#111113] border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 shadow-sm group-hover:border-blue-500 transition-colors"><sub.icon className="w-[20px] h-[20px] text-blue-600 dark:text-blue-500" /></div>)}
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
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#0d0d0f]/90 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center outline-none">
          <img src="/aegisora-logo-blue.png" alt="Aegisora" className="h-8 w-auto dark:hidden" />
          <img src="/aegisora-logo-white.png" alt="Aegisora" className="h-8 w-auto hidden dark:block" />
        </Link>
        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-semibold text-slate-600 dark:text-slate-300">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Home</Link>
          <Link href="#" className="text-blue-600 dark:text-blue-500 transition-colors">Compliance & Risk</Link>
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
        <section className="relative max-w-[1400px] mx-auto px-6 md:px-12 pt-16 md:pt-28 pb-20 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl z-10">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 text-slate-800 dark:text-blue-100 text-[13px] font-bold tracking-wide uppercase mb-8">
                <div className="w-5 h-5 rounded flex items-center justify-center bg-blue-100 dark:bg-blue-800"><FileCheck className="w-3 h-3 text-blue-600 dark:text-blue-300" /></div>
                Solutions / Compliance & Risk
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="text-[40px] sm:text-[56px] lg:text-[72px] font-bold tracking-[-0.03em] text-slate-900 dark:text-white leading-[1.05] mb-6" dangerouslySetInnerHTML={{ __html: "Connect runtime decisions <br /> with governance evidence." }} />
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="text-[18px] md:text-[20px] text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
                Automate compliance reporting. Map runtime blocks directly to automotive safety standards (ISO 26262), SOC 2, and GDPR requirements with cryptographically verifiable logs.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="flex items-center gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-[16px] font-bold transition-colors">Contact Sales</button>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative z-10 w-full h-[400px] rounded-2xl bg-white dark:bg-[#111113] border border-slate-200 dark:border-white/10 shadow-2xl flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 opacity-40 dark:opacity-20" style={{ backgroundImage: 'radial-gradient(#94a3b8 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>
               <div className="w-32 h-32 rounded-full bg-blue-500/20 blur-3xl animate-pulse"></div>
               <FileCheck className="w-24 h-24 text-blue-500 absolute drop-shadow-2xl" strokeWidth={1} />
            </motion.div>
          </div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-600/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        </section>

        {/* BOTTOM CTA */}
        <section className="pt-12 pb-24 bg-white dark:bg-[#0d0d0f]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="bg-[#f8fafc] dark:bg-[#111113] border border-slate-200/50 dark:border-white/10 rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden transition-colors duration-300">
              <div className="relative z-10">
                <h2 className="text-[36px] md:text-[48px] font-bold text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight max-w-2xl">
                  Ready to deploy Compliance & Risk at scale?
                </h2>
                <Link href="/login" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg transition-colors text-[16px]">Get started today</Link>
              </div>
              <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-tl from-blue-100/50 dark:from-blue-900/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
