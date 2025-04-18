"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DemoPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasScrolled = window.scrollY > window.innerHeight * 0.5
      if (hasScrolled && !isSubmitted) {
        setIsVisible(true)
      }
    }, 10000) // 10 seconds

    return () => clearTimeout(timer)
  }, [isSubmitted])

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, you would send this data to your backend
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 3000)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            className="glass max-w-md w-full relative border border-slate-700/30 rounded-xl shadow-2xl shadow-teal-500/10"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300, duration: 0.6 }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-slate-800/50"
              aria-label="Close popup"
            >
              <X size={20} />
            </button>

            <div className="p-6">
              {!isSubmitted ? (
                <>
                  <h3 className="text-2xl font-bold mb-2 text-white">Ready to transform your incident response?</h3>
                  <p className="text-gray-400 mb-6">
                    Request a demo to see how StateIQ can help your team debug issues faster and restore services with
                    AI-powered insights.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-slate-800/50 border-slate-700/50 focus:border-teal-500/50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-slate-800/50 border-slate-700/50 focus:border-teal-500/50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="bg-slate-800/50 border-slate-700/50 focus:border-teal-500/50"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-medium glow-button"
                    >
                      Request Demo
                    </Button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-teal-400 text-5xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Thank you!</h3>
                  <p className="text-gray-400">
                    We've received your request and will contact you shortly to schedule your personalized demo.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

