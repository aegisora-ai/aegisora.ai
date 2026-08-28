"use client";
import React from "react";
import { ClipboardList, Download, Search, Filter } from "lucide-react";

const auditData = [
  { id: "log_991", user: "Eray Özer", action: "Updated Policy", resource: "pol_anti_jailbreak", time: "10 mins ago", ip: "192.168.1.42" },
  { id: "log_992", user: "System", action: "API Key Revoked", resource: "key_staging", time: "2 hours ago", ip: "Internal" },
  { id: "log_993", user: "Jane Doe", action: "Invited User", resource: "john@acme.com", time: "1 day ago", ip: "10.0.0.15" },
  { id: "log_994", user: "Eray Özer", action: "Created Agent", resource: "agt_fin_analyzer", time: "3 days ago", ip: "192.168.1.42" },
  { id: "log_995", user: "System", action: "Weekly Report Generated", resource: "rep_august", time: "1 week ago", ip: "Internal" },
];

export default function AuditPage() {
  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[24px] font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-slate-400" /> Audit Logs
          </h1>
          <p className="text-[14px] text-slate-500 font-medium mt-1">Immutable, compliance-ready ledger of all configuration and access changes.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border b order-slate-200 text-slate-700 text-[13px] font-bold rounded-lg shado w-sm hover:bg-slate-50 transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="relative w-full sm:w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search by user or resource..." className="w-full pl-9 pr-4 py-2 bg-white border b order-slate-200 rounded-lg text-[13px] focus:outline-none focus:b order-[#0066FF] focus:ring-1 focus:ring-[#0066FF]" />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-white border b order-slate-200 rounded-lg text-[13px] font-bold text-slate-600 hover:bg-slate-50">
          <Filter className="w-4 h-4" /> Filter by Action
        </button>
      </div>

      <div className="bg-white border b order-slate-200 rounded-xl shado w-sm overflo w-hidden">
        <table className="w-full text-left b order-collapse">
          <thead>
            <tr className="bg-slate-50 b order-b b order-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4">Actor</th>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Resource</th>
              <th className="px-6 py-4">IP Address</th>
              <th className="px-6 py-4 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {auditData.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50 transition-colors text-[13px]">
                <td className="px-6 py-4 font-bold text-slate-900">{log.user}</td>
                <td className="px-6 py-4 font-medium text-slate-600">
                   <span className="bg-slate-100 px-2 py-1 rounded border b order-slate-200">{log.action}</span>
                </td>
                <td className="px-6 py-4 font-mono text-slate-500">{log.resource}</td>
                <td className="px-6 py-4 font-mono text-slate-400">{log.ip}</td>
                <td className="px-6 py-4 text-slate-500 text-right">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
