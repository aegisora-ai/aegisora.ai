"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  Sliders,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function SettingsPage() {
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<"api" | "team" | "general">("api");

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

  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Security Analyst");
  const [isInviting, setIsInviting] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("Aegisora Enterprise");
  const [retention, setRetention] = useState("30 Days (Compliance Minimum)");

  useEffect(() => {
    async function fetchMembers() {
      setIsLoadingMembers(true);
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("created_at", { ascending: true });

      if (data && !error) {
        const formattedData = data.map((m) => ({
          id: m.id,
          name: m.name || "Pending Invite",
          email: m.email,
          role: m.role,
          type:
            m.status === "pending"
              ? "pending"
              : m.role === "Owner"
                ? "owner"
                : m.role.includes("AI") || m.role.includes("Analyst")
                  ? "ai"
                  : "user",
          initials: (m.name || m.email || "U").substring(0, 2).toUpperCase(),
          status: m.status,
        }));
        setTeamMembers(formattedData);
      }
      setIsLoadingMembers(false);
    }

    if (activeTab === "team") {
      fetchMembers();
    }
  }, [activeTab, supabase]);

  const handleInvite = async () => {
    if (!inviteEmail) return;
    setIsInviting(true);

    const newMemberData = {
      email: inviteEmail,
      role: inviteRole,
      status: "pending",
      name: "Pending Invite",
    };

    try {
      const { data, error } = await supabase
        .from("team_members")
        .insert([newMemberData])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        const formattedNewMember = {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          type: "pending",
          initials: data.email.charAt(0).toUpperCase(),
          status: data.status,
        };
        setTeamMembers((prev) => [...prev, formattedNewMember]);
      }
    } catch (error) {
      console.error("Error inviting member:", error);
      alert("Failed to invite member. Make sure the table exists.");
    } finally {
      setIsInviting(false);
      setInviteEmail("");
    }
  };

  const handleDeleteMember = async (id: string) => {
    const previousMembers = [...teamMembers];
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));

    try {
      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", id);
      if (error) throw error;
    } catch (error) {
      console.error("Error deleting member:", error);
      setTeamMembers(previousMembers);
      alert("Failed to delete member.");
    }
  };

  const handleCopy = (keyText: string) => {
    navigator.clipboard.writeText(keyText);
    setCopiedKey(keyText);
    setTimeout(() => setCopiedKey(null), 2000);
  };

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

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 1000);
  };

  return (
    <div className="p-6 sm:p-10 max-w-[1600px] mx-auto w-full flex flex-col gap-8 font-sans relative selection:bg-blue-500/30 min-h-screen">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(0,102,238,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* HEADER */}
      <div className="border-b border-zinc-800/80 pb-6 relative z-10">
        <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-blue-400 bg-blue-950/40 border border-blue-800/30 px-3 py-1 rounded-full mb-4 inline-flex items-center gap-1.5 shadow-sm">
          <SettingsIcon className="w-3 h-3" />
          Configuration
        </span>
        <h1 className="text-3xl font-serif text-white tracking-tight mt-1">
          Workspace Settings
        </h1>
        <p className="text-xs font-mono text-zinc-400 mt-2">
          Manage your enterprise integration keys, security access controls, and
          workspace configurations.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative z-10">
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
            <button
              onClick={() => setActiveTab("api")}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl text-[13px] font-mono font-medium transition-all whitespace-nowrap outline-none cursor-pointer border ${
                activeTab === "api"
                  ? "bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/60 border-transparent"
              }`}
            >
              <Key className="w-4 h-4 text-blue-400" /> API Keys & SDK
            </button>
            <button
              onClick={() => setActiveTab("team")}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl text-[13px] font-mono font-medium transition-all whitespace-nowrap outline-none cursor-pointer border ${
                activeTab === "team"
                  ? "bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/60 border-transparent"
              }`}
            >
              <Users className="w-4 h-4 text-blue-400" /> Team Management
            </button>
            <button
              onClick={() => setActiveTab("general")}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl text-[13px] font-mono font-medium transition-all whitespace-nowrap outline-none cursor-pointer border ${
                activeTab === "general"
                  ? "bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/60 border-transparent"
              }`}
            >
              <SettingsIcon className="w-4 h-4 text-blue-400" /> General &
              Policies
            </button>
          </nav>
        </aside>

        {/* CONTENT AREA */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === "api" && (
              <motion.div
                key="api"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-8"
              >
                {/* API KEYS SECTION */}
                <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-[2rem] p-6 sm:p-8 shadow-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                    <div>
                      <h3 className="text-lg font-serif text-white tracking-tight">
                        Enterprise API Keys
                      </h3>
                      <p className="text-xs font-mono text-zinc-400 mt-1">
                        Use these secret keys to authenticate your autonomous AI
                        agents with Aegisora proxy.
                      </p>
                    </div>
                    <button
                      onClick={handleCreateKey}
                      disabled={isGeneratingKey}
                      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl text-xs font-mono font-semibold uppercase tracking-widest transition-all shadow-lg cursor-pointer disabled:opacity-70 outline-none"
                    >
                      {isGeneratingKey ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                      <span>Create Secret Key</span>
                    </button>
                  </div>

                  <div className="border border-zinc-800 rounded-2xl overflow-hidden shadow-inner bg-zinc-950/40">
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-zinc-950/80 border-b border-zinc-800 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                      <div className="col-span-4">Designation</div>
                      <div className="col-span-5">Secret Token</div>
                      <div className="col-span-3 text-right">Created Date</div>
                    </div>
                    <div className="divide-y divide-zinc-800/60">
                      {apiKeys.map((item) => (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          key={item.id}
                          className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-zinc-800/20 transition-colors"
                        >
                          <div className="col-span-4 flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                            <span className="text-[13px] font-medium text-white tracking-wide">
                              {item.name}
                            </span>
                          </div>
                          <div className="col-span-5 flex items-center gap-3">
                            <code className="text-xs font-mono text-zinc-300 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 shadow-inner">
                              {item.key.slice(0, 12)}...{item.key.slice(-4)}
                            </code>
                            <button
                              onClick={() => handleCopy(item.key)}
                              className="text-zinc-500 hover:text-white transition-colors cursor-pointer relative outline-none p-1.5 rounded-md hover:bg-zinc-800"
                              title="Copy Secret Key"
                            >
                              {copiedKey === item.key ? (
                                <Check className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          <div className="col-span-3 text-right text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                            {item.date}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* QUICK INTEGRATION SECTION */}
                <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-[2rem] p-6 sm:p-8 shadow-2xl">
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-inner">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif text-white tracking-tight">
                        Quick SDK Integration
                      </h3>
                      <p className="text-xs font-mono text-zinc-400 mt-0.5">
                        Wrap your existing LLM calls with the Aegisora SDK to
                        enforce runtime guardrails.
                      </p>
                    </div>
                  </div>

                  <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden relative shadow-inner">
                    <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-zinc-900/50">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-zinc-400" />
                        <span className="text-[11px] font-mono font-semibold text-zinc-300 uppercase tracking-widest">
                          Node.js (TypeScript)
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                        v2.4.1-secure
                      </span>
                    </div>
                    <div className="p-6 overflow-x-auto custom-scrollbar">
                      <pre className="text-[12.5px] font-mono leading-relaxed text-zinc-300">
                        <span className="text-purple-400">import</span> {"{"}{" "}
                        Aegisora {"}"}{" "}
                        <span className="text-purple-400">from</span>{" "}
                        <span className="text-emerald-400">
                          &apos;@aegisora/sdk&apos;
                        </span>
                        ;
                        <br />
                        <br />
                        <span className="text-zinc-500">
                          {`// Initialize proxy client with enterprise perimeter credentials`}
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
                        <span className="text-emerald-400">
                          &apos;AGT-1042&apos;
                        </span>
                        <br />
                        {"}"});
                        <br />
                        <br />
                        <span className="text-zinc-500">
                          {`// Aegisora intercepts tool calls and inspects prompts at runtime`}
                        </span>
                        <br />
                        <span className="text-purple-400">const</span> response
                        = <span className="text-purple-400">await</span>{" "}
                        aegisora.chat.completions.
                        <span className="text-blue-400">create</span>({"{"}
                        <br />
                        {"  "}model:{" "}
                        <span className="text-emerald-400">
                          &quot;gpt-4o&quot;
                        </span>
                        ,<br />
                        {"  "}messages: [{"{"} role:{" "}
                        <span className="text-emerald-400">
                          &quot;user&quot;
                        </span>
                        , content: userInput {"}"}]<br />
                        {"}"});
                      </pre>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "team" && (
              <motion.div
                key="team"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6"
              >
                <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-[2rem] p-6 sm:p-8 shadow-2xl">
                  <div className="mb-6">
                    <h3 className="text-lg font-serif text-white tracking-tight">
                      Workspace Members
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 mt-1">
                      Manage administrative and security analyst access to your
                      enterprise dashboard.
                    </p>
                  </div>

                  {/* Invite Bar */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-8 p-4 bg-zinc-950/60 border border-zinc-800 rounded-2xl shadow-inner">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="analyst@company.com"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors shadow-inner"
                      />
                    </div>
                    <select
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 text-xs font-mono text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 min-w-[160px] cursor-pointer shadow-inner"
                    >
                      <option>Security Analyst</option>
                      <option>Admin</option>
                      <option>Viewer</option>
                    </select>
                    <button
                      onClick={handleInvite}
                      disabled={isInviting || !inviteEmail}
                      className="bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white px-6 py-3 rounded-xl text-xs font-mono font-semibold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center min-w-[120px] outline-none shadow-md"
                    >
                      {isInviting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Send Invite"
                      )}
                    </button>
                  </div>

                  {/* Member List */}
                  <div className="border border-zinc-800 rounded-2xl overflow-hidden divide-y divide-zinc-800/80 min-h-[140px] relative bg-zinc-950/40 shadow-inner">
                    {isLoadingMembers ? (
                      <div className="flex justify-center items-center py-16">
                        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                      </div>
                    ) : (
                      teamMembers.map((member) => (
                        <motion.div
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          key={member.id}
                          className="flex items-center justify-between p-5 bg-zinc-950/40 hover:bg-zinc-800/20 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 font-serif font-bold text-xs shadow-inner">
                              {member.initials}
                            </div>
                            <div>
                              <p className="text-[13px] font-medium text-white tracking-wide flex items-center gap-2">
                                {member.name}
                                {member.type === "owner" && (
                                  <span className="text-[9px] font-mono uppercase tracking-widest bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded border border-zinc-700">
                                    Owner
                                  </span>
                                )}
                                {member.type === "pending" && (
                                  <span className="text-[9px] font-mono uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded">
                                    Pending Invite
                                  </span>
                                )}
                              </p>
                              <p className="text-xs font-mono text-zinc-500 mt-0.5">
                                {member.email}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="text-[11px] font-mono text-zinc-400 hidden sm:block bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800">
                              {member.role}
                            </span>

                            {member.type === "pending" ||
                            member.type === "user" ? (
                              <button
                                onClick={() => handleDeleteMember(member.id)}
                                className="text-zinc-600 hover:text-red-400 transition-colors cursor-pointer p-2 rounded-lg hover:bg-red-400/10 outline-none"
                                title="Revoke access"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            ) : (
                              <button className="text-zinc-600 hover:text-white transition-colors cursor-pointer outline-none p-2 rounded-lg hover:bg-zinc-800">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "general" && (
              <motion.div
                key="general"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-8"
              >
                <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-[2rem] p-6 sm:p-8 shadow-2xl">
                  <h3 className="text-lg font-serif text-white tracking-tight mb-6">
                    Workspace Preferences
                  </h3>

                  <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-widest">
                        Workspace Name
                      </label>
                      <input
                        type="text"
                        value={workspaceName}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        className="w-full max-w-lg bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-widest">
                        Telemetry Data Retention Period
                      </label>
                      <select
                        value={retention}
                        onChange={(e) => setRetention(e.target.value)}
                        className="w-full max-w-lg bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer shadow-inner"
                      >
                        <option>30 Days (Compliance Minimum)</option>
                        <option>90 Days</option>
                        <option>1 Year</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center gap-4">
                    <button
                      onClick={handleSaveSettings}
                      disabled={isSaving || saveSuccess}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl text-xs font-mono font-semibold uppercase tracking-widest transition-all shadow-lg cursor-pointer flex items-center justify-center min-w-[140px] outline-none"
                    >
                      {isSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : saveSuccess ? (
                        <span className="text-emerald-300 flex items-center gap-1.5">
                          <Check className="w-4 h-4" /> Saved!
                        </span>
                      ) : (
                        "Save Preferences"
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-red-500/5 border border-red-500/20 rounded-[2rem] p-6 sm:p-8 shadow-xl">
                  <h3 className="text-base font-serif text-red-400 mb-1 tracking-tight">
                    Danger Zone
                  </h3>
                  <p className="text-xs font-mono text-zinc-500 mb-6 leading-relaxed">
                    Permanently delete this workspace, active proxy nodes, and
                    all associated enterprise security telemetry logs.
                  </p>
                  <button
                    onClick={() =>
                      alert(
                        "Workspace deletion is disabled in secure demo mode.",
                      )
                    }
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-6 py-3 rounded-xl text-xs font-mono font-semibold uppercase tracking-widest transition-colors cursor-pointer outline-none"
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
