type DashboardChartDatum = {
  name?: string;
  requests?: number;
  blocked?: number;
  latency?: number;
  label?: string;
};

type DashboardTooltipPayload = {
  payload: DashboardChartDatum;
};

type DashboardTooltipProps = {
  active?: boolean;
  payload?: DashboardTooltipPayload[];
  label?: string | number;
};

type DashboardDotProps = {
  cx?: number;
  cy?: number;
  payload?: DashboardChartDatum;
};
"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ShieldAlert,
  Cpu,
  ShieldCheck,
  Terminal,
  AlertOctagon,
  ChevronRight,
  Plus,
  Radio,
  Lock,
  Layers,
  Zap,
  PieChart as PieIcon,
  BarChart3,
  Network,
} from "lucide-react";
import Link from "next/link";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { createClient } from "@/utils/supabase/client";

const timeframeSequence = ["24H", "7D", "1M", "3M", "1Y"];

const timeframeDatasets: Record<string, any[]> = {
  "24H": [
    { time: "00:00", requests: 310, blocked: 4, label: "Night low telemetry" },
    {
      time: "04:00",
      requests: 180,
      blocked: 2,
      label: "Minimal activity slot",
    },
    {
      time: "08:00",
      requests: 1240,
      blocked: 22,
      label: "Morning burst / API handshake",
    },
    {
      time: "12:00",
      requests: 2890,
      blocked: 64,
      label: "Peak corporate load",
    },
    {
      time: "16:00",
      requests: 3400,
      blocked: 89,
      label: "Adversarial probe intercepted",
    },
    {
      time: "20:00",
      requests: 1950,
      blocked: 31,
      label: "Evening normalization",
    },
  ],
  "7D": [
    {
      time: "Mon",
      requests: 1200,
      blocked: 45,
      label: "Normal weekly startup",
    },
    {
      time: "Tue",
      requests: 1900,
      blocked: 82,
      label: "Moderate agent traffic",
    },
    {
      time: "Wed",
      requests: 2400,
      blocked: 110,
      label: "Tool execution spike",
    },
    {
      time: "Thu",
      requests: 3100,
      blocked: 156,
      label: "Elevated threat vector",
    },
    {
      time: "Fri",
      requests: 4800,
      blocked: 210,
      label: "Peak vulnerability scan detected",
    },
    {
      time: "Sat",
      requests: 3900,
      blocked: 135,
      label: "Weekend background sync",
    },
    {
      time: "Sun",
      requests: 5200,
      blocked: 240,
      label: "High automated throughput",
    },
  ],
  "1M": [
    {
      time: "Week 1",
      requests: 14200,
      blocked: 510,
      label: "Initial monthly deployment",
    },
    {
      time: "Week 2",
      requests: 19800,
      blocked: 840,
      label: "Scale-up across 12 clusters",
    },
    {
      time: "Week 3",
      requests: 24100,
      blocked: 1120,
      label: "Major prompt injection wave",
    },
    {
      time: "Week 4",
      requests: 31500,
      blocked: 1450,
      label: "Record traffic handled",
    },
  ],
  "3M": [
    {
      time: "Month 1",
      requests: 68000,
      blocked: 2900,
      label: "Quarter start baseline",
    },
    {
      time: "Month 2",
      requests: 94000,
      blocked: 4300,
      label: "Expansion phase & new agents",
    },
    {
      time: "Month 3",
      requests: 128000,
      blocked: 5900,
      label: "Enterprise grade scaling",
    },
  ],
  "1Y": [
    {
      time: "Q1",
      requests: 180000,
      blocked: 7500,
      label: "Q1 Infrastructure audit",
    },
    {
      time: "Q2",
      requests: 290000,
      blocked: 12400,
      label: "Q2 Zero-trust upgrade",
    },
    {
      time: "Q3",
      requests: 420000,
      blocked: 18900,
      label: "Q3 Global proxy scaling",
    },
    {
      time: "Q4",
      requests: 610000,
      blocked: 27500,
      label: "Q4 Year-end high security load",
    },
  ],
};

const threatDistributionData = [
  { name: "Prompt Injection", value: 45, color: "#ef4444" },
  { name: "PII Data Leakage", value: 30, color: "#f59e0b" },
  { name: "Hallucination Breach", value: 15, color: "#3b82f6" },
  { name: "Anomaly Rate Limit", value: 10, color: "#8b5cf6" },
];

const agentLatencyData = [
  { name: "Support Bot", latency: 42, requests: 4100 },
  { name: "Billing AI", latency: 35, requests: 2800 },
  { name: "Legal Analyzer", latency: 78, requests: 1500 },
  { name: "Sales Assistant", latency: 54, requests: 3600 },
];

const CustomTerminalTooltip = ({ active, payload, label }: DashboardTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl shadow-2xl font-mono text-xs max-w-xs backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
          <span className="text-zinc-500 uppercase tracking-widest text-[10px]">
            Timestamp / Slot
          </span>
          <span className="text-white font-bold">{label}</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between gap-4">
            <span className="text-zinc-400">Total Requests:</span>
            <span className="text-blue-400 font-semibold">
              {data.requests?.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-zinc-400">Blocked Threats:</span>
            <span className="text-red-400 font-semibold">
              {data.blocked?.toLocaleString()}
            </span>
          </div>
          {data.label && (
            <div className="mt-2 pt-2 border-t border-zinc-800 text-[11px] text-amber-400 bg-amber-500/10 px-2.5 py-1.5 rounded-lg border border-amber-500/20">
              ⚡ {data.label}
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

const CustomizedDot = ({ cx, cy, payload }: DashboardDotProps) => {
  if (
    typeof cx !== "number" ||
    typeof cy !== "number" ||
    !payload
  ) {
    return null;
  }
  const isCritical =
    (payload.blocked ?? 0) > 100 ||
    payload.label?.includes("Adversarial") ||
    payload.label?.includes("spike");

  if (isCritical) {
    return (
      <svg x={cx - 6} y={cy - 6} width={12} height={12} viewBox="0 0 12 12">
        <circle
          cx="6"
          cy="6"
          r="5"
          fill="#ef4444"
          stroke="#fff"
          strokeWidth="2"
          className="animate-ping"
        />
        <circle cx="6" cy="6" r="4" fill="#ef4444" />
      </svg>
    );
  }

  return (
    <circle
      cx={cx}
      cy={cy}
      r={3}
      fill="#3b82f6"
      stroke="#fff"
      strokeWidth={1}
    />
  );
};

export default function CommandCenterPage() {
  const supabase = createClient();
  const [agentCount, setAgentCount] = useState<number>(0);
  const [incidentCount, setIncidentCount] = useState<number>(0);
  const [tokensCount, setTokensCount] = useState<number>(142850);
  const [timeframe, setTimeframe] = useState<string>("7D");

  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const currentIndex = timeframeSequence.indexOf(timeframe);

      if (e.deltaY > 0) {
        if (currentIndex < timeframeSequence.length - 1) {
          setTimeframe(timeframeSequence[currentIndex + 1]);
        }
      } else {
        if (currentIndex > 0) {
          setTimeframe(timeframeSequence[currentIndex - 1]);
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [timeframe]);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const { count: agentsCnt } = await supabase
          .from("agents")
          .select("*", { count: "exact", head: true });

        if (agentsCnt !== null) setAgentCount(agentsCnt);

        const { count: incCnt } = await supabase
          .from("incidents")
          .select("*", { count: "exact", head: true });

        if (incCnt !== null) setIncidentCount(incCnt);
      } catch (err) {
        console.error("Error fetching metrics:", err);
      }
    }

    fetchMetrics();

    const liveTicker = setInterval(() => {
      setTokensCount((prev) => prev + Math.floor(Math.random() * 200 + 50));
    }, 3000);

    const channel = supabase
      .channel("command-center-sync")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "agents" },
        () => {
          fetchMetrics();
        },
      )
      .subscribe();

    return () => {
      clearInterval(liveTicker);
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const currentChartData =
    timeframeDatasets[timeframe] || timeframeDatasets["7D"];

  return (
    <div className="p-6 sm:p-10 max-w-[1600px] mx-auto w-full flex flex-col gap-8 font-sans relative selection:bg-blue-500/30 min-h-screen">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(0,102,238,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/80 pb-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-blue-400 bg-blue-950/40 border border-blue-800/30 px-3 py-1 rounded-full mb-4 inline-flex items-center gap-1.5 shadow-sm">
            <Network className="w-3 h-3" />
            Operations Overview
          </span>
          <h1 className="text-3xl font-serif text-white tracking-tight mt-1">
            Command Center
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-2">
            Real-time PostgreSQL telemetry overview of your enterprise AI
            infrastructure.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <Link
            href="/dashboard/ai-chat"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-xl text-xs font-medium text-white transition-all shadow-[0_4px_15px_rgba(0,102,238,0.2)] hover:shadow-[0_6px_20px_rgba(0,102,238,0.3)] outline-none"
          >
            <Zap className="w-4 h-4 text-white" />
            <span>Ask AI Analyst</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 px-4 py-2.5 rounded-xl shadow-inner"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse"></div>
            <span className="text-[11px] font-mono text-zinc-300">
              System Status:{" "}
              <strong className="text-emerald-400 font-semibold">
                Optimal & Secured
              </strong>
            </span>
          </motion.div>
        </div>
      </div>

      {/* METRİK KARTLARI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        <Link
          href="/dashboard/agents"
          className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-[2rem] p-6 hover:border-blue-500/50 transition-all shadow-xl flex flex-col justify-between group cursor-pointer outline-none"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-inner group-hover:scale-105 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400 group-hover:underline flex items-center gap-1.5 bg-blue-950/60 px-3 py-1 rounded-full border border-blue-800/40 transition-all">
              <Plus className="w-3 h-3" /> Fleet View
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-serif font-bold text-white mb-1 tracking-tight">
              {agentCount}
            </h3>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
              Active AI Agents (DB)
            </p>
          </div>
        </Link>

        <Link
          href="/dashboard/risk-center"
          className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-[2rem] p-6 hover:border-red-500/50 transition-all shadow-xl flex flex-col justify-between group cursor-pointer outline-none"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shadow-inner group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              {incidentCount} Logged
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-serif font-bold text-white mb-1 tracking-tight">
              {incidentCount}
            </h3>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
              Critical Policy Violations
            </p>
          </div>
        </Link>

        <Link
          href="/dashboard/reports"
          className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-[2rem] p-6 hover:border-emerald-500/50 transition-all shadow-xl flex flex-col justify-between group cursor-pointer outline-none"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              Target &lt; 1%
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-serif font-bold text-white mb-1 tracking-tight">
              0.2%
            </h3>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
              False Positive Rate
            </p>
          </div>
        </Link>

        <Link
          href="/dashboard/risk-center"
          className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-[2rem] p-6 hover:border-purple-500/50 transition-all shadow-xl flex flex-col justify-between group cursor-pointer outline-none"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-inner group-hover:scale-105 transition-transform">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping shadow-[0_0_10px_#c084fc]"></div>
          </div>
          <div>
            <h3 className="text-3xl font-serif font-bold text-white mb-1 tracking-tight">
              {formatNumber(Math.floor(tokensCount / 100))}
            </h3>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
              Blocked Unauthorized Tool Calls
            </p>
          </div>
        </Link>
      </div>

      {/* GRAFİK 1: NETWORK TELEMETRY */}
      <div
        ref={chartContainerRef}
        className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-[2.5rem] p-6 sm:p-8 flex flex-col shadow-2xl select-none relative z-10 overflow-hidden"
        title="Grafik üzerinde fare tekerleğini (wheel) kullanarak zaman aralığını dinamik olarak değiştirebilirsin (Zoom In/Out)"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,102,238,0.05)_0%,transparent_50%)] pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 relative z-10">
          <div>
            <h3 className="text-base font-serif font-medium text-white flex items-center gap-2.5 tracking-tight">
              <Radio className="w-4 h-4 text-blue-400 animate-pulse" />{" "}
              Operational Telemetry & Policy Blocks
            </h3>
            <p className="text-[11px] font-mono text-zinc-500 mt-1 uppercase tracking-widest">
              Total Agent Requests vs Blocked Unauthorized Calls • Range:{" "}
              <span className="text-blue-400 font-bold">{timeframe}</span>{" "}
              (Scroll Wheel to Zoom)
            </p>
          </div>

          <div className="flex items-center bg-zinc-950 p-1.5 rounded-xl border border-zinc-800 shadow-inner">
            {timeframeSequence.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer outline-none ${
                  timeframe === tf
                    ? "bg-blue-600 text-white shadow-md font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full h-[320px] relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={currentChartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272a"
                vertical={false}
              />
              <XAxis
                dataKey="time"
                stroke="#71717a"
                tick={{
                  fontSize: 11,
                  fill: "#a1a1aa",
                  fontFamily: "monospace",
                }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis
                stroke="#71717a"
                tick={{
                  fontSize: 11,
                  fill: "#a1a1aa",
                  fontFamily: "monospace",
                }}
                axisLine={false}
                tickLine={false}
                dx={-10}
              />
              <Tooltip content={<CustomTerminalTooltip />} />
              <Area
                type="monotone"
                dataKey="requests"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorReq)"
                dot={<CustomizedDot />}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ALT GRAFİKLER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* PIE CHART */}
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-[2.5rem] p-6 sm:p-8 flex flex-col shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,102,238,0.05)_0%,transparent_50%)] pointer-events-none" />

          <div className="flex items-center justify-between mb-6 relative z-10">
            <h3 className="text-base font-serif font-medium text-white flex items-center gap-2.5 tracking-tight">
              <PieIcon className="w-4 h-4 text-amber-400" /> Blocked Actions by
              Policy Type
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">
              Percentage Share
            </span>
          </div>

          <div className="w-full h-[260px] flex items-center justify-center relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={threatDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={6}
                  dataKey="value"
                >
                  {threatDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    borderColor: "#27272a",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                    fontFamily: "monospace",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 pt-6 border-t border-zinc-800/80 relative z-10">
            {threatDistributionData.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 text-xs font-mono text-zinc-300 bg-zinc-950/40 px-3 py-2 rounded-xl border border-zinc-800/60"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="truncate">
                  {item.name} ({item.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* BAR CHART */}
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-[2.5rem] p-6 sm:p-8 flex flex-col shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.05)_0%,transparent_50%)] pointer-events-none" />

          <div className="flex items-center justify-between mb-6 relative z-10">
            <h3 className="text-base font-serif font-medium text-white flex items-center gap-2.5 tracking-tight">
              <BarChart3 className="w-4 h-4 text-purple-400" /> Agent Latency vs
              Workload Matrix
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">
              Avg Latency (ms)
            </span>
          </div>

          <div className="w-full h-[260px] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={agentLatencyData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#27272a"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#71717a"
                  tick={{
                    fontSize: 11,
                    fill: "#a1a1aa",
                    fontFamily: "monospace",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#71717a"
                  tick={{
                    fontSize: 11,
                    fill: "#a1a1aa",
                    fontFamily: "monospace",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    borderColor: "#27272a",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                    fontFamily: "monospace",
                  }}
                  itemStyle={{ color: "#c084fc" }}
                />
                <Bar dataKey="latency" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-6 border-t border-zinc-800/80 text-xs font-mono text-zinc-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2 relative z-10">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />{" "}
              Status: All agents operating under safe limits (&lt;100ms)
            </span>
            <Link
              href="/dashboard/agents"
              className="text-blue-400 hover:text-white font-semibold transition-colors underline underline-offset-4"
            >
              View Fleet →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
