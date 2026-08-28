"use client";

import React from "react";
import { Activity, ShieldAlert, Zap, Users } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const performanceData = [
  { time: "00:00", requests: 1200, blocked: 45 },
  { time: "04:00", requests: 900, blocked: 32 },
  { time: "08:00", requests: 3400, blocked: 120 },
  { time: "12:00", requests: 5600, blocked: 290 },
  { time: "16:00", requests: 4800, blocked: 210 },
  { time: "20:00", requests: 2100, blocked: 85 },
];

const riskData = [
  { policy: "PII Leak", violations: 420 },
  { policy: "Jailbreak", violations: 380 },
  { policy: "Toxicity", violations: 150 },
  { policy: "Malicious Code", violations: 90 },
];

export default function DashboardOverview() {
  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-[24px] font-black text-slate-900 tracking-tight">Enterprise Overview</h1>
        <p className="text-[14px] text-slate-500 font-medium mt-1">Real-time telemetry and governance metrics across your agent fleet.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border b order-slate-200 rounded-xl p-6 shado w-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#0066FF]"><Activity className="w-5 h-5"/></div>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12.5%</span>
          </div>
          <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-1">Total Invocations</h3>
          <div className="text-[28px] font-black text-slate-900">1.24M</div>
        </div>

        <div className="bg-white border b order-slate-200 rounded-xl p-6 shado w-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600"><ShieldAlert className="w-5 h-5"/></div>
            <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">+4.2%</span>
          </div>
          <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-1">Blocked Threats</h3>
          <div className="text-[28px] font-black text-slate-900">14,209</div>
        </div>

        <div className="bg-white border b order-slate-200 rounded-xl p-6 shado w-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600"><Zap className="w-5 h-5"/></div>
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Stable</span>
          </div>
          <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-1">Avg Latency (P99)</h3>
          <div className="text-[28px] font-black text-slate-900">12ms</div>
        </div>

        <div className="bg-white border b order-slate-200 rounded-xl p-6 shado w-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600"><Users className="w-5 h-5"/></div>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+2 Active</span>
          </div>
          <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-1">Active Agents</h3>
          <div className="text-[28px] font-black text-slate-900">42</div>
        </div>
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border b order-slate-200 rounded-xl p-6 shado w-sm">
          <h3 className="text-[15px] font-bold text-slate-900 mb-6">Traffic & Intervention Volume (24h)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0066FF" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0066FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBlock" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748B" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748B" }} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '13px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#0066FF" strokeWidth={2} fillOpacity={1} fill="url(#colorReq)" name="Permitted" />
                <Area type="monotone" dataKey="blocked" stroke="#F43F5E" strokeWidth={2} fillOpacity={1} fill="url(#colorBlock)" name="Blocked" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border b order-slate-200 rounded-xl p-6 shado w-sm flex flex-col">
          <h3 className="text-[15px] font-bold text-slate-900 mb-6">Top Policy Violations</h3>
          <div className="flex-1 h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748B" }} />
                <YAxis dataKey="policy" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#0F172A", fontWeight: 600 }} width={100} />
                <Tooltip
                  cursor={{ fill: '#F8FAFC' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0' }}
                />
                <Bar dataKey="violations" fill="#F59E0B" radius={[0, 4, 4, 0]} barSize={24} name="Incidents" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
