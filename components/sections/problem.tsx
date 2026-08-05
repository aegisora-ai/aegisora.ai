"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function Problem() {
  const containerRef = useRef<HTMLDivElement>(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="relative py-32 md:py-48 flex items-center justify-center overflow-hidden font-sans bg-transparent">
      <div
        className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full"
        ref={containerRef}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {},
            }}
            className="flex flex-col gap-8 md:gap-12"
          >
            {/* Kurumsal Siber Güvenlik Problem Tanımları */}
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-gray-500"
            >
              AI adoption accelerates.
            </motion.h2>
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-gray-500"
            >
              Shadow models{" "}
              <span className="text-[#111111] dark:text-white opacity-40 line-through">
                bypass security.
              </span>
            </motion.h2>
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-gray-500"
            >
              Sensitive data{" "}
              <span className="text-[#111111] dark:text-white opacity-40 line-through">
                leaks invisibly.
              </span>
            </motion.h2>

            {/* Vurucu Çözüm Mesajı */}
            <motion.div
              variants={fadeIn}
              className="mt-12 md:mt-24 pt-12 border-t border-gray-300 dark:border-white/10"
            >
              <p className="text-xl md:text-3xl font-serif tracking-tight text-[#111111] dark:text-white leading-tight">
                AI safety shouldn't rely on passive logging and delayed alerts.{" "}
                <br className="hidden md:block" />
                It demands{" "}
                <span className="text-[#0066EE] font-medium">
                  active runtime interception.
                </span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
