"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface StatProps {
  value: number
  label: string
  suffix?: string
  delay?: number
}

function Stat({ value, label, suffix = "", delay = 0 }: StatProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      const duration = 2000 // 2 seconds
      const startTime = Date.now()

      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          const elapsedTime = Date.now() - startTime
          const progress = Math.min(elapsedTime / duration, 1)
          setCount(Math.floor(progress * value))

          if (progress === 1) {
            clearInterval(interval)
          }
        }, 16)

        return () => clearInterval(interval)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [isInView, value, delay])

  return (
    <motion.div
      ref={ref}
      className="text-center p-4 md:p-6 glass-card rounded-xl hover:shadow-[0_4px_15px_rgba(0,212,181,0.5)]"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, delay: delay / 1000 }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      <div className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-[#00A3B5] to-[#00D4B5] bg-clip-text text-transparent">
        {count}
        {suffix}
      </div>
      <div className="text-gray-300 text-lg">{label}</div>
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section className="py-16 md:py-20" style={{ background: "#000000" }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <Stat value={90} label="Faster Incident Resolution" suffix="%" delay={0} />
          <Stat value={100} label="Pre-built AI RCA Workflows" suffix="+" delay={200} />
          <Stat value={50} label="Fewer Repeat Incidents" suffix="%" delay={400} />
        </div>
      </div>
    </section>
  )
}

