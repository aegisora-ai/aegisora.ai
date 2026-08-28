"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Bell, Terminal, Workflow } from "lucide-react";
import { useInView } from "framer-motion";

export default function PrivateInvestigator() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isInView = useInView(containerRef, { once: false, margin: "100px" });
  const inViewRef = useRef(isInView);

  useEffect(() => {
    inViewRef.current = isInView;
  }, [isInView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const setCanvasDimensions = () => {
      if (!canvas.parentElement) return { width: 800, height: 400 };

      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      return { width: rect.width, height: rect.height };
    };

    let { width, height } = setCanvasDimensions();

    const handleResize = () => {
      const dims = setCanvasDimensions();
      width = dims.width;
      height = dims.height;
    };

    window.addEventListener("resize", handleResize);

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
      if (!inViewRef.current) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

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
    <section
      ref={containerRef}
      className="relative w-full py-32 px-6 bg-transparent font-sans flex flex-col items-center justify-center z-10 overflo w-hidden text-white"
    >
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40 z-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full max-w-[1200px] will-change-transform"
        />
      </div>

      <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center text-center">
        {/* Üst Kısım: Koyu Uyumlu Enterprise Telemetry Kutusu */}
        <div className="bg-zinc-900/90 backdrop-blur-2xl rounded-2xl px-6 py-4 flex flex-col items-center gap-3 mb-8 border b order-zinc-800 shado w-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-4 text-zinc-200">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 border b order-blue-500/20 flex items-center justify-center text-blue-400 shado w-sm">
              <Workflow className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500/10 border b order-blue-500/20 flex items-center justify-center text-blue-400 shado w-sm">
              <Bell className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500/10 border b order-blue-500/20 flex items-center justify-center text-blue-400 shado w-sm">
              <Terminal className="w-5 h-5" />
            </div>
          </div>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-blue-400">
            Enterprise Integrations & Real-Time Telemetry
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight mb-6">
          SecOps synchronized.
        </h2>

        <p className="font-mono text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed mb-12">
          Integrate Aegisora&apos;s Command Center directly into your enterprise
          stack — Slack, Microsoft Teams, and PagerDuty. Receive instant,
          context-aware alerts for zero-trust policy violations, masked PII
          vectors, and runtime prompt injection attempts.
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-medium px-7 py-3.5 rounded-full transition-colors shado w-lg shado w-blue-600/20 cursor-pointer inline-flex items-center justify-center"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
