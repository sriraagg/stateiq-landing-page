"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Quote } from "lucide-react"

interface Testimonial {
  quote: string
  author: string
  role: string
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const testimonials: Testimonial[] = [
    {
      quote:
        "StateIQ saved us hours of downtime! The AI-driven analysis identified a root cause that would have taken our team days to find manually.",
      author: "Sarah Johnson",
      role: "DevOps Lead",
    },
    {
      quote:
        "The ability to correlate events across our microservices architecture has been game-changing for our incident response process.",
      author: "Michael Chen",
      role: "SRE Manager",
    },
    {
      quote:
        "We've reduced our MTTR by over 70% since implementing StateIQ. It's become an essential part of our operations toolkit.",
      author: "Priya Patel",
      role: "CTO",
    },
    {
      quote: "The AI workflows are a game-changer. We can identify patterns across systems that humans would miss.",
      author: "David Williams",
      role: "SRE Manager",
    },
    {
      quote: "Seamless integration, instant results. StateIQ plugged right into our observability stack.",
      author: "Sophia Lee",
      role: "Cloud Engineer",
    },
  ]

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000) // 5 seconds per testimonial

    return () => clearInterval(interval)
  }, [isPaused, testimonials.length])

  return (
    <section className="py-16 md:py-20" style={{ background: "#000000" }}>
      <div ref={ref} className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Our Users Are Saying</h2>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div
            className="glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_4px_15px_rgba(0,212,181,0.5)]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative p-8 md:p-10">
              <div className="absolute top-5 left-5 text-teal-400 opacity-30">
                <Quote size={40} />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="min-h-[160px] md:min-h-[120px] flex flex-col justify-center"
                >
                  <blockquote className="text-xl md:text-2xl text-center text-gray-300 italic mb-8">
                    "{testimonials[current].quote}"
                  </blockquote>
                  <div className="text-center">
                    <div className="font-semibold text-white">{testimonials[current].author}</div>
                    <div className="text-[#00D4B5]">{testimonials[current].role}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current ? "w-8 bg-gradient-to-r from-[#00A3B5] to-[#00D4B5]" : "w-2 bg-gray-600"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

