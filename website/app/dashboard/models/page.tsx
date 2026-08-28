"use client";
import React from "react";
import { Box, Search, Filter, MoreHorizontal, Zap, DollarSign, Activity } from "lucide-react";

const modelsData = [
  { id: "gpt-4o", provider: "OpenAI", type: "Chat", status: "Active", latency: "45ms", cost: "$5.00 / 1M" },
  { id: "gpt-3.5-turbo", provider: "OpenAI", type: "Chat", status: "Active", latency: "18ms", cost: "$0.50 / 1M" },
  { id: "claude-3-opus", provider: "Anthropic", type: "Chat", status: "Active", latency: "120ms", cost: "$15.00 / 1M" },
  { id: "text-embedding-3", provider: "OpenAI", type: "Embedding", status: "Active", latency: "12ms", cost: "$0.02 / 1M" },
  { id: "llama-3-70b", provider: "Local vLLM", type: "Chat", status: "Active", latency: "85ms", cost: "Self-Hosted" },
  { id: "text-davinci-003", provider: "OpenAI", type: "Completion", status: "Deprecated", latency: "-", cost: "-" },
];

export default function ModelsPage() {
  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[24px] font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Box className="w-6 h-6 text-slate-400" /> Model Inventory
          </h1>
          <p className="text-[14px] text-slate-500 font-medium mt-1">Track available models, capabilities, and performance metrics across your providers.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border b order-slate-200 text-slate-700 text-[13px] font-bold rounded-lg shado w-sm hover:bg-slate-50 transition-colors">
          Sync Models
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search models by name or provider..." className="w-full pl-9 pr-4 py-2 bg-white border b order-slate-200 rounded-lg text-[13px] focus:outline-none focus:b order-[#0066FF] focus:ring-1 focus:ring-[#0066FF]" />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border b order-slate-200 rounded-lg text-[13px] font-bold text-slate-600 hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Type
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border b order-slate-200 rounded-xl shado w-sm overflo w-hidden">
        <table className="w-full text-left b order-collapse">
          <thead>
            <tr className="bg-slate-50 b order-b b order-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4">Model Name</th>
              <th className="px-6 py-4">Provider</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Avg Latency</th>
              <th className="px-6 py-4">Output Cost</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {modelsData.map((model) => (
              <tr key={model.id} className="hover:bg-slate-50 transition-colors group text-[13px]">
                <td className="px-6 py-4 font-mono font-bold text-slate-900">{model.id}</td>
                <td className="px-6 py-4 font-medium text-slate-600">{model.provider}</td>
                <td className="px-6 py-4">
                  <span className="bg-slate-100 text-slate-600 border b order-slate-200 px-2 py-1 rounded font-medium">
                    {model.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                    model.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'
                  }`}>
                    {model.status === 'Active' ? <Activity className="w-3 h-3" /> : <Box className="w-3 h-3" />}
                    {model.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-slate-500 flex items-center gap-1.5 mt-2.5">
                  <Zap className="w-3 h-3 text-slate-400" /> {model.latency}
                </td>
                <td className="px-6 py-4 font-mono text-slate-500">
                  <div className="flex items-center gap-1"><DollarSign className="w-3 h-3 text-slate-400"/> {model.cost}</div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 text-slate-400 hover:text-[#0066FF] rounded-md hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all">
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
