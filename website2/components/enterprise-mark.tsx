import { ShieldCheck } from "lucide-react";

export function EnterpriseMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#4C7DFF]/10 text-[#6E96FF]">
        <ShieldCheck size={19} strokeWidth={2} />
      </div>

      <div>
        <div className="text-[13px] font-semibold tracking-[0.18em] text-white">
          AEGISORA
        </div>
        <div className="text-[9px] uppercase tracking-[0.18em] text-[#687687]">
          Control Center
        </div>
      </div>
    </div>
  );
}