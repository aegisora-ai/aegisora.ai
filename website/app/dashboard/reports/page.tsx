"use client";
import React from "react";
import { BarChart3, Calendar, Download, TrendingUp, ShieldAlert, Zap, DollarSign } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500">

      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[24px] font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-slate-400" /> Enterprise Reports
          </h1>
          <p className="text-[14px] text-slate-500 font-medium mt-1">Analyze token usage, cost distribution, and threat trends across your workspace.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border b order-slate-200 text-slate-600 text-[13px] font-bold rounded-lg shado w-sm hover:bg-slate-50 transition-colors">
            <Calendar className="w-4 h-4" /> Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-900 text-white text-[13px] font-bold rounded-lg shado w-sm hover:bg-slate-800 transition-colors">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border b order-slate-200 shado w-sm">
          <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2"><Zap className="w-4 h-4 text-slate-400"/> Tokens Processed</div>
          <div className="text-[28px] font-black text-slate-900">42.8M</div>
          <div className="text-[12px] font-bold text-emerald-500 flex items-center gap-1 mt-1"><TrendingUp className="w-3 h-3"/> 12% vs last month</div>
        </div>
        <div className="bg-white p-5 rounded-xl border b order-slate-200 shado w-sm">
          <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2"><DollarSign className="w-4 h-4 text-slate-400"/> Estimated Cost</div>
          <div className="text-[28px] font-black text-slate-900">$845.20</div>
          <div className="text-[12px] font-bold text-rose-500 flex items-center gap-1 mt-1"><TrendingUp className="w-3 h-3"/> 5% vs last month</div>
        </div>
        <div className="bg-white p-5 rounded-xl border b order-slate-200 shado w-sm">
          <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-slate-400"/> Blocked Threats</div>
          <div className="text-[28px] font-black text-rose-600">12,402</div>
          <div className="text-[12px] font-bold text-slate-400 mt-1">9.2% block rate</div>
        </div>
        <div className="bg-white p-5 rounded-xl border b order-slate-200 shado w-sm">
          <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-slate-400"/> Top Policy Hit</div>
          <div className="text-[20px] font-black text-slate-900 mt-2 truncate">PII Redaction</div>
          <div className="text-[12px] font-bold text-slate-400 mt-2">8,102 executions</div>
        </div>
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Threat Trends Chart Mockup */}
        <div className="bg-white rounded-xl border b order-slate-200 shado w-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[15px] font-bold text-slate-900">Threat Trends</h3>
            <span className="text-[12px] font-bold text-slate-400 uppercase">Daily</span>
          </div>
          <div className="flex-1 flex items-end gap-2 h-[200px] mt-4">
             {[30, 45, 25, 60, 80, 40, 50, 90, 70, 45, 55, 30, 65, 85].map((h, i) => (
               <div key={i} className="flex-1 bg-rose-100 rounded-t-sm relative group cursor-pointer" style={{ height: `${h}%` }}>
                 <div className="absolute inset-0 bg-rose-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-sm"></div>
               </div>
             ))}
          </div>
          <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-4">
            <span>Aug 01</span>
            <span>Aug 15</span>
            <span>Aug 28</span>
          </div>
        </div>

        {/* Cost & Usage by Provider Mockup */}
        <div className="bg-white rounded-xl border b order-slate-200 shado w-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[15px] font-bold text-slate-900">Usage by Provider</h3>
            <span className="text-[12px] font-bold text-slate-400 uppercase">Tokens</span>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-6 mt-4">
            <div>
              <div className="flex justify-between text-[13px] font-bold text-slate-700 mb-2"><span>OpenAI (GPT-4o)</span> <span>65%</span></div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflo w-hidden"><div className="h-full bg-[#0066FF] w-[65%] rounded-full"></div></div>
            </div>
            <div>
              <div className="flex justify-between text-[13px] font-bold text-slate-700 mb-2"><span>Anthropic (Claude-3)</span> <span>25%</span></div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflo w-hidden"><div className="h-full bg-emerald-500 w-[25%] rounded-full"></div></div>
            </div>
            <div>
              <div className="flex justify-between text-[13px] font-bold text-slate-700 mb-2"><span>Local (vLLM)</span> <span>10%</span></div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflo w-hidden"><div className="h-full bg-amber-500 w-[10%] rounded-full"></div></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
