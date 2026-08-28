"use client";

import { useState } from "react";
import { Search, Filter, CheckCircle2, AlertCircle, MessageSquare, GitBranch, LayoutDashboard, Bell, CreditCard, Box, MoreHorizontal } from "lucide-react";

const mockApps = [
  { id: "app-slack", name: "Slack", description: "Forward security alerts and request manual approvals via Slack channels.", icon: MessageSquare, status: "Connected", events: "142 / day" },
  { id: "app-github", name: "GitHub", description: "Sync policy rules from repository and trigger automated security PRs.", icon: GitBranch, status: "Connected", events: "12 / day" },
  { id: "app-jira", name: "Jira", description: "Automatically create Jira issues for High and Critical runtime incidents.", icon: LayoutDashboard, status: "Error", events: "Auth Failed" },
  { id: "app-pagerduty", name: "PagerDuty", description: "Trigger on-call alerts for critical AI agent quarantine events.", icon: Bell, status: "Not Connected", events: "0" },
  { id: "app-stripe", name: "Stripe", description: "Allow specific agents to safely query billing data under strict policies.", icon: CreditCard, status: "Connected", events: "85 / day" },
  { id: "app-datadog", name: "Datadog", description: "Export runtime telemetry and token usage metrics to Datadog dashboards.", icon: Box, status: "Not Connected", events: "0" },
];

export default function ConnectedAppsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApps = mockApps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col animate-in fade-in duration-300">

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text" placeholder="Search applications..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111113] border b order-border hover:b order-sidebar-ring rounded-lg pl-9 pr-4 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:b order-primary transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 bg-[#111113] border b order-border hover:bg-[#18181b] px-3 py-2 rounded-lg text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors outline-none w-full sm:w-auto justify-center cursor-pointer">
          <Filter className="w-3.5 h-3.5" /> Filter by Status
        </button>
      </div>

      {/* APPS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredApps.map((app) => (
          <div key={app.id} className="bg-[#111113] border b order-border hover:b order-sidebar-ring rounded-xl p-5 shado w-sm transition-colors flex flex-col group">

            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#18181b] border b order-border flex items-center justify-center">
                <app.icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
              </div>
              <button className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-[#27272a] transition-colors outline-none cursor-pointer">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-[15px] font-bold text-white mb-1.5">{app.name}</h3>
            <p className="text-[12px] text-muted-foreground leading-relaxed flex-1 mb-6">
              {app.description}
            </p>

            <div className="flex items-center justify-between pt-4 b order-t b order-border/50 mt-auto">
              <div>
                {app.status === 'Connected' ? (
                  <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                  </span>
                ) : app.status === 'Error' ? (
                  <span className="flex items-center gap-1.5 text-[11px] font-medium text-decision-block">
                    <AlertCircle className="w-3.5 h-3.5" /> Auth Failed
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-muted-foreground">Not Connected</span>
                )}
              </div>

              <button className={`text-[12px] font-medium px-3 py-1.5 rounded-lg transition-colors outline-none cursor-pointer ${app.status === 'Connected' ? 'bg-[#18181b] border b order-border hover:bg-[#27272a] text-foreground' : 'bg-foreground text-background hover:bg-foreground/90'}`}>
                {app.status === 'Connected' ? 'Configure' : 'Connect'}
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
