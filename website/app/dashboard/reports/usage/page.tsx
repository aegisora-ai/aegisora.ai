"use client";

import { Activity, Database, Cpu, Network } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";

const usageData = [
  { date: "Aug 20", tokens: 1.2, requests: 8.4 },
  { date: "Aug 21", tokens: 1.5, requests: 9.1 },
  { date: "Aug 22", tokens: 2.1, requests: 12.4 },
  { date: "Aug 23", tokens: 1.8, requests: 10.2 },
  { date: "Aug 24", tokens: 2.8, requests: 15.6 },
  { date: "Aug 25", tokens: 2.4, requests: 14.1 },
  { date: "Aug 26", tokens: 3.2, requests: 18.2 },
];

export default function UsagePage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">

      {/* SUMMARY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#111113] border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Total Requests</span>
            <Activity className="w-4 h-4 text-primary" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">87.9K</div>
          <div className="text-[11px] text-muted-foreground">Processed at edge</div>
        </div>
        <div className="bg-[#111113] border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Tokens Processed</span>
            <Database className="w-4 h-4 text-emerald-500" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">15.0M</div>
          <div className="text-[11px] text-muted-foreground">Across all models</div>
        </div>
        <div className="bg-[#111113] border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Compute Time</span>
            <Cpu className="w-4 h-4 text-orange-500" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">428h</div>
          <div className="text-[11px] text-muted-foreground">Total active inference</div>
        </div>
        <div className="bg-[#111113] border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Egress Bandwidth</span>
            <Network className="w-4 h-4 text-blue-500" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">14.2 GB</div>
          <div className="text-[11px] text-muted-foreground">Data transferred</div>
        </div>
      </div>

      {/* USAGE BAR CHART */}
      <div className="bg-[#111113] border border-border rounded-xl p-5 flex flex-col shadow-sm">
        <h3 className="text-[13px] font-bold text-white mb-6">Token Usage (Millions)</h3>
        <div className="flex-1 min-h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usageData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ fill: 'var(--sidebar)' }}
                contentStyle={{ backgroundColor: '#18181b', borderColor: 'var(--border)', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="tokens" radius={[2, 2, 0, 0]}>
                {usageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === usageData.length - 1 ? 'var(--primary)' : 'var(--muted)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
