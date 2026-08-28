"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe2, Activity, Server, ShieldCheck, MapPin,
  ArrowUpRight, Zap, Radio, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

// --- MOCK NETWORK DATA ---
const networkTrafficData = [
  { time: "00:00", requests: 12400 },
  { time: "04:00", requests: 8200 },
  { time: "08:00", requests: 21500 },
  { time: "12:00", requests: 38400 },
  { time: "16:00", requests: 42100 },
  { time: "20:00", requests: 31000 },
  { time: "24:00", requests: 18000 },
];

const edgeNodes = [
  { region: "US East (N. Virginia)", provider: "AWS / OpenAI", latency: "24ms", load: "45%", status: "Operational" },
  { region: "EU Central (Frankfurt)", provider: "AWS / Mistral", latency: "12ms", load: "62%", status: "Operational" },
  { region: "US West (Oregon)", provider: "GCP / Anthropic", latency: "38ms", load: "28%", status: "Operational" },
  { region: "AP Northeast (Tokyo)", provider: "Azure / OpenAI", latency: "115ms", load: "14%", status: "Operational" },
];

export default function GlobalNetworkPage() {
  return (
    <div className="h-[calc(100vh-48px)] flex flex-col pt-8 sm:pt-10 px-4 sm:px-8 w-full relative justify-between bg-background text-foreground overflow-y-auto cf-scrollbar">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto flex flex-col flex-1 relative z-10">

        {/* HEADER */}
        <div className="flex flex-col border-b border-border/40 pb-6 mb-8">
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <Globe2 className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-[11px] font-mono uppercase tracking-widest font-semibold text-foreground">Infrastructure</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Global Network</h1>
          <p className="text-[13px] text-muted-foreground mt-2 max-w-2xl">
            Real-time edge telemetry, provider routing latency, and geographic security enforcement across the Aegisora global perimeter.
          </p>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#111113] border border-border rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Total Requests</span>
              <Activity className="w-4 h-4 text-primary" strokeWidth={1.5} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">1.24M</div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +12.5% from last week
            </div>
          </div>

          <div className="bg-[#111113] border border-border rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Avg Latency</span>
              <Zap className="w-4 h-4 text-orange-500" strokeWidth={1.5} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">42ms</div>
            <div className="text-[11px] text-muted-foreground flex items-center gap-1">
              Global provider average
            </div>
          </div>

          <div className="bg-[#111113] border border-border rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Blocked at Edge</span>
              <ShieldCheck className="w-4 h-4 text-decision-block" strokeWidth={1.5} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">14,205</div>
            <div className="text-[11px] text-muted-foreground flex items-center gap-1">
              Threats neutralized
            </div>
          </div>

          <div className="bg-[#111113] border border-border rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Active Nodes</span>
              <Server className="w-4 h-4 text-blue-400" strokeWidth={1.5} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">14</div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 100% Operational
            </div>
          </div>
        </div>

        {/* MAIN CONTENT SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">

          {/* LEFT: CHART */}
          <div className="lg:col-span-2 bg-[#111113] border border-border rounded-xl p-5 flex flex-col shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[13px] font-bold text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-primary" strokeWidth={1.5} />
                Global Traffic Over Time
              </h3>
              <span className="text-[11px] bg-[#18181b] border border-border px-2 py-1 rounded-md text-muted-foreground">Last 24 Hours</span>
            </div>

            <div className="flex-1 min-h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={networkTrafficData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="time" stroke="var(--muted-foreground)" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#18181b', borderColor: 'var(--border)', borderRadius: '8px', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="requests" stroke="var(--primary)" strokeWidth={2} fill="url(#colorTraffic)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RIGHT: EDGE NODES */}
          <div className="bg-[#111113] border border-border rounded-xl flex flex-col shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border/50 bg-[#18181b]/50">
              <h3 className="text-[13px] font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                Edge Routing Nodes
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto cf-scrollbar p-2">
              {edgeNodes.map((node, idx) => (
                <div key={idx} className="p-3 hover:bg-[#18181b] rounded-lg transition-colors border border-transparent hover:border-border/50 flex flex-col gap-2 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-white">{node.region}</span>
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-widest">
                      <CheckCircle2 className="w-3 h-3" /> {node.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">{node.provider}</span>
                    <span className="text-muted-foreground font-mono">Lat: <span className="text-white">{node.latency}</span> | Load: <span className="text-white">{node.load}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* CLOUDFLARE STYLE BOTTOM FOOTER */}
      <footer className="w-full mt-auto border-t border-border/40 pt-6 pb-6 z-10 flex-shrink-0">
        <div className="flex flex-wrap items-center justify-center gap-6 text-[12px] font-medium text-muted-foreground/80 mb-4">
          <Link href="#" className="hover:text-foreground transition-colors">Support</Link>
          <div className="w-[1px] h-3 bg-border/50" />
          <Link href="#" className="hover:text-foreground transition-colors">System Status</Link>
          <div className="w-[1px] h-3 bg-border/50" />
          <Link href="#" className="hover:text-foreground transition-colors">Careers</Link>
          <div className="w-[1px] h-3 bg-border/50" />
          <Link href="#" className="hover:text-foreground transition-colors">Terms of Use</Link>
          <div className="w-[1px] h-3 bg-border/50" />
          <Link href="#" className="hover:text-foreground transition-colors">Report Security Issues</Link>
          <div className="w-[1px] h-3 bg-border/50" />
          <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <div className="w-[1px] h-3 bg-border/50" />
          <Link href="#" className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors">
            <span className="flex items-center justify-center w-5 h-3 bg-blue-500 text-white rounded-sm text-[8px] leading-none">✔✖</span>
            Cookie Preferences
          </Link>
        </div>
        <div className="text-center text-[11px] text-muted-foreground/50">
          © 2026 Aegisora, Inc. (Cloudflare Reference UI)
        </div>
      </footer>

    </div>
  );
}
