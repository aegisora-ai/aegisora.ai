"use client";

export default function BlogNews() {
  const subArticles = [
    {
      date: "Jul 13, 2026",
      category: "Security",
      title: "How to know if you have been hacked – 12 signs",
      excerpt:
        "How do I know if I have been hacked? If something feels off, knowing the warning signs can help you act quickly, lock hackers and scammers out, and limit the damage before it spreads. Keep reading...",
      author: "Anthon Wansland",
      role: "CMO & Founder",
      imagePlaceholder: "bg-[#14151a] flex items-center justify-center",
      icon: (
        <svg
          className="w-16 h-16 text-[#0066EE]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M12 2L22 20H2L12 2Z" />
          <circle cx="12" cy="16" r="1" fill="currentColor" />
          <line x1="12" y1="8" x2="12" y2="13" />
        </svg>
      ),
    },
    {
      date: "Jun 25, 2026",
      category: "Security",
      title: "How to Check If a Website Is Safe to Browse in | Aegisora",
      excerpt:
        "Visiting a website should feel like walking into a shop — you expect it to be legitimate, safe, and honest about what it is. Most of the time, it is. But scam websites have gotten far better at looking real. Some...",
      author: "Anthon Wansland",
      role: "CMO & Founder",
      imagePlaceholder: "bg-[#1c1d24]",
      icon: (
        <div className="w-3/4 h-2 bg-[#0066EE]/40 rounded-full mt-4 mx-auto"></div>
      ),
    },
    {
      date: "Jun 17, 2026",
      category: "Security",
      title: "What Can Someone Do with Your Phone Number?",
      excerpt:
        "What can someone do with your phone number? More than most people realise. Your phone number may seem harmless, but it can give scammers a direct route into your digital life. It is often...",
      author: "Anthon Wansland",
      role: "CMO & Founder",
      imagePlaceholder: "bg-[#14151a]",
      icon: null,
    },
  ];

  return (
    <section className="relative w-full pt-28 pb-36 px-6 bg-transparent font-sans flex justify-center z-10">
      {/* Büyük kapsayıcı çerçeve kaldırıldı, doğrudan sayfa arka planı üzerinde özgür akış */}
      <div className="w-full max-w-[1200px] z-20">
        {/* Üst Başlık */}
        <div className="flex items-center justify-between mb-12 border-b border-gray-300/60 pb-6">
          <h2 className="text-4xl md:text-5xl font-serif text-[#111111] tracking-tight">
            Blog & News
          </h2>
          <button className="bg-[#0066EE] hover:bg-[#005bb5] text-white font-mono text-[11px] px-5 py-2.5 rounded-full transition-colors flex items-center justify-center shadow-md cursor-pointer">
            All articles
          </button>
        </div>

        {/* Öne Çıkan (Featured) Makale Kartı */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 bg-white/85 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/80 shadow-[0_15px_35px_rgba(0,0,0,0.06)]">
          <div className="w-full aspect-[4/3] lg:aspect-[4/2.8] bg-[#14151a] rounded-2xl overflow-hidden relative shadow-md flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0e0f14] to-[#1c1d24]"></div>
            <div className="relative z-10 text-[#0066EE] font-mono text-sm tracking-widest uppercase font-bold">
              Aegisora Featured
            </div>
          </div>

          <div className="flex flex-col items-start">
            <div className="w-full flex items-center justify-between font-mono text-[12px] mb-4">
              <span className="text-gray-600 font-medium">Mar 1, 2026</span>
              <span className="bg-[#0066EE]/10 text-[#0066EE] px-3 py-1 rounded-full font-semibold">
                Featured
              </span>
            </div>

            <h3 className="text-3xl lg:text-[2.4rem] font-serif text-[#111111] leading-[1.1] mb-4">
              Welcome to Aegisora: The Privacy Platform We Always Needed
            </h3>

            <p className="text-[14.5px] text-gray-700 leading-relaxed mb-4 font-medium">
              For years, people have been told to "read the terms and
              conditions" or "check your privacy settings" while their digital
              presence spirals beyond their control. Search engines index their
              personal information. Fake accounts...
            </p>

            <p className="text-[12px] text-gray-500 font-mono mb-6 font-semibold">
              6 min read
            </p>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0066EE] rounded-full overflow-hidden flex items-center justify-center text-xs text-white font-bold shadow-md">
                FL
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-gray-900">
                  Filip Landgren
                </span>
                <span className="text-[11px] text-[#0066EE] font-mono font-semibold">
                  CEO & Founder
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Grid Makaleler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subArticles.map((article, idx) => (
            <div
              key={idx}
              className="flex flex-col w-full group cursor-pointer bg-white/85 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/80 shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all"
            >
              <div
                className={`w-full aspect-[16/9] rounded-2xl overflow-hidden mb-5 ${article.imagePlaceholder} shadow-sm transition-transform duration-300 group-hover:scale-[1.02] flex items-center justify-center relative`}
              >
                {article.icon}
              </div>

              <div className="w-full flex items-center justify-between font-mono text-[11px] mb-3">
                <span className="text-gray-600 font-medium">
                  {article.date}
                </span>
                <span className="bg-[#0066EE]/10 text-[#0066EE] px-2.5 py-0.5 rounded font-semibold">
                  {article.category}
                </span>
              </div>

              <h4 className="text-[1.3rem] font-serif text-[#111111] leading-tight mb-3 group-hover:text-[#0066EE] transition-colors">
                {article.title}
              </h4>

              <p className="text-[13px] text-gray-700 leading-relaxed mb-6 line-clamp-3 font-medium">
                {article.excerpt}
              </p>

              <div className="flex items-center gap-2.5 mt-auto pt-4 border-t border-gray-200/60">
                <div className="w-8 h-8 bg-gray-900 rounded-full overflow-hidden flex items-center justify-center text-[10px] text-white font-bold">
                  AW
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-gray-900 leading-tight">
                    {article.author}
                  </span>
                  <span className="text-[10px] text-[#0066EE] font-mono font-semibold">
                    {article.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
