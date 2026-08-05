"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const PHRASES = [
  "Monitor agent tool calls with granular policy audits.",
  "Enforce least-privilege API access for autonomous agents.",
  "Block unauthorized data transfers and prompt injections.",
  "Deploy a narrow control plane for enterprise AI safety.",
];

// GPU-accelerated Aegisora Spark icon
const AegisoraSpark = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? undefined
          : {
              rotate: [0, 180, 180, 360],
              scale: [1, 1.25, 0.85, 1],
            }
      }
      transition={{
        duration: 3,
        ease: "easeInOut",
        times: [0, 0.4, 0.6, 1],
        repeat: Infinity,
      }}
      className="w-5 h-5 flex-shrink-0 text-blue-400 will-change-transform"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.25 1.5L12.75 1.5L12.75 9L19.5 4.5L20.25 5.5L14.25 10.5L22.5 11.25L22.5 12.75L14.25 13.5L20.25 18.5L19.5 19.5L12.75 15L12.75 22.5L11.25 22.5L11.25 15L4.5 19.5L3.75 18.5L9.75 13.5L1.5 12.75L1.5 11.25L9.75 10.5L3.75 5.5L4.5 4.5L11.25 9L11.25 1.5Z" />
      </svg>
    </motion.div>
  );
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(50);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % PHRASES.length;
      const fullText = PHRASES[i];

      setCurrentText(
        isDeleting
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1),
      );

      setTypingSpeed(isDeleting ? 30 : 60);

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, loopNum, typingSpeed]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  rotate: [0, 90, 0],
                  scale: [1, 1.2, 1],
                }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] min-w-[300px] min-h-[300px] rounded-full bg-blue-600/15 blur-[90px] md:blur-[130px] will-change-transform"
        />
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  rotate: [0, -90, 0],
                  scale: [1, 1.3, 1],
                }
          }
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] min-w-[350px] min-h-[350px] rounded-full bg-blue-500/10 blur-[100px] md:blur-[150px] will-change-transform"
        />
      </div>

      <div className="max-w-[1240px] w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center z-10 mx-auto">
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
          <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-serif text-white leading-[1.08] tracking-tight mb-6">
            Operational Control
            <br />
            <span className="text-blue-400">for AI Agents.</span>
          </h1>

          <p className="text-zinc-400 font-mono text-xs sm:text-sm lg:text-[15px] leading-relaxed mb-8 max-w-lg">
            Stop selling abstract &quot;safety&quot;. Aegisora is the narrow
            control plane for agent tool and API calls. Enforce least-privilege
            access, block PII leaks, and generate readable audit logs—without
            the bloated black-box middleware.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[400px]">
            <a
              href="https://github.com/ozereray/aegisora.ai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Aegisora on GitHub"
              className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 transition-colors text-white py-3.5 px-4 rounded-xl text-[14px] font-medium shadow-sm border border-zinc-800"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              View on GitHub
            </a>

            <Link
              href="/login"
              className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white py-3.5 px-4 rounded-xl transition-colors text-[14px] font-medium shadow-lg shadow-blue-600/20"
            >
              Continue with work email
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 relative w-full max-w-[480px] lg:max-w-none mx-auto aspect-square lg:aspect-[4/4.5] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,102,238,0.25)] border border-zinc-800 bg-zinc-950">
          <Image
            src="/hero-visual.png"
            alt="Aegisora Platform Preview"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />

          <div className="absolute bottom-6 left-6 right-6 z-20">
            <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-[1.25rem] p-2 pl-4 flex items-center gap-3 shadow-2xl h-[46px]">
              <AegisoraSpark />

              <div className="text-zinc-200 text-[13px] font-medium flex-1 overflow-hidden whitespace-nowrap">
                {currentText}
                <span className="inline-block w-[1.5px] h-3.5 bg-blue-400 ml-[2px] animate-pulse align-middle"></span>
              </div>

              <Link
                href="/get-started"
                aria-label="Get Started with Aegisora"
                className="p-2.5 bg-zinc-800 hover:bg-blue-600 rounded-xl transition-colors cursor-pointer flex-shrink-0 group outline-none flex items-center justify-center"
              >
                <ArrowUp className="w-4 h-4 text-white group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
