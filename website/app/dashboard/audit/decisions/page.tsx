"use client";

import { useState } from "react";
import { Search, Filter, ShieldCheck, XCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";

const volumeData = [
  { date: "Aug 20", events: 420 }, { date: "Aug 21", events: 380 },
  { date: "Aug 22", events: 550 }, { date: "Aug 23", events: 890 },
  { date: "Aug 24", events: 410 }, { date: "Aug 25", events: 320 },
  { date: "Aug 26", events: 670 },
];

const mockDecisions = [
  { id: "DEC-9821", timestamp: "14:03:12.184", agent: "DataAnalyst", request: "database.query", policy: "DATA-004", risk: "High", result: "Blocked" },
  { id: "DEC-9820", timestamp: "14:02:54.811", agent: "SupportAgent", request: "customer.export", policy: "DATA-008", risk: "Medium", result: "Escalated" },
  { id: "DEC-9819", timestamp: "14:01:22.005", agent: "ResearchAgent", request: "github.read", policy: "SOURCE-002", risk: "Low", result: "Allowed" },
  { id: "DEC-9818", timestamp: "13:58:40.912", agent: "LegalAnalyzer", request: "contract.parse", policy: "DOC-001", risk: "Low", result: "Allowed" },
  { id: "DEC-9817", timestamp: "13:45:11.442", agent: "BillingAI", request: "stripe.refund", policy: "FIN-009", risk: "High", result: "Blocked" },
];

export default function DecisionsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const getResultBadge = (result: string) => {
    if (result === 'Blocked') return <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-decision-block/10 text-decision-block border border-decision-block/20"><XCircle className="w-3 h-3" /> Blocked</span>;
    if (result === 'Escalated') return <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-decision-escalate/10 text-decision-escalate border border-decision-escalate/20"><AlertTriangle className="w-3 h-3" /> Escalated</span>;
    return <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-decision-allow/10 text-decision-allow border border-decision-allow/20"><ShieldCheck className="w-3 h-3" /> Allowed</span>;
  };

  const getRiskColor = (risk: string) => {
    if (risk === 'High') return "text-decision-block";
    if (risk === 'Medium') return "text-decision-escalate";
    return "text-decision-allow";
  };

  return (
    <div className="flex flex-col animate-in fade-in duration-300">
      {/* EVENT VOLUME CHART */}
      <div className="bg-[#111113] border border-border rounded-xl p-5 mb-6 shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[12px] font-semibold text-muted-foreground uppercase tracking-widest">Event Volume</h3>
          <span className="text-[11px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded font-mono">3,140 Total</span>
        </div>
        <div className="h-[120px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={volumeData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ fill: 'var(--sidebar)' }}
                contentStyle={{ backgroundColor: '#18181b', borderColor: 'var(--border)', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="events" radius={[2, 2, 0, 0]}>
                {volumeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === volumeData.length - 1 ? 'var(--primary)' : 'var(--muted)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search decisions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111113] border border-border hover:border-sidebar-ring rounded-lg pl-9 pr-4 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 bg-[#111113] border border-border hover:bg-[#18181b] px-3 py-2 rounded-lg text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors outline-none w-full sm:w-auto justify-center cursor-pointer">
          <Filter className="w-3.5 h-3.5" /> More Filters
        </button>
      </div>

      {/* DATA TABLE */}
      <div className="bg-[#111113] border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto cf-scrollbar">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#18181b] border-b border-border/50">
                <th className="px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Decision ID</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Timestamp</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Agent & Request</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Policy</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Risk</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Enforcement</th>
              </tr>
            </thead>
            <tbody>
              {mockDecisions.map((dec) => (
                <tr key={dec.id} className="border-b border-border/40 hover:bg-[#18181b]/80 transition-colors cursor-pointer group">
                  <td className="px-4 py-3 text-[12px] font-mono text-muted-foreground group-hover:text-primary transition-colors">{dec.id}</td>
                  <td className="px-4 py-3 text-[12px] font-mono text-muted-foreground">{dec.timestamp}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-medium text-foreground">{dec.agent}</span>
                      <span className="text-[11px] font-mono text-muted-foreground mt-0.5 flex items-center gap-1"><ArrowRight className="w-3 h-3" /> {dec.request}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[12px] font-mono text-muted-foreground">{dec.policy}</td>
                  <td className="px-4 py-3 text-[12px] font-medium"><span className={getRiskColor(dec.risk)}>{dec.risk}</span></td>
                  <td className="px-4 py-3">{getResultBadge(dec.result)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
