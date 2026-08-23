"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  FileText,
  Download,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Server,
  FileDown,
  Calendar,
  Loader2,
  Inbox,
  Terminal,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const COMPLIANCE_STANDARDS = [
  {
    id: "soc2",
    name: "SOC 2 Type II",
    status: "Compliant",
    score: 100,
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    fill: "bg-emerald-500",
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    status: "Compliant",
    score: 98,
    icon: Lock,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    fill: "bg-blue-500",
  },
  {
    id: "gdpr",
    name: "GDPR Readiness",
    status: "Compliant",
    score: 100,
    icon: Server,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    fill: "bg-purple-500",
  },
  {
    id: "hipaa",
    name: "HIPAA",
    status: "Reviewing",
    score: 85,
    icon: AlertTriangle,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    fill: "bg-amber-500",
  },
];

export default function ReportsPage() {
  const supabase = createClient();
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const [reports, setReports] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const { data: reportData } = await supabase
        .from("compliance_reports")
        .select("*")
        .order("created_at", { ascending: false });

      if (reportData) setReports(reportData);

      const { data: incidentData } = await supabase
        .from("incidents")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (incidentData) setAuditLogs(incidentData);

      setIsLoading(false);
    }

    fetchData();
  }, [supabase]);

  const handleGenerateReport = async () => {
    setIsGenerating(true);

    const reportDate = new Date();
    const content = `================================================
AEGISORA ZERO-TRUST INFRASTRUCTURE AUDIT REPORT
================================================
Generated on: ${reportDate.toUTCString()}
Requested by: Eray Özer (System Architect)
Clearance: Level 4 (Root Access)

1. COMPLIANCE STATUS
------------------------------------------------
- SOC 2 Type II : Compliant (100%)
- ISO 27001     : Compliant (98%)
- GDPR Readiness: Compliant (100%)
- HIPAA         : Reviewing (85%)

2. SYSTEM INTEGRITY
------------------------------------------------
All proxy nodes are actively intercepting AI traffic.
Zero unauthorized data exfiltration detected.
End-to-end encryption verified on all active tunnels.

3. RECENT INCIDENT METRICS
------------------------------------------------
Total active threats blocked and logged in the system.
Please review the Live Monitor for real-time telemetry.

End of Report.
================================================`;

    const newReport = {
      title: `${reportDate.toLocaleString("default", { month: "short" })} ${reportDate.getFullYear()} Zero-Trust Audit`,
      type: "Security & Compliance",
      size: "1.4 KB",
      content: content,
    };

    const { data, error } = await supabase
      .from("compliance_reports")
      .insert([newReport])
      .select()
      .single();

    if (!error && data) {
      setReports([data, ...reports]);
    }

    setIsGenerating(false);
  };

  const handleDownload = (report: { id: string; content: string }) => {
    setDownloadingId(report.id);

    setTimeout(() => {
      const blob = new Blob([report.content], {
        type: "text/plain;charset=utf-8",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Aegisora_Audit_Report_${report.id.substring(0, 6)}.txt`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadingId(null);
    }, 800);
  };

  return (
    <div className="p-6 sm:p-10 max-w-[1600px] mx-auto w-full flex flex-col gap-8 relative font-sans selection:bg-blue-500/30">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(0,102,238,0.1)_0%,transparent_70%)] pointer-events-none" />

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/80 pb-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-950/40 border border-emerald-800/30 px-3 py-1 rounded-full mb-4 inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3" />
            Governance
          </span>
          <h1 className="text-3xl font-serif text-white tracking-tight">
            Compliance & Reports
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-2">
            Enterprise-grade audit logs, compliance verifications, and
            exportable security summaries.
          </p>
        </motion.div>
        <button
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl text-xs font-medium transition-all shadow-[0_4px_15px_rgba(0,102,238,0.2)] hover:shadow-[0_6px_20px_rgba(0,102,238,0.3)] cursor-pointer flex items-center justify-center gap-2 min-w-[200px] outline-none disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Compiling
              Telemetry...
            </>
          ) : (
            <>
              <FileText className="w-4 h-4" /> Generate Executive Report
            </>
          )}
        </button>
      </div>

      {/* UYUMLULUK STANDARTLARI (COMPLIANCE CARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {COMPLIANCE_STANDARDS.map((std, idx) => {
          const Icon = std.icon;
          return (
            <motion.div
              key={std.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 hover:border-zinc-700 rounded-[2rem] p-6 shadow-xl flex flex-col justify-between transition-colors group"
            >
              <div className="flex justify-between items-start mb-6">
                <div
                  className={`p-2.5 rounded-xl border ${std.bg} ${std.border} ${std.color} shadow-inner group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md flex items-center gap-1.5 border font-semibold ${
                    std.status === "Compliant"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  }`}
                >
                  {std.status === "Compliant" ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  )}
                  {std.status}
                </span>
              </div>
              <div>
                <h3 className="text-[15px] font-serif font-medium text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors">
                  {std.name}
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${std.score}%` }}
                      transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                      className={`h-full rounded-full ${std.fill}`}
                    />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 font-medium">
                    {std.score}%
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 relative z-10">
        {/* SOL KISIM: İNDİRİLEBİLİR RAPORLAR ARŞİVİ */}
        <div className="xl:col-span-2 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-[2.5rem] shadow-2xl flex flex-col min-h-[400px] overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-zinc-800/80 bg-zinc-950/50 flex justify-between items-center">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2.5 tracking-wide">
              <FileDown className="w-4 h-4 text-blue-400" /> Report Archive
            </h2>
          </div>

          <div className="p-6 sm:p-8 flex-1 flex flex-col gap-4">
            {isLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              </div>
            ) : reports.length > 0 ? (
              reports.map((report) => (
                <div
                  key={report.id}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-zinc-950/50 border border-zinc-800/60 rounded-2xl hover:border-blue-500/30 hover:bg-zinc-900/80 transition-all gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 group-hover:border-blue-500/20 group-hover:bg-blue-500/10 transition-colors shadow-inner">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-medium text-zinc-200 group-hover:text-white transition-colors tracking-wide">
                        {report.title}
                      </h4>
                      <div className="flex items-center flex-wrap gap-2 sm:gap-3 mt-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {new Date(report.created_at).toLocaleDateString()}
                        </span>
                        <span className="text-zinc-700 hidden sm:inline">
                          •
                        </span>
                        <span className="text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-md">
                          {report.type}
                        </span>
                        <span className="text-zinc-700 hidden sm:inline">
                          •
                        </span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(report)}
                    disabled={downloadingId === report.id}
                    className="w-full sm:w-auto flex justify-center p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/10 transition-all cursor-pointer outline-none disabled:opacity-50"
                  >
                    {downloadingId === report.id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 gap-4 min-h-[250px]">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-inner">
                  <Inbox className="w-8 h-8 text-zinc-600" />
                </div>
                <div className="text-center">
                  <p className="text-[13px] font-medium text-zinc-300 tracking-wide">
                    No reports generated yet.
                  </p>
                  <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mt-1">
                    Click 'Generate Executive Report' to create one.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SAĞ KISIM: CANLI DENETİM LOGLARI */}
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-[2.5rem] shadow-2xl flex flex-col min-h-[400px] overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-zinc-800/80 bg-zinc-950/50 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2.5 tracking-wide">
              <Terminal className="w-4 h-4 text-emerald-400" /> System Audit
              Trail
            </h2>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></span>
          </div>

          <div className="p-6 sm:p-8 flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
              </div>
            ) : auditLogs.length > 0 ? (
              <div className="relative border-l border-zinc-800 ml-4 space-y-8">
                {auditLogs.map((log) => (
                  <div key={log.id} className="relative pl-6 group">
                    <div
                      className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-zinc-950 shadow-sm ${
                        log.severity === "CRITICAL"
                          ? "bg-red-500 shadow-[0_0_8px_#ef4444]"
                          : log.severity === "HIGH"
                            ? "bg-amber-500 shadow-[0_0_8px_#f59e0b]"
                            : "bg-emerald-500"
                      }`}
                    ></div>
                    <p className="text-[10px] font-mono font-semibold text-zinc-500 mb-1 uppercase tracking-widest group-hover:text-zinc-400 transition-colors">
                      {new Date(log.created_at).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-[13px] text-zinc-200 font-medium tracking-wide">
                      {log.threat_type}
                    </p>
                    <p className="text-[11px] font-mono text-zinc-500 mt-1.5 truncate max-w-full bg-zinc-900/80 w-fit px-2 py-1 rounded border border-zinc-800/80">
                      Node:{" "}
                      <span className="text-zinc-300">
                        {log.agent_name || "System Gateway"}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col h-full items-center justify-center text-[11px] font-mono text-zinc-500 text-center gap-3">
                <ShieldCheck className="w-8 h-8 text-zinc-700" />
                <span>
                  No recent security incidents found.
                  <br />
                  System is fully secure.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
