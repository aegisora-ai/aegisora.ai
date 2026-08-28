"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, Trash2, Search, CheckCircle2, AlertCircle, Activity } from "lucide-react";
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

export default function AtRiskAgentsPage() {
  const supabase = createClient();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAgents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from("agents").select("*").order("id", { ascending: false });
      if (error) throw error;
      if (data) setAgents(data);
    } catch (err) {
      console.error("Error fetching agents:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      void fetchAgents();
    });

    window.addEventListener('refresh-agents', fetchAgents);

    return () => {
      window.removeEventListener('refresh-agents', fetchAgents);
    };
  }, [supabase]);

  const handleDeleteAgent = async (id: string) => {
    try {
      const { error } = await supabase.from("agents").delete().eq("id", id);
      if (error) throw error;
      setAgents((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Error deleting agent:", err);
    }
  };

  const filteredAgents = agents.filter(a => {
    const matches = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.role.toLowerCase().includes(searchQuery.toLowerCase()); return matches && a.risk_score > 10;
  });

  return (
    <div className="flex flex-col animate-in fade-in duration-300">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text" placeholder="Search at-risk agents..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111113] border b order-border hover:b order-sidebar-ring rounded-lg pl-9 pr-4 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:b order-primary transition-all shado w-sm"
          />
        </div>
        <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest hidden sm:block">
          Listed: <strong className="text-foreground">{filteredAgents.length}</strong>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[30vh] text-[13px] text-muted-foreground animate-pulse">Loading fleet telemetry...</div>
      ) : filteredAgents.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh] text-center bg-[#111113] border b order-border b order-dashed rounded-xl p-8">
          <Cpu className="w-10 h-10 text-muted-foreground mb-4" strokeWidth={1} />
          <h3 className="text-[15px] font-bold text-foreground mb-1">No Agents Found</h3>
          <p className="text-[13px] text-muted-foreground">Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredAgents.map((agent) => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={agent.id} className="bg-[#111113] border b order-border hover:b order-sidebar-ring rounded-xl p-5 flex flex-col justify-between shado w-sm group transition-colors">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border b order-primary/20 flex items-center justify-center text-primary">
                      <Cpu className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold text-foreground tracking-tight">{agent.name}</h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{agent.role}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteAgent(agent.id)} className="opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground hover:text-red-400 hover:bg-red-400/10 rounded-md transition-all cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 my-4 p-3 bg-[#09090b] rounded-lg border b order-border/50 text-[11px]">
                  <div>
                    <span className="text-muted-foreground block font-mono text-[9px] uppercase tracking-widest mb-1">Model</span>
                    <strong className="text-foreground truncate block font-medium">{agent.model}</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block font-mono text-[9px] uppercase tracking-widest mb-1">Risk Score</span>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${agent.risk_score > 10 ? 'bg-decision-block' : 'bg-decision-allow'}`} />
                      <strong className={`font-medium ${agent.risk_score > 10 ? 'text-decision-block' : 'text-decision-allow'}`}>{agent.risk_score} / 100</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 b order-t b order-border/50">
                <div className="flex items-center gap-1.5 bg-[#18181b] border b order-border px-2 py-1 rounded-md">
                  {agent.status === 'active' ? <CheckCircle2 className="w-3 h-3 text-decision-allow" /> : <AlertCircle className="w-3 h-3 text-decision-escalate" />}
                  <span className="text-[11px] font-medium text-foreground capitalize">{agent.status}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Activity className="w-3.5 h-3.5" />
                  <span className="font-mono">{agent.total_requests.toLocaleString()} reqs</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
