"use client";
import React, { useState, useEffect } from "react";
import { ScrollText, History, Loader2, Fingerprint, Activity, ShieldCheck, User } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";

export default function AuditPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const fetchAudit = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Ajanları ve Kuralları (Policies) eşzamanlı çek
        const [agentsRes, policiesRes] = await Promise.all([
          supabase.from("agents").select("id, name, created_at").eq("user_id", user.id),
          supabase.from("policies").select("id, name, created_at").eq("user_id", user.id)
        ]);

        let combinedLogs: any[] = [];
        
        if (agentsRes.data) {
          agentsRes.data.forEach(a => {
            combinedLogs.push({
              id: a.id,
              event: `Agent Registered: ${a.name}`,
              type: "RESOURCE_CREATED",
              actor: user.email || "Admin",
              time: a.created_at
            });
          });
        }

        if (policiesRes.data) {
          policiesRes.data.forEach(p => {
            combinedLogs.push({
              id: p.id,
              event: `Policy Defined: ${p.name}`,
              type: "POLICY_UPDATE",
              actor: user.email || "Admin",
              time: p.created_at
            });
          });
        }

        // Tarihe göre yeniden eskiye sırala
        combinedLogs.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        setLogs(combinedLogs);
      }
      setLoading(false);
    };
    
    fetchAudit();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">System Audit Ledger</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Immutable record of all configuration changes within your workspace.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-500" />
            <p className="text-sm font-bold">Synchronizing Immutable Ledger...</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500">
            <History className="w-12 h-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-black text-slate-900 mb-1">No Audit Records</h3>
            <p className="text-sm mb-4">Configuration changes will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-black text-xs text-slate-500 uppercase tracking-wider">Event Details</th>
                  <th className="px-6 py-4 font-black text-xs text-slate-500 uppercase tracking-wider">Actor</th>
                  <th className="px-6 py-4 font-black text-xs text-slate-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-4 font-black text-xs text-slate-500 uppercase tracking-wider text-right">Event Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${log.type === 'POLICY_UPDATE' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                          {log.type === 'POLICY_UPDATE' ? <ShieldCheck className="w-4 h-4"/> : <Activity className="w-4 h-4"/>}
                        </div>
                        <span className="font-bold text-slate-900">{log.event}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600 font-medium">
                        <User className="w-4 h-4 text-slate-400"/> {log.actor}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      {new Date(log.time).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-mono text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                        {log.id.split('-')[0]}...
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}