"use client";
import React, { useState, useEffect } from "react";
import { Activity, ShieldAlert, CheckCircle2, Clock, Filter, Pause, Play, TerminalSquare } from "lucide-react";

// Sahte Canlı Log Verisi
const mockLogs = [
  { id: "req_09x1", time: "Just now", agent: "Customer Support Bot", action: "Redacted", reason: "PII Detected (Phone)", latency: "42ms", tokens: 128 },
  { id: "req_09x2", time: "2s ago", agent: "Internal HR Assistant", action: "Passed", reason: "-", latency: "85ms", tokens: 412 },
  { id: "req_09x3", time: "5s ago", agent: "Sales Outreach Gen", action: "Blocked", reason: "Jailbreak Attempt", latency: "12ms", tokens: 56 },
  { id: "req_09x4", time: "12s ago", agent: "Customer Support Bot", action: "Passed", reason: "-", latency: "38ms", tokens: 89 },
  { id: "req_09x5", time: "18s ago", agent: "Financial Data Ext", action: "Redacted", reason: "Credit Card Blocked", latency: "45ms", tokens: 210 },
  { id: "req_09x6", time: "22s ago", agent: "Internal HR Assistant", action: "Passed", reason: "-", latency: "92ms", tokens: 512 },
];

export default function LiveMonitorPage() {
  const [isLive, setIsLive] = useState(true);

  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[24px] font-black text-slate-900 tracking-tight flex items-center gap-3">
            Live Monitor
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${isLive ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
              {isLive ? 'Live' : 'Paused'}
            </span>
          </h1>
          <p className="text-[14px] text-slate-500 font-medium mt-1">Real-time telemetry and execution logs across your agent fleet.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLive(!isLive)}
            className="flex items-center gap-2 px-4 py-2 bg-white border b order-slate-200 text-slate-700 text-[13px] font-bold rounded-lg shado w-sm hover:bg-slate-50 transition-colors"
          >
            {isLive ? <><Pause className="w-4 h-4" /> Pause Feed</> : <><Play className="w-4 h-4" /> Resume Feed</>}
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border b order-slate-200 shado w-sm flex items-center justify-between">
           <div><div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Req / Sec</div><div className="text-[20px] font-black text-slate-900">124</div></div>
           <Activity className="w-6 h-6 text-slate-300" />
        </div>
        <div className="bg-white p-4 rounded-xl border b order-slate-200 shado w-sm flex items-center justify-between">
           <div><div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Block Rate</div><div className="text-[20px] font-black text-rose-600">2.4%</div></div>
           <ShieldAlert className="w-6 h-6 text-rose-200" />
        </div>
        <div className="bg-white p-4 rounded-xl border b order-slate-200 shado w-sm flex items-center justify-between">
           <div><div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">P95 Latency</div><div className="text-[20px] font-black text-slate-900">85ms</div></div>
           <Clock className="w-6 h-6 text-slate-300" />
        </div>
        <div className="bg-white p-4 rounded-xl border b order-slate-200 shado w-sm flex items-center justify-between">
           <div><div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Active Rules</div><div className="text-[20px] font-black text-slate-900">14</div></div>
           <TerminalSquare className="w-6 h-6 text-slate-300" />
        </div>
      </div>

      {/* Log Table */}
      <div className="bg-white border b order-slate-200 rounded-xl shado w-sm overflo w-hidden">
        <div className="px-4 py-3 bg-slate-50 b order-b b order-slate-200 flex items-center justify-between">
           <span className="text-[12px] font-bold text-slate-600">Latest Executions</span>
           <button className="text-slate-400 hover:text-slate-600"><Filter className="w-4 h-4" /></button>
        </div>
        <table className="w-full text-left b order-collapse">
          <thead>
            <tr className="bg-white b order-b b order-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="px-6 py-3 font-medium">Time</th>
              <th className="px-6 py-3 font-medium">Agent</th>
              <th className="px-6 py-3 font-medium">Action</th>
              <th className="px-6 py-3 font-medium">Reason</th>
              <th className="px-6 py-3 font-medium text-right">Latency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {mockLogs.map((log, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                <td className="px-6 py-4 text-[12px] font-mono text-slate-500">{log.time}</td>
                <td className="px-6 py-4 text-[13px] font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors">{log.agent}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${
                    log.action === 'Passed' ? 'bg-emerald-50 text-emerald-600' :
                    log.action === 'Blocked' ? 'bg-rose-50 text-rose-600' :
                    'bg-amber-50 text-amber-600'
                  }`}>
                    {log.action === 'Passed' ? <CheckCircle2 className="w-3 h-3" /> :
                     log.action === 'Blocked' ? <ShieldAlert className="w-3 h-3" /> :
                     <Activity className="w-3 h-3" />}
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 text-[13px] text-slate-600">{log.reason}</td>
                <td className="px-6 py-4 text-[12px] font-mono text-slate-500 text-right">{log.latency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
