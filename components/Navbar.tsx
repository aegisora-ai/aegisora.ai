"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const navData = {
  Product: {
    items: [
      {
        title: "Sign up",
        desc: "Create your free account",
        href: "/get-started",
      },
      {
        title: "For business",
        desc: "Protect your organization",
        href: "/business",
      },
      { title: "Pricing", desc: "Start free, commit later", href: "/pricing" },
    ],
  },
  Contact: {
    items: [
      { title: "Sales", desc: "Reach our sales team", href: "/contact/sales" },
      {
        title: "Business Inquiry",
        desc: "General business contact",
        href: "/contact/business-inquiry",
      },
      {
        title: "Partnership",
        desc: "Team up with Aegisora",
        href: "/contact/partnership",
      },
    ],
  },
  Company: {
    items: [
      { title: "About", desc: "Who we are & what we do", href: "/about" },
      { title: "Blog", desc: "Privacy insights & news", href: "/blog" },
    ],
  },
  Security: {
    items: [
      { title: "Our Practices", desc: "How we handle data", href: "/security" },
      { title: "GDPR", desc: "Your privacy rights", href: "/legal/gdpr" },
      { title: "DPA", desc: "Data processing terms", href: "/legal/dpa" },
    ],
  },
  Help: {
    items: [
      {
        title: "Support",
        desc: "Get help and guidance",
        href: "/contact/support",
      },
    ],
  },
};

type NavKey = keyof typeof navData;
const navKeys = Object.keys(navData) as NavKey[];

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<NavKey | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<NavKey | null>(
    null,
  );

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isMobileMenuOpen]);

  const toggleMobileAccordion = (key: NavKey) => {
    setOpenMobileAccordion((prev) => (prev === key ? null : key));
  };

  const springConfig = { type: "spring" as const, bounce: 0, duration: 0.4 };

  // Menüye göre sağ tarafta çıkacak görseli belirleyen dinamik fonksiyon
  const getDropdownImage = (key: string) => {
    switch (key) {
      case "Product":
        return "/watch-visual.png";
      case "Contact":
        return "/laptop-visual.png";
      case "Company":
        return "/company-visual.png";
      case "Security":
        return "/security-visual.png";
      case "Help":
        return "/help-visual.png";
      default:
        return "/watch-visual.png";
    }
  };

  return (
    <>
      {/* MASAÜSTÜ VE MOBİL YÜZEN MENÜ */}
      <motion.div
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[840px]"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={springConfig}
      >
        <nav className="flex items-center justify-between pl-6 pr-2 rounded-full border border-gray-800 shadow-2xl font-sans h-[52px] lg:h-[48px] bg-[#0a0a0a] relative">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 cursor-pointer z-50"
          >
            <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden rounded-full bg-transparent">
              <img
                src="/logo.png"
                alt="Aegisora Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[20px] font-serif tracking-tight text-white mt-0.5">
              Aegisora
            </span>
          </Link>

          {/* Masaüstü Linkler */}
          <div
            className="hidden lg:flex items-center relative z-50 h-full gap-2"
            onMouseLeave={() => setActiveDropdown(null)}
          >
            {navKeys.map((key) => (
              <div
                key={key}
                className="relative flex items-center h-full px-1"
                onMouseEnter={() => setActiveDropdown(key)}
              >
                <div className="flex items-center justify-center gap-1 px-3 h-[28px] text-[13px] font-medium text-gray-300 cursor-pointer rounded-md transition-all duration-200 hover:bg-white/10 hover:text-white">
                  {key}{" "}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === key ? "rotate-180 text-white" : ""}`}
                  />
                </div>

                <AnimatePresence>
                  {activeDropdown === key && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: 10 }}
                      transition={springConfig}
                      className="absolute top-[56px] left-1/2 -translate-x-1/2 bg-[#0a0a0a] rounded-[1rem] p-3 shadow-2xl flex gap-3 border border-gray-800/80 backdrop-blur-2xl"
                    >
                      <div className="flex flex-col gap-1">
                        {navData[key].items.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            className="w-[200px] h-[47px] px-3 flex flex-col justify-center cursor-pointer rounded-lg hover:bg-[#1a1a1a] transition-colors group"
                          >
                            <h3 className="text-white text-[13px] font-medium mb-0.5 group-hover:text-[#0066EE] transition-colors leading-none">
                              {item.title}
                            </h3>
                            <p className="text-gray-500 text-[11px] leading-none">
                              {item.desc}
                            </p>
                          </Link>
                        ))}
                      </div>

                      {/* SAĞ TARAFTAKİ KUTU (Dinamik Görsel Sistemi) */}
                      <div className="w-[200px] h-[141px] bg-[#141414] rounded-lg overflow-hidden border border-gray-800/50 flex items-center justify-center relative">
                        <img
                          src={getDropdownImage(key)}
                          alt={`${key} Preview`}
                          className="w-full h-full object-cover opacity-90 transition-opacity duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/60 to-transparent pointer-events-none"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Sağ Aksiyonlar */}
          <div className="flex items-center gap-3 z-50 h-full py-[8px]">
            <Link
              href="/login"
              className="hidden lg:flex items-center justify-center px-4 h-[32px] text-[13px] font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            >
              Log in
            </Link>

            <Link
              href="/get-started"
              className="hidden lg:flex items-center justify-center px-5 h-[32px] bg-[#0066EE] hover:bg-[#005bb5] text-white text-[13px] font-medium rounded-full transition-colors shadow-sm whitespace-nowrap"
            >
              Sign up free
            </Link>

            {/* 2 ÇİZGİLİ / X ANİMASYONLU BUTON */}
            <button
              className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 transition-colors mr-1 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <motion.span
                animate={
                  isMobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.2 }}
                className="w-4 h-[1.5px] bg-white block rounded-full"
              />
              <motion.span
                animate={
                  isMobileMenuOpen
                    ? { rotate: -45, y: -4 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.2 }}
                className="w-4 h-[1.5px] bg-white block rounded-full"
              />
            </button>
          </div>

          {/* MOBİL VE YARIM EKRAN AÇILIR MENÜ */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 0, height: 0 }}
                animate={{ opacity: 1, y: 8, height: "auto" }}
                exit={{ opacity: 0, y: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="absolute top-full left-0 right-0 bg-[#0c0c0c] rounded-[22px] border border-gray-800 shadow-2xl p-4 flex flex-col z-50 lg:hidden overflow-hidden"
              >
                <Link
                  href="/get-started"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full h-[38px] bg-[#0066EE] hover:bg-[#005bb5] text-white font-medium text-[13px] rounded-xl mb-2 transition-colors flex items-center justify-center shadow-sm"
                >
                  Sign up free
                </Link>

                <div className="flex flex-col w-full">
                  {navKeys.map((key) => (
                    <div key={key} className="flex flex-col w-full">
                      <button
                        onClick={() => toggleMobileAccordion(key)}
                        className="w-full py-2 flex items-center gap-1 text-[14px] font-medium text-gray-200 hover:text-white transition-colors px-1 cursor-pointer"
                      >
                        <span>{key}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${
                            openMobileAccordion === key
                              ? "rotate-180 text-white"
                              : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {openMobileAccordion === key && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-0.5 pb-1.5 pl-2">
                              {navData[key].items.map((item, idx) => (
                                <Link
                                  href={item.href}
                                  key={idx}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block text-gray-500 hover:text-white transition-colors text-[13px] py-1"
                                >
                                  {item.title}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <div className="mt-2 mb-0.5 w-full flex items-center justify-center pt-2.5">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[13px] text-gray-300 hover:text-white transition-colors font-medium"
                  >
                    Log in
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.div>
    </>
  );
}
