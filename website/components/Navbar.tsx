"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Saf SVG İkonlar (Lucide-react versiyon sorunlarını önlemek için)
const GithubIcon = (props: React.ComponentProps<"svg">) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);
const DiscordIcon = (props: React.ComponentProps<"svg">) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  const navLinks = [
    { name: "Hub", href: "/hub" },
    { name: "Blog", href: "/blog" },
    { name: "Docs", href: "/docs" }
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center transition-opacity hover:opacity-80 z-50">
            <img src="/logo.png" alt="Aegisora" className="h-7 w-auto object-contain" />
          </Link>

          {/* Masaüstü Menü (Resimdeki gibi tertemiz yapı) */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`text-[15px] font-medium transition-colors hover:text-[#0066FF] ${pathname.includes(link.href) ? 'text-[#0066FF]' : 'text-slate-700'}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            
            <div className="flex items-center gap-5 ml-4">
              <a href="https://github.com/aegisora" className="text-slate-800 hover:text-[#0066FF] transition-colors"><GithubIcon className="w-[22px] h-[22px]" /></a>
              <a href="https://discord.com" className="text-slate-800 hover:text-[#0066FF] transition-colors"><DiscordIcon className="w-6 h-6" /></a>
              
              {/* Profil Butonu */}
              <button className="flex items-center gap-2.5 px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors ml-2">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-200">
                  <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover grayscale" />
                </div>
                <span className="text-[14px] font-bold text-slate-800">Eray Özer</span>
              </button>
            </div>
          </div>

          {/* Mobil Hamburger Butonu */}
          <div className="flex items-center lg:hidden z-50">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 p-2 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Çalışan Mobil Hamburger Menü (Aşağı Kayarak Açılır) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-16 left-0 w-full z-40 bg-white border-b border-slate-200 shadow-xl overflow-hidden lg:hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-[18px] font-bold text-slate-900 py-3 border-b border-slate-100"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center gap-6 py-4 border-b border-slate-100">
                <a href="https://github.com/aegisora" className="text-slate-800"><GithubIcon className="w-6 h-6" /></a>
                <a href="https://discord.com" className="text-slate-800"><DiscordIcon className="w-7 h-7" /></a>
              </div>
              <button className="flex items-center gap-3 py-4">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200">
                  <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover grayscale" />
                </div>
                <span className="text-[16px] font-bold text-slate-800">Eray Özer</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}