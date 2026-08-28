"use client";
import React from "react";
import { BookOpen, Database, ShieldCheck, Plus, Search } from "lucide-react";

const knowledgeBases = [
  { id: "kb_hr", name: "HR Policies & Handbook", vectorStore: "Pinecone (EU-Central)", documents: "1,420 chunks", status: "Protected", lastSync: "10 mins ago" },
  { id: "kb_eng", name: "Engineering Architecture Docs", vectorStore: "Milvus (AWS VPC)", documents: "8,910 chunks", status: "Protected", lastSync: "1 hour ago" },
  { id: "kb_sales", name: "Q4 Enterprise Playbooks", vectorStore: "Qdrant (Cloud)", documents: "430 chunks", status: "Scanning", lastSync: "Just now" },
];

export default function KnowledgeGovernancePage() {
  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[24px] font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-slate-400" /> Knowledge Governance (RAG Security)
          </h1>
          <p className="text-[14px] text-slate-500 font-medium mt-1">Govern vector databases, prevent data poisoning, and enforce access controls on enterprise RAG.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-[13px] font-bold rounded-lg shado w-sm hover:bg-slate-800 transition-colors">
          <Plus className="w-4 h-4" /> Connect Knowledge Base
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-full sm:w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search vector stores..." className="w-full pl-9 pr-4 py-2 bg-white border b order-slate-200 rounded-lg text-[13px] focus:outline-none focus:b order-[#0066FF]" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border b order-slate-200 rounded-xl shado w-sm overflo w-hidden">
        <table className="w-full text-left b order-collapse">
          <thead>
            <tr className="bg-slate-50 b order-b b order-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4">Knowledge Base</th>
              <th className="px-6 py-4">Vector Store</th>
              <th className="px-6 py-4">Indexed Documents</th>
              <th className="px-6 py-4">Security Status</th>
              <th className="px-6 py-4 text-right">Last Sync</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {knowledgeBases.map((kb) => (
              <tr key={kb.id} className="hover:bg-slate-50 transition-colors text-[13px]">
                <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-blue-50 border b order-blue-100 flex items-center justify-center text-[#0066FF]">
                     <Database className="w-4 h-4" />
                   </div>
                   {kb.name}
                </td>
                <td className="px-6 py-4 font-mono text-slate-600">{kb.vectorStore}</td>
                <td className="px-6 py-4 font-mono text-slate-500">{kb.documents}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-600 text-[11px] font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-3 h-3" /> {kb.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 text-right">{kb.lastSync}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
