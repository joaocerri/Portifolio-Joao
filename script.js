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

  // Animação de elementos ao scroll (removido event listener desnecessário, mantido stub)
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
  // Removido chamador via scroll para evitar perdas de framerate em elementos nulos

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
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -79% 0px", // Margens para detecção ativa da visualização de seção atual
    threshold: 0
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id")
        menuItems.forEach((item) => {
          item.classList.remove("active")
          if (item.getAttribute("href") === `#${id}`) {
            item.classList.add("active")
          }
        })
      }
    })
  }, observerOptions)

  document.querySelectorAll("section").forEach((section) => {
    sectionObserver.observe(section)
  })

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

      function resetInterval() {
        clearInterval(autoPlayInterval)
        autoPlayInterval = setInterval(autoAdvance, 5000)
      }

      // Event listeners
      nextBtn.addEventListener("click", () => {
        nextSlide()
        resetInterval()
      })
      
      prevBtn.addEventListener("click", () => {
        prevSlide()
        resetInterval()
      })

      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          goToSlide(index)
          resetInterval()
        })
      })

      // Auto-play (optional)
      function autoAdvance() {
        if (currentSlide === slides.length - 1) {
          currentSlide = 0
        } else {
          currentSlide++
        }
        updateCarousel()
      }
      
      let autoPlayInterval = setInterval(autoAdvance, 5000)

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

  // Dynamic Project Data
  const projectData = {
    clientes: [
      {
        title: "Loja Polo Sul",
        category: "Landing Page",
        description: "Landing Page profissional integrado com vitrine composta com mais de 20 produtos com direcionamento para o whatsapp com mensagem automatica, redes sociais e Loja Virtual.",
        image: "./assets/print_polosul.png",
        techs: ["TypeScript", "HTML5", "CSS3"],
        demoLink: "./sites/site polo sul/index.html",
        codeLink: "https://github.com/joaocerri/Portifolio-Joao/tree/main/sites/site%20polo%20sul"
      },
      {
        title: "Garden Cerri",
        category: "Site Institucional",
        description: "Página institucional profissional com ramificações para cada nicho da empresa, integrado com formulário de contato, whatsapp, redes sociais e Loja Virtual.",
        image: "./assets/print_gardencerri.png",
        techs: ["HTML5", "JavaScript", "CSS3"],
        demoLink: "./sites/garden-cerri-site/index.html",
        codeLink: "https://github.com/joaocerri/Portifolio-Joao/tree/main/sites/garden-cerri-site"
      },
      {
        title: "Flora Cerri",
        category: "Site Institucional",
        description: "Site completo com cardápio digital, sistema de reservas online e integração com principais plataformas de delivery. Aumento de 40% nas reservas online.",
        image: "./assets/print_floracerri.png",
        techs: ["HTML5", "JavaScript", "CSS3"],
        demoLink: "./sites/Flora Cerri/index.html",
        codeLink: ""
      }
    ],
    pessoais: [
      {
        title: "Página para empresa de advocacia",
        category: "Landing Page",
        description: "Landing Page completa integrada com responsividade, aba sobre, áreas de atuação, mostruário da equipe, formulário de contato, whatsapp e redes sociais.",
        image: "./assets/print_advocacia.png",
        techs: ["HTML5", "JavaScript", "CSS3"],
        demoLink: "./sites/pagina advocacia/index.html",
        codeLink: "https://github.com/joaocerri/Portifolio-Joao/tree/main/sites/pagina%20advocacia"
      },
      {
        title: "Página para fotógrafo",
        category: "Landing Page",
        description: "Landing Page completa, responsiva com portifólio integrado, aba de serviços, depoimentos e contato com formulário, redes sociais e whatsapp.",
        image: "./assets/print_fotografo.png",
        techs: ["HTML5", "JavaScript", "CSS3"],
        demoLink: "./sites/pagina de fotografo/index.html",
        codeLink: "https://github.com/joaocerri/Portifolio-Joao/tree/main/sites/pagina%20de%20fotografo"
      },
      {
        title: "Loja de Suplementos",
        category: "E-commerce",
        description: "Loja Online integrada com carrinho, cupons de descontos, mais de 50 produtos, aba de contatos, finalizar pedido e metodo de filtragem por pesquisa ou filtros pre-definidos.",
        image: "./assets/print_mnsuplementos.png",
        techs: ["HTML5", "JavaScript", "CSS3"],
        demoLink: "./sites/mnsuplementos/index.html",
        codeLink: "https://github.com/joaocerri/Portifolio-Joao/tree/main/sites/mnsuplementos"
      },
      {
         title: "Site para Personal Trainer",
         category: "Landing Page",
         description: "Página completa, responsiva, animada, integrada com aba de detalhamento do serviço, planos, depoimentos, vídeo demonstrativo e formulário de contato.",
         image: "./assets/print_personal.png",
         techs: ["HTML5", "JavaScript", "CSS3"],
         demoLink: "./sites/pagina para personal/index.html",
         codeLink: "https://github.com/joaocerri/Portifolio-Joao/tree/main/sites/pagina%20para%20personal"
      },
      {
        title: "Página para estúdio de tatuagem",
        category: "Dashboard",
        description: "Landing Page responsiva, animada e integrada com portifólio, tipos de trabalhos, equipe de tatuadores e aba de contato com formulário e informações de comunicação.",
        image: "./assets/print_tatuagem.png",
        techs: ["HTML5", "JavaScript", "CSS3"],
        demoLink: "./sites/studio de tatuagem/index.html",
        codeLink: "https://github.com/joaocerri/Portifolio-Joao/tree/main/sites/studio%20de%20tatuagem"
      },
      {
        title: "Cardápio de Restaurante",
        category: "Página Institucional",
        description: "Cardápio virtual animado, integrado com página de apresentação do restaurante, mais de 15 itens, aba de pesquisa e botões de filtragem.",
        image: "./assets/print_cantinho.png",
        techs: ["HTML5", "JavaScript", "CSS3"],
        demoLink: "./sites/cantinho-do-sabor/index.html",
        codeLink: "https://github.com/joaocerri/Portifolio-Joao/tree/main/sites/cantinho-do-sabor"
      },
      {
        title: "Finance Dashboard",
        category: "SPA – Single Page Application",
        description: "Plataforma para organização de finanças, responsiva e pratica de ser utilizada e gerenciada. O projeto contribui para o controle financeiro do usuário.",
        image: "./assets/print_financas.png",
        techs: ["HTML5", "JavaScript", "CSS3"],
        demoLink: "./sites/financial-dashboard/index.html",
        codeLink: "https://github.com/joaocerri/Portifolio-Joao/tree/main/sites/financial-dashboard"
      },
      {
        title: "Catalogo Proteses Capilar",
        category: "SPA – Single Page Application",
        description: "Plataforma institucional para empresa de prótese capilar, desenvolvida para apresentar serviços e facilitar o contato com clientesPlataforma institucional para empresa de prótese capilar, desenvolvida para apresentar serviços e facilitar o contato com clientes",
        image: "./assets/print_protese.png",
        techs: ["HTML5", "JavaScript", "CSS3"],
        demoLink: "./sites/catalogoProteses/index.html",
        codeLink: "https://github.com/joaocerri/Portifolio-Joao/tree/main/sites/catalogoProteses"
      }
    ]
  };

  function renderProjects() {
    Object.keys(projectData).forEach(type => {
      const track = document.getElementById(`carousel-${type}`);
      const dotsContainer = document.getElementById(`dots-${type}`);
      if (!track || !dotsContainer) return;

      track.innerHTML = '';
      dotsContainer.innerHTML = '';

      projectData[type].forEach((proj, index) => {
        // Slide
        const slide = document.createElement('div');
        slide.className = `projeto-slide animate-scale ${index === 0 ? 'active' : ''}`;
        
        const techsHTML = proj.techs.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
        const codeLinkHTML = proj.codeLink ? `<a href="${proj.codeLink}" target="_blank" class="btn btn-secondary">
                                            <i class="fab fa-github"></i> Código
                                        </a>` : '';

        slide.innerHTML = `
            <div class="projeto-item animate-scale">
                <div class="projeto-img">
                    <img src="${proj.image}" alt="${proj.title}" class="interactive">
                </div>
                <div class="projeto-info">
                    <span class="projeto-categoria">${proj.category}</span>
                    <h3>${proj.title}</h3>
                    <p>${proj.description}</p>
                    <div class="projeto-tech">
                        ${techsHTML}
                    </div>
                    <div class="projeto-links">
                        <a href="${proj.demoLink}" target="_blank" class="btn btn-primary">Ver Demo</a>
                        ${codeLinkHTML}
                    </div>
                </div>
            </div>
        `;
        track.appendChild(slide);

        // Dot
        const dot = document.createElement('span');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('data-slide', index);
        dotsContainer.appendChild(dot);
      });
    });
  }

  // Initialize portfolio features
  renderProjects()
  initCarousel()
  initPortfolioTabs()
})
