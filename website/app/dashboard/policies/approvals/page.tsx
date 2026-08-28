"use client";

import { useState } from "react";
import { Search, Filter, AlertTriangle, Clock, Check, X, ShieldAlert, Bot } from "lucide-react";

const mockApprovals = [
  { id: "REQ-901", agent: "DataAnalyst", action: "stripe.customer.export", policy: "POL-API-012", risk: "High", requested: "5 mins ago", context: "Agent requested full export of Q2 customer data." },
  { id: "REQ-902", agent: "SupportBot", action: "github.issue.close", policy: "POL-SRC-005", risk: "Medium", requested: "18 mins ago", context: "Automated closure of 15 stagnant repository issues." },
  { id: "REQ-903", agent: "BillingAI", action: "stripe.refund.create", policy: "POL-FIN-009", risk: "High", requested: "1 hour ago", context: "Refund request of $1,250 exceeding auto-approval threshold." },
];

export default function ApprovalsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApprovals = mockApprovals.filter(req =>
    req.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col animate-in fade-in duration-300">

      {/* SUMMARY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#111113] border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Pending Approvals</span>
            <AlertTriangle className="w-4 h-4 text-decision-escalate" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">3</div>
          <div className="text-[11px] text-muted-foreground">Requires manual intervention</div>
        </div>
        <div className="bg-[#111113] border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Avg Resolution Time</span>
            <Clock className="w-4 h-4 text-primary" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">12m</div>
          <div className="text-[11px] text-muted-foreground">Last 7 days</div>
        </div>
        <div className="bg-[#111113] border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Escalation Rate</span>
            <ShieldAlert className="w-4 h-4 text-decision-block" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">1.4%</div>
          <div className="text-[11px] text-muted-foreground">Of total runtime requests</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text" placeholder="Search requests..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111113] border border-border hover:border-sidebar-ring rounded-lg pl-9 pr-4 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 bg-[#111113] border border-border hover:bg-[#18181b] px-3 py-2 rounded-lg text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors outline-none w-full sm:w-auto justify-center cursor-pointer">
          <Filter className="w-3.5 h-3.5" /> Sort by Risk
        </button>
      </div>

      {/* APPROVALS CARDS LIST */}
      <div className="flex flex-col gap-4">
        {filteredApprovals.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[30vh] text-center bg-[#111113] border border-border border-dashed rounded-xl p-8">
            <CheckCircle2 className="w-10 h-10 text-muted-foreground mb-4" strokeWidth={1} />
            <h3 className="text-[15px] font-bold text-foreground mb-1">Inbox Zero</h3>
            <p className="text-[13px] text-muted-foreground">No pending executions require manual approval.</p>
          </div>
        ) : (
          filteredApprovals.map((req) => (
            <div key={req.id} className="bg-[#111113] border border-border hover:border-sidebar-ring rounded-xl p-5 shadow-sm transition-colors flex flex-col md:flex-row gap-6 justify-between">

              <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-muted-foreground bg-[#18181b] border border-border px-2 py-0.5 rounded">{req.id}</span>
                  <span className="flex items-center gap-1.5 text-[11px] font-medium text-decision-block bg-decision-block/10 border border-decision-block/20 px-2 py-0.5 rounded">
                    <ShieldAlert className="w-3 h-3" /> {req.risk} Risk
                  </span>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {req.requested}</span>
                </div>

                <div>
                  <h3 className="text-[15px] font-bold text-white flex items-center gap-2 mb-1">
                    <Bot className="w-4 h-4 text-primary" /> {req.agent}
                    <span className="text-muted-foreground font-normal text-[13px]">wants to execute</span>
                    <span className="font-mono text-primary text-[13px]">{req.action}</span>
                  </h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed max-w-3xl">{req.context}</p>
                </div>

                <div className="text-[11px] text-muted-foreground">
                  Triggered by policy: <span className="font-mono text-foreground">{req.policy}</span>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-center gap-3 border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 md:pl-6">
                <button className="flex items-center justify-center gap-2 w-full md:w-32 bg-decision-allow/10 hover:bg-decision-allow/20 text-decision-allow border border-decision-allow/30 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors outline-none cursor-pointer">
                  <Check className="w-4 h-4" /> Approve
                </button>
                <button className="flex items-center justify-center gap-2 w-full md:w-32 bg-decision-block/10 hover:bg-decision-block/20 text-decision-block border border-decision-block/30 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors outline-none cursor-pointer">
                  <X className="w-4 h-4" /> Reject
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}

// Ensure CheckCircle2 is imported
import { CheckCircle2 } from "lucide-react";
