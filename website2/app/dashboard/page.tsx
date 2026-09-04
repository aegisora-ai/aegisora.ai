"use client";
import React, { useState, useEffect } from "react";
import { 
  ShieldAlert, ShieldCheck, Zap, Activity, ArrowUpRight, 
  ArrowDownRight, MoreHorizontal, Fingerprint, Lock, Loader2, Database
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";
import { createBrowserClient } from "@supabase/ssr";

export default function ControlCenterPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ invocations: 0, blocks: 0, escalations: 0, agents: 0 });
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchDashboardData = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // 1. Ajan Sayısını Çek
      const { count: agentCount } = await supabase
        .from("agents")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      // 2. Tüm Trace (İz) Kayıtlarını Çek
      const { data: traces } = await supabase
        .from("traces")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (traces) {
        // İstatistikleri Hesapla
        const totalInvocations = traces.length;
        const totalBlocks = traces.filter(t => t.decision === "BLOCK").length;
        const totalEscalations = traces.filter(t => t.decision === "ESCALATE").length;

        setStats({
          invocations: totalInvocations,
          blocks: totalBlocks,
          escalations: totalEscalations,
          agents: agentCount || 0
        });

        // Son 5 Logu Tablo İçin Al
        setRecentLogs(traces.slice(0, 5));

        // Grafik İçin Veriyi Grupla (Mock tabanlı saatlik gösterim, gerçek veriyle harmanlanmış)
        // Eğer hiç veri yoksa boş grafik göstermemek için temel bir şablon oluşturuyoruz
        let groupedData = [
          { time: "00:00", allow: 0, block: 0, escalate: 0 },
          { time: "04:00", allow: 0, block: 0, escalate: 0 },
          { time: "08:00", allow: 0, block: 0, escalate: 0 },
          { time: "12:00", allow: 0, block: 0, escalate: 0 },
          { time: "16:00", allow: 0, block: 0, escalate: 0 },
          { time: "20:00", allow: 0, block: 0, escalate: 0 },
          { time: "24:00", allow: 0, block: 0, escalate: 0 },
        ];

        // Gerçek verileri grafiğe yedir (Basit bir dağıtım)
        traces.forEach(trace => {
          const hour = new Date(trace.created_at).getHours();
          const bucketIndex = Math.floor(hour / 4); // 0-6 arası index
          if (groupedData[bucketIndex]) {
            if (trace.decision === "ALLOW") groupedData[bucketIndex].allow += 1;
            if (trace.decision === "BLOCK") groupedData[bucketIndex].block += 1;
            if (trace.decision === "ESCALATE") groupedData[bucketIndex].escalate += 1;
          }
        });

        setChartData(groupedData);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-500" />
        <p className="text-sm font-bold tracking-widest uppercase">Aggregating Enterprise Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Control Center</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Real-time observability across your AI agents and runtime policies.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-md border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            System Healthy
          </span>
          <button onClick={fetchDashboardData} type="button" className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-slate-800 transition-colors flex items-center gap-2">
            <Activity className="w-4 h-4"/> Refresh Data
          </button>
        </div>
      </div>

      {/* METRICS GRID (GERÇEK VERİLER) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Invocations", value: stats.invocations.toString(), trend: "Live", isUp: true, icon: Activity, color: "text-blue-500", bg: "bg-blue-50" },
          { title: "Enforced Blocks", value: stats.blocks.toString(), trend: "Live", isUp: false, icon: ShieldAlert, color: "text-rose-500", bg: "bg-rose-50" },
          { title: "Human Escalations", value: stats.escalations.toString(), trend: "Live", isUp: false, icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
          { title: "Active Agents", value: stats.agents.toString(), trend: "Live", isUp: true, icon: Fingerprint, color: "text-indigo-500", bg: "bg-indigo-50" },
        ].map((stat, idx) => (
          <div key={idx} className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className={`flex items-center text-xs font-bold ${stat.isUp ? "text-emerald-600" : "text-blue-600"}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse mr-1.5"></span>
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
              <p className="text-sm font-semibold text-slate-500 mt-1">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN CHART & RISK POSTURE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-black text-slate-900">Runtime Decisions (24h)</h2>
            <select className="text-sm font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
              <option>All Agents</option>
            </select>
          </div>
          
          {stats.invocations === 0 ? (
             <div className="flex-1 flex flex-col items-center justify-center text-slate-400 min-h-[250px]">
               <Database className="w-8 h-8 mb-3 opacity-50"/>
               <p className="text-sm font-bold">No telemetry data yet.</p>
               <p className="text-xs">Go to Traces and simulate traffic.</p>
             </div>
          ) : (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAllow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorBlock" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} allowDecimals={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                  <Area type="monotone" dataKey="allow" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorAllow)" />
                  <Area type="monotone" dataKey="block" stroke="#F43F5E" strokeWidth={3} fillOpacity={1} fill="url(#colorBlock)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* RISK POSTURE */}
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col">
          <h2 className="text-base font-black text-slate-900 mb-6">Security Posture</h2>
          <div className="flex-1 flex flex-col justify-center gap-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-slate-700">Data Exfiltration Prevention</span>
                <span className="font-bold text-emerald-600">100%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full w-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-slate-700">Prompt Injection Defeats</span>
                <span className="font-bold text-blue-600">100%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full w-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-slate-700">Tool Abuse Blocks</span>
                <span className="font-bold text-amber-600">100%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full w-full"></div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100">
            <button type="button" className="w-full py-2 text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
              Review Posture Settings
            </button>
          </div>
        </div>
      </div>

      {/* RECENT DECISIONS LOG */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-base font-black text-slate-900">Recent Enforcement Logs</h2>
          <button onClick={() => window.location.href='/dashboard/traces'} type="button" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
            View All Traces &rarr;
          </button>
        </div>
        
        {recentLogs.length === 0 ? (
           <div className="p-8 text-center text-slate-500 text-sm font-bold">
             No recent enforcement logs found in database.
           </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-3 text-xs font-black uppercase tracking-wider text-slate-500 border-b border-slate-200">Request ID</th>
                  <th className="px-6 py-3 text-xs font-black uppercase tracking-wider text-slate-500 border-b border-slate-200">Agent</th>
                  <th className="px-6 py-3 text-xs font-black uppercase tracking-wider text-slate-500 border-b border-slate-200">Intent / Tool</th>
                  <th className="px-6 py-3 text-xs font-black uppercase tracking-wider text-slate-500 border-b border-slate-200">Triggered Policy</th>
                  <th className="px-6 py-3 text-xs font-black uppercase tracking-wider text-slate-500 border-b border-slate-200">Decision</th>
                  <th className="px-6 py-3 text-xs font-black uppercase tracking-wider text-slate-500 border-b border-slate-200 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {recentLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-mono font-bold text-slate-600 truncate max-w-[100px]">{log.id.split('-')[0]}...</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{log.agent_name}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-600">{log.intent}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-700 text-[10px] uppercase tracking-wider font-black rounded-md border border-slate-200">
                        {log.policy_triggered}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-black rounded-md border ${
                        log.decision === "ALLOW" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        log.decision === "BLOCK" ? "bg-rose-50 text-rose-700 border-rose-200" :
                        "bg-amber-50 text-amber-700 border-amber-200"
                      }`}>
                        {log.decision}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button type="button" className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
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