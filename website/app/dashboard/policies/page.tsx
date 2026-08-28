"use client";
import React from "react";
import { Plus, Search, MoreHorizontal, ShieldCheck, ShieldAlert, Code } from "lucide-react";

const policiesData = [
  { id: "pol_strict_pii", name: "Strict PII Redaction", mode: "Blocking", type: "Data Privacy", violations: "1,204", updated: "2 hours ago" },
  { id: "pol_anti_jailbreak", name: "Heuristic Anti-Jailbreak", mode: "Blocking", type: "Security", violations: "853", updated: "1 day ago" },
  { id: "pol_tone_check", name: "Professional Tone Enforcement", mode: "Log Only", type: "Brand Risk", violations: "12", updated: "3 days ago" },
  { id: "pol_no_competitors", name: "Competitor Mention Filter", mode: "Redact", type: "Business Logic", violations: "89", updated: "1 week ago" },
];

export default function PoliciesPage() {
  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[24px] font-black text-slate-900 tracking-tight">Policy Management</h1>
          <p className="text-[14px] text-slate-500 font-medium">Define and enforce runtime security rules across your AI stack.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-[13px] font-bold rounded-lg shado w-sm hover:bg-slate-800 transition-colors">
          <Plus className="w-4 h-4" /> Create Policy
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search policies..." className="w-full pl-9 pr-4 py-2 bg-white border b order-slate-200 rounded-lg text-[13px] focus:outline-none focus:b order-[#0066FF] focus:ring-1 focus:ring-[#0066FF]" />
        </div>
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
           <button className="px-3 py-1 bg-white shado w-sm rounded-md text-[12px] font-bold text-slate-900">Active</button>
           <button className="px-3 py-1 text-[12px] font-bold text-slate-500 hover:text-slate-900">Drafts</button>
           <button className="px-3 py-1 text-[12px] font-bold text-slate-500 hover:text-slate-900">Archived</button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border b order-slate-200 rounded-xl shado w-sm overflo w-hidden">
        <table className="w-full text-left b order-collapse">
          <thead>
            <tr className="bg-slate-50 b order-b b order-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4">Policy Name</th>
              <th className="px-6 py-4">Mode</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">24h Violations</th>
              <th className="px-6 py-4">Last Updated</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {policiesData.map((policy) => (
              <tr key={policy.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-slate-900 hover:text-[#0066FF] cursor-pointer">{policy.name}</span>
                    <span className="text-[12px] font-mono text-slate-400">{policy.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                    policy.mode === 'Blocking' ? 'bg-rose-100 text-rose-700' :
                    policy.mode === 'Redact' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {policy.mode === 'Blocking' ? <ShieldAlert className="w-3 h-3" /> :
                     policy.mode === 'Redact' ? <Code className="w-3 h-3" /> :
                     <ShieldCheck className="w-3 h-3" />}
                    {policy.mode}
                  </span>
                </td>
                <td className="px-6 py-4 text-[13px] font-medium text-slate-600">{policy.type}</td>
                <td className="px-6 py-4 text-[13px] font-mono text-slate-600">{policy.violations}</td>
                <td className="px-6 py-4 text-[13px] text-slate-500">{policy.updated}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 text-slate-400 hover:text-slate-900 rounded-md hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-all">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
