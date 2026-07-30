"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Bell, Terminal, Workflow } from "lucide-react";

export default function SecOpsSynchronizedSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Arka planda akıp giden enterprise güvenlik node'ları ve veri akışı (Interactive Canvas)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || 800);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Veri paketleri / Node'lar
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }[] = [];
    for (let i = 0; i < 25; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1.5,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Node bağlantı çizgileri (Neural Mesh / Zero Trust Matrix)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.strokeStyle = `rgba(0, 102, 238, ${0.25 * (1 - dist / 130)})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Node'ları hareket ettir ve çiz
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.fillStyle = "rgba(0, 102, 238, 0.7)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative w-full py-32 px-6 bg-transparent font-sans flex flex-col items-center justify-center z-10 overflow-hidden">
      {/* Canvas Arka Plan Katmanı (Canlı Enterprise SecOps Akışı) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-65 z-0">
        <canvas ref={canvasRef} className="w-full h-full max-w-[1200px]" />
      </div>

      <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center text-center">
        {/* Üst Kısım: Enterprise Entegrasyon İkonları Hapı (Badge) */}
        <div className="bg-white/90 backdrop-blur-2xl rounded-2xl px-6 py-4 flex flex-col items-center gap-3 mb-8 border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-4 text-slate-800">
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200/60 flex items-center justify-center text-[#0066EE] shadow-sm">
              <Workflow className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200/60 flex items-center justify-center text-[#0066EE] shadow-sm">
              <Bell className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200/60 flex items-center justify-center text-[#0066EE] shadow-sm">
              <Terminal className="w-5 h-5" />
            </div>
          </div>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500">
            Enterprise Integrations & Real-Time Telemetry
          </span>
        </div>

        {/* Ana Başlık */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#111111] tracking-tight mb-6">
          SecOps synchronized.
        </h2>

        {/* Açıklama Metni (Daha Anlaşılır ve Profesyonel Kurumsal Dilde) */}
        <p className="font-mono text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed mb-12">
          Integrate Aegisora's Command Center directly into your enterprise
          stack — Slack, Microsoft Teams, and PagerDuty. Receive instant,
          context-aware alerts for zero-trust policy violations, masked PII
          vectors, and runtime prompt injection attempts.
        </p>

        {/* CTA Butonları */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="bg-[#0066EE] hover:bg-[#005bb5] text-white text-[13px] font-medium px-7 py-3.5 rounded-full transition-colors shadow-md shadow-blue-500/20 cursor-pointer inline-flex items-center justify-center"
          >
            View Documentation
          </Link>
          <Link
            href="/login"
            className="text-slate-700 hover:text-black text-[13px] font-medium transition-colors px-3 cursor-pointer inline-flex items-center"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
}
