"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  Cpu,
  ShieldAlert,
  TerminalSquare,
  Settings,
  LogOut,
  Bell,
  Search,
  FileText,
  CreditCard,
  Menu,
  X,
  AlertTriangle,
  ShieldCheck,
  Radio,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const MENU_GROUPS = [
  {
    label: "OPERATIONAL CONTROL",
    items: [
      { name: "Command Center", href: "/dashboard", icon: LayoutDashboard },
      {
        name: "Tool Call Telemetry",
        href: "/dashboard/live-monitor",
        icon: Activity,
      },
    ],
  },
  {
    label: "ENFORCEMENT & AUDIT",
    items: [
      { name: "Agent Identities", href: "/dashboard/agents", icon: Cpu },
      {
        name: "Audit & Policy Logs",
        href: "/dashboard/risk-center",
        icon: ShieldAlert,
      },
      {
        name: "Review Queue",
        href: "/dashboard/review-queue",
        icon: AlertTriangle,
        badge: "2 PENDING",
      },
      {
        name: "False Positive Metrics",
        href: "/dashboard/reports",
        icon: FileText,
      },
      {
        name: "Billing & Plans",
        href: "/dashboard/billing",
        icon: CreditCard,
      },
    ],
  },
  {
    label: "INTELLIGENCE",
    items: [
      {
        name: "Intelligence Core",
        href: "/dashboard/ai-chat",
        icon: TerminalSquare,
      },
    ],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Loading...");
  const [workspaceName, setWorkspaceName] = useState("Enterprise");

  useEffect(() => {
    async function getUserData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const rawName =
          user.user_metadata?.first_name || user.email?.split("@")[0] || "User";
        setUserName(rawName.charAt(0).toUpperCase() + rawName.slice(1));
        const { data: wsData } = await supabase
          .from("workspaces")
          .select("name")
          .eq("owner_id", user.id)
          .single();
        if (wsData) setWorkspaceName(wsData.name);
      }
    }
    getUserData();
  }, [supabase]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans flex w-full max-w-[100vw] overflow-x-hidden relative selection:bg-blue-500/30">
      {/* DESKTOP SIDEBAR */}
      <aside
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`hidden md:flex fixed inset-y-0 left-0 z-40 bg-zinc-950/90 backdrop-blur-2xl border-r border-zinc-800/80 transition-all duration-300 ease-in-out flex-col justify-between shadow-2xl ${
          isExpanded ? "w-64" : "w-20"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto hide-scrollbar">
          {/* LOGO AREA */}
          <div className="h-20 flex items-center px-5 gap-3.5 border-b border-zinc-800/80 overflow-hidden shrink-0">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-xl text-blue-400 shadow-inner">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="w-5 h-5 text-blue-400"
              >
                <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
              </svg>
            </div>
            <div
              className={`flex flex-col transition-opacity duration-300 whitespace-nowrap ${
                isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <span className="font-serif text-lg tracking-tight text-white leading-none">
                Aegisora
              </span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1 truncate max-w-[140px]">
                {workspaceName}
              </span>
            </div>
          </div>

          {/* NAV ITEMS */}
          <nav className="p-3 space-y-6 mt-4 flex-1">
            {MENU_GROUPS.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1.5">
                <span
                  className={`px-3 text-[9px] font-mono font-semibold text-zinc-500 uppercase tracking-[0.25em] block transition-opacity duration-300 ${
                    isExpanded ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
                  }`}
                >
                  {group.label}
                </span>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all group relative outline-none ${
                        isActive
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/30 shadow-sm"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-900/60 border border-transparent"
                      }`}
                    >
                      <Icon
                        className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${
                          isActive
                            ? "text-blue-400"
                            : "text-zinc-500 group-hover:text-zinc-300"
                        }`}
                      />
                      <span
                        className={`text-[13px] font-medium tracking-wide whitespace-nowrap flex-1 flex items-center transition-opacity duration-300 ${
                          isExpanded
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none w-0"
                        }`}
                      >
                        {item.name}
                        {item.badge && isExpanded && (
                          <span className="ml-auto bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] px-2 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider">
                            {item.badge}
                          </span>
                        )}
                      </span>
                      {!isExpanded && (
                        <div className="absolute left-20 bg-zinc-900 border border-zinc-800 text-white text-[11px] font-mono px-3 py-1.5 rounded-xl shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                          {item.name}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* BOTTOM ACTIONS */}
          <div className="p-3 border-t border-zinc-800/80 space-y-1.5 shrink-0 bg-zinc-950/50">
            <Link
              href="/dashboard/settings"
              className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all group relative outline-none ${
                pathname === "/dashboard/settings"
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
              }`}
            >
              <Settings className="w-[18px] h-[18px] flex-shrink-0 text-zinc-500 group-hover:text-zinc-300" />
              <span
                className={`text-[13px] font-medium whitespace-nowrap transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                Settings
              </span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all group relative cursor-pointer outline-none border border-transparent hover:border-red-500/20"
            >
              <LogOut className="w-[18px] h-[18px] flex-shrink-0 text-zinc-500 group-hover:text-red-400" />
              <span
                className={`text-[13px] font-medium whitespace-nowrap transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                Sign Out
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* MOBİL ÇEKMECE MENÜ (DRAWER) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md md:hidden flex justify-start">
          <div className="w-[85%] max-w-[300px] bg-zinc-950 h-full border-r border-zinc-800 flex flex-col justify-between p-5 overflow-y-auto shadow-2xl animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-zinc-800 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-xl text-blue-400 shadow-inner">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="w-4 h-4 text-blue-400"
                    >
                      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
                    </svg>
                  </div>
                  <div className="overflow-hidden">
                    <span className="font-serif text-base text-white block leading-none truncate">
                      Aegisora
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 truncate block max-w-[140px] uppercase tracking-widest mt-1">
                      {workspaceName}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white outline-none cursor-pointer rounded-xl bg-zinc-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-6">
                {MENU_GROUPS.map((group, groupIdx) => (
                  <div key={groupIdx} className="space-y-1.5">
                    <span className="px-3 text-[9px] font-mono font-semibold text-zinc-500 uppercase tracking-[0.25em] block mb-2">
                      {group.label}
                    </span>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all outline-none ${
                            isActive
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                              : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                          }`}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span className="text-xs font-medium truncate flex-1">
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className="ml-auto bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] px-2 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </div>

            <div className="pt-5 border-t border-zinc-800 space-y-2 mt-6">
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 outline-none"
              >
                <Settings className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-medium">Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 cursor-pointer outline-none border border-transparent hover:border-red-500/20"
              >
                <LogOut className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-medium">Sign Out</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

      {/* ANA İÇERİK ALANI */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-20 ml-0 w-full min-w-0 overflow-x-hidden bg-zinc-950">
        {/* TOP HEADER */}
        <header className="h-20 border-b border-zinc-800/80 px-4 sm:px-8 flex items-center justify-between bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-30 w-full">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer outline-none transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:flex items-center w-[240px] lg:w-[400px]">
              <div className="flex items-center gap-3 px-3.5 py-2.5 w-full bg-zinc-900/60 border border-zinc-800 rounded-xl shadow-inner focus-within:border-blue-500/50 transition-all">
                <Search className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search across Aegisora telemetry..."
                  className="bg-transparent border-none outline-none text-xs text-white w-full font-mono truncate placeholder:text-zinc-600"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <button className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer outline-none shadow-sm">
              <Bell className="w-4 h-4" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-serif font-bold text-sm flex-shrink-0 shadow-inner">
              {userName.charAt(0)}
            </div>
          </div>
        </header>

        {/* MAIN VIEW CONTENT */}
        <main className="flex-1 bg-zinc-950 w-full min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-10 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
