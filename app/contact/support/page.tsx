"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function SupportPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    category: "Technical Platform Support",
    message: "",
    accepted: false,
  });

  return (
    <main className="min-h-screen w-full flex flex-col justify-between font-sans bg-[#f4f4f5] text-[#111111] pt-28">
      {/* Üst Menü / Navbar */}
      <Navbar />

      {/* Ana İçerik */}
      <div className="max-w-[640px] w-full mx-auto px-4 py-16 flex flex-col items-center">
        <div className="text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-serif tracking-tight mb-3">
            Aegisora Technical Support
          </h1>
          <p className="text-xs font-mono text-gray-500 max-w-lg leading-relaxed mx-auto">
            Our enterprise support team is here to help you deploy, integrate,
            and optimize the Aegisora AI Security & Governance platform. Tell us
            about your technical challenge.
          </p>
        </div>

        {/* Destek Formu Kutusu */}
        <div className="w-full rounded-[2rem] border p-8 shadow-sm mb-12 bg-white border-gray-200">
          <div className="flex flex-col gap-6">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium">Full name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full rounded-xl px-4 py-3 text-xs border focus:outline-none transition-colors focus:border-[#0066EE] bg-[#f9f9fa] border-gray-200 text-black placeholder-gray-400"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium">Work email</label>
              <input
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-xl px-4 py-3 text-xs border focus:outline-none transition-colors focus:border-[#0066EE] bg-[#f9f9fa] border-gray-200 text-black placeholder-gray-400"
              />
            </div>

            {/* Kategori Seçimi */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium">Issue Category</label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full rounded-xl px-4 py-3 text-xs border focus:outline-none focus:border-[#0066EE] bg-[#f9f9fa] border-gray-200 text-black appearance-none cursor-pointer"
                >
                  <option value="Technical Platform Support">
                    Technical Platform Support
                  </option>
                  <option value="Integration Help (API/SDK)">
                    Integration Help (API/SDK)
                  </option>
                  <option value="Account & Enterprise Billing">
                    Account & Enterprise Billing
                  </option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Security & Compliance Query">
                    Security & Compliance Query
                  </option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium">Message</label>
              <textarea
                rows={4}
                placeholder="Describe your technical issue, integration challenge, or question in detail..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full rounded-xl p-4 text-xs border focus:outline-none resize-none transition-colors focus:border-[#0066EE] bg-[#f9f9fa] border-gray-200 text-black placeholder-gray-400"
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="accept"
                checked={formData.accepted}
                onChange={(e) =>
                  setFormData({ ...formData, accepted: e.target.checked })
                }
                className="w-4 h-4 rounded border-gray-300 accent-[#0066EE] cursor-pointer"
              />
              <label
                htmlFor="accept"
                className="text-xs text-gray-500 cursor-pointer"
              >
                I accept the{" "}
                <Link
                  href="/legal/gdpr"
                  className="underline hover:text-[#0066EE] transition-colors"
                >
                  terms and conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/legal/gdpr"
                  className="underline hover:text-[#0066EE] transition-colors"
                >
                  privacy policy
                </Link>
                .
              </label>
            </div>

            {/* Submit Butonu */}
            <button className="w-full py-3.5 bg-[#0066EE] hover:bg-[#005bb5] text-white font-medium text-[13px] rounded-xl transition-colors shadow-sm cursor-pointer mt-2">
              Submit Request
            </button>
          </div>
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
