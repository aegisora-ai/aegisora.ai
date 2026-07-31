"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function EarlyAccessPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        if (data.status === "approved") {
          localStorage.setItem("aegisora_user_email", email);
          router.push("/early-access/sandbox");
        } else {
          setStatusMessage(
            "Request received! Your access is pending Eray's admin approval.",
          );
        }
      }
    } catch (error) {
      setStatusMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl backdrop-blur-xl relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold bg-blue-950/40 px-3 py-1 rounded-full border border-blue-800/50">
            Core Contributor Program
          </span>
          <h1 className="text-3xl font-bold mt-4 tracking-tight">
            Aegisora Early Access & Sandbox
          </h1>
          <p className="text-zinc-400 text-sm mt-2">
            Shape the future of autonomous AI governance. Enter your
            professional email to request secure access.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Professional / Work Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com or university.de"
              className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-zinc-200 transition-colors text-sm tracking-wide disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Checking..." : "Request Secure Access"}
          </button>
        </form>

        {statusMessage && (
          <div className="mt-6 p-4 bg-amber-950/30 border border-amber-800/40 rounded-xl text-center text-amber-400 text-xs">
            {statusMessage}
          </div>
        )}
      </motion.div>
    </main>
  );
}
