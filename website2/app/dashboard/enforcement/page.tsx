"use client";
import React from "react";
import { Lock, Server, ShieldAlert } from "lucide-react";
export default function EnforcementPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-black text-slate-900">Global Enforcement Settings</h1>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
        <div className="flex items-start justify-between pb-6 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2"><Server className="w-4 h-4 text-slate-500"/> Fail-Closed Architecture</h3>
            <p className="text-sm text-slate-500 mt-1">If Aegisora Edge nodes become unreachable, all traffic is blocked by default.</p>
          </div>
          <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-slate-500"/> Strict Latency Timeout</h3>
            <p className="text-sm text-slate-500 mt-1">Block requests if semantic evaluation takes longer than 200ms.</p>
          </div>
          <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow"></div></div>
        </div>
      </div>
    </div>
  );
}