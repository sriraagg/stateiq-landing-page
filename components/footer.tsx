"use client"
import { Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer id="contact" className="py-12 md:py-16 glass" style={{ background: "#000000" }}>
      <div className="container mx-auto px-6">
        <div className="border-t border-slate-800/30 pt-10 md:pt-12 pb-6 flex flex-col items-center">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-6">
              StateIQ
            </div>

            {/* Contact Information - Updated to hyperlinked text */}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
              <motion.a
                href="mailto:info@stateiq.com"
                className="text-white hover:text-teal-400 transition-colors duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Mail size={18} className="mr-2 text-teal-400" />
                info@stateiq.com
              </motion.a>
              <motion.a
                href="tel:+19404005063"
                className="text-white hover:text-teal-400 transition-colors duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Phone size={18} className="mr-2 text-teal-400" />
                +1 (940) 400-5063
              </motion.a>
            </div>

            <div className="flex justify-center space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}>
                <Button
                  variant="outline"
                  className="btn-equal border-slate-700 text-white hover:bg-slate-800 hover:text-teal-400 transition-all duration-400"
                >
                  Sign In
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}>
                <Button className="btn-equal bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-medium rounded-md transition-all duration-400 transform glow-button">
                  Sign Up
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>© {new Date().getFullYear()} StateIQ. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

