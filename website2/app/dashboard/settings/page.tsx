"use client";
import React from "react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Workspace Settings</h1>
        <p className="text-sm text-slate-500 font-medium mt-1">Manage your Aegisora environment configurations.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-base font-black text-slate-900 mb-4">General Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Workspace Name</label>
              <input type="text" defaultValue="Production Workspace" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Workspace ID</label>
              <input type="text" defaultValue="ws_9x182z2b" disabled className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 font-mono" />
            </div>
          </div>
        </div>
        <div className="p-6 bg-slate-50/50 flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700">Save Changes</button>
        </div>
      </div>
      
      <div className="bg-white border border-rose-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-base font-black text-rose-600 mb-2">Danger Zone</h2>
          <p className="text-sm text-slate-600 mb-4">Permanently delete this workspace and all associated data, agents, and policies.</p>
          <button className="px-4 py-2 bg-rose-50 text-rose-600 border border-rose-200 text-sm font-bold rounded-lg hover:bg-rose-100">Delete Workspace</button>
        </div>
      </div>
    </div>
  );
}