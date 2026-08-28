"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Box, Tag, Copy, Check, ExternalLink, Globe } from "lucide-react";

// RESMİ GITHUB SVG İKONU
const GithubIcon = (props: React.ComponentProps<"svg">) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

export default function ValidatorDetail() {
  const [mounted, setMounted] = useState(false);
  const [copiedPip, setCopiedPip] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const copyToClipboard = (text: string, type: 'pip' | 'code') => {
    navigator.clipboard.writeText(text);
    if(type === 'pip') { setCopiedPip(true); setTimeout(() => setCopiedPip(false), 2000); }
    if(type === 'code') { setCopiedCode(true); setTimeout(() => setCopiedCode(false), 2000); }
  };

  const pipCommand = "pip install aegisora-contains-string";
  const pythonCode = `# Import Guard and Validator
from aegisora import Guard
from aegisora_contains_string import ContainsString

# Setup Guard with the validator
guard = Guard().use(ContainsString, substring="a", on_fail="exception")

# Test passing string
guard.validate("pass")

# Test failing string
try:
    guard.validate("fail")
except Exception as e:
    print(e)`;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] font-sans">
      <Navbar />

      {/* Top Breadcrumb & Title */}
      <div className="w-full bg-white b order-b b order-slate-200 py-8 px-6">
        <div className="max-w-[1200px] mx-auto">
          <Link href="/hub" className="inline-flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-[#0066FF] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Hub
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Box className="w-6 h-6 text-emerald-600" />
              </div>
              <h1 className="text-[32px] font-black text-slate-900 tracking-tight">Contains String</h1>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex gap-2">
                 <span className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 text-[11px] font-bold rounded uppercase tracking-wider"><Tag className="w-3 h-3" /> STRING</span>
                 <span className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 text-[11px] font-bold rounded uppercase tracking-wider"><Tag className="w-3 h-3" /> FORMATTING</span>
               </div>
               <a href="https://github.com/aegisora" className="flex items-center gap-2 px-4 py-2 border b order-slate-200 rounded-lg text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                 <GithubIcon className="w-4 h-4" /> See on GitHub
               </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1200px] mx-auto w-full flex-1 flex flex-col lg:flex-row px-6 py-12 gap-12">

        {/* Left Column (Documentation) */}
        <div className="flex-1 space-y-12">

          {/* Description */}
          <section>
            <h2 className="text-[20px] font-bold text-slate-900 mb-4 pb-2 b order-b b order-slate-200">Description</h2>
            <p className="text-[16px] text-slate-700 leading-relaxed font-medium">
              This validator ensures that a string contains a substring. It is a fundamental formatting guard used to verify expected tokens, mandatory clauses, or structural elements in LLM outputs.
            </p>
          </section>

          {/* Installation */}
          <section>
            <h2 className="text-[20px] font-bold text-slate-900 mb-4 pb-2 b order-b b order-slate-200">Installation</h2>
            <div className="relative group">
              <pre className="p-4 bg-slate-900 text-emerald-400 rounded-xl text-[14px] font-mono overflo w-x-auto">
                <code>{pipCommand}</code>
              </pre>
              <button onClick={() => copyToClipboard(pipCommand, 'pip')} className="absolute right-3 top-3 p-2 bg-white/10 hover:bg-white/20 rounded-md text-white transition-colors">
                {copiedPip ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </section>

          {/* Usage Examples */}
          <section>
            <h2 className="text-[20px] font-bold text-slate-900 mb-4 pb-2 b order-b b order-slate-200">Usage Examples</h2>
            <p className="text-[15px] text-slate-600 font-medium mb-4">Validating string output via Python. In this example, we'll test that a generated word contains the substring <code className="bg-slate-100 px-1 py-0.5 rounded text-rose-500">a</code>.</p>
            <div className="relative group">
              <pre className="p-5 bg-slate-900 text-blue-300 rounded-xl text-[13px] font-mono overflo w-x-auto leading-relaxed">
                <code>{pythonCode}</code>
              </pre>
              <button onClick={() => copyToClipboard(pythonCode, 'code')} className="absolute right-3 top-3 p-2 bg-white/10 hover:bg-white/20 rounded-md text-white transition-colors">
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </section>

          {/* Output */}
          <section>
            <h2 className="text-[20px] font-bold text-slate-900 mb-4 pb-2 b order-b b order-slate-200">Output</h2>
            <div className="p-4 bg-rose-50 border b order-rose-100 rounded-xl text-[14px] font-mono text-rose-800">
              Validation failed for field with errors: fail doesn't contain a
            </div>
          </section>

          {/* API Reference */}
          <section>
            <h2 className="text-[20px] font-bold text-slate-900 mb-4 pb-2 b order-b b order-slate-200">API Reference</h2>
            <div className="bg-white border b order-slate-200 rounded-xl p-6">
              <h3 className="font-mono text-[15px] font-bold text-slate-900 mb-4 bg-slate-100 inline-block px-3 py-1 rounded">
                __init__(self, substring: str, on_fail="noop")
              </h3>
              <p className="text-[15px] text-slate-600 font-medium mb-4">Initializes a new instance of the Validator class.</p>

              <h4 className="font-bold text-slate-900 mb-2">Parameters:</h4>
              <ul className="space-y-4 text-[14px] text-slate-700">
                <li className="flex gap-4">
                  <span className="font-mono bg-slate-100 px-2 py-1 rounded shrink-0 self-start">substring</span>
                  <span>(str): The substring that the input string is expected to contain.</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-mono bg-slate-100 px-2 py-1 rounded shrink-0 self-start">on_fail</span>
                  <span>(str, Callable): The policy to enact when a validator fails. If <code>str</code>, must be one of <code>reask</code>, <code>fix</code>, <code>filter</code>, <code>refrain</code>, <code>noop</code>, <code>exception</code>, or <code>fix_reask</code>.</span>
                </li>
              </ul>
            </div>
          </section>

        </div>

        {/* Right Column (Sticky Sidebar) */}
        <aside className="w-full lg:w-[320px] space-y-6">

          {/* Overview Card */}
          <div className="bg-white border b order-slate-200 rounded-xl p-6 shado w-sm sticky top-24">
            <div className="flex items-center justify-between mb-6 pb-4 b order-b b order-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2"><Globe className="w-4 h-4"/> Overview</h3>
              <span className="text-[10px] font-bold text-slate-400">UPDATED 3 WEEKS AGO</span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center b order-b b order-slate-50 pb-2">
                <span className="text-[12px] font-bold text-slate-500 uppercase">Developed By:</span>
                <span className="text-[13px] font-bold text-slate-900">Aegisora AI</span>
              </div>
              <div className="flex justify-between items-center b order-b b order-slate-50 pb-2">
                <span className="text-[12px] font-bold text-slate-500 uppercase">Date of Dev:</span>
                <span className="text-[13px] font-bold text-slate-900">Apr 24, 2024</span>
              </div>
              <div className="flex justify-between items-center b order-b b order-slate-50 pb-2">
                <span className="text-[12px] font-bold text-slate-500 uppercase">Validator Type:</span>
                <span className="text-[13px] font-bold text-slate-900">Format</span>
              </div>
              <div className="flex justify-between items-center b order-b b order-slate-50 pb-2">
                <span className="text-[12px] font-bold text-slate-500 uppercase">License:</span>
                <span className="text-[13px] font-bold text-slate-900">MIT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] font-bold text-slate-500 uppercase">Input/Output:</span>
                <span className="text-[13px] font-bold text-slate-900">Output</span>
              </div>
            </div>
          </div>

          {/* Quick Install Tabs */}
          <div className="bg-white border b order-slate-200 rounded-xl shado w-sm overflo w-hidden sticky top-[380px]">
            <div className="flex b order-b b order-slate-200">
              <button className="flex-1 py-3 text-[13px] font-bold bg-white text-[#0066FF] b order-b-2 b order-[#0066FF]">Install</button>
              <button className="flex-1 py-3 text-[13px] font-bold bg-slate-50 text-slate-500 hover:text-slate-900">Usage</button>
            </div>
            <div className="p-4">
              <div className="text-[11px] font-bold text-slate-500 uppercase mb-2">PIP</div>
              <div className="p-3 bg-slate-100 rounded-lg text-[12px] font-mono text-slate-800 break-all border b order-slate-200">
                pip install aegisora-contains-string
              </div>
            </div>
          </div>

        </aside>
      </div>

    </div>
  );
}
