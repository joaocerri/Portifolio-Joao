# Polo Sul - Site da Loja (HTML/CSS/JS)

Site institucional da loja de roupas Polo Sul, desenvolvido com HTML, CSS e JavaScript vanilla.

## Características

- Design responsivo
- Vitrine de produtos com carrossel
- Integração com WhatsApp para vendas
- Seções de Sobre Nós, Contato e Redes Sociais
- Menu mobile responsivo
- Carrossel de categorias automático
- Navegação suave entre seções

## Tecnologias Utilizadas

- HTML5
- CSS3 (com Tailwind CSS via CDN)
- JavaScript Vanilla
- Lucide Icons

## Estrutura do Projeto

\`\`\`
polo-sul-html/
├── index.html          # Página principal
├── style.css           # Estilos customizados
├── script.js           # Funcionalidades JavaScript
├── images/             # Imagens do site
│   ├── logobranco.png
│   ├── familia.png
│   ├── familia-loja.png
│   ├── moda-masculina.png
│   ├── moda-feminina.png
│   ├── moda-infantil.png
│   └── moda-calcados-novo.png
└── README.md
\`\`\`

## Como Executar

1. Clone ou baixe os arquivos do projeto
2. Abra o arquivo `index.html` em qualquer navegador web moderno
3. O site funcionará completamente offline (exceto pelas imagens de placeholder dos produtos)

## Funcionalidades

### Navegação
- Menu responsivo com versão mobile
- Navegação suave entre seções
- Navbar que se esconde/mostra no scroll

### Carrosséis
- Carrossel automático de categorias de produtos
- Carrosséis de produtos para cada categoria (Masculina, Feminina, Infantil, Calçados)
- Navegação por setas e indicadores

### Produtos
- Vitrine de produtos organizados por categoria
- Botão de compra via WhatsApp para cada produto
- Layout responsivo para diferentes tamanhos de tela

### Contato
- Informações de contato completas
- Links para redes sociais
- Integração direta com WhatsApp

## Personalização

### Produtos
Para alterar os produtos, edite o objeto `productData` no arquivo `script.js`:

\`\`\`javascript
const productData = {
    masculina: [
        { id: 1, name: "Nome do Produto", price: "R$ 99,90", image: "url-da-imagem" }
        // ... mais produtos
    ]
    // ... outras categorias
};
\`\`\`

### Estilos
- Estilos principais via Tailwind CSS (CDN)
- Estilos customizados no arquivo `style.css`
- Cores e animações podem ser modificadas facilmente

### Contato
Altere as informações de contato diretamente no HTML:
- Telefones
- Endereço
- Email
- Links das redes sociais

## Hospedagem

Este site pode ser hospedado em qualquer servidor web estático:
- GitHub Pages
- Netlify
- Vercel
- Servidor web tradicional

## Compatibilidade

- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Dispositivos móveis e desktop
- Funciona offline (exceto imagens externas)

## Licença

Todos os direitos reservados - Polo Sul
