"use client";
import React from "react";
import { Shield, Target } from "lucide-react";
export default function IncidentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-slate-900">Security Incidents</h1>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-16 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4"><Shield className="w-8 h-8 text-emerald-500"/></div>
        <h2 className="text-xl font-black text-slate-900">Zero Active Threats</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md">Your workspace is currently secure. Any multi-stage attacks or coordinated prompt injections will be automatically escalated here.</p>
      </div>
    </div>
  );
}