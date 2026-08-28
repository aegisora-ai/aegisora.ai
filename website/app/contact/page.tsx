"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ArrowLeft, Shield, Globe, Lock, CheckCircle, Mail, Building2, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const { theme } = useTheme();
return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0c] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900/50 flex flex-col md:flex-row">

      {/* LEFT SIDE - Value Proposition */}
      <div className="w-full md:w-5/12 lg:w-4/12 bg-white dark:bg-[#111113] border-r border-slate-200 dark:border-white/10 p-8 md:p-12 flex flex-col justify-between">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-[14px] font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-12">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <img src={mounted && theme === 'dark' ? "/aegisora-logo-white.png" : "/aegisora-logo-blue.png"} alt="Aegisora" className="h-8 w-auto mb-8" />

          <h1 className="text-[32px] md:text-[40px] font-bold tracking-tight leading-[1.1] mb-6">Talk to our security experts.</h1>
          <p className="text-[16px] text-slate-600 dark:text-slate-400 mb-12">
            Discover how Aegisora can help your engineering teams secure autonomous AI agents without slowing down your release cycle.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0"><Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" /></div>
              <div>
                <h3 className="font-bold text-[15px] mb-1">VPC & On-Premise</h3>
                <p className="text-[14px] text-slate-500">Deploy our validation engine directly within your own secure infrastructure.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0"><CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /></div>
              <div>
                <h3 className="font-bold text-[15px] mb-1">Compliance Ready</h3>
                <p className="text-[14px] text-slate-500">Meet strict SOC 2, HIPAA, and ISO 26262 requirements with cryptographic logs.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center shrink-0"><Lock className="w-5 h-5 text-amber-600 dark:text-amber-400" /></div>
              <div>
                <h3 className="font-bold text-[15px] mb-1">SAML SSO & RBAC</h3>
                <p className="text-[14px] text-slate-500">Manage hundreds of policies across global teams with Enterprise-grade access control.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-[13px] text-slate-500">
          Trusted by cybersecurity teams worldwide. <br/>
          <a href="mailto:founders@aegisora.com" className="text-blue-600 hover:underline font-bold mt-2 inline-block">founders@aegisora.com</a>
        </div>
      </div>

      {/* RIGHT SIDE - Form */}
      <div className="flex-1 p-8 md:p-12 lg:p-20 flex items-center justify-center">
        <div className="w-full max-w-[600px] bg-white dark:bg-[#111113] border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl p-8 md:p-10">
          <h2 className="text-[24px] font-bold mb-6">Contact Sales</h2>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300">First Name</label>
                <input type="text" className="w-full bg-slate-50 dark:bg-[#1a1a1f] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300">Last Name</label>
                <input type="text" className="w-full bg-slate-50 dark:bg-[#1a1a1f] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2"><Mail className="w-4 h-4"/> Work Email</label>
              <input type="email" className="w-full bg-slate-50 dark:bg-[#1a1a1f] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="john@company.com" />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2"><Building2 className="w-4 h-4"/> Company Name</label>
              <input type="text" className="w-full bg-slate-50 dark:bg-[#1a1a1f] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="Acme Corp" />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300">Monthly LLM Executions (Volume)</label>
              <select className="w-full bg-slate-50 dark:bg-[#1a1a1f] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none">
                <option>Just exploring</option>
                <option>Under 100,000</option>
                <option>100,000 - 1 Million</option>
                <option>1 Million - 10 Million</option>
                <option>10 Million+</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2"><MessageSquare className="w-4 h-4"/> How can we help?</label>
              <textarea rows={4} className="w-full bg-slate-50 dark:bg-[#1a1a1f] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none" placeholder="Tell us about your AI use cases, security concerns, or deployment requirements..."></textarea>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg text-[15px] transition-colors shadow-md">
              Submit Request
            </button>
            <p className="text-[12px] text-slate-500 text-center mt-4">By submitting, you agree to our Terms of Service and Privacy Policy.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
