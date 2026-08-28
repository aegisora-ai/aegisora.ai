"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  Shield, Activity, Settings, Users, Database, FileText,
  Terminal, Server, Globe, Key, AlertTriangle, CheckCircle,
  Search, Bell, LogOut, ChevronRight
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // PRESERVED: Aegisora's backend logic expectations
  const [supabase] = useState(() => createClient());

  const navGroups = [
    {
      label: "Workspace",
      items: [
        { name: "Overview", href: "/dashboard", icon: Activity },
        { name: "Active Agents", href: "/dashboard/agents", icon: Terminal },
        { name: "Enforcement Policies", href: "/dashboard/policies", icon: Shield },
      ]
    },
    {
      label: "Observability",
      items: [
        { name: "Audit Logs", href: "/dashboard/audit", icon: FileText },
        { name: "Decisions", href: "/dashboard/decisions", icon: CheckCircle },
        { name: "Escalations", href: "/dashboard/escalations", icon: AlertTriangle },
      ]
    },
    {
      label: "Organization",
      items: [
        { name: "Integrations", href: "/dashboard/integrations", icon: Globe },
        { name: "API Keys", href: "/dashboard/keys", icon: Key },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
      ]
    }
  ];

  return (
    <div className="h-screen w-full flex bg-[#09090b] text-slate-300 overflow-hidden font-sans">

      {/* ENTERPRISE SIDEBAR (Kiranism Inspiration) */}
      <aside className="w-64 border-r border-slate-800 bg-[#09090b] flex flex-col shrink-0">

        {/* Workspace Selector */}
        <div className="h-14 border-b border-slate-800 flex items-center px-4 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity w-full">
            <img src="/logo.png" alt="Aegisora Logo" className="h-7 w-auto object-contain" />
            <div className="flex flex-col flex-1 overflow-hidden">
              <span className="text-sm font-bold text-white truncate">Aegisora</span>
              <span className="text-[10px] font-mono text-slate-500 truncate">Workspace</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navGroups.map((group, idx) => (
            <div key={idx}>
              <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">{group.label}</div>
              <div className="space-y-0.5">
                {group.items.map((item, i) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={i}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
                    >
                      <item.icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Profile Bottom */}
        <div className="p-3 border-t border-slate-800">
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-slate-800/50 transition-colors text-left">
            <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-white">
              EO
            </div>
            <div className="flex flex-col flex-1 overflow-hidden">
              <span className="text-sm font-medium text-white truncate">Eray Ozer</span>
              <span className="text-[10px] text-slate-500 truncate">eray@acme.com</span>
            </div>
            <LogOut className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#09090b]">

        {/* Top Header */}
        <header className="h-14 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 bg-[#09090b]">

          {/* Breadcrumbs / Context */}
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors">Workspace</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-white font-medium capitalize">
              {pathname === '/dashboard' ? 'Overview' : pathname.split('/').pop()}
            </span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-md text-xs text-slate-400">
              <Search className="w-3 h-3" /> Search (Ctrl+K)
            </div>
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#09090b] cf-scrollbar">
          {children}
        </main>
      </div>

    </div>
  );
}
