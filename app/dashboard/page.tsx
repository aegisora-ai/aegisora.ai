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
  Legend,
} from "recharts";
import { createClient } from "@/utils/supabase/client";

// Zaman Aralıkları Sıralaması (Zoom için)
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

// Saldırı Türleri Dağılımı Verisi (Threat Vectors Donut Chart)
const threatDistributionData = [
  { name: "Prompt Injection", value: 45, color: "#ef4444" },
  { name: "PII Data Leakage", value: 30, color: "#f59e0b" },
  { name: "Hallucination Breach", value: 15, color: "#0066EE" },
  { name: "Anomaly Rate Limit", value: 10, color: "#8b5cf6" },
];

// Ajan Performans ve Gecikme Verisi (Agent Latency & Workload Bar Chart)
const agentLatencyData = [
  { name: "Support Bot", latency: 42, requests: 4100 },
  { name: "Billing AI", latency: 35, requests: 2800 },
  { name: "Legal Analyzer", latency: 78, requests: 1500 },
  { name: "Sales Assistant", latency: 54, requests: 3600 },
];

const CustomTerminalTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#121215] border border-gray-700 p-4 rounded-xl shadow-2xl font-mono text-xs max-w-xs">
        <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-2">
          <span className="text-gray-400 uppercase tracking-widest text-[10px]">
            Timestamp / Slot
          </span>
          <span className="text-white font-bold">{label}</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span className="text-gray-400">Total Requests:</span>
            <span className="text-blue-400 font-semibold">
              {data.requests?.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Blocked Threats:</span>
            <span className="text-red-400 font-semibold">
              {data.blocked?.toLocaleString()}
            </span>
          </div>
          {data.label && (
            <div className="mt-2 pt-2 border-t border-gray-800 text-[11px] text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
              ⚡ {data.label}
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

const CustomizedDot = (props: any) => {
  const { cx, cy, payload } = props;
  const isCritical =
    payload.blocked > 100 ||
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
      fill="#0066EE"
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

  // 🖱️ FARE TEKERLEĞİ (WHEEL ZOOM) İLE DİNAMİK ZAMAN ARALIĞI DEĞİŞTİRME
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
    <div className="p-6 sm:p-10 max-w-[1600px] mx-auto w-full flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-800 pb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-2xl font-serif text-white tracking-tight">
            Command Center
          </h1>
          <p className="text-xs font-mono text-gray-400 mt-1">
            Real-time PostgreSQL telemetry overview of your enterprise AI
            infrastructure.
          </p>
        </motion.div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/ai-chat"
            className="flex items-center gap-2 bg-[#0066EE]/10 hover:bg-[#0066EE]/20 border border-[#0066EE]/30 px-4 py-2 rounded-xl text-xs font-mono text-blue-400 transition-all shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-[#0066EE]" />
            <span>Ask AI Analyst</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 bg-[#121215] border border-gray-800 px-4 py-2 rounded-xl shadow-inner"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-mono text-gray-300">
              System Status:{" "}
              <strong className="text-emerald-400 font-normal">
                Optimal & Secured (Zero-Trust)
              </strong>
            </span>
          </motion.div>
        </div>
      </div>

      {/* METRİK KARTLARI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Link
          href="/dashboard/agents"
          className="bg-[#121215] border border-gray-800/80 rounded-2xl p-5 hover:border-[#0066EE]/50 transition-all shadow-xl flex flex-col justify-between group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#0066EE]/10 border border-[#0066EE]/30 flex items-center justify-center text-[#0066EE] shadow-sm group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-[#0066EE] group-hover:underline flex items-center gap-1 bg-[#0066EE]/10 px-2.5 py-1 rounded-lg border border-[#0066EE]/20 transition-all">
              <Plus className="w-3 h-3" /> Fleet View
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-serif font-semibold text-white mb-1">
              {agentCount}
            </h3>
            <p className="text-xs font-mono text-gray-400">
              Active AI Agents (DB)
            </p>
          </div>
        </Link>

        <Link
          href="/dashboard/risk-center"
          className="bg-[#121215] border border-gray-800/80 rounded-2xl p-5 hover:border-red-500/50 transition-all shadow-xl flex flex-col justify-between group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 shadow-sm group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 border-amber-500/20 px-2.5 py-1 rounded-lg">
              {incidentCount} Logged
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-serif font-semibold text-white mb-1">
              {incidentCount}
            </h3>
            <p className="text-xs font-mono text-gray-400">
              Critical Flags (DB Incidents)
            </p>
          </div>
        </Link>

        <Link
          href="/dashboard/risk-center"
          className="bg-[#121215] border border-gray-800/80 rounded-2xl p-5 hover:border-emerald-500/50 transition-all shadow-xl flex flex-col justify-between group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-sm group-hover:scale-105 transition-transform">
              <Lock className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              100% Secure
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-serif font-semibold text-white mb-1">
              99.8%
            </h3>
            <p className="text-xs font-mono text-gray-400">Compliance Score</p>
          </div>
        </Link>

        <Link
          href="/dashboard/live-monitor"
          className="bg-[#121215] border border-gray-800/80 rounded-2xl p-5 hover:border-purple-500/50 transition-all shadow-xl flex flex-col justify-between group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-sm group-hover:scale-105 transition-transform">
              <Terminal className="w-5 h-5" />
            </div>
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></div>
          </div>
          <div>
            <h3 className="text-3xl font-serif font-semibold text-white mb-1">
              {formatNumber(tokensCount)}
            </h3>
            <p className="text-xs font-mono text-gray-400">
              Tokens Processed (Live)
            </p>
          </div>
        </Link>
      </div>

      {/* GRAFİK 1: NETWORK TELEMETRY (ZOOM & MOUSE WHEEL) */}
      <div
        ref={chartContainerRef}
        className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 flex flex-col shadow-xl select-none"
        title="Grafik üzerinde fare tekerleğini (wheel) kullanarak zaman aralığını dinamik olarak değiştirebilirsin (Zoom In/Out)"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-sm font-medium text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#0066EE]" /> Network Telemetry &
              Firewall Activity
            </h3>
            <p className="text-[11px] font-mono text-gray-500 mt-1">
              Total Requests vs Blocked Threats • Range:{" "}
              <span className="text-[#0066EE] font-bold">{timeframe}</span>{" "}
              (Scroll Wheel to Zoom)
            </p>
          </div>

          <div className="flex items-center bg-[#0a0a0c] p-1 rounded-xl border border-gray-800">
            {timeframeSequence.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  timeframe === tf
                    ? "bg-[#0066EE] text-white shadow-md font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={currentChartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0066EE" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#0066EE" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#222228"
                vertical={false}
              />
              <XAxis
                dataKey="time"
                stroke="#6b7280"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="#6b7280"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTerminalTooltip />} />
              <Area
                type="monotone"
                dataKey="requests"
                stroke="#0066EE"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorReq)"
                dot={<CustomizedDot />}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2 ADET YENİ KURUMSAL GRAFİK (ALT KISIM) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GRAFİK 2: THREAT VECTORS DISTRIBUTION (DONUT CHART) */}
        <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 flex flex-col shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-amber-400" /> Threat Vectors
              Distribution
            </h3>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              Percentage Share
            </span>
          </div>

          <div className="w-full h-[260px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={threatDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {threatDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#121215",
                    borderColor: "#333",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Lejant (Açıklamalar) */}
          <div className="grid grid-cols-2 gap-2 mt-2 pt-4 border-t border-gray-800/80">
            {threatDistributionData.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs font-mono text-gray-300"
              >
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="truncate">
                  {item.name} ({item.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* GRAFİK 3: AGENT LATENCY & PERFORMANCE (BAR CHART) */}
        <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 flex flex-col shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-400" /> Agent Latency &
              Workload Matrix
            </h3>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              Avg Latency (ms)
            </span>
          </div>

          <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={agentLatencyData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#222228"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#6b7280"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#121215",
                    borderColor: "#333",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="latency" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 pt-4 border-t border-gray-800/80 text-xs font-mono text-gray-400 flex justify-between">
            <span>
              Status: All agents operating under safe latency limits (&lt;100ms)
            </span>
            <Link
              href="/dashboard/agents"
              className="text-[#0066EE] hover:underline"
            >
              View Fleet →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
