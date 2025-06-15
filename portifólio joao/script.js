document.addEventListener("DOMContentLoaded", () => {
  // Variáveis
  const header = document.getElementById("header")
  const btnMobile = document.getElementById("btn-mobile")
  const nav = document.getElementById("nav")
  const menuItems = document.querySelectorAll("#menu a")
  const backToTop = document.querySelector(".back-to-top")
  const faqItems = document.querySelectorAll(".faq-item")

  // Header scroll com animação de ocultação
  let lastScrollTop = 0
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 100) {
      header.classList.add("scrolled")
      backToTop.classList.add("show")

      // Ocultar header ao descer, mostrar ao subir
      if (scrollTop > lastScrollTop && scrollTop > 200) {
        header.classList.add("hidden")
      } else {
        header.classList.remove("hidden")
      }
    } else {
      header.classList.remove("scrolled")
      header.classList.remove("hidden")
      backToTop.classList.remove("show")
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
  })

  // Menu mobile
  btnMobile.addEventListener("click", () => {
    nav.classList.toggle("active")
    const isActive = nav.classList.contains("active")
    btnMobile.setAttribute("aria-expanded", isActive)
    if (isActive) {
      btnMobile.setAttribute("aria-label", "Fechar Menu")
    } else {
      btnMobile.setAttribute("aria-label", "Abrir Menu")
    }
  })

  // Fechar menu ao clicar em um item
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      nav.classList.remove("active")
      btnMobile.setAttribute("aria-expanded", false)
      btnMobile.setAttribute("aria-label", "Abrir Menu")
    })
  })

  // FAQ
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    question.addEventListener("click", () => {
      // Fechar outros itens
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active")
        }
      })
      // Toggle do item atual
      item.classList.toggle("active")
    })
  })

  // Animação de elementos ao scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll("[data-aos]")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.classList.add("aos-animate")
      }
    })
  }

  // Inicializar animações
  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Executar uma vez no carregamento

  // Smooth scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80 // Ajuste para o header fixo

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Adicionar classe active aos links do menu baseado na seção atual
  function updateActiveMenu() {
    const sections = document.querySelectorAll("section")
    const scrollPos = window.scrollY + 100

    sections.forEach((section) => {
      const top = section.offsetTop
      const bottom = top + section.offsetHeight
      const id = section.getAttribute("id")

      if (scrollPos >= top && scrollPos <= bottom) {
        menuItems.forEach((item) => {
          item.classList.remove("active")
          if (item.getAttribute("href") === `#${id}`) {
            item.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", updateActiveMenu)
  updateActiveMenu() // Executar uma vez no carregamento

  // Carousel functionality
  function initCarousel() {
    const carousels = ["clientes", "pessoais"]

    carousels.forEach((carouselId) => {
      const track = document.getElementById(`carousel-${carouselId}`)
      const slides = track.querySelectorAll(".projeto-slide")
      const dots = document.querySelectorAll(`#dots-${carouselId} .dot`)
      const prevBtn = document.querySelector(`[data-carousel="${carouselId}"].prev`)
      const nextBtn = document.querySelector(`[data-carousel="${carouselId}"].next`)

      let currentSlide = 0

      function updateCarousel() {
        // Update slides
        slides.forEach((slide, index) => {
          slide.classList.toggle("active", index === currentSlide)
        })

        // Update dots
        dots.forEach((dot, index) => {
          dot.classList.toggle("active", index === currentSlide)
        })

        // Update buttons
        prevBtn.disabled = currentSlide === 0
        nextBtn.disabled = currentSlide === slides.length - 1

        // Transform track
        track.style.transform = `translateX(-${currentSlide * 100}%)`
      }

      function nextSlide() {
        if (currentSlide < slides.length - 1) {
          currentSlide++
          updateCarousel()
        }
      }

      function prevSlide() {
        if (currentSlide > 0) {
          currentSlide--
          updateCarousel()
        }
      }

      function goToSlide(slideIndex) {
        currentSlide = slideIndex
        updateCarousel()
      }

      // Event listeners
      nextBtn.addEventListener("click", nextSlide)
      prevBtn.addEventListener("click", prevSlide)

      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => goToSlide(index))
      })

      // Auto-play (optional)
      setInterval(() => {
        if (currentSlide === slides.length - 1) {
          currentSlide = 0
        } else {
          currentSlide++
        }
        updateCarousel()
      }, 5000)

      // Initialize
      updateCarousel()
    })
  }

  // Portfolio tabs functionality
  function initPortfolioTabs() {
    const tabs = document.querySelectorAll(".portfolio-tab")
    const contents = document.querySelectorAll(".portfolio-content")

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetTab = tab.getAttribute("data-tab")

        // Update tabs
        tabs.forEach((t) => t.classList.remove("active"))
        tab.classList.add("active")

        // Update content
        contents.forEach((content) => {
          content.classList.remove("active")
          if (content.id === targetTab) {
            content.classList.add("active")
          }
        })
      })
    })
  }

  // Initialize portfolio features
  initCarousel()
  initPortfolioTabs()
})
