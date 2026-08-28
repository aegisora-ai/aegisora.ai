"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Copy, Check, Terminal } from "lucide-react";

// --- KOPYALANABİLİR KOD BİLEŞENİ (Daha Şık, Karanlık Tema) ---
const CodeBlock = ({ code, language }: { code: string, language: string }) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative rounded-xl overflo w-hidden border b order-slate-200 bg-[#0A0A0A] my-6 shado w-sm">
      <div className="flex justify-between items-center px-4 py-2.5 b order-b b order-white/10 bg-white/5">
        <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5" /> {language}
        </span>
        <button onClick={copyToClipboard} className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-[12px] font-medium">
          {copied ? <><Check className="w-3.5 h-3.5 text-emerald-400"/> Copied</> : <><Copy className="w-3.5 h-3.5"/> Copy</>}
        </button>
      </div>
      <div className="p-5 overflo w-x-auto">
        <pre className="text-[14px] font-mono text-slate-50 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

// --- DOKÜMANTASYON İÇERİK VERİTABANI ---
const docsData: Record<string, { category: string; title: string; content: React.ReactNode }> = {
  "introduction": {
    category: "Getting Started",
    title: "Introduction to Aegisora",
    content: (
      <>
        <p className="text-[16px] text-slate-600 leading-relaxed mb-8">
          Aegisora is an open-source AI security, governance, and policy enforcement runtime. It acts as a deterministic, secure gateway between your autonomous agents and external LLM providers.
        </p>

        <div className="bg-blue-50/50 border b order-blue-100 rounded-2xl p-8 mb-10 shado w-sm">
          <h3 className="text-[18px] font-bold text-slate-900 mb-5">Why wrap your agents in Aegisora?</h3>
          <ul className="space-y-4">
            <li className="flex gap-3 text-[15px] text-slate-700 leading-relaxed">
              <span className="text-[#0066FF] font-black mt-0.5">•</span>
              <span><strong>Zero-Trust Execution:</strong> Assume the LLM is compromised; enforce logic independently without relying on system prompts.</span>
            </li>
            <li className="flex gap-3 text-[15px] text-slate-700 leading-relaxed">
              <span className="text-[#0066FF] font-black mt-0.5">•</span>
              <span><strong>PII Redaction:</strong> Strip sensitive user data automatically before it reaches third-party models.</span>
            </li>
            <li className="flex gap-3 text-[15px] text-slate-700 leading-relaxed">
              <span className="text-[#0066FF] font-black mt-0.5">•</span>
              <span><strong>Cryptographic Audit:</strong> Maintain a verifiable ledger of every agent action and enforcement decision.</span>
            </li>
          </ul>
        </div>

        <h2 className="text-[24px] font-bold text-slate-900 mt-12 mb-4 b order-b b order-slate-100 pb-3">Quick Installation</h2>
        <p className="text-[16px] text-slate-600 mb-2">Get started instantly in your existing AI stack using our official Node.js SDK.</p>
        <CodeBlock code="npm install @aegisora/node" language="bash" />
      </>
    )
  },
  "quickstart": {
    category: "Getting Started",
    title: "Quickstart Guide",
    content: (
      <>
        <p className="text-[16px] text-slate-600 leading-relaxed mb-8">
          Follow these steps to integrate Aegisora Runtime Gateway into your existing application in under 5 minutes.
        </p>

        <h3 className="text-[18px] font-bold text-slate-900 mt-8 mb-3">1. Initialize the Client</h3>
        <p className="text-[15px] text-slate-600 mb-2">First, import the SDK and initialize your Aegisora client with your organization's API key.</p>
        <CodeBlock
          language="typescript"
          code={`import { Aegisora } from '@aegisora/node';\n\nconst aegisora = new Aegisora({\n  apiKey: process.env.AEGISORA_API_KEY,\n  environment: 'production'\n});`}
        />

        <h3 className="text-[18px] font-bold text-slate-900 mt-10 mb-3">2. Wrap your LLM Call</h3>
        <p className="text-[15px] text-slate-600 mb-2">Pass your standard LLM request through the Aegisora gateway. It will automatically apply your configured policies.</p>
        <CodeBlock
          language="typescript"
          code={`const response = await aegisora.chat.completions.create({\n  model: "gpt-4o",\n  messages: [{ role: "user", content: "Analyze user data: Eray Özer, eray@example.com" }],\n  policies: ["redact_pii", "block_jailbreak"]\n});\n\nconsole.log(response.text); \n// Output: Analyze user data: [REDACTED_NAME], [REDACTED_EMAIL]`}
        />
      </>
    )
  },
  "zero-trust": {
    category: "Core Concepts",
    title: "Zero-Trust Architecture",
    content: (
      <>
        <p className="text-[16px] text-slate-600 leading-relaxed mb-6">
          Traditional software assumes internal components are safe. In the age of generative AI, relying on an LLM to follow system prompts or "behave safely" is fundamentally flawed. LLMs are non-deterministic and susceptible to prompt injection.
        </p>
        <p className="text-[16px] text-slate-600 leading-relaxed mb-8">
          Aegisora operates on a <strong>Zero-Trust Architecture</strong> for AI. We treat every LLM input and output as untrusted user data.
        </p>

        <div className="bg-slate-900 p-8 rounded-2xl border b order-slate-800 shado w-xl my-8 flex flex-col gap-4">
          <div className="px-5 py-3 bg-slate-800 text-slate-300 rounded-lg font-mono text-[13px] border b order-slate-700">1. User Input (Untrusted)</div>
          <div className="w-px h-6 bg-blue-500 ml-8"></div>
          <div className="px-5 py-4 bg-[#0066FF] text-white rounded-xl font-bold shado w-[0_0_20px_rgba(0,102,255,0.4)]">2. Aegisora Gateway (Deterministic Policy Check)</div>
          <div className="w-px h-6 bg-blue-500 ml-8"></div>
          <div className="px-5 py-3 bg-slate-800 text-slate-300 rounded-lg font-mono text-[13px] border b order-slate-700">3. LLM Provider (Untrusted Execution)</div>
          <div className="w-px h-6 bg-blue-500 ml-8"></div>
          <div className="px-5 py-4 bg-[#0066FF] text-white rounded-xl font-bold shado w-[0_0_20px_rgba(0,102,255,0.4)]">4. Aegisora Output Guard (Hallucination Check)</div>
        </div>
      </>
    )
  },
  "policy-engine": {
    category: "Governance",
    title: "The Policy Engine",
    content: (
      <>
        <p className="text-[16px] text-slate-600 leading-relaxed mb-6">
          The heart of Aegisora is the deterministic Policy Engine. Policies are written in standard YAML or JSON and evaluated at the edge with sub-10ms latency.
        </p>
        <CodeBlock
          language="yaml"
          code={`name: Enterprise_Strict_Guard\nversion: 1.2\n\ninput_guards:\n  - detect_pii: { action: "redact", severity: "high" }\n  - block_jailbreak: { action: "block", mode: "heuristic" }\n\noutput_guards:\n  - competitor_check: { action: "filter", list: ["CompetitorA", "CompetitorB"] }\n  - tone_analyzer: { allowed: ["professional", "neutral"] }`}
        />
      </>
    )
  },
  "node-sdk": {
    category: "Developers",
    title: "Node.js SDK",
    content: (
      <>
        <p className="text-[16px] text-slate-600 leading-relaxed mb-6">
          Our native Node.js SDK is fully typed with TypeScript and provides seamless integration into Next.js, Express, or raw Node environments.
        </p>
        <CodeBlock language="bash" code={`npm install @aegisora/node`} />

        <h3 className="text-[18px] font-bold text-slate-900 mt-10 mb-3">Example Validation Request</h3>
        <CodeBlock
          language="typescript"
          code={`import { Validator } from '@aegisora/node';\n\nconst result = await Validator.check({\n  input: userInput,\n  validators: ['pii', 'toxicity'],\n});\n\nif (!result.isValid) throw new Error("Security Violation");`}
        />
      </>
    )
  }
};

// --- MENÜ KATEGORİ YAPISI ---
const menuStructure = [
  {
    category: "Getting Started",
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "quickstart", label: "Quickstart" },
    ]
  },
  {
    category: "Core Concepts",
    items: [
      { id: "zero-trust", label: "Zero-Trust Architecture" },
    ]
  },
  {
    category: "Governance",
    items: [
      { id: "policy-engine", label: "Policy Engine" },
    ]
  },
  {
    category: "Developers",
    items: [
      { id: "node-sdk", label: "Node.js SDK" },
    ]
  }
];

export default function DocsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeDoc, setActiveDoc] = useState("introduction");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentData = docsData[activeDoc];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900">
      <Navbar />

      {/*
        KUSURSUZ HİZALANMIŞ MAIN LAYOUT (Vercel/Stripe Tarzı)
        - max-w-[1400px] ile sınırlandırıldı.
        - flex-1 ile tüm boşluğu kaplar.
      */}
      <div className="flex flex-1 w-full max-w-[1400px] mx-auto">

        {/* SOL: Sticky Sidebar Menu */}
        <aside className="hidden md:flex flex-col w-[260px] b order-r b order-slate-200 shrink-0 sticky top-[65px] h-[calc(100v h-65px)] overflo w-y-auto py-10 pl-6 pr-6">
          {menuStructure.map((group, idx) => (
            <div key={idx} className="mb-8">
              <h4 className="text-[13px] font-bold text-slate-900 mb-3 tracking-tight">{group.category}</h4>
              <ul className="flex flex-col gap-1">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveDoc(item.id)}
                      className={`text-[14px] text-left w-full px-3 py-2 rounded-lg transition-all ${
                        activeDoc === item.id
                        ? "bg-blue-50 text-[#0066FF] font-bold"
                        : "text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* SAĞ: Ana İçerik Alanı (Mükemmel Ortalanmış ve Okunabilir Genişlik) */}
        <main className="flex-1 min-w-0 bg-white">
          <div className="max-w-[800px] mx-auto px-8 py-12 lg:px-12 lg:py-16">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[14px] font-medium text-slate-500 mb-4">
              <span>Docs</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-900">{currentData.category}</span>
            </div>

            {/* Başlık */}
            <h1 className="text-[36px] md:text-[44px] font-black text-slate-900 tracking-[-0.03em] mb-8">
              {currentData.title}
            </h1>

            {/* Dinamik İçerik Geçişi */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
               {currentData.content}
            </div>

          </div>
        </main>

      </div>

      {/* İsteğe bağlı olarak Footer'ı Docs sayfasında koyu veya dar tutabilirsin, şu an global footer'ı kullanıyoruz */}
      <Footer />
    </div>
  );
}
