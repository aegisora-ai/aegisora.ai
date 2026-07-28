"use client";

import {
  ShieldCheck,
  Shield,
  Network,
  UserCheck,
  Cloud,
  FileText,
} from "lucide-react";

export default function SecureByDefault() {
  const securityFeatures = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#0066EE]" />,
      title: "GDPR Compliant",
    },
    {
      icon: (
        <div className="flex flex-col items-center justify-center text-[9px] font-bold text-[#0066EE] leading-tight">
          <span>AICPA</span>
          <span>SOC2</span>
        </div>
      ),
      title: "SOC 2",
      sub: "(Certification in progress)",
    },
    {
      icon: (
        <div className="flex flex-col items-center justify-center text-[10px] font-bold text-[#0066EE] leading-tight">
          <div className="border border-[#0066EE] rounded-full w-7 h-7 flex items-center justify-center">
            ISO
          </div>
        </div>
      ),
      title: "ISO 27001",
      sub: "(Certification in progress)",
    },
    {
      icon: <Shield className="w-5 h-5 text-[#0066EE]" />,
      title: "Rest Encryption",
    },
    {
      icon: (
        <svg
          className="w-5 h-5 text-[#0066EE]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="5" y="11" width="14" height="10" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
      title: "Transit Encryption",
    },
    {
      icon: <Cloud className="w-5 h-5 text-[#0066EE]" />,
      title: "Data Backups",
    },
    {
      icon: <Network className="w-5 h-5 text-[#0066EE]" />,
      title: "Role-based Access",
    },
    {
      icon: <UserCheck className="w-5 h-5 text-[#0066EE]" />,
      title: "User Permissions",
    },
    {
      icon: <FileText className="w-5 h-5 text-[#0066EE]" />,
      title: "Audit logging",
    },
  ];

  return (
    <section className="relative w-full flex justify-center px-6 py-28 bg-transparent font-sans z-10">
      {/* Gönderdiğin Görseldeki O Özel Renk Tonu (bg-[#ededef]) ve Belirgin Yapı */}
      <div className="w-full max-w-[1200px] bg-[#ededef]/95 backdrop-blur-3xl rounded-[2.5rem] p-10 lg:p-16 flex flex-col lg:flex-row gap-16 lg:gap-12 items-center lg:items-start border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
        {/* Sol Taraf: Tipografi ve Buton */}
        <div className="w-full lg:w-[35%] flex flex-col items-start gap-6">
          <h2 className="text-4xl lg:text-[3.2rem] font-serif text-[#111111] leading-[1.1] tracking-tight">
            Secure by default.
          </h2>

          <p className="font-mono text-gray-700 text-[13.5px] leading-relaxed max-w-sm font-medium">
            Encryption in transit and at rest, access controls, and compliant
            infrastructure — your data is protected at every stage.
          </p>

          <button className="bg-[#0066EE] hover:bg-[#005bb5] cursor-pointer text-white font-mono text-[11px] px-6 py-3.5 rounded-full transition-colors mt-2 shadow-md">
            Read More
          </button>
        </div>

        {/* Sağ Taraf: Özellikler Grid Yapısı (Net ve Belirgin İkon Kutuları) */}
        <div className="w-full lg:w-[65%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 lg:pt-2">
          {securityFeatures.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-white/80 group-hover:scale-105 transition-transform">
                {feature.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[14.5px] font-semibold text-gray-900 leading-tight">
                  {feature.title}
                </span>
                {feature.sub && (
                  <span className="text-[11px] text-gray-500 font-medium mt-0.5">
                    {feature.sub}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
