"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { PieChart, Download, Calendar, Filter } from "lucide-react";

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeTab = pathname.includes("usage") ? "usage" : "threat-trends";

  return (
    <div className="h-[calc(100vh-48px)] flex flex-col pt-8 sm:pt-10 px-4 sm:px-8 w-full relative justify-between bg-background text-foreground overflow-y-auto cf-scrollbar">
      <div className="w-full max-w-7xl mx-auto flex flex-col flex-1 relative z-10 pb-12">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <PieChart className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-[11px] font-mono uppercase tracking-widest font-semibold text-foreground">Observability</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Risk Analytics</h1>
            <p className="text-[13px] text-muted-foreground mt-2 max-w-2xl">
              High-level threat intelligence, policy effectiveness, and token usage telemetry across your AI fleet.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-[#18181b] border border-border hover:bg-[#27272a] px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors outline-none cursor-pointer">
              <Download className="w-3.5 h-3.5" /> Export PDF
            </button>
            <button className="flex items-center gap-2 bg-[#18181b] border border-border hover:bg-[#27272a] px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors outline-none cursor-pointer">
              <Calendar className="w-3.5 h-3.5" /> Last 30 Days
            </button>
          </div>
        </div>

        {/* CLOUDFLARE TABS */}
        <div className="flex items-center gap-6 border-b border-border/50 mb-6">
          <Link
            href="/dashboard/reports/threat-trends"
            className={`pb-3 text-[13px] font-medium transition-colors relative outline-none cursor-pointer ${activeTab === 'threat-trends' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Threat Trends
            {activeTab === 'threat-trends' && <motion.div layoutId="reports-tab" className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary" />}
          </Link>
          <Link
            href="/dashboard/reports/usage"
            className={`pb-3 text-[13px] font-medium transition-colors relative outline-none cursor-pointer ${activeTab === 'usage' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Usage & Resources
            {activeTab === 'usage' && <motion.div layoutId="reports-tab" className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary" />}
          </Link>
        </div>

        {/* RENDERED CHILD PAGES */}
        {children}

      </div>
    </div>
  );
}
