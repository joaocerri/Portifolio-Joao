import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import AboutUs from "@/components/about-us"
import CategoryCarousel from "@/components/category-carousel"
import ProductShowcaseGeneric from "@/components/product-showcase-generic"
import { maleProducts, femaleProducts, kidsProducts, shoesProducts } from "@/components/product-data"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <div id="sobre" className="py-16">
        <AboutUs />
      </div>
      <div id="categorias">
        <CategoryCarousel />
      </div>
      <div className="bg-gray-50">
        <ProductShowcaseGeneric id="vitrine-masculina" title="Moda Masculina" products={maleProducts} />
        <ProductShowcaseGeneric id="vitrine-feminina" title="Moda Feminina" products={femaleProducts} />
        <ProductShowcaseGeneric id="vitrine-infantil" title="Moda Infantil" products={kidsProducts} />
        <ProductShowcaseGeneric id="vitrine-calcados" title="Calçados" products={shoesProducts} />
      </div>
      <div id="contato" className="py-16">
        <Contact />
      </div>
      <Footer />
    </main>
  )
}
