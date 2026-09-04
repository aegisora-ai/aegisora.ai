"use client";
import React from "react";
import { Menu, Bell, ChevronDown } from "lucide-react";

export function Header({ setSidebarOpen }: { setSidebarOpen: (val: boolean) => void }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 shrink-0 flex items-center justify-between px-4 sm:px-6 z-30">
      <div className="flex items-center">
        <button type="button" onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-md transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md cursor-pointer hover:bg-slate-100 transition-colors">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span className="text-sm font-bold text-slate-700">Production Workspace</span>
          <ChevronDown className="w-4 h-4 text-slate-400 ml-2" />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button type="button" className="p-2 text-slate-400 hover:text-slate-600 relative transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-sm ring-2 ring-white cursor-pointer">
          E
        </div>
      </div>
    </header>
  );
}