"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

const SEARCH_PHRASES = [
  "Simulate zero-trust policy breach on finance swarm.",
  "Audit active tool call permissions across active agents.",
  "Run automated PII redaction test on LLM pipeline.",
  "Enforce strict runtime security constraints.",
];

// GPU-accelerated Aegisora Spark icon
const AegisoraSpark = ({ isVisible = true }) => {
  const shouldReduceMotion = useReducedMotion();
  const isActive = isVisible && !shouldReduceMotion;

  return (
    <motion.div
      animate={
        isActive
          ? {
              rotate: [0, 180, 180, 360],
              scale: [1, 1.25, 0.85, 1],
            }
          : { rotate: 0, scale: 1 }
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

export default function InteractiveAnalysis() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: false, margin: "100px" });
  const isActive = isInView && !shouldReduceMotion;

  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(50);

  useEffect(() => {
    if (!isInView) return;

    const handleTyping = () => {
      const i = loopNum % SEARCH_PHRASES.length;
      const fullText = SEARCH_PHRASES[i];

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
  }, [currentText, isDeleting, loopNum, typingSpeed, isInView]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[85vh] flex flex-col items-center justify-center py-20 px-4 sm:px-6 bg-transparent overflo w-hidden font-sans text-white"
    >
      {/* Animated mesh gradient */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={
            isActive
              ? {
                  rotate: [0, 90, 0],
                  scale: [1, 1.2, 1],
                }
              : { rotate: 0, scale: 1 }
          }
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[10%] w-[50vw] h-[50vw] min-w-[300px] min-h-[300px] rounded-full bg-blue-600/15 blur-[100px] md:blur-[140px] will-change-transform"
        />
        <motion.div
          animate={
            isActive
              ? {
                  rotate: [0, -90, 0],
                  scale: [1, 1.3, 1],
                }
              : { rotate: 0, scale: 1 }
          }
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[0%] left-[10%] w-[60vw] h-[60vw] min-w-[350px] min-h-[350px] rounded-full bg-blue-500/10 blur-[120px] md:blur-[160px] will-change-transform"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto mt-4">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-blue-400 bg-blue-950/80 border b order-blue-800/50 px-3.5 py-1.5 rounded-full mb-4">
          Runtime Governance Console
        </span>

        <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-bold font-serif text-white leading-[1.05] tracking-tight mb-6">
          Govern AI swarms at <br /> the speed of thought.
        </h2>

        <p className="text-zinc-400 font-mono text-sm sm:text-base leading-relaxed mb-10 max-w-xl">
          Aegisora intercepts unauthorized tool calls, enforces dynamic
          zero-trust policies, and orchestrates multi-agent ecosystems in
          real-time.
        </p>

        <Link
          href="/dashboard/ai-chat"
          className="w-full max-w-2xl outline-none group"
          aria-label="Open AI Security Console"
        >
          <div className="bg-zinc-900/90 backdrop-blur-xl border b order-zinc-800 shado w-[0_10px_30px_rgba(0,0,0,0.5)] rounded-full p-2.5 pl-6 flex items-center w-full transition-all group-hover:shado w-[0_10px_40px_rgba(0,102,238,0.25)] group-hover:bg-zinc-900 group-hover:b order-zinc-700 cursor-pointer">
            <div className="mr-3">
              <AegisoraSpark isVisible={isInView} />
            </div>

            <div className="flex-1 text-left text-zinc-200 font-medium text-[14px] sm:text-[15px] overflo w-hidden whitespace-nowrap">
              {currentText}
              <span className="inline-block w-[1.5px] h-4 bg-blue-400 ml-[2px] animate-pulse align-middle"></span>
            </div>

            <div
              aria-hidden="true"
              className="w-11 h-11 rounded-full bg-zinc-800 group-hover:bg-blue-600 flex items-center justify-center transition-all duration-300 flex-shrink-0 border b order-zinc-700 group-hover:b order-blue-500"
            >
              <ArrowUp className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
