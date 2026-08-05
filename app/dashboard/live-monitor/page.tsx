"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mic,
  Zap,
  ShieldCheck,
  Activity,
  TerminalSquare,
  AlertTriangle,
  PlayCircle,
  Loader2,
  Server,
  ShieldAlert,
  Cpu,
  Sliders,
  ChevronRight,
} from "lucide-react";

function LiveMonitorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const connectedAgentId =
    searchParams.get("agentId") || "ag_enterprise_prod_09";
  const connectedAgentName =
    searchParams.get("name") || "Aegisora Guard Core v4.2";

  const [isStreaming, setIsStreaming] = useState(true);

  // Canlı Akan Ağ İşlemleri ve Loglar
  const [messages, setMessages] = useState<
    { sender: string; time: string; text: string; status: string }[]
  >([
    {
      sender: "System Proxy",
      time: "00:01",
      text: "Zero-trust secure gateway intercepting connection wss://",
      status: "SECURE",
    },
    {
      sender: "AI Agent",
      time: "00:02",
      text: "Executing tool call: query_customer_database(workspace_id=904)",
      status: "ENFORCED",
    },
    {
      sender: "Client",
      time: "00:04",
      text: "Fetch financial report for Q2 compliance review.",
      status: "VERIFIED",
    },
  ]);

  const [traceLogs, setTraceLogs] = useState<string[]>([
    "> Initializing zero-trust proxy wrapper v4...",
    "> Establishing TLS 1.3 encrypted tunnel...",
    `> Connected to target agent: ${connectedAgentId}`,
    "> Token bucket rate limiter: OK (240 req/sec)",
    "> PII Redaction Filter: Active (SSN & Credit Card masking enabled)",
    "> Prompt injection neural firewall: ONLINE",
  ]);

  const transcriptRef = useRef<HTMLDivElement>(null);
  const traceRef = useRef<HTMLDivElement>(null);

  // DEMO İÇİN SÜREKLİ AKAN LOG VE TELEMETRİ SİMÜLASYONU
  useEffect(() => {
    const logTicker = setInterval(() => {
      const mockTraces = [
        "> Intercepted tool call: SQL_EXECUTE (PostgreSQL Cluster)",
        "> Verifying cryptographic JWT signature... Valid.",
        "> Anomaly score calculated: 0.014 (Normal behavior)",
        "> RAG vector search similarity match: 0.96 (High confidence)",
        "> Zero-trust policy evaluation: PASSED without exceptions",
        "> Redacted 2 potential PII tokens in output stream",
        "> Firewall check: No prompt injection vectors detected",
      ];
      const randomTrace =
        mockTraces[Math.floor(Math.random() * mockTraces.length)];
      setTraceLogs((prev) => [...prev, randomTrace]);
    }, 3000);

    const msgTicker = setInterval(() => {
      const mockItems = [
        {
          sender: "AI Agent",
          text: "Processing secure transaction payload through guardrails...",
          status: "SECURE",
        },
        {
          sender: "System Proxy",
          text: "Inspected token response structure. Zero leakage found.",
          status: "OPTIMAL",
        },
        {
          sender: "Client",
          text: "Confirming state synchronization across cluster nodes.",
          status: "VERIFIED",
        },
        {
          sender: "System Proxy",
          text: "Action flagged for near-threshold limits. Routing to Human Review.",
          status: "ESCALATE",
        },
      ];
      const nextItem = mockItems[Math.floor(Math.random() * mockItems.length)];
      const timeStr = `00:${Math.floor(Math.random() * 50 + 10)}`;
      setMessages((prev) => [
        ...prev,
        {
          sender: nextItem.sender,
          time: timeStr,
          text: nextItem.text,
          status: nextItem.status,
        },
      ]);
    }, 5500);

    return () => {
      clearInterval(logTicker);
      clearInterval(msgTicker);
    };
  }, []);

  useEffect(() => {
    transcriptRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    traceRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [traceLogs]);

  const handleEndSession = () => {
    setIsStreaming(false);
    router.push("/dashboard/agents");
  };

  return (
    <div className="p-6 sm:p-10 max-w-[1600px] mx-auto w-full flex flex-col gap-6 font-sans">
      {/* ÜST BİLGİ VE KONTROL PANELİ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-[#121215] border border-emerald-500/40 flex items-center justify-center text-emerald-400 z-10 relative shadow-lg shadow-emerald-500/10">
              <Server className="w-5 h-5" />
            </div>
            <div className="absolute inset-0 rounded-full border border-emerald-500/50 animate-ping"></div>
          </div>
          <div>
            <h1 className="text-xl font-serif text-white tracking-tight flex items-center gap-3">
              Session: {connectedAgentId}
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-wider">
                Live Proxy Active
              </span>
            </h1>
            <p className="text-xs font-mono text-gray-400 mt-1">
              Interceptor: Aegisora Core • Target: {connectedAgentName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleEndSession}
            className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 text-xs font-medium hover:bg-[#121215] hover:text-white transition-colors cursor-pointer outline-none"
          >
            End Session
          </button>
          <button
            onClick={() => router.push("/dashboard/risk-center")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors cursor-pointer outline-none"
          >
            <AlertTriangle className="w-4 h-4" /> Emergency Kill-Switch
          </button>
        </div>
      </div>

      {/* ANA GRID ALANI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SOL 2 KOLON: CANLI AKIŞ VE İŞLEMLER */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#121215] border border-gray-800/80 rounded-2xl flex flex-col shadow-2xl min-h-[460px]">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-[#19191d]/40">
              <h3 className="text-sm font-medium text-white flex items-center gap-2">
                <TerminalSquare className="w-4 h-4 text-[#0066EE]" /> Live
                Telemetry & Interceptor Stream
              </h3>
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard/ai-chat"
                  className="text-[11px] font-mono text-blue-400 hover:underline flex items-center gap-1 outline-none"
                >
                  <Zap className="w-3 h-3" /> Analyze in AI Core
                </Link>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[11px] font-mono text-emerald-400">
                    Zero-Latency Proxy
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[420px]">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex flex-col ${msg.sender === "Client" ? "items-start" : "items-end"}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-gray-500">
                      {msg.sender} • {msg.time}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                        msg.status === "ESCALATE"
                          ? "bg-orange-500/10 text-orange-400 border-orange-500/30"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      }`}
                    >
                      {msg.status}
                    </span>
                  </div>
                  <div
                    className={`px-5 py-3 rounded-2xl text-[13px] max-w-[85%] leading-relaxed font-mono ${
                      msg.sender === "Client"
                        ? "bg-[#19191d] border border-gray-700/50 text-gray-200 rounded-tl-sm"
                        : msg.status === "ESCALATE"
                          ? "bg-orange-500/10 border border-orange-500/30 text-orange-300 rounded-tr-sm"
                          : "bg-[#0066EE]/10 border border-[#0066EE]/30 text-blue-300 rounded-tr-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={transcriptRef} />
            </div>
          </div>
        </div>

        {/* SAĞ 1 KOLON: GÜVENLİK SKORU VE RAG REASONING TRACE */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 shadow-2xl flex flex-col justify-center">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Security
                Health & Firewall
              </h3>
              <Link
                href="/dashboard/risk-center"
                className="text-[11px] font-mono text-[#0066EE] hover:underline flex items-center outline-none"
              >
                Policies <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="flex justify-between text-[11px] font-mono mb-2">
              <span className="text-gray-400">Proxy Shield Status</span>
              <span className="text-emerald-400 font-semibold">
                100% Protected
              </span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-emerald-500 w-full animate-pulse"></div>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-gray-500">
              <span>Blocked Threats: 0</span>
              <span>Latency: 4ms</span>
            </div>
          </div>

          <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 shadow-2xl flex flex-col h-[340px]">
            <h3 className="text-sm font-medium text-white flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-[#0066EE]" /> Live RAG / Reasoning
              Trace
            </h3>
            <div className="flex-1 bg-[#0a0a0c] border border-gray-800 rounded-xl p-4 overflow-y-auto font-mono text-[11px] text-gray-400 leading-relaxed space-y-2 shadow-inner">
              {traceLogs.map((log, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <span className="text-[#0066EE] font-bold">{">"}</span>
                  <span className="text-gray-300">{log.replace("> ", "")}</span>
                </div>
              ))}
              <div className="w-2 h-3 bg-[#0066EE] animate-pulse mt-1"></div>
              <div ref={traceRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LiveMonitorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin text-[#0066EE]" />
        </div>
      }
    >
      <LiveMonitorContent />
    </Suspense>
  );
}
