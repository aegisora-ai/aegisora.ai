"use client";
import React from "react";
import { Key, Plus, Copy, Trash2, EyeOff, AlertCircle } from "lucide-react";

const mockKeys = [
  { id: "key_1", name: "Production Gateway", token: "sk-aegi...f8a2", created: "Oct 12, 2025", lastUsed: "2 mins ago" },
  { id: "key_2", name: "Staging Tests", token: "sk-aegi...9b1c", created: "Nov 04, 2025", lastUsed: "1 day ago" },
  { id: "key_3", name: "Eray's Local Dev", token: "sk-aegi...33x9", created: "Dec 01, 2025", lastUsed: "Never" },
];

export default function ApiKeysPage() {
  return (
    <div className="max-w-[1000px] mx-auto animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[24px] font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Key className="w-6 h-6 text-slate-400" /> API Keys
          </h1>
          <p className="text-[14px] text-slate-500 font-medium mt-1">Manage your secret keys for SDK and API access.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-[13px] font-bold rounded-lg shado w-sm hover:bg-slate-800 transition-colors">
          <Plus className="w-4 h-4" /> Create new key
        </button>
      </div>

      {/* Warning Banner */}
      <div className="bg-amber-50 border b order-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3">
         <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
         <div>
           <h4 className="text-[14px] font-bold text-amber-900 mb-1">Keep your keys secure</h4>
           <p className="text-[13px] text-amber-800/80 leading-relaxed">Do not share your API keys in publicly accessible areas such as GitHub, client-side code, and so forth. Aegisora will never ask for your secret keys.</p>
         </div>
      </div>

      {/* Table */}
      <div className="bg-white border b order-slate-200 rounded-xl shado w-sm overflo w-hidden">
        <table className="w-full text-left b order-collapse">
          <thead>
            <tr className="bg-slate-50 b order-b b order-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Secret Key</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4">Last Used</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockKeys.map((key) => (
              <tr key={key.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-[14px] font-bold text-slate-900">{key.name}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <code className="text-[13px] font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded border b order-slate-200">{key.token}</code>
                    <button className="text-slate-400 hover:text-slate-600"><Copy className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
                <td className="px-6 py-4 text-[13px] text-slate-500">{key.created}</td>
                <td className="px-6 py-4 text-[13px] text-slate-500">{key.lastUsed}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-all">
                    <Trash2 className="w-4 h-4" />
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
