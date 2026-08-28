"use client";

import { useState } from "react";
import { Search, Filter, Cpu, CheckCircle2, AlertCircle, ChevronRight, Boxes } from "lucide-react";

const mockModels = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", type: "LLM (Multimodal)", context: "128K", status: "Active" },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", type: "LLM", context: "200K", status: "Active" },
  { id: "llama-3.3-70b", name: "Llama 3.3 (70B)", provider: "Meta / Local", type: "LLM", context: "8K", status: "Active" },
  { id: "mistral-large-2407", name: "Mistral Large", provider: "Mistral AI", type: "LLM", context: "128K", status: "Degraded" },
  { id: "text-embedding-3-large", name: "Text Embedding 3 Large", provider: "OpenAI", type: "Embeddings", context: "8K", status: "Active" },
  { id: "aegisora-guardrail-v1", name: "Aegisora Guardrail", provider: "Internal", type: "Classifier", context: "4K", status: "Active" },
];

export default function RegistryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredModels = mockModels.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col animate-in fade-in duration-300">

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111113] border b order-border hover:b order-sidebar-ring rounded-lg pl-9 pr-4 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:b order-primary transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 bg-[#111113] border b order-border hover:bg-[#18181b] px-3 py-2 rounded-lg text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors outline-none w-full sm:w-auto justify-center cursor-pointer">
          <Filter className="w-3.5 h-3.5" /> Filter by Provider
        </button>
      </div>

      {/* DATA TABLE */}
      <div className="bg-[#111113] border b order-border rounded-xl overflo w-hidden shado w-sm">
        <div className="overflo w-x-auto cf-scrollbar">
          <table className="w-full text-left b order-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#18181b] b order-b b order-border/50">
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Model Name</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Provider</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Context Window</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-right"></th>
              </tr>
            </thead>
            <tbody>
              {filteredModels.map((model) => (
                <tr key={model.id} className="b order-b b order-border/40 hover:bg-[#18181b]/80 transition-colors cursor-pointer group">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#09090b] border b order-border flex items-center justify-center">
                        <Boxes className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-medium text-foreground">{model.name}</span>
                        <span className="text-[11px] font-mono text-muted-foreground">{model.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[13px] text-muted-foreground">{model.provider}</td>
                  <td className="px-5 py-3 text-[12px] font-mono text-muted-foreground">{model.type}</td>
                  <td className="px-5 py-3 text-[12px] font-mono text-muted-foreground">{model.context}</td>
                  <td className="px-5 py-3">
                    {model.status === 'Active' ? (
                      <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border b order-emerald-500/20 px-2 py-0.5 rounded w-fit">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[11px] font-medium text-orange-400 bg-orange-500/10 border b order-orange-500/20 px-2 py-0.5 rounded w-fit">
                        <AlertCircle className="w-3 h-3" /> Degraded
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      Configure <ChevronRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
