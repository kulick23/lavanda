// Main Site Components
import Header from "@/components/designs/variant-3/header"
import Hero from "@/components/designs/variant-3/hero"
import About from "@/components/designs/variant-3/about"
import Production from "@/components/designs/variant-3/production"
import Catalog from "@/components/designs/variant-3/catalog"
import Purchase from "@/components/designs/variant-3/purchase"
import VisitField from "@/components/designs/variant-3/visit-field"
import Contact from "@/components/designs/variant-3/contact"
import Footer from "@/components/designs/variant-3/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <Hero />
      <About />
      <Production />
      <Catalog />
      <Purchase />
      <VisitField />
      <Contact />
      <Footer />
    </main>
  )
}
