"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos])

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Sobre Nós", href: "#sobre" },
    { name: "Vitrine", href: "#categorias" },
    { name: "Redes Sociais", href: "#redes" },
    { name: "Contato", href: "#contato" },
  ]

  return (
    <header
      className={`fixed w-full z-50 transition-transform duration-300 bg-black text-white ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-0 py-1 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="#home" className="relative h-20 w-64 ml-0 pl-0">
            <Image
              src="/images/logobranco.png"
              alt="Polo Sul Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 mr-4">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href} className="hover:text-gray-300 transition-colors duration-200">
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden mr-4" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 hover:text-gray-300 transition-colors duration-200"
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
