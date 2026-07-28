"use client";

import { Check, X } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0 /mo",
      protection: [
        { included: false, text: "Autopilot (Automated Removals)" },
        { included: true, text: "5 Data Removal Request / Day" },
        { included: true, text: "Limited Aegisora AI Assistant" },
        { included: true, text: "Dark Web Surveillance" },
        { included: false, text: "Surface Web Surveillance" },
        { included: true, text: "Limited Alerts & monitoring" },
      ],
      intelligence: [
        { included: false, text: "0 Monthly Credits" },
        { included: true, text: "Dark Web Scan" },
        { included: false, text: "AI OSINT Tool" },
        { included: false, text: "Source Search" },
      ],
    },
    {
      name: "Intelligence",
      price: "$12.99 /mo",
      protection: [
        { included: false, text: "Autopilot (Automated Removals)" },
        { included: false, text: "Unlimited Data Removals" },
        { included: true, text: "Aegisora AI Assistant" },
        { included: false, text: "Dark Web Surveillance" },
        { included: false, text: "Surface Web Surveillance" },
        { included: false, text: "Alerts & Real-time monitoring" },
      ],
      intelligence: [
        { included: true, text: "500 Monthly Credits" },
        { included: true, text: "Dark Web Scan" },
        { included: true, text: "AI OSINT Tool" },
        { included: true, text: "Source Search" },
      ],
    },
    {
      name: "Premium",
      price: "$16.99 /mo",
      isPopular: true,
      protection: [
        { included: true, text: "Autopilot (Automated Removals)" },
        { included: true, text: "Unlimited Data Removals" },
        { included: true, text: "Aegisora AI Assistant" },
        { included: true, text: "Dark Web Surveillance" },
        { included: true, text: "Surface Web Surveillance" },
        { included: true, text: "Alerts & Real-time monitoring" },
      ],
      intelligence: [
        { included: true, text: "250 Monthly Credits" },
        { included: true, text: "Dark Web Scan" },
        { included: true, text: "AI OSINT Tool" },
        { included: true, text: "Source Search" },
      ],
    },
  ];

  return (
    <section className="relative w-full pt-28 pb-36 px-6 bg-transparent font-sans flex flex-col items-center z-10">
      {/* Üst Başlık ve Açıklama */}
      <div className="text-center max-w-2xl mb-10 z-20 flex flex-col items-center">
        <h2 className="text-5xl md:text-6xl font-serif text-[#111111] leading-[1.1] tracking-tight mb-4">
          Try for free. Commit later.
        </h2>
        <p className="font-mono text-gray-700 text-[13.5px] leading-relaxed max-w-md font-medium">
          Choose a plan, try it out, and cancel anytime if it's not a fit. No
          tricks, no lock-ins — just honest pricing.
        </p>
      </div>

      {/* İş Dünyası Fiyatları Butonu (Mavi renk) */}
      <div className="mb-10 z-20">
        <button className="bg-[#0066EE] hover:bg-[#005bb5] text-white text-[13px] font-medium px-6 py-3 rounded-full transition-colors shadow-md cursor-pointer">
          See Business Prices
        </button>
      </div>

      {/* Güven Rozetleri */}
      <div className="flex flex-wrap justify-center gap-3 mb-20 z-20">
        {[
          "Add credits anytime",
          "30-day money back guarantee",
          "Cancel anytime",
        ].map((badge, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 bg-[#e6ece7]/80 backdrop-blur-md px-4.5 py-2 rounded-full border border-gray-200 shadow-xs"
          >
            <Check className="w-4 h-4 text-[#0066EE]" strokeWidth={3} />
            <span className="text-[12px] font-mono font-semibold text-gray-800">
              {badge}
            </span>
          </div>
        ))}
      </div>

      {/* Fiyatlandırma Sütunları (Kutsuz, doğrudan akışkan arka plan üzerinde) */}
      <div className="w-full max-w-[1200px] z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 px-4 md:px-6">
          {plans.map((plan, idx) => (
            <div key={idx} className="flex flex-col w-full">
              {/* Kart Başlığı */}
              <h3 className="text-3xl font-serif text-[#111111] mb-2">
                {plan.name}
              </h3>
              <p className="text-[16px] font-bold text-gray-900 mb-6">
                {plan.price}
              </p>

              <button
                className={`font-mono text-[11px] px-6 py-2.5 rounded-full transition-colors mb-10 w-max shadow-sm cursor-pointer ${
                  plan.isPopular
                    ? "bg-[#0066EE] hover:bg-[#005bb5] text-white"
                    : "bg-black hover:bg-gray-800 text-white"
                }`}
              >
                Get started Free
              </button>

              {/* Protection Included Bölümü */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[12px] text-gray-500 font-medium">
                  Protection Included
                </span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <ul className="flex flex-col gap-4 mb-10">
                {plan.protection.map((item, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-3 text-[12.5px] font-medium ${item.included ? "text-gray-900 font-semibold" : "text-gray-400"}`}
                  >
                    {item.included ? (
                      <Check
                        className="w-4 h-4 text-[#0066EE] flex-shrink-0"
                        strokeWidth={2.5}
                      />
                    ) : (
                      <X
                        className="w-4 h-4 text-gray-400 flex-shrink-0"
                        strokeWidth={2.5}
                      />
                    )}
                    {item.text}
                  </li>
                ))}
              </ul>

              {/* Intelligence Tools Bölümü */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[12px] text-gray-500 font-medium">
                  Intelligence Tools
                </span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <ul className="flex flex-col gap-4">
                {plan.intelligence.map((item, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-3 text-[12.5px] font-medium ${item.included ? "text-gray-900 font-semibold" : "text-gray-400"}`}
                  >
                    {item.included ? (
                      <Check
                        className="w-4 h-4 text-[#0066EE] flex-shrink-0"
                        strokeWidth={2.5}
                      />
                    ) : (
                      <X
                        className="w-4 h-4 text-gray-400 flex-shrink-0"
                        strokeWidth={2.5}
                      />
                    )}
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
