"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "hero", label: "Overview" },
  { id: "interactive-analysis", label: "Intelligence" },
  { id: "made-for-anyone", label: "Enterprise" },
  { id: "pricing", label: "Pricing" },
  { id: "blog", label: "Research" },
];

export default function SectionNavigator() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3 pointer-events-auto">
      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group flex items-center gap-3 cursor-pointer py-1.5 focus:outline-none"
          >
            {/* Label (Hover olduğunda veya aktifken görünür) */}
            <span
              className={`font-mono text-[11px] transition-all duration-300 opacity-0 group-hover:opacity-100 bg-black/80 text-white px-2.5 py-1 rounded-md backdrop-blur-md shadow-lg ${
                isActive ? "!opacity-100 text-blue-400 font-semibold" : ""
              }`}
            >
              {section.label}
            </span>

            {/* İndikatör Çizgisi/Noktası */}
            <div
              className={`relative flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? "w-8 h-2 bg-[#0066EE]"
                  : "w-3 h-2 bg-slate-400/50 hover:bg-slate-600"
              } rounded-full`}
            />
          </button>
        );
      })}
    </div>
  );
}
