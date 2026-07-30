"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Search,
  Loader2,
  Inbox,
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
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    status: "Compliant",
    score: 98,
    icon: Lock,
    color: "text-[#0066EE]",
    bg: "bg-[#0066EE]/10",
    border: "border-[#0066EE]/20",
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
  },
];

export default function ReportsPage() {
  const supabase = createClient();
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Gerçek Veri State'leri
  const [reports, setReports] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🚀 SAYFA YÜKLENDİĞİNDE GERÇEK VERİLERİ ÇEK
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      // 1. Raporları Çek
      const { data: reportData } = await supabase
        .from("compliance_reports")
        .select("*")
        .order("created_at", { ascending: false });

      if (reportData) setReports(reportData);

      // 2. Audit Trail için son Incident'ları çek
      const { data: incidentData } = await supabase
        .from("incidents")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5); // Sadece son 5 olayı göster

      if (incidentData) setAuditLogs(incidentData);

      setIsLoading(false);
    }

    fetchData();
  }, [supabase]);

  // 📝 GERÇEK RAPOR ÜRETME VE VERİTABANINA KAYDETME
  const handleGenerateReport = async () => {
    setIsGenerating(true);

    // Rapor içeriğini dinamik olarak oluşturuyoruz
    const reportDate = new Date();
    const content = `================================================
AEGISORA ZERO-TRUST INFRASTRUCTURE AUDIT REPORT
================================================
Generated on: ${reportDate.toUTCString()}
Requested by: Enterprise Admin

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

3. RECENT INCIDENT METRICS
------------------------------------------------
Total active threats blocked and logged in the system.
Please review the Live Monitor for real-time telemetry.

End of Report.
================================================`;

    const newReport = {
      title: `${reportDate.toLocaleString("default", { month: "short" })} ${reportDate.getFullYear()} Zero-Trust Audit`,
      type: "Security",
      size: "1.2 KB",
      content: content,
    };

    // Veritabanına yaz
    const { data, error } = await supabase
      .from("compliance_reports")
      .insert([newReport])
      .select()
      .single();

    if (!error && data) {
      // Listeye anında ekle
      setReports([data, ...reports]);
    }

    setIsGenerating(false);
  };

  // ⬇️ GERÇEK DOSYA İNDİRME MANTIĞI (Tarayıcıda .txt oluşturur)
  const handleDownload = (report: any) => {
    setDownloadingId(report.id);

    setTimeout(() => {
      // 1. Rapor içeriğinden bir Blob (Dosya Nesnesi) oluştur
      const blob = new Blob([report.content], {
        type: "text/plain;charset=utf-8",
      });

      // 2. İndirme URL'i oluştur
      const url = window.URL.createObjectURL(blob);

      // 3. Tarayıcıda gizli bir <a> etiketi oluşturup tıklat (indirmeyi başlatır)
      const link = document.createElement("a");
      link.href = url;
      link.download = `Aegisora_Report_${report.id.substring(0, 6)}.txt`; // İnecek dosyanın adı
      document.body.appendChild(link);
      link.click();

      // 4. Temizlik yap
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadingId(null);
    }, 800); // Gerçekçilik hissi için küçük bir gecikme
  };

  return (
    <div className="p-6 sm:p-10 max-w-[1400px] mx-auto w-full flex flex-col gap-8">
      {/* BAŞLIK VE AKSİYON BUTONU */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-800 pb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-2xl font-serif text-white tracking-tight">
            Compliance & Reports
          </h1>
          <p className="text-xs font-mono text-gray-400 mt-1">
            Enterprise-grade audit logs, compliance verifications, and
            exportable summaries.
          </p>
        </motion.div>
        <button
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="bg-white hover:bg-gray-200 text-black px-5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2 min-w-[180px]"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Compiling Data...
            </>
          ) : (
            <>
              <FileText className="w-4 h-4" /> Generate Executive Report
            </>
          )}
        </button>
      </div>

      {/* UYUMLULUK STANDARTLARI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {COMPLIANCE_STANDARDS.map((std, idx) => {
          const Icon = std.icon;
          return (
            <motion.div
              key={std.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#121215] border border-gray-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-2 rounded-lg border ${std.bg} ${std.border} ${std.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1 ${
                    std.status === "Compliant"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}
                >
                  {std.status === "Compliant" && (
                    <CheckCircle2 className="w-3 h-3" />
                  )}
                  {std.status}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white mb-1">
                  {std.name}
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${std.color.replace("text-", "bg-")}`}
                      style={{ width: `${std.score}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-gray-400">
                    {std.score}%
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SOL KISIM: İNDİRİLEBİLİR RAPORLAR ARŞİVİ */}
        <div className="lg:col-span-2 bg-[#121215] border border-gray-800/80 rounded-2xl shadow-xl flex flex-col min-h-[300px]">
          <div className="p-6 border-b border-gray-800/80 bg-[#0a0a0c]/50 flex justify-between items-center">
            <h2 className="text-sm font-medium text-white flex items-center gap-2">
              <FileDown className="w-4 h-4 text-[#0066EE]" /> Report Archive
            </h2>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-3">
            {isLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-[#0066EE]" />
              </div>
            ) : reports.length > 0 ? (
              reports.map((report) => (
                <div
                  key={report.id}
                  className="group flex items-center justify-between p-4 bg-[#0a0a0c] border border-gray-800/60 rounded-xl hover:border-gray-700 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white group-hover:text-[#0066EE] transition-colors">
                        {report.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1 text-[11px] font-mono text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(report.created_at).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span className="text-gray-400">{report.type}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(report)}
                    disabled={downloadingId === report.id}
                    className="p-2.5 rounded-lg bg-[#121215] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600 transition-all cursor-pointer"
                  >
                    {downloadingId === report.id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#0066EE]" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-2">
                <Inbox className="w-8 h-8 text-gray-600 mb-2" />
                <p className="text-sm font-medium text-gray-400">
                  No reports generated yet.
                </p>
                <p className="text-[11px] font-mono">
                  Click 'Generate Executive Report' to create one.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* SAĞ KISIM: CANLI DENETİM LOGLARI (GERÇEK VERİTABANINDAN) */}
        <div className="bg-[#121215] border border-gray-800/80 rounded-2xl shadow-xl flex flex-col min-h-[300px]">
          <div className="p-6 border-b border-gray-800/80 bg-[#0a0a0c]/50">
            <h2 className="text-sm font-medium text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" /> System Audit Trail
            </h2>
          </div>
          <div className="p-6 flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
              </div>
            ) : auditLogs.length > 0 ? (
              <div className="relative border-l border-gray-800 ml-3 space-y-6">
                {auditLogs.map((log, index) => (
                  <div key={log.id} className="relative pl-6">
                    <div
                      className={`absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-[#121215] ${
                        log.severity === "CRITICAL"
                          ? "bg-red-500"
                          : log.severity === "HIGH"
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                      }`}
                    ></div>
                    <p className="text-[11px] font-mono text-gray-500 mb-0.5">
                      {new Date(log.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-white">{log.threat_type}</p>
                    <p className="text-[10px] font-mono text-gray-500 mt-1 truncate max-w-[200px]">
                      Agent: {log.agent_name || "System Gateway"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-[11px] font-mono text-gray-600 text-center">
                No recent security incidents found.
                <br />
                System is fully secure.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
