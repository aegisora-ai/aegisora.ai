"use client";

export default function PrivateInvestigator() {
  return (
    <section className="relative w-full py-32 flex flex-col items-center justify-center px-6 text-center font-sans overflow-hidden bg-transparent z-10">
      {/* İçerik Alanı (Çizgi olmaksızın akışkan arka plan üzerinde süzülür) */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto">
        {/* Üst Kısım: Uygulama İkonları ve "Coming Soon" Rozeti */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-4 flex flex-col items-center gap-3 mb-10 border border-white/50 shadow-sm">
          <div className="flex items-center gap-3">
            {/* WhatsApp İkonu */}
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] text-black">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>

            {/* Slack İkonu */}
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] text-black">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9H9l3-9H8l-3 9H2l3-9H1l3-9h4l3-9h6l-3 9h4l3-9h5l-3 9h4l-3 9z" />
              </svg>
            </div>

            {/* Telegram İkonu */}
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] text-black">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
          </div>
          <span className="text-[12px] font-mono text-gray-500 uppercase tracking-widest font-medium">
            Coming soon
          </span>
        </div>

        {/* Ana Başlık */}
        <h2 className="text-4xl md:text-[3.5rem] font-serif text-[#111111] leading-[1.1] tracking-tight mb-6">
          A private investigator in your pocket.
        </h2>

        {/* Açıklama Metni */}
        <p className="text-gray-600 font-mono text-sm md:text-[15px] max-w-[850px] leading-relaxed mb-10">
          Integrate Aegisora into the tools you already use — WhatsApp, Slack,
          Telegram — and
          <br className="hidden md:block" /> get instant alerts when your data
          surfaces. Monitor, investigate, execute tasks,
          <br className="hidden md:block" /> and remove exposures without ever
          leaving the conversation.
        </p>

        {/* Butonlar */}
        <div className="flex items-center gap-6">
          <button className="bg-[#0066EE] hover:bg-[#005bb5] text-white text-sm font-medium px-6 py-3 rounded-full transition-colors shadow-md cursor-pointer">
            Sign up for free
          </button>
          <button className="text-gray-600 hover:text-black text-sm font-medium transition-colors cursor-pointer">
            For Business
          </button>
        </div>
      </div>
    </section>
  );
}
