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
let renderToken = 0;
let modalCloseTimer = null;

const CATALOG_FADE_MS = 180;
const MODAL_FADE_MS = 220;

const shouldReduceMotion = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Formata número para moeda BRL */
const formatCurrency = (valor) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// ─── Renderização ──────────────────────────────────────────────────────────────

function getCatalogClass() {
    return viewMode === 'grid' ? 'product-grid' : 'product-list';
}

function paintCatalog(lista) {
    grid.className = getCatalogClass();

    if (lista.length === 0) {
        grid.innerHTML = `
            <div class="catalog-message">
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

function renderCatalog(lista) {
    const token = ++renderToken;
    const animateOut = grid.childElementCount > 0 && !shouldReduceMotion();

    if (animateOut) {
        grid.classList.remove('catalog-fade-in');
        grid.classList.add('catalog-fade-out');
    }

    window.setTimeout(() => {
        if (token !== renderToken) return;

        paintCatalog(lista);
        grid.classList.add('catalog-fade-in');
    }, animateOut ? CATALOG_FADE_MS : 0);
}

function renderLoadError() {
    renderToken++;
    grid.className = getCatalogClass();
    grid.innerHTML = `
        <div class="catalog-message error">
            <p>Erro ao carregar produtos. Por favor, recarregue a página.</p>
        </div>`;
    grid.classList.add('catalog-fade-in');
}

// ─── Filtros ───────────────────────────────────────────────────────────────────

function applyFilters() {
    const termo    = searchInput.value.trim();
    const precoMin = parseFloat(minPriceInput.value) || 0;
    const precoMax = parseFloat(maxPriceInput.value) || Infinity;

    return BancoDB.search({ termo, precoMin, precoMax })
        .then(renderCatalog)
        .catch(err => {
            console.error('Erro ao buscar produtos:', err);
            renderLoadError();
        });
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

        openProductModal();
    });
}

function openProductModal() {
    if (modalCloseTimer) {
        window.clearTimeout(modalCloseTimer);
        modalCloseTimer = null;
    }

    modal.classList.remove('is-closing');
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');

    window.requestAnimationFrame(() => {
        modal.classList.add('is-open');
    });

    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    if (!modal.classList.contains('is-open')) return;

    modal.classList.remove('is-open');
    modal.classList.add('is-closing');
    document.body.style.overflow = 'auto';

    modalCloseTimer = window.setTimeout(() => {
        modal.classList.remove('is-closing');
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        modalCloseTimer = null;
    }, shouldReduceMotion() ? 0 : MODAL_FADE_MS);
}

document.getElementById('close-modal').onclick = closeProductModal;

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeProductModal();
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeProductModal();
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
            renderLoadError();
        });
});
