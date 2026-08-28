"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings, Users, ShieldCheck, Code, CreditCard, Bell,
  ChevronRight, Save, Trash2, Key, Copy, Eye, MoreHorizontal,
  AlertTriangle, Shield, CheckCircle2, RefreshCw, Plus
} from "lucide-react";

const SETTINGS_TABS = [
  { id: "general", label: "General", icon: Settings },
  { id: "team", label: "Team & Workspace", icon: Users },
  { id: "security", label: "Security & SAML", icon: ShieldCheck },
  { id: "developer", label: "Developer & APIs", icon: Code },
  { id: "billing", label: "Billing & Plans", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const mockTeam = [
  { id: 1, name: "Eray Özer", email: "ozereray44@gmail.com", role: "Owner", mfa: true },
  { id: 2, name: "Sena Özer", email: "sena@aegisora.com", role: "Admin", mfa: true },
  { id: 3, name: "Alex Chen", email: "alex@aegisora.com", role: "Developer", mfa: false },
  { id: 4, name: "Sarah Connor", email: "sarah@aegisora.com", role: "Viewer", mfa: true },
];

const mockApiKeys = [
  { id: "key_live_8f72...", name: "Production Gateway", created: "Aug 12, 2026", lastUsed: "2 mins ago" },
  { id: "key_test_2b91...", name: "Development Env", created: "Aug 20, 2026", lastUsed: "1 day ago" },
];

// Reusable Toggle Switch Component
const Toggle = ({ active, onClick }: { active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-9 h-5 rounded-full relative transition-colors duration-200 outline-none ${active ? 'bg-primary' : 'bg-zinc-700'}`}
  >
    <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-transform duration-200 ${active ? 'translate-x-[20px]' : 'translate-x-[4px]'}`} />
  </button>
);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  // Fake states for interactions
  const [workspaceName, setWorkspaceName] = useState("Aegisora Enterprise");
  const [require2FA, setRequire2FA] = useState(true);
  const [samlSSO, setSamlSSO] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <div className="h-[calc(100vh-48px)] flex flex-col pt-8 sm:pt-10 px-4 sm:px-8 w-full relative bg-background text-foreground overflow-y-auto cf-scrollbar">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto flex flex-col flex-1 relative z-10 pb-12">

        {/* HEADER */}
        <div className="flex flex-col border-b border-border/40 pb-6 mb-8">
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <Settings className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-[11px] font-mono uppercase tracking-widest font-semibold text-foreground">System</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Organization Settings</h1>
          <p className="text-[13px] text-muted-foreground mt-2 max-w-2xl">
            Manage your workspace preferences, team access controls, and security perimeters.
          </p>
        </div>

        {/* SPLIT VIEW (Sidebar + Content) */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">

          {/* SETTINGS SIDEBAR */}
          <div className="w-full md:w-56 shrink-0 flex flex-col gap-1 sticky top-4">
            {SETTINGS_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all outline-none cursor-pointer ${
                    isActive
                      ? "bg-[#18181b] border border-border text-foreground shadow-sm"
                      : "border border-transparent text-muted-foreground hover:bg-[#111113] hover:text-foreground"
                  }`}
                >
                  <tab.icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} strokeWidth={isActive ? 2 : 1.5} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* SETTINGS CONTENT AREA */}
          <div className="flex-1 w-full flex flex-col gap-8 pb-12">

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-8"
              >

                {/* --- GENERAL TAB --- */}
                {activeTab === "general" && (
                  <>
                    <div className="bg-[#111113] border border-border rounded-xl shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-border/50">
                        <h2 className="text-[15px] font-bold text-white mb-1">Workspace Name</h2>
                        <p className="text-[13px] text-muted-foreground mb-4">This is your organization&apos;s visible name within Aegisora.</p>
                        <input
                          type="text"
                          value={workspaceName}
                          onChange={(e) => setWorkspaceName(e.target.value)}
                          className="w-full max-w-md bg-[#09090b] border border-border hover:border-sidebar-ring rounded-lg px-4 py-2.5 text-[13px] text-foreground focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div className="px-6 py-3 bg-[#18181b]/50 flex items-center justify-between">
                        <span className="text-[12px] text-muted-foreground">Please use 32 characters at maximum.</span>
                        <button onClick={handleSave} className="bg-[#18181b] border border-border hover:bg-[#27272a] px-4 py-1.5 rounded-lg text-[12px] font-medium text-foreground transition-colors flex items-center gap-2">
                          {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                          {isSaving ? "Saving..." : "Save"}
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#111113] border border-border rounded-xl shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-border/50">
                        <h2 className="text-[15px] font-bold text-white mb-1">Workspace ID</h2>
                        <p className="text-[13px] text-muted-foreground mb-4">Used when interacting with the Aegisora API.</p>
                        <div className="flex items-center gap-3">
                          <code className="bg-[#09090b] border border-border px-3 py-2 rounded-lg text-[12px] text-muted-foreground">ws_prd_9f82b7c41a</code>
                          <button className="p-2 bg-[#18181b] border border-border hover:bg-[#27272a] rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* DANGER ZONE */}
                    <div className="border border-red-900/30 rounded-xl overflow-hidden shadow-sm relative">
                      <div className="absolute inset-0 bg-red-950/10 pointer-events-none" />
                      <div className="p-6 relative z-10">
                        <h2 className="text-[15px] font-bold text-red-500 mb-1 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Danger Zone</h2>
                        <p className="text-[13px] text-red-400/80 mb-6">Permanently delete this workspace and all of its associated AI agents, policies, and audit logs. This action cannot be undone.</p>
                        <button className="bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors">
                          Delete Workspace
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* --- TEAM & WORKSPACE TAB --- */}
                {activeTab === "team" && (
                  <div className="bg-[#111113] border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-[15px] font-bold text-white mb-1">Workspace Members</h2>
                        <p className="text-[13px] text-muted-foreground">Manage who has access to this workspace and their permission levels.</p>
                      </div>
                      <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-[13px] font-medium transition-colors shadow-sm">
                        Invite Member
                      </button>
                    </div>

                    <div className="overflow-x-auto cf-scrollbar">
                      <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                          <tr className="bg-[#18181b] border-b border-border/50">
                            <th className="px-6 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Security</th>
                            <th className="px-6 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-right"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockTeam.map((user) => (
                            <tr key={user.id} className="border-b border-border/40 hover:bg-[#18181b]/80 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-[#27272a] border border-border flex items-center justify-center text-[12px] font-bold text-foreground">
                                    {user.name.charAt(0)}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[13px] font-medium text-foreground">{user.name}</span>
                                    <span className="text-[11px] text-muted-foreground">{user.email}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`text-[11px] font-medium px-2 py-1 rounded-md border ${
                                  user.role === 'Owner' ? 'bg-primary/10 text-primary border-primary/20' :
                                  user.role === 'Admin' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                  'bg-[#18181b] text-muted-foreground border-border'
                                }`}>
                                  {user.role}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                {user.mfa ? (
                                  <span className="flex items-center gap-1.5 text-[11px] text-emerald-400"><ShieldCheck className="w-3.5 h-3.5" /> 2FA Enabled</span>
                                ) : (
                                  <span className="flex items-center gap-1.5 text-[11px] text-decision-block"><AlertTriangle className="w-3.5 h-3.5" /> 2FA Missing</span>
                                )}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button className="text-muted-foreground hover:text-foreground p-1.5 rounded-md hover:bg-[#27272a] transition-colors">
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* --- SECURITY TAB --- */}
                {activeTab === "security" && (
                  <>
                    <div className="bg-[#111113] border border-border rounded-xl shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-border/50 flex items-center justify-between">
                        <div>
                          <h2 className="text-[15px] font-bold text-white mb-1">Require Two-Factor Authentication</h2>
                          <p className="text-[13px] text-muted-foreground">Enforce 2FA for all members of this workspace.</p>
                        </div>
                        <Toggle active={require2FA} onClick={() => setRequire2FA(!require2FA)} />
                      </div>
                      <div className="p-6 border-b border-border/50 flex items-center justify-between bg-[#18181b]/30">
                        <div>
                          <h2 className="text-[15px] font-bold text-white mb-1 flex items-center gap-2">SAML Single Sign-On <span className="bg-primary/20 text-primary text-[9px] px-1.5 py-0.5 rounded uppercase font-bold tracking-widest border border-primary/30">Enterprise</span></h2>
                          <p className="text-[13px] text-muted-foreground">Manage access through your identity provider (Okta, Azure AD).</p>
                        </div>
                        <Toggle active={samlSSO} onClick={() => setSamlSSO(!samlSSO)} />
                      </div>
                      <div className="p-6 flex flex-col gap-3">
                         <h2 className="text-[15px] font-bold text-white">Session Timeout</h2>
                         <p className="text-[13px] text-muted-foreground mb-2">Automatically log out users after a period of inactivity.</p>
                         <select className="w-full max-w-xs bg-[#09090b] border border-border hover:border-sidebar-ring rounded-lg px-3 py-2.5 text-[13px] text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                           <option>15 Minutes</option>
                           <option>1 Hour</option>
                           <option>8 Hours</option>
                           <option>24 Hours</option>
                           <option>Never (Not recommended)</option>
                         </select>
                      </div>
                    </div>
                  </>
                )}

                {/* --- DEVELOPER TAB --- */}
                {activeTab === "developer" && (
                  <div className="bg-[#111113] border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-[15px] font-bold text-white mb-1">API Keys</h2>
                        <p className="text-[13px] text-muted-foreground">Tokens used to authenticate Aegisora API requests.</p>
                      </div>
                      <button className="bg-[#18181b] border border-border hover:bg-[#27272a] text-foreground px-4 py-2 rounded-lg text-[13px] font-medium transition-colors shadow-sm flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Generate New Key
                      </button>
                    </div>

                    <div className="overflow-x-auto cf-scrollbar">
                      <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                          <tr className="bg-[#18181b] border-b border-border/50">
                            <th className="px-6 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Key Name & Token</th>
                            <th className="px-6 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Created</th>
                            <th className="px-6 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Last Used</th>
                            <th className="px-6 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-right"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockApiKeys.map((key, i) => (
                            <tr key={i} className="border-b border-border/40 hover:bg-[#18181b]/80 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex flex-col gap-1.5">
                                  <span className="text-[13px] font-medium text-foreground">{key.name}</span>
                                  <div className="flex items-center gap-2">
                                    <code className="bg-[#09090b] border border-border px-2 py-0.5 rounded text-[11px] text-muted-foreground font-mono">{key.id}••••••••</code>
                                    <button className="text-muted-foreground hover:text-foreground"><Copy className="w-3 h-3" /></button>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-[12px] text-muted-foreground">{key.created}</td>
                              <td className="px-6 py-4 text-[12px] text-muted-foreground">{key.lastUsed}</td>
                              <td className="px-6 py-4 text-right">
                                <button className="text-muted-foreground hover:text-red-400 p-1.5 rounded-md hover:bg-red-400/10 transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Fallback for empty tabs */}
                {(activeTab === "billing" || activeTab === "notifications") && (
                  <div className="flex flex-col items-center justify-center min-h-[40vh] text-center bg-[#111113] border border-border border-dashed rounded-xl p-8">
                    <Shield className="w-10 h-10 text-muted-foreground mb-4 opacity-50" strokeWidth={1} />
                    <h3 className="text-[15px] font-bold text-foreground mb-1">Coming Soon</h3>
                    <p className="text-[13px] text-muted-foreground">This settings module is under active development.</p>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </div>
    </div>
  );
}
