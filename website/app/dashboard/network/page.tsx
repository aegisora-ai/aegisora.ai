"use client";
import React from "react";
import { Wifi, ShieldCheck, Globe, Lock, Server } from "lucide-react";

export default function NetworkPage() {
  return (
    <div className="max-w-[1000px] mx-auto animate-in fade-in duration-500">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[24px] font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Wifi className="w-6 h-6 text-slate-400" /> Network & VPC Controls
        </h1>
        <p className="text-[14px] text-slate-500 font-medium mt-1">Configure IP allowlists, private endpoints, and edge proxy routing policies.</p>
      </div>

      {/* VPC Peering Card */}
      <div className="bg-white border b order-slate-200 rounded-xl shado w-sm p-8 mb-8">
        <div className="flex items-center justify-between mb-6 pb-6 b order-b b order-slate-100">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-blue-50 border b order-blue-100 rounded-xl flex items-center justify-center text-[#0066FF]">
               <Server className="w-6 h-6" />
             </div>
             <div>
               <h3 className="text-[18px] font-bold text-slate-900">AWS VPC Peering Connection</h3>
               <p className="text-[13px] text-slate-500">Establish a direct, encrypted tunnel between your AWS infrastructure and Aegisora Runtime.</p>
             </div>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[11px] font-bold uppercase tracking-wider rounded-md">Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[13px]">
          <div>
            <span className="text-slate-400 font-bold uppercase block mb-1">VPC ID</span>
            <code className="font-mono text-slate-800 bg-slate-100 px-2 py-1 rounded">vpc-08f72a6b311c</code>
          </div>
          <div>
            <span className="text-slate-400 font-bold uppercase block mb-1">Region</span>
            <span className="font-bold text-slate-900">eu-central-1 (Frankfurt)</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold uppercase block mb-1">Routing Mode</span>
            <span className="font-bold text-slate-900">Private Subnet Only</span>
          </div>
        </div>
      </div>

      {/* IP Allowlists */}
      <div className="bg-white border b order-slate-200 rounded-xl shado w-sm p-8">
        <h3 className="text-[18px] font-bold text-slate-900 mb-2">IP Allowlists for Control Plane</h3>
        <p className="text-[13px] text-slate-500 mb-6">Restrict API access to your organization's corporate static IP ranges.</p>

        <div className="space-y-3 mb-6">
           {["194.24.11.0/24 (Frankfurt Office)", "10.120.4.0/16 (AWS Internal VPC)"].map((ip, idx) => (
             <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 border b order-slate-200 rounded-lg text-[13px]">
               <code className="font-mono font-bold text-slate-800">{ip}</code>
               <button className="text-rose-600 hover:underline font-bold text-[12px]">Revoke</button>
             </div>
           ))}
        </div>
        <button className="px-4 py-2 bg-slate-100 text-slate-700 text-[13px] font-bold rounded-lg hover:bg-slate-200 transition-colors">
          + Add IP Range
        </button>
      </div>

    </div>
  );
}
