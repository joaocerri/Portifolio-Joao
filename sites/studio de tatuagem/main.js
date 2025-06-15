// ===== DADOS DO PORTFÓLIO =====
const portfolioData = [
  {
    id: 1,
    title: "Retrato Realista",
    category: "realismo",
    image: "images/portfolio/realismo1.png",
    artist: "Alex Silva",
  },
  {
    id: 2,
    title: "Leão Realista",
    category: "realismo",
    image: "images/portfolio/realismo2.png",
    artist: "Alex Silva",
  },
  {
    id: 3,
    title: "Retrato Família",
    category: "realismo",
    image: "images/portfolio/realismo3.png",
    artist: "Alex Silva",
  },
  {
    id: 4,
    title: "Âncora Tradicional",
    category: "oldschool",
    image: "images/portfolio/oldschool1.png",
    artist: "Mariana Costa",
  },
  {
    id: 5,
    title: "Rosa Old School",
    category: "oldschool",
    image: "images/portfolio/oldschool2.png",
    artist: "Mariana Costa",
  },
  {
    id: 6,
    title: "Águia Tradicional",
    category: "oldschool",
    image: "images/portfolio/oldschool3.png",
    artist: "Mariana Costa",
  },
  {
    id: 7,
    title: "Linha Fina Geométrica",
    category: "minimalista",
    image: "images/portfolio/minimalista1.png",
    artist: "Lucas Mendes",
  },
  {
    id: 8,
    title: "Constelação",
    category: "minimalista",
    image: "images/portfolio/minimalista2.png",
    artist: "Lucas Mendes",
  },
  {
    id: 9,
    title: "Minimalista Botânica",
    category: "minimalista",
    image: "images/portfolio/minimalista3.png",
    artist: "Lucas Mendes",
  },
]

// ===== DADOS DOS ARTISTAS =====
const artistsData = {
  alex: {
    name: "Alex Silva",
    specialty: "Realismo",
    image: "images/artist1.png",
    bio: "Alex Silva é especialista em tatuagens realistas, com mais de 10 anos de experiência. Formado em Belas Artes, ele traz um olhar único para seus trabalhos, especializando-se em retratos e animais hiper-realistas. Já participou de diversas convenções internacionais e possui prêmios na categoria de realismo.",
    instagram: "@alexsilvatattoo",
    portfolio: ["images/portfolio/realismo1.png", "images/portfolio/realismo2.png", "images/portfolio/realismo3.png"],
  },
  mariana: {
    name: "Mariana Costa",
    specialty: "Old School",
    image: "images/artist2.png",
    bio: "Mariana Costa é apaixonada pelo estilo tradicional americano (Old School). Com 8 anos de carreira, ela se destaca por suas linhas precisas e cores vibrantes. Seu estilo único mistura elementos clássicos com toques contemporâneos, criando tatuagens atemporais que contam histórias através da pele.",
    instagram: "@maricostatattoo",
    portfolio: [
      "images/portfolio/oldschool1.png",
      "images/portfolio/oldschool2.png",
      "images/portfolio/oldschool3.png",
    ],
  },
  lucas: {
    name: "Lucas Mendes",
    specialty: "Minimalista",
    image: "images/artist3.png",
    bio: "Lucas Mendes é especialista em tatuagens minimalistas e de linhas finas. Com formação em design gráfico, ele traz uma abordagem contemporânea e clean para seus trabalhos. Suas criações são conhecidas pela elegância, precisão e delicadeza, perfeitas para quem busca uma tatuagem discreta e sofisticada.",
    instagram: "@lucasminimaltattoo",
    portfolio: [
      "images/portfolio/minimalista1.png",
      "images/portfolio/minimalista2.png",
      "images/portfolio/minimalista3.png",
    ],
  },
}

// ===== FUNÇÕES DE INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  // Inicializa todas as funcionalidades
  initHeader()
  initPortfolio()
  initArtistModals()
  initPortfolioModals()
  initBackToTop()
  initFormSubmission()
  initMobileMenu()
})

// ===== HEADER FIXO COM EFEITO DE SCROLL =====
function initHeader() {
  const header = document.getElementById("header")
  const menuLinks = document.querySelectorAll("nav .menu li a")

  // Adiciona classe ao header quando rolar a página
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    // Atualiza o link ativo no menu
    let current = ""

    document.querySelectorAll("section").forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute("id")
      }
    })

    menuLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })
}

// ===== PORTFÓLIO COM FILTRO =====
function initPortfolio() {
  const portfolioGrid = document.querySelector(".portfolio-grid")
  const filterButtons = document.querySelectorAll(".filter-btn")

  // Carrega todos os itens do portfólio
  loadPortfolioItems("all")

  // Adiciona evento de clique aos botões de filtro
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove a classe 'active' de todos os botões
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Adiciona a classe 'active' ao botão clicado
      this.classList.add("active")

      // Filtra os itens do portfólio
      const filter = this.getAttribute("data-filter")
      loadPortfolioItems(filter)
    })
  })

  // Função para carregar os itens do portfólio com base no filtro
  function loadPortfolioItems(filter) {
    // Limpa o grid
    portfolioGrid.innerHTML = ""

    // Filtra os itens
    const filteredItems = filter === "all" ? portfolioData : portfolioData.filter((item) => item.category === filter)

    // Adiciona os itens filtrados ao grid
    filteredItems.forEach((item) => {
      const portfolioItem = document.createElement("div")
      portfolioItem.className = "portfolio-item"
      portfolioItem.setAttribute("data-id", item.id)

      portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="overlay">
                    <h3>${item.title}</h3>
                    <p>Artista: ${item.artist}</p>
                </div>
            `

      portfolioGrid.appendChild(portfolioItem)
    })

    // Reinicializa os modais do portfólio
    initPortfolioModals()
  }
}

// ===== MODAIS DOS ARTISTAS =====
function initArtistModals() {
  const artistModal = document.getElementById("artist-modal")
  const modalBody = artistModal.querySelector(".modal-body")
  const closeModal = artistModal.querySelector(".close-modal")
  const artistButtons = document.querySelectorAll(".artist-modal-btn")

  // Adiciona evento de clique aos botões dos artistas
  artistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const artistId = this.getAttribute("data-artist")
      const artist = artistsData[artistId]

      // Preenche o conteúdo do modal
      modalBody.innerHTML = `
                <div class="artist-modal-content">
                    <div class="artist-modal-header">
                        <img src="${artist.image}" alt="${artist.name}">
                        <div class="artist-modal-info">
                            <h2>${artist.name}</h2>
                            <p class="specialty">Especialidade: ${artist.specialty}</p>
                            <p class="instagram"><i class="fab fa-instagram"></i> ${artist.instagram}</p>
                        </div>
                    </div>
                    <div class="artist-modal-bio">
                        <h3>Biografia</h3>
                        <p>${artist.bio}</p>
                    </div>
                    <div class="artist-modal-portfolio">
                        <h3>Trabalhos</h3>
                        <div class="artist-portfolio-grid">
                            ${artist.portfolio
                              .map(
                                (img) => `
                                <div class="artist-portfolio-item">
                                    <img src="${img}" alt="Trabalho de ${artist.name}">
                                </div>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>
                </div>
            `

      // Exibe o modal
      artistModal.style.display = "block"
      document.body.style.overflow = "hidden"
    })
  })

  // Fecha o modal ao clicar no botão de fechar
  closeModal.addEventListener("click", () => {
    artistModal.style.display = "none"
    document.body.style.overflow = "auto"
  })

  // Fecha o modal ao clicar fora do conteúdo
  window.addEventListener("click", (event) => {
    if (event.target === artistModal) {
      artistModal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })
}

// ===== MODAIS DO PORTFÓLIO =====
function initPortfolioModals() {
  const portfolioModal = document.getElementById("portfolio-modal")
  const modalImage = document.getElementById("modal-image")
  const closeModal = portfolioModal.querySelector(".close-modal")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  // Adiciona evento de clique aos itens do portfólio
  portfolioItems.forEach((item) => {
    item.addEventListener("click", function () {
      const itemId = this.getAttribute("data-id")
      const portfolioItem = portfolioData.find((item) => item.id == itemId)

      // Define a imagem do modal
      modalImage.src = portfolioItem.image
      modalImage.alt = portfolioItem.title

      // Exibe o modal
      portfolioModal.style.display = "block"
      document.body.style.overflow = "hidden"
    })
  })

  // Fecha o modal ao clicar no botão de fechar
  closeModal.addEventListener("click", () => {
    portfolioModal.style.display = "none"
    document.body.style.overflow = "auto"
  })

  // Fecha o modal ao clicar fora do conteúdo
  window.addEventListener("click", (event) => {
    if (event.target === portfolioModal) {
      portfolioModal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })
}

// ===== BOTÃO VOLTAR AO TOPO =====
function initBackToTop() {
  const backToTopButton = document.getElementById("back-to-top")

  // Exibe ou oculta o botão com base na posição de rolagem
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("visible")
    } else {
      backToTopButton.classList.remove("visible")
    }
  })

  // Rola para o topo ao clicar no botão
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// ===== ENVIO DO FORMULÁRIO =====
function initFormSubmission() {
  const quoteForm = document.getElementById("quote-form")

  if (quoteForm) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault()

      // Aqui você adicionaria o código para enviar o formulário para um servidor
      // Por enquanto, apenas simularemos o envio

      alert("Obrigado! Seu pedido de orçamento foi enviado com sucesso. Entraremos em contato em breve.")
      quoteForm.reset()
    })
  }
}

// ===== MENU MOBILE =====
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger")
  const menu = document.querySelector(".menu")
  const menuLinks = document.querySelectorAll(".menu li a")

  // Abre/fecha o menu mobile ao clicar no hamburger
  hamburger.addEventListener("click", function () {
    this.classList.toggle("active")
    menu.classList.toggle("active")

    // Alterna o overflow do body para evitar rolagem quando o menu está aberto
    if (menu.classList.contains("active")) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  })

  // Fecha o menu ao clicar em um link
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      menu.classList.remove("active")
      document.body.style.overflow = "auto"
    })
  })
}
