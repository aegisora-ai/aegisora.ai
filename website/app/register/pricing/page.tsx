"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does Aegisora monitor AI agents?",
      a: "Aegisora integrates seamlessly into your AI infrastructure to monitor agent actions, prompts, and outputs in real-time, instantly matching them against your enterprise security and governance policies.",
    },
    {
      q: "Does Aegisora track a compliance score?",
      a: "Yes. Aegisora compiles a comprehensive health and compliance score for every deployed AI agent and your overall infrastructure, giving your team instant visibility into your risk posture.",
    },
    {
      q: "Is our enterprise data safe?",
      a: "Absolutely. Your data is encrypted in transit and at rest, handled in strict accordance with enterprise security standards. We never use your proprietary corporate data or agent logs to train our own models.",
    },
    {
      q: "What governance tools do you offer?",
      a: "Aegisora provides real-time monitoring dashboards, automated policy enforcement APIs, continuous vulnerability scanning, and comprehensive audit logs tailored for enterprise compliance.",
    },
    {
      q: "Are there limits to the agents you can monitor?",
      a: "Aegisora scales with your enterprise. Whether you have 10 autonomous agents or 10,000, our infrastructure provides continuous monitoring without performance bottlenecks.",
    },
    {
      q: "What type of risks do you prevent?",
      a: "We actively prevent data exfiltration, prompt injection, unauthorized tool execution, hallucinations, and any deviations from your internal AI usage guidelines.",
    },
    {
      q: "How do I onboard my organization?",
      a: "You can start with our free tier to test the platform on a limited scale, or contact our enterprise sales team for a custom, infrastructure-wide deployment.",
    },
  ];

  return (
    <main className="min-h-screen w-full flex flex-col justify-between font-sans bg-[#f4f4f5] text-[#111111] pt-28">
      {/* Sadece Üst Menü / Navbar Yüzen Siyah Yapıda */}
      <Navbar />

      {/* Hero / Fiyatlandırma Başlığı */}
      <div className="max-w-[800px] w-full mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl sm:text-6xl font-serif tracking-tight mb-6 leading-[1.1]">
          Secure your AI for free. Scale later.
        </h1>
        <p className="text-sm sm:text-base font-mono text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto">
          Choose a plan, deploy your first governance policies, and upgrade as
          your AI infrastructure scales. No tricks, no lock-ins — just honest
          enterprise pricing.
        </p>

        {/* Butonlar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/get-started"
            className="px-8 py-3.5 bg-[#0066EE] text-white text-[13px] font-medium rounded-full hover:bg-[#005bb5] transition-all shado w-[0_8px_20px_rgba(0,102,238,0.25)] hover:shado w-[0_10px_25px_rgba(0,102,238,0.35)] hover:-translate-y-0.5"
          >
            Sign up for free
          </Link>
          <Link
            href="/business"
            className="px-8 py-3.5 bg-white border b order-gray-300 text-black text-[13px] font-medium rounded-full hover:b order-black transition-colors shado w-sm"
          >
            Business prices
          </Link>
        </div>

        {/* Esneklik Rozetleri */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 b order-t b order-gray-300/60 text-[13px] font-mono text-gray-600">
          <span className="flex items-center gap-2">
            ✅ Add credits anytime
          </span>
          <span className="flex items-center gap-2">
            ✅ 30-day money back guarantee
          </span>
          <span className="flex items-center gap-2">✅ Cancel anytime</span>
        </div>
      </div>

      {/* Fiyatlandırma Kartları (3 Sütun) */}
      <div className="max-w-[1100px] w-full mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Free Plan */}
        <div className="p-8 rounded-[2rem] bg-[#ededee] border b order-gray-300/60 flex flex-col justify-between shado w-sm hover:shado w-md transition-shadow">
          <div>
            <h3 className="text-xl font-serif font-medium mb-1">Free</h3>
            <p className="text-2xl font-serif font-bold mb-6">
              $0
              <span className="text-xs font-mono font-normal text-gray-500">
                /mo
              </span>
            </p>
            <Link
              href="/get-started"
              className="block w-full py-3 bg-[#111111] text-white text-center text-[13px] font-medium rounded-xl mb-8 hover:bg-black transition-colors shado w-sm"
            >
              Get started free
            </Link>

            <span className="text-[11px] font-mono font-semibold text-gray-500 uppercase tracking-wider block mb-4">
              Governance & Control
            </span>
            <ul className="space-y-3 text-xs font-mono text-gray-600 mb-8">
              <li className="flex items-center gap-2">
                <X className="w-4 h-4 text-red-500" /> Autopilot (Automated
                Blocking)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0066EE]" /> 5 Active Policies /
                Environment
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0066EE]" /> Limited Aegisora
                Dashboard
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0066EE]" /> Basic Agent
                Monitoring
              </li>
              <li className="flex items-center gap-2">
                <X className="w-4 h-4 text-red-500" /> Custom Policy Enforcement
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0066EE]" /> Basic Alerts &
                Logging
              </li>
            </ul>

            <span className="text-[11px] font-mono font-semibold text-gray-500 uppercase tracking-wider block mb-4">
              Security Intelligence
            </span>
            <ul className="space-y-3 text-xs font-mono text-gray-600">
              <li className="flex items-center gap-2 text-gray-400">
                <X className="w-4 h-4 text-red-500" /> 0 Security Credits
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0066EE]" /> Vulnerability Scan
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <X className="w-4 h-4 text-red-500" /> AI Threat Intel API
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <X className="w-4 h-4 text-red-500" /> Audit Export & Search
              </li>
            </ul>
          </div>
        </div>

        {/* Intelligence (Professional) Plan */}
        <div className="p-8 rounded-[2rem] bg-white b order-2 b order-[#0066EE]/80 flex flex-col justify-between shado w-[0_15px_40px_rgba(0,102,238,0.12)] relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#0066EE] text-white text-[10px] font-mono rounded-full uppercase tracking-widest shado w-md">
            Popular
          </div>
          <div>
            <h3 className="text-xl font-serif font-medium mb-1">
              Intelligence
            </h3>
            <p className="text-2xl font-serif font-bold mb-6">
              $12.99
              <span className="text-xs font-mono font-normal text-gray-500">
                /mo
              </span>
            </p>
            <Link
              href="/get-started"
              className="block w-full py-3 bg-[#0066EE] text-white text-center text-[13px] font-medium rounded-xl mb-8 hover:bg-[#005bb5] transition-colors shado w-md"
            >
              Get started free
            </Link>

            <span className="text-[11px] font-mono font-semibold text-gray-500 uppercase tracking-wider block mb-4">
              Governance & Control
            </span>
            <ul className="space-y-3 text-xs font-mono text-gray-600 mb-8">
              <li className="flex items-center gap-2 text-gray-400">
                <X className="w-4 h-4 text-red-500" /> Autopilot (Automated
                Blocking)
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <X className="w-4 h-4 text-red-500" /> Unlimited Policies
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0066EE]" /> Full Aegisora
                Dashboard
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <X className="w-4 h-4 text-red-500" /> Advanced Agent Monitoring
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <X className="w-4 h-4 text-red-500" /> Custom Policy Enforcement
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <X className="w-4 h-4 text-red-500" /> Real-time Blocking Alerts
              </li>
            </ul>

            <span className="text-[11px] font-mono font-semibold text-gray-500 uppercase tracking-wider block mb-4">
              Security Intelligence
            </span>
            <ul className="space-y-3 text-xs font-mono text-gray-600">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0066EE]" /> 500 Monthly
                Security Credits
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0066EE]" /> Vulnerability Scan
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0066EE]" /> AI Threat Intel API
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0066EE]" /> Audit Export &
                Search
              </li>
            </ul>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="p-8 rounded-[2rem] bg-[#ededee] border b order-gray-300/60 flex flex-col justify-between shado w-sm hover:shado w-md transition-shadow">
          <div>
            <h3 className="text-xl font-serif font-medium mb-1">Premium</h3>
            <p className="text-2xl font-serif font-bold mb-6">
              $16.99
              <span className="text-xs font-mono font-normal text-gray-500">
                /mo
              </span>
            </p>
            <Link
              href="/get-started"
              className="block w-full py-3 bg-[#111111] text-white text-center text-[13px] font-medium rounded-xl mb-8 hover:bg-black transition-colors shado w-sm"
            >
              Get started free
            </Link>

            <span className="text-[11px] font-mono font-semibold text-gray-500 uppercase tracking-wider block mb-4">
              Governance & Control
            </span>
            <ul className="space-y-3 text-xs font-mono text-gray-600 mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0066EE]" /> Autopilot
                (Automated Blocking)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0066EE]" /> Unlimited Policies
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0066EE]" /> Full Aegisora
                Dashboard
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0066EE]" /> Advanced Agent
                Monitoring
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0066EE]" /> Custom Policy
                Enforcement
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0066EE]" /> Real-time Blocking
                Alerts
              </li>
            </ul>

            <span className="text-[11px] font-mono font-semibold text-gray-500 uppercase tracking-wider block mb-4">
              Security Intelligence
            </span>
            <ul className="space-y-3 text-xs font-mono text-gray-600">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0066EE]" /> 250 Monthly
                Security Credits
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0066EE]" /> Vulnerability Scan
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0066EE]" /> AI Threat Intel API
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0066EE]" /> Audit Export &
                Search
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Partner Logoları */}
      <div className="max-w-[900px] w-full mx-auto px-6 py-12 text-center">
        <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-8">
          Trusted by security teams at leading companies
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 text-sm font-serif font-bold">
          <span>Google</span>
          <span>amazon</span>
          <span>WB</span>
          <span>PwC</span>
          <span>M</span>
        </div>
      </div>

      {/* Questions? (FAQ Akordeon) */}
      <div className="max-w-[800px] w-full mx-auto px-6 py-16">
        <div className="mb-10">
          <h2 className="text-4xl font-serif tracking-tight">Questions?</h2>
          <p className="text-lg font-serif italic text-gray-500">
            We&apos;ve got answers.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border b order-gray-300/80 rounded-2xl overflo w-hidden bg-[#ededee]"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between font-medium text-[13.5px] cursor-pointer hover:bg-gray-200/50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 text-[#0066EE] ${
                    openFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5 text-[13px] font-mono text-gray-600 leading-relaxed b order-t b order-gray-300/40 pt-3"
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
      <footer className="w-full b order-t py-12 px-8 mt-20 b order-gray-200 bg-[#efeff1]">
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
            what&apos;s happening, helps you manage it, and works to enforce your
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
          <div className="w-full grid grid-cols-2 md:grid-cols-6 gap-8 pt-8 b order-t b order-gray-300/60 text-xs font-mono text-gray-500">
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
