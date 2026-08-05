"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  MessageSquare,
  Settings,
  PanelLeftClose,
  PanelLeft,
  ArrowUp,
  Trash2,
  X,
  BarChart3,
  Maximize2,
  Download,
  Globe,
  Check,
  ShieldAlert,
  Layers,
  ChevronRight,
  Terminal,
  Activity,
} from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const AegisoraSpark = ({
  className = "w-5 h-5 text-blue-400",
  isThinking = false,
}) => {
  return (
    <motion.div
      animate={
        isThinking
          ? { rotate: [0, 180, 360], scale: [1, 1.15, 1] }
          : { rotate: 0, scale: 1 }
      }
      transition={
        isThinking
          ? { duration: 2, ease: "linear", repeat: Infinity }
          : { duration: 0.3 }
      }
      className={`flex-shrink-0 ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.25 1.5L12.75 1.5L12.75 9L19.5 4.5L20.25 5.5L14.25 10.5L22.5 11.25L22.5 12.75L14.25 13.5L20.25 18.5L19.5 19.5L12.75 15L12.75 22.5L11.25 22.5L11.25 15L4.5 19.5L3.75 18.5L9.75 13.5L1.5 12.75L1.5 11.25L9.75 10.5L3.75 5.5L4.5 4.5L11.25 9L11.25 1.5Z" />
      </svg>
    </motion.div>
  );
};

const MOCK_CHART_DATA = [
  { date: "Feb 01", requests: 1200, anomalies: 2, riskScore: 1.2 },
  { date: "Feb 02", requests: 3400, anomalies: 14, riskScore: 4.8 },
  { date: "Feb 03", requests: 2800, anomalies: 5, riskScore: 2.1 },
  { date: "Feb 04", requests: 5100, anomalies: 22, riskScore: 7.5 },
  { date: "Feb 05", requests: 4600, anomalies: 8, riskScore: 3.0 },
];

const LANGUAGES = [
  { code: "en", name: "English (US)", flag: "🇺🇸" },
  { code: "de", name: "Deutsch (German)", flag: "🇩🇪" },
  { code: "es", name: "Español (Spanish)", flag: "🇪🇸" },
  { code: "fr", name: "Français (French)", flag: "🇫🇷" },
  { code: "tr", name: "Türkçe (Turkish)", flag: "🇹🇷" },
  { code: "ja", name: "日本語 (Japanese)", flag: "🇯🇵" },
];

interface Message {
  role: "user" | "ai";
  content: string;
  image?: string;
  options?: string[];
  showCanvas?: boolean;
  isThinking?: boolean;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}

export default function AiChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const [canvasData, setCanvasData] = useState({ title: "", description: "" });
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [sessions, activeSessionId]);

  const activeSession = sessions.find((s) => s.id === activeSessionId);
  const messages = activeSession ? activeSession.messages : [];

  const handleNewAnalysis = () => {
    const newId = Date.now().toString();
    const newSession: ChatSession = {
      id: newId,
      title: "New Security Analysis",
      messages: [],
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newId);
    setInput("");
    setSelectedImage(null);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleDeleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (activeSessionId === id) {
      setActiveSessionId(null);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const queryText = textToSend || input;
    if (!queryText.trim() && !selectedImage) return;

    let currentId = activeSessionId;
    const currentImg = selectedImage;

    setInput("");
    setSelectedImage(null);

    let updatedSessions = [...sessions];
    let targetSession = updatedSessions.find((s) => s.id === currentId);

    if (!targetSession) {
      const newId = Date.now().toString();
      const title =
        queryText.length > 28 ? queryText.substring(0, 28) + "..." : queryText;
      targetSession = {
        id: newId,
        title: title,
        messages: [],
      };
      updatedSessions = [targetSession, ...updatedSessions];
      currentId = newId;
      setActiveSessionId(newId);
    }

    const newMessages: Message[] = [
      ...targetSession.messages,
      { role: "user", content: queryText, image: currentImg || undefined },
      { role: "ai", content: "", isThinking: true },
    ];

    targetSession.messages = newMessages;
    setSessions(updatedSessions);

    if (window.innerWidth < 768) setIsSidebarOpen(false);

    const isChartRequest =
      queryText.toLowerCase().includes("grafik") ||
      queryText.toLowerCase().includes("chart") ||
      queryText.toLowerCase().includes("rapor") ||
      queryText.toLowerCase().includes("bar chart") ||
      queryText.toLowerCase().includes("istatistik") ||
      queryText.toLowerCase().includes("analyze");

    try {
      const apiMessages = newMessages
        .filter((m) => !m.isThinking)
        .map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.content,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "API error");

      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === currentId) {
            const msgs = [...s.messages];
            const lastMsg = msgs[msgs.length - 1];
            if (lastMsg) {
              lastMsg.isThinking = false;
              lastMsg.content = data.result;
              lastMsg.options = data.options;
              lastMsg.showCanvas = isChartRequest;
            }
            return { ...s, messages: msgs };
          }
          return s;
        }),
      );

      if (isChartRequest) {
        setCanvasData({
          title: "Enterprise Agent Telemetry & Analytics Canvas",
          description: queryText,
        });
        setTimeout(() => setIsCanvasOpen(true), 600);
      }
    } catch (err: any) {
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === currentId) {
            const msgs = [...s.messages];
            const lastMsg = msgs[msgs.length - 1];
            if (lastMsg) {
              lastMsg.isThinking = false;
              lastMsg.content = `[ERROR] Intelligence Core Communication Failure: ${err.message}`;
            }
            return { ...s, messages: msgs };
          }
          return s;
        }),
      );
    }
  };

  const handleExportPDF = () => {
    setIsLangModalOpen(false);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="flex h-[100dvh] w-full bg-zinc-950 text-white overflow-hidden font-sans relative selection:bg-blue-500/30">
      <style jsx global>{`
        @media print {
          @page {
            size: landscape;
            margin: 10mm;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          body {
            background-color: #09090b !important;
          }
          body * {
            visibility: hidden;
          }
          #printable-canvas,
          #printable-canvas * {
            visibility: visible;
          }
          #printable-canvas {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            height: 100% !important;
            background-color: #09090b !important;
            color: white !important;
            padding: 20px !important;
            overflow: visible !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* MOBİL KARARTMA PERDESİ */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* DİNAMİK YAN MENÜ */}
      <div
        className={`fixed md:relative inset-y-0 left-0 z-50 h-full bg-zinc-950/50 backdrop-blur-xl border-r border-zinc-800/80 shrink-0 transition-all duration-300 ease-in-out
          ${
            isSidebarOpen
              ? "translate-x-0 w-[280px]"
              : "-translate-x-full md:translate-x-0 md:w-0 md:border-none overflow-hidden"
          }
        `}
      >
        <div className="w-[280px] h-full flex flex-col relative z-10">
          <div className="p-5 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-1 outline-none group"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-inner shrink-0 group-hover:bg-blue-500/20 transition-colors">
                  <AegisoraSpark className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-white font-serif text-lg tracking-tight truncate">
                  Aegisora
                </span>
              </Link>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden p-1.5 text-zinc-500 hover:text-white shrink-0 outline-none transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={handleNewAnalysis}
              className="w-full flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-[14px] transition-all shadow-[0_4px_15px_rgba(0,102,238,0.2)] hover:shadow-[0_6px_20px_rgba(0,102,238,0.3)] text-xs font-semibold tracking-wide group cursor-pointer outline-none"
            >
              <Plus className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-300 shrink-0" />
              <span className="truncate">New Analysis</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
            <p className="text-[9px] text-zinc-500 font-mono font-semibold uppercase tracking-[0.25em] px-4 pt-2 pb-3 shrink-0">
              Recent Queries
            </p>
            {sessions.length === 0 ? (
              <div className="px-4 py-4 text-xs font-mono text-zinc-600 italic">
                No active queries. Initiate a new session.
              </div>
            ) : (
              sessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => {
                    setActiveSessionId(session.id);
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-left group cursor-pointer border ${
                    activeSessionId === session.id
                      ? "bg-zinc-800/80 text-white border-zinc-700/80 shadow-sm"
                      : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate pr-2">
                    <Terminal
                      className={`w-3.5 h-3.5 shrink-0 ${activeSessionId === session.id ? "text-blue-400" : "text-zinc-600 group-hover:text-blue-400/70"} transition-colors`}
                    />
                    <span className="text-[12.5px] truncate font-medium">
                      {session.title}
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleDeleteSession(e, session.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-zinc-500 hover:text-red-400 transition-all shrink-0 outline-none rounded-md hover:bg-red-400/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-zinc-800/80 bg-zinc-950/80 shrink-0">
            <div className="flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-800/60 rounded-[14px] transition-colors cursor-pointer border border-transparent hover:border-zinc-700/50">
              <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 font-bold text-xs shadow-sm shrink-0">
                EÖ
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-white truncate tracking-tight">
                  Eray Özer
                </p>
                <p className="text-[10px] text-blue-400 font-mono truncate tracking-widest uppercase mt-0.5">
                  SecOps Admin
                </p>
              </div>
              <Settings className="w-4 h-4 text-zinc-500 hover:text-white transition-colors shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* ANA SOHBET ALANI */}
      <div className="flex-1 flex flex-col h-[100dvh] relative z-10 min-w-0 bg-zinc-950">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(0,102,238,0.05)_0%,transparent_70%)] pointer-events-none" />

        {/* HEADER */}
        <header className="h-[72px] flex items-center justify-between px-4 sm:px-6 border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl shrink-0 relative z-20">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-xl transition-all cursor-pointer border border-transparent outline-none"
              title="Toggle Sidebar"
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-5 h-5" />
              ) : (
                <PanelLeft className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="flex-1 flex justify-center min-w-0 px-2">
            <span className="text-[11px] sm:text-xs font-mono font-semibold text-zinc-300 flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-full shadow-sm truncate max-w-full uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] animate-pulse shrink-0" />
              Intelligence Core{" "}
              <span className="text-zinc-600 hidden sm:inline">|</span>{" "}
              <span className="text-blue-400 hidden sm:inline">Active</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link
              href="/dashboard/agents"
              className="text-[11px] font-mono uppercase tracking-widest font-semibold text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-800/80 px-3.5 py-2 rounded-xl border border-zinc-800 transition-all flex items-center gap-2 outline-none shadow-sm"
            >
              <Layers className="w-3.5 h-3.5 text-blue-400" /> Fleet
            </Link>
            <Link
              href="/dashboard/risk-center"
              className="text-[11px] font-mono uppercase tracking-widest font-semibold text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-800/80 px-3.5 py-2 rounded-xl border border-zinc-800 transition-all flex items-center gap-2 outline-none shadow-sm"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" /> Risks
            </Link>
          </div>
        </header>

        {/* MESAJLARIN LİSTELENDİĞİ ALAN */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 w-full min-w-0 scroll-smooth relative z-10">
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-8 min-w-0">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-4"
              >
                <div className="w-20 h-20 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 shadow-2xl rounded-[1.5rem] flex items-center justify-center mb-8 relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,238,0.2)_0,transparent_70%)] pointer-events-none rounded-[1.5rem]" />
                  <AegisoraSpark className="w-10 h-10 text-blue-400" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif text-white mb-3 tracking-tight">
                  Awaiting Telemetry Query
                </h2>
                <p className="text-xs sm:text-[13px] text-zinc-500 mb-10 font-mono tracking-widest uppercase">
                  Autonomous zero-trust threat detection & privacy suite.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                  <button
                    onClick={() =>
                      handleSend("Analyze today's critical security incidents")
                    }
                    className="p-4 rounded-[1rem] bg-zinc-900/40 hover:bg-zinc-800/60 border border-zinc-800/80 hover:border-zinc-700 text-left transition-all cursor-pointer flex items-center justify-between group outline-none shadow-sm"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <Activity className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="text-[13px] font-medium text-zinc-300 group-hover:text-white truncate">
                        Analyze active incidents
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 shrink-0" />
                  </button>
                  <button
                    onClick={() =>
                      handleSend("Generate enterprise compliance report")
                    }
                    className="p-4 rounded-[1rem] bg-zinc-900/40 hover:bg-zinc-800/60 border border-zinc-800/80 hover:border-zinc-700 text-left transition-all cursor-pointer flex items-center justify-between group outline-none shadow-sm"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <BarChart3 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="text-[13px] font-medium text-zinc-300 group-hover:text-white truncate">
                        Generate compliance report
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 shrink-0" />
                  </button>
                  <button
                    onClick={() =>
                      handleSend("Find risky agents in current fleet")
                    }
                    className="p-4 rounded-[1rem] bg-zinc-900/40 hover:bg-zinc-800/60 border border-zinc-800/80 hover:border-zinc-700 text-left transition-all cursor-pointer flex items-center justify-between group outline-none shadow-sm"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-[13px] font-medium text-zinc-300 group-hover:text-white truncate">
                        Find risky fleet agents
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 shrink-0" />
                  </button>
                  <button
                    onClick={() =>
                      handleSend("Explain blocked prompt injection sessions")
                    }
                    className="p-4 rounded-[1rem] bg-zinc-900/40 hover:bg-zinc-800/60 border border-zinc-800/80 hover:border-zinc-700 text-left transition-all cursor-pointer flex items-center justify-between group outline-none shadow-sm"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                      <span className="text-[13px] font-medium text-zinc-300 group-hover:text-white truncate">
                        Explain blocked injections
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 shrink-0" />
                  </button>
                </div>
              </motion.div>
            ) : (
              messages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx}
                  className={`flex gap-3 sm:gap-4 w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "ai" && (
                    <div className="w-9 h-9 rounded-[10px] bg-zinc-900 border border-zinc-800 shadow-sm flex items-center justify-center shrink-0 mt-1">
                      <AegisoraSpark
                        className="w-5 h-5 text-blue-400"
                        isThinking={msg.isThinking}
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[90%] sm:max-w-[80%] min-w-0 ${msg.role === "user" ? "flex justify-end" : "w-full"}`}
                  >
                    {msg.role === "user" ? (
                      <div className="flex flex-col items-end gap-2 min-w-0">
                        {msg.image && (
                          <div className="relative w-48 h-48 rounded-2xl overflow-hidden border border-zinc-700 shadow-md shrink-0">
                            <img
                              src={msg.image}
                              alt="Upload"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="px-5 py-3.5 bg-zinc-800/90 text-zinc-200 rounded-[1.25rem] rounded-tr-sm font-medium text-[14px] sm:text-[15px] shadow-sm border border-zinc-700/50 break-words whitespace-pre-wrap leading-relaxed">
                          {msg.content}
                        </div>
                      </div>
                    ) : (
                      <div className="text-zinc-300 py-1 sm:py-2 space-y-4 min-w-0 overflow-hidden">
                        {msg.isThinking ? (
                          <div className="flex items-center gap-3 text-[11px] font-mono font-semibold uppercase tracking-widest text-zinc-500 py-2">
                            <AegisoraSpark
                              className="w-4 h-4 text-blue-500"
                              isThinking={true}
                            />
                            <motion.span
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              Querying intelligence core...
                            </motion.span>
                          </div>
                        ) : (
                          <div className="space-y-5 min-w-0">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-[14px] sm:text-[15.5px] leading-relaxed text-zinc-300 font-sans tracking-wide space-y-4 break-words overflow-wrap-anywhere prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-a:text-blue-400"
                            >
                              <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </motion.div>

                            {msg.showCanvas && (
                              <button
                                onClick={() => setIsCanvasOpen(true)}
                                className="flex items-center justify-between w-full max-w-sm px-5 py-3.5 bg-zinc-900/80 hover:bg-zinc-800/80 border border-zinc-800 text-blue-400 rounded-[14px] text-xs font-mono font-semibold uppercase tracking-widest transition-all shadow-sm cursor-pointer mt-4 outline-none group"
                              >
                                <div className="flex items-center gap-3 truncate">
                                  <BarChart3 className="w-4 h-4 text-blue-500 shrink-0" />
                                  <span className="truncate">
                                    Open Analytics Canvas
                                  </span>
                                </div>
                                <Maximize2 className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 shrink-0 transition-colors" />
                              </button>
                            )}

                            {msg.options && msg.options.length > 0 && (
                              <div className="flex flex-wrap gap-2 pt-3">
                                {msg.options.map((option, optIdx) => (
                                  <button
                                    key={optIdx}
                                    onClick={() => handleSend(option)}
                                    className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 hover:bg-blue-500/10 text-zinc-300 hover:text-blue-400 rounded-xl text-[13px] font-medium transition-all shadow-sm cursor-pointer text-left break-words max-w-full outline-none"
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {msg.role === "user" && (
                    <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 font-bold text-xs shrink-0 mt-1 shadow-sm">
                      EÖ
                    </div>
                  )}
                </motion.div>
              ))
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        {/* INPUT BARI */}
        <div className="w-full shrink-0 px-4 pb-6 pt-2 bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent relative z-20">
          <div className="max-w-4xl mx-auto w-full relative flex flex-col gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />

            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-2 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-2xl w-fit shadow-lg mb-2"
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-zinc-700 shrink-0">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col pr-3">
                  <span className="text-xs font-semibold text-zinc-200 tracking-tight">
                    Telemetry Image
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">
                    Ready to scan
                  </span>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-1.5 rounded-full bg-zinc-800/50 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer mr-1 shrink-0 outline-none"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}

            <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 shadow-2xl rounded-[1.5rem] p-1.5 sm:p-2 flex items-end gap-2 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/20 transition-all w-full">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-11 h-11 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/80 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 mb-0.5 outline-none"
                title="Attach Log / Image"
              >
                <Plus className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="Query Aegisora Intelligence Core..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-zinc-600 font-medium text-[14px] sm:text-[15px] px-3 py-3.5 w-full min-w-0"
              />

              <button
                onClick={() => handleSend()}
                disabled={!input.trim() && !selectedImage}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all shrink-0 mb-0.5 outline-none ${
                  input.trim() || selectedImage
                    ? "bg-blue-600 text-white shadow-[0_4px_15px_rgba(0,102,238,0.3)] hover:bg-blue-500 cursor-pointer"
                    : "bg-zinc-800/50 text-zinc-600 cursor-not-allowed"
                }`}
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 mt-2">
              <ShieldCheck className="w-3 h-3 text-zinc-600" />
              <p className="text-center text-[10px] text-zinc-600 font-mono tracking-widest uppercase">
                Zero-Trust Encryption Active
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 📊 ANALYTICS CANVAS (ENTERPRISE DARK) */}
      <AnimatePresence>
        {isCanvasOpen && (
          <motion.div
            id="printable-canvas"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-2xl flex flex-col p-4 sm:p-8 overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6 mb-8">
              <div className="flex items-center gap-4 truncate pr-2">
                <div className="w-12 h-12 rounded-[14px] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-2xl font-serif text-white truncate tracking-tight">
                    {canvasData.title || "Enterprise Telemetry"}
                  </h2>
                  <p className="text-[10px] sm:text-[11px] font-mono font-semibold text-zinc-500 uppercase tracking-widest truncate mt-1">
                    Generated dynamically by Aegisora Core •{" "}
                    {selectedLang.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 no-print">
                <button
                  onClick={() => setIsLangModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 hover:bg-blue-500/10 text-[11px] font-mono uppercase tracking-widest font-semibold text-zinc-300 hover:text-blue-400 rounded-xl transition-all cursor-pointer outline-none shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export Report</span>
                </button>
                <button
                  onClick={() => setIsCanvasOpen(false)}
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 hover:border-red-500/30 transition-all cursor-pointer outline-none shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="w-full flex-1 flex flex-col gap-6 max-w-6xl mx-auto pb-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-[1.5rem] shadow-lg">
                  <p className="text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                    Total Agent Requests
                  </p>
                  <h3 className="text-3xl font-serif text-white mb-2">
                    16,900
                  </h3>
                  <p className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 w-fit px-2 py-1 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />{" "}
                    +12.4% vs last week
                  </p>
                </div>
                <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-[1.5rem] shadow-lg">
                  <p className="text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                    Detected Anomalies
                  </p>
                  <h3 className="text-3xl font-serif text-amber-400 mb-2">
                    35
                  </h3>
                  <p className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5 bg-zinc-800 w-fit px-2 py-1 rounded">
                    <ShieldAlert className="w-3 h-3" /> Mitigated automatically
                  </p>
                </div>
                <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-[1.5rem] shadow-lg">
                  <p className="text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                    Avg Risk Vector
                  </p>
                  <h3 className="text-3xl font-serif text-blue-400 mb-2">
                    3.7 <span className="text-lg text-zinc-600">/ 10</span>
                  </h3>
                  <p className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 w-fit px-2 py-1 rounded">
                    <Check className="w-3 h-3" /> Secure threshold
                  </p>
                </div>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 p-6 sm:p-8 rounded-[2rem] flex-1 flex flex-col min-h-[400px] shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,102,238,0.05)_0%,transparent_50%)] pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between mb-8 gap-4 relative z-10">
                  <h3 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    Request Volume vs. Risk Telemetry (Feb 01 - Feb 05)
                  </h3>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-md border border-emerald-500/20 shrink-0 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />{" "}
                    Live Stream
                  </span>
                </div>

                <div className="w-full flex-1 relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={MOCK_CHART_DATA}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorRequests"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3b82f6"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3b82f6"
                            stopOpacity={0.0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#27272a"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
                        stroke="#71717a"
                        tick={{
                          fontSize: 10,
                          fill: "#a1a1aa",
                          fontFamily: "monospace",
                        }}
                        axisLine={false}
                        tickLine={false}
                        dy={10}
                      />
                      <YAxis
                        stroke="#71717a"
                        tick={{
                          fontSize: 10,
                          fill: "#a1a1aa",
                          fontFamily: "monospace",
                        }}
                        axisLine={false}
                        tickLine={false}
                        dx={-10}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#18181b",
                          borderColor: "#27272a",
                          borderRadius: "12px",
                          color: "#fff",
                          fontFamily: "monospace",
                          fontSize: "12px",
                        }}
                        itemStyle={{ color: "#60a5fa" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="requests"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorRequests)"
                        activeDot={{
                          r: 6,
                          fill: "#3b82f6",
                          stroke: "#18181b",
                          strokeWidth: 2,
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌍 DİL SEÇİM MODALI */}
      <AnimatePresence>
        {isLangModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-4 no-print"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-[14px] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div className="truncate">
                    <h3 className="text-xl font-serif text-white truncate tracking-tight">
                      Report Language
                    </h3>
                    <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-500 truncate mt-1">
                      Export format: PDF ({selectedLang})
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsLangModalOpen(false)}
                  className="p-2 rounded-xl bg-zinc-800/50 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0 outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLang(lang.code)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer outline-none ${
                      selectedLang === lang.code
                        ? "bg-blue-500/10 border-blue-500/50 text-white shadow-sm ring-1 ring-blue-500/20"
                        : "bg-zinc-950/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-lg shrink-0">{lang.flag}</span>
                      <span className="text-[13px] font-medium truncate">
                        {lang.name}
                      </span>
                    </div>
                    {selectedLang === lang.code && (
                      <Check
                        className="w-4 h-4 text-blue-400 shrink-0 ml-1"
                        strokeWidth={3}
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-zinc-800/80">
                <button
                  onClick={() => setIsLangModalOpen(false)}
                  className="w-1/2 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-[13px] font-semibold transition-colors cursor-pointer border border-transparent outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExportPDF}
                  className="w-1/2 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[13px] font-semibold transition-all shadow-[0_4px_15px_rgba(0,102,238,0.2)] hover:shadow-[0_6px_20px_rgba(0,102,238,0.3)] cursor-pointer flex items-center justify-center gap-2 outline-none"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
