"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function CommandCenterPage() {
  const supabase = createClient();
  const [agentCount, setAgentCount] = useState<number>(0);
  const [incidentCount, setIncidentCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const { data: ws } = await supabase
          .from("workspaces")
          .select("id")
          .eq("owner_id", user.id)
          .single();

        if (ws) {
          const { count: agentsTotal } = await supabase
            .from("agents")
            .select("*", { count: "exact", head: true })
            .eq("workspace_id", ws.id);

          const { count: incidentsTotal } = await supabase
            .from("incidents")
            .select("*", { count: "exact", head: true })
            .eq("workspace_id", ws.id);

          setAgentCount(agentsTotal || 0);
          setIncidentCount(incidentsTotal || 0);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [supabase]);

  const EMPTY_CHART_DATA = [
    { day: "Mon", requests: 0, blocked: 0 },
    { day: "Tue", requests: 0, blocked: 0 },
    { day: "Wed", requests: 0, blocked: 0 },
    { day: "Thu", requests: 0, blocked: 0 },
    { day: "Fri", requests: 0, blocked: 0 },
    { day: "Sat", requests: 0, blocked: 0 },
    { day: "Sun", requests: 0, blocked: 0 },
  ];

  return (
    <div className="p-6 sm:p-10 max-w-[1600px] mx-auto w-full flex flex-col gap-8">
      {/* KARŞILAMA VE ÖZET */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-800 pb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-2xl font-serif text-white tracking-tight">
            Command Center
          </h1>
          <p className="text-xs font-mono text-gray-400 mt-1">
            Real-time overview of your enterprise AI infrastructure.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 bg-[#121215] border border-gray-800 px-4 py-2 rounded-xl shadow-inner"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-mono text-gray-300">
            System Status:{" "}
            <strong className="text-emerald-400 font-normal">
              Optimal & Secured
            </strong>
          </span>
        </motion.div>
      </div>

      {/* METRİK KARTLARI (PROFESYONEL İKONLAR İLE) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Aktif Ajanlar */}
        <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-5 hover:border-gray-700 transition-all shadow-xl flex flex-col justify-between group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#0066EE]/10 border border-[#0066EE]/30 flex items-center justify-center text-[#0066EE] shadow-sm">
              <Layers className="w-5 h-5" />
            </div>
            <Link
              href="/dashboard/agents"
              className="text-[11px] font-mono text-[#0066EE] hover:underline flex items-center gap-1 bg-[#0066EE]/10 px-2.5 py-1 rounded-lg border border-[#0066EE]/20 transition-all"
            >
              <Plus className="w-3 h-3" /> Deploy
            </Link>
          </div>
          <div>
            <h3 className="text-3xl font-serif font-semibold text-white mb-1">
              {loading ? "..." : agentCount}
            </h3>
            <p className="text-xs font-mono text-gray-400">Active AI Agents</p>
          </div>
        </div>

        {/* Kritik İhlaller */}
        <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-5 hover:border-gray-700 transition-all shadow-xl flex flex-col justify-between group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 shadow-sm">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span
              className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border ${incidentCount > 0 ? "text-amber-400 bg-amber-500/10 border-amber-500/20" : "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"}`}
            >
              {incidentCount > 0 ? "Requires attention" : "All Clear"}
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-serif font-semibold text-white mb-1">
              {loading ? "..." : incidentCount}
            </h3>
            <p className="text-xs font-mono text-gray-400">
              Critical Flags (PII/Injection)
            </p>
          </div>
        </div>

        {/* Compliance Score */}
        <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-5 hover:border-gray-700 transition-all shadow-xl flex flex-col justify-between group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-sm">
              <Lock className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              100% Secure
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-serif font-semibold text-white mb-1">
              100%
            </h3>
            <p className="text-xs font-mono text-gray-400">Compliance Score</p>
          </div>
        </div>

        {/* İşlenen Token */}
        <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-5 hover:border-gray-700 transition-all shadow-xl flex flex-col justify-between group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-sm">
              <Terminal className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-serif font-semibold text-white mb-1">
              0
            </h3>
            <p className="text-xs font-mono text-gray-400">
              Tokens Processed (24h)
            </p>
          </div>
        </div>
      </div>

      {/* GRAFİK VE İNCİDENT BÖLÜMÜ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[400px]">
        {/* ANA GRAFİK (SOL 2 KOLON) */}
        <div className="lg:col-span-2 bg-[#121215] border border-gray-800/80 rounded-2xl p-6 flex flex-col shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-medium text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#0066EE]" /> Network Telemetry
              </h3>
              <p className="text-[11px] font-mono text-gray-500 mt-1">
                Total Requests vs Blocked Threats (Last 7 Days)
              </p>
            </div>
            <Link
              href="/dashboard/agents"
              className="text-[11px] font-mono text-[#0066EE] hover:underline flex items-center"
            >
              View Agents <ChevronRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>

          <div className="flex-1 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={EMPTY_CHART_DATA}
                margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0066EE" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0066EE" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#222228"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
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
                <Area
                  type="monotone"
                  dataKey="requests"
                  stroke="#0066EE"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorReq)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SON RİSKLER (SIFIR KİLOMETRE BOŞ DURUM) */}
        <div className="bg-[#121215] border border-gray-800/80 rounded-2xl flex flex-col overflow-hidden shadow-xl">
          <div className="px-6 py-5 border-b border-gray-800 flex items-center justify-between">
            <h3 className="text-sm font-medium text-white flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-red-500" /> Recent Flagged
              Activity
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-white mb-1">
              No security flags
            </p>
            <p className="text-xs text-gray-500 font-mono max-w-xs">
              Your workspace is clean. Any agent anomalies or PII leaks will
              appear here in real-time.
            </p>
          </div>

          <div className="p-3 border-t border-gray-800 bg-[#19191d]/30 text-center">
            <Link
              href="/dashboard/risk-center"
              className="text-[11px] font-medium font-mono text-[#0066EE] hover:text-blue-400 transition-colors"
            >
              View Risk Center →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
