"use client";

import Link from "next/link";
import { ArrowRight, Building2, MessageSquare, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1000px] px-6 py-20 text-center md:px-8 md:py-28">
          <div className="text-[11px] font-black uppercase tracking-[0.16em] text-[#2563EB]">Contact</div>
          <h1 className="mt-4 text-[54px] font-black tracking-[-0.055em] md:text-[80px]">Bring Aegisora into the architecture review.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-[18px] font-medium leading-8 text-slate-500">
            Talk to the team about runtime integration, enterprise governance, security research or design partnerships.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1000px] px-6 py-20 md:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              [Building2, "Enterprise", "Architecture, deployment and governance discussions.", "/contact/business-inquiry"],
              [MessageSquare, "Support", "Integration and developer questions.", "/contact/support"],
              [ShieldCheck, "Security", "Security research and responsible disclosure.", "/security"],
            ].map(([Icon, title, body, href]) => (
              <Link href={String(href)} key={String(title)} className="aegis-panel p-7">
                <Icon className="h-5 w-5 text-[#2563EB]" />
                <h2 className="mt-6 text-[20px] font-black">{String(title)}</h2>
                <p className="mt-3 text-[14px] font-medium leading-6 text-slate-500">{String(body)}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-[11px] font-black text-[#2563EB]">
                  Continue <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}