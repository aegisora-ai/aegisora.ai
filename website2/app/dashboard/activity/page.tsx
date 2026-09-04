"use client";
import React from "react";
import { Activity, Zap, RefreshCw, Terminal, CheckCircle2, ShieldAlert } from "lucide-react";

export default function ActivityPage() {
  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Live Operations Stream</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Real-time view of agent invocations and proxy evaluations.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-md border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Streaming
        </div>
      </div>
      
      <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs overflow-hidden flex flex-col relative shadow-inner">
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="flex-1 overflow-y-auto space-y-2 text-slate-400 pb-12">
          <div className="text-slate-600 mb-4">// Establishing secure WebSocket connection to Aegisora Edge... CONNECTED.</div>
          <div className="flex gap-4"><span className="text-slate-500">14:22:10.01</span><span className="text-emerald-400 font-bold">[ALLOW]</span><span>ag_77c4z (DevOps Co-pilot) -> intent: query_docs</span></div>
          <div className="flex gap-4"><span className="text-slate-500">14:22:12.44</span><span className="text-emerald-400 font-bold">[ALLOW]</span><span>ag_92h1x (Customer Support) -> intent: read_ticket</span></div>
          <div className="flex gap-4"><span className="text-slate-500">14:22:15.04</span><span className="text-rose-500 font-bold">[BLOCK]</span><span className="text-rose-300">ag_92h1x (Customer Support) -> intent: extract_pii (Rule: Strict PII Isolation)</span></div>
          <div className="flex gap-4"><span className="text-slate-500">14:22:18.12</span><span className="text-emerald-400 font-bold">[ALLOW]</span><span>ag_11p0m (Sales Outreach) -> intent: format_text</span></div>
          <div className="flex gap-4"><span className="text-slate-500">14:22:21.88</span><span className="text-amber-400 font-bold">[ESCAL]</span><span className="text-amber-200">ag_38f2a (HR Screener) -> intent: send_email (Rule: Require Human Auth)</span></div>
          <div className="flex gap-4"><span className="text-slate-500">14:22:23.01</span><span className="text-emerald-400 font-bold">[ALLOW]</span><span>ag_77c4z (DevOps Co-pilot) -> intent: get_metrics</span></div>
          <div className="flex items-center gap-2 mt-4 animate-pulse"><Terminal className="w-3 h-3 text-blue-500"/> <span className="text-blue-400">Listening for incoming requests...</span></div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none"></div>
      </div>
    </div>
  );
}