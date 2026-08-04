"use client";

import Image from "next/image";

export default function BlogNews() {
  const subArticles = [
    {
      date: "Aug 02, 2026",
      category: "Security",
      title: "Securing AI Against Prompt Injection",
      excerpt:
        "As enterprises scale AI agents, prompt injection becomes a critical threat vector. Learn how Aegisora's zero-trust proxy intercepts malicious tool calls at runtime before they compromise infrastructure...",
      author: "Eray Özer",
      role: "Founder & CEO",
      image: "/images/blog/prompt-injection.png",
    },
    {
      date: "Jul 28, 2026",
      category: "Enterprise",
      title: "Shadow AI: The Hidden Risk in Your Stack",
      excerpt:
        "What happens when unmonitored AI models access your corporate databases? Shadow AI opens direct routes into secure infrastructure. Here is how our platform restores complete visibility...",
      author: "Eray Özer",
      role: "Founder & CEO",
      image: "/images/blog/shadow-ai.png",
    },
    {
      date: "Jul 15, 2026",
      category: "Governance",
      title: "Immutable Logs for AI Compliance",
      excerpt:
        "Regulators demand transparency in autonomous decisions. Here is how continuous runtime logging and strict SOC2/ISO compliance secures your entire agentic ecosystem...",
      author: "Eray Özer",
      role: "Founder & CEO",
      image: "/images/blog/compliance.png",
    },
  ];

  return (
    <section className="relative w-full pt-28 pb-36 px-6 bg-transparent font-sans flex justify-center z-10">
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
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 bg-white/85 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/80 shadow-[0_15px_35px_rgba(0,0,0,0.06)] relative overflow-hidden group cursor-pointer">
          <div className="w-full aspect-[4/3] lg:aspect-[4/2.8] rounded-2xl overflow-hidden relative shadow-md bg-[#14151a]">
            <Image
              src="/images/blog/zero-trust.png"
              alt="The Architecture of a Zero-Trust AI Swarm"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority // LCP optimizasyonu için öncelikli yüklenecek
            />
            <div className="absolute inset-0 bg-black/20 z-10"></div>
          </div>

          <div className="flex flex-col items-start relative z-20">
            <div className="w-full flex items-center justify-between font-mono text-[12px] mb-4">
              <span className="text-gray-600 font-medium">Aug 04, 2026</span>
              <span className="bg-[#0066EE]/10 text-[#0066EE] px-3 py-1 rounded-full font-semibold">
                Featured
              </span>
            </div>

            <h3 className="text-3xl lg:text-[2.4rem] font-serif text-[#111111] leading-[1.1] mb-4 group-hover:text-[#0066EE] transition-colors">
              The Architecture of a Zero-Trust AI Swarm
            </h3>

            <p className="text-[14.5px] text-gray-700 leading-relaxed mb-4 font-medium">
              Deploying a single AI agent is easy. Governing an entire
              autonomous swarm across an enterprise introduces complex
              vulnerabilities. Discover how Aegisora enforces runtime
              constitutions to maintain absolute control...
            </p>

            <p className="text-[12px] text-gray-500 font-mono mb-6 font-semibold">
              6 min read
            </p>

            <div className="flex items-center gap-3 mt-auto">
              <div className="w-10 h-10 bg-[#0066EE] rounded-full overflow-hidden flex items-center justify-center text-xs text-white font-bold shadow-md">
                EÖ
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-gray-900">
                  Eray Özer
                </span>
                <span className="text-[11px] text-[#0066EE] font-mono font-semibold">
                  Founder & CEO
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* Alt Grid Makaleler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subArticles.map((article, idx) => (
            <article
              key={idx}
              className="flex flex-col w-full group cursor-pointer bg-white/85 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/80 shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all"
            >
              <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-5 shadow-sm bg-[#14151a] relative">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
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
                  EÖ
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
