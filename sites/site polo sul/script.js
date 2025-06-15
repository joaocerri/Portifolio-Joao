// Product data
const productData = {
  masculina: [
    {
      id: 1,
      name: "Camiseta Básica",
      price: "R$ 79,90",
      image: "https://via.placeholder.com/400x400?text=Camiseta+Básica",
    },
    {
      id: 2,
      name: "Calça Jeans Slim",
      price: "R$ 159,90",
      image: "https://via.placeholder.com/400x400?text=Calça+Jeans",
    },
    {
      id: 3,
      name: "Camisa Social",
      price: "R$ 129,90",
      image: "https://via.placeholder.com/400x400?text=Camisa+Social",
    },
    {
      id: 4,
      name: "Bermuda Casual",
      price: "R$ 89,90",
      image: "https://via.placeholder.com/400x400?text=Bermuda+Casual",
    },
    {
      id: 5,
      name: "Blazer Clássico",
      price: "R$ 249,90",
      image: "https://via.placeholder.com/400x400?text=Blazer+Clássico",
    },
    {
      id: 6,
      name: "Jaqueta de Couro",
      price: "R$ 299,90",
      image: "https://via.placeholder.com/400x400?text=Jaqueta+Couro",
    },
  ],
  feminina: [
    {
      id: 1,
      name: "Vestido Elegante",
      price: "R$ 199,90",
      image: "https://via.placeholder.com/400x400?text=Vestido+Elegante",
    },
    {
      id: 2,
      name: "Blusa de Tricô",
      price: "R$ 149,90",
      image: "https://via.placeholder.com/400x400?text=Blusa+Tricô",
    },
    { id: 3, name: "Saia Midi", price: "R$ 119,90", image: "https://via.placeholder.com/400x400?text=Saia+Midi" },
    {
      id: 4,
      name: "Calça Legging",
      price: "R$ 89,90",
      image: "https://via.placeholder.com/400x400?text=Calça+Legging",
    },
    {
      id: 5,
      name: "Jaqueta Jeans",
      price: "R$ 179,90",
      image: "https://via.placeholder.com/400x400?text=Jaqueta+Jeans",
    },
    {
      id: 6,
      name: "Conjunto Moletom",
      price: "R$ 229,90",
      image: "https://via.placeholder.com/400x400?text=Conjunto+Moletom",
    },
  ],
  infantil: [
    {
      id: 1,
      name: "Conjunto Infantil Hering",
      price: "R$ 99,90",
      image: "https://via.placeholder.com/400x400?text=Conjunto+Infantil",
    },
    {
      id: 2,
      name: "Camiseta Estampada",
      price: "R$ 59,90",
      image: "https://via.placeholder.com/400x400?text=Camiseta+Estampada",
    },
    {
      id: 3,
      name: "Vestido Infantil",
      price: "R$ 89,90",
      image: "https://via.placeholder.com/400x400?text=Vestido+Infantil",
    },
    {
      id: 4,
      name: "Calça Moletom Kids",
      price: "R$ 69,90",
      image: "https://via.placeholder.com/400x400?text=Calça+Moletom",
    },
    {
      id: 5,
      name: "Jaqueta Infantil",
      price: "R$ 119,90",
      image: "https://via.placeholder.com/400x400?text=Jaqueta+Infantil",
    },
    {
      id: 6,
      name: "Pijama Infantil",
      price: "R$ 79,90",
      image: "https://via.placeholder.com/400x400?text=Pijama+Infantil",
    },
  ],
  calcados: [
    { id: 1, name: "Tênis Casual", price: "R$ 179,90", image: "https://via.placeholder.com/400x400?text=Tênis+Casual" },
    {
      id: 2,
      name: "Sapato Social",
      price: "R$ 199,90",
      image: "https://via.placeholder.com/400x400?text=Sapato+Social",
    },
    {
      id: 3,
      name: "Sandália Feminina",
      price: "R$ 129,90",
      image: "https://via.placeholder.com/400x400?text=Sandália+Feminina",
    },
    {
      id: 4,
      name: "Tênis Infantil",
      price: "R$ 149,90",
      image: "https://via.placeholder.com/400x400?text=Tênis+Infantil",
    },
    { id: 5, name: "Chinelo", price: "R$ 59,90", image: "https://via.placeholder.com/400x400?text=Chinelo" },
    {
      id: 6,
      name: "Bota Feminina",
      price: "R$ 229,90",
      image: "https://via.placeholder.com/400x400?text=Bota+Feminina",
    },
  ],
}

// Global variables
let categoryCurrentIndex = 0
let categoryAutoplayInterval
const productShowcases = {}
const lucide = window.lucide // Declare the lucide variable

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  lucide.createIcons()

  // Initialize components
  initializeNavbar()
  initializeCategoryCarousel()
  initializeProductShowcases()
  initializeFooter()
})

// Navbar functionality
function initializeNavbar() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link")
  const navbar = document.getElementById("navbar")

  let prevScrollPos = window.pageYOffset
  let isMenuOpen = false

  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen

    if (isMenuOpen) {
      mobileMenu.classList.remove("hidden")
      mobileMenuBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>'
    } else {
      mobileMenu.classList.add("hidden")
      mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>'
    }

    // Reinitialize icons
    lucide.createIcons()
  })

  // Close mobile menu when clicking on links
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden")
      mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>'
      isMenuOpen = false
      lucide.createIcons()
    })
  })

  // Navbar hide/show on scroll
  window.addEventListener("scroll", () => {
    const currentScrollPos = window.pageYOffset

    if (prevScrollPos > currentScrollPos || currentScrollPos < 10) {
      navbar.classList.remove("navbar-hidden")
    } else {
      navbar.classList.add("navbar-hidden")
    }

    prevScrollPos = currentScrollPos
  })
}

// Category carousel functionality
function initializeCategoryCarousel() {
  const slides = document.querySelectorAll(".category-slide")
  const indicators = document.querySelectorAll(".category-indicator")
  const prevBtn = document.getElementById("category-prev")
  const nextBtn = document.getElementById("category-next")

  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => slide.classList.remove("active"))
    indicators.forEach((indicator) => indicator.classList.remove("active"))

    // Show current slide
    slides[index].classList.add("active")
    indicators[index].classList.add("active")

    categoryCurrentIndex = index
  }

  function nextSlide() {
    const nextIndex = (categoryCurrentIndex + 1) % slides.length
    showSlide(nextIndex)
  }

  function prevSlide() {
    const prevIndex = (categoryCurrentIndex - 1 + slides.length) % slides.length
    showSlide(prevIndex)
  }

  // Event listeners
  nextBtn.addEventListener("click", nextSlide)
  prevBtn.addEventListener("click", prevSlide)

  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => showSlide(index))
  })

  // Autoplay
  function startAutoplay() {
    categoryAutoplayInterval = setInterval(nextSlide, 5000)
  }

  function stopAutoplay() {
    clearInterval(categoryAutoplayInterval)
  }

  // Start autoplay
  startAutoplay()

  // Pause autoplay on hover
  const carousel = document.getElementById("category-carousel")
  carousel.addEventListener("mouseenter", stopAutoplay)
  carousel.addEventListener("mouseleave", startAutoplay)
}

// Product showcases functionality
function initializeProductShowcases() {
  const showcases = document.querySelectorAll(".product-showcase")

  showcases.forEach((showcase) => {
    const category = showcase.dataset.category
    const products = productData[category]

    if (products) {
      productShowcases[category] = {
        currentIndex: 0,
        itemsPerPage: 3,
        products: products,
        showcase: showcase,
      }

      initializeProductShowcase(category)
    }
  })
}

function initializeProductShowcase(category) {
  const data = productShowcases[category]
  const showcase = data.showcase

  // Create product grid
  renderProducts(category)

  // Create indicators
  createProductIndicators(category)

  // Add event listeners
  const prevBtn = showcase.querySelector(".product-prev")
  const nextBtn = showcase.querySelector(".product-next")
  const prevBtnBottom = showcase.querySelector(".product-prev-btn")
  const nextBtnBottom = showcase.querySelector(".product-next-btn")

  prevBtn.addEventListener("click", () => prevProducts(category))
  nextBtn.addEventListener("click", () => nextProducts(category))
  prevBtnBottom.addEventListener("click", () => prevProducts(category))
  nextBtnBottom.addEventListener("click", () => nextProducts(category))
}

function renderProducts(category) {
  const data = productShowcases[category]
  const grid = data.showcase.querySelector(".product-grid")

  const startIndex = data.currentIndex
  const endIndex = Math.min(startIndex + data.itemsPerPage, data.products.length)
  const visibleProducts = data.products.slice(startIndex, endIndex)

  grid.innerHTML = ""

  visibleProducts.forEach((product) => {
    const productCard = createProductCard(product)
    grid.appendChild(productCard)
  })

  // Update indicators
  updateProductIndicators(category)
}

function createProductCard(product) {
  const card = document.createElement("div")
  card.className = "product-card bg-white shadow-sm hover:shadow-xl transition-all duration-300 group"

  card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
        </div>
        <div class="p-4">
            <h3 class="font-semibold text-lg">${product.name}</h3>
            <p class="text-xl font-bold mt-2">${product.price}</p>
            <div class="mt-4">
                <a href="https://wa.me/5519996577889?text=Olá! Gostaria de comprar o produto: ${encodeURIComponent(product.name)} - ${encodeURIComponent(product.price)}" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="w-full bg-black hover:bg-gray-800 text-white px-4 py-3 rounded transition-colors duration-300 flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Comprar via WhatsApp
                </a>
            </div>
        </div>
    `

  return card
}

function createProductIndicators(category) {
  const data = productShowcases[category]
  const indicatorsContainer = data.showcase.querySelector(".product-indicators")
  const totalSets = Math.ceil(data.products.length / data.itemsPerPage)

  indicatorsContainer.innerHTML = ""

  for (let i = 0; i < totalSets; i++) {
    const indicator = document.createElement("button")
    indicator.className = `product-indicator ${i === 0 ? "active" : ""}`
    indicator.dataset.set = i
    indicator.addEventListener("click", () => goToProductSet(category, i))
    indicatorsContainer.appendChild(indicator)
  }
}

function updateProductIndicators(category) {
  const data = productShowcases[category]
  const indicators = data.showcase.querySelectorAll(".product-indicator")
  const activeSet = Math.floor(data.currentIndex / data.itemsPerPage)

  indicators.forEach((indicator, index) => {
    if (index === activeSet) {
      indicator.classList.add("active")
    } else {
      indicator.classList.remove("active")
    }
  })
}

function nextProducts(category) {
  const data = productShowcases[category]
  const nextIndex = data.currentIndex + data.itemsPerPage

  if (nextIndex >= data.products.length) {
    data.currentIndex = 0
  } else {
    data.currentIndex = nextIndex
  }

  renderProducts(category)
}

function prevProducts(category) {
  const data = productShowcases[category]
  const prevIndex = data.currentIndex - data.itemsPerPage

  if (prevIndex < 0) {
    const totalSets = Math.ceil(data.products.length / data.itemsPerPage)
    data.currentIndex = (totalSets - 1) * data.itemsPerPage
  } else {
    data.currentIndex = prevIndex
  }

  renderProducts(category)
}

function goToProductSet(category, setIndex) {
  const data = productShowcases[category]
  data.currentIndex = setIndex * data.itemsPerPage
  renderProducts(category)
}

// Footer functionality
function initializeFooter() {
  const currentYearElement = document.getElementById("current-year")
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear()
  }
}

// Smooth scrolling for anchor links (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})
