"use client";

import { useState } from "react";
import { Search, Filter, ShieldCheck, XCircle, AlertTriangle, FileKey, CheckCircle2, ChevronRight, Activity } from "lucide-react";

const mockPolicies = [
  { id: "POL-DATA-004", name: "PII & Financial Data Leakage", scope: "Global", enforcement: "Block", status: "Active", lastUpdated: "2 hours ago" },
  { id: "POL-API-012", name: "Unauthorized External API Calls", scope: "SupportBot, DataAnalyst", enforcement: "Escalate", status: "Active", lastUpdated: "1 day ago" },
  { id: "POL-SRC-001", name: "Source Code Repository Write", scope: "ResearchAgent", enforcement: "Block", status: "Active", lastUpdated: "3 days ago" },
  { id: "POL-RTE-009", name: "High Token Consumption Limits", scope: "Global", enforcement: "Escalate", status: "Active", lastUpdated: "5 days ago" },
  { id: "POL-NET-002", name: "Internal Network Subnet Access", scope: "Global", enforcement: "Allow", status: "Testing", lastUpdated: "1 week ago" },
];

export default function PolicyLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPolicies = mockPolicies.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col animate-in fade-in duration-300">

      {/* SUMMARY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#111113] border b order-border rounded-xl p-5 shado w-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Active Policies</span>
            <FileKey className="w-4 h-4 text-primary" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">42</div>
          <div className="text-[11px] text-muted-foreground">Enforcing across fleet</div>
        </div>
        <div className="bg-[#111113] border b order-border rounded-xl p-5 shado w-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Blocks (24h)</span>
            <XCircle className="w-4 h-4 text-decision-block" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">1,204</div>
          <div className="text-[11px] text-decision-block flex items-center gap-1">Threats prevented</div>
        </div>
        <div className="bg-[#111113] border b order-border rounded-xl p-5 shado w-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Test Coverage</span>
            <Beaker className="w-4 h-4 text-emerald-500" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">94%</div>
          <div className="text-[11px] text-emerald-400">Passing security tests</div>
        </div>
        <div className="bg-[#111113] border b order-border rounded-xl p-5 shado w-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Conflict Warnings</span>
            <AlertTriangle className="w-4 h-4 text-decision-escalate" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">0</div>
          <div className="text-[11px] text-muted-foreground">No rule overlaps</div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text" placeholder="Search policies by name or ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111113] border b order-border hover:b order-sidebar-ring rounded-lg pl-9 pr-4 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:b order-primary transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 bg-[#111113] border b order-border hover:bg-[#18181b] px-3 py-2 rounded-lg text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors outline-none w-full sm:w-auto justify-center cursor-pointer">
          <Filter className="w-3.5 h-3.5" /> Filter by Scope
        </button>
      </div>

      {/* DATA TABLE */}
      <div className="bg-[#111113] border b order-border rounded-xl overflo w-hidden shado w-sm">
        <div className="overflo w-x-auto cf-scrollbar">
          <table className="w-full text-left b order-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#18181b] b order-b b order-border/50">
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Policy Name & ID</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Scope</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Enforcement</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-right">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredPolicies.map((policy) => (
                <tr key={policy.id} className="b order-b b order-border/40 hover:bg-[#18181b]/80 transition-colors cursor-pointer group">
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-medium text-foreground">{policy.name}</span>
                      <span className="text-[11px] font-mono text-muted-foreground mt-0.5">{policy.id}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-[12px] text-muted-foreground bg-[#18181b] border b order-border px-2 py-1 rounded w-fit">
                      {policy.scope}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {policy.enforcement === 'Block' ? (
                      <span className="flex items-center gap-1.5 text-[11px] font-medium text-decision-block bg-decision-block/10 border b order-decision-block/20 px-2 py-0.5 rounded w-fit">
                        <XCircle className="w-3 h-3" /> Block
                      </span>
                    ) : policy.enforcement === 'Escalate' ? (
                      <span className="flex items-center gap-1.5 text-[11px] font-medium text-decision-escalate bg-decision-escalate/10 border b order-decision-escalate/20 px-2 py-0.5 rounded w-fit">
                        <AlertTriangle className="w-3 h-3" /> Escalate
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[11px] font-medium text-decision-allow bg-decision-allow/10 border b order-decision-allow/20 px-2 py-0.5 rounded w-fit">
                        <ShieldCheck className="w-3 h-3" /> Allow
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {policy.status === 'Active' ? (
                      <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> Enforcing</span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[11px] font-medium text-primary"><Activity className="w-3.5 h-3.5" /> Testing mode</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <span className="text-[11px] text-muted-foreground">{policy.lastUpdated}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
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

// Ensure Beaker is imported
import { Beaker } from "lucide-react";
