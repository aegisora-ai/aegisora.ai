"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Server, Activity, Shield, Layers, Database, Lock, GitCommit } from "lucide-react";

export default function PlatformPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-24 pb-20 overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-grid-slate opacity-10 dark:bg-grid-white pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">The Aegisora Platform</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              A comprehensive runtime governance and policy enforcement platform designed specifically for autonomous AI agents and complex LLM architectures.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-secondary/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              <div className="bg-card border border-border p-8 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Context Analyzer</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Evaluates incoming agent intents and outgoing tool calls in real-time, mapping execution flow against predefined enterprise boundaries.
                </p>
              </div>

              <div className="bg-card border border-border p-8 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Policy Engine</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Apply complex logical rulesets. Define what data an agent can touch, which APIs it can trigger, and when human approval is required.
                </p>
              </div>

              <div className="bg-card border border-border p-8 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-6">
                  <Server className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Enforcement Gateway</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The strict execution layer. Drops malicious requests instantly or redacts sensitive PII before it reaches third-party model providers.
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