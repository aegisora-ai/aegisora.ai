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
  className = "w-5 h-5 text-[#0066EE]",
  isThinking = false,
}) => {
  return (
    <motion.div
      animate={
        isThinking
          ? { rotate: [0, 180, 360], scale: [1, 1.2, 1] }
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

    const isChartRequest =
      queryText.toLowerCase().includes("grafik") ||
      queryText.toLowerCase().includes("chart") ||
      queryText.toLowerCase().includes("rapor") ||
      queryText.toLowerCase().includes("bar chart") ||
      queryText.toLowerCase().includes("istatistik");

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
              lastMsg.content = `Error communicating with Aegisora Core: ${err.message}`;
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
    <div className="flex h-screen w-full bg-[#090a0f] text-white overflow-hidden font-sans relative">
      {/* PROFESYONEL YATAY (LANDSCAPE) VE RENKLİ PDF ÇIKTI STİLLERİ */}
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
            background-color: #070709 !important;
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
            background-color: #070709 !important;
            color: white !important;
            padding: 20px !important;
            overflow: visible !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 90, -90, 0],
            y: [0, -90, 90, 0],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#0066EE]/20 blur-[170px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 100, 0],
            y: [0, 100, -100, 0],
            scale: [1, 1.35, 0.75, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-15%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#1d4ed8]/18 blur-[190px]"
        />
      </div>

      {/* SOL MENÜ */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full bg-[#0e0f14]/85 backdrop-blur-3xl border-r border-white/10 flex flex-col flex-shrink-0 z-20 shadow-2xl"
          >
            <div className="p-4 flex flex-col gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 px-2 py-1"
              >
                <div className="w-7 h-7 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shadow-xs">
                  <AegisoraSpark className="w-4 h-4 text-[#0066EE]" />
                </div>
                <span className="text-white font-serif text-lg tracking-tight">
                  Aegisora
                </span>
              </Link>

              <button
                onClick={handleNewAnalysis}
                className="w-full flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2.5 rounded-2xl transition-all shadow-xs text-sm font-medium group cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#0066EE] group-hover:rotate-90 transition-transform duration-300" />
                New Analysis
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] px-3 pt-3 pb-2">
                Recent Queries
              </p>

              {sessions.length === 0 ? (
                <div className="px-3 py-4 text-xs font-mono text-gray-600 italic">
                  No active queries. Click &quot;New Analysis&quot; to start.
                </div>
              ) : (
                sessions.map((session) => (
                  <div
                    key={session.id}
                    onClick={() => setActiveSessionId(session.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors text-left group cursor-pointer ${
                      activeSessionId === session.id
                        ? "bg-white/10 text-white border border-white/10"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <MessageSquare className="w-4 h-4 text-gray-500 group-hover:text-[#0066EE] transition-colors flex-shrink-0" />
                      <span className="text-[13px] truncate">
                        {session.title}
                      </span>
                    </div>
                    <button
                      onClick={(e) => handleDeleteSession(e, session.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-400 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-black/40">
              <div className="flex items-center gap-3 px-2 py-2 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0066EE] to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                  EÖ
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium text-white truncate">
                    Eray Özer
                  </p>
                  <p className="text-[11px] text-[#0066EE] font-mono truncate">
                    Aegisora Core Intelligence
                  </p>
                </div>
                <Settings className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SOHBET ALANI */}
      <div className="flex-1 flex flex-col h-full relative z-10">
        <header className="h-16 flex items-center px-6 border-b border-white/10 bg-[#0e0f14]/50 backdrop-blur-2xl z-10 shadow-xs">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer shadow-xs border border-white/10"
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="w-5 h-5" />
            ) : (
              <PanelLeft className="w-5 h-5" />
            )}
          </button>

          <div className="flex-1 flex justify-center">
            <span className="text-[14px] font-medium text-gray-200 flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 shadow-xs">
              Aegisora{" "}
              <span className="text-[#0066EE] font-semibold">
                Intelligence Core
              </span>
            </span>
          </div>
          <div className="w-9"></div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 scroll-smooth">
          <div className="max-w-3xl mx-auto w-full flex flex-col gap-8 pb-36">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[55vh] mt-12">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl flex items-center justify-center mb-6">
                  <AegisoraSpark className="w-8 h-8 text-[#0066EE]" />
                </div>
                <h2 className="text-3xl font-serif text-white mb-2 tracking-tight">
                  How can Aegisora protect you today?
                </h2>
                <p className="text-sm text-gray-400 mb-10 font-mono tracking-wide">
                  Autonomous zero-trust threat detection & privacy suite.
                </p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx}
                  className={`flex gap-4 w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "ai" && (
                    <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 shadow-sm flex items-center justify-center flex-shrink-0 mt-1 backdrop-blur-md">
                      <AegisoraSpark
                        className="w-4 h-4 text-[#0066EE]"
                        isThinking={msg.isThinking}
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[80%] ${msg.role === "user" ? "flex justify-end" : "w-full"}`}
                  >
                    {msg.role === "user" ? (
                      <div className="flex flex-col items-end gap-2">
                        {msg.image && (
                          <div className="relative w-48 h-48 rounded-2xl overflow-hidden border border-gray-700 shadow-md">
                            <img
                              src={msg.image}
                              alt="Uploaded attachment"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="px-5 py-3.5 bg-[#1e1e24] text-gray-200 rounded-[22px] rounded-tr-sm font-medium text-[15px] shadow-sm border border-gray-700/50">
                          {msg.content}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-transparent text-gray-200 p-2 space-y-4">
                        {msg.isThinking ? (
                          <div className="flex items-center gap-2.5 text-xs font-mono text-gray-400 py-1">
                            <AegisoraSpark
                              className="w-3.5 h-3.5 text-[#0066EE]"
                              isThinking={true}
                            />
                            <motion.span
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              Aegisora Core analyzing telemetry...
                            </motion.span>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-[15.5px] leading-relaxed text-gray-100 font-sans tracking-wide space-y-3"
                            >
                              <ReactMarkdown
                                components={{
                                  strong: ({ node, ...props }) => (
                                    <strong
                                      className="font-bold text-white"
                                      {...props}
                                    />
                                  ),
                                  p: ({ node, ...props }) => (
                                    <p className="mb-2" {...props} />
                                  ),
                                  ul: ({ node, ...props }) => (
                                    <ul
                                      className="list-disc pl-5 space-y-1 my-2"
                                      {...props}
                                    />
                                  ),
                                  ol: ({ node, ...props }) => (
                                    <ol
                                      className="list-decimal pl-5 space-y-1 my-2"
                                      {...props}
                                    />
                                  ),
                                  li: ({ node, ...props }) => (
                                    <li className="text-gray-200" {...props} />
                                  ),
                                }}
                              >
                                {msg.content}
                              </ReactMarkdown>
                            </motion.div>

                            {msg.showCanvas && (
                              <button
                                onClick={() => setIsCanvasOpen(true)}
                                className="flex items-center gap-2.5 px-4 py-2.5 bg-[#0066EE]/20 hover:bg-[#0066EE]/30 border border-[#0066EE]/40 text-blue-200 rounded-xl text-xs font-mono transition-all shadow-sm cursor-pointer mt-3"
                              >
                                <BarChart3 className="w-4 h-4 text-[#0066EE]" />
                                <span>Open Interactive Analytics Canvas</span>
                                <Maximize2 className="w-3 h-3 ml-auto text-blue-400" />
                              </button>
                            )}

                            {msg.options && msg.options.length > 0 && (
                              <div className="flex flex-wrap gap-2 pt-2">
                                {msg.options.map((option, optIdx) => (
                                  <button
                                    key={optIdx}
                                    onClick={() => handleSend(option)}
                                    className="px-4 py-2 bg-[#14151a] hover:bg-[#0066EE] text-gray-200 hover:text-white border border-white/15 hover:border-[#0066EE] rounded-xl text-xs font-medium transition-all shadow-sm cursor-pointer"
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
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0066EE] to-purple-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-1 shadow-md">
                      EÖ
                    </div>
                  )}
                </motion.div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* INPUT BARI */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/90 to-transparent pt-12 pb-6 px-4">
          <div className="max-w-3xl mx-auto relative flex flex-col gap-3">
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
                className="flex items-center gap-3 p-2 bg-[#14151a]/90 backdrop-blur-xl border border-white/15 rounded-2xl w-fit shadow-lg"
              >
                <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-gray-700">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col pr-2">
                  <span className="text-xs font-medium text-gray-200">
                    Image attached
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">
                    Ready for analysis
                  </span>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors cursor-pointer mr-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}

            <div className="bg-[#14151a]/90 backdrop-blur-3xl border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.5)] rounded-full px-4 py-2.5 flex items-center gap-3 focus-within:border-[#0066EE]/60 transition-all">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
                title="Upload image"
              >
                <Plus className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Stelle irgendeine Frage..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-500 font-medium text-[15px] px-1"
              />

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() && !selectedImage}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    input.trim() || selectedImage
                      ? "bg-[#0066EE] text-white shadow-md hover:bg-[#005bb5] cursor-pointer"
                      : "bg-white/5 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-center text-[11px] text-gray-500 mt-1 font-mono">
              Aegisora AI Core is end-to-end encrypted. Security operations are
              verified autonomously.
            </p>
          </div>
        </div>
      </div>

      {/* 📊 TAM EKRAN İNOVATİF ANALYTICS CANVAS (Yatay PDF Çıktısına Tam Sığacak Şekilde Düzenlendi) */}
      <AnimatePresence>
        {isCanvasOpen && (
          <motion.div
            id="printable-canvas"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-50 bg-[#070709] flex flex-col p-6 sm:p-10 overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0066EE]/20 border border-[#0066EE]/40 flex items-center justify-center text-[#0066EE]">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-serif text-white">
                    {canvasData.title}
                  </h2>
                  <p className="text-xs font-mono text-gray-400">
                    Generated dynamically by Aegisora Intelligence Core •
                    Language: {selectedLang.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 no-print">
                <button
                  onClick={() => setIsLangModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-[#0066EE] border border-gray-700 hover:border-[#0066EE] text-xs font-mono text-white rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Export PDF Report
                </button>
                <button
                  onClick={() => setIsCanvasOpen(false)}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-colors cursor-pointer"
                  title="Close Canvas"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="w-full flex-1 flex flex-col gap-6 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#121215] border border-gray-800 p-4 rounded-2xl">
                  <p className="text-xs font-mono text-gray-500 mb-1">
                    Total Agent Requests
                  </p>
                  <h3 className="text-2xl font-semibold text-white">16,900</h3>
                  <p className="text-[11px] font-mono text-emerald-400 mt-1">
                    +12.4% vs last week
                  </p>
                </div>
                <div className="bg-[#121215] border border-gray-800 p-4 rounded-2xl">
                  <p className="text-xs font-mono text-gray-500 mb-1">
                    Detected Anomalies
                  </p>
                  <h3 className="text-2xl font-semibold text-white text-amber-400">
                    35
                  </h3>
                  <p className="text-[11px] font-mono text-gray-500 mt-1">
                    Mitigated automatically
                  </p>
                </div>
                <div className="bg-[#121215] border border-gray-800 p-4 rounded-2xl">
                  <p className="text-xs font-mono text-gray-500 mb-1">
                    Avg Risk Vector
                  </p>
                  <h3 className="text-2xl font-semibold text-white text-blue-400">
                    3.7 / 10
                  </h3>
                  <p className="text-[11px] font-mono text-emerald-400 mt-1">
                    Secure threshold
                  </p>
                </div>
              </div>

              <div className="bg-[#121215] border border-gray-800 p-6 rounded-2xl flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-200">
                    Request Volume vs. Risk Telemetry (Feb 01 - Feb 05)
                  </h3>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    Live Stream
                  </span>
                </div>

                <div className="w-full h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={MOCK_CHART_DATA}
                      margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorRequestsColor"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#0066EE"
                            stopOpacity={0.6}
                          />
                          <stop
                            offset="95%"
                            stopColor="#0066EE"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222228" />
                      <XAxis
                        dataKey="date"
                        stroke="#6b7280"
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#121215",
                          borderColor: "#333",
                          borderRadius: "12px",
                          color: "#fff",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="requests"
                        stroke="#0066EE"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorRequestsColor)"
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
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 no-print"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#121215] border border-gray-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0066EE]/20 border border-[#0066EE]/40 flex items-center justify-center text-[#0066EE]">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif text-white">
                      Select Report Language
                    </h3>
                    <p className="text-xs font-mono text-gray-400">
                      Export format: PDF ({selectedLang.toUpperCase()})
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsLangModalOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLang(lang.code)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedLang === lang.code
                        ? "bg-[#0066EE]/15 border-[#0066EE] text-white shadow-sm"
                        : "bg-[#18181c] border-gray-800 text-gray-300 hover:border-gray-700 hover:bg-[#1f1f25]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-base">{lang.flag}</span>
                      <span className="text-xs font-medium truncate">
                        {lang.name}
                      </span>
                    </div>
                    {selectedLang === lang.code && (
                      <Check className="w-4 h-4 text-[#0066EE] flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setIsLangModalOpen(false)}
                  className="w-1/2 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-xs font-medium transition-colors cursor-pointer border border-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExportPDF}
                  className="w-1/2 py-3 bg-[#0066EE] hover:bg-[#005bb5] text-white rounded-xl text-xs font-medium transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
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
