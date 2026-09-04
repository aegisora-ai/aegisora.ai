"use client";
import React from "react";
import { Cloud, Plus, CheckCircle2, AlertCircle, Settings } from "lucide-react";

export default function ProvidersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Model Providers</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Connect and manage the underlying LLM APIs your agents use.</p>
        </div>
        <button type="button" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-blue-700">
          <Plus className="w-4 h-4"/> Add Provider
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* OpenAI */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4"><CheckCircle2 className="w-5 h-5 text-emerald-500"/></div>
          <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-4">O</div>
          <h3 className="text-lg font-black text-slate-900">OpenAI</h3>
          <p className="text-sm text-slate-500 font-medium mb-4">GPT-4o, GPT-3.5-Turbo</p>
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Connected</span>
            <button className="text-slate-400 hover:text-slate-600"><Settings className="w-4 h-4"/></button>
          </div>
        </div>

        {/* Anthropic */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4"><CheckCircle2 className="w-5 h-5 text-emerald-500"/></div>
          <div className="w-12 h-12 bg-[#D97757] rounded-lg flex items-center justify-center text-white font-bold text-xl mb-4">A</div>
          <h3 className="text-lg font-black text-slate-900">Anthropic</h3>
          <p className="text-sm text-slate-500 font-medium mb-4">Claude 3.5 Sonnet, Opus</p>
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Connected</span>
            <button className="text-slate-400 hover:text-slate-600"><Settings className="w-4 h-4"/></button>
          </div>
        </div>

        {/* Hugging Face (Disconnected) */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative overflow-hidden opacity-70 hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-4">🤗</div>
          <h3 className="text-lg font-black text-slate-900">Hugging Face</h3>
          <p className="text-sm text-slate-500 font-medium mb-4">Custom Models & Endpoints</p>
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">Not Configured</span>
            <button className="text-blue-600 text-sm font-bold">Connect</button>
          </div>
        </div>
      </div>
    </div>
  );
}