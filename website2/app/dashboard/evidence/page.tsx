"use client";
import React from "react";
import { FileBadge, Download, Fingerprint } from "lucide-react";
export default function EvidencePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-900">Cryptographic Evidence</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg shadow-sm"><Download className="w-4 h-4"/> Export Ledger</button>
      </div>
      <div className="bg-slate-950 border border-slate-800 rounded-xl shadow-xl p-8 font-mono text-xs text-slate-400">
        <div className="flex items-center gap-2 text-emerald-400 mb-6"><Fingerprint className="w-5 h-5"/> <span>Ledger Integrity Verified</span></div>
        <div className="space-y-2">
          <p>[SYS] Block Hash: sha256:8f2a...19x -> Signed: Aegisora Auth Node</p>
          <p>[SYS] Block Hash: sha256:11x9...4bc -> Signed: Aegisora Auth Node</p>
          <p>[SYS] Ledger synced to immutable storage. Ready for compliance review.</p>
        </div>
      </div>
    </div>
  );
}