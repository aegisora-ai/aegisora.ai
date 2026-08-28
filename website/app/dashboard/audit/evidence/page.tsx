"use client";

import { useState } from "react";
import { Search, Filter, FileSignature, CheckCircle2, Lock, FileCode2 } from "lucide-react";

const mockEvidence = [
  { id: "EV-82941", decisionRef: "DEC-9821", timestamp: "14:03:13.001", hash: "sha256:8f4e2a9b...", provider: "AWS KMS", status: "Verified" },
  { id: "EV-82940", decisionRef: "DEC-9817", timestamp: "13:45:12.102", hash: "sha256:3c1d9f8e...", provider: "Azure Vault", status: "Verified" },
  { id: "EV-82939", decisionRef: "DEC-9820", timestamp: "14:02:55.200", hash: "pending_signature", provider: "Internal", status: "Pending" },
];

export default function EvidencePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search cryptographic evidence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111113] border b order-border hover:b order-sidebar-ring rounded-lg pl-9 pr-4 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:b order-primary transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 bg-[#111113] border b order-border hover:bg-[#18181b] px-3 py-2 rounded-lg text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors outline-none w-full sm:w-auto justify-center cursor-pointer">
          <Filter className="w-3.5 h-3.5" /> More Filters
        </button>
      </div>

      <div className="bg-[#111113] border b order-border rounded-xl overflo w-hidden shado w-sm">
        <div className="overflo w-x-auto cf-scrollbar">
          <table className="w-full text-left b order-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#18181b] b order-b b order-border/50">
                <th className="px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Evidence ID</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Timestamp</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Decision Ref</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Cryptographic Hash</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Provider / Status</th>
              </tr>
            </thead>
            <tbody>
              {mockEvidence.map((ev) => (
                <tr key={ev.id} className="b order-b b order-border/40 hover:bg-[#18181b]/80 transition-colors cursor-pointer group">
                  <td className="px-4 py-3 text-[12px] font-mono text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    <FileSignature className="w-3.5 h-3.5 text-zinc-500" /> {ev.id}
                  </td>
                  <td className="px-4 py-3 text-[12px] font-mono text-muted-foreground">{ev.timestamp}</td>
                  <td className="px-4 py-3 text-[12px] font-mono text-primary underline decoration-primary/30 underline-offset-2">{ev.decisionRef}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 bg-[#09090b] border b order-border px-2 py-1 rounded w-fit">
                      <FileCode2 className="w-3 h-3 text-muted-foreground" />
                      <span className="text-[11px] font-mono text-muted-foreground truncate max-w-[120px]">{ev.hash}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-foreground font-medium">{ev.provider}</span>
                      {ev.status === 'Verified' ? (
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-mono text-emerald-400"><CheckCircle2 className="w-3 h-3" /> Verified</span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-mono text-orange-400"><Lock className="w-3 h-3" /> Pending</span>
                      )}
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
