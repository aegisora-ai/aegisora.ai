"use client";

import { useState } from "react";
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
  FileText,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

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
      { name: "Risk Center", href: "/dashboard/risk-center", icon: ShieldAlert },
      { name: "Review Queue", href: "/dashboard/review-queue", icon: AlertTriangle, badge: "2 PENDING" },
      { name: "Compliance Reports", href: "/dashboard/reports", icon: FileText },
      { name: "Billing & Plans", href: "/dashboard/billing", icon: CreditCard },
    ],
  },
  {
    label: "INTELLIGENCE",
    items: [
      { name: "Intelligence Core", href: "/dashboard/ai-chat", icon: TerminalSquare },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      // Mobilde gizlenir (hidden), tablet ve masaüstünde görünür (md:flex). 
      // Dokunmatik cihazlar için erişilebilirlik sağlandı.
      className={`hidden md:flex fixed inset-y-0 left-0 z-40 bg-[#0c0c0e] b order-r b order-gray-800/80 transition-all duration-300 ease-in-out flex-col justify-between ${
        isExpanded ? "w-64 shado w-2xl" : "w-20"
      }`}
      aria-expanded={isExpanded}
    >
      <div className="flex flex-col h-full overflo w-y-auto hide-scrollbar">
        {/* LOGO & BRANDING */}
        <div className="h-20 flex items-center px-5 gap-3 b order-b b order-gray-800/60 overflo w-hidden shrink-0">
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-[#121215] border b order-gray-800 rounded-xl text-[#0066EE]">
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
            <span className="text-[10px] font-mono text-gray-500 mt-1">
              Enterprise Zero-Trust
            </span>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="p-3 space-y-6 mt-4 flex-1">
          {MENU_GROUPS.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1.5">
              <span
                className={`px-3 text-[10px] font-mono text-gray-500 uppercase tracking-widest block transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0 h-0 overflo w-hidden"
                }`}
              >
                {group.label}
              </span>
              {group.items.map((item) => {
                const Icon = item.icon;
                
                // Alt Rota (Nested Route) Algılayıcı Mantık
                // Eğer href tam "/dashboard" ise sadece tam eşleşmeye bakar.
                // Eğer "/dashboard/agents" gibi bir alt link ise, "startsWith" ile içindeki sayfaları da kapsar.
                const isActive = item.href === "/dashboard" 
                  ? pathname === item.href 
                  : pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all group relative outline-none focus-visible:ring-2 focus-visible:ring-[#0066EE] ${
                      isActive
                        ? "bg-[#0066EE]/15 text-[#0066EE] border b order-[#0066EE]/30 shado w-sm"
                        : "text-gray-400 hover:text-white hover:bg-[#121215] border b order-transparent"
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
                      className={`text-[13px] font-medium tracking-wide whitespace-nowrap flex-1 flex items-center transition-opacity duration-300 ${
                        isExpanded
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none w-0"
                      }`}
                    >
                      {item.name}
                      {item.badge && isExpanded && (
                        <span className="ml-auto bg-orange-500/20 text-orange-400 text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          {item.badge}
                        </span>
                      )}
                    </span>
                    {/* Tooltip sadece kapalıyken görünür */}
                    {!isExpanded && (
                      <div className="absolute left-20 bg-[#121215] border b order-gray-800 text-white text-[11px] font-mono px-3 py-1.5 rounded-lg shado w-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        {item.name}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* SETTINGS & LOGOUT */}
        <div className="p-3 b order-t b order-gray-800/60 space-y-1 shrink-0">
          <Link
            href="/dashboard/settings"
            className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all group relative outline-none focus-visible:ring-2 focus-visible:ring-[#0066EE] ${
              pathname?.startsWith("/dashboard/settings")
                ? "bg-[#0066EE]/15 text-[#0066EE] border b order-[#0066EE]/30"
                : "text-gray-400 hover:text-white hover:bg-[#121215] border b order-transparent"
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
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all group relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-red-500"
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
  );
}