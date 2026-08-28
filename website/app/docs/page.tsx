"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function DocsIntroduction() {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText("npm install @aegisora/node");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <span>Docs</span> <ChevronRight className="w-3 h-3" /> <span className="text-foreground">Getting Started</span>
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-foreground">Introduction to Aegisora</h1>
      <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
        Aegisora is an open-source AI security, governance, and policy enforcement runtime.
        It acts as a deterministic, secure gateway between your autonomous agents and external LLM providers.
      </p>

      {/* Info Card */}
      <div className="bg-secondary/40 border border-border rounded-xl p-6 mb-12 shadow-sm">
        <h3 className="text-lg font-bold text-foreground mb-3">Why wrap your agents in Aegisora?</h3>
        <ul className="space-y-3 text-muted-foreground text-sm">
          <li className="flex items-start gap-2">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
            <span><strong className="text-foreground">Zero-Trust Execution:</strong> Assume the LLM is compromised; enforce logic independently.</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
            <span><strong className="text-foreground">PII Redaction:</strong> Strip sensitive data automatically before it reaches third-party models.</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
            <span><strong className="text-foreground">Cryptographic Audit:</strong> Maintain a verifiable ledger of every agent action and enforcement decision.</span>
          </li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold border-b border-border pb-2 mb-6 text-foreground mt-12">Quick Installation</h2>
      <p className="text-muted-foreground mb-6 text-sm">Get started instantly in your existing AI stack using our official Node.js SDK.</p>

      {/* Code Block */}
      <div className="relative bg-[#111113] border border-slate-800 rounded-lg overflow-hidden my-6 shadow-md">
        <div className="flex items-center px-4 py-2 bg-[#18181b] border-b border-slate-800">
          <Terminal className="w-4 h-4 text-slate-500 mr-2" />
          <span className="text-xs text-slate-400 font-mono">Terminal</span>
          <button
            onClick={copyCode}
            className="ml-auto text-slate-500 hover:text-white transition-colors flex items-center gap-1 text-xs"
          >
            {copied ? <><Check className="w-3 h-3 text-emerald-500" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
          </button>
        </div>
        <div className="p-5 overflow-x-auto">
          <code className="text-sm font-mono text-emerald-400">npm install @aegisora/node</code>
        </div>
      </div>

      <h2 className="text-2xl font-bold border-b border-border pb-2 mb-6 mt-16 text-foreground">Next Steps</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <Link href="/docs/quickstart" className="block p-6 border border-border rounded-xl hover:border-primary transition-colors bg-card shadow-sm group">
          <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Quickstart Guide &rarr;</h3>
          <p className="text-sm text-muted-foreground">Build your first secured agent in 5 minutes.</p>
        </Link>
        <Link href="/docs/architecture" className="block p-6 border border-border rounded-xl hover:border-primary transition-colors bg-card shadow-sm group">
          <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Core Architecture &rarr;</h3>
          <p className="text-sm text-muted-foreground">Understand how the Policy Engine intercepts requests.</p>
        </Link>
      </div>
    </div>
  );
}
