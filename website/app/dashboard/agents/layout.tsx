"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Plus, X, ChevronDown } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const AVAILABLE_MODELS = [
  "llama-3.3-70b",
  "gpt-4o",
  "claude-3-5-sonnet",
  "mistral-large",
];

export default function AgentsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // URL'den son kısmı alıp aktif sekmeyi belirliyoruz
  const activeTab = pathname.split("/").pop() || "all-agents";

  const supabase = createClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newModel, setNewModel] = useState("llama-3.3-70b");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      // Global event fırlatarak child sayfaların veriyi yenilemesini sağlıyoruz
      window.dispatchEvent(new Event('refresh-agents'));

    } catch (err: unknown) {
      console.error("Error creating agent:", err);
      const message = err instanceof Error ? err.message : String(err);
      alert("Failed to register agent: " + message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[calc(100vh-48px)] flex flex-col pt-8 sm:pt-10 px-4 sm:px-8 w-full relative justify-between bg-background text-foreground overflow-y-auto cf-scrollbar">
      <div className="w-full max-w-7xl mx-auto flex flex-col flex-1 relative z-10 pb-12">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <Cpu className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-[11px] font-mono uppercase tracking-widest font-semibold text-foreground">Build</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Agent Identities & Fleet</h1>
            <p className="text-[13px] text-muted-foreground mt-2 max-w-2xl">
              Monitor, deploy, and enforce zero-trust boundaries across your AI agent cluster.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg text-[13px] font-medium text-primary-foreground transition-colors outline-none cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" /> Register Agent
            </button>
          </div>
        </div>

        {/* CLOUDFLARE TABS */}
        <div className="flex items-center gap-6 border-b border-border/50 mb-6">
          <Link
            href="/dashboard/agents/all-agents"
            className={`pb-3 text-[13px] font-medium transition-colors relative outline-none cursor-pointer ${activeTab === 'all-agents' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            All Agents
            {activeTab === 'all-agents' && <motion.div layoutId="agents-tab" className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary" />}
          </Link>
          <Link
            href="/dashboard/agents/active"
            className={`pb-3 text-[13px] font-medium transition-colors relative outline-none cursor-pointer ${activeTab === 'active' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Active
            {activeTab === 'active' && <motion.div layoutId="agents-tab" className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary" />}
          </Link>
          <Link
            href="/dashboard/agents/at-risk"
            className={`pb-3 text-[13px] font-medium transition-colors relative outline-none cursor-pointer ${activeTab === 'at-risk' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            At Risk
            {activeTab === 'at-risk' && <motion.div layoutId="agents-tab" className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary" />}
          </Link>
        </div>

        {/* RENDERED CHILD PAGES */}
        {children}

        {/* REGISTER AGENT MODAL (Global for all tabs) */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={e => e.stopPropagation()}
                className="bg-[#18181b] border border-border rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6"
              >
                <div className="flex items-center justify-between border-b border-border/50 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-foreground">Register AI Agent</h3>
                      <p className="text-[11px] text-muted-foreground">Deploy zero-trust perimeter guard</p>
                    </div>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-[#27272a] rounded-md transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleCreateAgent} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-medium text-foreground">Agent Name</label>
                    <input
                      type="text" required placeholder="e.g. Legal Analyzer Bot"
                      value={newName} onChange={(e) => setNewName(e.target.value)}
                      className="w-full bg-[#111113] border border-zinc-700 rounded-lg px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-medium text-foreground">Operational Role</label>
                    <input
                      type="text" required placeholder="e.g. Contract review & compliance"
                      value={newRole} onChange={(e) => setNewRole(e.target.value)}
                      className="w-full bg-[#111113] border border-zinc-700 rounded-lg px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-medium text-foreground">Underlying Model</label>
                    <div className="relative">
                      <select
                        value={newModel} onChange={(e) => setNewModel(e.target.value)}
                        className="w-full bg-[#111113] border border-zinc-700 rounded-lg px-3 py-2 text-[13px] text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                      >
                        {AVAILABLE_MODELS.map((model) => (
                          <option key={model} value={model}>{model}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  <div className="pt-4 flex items-center justify-end gap-3 border-t border-border/50">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-transparent hover:bg-[#27272a] text-foreground rounded-lg text-[13px] font-medium transition-colors">
                      Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-[13px] font-medium transition-colors disabled:opacity-50">
                      {isSubmitting ? "Deploying..." : "Deploy Agent"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
