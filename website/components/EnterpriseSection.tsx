import React from "react";

export default function EnterpriseSection({
  eyebrow,
  title,
  description,
  children,
  muted = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <section className={`${muted ? "bg-slate-50" : "bg-white"} border-b border-slate-200`}>
      <div className="mx-auto max-w-[1240px] px-6 py-20 md:px-8 md:py-28">
        {eyebrow && (
          <div className="mb-4 text-[11px] font-black uppercase tracking-[0.18em] text-[#2563EB]">
            {eyebrow}
          </div>
        )}

        <h2 className="max-w-4xl text-[36px] font-black tracking-[-0.045em] text-slate-950 md:text-[56px] md:leading-[0.98]">
          {title}
        </h2>

        {description && (
          <p className="mt-6 max-w-2xl text-[18px] font-medium leading-8 text-slate-500">
            {description}
          </p>
        )}

        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}