"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { CheckCircle } from "lucide-react"

export default function WhyStateIQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [80, -80])

  const benefits = [
    "Community-trained AI on major cloud platforms",
    "Seamless CI-CD and telemetry integration",
    "Reduces time connecting the dots",
  ]

  return (
    <section
      id="why-stateiq"
      ref={sectionRef}
      className="py-16 md:py-20 relative overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* Background with parallax effect */}
      <motion.div className="absolute inset-0 z-0 opacity-20" style={{ y }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-teal-500/20" />
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(0,163,181,0.15),transparent_70%)]" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose StateIQ</h2>
          <p className="text-xl md:text-2xl font-semibold text-teal-400 max-w-3xl mx-auto">
            Scale Your L3 Support with AI Precision
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8 glass-card p-4 md:p-6 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
              // Removed whileHover animation that caused floating effect
            >
              <div className="text-teal-400 md:mr-4 mt-1">
                <CheckCircle size={24} />
              </div>
              <div className="relative overflow-hidden">
                {/* Removed the div with background gradient that created highlight effect */}
                <h3 className="text-xl font-semibold mb-2">{benefit}</h3>
                <p className="text-gray-400">
                  {index === 0 &&
                    "Our AI models are trained on real-world incidents across AWS, GCP, Azure, and more, providing accurate insights for your specific cloud environment."}
                  {index === 1 &&
                    "Integrate with your existing CI/CD pipeline and telemetry tools to provide context-aware analysis that understands your deployment patterns."}
                  {index === 2 &&
                    "Stop wasting time manually correlating logs, metrics, and traces. StateIQ automatically connects related events to identify root causes faster."}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

