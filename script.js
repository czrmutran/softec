// Adiciona uma classe "scrolled" ao cabeçalho quando o usuário rolar a página
window.addEventListener("scroll", function() {
    const header = document.querySelector(".header");
    header.classList.toggle("scrolled", window.scrollY > 50);
});

document.addEventListener('DOMContentLoaded', () => {
    // Função para animar os números
    function animateNumber(element, targetNumber, duration) {
        const start = 0;
        const increment = targetNumber / (duration / 50); // Divide o valor final pelo número de frames
        let currentNumber = start;

        const interval = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                clearInterval(interval);
                currentNumber = targetNumber;
            }
            element.textContent = Math.round(currentNumber).toLocaleString(); // Formata com separadores de milhar
        }, 50); // Atualiza o número a cada 50ms
    }

    // Selecione os elementos corretos
    const projElement = document.querySelector('#proj-concluidos');
    const clientsElement = document.querySelector('#clientes-atendidos');
    const yearsElement = document.querySelector('#anos-experiencia');

    // Defina os valores finais para cada número
    const projFinal = 3240;
    const clientsFinal = 6847;
    const yearsFinal = 20;

    // Função para iniciar a animação quando os elementos estiverem visíveis
    function startAnimation(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === projElement) {
                    animateNumber(projElement, projFinal, 2000); // 2 segundos de animação para projetos
                } else if (entry.target === clientsElement) {
                    animateNumber(clientsElement, clientsFinal, 2000); // 2 segundos de animação para clientes
                } else if (entry.target === yearsElement) {
                    animateNumber(yearsElement, yearsFinal, 2000); // 2 segundos de animação para anos de experiência
                }
                // Desconecta o observer após animar o número
                observer.unobserve(entry.target);
            }
        });
    }

    // Cria um IntersectionObserver
    const observer = new IntersectionObserver(startAnimation, {
        threshold: 0.5 // A animação começará quando 50% do elemento estiver visível
    });

    // Observe os elementos que devem ser animados
    observer.observe(projElement);
    observer.observe(clientsElement);
    observer.observe(yearsElement);
});
