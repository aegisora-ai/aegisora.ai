"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 relative overflo w-hidden">
      {/* Arka plan parıltı efekti */}
      <div className="absolute w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-zinc-900/50 border b order-zinc-800 p-8 rounded-2xl backdrop-blur-xl relative z-10 shado w-2xl text-center space-y-6"
      >
        {/* Onay İkonu */}
        <div className="w-16 h-16 bg-emerald-950/40 border b order-emerald-800/50 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-2xl">
          ✓
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold bg-emerald-950/40 px-3 py-1 rounded-full border b order-emerald-800/50">
            Access Granted
          </span>
          <h1 className="text-2xl font-bold mt-4 tracking-tight">
            Welcome to the Core Circle
          </h1>
          <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
            Your professional profile has been verified. Your secure sandbox
            environment is now provisioned for multi-agent governance testing.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/early-access/sandbox"
            className="w-full inline-block bg-white text-black font-medium py-3 rounded-xl hover:bg-zinc-200 transition-colors text-sm tracking-wide text-center shado w-lg"
          >
            Launch Contributor Sandbox →
          </Link>
        </div>

        <div className="text-xs text-zinc-500 pt-4 b order-t b order-zinc-800/50">
          Aegisora Enterprise AI Governance Layer • Secured Node
        </div>
      </motion.div>
    </main>
  );
}
