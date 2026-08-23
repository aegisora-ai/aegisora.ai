"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Plus,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Trash2,
  X,
  ChevronDown,
  Activity,
  Zap,
  Lock,
  Search,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface Agent {
  id: string;
  name: string;
  role: string;
  model: string;
  status: "active" | "flagged" | "quarantined";
  risk_score: number;
  total_requests: number;
}

const AVAILABLE_MODELS = [
  "llama-3.3-70b",
  "gpt-4o",
  "claude-3-5-sonnet",
  "mistral-large",
];

export default function AgentsPage() {
  const supabase = createClient();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Yeni Agent Form State'leri
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newModel, setNewModel] = useState("llama-3.3-70b");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAgents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;
      if (data) setAgents(data);
    } catch (err) {
      console.error("Error fetching agents:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, [supabase]);

  const handleCreateAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newRole.trim()) return;

    try {
      setIsSubmitting(true);
      const { error } = await supabase.from("agents").insert([
        {
          name: newName,
          role: newRole,
          model: newModel,
          status: "active",
          risk_score: Math.floor(Math.random() * 15) + 1,
          total_requests: 0,
        },
      ]);

      if (error) throw error;

      setIsModalOpen(false);
      setNewName("");
      setNewRole("");
      setNewModel("llama-3.3-70b");
      fetchAgents();
    } catch (err: unknown) {
      console.error("Error creating agent:", err);

      const message =
        err instanceof Error ? err.message : String(err);

      alert("Failed to register agent: " + message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAgent = async (id: string) => {
    try {
      const { error } = await supabase.from("agents").delete().eq("id", id);
      if (error) throw error;
      setAgents((prev) => prev.filter((a) => a.id !== id));
    } catch (err: unknown) {
      console.error("Error deleting agent:", err);
    }
  };

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.model.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="p-6 sm:p-10 max-w-[1600px] mx-auto w-full flex flex-col gap-8 font-sans relative selection:bg-blue-500/30 min-h-screen">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(0,102,238,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/80 pb-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-blue-400 bg-blue-950/40 border border-blue-800/30 px-3 py-1 rounded-full mb-4 inline-flex items-center gap-1.5 shadow-sm">
            <Cpu className="w-3 h-3" />
            Fleet Governance
          </span>
          <h1 className="text-3xl font-serif text-white tracking-tight mt-1">
            Agent Identities & Fleet
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-2">
            Monitor, deploy, and enforce zero-trust boundaries across your AI
            agent cluster.
          </p>
        </motion.div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-xl text-xs font-medium text-white transition-all shadow-[0_4px_15px_rgba(0,102,238,0.2)] hover:shadow-[0_6px_20px_rgba(0,102,238,0.3)] cursor-pointer outline-none"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Register Agent</span>
          </button>
        </div>
      </div>

      {/* SEARCH & FILTER BAR */}
      <div className="flex items-center justify-between gap-4 relative z-10">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search agents by name, role, or model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
          />
        </div>
        <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest hidden sm:block">
          Total Fleet: <strong className="text-white">{agents.length}</strong>
        </div>
      </div>

      {/* AGENTS GRID */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[40vh] text-xs font-mono text-zinc-500 uppercase tracking-widest animate-pulse">
          Loading fleet telemetry...
        </div>
      ) : filteredAgents.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center bg-zinc-900/20 border border-zinc-800/80 rounded-[2rem] p-8">
          <Cpu className="w-10 h-10 text-zinc-600 mb-4 animate-pulse" />
          <h3 className="text-lg font-serif text-white mb-1">
            No Agents Found
          </h3>
          <p className="text-xs font-mono text-zinc-500 mb-6">
            Get started by registering your first enterprise AI agent.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-medium transition-all shadow-md cursor-pointer outline-none"
          >
            Register Agent
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {filteredAgents.map((agent) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={agent.id}
              className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-[2rem] p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-blue-500/40 transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(0,102,238,0.06)_0%,transparent_70%)] pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-inner">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-serif font-bold text-white tracking-tight">
                        {agent.name}
                      </h3>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">
                        {agent.role}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteAgent(agent.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-zinc-500 hover:text-red-400 transition-all cursor-pointer rounded-lg hover:bg-red-500/10 outline-none"
                    title="Decommission Agent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 my-4 p-3 bg-zinc-950/60 rounded-2xl border border-zinc-800/60 font-mono text-[11px]">
                  <div>
                    <span className="text-zinc-500 block uppercase text-[9px] tracking-widest">
                      Model
                    </span>
                    <strong className="text-zinc-200 truncate block mt-0.5">
                      {agent.model}
                    </strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block uppercase text-[9px] tracking-widest">
                      Risk Score
                    </span>
                    <strong
                      className={`block mt-0.5 ${agent.risk_score > 10 ? "text-red-400" : "text-emerald-400"}`}
                    >
                      {agent.risk_score} / 100
                    </strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80">
                <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {agent.status}
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  Reqs:{" "}
                  <strong className="text-zinc-300">
                    {agent.total_requests.toLocaleString()}
                  </strong>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 🚀 REGISTER AGENT MODAL */}
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
              className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-inner">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white tracking-tight">
                      Register AI Agent
                    </h3>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      Deploy zero-trust perimeter guard
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors cursor-pointer outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateAgent} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
                    Agent Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Legal Analyzer Bot"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
                    Operational Role
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Contract review & compliance"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
                    Underlying Model
                  </label>
                  <div className="relative">
                    <select
                      value={newModel}
                      onChange={(e) => setNewModel(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-blue-500/50 transition-all shadow-inner appearance-none cursor-pointer"
                    >
                      {AVAILABLE_MODELS.map((model) => (
                        <option
                          key={model}
                          value={model}
                          className="bg-zinc-900 text-white"
                        >
                          {model}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-1/2 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-1/2 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 outline-none disabled:opacity-50"
                  >
                    {isSubmitting ? "Deploying..." : "Deploy Agent"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
