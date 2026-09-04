"use client";
import React from "react";
import { AlertTriangle, Lock, ShieldCheck, PieChart, ArrowRight } from "lucide-react";
export default function DecisionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-slate-900">Decision Intelligence</h1>
      <p className="text-sm text-slate-500">Aggregate view of Aegisora Edge routing and enforcement logic.</p>
      <div className="bg-white p-12 border border-slate-200 rounded-xl shadow-sm flex flex-col items-center justify-center text-center">
        <PieChart className="w-16 h-16 text-blue-500 mb-4 opacity-20" />
        <h2 className="text-lg font-bold text-slate-900">Decision Analytics Engine Loading</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md">The machine learning model is currently analyzing your traces to generate insights on policy effectiveness.</p>
        <button onClick={() => window.location.href='/dashboard/traces'} className="mt-6 flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700">View Raw Traces <ArrowRight className="w-4 h-4"/></button>
      </div>
    </div>
  );
}