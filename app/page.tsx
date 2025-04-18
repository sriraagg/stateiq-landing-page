import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import Stats from "@/components/stats"
import Features from "@/components/features"
import WhyStateIQ from "@/components/why-stateiq"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import DemoPopup from "@/components/demo-popup"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <WhyStateIQ />
      <Testimonials />
      <Footer />
      <DemoPopup />
    </main>
  )
}

