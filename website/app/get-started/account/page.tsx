"use client";

import { useState } from "react";
import Link from "next/link";
import { Sun, Moon, User, Info, PlusCircle } from "lucide-react";

export default function GetStartedAccountPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <main
      className={`min-h-screen w-full flex flex-col justify-between p-6 lg:p-10 font-sans transition-colors duration-300 ${isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-[#f4f4f5] text-[#111111]"}`}
    >
      {/* Üst Bar: Logo ve Tema Değiştirici */}
      <header className="w-full flex items-center justify-between">
        <Link
          href="/get-started"
          className="flex items-center gap-2 cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
            <circle cx="5" cy="12" r="1.5" />
            <circle cx="19" cy="12" r="1.5" />
            <circle cx="7" cy="7" r="1.5" />
            <circle cx="17" cy="17" r="1.5" />
            <circle cx="7" cy="17" r="1.5" />
            <circle cx="17" cy="7" r="1.5" />
          </svg>
          <span className="text-[18px] font-serif tracking-tight mt-0.5">
            Serus
          </span>
        </Link>

        <div
          className={`flex items-center p-1 rounded-full border ${isDarkMode ? "b order-gray-800 bg-[#141414]" : "b order-gray-300 bg-white shado w-sm"}`}
        >
          <button
            onClick={() => setIsDarkMode(false)}
            className={`p-1.5 rounded-full transition-colors ${!isDarkMode ? "bg-gray-200 text-black" : "text-gray-400 hover:text-white"}`}
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsDarkMode(true)}
            className={`p-1.5 rounded-full transition-colors ${isDarkMode ? "bg-[#222222] text-white" : "text-gray-500 hover:text-black"}`}
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Orta Alan: Hesap Oluşturma Bilgilendirmesi ve Grafik Kartı */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-xl mx-auto w-full py-8 text-center">
        {/* Üst Kullanıcı İkonu */}
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border shado w-sm ${isDarkMode ? "bg-[#141414] b order-gray-800 text-[#b490ff]" : "bg-white b order-gray-200 text-purple-600"}`}
        >
          <User className="w-5 h-5" />
        </div>

        {/* Ana Başlık ve Açıklama */}
        <h1 className="text-3xl lg:text-4xl font-serif tracking-tight mb-3">
          You&apos;re about to create your account
        </h1>
        <p
          className={`text-[13px] font-mono mb-8 max-w-md ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          Sign up with an email you actually use. It becomes your first
          protection marker and can&apos;t be changed later.
        </p>

        {/* İstatistik / Grafik Kartı */}
        <div
          className={`w-full rounded-3xl p-6 border mb-6 text-left shado w-lg ${isDarkMode ? "bg-[#121212] b order-gray-800" : "bg-white b order-gray-200"}`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-semibold text-gray-200">
              Average exposures found, by email type
            </span>
            <Info className="w-4 h-4 text-gray-500 cursor-pointer" />
          </div>
          <p className="text-[11px] font-mono text-gray-400 mb-6">
            The more places you use an email to sign up, the more places it can
            be exposed.
          </p>

          {/* Sütun Grafik Alanı */}
          <div className="relative h-44 flex items-end justify-around px-8 pt-8 pb-2 b order-b b order-gray-800/60 mb-4">
            {/* Sol Sütun (120) */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono text-purple-400 font-semibold">
                120
              </span>
              <div className="w-16 h-28 bg-[#b490ff] rounded-t-xl shado w-lg shado w-purple-500/10"></div>
            </div>

            {/* Sağ Sütun (77) */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono text-gray-400 font-semibold">
                77
              </span>
              <div className="w-16 h-16 bg-[#2a2a2c] rounded-t-xl"></div>
            </div>
          </div>

          {/* Grafik Açıklamaları (Legend) */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono mb-6 text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#b490ff]"></div>
              <span>Email handle you use regularly</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a2c]"></div>
              <span>Email handle you don&apos;t use regularly</span>
            </div>
          </div>

          {/* Vurgulu Uyarı Kutusu */}
          <div className="w-full py-2.5 px-4 rounded-xl bg-purple-500/10 border b order-purple-500/20 text-center text-[#b490ff] text-xs font-mono">
            + 56% more exposures with an email you use regularly
          </div>
        </div>

        {/* İkincil E-posta Bilgi Notu */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-gray-400 mb-8">
          <PlusCircle className="w-3.5 h-3.5 text-gray-500" />
          <span>You can add a secondary email anytime after signup.</span>
        </div>

        {/* Aksiyon Butonları */}
        <div className="w-full max-w-sm flex flex-col items-center gap-3">
          <Link href="/register?fromIntro=true" className="w-full">
            <button className="w-full py-3.5 bg-[#b490ff] hover:bg-[#a37bf5] text-black font-medium text-[14px] rounded-full transition-colors shado w-sm cursor-pointer">
              Start account setup
            </button>
          </Link>
          <Link
            href="/get-started/ways"
            className="text-xs font-medium text-gray-400 hover:text-white transition-colors py-1"
          >
            Back
          </Link>
        </div>
      </div>

      <div className="w-full h-4"></div>
    </main>
  );
}
