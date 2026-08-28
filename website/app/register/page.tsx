"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Info, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-between py-10 px-4 bg-[#070709] text-white font-sans">
      {/* Üst Logo Alanı */}
      <div className="flex items-center gap-2 mb-6 cursor-pointer">
        <svg
          className="w-5 h-5 text-gray-200"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
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
        <span className="text-[19px] font-serif tracking-tight mt-0.5">
          Serus
        </span>
      </div>

      {/* Ana Kayıt Kartı ve Üst Bilgilendirme Kutusu */}
      <div className="w-full max-w-[460px] flex flex-col gap-4">
        {/* Mavi Bilgilendirme Bandı */}
        <div className="w-full bg-[#0d162d]/80 border border-blue-900/40 rounded-2xl p-4 flex items-start gap-3 backdrop-blur-md shadow-lg">
          <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-[12px] text-blue-200/90 leading-relaxed font-mono">
            Use an email you actually use. We&apos;ll use it as your first protection
            marker, and it can&apos;t be changed later.
          </p>
        </div>

        {/* Ana Siyah Form Kutusu */}
        <div className="w-full bg-[#121215] border border-gray-800/80 rounded-[28px] p-8 shadow-2xl flex flex-col">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-serif font-medium tracking-tight mb-1.5">
              Create your account
            </h1>
            <p className="text-[12px] font-mono text-gray-400">
              Welcome! Please fill in the details to get started.
            </p>
          </div>

          {/* Sosyal Medya İle Kayıt Butonları (Apple & Google) */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-[#19191d] hover:bg-[#222227] border border-gray-800/60 text-xs font-medium text-gray-200 transition-colors cursor-pointer shadow-sm">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 5.39c.65-.79 1.09-1.89.97-2.99-.96.04-2.13.64-2.82 1.43-.6.68-1.12 1.79-.98 2.88 1.08.08 2.18-.53 2.83-1.32z" />
              </svg>
              Apple
            </button>

            <button className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-[#19191d] hover:bg-[#222227] border border-gray-800/60 text-xs font-medium text-gray-200 transition-colors cursor-pointer shadow-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
          </div>

          {/* 'or' Çizgi Ayracı */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <span className="relative bg-[#121215] px-3 text-[11px] font-mono text-gray-500 uppercase">
              or
            </span>
          </div>

          {/* Form Alanları */}
          <div className="flex flex-col gap-4 mb-6">
            {/* Ad ve Soyad (Yan Yana) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-mono text-gray-400">
                  First name
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full bg-[#19191d] border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-mono text-gray-400">
                  Last name
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full bg-[#19191d] border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors"
                />
              </div>
            </div>

            {/* E-posta Adresi */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono text-gray-400">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-[#19191d] border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors"
              />
            </div>

            {/* Şifre Alanı */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono text-gray-400">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-[#19191d] border border-gray-800 rounded-xl px-3.5 py-2.5 pr-10 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Şartlar Metni */}
          <p className="text-[10px] text-gray-500 text-center font-mono leading-relaxed mb-6">
            By continuing, you agree to Serus&apos;s{" "}
            <Link href="#" className="underline hover:text-gray-300">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline hover:text-gray-300">
              Privacy Policy
            </Link>
            .
          </p>

          {/* Continue Butonu */}
          <button className="w-full py-3 bg-white hover:bg-gray-100 text-black font-medium text-xs rounded-xl transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2">
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Alt Giriş Yönlendirmesi */}
        <div className="text-center pt-2">
          <p className="text-xs text-gray-400 font-mono">
            Already have an account?{" "}
            <Link href="#" className="text-white font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* En Alt Footer Gizlilik ve Şartlar Linkleri */}
      <footer className="w-full flex items-center justify-center gap-6 text-[11px] font-mono text-gray-500 pt-6">
        <Link href="#" className="hover:text-gray-300 transition-colors">
          Privacy
        </Link>
        <Link href="#" className="hover:text-gray-300 transition-colors">
          Terms
        </Link>
      </footer>
    </main>
  );
}
