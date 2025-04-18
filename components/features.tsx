"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Brain, Zap, Activity, Terminal, MessageSquareText, Database, GitBranch, Calendar } from "lucide-react"

interface FeatureProps {
  icon: React.ReactNode
  title: string
  description: string
  index: number
}

// Update the Feature component to use the refined hover effects
function Feature({ icon, title, description, index }: FeatureProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      className="glass-card rounded-xl p-4 md:p-6 border border-slate-700/30 hover:shadow-[0_4px_15px_rgba(0,212,181,0.5)]"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      <div className="mb-4 text-teal-400 bg-slate-900/50 p-3 rounded-lg inline-block group-hover:text-[#00A3B5] transition-colors duration-500">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  )
}

export default function Features() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: <Brain size={24} />,
      title: "Learns Your Apps On-the-Fly",
      description: "Automatically maps your topology, architecture, and cloud infrastructure for intelligent analysis.",
    },
    {
      icon: <Zap size={24} />,
      title: "Event-Driven Analysis",
      description: "Trigger instant insights based on hotif events to identify issues before they escalate.",
    },
    {
      icon: <Activity size={24} />,
      title: "Anomaly & State Machine Detection",
      description: "Real-time monitoring that identifies unusual patterns and state transitions in your applications.",
    },
    {
      icon: <Terminal size={24} />,
      title: "Specialized Debugging Pipelines",
      description: "Purpose-built analysis for control-plane, data-plane, and infrastructure components.",
    },
    {
      icon: <MessageSquareText size={24} />,
      title: "Personalized RCA with Text Prompts",
      description: "Create custom root cause analysis workflows using simple natural language prompts.",
    },
    {
      icon: <Database size={24} />,
      title: "OpenTelemetry & CNCF Log Support",
      description: "Seamlessly integrate with industry-standard observability frameworks and log formats.",
    },
    {
      icon: <GitBranch size={24} />,
      title: "CI-CD Context Building",
      description: "Integrate with your development pipeline to correlate incidents with recent changes.",
    },
    {
      icon: <Calendar size={24} />,
      title: "Scheduled Maintenance Handling",
      description: "Coordinate with partner technical support during planned maintenance windows.",
    },
  ]

  return (
    <section id="features" className="py-16 md:py-20" style={{ background: "#000000" }}>
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Incident Resolution</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            StateIQ combines AI-driven analysis with deep system insights to help you resolve incidents faster.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

