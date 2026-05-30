/**
 * catalogo.js — Lógica do Catálogo de Produtos
 * Elite Capilar | Consome dados do IndexedDB via banco.js
 */

// ─── Seletores ─────────────────────────────────────────────────────────────────
const grid          = document.getElementById('product-grid');
const searchInput   = document.getElementById('search-name');
const minPriceInput = document.getElementById('price-min');
const maxPriceInput = document.getElementById('price-max');
const modal         = document.getElementById('product-modal');

// Toggle View
const btnViewGrid   = document.getElementById('btn-view-grid');
const btnViewList   = document.getElementById('btn-view-list');

let viewMode = 'grid'; // 'grid' | 'list'

/** Formata número para moeda BRL */
const formatCurrency = (valor) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// ─── Renderização ──────────────────────────────────────────────────────────────

function renderCatalog(lista) {
    // Atualiza a classe do container com base no viewMode
    grid.className = viewMode === 'grid' ? 'product-grid' : 'product-list';

    if (lista.length === 0) {
        grid.innerHTML = `
            <div style="text-align: center; padding: 60px; opacity: 0.6; color: var(--text-muted); width: 100%;">
                <p>Nenhum produto encontrado para estes filtros.</p>
            </div>`;
        return;
    }

    grid.innerHTML = lista.map((p, index) => `
        <article class="product-card" style="animation-delay: ${index * 0.05}s" onclick="openModal(${p.id})">
            <div class="product-img-wrapper">
                <img src="${p.imagem || 'https://via.placeholder.com/800x600?text=Sem+Imagem'}"
                     alt="${p.nome}" class="product-img" loading="lazy"
                     onerror="this.src='https://via.placeholder.com/800x600?text=Sem+Imagem'">
            </div>
            <div class="product-info">
                <h3>${p.nome}</h3>
                ${viewMode === 'list' && p.descricao ? `<p style="color:var(--text-muted); font-size: 0.9rem; margin-bottom: 15px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${p.descricao}</p>` : ''}
                <span class="price-tag">${formatCurrency(p.preco)}</span>
            </div>
        </article>
    `).join('');
}

// ─── Filtros ───────────────────────────────────────────────────────────────────

function applyFilters() {
    const termo    = searchInput.value.trim();
    const precoMin = parseFloat(minPriceInput.value) || 0;
    const precoMax = parseFloat(maxPriceInput.value) || Infinity;

    BancoDB.search({ termo, precoMin, precoMax }).then(renderCatalog);
}

// ─── View Toggle ───────────────────────────────────────────────────────────────

function setViewMode(mode) {
    viewMode = mode;
    if (mode === 'grid') {
        btnViewGrid.setAttribute('aria-pressed', 'true');
        btnViewList.setAttribute('aria-pressed', 'false');
    } else {
        btnViewGrid.setAttribute('aria-pressed', 'false');
        btnViewList.setAttribute('aria-pressed', 'true');
    }
    applyFilters();
}

btnViewGrid.addEventListener('click', () => setViewMode('grid'));
btnViewList.addEventListener('click', () => setViewMode('list'));

// ─── Modal ─────────────────────────────────────────────────────────────────────

function openModal(id) {
    BancoDB.getById(id).then(p => {
        if (!p) return;

        document.getElementById('modal-img').src           = p.imagem || '';
        document.getElementById('modal-title').innerText   = p.nome;
        document.getElementById('modal-description').innerText = p.descricao;
        document.getElementById('modal-price').innerText   = formatCurrency(p.preco);

        modal.style.display    = 'flex';
        document.body.style.overflow = 'hidden';
    });
}

document.getElementById('close-modal').onclick = () => {
    modal.style.display          = 'none';
    document.body.style.overflow = 'auto';
};

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display          = 'none';
        document.body.style.overflow = 'auto';
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display          = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ─── Tema dark / light ─────────────────────────────────────────────────────────

const themeToggleBtn  = document.getElementById('theme-toggle');
const themeIconDark   = document.getElementById('theme-icon-dark');
const themeIconLight  = document.getElementById('theme-icon-light');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'light') {
        themeIconLight.style.display = 'none';
        themeIconDark.style.display  = 'block';
    } else {
        themeIconLight.style.display = 'block';
        themeIconDark.style.display  = 'none';
    }
}

const savedTheme        = localStorage.getItem('theme');
const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

if (savedTheme)            setTheme(savedTheme);
else if (systemPrefersLight) setTheme('light');
else                         setTheme('dark');

themeToggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(current === 'light' ? 'dark' : 'light');
});

// ─── Inicialização ─────────────────────────────────────────────────────────────

searchInput.addEventListener('input',   applyFilters);
minPriceInput.addEventListener('input', applyFilters);
maxPriceInput.addEventListener('input', applyFilters);

document.addEventListener('DOMContentLoaded', () => {
    BancoDB.init()
        .then(() => applyFilters())
        .catch(err => {
            console.error('Erro ao carregar catálogo:', err);
            grid.innerHTML = `
                <div style="text-align: center; padding: 60px; color: #e74c3c; width: 100%;">
                    <p>Erro ao carregar produtos. Por favor, recarregue a página.</p>
                </div>`;
        });
});
