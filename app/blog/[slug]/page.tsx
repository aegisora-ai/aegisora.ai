"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPostPage() {
  return (
    <main className="min-h-screen w-full flex flex-col justify-between font-sans bg-[#f4f4f5] text-[#111111] pt-28">
      {/* Sadece Üst Menü / Navbar Yüzen Siyah Yapıda */}
      <Navbar />

      {/* Blog İçerik Alanı */}
      <div className="max-w-[760px] w-full mx-auto px-6 py-12">
        {/* Blog Başlığı ve Detayları */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 text-xs font-mono text-gray-500 mb-4">
            <span>Jul 13, 2020</span>
            <span>•</span>
            <span className="text-purple-600 font-semibold">Security</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif tracking-tight mb-6 leading-tight">
            How to Know if You Have Been Hacked – 12 Signs
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-xs">
              AM
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold">Anthon Moreland</p>
              <p className="text-[11px] font-mono text-gray-500">
                CMO & Founder
              </p>
            </div>
          </div>
        </div>

        {/* Blog Kapak Görseli Simülasyonu */}
        <div className="w-full h-80 bg-[#ededee] rounded-3xl mb-12 flex items-center justify-center border border-gray-300/60 shadow-sm">
          <span className="text-sm font-mono text-gray-400">
            Article Feature Image
          </span>
        </div>

        {/* Makale Gövdesi */}
        <div className="space-y-6 text-sm font-mono text-gray-700 leading-relaxed">
          <p>
            How do I know if I have been hacked? If something feels off with
            your devices or accounts, trust your instincts. Cyberattacks are
            becoming increasingly sophisticated, but hackers always leave traces
            behind.
          </p>
          <h2 className="text-2xl font-serif text-black pt-4">
            1. Unexplained Password Changes
          </h2>
          <p>
            If you suddenly find yourself locked out of your accounts or receive
            notifications about password resets you didn't initiate, your
            credentials have likely been compromised.
          </p>
          <h2 className="text-2xl font-serif text-black pt-4">
            2. Unknown Transactions or Activity
          </h2>
          <p>
            Check your bank statements, shopping accounts, and social media
            activity logs regularly. Unauthorized purchases or strange posts are
            immediate red flags.
          </p>
          <h2 className="text-2xl font-serif text-black pt-4">
            3. Unusual Device Behavior
          </h2>
          <p>
            Is your computer running abnormally slow, opening random windows, or
            showing mouse movements on its own? Malware or remote access trojans
            could be at play.
          </p>
        </div>

        {/* Yazara Dönüş / Geri Dön Butonu */}
        <div className="mt-16 pt-8 border-t border-gray-300/60 flex items-center justify-between">
          <Link
            href="/blog"
            className="text-xs font-mono underline text-purple-600 hover:text-black"
          >
            ← Back to Blog & News
          </Link>
          <Link
            href="/get-started"
            className="px-5 py-2.5 bg-[#b490ff] text-black text-xs font-medium rounded-full hover:bg-[#a37bf5] transition-colors shadow-sm"
          >
            Protect your data with Serus
          </Link>
        </div>
      </div>

      {/* Kurumsal Alt Footer */}
      <footer className="w-full border-t py-12 px-8 mt-20 border-gray-200 bg-[#efeff1]">
        <div className="max-w-[1100px] mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="2" />
            </svg>
            <span className="text-sm font-serif font-medium">Serus</span>
          </div>
          <p className="text-xs text-gray-500 font-mono text-center max-w-sm">
            You deserve control over your own information. Serus monitors what's
            visible, helps you manage it, and works to reduce your online
            exposure, so you can stay one step ahead.
          </p>
          <div className="flex items-center gap-4 text-gray-600">
            <Link href="#" className="hover:text-black transition-colors">
              🌐
            </Link>
            <Link href="#" className="hover:text-black transition-colors">
              ✖️
            </Link>
            <Link href="#" className="hover:text-black transition-colors">
              📷
            </Link>
            <Link href="#" className="hover:text-black transition-colors">
              🔗
            </Link>
          </div>
          <div className="w-full grid grid-cols-2 md:grid-cols-6 gap-8 pt-8 border-t border-gray-300/60 text-xs font-mono text-gray-500">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-black">Company</span>
              <Link href="/about" className="hover:text-black">
                About
              </Link>
              <Link href="#" className="hover:text-black">
                Careers
              </Link>
              <Link href="/blog" className="hover:text-black">
                Blog
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-black">Help</span>
              <Link href="/contact/support" className="hover:text-black">
                Support
              </Link>
              <Link href="#" className="hover:text-black">
                Status
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-black">Security</span>
              <Link href="/security" className="hover:text-black">
                Our Practices
              </Link>
              <Link href="/legal/gdpr" className="hover:text-black">
                GDPR
              </Link>
              <Link href="/legal/dpa" className="hover:text-black">
                DPA
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-black">Product</span>
              <Link href="/get-started" className="hover:text-black">
                Sign up
              </Link>
              <Link href="/login" className="hover:text-black">
                Log in
              </Link>
              <Link href="/business" className="hover:text-black">
                For businesses
              </Link>
              <Link href="/pricing" className="hover:text-black">
                Pricing
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-black">Contact</span>
              <Link href="/contact/sales" className="hover:text-black">
                Contact Sales
              </Link>
              <Link
                href="/contact/business-inquiry"
                className="hover:text-black"
              >
                Business inquiry
              </Link>
              <Link href="/contact/partnership" className="hover:text-black">
                Partnership
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-black">Legal</span>
              <Link href="/legal/dpa" className="hover:text-black">
                Acceptable Use
              </Link>
              <Link href="/legal/gdpr" className="hover:text-black">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
