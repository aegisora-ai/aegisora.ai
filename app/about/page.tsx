"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
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

  const team = [
    { name: "Filip Landgzen, PhD", role: "Chief Scientist, CEO & Co-Founder" },
    { name: "Anthon Mansland", role: "Head of Product & Co-Founder" },
    { name: "Argjent Sahiti", role: "CTO" },
    { name: "Johan Sollevi", role: "Chief Sales Officer" },
    { name: "Shkumbin Hasani", role: "Senior Fullstack Engineer" },
    { name: "Fidan Sinani", role: "Senior Fullstack Engineer" },
    { name: "Ida Nilsson", role: "Customer Success Manager" },
    { name: "Mal Kazazi", role: "UX Designer" },
    { name: "Ludwig Sandgren", role: "Head of Legal" },
    { name: "Tor Erland Fyksen", role: "Board Member" },
    { name: "Just-Acne Storvik", role: "Board Member" },
    { name: "Daniel Öderyd", role: "Board Member" },
  ];

  return (
    <main className="min-h-screen w-full flex flex-col justify-between font-sans bg-[#f4f4f5] text-[#111111] pt-24">
      {/* Üst Menü / Navbar */}
      <Navbar />

      {/* Hero / Vizyon Bölümü */}
      <div className="max-w-[800px] w-full mx-auto px-6 pt-16 pb-16 text-center">
        <h1 className="text-4xl sm:text-6xl font-serif tracking-tight mb-8 leading-[1.1]">
          We're building the future of secure autonomous AI
        </h1>
        <p className="text-sm sm:text-base font-mono text-gray-600 leading-relaxed mb-6 max-w-2xl mx-auto">
          In a world where AI agents are acting autonomously, Aegisora is here
          to ensure they do so safely. We're crafting a future where your
          enterprise innovation is never compromised by compliance or security
          blind spots.
        </p>
        <p className="text-sm sm:text-base font-mono text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Our solutions aren't just about locking down your models; they're
          about giving your team the freedom to scale AI with total control and
          visibility.
        </p>
      </div>

      {/* Our Story Bölümü */}
      <div className="max-w-[720px] w-full mx-auto px-6 py-16 border-t border-gray-300/60">
        <h2 className="text-3xl font-serif tracking-tight mb-6">Our story</h2>
        <div className="space-y-6 text-sm font-mono text-gray-600 leading-relaxed">
          <p>
            At Aegisora, we're driven by a simple belief: innovation should
            never compromise security. Born from a shared frustration with the
            lack of visibility in modern AI deployments, we started as a group
            of security engineers and AI researchers fed up with black-box
            models and reactive compliance.
          </p>
          <p>
            What began as late-night brainstorming over coffee grew into a
            mission to redefine AI governance. We launched Aegisora to empower
            enterprises to monitor, control, and secure their AI agents in
            real-time. With the support of strategic investors and successful
            funding rounds, we've rapidly expanded our vision.
          </p>
          <p>
            Aegisora isn't just an infrastructure company—it's the trust layer
            for the new age of technology. We're fighting for your right to
            deploy AI safely, confidently, and globally.
          </p>
        </div>
      </div>

      {/* What We Believe Bölümü */}
      <div className="max-w-[900px] w-full mx-auto px-6 py-16">
        <h2 className="text-3xl font-serif tracking-tight mb-10 text-center">
          What We Believe
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-[2rem] bg-[#ededee] border border-gray-300/60 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm">
              <Sparkles className="w-5 h-5 text-[#0066EE]" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-medium mb-3">
                You Need Total Visibility Into Your AI Systems
              </h3>
              <p className="text-xs font-mono text-gray-600 leading-relaxed">
                Knowledge is power. To scale AI safely, you need to know exactly
                what your agents are doing, what tools they access, and why. At
                Aegisora, we believe in empowering you with clear, real-time
                insights into your entire AI ecosystem.
              </p>
            </div>
          </div>
          <div className="p-8 rounded-[2rem] bg-[#ededee] border border-gray-300/60 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm">
              <Shield className="w-5 h-5 text-[#0066EE]" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-medium mb-3">
                Proactive Governance Is the Only Defense
              </h3>
              <p className="text-xs font-mono text-gray-600 leading-relaxed">
                Waiting for a rogue AI incident to happen is like leaving your
                enterprise database wide open. We believe in staying one step
                ahead of the risks. Aegisora's approach is all about proactive
                policy enforcement—blocking threats before they execute.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team (Takım) Bölümü */}
      <div className="max-w-[1100px] w-full mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-serif tracking-tight mb-6">Team</h2>
        <p className="text-xs font-mono text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          We're a crew of AI researchers, security engineers, and governance
          experts—united by a passion for making autonomous technology secure.
          From enterprise security veterans to empathetic designers who know
          enterprise software should feel intuitive...
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-full h-56 bg-[#dcdce0] rounded-2xl mb-4 overflow-hidden relative flex items-center justify-center border border-gray-300/50 shadow-sm">
                <span className="text-[10px] font-mono text-gray-500 tracking-widest">
                  •••••••••••••
                </span>
              </div>
              <span className="text-sm font-medium">{member.name}</span>
              <span className="text-[11px] font-mono text-[#0066EE] font-semibold mt-1">
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* We're hiring Bölümü */}
      <div className="max-w-[800px] w-full mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-serif tracking-tight mb-3">
          We're hiring
        </h2>
        <p className="text-xs font-mono text-gray-600 mb-6">
          We're creating something special, and we're looking for people who
          care deeply about AI safety and quality to build it with us.
        </p>
        <button className="px-8 py-3.5 bg-[#0066EE] text-white text-[13px] font-medium rounded-full hover:bg-[#005bb5] transition-all shadow-[0_8px_20px_rgba(0,102,238,0.25)] hover:shadow-[0_10px_25px_rgba(0,102,238,0.35)] hover:-translate-y-0.5 cursor-pointer">
          Open Positions
        </button>
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

      {/* Yenilenmiş Aegisora Ana Footer */}
      <footer className="w-full border-t py-16 px-8 mt-20 border-gray-200 bg-[#f4f4f5]">
        <div className="max-w-[1100px] mx-auto flex flex-col items-center">
          <Link
            href="/"
            className="flex items-center gap-3 group cursor-pointer mb-4"
          >
            <svg
              className="w-6 h-6 text-gray-500 group-hover:text-black transition-colors"
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

          <p className="text-[13px] text-gray-500 font-mono text-center max-w-[500px] leading-relaxed">
            You deserve control over your autonomous systems. Aegisora monitors
            what's happening, helps you manage it, and works to enforce your
            governance policies, so you can deploy AI safely.
          </p>

          <div className="flex items-center gap-5 text-gray-400 mt-6 mb-12">
            <Link
              href="https://aegisora.ai"
              target="_blank"
              className="hover:text-[#0066EE] transition-colors"
            >
              <svg
                className="w-[22px] h-[22px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
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
              className="hover:text-[#0066EE] transition-colors"
            >
              <svg
                className="w-[18px] h-[18px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </Link>
            <Link href="#" className="hover:text-[#0066EE] transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
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
              className="hover:text-[#0066EE] transition-colors"
            >
              <svg
                className="w-[22px] h-[22px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.847-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.588 0 4.257 2.36 4.257 5.39v6.351zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </Link>
          </div>

          <div className="w-full grid grid-cols-2 md:grid-cols-6 gap-8 pt-10 border-t border-gray-300/60 text-[11.5px] font-mono text-gray-500">
            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-gray-900 mb-1">Company</span>
              <Link
                href="/about"
                className="hover:text-[#0066EE] transition-colors"
              >
                About
              </Link>
              <Link href="#" className="hover:text-[#0066EE] transition-colors">
                Careers
              </Link>
              <Link
                href="/blog"
                className="hover:text-[#0066EE] transition-colors"
              >
                Blog
              </Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-gray-900 mb-1">Help</span>
              <Link
                href="/contact/support"
                className="hover:text-[#0066EE] transition-colors"
              >
                Support
              </Link>
              <Link href="#" className="hover:text-[#0066EE] transition-colors">
                Status
              </Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-gray-900 mb-1">Security</span>
              <Link
                href="/security"
                className="hover:text-[#0066EE] transition-colors"
              >
                Our Practices
              </Link>
              <Link
                href="/legal/gdpr"
                className="hover:text-[#0066EE] transition-colors"
              >
                GDPR
              </Link>
              <Link
                href="/legal/dpa"
                className="hover:text-[#0066EE] transition-colors"
              >
                DPA
              </Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-gray-900 mb-1">Product</span>
              <Link
                href="/get-started"
                className="hover:text-[#0066EE] transition-colors"
              >
                Sign up
              </Link>
              <Link
                href="/login"
                className="hover:text-[#0066EE] transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/business"
                className="hover:text-[#0066EE] transition-colors"
              >
                For businesses
              </Link>
              <Link
                href="/pricing"
                className="hover:text-[#0066EE] transition-colors"
              >
                Pricing
              </Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-gray-900 mb-1">Contact</span>
              <Link
                href="/contact/sales"
                className="hover:text-[#0066EE] transition-colors"
              >
                Contact Sales
              </Link>
              <Link
                href="/contact/business-inquiry"
                className="hover:text-[#0066EE] transition-colors"
              >
                Business inquiry
              </Link>
              <Link
                href="/contact/partnership"
                className="hover:text-[#0066EE] transition-colors"
              >
                Partnership
              </Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-gray-900 mb-1">Legal</span>
              <Link
                href="/legal/dpa"
                className="hover:text-[#0066EE] transition-colors"
              >
                Acceptable Use
              </Link>
              <Link
                href="/legal/gdpr"
                className="hover:text-[#0066EE] transition-colors"
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
