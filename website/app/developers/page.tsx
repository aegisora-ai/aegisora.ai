"use client";

import Link from "next/link";
import { ArrowRight, Code2, GitBranch, Terminal } from "lucide-react";

export default function DevelopersPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1240px] px-6 py-20 md:px-8 md:py-28">
          <div className="max-w-4xl">
            <div className="text-[11px] font-black uppercase tracking-[0.16em] text-[#2563EB]">Developers</div>
            <h1 className="mt-4 text-[54px] font-black leading-[0.95] tracking-[-0.055em] md:text-[82px]">
              Put a governance
              <br />
              boundary in your runtime.
            </h1>
            <p className="mt-7 max-w-2xl text-[19px] font-medium leading-8 text-slate-500">
              Integrate Aegisora into the path where autonomous agents request tools, providers, APIs and other consequential actions.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/developers/quickstart" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-[14px] font-black text-white">
                Quickstart <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="https://github.com/aegisora-ai/aegisora" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-[14px] font-black">
                GitHub <GitBranch className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1240px] px-6 py-20 md:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              [Terminal, "Runtime first", "Enforce at the action boundary rather than relying on post-hoc monitoring."],
              [Code2, "Developer native", "Keep APIs, SDKs and contracts explicit so teams can build on the security model."],
              [ArrowRight, "Open source", "Inspect, test, challenge and extend the runtime in public."],
            ].map(([Icon, title, description]) => (
              <div key={String(title)} className="aegis-panel p-7">
                <Icon className="h-5 w-5 text-[#2563EB]" />
                <h2 className="mt-6 text-[22px] font-black">{String(title)}</h2>
                <p className="mt-3 text-[15px] font-medium leading-7 text-slate-500">{String(description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}