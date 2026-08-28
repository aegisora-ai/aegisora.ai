"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- MEGA MENÜ VERİ MATRİSİ (Senin verdiğin tabloya birebir uygun) ---
const megaMenu = {
  platform: [
    { name: "Control Plane", href: "/platform/control-plane" }, { name: "Runtime", href: "/platform/runtime" },
    { name: "Security", href: "/platform/security" }, { name: "Policies", href: "/platform/policies" },
    { name: "Audit", href: "/platform/audit" }, { name: "Observability", href: "/platform/observability" }
  ],
  solutions: [
    { name: "AI Security", href: "/solutions/ai-security" }, { name: "Agent Governance", href: "/solutions/agent-governance" },
    { name: "Compliance", href: "/solutions/compliance" }, { name: "Enterprise AI", href: "/solutions/enterprise-ai" },
    { name: "Regulated AI", href: "/solutions/regulated-ai" }
  ],
  developers: [
    { name: "Quickstart", href: "/developers/quickstart" }, { name: "SDK", href: "/developers/sdk" },
    { name: "API", href: "/developers/api" }, { name: "Plugins", href: "/developers/plugins" },
    { name: "Providers", href: "/developers/providers" }, { name: "Tools", href: "/developers/tools" }
  ],
  resources: [
    { name: "Docs", href: "/docs" }, { name: "Hub", href: "/hub" },
    { name: "Guides", href: "/hub/guides" }, { name: "Benchmarks", href: "/hub/benchmarks" },
    { name: "Blog", href: "/blog" }, { name: "Changelog", href: "/changelog" }
  ],
  trust: [
    { name: "Trust Center", href: "/trust" }, { name: "Security", href: "/trust/security" },
    { name: "Compliance", href: "/trust/compliance" }, { name: "GDPR", href: "/trust/gdpr" },
    { name: "DPA", href: "/trust/dpa" }
  ]
};

const NavDropdown = ({ title, items }: { title: string; items: any[] }) => (
  <div className="relative group">
    <button className="flex items-center gap-1 text-[14px] font-bold text-slate-600 hover:text-slate-900 transition-colors py-6">
      {title} <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:rotate-180 transition-transform duration-200" />
    </button>
    <div className="absolute top-full left-0 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50 min-w-[200px]">
      <div className="bg-white border b order-slate-200 rounded-xl shado w-xl p-2 flex flex-col relative before:absolute before:-top-4 before:left-0 before:w-full before:h-4">
        {items.map((item, idx) => (
          <Link key={idx} href={item.href} className="px-4 py-2.5 text-[13px] font-bold text-slate-700 hover:bg-slate-50 hover:text-[#0066FF] rounded-lg transition-colors">
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Eğer Control Plane (Dashboard) içindeysek public navbar'ı HİÇ GÖSTERME.
  // Dashboard'un kendi özel layout'u ve navbar'ı olacak.
  if (pathname.startsWith('/dashboard')) return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md b order-b b order-slate-200">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-[65px]">

        {/* LOGO */}
        <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
          <img src="/logo.png" alt="Aegisora" className="h-6 w-auto object-contain" />
        </Link>

        {/* MASAÜSTÜ MENÜ */}
        <div className="hidden lg:flex items-center justify-between flex-1 pl-10">
          <nav className="flex items-center gap-6">
            <NavDropdown title="Platform" items={megaMenu.platform} />
            <NavDropdown title="Solutions" items={megaMenu.solutions} />
            <NavDropdown title="Developers" items={megaMenu.developers} />
            <NavDropdown title="Resources" items={megaMenu.resources} />
            <NavDropdown title="Trust" items={megaMenu.trust} />
            <Link href="/open-source" className="text-[14px] font-bold text-slate-600 hover:text-slate-900 transition-colors">Open Source</Link>
            <Link href="/pricing" className="text-[14px] font-bold text-slate-600 hover:text-slate-900 transition-colors">Pricing</Link>
          </nav>

          <div className="flex items-center gap-4 ml-6">
            <Link href="/enterprise" className="text-[13px] font-bold text-slate-600 hover:text-slate-900 transition-colors hidden xl:block">Contact Sales</Link>
            <Link href="/login" className="text-[13px] font-bold text-slate-600 hover:text-[#0066FF] transition-colors ml-2">Sign In</Link>
            <Link href="/register" className="px-4 py-2 text-[13px] font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shado w-sm transition-colors">Get Started</Link>
          </div>
        </div>

        {/* MOBİL BUTON */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 p-2"><Menu className="w-5 h-5"/></button>
        </div>
      </div>
    </header>
  );
}
