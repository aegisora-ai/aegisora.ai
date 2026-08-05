"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Plus,
  Trash2,
  Radio,
  Activity,
  ShieldCheck,
  AlertTriangle,
  Loader2,
  X,
  ChevronRight,
  Sliders,
  Network,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface Agent {
  id: string;
  organization_id?: string;
  workspace_id?: string;
  name: string;
  model: string;
  risk_level: string;
  total_requests: number;
  status: string;
  created_at: string;
}

export default function AgentsFleetPage() {
  const router = useRouter();
  const supabase = createClient();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    model: "gpt-4o-realtime",
    risk_level: "Low",
  });

  // 🚀 GERÇEK VERİTABANINDAN AJANLARI ÇEKME
  const fetchRealAgents = async () => {
    try {
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching agents:", error.message);
      } else if (data) {
        setAgents(data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRealAgents();

    // ⚡ REALTIME SUBSCRIPTION
    const channel = supabase
      .channel("agents-realtime-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "agents" },
        () => {
          fetchRealAgents();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // 📝 AJAN OLUŞTURMA
  const handleDeployAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || isDeploying) return;

    setIsDeploying(true);

    const newId = `AGT-${Math.floor(Math.random() * 9000) + 1000}`;
    const newAgent = {
      id: newId,
      name: formData.name.trim(),
      model: formData.model,
      risk_level: formData.risk_level,
      total_requests: 0,
      status:
        formData.risk_level === "High"
          ? "WARNING"
          : formData.risk_level === "Medium"
            ? "SECURED"
            : "ACTIVE",
    };

    try {
      const { error } = await supabase.from("agents").insert([newAgent]);
      if (error) {
        alert(`Failed to deploy agent: ${error.message}`);
      } else {
        setIsModalOpen(false);
        setFormData({ name: "", model: "gpt-4o-realtime", risk_level: "Low" });
        await fetchRealAgents();
      }
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsDeploying(false);
    }
  };

  // 🗑️ VERİTABANINDAN SİLME
  const handleDelete = async (agentId: string) => {
    if (deletingId) return;
    setDeletingId(agentId);

    try {
      setAgents((prev) => prev.filter((a) => a.id !== agentId));

      const { error } = await supabase
        .from("agents")
        .delete()
        .eq("id", agentId);
      if (error) {
        console.error("Delete error:", error.message);
        await fetchRealAgents();
      }
    } catch (err) {
      console.error("Failed to delete agent:", err);
      await fetchRealAgents();
    } finally {
      setDeletingId(null);
    }
  };

  const handleConnectStream = (agentId: string, agentName: string) => {
    router.push(
      `/dashboard/live-monitor?agentId=${agentId}&name=${encodeURIComponent(agentName)}`,
    );
  };

  return (
    <div className="p-6 sm:p-10 max-w-[1600px] mx-auto w-full flex flex-col gap-8 relative font-sans selection:bg-blue-500/30">
      {/* Üst Bilgi / Header Alanı */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-zinc-800/80 pb-6 relative z-10">
        <div>
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-blue-400 bg-blue-950/40 border border-blue-800/30 px-3 py-1 rounded-full mb-4 inline-flex items-center gap-1.5">
            <Network className="w-3 h-3" />
            Infrastructure
          </span>
          <h1 className="text-3xl font-serif text-white tracking-tight flex items-center gap-3">
            AI Agent Fleet
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-2">
            Production-grade autonomous AI governance connected to PostgreSQL.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl text-xs font-mono font-medium transition-all shadow-[0_4px_15px_rgba(0,102,238,0.2)] hover:shadow-[0_6px_20px_rgba(0,102,238,0.3)] cursor-pointer min-w-[160px] outline-none"
        >
          <Plus className="w-4 h-4" /> Deploy New Agent
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-zinc-500 space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-xs font-mono tracking-widest uppercase">
            Syncing Telemetry...
          </p>
        </div>
      ) : agents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center min-h-[50vh] border border-dashed border-zinc-800 rounded-[2.5rem] bg-zinc-900/20 backdrop-blur-sm p-12 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 shadow-inner">
            <Cpu className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-2xl font-serif text-white mb-3 tracking-tight">
            No Active Agents
          </h2>
          <p className="text-[13px] font-mono text-zinc-500 max-w-md leading-relaxed mb-8">
            Your enterprise fleet database is currently empty. Deploy your first
            autonomous agent to initialize the zero-trust perimeter and begin
            telemetry tracking.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-black px-8 py-3.5 rounded-xl text-xs font-bold transition-all shadow-lg cursor-pointer outline-none"
          >
            <Plus className="w-4 h-4" /> Initialize First Agent
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
          <AnimatePresence>
            {agents.map((agent) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={agent.id}
                className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 hover:border-zinc-700 rounded-[2rem] p-6 shadow-xl flex flex-col group relative transition-colors"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 group-hover:bg-blue-500/20 transition-all shadow-inner">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-widest rounded-full border flex items-center gap-1.5 ${
                        agent.status === "SECURED"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : agent.status === "WARNING"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${agent.status === "WARNING" ? "bg-amber-400 animate-pulse" : agent.status === "SECURED" ? "bg-emerald-400" : "bg-blue-400 animate-pulse"}`}
                      />
                      {agent.status || "ACTIVE"}
                    </span>
                    <button
                      onClick={() => handleDelete(agent.id)}
                      disabled={deletingId === agent.id}
                      className="w-8 h-8 rounded-full bg-zinc-800/50 hover:bg-red-500/20 border border-transparent hover:border-red-500/30 text-zinc-500 hover:text-red-400 flex items-center justify-center transition-all cursor-pointer disabled:opacity-50 outline-none"
                      title="Decommission Agent"
                    >
                      {deletingId === agent.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-red-400" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-medium text-white mb-1.5 tracking-tight truncate group-hover:text-blue-400 transition-colors">
                    {agent.name}
                  </h3>
                  <p className="text-[11px] font-mono text-zinc-500 mb-6 truncate uppercase tracking-wider">
                    {agent.id} <span className="mx-1 text-zinc-700">•</span>{" "}
                    {agent.model}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-zinc-800/60 pt-5 pb-6">
                  <div>
                    <p className="text-[9px] font-mono font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">
                      Total Requests
                    </p>
                    <p className="text-lg font-mono text-white">
                      {agent.total_requests?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-mono font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">
                      Risk Level
                    </p>
                    <p
                      className={`text-[12px] font-mono font-medium flex items-center gap-1.5 mt-1.5 ${
                        agent.risk_level === "High"
                          ? "text-red-400"
                          : agent.risk_level === "Medium"
                            ? "text-amber-400"
                            : "text-emerald-400"
                      }`}
                    >
                      {agent.risk_level === "High" && (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      )}
                      {agent.risk_level === "Medium" && (
                        <Activity className="w-3.5 h-3.5" />
                      )}
                      {agent.risk_level === "Low" && (
                        <ShieldCheck className="w-3.5 h-3.5" />
                      )}
                      {agent.risk_level || "Low"}
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-5 border-t border-zinc-800/60 flex items-center justify-between">
                  <button
                    onClick={() => router.push("/dashboard/risk-center")}
                    className="text-[10px] font-mono uppercase tracking-widest font-semibold text-zinc-500 hover:text-zinc-300 flex items-center gap-1.5 transition-colors cursor-pointer outline-none"
                  >
                    <Sliders className="w-3.5 h-3.5 text-blue-400" /> Perimeter
                    Rules
                  </button>

                  <button
                    onClick={() => handleConnectStream(agent.id, agent.name)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-[11px] font-mono uppercase tracking-widest font-semibold text-emerald-400 transition-colors cursor-pointer shadow-sm outline-none"
                  >
                    <Radio className="w-3 h-3 animate-pulse" /> Connect
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* DEPLOY MODAL (Enterprise Glassmorphism) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif text-white tracking-tight">
                  Deploy Node
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-zinc-800/50 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleDeployAgent} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-mono font-semibold text-zinc-400 mb-2 uppercase tracking-widest">
                    Agent Designation
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Finance Oracle v2"
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-[13px] font-mono text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all shadow-inner placeholder:text-zinc-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-semibold text-zinc-400 mb-2 uppercase tracking-widest">
                    LLM Engine
                  </label>
                  <div className="relative">
                    <select
                      value={formData.model}
                      onChange={(e) =>
                        setFormData({ ...formData, model: e.target.value })
                      }
                      className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-[13px] font-mono text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all appearance-none cursor-pointer shadow-inner"
                    >
                      <option value="gpt-4o-realtime">GPT-4o Realtime</option>
                      <option value="claude-3-5-sonnet">
                        Claude 3.5 Sonnet
                      </option>
                      <option value="llama-3.3-70b">Llama 3.3 70B</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-semibold text-zinc-400 mb-2 uppercase tracking-widest">
                    Perimeter Clearance (Risk)
                  </label>
                  <div className="relative">
                    <select
                      value={formData.risk_level}
                      onChange={(e) =>
                        setFormData({ ...formData, risk_level: e.target.value })
                      }
                      className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-[13px] font-mono text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all appearance-none cursor-pointer shadow-inner"
                    >
                      <option value="Low">Low Risk (Strict Compliance)</option>
                      <option value="Medium">Medium Risk (Standard)</option>
                      <option value="High">
                        High Risk (Internal Tools Only)
                      </option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isDeploying || !formData.name.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 disabled:text-blue-400/50 text-white font-mono font-semibold text-[13px] uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 mt-2 flex justify-center items-center gap-2 cursor-pointer outline-none"
                >
                  {isDeploying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Provisioning
                      Node...
                    </>
                  ) : (
                    "Deploy Autonomous Node"
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
