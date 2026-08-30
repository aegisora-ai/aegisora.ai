"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const posts = [
  ["Aegisora 1.5", "Evidence Integrity & Zero-Trust Enforcement", "release"],
  ["Security architecture", "Why execution boundaries matter for autonomous AI", "research"],
  ["Open source", "How to challenge an AI governance runtime", "community"],
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1240px] px-6 py-20 md:px-8 md:py-28">
          <div className="text-[11px] font-black uppercase tracking-[0.16em] text-[#2563EB]">Insights</div>
          <h1 className="mt-4 text-[54px] font-black tracking-[-0.055em] md:text-[80px]">Security, governance and autonomous AI.</h1>
          <p className="mt-6 max-w-2xl text-[18px] font-medium leading-8 text-slate-500">
            Product releases, engineering notes and research from the Aegisora project.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1240px] px-6 py-20 md:px-8">
          <div className="space-y-4">
            {posts.map(([eyebrow, title, slug]) => (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className="aegis-panel flex flex-col gap-6 p-7 transition hover:border-[#2563EB]/40 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.16em] text-[#2563EB]">{eyebrow}</div>
                  <div className="mt-2 text-[24px] font-black">{title}</div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-slate-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}