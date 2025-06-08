// ===== CONTADOR REGRESSIVO =====
        function updateCountdown() {
            const eventDate = new Date('2024-06-15T16:00:00').getTime();
            const now = new Date().getTime();
            const timeLeft = eventDate - now;

            if (timeLeft > 0) {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                document.getElementById('days').textContent = days.toString().padStart(2, '0');
                document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
                document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
                document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            } else {
                document.getElementById('countdown').innerHTML = '<h3>O grande dia chegou! 🎉</h3>';
            }
        }

        // Atualizar contador a cada segundo
        setInterval(updateCountdown, 1000);
        updateCountdown(); // Executar imediatamente

        // ===== VALIDAÇÃO DO FORMULÁRIO =====
        document.getElementById('rsvpForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Limpar mensagens de erro anteriores
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.style.display = 'none');
            
            let isValid = true;
            
            // Validar nome
            const name = document.getElementById('name').value.trim();
            if (name.length < 2) {
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            }
            
            // Validar e-mail
            const email = document.getElementById('email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            }
            
            // Validar número de convidados
            const guests = document.getElementById('guests').value;
            if (!guests) {
                document.getElementById('guestsError').style.display = 'block';
                isValid = false;
            }
            
            // Se tudo estiver válido, mostrar mensagem de sucesso
            if (isValid) {
                document.getElementById('successMessage').style.display = 'block';
                this.reset(); // Limpar formulário
                
                // Simular envio (em um caso real, aqui seria feita a requisição para o servidor)
                console.log('Confirmação enviada:', { name, email, guests });
                
                // Scroll suave para a mensagem de sucesso
                document.getElementById('successMessage').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        });

        // ===== ANIMAÇÕES DE SCROLL =====
        function animateOnScroll() {
            const sections = document.querySelectorAll('.section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const windowHeight = window.innerHeight;
                const scrollTop = window.pageYOffset;
                
                if (scrollTop > (sectionTop - windowHeight + sectionHeight/3)) {
                    section.style.animationDelay = '0s';
                    section.style.animationPlayState = 'running';
                }
            });
        }

        // Executar animação no scroll
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);

        // ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
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