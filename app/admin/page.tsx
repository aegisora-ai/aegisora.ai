"use client";

import { useState, useEffect } from "react";

export default function AdminPanel() {
  const [secret, setSecret] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [requests, setRequests] = useState<
    { email: string; status: string; date: string }[]
  >([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (secret === "Mdse.1234") {
      setIsAuthenticated(true);
      fetchRequests();
    } else {
      alert("Invalid Admin Secret!");
    }
  };

  const fetchRequests = async () => {
    const res = await fetch("/api/early-access");
    const data = await res.json();
    setRequests(data);
  };

  const approveUser = async (email: string) => {
    const res = await fetch("/api/early-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        action: "approve",
        adminSecret: "Mdse.1234",
      }),
    });
    const data = await res.json();
    if (data.success) {
      setRequests(data.requests);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-sm w-full space-y-4"
        >
          <h1 className="text-xl font-bold">Admin Portal Login</h1>
          <p className="text-xs text-zinc-400">
            Enter your secure management password.
          </p>
          <input
            type="password"
            placeholder="Admin Password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            Access Admin Panel
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold">Aegisora Admin Dashboard</h1>
            <p className="text-zinc-400 text-sm">
              Manage and approve early access sandbox requests.
            </p>
          </div>
          <button
            onClick={fetchRequests}
            className="bg-zinc-800 hover:bg-zinc-700 text-xs px-4 py-2 rounded-lg cursor-pointer transition-colors"
          >
            Refresh List
          </button>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 text-xs uppercase bg-black/40">
                <th className="p-4">Email</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center text-zinc-500 text-sm"
                  >
                    No requests found yet.
                  </td>
                </tr>
              ) : (
                requests.map((req, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-zinc-800/60 hover:bg-zinc-800/20"
                  >
                    <td className="p-4 font-mono text-zinc-200">{req.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${req.status === "approved" ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800" : "bg-amber-950/60 text-amber-400 border border-amber-800"}`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-zinc-400">
                      {new Date(req.date).toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      {req.status !== "approved" && (
                        <button
                          onClick={() => approveUser(req.email)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4 py-1.5 rounded-lg font-medium transition-colors cursor-pointer"
                        >
                          Approve Access
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
