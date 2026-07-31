"use client";

import { motion } from "framer-motion";

export default function Introducing() {
  return (
    <section
      id="product"
      className="relative py-32 md:py-48 bg-surface border-y border-border"
    >
      {/* Subtle top highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-white/[0.02] w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-medium tracking-wide uppercase text-secondary">
                Introducing
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-medium tracking-tighter text-primary leading-[1.1]">
              Always there. <br />
              Never in the way.
            </h2>

            <p className="text-lg text-secondary leading-relaxed max-w-md mt-4">
              ECHO is a context-aware AI wearable designed to seamlessly
              integrate into your life. It listens, processes, and remembers the
              context of your day without demanding your attention.
            </p>

            <ul className="mt-8 flex flex-col gap-4">
              {[
                "Invisible to others",
                "Private by architecture",
                "Natural interaction",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-secondary">
                  <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center bg-white/[0.02]">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Large Product Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[4/5] md:aspect-square rounded-[32px] overflow-hidden bg-background border border-border group"
          >
            <div className="absolute inset-0 bg-surface-gradient opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="absolute inset-0 flex items-center justify-center">
              {/* Concept Ring Floating */}
              <motion.div
                animate={{ y: [-10, 10, -10], rotateX: [0, 5, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-64 h-64"
              >
                {/* Placeholder for actual 3D render */}
                <div className="absolute inset-0 rounded-full border-[24px] border-[#1A1A1A] shadow-[0_0_60px_rgba(255,255,255,0.05)] flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-white/10" />
                </div>

                {/* Fake reflection */}
                <div className="absolute top-4 right-8 w-12 h-4 bg-white/10 rounded-full blur-sm -rotate-45" />
              </motion.div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-secondary text-sm">
              <span className="font-mono text-xs opacity-50">
                Matte Black Edition
              </span>
              <span className="font-medium">Titanium Grade 5</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
