"use client";

import React from "react";
import {
  ShieldCheck, AlertTriangle, XCircle, Activity,
  ArrowUpRight, ArrowDownRight, Terminal, MoreHorizontal
} from "lucide-react";

export default function DashboardOverview() {
  const metrics = [
    { label: "Total Intercepts (24h)", value: "1.2M", change: "+12.5%", isPositive: true, icon: Activity, color: "text-blue-400" },
    { label: "Policy Violations", value: "843", change: "-4.2%", isPositive: true, icon: XCircle, color: "text-destructive" },
    { label: "Escalations Pending", value: "12", change: "+2", isPositive: false, icon: AlertTriangle, color: "text-amber-500" },
    { label: "Active Agents", value: "48", change: "Stable", isPositive: true, icon: Terminal, color: "text-emerald-500" },
  ];

  const recentDecisions = [
    { id: "evt_8923a", time: "2 min ago", agent: "Customer_Support_Agent", intent: "READ_DB_USERS", policy: "DATA-001", decision: "ALLOW" },
    { id: "evt_8923b", time: "15 min ago", agent: "Financial_Analyst_Bot", intent: "EXECUTE_WIRE_TRANSFER", policy: "FIN-042", decision: "ESCALATE" },
    { id: "evt_8923c", time: "42 min ago", agent: "Marketing_Copywriter", intent: "WRITE_SOCIAL_POST", policy: "CNT-005", decision: "ALLOW" },
    { id: "evt_8923d", time: "1 hr ago", agent: "Data_Scraper_Agent", intent: "DROP_TABLE_ANALYTICS", policy: "SYS-009", decision: "BLOCK" },
    { id: "evt_8923e", time: "2 hrs ago", agent: "Customer_Support_Agent", intent: "READ_DB_USERS", policy: "DATA-001", decision: "ALLOW" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Overview</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time enforcement metrics for Acme Corp.</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <select className="bg-slate-900 border border-slate-800 text-slate-300 rounded-md px-3 py-1.5 outline-none focus:border-slate-600 transition-colors">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
          <button className="bg-white text-black hover:bg-slate-200 px-4 py-1.5 rounded-md font-medium transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-[#111113] border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
              <div className={`flex items-center gap-1 text-xs font-medium ${metric.isPositive ? 'text-emerald-500' : 'text-amber-500'}`}>
                {metric.change}
                {metric.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
            <div className="text-xs text-slate-500 font-medium">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">

        {/* Left Column: Recent Activity Table */}
        <div className="lg:col-span-2 bg-[#111113] border border-slate-800 rounded-xl flex flex-col shadow-sm">
          <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Recent Enforcement Decisions</h2>
            <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">View All Logs</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-900/50 text-slate-500 text-xs font-semibold">
                <tr>
                  <th className="px-5 py-3 rounded-tl-xl">Event ID</th>
                  <th className="px-5 py-3">Agent</th>
                  <th className="px-5 py-3">Evaluated Intent</th>
                  <th className="px-5 py-3">Decision</th>
                  <th className="px-5 py-3 rounded-tr-xl"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-slate-300">
                {recentDecisions.map((log, i) => (
                  <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-slate-500">{log.id}</td>
                    <td className="px-5 py-3 font-medium text-slate-200">{log.agent}</td>
                    <td className="px-5 py-3 font-mono text-xs">{log.intent}</td>
                    <td className="px-5 py-3">
                      {log.decision === 'ALLOW' && <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">ALLOW</span>}
                      {log.decision === 'BLOCK' && <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-destructive/10 text-destructive border border-destructive/20">BLOCK</span>}
                      {log.decision === 'ESCALATE' && <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">ESCALATE</span>}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button className="text-slate-500 hover:text-white transition-colors p-1"><MoreHorizontal className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Active Policies */}
        <div className="bg-[#111113] border border-slate-800 rounded-xl flex flex-col shadow-sm">
          <div className="px-5 py-4 border-b border-slate-800">
            <h2 className="text-sm font-semibold text-white">Strict Policies Active</h2>
          </div>
          <div className="p-5 flex-1 flex flex-col gap-4">

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-200">No PII Leakage</div>
                <div className="text-xs text-slate-500 mt-1">Blocks requests containing SSN, credit cards, or internal user emails.</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-200">Read-Only Database</div>
                <div className="text-xs text-slate-500 mt-1">Prevents Agents from executing INSERT, UPDATE, or DROP queries.</div>
              </div>
            </div>

          </div>
          <div className="p-4 border-t border-slate-800 text-center">
            <button className="text-xs font-medium text-blue-400 hover:text-blue-300">Manage Policies &rarr;</button>
          </div>
        </div>

      </div>
    </div>
  );
}
