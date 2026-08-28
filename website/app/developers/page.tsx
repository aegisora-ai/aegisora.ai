"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Terminal, Code2, Zap, PackageOpen } from "lucide-react";

export default function DevelopersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-24 pb-20 overflo w-hidden b order-b b order-border">
          <div className="absolute inset-0 bg-grid-slate opacity-10 dark:bg-grid-white pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">Built for Developers</h1>
              <p className="text-lg text-muted-foreground mb-10">
                Integrate Aegisora into your existing AI stack in minutes. Native SDKs for TypeScript and Python with sub-5ms policy evaluation latency.
              </p>
              <div className="flex items-center gap-4">
                <a href="/docs" className="bg-primary text-primary-foreground px-6 py-3 rounded-md text-sm font-bold shado w-md hover:bg-primary/90 transition-colors">
                  Read the Docs
                </a>
                <a href="https://github.com/aegisora" className="bg-card border b order-border text-foreground px-6 py-3 rounded-md text-sm font-bold hover:bg-accent transition-colors flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> View Source
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Code Snippet Section */}
        <section className="py-24 bg-[#09090b]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <div>
                <h3 className="text-3xl font-bold text-white mb-6">Wrap your agents instantly.</h3>
                <p className="text-slate-400 leading-relaxed mb-8">
                  No complex infrastructure changes required. Simply import the Aegisora SDK and wrap your existing LLM client. We handle the policy evaluation, redaction, and audit logging seamlessly in the background.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-slate-300">
                    <Zap className="w-5 h-5 text-blue-500" /> Adds &lt;5ms latency overhead
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <PackageOpen className="w-5 h-5 text-blue-500" /> Native OpenAI & Anthropic support
                  </li>
                </ul>
              </div>

              {/* Mock Code Block */}
              <div className="bg-[#111113] border b order-slate-800 rounded-xl overflo w-hidden shado w-2xl">
                <div className="flex items-center px-4 py-3 bg-[#18181b] b order-b b order-slate-800">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  </div>
                  <div className="mx-auto text-xs text-slate-500 font-mono">agent.ts</div>
                </div>
                <div className="p-6 overflo w-x-auto">
                  <pre className="text-sm font-mono text-slate-300">
<code className="text-blue-400">import</code> {`{ Aegisora }`} <code className="text-blue-400">from</code> <code className="text-emerald-400">'@aegisora/node'</code>;
<code className="text-blue-400">import</code> {`{ OpenAI }`} <code className="text-blue-400">from</code> <code className="text-emerald-400">'openai'</code>;{`\n\n`}
<span className="text-slate-500">{`// 1. Initialize Aegisora client`}</span>{`\n`}
<code className="text-blue-400">const</code> aegis = <code className="text-blue-400">new</code> Aegisora({`{`}
  apiKey: process.env.AEGISORA_API_KEY,
  enforcePolicies: <code className="text-amber-400">true</code>
{`}`});{`\n\n`}
<span className="text-slate-500">{`// 2. Wrap your LLM`}</span>{`\n`}
<code className="text-blue-400">const</code> openai = aegis.wrap(<code className="text-blue-400">new</code> OpenAI());{`\n\n`}
<span className="text-slate-500">{`// 3. Aegisora automatically intercepts and secures`}</span>{`\n`}
<code className="text-blue-400">const</code> response = <code className="text-amber-400">await</code> openai.chat.completions.create({`{`}
  model: <code className="text-emerald-400">'gpt-4'</code>,
  messages: [{` role: `}<code className="text-emerald-400">'user'</code>{`, content: userInput `}]
{`}`});
                  </pre>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
