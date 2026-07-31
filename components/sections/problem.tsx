"use client"

import { motion } from 'framer-motion'
import { useRef } from 'react'

export default function Problem() {
  const containerRef = useRef<HTMLDivElement>(null)

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section className="relative py-32 md:py-48 flex items-center justify-center overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full" ref={containerRef}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {}
            }}
            className="flex flex-col gap-8 md:gap-12"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-secondary">
              People forget.
            </motion.h2>
            <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-secondary">
              Important conversations <span className="text-primary opacity-40 line-through">disappear.</span>
            </motion.h2>
            <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-secondary">
              Brilliant ideas <span className="text-primary opacity-40 line-through">vanish.</span>
            </motion.h2>
            
            <motion.div variants={fadeIn} className="mt-12 md:mt-24 pt-12 border-t border-border">
              <p className="text-xl md:text-3xl font-medium tracking-tight text-primary leading-tight">
                Your memory shouldn't rely on pulling out a screen. <br className="hidden md:block" />
                It should be natural.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}