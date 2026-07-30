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

        // 1. Incidents Tablosundan Gerçek Verileri Çek
        const { data: incData, error: incError } = await supabase
          .from("incidents")
          .select("*")
          .order("created_at", { ascending: false });

        if (incError) {
          console.error("Error fetching incidents:", incError.message);
        } else if (incData) {
          setIncidents(incData);
        }

        // 2. Policy Rules Tablosundan Şalter Durumlarını Çek
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

    // ⚡ REALTIME SUBSCRIPTION (Canlı Senkronizasyon)
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
    <div className="p-6 sm:p-10 max-w-[1600px] mx-auto w-full flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-2xl font-serif text-white tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-red-500" /> Risk & Compliance
            Center
          </h1>
          <p className="text-xs font-mono text-gray-400 mt-1">
            Production-grade PostgreSQL zero-trust security policies and threat
            monitoring.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/ai-chat"
            className="flex items-center gap-2 bg-[#0066EE]/10 hover:bg-[#0066EE]/20 border border-[#0066EE]/30 px-4 py-2 rounded-xl text-xs font-mono text-blue-400 transition-all shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-[#0066EE]" />
            <span>Analyze Incidents with AI</span>
          </Link>
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-emerald-400 text-xs font-mono shadow-sm">
            <ShieldCheck className="w-4 h-4" /> All Security Protocols Active &
            Enforcing
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* ŞALTERLER */}
        <div className="xl:col-span-4 bg-[#121215] border border-gray-800/80 rounded-2xl p-6 shadow-xl h-fit relative">
          <h3 className="text-sm font-medium text-white flex items-center gap-2 mb-6">
            <Lock className="w-4 h-4 text-[#0066EE]" /> Active Security Policies
            (DB)
          </h3>

          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-[13px] font-medium text-gray-200 flex items-center gap-1.5 mb-1">
                  <EyeOff className="w-3.5 h-3.5 text-gray-400" /> PII Data
                  Masking
                </h4>
                <p className="text-[11px] font-mono text-gray-500 leading-relaxed">
                  Automatically redacts SSN, credit cards, and emails.
                </p>
              </div>
              <button
                onClick={() => togglePolicy("policy_pii")}
                className={`w-10 h-5 rounded-full relative transition-colors flex-shrink-0 cursor-pointer ${
                  policies.policy_pii ? "bg-[#0066EE]" : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                    policies.policy_pii ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-[13px] font-medium text-gray-200 flex items-center gap-1.5 mb-1">
                  <AlertCircle className="w-3.5 h-3.5 text-gray-400" /> Prompt
                  Injection Firewall
                </h4>
                <p className="text-[11px] font-mono text-gray-500 leading-relaxed">
                  Blocks adversarial inputs attempting to override prompts.
                </p>
              </div>
              <button
                onClick={() => togglePolicy("policy_injection")}
                className={`w-10 h-5 rounded-full relative transition-colors flex-shrink-0 cursor-pointer ${
                  policies.policy_injection ? "bg-[#0066EE]" : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                    policies.policy_injection
                      ? "translate-x-5"
                      : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-[13px] font-medium text-gray-200 flex items-center gap-1.5 mb-1">
                  <Activity className="w-3.5 h-3.5 text-gray-400" />{" "}
                  Hallucination Guard
                </h4>
                <p className="text-[11px] font-mono text-gray-500 leading-relaxed">
                  Flags responses if confidence score drops below 85%.
                </p>
              </div>
              <button
                onClick={() => togglePolicy("policy_hallucination")}
                className={`w-10 h-5 rounded-full relative transition-colors flex-shrink-0 cursor-pointer ${
                  policies.policy_hallucination ? "bg-[#0066EE]" : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                    policies.policy_hallucination
                      ? "translate-x-5"
                      : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-[13px] font-medium text-gray-200 flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" /> Anomaly Rate
                  Limiting
                </h4>
                <p className="text-[11px] font-mono text-gray-500 leading-relaxed">
                  Halts agents making abnormal tool request bursts.
                </p>
              </div>
              <button
                onClick={() => togglePolicy("policy_anomaly")}
                className={`w-10 h-5 rounded-full relative transition-colors flex-shrink-0 cursor-pointer ${
                  policies.policy_anomaly ? "bg-[#0066EE]" : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                    policies.policy_anomaly
                      ? "translate-x-5"
                      : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* LOG TABLOSU VE İŞLEMLER */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search incident ID, agent or threat type..."
                className="w-full bg-[#121215] border border-gray-800 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#0066EE]/50 font-mono transition-colors"
              />
            </div>
            <button className="flex items-center justify-center gap-2 bg-[#121215] border border-gray-800 hover:bg-gray-800/50 px-5 py-3 rounded-xl text-xs font-medium text-gray-300 transition-colors cursor-pointer">
              <Filter className="w-4 h-4" /> Filter Logs
            </button>
          </div>

          <div className="bg-[#121215] border border-gray-800/80 rounded-2xl overflow-hidden shadow-xl min-h-[300px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-500">
                <Loader2 className="w-8 h-8 animate-spin text-[#0066EE] mb-3" />
                <p className="text-xs font-mono">
                  Fetching security telemetry from DB...
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#19191d]/50 border-b border-gray-800 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                  <div className="col-span-3">Incident ID</div>
                  <div className="col-span-5">Threat Type & Agent</div>
                  <div className="col-span-2">Severity</div>
                  <div className="col-span-2 text-right">Status</div>
                </div>

                <div className="divide-y divide-gray-800">
                  <AnimatePresence>
                    {filteredIncidents.length > 0 ? (
                      filteredIncidents.map((inc) => (
                        <motion.div
                          layout
                          initial={{ opacity: 0, backgroundColor: "#3b0707" }}
                          animate={{ opacity: 1, backgroundColor: "#0a0a0c" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.5 }}
                          key={inc.id}
                          className="flex flex-col bg-[#0a0a0c]"
                        >
                          <div
                            onClick={() =>
                              setExpandedId(
                                expandedId === inc.id ? null : inc.id,
                              )
                            }
                            className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#19191d]/40 transition-colors cursor-pointer"
                          >
                            <div className="col-span-3">
                              <p className="text-[13px] font-medium text-gray-200">
                                {inc.id}
                              </p>
                            </div>
                            <div className="col-span-5">
                              <p className="text-[13px] font-medium text-gray-200">
                                {inc.threat_type}
                              </p>
                              <p className="text-[11px] font-mono text-gray-500 mt-0.5">
                                {inc.agent_name || "Aegisora Gateway"}
                              </p>
                            </div>
                            <div className="col-span-2">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-[10px] font-mono uppercase tracking-wider ${
                                  inc.severity === "CRITICAL"
                                    ? "bg-red-500/10 text-red-500 border-red-500/20"
                                    : inc.severity === "HIGH"
                                      ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                      : "bg-[#0066EE]/10 text-[#0066EE] border-[#0066EE]/20"
                                }`}
                              >
                                {inc.severity}
                              </span>
                            </div>
                            <div className="col-span-2 flex items-center justify-end gap-3">
                              <span className="text-[12px] font-medium text-gray-300">
                                {inc.status}
                              </span>
                              {expandedId === inc.id ? (
                                <ChevronUp className="w-4 h-4 text-gray-500" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                              )}
                            </div>
                          </div>

                          <AnimatePresence>
                            {expandedId === inc.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-[#121215]/50 border-t border-gray-800/50"
                              >
                                <div className="p-6 flex flex-col gap-4">
                                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                                    Threat Payload Details & Proxy Interception
                                  </p>
                                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 text-red-400 font-mono text-xs leading-relaxed">
                                    {inc.payload}
                                  </div>
                                  <div className="flex justify-end gap-3 mt-2">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDismiss(inc.id);
                                      }}
                                      className="px-4 py-2 rounded-xl text-xs font-medium text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 transition-colors cursor-pointer"
                                    >
                                      Dismiss Incident
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
                                      className="px-4 py-2 rounded-xl text-xs font-medium text-white bg-[#0066EE] hover:bg-[#005bb5] transition-colors shadow-lg cursor-pointer flex items-center gap-2"
                                    >
                                      <Zap className="w-3.5 h-3.5" /> Review
                                      Live Stream
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))
                    ) : (
                      <div className="px-6 py-12 text-center text-xs font-mono text-gray-500">
                        No incident logs found. Environment is secured.
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
