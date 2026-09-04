"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Shield, Activity, FileText, Play, CheckSquare, Zap, Target, 
  Lock, AlertTriangle, Route, FileBadge, ScrollText, Cloud, 
  Link as LinkIcon, Users, Settings, BarChart, CreditCard 
} from "lucide-react";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: Activity, group: "General" },
  { name: "Agents", href: "/dashboard/agents", icon: Target, group: "Agent Security" },
  { name: "Policies", href: "/dashboard/policies", icon: FileText, group: "Governance" },
  { name: "Simulator", href: "/dashboard/policies/simulator", icon: Play, group: "Governance" },
  { name: "Approvals", href: "/dashboard/approvals", icon: CheckSquare, group: "Runtime" },
  { name: "Live Activity", href: "/dashboard/activity", icon: Zap, group: "Operations" },
  { name: "Decisions", href: "/dashboard/decisions", icon: AlertTriangle, group: "Runtime" },
  { name: "Enforcement", href: "/dashboard/enforcement", icon: Lock, group: "Execution" },
  { name: "Incidents", href: "/dashboard/incidents", icon: Shield, group: "Operations" },
  { name: "Traces", href: "/dashboard/traces", icon: Route, group: "Provenance" },
  { name: "Evidence", href: "/dashboard/evidence", icon: FileBadge, group: "Provenance" },
  { name: "Audit", href: "/dashboard/audit", icon: ScrollText, group: "Provenance" },
  { name: "Providers", href: "/dashboard/providers", icon: Cloud, group: "Enterprise" },
  { name: "Integrations", href: "/dashboard/integrations", icon: LinkIcon, group: "Enterprise" },
  { name: "Team", href: "/dashboard/team", icon: Users, group: "Enterprise" },
  { name: "Settings", href: "/dashboard/settings", icon: Settings, group: "Enterprise" },
  { name: "Usage", href: "/dashboard/usage", icon: BarChart, group: "Business" },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard, group: "Business" }
];

export function Sidebar({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean, setSidebarOpen: (val: boolean) => void }) {
  const pathname = usePathname();
  const groups = Array.from(new Set(navigation.map(n => n.group)));

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/80 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 text-slate-300 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center h-16 px-6 bg-slate-950 border-b border-slate-800 shrink-0">
          <img src="/brand/aegisora-logo-blue.png" alt="Aegisora Logo" className="w-6 h-auto object-contain mr-2" />
          <span className="text-xl font-bold text-white tracking-tight">Aegisora</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
          {groups.map((group, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="px-6 mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">{group}</h3>
              <nav className="space-y-0.5 px-3">
                {navigation.filter(item => item.group === group).map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.name} href={item.href} onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                        isActive ? "bg-blue-600/10 text-blue-500" : "hover:bg-slate-900 hover:text-slate-100"
                      }`}>
                      <item.icon className={`w-4 h-4 ${isActive ? "text-blue-500" : "text-slate-400"}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-slate-800 shrink-0">
          <div className="px-3 py-2 bg-slate-900 rounded-lg flex items-center justify-between border border-slate-800">
            <div className="text-xs">
              <div className="font-bold text-white">v3.0.0-rc1</div>
              <div className="text-slate-500">Enterprise Edition</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}