"use client";

import { useState } from "react";
import { Search, Filter, Server, Box, Activity, ChevronRight, CheckCircle2, Zap } from "lucide-react";

const mockIndexes = [
  { id: "idx-internal-wiki", name: "enterprise_wiki_prod", model: "text-embedding-3-large", vectors: "1.4M", dimension: 3072, status: "Active" },
  { id: "idx-support-logs", name: "customer_support_v2", model: "text-embedding-3-small", vectors: "8.2M", dimension: 1536, status: "Active" },
  { id: "idx-legal-docs", name: "legal_contracts_archive", model: "cohere-embed-english-v3.0", vectors: "450K", dimension: 1024, status: "Building" },
  { id: "idx-api-docs", name: "developer_api_docs", model: "text-embedding-3-small", vectors: "12K", dimension: 1536, status: "Active" },
];

export default function VectorDBPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIndexes = mockIndexes.filter(idx =>
    idx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    idx.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col animate-in fade-in duration-300">

      {/* SUMMARY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#111113] border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Active Indexes</span>
            <Server className="w-4 h-4 text-primary" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">12</div>
          <div className="text-[11px] text-muted-foreground">Vector namespaces</div>
        </div>
        <div className="bg-[#111113] border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Total Vectors</span>
            <Box className="w-4 h-4 text-emerald-500" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">42.8M</div>
          <div className="text-[11px] text-muted-foreground">Embeddings stored</div>
        </div>
        <div className="bg-[#111113] border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Avg Query Latency</span>
            <Zap className="w-4 h-4 text-orange-500" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">14ms</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">Highly optimal</div>
        </div>
        <div className="bg-[#111113] border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Search QPS</span>
            <Activity className="w-4 h-4 text-blue-500" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">840</div>
          <div className="text-[11px] text-muted-foreground">Queries per second</div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text" placeholder="Search vector indexes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111113] border border-border hover:border-sidebar-ring rounded-lg pl-9 pr-4 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 bg-[#111113] border border-border hover:bg-[#18181b] px-3 py-2 rounded-lg text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors outline-none w-full sm:w-auto justify-center cursor-pointer">
          <Filter className="w-3.5 h-3.5" /> Filter by Model
        </button>
      </div>

      {/* DATA TABLE */}
      <div className="bg-[#111113] border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto cf-scrollbar">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#18181b] border-b border-border/50">
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Index Name</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Embedding Model</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Vector Count</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Dimension</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-right"></th>
              </tr>
            </thead>
            <tbody>
              {filteredIndexes.map((idx) => (
                <tr key={idx.id} className="border-b border-border/40 hover:bg-[#18181b]/80 transition-colors cursor-pointer group">
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-medium text-foreground">{idx.name}</span>
                      <span className="text-[11px] font-mono text-muted-foreground mt-0.5">{idx.id}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-[11px] font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded">
                      {idx.model}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[12px] font-mono text-foreground">{idx.vectors}</td>
                  <td className="px-5 py-4 text-[12px] font-mono text-muted-foreground">{idx.dimension} d</td>
                  <td className="px-5 py-4">
                    {idx.status === 'Active' ? (
                      <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded w-fit">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[11px] font-medium text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded w-fit">
                        <Activity className="w-3 h-3 animate-pulse" /> Building
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      Query <ChevronRight className="w-3 h-3" />
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
