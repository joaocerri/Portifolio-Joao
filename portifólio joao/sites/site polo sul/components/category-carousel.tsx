"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Dados das categorias
const categories = [
  {
    id: 1,
    name: "Moda Masculina",
    link: "#vitrine-masculina",
    image: "/images/moda-masculina.png",
  },
  {
    id: 2,
    name: "Moda Feminina",
    link: "#vitrine-feminina",
    image: "/images/moda-feminina.png",
  },
  {
    id: 3,
    name: "Moda Infantil",
    link: "#vitrine-infantil",
    image: "/images/moda-infantil.png",
  },
  {
    id: 4,
    name: "Calçados",
    link: "#vitrine-calcados",
    image: "/images/moda-calcados-novo.png",
  },
]

export default function CategoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextSlide = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  const prevSlide = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return

    setIsTransitioning(true)
    setCurrentIndex(index)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      {/* Slides */}
      {categories.map((category, index) => (
        <div
          key={category.id}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Link href={category.link} className="block h-full w-full">
            <div className="relative h-full w-full flex items-center justify-center">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-contain"
                priority={index === 0}
              />
            </div>
          </Link>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black hover:bg-black/80 text-white border-black h-12 w-12 rounded-full"
      >
        <ChevronLeft className="h-8 w-8 text-white" />
        <span className="sr-only">Anterior</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black hover:bg-black/80 text-white border-black h-12 w-12 rounded-full"
      >
        <ChevronRight className="h-8 w-8 text-white" />
        <span className="sr-only">Próximo</span>
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-3">
        {categories.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-black scale-125" : "bg-black/50 hover:bg-black/70"
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
