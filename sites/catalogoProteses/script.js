const produtos = [
    {
        id: 1,
        nome: "Micropele HD Invisible 0.03mm",
        descricao: "A base mais fina e indetectável do mercado. Imita perfeitamente o couro cabeludo, ideal para penteados para trás e topetes altos.",
        preco: "R$ 2.500,00",
        imagem: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800"
    },
    {
        id: 2,
        nome: "Lace Front Suíça",
        descricao: "Máxima ventilação e conforto. A malha Suíça é extremamente fina na frente, indicada para clientes ativos ou que vivem em regiões quentes.",
        preco: "R$ 2.200,00",
        imagem: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800"
    },
    {
        id: 3,
        nome: "Híbrida Sport Plus",
        descricao: "O equilíbrio perfeito entre durabilidade e estética. Laterais e traseira em micropele para fixação extra, com frente em Lace para naturalidade.",
        preco: "R$ 1.650,00",
        imagem: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800"
    },
    {
        id: 4,
        nome: "Micropele Resist 0.06mm",
        descricao: "Maior durabilidade sem perder a naturalidade. Excelente custo-benefício para quem busca uma peça que dure mais meses.",
        preco: "R$ 1.800,00",
        imagem: "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?q=80&w=800"
    },
    {
        id: 5,
        nome: "Full Lace Premium",
        descricao: "Totalmente respirável. Permite repartir o cabelo para qualquer lado com extrema naturalidade, como se o cabelo nascesse de todos os poros.",
        preco: "R$ 2.800,00",
        imagem: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800"
    },
    {
        id: 6,
        nome: "Híbrida Frontal HD",
        descricao: "Frente em Lace HD para naturalidade absoluta na linha de frente e topo/traseira em micropele injetada para alta durabilidade.",
        preco: "R$ 1.950,00",
        imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800"
    },
    {
        id: 7,
        nome: "Lace Francesa",
        descricao: "Malha sutilmente mais resistente que a Suíça. Ideal para quem busca uma prótese altamente durável e 100% respirável.",
        preco: "R$ 2.100,00",
        imagem: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=800"
    },
    {
        id: 8,
        nome: "Micropele Injetada Silicone",
        descricao: "Os fios são injetados um a um na base de silicone, sem nós, criando o efeito exato de cabelo crescendo diretamente do couro cabeludo.",
        preco: "R$ 2.900,00",
        imagem: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800"
    },
    {
        id: 9,
        nome: "Prótese Cabelo Ondulado",
        descricao: "Design híbrido com densidade de 120%, trazendo fios com ondas soltas para um visual moderno, despojado e cheio de atitude.",
        preco: "R$ 2.150,00",
        imagem: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800"
    },
    {
        id: 10,
        nome: "Híbrida Elite Grisalha 30%",
        descricao: "Especial para homens maduros. Contém 30% de fios brancos mesclados naturalmente, trazendo um visual distinto e respeitável.",
        preco: "R$ 2.450,00",
        imagem: "https://images.unsplash.com/photo-1552642986-ccb41e7059e7?q=80&w=800"
    },
    {
        id: 11,
        nome: "Prótese Parcial (Coroa)",
        descricao: "Peça menor, específica para preenchimento de áreas isoladas como a coroa da cabeça. Base mista de lace e micropele.",
        preco: "R$ 1.200,00",
        imagem: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=800"
    },
    {
        id: 12,
        nome: "Micropele Super Resist 0.12mm",
        descricao: "A base mais robusta. Ideal para quem pratica esportes de alto impacto ou busca a maior vida útil possível na prótese capilar.",
        preco: "R$ 1.500,00",
        imagem: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800"
    },
    {
        id: 13,
        nome: "Lace HD Cinematográfica",
        descricao: "Usada na indústria do cinema. A malha desaparece completamente na pele. Sensível, mas oferece o resultado visual mais espetacular.",
        preco: "R$ 3.200,00",
        imagem: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=800"
    },
    {
        id: 14,
        nome: "Prótese Cabelo Cacheado Natural",
        descricao: "Prótese em micropele 0.08mm com fios naturalmente cacheados. Mantém a forma e volume ideais para quem busca um estilo afro ou cacheado.",
        preco: "R$ 2.300,00",
        imagem: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=800"
    },
    {
        id: 15,
        nome: "Elite Densidade 130%",
        descricao: "Para quem quer aquele volume marcante de volta. Fios densos, ideais para cortes repicados e volumosos estilo pompadour.",
        preco: "R$ 2.600,00",
        imagem: "https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?q=80&w=800"
    }
];

// Seletores de Elementos
const grid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-name');
const minPriceInput = document.getElementById('price-min');
const maxPriceInput = document.getElementById('price-max');
const modal = document.getElementById('product-modal');

/**
 * Utilitário: Converte Preço Formatado (String) para Número (Float)
 */
const parseCurrencyToFloat = (str) => {
    return parseFloat(str.replace(/[R$\s.]/g, '').replace(',', '.'));
};

/**
 * Função de Renderização
 */
function renderCatalog(lista) {
    if (lista.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px; opacity: 0.6; color: var(--text-muted);">
                <p>Nenhum produto encontrado para estes filtros.</p>
            </div>`;
        return;
    }

    grid.innerHTML = lista.map((p, index) => `
        <article class="product-card" style="animation-delay: ${index * 0.05}s" onclick="openModal(${p.id})">
            <div class="product-img-wrapper">
                <img src="${p.imagem}" alt="${p.nome}" class="product-img" loading="lazy">
                <div class="product-info">
                    <h3>${p.nome}</h3>
                    <span class="price-tag">${p.preco}</span>
                </div>
            </div>
        </article>
    `).join('');
}

/**
 * Lógica Central de Filtros (Nome + Preço Mínimo + Preço Máximo)
 */
function applyFilters() {
    const term = searchInput.value.toLowerCase();
    const min = parseFloat(minPriceInput.value) || 0;
    const max = parseFloat(maxPriceInput.value) || Infinity;

    const filtrados = produtos.filter(p => {
        const precoNum = parseCurrencyToFloat(p.preco);
        const matchesName = p.nome.toLowerCase().includes(term);
        const matchesPrice = precoNum >= min && precoNum <= max;
        
        return matchesName && matchesPrice;
    });

    renderCatalog(filtrados);
}

/**
 * Gerenciamento do Modal
 */
function openModal(id) {
    const p = produtos.find(item => item.id === id);
    if (!p) return;

    document.getElementById('modal-img').src = p.imagem;
    document.getElementById('modal-title').innerText = p.nome;
    document.getElementById('modal-description').innerText = p.descricao;
    document.getElementById('modal-price').innerText = p.preco;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Bloqueia scroll do fundo
}

document.getElementById('close-modal').onclick = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

// Fecha modal ao clicar fora dele
window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

/**
 * Inicialização e Listeners
 */
searchInput.addEventListener('input', applyFilters);
minPriceInput.addEventListener('input', applyFilters);
maxPriceInput.addEventListener('input', applyFilters);

// Render inicial
document.addEventListener('DOMContentLoaded', () => renderCatalog(produtos));

/**
 * Lógica de Tema Escuro / Claro
 */
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIconDark = document.getElementById('theme-icon-dark');
const themeIconLight = document.getElementById('theme-icon-light');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    if (theme === 'light') {
        themeIconLight.style.display = 'none';
        themeIconDark.style.display = 'block';
    } else {
        themeIconLight.style.display = 'block';
        themeIconDark.style.display = 'none';
    }
}

// Check for saved theme or system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

if (savedTheme) {
    setTheme(savedTheme);
} else if (systemPrefersLight) {
    setTheme('light');
} else {
    setTheme('dark');
}

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
});