"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  RefreshCw,
  Eye,
  Users,
  ChevronDown,
  Key,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function SecurityPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const controls = [
    {
      title: "Infrastructure Strength",
      desc: "Unique authentication, restricted encryption keys, and strict access controls protect your AI integrations.",
      icon: Key,
    },
    {
      title: "Data Isolation",
      desc: "Your enterprise data and agent logs are strictly isolated. We never use your data to train external models.",
      icon: ShieldCheck,
    },
    {
      title: "Enterprise Encryption",
      desc: "AES-256 encryption at rest and TLS 1.3 in transit ensure your autonomous systems communicate securely.",
      icon: Lock,
    },
    {
      title: "Resilience & Uptime",
      desc: "Disaster recovery plans and continuous redundancy give us the backbone to support mission-critical AI.",
      icon: RefreshCw,
    },
    {
      title: "Audit & Retention",
      desc: "Clear data retention, automated deletion on departure, and detailed logging put you in the compliance driver's seat.",
      icon: Eye,
    },
    {
      title: "Role-Based Access",
      desc: "Hierarchy to ensure precise control over who can view agent logs and modify governance policies.",
      icon: Users,
    },
  ];

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
  ];

  return (
    <main className="min-h-screen w-full flex flex-col justify-between font-sans bg-[#f4f4f5] text-[#111111] pt-28">
      {/* Üst Menü / Navbar */}
      <Navbar />

      {/* Hero Bölümü */}
      <div className="max-w-[800px] w-full mx-auto px-6 pt-16 pb-16 text-center">
        <h1 className="text-4xl sm:text-6xl font-serif tracking-tight mb-6 leading-[1.1]">
          Enterprise-Grade AI Security
        </h1>
        <p className="text-sm sm:text-base font-mono text-gray-600 leading-relaxed mb-12 max-w-xl mx-auto">
          Built with security by design and guided by our deep ethical belief in
          giving you total control over your autonomous systems.
        </p>
      </div>

      {/* Güvenlik Kontrolleri Grid */}
      <div className="max-w-[1000px] w-full mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif tracking-tight mb-3">
            Security Controls
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {controls.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-start p-8 rounded-[2rem] bg-[#ededee] border border-gray-300/60 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-6 text-[#0066EE] shadow-sm">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-xs font-mono text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ SSS Bölümü */}
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
                    className="px-5 pb-5 text-[13px] font-mono text-gray-600 leading-relaxed border-t border-gray-300/40 pt-3"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Kusursuz Aegisora Ana Footer */}
      <footer className="w-full border-t py-16 px-6 mt-20 border-gray-200 bg-[#f4f4f5]">
        <div className="max-w-[1000px] mx-auto flex flex-col items-center">
          <Link
            href="/"
            className="flex items-center gap-3 group cursor-pointer mb-5"
          >
            <svg
              className="w-6 h-6 text-gray-400 group-hover:text-black transition-colors"
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
            <span className="text-xl font-serif font-bold tracking-tight text-[#111111]">
              Aegisora
            </span>
          </Link>

          <p className="text-[13px] text-gray-500 font-mono text-center max-w-[550px] leading-relaxed mb-8">
            You deserve control over your autonomous systems. Aegisora monitors
            what's happening, helps you manage it, and works to enforce your
            governance policies, so you can deploy AI safely.
          </p>

          <div className="flex items-center gap-6 text-gray-400 mb-16">
            <Link
              href="https://aegisora.ai"
              target="_blank"
              className="hover:text-gray-900 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </Link>
            <Link
              href="https://x.com/aegisora_ai"
              target="_blank"
              className="hover:text-gray-900 transition-colors"
            >
              <svg
                className="w-[18px] h-[18px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </Link>
            <Link
              href="https://www.linkedin.com/company/aegisora/posts/?feedView=all&viewAsMember=true"
              target="_blank"
              className="hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.847-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.588 0 4.257 2.36 4.257 5.39v6.351zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </Link>
          </div>

          <div className="w-full flex flex-wrap md:flex-nowrap justify-between gap-y-10 pt-10 border-t border-gray-300/60 text-[12.5px] font-mono text-gray-500 text-left">
            <div className="flex flex-col gap-3 w-1/2 md:w-auto">
              <span className="font-bold text-gray-900 mb-2">Company</span>
              <Link
                href="/about"
                className="hover:text-gray-900 transition-colors"
              >
                About
              </Link>
              <Link href="#" className="hover:text-gray-900 transition-colors">
                Careers
              </Link>
              <Link
                href="/blog"
                className="hover:text-gray-900 transition-colors"
              >
                Blog
              </Link>
            </div>
            <div className="flex flex-col gap-3 w-1/2 md:w-auto">
              <span className="font-bold text-gray-900 mb-2">Help</span>
              <Link
                href="/contact/support"
                className="hover:text-gray-900 transition-colors"
              >
                Support
              </Link>
              <Link href="#" className="hover:text-gray-900 transition-colors">
                Status
              </Link>
            </div>
            <div className="flex flex-col gap-3 w-1/2 md:w-auto">
              <span className="font-bold text-gray-900 mb-2">Security</span>
              <Link
                href="/security"
                className="hover:text-gray-900 transition-colors"
              >
                Our Practices
              </Link>
              <Link
                href="/legal/gdpr"
                className="hover:text-gray-900 transition-colors"
              >
                GDPR
              </Link>
              <Link
                href="/legal/dpa"
                className="hover:text-gray-900 transition-colors"
              >
                DPA
              </Link>
            </div>
            <div className="flex flex-col gap-3 w-1/2 md:w-auto">
              <span className="font-bold text-gray-900 mb-2">Product</span>
              <Link
                href="/get-started"
                className="hover:text-gray-900 transition-colors"
              >
                Sign up
              </Link>
              <Link
                href="/login"
                className="hover:text-gray-900 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/business"
                className="hover:text-gray-900 transition-colors"
              >
                For businesses
              </Link>
              <Link
                href="/pricing"
                className="hover:text-gray-900 transition-colors"
              >
                Pricing
              </Link>
            </div>
            <div className="flex flex-col gap-3 w-1/2 md:w-auto">
              <span className="font-bold text-gray-900 mb-2">Contact</span>
              <Link
                href="/contact/sales"
                className="hover:text-gray-900 transition-colors"
              >
                Contact Sales
              </Link>
              <Link
                href="/contact/business-inquiry"
                className="hover:text-gray-900 transition-colors"
              >
                Business inquiry
              </Link>
              <Link
                href="/contact/partnership"
                className="hover:text-gray-900 transition-colors"
              >
                Partnership
              </Link>
            </div>
            <div className="flex flex-col gap-3 w-1/2 md:w-auto">
              <span className="font-bold text-gray-900 mb-2">Legal</span>
              <Link
                href="/legal/dpa"
                className="hover:text-gray-900 transition-colors"
              >
                Acceptable Use
              </Link>
              <Link
                href="/legal/gdpr"
                className="hover:text-gray-900 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
