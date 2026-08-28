"use client";

import { useState } from "react";
import {
  Search,
  Activity,
  Network,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Database,
} from "lucide-react";

const mockJobs = [
  { id: "ft-8921a", name: "Legal_Contract_Reviewer_v2", baseModel: "llama-3.3-70b", dataset: "legal-docs-q3", epochs: 3, status: "Training", progress: 68, time: "2h 15m remaining" },
  { id: "ft-8920b", name: "Support_Tone_Align", baseModel: "gpt-4o-mini", dataset: "support-tickets-2026", epochs: 4, status: "Deployed", progress: 100, time: "Completed 2 days ago" },
  { id: "ft-8919c", name: "Code_Review_Strict", baseModel: "claude-3-haiku", dataset: "internal-repo-diffs", epochs: 2, status: "Failed", progress: 14, time: "OOM Error at step 1420" },
];

export default function FineTuningPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col animate-in fade-in duration-300">

      {/* SUMMARY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#111113] border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Active Jobs</span>
            <Activity className="w-4 h-4 text-primary" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">1</div>
          <div className="text-[11px] text-muted-foreground">Currently training</div>
        </div>
        <div className="bg-[#111113] border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Deployed Custom Models</span>
            <Network className="w-4 h-4 text-emerald-500" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">12</div>
          <div className="text-[11px] text-muted-foreground">Available to agents</div>
        </div>
        <div className="bg-[#111113] border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Compute Hours</span>
            <Clock className="w-4 h-4 text-orange-500" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">342h</div>
          <div className="text-[11px] text-muted-foreground">This billing cycle</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text" placeholder="Search tuning jobs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111113] border border-border hover:border-sidebar-ring rounded-lg pl-9 pr-4 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 bg-[#111113] border border-border hover:bg-[#18181b] px-3 py-2 rounded-lg text-[12px] font-medium text-foreground transition-colors outline-none w-full sm:w-auto justify-center cursor-pointer">
          Create Tuning Job
        </button>
      </div>

      {/* JOBS TABLE */}
      <div className="bg-[#111113] border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto cf-scrollbar">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#18181b] border-b border-border/50">
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Job Name / ID</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Base Model & Dataset</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider w-48">Progress</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-right"></th>
              </tr>
            </thead>
            <tbody>
              {mockJobs.map((job) => (
                <tr key={job.id} className="border-b border-border/40 hover:bg-[#18181b]/80 transition-colors cursor-pointer group">
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-medium text-foreground">{job.name}</span>
                      <span className="text-[11px] font-mono text-muted-foreground mt-0.5">{job.id}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="text-[12px] font-mono text-foreground">{job.baseModel}</span>
                      <span className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1"><Database className="w-3 h-3" /> {job.dataset}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1.5 w-full max-w-[180px]">
                      <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                        <span>{job.progress}%</span>
                        <span>{job.epochs} Epochs</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#09090b] rounded-full overflow-hidden border border-border">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${job.status === 'Training' ? 'bg-primary animate-pulse' : job.status === 'Failed' ? 'bg-decision-block' : 'bg-decision-allow'}`}
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{job.time}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {job.status === 'Training' ? (
                      <span className="flex items-center gap-1.5 text-[11px] font-medium text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded w-fit">
                        <Activity className="w-3 h-3 animate-pulse" /> Training
                      </span>
                    ) : job.status === 'Deployed' ? (
                      <span className="flex items-center gap-1.5 text-[11px] font-medium text-decision-allow bg-decision-allow/10 border border-decision-allow/20 px-2 py-0.5 rounded w-fit">
                        <CheckCircle2 className="w-3 h-3" /> Deployed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[11px] font-medium text-decision-block bg-decision-block/10 border border-decision-block/20 px-2 py-0.5 rounded w-fit">
                        <XCircle className="w-3 h-3" /> Failed
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      View Logs <ArrowRight className="w-3 h-3" />
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
