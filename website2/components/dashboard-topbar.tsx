"use client";

import {
  Bell,
  ChevronDown,
  Menu,
  Search,
} from "lucide-react";

export function DashboardTopbar() {
  return (
    <header className="aegis-topbar sticky top-0 z-30 flex h-[68px] items-center justify-between px-4 sm:px-6 lg:ml-[252px] lg:px-8">
      <div className="min-w-0">
        <div className="hidden text-[12px] font-medium text-[#AAB5C2] sm:block">
          Demo Organization
        </div>
        <div className="hidden text-[9px] uppercase tracking-[0.14em] text-[#566273] sm:block">
          Production workspace
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1F2935] bg-white/[0.02] text-[#8B96A5] sm:hidden"
          aria-label="Menu"
        >
          <Menu size={16} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="hidden h-9 items-center gap-2 rounded-lg border border-[#1F2935] bg-white/[0.02] px-3 text-[10px] text-[#6D7887] sm:flex"
        >
          <Search size={13} />
          Search
          <span className="rounded border border-[#2A3644] px-1.5 py-0.5 font-mono text-[8px]">
            ⌘K
          </span>
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#1F2935] bg-white/[0.02] text-[#8B96A5]"
        >
          <Bell size={15} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#E0524D]" />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-[#1F2935] bg-white/[0.02] px-2 py-1.5"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#4C7DFF]/10 text-[10px] font-semibold text-[#6E96FF]">
            EO
          </span>

          <span className="hidden text-[10px] text-[#D9E0E7] sm:block">
            Workspace Admin
          </span>

          <ChevronDown size={12} className="text-[#5F6B7A]" />
        </button>
      </div>
    </header>
  );
}