"use client";

import Link from "next/link";
import { BookOpen, Code2, FileText, ShieldCheck } from "lucide-react";

const docs = [
  ["Quickstart", "Install the runtime and integrate the execution boundary.", "/developers/quickstart", Code2],
  ["Security model", "Understand identity, policy, decision, enforcement and evidence.", "/security", ShieldCheck],
  ["API reference", "Explore the runtime and governance contracts.", "/docs/api", FileText],
  ["Architecture", "Follow the execution path across the Aegisora system.", "/platform", BookOpen],
];

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1240px] px-6 py-20 md:px-8 md:py-28">
          <div className="text-[11px] font-black uppercase tracking-[0.16em] text-[#2563EB]">Documentation</div>
          <h1 className="mt-4 text-[54px] font-black tracking-[-0.055em] md:text-[80px]">Build with control.</h1>
          <p className="mt-6 max-w-2xl text-[19px] font-medium leading-8 text-slate-500">
            Technical documentation for integrating Aegisora into autonomous agent execution paths.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1240px] px-6 py-20 md:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            {docs.map(([title, description, href, Icon]) => (
              <Link href={String(href)} key={String(title)} className="aegis-panel group p-7">
                <Icon className="h-5 w-5 text-[#2563EB]" />
                <h2 className="mt-6 text-[22px] font-black">{String(title)}</h2>
                <p className="mt-3 text-[15px] font-medium leading-7 text-slate-500">{String(description)}</p>
                <div className="mt-6 text-[11px] font-black text-[#2563EB]">Open →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}