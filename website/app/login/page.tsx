"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] font-sans">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[400px] bg-white rounded-2xl border b order-slate-200 shado w-xl p-8">
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="Aegisora" className="h-8 w-auto" />
          </div>
          <h1 className="text-[24px] font-black text-slate-900 text-center tracking-tight mb-2">Welcome back</h1>
          <p className="text-center text-slate-500 text-[14px] font-medium mb-8">Log in to your Aegisora account</p>

          <div className="space-y-4">
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Email</label>
              <input type="email" placeholder="eray@example.com" className="w-full px-4 py-3 rounded-lg border b order-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:b order-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 transition-all text-[14px] font-medium" />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-lg border b order-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:b order-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 transition-all text-[14px] font-medium" />
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded b order-slate-300 text-[#0066FF] focus:ring-[#0066FF]" />
                <span className="text-[13px] text-slate-600 font-medium">Remember me</span>
              </label>
              <a href="#" className="text-[13px] font-bold text-[#0066FF] hover:underline">Forgot password?</a>
            </div>

            <Link href="/hub" className="block w-full text-center py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-lg font-bold text-[14px] transition-colors mt-2 shado w-sm">
              Sign In
            </Link>
          </div>

          <div className="mt-8 pt-6 b order-t b order-slate-100 text-center">
            <p className="text-[14px] text-slate-600 font-medium">
              Don't have an account? <Link href="/register" className="text-[#0066FF] font-bold hover:underline">Get Started</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
