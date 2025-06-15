// Dados dos produtos
const products = [
  {
    id: 1,
    name: "Whey Protein Concentrado",
    description: "Proteína de alta qualidade para ganho de massa muscular",
    price: 89.9,
    image: "assets/whey-concentrado.png",
    category: "whey",
    badge: "Mais Vendido",
  },
  {
    id: 2,
    name: "Creatina Monohidratada",
    description: "Aumenta força e resistência muscular",
    price: 45.9,
    image: "assets/creatina.png",
    category: "creatina",
    badge: "Oferta",
  },
  {
    id: 3,
    name: "Pré-Treino Extreme",
    description: "Energia e foco para treinos intensos",
    price: 67.9,
    image: "assets/pretreino.png",
    category: "pre-treino",
    badge: "Novo",
  },
  {
    id: 4,
    name: "Multivitamínico Premium",
    description: "Complexo vitamínico completo",
    price: 39.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "vitaminas",
  },
  {
    id: 5,
    name: "Whey Isolado",
    description: "Proteína isolada de absorção rápida",
    price: 129.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "whey",
    badge: "Premium",
  },
  {
    id: 6,
    name: "Creatina HCL",
    description: "Creatina de alta solubilidade",
    price: 59.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "creatina",
  },
  {
    id: 7,
    name: "Pré-Treino Natural",
    description: "Fórmula natural sem estimulantes",
    price: 54.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "pre-treino",
  },
  {
    id: 8,
    name: "Vitamina D3",
    description: "Fortalece ossos e sistema imunológico",
    price: 29.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "vitaminas",
    badge: "Essencial",
  },
  {
    id: 9,
    name: "BCAA 2:1:1",
    description: "Aminoácidos essenciais para recuperação muscular",
    price: 49.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "aminoacidos",
  },
  {
    id: 10,
    name: "Glutamina",
    description: "Suporte para sistema imunológico e recuperação",
    price: 34.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "aminoacidos",
  },
  {
    id: 11,
    name: "Ômega 3",
    description: "Ácidos graxos essenciais para saúde cardiovascular",
    price: 44.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "vitaminas",
  },
  {
    id: 12,
    name: "ZMA",
    description: "Zinco, Magnésio e Vitamina B6 para recuperação",
    price: 39.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "vitaminas",
  },
  {
    id: 13,
    name: "Termogênico",
    description: "Acelera metabolismo e queima de gordura",
    price: 59.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "termogenicos",
  },
  {
    id: 14,
    name: "L-Carnitina",
    description: "Transporta gordura para produção de energia",
    price: 49.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "termogenicos",
  },
  {
    id: 15,
    name: "Albumina",
    description: "Proteína de ovo para ganho de massa",
    price: 29.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "proteinas",
  },
  {
    id: 16,
    name: "Caseína",
    description: "Proteína de absorção lenta para recuperação noturna",
    price: 79.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "proteinas",
  },
  {
    id: 17,
    name: "Beta-Alanina",
    description: "Aumenta resistência muscular",
    price: 39.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "aminoacidos",
  },
  {
    id: 18,
    name: "Taurina",
    description: "Aminoácido para performance e recuperação",
    price: 24.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "aminoacidos",
  },
  {
    id: 19,
    name: "Vitamina C",
    description: "Antioxidante e suporte imunológico",
    price: 19.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "vitaminas",
  },
  {
    id: 20,
    name: "Vitamina E",
    description: "Antioxidante para saúde celular",
    price: 24.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "vitaminas",
  },
  {
    id: 21,
    name: "Pré-Treino Explosivo",
    description: "Energia máxima para treinos pesados",
    price: 69.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "pre-treino",
  },
  {
    id: 22,
    name: "Pré-Treino Foco",
    description: "Concentração e energia para treinos",
    price: 64.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "pre-treino",
  },
  {
    id: 23,
    name: "Whey Hidrolisado",
    description: "Proteína de absorção ultra-rápida",
    price: 149.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "whey",
  },
  {
    id: 24,
    name: "Whey 3W",
    description: "Blend de proteínas para ganho de massa",
    price: 99.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "whey",
  },
  {
    id: 25,
    name: "Creatina Creapure",
    description: "Creatina de alta pureza",
    price: 69.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "creatina",
  },
  {
    id: 26,
    name: "Creatina Etil Éster",
    description: "Creatina de alta solubilidade",
    price: 54.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "creatina",
  },
  {
    id: 27,
    name: "Vitamina B12",
    description: "Energia e saúde do sistema nervoso",
    price: 29.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "vitaminas",
  },
  {
    id: 28,
    name: "Vitamina B Complex",
    description: "Complexo B para energia e metabolismo",
    price: 34.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "vitaminas",
  },
  {
    id: 29,
    name: "Termogênico Premium",
    description: "Queima de gordura avançada",
    price: 79.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "termogenicos",
  },
  {
    id: 30,
    name: "Termogênico Natural",
    description: "Queima de gordura sem estimulantes",
    price: 59.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "termogenicos",
  },
  {
    id: 31,
    name: "Proteína Vegetal",
    description: "Proteína para veganos e vegetarianos",
    price: 89.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "proteinas",
  },
  {
    id: 32,
    name: "Proteína de Arroz",
    description: "Proteína vegetal de alta qualidade",
    price: 69.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "proteinas",
  },
  {
    id: 33,
    name: "Arginina",
    description: "Aminoácido para bombeamento muscular",
    price: 39.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "aminoacidos",
  },
  {
    id: 34,
    name: "Citrulina",
    description: "Aminoácido para resistência e recuperação",
    price: 44.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "aminoacidos",
  },
  {
    id: 35,
    name: "Vitamina A",
    description: "Saúde da visão e sistema imunológico",
    price: 24.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "vitaminas",
  },
  {
    id: 36,
    name: "Vitamina K",
    description: "Saúde óssea e coagulação sanguínea",
    price: 29.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "vitaminas",
  },
  {
    id: 37,
    name: "Pré-Treino Energético",
    description: "Energia e foco para treinos",
    price: 59.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "pre-treino",
  },
  {
    id: 38,
    name: "Pré-Treino Resistência",
    description: "Resistência e recuperação para treinos",
    price: 64.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "pre-treino",
  },
  {
    id: 39,
    name: "Whey Zero Lactose",
    description: "Proteína para intolerantes à lactose",
    price: 119.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "whey",
  },
  {
    id: 40,
    name: "Whey Saborizado",
    description: "Proteína com sabores deliciosos",
    price: 109.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "whey",
  },
  {
    id: 41,
    name: "Creatina em Pó",
    description: "Creatina pura para ganho de força",
    price: 49.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "creatina",
  },
  {
    id: 42,
    name: "Creatina em Cápsulas",
    description: "Creatina em cápsulas para praticidade",
    price: 54.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "creatina",
  },
  {
    id: 43,
    name: "Vitamina D + K2",
    description: "Saúde óssea e imunológica",
    price: 39.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "vitaminas",
  },
  {
    id: 44,
    name: "Vitamina C + Zinco",
    description: "Imunidade e saúde celular",
    price: 34.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "vitaminas",
  },
  {
    id: 45,
    name: "Termogênico Intenso",
    description: "Queima de gordura máxima",
    price: 89.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "termogenicos",
  },
  {
    id: 46,
    name: "Termogênico Suave",
    description: "Queima de gordura sem efeitos colaterais",
    price: 69.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "termogenicos",
  },
  {
    id: 47,
    name: "Proteína de Ervilha",
    description: "Proteína vegetal de alta qualidade",
    price: 79.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "proteinas",
  },
  {
    id: 48,
    name: "Proteína de Cânhamo",
    description: "Proteína vegetal rica em ômega 3",
    price: 89.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "proteinas",
  },
  {
    id: 49,
    name: "Leucina",
    description: "Aminoácido essencial para síntese proteica",
    price: 44.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "aminoacidos",
  },
  {
    id: 50,
    name: "Isoleucina",
    description: "Aminoácido para energia e recuperação",
    price: 39.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "aminoacidos",
  },
  {
    id: 51,
    name: "Vitamina B6",
    description: "Metabolismo e saúde do sistema nervoso",
    price: 24.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "vitaminas",
  },
  {
    id: 52,
    name: "Vitamina B1",
    description: "Energia e saúde do sistema nervoso",
    price: 19.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "vitaminas",
  },
  {
    id: 53,
    name: "Pré-Treino Foco Total",
    description: "Concentração e energia para treinos",
    price: 74.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "pre-treino",
  },
  {
    id: 54,
    name: "Pré-Treino Energia Total",
    description: "Energia máxima para treinos",
    price: 69.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "pre-treino",
  },
  {
    id: 55,
    name: "Whey Gold Standard",
    description: "Proteína premium para ganho de massa",
    price: 139.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "whey",
  },
  {
    id: 56,
    name: "Whey Performance",
    description: "Proteína para atletas de alto rendimento",
    price: 129.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "whey",
  },
]

// Cupons de desconto disponíveis
const coupons = {
  BEMVINDO10: { discount: 10, description: "10% de desconto para novos clientes" },
  FRETE15: { discount: 15, description: "15% de desconto + frete grátis" },
  MEGA20: { discount: 20, description: "20% de desconto em compras acima de R$ 200" },
  VIP25: { discount: 25, description: "25% de desconto para clientes VIP" },
}

// Estado da aplicação
let cart = JSON.parse(localStorage.getItem("cart")) || []
let filteredProducts = [...products]

// Estado do cupom aplicado
let appliedCoupon = JSON.parse(localStorage.getItem("appliedCoupon")) || null

// Elementos DOM
const productsGrid = document.getElementById("productsGrid")
const cartIcon = document.getElementById("cartIcon")
const cartCount = document.getElementById("cartCount")
const cartModal = document.getElementById("cartModal")
const closeCart = document.getElementById("closeCart")
const cartItems = document.getElementById("cartItems")
const cartTotal = document.getElementById("cartTotal")
const checkoutBtn = document.getElementById("checkoutBtn")
const successMessage = document.getElementById("successMessage")
const searchInput = document.getElementById("searchInput")
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const nav = document.getElementById("nav")

// Elementos do cupom
const couponInput = document.getElementById("couponInput")
const applyCouponBtn = document.getElementById("applyCouponBtn")
const couponMessage = document.getElementById("couponMessage")
const appliedCouponDiv = document.getElementById("appliedCoupon")
const appliedCouponCode = document.getElementById("appliedCouponCode")
const appliedCouponDiscount = document.getElementById("appliedCouponDiscount")
const removeCouponBtn = document.getElementById("removeCouponBtn")
const cartSubtotal = document.getElementById("cartSubtotal")
const discountLine = document.getElementById("discountLine")
const discountAmount = document.getElementById("discountAmount")

// Adicionar event listeners para cupons
if (applyCouponBtn) {
  applyCouponBtn.addEventListener("click", applyCoupon)
}

if (removeCouponBtn) {
  removeCouponBtn.addEventListener("click", removeCoupon)
}

if (couponInput) {
  couponInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      applyCoupon()
    }
  })
}

// Função para aplicar cupom
function applyCoupon() {
  const couponCode = couponInput.value.trim().toUpperCase()

  if (!couponCode) {
    showCouponMessage("Digite um código de cupom", "error")
    return
  }

  if (appliedCoupon) {
    showCouponMessage("Você já tem um cupom aplicado", "error")
    return
  }

  if (coupons[couponCode]) {
    const coupon = coupons[couponCode]
    const subtotal = calculateSubtotal()

    // Verificar valor mínimo para alguns cupons
    if (couponCode === "MEGA20" && subtotal < 200) {
      showCouponMessage("Este cupom é válido apenas para compras acima de R$ 200,00", "error")
      return
    }

    appliedCoupon = {
      code: couponCode,
      discount: coupon.discount,
      description: coupon.description,
    }

    localStorage.setItem("appliedCoupon", JSON.stringify(appliedCoupon))

    showAppliedCoupon()
    updateCartTotals()
    showCouponMessage(`Cupom aplicado! ${coupon.description}`, "success")
    couponInput.value = ""
  } else {
    showCouponMessage("Cupom inválido ou expirado", "error")
  }
}

// Função para remover cupom
function removeCoupon() {
  appliedCoupon = null
  localStorage.removeItem("appliedCoupon")
  hideAppliedCoupon()
  updateCartTotals()
  showCouponMessage("Cupom removido", "success")
}

// Função para mostrar cupom aplicado
function showAppliedCoupon() {
  if (appliedCoupon && appliedCouponDiv) {
    appliedCouponCode.textContent = appliedCoupon.code
    appliedCouponDiscount.textContent = appliedCoupon.discount
    appliedCouponDiv.style.display = "flex"
    couponInput.style.display = "none"
    applyCouponBtn.style.display = "none"
  }
}

// Função para esconder cupom aplicado
function hideAppliedCoupon() {
  if (appliedCouponDiv) {
    appliedCouponDiv.style.display = "none"
    couponInput.style.display = "block"
    applyCouponBtn.style.display = "block"
    discountLine.style.display = "none"
  }
}

// Função para mostrar mensagem do cupom
function showCouponMessage(message, type) {
  if (couponMessage) {
    couponMessage.textContent = message
    couponMessage.className = `coupon-message ${type}`

    setTimeout(() => {
      couponMessage.textContent = ""
      couponMessage.className = "coupon-message"
    }, 3000)
  }
}

// Função para calcular subtotal
function calculateSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

// Função para calcular desconto
function calculateDiscount(subtotal) {
  if (!appliedCoupon) return 0
  return (subtotal * appliedCoupon.discount) / 100
}

// Atualizar função de cálculo de totais do carrinho
function updateCartTotals() {
  const subtotal = calculateSubtotal()
  const discount = calculateDiscount(subtotal)
  const total = subtotal - discount

  if (cartSubtotal) {
    cartSubtotal.textContent = subtotal.toFixed(2).replace(".", ",")
  }

  if (cartTotal) {
    cartTotal.textContent = total.toFixed(2).replace(".", ",")
  }

  if (discount > 0 && discountLine && discountAmount) {
    discountAmount.textContent = discount.toFixed(2).replace(".", ",")
    discountLine.style.display = "flex"
  } else if (discountLine) {
    discountLine.style.display = "none"
  }
}

// Função para lidar com o upload de imagem do produto
function setupProductImageUpload() {
  const productImageUpload = document.getElementById("productImageUpload")
  const productImage = document.getElementById("productImage")

  if (productImageUpload && productImage) {
    productImageUpload.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          productImage.src = event.target.result
        }
        reader.readAsDataURL(file)
      }
    })
  }
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  renderProducts()
  loadFeaturedProducts()
  updateCartUI()
  setupEventListeners()
  setupFAQ()
  setupContactForm()
  setupProductSorting()
  setupGlobalSearch()
  handleURLParams()
  setupProductImageUpload()

  // Mostrar cupom aplicado se existir
  if (appliedCoupon) {
    showAppliedCoupon()
  }
})

// Lógica de paginação
let currentPage = 1
const productsPerPage = 9

function renderProducts() {
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const productsToShow = filteredProducts.slice(startIndex, endIndex)
  const productsGrid = document.querySelector(".products-grid")
  if (productsGrid) {
    productsGrid.innerHTML = productsToShow.length ? productsToShow.map(product => `
      <div class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <p class="product-price">R$ ${product.price.toFixed(2)}</p>
          <button class="add-to-cart" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        </div>
      </div>
    `).join("") : "<p>Nenhum produto encontrado.</p>"
  }
  renderPagination()
}

function renderPagination() {
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const paginationContainer = document.querySelector(".pagination")
  if (paginationContainer) {
    let paginationHTML = `<button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? "disabled" : ""}>Anterior</button>`
    for (let i = 1; i <= totalPages; i++) {
      paginationHTML += `<button onclick="changePage(${i})" ${currentPage === i ? "disabled" : ""}>${i}</button>`
    }
    paginationHTML += `<button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? "disabled" : ""}>Próximo</button>`
    paginationContainer.innerHTML = paginationHTML
  }
}

function changePage(page) {
  if (page < 1 || page > Math.ceil(filteredProducts.length / productsPerPage)) return
  currentPage = page
  renderProducts()
}

// Adicionar produto ao carrinho
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      ...product,
      quantity: 1,
    })
  }

  saveCart()
  updateCartUI()
  showSuccessMessage()
}

// Remover produto do carrinho
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  saveCart()
  updateCartUI()
  renderCartItems()
}

// Atualizar quantidade
function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId)
  if (item) {
    item.quantity += change
    if (item.quantity <= 0) {
      removeFromCart(productId)
    } else {
      saveCart()
      updateCartUI()
      renderCartItems()
    }
  }
}

// Salvar carrinho no localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart))
}

// Atualizar UI do carrinho
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartCount.textContent = totalItems
  cartCount.style.display = totalItems > 0 ? "flex" : "none"
}

// Renderizar itens do carrinho
function renderCartItems() {
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart">Seu carrinho está vazio</div>'
    cartSubtotal.textContent = "0,00"
    cartTotal.textContent = "0,00"
    checkoutBtn.disabled = true
    hideAppliedCoupon()
    return
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2).replace(".", ",")}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `,
    )
    .join("")

  updateCartTotals()
  showAppliedCoupon()
  checkoutBtn.disabled = false
}

// Filtrar produtos
function filterProducts(category) {
  if (category === "all") {
    filteredProducts = [...products]
  } else {
    filteredProducts = products.filter((product) => product.category === category)
  }
  renderProducts()
}

// Buscar produtos
function searchProducts(query) {
  const searchTerm = query.toLowerCase()
  filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm),
  )
  renderProducts()
}

// Mostrar mensagem de sucesso
function showSuccessMessage() {
  successMessage.classList.add("show")
  setTimeout(() => {
    successMessage.classList.remove("show")
  }, 3000)
}

// Scroll suave para seção
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: "smooth" })
  }
}

// Configurar event listeners
function setupEventListeners() {
  // Carrinho modal
  cartIcon.addEventListener("click", () => {
    cartModal.classList.add("active")
    renderCartItems()
  })

  closeCart.addEventListener("click", () => {
    cartModal.classList.remove("active")
  })

  cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.classList.remove("active")
    }
  })

  // Filtros de categoria
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      filterProducts(btn.dataset.filter)
    })
  })

  // Cards de categoria
  document.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.dataset.category
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"))
      document.querySelector(`[data-filter="${category}"]`).classList.add("active")
      filterProducts(category)
      scrollToSection("produtos")
    })
  })

  // Busca
  searchInput.addEventListener("input", (e) => {
    searchProducts(e.target.value)
  })

  // Menu mobile
  mobileMenuBtn.addEventListener("click", () => {
    nav.classList.toggle("active")
  })

  // Navegação suave
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href").substring(1)
      scrollToSection(targetId)

      // Atualizar link ativo
      document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"))
      link.classList.add("active")

      // Fechar menu mobile
      nav.classList.remove("active")
    })
  })

  // Checkout (simulado)
  checkoutBtn.addEventListener("click", () => {
    if (cart.length > 0) {
      alert(
        "Redirecionando para o pagamento...\n\nEsta é uma demonstração. Em um site real, você seria redirecionado para a página de checkout.",
      )
      cart = []
      saveCart()
      updateCartUI()
      cartModal.classList.remove("active")
    }
  })

  // Scroll spy para navegação
  window.addEventListener("scroll", () => {
    const sections = ["home", "categorias", "produtos", "contato"]
    const scrollPos = window.scrollY + 100

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId)
      if (section) {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active")
            }
          })
        }
      }
    })
  })

  // Fechar modal com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      cartModal.classList.remove("active")
    }
  })
}

// Animações de entrada
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observar elementos para animação
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".category-card, .product-card")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Função para lidar com FAQ
function setupFAQ() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Fechar todos os outros itens
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active")
      })

      // Abrir/fechar o item clicado
      if (!isActive) {
        item.classList.add("active")
      }
    })
  })
}

// Função para lidar com formulário de contato
function setupContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simular envio do formulário
      const formData = new FormData(contactForm)
      const data = Object.fromEntries(formData)

      console.log("Dados do formulário:", data)

      // Mostrar mensagem de sucesso
      showSuccessMessage("Mensagem enviada com sucesso!")

      // Limpar formulário
      contactForm.reset()
    })
  }
}

// Função para lidar com produtos em destaque na home
function loadFeaturedProducts() {
  const featuredProductsGrid = document.getElementById("featuredProducts")

  if (featuredProductsGrid) {
    const featuredProducts = products.slice(0, 4) // Primeiros 4 produtos

    featuredProductsGrid.innerHTML = featuredProducts
      .map(
        (product) => `
          <div class="product-card" data-category="${product.category}">
              ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ""}
              <img src="${product.image}" alt="${product.name}" class="product-image">
              <div class="product-info">
                  <h3 class="product-name">${product.name}</h3>
                  <p class="product-description">${product.description}</p>
                  <div class="product-price">R$ ${product.price.toFixed(2).replace(".", ",")}</div>
                  <button class="add-to-cart" onclick="addToCart(${product.id})">
                      <i class="fas fa-cart-plus"></i> Adicionar ao Carrinho
                  </button>
              </div>
          </div>
      `,
      )
      .join("")
  }
}

// Função para lidar com ordenação de produtos
function setupProductSorting() {
  const sortSelect = document.getElementById("sortSelect")

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      const sortBy = e.target.value

      switch (sortBy) {
        case "name":
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
          break
        case "price-low":
          filteredProducts.sort((a, b) => a.price - b.price)
          break
        case "price-high":
          filteredProducts.sort((a, b) => b.price - a.price)
          break
        case "newest":
          filteredProducts.sort((a, b) => b.id - a.id)
          break
      }

      renderProducts()
    })
  }
}

// Função para lidar com parâmetros da URL
function handleURLParams() {
  const urlParams = new URLSearchParams(window.location.search)
  const categoria = urlParams.get("categoria")

  if (categoria) {
    // Filtrar por categoria se especificada na URL
    filterProducts(categoria)

    // Atualizar botões de filtro
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active")
      if (btn.dataset.filter === categoria) {
        btn.classList.add("active")
      }
    })
  }
}

// Função para busca que funciona em todas as páginas
function setupGlobalSearch() {
  const searchInput = document.getElementById("searchInput")

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim()

      if (query.length > 0) {
        // Se não estiver na página de produtos, redirecionar
        if (!window.location.pathname.includes("produtos.html")) {
          window.location.href = `produtos.html?busca=${encodeURIComponent(query)}`
          return
        }

        // Buscar produtos
        searchProducts(query)
      } else {
        // Mostrar todos os produtos
        filteredProducts = [...products]
        renderProducts()
      }
    })

    // Lidar com busca via URL
    const urlParams = new URLSearchParams(window.location.search)
    const busca = urlParams.get("busca")

    if (busca) {
      searchInput.value = busca
      searchProducts(busca)
    }
  }
}
