"use client";

import Link from "next/link";

export default function Footer() {
  const footerLinks: Record<string, { label: string; href: string }[]> = {
    Company: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "/blog" },
    ],
    Help: [
      { label: "Support", href: "/contact/support" },
      { label: "Status", href: "#" },
    ],
    Security: [
      { label: "Our Practices", href: "/security" },
      { label: "GDPR", href: "/legal/gdpr" },
      { label: "DPA", href: "/legal/dpa" },
    ],
    Product: [
      { label: "Sign up", href: "/get-started" },
      { label: "Log in", href: "/login" },
      { label: "For businesses", href: "/business" },
      { label: "Pricing", href: "/pricing" },
    ],
    Contact: [
      { label: "Contact Sales", href: "/contact/sales" },
      { label: "Business inquiry", href: "/contact/business-inquiry" },
      { label: "Partnership", href: "/contact/partnership" },
    ],
    Legal: [
      { label: "Acceptable Use", href: "/legal/dpa" },
      { label: "Terms of Service", href: "/legal/gdpr" },
      { label: "Cookie Policy", href: "/legal/gdpr" },
      { label: "Privacy Policy", href: "/legal/gdpr" },
      { label: "Subprocessors", href: "/legal/dpa" },
    ],
  };

  return (
    <footer className="relative w-full flex flex-col items-center pt-28 pb-16 px-6 bg-transparent font-sans z-10">
      {/* CTA Banner (Kutsuz, Akışkan Tuval Üzerinde) */}
      <div className="w-full max-w-[1200px] bg-white/85 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row items-center border border-white/80 mb-16 shadow-[0_15px_35px_rgba(0,0,0,0.06)] relative z-20">
        <div className="w-full md:w-[50%] p-10 md:p-16 flex flex-col items-start z-10">
          <h2 className="text-4xl lg:text-[3rem] font-serif text-[#111111] leading-tight tracking-tight mb-8">
            Get started for free
          </h2>

          <div className="w-full max-w-[340px] flex flex-col gap-3.5">
            <Link href="/get-started" className="w-full">
              <button className="w-full flex items-center justify-center gap-3 bg-[#222222] hover:bg-black transition-colors text-white py-3.5 px-4 rounded-xl text-[13.5px] font-medium cursor-pointer shadow-sm">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                Continue with Google
              </button>
            </Link>

            <Link href="/get-started" className="w-full">
              <button className="w-full flex items-center justify-center bg-white text-[#111111] py-3.5 px-4 rounded-xl hover:bg-gray-50 transition-colors text-[13.5px] font-semibold shadow-sm border border-gray-200 cursor-pointer">
                Continue with email
              </button>
            </Link>

            <p className="text-[11px] text-gray-500 text-center mt-1 font-medium">
              By continuing, you acknowledge Aegisora's{" "}
              <Link href="/legal/gdpr" className="underline hover:text-black">
                Terms
              </Link>{" "}
              &{" "}
              <Link href="/legal/gdpr" className="underline hover:text-black">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="w-full md:w-[50%] h-[320px] md:h-full absolute right-0 top-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-right bg-no-repeat"
            style={{ backgroundImage: "url('/padlock.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Ana Footer Bölümü (Kutsuz, Sınırsız ve Özgür) */}
      <div className="w-full max-w-[1200px] z-20 flex flex-col items-center">
        <div className="flex flex-col items-center text-center mb-16">
          <Link
            href="/"
            className="flex items-center gap-2.5 mb-4 cursor-pointer group"
          >
            <svg
              className="w-6 h-6 text-gray-500 group-hover:text-black transition-colors"
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
            <span className="text-2xl font-serif text-[#111111] tracking-tight">
              Aegisora
            </span>
          </Link>
          <p className="text-[13px] text-gray-700 font-mono max-w-md leading-relaxed mb-8 font-medium">
            You deserve control over your own information. Aegisora monitors
            what's visible, helps you manage it, and works to reduce your online
            exposure, so you can stay one step ahead.
          </p>

          <div className="flex items-center gap-6 text-gray-700">
            <Link
              href="#"
              className="hover:text-black hover:scale-110 transition-all"
            >
              <svg
                className="w-[15px] h-[15px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </Link>
            <Link
              href="#"
              className="hover:text-black hover:scale-110 transition-all"
            >
              <svg
                className="w-[16px] h-[16px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </Link>
            <Link
              href="#"
              className="hover:text-black hover:scale-110 transition-all"
            >
              <svg
                className="w-[17px] h-[17px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>
            <Link
              href="#"
              className="hover:text-black hover:scale-110 transition-all"
            >
              <svg
                className="w-[16px] h-[16px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.06 20.45H3.56V9h3.5v11.45zM5.31 7.44c-1.13 0-2.04-.92-2.04-2.04s.91-2.04 2.04-2.04c1.13 0 2.04.92 2.05 2.04 0 1.12-.92 2.04-2.05 2.04zm15.14 13.01h-3.5v-5.56c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94v5.65h-3.5V9h3.36v1.56h.05c.47-.89 1.62-1.83 3.33-1.83 3.56 0 4.22 2.34 4.22 5.39v6.33z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Link Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-6 gap-8 mb-16 border-t border-gray-300/60 pt-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col">
              <h4 className="text-[12px] font-bold text-[#111111] mb-5 tracking-wide">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((linkItem) => (
                  <li key={linkItem.label}>
                    <Link
                      href={linkItem.href}
                      className="text-[11.5px] text-gray-600 hover:text-black font-medium transition-colors"
                    >
                      {linkItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between pt-8 text-[11px] text-gray-500 font-mono border-t border-gray-300/60">
          <span className="font-medium">Aegisora by ANON AI Labs, Inc.</span>
          <div className="flex items-center gap-6 mt-4 md:mt-0 font-medium">
            <Link href="#" className="hover:text-black transition-colors">
              AI Info
            </Link>
            <Link href="#" className="hover:text-black transition-colors">
              AI Policy
            </Link>
          </div>
          <span className="mt-4 md:mt-0 font-medium">
            © 2026 Aegisora. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
