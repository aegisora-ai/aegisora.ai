# `app/admin/page.tsx`

```tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  RefreshCw,
  CheckCircle2,
  Lock,
  Terminal,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AccessRequest {
  email: string;
  status: "pending" | "approved";
  date: string;
}

interface RequestsResponse {
  requests: AccessRequest[];
  count: number;
}

export default function AdminPanel() {
  const [secret, setSecret] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const fetchRequests = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/early-access", {
        method: "GET",
        cache: "no-store",
      });

      if (res.status === 401) {
        setIsAuthenticated(false);
        setRequests([]);
        return;
      }

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = (await res.json()) as RequestsResponse;

      if (!Array.isArray(data.requests)) {
        throw new Error("Invalid admin response format");
      }

      setRequests(data.requests);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("[Aegisora Admin] Failed to fetch requests:", error);

      setRequests([]);
    } finally {
      setIsLoading(false);
      setIsCheckingSession(false);
    }
  }, []);

  useEffect(() => {
    void fetchRequests();
  }, [fetchRequests]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!secret.trim()) {
      return;
    }

    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          action: "login",
          adminSecret: secret,
        }),
      });

      if (res.status === 401) {
        alert("Invalid Security Clearance!");
        return;
      }

      if (!res.ok) {
        throw new Error(`Login failed with status ${res.status}`);
      }

      setSecret("");
      setIsAuthenticated(true);

      await fetchRequests();
    } catch (error) {
      console.error(
        "[Aegisora Admin] Authentication failed:",
        error,
      );

      alert("Authentication service unavailable.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          action: "logout",
        }),
      });

      if (!res.ok) {
        throw new Error(`Logout failed with status ${res.status}`);
      }
    } catch (error) {
      console.error(
        "[Aegisora Admin] Logout failed:",
        error,
      );
    } finally {
      setIsAuthenticated(false);
      setRequests([]);
      setSecret("");
    }
  };

  const approveUser = async (email: string) => {
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          email,
          action: "approve",
        }),
      });

      if (res.status === 401) {
        setIsAuthenticated(false);
        setRequests([]);
        return;
      }

      if (!res.ok) {
        throw new Error(
          `Approval failed with status ${res.status}`,
        );
      }

      const data = (await res.json()) as {
        success?: boolean;
        requests?: AccessRequest[];
      };

      if (!data.success || !Array.isArray(data.requests)) {
        throw new Error("Invalid approval response");
      }

      setRequests(data.requests);
    } catch (error) {
      console.error(
        "[Aegisora Admin] Failed to approve user:",
        error,
      );

      alert("Unable to authorize this user.");
    }
  };

  if (isCheckingSession) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6 font-sans">
        <div className="flex items-center gap-3 text-zinc-500 font-mono text-xs uppercase tracking-widest">
          <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
          Checking secure session...
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-6 font-sans relative overflow-hidden selection:bg-blue-500/30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(0,102,238,0.15)_0%,transparent_70%)] pointer-events-none" />

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleLogin}
          className="relative z-10 bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800 p-8 sm:p-10 rounded-[2rem] max-w-sm w-full space-y-8 shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-2 shadow-inner">
              <Lock className="w-6 h-6" />
            </div>

            <h1 className="text-2xl font-serif tracking-tight text-white">
              Secure Gateway
            </h1>

            <p className="text-[11px] font-mono text-zinc-400 leading-relaxed uppercase tracking-widest">
              Aegisora Command Center
            </p>
          </div>

          <div className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Terminal className="w-4 h-4 text-zinc-500" />
              </div>

              <input
                type="password"
                placeholder="Enter root password..."
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                autoComplete="current-password"
                disabled={isLoggingIn}
                className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner placeholder:text-zinc-600 disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn || !secret.trim()}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900/40 disabled:text-blue-400/50 text-white py-3.5 rounded-xl text-xs font-mono font-medium transition-all shadow-lg shadow-blue-600/20 cursor-pointer disabled:cursor-not-allowed outline-none flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Authenticate</span>
                  <ShieldCheck className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </motion.form>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-mono text-zinc-600 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Secure admin session
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 font-sans relative overflow-hidden selection:bg-blue-500/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(0,102,238,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1000px] mx-auto space-y-8 relative z-10 pt-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-zinc-800/80 pb-6 gap-6">
          <div>
            <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-blue-400 bg-blue-950/60 border border-blue-800/40 px-3 py-1 rounded-full mb-4 inline-block">
              Root Access
            </span>

            <h1 className="text-3xl md:text-4xl font-serif tracking-tight text-white mb-2">
              Command Center
            </h1>

            <p className="text-zinc-400 text-xs font-mono">
              Monitor, manage, and approve early access sandbox
              deployment requests.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => void fetchRequests()}
              disabled={isLoading}
              className="bg-zinc-900/80 hover:bg-zinc-800 disabled:opacity-50 border border-zinc-700 text-white text-[11px] font-mono px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed transition-colors outline-none shadow-sm"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-blue-400 ${
                  isLoading ? "animate-spin" : ""
                }`}
              />
              <span>Refresh Telemetry</span>
            </button>

            <button
              onClick={() => void handleLogout()}
              className="bg-zinc-900/80 hover:bg-red-950/60 border border-zinc-700 hover:border-red-800/60 text-zinc-300 hover:text-red-300 text-[11px] font-mono px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors outline-none"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-[2rem] overflow-hidden shadow-2xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] font-mono uppercase tracking-widest bg-zinc-950/50">
                  <th className="p-5 font-medium">
                    Identity / Email
                  </th>
                  <th className="p-5 font-medium">
                    Clearance Status
                  </th>
                  <th className="p-5 font-medium">
                    Timestamp
                  </th>
                  <th className="p-5 font-medium text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="font-mono text-xs">
                {requests.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-16 text-center"
                    >
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <Terminal className="w-6 h-6 text-zinc-700" />

                        <span className="text-zinc-500 text-[11px] uppercase tracking-widest">
                          Awaiting network requests...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence>
                    {requests.map((req) => (
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={req.email}
                        className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors group"
                      >
                        <td className="p-5 text-zinc-300 font-medium">
                          {req.email}
                        </td>

                        <td className="p-5">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest ${
                              req.status === "approved"
                                ? "bg-emerald-950/40 text-emerald-400 border border-emerald-800/30"
                                : "bg-amber-950/40 text-amber-400 border border-amber-800/30"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                req.status === "approved"
                                  ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                                  : "bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-pulse"
                              }`}
                            />

                            {req.status}
                          </span>
                        </td>

                        <td className="p-5 text-zinc-500">
                          {new Date(
                            req.date,
                          ).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </td>

                        <td className="p-5 text-right">
                          {req.status !== "approved" ? (
                            <button
                              onClick={() =>
                                void approveUser(req.email)
                              }
                              className="bg-blue-600/10 hover:bg-blue-600 hover:text-white text-blue-400 border border-blue-600/30 text-[10px] font-mono font-medium px-4 py-2 rounded-full transition-all shadow-sm cursor-pointer outline-none inline-flex items-center gap-1.5 uppercase tracking-widest"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Authorize</span>
                            </button>
                          ) : (
                            <span className="text-zinc-600 text-[10px] uppercase tracking-widest font-semibold px-4 py-2 inline-flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              Active
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
```
