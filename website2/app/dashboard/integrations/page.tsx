"use client";
import React from "react";
import { Link as LinkIcon, Webhook } from "lucide-react";
export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-slate-900">Integrations & Webhooks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4"><div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><LinkIcon className="w-6 h-6"/></div><div><h3 className="font-bold text-slate-900">Datadog SIEM</h3><p className="text-xs text-slate-500">Export logs to Datadog</p></div></div>
          <button className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded hover:bg-slate-200">Connect</button>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4"><div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Webhook className="w-6 h-6"/></div><div><h3 className="font-bold text-slate-900">Custom Webhooks</h3><p className="text-xs text-slate-500">Trigger on Escalations</p></div></div>
          <button className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded hover:bg-slate-200">Configure</button>
        </div>
      </div>
    </div>
  );
}