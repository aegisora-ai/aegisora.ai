"use client";
import React from "react";
import { Users, Plus, Shield, User, MoreHorizontal } from "lucide-react";

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Workspace Team</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Manage who has access to this Aegisora workspace.</p>
        </div>
        <button type="button" className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-slate-800">
          <Plus className="w-4 h-4"/> Invite Member
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500">User</th>
              <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500">Role</th>
              <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">E</div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Eray Ozer (You)</div>
                  <div className="text-xs text-slate-500">admin@enterprise.com</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded w-fit"><Shield className="w-3 h-3"/> Owner</span>
              </td>
              <td className="px-6 py-4"><span className="text-xs font-bold text-emerald-600">Active</span></td>
              <td className="px-6 py-4 text-right"><button className="text-slate-400"><MoreHorizontal className="w-4 h-4"/></button></td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm"><User className="w-4 h-4"/></div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Security Team</div>
                  <div className="text-xs text-slate-500">security@enterprise.com</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded w-fit">Admin</span>
              </td>
              <td className="px-6 py-4"><span className="text-xs font-bold text-emerald-600">Active</span></td>
              <td className="px-6 py-4 text-right"><button className="text-slate-400"><MoreHorizontal className="w-4 h-4"/></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}