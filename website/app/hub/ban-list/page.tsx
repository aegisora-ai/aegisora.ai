"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Box, Copy, Check, Star, Info, Download, Globe } from "lucide-react";

// Saf SVG İkonlar (Tag'ler için)
const GithubIcon = (props: React.ComponentProps<"svg">) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);
const TagIcon = (props: React.ComponentProps<"svg">) => <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" /></svg>;
const LanguageIcon = (props: React.ComponentProps<"svg">) => <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.236.035 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>;
const CpuIcon = (props: React.ComponentProps<"svg">) => <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" /></svg>;
const AlertIcon = (props: React.ComponentProps<"svg">) => <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const BotIcon = (props: React.ComponentProps<"svg">) => <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>;
const HeadsetIcon = (props: React.ComponentProps<"svg">) => <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>;

export default function BanListValidator() {
  const [mounted, setMounted] = useState(false);
  const [copiedPip, setCopiedPip] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const copyTo = (text: string, type: 'pip' | 'code') => {
    navigator.clipboard.writeText(text);
    if(type === 'pip') { setCopiedPip(true); setTimeout(() => setCopiedPip(false), 2000); }
    if(type === 'code') { setCopiedCode(true); setTimeout(() => setCopiedCode(false), 2000); }
  };

  const pipCmd = "pip install guardrails-ai-ban-list";
  const pyCode = `# Import Guard and Validator
from guardrails_ai.ban_list import BanList
from guardrails import Guard

# Setup Guard
guard = Guard().use(
    BanList(banned_words=['codename', 'athena'])
)

guard.validate("Hello world! I really like Python.") # Validator passes
guard.validate("I am working on a project with the code name A T H E N A") # Validator fails`;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] font-sans">
      <Navbar />
      
      {/* Top Banner (Birebir Resimdeki Yapı) */}
      <div className="w-full bg-white border-b border-slate-200 py-10 px-6">
        <div className="max-w-[1300px] mx-auto flex gap-6">
          <Link href="/hub" className="mt-1 text-slate-500 hover:text-[#0066FF] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
              <div className="flex items-center gap-3">
                <Box className="w-8 h-8 text-emerald-500" />
                <h1 className="text-[36px] font-bold text-slate-900 tracking-tight">Ban List</h1>
              </div>
              <div className="flex items-center gap-4 md:ml-auto">
                <button className="flex items-center gap-1.5 px-3 py-1 border border-slate-200 rounded text-[12px] font-bold text-slate-600 hover:bg-slate-50">
                  <Star className="w-3.5 h-3.5" /> 2
                </button>
                <a href="#" className="flex items-center gap-2 text-[11px] font-bold text-slate-600 uppercase tracking-wider hover:text-slate-900">
                  SEE ON GITHUB <GithubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <p className="text-[16px] text-slate-700 font-medium mb-6">
              Validates that the output does not contain banned words, using fuzzy search.
            </p>
            
            <div className="flex flex-wrap gap-2">
               <span className="flex items-center gap-1.5 px-2.5 py-1 border border-slate-200 bg-white text-slate-600 text-[11px] font-bold rounded-md uppercase tracking-wider shadow-sm"><LanguageIcon className="w-3.5 h-3.5" /> EN</span>
               <span className="flex items-center gap-1.5 px-2.5 py-1 border border-slate-200 bg-white text-slate-600 text-[11px] font-bold rounded-md uppercase tracking-wider shadow-sm"><TagIcon className="w-3.5 h-3.5" /> STRING</span>
               <span className="flex items-center gap-1.5 px-2.5 py-1 border border-slate-200 bg-white text-slate-600 text-[11px] font-bold rounded-md uppercase tracking-wider shadow-sm"><CpuIcon className="w-3.5 h-3.5" /> ML</span>
               <span className="flex items-center gap-1.5 px-2.5 py-1 border border-slate-200 bg-white text-slate-600 text-[11px] font-bold rounded-md uppercase tracking-wider shadow-sm"><AlertIcon className="w-3.5 h-3.5" /> BRAND RISK</span>
               <span className="flex items-center gap-1.5 px-2.5 py-1 border border-slate-200 bg-white text-slate-600 text-[11px] font-bold rounded-md uppercase tracking-wider shadow-sm"><BotIcon className="w-3.5 h-3.5" /> CHATBOTS</span>
               <span className="flex items-center gap-1.5 px-2.5 py-1 border border-slate-200 bg-white text-slate-600 text-[11px] font-bold rounded-md uppercase tracking-wider shadow-sm"><HeadsetIcon className="w-3.5 h-3.5" /> CUSTOMER SUPPORT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1300px] mx-auto w-full flex-1 flex flex-col lg:flex-row px-6 py-12 gap-16">
        
        {/* Left Column */}
        <div className="flex-1 space-y-10">
          
          <section>
            <h2 className="text-[20px] font-bold text-slate-900 mb-4">Description</h2>
            <p className="text-[15px] text-slate-800 leading-relaxed">Validates that output does not have banned words, using fuzzy search. Useful for preventing internal codenames from leaking.</p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-slate-900 mb-4">Intended Use</h2>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-slate-900 mb-4">Requirements</h2>
            <ul className="list-disc pl-5 space-y-2 text-[15px] text-slate-800">
              <li>Dependencies:
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li><code>guardrails-ai>=0.4.0</code></li>
                  <li><code>fuzzysearch</code></li>
                </ul>
              </li>
              <li>Foundation model access keys:
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li><code>OPENAI_API_KEY</code></li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-slate-900 mb-4">Installation</h2>
            <div className="relative group border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-slate-50">
              <pre className="p-5 text-[14px] font-mono text-emerald-700 overflow-x-auto">
                <code>{pipCmd}</code>
              </pre>
              <button onClick={() => copyTo(pipCmd, 'pip')} className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 transition-colors bg-white border border-slate-200 p-1.5 rounded-md shadow-sm">
                {copiedPip ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-slate-900 mb-4">Usage Examples</h2>
            <p className="text-[16px] font-bold text-slate-900 mb-2">Validating string output via Python</p>
            <p className="text-[15px] text-slate-800 mb-6">In this example, we apply the validator to a string output generated by an LLM.</p>
            
            <div className="relative group border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-slate-50 mb-10">
              <pre className="p-6 text-[14px] font-mono overflow-x-auto leading-relaxed">
                <code dangerouslySetInnerHTML={{__html: pyCode.replace(/#.*/g, '<span class="text-slate-400">$&</span>').replace(/guard.validate|from|import|Guard|BanList/g, '<span class="text-purple-700">$&</span>')}}></code>
              </pre>
              <button onClick={() => copyTo(pyCode, 'code')} className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 transition-colors bg-white border border-slate-200 p-1.5 rounded-md shadow-sm">
                {copiedCode ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* API Ref */}
            <div className="bg-slate-100/50 inline-block px-3 py-1.5 rounded text-[14px] font-mono font-bold text-slate-700 mb-4 border border-slate-200">
              __init__(self, on_fail="noop")
            </div>
            <p className="text-[15px] text-slate-800 mb-6">Initializes a new instance of the BanList class.</p>
            
            <h4 className="font-bold text-slate-900 mb-4 text-[16px]">Parameters</h4>
            <ul className="list-disc pl-5 space-y-4 text-[15px] text-slate-800 mb-8">
              <li><code className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">banned_words</code> <em className="text-slate-500">(List[str])</em>: A list of banned words to check for in output.</li>
              <li><code className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">max_l_dist</code> <em className="text-slate-500">(int)</em>: Maximum Levenshtein distance for fuzzy search. Defaults to 1.</li>
              <li><code className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">on_fail</code> <em className="text-slate-500">(str, Callable)</em>: The policy to enact when a validator fails. If <code>str</code>, must be one of <code>reask</code>, <code>fix</code>...</li>
            </ul>

            <div className="bg-slate-100/50 inline-block px-3 py-1.5 rounded text-[14px] font-mono font-bold text-slate-700 mb-4 border border-slate-200">
              validate(self, value, metadata) {'->'} ValidationResult
            </div>
            <p className="text-[15px] text-slate-800 mb-6">Validates the given <code className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">value</code> using the rules defined in this validator...</p>
            
            <p className="text-[15px] text-slate-800 mb-2">Note:</p>
            <ol className="list-decimal pl-5 space-y-2 text-[15px] text-slate-800 mb-8">
              <li>This method should not be called directly by the user. Instead, invoke <code className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">guard.parse(...)</code>...</li>
              <li>When invoking <code className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">guard.parse(...)</code>, ensure to pass the appropriate <code className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">metadata</code> dictionary...</li>
            </ol>

          </section>
        </div>

        {/* Right Column (Sidebar Cards) */}
        <aside className="w-full lg:w-[350px] space-y-6">
          
          {/* Overview */}
          <div className="bg-[#FAFAFA] border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[18px] font-bold text-slate-900 flex items-center gap-2"><Info className="w-5 h-5 text-slate-400"/> Overview</h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">UPDATED 3 WEEKS</span>
            </div>
            
            <div className="space-y-5 text-[12px]">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="font-bold text-slate-500 uppercase tracking-wider">DEVELOPED BY:</span>
                <span className="font-bold text-slate-900">Guardrails AI</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="font-bold text-slate-500 uppercase tracking-wider">DATE OF DEVELOPMENT:</span>
                <span className="font-bold text-slate-900">Aug 16, 2024</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="font-bold text-slate-500 uppercase tracking-wider">VALIDATOR TYPE:</span>
                <span className="font-bold text-slate-900">Data Leakage</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="font-bold text-slate-500 uppercase tracking-wider">BLOG:</span>
                <span className="font-bold text-slate-900"></span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="font-bold text-slate-500 uppercase tracking-wider">LICENSE:</span>
                <span className="font-bold text-slate-900">MIT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-500 uppercase tracking-wider">INPUT/OUTPUT:</span>
                <span className="font-bold text-slate-900">Input</span>
              </div>
            </div>
          </div>

          {/* Install */}
          <div className="bg-[#FAFAFA] border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-[18px] font-bold text-slate-900 flex items-center gap-2 mb-6"><Download className="w-5 h-5 text-slate-400"/> Install</h3>
            
            <div className="mb-6">
              <div className="text-[11px] font-bold text-slate-500 uppercase mb-2">PIP</div>
              <div className="p-3 bg-white border border-slate-200 rounded-lg text-[13px] font-mono text-slate-800">
                pip install guardrails-ai-ban-list
              </div>
            </div>
            
            <div className="mb-6">
              <div className="text-[11px] font-bold text-slate-500 uppercase mb-2">USAGE</div>
              <div className="p-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-[12px] font-mono text-slate-800 overflow-x-auto leading-relaxed">
                <span className="text-purple-700">from</span> guardrails <span className="text-purple-700">import</span> Guard<br/>
                <span className="text-purple-700">from</span> guardrails_ai.ban_list <span className="text-purple-700">import</span> BanList<br/><br/>
                guard = Guard().use(BanList)<br/>
                guard.validate("some text")
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-slate-200">
              <a href="#" className="text-[13px] font-bold text-slate-600 hover:text-slate-900 underline">guardrails-ai-ban-list on PyPI</a>
              <a href="#" className="text-[13px] font-bold text-slate-600 hover:text-slate-900 underline">Package README</a>
            </div>
          </div>

        </aside>
      </div>

    </div>
  );
}