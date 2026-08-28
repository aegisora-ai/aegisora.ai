"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, ShieldCheck, CheckSquare, ShieldAlert, AlertOctagon,
  Cpu, Box, Wrench, Activity, Zap, Wifi, ClipboardList, Puzzle, BookOpen,
  BarChart3, MessageSquare, Users2, Settings, Bell, Search, Hexagon
} from "lucide-react";

const sidebarMenu = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Agents", href: "/dashboard/agents", icon: Users },
  { name: "Policies", href: "/dashboard/policies", icon: ShieldCheck },
  { name: "Approvals", href: "/dashboard/approvals", icon: CheckSquare },
  { name: "Security", href: "/dashboard/security", icon: ShieldAlert },
  { name: "Risk Center", href: "/dashboard/risk-center", icon: AlertOctagon },
  { name: "Providers", href: "/dashboard/providers", icon: Cpu },
  { name: "Models", href: "/dashboard/models", icon: Box },
  { name: "Tools", href: "/dashboard/tools", icon: Wrench },
  { name: "Live Monitor", href: "/dashboard/live-monitor", icon: Activity },
  { name: "Runtime", href: "/dashboard/runtime", icon: Zap },
  { name: "Network", href: "/dashboard/network", icon: Wifi },
  { name: "Audit", href: "/dashboard/audit", icon: ClipboardList },
  { name: "Integrations", href: "/dashboard/integrations", icon: Puzzle },
  { name: "Knowledge", href: "/dashboard/knowledge", icon: BookOpen },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { name: "AI Chat", href: "/dashboard/ai-chat", icon: MessageSquare },
  { name: "Team", href: "/dashboard/team", icon: Users2 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">

      {/* Koyu Temalı Enterprise Sidebar */}
      <aside className="w-[240px] bg-slate-900 b order-r b order-slate-800 flex flex-col shrink-0 sticky top-0 h-screen overflo w-hidden">

        {/* Workspace Switcher */}
        <div className="h-16 flex items-center px-4 b order-b b order-white/10 hover:bg-white/5 cursor-pointer transition-colors">
           <div className="flex items-center gap-3 w-full">
             <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shado w-inner">
               <Hexagon className="w-4 h-4 text-white" />
             </div>
             <div className="flex flex-col">
               <span className="text-[13px] font-bold text-white">Acme Corp</span>
               <span className="text-[11px] text-slate-400 font-medium">Enterprise Plan</span>
             </div>
           </div>
        </div>

        {/* Navigation Scroll Area */}
        <div className="flex-1 overflo w-y-auto custom-scrollbar py-4 px-3 flex flex-col gap-1">
          {sidebarMenu.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                  ? "bg-[#0066FF] text-white shado w-sm"
                  : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="text-[13px] font-bold tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* User Profile Area (Bottom) */}
        <div className="p-4 b order-t b order-white/10 mt-auto">
          <div className="flex items-center gap-3">
             <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-8 h-8 rounded-full border b order-slate-700" />
             <div className="flex flex-col">
               <span className="text-[12px] font-bold text-white">Eray Özer</span>
               <span className="text-[11px] text-slate-500">Admin</span>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Dashboard Top Header */}
        <header className="h-16 bg-white b order-b b order-slate-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-40">
          <div className="flex items-center gap-2 text-[14px] font-medium text-slate-500">
             <span>Acme Corp</span> <span className="text-slate-300">/</span> <span className="text-slate-900 font-bold capitalize">{pathname.split('/').pop() || 'Overview'}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search commands (Cmd + K)" className="pl-9 pr-4 py-1.5 w-64 bg-slate-100 b order-transparent rounded-lg text-[13px] focus:bg-white focus:b order-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 transition-all outline-none" />
            </div>
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 b order-2 b order-white rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Dashboard Dynamic Page Content */}
        <main className="flex-1 overflo w-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
