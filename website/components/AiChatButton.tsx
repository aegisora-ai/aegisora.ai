"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const AegisoraSpark = () => (
  <motion.div
    animate={{
      rotate: [0, 180, 180, 360],
      scale: [1, 1.2, 0.88, 1],
    }}
    transition={{
      duration: 3,
      ease: "easeInOut",
      times: [0, 0.4, 0.6, 1],
      repeat: Infinity,
    }}
    className="h-6 w-6 flex-shrink-0 text-[#0066EE] drop-shadow-[0_0_8px_rgba(0,102,238,0.45)] will-change-transform"
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-full w-full"
      focusable="false"
    >
      <path d="M11.25 1.5L12.75 1.5L12.75 9L19.5 4.5L20.25 5.5L14.25 10.5L22.5 11.25L22.5 12.75L14.25 13.5L20.25 18.5L19.5 19.5L12.75 15L12.75 22.5L11.25 22.5L11.25 15L4.5 19.5L3.75 18.5L9.75 13.5L1.5 12.75L1.5 11.25L9.75 10.5L3.75 5.5L4.5 4.5L11.25 9L11.25 1.5Z" />
    </svg>
  </motion.div>
);

export default function AiChatButton() {
  return (
    <div className="pointer-events-none fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-6 z-50 md:bottom-8 md:right-8">
      <Link
        href="/dashboard/ai-chat"
        prefetch={false}
        aria-label="Open Aegisora AI Assistant"
        className="pointer-events-auto"
      >
        <motion.span
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
          className="
            group
            relative
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-[#111111]/90
            backdrop-blur-xl
            shadow-[0_10px_35px_rgba(0,102,238,0.22)]
            transition-all
            duration-300
            hover:border-[#0066EE]/40
            hover:shadow-[0_12px_40px_rgba(0,102,238,0.42)]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#0066EE]
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[#0A0A0A]
            cursor-pointer
          "
        >
          <AegisoraSpark />

          <div
            role="tooltip"
            className="
              pointer-events-none
              absolute
              right-full
              top-1/2
              mr-4
              hidden
              -translate-y-1/2
              whitespace-nowrap
              rounded-lg
              border
              border-white/10
              bg-[#111111]/95
              px-3
              py-1.5
              text-xs
              font-medium
              text-white
              opacity-0
              shadow-2xl
              backdrop-blur-xl
              transition-opacity
              duration-300
              group-hover:opacity-100
              md:block
            "
          >
            Ask Aegisora AI
          </div>
        </motion.span>
      </Link>
    </div>
  );
}
