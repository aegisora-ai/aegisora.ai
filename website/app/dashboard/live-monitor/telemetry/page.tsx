"use client";

import { Cpu, Server, Wifi, Activity, Network } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const pulseData = [
  { time: "10:00", ms: 45 }, { time: "10:01", ms: 48 }, { time: "10:02", ms: 42 },
  { time: "10:03", ms: 55 }, { time: "10:04", ms: 120 }, { time: "10:05", ms: 46 },
  { time: "10:06", ms: 43 }, { time: "10:07", ms: 44 }, { time: "10:08", ms: 49 },
];

const nodes = [
  { name: "worker-us-east-1a", type: "Compute", cpu: "42%", mem: "2.1GB", status: "Healthy" },
  { name: "worker-eu-central-2", type: "Compute", cpu: "88%", mem: "4.8GB", status: "Warning" },
  { name: "router-global-edge", type: "Network", cpu: "12%", mem: "0.5GB", status: "Healthy" },
  { name: "inference-gpu-pool-1", type: "GPU", cpu: "95%", mem: "15.4GB", status: "Critical" },
];

export default function TelemetryPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">

      {/* SUMMARY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111113] border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Active WebSockets</span>
            <Wifi className="w-4 h-4 text-primary" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">1,204</div>
          <div className="text-[11px] text-muted-foreground">Open agent connections</div>
        </div>
        <div className="bg-[#111113] border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Global P99 Latency</span>
            <Activity className="w-4 h-4 text-emerald-500" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">124ms</div>
          <div className="text-[11px] text-emerald-400">Optimal routing</div>
        </div>
        <div className="bg-[#111113] border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Compute Pool</span>
            <Cpu className="w-4 h-4 text-orange-500" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">68%</div>
          <div className="text-[11px] text-muted-foreground">Average cluster utilization</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LATENCY PULSE CHART */}
        <div className="lg:col-span-2 bg-[#111113] border border-border rounded-xl p-5 flex flex-col shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[13px] font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" strokeWidth={1.5} /> Live Latency Pulse
            </h3>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-muted-foreground border border-zinc-700 uppercase tracking-widest">
               ms / time
            </span>
          </div>
          <div className="flex-1 min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pulseData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--muted-foreground)" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: 'var(--border)', borderRadius: '8px', fontSize: '12px' }} itemStyle={{ color: '#fff' }} />
                <Area type="monotone" dataKey="ms" stroke="var(--primary)" strokeWidth={2} fill="url(#colorPulse)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CLUSTER NODES TABLE */}
        <div className="bg-[#111113] border border-border rounded-xl flex flex-col shadow-sm overflow-hidden">
          <div className="p-5 border-b border-border/50 bg-[#18181b]/50">
            <h3 className="text-[13px] font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} /> Cluster Nodes
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto cf-scrollbar p-2">
            {nodes.map((node, idx) => (
              <div key={idx} className="p-3 hover:bg-[#18181b] rounded-lg transition-colors border border-transparent hover:border-border/50 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-mono text-white">{node.name}</span>
                  <span className={`w-2 h-2 rounded-full ${node.status === 'Healthy' ? 'bg-emerald-400' : node.status === 'Warning' ? 'bg-orange-400' : 'bg-red-500 animate-pulse'}`} />
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground flex items-center gap-1"><Network className="w-3 h-3" /> {node.type}</span>
                  <span className="text-muted-foreground font-mono">CPU: <span className={node.cpu > '80%' ? 'text-orange-400' : 'text-white'}>{node.cpu}</span> | RAM: <span className="text-white">{node.mem}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
