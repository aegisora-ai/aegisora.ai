"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  EyeOff,
  AlertCircle,
  Activity,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Clock,
  Loader2,
  Zap,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

interface Incident {
  id: string;
  threat_type: string;
  agent_name?: string;
  severity: string;
  status: string;
  payload: string;
  created_at?: string;
}

export default function RiskCenterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [isLoading, setIsLoading] = useState(true);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [policies, setPolicies] = useState({
    policy_pii: true,
    policy_injection: true,
    policy_hallucination: true,
    policy_anomaly: true,
  });

  // 🚀 GERÇEK VERİTABANINDAN İNCİDENT VE POLİTİKALARI ÇEKME
  useEffect(() => {
    async function fetchRiskData() {
      try {
        setIsLoading(true);

        const { data: incData, error: incError } = await supabase
          .from("incidents")
          .select("*")
          .order("created_at", { ascending: false });

        if (incError) {
          console.error("Error fetching incidents:", incError.message);
        } else if (incData) {
          setIncidents(incData);
        }

        const { data: polData, error: polError } = await supabase
          .from("policy_rules")
          .select("policy_key, is_enabled");

        if (!polError && polData && polData.length > 0) {
          const polMap: any = {};
          polData.forEach((p) => {
            polMap[p.policy_key] = p.is_enabled;
          });
          setPolicies((prev) => ({ ...prev, ...polMap }));
        }
      } catch (err) {
        console.error("Error connecting to database:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRiskData();

    // ⚡ REALTIME SUBSCRIPTION
    const channel = supabase
      .channel("risk-center-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "incidents" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setIncidents((prev) => [payload.new as Incident, ...prev]);
          } else if (payload.eventType === "DELETE") {
            setIncidents((prev) => prev.filter((i) => i.id !== payload.old.id));
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // 🔒 POLİTİKA ŞALTERİNİ DEĞİŞTİRME VE DB'YE KAYDETME
  const togglePolicy = async (policyKey: keyof typeof policies) => {
    const nextVal = !policies[policyKey];
    setPolicies((prev) => ({ ...prev, [policyKey]: nextVal }));

    try {
      await supabase.from("policy_rules").upsert(
        {
          policy_key: policyKey,
          is_enabled: nextVal,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "policy_key" },
      );
    } catch (err) {
      console.error("Failed to update policy in DB:", err);
    }
  };

  // 🗑️ İNCİDENTİ GİDERME / SİLME
  const handleDismiss = async (id: string) => {
    setIncidents((prev) => prev.filter((inc) => inc.id !== id));
    if (expandedId === id) setExpandedId(null);

    try {
      await supabase.from("incidents").delete().eq("id", id);
    } catch (err) {
      console.error("Failed to delete incident:", err);
    }
  };

  const filteredIncidents = incidents.filter(
    (inc) =>
      inc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.threat_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inc.agent_name &&
        inc.agent_name.toLowerCase().includes(searchQuery.toLowerCase())),
  );

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
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-red-400 bg-red-950/40 border border-red-800/30 px-3 py-1 rounded-full mb-4 inline-flex items-center gap-1.5 shadow-sm">
            <ShieldAlert className="w-3 h-3" />
            Security Perimeter
          </span>
          <h1 className="text-3xl font-serif text-white tracking-tight flex items-center gap-3">
            Risk & Compliance Center
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-2">
            Production-grade PostgreSQL zero-trust security policies and
            real-time threat monitoring.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/dashboard/ai-chat"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-xl text-xs font-medium text-white transition-all shadow-[0_4px_15px_rgba(0,102,238,0.2)] hover:shadow-[0_6px_20px_rgba(0,102,238,0.3)] outline-none"
          >
            <Zap className="w-4 h-4" />
            <span>Analyze Incidents with AI</span>
          </Link>
          <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-xl text-emerald-400 text-[11px] font-mono font-semibold uppercase tracking-widest shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            All Protocols Enforcing
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 relative z-10">
        {/* ŞALTERLER (POLICIES) */}
        <div className="xl:col-span-4 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-[2rem] p-6 sm:p-8 shadow-2xl h-fit relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,238,0.05)_0%,transparent_50%)] pointer-events-none" />

          <h3 className="text-sm font-semibold text-white flex items-center gap-2.5 mb-8 tracking-wide relative z-10">
            <Lock className="w-4 h-4 text-blue-400" /> Active Security Policies
            (DB)
          </h3>

          <div className="space-y-7 relative z-10">
            {/* PII Masking */}
            <div className="flex items-start justify-between gap-4 group">
              <div>
                <h4 className="text-[13px] font-medium text-zinc-200 flex items-center gap-2 mb-1.5 group-hover:text-white transition-colors">
                  <EyeOff className="w-4 h-4 text-blue-400" /> PII Data Masking
                </h4>
                <p className="text-[11px] font-mono text-zinc-500 leading-relaxed max-w-[220px]">
                  Automatically redacts SSN, credit cards, and emails at proxy
                  level.
                </p>
              </div>
              <button
                onClick={() => togglePolicy("policy_pii")}
                className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 cursor-pointer outline-none border ${
                  policies.policy_pii
                    ? "bg-blue-600 border-blue-500"
                    : "bg-zinc-800 border-zinc-700"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-[3px] transition-transform shadow-sm ${
                    policies.policy_pii ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Prompt Injection */}
            <div className="flex items-start justify-between gap-4 group">
              <div>
                <h4 className="text-[13px] font-medium text-zinc-200 flex items-center gap-2 mb-1.5 group-hover:text-white transition-colors">
                  <AlertCircle className="w-4 h-4 text-red-400" /> Prompt
                  Injection Firewall
                </h4>
                <p className="text-[11px] font-mono text-zinc-500 leading-relaxed max-w-[220px]">
                  Blocks adversarial inputs attempting to override agent
                  prompts.
                </p>
              </div>
              <button
                onClick={() => togglePolicy("policy_injection")}
                className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 cursor-pointer outline-none border ${
                  policies.policy_injection
                    ? "bg-blue-600 border-blue-500"
                    : "bg-zinc-800 border-zinc-700"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-[3px] transition-transform shadow-sm ${
                    policies.policy_injection
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Hallucination Guard */}
            <div className="flex items-start justify-between gap-4 group">
              <div>
                <h4 className="text-[13px] font-medium text-zinc-200 flex items-center gap-2 mb-1.5 group-hover:text-white transition-colors">
                  <Activity className="w-4 h-4 text-emerald-400" />{" "}
                  Hallucination Guard
                </h4>
                <p className="text-[11px] font-mono text-zinc-500 leading-relaxed max-w-[220px]">
                  Flags & halts responses if semantic confidence score drops
                  below 85%.
                </p>
              </div>
              <button
                onClick={() => togglePolicy("policy_hallucination")}
                className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 cursor-pointer outline-none border ${
                  policies.policy_hallucination
                    ? "bg-blue-600 border-blue-500"
                    : "bg-zinc-800 border-zinc-700"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-[3px] transition-transform shadow-sm ${
                    policies.policy_hallucination
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Anomaly Rate Limiting */}
            <div className="flex items-start justify-between gap-4 group">
              <div>
                <h4 className="text-[13px] font-medium text-zinc-200 flex items-center gap-2 mb-1.5 group-hover:text-white transition-colors">
                  <Clock className="w-4 h-4 text-amber-400" /> Anomaly Rate
                  Limiting
                </h4>
                <p className="text-[11px] font-mono text-zinc-500 leading-relaxed max-w-[220px]">
                  Halts agents making abnormal tool request bursts
                  automatically.
                </p>
              </div>
              <button
                onClick={() => togglePolicy("policy_anomaly")}
                className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 cursor-pointer outline-none border ${
                  policies.policy_anomaly
                    ? "bg-blue-600 border-blue-500"
                    : "bg-zinc-800 border-zinc-700"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-[3px] transition-transform shadow-sm ${
                    policies.policy_anomaly ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* LOG TABLOSU VE İŞLEMLER */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search incident ID, agent or threat type..."
                className="w-full bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 font-mono transition-all shadow-inner"
              />
            </div>
            <button className="flex items-center justify-center gap-2 bg-zinc-900/80 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 px-6 py-3.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-widest text-zinc-300 transition-colors cursor-pointer outline-none shadow-sm">
              <Filter className="w-3.5 h-3.5" /> Filter Logs
            </button>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-[2rem] overflow-hidden shadow-2xl min-h-[400px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-zinc-500 gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <p className="text-[11px] font-mono font-semibold uppercase tracking-widest">
                  Fetching security telemetry...
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-12 gap-4 px-8 py-5 bg-zinc-950/60 border-b border-zinc-800/80 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                  <div className="col-span-3">Incident ID</div>
                  <div className="col-span-5">Threat Vector & Node</div>
                  <div className="col-span-2">Severity</div>
                  <div className="col-span-2 text-right">Status</div>
                </div>

                <div className="divide-y divide-zinc-800/60">
                  <AnimatePresence>
                    {filteredIncidents.length > 0 ? (
                      filteredIncidents.map((inc) => (
                        <motion.div
                          layout
                          initial={{ opacity: 0, backgroundColor: "#18181b" }}
                          animate={{
                            opacity: 1,
                            backgroundColor: "transparent",
                          }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          key={inc.id}
                          className="flex flex-col group"
                        >
                          <div
                            onClick={() =>
                              setExpandedId(
                                expandedId === inc.id ? null : inc.id,
                              )
                            }
                            className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-zinc-800/30 transition-colors cursor-pointer"
                          >
                            <div className="col-span-3">
                              <p className="text-[12px] font-mono text-zinc-300">
                                {inc.id}
                              </p>
                            </div>
                            <div className="col-span-5">
                              <p className="text-[13px] font-medium text-white tracking-wide truncate">
                                {inc.threat_type}
                              </p>
                              <p className="text-[10px] font-mono text-zinc-500 mt-1 uppercase tracking-widest truncate">
                                Node: {inc.agent_name || "System Gateway"}
                              </p>
                            </div>
                            <div className="col-span-2">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[9px] font-mono font-bold uppercase tracking-widest ${
                                  inc.severity === "CRITICAL"
                                    ? "bg-red-500/10 text-red-400 border-red-500/20"
                                    : inc.severity === "HIGH"
                                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                      : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                }`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${inc.severity === "CRITICAL" ? "bg-red-400 shadow-[0_0_8px_#f87171] animate-pulse" : inc.severity === "HIGH" ? "bg-amber-400" : "bg-blue-400"}`}
                                />
                                {inc.severity}
                              </span>
                            </div>
                            <div className="col-span-2 flex items-center justify-end gap-3">
                              <span className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-widest">
                                {inc.status}
                              </span>
                              {expandedId === inc.id ? (
                                <ChevronUp className="w-4 h-4 text-zinc-500" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-zinc-500" />
                              )}
                            </div>
                          </div>

                          <AnimatePresence>
                            {expandedId === inc.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-zinc-950/50 border-t border-zinc-800/50"
                              >
                                <div className="p-8 flex flex-col gap-4">
                                  <p className="text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                    <Terminal className="w-3.5 h-3.5" /> Threat
                                    Payload & Interception Details
                                  </p>
                                  <div className="bg-zinc-950 border border-red-500/20 rounded-xl p-5 text-red-400 font-mono text-[12px] leading-relaxed shadow-inner overflow-x-auto whitespace-pre-wrap">
                                    {inc.payload}
                                  </div>
                                  <div className="flex justify-end gap-4 mt-3">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDismiss(inc.id);
                                      }}
                                      className="px-5 py-2.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-widest text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 transition-colors cursor-pointer outline-none"
                                    >
                                      Dismiss Log
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(
                                          `/dashboard/live-monitor?agentId=${encodeURIComponent(
                                            inc.agent_name ||
                                              "ag_enterprise_prod_09",
                                          )}`,
                                        );
                                      }}
                                      className="px-6 py-2.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-lg cursor-pointer flex items-center gap-2 outline-none"
                                    >
                                      <Zap className="w-3.5 h-3.5" /> Review
                                      Stream
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))
                    ) : (
                      <div className="px-8 py-16 text-center flex flex-col items-center justify-center gap-4 text-zinc-500 min-h-[300px]">
                        <ShieldCheck className="w-10 h-10 text-emerald-500/50" />
                        <div>
                          <p className="text-[13px] font-medium text-zinc-300">
                            No incident logs found.
                          </p>
                          <p className="text-[11px] font-mono uppercase tracking-widest mt-1">
                            Environment is fully secured.
                          </p>
                        </div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
