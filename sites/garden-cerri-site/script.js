// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }),
  )
}

// Smooth scrolling for anchor links
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

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (header) {
    if (window.scrollY > 100) {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
      header.style.backdropFilter = "blur(10px)"
    } else {
      header.style.backgroundColor = "#FFFFFF"
      header.style.backdropFilter = "none"
    }
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".service-card, .stat, .highlight-card, .contact-card")

  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Form validation (for contact forms)
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], textarea[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.style.borderColor = "#e74c3c"
      isValid = false
    } else {
      input.style.borderColor = "#ddd"
    }
  })

  return isValid
}

// Add loading state to buttons
function addLoadingState(button) {
  const originalText = button.textContent
  button.textContent = "Carregando..."
  button.disabled = true

  setTimeout(() => {
    button.textContent = originalText
    button.disabled = false
  }, 2000)
}

// Contact form handling (if exists on page)
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      if (validateForm(this)) {
        const submitBtn = this.querySelector('button[type="submit"]')
        addLoadingState(submitBtn)

        // Simulate form submission
        setTimeout(() => {
          alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
          this.reset()
        }, 2000)
      } else {
        alert("Por favor, preencha todos os campos obrigatórios.")
      }
    })
  }
})

// Image lazy loading
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", lazyLoadImages)

// Scroll to top functionality
function createScrollToTopButton() {
  const scrollButton = document.createElement("button")
  scrollButton.innerHTML = "↑"
  scrollButton.className = "scroll-to-top"
  scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #ACCC0C;
        color: #4E342E;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    `

  document.body.appendChild(scrollButton)

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollButton.style.opacity = "1"
    } else {
      scrollButton.style.opacity = "0"
    }
  })

  scrollButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Initialize scroll to top button
document.addEventListener("DOMContentLoaded", createScrollToTopButton)

// Phone number formatting
function formatPhoneNumber(input) {
  let value = input.value.replace(/\D/g, "")

  if (value.length >= 11) {
    value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  } else if (value.length >= 7) {
    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
  } else if (value.length >= 3) {
    value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2")
  }

  input.value = value
}

// Apply phone formatting to phone inputs
document.addEventListener("DOMContentLoaded", () => {
  const phoneInputs = document.querySelectorAll('input[type="tel"]')
  phoneInputs.forEach((input) => {
    input.addEventListener("input", () => formatPhoneNumber(input))
  })
})

// Email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Enhanced form validation
function enhancedFormValidation(form) {
  const inputs = form.querySelectorAll("input, textarea, select")
  let isValid = true

  inputs.forEach((input) => {
    const value = input.value.trim()

    // Remove previous error styling
    input.style.borderColor = "#ddd"

    // Check required fields
    if (input.hasAttribute("required") && !value) {
      input.style.borderColor = "#e74c3c"
      isValid = false
    }

    // Validate email
    if (input.type === "email" && value && !validateEmail(value)) {
      input.style.borderColor = "#e74c3c"
      isValid = false
    }

    // Validate phone (basic check for Brazilian format)
    if (input.type === "tel" && value && value.length < 14) {
      input.style.borderColor = "#e74c3c"
      isValid = false
    }
  })

  return isValid
}

// Cookie consent (simple implementation)
function showCookieConsent() {
  if (!localStorage.getItem("cookieConsent")) {
    const cookieBanner = document.createElement("div")
    cookieBanner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: #4E342E;
            color: white;
            padding: 1rem;
            text-align: center;
            z-index: 10000;
        `

    cookieBanner.innerHTML = `
            <p style="margin: 0 0 1rem 0;">Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa política de cookies.</p>
            <button onclick="acceptCookies()" style="background-color: #ACCC0C; color: #4E342E; border: none; padding: 0.5rem 1rem; border-radius: 3px; cursor: pointer;">Aceitar</button>
        `

    document.body.appendChild(cookieBanner)
  }
}

function acceptCookies() {
  localStorage.setItem("cookieConsent", "true")
  const banner = document.querySelector('[style*="position: fixed"][style*="bottom: 0"]')
  if (banner) {
    banner.remove()
  }
}

// Show cookie consent on page load
document.addEventListener("DOMContentLoaded", showCookieConsent)

// Performance optimization - Debounce function
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

// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
  const header = document.querySelector(".header")
  if (header) {
    if (window.scrollY > 100) {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
      header.style.backdropFilter = "blur(10px)"
    } else {
      header.style.backgroundColor = "#FFFFFF"
      header.style.backdropFilter = "none"
    }
  }
}, 10)

// Replace the original scroll handler with debounced version
window.removeEventListener("scroll", () => {})
window.addEventListener("scroll", debouncedScrollHandler)

// Initialize page-specific functionality
function initializePage() {
  // Add any page-specific JavaScript here
  console.log("Garden Cerri website loaded successfully!")

  // Add fade-in animation to hero section
  const hero = document.querySelector(".hero")
  if (hero) {
    hero.style.opacity = "0"
    hero.style.transform = "translateY(20px)"

    setTimeout(() => {
      hero.style.transition = "opacity 1s ease, transform 1s ease"
      hero.style.opacity = "1"
      hero.style.transform = "translateY(0)"
    }, 100)
  }
}

// Run initialization when DOM is loaded
document.addEventListener("DOMContentLoaded", initializePage)

// Error handling for images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("error", function () {
      this.src = "/placeholder.svg?height=400&width=500"
      this.alt = "Imagem não disponível"
    })
  })
})

// Accessibility improvements
document.addEventListener("DOMContentLoaded", () => {
  // Add skip to main content link
  const skipLink = document.createElement("a")
  skipLink.href = "#main-content"
  skipLink.textContent = "Pular para o conteúdo principal"
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #ACCC0C;
        color: #4E342E;
        padding: 8px;
        text-decoration: none;
        border-radius: 3px;
        z-index: 10001;
    `
  skipLink.addEventListener("focus", () => {
    skipLink.style.top = "6px"
  })
  skipLink.addEventListener("blur", () => {
    skipLink.style.top = "-40px"
  })

  document.body.insertBefore(skipLink, document.body.firstChild)

  // Add main content ID if not exists
  const mainContent =
    document.querySelector("main") || document.querySelector(".hero") || document.querySelector(".page-content")
  if (mainContent && !mainContent.id) {
    mainContent.id = "main-content"
  }
})

// Export functions for global use
window.validateForm = enhancedFormValidation
window.addLoadingState = addLoadingState
window.acceptCookies = acceptCookies

// Variáveis para controlar o scroll
let lastScrollTop = 0
const delta = 5
const headerHeight = 70

// Função para controlar a visibilidade do cabeçalho ao rolar
function hasScrolled() {
  const st = window.scrollY
  const header = document.querySelector(".header")

  // Certifique-se de que eles rolaram mais do que delta
  if (Math.abs(lastScrollTop - st) <= delta) return

  // Se eles rolaram para baixo e estão além do cabeçalho, adicione a classe "hidden"
  if (st > lastScrollTop && st > headerHeight) {
    // Rolagem para baixo
    header.classList.add("hidden")
  } else {
    // Rolagem para cima
    header.classList.remove("hidden")
  }

  lastScrollTop = st
}

// Substitua o evento de scroll existente
window.removeEventListener("scroll", debouncedScrollHandler)

// Adicione o novo manipulador de scroll
window.addEventListener(
  "scroll",
  debounce(() => {
    hasScrolled()

    // Mantenha o efeito de fundo do cabeçalho
    const header = document.querySelector(".header")
    if (header) {
      if (window.scrollY > 100) {
        header.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
        header.style.backdropFilter = "blur(10px)"
      } else {
        header.style.backgroundColor = "#FFFFFF"
        header.style.backdropFilter = "none"
      }
    }
  }, 10),
)

// Carrossel de Galeria
class GalleryCarousel {
  constructor(container) {
    this.container = container
    this.track = container.querySelector(".gallery-track")
    this.slides = container.querySelectorAll(".gallery-slide")
    this.prevBtn = container.querySelector(".gallery-nav.prev")
    this.nextBtn = container.querySelector(".gallery-nav.next")
    this.counter = container.querySelector(".gallery-counter")

    this.currentSlide = 0
    this.totalSlides = this.slides.length

    // Criar indicadores dinamicamente
    this.indicatorsContainer = container.parentElement.querySelector(".gallery-indicators")
    if (!this.indicatorsContainer) {
      this.indicatorsContainer = document.createElement("div")
      this.indicatorsContainer.className = "gallery-indicators"
      this.container.parentElement.appendChild(this.indicatorsContainer)
    }
    this.createIndicators()

    this.init()
  }

  createIndicators() {
    this.indicatorsContainer.innerHTML = ""
    this.indicators = []
    for (let i = 0; i < this.totalSlides; i++) {
      const indicator = document.createElement("span")
      indicator.className = "gallery-indicator"
      if (i === 0) indicator.classList.add("active")
      this.indicatorsContainer.appendChild(indicator)
      this.indicators.push(indicator)
    }
  }

  init() {
    this.updateCounter()
    this.updateIndicators()

    // Event listeners
    this.prevBtn.addEventListener("click", () => this.prevSlide())
    this.nextBtn.addEventListener("click", () => this.nextSlide())

    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToSlide(index))
    })

    // Auto-play (opcional)
    this.startAutoPlay()

    // Pause auto-play on hover
    this.container.addEventListener("mouseenter", () => this.stopAutoPlay())
    this.container.addEventListener("mouseleave", () => this.startAutoPlay())
  }

  updateSlide() {
    const translateX = -this.currentSlide * 100
    this.track.style.transform = `translateX(${translateX}%)`
    this.updateIndicators()
    this.updateCounter()
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides
    this.updateSlide()
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides
    this.updateSlide()
  }

  goToSlide(index) {
    this.currentSlide = index
    this.updateSlide()
  }

  updateIndicators() {
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.currentSlide)
    })
  }

  updateCounter() {
    if (this.counter) {
      this.counter.textContent = `${this.currentSlide + 1} / ${this.totalSlides}`
    }
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide()
    }, 5000) // Muda a cada 5 segundos
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval)
    }
  }
}

// Inicializar carrosseis quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  const galleries = document.querySelectorAll(".gallery-carousel")
  galleries.forEach((gallery) => {
    new GalleryCarousel(gallery)
  })
})
