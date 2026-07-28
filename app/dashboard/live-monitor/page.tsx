"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mic,
  Zap,
  ShieldCheck,
  Activity,
  TerminalSquare,
  AlertTriangle,
  PlayCircle,
} from "lucide-react";

export default function LiveMonitorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL'den gelen agent bilgilerini oku
  const connectedAgentId = searchParams.get("agentId");
  const connectedAgentName = searchParams.get("name") || "Unknown Agent";

  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState<
    { sender: string; time: string; text: string }[]
  >([]);
  const [traceLogs, setTraceLogs] = useState<string[]>([]);

  const transcriptRef = useRef<HTMLDivElement>(null);
  const traceRef = useRef<HTMLDivElement>(null);

  // Ekranda yeni veri geldikçe aşağı kaydırma
  useEffect(() => {
    transcriptRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    traceRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [traceLogs]);

  // Canlı Yayın Simülasyonunu Başlat
  useEffect(() => {
    // SADECE URL'de AgentId varsa canlı yayına geç
    if (connectedAgentId) {
      setIsStreaming(true);

      // Simülasyon Senaryosu: Yavaş yavaş akan loglar
      const timeout1 = setTimeout(
        () =>
          setTraceLogs((prev) => [
            ...prev,
            "> Initializing zero-trust proxy wrapper...",
          ]),
        500,
      );
      const timeout2 = setTimeout(
        () =>
          setTraceLogs((prev) => [
            ...prev,
            "> Establishing secure wss:// connection...",
          ]),
        1500,
      );
      const timeout3 = setTimeout(() => {
        setTraceLogs((prev) => [
          ...prev,
          "> Connected to agent: " + connectedAgentId,
        ]);
        setMessages([
          {
            sender: "AI Agent",
            time: "00:01",
            text: `Hello, this is ${connectedAgentName}. How can I assist you today?`,
          },
        ]);
      }, 2500);

      const timeout4 = setTimeout(
        () =>
          setMessages((prev) => [
            ...prev,
            {
              sender: "Client",
              time: "00:05",
              text: "I need to check the billing cycle for my enterprise account. I think there is an error.",
            },
          ]),
        5000,
      );
      const timeout5 = setTimeout(
        () =>
          setTraceLogs((prev) => [
            ...prev,
            "> Intent recognized: BILLING_INQUIRY",
          ]),
        5500,
      );
      const timeout6 = setTimeout(
        () =>
          setTraceLogs((prev) => [
            ...prev,
            "> Querying CRM Database (PostgreSQL)...",
          ]),
        6500,
      );
      const timeout7 = setTimeout(
        () =>
          setMessages((prev) => [
            ...prev,
            {
              sender: "AI Agent",
              time: "00:08",
              text: "I can help with that. Could you please provide your Company ID or the email associated with the account?",
            },
          ]),
        8000,
      );

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
        clearTimeout(timeout4);
        clearTimeout(timeout5);
        clearTimeout(timeout6);
        clearTimeout(timeout7);
      };
    } else {
      setIsStreaming(false);
      setMessages([]);
      setTraceLogs([]);
    }
  }, [connectedAgentId, connectedAgentName]);

  const handleEndSession = () => {
    setIsStreaming(false);
    router.push("/dashboard/agents"); // Geri dön
  };

  // BAĞLANTI YOKSA (Boş Ekran)
  if (!connectedAgentId) {
    return (
      <div className="p-6 sm:p-10 max-w-[1600px] mx-auto w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-[#121215] border border-gray-800 flex items-center justify-center mb-6">
          <Activity className="w-8 h-8 text-gray-500" />
        </div>
        <h2 className="text-2xl font-serif text-white mb-2">
          No Active Stream
        </h2>
        <p className="text-sm font-mono text-gray-500 mb-8 text-center max-w-md">
          The Live Monitor requires an active agent connection to display
          telemetry. Go to the Agent Fleet to start a stream.
        </p>
        <button
          onClick={() => router.push("/dashboard/agents")}
          className="flex items-center gap-2 bg-[#0066EE] hover:bg-[#005bb5] text-white px-6 py-3 rounded-xl text-xs font-medium transition-colors cursor-pointer"
        >
          <PlayCircle className="w-4 h-4" /> Select Agent to Monitor
        </button>
      </div>
    );
  }

  // BAĞLANTI VARSA (Canlı İzleme Ekranı)
  return (
    <div className="p-6 sm:p-10 max-w-[1600px] mx-auto w-full flex flex-col gap-6">
      {/* ÜST DURUM BARI */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-[#121215] border border-emerald-500/30 flex items-center justify-center text-emerald-400 z-10 relative">
              <Mic className="w-5 h-5" />
            </div>
            <div className="absolute inset-0 rounded-full border border-emerald-500/50 animate-ping"></div>
          </div>
          <div>
            <h1 className="text-xl font-serif text-white tracking-tight flex items-center gap-3">
              Session: {connectedAgentId}
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">
                Live Stream
              </span>
            </h1>
            <p className="text-xs font-mono text-gray-400 mt-1">
              Model: Aegisora Interceptor • Target: {connectedAgentName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleEndSession}
            className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 text-xs font-medium hover:bg-[#121215] hover:text-white transition-colors cursor-pointer"
          >
            End Session
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors cursor-pointer">
            <AlertTriangle className="w-4 h-4" /> Barge-In (Take Over)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SOL: TRANSCRIPT */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#121215] border border-gray-800/80 rounded-2xl flex flex-col shadow-xl min-h-[400px]">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-[#19191d]/30">
              <h3 className="text-sm font-medium text-white flex items-center gap-2">
                <TerminalSquare className="w-4 h-4 text-gray-500" /> Live
                Transcript
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[11px] font-mono text-gray-500">
                  Recording
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === "Client" ? "items-start" : "items-end"}`}
                >
                  <span className="text-[10px] font-mono text-gray-500 mb-1">
                    {msg.sender} • {msg.time}
                  </span>
                  <div
                    className={`px-5 py-3 rounded-2xl text-[13px] max-w-[80%] leading-relaxed ${msg.sender === "Client" ? "bg-[#19191d] border border-gray-700/50 text-gray-200 rounded-tl-sm" : "bg-[#0066EE]/10 border border-[#0066EE]/20 text-[#0066EE] rounded-tr-sm"}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isStreaming && messages.length > 0 && messages.length < 3 && (
                <div className="flex items-end justify-end mt-4">
                  <div className="flex gap-1 bg-[#0066EE]/10 px-4 py-3 rounded-2xl rounded-tr-sm">
                    <div className="w-1.5 h-1.5 bg-[#0066EE] rounded-full animate-bounce"></div>
                    <div
                      className="w-1.5 h-1.5 bg-[#0066EE] rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 bg-[#0066EE] rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              )}
              <div ref={transcriptRef} />
            </div>
          </div>
        </div>

        {/* SAĞ: TELEMETRY VE RAG TRACE */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-center">
            <h3 className="text-sm font-medium text-white flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-[#0066EE]" /> Sentiment & Tone
              Analysis
            </h3>
            <div className="flex justify-between text-[11px] font-mono mb-2">
              <span className="text-gray-400">Current Mood</span>
              <span className="text-emerald-400">Positive</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[85%] transition-all duration-1000"></div>
            </div>
          </div>

          <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 shadow-xl flex flex-col h-[280px]">
            <h3 className="text-sm font-medium text-white flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-[#0066EE]" /> Live RAG / Reasoning
              Trace
            </h3>
            <div className="flex-1 bg-[#0a0a0c] border border-gray-800 rounded-xl p-4 overflow-y-auto font-mono text-[11px] text-gray-400 leading-relaxed space-y-2">
              {traceLogs.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-[#0066EE]">{">"}</span>
                  <span className="text-gray-300">{log.replace("> ", "")}</span>
                </div>
              ))}
              {isStreaming && (
                <div className="w-2 h-3 bg-gray-500 animate-pulse mt-1"></div>
              )}
              <div ref={traceRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
