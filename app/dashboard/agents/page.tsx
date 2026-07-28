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
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface Agent {
  id: string;
  workspace_id?: string;
  name: string;
  model: string;
  risk_level: string;
  total_requests: number;
  status: string;
  created_at: string;
}

export default function AgentsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);

  // Modal State'leri
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  // Kullanıcı Form Girdileri
  const [formData, setFormData] = useState({
    name: "",
    model: "gpt-4o-realtime",
    risk_level: "Low",
  });

  useEffect(() => {
    async function fetchAgents() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return setIsLoading(false);

        const { data: ws } = await supabase
          .from("workspaces")
          .select("id")
          .eq("owner_id", user.id)
          .single();

        if (ws) {
          setWorkspaceId(ws.id);
          const { data: agentsData } = await supabase
            .from("agents")
            .select("*")
            .eq("workspace_id", ws.id)
            .order("created_at", { ascending: false });

          if (agentsData) setAgents(agentsData);
        }
      } catch (error) {
        console.error("Error fetching agents:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAgents();
  }, [supabase]);

  // KULLANICI GİRDİSİ İLE GERÇEK KAYIT OLUŞTURMA
  const handleDeployAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !workspaceId) return;

    setIsDeploying(true);

    const newId = `AGT-${Math.floor(Math.random() * 9000) + 1000}`;
    const newAgent: Agent = {
      id: newId,
      workspace_id: workspaceId,
      name: formData.name,
      model: formData.model,
      risk_level: formData.risk_level,
      total_requests: 0,
      status:
        formData.risk_level === "High"
          ? "WARNING"
          : formData.risk_level === "Medium"
            ? "SECURED"
            : "ACTIVE",
      created_at: new Date().toISOString(),
    };

    // Ekranda anında göster (Optimistic UI)
    setAgents((prev) => [newAgent, ...prev]);
    setIsModalOpen(false); // Modalı Kapat
    setFormData({ name: "", model: "gpt-4o-realtime", risk_level: "Low" }); // Formu sıfırla
    setIsDeploying(false);

    // Veritabanına Yaz
    try {
      const { error } = await supabase.from("agents").insert([
        {
          id: newAgent.id,
          workspace_id: newAgent.workspace_id,
          name: newAgent.name,
          model: newAgent.model,
          risk_level: newAgent.risk_level,
          total_requests: newAgent.total_requests,
          status: newAgent.status,
        },
      ]);
      if (error) console.error("DB Insert Error:", error.message);
    } catch (err) {
      console.error("Failed to write to DB:", err);
    }
  };

  const handleDelete = async (agentId: string) => {
    setAgents((prev) => prev.filter((a) => a.id !== agentId));
    await supabase.from("agents").delete().eq("id", agentId);
  };

  // Ajana bağlanıp Live Monitor sayfasına yönlendirme
  const handleConnectStream = (agentId: string, agentName: string) => {
    router.push(
      `/dashboard/live-monitor?agentId=${agentId}&name=${encodeURIComponent(agentName)}`,
    );
  };

  return (
    <div className="p-6 sm:p-10 max-w-[1600px] mx-auto w-full flex flex-col gap-8 relative">
      {/* BAŞLIK VE BUTON */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-2xl font-serif text-white tracking-tight flex items-center gap-2">
            AI Agent Fleet
          </h1>
          <p className="text-xs font-mono text-gray-400 mt-1">
            Deploy, govern, and monitor autonomous AI agents under zero-trust
            rules.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#0066EE] hover:bg-[#005bb5] text-white px-5 py-2.5 rounded-xl text-xs font-medium transition-colors shadow-lg cursor-pointer min-w-[150px]"
        >
          <Plus className="w-4 h-4" /> Deploy New Agent
        </button>
      </div>

      {/* YÜKLENİYOR / BOŞ DURUM / LİSTE */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin text-[#0066EE] mb-4" />
          <p className="text-xs font-mono">Syncing with Aegisora Core...</p>
        </div>
      ) : agents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center min-h-[45vh] border border-dashed border-gray-800 rounded-3xl bg-[#121215]/30 p-8 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#0066EE]/10 border border-[#0066EE]/20 flex items-center justify-center mb-6">
            <Cpu className="w-8 h-8 text-[#0066EE]" />
          </div>
          <h2 className="text-xl font-serif text-white mb-2">
            No AI Agents Deployed
          </h2>
          <p className="text-xs font-mono text-gray-500 max-w-md leading-relaxed mb-8">
            Your enterprise fleet is currently empty. Deploy your first
            autonomous agent manually to begin monitoring.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-xl text-xs font-medium transition-colors shadow-sm cursor-pointer min-w-[180px] justify-center"
          >
            <Plus className="w-4 h-4" /> Initialize First Agent
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {agents.map((agent) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={agent.id}
                className="bg-[#121215] border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-col group relative"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0066EE]/10 border border-[#0066EE]/20 flex items-center justify-center text-[#0066EE]">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest rounded-full border ${agent.status === "SECURED" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : agent.status === "WARNING" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"}`}
                    >
                      {agent.status || "ACTIVE"}
                    </span>
                    <button
                      onClick={() => handleDelete(agent.id)}
                      className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-500/20 text-gray-500 hover:text-red-400 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-serif font-medium text-white mb-1 truncate">
                    {agent.name}
                  </h3>
                  <p className="text-[11px] font-mono text-gray-500 mb-6 truncate">
                    {agent.id} • {agent.model}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-gray-800/80 pt-5 pb-6">
                  <div>
                    <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-1">
                      Total Requests
                    </p>
                    <p className="text-lg font-semibold text-white">
                      {agent.total_requests?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-1">
                      Risk Level
                    </p>
                    <p
                      className={`text-[13px] font-medium flex items-center gap-1.5 mt-1.5 ${agent.risk_level === "High" ? "text-red-400" : agent.risk_level === "Medium" ? "text-amber-400" : "text-emerald-400"}`}
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
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-[11px] font-mono text-gray-500">
                    Active Since Deployment
                  </span>
                  <button
                    onClick={() => handleConnectStream(agent.id, agent.name)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-mono text-emerald-400 transition-colors cursor-pointer"
                  >
                    <Radio className="w-3.5 h-3.5 animate-pulse" /> Connect
                    Stream
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* DEPLOY MODAL (KULLANICI GİRDİSİ İÇİN) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121215] border border-gray-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif text-white">
                  Deploy New Agent
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleDeployAgent} className="space-y-5">
                <div>
                  <label className="block text-[11px] font-mono text-gray-400 mb-1.5 uppercase tracking-wider">
                    Agent Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Finance Bot v2"
                    className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-[#0066EE] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-gray-400 mb-1.5 uppercase tracking-wider">
                    LLM Model
                  </label>
                  <select
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                    className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-[#0066EE] outline-none transition-colors appearance-none"
                  >
                    <option value="gpt-4o-realtime">GPT-4o Realtime</option>
                    <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
                    <option value="llama-3.3-70b">Llama 3.3 70B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-gray-400 mb-1.5 uppercase tracking-wider">
                    Security Rules (Risk Level)
                  </label>
                  <select
                    value={formData.risk_level}
                    onChange={(e) =>
                      setFormData({ ...formData, risk_level: e.target.value })
                    }
                    className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-[#0066EE] outline-none transition-colors appearance-none"
                  >
                    <option value="Low">Low Risk (Strict Compliance)</option>
                    <option value="Medium">Medium Risk (Standard)</option>
                    <option value="High">
                      High Risk (Internal Tools Only)
                    </option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={isDeploying || !formData.name.trim()}
                  className="w-full bg-[#0066EE] hover:bg-[#005bb5] disabled:bg-[#0066EE]/50 text-white font-medium text-sm py-3.5 rounded-xl transition-colors mt-4 flex justify-center items-center gap-2 cursor-pointer"
                >
                  {isDeploying ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Deploy Agent"
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
