"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    handleResize()

    // Network nodes and connections
    const nodes: { x: number; y: number; size: number; speed: number; color: string }[] = []
    const connections: { from: number; to: number }[] = []

    // Create nodes
    for (let i = 0; i < 20; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 0.5 + 0.1,
        color: ["#4FD1C5", "#3182CE", "#805AD5"][Math.floor(Math.random() * 3)],
      })
    }

    // Create connections
    for (let i = 0; i < nodes.length; i++) {
      const numConnections = Math.floor(Math.random() * 3) + 1
      for (let j = 0; j < numConnections; j++) {
        const target = Math.floor(Math.random() * nodes.length)
        if (target !== i) {
          connections.push({ from: i, to: target })
        }
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      connections.forEach((conn) => {
        const fromNode = nodes[conn.from]
        const toNode = nodes[conn.to]

        ctx.beginPath()
        ctx.moveTo(fromNode.x, fromNode.y)
        ctx.lineTo(toNode.x, toNode.y)
        ctx.strokeStyle = "rgba(79, 209, 197, 0.2)"
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Draw and update nodes
      nodes.forEach((node) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()

        // Move nodes
        node.x += Math.sin(Date.now() * 0.001) * node.speed
        node.y += Math.cos(Date.now() * 0.001) * node.speed

        // Wrap around edges
        if (node.x < 0) node.x = canvas.width
        if (node.x > canvas.width) node.x = 0
        if (node.y < 0) node.y = canvas.height
        if (node.y > canvas.height) node.y = 0
      })

      requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="container mx-auto px-6 z-10 py-10 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Debug Smarter, Restore Faster with{" "}
            <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">StateIQ</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            An AI-powered incident analysis platform that connects the dots for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-medium px-8 py-6 text-lg rounded-md transition-all duration-700 glow-button"
              onClick={() => (window.location.href = "mailto:info@stateiq.com")}
            >
              Request a Demo
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

