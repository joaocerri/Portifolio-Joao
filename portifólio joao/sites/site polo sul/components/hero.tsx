import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="relative h-screen bg-black text-white">
      <div className="absolute inset-0 opacity-60">
        <Image src="/images/familia.png" alt="Família Polo Sul" fill className="object-cover object-top" priority />
      </div>
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-end items-start pb-16">
        <div className="max-w-2xl animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">POLO SUL</h1>
          <p className="text-xl md:text-2xl mb-8">
            Da nossa família para a sua, venha conhecer a Polo Sul e descubra moda para toda a família!
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="bg-white text-black hover:bg-gray-200 transition-all duration-300">
              <a href="#vitrine">Ver Coleção</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <a href="#contato">Fale Conosco</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
