"use client";

import type { LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, ShieldAlert, Lock, AlertCircle, Search, Activity,
  ChevronRight, Clock, Zap, Terminal, X, Shield, Bot, CheckCircle2, ShieldOff
} from "lucide-react";
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

const PolicySwitch = ({ label, active, onClick, icon: Icon }: { label: string, active: boolean, onClick: () => void, icon: LucideIcon }) => (
    <div className="flex items-center justify-between p-4 bg-[#111113] border border-border rounded-xl transition-colors hover:border-border/80">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${active ? 'bg-primary/10 text-primary' : 'bg-sidebar text-muted-foreground'} border border-border`}>
          <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
        </div>
        <span className="text-[13px] font-semibold text-foreground">{label}</span>
      </div>
      <button
        onClick={onClick}
        className={`w-9 h-5 rounded-full relative transition-colors duration-200 outline-none ${active ? 'bg-primary' : 'bg-zinc-700'}`}
      >
        <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-transform duration-200 ${active ? 'translate-x-[20px]' : 'translate-x-[4px]'}`} />
      </button>
    </div>
  );

  // Semantik Renk YardÃƒâ€Ã‚Â±mcÃƒâ€Ã‚Â±sÃƒâ€Ã‚Â±

export default function RiskCenterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [isLoading, setIsLoading] = useState(true);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  // expandedId yerine Cloudflare tarzÃƒâ€Ã‚Â± saÃƒâ€Ã…Â¸ drawer (panel) kullanÃƒâ€Ã‚Â±yoruz
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [policies, setPolicies] = useState({
    policy_pii: true,
    policy_injection: true,
    policy_hallucination: true,
    policy_anomaly: true,
  });

  // 1. GERÃƒÆ’Ã¢â‚¬Â¡EK VERÃƒâ€Ã‚Â°TABANINDAN INCIDENT VE POLÃƒâ€Ã‚Â°TÃƒâ€Ã‚Â°KALARI ÃƒÆ’Ã¢â‚¬Â¡EKME
  useEffect(() => {
    async function fetchRiskData() {
      try {
        setIsLoading(true);

        const { data: incData, error: incError } = await supabase
          .from("incidents")
          .select("*")
          .order("created_at", { ascending: false });

        if (incError) console.error("Error fetching incidents:", incError.message);
        else if (incData) setIncidents(incData);

        const { data: polData, error: polError } = await supabase
          .from("policy_rules")
          .select("policy_key, is_enabled");

        if (!polError && polData && polData.length > 0) {
          const polMap: Record<string, boolean> = {};
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

    // 2. REALTIME SUBSCRIPTION
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
            setSelectedIncident(prev => prev?.id === payload.old.id ? null : prev);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // 3. POLÃƒâ€Ã‚Â°TÃƒâ€Ã‚Â°KA DURUMUNU DEÃƒâ€Ã‚ÂÃƒâ€Ã‚Â°Ãƒâ€¦Ã‚ÂTÃƒâ€Ã‚Â°RME VE DB'YE KAYDETME
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

  // 4. INCIDENT'Ãƒâ€Ã‚Â° GÃƒâ€Ã‚Â°DERME / SÃƒâ€Ã‚Â°LME
  const handleDismiss = async (id: string) => {
    setIncidents((prev) => prev.filter((inc) => inc.id !== id));
    if (selectedIncident?.id === id) setSelectedIncident(null);

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
      (inc.agent_name && inc.agent_name.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  // Cloudflare TarzÃƒâ€Ã‚Â± Switch Componenti
  const getSeverityBadge = (severity: string) => {
    const s = severity?.toLowerCase() || 'low';
    if (s === 'high' || s === 'critical') return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-decision-block/10 text-decision-block border border-decision-block/20 uppercase tracking-wider">{severity}</span>;
    if (s === 'medium') return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-decision-escalate/10 text-decision-escalate border border-decision-escalate/20 uppercase tracking-wider">{severity}</span>;
    return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-decision-allow/10 text-decision-allow border border-decision-allow/20 uppercase tracking-wider">{severity}</span>;
  };

  return (
    <div className="min-h-[calc(100vh-48px)] bg-background text-foreground flex flex-col items-center pt-8 px-4 sm:px-8 w-full selection:bg-primary/30 pb-12">

      <div className="w-full max-w-6xl flex flex-col">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/40 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <ShieldAlert className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-[11px] font-mono uppercase tracking-widest font-semibold text-foreground">Protect & Connect</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Risk Center</h1>
            <p className="text-[13px] text-muted-foreground mt-2 max-w-xl">
              Zero-trust perimeter controls, active threat signatures, and runtime incident telemetry for all deployed agents.
            </p>
          </div>
        </div>

        {/* ACTIVE POLICIES (WAF Style) */}
        <div className="mb-10">
          <h2 className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold mb-4">Active Runtime Policies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <PolicySwitch label="PII Data Leakage" icon={Lock} active={policies.policy_pii} onClick={() => togglePolicy("policy_pii")} />
            <PolicySwitch label="Prompt Injection" icon={Terminal} active={policies.policy_injection} onClick={() => togglePolicy("policy_injection")} />
            <PolicySwitch label="Hallucination Guard" icon={Zap} active={policies.policy_hallucination} onClick={() => togglePolicy("policy_hallucination")} />
            <PolicySwitch label="Anomaly Limiter" icon={Activity} active={policies.policy_anomaly} onClick={() => togglePolicy("policy_anomaly")} />
          </div>
        </div>

        {/* INCIDENT TELEMETRY TABLE */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">Incident Telemetry</h2>
            <div className="flex items-center bg-[#111113] border border-border rounded-lg px-3 py-1.5 w-64 focus-within:border-primary transition-colors">
              <Search className="w-3.5 h-3.5 text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder="Filter by Agent or Threat..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-[12px] text-foreground w-full placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="bg-[#111113] border border-border rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50 bg-[#18181b]">
                  <th className="px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Timestamp / ID</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Agent</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Threat Signature</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Severity</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-[13px] text-muted-foreground animate-pulse">Scanning live telemetry...</td>
                  </tr>
                ) : filteredIncidents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center">
                      <ShieldCheck className="w-8 h-8 text-decision-allow mx-auto mb-3 opacity-50" strokeWidth={1} />
                      <p className="text-[13px] font-medium text-foreground">No incidents detected</p>
                      <p className="text-[12px] text-muted-foreground mt-1">Runtime environment is secure.</p>
                    </td>
                  </tr>
                ) : (
                  filteredIncidents.map((inc) => (
                    <tr
                      key={inc.id}
                      onClick={() => setSelectedIncident(inc)}
                      className="border-b border-border/40 hover:bg-[#18181b]/80 transition-colors cursor-pointer group"
                    >
                      <td className="px-4 py-3">
                        <div className="text-[12px] text-foreground font-medium">{inc.created_at ? new Date(inc.created_at).toLocaleTimeString() : 'Just now'}</div>
                        <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{inc.id.substring(0,8)}...</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Bot className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-[12px] text-foreground font-medium">{inc.agent_name || "Unknown"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[12px] text-muted-foreground">{inc.threat_type}</td>
                      <td className="px-4 py-3">{getSeverityBadge(inc.severity)}</td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                          Inspect <ChevronRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AEGISORA SIGNATURE COMPONENT: DECISION INSPECTOR (DRAWER) */}
      <AnimatePresence>
        {selectedIncident && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100]"
              onClick={() => setSelectedIncident(null)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full sm:w-[480px] bg-[#09090b] border-l border-border z-[110] flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between bg-[#111113]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-decision-block/10 border border-decision-block/20 flex items-center justify-center text-decision-block">
                    <ShieldOff className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-foreground">Decision Trace</h3>
                    <p className="text-[11px] font-mono text-muted-foreground">{selectedIncident.id}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedIncident(null)} className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-sidebar-accent transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Body (Scrollable) */}
              <div className="flex-1 overflow-y-auto cf-scrollbar p-6">

                <h4 className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold mb-6">Runtime Execution Path</h4>

                {/* THE DECISION TRACE COMPONENT */}
                <div className="flex flex-col relative mb-10">
                  {/* Vertical Line */}
                  <div className="absolute left-[15px] top-4 bottom-8 w-[1px] bg-border" />

                  {/* Step 1: Agent Request */}
                  <div className="flex gap-4 relative z-10 py-3">
                    <div className="w-8 h-8 rounded-full bg-[#18181b] flex items-center justify-center border border-border">
                      <Bot className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 pt-1.5">
                      <p className="text-[13px] text-foreground font-bold leading-none">{selectedIncident.agent_name || "Unknown Agent"}</p>
                      <p className="text-[12px] text-muted-foreground mt-1">Initiated runtime execution request</p>
                    </div>
                  </div>

                  {/* Step 2: Policy Match */}
                  <div className="flex gap-4 relative z-10 py-3">
                    <div className="w-8 h-8 rounded-full bg-sidebar flex items-center justify-center border border-border">
                      <ShieldAlert className="w-4 h-4 text-decision-escalate" strokeWidth={2} />
                    </div>
                    <div className="flex-1 pt-1.5">
                      <p className="text-[13px] text-foreground font-bold leading-none">{selectedIncident.threat_type}</p>
                      <p className="text-[12px] text-muted-foreground mt-1">Matched against active runtime policy</p>
                    </div>
                  </div>

                  {/* Step 3: Enforcement Decision */}
                  <div className="flex gap-4 relative z-10 py-3">
                    <div className="w-8 h-8 rounded-full bg-decision-block/10 flex items-center justify-center border border-decision-block/20">
                      <X className="w-4 h-4 text-decision-block" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 pt-1.5">
                      <p className="text-[13px] text-decision-block font-bold leading-none">Execution Blocked</p>
                      <p className="text-[12px] text-muted-foreground mt-1">Provider execution successfully prevented.</p>
                    </div>
                  </div>
                </div>

                <h4 className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold mb-3">Payload Context</h4>
                <div className="bg-[#111113] border border-border rounded-lg p-4 font-mono text-[11px] text-muted-foreground overflow-x-auto">
                  <pre>{selectedIncident.payload || '{"status": "Payload not available"}'}</pre>
                </div>

              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-border/50 bg-[#111113] flex justify-between items-center">
                <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> {selectedIncident.created_at ? new Date(selectedIncident.created_at).toLocaleString() : 'Unknown time'}
                </span>
                <button
                  onClick={() => handleDismiss(selectedIncident.id)}
                  className="px-4 py-2 bg-sidebar border border-border hover:bg-zinc-800 text-[12px] font-medium text-foreground rounded-lg transition-colors shadow-sm"
                >
                  Dismiss Alert
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
