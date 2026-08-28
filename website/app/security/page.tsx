"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Lock, Key, FileCheck, Eye, Fingerprint } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-24 pb-20 overflow-hidden border-b border-border bg-[#09090b]">
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
              <ShieldCheck className="w-4 h-4" /> Enterprise Grade
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">Zero-Trust AI Security</h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
              We assume every LLM is compromised. Aegisora provides a strict, deterministic security boundary between your non-deterministic models and your production infrastructure.
            </p>
          </div>
        </section>

        {/* Security Pillars */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <FileCheck className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold">Cryptographic Audit Trails</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Every decision made by an autonomous agent, and every subsequent enforcement action taken by Aegisora, is logged with cryptographic integrity. Generate compliance reports instantly for SOC2 and HIPAA requirements.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <Fingerprint className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold">PII Redaction & Privacy</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Protect customer data before it leaves your network. Aegisora&apos;s on-premise edge nodes automatically detect and redact Personally Identifiable Information (PII) before it is sent to external LLM providers.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
