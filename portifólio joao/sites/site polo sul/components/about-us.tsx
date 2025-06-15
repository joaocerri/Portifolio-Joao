import Image from "next/image"

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Sobre Nós</h2>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="bg-gray-50 p-6 md:p-8 rounded-lg shadow-sm">
          <p className="text-lg mb-6 leading-relaxed">
            Desde 1970, a Polo Sul tem se destacado no mundo da moda, trazendo estilo e conforto para toda a família.
            Fundada por Antônio e Jeni, a loja começou como um pequeno sonho que cresceu com muito amor e dedicação. Com
            o passar dos anos, a paixão pela moda e pelo atendimento ao cliente transformou a Polo Sul em um verdadeiro
            ícone na comunidade.
          </p>
          <p className="text-lg mb-6 leading-relaxed">
            Hoje, a tradição continua viva com a ajuda dos filhos Fábio, Fabiana e Fabiola, que trouxeram novas ideias e
            energia para a empresa familiar. Juntos, eles trabalham para manter o legado da família, oferecendo produtos
            de qualidade que atendem às necessidades de todos os membros da família.
          </p>
          <p className="text-lg leading-relaxed">
            Na Polo Sul, acreditamos que cada peça de roupa conta uma história. Por isso, nos dedicamos a proporcionar
            moda acessível e atemporal, sempre com um toque especial. Nossa missão é fazer com que cada cliente se sinta
            parte da nossa família.
          </p>
        </div>

        <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-md">
          <Image src="/images/familia-loja.png" alt="Família Polo Sul na loja" fill className="object-cover" priority />
        </div>
      </div>
    </div>
  )
}
