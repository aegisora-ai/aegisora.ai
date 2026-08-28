"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Terminal, Copy, Check, BookOpen, Cpu, Shield } from "lucide-react";

export default function QuickstartPage() {
  const [copied, setCopied] = useState(false);
  const codeSnippet = `npm install @aegisora/node\n\nimport { Aegisora } from '@aegisora/node';\n\nconst aegisora = new Aegisora({ apiKey: process.env.AEGISORA_API_KEY });\nconst response = await aegisora.chat.completions.create({\n  model: "gpt-4o",\n  messages: [{ role: "user", content: "Hello world" }]\n});`;

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />

      <div className="max-w-[1000px] mx-auto px-6 py-20 flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border b order-blue-100 text-[#0066FF] text-[12px] font-bold mb-6">
          <Terminal className="w-3.5 h-3.5" /> Developers
        </div>

        <h1 className="text-[40px] font-black text-slate-900 tracking-tight mb-4">Quickstart Integration</h1>
        <p className="text-[18px] text-slate-600 font-medium mb-10">Integrate Aegisora security gateway into your Node.js or Python application in under 5 minutes.</p>

        <h3 className="text-[20px] font-bold text-slate-900 mb-4">1. Install and Initialize</h3>
        <div className="bg-slate-900 rounded-xl overflo w-hidden border b order-slate-800 shado w-xl mb-10">
          <div className="flex justify-between items-center px-4 py-3 bg-white/5 b order-b b order-white/10 text-slate-400 text-[12px] font-mono">
             <span>TypeScript / Node.js</span>
             <button onClick={() => { navigator.clipboard.writeText(codeSnippet); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1 hover:text-white transition-colors">
               {copied ? <><Check className="w-3.5 h-3.5 text-emerald-400"/> Copied</> : <><Copy className="w-3.5 h-3.5"/> Copy</>}
             </button>
          </div>
          <div className="p-6 overflo w-x-auto">
            <pre className="text-[14px] font-mono text-emerald-400 leading-relaxed">
              <code>{codeSnippet}</code>
            </pre>
          </div>
        </div>

        <h3 className="text-[20px] font-bold text-slate-900 mb-4">Next Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border b order-slate-200 rounded-xl hover:b order-[#0066FF] transition-colors group cursor-pointer">
             <Cpu className="w-6 h-6 text-[#0066FF] mb-3" />
             <h4 className="font-bold text-slate-900 text-[16px] group-hover:text-[#0066FF] transition-colors">Explore SDK Reference</h4>
             <p className="text-[14px] text-slate-500 mt-1">Deep dive into methods, client configurations, and error handling.</p>
          </div>
          <div className="p-6 border b order-slate-200 rounded-xl hover:b order-[#0066FF] transition-colors group cursor-pointer">
             <Shield className="w-6 h-6 text-[#0066FF] mb-3" />
             <h4 className="font-bold text-slate-900 text-[16px] group-hover:text-[#0066FF] transition-colors">Configure Policies</h4>
             <p className="text-[14px] text-slate-500 mt-1">Learn how to write custom YAML rules for PII and jailbreak detection.</p>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
