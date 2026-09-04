// Main Site Components
import Header from "@/components/designs/variant-3/header"
import Hero from "@/components/designs/variant-3/hero"
import About from "@/components/designs/variant-3/about"
import Production from "@/components/designs/variant-3/production"
import Catalog from "@/components/designs/variant-3/catalog"
import Purchase from "@/components/designs/variant-3/purchase"
import Delivery from "@/components/designs/variant-3/delivery"
import VisitField from "@/components/designs/variant-3/visit-field"
import Contact from "@/components/designs/variant-3/contact"
import Footer from "@/components/designs/variant-3/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <Hero />
      <Catalog />
      <About />
      <Production />
      <Purchase />
      <Delivery />
      <VisitField />
      <Contact />
      <Footer />
    </main>
  )
}
