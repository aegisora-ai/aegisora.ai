import React from "react";
import { ShieldCheck } from "lucide-react";

export default function EnterpriseMark({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-white shadow-sm">
        <ShieldCheck className="h-4 w-4" />
      </div>

      {!compact && (
        <div className="leading-none">
          <div className="text-[14px] font-black tracking-[-0.03em] text-slate-950">
            AEGISORA
          </div>
          <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.18em] text-slate-400">
            AI Execution Governance
          </div>
        </div>
      )}
    </div>
  );
}