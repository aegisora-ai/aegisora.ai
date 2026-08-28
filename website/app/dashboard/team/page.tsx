"use client";
import React from "react";
import { Users2, Plus, MoreHorizontal, Shield } from "lucide-react";

const teamData = [
  { id: "u_1", name: "Eray Özer", email: "eray@acme.com", role: "Owner", status: "Active", avatar: "https://i.pravatar.cc/150?img=11" },
  { id: "u_2", name: "Jane Doe", email: "jane@acme.com", role: "Admin", status: "Active", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: "u_3", name: "Alex Smith", email: "alex@acme.com", role: "Editor", status: "Invited", avatar: "https://i.pravatar.cc/150?img=8" },
  { id: "u_4", name: "Security Audit Bot", email: "bot_sec@acme.com", role: "Viewer", status: "Active", avatar: "https://i.pravatar.cc/150?img=3" },
];

export default function TeamPage() {
  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[24px] font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Users2 className="w-6 h-6 text-slate-400" /> Team Members
          </h1>
          <p className="text-[14px] text-slate-500 font-medium mt-1">Manage workspace access and assign role-based permissions.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-[13px] font-bold rounded-lg shado w-sm hover:bg-slate-800 transition-colors">
          <Plus className="w-4 h-4" /> Invite Member
        </button>
      </div>

      <div className="bg-white border b order-slate-200 rounded-xl shado w-sm overflo w-hidden">
        <table className="w-full text-left b order-collapse">
          <thead>
            <tr className="bg-slate-50 b order-b b order-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {teamData.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className={`w-8 h-8 rounded-full ${user.status === 'Invited' ? 'opacity-50 grayscale' : 'grayscale'}`} />
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-slate-900">{user.name}</span>
                      <span className="text-[12px] text-slate-500">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider border ${
                    user.role === 'Owner' || user.role === 'Admin' ? 'bg-indigo-50 text-indigo-700 b order-indigo-100' : 'bg-slate-100 text-slate-600 b order-slate-200'
                  }`}>
                    {user.role === 'Owner' && <Shield className="w-3 h-3" />}
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                   <span className={`text-[13px] font-medium ${user.status === 'Active' ? 'text-emerald-600' : 'text-slate-400 italic'}`}>
                     {user.status}
                   </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 text-slate-400 hover:text-slate-900 rounded-md hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-all">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
