"use client";
import React from "react";
import { AlertTriangle, ShieldAlert, TrendingUp, AlertOctagon, ArrowUpRight } from "lucide-react";

export default function RiskCenterPage() {
  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[24px] font-black text-slate-900 tracking-tight flex items-center gap-2">
            <AlertOctagon className="w-6 h-6 text-rose-600" /> Risk Center
          </h1>
          <p className="text-[14px] text-slate-500 font-medium mt-1">Holistic view of security vulnerabilities and threat trends across your workspace.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border b order-slate-200 text-slate-700 text-[13px] font-bold rounded-lg shado w-sm hover:bg-slate-50 transition-colors">
          Download Risk Report
        </button>
      </div>

      {/* Top Threat Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-rose-50 border b order-rose-200 p-5 rounded-xl flex flex-col gap-2">
          <div className="text-[12px] font-bold text-rose-800 uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Critical Risks
          </div>
          <div className="text-[32px] font-black text-rose-600">3</div>
          <div className="text-[13px] font-medium text-rose-700/80">Requires immediate attention</div>
        </div>
        <div className="bg-amber-50 border b order-amber-200 p-5 rounded-xl flex flex-col gap-2">
          <div className="text-[12px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" /> Policy Violations (24h)
          </div>
          <div className="text-[32px] font-black text-amber-600">1,402</div>
          <div className="text-[13px] font-medium text-amber-700/80">+14% compared to yesterday</div>
        </div>
        <div className="bg-white border b order-slate-200 p-5 rounded-xl shado w-sm flex flex-col gap-2">
          <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Top Threat Vector
          </div>
          <div className="text-[24px] font-black text-slate-900 mt-2">Jailbreak Injection</div>
          <div className="text-[13px] font-medium text-slate-500">Originating mostly from EU endpoints</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* At-Risk Agents List */}
        <div className="bg-white border b order-slate-200 rounded-xl shado w-sm overflo w-hidden flex flex-col">
          <div className="px-5 py-4 b order-b b order-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Most Vulnerable Agents</h3>
            <span className="text-[12px] font-bold text-[#0066FF] cursor-pointer hover:underline">View All</span>
          </div>
          <div className="p-0 flex-1">
             {[
               { name: "External Support Chatbot", risk: "Critical", score: "89/100" },
               { name: "Code Review Assistant", risk: "High", score: "72/100" },
               { name: "Financial Analyzer", risk: "Medium", score: "45/100" }
             ].map((agent, i) => (
               <div key={i} className="flex items-center justify-between p-4 b order-b b order-slate-50 last:b order-0 hover:bg-slate-50">
                 <div>
                   <div className="font-bold text-slate-900 text-[14px]">{agent.name}</div>
                   <div className="text-[12px] text-slate-500">Risk Score: <span className="font-mono">{agent.score}</span></div>
                 </div>
                 <span className={`px-2.5 py-1 text-[10px] font-bold rounded uppercase tracking-wider ${
                   agent.risk === 'Critical' ? 'bg-rose-100 text-rose-700' :
                   agent.risk === 'High' ? 'bg-amber-100 text-amber-700' :
                   'bg-blue-100 text-blue-700'
                 }`}>{agent.risk}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Recent Security Advisories Placeholder */}
        <div className="bg-slate-900 border b order-slate-800 rounded-xl shado w-xl overflo w-hidden flex flex-col">
          <div className="px-5 py-4 b order-b b order-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-white">Aegisora Threat Intel</h3>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </div>
          <div className="p-5 flex flex-col gap-4">
             <div className="bg-white/5 border b order-white/10 p-4 rounded-lg">
               <div className="text-[11px] text-rose-400 font-bold mb-1">NEW VULNERABILITY DETECTED</div>
               <div className="text-[14px] text-white font-bold mb-2">Prompt Leaking via Markdown Injection</div>
               <p className="text-[13px] text-slate-400">A new class of prompt injection utilizing obscure markdown parsing in Claude-3 models has been detected globally.</p>
             </div>
             <div className="bg-white/5 border b order-white/10 p-4 rounded-lg">
               <div className="text-[11px] text-blue-400 font-bold mb-1">FRAMEWORK UPDATE</div>
               <div className="text-[14px] text-white font-bold mb-2">Updated Ban List Models Available</div>
               <p className="text-[13px] text-slate-400">Aegisora Hub has been updated with 3 new fuzzy matching algorithms for internal codename detection.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
