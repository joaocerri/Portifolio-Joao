// Mobile menu toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Testimonials carousel
let currentTestimonialIndex = 0
const testimonials = document.querySelectorAll(".testimonial-card")
const dots = document.querySelectorAll(".dot")

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.toggle("active", i === index)
  })

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index)
  })
}

function changeTestimonial(direction) {
  currentTestimonialIndex += direction

  if (currentTestimonialIndex >= testimonials.length) {
    currentTestimonialIndex = 0
  } else if (currentTestimonialIndex < 0) {
    currentTestimonialIndex = testimonials.length - 1
  }

  showTestimonial(currentTestimonialIndex)
}

function currentTestimonial(index) {
  currentTestimonialIndex = index - 1
  showTestimonial(currentTestimonialIndex)
}

// Auto-rotate testimonials
setInterval(() => {
  changeTestimonial(1)
}, 5000)

// Smooth scrolling function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const data = Object.fromEntries(formData)

  // Simulate form submission
  const submitButton = this.querySelector(".submit-button")
  const originalText = submitButton.innerHTML

  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...'
  submitButton.disabled = true

  setTimeout(() => {
    alert("Obrigado! Sua consulta foi agendada. Entraremos em contato em breve!")
    this.reset()
    submitButton.innerHTML = originalText
    submitButton.disabled = false
  }, 2000)
})

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Add fade-in class to elements and observe them
document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(
    ".benefit-card, .plan-card, .testimonial-card, .contact-info, .contact-form",
  )

  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
})

// Header hide/show on scroll with improved logic
let lastScrollTop = 0
const scrollThreshold = 100
let isScrollingDown = false

window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop

  // Change header background based on scroll position
  if (currentScroll > 100) {
    header.style.background = "rgba(0, 0, 0, 0.98)"
  } else {
    header.style.background = "rgba(0, 0, 0, 0.95)"
  }

  // Hide/show header based on scroll direction
  if (currentScroll > scrollThreshold) {
    if (currentScroll > lastScrollTop && !isScrollingDown) {
      // Scrolling down - hide header
      header.classList.add("hidden")
      isScrollingDown = true
    } else if (currentScroll < lastScrollTop && isScrollingDown) {
      // Scrolling up - show header
      header.classList.remove("hidden")
      isScrollingDown = false
    }
  } else {
    // Always show header when near top
    header.classList.remove("hidden")
    isScrollingDown = false
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll
})

// Show header when hovering near top of screen
document.addEventListener("mousemove", (e) => {
  const header = document.querySelector(".header")

  if (e.clientY <= 80 && window.pageYOffset > scrollThreshold) {
    header.classList.remove("hidden")
  }
})

// Ensure header is visible when page loads
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header")
  header.classList.remove("hidden")
})

// Phone number formatting
document.getElementById("telefone").addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "")

  if (value.length >= 11) {
    value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  } else if (value.length >= 7) {
    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
  } else if (value.length >= 3) {
    value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2")
  }

  e.target.value = value
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const heroContent = document.querySelector(".hero-content")

  if (hero && heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})
