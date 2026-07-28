"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Key,
  Users,
  Settings as SettingsIcon,
  Copy,
  Check,
  Plus,
  Terminal,
  ShieldCheck,
  Mail,
  MoreVertical,
  Code2,
  Trash2,
  Loader2,
  Clock,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"api" | "team" | "general">("api");

  // --- STATE YÖNETİMİ (ETKİLEŞİM İÇİN) ---

  // 1. API Keys State
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: "Production Key",
      key: "aeg_live_9f8d7c6b5a41234567890abcdef",
      date: "Oct 24, 2026",
    },
  ]);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // 2. Team Members State
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Eray Özer",
      email: "eray@aegisora.ai",
      role: "Owner",
      type: "owner",
      initials: "EÖ",
    },
    {
      id: 2,
      name: "Security AI",
      email: "system@aegisora.ai",
      role: "Automated Analyst",
      type: "ai",
      initials: "SA",
    },
  ]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Security Analyst");
  const [isInviting, setIsInviting] = useState(false);

  // 3. General Settings State
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("Aegisora Enterprise");
  const [retention, setRetention] = useState("30 Days (Compliance Minimum)");

  // --- FONKSİYONLAR ---

  // API Key Kopyalama
  const handleCopy = (keyText: string) => {
    navigator.clipboard.writeText(keyText);
    setCopiedKey(keyText);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Yeni API Key Üretme Simülasyonu
  const handleCreateKey = () => {
    setIsGeneratingKey(true);
    setTimeout(() => {
      const randomString =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      const newKey = {
        id: Date.now(),
        name: "Development Key",
        key: `aeg_test_${randomString}`,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
      setApiKeys([newKey, ...apiKeys]);
      setIsGeneratingKey(false);
    }, 800);
  };

  // Yeni Kullanıcı Davet Etme Simülasyonu
  const handleInvite = () => {
    if (!inviteEmail) return;
    setIsInviting(true);
    setTimeout(() => {
      const newMember = {
        id: Date.now(),
        name: "Pending Invite",
        email: inviteEmail,
        role: inviteRole,
        type: "pending",
        initials: inviteEmail.charAt(0).toUpperCase(),
      };
      setTeamMembers([...teamMembers, newMember]);
      setInviteEmail("");
      setIsInviting(false);
    }, 800);
  };

  // Ayarları Kaydetme Simülasyonu
  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 1000);
  };

  return (
    <div className="p-6 sm:p-10 max-w-[1200px] mx-auto w-full flex flex-col gap-8">
      {/* SAYFA BAŞLIĞI */}
      <div className="border-b border-gray-800 pb-6">
        <h1 className="text-2xl font-serif text-white tracking-tight">
          Workspace Settings
        </h1>
        <p className="text-xs font-mono text-gray-400 mt-1">
          Manage your enterprise integration, team access, and API
          configurations.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* SOL MENÜ (SEKMELER) */}
        <aside className="w-full lg:w-56 flex-shrink-0">
          <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
            <button
              onClick={() => setActiveTab("api")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === "api"
                  ? "bg-[#0066EE]/10 text-[#0066EE] border border-[#0066EE]/20"
                  : "text-gray-400 hover:text-white hover:bg-[#121215] border border-transparent"
              }`}
            >
              <Key className="w-4 h-4" /> API Keys & SDK
            </button>
            <button
              onClick={() => setActiveTab("team")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === "team"
                  ? "bg-[#0066EE]/10 text-[#0066EE] border border-[#0066EE]/20"
                  : "text-gray-400 hover:text-white hover:bg-[#121215] border border-transparent"
              }`}
            >
              <Users className="w-4 h-4" /> Team Management
            </button>
            <button
              onClick={() => setActiveTab("general")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === "general"
                  ? "bg-[#0066EE]/10 text-[#0066EE] border border-[#0066EE]/20"
                  : "text-gray-400 hover:text-white hover:bg-[#121215] border border-transparent"
              }`}
            >
              <SettingsIcon className="w-4 h-4" /> General
            </button>
          </nav>
        </aside>

        {/* SAĞ İÇERİK ALANI */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {/* --- API KEYS SEKMESİ --- */}
            {activeTab === "api" && (
              <motion.div
                key="api"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6"
              >
                {/* Anahtar Oluşturma Kartı */}
                <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-base font-medium text-white">
                        Enterprise API Keys
                      </h3>
                      <p className="text-xs font-mono text-gray-500 mt-1">
                        Use these keys to authenticate your AI agents with
                        Aegisora.
                      </p>
                    </div>
                    <button
                      onClick={handleCreateKey}
                      disabled={isGeneratingKey}
                      className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl text-xs font-medium hover:bg-gray-200 transition-colors shadow-sm cursor-pointer disabled:opacity-70"
                    >
                      {isGeneratingKey ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                      Create Secret Key
                    </button>
                  </div>

                  {/* Aktif Key Listesi */}
                  <div className="border border-gray-800 rounded-xl overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-[#19191d]/50 border-b border-gray-800 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                      <div className="col-span-4">Name</div>
                      <div className="col-span-5">Secret Key</div>
                      <div className="col-span-3 text-right">Created</div>
                    </div>
                    <div className="divide-y divide-gray-800">
                      {apiKeys.map((item) => (
                        <motion.div
                          initial={{ opacity: 0, backgroundColor: "#0066EE20" }}
                          animate={{ opacity: 1, backgroundColor: "#0a0a0c" }}
                          key={item.id}
                          className="grid grid-cols-12 gap-4 px-4 py-4 items-center"
                        >
                          <div className="col-span-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-sm text-white font-medium">
                              {item.name}
                            </span>
                          </div>
                          <div className="col-span-5 flex items-center gap-3">
                            <code className="text-xs font-mono text-gray-300 bg-[#121215] px-2 py-1 rounded border border-gray-800">
                              {item.key.slice(0, 12)}...{item.key.slice(-4)}
                            </code>
                            <button
                              onClick={() => handleCopy(item.key)}
                              className="text-gray-500 hover:text-white transition-colors cursor-pointer relative"
                            >
                              {copiedKey === item.key ? (
                                <Check className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          <div className="col-span-3 text-right text-xs font-mono text-gray-500">
                            {item.date}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Entegrasyon (SDK) Rehberi */}
                <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#0066EE]/10 rounded-lg border border-[#0066EE]/20 text-[#0066EE]">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-white">
                        Quick Integration
                      </h3>
                      <p className="text-xs font-mono text-gray-500 mt-1">
                        Wrap your existing LLM calls with the Aegisora SDK to
                        enable zero-trust protection.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#0a0a0c] border border-gray-800 rounded-xl overflow-hidden relative">
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-800 bg-[#19191d]/30">
                      <Code2 className="w-4 h-4 text-gray-500" />
                      <span className="text-[11px] font-mono text-gray-400">
                        Node.js (TypeScript)
                      </span>
                    </div>
                    <div className="p-4 overflow-x-auto">
                      <pre className="text-[12px] font-mono leading-relaxed">
                        <span className="text-purple-400">import</span> {"{"}{" "}
                        Aegisora {"}"}{" "}
                        <span className="text-purple-400">from</span>{" "}
                        <span className="text-green-400">'@aegisora/sdk'</span>;
                        <br />
                        <br />
                        <span className="text-gray-500">
                          {"// Initialize with your secret key"}
                        </span>
                        <br />
                        <span className="text-purple-400">const</span> aegisora
                        = <span className="text-purple-400">new</span>{" "}
                        <span className="text-blue-400">Aegisora</span>({"{"}
                        <br />
                        {"  "}apiKey: process.env.
                        <span className="text-white">AEGISORA_SECRET_KEY</span>,
                        <br />
                        {"  "}agentId:{" "}
                        <span className="text-green-400">'AGT-1042'</span>
                        <br />
                        {"}"});
                        <br />
                        <br />
                        <span className="text-gray-500">
                          {
                            "// Aegisora intercepts and scans the prompt before it hits OpenAI"
                          }
                        </span>
                        <br />
                        <span className="text-purple-400">const</span> response
                        = <span className="text-purple-400">await</span>{" "}
                        aegisora.chat.completions.
                        <span className="text-blue-400">create</span>({"{"}
                        <br />
                        {"  "}model:{" "}
                        <span className="text-green-400">"gpt-4"</span>,<br />
                        {"  "}messages: [{"{"} role:{" "}
                        <span className="text-green-400">"user"</span>, content:
                        userInput {"}"}]<br />
                        {"}"});
                      </pre>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- TEAM MANAGEMENT SEKMESİ --- */}
            {activeTab === "team" && (
              <motion.div
                key="team"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6"
              >
                <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-base font-medium text-white">
                        Workspace Members
                      </h3>
                      <p className="text-xs font-mono text-gray-500 mt-1">
                        Manage who has access to your enterprise security
                        dashboard.
                      </p>
                    </div>
                  </div>

                  {/* Kullanıcı Davet Etme Alanı */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-6 p-4 bg-[#19191d]/30 border border-gray-800 rounded-xl">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="analyst@company.com"
                        className="w-full bg-[#0a0a0c] border border-gray-700 rounded-lg pl-10 pr-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#0066EE] transition-colors"
                      />
                    </div>
                    <select
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value)}
                      className="bg-[#0a0a0c] border border-gray-700 text-xs text-white rounded-lg px-3 py-2.5 outline-none focus:border-[#0066EE] min-w-[140px]"
                    >
                      <option>Security Analyst</option>
                      <option>Admin</option>
                      <option>Viewer</option>
                    </select>
                    <button
                      onClick={handleInvite}
                      disabled={isInviting || !inviteEmail}
                      className="bg-[#0066EE] hover:bg-[#005bb5] disabled:bg-gray-800 disabled:text-gray-500 text-white px-5 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-center min-w-[100px]"
                    >
                      {isInviting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Invite"
                      )}
                    </button>
                  </div>

                  {/* Üye Listesi */}
                  <div className="border border-gray-800 rounded-xl overflow-hidden divide-y divide-gray-800">
                    {teamMembers.map((member) => (
                      <motion.div
                        layout
                        key={member.id}
                        className="flex items-center justify-between p-4 bg-[#0a0a0c] hover:bg-[#19191d]/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {/* Avatar Render */}
                          {member.type === "owner" && (
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0066EE] to-purple-600 flex items-center justify-center text-white font-serif font-bold text-xs">
                              {member.initials}
                            </div>
                          )}
                          {member.type === "ai" && (
                            <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-500 font-serif font-bold text-xs">
                              {member.initials}
                            </div>
                          )}
                          {member.type === "pending" && (
                            <div className="w-9 h-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 font-serif font-bold text-xs">
                              {member.initials}
                            </div>
                          )}

                          <div>
                            <p className="text-sm font-medium text-white">
                              {member.name}
                              {member.type === "owner" && (
                                <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded ml-2">
                                  You
                                </span>
                              )}
                              {member.type === "pending" && (
                                <span className="text-[10px] bg-amber-500/20 text-amber-500 border border-amber-500/30 px-2 py-0.5 rounded ml-2">
                                  Pending
                                </span>
                              )}
                            </p>
                            <p className="text-xs font-mono text-gray-500">
                              {member.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {member.type === "ai" ? (
                            <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 hidden sm:flex">
                              <ShieldCheck className="w-3 h-3" /> {member.role}
                            </span>
                          ) : member.type === "pending" ? (
                            <span className="flex items-center gap-1 text-[10px] font-mono text-gray-400 hidden sm:flex">
                              <Clock className="w-3 h-3" /> Awaiting
                            </span>
                          ) : (
                            <span className="text-xs font-mono text-gray-400 hidden sm:block">
                              {member.role}
                            </span>
                          )}
                          <button className="text-gray-600 hover:text-white transition-colors cursor-pointer">
                            {member.type === "pending" ? (
                              <Trash2 className="w-4 h-4 hover:text-red-400" />
                            ) : (
                              <MoreVertical className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- GENERAL SEKMESİ --- */}
            {activeTab === "general" && (
              <motion.div
                key="general"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6"
              >
                <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-base font-medium text-white mb-6">
                    Workspace Preferences
                  </h3>

                  <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono text-gray-400">
                        Workspace Name
                      </label>
                      <input
                        type="text"
                        value={workspaceName}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        className="w-full max-w-md bg-[#0a0a0c] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#0066EE] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono text-gray-400">
                        Data Retention Period
                      </label>
                      <select
                        value={retention}
                        onChange={(e) => setRetention(e.target.value)}
                        className="w-full max-w-md bg-[#0a0a0c] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#0066EE] transition-colors appearance-none"
                      >
                        <option>30 Days (Compliance Minimum)</option>
                        <option>90 Days</option>
                        <option>1 Year</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-800 flex items-center gap-4">
                    <button
                      onClick={handleSaveSettings}
                      disabled={isSaving || saveSuccess}
                      className="bg-white hover:bg-gray-200 text-black px-5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer shadow-sm flex items-center justify-center min-w-[120px]"
                    >
                      {isSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : saveSuccess ? (
                        <span className="text-emerald-600 flex items-center gap-1">
                          <Check className="w-4 h-4" /> Saved!
                        </span>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
                  <h3 className="text-base font-medium text-red-400 mb-1">
                    Danger Zone
                  </h3>
                  <p className="text-xs font-mono text-gray-500 mb-4">
                    Permanently delete this workspace and all associated AI
                    governance logs.
                  </p>
                  <button
                    onClick={() =>
                      alert("Workspace deletion is disabled in demo mode.")
                    }
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer"
                  >
                    Delete Workspace
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
