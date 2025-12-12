        /**
         * Toggles the visibility of an element by its id.
         * If the display is 'none' or empty, it sets it to 'block'. Otherwise, it sets it to 'none'.
         * @param {string} id - element id
         */
        function toggleConteudo(id) {
            const elemento = document.getElementById(id);

            // Checks if the element exists
            if (!elemento) {
                console.error(`Element with ID "${id}" not found.`);
                return;
            }

            // Toggles the display property
            if (elemento.style.display === 'none' || elemento.style.display === '') {
                // Sets to 'block' to display
                elemento.style.display = 'block';
            } else {
                // Sets to 'none' to hide
                elemento.style.display = 'none';
            }
        }
        // Armazena a última posição do mouse para otimização
        let lastX = 0;
        let lastY = 0;
        const trailContainer = document.getElementById('star-trail-container');

        // Cria e adiciona um novo elemento de estrela ao rastro
        function createStarTrail(x, y) {
            const star = document.createElement('div');
            star.classList.add('star-trail');

            // Define a posição inicial
            star.style.left = `${x}px`;
            star.style.top = `${y}px`;

            trailContainer.appendChild(star);

            // Força o navegador a reconhecer o elemento antes de aplicar a transição
            requestAnimationFrame(() => {
                // Torna o elemento visível
                star.style.opacity = '1.5';

                // Inicia o processo de desaparecimento/encolhimento após um curto período
                setTimeout(() => {
                    star.style.opacity = '0';
                    star.style.width = '2px';
                    star.style.height = '2px';
                    star.style.boxShadow = 'none'; // Remove o brilho

                    // Remove o elemento do DOM após a transição terminar (0.5s)
                    setTimeout(() => {
                        star.remove();
                    }, 500);
                }, 50); // Tempo curto para visibilidade antes de começar a desaparecer
            });
        }

        // Listener para o movimento do mouse
        document.addEventListener('mousemove', (e) => {
            // Reduz a frequência para evitar sobrecarga (cria uma estrela a cada 5px de movimento)
            if (Math.abs(e.clientX - lastX) > 5 || Math.abs(e.clientY - lastY) > 5) {
                createStarTrail(e.clientX, e.clientY);
                lastX = e.clientX;
                lastY = e.clientY;
            }
        });

        // Opcional: Adiciona uma estrela menor e mais rápida periodicamente para dar um efeito mais "denso"
        setInterval(() => {
            if (lastX && lastY) {
                createStarTrail(lastX, lastY);
            }
        }, 100);