import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">POLO SUL</h3>
            <p className="text-gray-300">
              Da nossa família para a sua, venha conhecer a Polo Sul e descubra moda para toda a família!
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#sobre" className="text-gray-300 hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="#vitrine" className="text-gray-300 hover:text-white transition-colors">
                  Vitrines
                </Link>
              </li>
              <li>
                <Link href="#contato" className="text-gray-300 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <address className="not-italic text-gray-300">
              <p>R. 8, 1537 - Santa Cruz,</p>
              <p>Rio Claro - SP, 13500-210</p>
              <p className="mt-2">(19) 3534-6168</p>
              <p>(19) 97142-9434</p>
              <p className="mt-2">contato@polosul.com.br</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Polo Sul. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
