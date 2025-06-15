"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Interface para os produtos
interface Product {
  id: number
  name: string
  price: string
  image: string
}

// Interface para as props do componente
interface ProductShowcaseProps {
  id: string
  title: string
  products: Product[]
}

export default function ProductShowcaseGeneric({ id, title, products }: ProductShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeSet, setActiveSet] = useState(0)
  const itemsPerPage = 3

  // Calcular o número total de conjuntos de produtos
  const totalSets = Math.ceil(products.length / itemsPerPage)

  useEffect(() => {
    // Atualizar o conjunto ativo quando o índice mudar
    setActiveSet(Math.floor(currentIndex / itemsPerPage))
  }, [currentIndex])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + itemsPerPage
      return nextIndex >= products.length ? 0 : nextIndex
    })
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - itemsPerPage
      return nextIndex < 0 ? Math.max(0, products.length - itemsPerPage) : nextIndex
    })
  }

  const goToSet = (setIndex) => {
    setCurrentIndex(setIndex * itemsPerPage)
  }

  // Obter os produtos visíveis para o conjunto atual
  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <div id={id} className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">{title}</h2>

      <div className="relative py-8">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Anterior</span>
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {visibleProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden transition-all duration-300 hover:shadow-xl group border-0 rounded-none"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-xl font-bold mt-2">{product.price}</p>
                    <div className="mt-4">
                      <Button
                        className="w-full bg-black hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2"
                        asChild
                      >
                        <a
                          href={`https://wa.me/5511999988888?text=Olá! Gostaria de comprar o produto: ${product.name} - ${product.price}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          Comprar via WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Próximo</span>
          </Button>
        </div>

        {/* Indicadores de página */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSets }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSet(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSet === index ? "bg-black scale-125" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Ir para o conjunto ${index + 1}`}
            />
          ))}
        </div>

        {/* Botões de navegação adicionais */}
        <div className="flex justify-center mt-6">
          <Button
            onClick={prevSlide}
            variant="outline"
            className="mx-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>
          <Button
            onClick={nextSlide}
            variant="outline"
            className="mx-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300"
          >
            Próximo
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
