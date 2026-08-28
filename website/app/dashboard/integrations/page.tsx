"use client";
import React from "react";
import { Puzzle, CheckCircle2, Plus, Zap, Shield, Database, Lock } from "lucide-react";

const integrationsList = [
  { id: "int_datadog", name: "Datadog SIEM", category: "Observability", status: "Connected", desc: "Stream cryptographically signed audit logs and real-time threat telemetry directly to Datadog." },
  { id: "int_splunk", name: "Splunk Enterprise", category: "Compliance", status: "Disconnected", desc: "Export compliance reports and policy violations to your corporate Splunk indexers." },
  { id: "int_slack", name: "Slack Security Alerts", category: "Notifications", status: "Connected", desc: "Receive instant high-priority alerts in your #secops channel when an agent triggers a jailbreak block." },
  { id: "int_s3", name: "AWS S3 Audit Vault", category: "Storage", status: "Connected", desc: "Archive immutable ledger records daily to secure encrypted Amazon S3 buckets." },
  { id: "int_pagerduty", name: "PagerDuty", category: "Incident Response", status: "Disconnected", desc: "Trigger automated on-call escalations upon critical systemic model hallucinations." }
];

export default function IntegrationsPage() {
  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[24px] font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Puzzle className="w-6 h-6 text-slate-400" /> Enterprise Integrations
          </h1>
          <p className="text-[14px] text-slate-500 font-medium mt-1">Connect Aegisora with your existing SIEM, notification, and cloud infrastructure.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-[13px] font-bold rounded-lg shado w-sm hover:bg-slate-800 transition-colors">
          <Plus className="w-4 h-4" /> Request Integration
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrationsList.map((item) => (
          <div key={item.id} className="bg-white border b order-slate-200 rounded-xl p-6 shado w-sm flex flex-col justify-between hover:shado w-md transition-all group">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{item.category}</span>
                <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                  item.status === 'Connected' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Connected' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                  {item.status}
                </span>
              </div>
              <h3 className="text-[18px] font-bold text-slate-900 mb-2 group-hover:text-[#0066FF] transition-colors">{item.name}</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed mb-6">{item.desc}</p>
            </div>
            <div className="pt-4 b order-t b order-slate-100 flex justify-end">
               <button className={`px-4 py-1.5 rounded-lg text-[13px] font-bold border transition-colors ${
                 item.status === 'Connected'
                 ? 'b order-slate-200 text-slate-700 hover:bg-slate-50'
                 : 'bg-[#0066FF] text-white b order-[#0066FF] hover:bg-[#0052CC]'
               }`}>
                 {item.status === 'Connected' ? 'Configure' : 'Connect'}
               </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
