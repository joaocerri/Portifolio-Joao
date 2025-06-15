// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to top button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Newsletter popup
const newsletterPopup = document.getElementById('newsletterPopup');
const popupClose = document.getElementById('popupClose');

// Show popup after 3 seconds
setTimeout(() => {
    if (!localStorage.getItem('newsletterShown')) {
        newsletterPopup.classList.add('show');
    }
}, 3000);

// Close popup
popupClose.addEventListener('click', () => {
    newsletterPopup.classList.remove('show');
    localStorage.setItem('newsletterShown', 'true');
});

// Close popup when clicking outside
newsletterPopup.addEventListener('click', (e) => {
    if (e.target === newsletterPopup) {
        newsletterPopup.classList.remove('show');
        localStorage.setItem('newsletterShown', 'true');
    }
});

// Newsletter form submission
document.getElementById('newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('🎉 Parabéns! Você ganhou 10% de desconto! Verifique seu e-mail.');
    newsletterPopup.classList.remove('show');
    localStorage.setItem('newsletterShown', 'true');
});

// Countdown timer
function updateCountdown() {
    const now = new Date().getTime();
    const endTime = now + (2 * 60 * 60 * 1000) + (15 * 60 * 1000) + (30 * 1000); // 2h 15m 30s from now
    
    setInterval(() => {
        const currentTime = new Date().getTime();
        const timeLeft = endTime - currentTime;
        
        if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }, 1000);
}

updateCountdown();

// Contact form validation
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });
    
    // Validate name
    if (name.length < 2) {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    
    // Validate message
    if (message.length < 10) {
        document.getElementById('messageError').textContent = 'A mensagem deve ter pelo menos 10 caracteres.';
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        alert('✅ Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
    }
});

// Product purchase buttons - WhatsApp redirect
document.querySelectorAll('.product-card .btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        // Número de telefone - substitua pelo número correto
        const phoneNumber = "5511999999999";
        
        // Mensagem personalizada
        const message = `Olá! Gostaria de comprar o produto: ${productName} - ${productPrice}`;
        
        // Criar link do WhatsApp
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Redirecionar para o WhatsApp
        window.open(whatsappLink, '_blank');
    });
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Efeito de transparência quando rola
    if (currentScroll > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--white)';
        header.style.backdropFilter = 'none';
    }
    
    // Animação de esconder/mostrar header
    if (currentScroll > lastScrollTop && currentScroll > 200) {
        // Rolando para baixo - esconder header
        header.classList.add('hidden');
    } else {
        // Rolando para cima - mostrar header
        header.classList.remove('hidden');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}); 