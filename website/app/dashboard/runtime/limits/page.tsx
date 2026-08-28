"use client";

import { useState } from "react";
import { Search, Filter, ShieldAlert, Database, AlertCircle, TrendingUp } from "lucide-react";

const quotas = [
  { provider: "OpenAI", model: "GPT-4o", limit: "100M", used: 85, metric: "Tokens / Month", status: "Warning" },
  { provider: "Anthropic", model: "Claude 3.5", limit: "50M", used: 22, metric: "Tokens / Month", status: "Healthy" },
  { provider: "Aegisora Edge", model: "API Requests", limit: "1M", used: 98, metric: "Requests / Day", status: "Critical" },
  { provider: "Internal Vector DB", model: "Queries", limit: "500K", used: 45, metric: "Queries / Hour", status: "Healthy" },
];

const rateLimitEvents = [
  { id: "rl-9821", agent: "DataAnalyst", trigger: "OpenAI GPT-4o Token Limit", timestamp: "5 mins ago", action: "Throttled (429)" },
  { id: "rl-9820", agent: "SupportBot", trigger: "Aegisora Edge API Limit", timestamp: "1 hour ago", action: "Blocked (429)" },
  { id: "rl-9819", agent: "ScraperAgent", trigger: "Anthropic Concurrent Limit", timestamp: "3 hours ago", action: "Throttled (429)" },
];

export default function LimitsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = rateLimitEvents.filter(e =>
    e.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.trigger.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">

      {/* SUMMARY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111113] border b order-border rounded-xl p-5 shado w-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Rate Limit Hits</span>
            <ShieldAlert className="w-4 h-4 text-decision-block" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">42</div>
          <div className="text-[11px] text-decision-block flex items-center gap-1">Action required</div>
        </div>
        <div className="bg-[#111113] border b order-border rounded-xl p-5 shado w-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Token Consumption</span>
            <Database className="w-4 h-4 text-primary" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">85%</div>
          <div className="text-[11px] text-orange-400 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Approaching quota</div>
        </div>
        <div className="bg-[#111113] border b order-border rounded-xl p-5 shado w-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Throttled Agents</span>
            <AlertCircle className="w-4 h-4 text-decision-escalate" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">3</div>
          <div className="text-[11px] text-muted-foreground">Currently degraded</div>
        </div>
      </div>

      {/* QUOTAS PROGRESS BARS */}
      <div className="bg-[#111113] border b order-border rounded-xl p-5 flex flex-col shado w-sm">
        <h3 className="text-[13px] font-bold text-white mb-6">Active Provider Quotas</h3>
        <div className="flex flex-col gap-5">
          {quotas.map((q, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{q.provider}</span>
                  <span className="text-muted-foreground">- {q.model}</span>
                </div>
                <div className="font-mono text-muted-foreground">
                  <span className={q.used > 90 ? 'text-decision-block font-bold' : q.used > 75 ? 'text-decision-escalate font-bold' : 'text-foreground'}>{q.used}%</span> of {q.limit} {q.metric}
                </div>
              </div>
              <div className="h-2 w-full bg-[#09090b] rounded-full overflo w-hidden border b order-border">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${q.used > 90 ? 'bg-decision-block' : q.used > 75 ? 'bg-decision-escalate' : 'bg-primary'}`}
                  style={{ width: `${q.used}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RATE LIMIT EVENTS TABLE */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text" placeholder="Search rate limit events..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111113] border b order-border hover:b order-sidebar-ring rounded-lg pl-9 pr-4 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:b order-primary transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 bg-[#111113] border b order-border hover:bg-[#18181b] px-3 py-2 rounded-lg text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors outline-none w-full sm:w-auto justify-center cursor-pointer">
          <Filter className="w-3.5 h-3.5" /> Filter by Agent
        </button>
      </div>

      <div className="bg-[#111113] border b order-border rounded-xl overflo w-hidden shado w-sm">
        <div className="overflo w-x-auto cf-scrollbar">
          <table className="w-full text-left b order-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#18181b] b order-b b order-border/50">
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Event ID</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Agent</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Limit Triggered</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Enforcement Action</th>
                <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((ev) => (
                <tr key={ev.id} className="b order-b b order-border/40 hover:bg-[#18181b]/80 transition-colors cursor-pointer group">
                  <td className="px-5 py-3 text-[12px] font-mono text-muted-foreground">{ev.id}</td>
                  <td className="px-5 py-3 text-[13px] font-medium text-foreground">{ev.agent}</td>
                  <td className="px-5 py-3 text-[12px] text-muted-foreground">{ev.trigger}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${ev.action.includes('Blocked') ? 'bg-decision-block/10 text-decision-block b order-decision-block/20' : 'bg-decision-escalate/10 text-decision-escalate b order-decision-escalate/20'}`}>
                      {ev.action}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[12px] text-muted-foreground">{ev.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
