"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldAlert, Network, TerminalSquare } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function BlogIndexPage() {
  const posts = [
    {
      slug: "securing-autonomous-ai-against-prompt-injection",
      date: "Oct 12, 2026",
      category: "Security",
      title: "Securing Autonomous AI Agents Against Prompt Injection",
      desc: "As enterprises scale AI agents, prompt injection becomes a critical threat vector. Learn how Aegisora's zero-trust proxy intercepts malicious tool calls at runtime.",
      author: "Eray Özer",
      role: "Founder & CEO",
      // Her post için özel bir ikon ve renk şeması tanımlıyoruz
      visual: {
        icon: ShieldAlert,
        color: "text-amber-400",
        bgLight: "bg-amber-500/10",
        label: "Injection Vector Intercepted",
      },
    },
    {
      slug: "architecture-of-zero-trust-ai-swarms",
      date: "Sep 28, 2026",
      category: "Governance",
      title: "The Architecture of a Zero-Trust AI Swarm",
      desc: "Deploying an AI agent should feel safe. But scaling multi-agent swarms across the enterprise introduces complex vulnerabilities. Discover how to enforce compliance dynamically.",
      author: "Aegisora Engineering",
      role: "Core Team",
      visual: {
        icon: Network,
        color: "text-blue-400",
        bgLight: "bg-blue-500/10",
        label: "Swarm Topology Secured",
      },
    },
    {
      slug: "the-risks-of-shadow-ai",
      date: "Sep 15, 2026",
      category: "Enterprise",
      title: "Shadow AI: The Hidden Risk in Enterprise Infrastructure",
      desc: "What happens when unmonitored AI models access your corporate databases? Shadow AI opens direct routes into secure infrastructure. Here is how to regain visibility.",
      author: "Eray Özer",
      role: "Founder & CEO",
      visual: {
        icon: TerminalSquare,
        color: "text-emerald-400",
        bgLight: "bg-emerald-500/10",
        label: "Shadow Telemetry Mapped",
      },
    },
  ];

  return (
    <main className="min-h-screen w-full flex flex-col justify-between font-sans bg-zinc-950 text-white pt-28 selection:bg-blue-500/30 relative overflow-hidden">
      {/* Arkaplan Işık Efektleri */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(0,102,238,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Üst Menü / Navbar */}
      <Navbar />

      <div className="relative z-10 text-center py-16 px-4">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] font-mono font-semibold uppercase tracking-widest text-blue-400 bg-blue-950/80 border border-blue-800/50 px-3.5 py-1.5 rounded-full mb-6 inline-block"
        >
          Intelligence & Insights
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight mb-4 text-white"
        >
          Blog & News
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-[13px] text-zinc-400 max-w-lg mx-auto leading-relaxed"
        >
          Industry insights, architectural deep dives, and product updates on
          agentic governance and zero-trust security.
        </motion.p>
      </div>

      <div className="relative z-10 max-w-[1100px] w-full mx-auto px-4 pb-24 flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, idx) => {
            const IconComponent = post.visual.icon;

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.1 }}
                key={idx}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="h-full bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/90 rounded-[2rem] p-6 flex flex-col justify-between shadow-lg hover:border-zinc-700 transition-all duration-300 group outline-none hover:-translate-y-1 block"
                >
                  <div>
                    {/* Görsel Simülasyon Alanı - Boşluk Giderildi */}
                    <div className="w-full h-48 bg-zinc-950 rounded-[1.25rem] mb-5 flex flex-col items-center justify-center relative overflow-hidden border border-zinc-800/60 shadow-inner group-hover:border-zinc-700/80 transition-colors p-4">
                      {/* Arkaplan Gradients */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-800/20" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,238,0.05)_0,transparent_60%)] pointer-events-none" />

                      {/* Lüks Enterprise UI Mockup */}
                      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full border border-zinc-800/50 bg-zinc-900/40 rounded-xl">
                        <div
                          className={`w-10 h-10 rounded-lg ${post.visual.bgLight} border border-zinc-700/50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500`}
                        >
                          <IconComponent
                            className={`w-5 h-5 ${post.visual.color}`}
                          />
                        </div>
                        <span className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase font-semibold">
                          Aegisora Core
                        </span>
                        <span
                          className={`mt-1 font-mono text-[10px] ${post.visual.color}`}
                        >
                          {post.visual.label}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-4">
                      <span className="font-medium text-zinc-400">
                        {post.date}
                      </span>
                      <span className="bg-blue-950/60 text-blue-400 border border-blue-800/50 px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider text-[9px]">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-medium mb-3 text-white group-hover:text-blue-400 transition-colors leading-tight tracking-tight">
                      {post.title}
                    </h3>
                    <p className="text-[12.5px] font-mono text-zinc-400 line-clamp-3 leading-relaxed mb-6">
                      {post.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-auto pt-5 border-t border-zinc-800/80">
                    <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 text-[11px] font-mono font-bold shadow-sm">
                      {post.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-semibold text-white tracking-tight">
                        {post.author}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {post.role}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Yenilenmiş Aegisora Ana Footer (Dark Mode, Yeni Logo & GitHub) */}
      <footer className="relative z-10 w-full border-t py-16 px-6 mt-10 border-zinc-800 bg-zinc-950">
        <div className="max-w-[1100px] mx-auto flex flex-col items-center">
          <Link
            href="/"
            className="flex items-center gap-3 group cursor-pointer mb-6 outline-none"
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <Image
                src="/logo-white.png"
                alt="Aegisora Logo"
                fill
                className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                sizes="32px"
              />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight text-white">
              Aegisora
            </span>
          </Link>

          <p className="text-[13px] text-zinc-500 font-mono text-center max-w-[500px] leading-relaxed">
            You deserve control over your autonomous systems. Aegisora
            intercepts unauthorized tool calls, enforces dynamic zero-trust
            policies, and guarantees raw payloads never leave your perimeter.
          </p>

          <div className="flex items-center gap-5 text-zinc-500 mt-8 mb-16">
            <Link
              href="https://aegisora.ai"
              target="_blank"
              className="hover:text-blue-400 transition-colors outline-none"
            >
              <svg
                className="w-[20px] h-[20px]"
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
              className="hover:text-blue-400 transition-colors outline-none"
            >
              <svg
                className="w-[16px] h-[16px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </Link>
            <Link
              href="https://www.linkedin.com/company/aegisora"
              target="_blank"
              className="hover:text-blue-400 transition-colors outline-none"
            >
              <svg
                className="w-[20px] h-[20px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.847-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.588 0 4.257 2.36 4.257 5.39v6.351zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </Link>
            <Link
              href="https://github.com/aegisora"
              target="_blank"
              className="hover:text-blue-400 transition-colors outline-none"
            >
              <svg
                className="w-[20px] h-[20px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
                />
              </svg>
            </Link>
          </div>

          <div className="w-full grid grid-cols-2 md:grid-cols-6 gap-8 pt-10 border-t border-zinc-800/80 text-[11.5px] font-mono text-zinc-500">
            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-zinc-300 mb-1">Company</span>
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                About
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Careers
              </Link>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-zinc-300 mb-1">Help</span>
              <Link
                href="/contact/support"
                className="hover:text-white transition-colors"
              >
                Support
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Status
              </Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-zinc-300 mb-1">Security</span>
              <Link
                href="/security"
                className="hover:text-white transition-colors"
              >
                Our Practices
              </Link>
              <Link
                href="/legal/gdpr"
                className="hover:text-white transition-colors"
              >
                GDPR
              </Link>
              <Link
                href="/legal/dpa"
                className="hover:text-white transition-colors"
              >
                DPA
              </Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-zinc-300 mb-1">Product</span>
              <Link
                href="/get-started"
                className="hover:text-white transition-colors"
              >
                Sign up
              </Link>
              <Link
                href="/login"
                className="hover:text-white transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/business"
                className="hover:text-white transition-colors"
              >
                For businesses
              </Link>
              <Link
                href="/pricing"
                className="hover:text-white transition-colors"
              >
                Pricing
              </Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-zinc-300 mb-1">Contact</span>
              <Link
                href="/contact/sales"
                className="hover:text-white transition-colors"
              >
                Contact Sales
              </Link>
              <Link
                href="/contact/business-inquiry"
                className="hover:text-white transition-colors"
              >
                Business inquiry
              </Link>
              <Link
                href="/contact/partnership"
                className="hover:text-white transition-colors"
              >
                Partnership
              </Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-zinc-300 mb-1">Legal</span>
              <Link
                href="/legal/dpa"
                className="hover:text-white transition-colors"
              >
                Acceptable Use
              </Link>
              <Link
                href="/legal/gdpr"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row items-center justify-between pt-8 pb-2 mt-12 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-500">
            <span className="mb-4 md:mb-0">
              © 2026 Aegisora. All rights reserved.
            </span>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-zinc-300 transition-colors">
                AI Info
              </Link>
              <Link href="#" className="hover:text-zinc-300 transition-colors">
                AI Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
