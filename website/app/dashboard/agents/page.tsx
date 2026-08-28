"use client";
import React from "react";
import { Plus, Search, Filter, MoreHorizontal, Activity, AlertOctagon, Bot } from "lucide-react";

const agentsData = [
  { id: "agt_001", name: "Customer Support Bot", provider: "OpenAI (gpt-4o)", status: "Active", latency: "42ms", requests: "842k" },
  { id: "agt_002", name: "Internal HR Assistant", provider: "Anthropic (claude-3)", status: "Active", latency: "65ms", requests: "12k" },
  { id: "agt_003", name: "Financial Data Extractor", provider: "Custom LLM", status: "At Risk", latency: "120ms", requests: "45k" },
  { id: "agt_004", name: "Sales Outreach Generator", provider: "OpenAI (gpt-4-turbo)", status: "Active", latency: "38ms", requests: "210k" },
];

export default function AgentsPage() {
  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[24px] font-black text-slate-900 tracking-tight">Agent Fleet</h1>
          <p className="text-[14px] text-slate-500 font-medium">Manage and monitor all autonomous agents connected to Aegisora.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0066FF] text-white text-[13px] font-bold rounded-lg shado w-sm hover:bg-[#0052CC] transition-colors">
          <Plus className="w-4 h-4" /> Add Agent
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search agents..." className="w-full pl-9 pr-4 py-2 bg-white border b order-slate-200 rounded-lg text-[13px] focus:outline-none focus:b order-[#0066FF] focus:ring-1 focus:ring-[#0066FF]" />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-white border b order-slate-200 rounded-lg text-[13px] font-bold text-slate-600 hover:bg-slate-50">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white border b order-slate-200 rounded-xl shado w-sm overflo w-hidden">
        <table className="w-full text-left b order-collapse">
          <thead>
            <tr className="bg-slate-50 b order-b b order-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4">Agent Name</th>
              <th className="px-6 py-4">Provider</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Avg Latency</th>
              <th className="px-6 py-4">Total Requests</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {agentsData.map((agent) => (
              <tr key={agent.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border b order-blue-100">
                      <Bot className="w-4 h-4 text-[#0066FF]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-slate-900">{agent.name}</span>
                      <span className="text-[12px] font-mono text-slate-400">{agent.id}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-[13px] font-medium text-slate-600">{agent.provider}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${agent.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {agent.status === 'Active' ? <Activity className="w-3 h-3" /> : <AlertOctagon className="w-3 h-3" />}
                    {agent.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-[13px] font-mono text-slate-600">{agent.latency}</td>
                <td className="px-6 py-4 text-[13px] font-mono text-slate-600">{agent.requests}</td>
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
