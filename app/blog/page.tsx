"use client";

import Link from "next/link";
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
    },
    {
      slug: "architecture-of-zero-trust-ai-swarms",
      date: "Sep 28, 2026",
      category: "Governance",
      title: "The Architecture of a Zero-Trust AI Swarm",
      desc: "Deploying an AI agent should feel safe. But scaling multi-agent swarms across the enterprise introduces complex vulnerabilities. Discover how to enforce compliance dynamically.",
      author: "Aegisora Engineering",
      role: "Core Team",
    },
    {
      slug: "the-risks-of-shadow-ai",
      date: "Sep 15, 2026",
      category: "Enterprise",
      title: "Shadow AI: The Hidden Risk in Enterprise Infrastructure",
      desc: "What happens when unmonitored AI models access your corporate databases? Shadow AI opens direct routes into secure infrastructure. Here is how to regain visibility.",
      author: "Eray Özer",
      role: "Founder & CEO",
    },
  ];

  return (
    <main className="min-h-screen w-full flex flex-col justify-between font-sans bg-[#f4f4f5] text-[#111111] pt-28">
      {/* Üst Menü / Navbar */}
      <Navbar />

      <div className="text-center py-16 px-4">
        <h1 className="text-5xl lg:text-6xl font-serif tracking-tight mb-2">
          Blog & News
        </h1>
      </div>

      <div className="max-w-[1100px] w-full mx-auto px-4 pb-24 flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <Link
              key={idx}
              href={`/blog/${post.slug}`}
              className="rounded-[1.5rem] border border-gray-300 p-6 flex flex-col justify-between bg-white hover:border-[#0066EE] transition-all shadow-sm hover:shadow-md group"
            >
              <div>
                <div className="w-full h-48 bg-[#14151a] rounded-xl mb-5 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0e0f14] to-[#1c1d24]"></div>
                  <span className="text-[#0066EE] font-mono text-[10px] tracking-widest uppercase font-bold relative z-10">
                    Aegisora Article
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 mb-3">
                  <span className="font-medium">{post.date}</span>
                  <span className="bg-[#0066EE]/10 text-[#0066EE] px-2.5 py-0.5 rounded font-semibold">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-medium mb-3 group-hover:text-[#0066EE] transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-[12.5px] font-mono text-gray-600 line-clamp-3 leading-relaxed mb-6">
                  {post.desc}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-bold">
                  {post.author.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-gray-900">
                    {post.author}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">
                    {post.role}
                  </span>
                </div>
              </div>
            </Link>
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
            {/* GitHub İkonu (Instagram yerine eklendi) */}
            <Link
              href="https://github.com/aegisora"
              target="_blank"
              className="hover:text-[#0066EE] transition-colors"
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
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </Link>
            <Link
              href="https://www.linkedin.com/company/aegisora/"
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

          {/* Telif (Copyright) ve Alt Linkler Bölümü */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between pt-8 pb-2 mt-12 border-t border-gray-300/60 text-[11px] font-mono text-gray-500">
            <span className="mb-4 md:mb-0">
              © 2026 Aegisora. All rights reserved.
            </span>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-gray-900 transition-colors">
                AI Info
              </Link>
              <Link href="#" className="hover:text-gray-900 transition-colors">
                AI Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
