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
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function RiskCenterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [policies, setPolicies] = useState({
    policy_pii: true,
    policy_injection: true,
    policy_hallucination: false,
    policy_anomaly: true,
  });

  const [incidents, setIncidents] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // === DÜZELTİLEN YER BURASI ===
  useEffect(() => {
    let channel: any;

    async function fetchData() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const { data: ws } = await supabase
          .from("workspaces")
          .select("*")
          .eq("owner_id", user.id)
          .single();

        if (ws) {
          setWorkspaceId(ws.id);

          setPolicies({
            policy_pii: ws.policy_pii,
            policy_injection: ws.policy_injection,
            policy_hallucination: ws.policy_hallucination,
            policy_anomaly: ws.policy_anomaly,
          });

          // Mevcut verileri çek
          const { data: incData } = await supabase
            .from("incidents")
            .select("*")
            .eq("workspace_id", ws.id)
            .neq("status", "Dismissed")
            .order("created_at", { ascending: false });

          if (incData) setIncidents(incData);

          // ÇÖZÜM: Kanal ismini her yüklemede benzersiz yap (Strict Mode hatasını önler)
          const uniqueChannelName = `live-incidents-${Math.random()}`;

          channel = supabase
            .channel(uniqueChannelName)
            .on(
              "postgres_changes",
              { event: "INSERT", schema: "public", table: "incidents" },
              (payload) => {
                console.log("Aegisora Core: Live threat detected!", payload);
                // Yeni gelen saldırı logunu anında tabloya ekle
                setIncidents((currentIncidents) => [
                  payload.new,
                  ...currentIncidents,
                ]);
              },
            )
            .subscribe();
        }
      } catch (error) {
        console.error("Backend fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [supabase]);
  // ===================================

  const togglePolicy = async (dbColumn: keyof typeof policies) => {
    const newValue = !policies[dbColumn];
    setPolicies((prev) => ({ ...prev, [dbColumn]: newValue }));

    if (workspaceId) {
      await supabase
        .from("workspaces")
        .update({ [dbColumn]: newValue })
        .eq("id", workspaceId);
    }
  };

  const handleDismiss = async (id: string) => {
    setIncidents((prev) => prev.filter((inc) => inc.id !== id));
    if (expandedId === id) setExpandedId(null);
    await supabase
      .from("incidents")
      .update({ status: "Dismissed" })
      .eq("id", id);
  };

  const filteredIncidents = incidents.filter(
    (inc) =>
      inc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.threat_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.agent_name?.toLowerCase().includes(searchQuery.toLowerCase()),
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
            Configure zero-trust security policies and investigate flagged agent
            activities.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-emerald-400 text-xs font-mono shadow-sm">
          <ShieldCheck className="w-4 h-4" /> All Security Protocols Active
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* ŞALTERLER */}
        <div className="xl:col-span-4 bg-[#121215] border border-gray-800/80 rounded-2xl p-6 shadow-xl h-fit relative">
          <h3 className="text-sm font-medium text-white flex items-center gap-2 mb-6">
            <Lock className="w-4 h-4 text-[#0066EE]" /> Active Security Policies
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
                className={`w-10 h-5 rounded-full relative transition-colors flex-shrink-0 cursor-pointer ${policies.policy_pii ? "bg-[#0066EE]" : "bg-gray-600"}`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${policies.policy_pii ? "translate-x-5" : "translate-x-0.5"}`}
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
                className={`w-10 h-5 rounded-full relative transition-colors flex-shrink-0 cursor-pointer ${policies.policy_injection ? "bg-[#0066EE]" : "bg-gray-600"}`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${policies.policy_injection ? "translate-x-5" : "translate-x-0.5"}`}
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
                className={`w-10 h-5 rounded-full relative transition-colors flex-shrink-0 cursor-pointer ${policies.policy_hallucination ? "bg-[#0066EE]" : "bg-gray-600"}`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${policies.policy_hallucination ? "translate-x-5" : "translate-x-0.5"}`}
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
                  Halts agents making 500x normal API tool requests.
                </p>
              </div>
              <button
                onClick={() => togglePolicy("policy_anomaly")}
                className={`w-10 h-5 rounded-full relative transition-colors flex-shrink-0 cursor-pointer ${policies.policy_anomaly ? "bg-[#0066EE]" : "bg-gray-600"}`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${policies.policy_anomaly ? "translate-x-5" : "translate-x-0.5"}`}
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
              <div className="h-40 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-[#0066EE] animate-spin" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#19191d]/50 border-b border-gray-800 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                  <div className="col-span-3">Incident ID</div>
                  <div className="col-span-5">Threat Type</div>
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
                                {inc.agent_name}
                              </p>
                            </div>
                            <div className="col-span-2">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-[10px] font-mono uppercase tracking-wider ${inc.severity === "CRITICAL" ? "bg-red-500/10 text-red-500 border-red-500/20" : inc.severity === "HIGH" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-[#0066EE]/10 text-[#0066EE] border-[#0066EE]/20"}`}
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
                                    Threat Payload Details
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
                                      Dismiss
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        router.push("/dashboard/live-monitor");
                                      }}
                                      className="px-4 py-2 rounded-xl text-xs font-medium text-white bg-[#0066EE] hover:bg-[#005bb5] transition-colors shadow-lg cursor-pointer"
                                    >
                                      Review Agent Source
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))
                    ) : (
                      <div className="px-6 py-8 text-center text-xs font-mono text-gray-500">
                        No incident logs found. Your environment is secure.
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
