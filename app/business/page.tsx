"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function BusinessPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does Aegisora monitor AI agents?",
      a: "Aegisora integrates directly with your AI infrastructure. We track agent prompts, outputs, tool executions, and data access in real-time, automatically matching them against your enterprise governance and security policies.",
    },
    {
      q: "Does Aegisora track a compliance score?",
      a: "Yes. Aegisora compiles a health, security, and compliance score for every deployed AI agent and your overall infrastructure. It aggregates risk signals into a comprehensive profile, giving you a clear view of your AI security posture.",
    },
    {
      q: "Is our prompt and enterprise data safe?",
      a: "Absolutely. Your data is encrypted in transit and at rest, and handled in strict accordance with enterprise security standards. We never use your corporate data to train our own models; your environment remains completely isolated.",
    },
    {
      q: "What governance tools do you offer?",
      a: "Aegisora provides real-time monitoring dashboards, automated policy enforcement APIs, risk scoring, and comprehensive audit logging tailored for regulatory compliance and enterprise security teams.",
    },
    {
      q: "Are there limits to what AI platforms you support?",
      a: "We integrate seamlessly with major LLM providers, open-source models, and custom autonomous agent frameworks built within your organization.",
    },
    {
      q: "What type of risks do you prevent?",
      a: "We actively prevent data exfiltration, prompt injection, unauthorized tool execution, hallucinations, and any violations of your internal AI usage policies.",
    },
    {
      q: "How do I onboard my organization?",
      a: "You can sign up directly through our portal for standard deployments or contact our enterprise sales team for custom, infrastructure-wide integrations.",
    },
  ];

  const comparisonTable = [
    { feature: "Automated policy enforcement", without: false, with: true },
    { feature: "Agent action & output monitoring", without: false, with: true },
    { feature: "Real-time compliance alerts", without: false, with: true },
    { feature: "Automated rogue agent blocking", without: false, with: true },
    { feature: "Incident resolution tracking", without: false, with: true },
    {
      feature: "Continuous vulnerability scanning",
      without: false,
      with: true,
    },
    { feature: "Complete decision audit trail", without: false, with: true },
    {
      feature: "Monitored AI agents",
      without: "Depends on workload",
      with: "Unlimited",
    },
    {
      feature: "Time to detect policy violation",
      without: "Weeks / Months (If monitoring)",
      with: "Milliseconds-Minutes",
    },
    {
      feature: "Time to block risky action",
      without: "Days",
      with: "Real-time",
    },
    {
      feature: "Prioritization",
      without: '"What looks scary"',
      with: "Risk & intent scoring",
    },
    {
      feature: "Reporting",
      without: "Quarterly decks (If any)",
      with: "Real-time dashboard + audit reports",
    },
    {
      feature: "SLA",
      without: "None",
      with: "99.9% monitoring uptime (target)",
    },
  ];

  return (
    <main className="min-h-screen w-full flex flex-col justify-between font-sans bg-[#f4f4f5] text-[#111111] pt-24">
      {/* Sadece Üst Menü / Navbar Yüzen Siyah Yapıda */}
      <Navbar />

      {/* Hero / Business Başlığı */}
      <div className="max-w-[800px] w-full mx-auto px-6 pt-16 pb-16 text-center">
        <h1 className="text-4xl sm:text-6xl font-serif tracking-tight mb-6 leading-[1.1]">
          Protect your enterprise by governing your AI agents.
        </h1>
        <p className="text-sm sm:text-base font-mono text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto">
          Aegisora monitors AI behavior across your infrastructure so you can
          spot risks early, enforce compliance automatically, and deploy
          autonomous systems with confidence.
        </p>
        <Link href="/contact/sales">
          <button className="px-6 py-3.5 bg-[#0066EE] text-white text-xs font-medium rounded-full hover:bg-[#005bb5] transition-colors cursor-pointer shadow-sm">
            Contact sales
          </button>
        </Link>
      </div>

      {/* İstatistikler Bölümü */}
      <div className="max-w-[1000px] w-full mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-[2rem] bg-[#ededee] border border-gray-300/60 flex flex-col justify-between">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">
            Cost of a compliance breach
          </span>
          <p className="text-3xl font-serif font-bold mb-3">US$</p>
          <p className="text-xs font-mono text-gray-600">
            Average per incident—driven by data leaks, unauthorized access, and
            regulatory fines.
          </p>
          <Link
            href="#"
            className="text-xs font-mono underline mt-4 text-[#0066EE]"
          >
            Report
          </Link>
        </div>
        <div className="p-8 rounded-[2rem] bg-[#ededee] border border-gray-300/60 flex flex-col justify-between">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">
            Shadow AI impact
          </span>
          <p className="text-4xl font-serif font-bold mb-3">83 %</p>
          <p className="text-xs font-mono text-gray-600">
            Of enterprises have unmonitored AI deployments. Unapproved
            autonomous agents are actively interacting with corporate data.
          </p>
          <Link
            href="#"
            className="text-xs font-mono underline mt-4 text-[#0066EE]"
          >
            Source: Enterprise AI Study
          </Link>
        </div>
        <div className="p-8 rounded-[2rem] bg-[#ededee] border border-gray-300/60 flex flex-col justify-between">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">
            Detection time
          </span>
          <p className="text-4xl font-serif font-bold mb-3">258 Days</p>
          <p className="text-xs font-mono text-gray-600">
            To identify rogue AI behavior. Unmonitored models can expose
            sensitive data or break compliance for months.
          </p>
          <Link
            href="#"
            className="text-xs font-mono underline mt-4 text-[#0066EE]"
          >
            Source: IBM Security Report
          </Link>
        </div>
      </div>

      {/* Panel Önizleme / Dashboard Mockup */}
      <div className="max-w-[900px] w-full mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-serif tracking-tight mb-4">
          Complete visibility into your AI infrastructure
        </h2>
        <p className="text-xs font-mono text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Connect your environments, define your policies, and let Aegisora map
          every point of AI interaction across your organization. Get a unified
          view of what's secure, what's vulnerable, and what needs immediate
          action — without weeks of setup.
        </p>

        {/* Dashboard Mockup Kartı */}
        <div className="p-8 rounded-[2rem] bg-[#ededee] border border-gray-300/60 text-left shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-semibold">AI Governance Health</span>
            <span className="px-3 py-1 bg-[#0066EE]/15 text-[#0066EE] text-xs rounded-full font-mono font-semibold">
              Analyze
            </span>
          </div>
          <div className="flex items-center gap-8 mb-8 pb-6 border-b border-gray-300">
            <div className="w-24 h-24 rounded-full border-4 border-emerald-500 flex flex-col items-center justify-center font-serif text-2xl font-bold bg-white text-gray-900">
              98
              <span className="text-[10px] font-mono text-gray-500">
                Secure
              </span>
            </div>
            <span className="text-xs font-mono text-gray-500">98 / 100</span>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-white flex items-center justify-between text-xs font-mono">
              <span>
                Customer Support Agent{" "}
                <span className="text-gray-400">v2.1</span>
              </span>
              <span className="text-emerald-600 font-semibold">Compliant</span>
            </div>
            <div className="p-3 rounded-xl bg-white flex items-center justify-between text-xs font-mono">
              <span>
                Internal Data Analyst{" "}
                <span className="text-gray-400">v1.4</span>
              </span>
              <span className="text-emerald-600 font-semibold">Compliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Karşılaştırma Tablosu */}
      <div className="max-w-[1000px] w-full mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif tracking-tight mb-3">
            With Aegisora, you deploy AI with confidence
          </h2>
          <p className="text-xs font-mono text-gray-600 max-w-md mx-auto">
            Aegisora gives your team continuous visibility into AI behavior, so
            you can detect risks earlier, enforce rules instantly, and scale
            with greater security.
          </p>
        </div>

        {/* Tablo */}
        <div className="w-full overflow-x-auto rounded-3xl border border-gray-300 bg-[#ededee] p-6 shadow-sm">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-gray-300 pb-4">
                <th className="pb-4 font-semibold text-gray-900">
                  Enterprise features
                </th>
                <th className="pb-4 font-semibold text-center text-gray-600">
                  Without Aegisora
                </th>
                <th className="pb-4 font-semibold text-center text-[#0066EE]">
                  ✨ With Aegisora
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300/60">
              {comparisonTable.map((row, idx) => (
                <tr key={idx} className="py-3">
                  <td className="py-4 font-medium text-black">{row.feature}</td>
                  <td className="py-4 text-center text-gray-500">
                    {typeof row.without === "boolean" ? (
                      row.without ? (
                        <Check className="w-4 h-4 mx-auto text-emerald-600" />
                      ) : (
                        <X className="w-4 h-4 mx-auto text-red-500" />
                      )
                    ) : (
                      row.without
                    )}
                  </td>
                  <td className="py-4 text-center font-semibold text-[#0066EE]">
                    {typeof row.with === "boolean" ? (
                      row.with ? (
                        <Check
                          className="w-4 h-4 mx-auto text-emerald-600"
                          strokeWidth={3}
                        />
                      ) : (
                        <X
                          className="w-4 h-4 mx-auto text-red-500"
                          strokeWidth={3}
                        />
                      )
                    ) : (
                      row.with
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Invite Bölümü */}
      <div className="max-w-[800px] w-full mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-serif tracking-tight mb-3">
          Deploy governance in minutes.
        </h2>
        <p className="text-xs font-mono text-gray-600 mb-8 max-w-md mx-auto">
          Connect your infrastructure, set your policies, and let Aegisora start
          monitoring your AI agents. You'll get a clear view of what's active,
          what's compliant, and what needs action—without weeks of setup.
        </p>
        <Link href="/contact/sales">
          <button className="px-6 py-3.5 bg-[#0066EE] text-white text-xs font-medium rounded-full hover:bg-[#005bb5] transition-colors cursor-pointer shadow-sm">
            Contact sales
          </button>
        </Link>
      </div>

      {/* Questions? (FAQ Akordeon) */}
      <div className="max-w-[800px] w-full mx-auto px-6 py-16">
        <div className="mb-10">
          <h2 className="text-4xl font-serif tracking-tight">Questions?</h2>
          <p className="text-lg font-serif italic text-gray-500">
            We've got answers.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-300/80 rounded-2xl overflow-hidden bg-[#ededee]"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between font-medium text-sm cursor-pointer hover:bg-gray-200/50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 text-[#0066EE] ${openFaq === idx ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5 text-xs font-mono text-gray-600 leading-relaxed border-t border-gray-300/40 pt-3"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Kurumsal Alt Footer */}
      <footer className="w-full border-t py-12 px-8 mt-20 border-gray-200 bg-[#efeff1]">
        <div className="max-w-[1100px] mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 group cursor-pointer">
            <svg
              className="w-5 h-5 text-gray-500 group-hover:text-black transition-colors"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
              <circle cx="5" cy="12" r="1.5" />
              <circle cx="19" cy="12" r="1.5" />
              <circle cx="7" cy="7" r="1.5" />
              <circle cx="17" cy="17" r="1.5" />
              <circle cx="7" cy="17" r="1.5" />
              <circle cx="17" cy="7" r="1.5" />
            </svg>
            <span className="text-sm font-serif font-semibold tracking-tight text-[#111111]">
              Aegisora
            </span>
          </div>
          <p className="text-xs text-gray-500 font-mono text-center max-w-sm">
            You deserve control over your autonomous systems. Aegisora monitors
            what's happening, helps you manage it, and works to enforce your
            governance policies, so you can deploy AI safely.
          </p>
          <div className="flex items-center gap-4 text-gray-600">
            <Link href="#" className="hover:text-[#0066EE] transition-colors">
              🌐
            </Link>
            <Link href="#" className="hover:text-[#0066EE] transition-colors">
              ✖️
            </Link>
            <Link href="#" className="hover:text-[#0066EE] transition-colors">
              📷
            </Link>
            <Link href="#" className="hover:text-[#0066EE] transition-colors">
              🔗
            </Link>
          </div>
          <div className="w-full grid grid-cols-2 md:grid-cols-6 gap-8 pt-8 border-t border-gray-300/60 text-xs font-mono text-gray-500">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-black">Company</span>
              <Link href="/about" className="hover:text-[#0066EE]">
                About
              </Link>
              <Link href="#" className="hover:text-[#0066EE]">
                Careers
              </Link>
              <Link href="/blog" className="hover:text-[#0066EE]">
                Blog
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-black">Help</span>
              <Link href="/contact/support" className="hover:text-[#0066EE]">
                Support
              </Link>
              <Link href="#" className="hover:text-[#0066EE]">
                Status
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-black">Security</span>
              <Link href="/security" className="hover:text-[#0066EE]">
                Our Practices
              </Link>
              <Link href="/legal/gdpr" className="hover:text-[#0066EE]">
                GDPR
              </Link>
              <Link href="/legal/dpa" className="hover:text-[#0066EE]">
                DPA
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-black">Product</span>
              <Link href="/get-started" className="hover:text-[#0066EE]">
                Sign up
              </Link>
              <Link href="/login" className="hover:text-[#0066EE]">
                Log in
              </Link>
              <Link href="/business" className="hover:text-[#0066EE]">
                For businesses
              </Link>
              <Link href="/pricing" className="hover:text-[#0066EE]">
                Pricing
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-black">Contact</span>
              <Link href="/contact/sales" className="hover:text-[#0066EE]">
                Contact Sales
              </Link>
              <Link
                href="/contact/business-inquiry"
                className="hover:text-[#0066EE]"
              >
                Business inquiry
              </Link>
              <Link
                href="/contact/partnership"
                className="hover:text-[#0066EE]"
              >
                Partnership
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-black">Legal</span>
              <Link href="/legal/dpa" className="hover:text-[#0066EE]">
                Acceptable Use
              </Link>
              <Link href="/legal/gdpr" className="hover:text-[#0066EE]">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
