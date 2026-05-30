/**
 * admin.js — Lógica do Painel Administrativo
 * Elite Capilar | CRUD completo via IndexedDB (Sem Categorias)
 */

// ─── Estado global ─────────────────────────────────────────────────────────────
let state = {
    produtos:        [],
    editandoId:      null,
    deletandoId:     null,
    deletandoNome:   '',
    filtroTermo:     '',
    ordenar:         '',
    viewMode:        'grid' // 'grid' | 'list'
};

// ─── Seletores de elementos ────────────────────────────────────────────────────
const Els = {
    // Sidebar / mobile
    sidebar:          document.getElementById('sidebar'),
    sidebarOverlay:   document.getElementById('sidebar-overlay'),

    // Topbar
    topbarSubtitle:   document.getElementById('topbar-subtitle'),

    // View toggles
    btnViewGrid:      document.getElementById('btn-view-grid'),
    btnViewList:      document.getElementById('btn-view-list'),

    // Containers
    productsGrid:     document.getElementById('products-grid'),
    productsList:     document.getElementById('products-list'),

    // Toolbar
    searchInput:      document.getElementById('admin-search'),
    sortSelect:       document.getElementById('sort-select'),
    prodCount:        document.getElementById('prod-count'),

    // Botão novo produto
    btnNovo:          document.getElementById('btn-novo-produto'),

    // Drawer (formulário)
    formOverlay:      document.getElementById('form-overlay'),
    drawerTitle:      document.getElementById('drawer-title'),
    drawerClose:      document.getElementById('drawer-close'),
    btnCancel:        document.getElementById('btn-cancel'),
    btnSubmit:        document.getElementById('btn-submit'),
    btnSubmitText:    document.getElementById('btn-submit-text'),
    form:             document.getElementById('produto-form'),

    // Campos do formulário
    fieldId:          document.getElementById('field-id'),
    fieldNome:        document.getElementById('field-nome'),
    fieldDescricao:   document.getElementById('field-descricao'),
    fieldPreco:       document.getElementById('field-preco'),
    fieldImagem:      document.getElementById('field-imagem'),
    fieldImagemFile:  document.getElementById('field-imagem-file'),

    // Preview de imagem (no topo do form)
    imgPreviewWrap:   document.getElementById('form-img-preview-wrap'),
    imgPreview:       document.getElementById('img-preview'),
    imgPlaceholder:   document.getElementById('img-placeholder'),

    // Modal de confirmação de exclusão de produto
    confirmOverlay:   document.getElementById('confirm-overlay'),
    confirmName:      document.getElementById('confirm-name'),
    btnConfirmDel:    document.getElementById('btn-confirm-delete'),
    btnCancelDel:     document.getElementById('btn-cancel-delete'),

    // Badges sidebar
    badgeTotal:       document.getElementById('nav-badge-total'),

    // Toast
    toastContainer:   document.getElementById('toast-container')
};

// ─── Utilitários ───────────────────────────────────────────────────────────────

const formatCurrency = (v) =>
    Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const formatDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
};

// ─── Toast ─────────────────────────────────────────────────────────────────────

function showToast(msg, type = 'success') {
    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    const toast  = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-icon">${icons[type] || '💬'}</span><span class="toast-msg">${msg}</span>`;
    Els.toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('hide');
        toast.addEventListener('animationend', () => toast.remove(), { once: true });
    }, 3500);
}

// ─── Sidebar Mobile ────────────────────────────────────────────────────────────

Els.sidebarOverlay.addEventListener('click', () => Els.sidebar.classList.remove('open'));

// ─── Drawer (formulário de produto) ───────────────────────────────────────────

function openDrawer(produto = null) {
    state.editandoId = produto ? produto.id : null;

    Els.drawerTitle.textContent   = produto ? 'Editar Produto' : 'Novo Produto';
    Els.btnSubmitText.textContent = produto ? 'Salvar Alterações' : 'Cadastrar Produto';
    Els.form.reset();
    Els.fieldImagemFile.value = '';
    clearImgPreview();
    clearFormErrors();

    if (produto) {
        Els.fieldId.value        = produto.id;
        Els.fieldNome.value      = produto.nome;
        Els.fieldDescricao.value = produto.descricao;
        Els.fieldPreco.value     = produto.preco;
        Els.fieldImagem.value    = produto.imagem;
        updateImgPreview(produto.imagem);
    }

    Els.formOverlay.classList.add('open');
    Els.sidebar.classList.remove('open');
    setTimeout(() => Els.fieldNome.focus(), 350);
}

function closeDrawer() {
    Els.formOverlay.classList.remove('open');
    state.editandoId = null;
}

Els.btnNovo.addEventListener('click',     () => openDrawer());
Els.drawerClose.addEventListener('click', closeDrawer);
Els.btnCancel.addEventListener('click',   closeDrawer);
Els.formOverlay.addEventListener('click', (e) => { if (e.target === Els.formOverlay) closeDrawer(); });

// ─── Preview de imagem ─────────────────────────────────────────────────────────

function updateImgPreview(url) {
    if (!url) { clearImgPreview(); return; }
    Els.imgPreview.src    = url;
    Els.imgPreview.onload = () => {
        Els.imgPreview.style.display     = 'block';
        Els.imgPlaceholder.style.display = 'none';
        Els.imgPreviewWrap.classList.add('has-image');
    };
    Els.imgPreview.onerror = clearImgPreview;
}

function clearImgPreview() {
    Els.imgPreview.style.display     = 'none';
    Els.imgPlaceholder.style.display = 'flex';
    Els.imgPreview.src               = '';
    Els.imgPreviewWrap.classList.remove('has-image');
}

// Handler para o campo de URL
Els.fieldImagem.addEventListener('input', (e) => {
    Els.fieldImagemFile.value = ''; // Limpa o file input se digitar URL
    updateImgPreview(e.target.value.trim());
});

// Handler para o campo de Arquivo (converte pra Base64)
Els.fieldImagemFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Els.fieldImagem.value = ''; // Limpa a URL se escolheu arquivo
    
    const reader = new FileReader();
    reader.onload = (ev) => {
        const base64Str = ev.target.result;
        updateImgPreview(base64Str);
        Els.fieldImagem.dataset.base64 = base64Str; // Armazena temporariamente no dataset
    };
    reader.readAsDataURL(file);
});

// ─── Validação do formulário ───────────────────────────────────────────────────

function clearFormErrors() {
    [Els.fieldNome, Els.fieldDescricao, Els.fieldPreco]
        .forEach(el => el.classList.remove('error'));
}

function validateForm() {
    clearFormErrors();
    let valid = true;
    if (!Els.fieldNome.value.trim())                                             { Els.fieldNome.classList.add('error');      valid = false; }
    if (!Els.fieldDescricao.value.trim())                                        { Els.fieldDescricao.classList.add('error'); valid = false; }
    if (!Els.fieldPreco.value || parseFloat(Els.fieldPreco.value) <= 0)          { Els.fieldPreco.classList.add('error');     valid = false; }
    if (!valid) showToast('Preencha todos os campos obrigatórios.', 'error');
    return valid;
}

// ─── Submit do formulário de produto ──────────────────────────────────────────

Els.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    Els.btnSubmit.disabled = true;
    
    // Define a imagem final: se tiver arquivo selecionado (base64 salvo no dataset), usa ele. 
    // Senão usa o valor do campo de URL.
    let imagemFinal = Els.fieldImagem.value.trim();
    if (Els.fieldImagemFile.files.length > 0 && Els.fieldImagem.dataset.base64) {
        imagemFinal = Els.fieldImagem.dataset.base64;
    }

    const dados = {
        nome:      Els.fieldNome.value.trim(),
        descricao: Els.fieldDescricao.value.trim(),
        preco:     parseFloat(Els.fieldPreco.value),
        imagem:    imagemFinal
    };

    try {
        if (state.editandoId) {
            const original = await BancoDB.getById(state.editandoId);
            await BancoDB.update({ ...original, ...dados, id: state.editandoId });
            showToast(`"${dados.nome}" atualizado com sucesso!`);
        } else {
            await BancoDB.add(dados);
            showToast(`"${dados.nome}" cadastrado com sucesso!`);
        }
        closeDrawer();
        await refreshAll();
    } catch (err) {
        console.error(err);
        showToast('Erro ao salvar produto. Tente novamente.', 'error');
    } finally {
        Els.btnSubmit.disabled = false;
    }
});

// ─── Excluir Produto ───────────────────────────────────────────────────────────

function abrirConfirmacaoDelete(id, nome) {
    state.deletandoId   = id;
    state.deletandoNome = nome;
    Els.confirmName.textContent = `"${nome}"`;
    Els.confirmOverlay.classList.add('open');
}

function fecharConfirmacao() {
    Els.confirmOverlay.classList.remove('open');
    state.deletandoId   = null;
    state.deletandoNome = '';
}

Els.btnCancelDel.addEventListener('click', fecharConfirmacao);
Els.confirmOverlay.addEventListener('click', (e) => { if (e.target === Els.confirmOverlay) fecharConfirmacao(); });

Els.btnConfirmDel.addEventListener('click', async () => {
    if (!state.deletandoId) return;
    Els.btnConfirmDel.disabled = true;
    try {
        await BancoDB.delete(state.deletandoId);
        showToast('Produto excluído com sucesso!');
        fecharConfirmacao();
        setTimeout(() => refreshAll(), 450);
    } catch (err) {
        console.error(err);
        showToast('Erro ao excluir produto.', 'error');
    } finally {
        Els.btnConfirmDel.disabled = false;
    }
});


// ─── Toggle View (Grid / Lista) ────────────────────────────────────────────────
function setViewMode(mode) {
    state.viewMode = mode;
    if (mode === 'grid') {
        Els.btnViewGrid.setAttribute('aria-pressed', 'true');
        Els.btnViewList.setAttribute('aria-pressed', 'false');
        Els.productsGrid.hidden = false;
        Els.productsList.hidden = true;
    } else {
        Els.btnViewGrid.setAttribute('aria-pressed', 'false');
        Els.btnViewList.setAttribute('aria-pressed', 'true');
        Els.productsGrid.hidden = true;
        Els.productsList.hidden = false;
    }
}

Els.btnViewGrid.addEventListener('click', () => setViewMode('grid'));
Els.btnViewList.addEventListener('click', () => setViewMode('list'));


// ─── Filtros e Ordenação ───────────────────────────────────────────────────────

Els.searchInput.addEventListener('input',  (e) => { state.filtroTermo = e.target.value.trim();   renderProdutos(); });
Els.sortSelect.addEventListener('change',  (e) => { state.ordenar = e.target.value;              renderProdutos(); });

// ─── Renderização ──────────────────────────────────────────────────────────────

function getProdutosFiltrados() {
    let lista = [...state.produtos];
    if (state.filtroTermo) {
        const t = state.filtroTermo.toLowerCase();
        lista = lista.filter(p => p.nome.toLowerCase().includes(t) || (p.descricao && p.descricao.toLowerCase().includes(t)));
    }
    if (state.ordenar === 'preco-asc')  lista.sort((a, b) => a.preco - b.preco);
    if (state.ordenar === 'preco-desc') lista.sort((a, b) => b.preco - a.preco);
    if (state.ordenar === 'nome-az')    lista.sort((a, b) => a.nome.localeCompare(b.nome));
    if (state.ordenar === 'nome-za')    lista.sort((a, b) => b.nome.localeCompare(a.nome));
    if (state.ordenar === 'recente')    lista.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
    return lista;
}

function renderProdutos() {
    const lista = getProdutosFiltrados();
    const countText = `${lista.length} produto${lista.length !== 1 ? 's' : ''}`;
    Els.prodCount.textContent = countText;
    Els.topbarSubtitle.textContent = countText;

    if (lista.length === 0) {
        const emptyState = `<div class="empty-state"><div class="empty-icon">📭</div><p class="empty-title">Nenhum produto encontrado</p><p class="empty-desc">Tente ajustar a busca ou cadastre um novo produto.</p></div>`;
        Els.productsGrid.innerHTML = emptyState;
        Els.productsList.innerHTML = emptyState;
        return;
    }

    // Render Grid
    Els.productsGrid.innerHTML = lista.map(p => `
        <div class="prod-card" data-id="${p.id}">
            <div class="prod-card-img-wrap">
                <img src="${p.imagem || ''}" alt="${p.nome}" onerror="this.src='https://via.placeholder.com/300x200?text=Sem+Imagem'">
            </div>
            <div class="prod-card-body">
                <h3 class="prod-card-title" title="${p.nome}">${p.nome}</h3>
                <p class="prod-card-desc" title="${p.descricao}">${p.descricao}</p>
                <div class="prod-card-footer">
                    <span class="prod-card-price">${formatCurrency(p.preco)}</span>
                    <div class="prod-card-actions">
                        <button class="btn-icon edit" title="Editar" onclick="editarProduto(${p.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button class="btn-icon delete" title="Excluir" onclick="confirmarDelete(${p.id}, '${p.nome.replace(/'/g, "\\'")}')">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Render List
    Els.productsList.innerHTML = `
        <table class="products-table">
            <thead>
                <tr>
                    <th style="width: 70px">Foto</th>
                    <th>Produto</th>
                    <th style="width: 150px">Preço</th>
                    <th style="width: 120px">Atualizado</th>
                    <th style="width: 100px; text-align:right;">Ações</th>
                </tr>
            </thead>
            <tbody>
                ${lista.map(p => `
                    <tr>
                        <td>
                            <img src="${p.imagem || ''}" class="product-thumb" alt="${p.nome}" onerror="this.src='https://via.placeholder.com/52x52?text=?'">
                        </td>
                        <td>
                            <div class="list-item-title">${p.nome}</div>
                            <div class="list-item-desc">${p.descricao}</div>
                        </td>
                        <td class="price-cell">${formatCurrency(p.preco)}</td>
                        <td class="date-cell">${formatDate(p.dataAtualizacao)}</td>
                        <td>
                            <div class="actions-cell" style="justify-content:flex-end;">
                                <button class="btn-icon edit" title="Editar" onclick="editarProduto(${p.id})">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                </button>
                                <button class="btn-icon delete" title="Excluir" onclick="confirmarDelete(${p.id}, '${p.nome.replace(/'/g, "\\'")}')">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// ─── Refresh Completo ──────────────────────────────────────────────────────────

async function refreshAll() {
    state.produtos = await BancoDB.getAll();
    renderProdutos();
    Els.badgeTotal.textContent = state.produtos.length;
}

// ─── Ações globais ─────────────────────────────────────────────────────────────

window.editarProduto   = async (id) => { const p = await BancoDB.getById(id); if (p) openDrawer(p); };
window.confirmarDelete = (id, nome) => abrirConfirmacaoDelete(id, nome);

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

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await BancoDB.init();
        await refreshAll();
    } catch (err) {
        console.error('Erro ao inicializar admin:', err);
        showToast('Erro ao carregar o banco de dados.', 'error');
    }
});
