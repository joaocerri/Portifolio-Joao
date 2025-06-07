// Elementos DOM
const header = document.getElementById("header")
const menuToggle = document.querySelector(".menu-toggle")
const menu = document.querySelector(".menu")
const navLinks = document.querySelectorAll(".nav-link")
const backToTop = document.querySelector(".back-to-top")
const fadeElements = document.querySelectorAll(".fade-in")
const contactForm = document.getElementById("formulario-contato")
const successModal = document.getElementById("success-modal")
const closeModal = document.querySelector(".close-modal")

// Menu Mobile Toggle
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active")
  menuToggle.classList.toggle("active")
})

// Fechar menu ao clicar em um link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active")
    menuToggle.classList.remove("active")
  })
})

// Scroll Events
window.addEventListener("scroll", () => {
  // Header scroll effect
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  // Back to top button
  if (window.scrollY > 300) {
    backToTop.classList.add("active")
  } else {
    backToTop.classList.remove("active")
  }

  // Fade in elements on scroll
  fadeElements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (elementPosition < windowHeight - 100) {
      element.classList.add("active")
    }
  })
})

// Ativar elementos visíveis no carregamento inicial
document.addEventListener("DOMContentLoaded", () => {
  fadeElements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (elementPosition < windowHeight - 100) {
      element.classList.add("active")
    }
  })
})

// Validação do formulário
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Resetar mensagens de erro
  const errorMessages = document.querySelectorAll(".error-message")
  errorMessages.forEach((message) => {
    message.textContent = ""
  })

  // Validar campos
  let isValid = true

  // Nome
  const nome = document.getElementById("nome")
  if (nome.value.trim() === "") {
    showError(nome, "Por favor, informe seu nome")
    isValid = false
  }

  // Email
  const email = document.getElementById("email")
  if (email.value.trim() === "") {
    showError(email, "Por favor, informe seu e-mail")
    isValid = false
  } else if (!isValidEmail(email.value)) {
    showError(email, "Por favor, informe um e-mail válido")
    isValid = false
  }

  // Assunto
  const assunto = document.getElementById("assunto")
  if (assunto.value.trim() === "") {
    showError(assunto, "Por favor, informe o assunto")
    isValid = false
  }

  // Mensagem
  const mensagem = document.getElementById("mensagem")
  if (mensagem.value.trim() === "") {
    showError(mensagem, "Por favor, escreva sua mensagem")
    isValid = false
  }

  // Se tudo estiver válido, mostrar modal de sucesso
  if (isValid) {
    contactForm.reset()
    successModal.classList.add("active")
  }
})

// Fechar modal
closeModal.addEventListener("click", () => {
  successModal.classList.remove("active")
})

// Fechar modal ao clicar fora dele
window.addEventListener("click", (e) => {
  if (e.target === successModal) {
    successModal.classList.remove("active")
  }
})

// Funções auxiliares
function showError(input, message) {
  const errorElement = input.nextElementSibling
  errorElement.textContent = message
}

function isValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
