"use client";
import React from "react";
import { Plus, CheckCircle2, AlertCircle, Settings2, Key, Database, Globe } from "lucide-react";

const providersData = [
  { id: "prv_openai", name: "OpenAI", type: "Cloud", status: "Connected", models: 8, endpoint: "api.openai.com/v1" },
  { id: "prv_anthropic", name: "Anthropic", type: "Cloud", status: "Connected", models: 3, endpoint: "api.anthropic.com/v1" },
  { id: "prv_azure", name: "Azure OpenAI", type: "Enterprise Cloud", status: "Error", models: 2, endpoint: "aegisora.openai.azure.com" },
  { id: "prv_local", name: "Local vLLM", type: "On-Premises", status: "Connected", models: 1, endpoint: "10.0.0.42:8000/v1" },
];

export default function ProvidersPage() {
  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[24px] font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Database className="w-6 h-6 text-slate-400" /> Model Providers
          </h1>
          <p className="text-[14px] text-slate-500 font-medium mt-1">Connect and manage your external LLM APIs and internal model endpoints.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-[13px] font-bold rounded-lg shado w-sm hover:bg-slate-800 transition-colors">
          <Plus className="w-4 h-4" /> Add Provider
        </button>
      </div>

      {/* Grid of Providers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providersData.map((provider) => (
          <div key={provider.id} className="bg-white border b order-slate-200 rounded-xl p-6 shado w-sm hover:shado w-md transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col">
                <h3 className="text-[18px] font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors">{provider.name}</h3>
                <span className="text-[12px] font-medium text-slate-500 flex items-center gap-1 mt-1">
                  <Globe className="w-3 h-3" /> {provider.type}
                </span>
              </div>
              <span className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${
                provider.status === 'Connected' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {provider.status === 'Connected' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                {provider.status}
              </span>
            </div>

            <div className="space-y-3 b order-t b order-slate-100 pt-4 mb-6">
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-slate-500 font-medium">Active Models</span>
                <span className="font-bold text-slate-900">{provider.models} models</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-slate-500 font-medium">Base URL</span>
                <span className="font-mono text-slate-600 truncate max-w-[140px]" title={provider.endpoint}>{provider.endpoint}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 border b order-slate-200 rounded-lg text-[13px] font-bold text-slate-700 transition-colors">
                <Settings2 className="w-4 h-4" /> Configure
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 border b order-slate-200 rounded-lg text-[13px] font-bold text-slate-700 transition-colors">
                <Key className="w-4 h-4" /> API Keys
              </button>
            </div>
          </div>
        ))}

        {/* Add New Card Placeholder */}
        <button className="bg-slate-50/50 b order-2 b order-dashed b order-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 hover:text-[#0066FF] hover:b order-[#0066FF]/50 hover:bg-blue-50/30 transition-all min-h-[220px]">
          <div className="w-12 h-12 rounded-full bg-white border b order-slate-200 flex items-center justify-center mb-3 shado w-sm">
            <Plus className="w-6 h-6" />
          </div>
          <span className="text-[15px] font-bold">Connect New Provider</span>
          <span className="text-[13px] font-medium mt-1">OpenAI, Anthropic, Cohere, Local...</span>
        </button>
      </div>

    </div>
  );
}
