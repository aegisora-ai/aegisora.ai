"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Soyut Kurumsal Mavi Geometrik Çizimler (Blog Kartları İçin)
const AbstractArt1 = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <circle cx="150" cy="100" r="50" fill="#0066FF" />
    <rect x="180" y="60" width="80" height="80" fill="#33CCFF" rx="20" />
    <circle cx="280" cy="120" r="40" fill="#002299" />
  </svg>
);
const AbstractArt2 = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <path d="M100,150 L200,50 L300,150 Z" fill="#E6F0FF" />
    <circle cx="200" cy="120" r="30" fill="#0066FF" />
    <rect x="250" y="80" width="60" height="60" fill="#80B2FF" rx="30" />
  </svg>
);
const AbstractArt3 = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <rect x="80" y="50" width="240" height="100" fill="#F0F5FF" rx="50" />
    <circle cx="150" cy="100" r="40" fill="#33CCFF" />
    <circle cx="250" cy="100" r="40" fill="#002299" />
  </svg>
);

const blogPosts = [
  {
    title: "The Quest for Responsible AI: Navigating Enterprise Safety Guardrails",
    date: "Aug 28, 2026",
    tags: ["Guardrails", "Company"],
    art: <AbstractArt1 />,
    link: "/blog/the-quest-for-responsible-ai"
  },
  {
    title: "Aegisora x MLflow: Deterministic Safety and Quality Validators",
    date: "Mar 4, 2026",
    tags: ["All Blog Post", "Company"],
    art: <AbstractArt2 />,
    link: "/blog/the-quest-for-responsible-ai"
  },
  {
    title: "Aegisora AI and NVIDIA NeMo - A Comprehensive Approach to AI Safety",
    date: "Sep 25, 2025",
    tags: ["Guardrails"],
    art: <AbstractArt3 />,
    link: "/blog/the-quest-for-responsible-ai"
  },
  {
    title: "Testing Changi Airport's Chatbot with Simulated Eval Data",
    date: "Aug 14, 2025",
    tags: ["All Blog Post", "Case Study"],
    art: <AbstractArt2 />,
    link: "/blog/the-quest-for-responsible-ai"
  }
];

export default function BlogIndex() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Blog Post");
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const filters = ["All Blog Post", "Company", "Snowglobe", "Guardrails", "Case Study"];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] font-sans">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto px-6 py-16">

          {/* Header */}
          <div className="mb-12">
            <div className="text-[14px] font-medium text-slate-500 mb-4">
              <Link href="/" className="hover:text-slate-900 transition-colors">Homepage</Link> / <span className="text-[#0066FF]">Blog</span>
            </div>
            <h1 className="text-[48px] md:text-[64px] font-black text-slate-900 tracking-[-0.03em] mb-8">
              The Aegisora Blog
            </h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2.5 rounded-lg text-[14px] font-bold border transition-colors ${
                    activeFilter === filter
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, idx) => (
              <Link href={post.link} key={idx} className="group block bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="w-full h-[240px] bg-slate-50 flex items-center justify-center border-b border-slate-100 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  {post.art}
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className={`px-3 py-1 text-[12px] font-bold rounded-md ${tag === 'Guardrails' ? 'bg-[#0066FF] text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-[24px] font-bold text-slate-900 mb-3 tracking-tight leading-snug group-hover:text-[#0066FF] transition-colors">
                    {post.title}
                  </h3>
                  <div className="text-[14px] text-slate-400 font-medium">
                    {post.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
