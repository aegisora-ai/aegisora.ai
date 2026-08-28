"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { PlayCircle, Download, Pause, RefreshCw } from "lucide-react";

export default function LiveMonitorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeTab = pathname.includes("telemetry") ? "telemetry" : "executions";

  return (
    <div className="h-[calc(100vh-48px)] flex flex-col pt-8 sm:pt-10 px-4 sm:px-8 w-full relative justify-between bg-background text-foreground overflow-y-auto cf-scrollbar">
      <div className="w-full max-w-7xl mx-auto flex flex-col flex-1 relative z-10 pb-12">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <PlayCircle className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-[11px] font-mono uppercase tracking-widest font-semibold text-foreground">Build</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-3">
              Live Traces & Telemetry
              <span className="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
              </span>
            </h1>
            <p className="text-[13px] text-muted-foreground mt-2 max-w-2xl">
              Inspect real-time agent executions, API requests, payload traces, and system performance metrics.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-[#18181b] border border-border hover:bg-[#27272a] px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors outline-none cursor-pointer">
              <Download className="w-3.5 h-3.5" /> Export Logs
            </button>
            <button className="flex items-center gap-2 bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors outline-none cursor-pointer shadow-sm">
              <Pause className="w-3.5 h-3.5" /> Pause Stream
            </button>
          </div>
        </div>

        {/* CLOUDFLARE TABS */}
        <div className="flex items-center gap-6 border-b border-border/50 mb-6">
          <Link
            href="/dashboard/live-monitor/executions"
            className={`pb-3 text-[13px] font-medium transition-colors relative outline-none cursor-pointer ${activeTab === 'executions' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Executions
            {activeTab === 'executions' && <motion.div layoutId="monitor-tab" className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary" />}
          </Link>
          <Link
            href="/dashboard/live-monitor/telemetry"
            className={`pb-3 text-[13px] font-medium transition-colors relative outline-none cursor-pointer ${activeTab === 'telemetry' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            System Telemetry
            {activeTab === 'telemetry' && <motion.div layoutId="monitor-tab" className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary" />}
          </Link>
        </div>

        {/* RENDERED CHILD PAGES */}
        {children}

      </div>
    </div>
  );
}
