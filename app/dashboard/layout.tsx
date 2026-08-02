"use client";

import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

// --- KATEGORİZE EDİLMİŞ MENÜ YAPISI (SUPABASE TARZI) ---
const MENU_GROUPS = [
  {
    label: "PLATFORM",
    items: [
      { name: "Command Center", href: "/dashboard", icon: LayoutDashboard },
      { name: "Live Monitor", href: "/dashboard/live-monitor", icon: Activity },
    ],
  },
  {
    label: "SECURITY",
    items: [
      { name: "AI Agents", href: "/dashboard/agents", icon: Cpu },
      {
        name: "Risk Center",
        href: "/dashboard/risk-center",
        icon: ShieldAlert,
      },
      {
        name: "Compliance Reports",
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

  // Sayfa değiştiğinde mobilde menüyü otomatik kapat
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#070709] text-gray-200 font-sans flex overflow-x-hidden">
      {/* DESKTOP SIDEBAR (PC'de eskisi gibi çalışmaya devam eder) */}
      <aside
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`hidden md:flex fixed inset-y-0 left-0 z-40 bg-[#0c0c0e] border-r border-gray-800/80 transition-all duration-300 ease-in-out flex-col justify-between ${
          isExpanded ? "w-64" : "w-20"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto hide-scrollbar">
          <div className="h-20 flex items-center px-5 gap-3 border-b border-gray-800/60 overflow-hidden shrink-0">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-[#121215] border border-gray-800 rounded-xl text-[#0066EE]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="w-5 h-5"
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
              <span className="text-[10px] font-mono text-gray-500 mt-1 truncate max-w-[140px]">
                {workspaceName}
              </span>
            </div>
          </div>

          <nav className="p-3 space-y-6 mt-4 flex-1">
            {MENU_GROUPS.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1.5">
                <span
                  className={`px-3 text-[10px] font-mono text-gray-500 uppercase tracking-widest block transition-opacity duration-300 ${
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
                      className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all group relative ${
                        isActive
                          ? "bg-[#0066EE]/15 text-[#0066EE] border border-[#0066EE]/30 shadow-sm"
                          : "text-gray-400 hover:text-white hover:bg-[#121215] border border-transparent"
                      }`}
                    >
                      <Icon
                        className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${
                          isActive
                            ? "text-[#0066EE]"
                            : "text-gray-400 group-hover:text-white"
                        }`}
                      />
                      <span
                        className={`text-[13px] font-medium tracking-wide whitespace-nowrap transition-opacity duration-300 ${
                          isExpanded
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                        }`}
                      >
                        {item.name}
                      </span>
                      {!isExpanded && (
                        <div className="absolute left-20 bg-[#121215] border border-gray-800 text-white text-[11px] font-mono px-3 py-1.5 rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                          {item.name}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          <div className="p-3 border-t border-gray-800/60 space-y-1 shrink-0">
            <Link
              href="/dashboard/settings"
              className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all group relative ${
                pathname === "/dashboard/settings"
                  ? "bg-[#0066EE]/15 text-[#0066EE] border border-[#0066EE]/30"
                  : "text-gray-400 hover:text-white hover:bg-[#121215]"
              }`}
            >
              <Settings className="w-[18px] h-[18px] flex-shrink-0" />
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
              className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all group relative cursor-pointer"
            >
              <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
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

      {/* MOBİL İÇİN AÇILIR MENÜ (DRAWER) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden flex">
          <div className="w-72 bg-[#0c0c0e] h-full border-r border-gray-800 flex flex-col justify-between p-4 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center bg-[#121215] border border-gray-800 rounded-xl text-[#0066EE]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="w-4 h-4"
                    >
                      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-serif text-base text-white block leading-none">
                      Aegisora
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">
                      {workspaceName}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-6">
                {MENU_GROUPS.map((group, groupIdx) => (
                  <div key={groupIdx} className="space-y-1">
                    <span className="px-3 text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">
                      {group.label}
                    </span>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                            isActive
                              ? "bg-[#0066EE]/15 text-[#0066EE] border border-[#0066EE]/30"
                              : "text-gray-400 hover:text-white hover:bg-[#121215]"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-xs font-medium">
                            {item.name}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </div>

            <div className="pt-4 border-t border-gray-800 space-y-1">
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-[#121215]"
              >
                <Settings className="w-4 h-4" />
                <span className="text-xs font-medium">Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-xs font-medium">Sign Out</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

      {/* ANA İÇERİK ALANI */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 md:${
          isExpanded ? "ml-64" : "ml-20"
        } ml-0 w-full overflow-x-hidden`}
      >
        <header className="h-20 border-b border-gray-800/80 px-4 sm:px-8 flex items-center justify-between bg-[#070709]/80 backdrop-blur-md sticky top-0 z-30 w-full">
          {/* Mobil Menü Butonu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2.5 rounded-xl bg-[#121215] border border-gray-800 text-gray-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:flex items-center w-[250px] lg:w-[400px]">
              <div className="flex items-center gap-2 px-3 py-2 w-full bg-[#121215] border border-gray-800 rounded-xl">
                <Search className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search across Aegisora..."
                  className="bg-transparent border-none outline-none text-xs text-white w-full font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <button className="p-2.5 rounded-xl bg-[#121215] border border-gray-800 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-[#0066EE]/20 border border-[#0066EE]/40 flex items-center justify-center text-[#0066EE] font-serif font-bold text-sm">
              {userName.charAt(0)}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#0a0a0c] w-full p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
