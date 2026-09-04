"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  Bot,
  CheckCircle2,
  FileCheck2,
  Gauge,
  GitBranch,
  History,
  LayoutDashboard,
  LockKeyhole,
  Network,
  Settings2,
  Shield,
  SlidersHorizontal,
  Users,
} from "lucide-react";

import { EnterpriseMark } from "./enterprise-mark";

const groups = [
  {
    title: "COMMAND",
    items: [
      ["Overview", "/dashboard/agents", LayoutDashboard],
      ["Live Activity", "/dashboard/activity", Activity],
    ],
  },
  {
    title: "GOVERN",
    items: [
      ["Agents", "/dashboard/agents", Bot],
      ["Policies", "/dashboard/policies", SlidersHorizontal],
      ["Approvals", "/dashboard/approvals", CheckCircle2],
    ],
  },
  {
    title: "SECURITY",
    items: [
      ["Decisions", "/dashboard/decisions", Shield],
      ["Enforcement", "/dashboard/enforcement", LockKeyhole],
      ["Risk", "/dashboard/risk", Gauge],
      ["Incidents", "/dashboard/incidents", AlertTriangle],
    ],
  },
  {
    title: "EVIDENCE",
    items: [
      ["Audit", "/dashboard/audit", History],
      ["Evidence", "/dashboard/evidence", FileCheck2],
      ["Traces", "/dashboard/traces", GitBranch],
    ],
  },
  {
    title: "PLATFORM",
    items: [
      ["Providers", "/dashboard/providers", Network],
    ],
  },
  {
    title: "ORGANIZATION",
    items: [
      ["Team", "/dashboard/team", Users],
      ["Settings", "/dashboard/settings", Settings2],
    ],
  },
] as const;

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="aegis-sidebar desktop-sidebar fixed inset-y-0 left-0 z-40 hidden w-[252px] flex-col lg:flex">
      <div className="flex h-[72px] items-center border-b border-[#1F2935] px-5">
        <EnterpriseMark />
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        {groups.map((group) => (
          <div key={group.title} className="mb-5">
            <div className="px-3 pb-2 text-[9px] font-semibold tracking-[0.2em] text-[#4F5B6B]">
              {group.title}
            </div>

            <div className="space-y-1">
              {group.items.map(([label, href, Icon]) => {
                const active =
                  pathname === href ||
                  (href !== "/dashboard/agents" &&
                    pathname.startsWith(href));

                return (
                  <Link
                    key={href}
                    href={href}
                    className={[
                      "group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition",
                      active
                        ? "bg-white/[0.065] text-white"
                        : "text-[#8995A3] hover:bg-white/[0.035] hover:text-white",
                    ].join(" ")}
                  >
                    <Icon
                      size={16}
                      className={
                        active
                          ? "text-[#6E96FF]"
                          : "text-[#657181]"
                      }
                    />

                    <span>{label}</span>

                    {active && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#4C7DFF]" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#1F2935] p-3">
        <div className="rounded-xl border border-[#1F2935] bg-white/[0.02] p-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#35B98B]" />
            <span className="text-[10px] text-[#AAB5C2]">
              Security posture healthy
            </span>
          </div>

          <div className="mt-2 font-mono text-[9px] text-[#566273]">
            DEMO WORKSPACE
          </div>
        </div>
      </div>
    </aside>
  );
}