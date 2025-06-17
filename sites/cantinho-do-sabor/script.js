// Dados do cardápio
const menuData = [
  // Pratos Principais
  {
    id: 1,
    name: "Salmão Grelhado",
    description: "Salmão fresco grelhado com ervas finas, acompanhado de legumes salteados e arroz de limão siciliano.",
    price: "R$ 45,90",
    category: "principais",
    image: "assets/Salmão Grelhado.png",
  },
  {
    id: 2,
    name: "Risotto de Camarão",
    description: "Cremoso risotto de camarão com tomate seco, manjericão fresco e queijo parmesão.",
    price: "R$ 42,90",
    category: "principais",
    image: "assets/Risotto de Camarão.png",
  },
  {
    id: 3,
    name: "Filé Mignon ao Molho Madeira",
    description: "Suculento filé mignon ao ponto, servido com molho madeira e batatas rústicas.",
    price: "R$ 52,90",
    category: "principais",
    image: "assets/Filé Mignon ao Molho Madeira.png",
  },
  {
    id: 4,
    name: "Lasanha da Casa",
    description: "Tradicional lasanha com molho bolonhesa caseiro, queijos especiais e manjericão.",
    price: "R$ 38,90",
    category: "principais",
    image: "assets/Lasanha da Casa.png",
  },
  {
    id: 5,
    name: "Frango à Parmegiana",
    description: "Peito de frango empanado, molho de tomate especial, queijo derretido e batata frita.",
    price: "R$ 35,90",
    category: "principais",
    image: "assets/Frango à Parmegiana.png",
  },
  {
    id: 6,
    name: "Paella Valenciana",
    description: "Tradicional paella espanhola com frutos do mar, frango, açafrão e pimentões.",
    price: "R$ 48,90",
    category: "principais",
    image: "assets/Paella Valenciana.png",
  },

  // Sobremesas
  {
    id: 7,
    name: "Petit Gâteau",
    description: "Delicioso bolinho de chocolate quente com sorvete de baunilha e calda de chocolate.",
    price: "R$ 18,90",
    category: "sobremesas",
    image: "assets/Petit Gâteau.png",
  },
  {
    id: 8,
    name: "Tiramisu",
    description: "Clássica sobremesa italiana com café, mascarpone, cacau e biscoitos champagne.",
    price: "R$ 16,90",
    category: "sobremesas",
    image: "assets/Tiramisu.png",
  },
  {
    id: 9,
    name: "Cheesecake de Frutas Vermelhas",
    description: "Cremoso cheesecake com base de biscoito e cobertura de frutas vermelhas frescas.",
    price: "R$ 19,90",
    category: "sobremesas",
    image: "assets/Cheesecake de Frutas Vermelhas.png",
  },
  {
    id: 10,
    name: "Pudim de Leite Condensado",
    description: "Tradicional pudim brasileiro com calda de caramelo e toque especial da casa.",
    price: "R$ 14,90",
    category: "sobremesas",
    image: "assets/Pudim de Leite Condensado.png",
  },
  {
    id: 11,
    name: "Brownie com Sorvete",
    description: "Brownie de chocolate meio amargo servido quente com sorvete de creme e nozes.",
    price: "R$ 17,90",
    category: "sobremesas",
    image: "assets/Brownie com Sorvete.png",
  },

  // Bebidas
  {
    id: 12,
    name: "Suco Natural de Laranja",
    description: "Suco de laranja puro, extraído na hora, rico em vitamina C e sabor refrescante.",
    price: "R$ 8,90",
    category: "bebidas",
    image: "assets/Suco Natural de Laranja.png",
  },
  {
    id: 13,
    name: "Limonada Suíça",
    description: "Refrescante limonada com leite condensado, limão siciliano e gelo.",
    price: "R$ 9,90",
    category: "bebidas",
    image: "assets/Limonada Suíça.png",
  },
  {
    id: 14,
    name: "Água de Coco Gelada",
    description: "Água de coco natural, gelada e refrescante, direto do coco verde.",
    price: "R$ 7,90",
    category: "bebidas",
    image: "assets/Água de Coco Gelada.png",
  },
  {
    id: 15,
    name: "Refrigerante",
    description: "Coca-Cola, Guaraná Antarctica, Fanta Laranja ou Sprite - lata 350ml.",
    price: "R$ 5,90",
    category: "bebidas",
    image: "assets/Refrigerante.png",
  },
  {
    id: 16,
    name: "Café Expresso",
    description: "Café expresso tradicional, encorpado e aromático, servido na temperatura ideal.",
    price: "R$ 4,90",
    category: "bebidas",
    image: "assets/Café Expresso.png",
  },
  {
    id: 17,
    name: "Smoothie de Frutas",
    description: "Smoothie cremoso com frutas da estação, iogurte natural e mel.",
    price: "R$ 12,90",
    category: "bebidas",
    image: "assets/Smoothie de Frutas.png",
  },
]

// Variáveis globais
let currentFilter = "todos"
let searchTerm = ""

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners()
})

// Configurar event listeners
function setupEventListeners() {
  // Filtros de categoria
  const filterButtons = document.querySelectorAll(".filter-btn")
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active de todos os botões
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Adiciona active ao botão clicado
      this.classList.add("active")

      currentFilter = this.dataset.category
      filterMenu()
    })
  })

  // Campo de busca
  const searchInput = document.getElementById("search-input")
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      searchTerm = this.value.toLowerCase()
      filterMenu()
    })
  }
}

// Navegação entre páginas
function showMenu() {
  document.getElementById("home-page").classList.remove("active")
  document.getElementById("menu-page").classList.add("active")

  // Renderizar o menu quando a página for mostrada
  setTimeout(() => {
    renderMenu()
  }, 100)
}

function showHome() {
  document.getElementById("menu-page").classList.remove("active")
  document.getElementById("home-page").classList.add("active")
}

// Renderizar itens do menu
function renderMenu() {
  const menuGrid = document.getElementById("menu-grid")
  if (!menuGrid) return

  menuGrid.innerHTML = ""

  const filteredItems = getFilteredItems()

  if (filteredItems.length === 0) {
    menuGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <h3 style="color: #0B1F3B; margin-bottom: 1rem;">Nenhum prato encontrado</h3>
                <p style="color: #666;">Tente ajustar os filtros ou termo de busca.</p>
            </div>
        `
    return
  }

  filteredItems.forEach((item, index) => {
    const menuItem = createMenuItemElement(item, index)
    menuGrid.appendChild(menuItem)
  })
}

// Criar elemento do item do menu
function createMenuItemElement(item, index) {
  const menuItem = document.createElement("div")
  menuItem.className = "menu-item"
  menuItem.style.animationDelay = `${index * 0.1}s`

  menuItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="item-image">
        <div class="item-content">
            <span class="item-category">${getCategoryName(item.category)}</span>
            <h3 class="item-name">${item.name}</h3>
            <p class="item-description">${item.description}</p>
            <div class="item-price">${item.price}</div>
        </div>
    `

  // Adicionar evento de clique
  menuItem.addEventListener("click", () => {
    showOrderModal(item)
  })

  return menuItem
}

// Obter itens filtrados
function getFilteredItems() {
  return menuData.filter((item) => {
    const matchesCategory = currentFilter === "todos" || item.category === currentFilter
    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)

    return matchesCategory && matchesSearch
  })
}

// Filtrar menu
function filterMenu() {
  const menuGrid = document.getElementById("menu-grid")
  if (!menuGrid) return

  // Adicionar efeito de fade out
  menuGrid.style.opacity = "0.5"

  setTimeout(() => {
    renderMenu()
    menuGrid.style.opacity = "1"
  }, 200)
}

// Obter nome da categoria
function getCategoryName(category) {
  const categoryNames = {
    principais: "Prato Principal",
    sobremesas: "Sobremesa",
    bebidas: "Bebida",
  }
  return categoryNames[category] || category
}

// Mostrar modal de pedido
function showOrderModal(item) {
  const modal = document.getElementById("order-modal")
  const modalMessage = document.getElementById("modal-message")

  modalMessage.textContent = `"${item.name}" foi adicionado ao seu pedido por ${item.price}!`
  modal.style.display = "block"

  // Fechar modal ao clicar fora dele
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })
}

// Fechar modal
function closeModal() {
  const modal = document.getElementById("order-modal")
  modal.style.display = "none"
}

// Fechar modal com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal()
  }
})

// Animação suave para elementos que entram na tela
function observeElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  })

  document.querySelectorAll(".menu-item").forEach((item) => {
    observer.observe(item)
  })
}

// Adicionar efeitos de hover dinâmicos
document.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("menu-item") || e.target.closest(".menu-item")) {
    const item = e.target.classList.contains("menu-item") ? e.target : e.target.closest(".menu-item")
    item.style.transform = "translateY(-10px) scale(1.02)"
  }
})

document.addEventListener("mouseout", (e) => {
  if (e.target.classList.contains("menu-item") || e.target.closest(".menu-item")) {
    const item = e.target.classList.contains("menu-item") ? e.target : e.target.closest(".menu-item")
    item.style.transform = "translateY(0) scale(1)"
  }
})

// Adicionar feedback visual aos botões
document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("cta-button") ||
    e.target.classList.contains("filter-btn") ||
    e.target.classList.contains("back-button")
  ) {
    // Criar efeito ripple
    const ripple = document.createElement("span")
    ripple.style.position = "absolute"
    ripple.style.borderRadius = "50%"
    ripple.style.background = "rgba(255,255,255,0.6)"
    ripple.style.transform = "scale(0)"
    ripple.style.animation = "ripple 0.6s linear"
    ripple.style.left = e.offsetX - 10 + "px"
    ripple.style.top = e.offsetY - 10 + "px"
    ripple.style.width = "20px"
    ripple.style.height = "20px"

    e.target.style.position = "relative"
    e.target.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }
})

// Adicionar animação ripple ao CSS dinamicamente
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Melhorar performance com debounce na busca
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Aplicar debounce na busca
const debouncedSearch = debounce(() => {
  filterMenu()
}, 300)

// Substituir o event listener da busca
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input")
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      searchTerm = this.value.toLowerCase()
      debouncedSearch()
    })
  }
})

// Controle do cabeçalho do cardápio
let lastScroll = 0;
const menuHeader = document.querySelector('.menu-header');

if (menuHeader) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            menuHeader.classList.remove('hide');
            return;
        }
        
        if (currentScroll > lastScroll && !menuHeader.classList.contains('hide')) {
            // Scroll para baixo
            menuHeader.classList.add('hide');
        } else if (currentScroll < lastScroll && menuHeader.classList.contains('hide')) {
            // Scroll para cima
            menuHeader.classList.remove('hide');
        }
        
        lastScroll = currentScroll;
    });
}
