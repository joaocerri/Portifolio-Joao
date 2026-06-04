/**
 * banco.js — Camada de Abstração do IndexedDB
 * Elite Capilar | v4 — migração resiliente
 */

const BancoDB = (() => {
    const DB_NAME    = 'EliteCapilarDB';
    const DB_VERSION = 4;
    const STORE_PROD = 'produtos';

    let db = null;

    // ─── Seed ──────────────────────────────────────────────────────────────────
    const SEED_PRODUTOS = [
        { nome: 'Micropele HD Invisible 0.03mm',   descricao: 'A base mais fina e indetectável do mercado. Imita perfeitamente o couro cabeludo, ideal para penteados para trás e topetes altos.',                              preco: 2500, imagem: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800' },
        { nome: 'Lace Front Suíça',                descricao: 'Máxima ventilação e conforto. A malha Suíça é extremamente fina na frente, indicada para clientes ativos ou que vivem em regiões quentes.',                    preco: 2200, imagem: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800' },
        { nome: 'Híbrida Sport Plus',              descricao: 'O equilíbrio perfeito entre durabilidade e estética. Laterais e traseira em micropele para fixação extra, com frente em Lace para naturalidade.',              preco: 1650, imagem: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800' },
        { nome: 'Micropele Resist 0.06mm',         descricao: 'Maior durabilidade sem perder a naturalidade. Excelente custo-benefício para quem busca uma peça que dure mais meses.',                                         preco: 1800, imagem: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?q=80&w=800' },
        { nome: 'Full Lace Premium',               descricao: 'Totalmente respirável. Permite repartir o cabelo para qualquer lado com extrema naturalidade, como se o cabelo nascesse de todos os poros.',                   preco: 2800, imagem: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800' },
        { nome: 'Híbrida Frontal HD',              descricao: 'Frente em Lace HD para naturalidade absoluta na linha de frente e topo/traseira em micropele injetada para alta durabilidade.',                                 preco: 1950, imagem: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800' },
        { nome: 'Lace Francesa',                   descricao: 'Malha sutilmente mais resistente que a Suíça. Ideal para quem busca uma prótese altamente durável e 100% respirável.',                                          preco: 2100, imagem: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=800' },
        { nome: 'Micropele Injetada Silicone',     descricao: 'Os fios são injetados um a um na base de silicone, sem nós, criando o efeito exato de cabelo crescendo diretamente do couro cabeludo.',                        preco: 2900, imagem: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800' },
        { nome: 'Prótese Cabelo Ondulado',         descricao: 'Design híbrido com densidade de 120%, trazendo fios com ondas soltas para um visual moderno, despojado e cheio de atitude.',                                   preco: 2150, imagem: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800' },
        { nome: 'Híbrida Elite Grisalha 30%',      descricao: 'Especial para homens maduros. Contém 30% de fios brancos mesclados naturalmente, trazendo um visual distinto e respeitável.',                                  preco: 2450, imagem: 'https://images.unsplash.com/photo-1552642986-ccb41e7059e7?q=80&w=800' },
        { nome: 'Prótese Parcial (Coroa)',          descricao: 'Peça menor, específica para preenchimento de áreas isoladas como a coroa da cabeça. Base mista de lace e micropele.',                                          preco: 1200, imagem: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=800' },
        { nome: 'Micropele Super Resist 0.12mm',   descricao: 'A base mais robusta. Ideal para quem pratica esportes de alto impacto ou busca a maior vida útil possível na prótese capilar.',                                preco: 1500, imagem: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800' },
        { nome: 'Lace HD Cinematográfica',         descricao: 'Usada na indústria do cinema. A malha desaparece completamente na pele. Sensível, mas oferece o resultado visual mais espetacular.',                            preco: 3200, imagem: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=800' },
        { nome: 'Prótese Cabelo Cacheado Natural', descricao: 'Prótese em micropele 0.08mm com fios naturalmente cacheados. Mantém a forma e volume ideais para quem busca um estilo afro ou cacheado.',                     preco: 2300, imagem: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=800' },
        { nome: 'Elite Densidade 130%',            descricao: 'Para quem quer aquele volume marcante de volta. Fios densos, ideais para cortes repicados e volumosos estilo pompadour.',                                       preco: 2600, imagem: 'https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?q=80&w=800' }
    ];

    // ─── Abertura do banco ─────────────────────────────────────────────────────

    function _openDB() {
        return new Promise((resolve, reject) => {
            if (db) { resolve(db); return; }

            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = (e) => {
                const database   = e.target.result;
                const oldVersion = e.oldVersion;

                // Garante a store de produtos mesmo se o navegador tiver um
                // banco antigo/incompleto salvo de uma versão anterior.
                const store = database.objectStoreNames.contains(STORE_PROD)
                    ? e.target.transaction.objectStore(STORE_PROD)
                    : database.createObjectStore(STORE_PROD, { keyPath: 'id', autoIncrement: true });

                if (!store.indexNames.contains('nome')) {
                    store.createIndex('nome', 'nome', { unique: false });
                }

                if (!store.indexNames.contains('preco')) {
                    store.createIndex('preco', 'preco', { unique: false });
                }

                // Remove store de categorias se existir.
                if (database.objectStoreNames.contains('categorias')) {
                    database.deleteObjectStore('categorias');
                }
            };

            request.onsuccess = (e) => {
                db = e.target.result;
                db.onversionchange = () => { db.close(); db = null; };
                resolve(db);
            };

            request.onerror = (e) => reject(new Error('Erro ao abrir IndexedDB: ' + e.target.error));
        });
    }

    function _tx(mode, callback) {
        return _openDB().then(database => new Promise((resolve, reject) => {
            const tx    = database.transaction(STORE_PROD, mode);
            const store = tx.objectStore(STORE_PROD);
            tx.onerror = (e) => reject(e.target.error);
            tx.onabort = (e) => reject(e.target.error);
            callback(store, resolve, reject);
        }));
    }

    // ─── Seed automático ───────────────────────────────────────────────────────

    function _seedIfEmpty() {
        return _tx('readonly', (store, resolve) => {
            const req = store.count();
            req.onsuccess = () => resolve(req.result);
        }).then(count => {
            if (count > 0) return;
            const agora = new Date().toISOString();
            return Promise.all(
                SEED_PRODUTOS.map(p => add({ ...p, dataCriacao: agora, dataAtualizacao: agora }))
            );
        });
    }

    // ─── API ───────────────────────────────────────────────────────────────────

    function init() {
        return _openDB().then(_seedIfEmpty);
    }

    function getAll() {
        return _tx('readonly', (store, resolve, reject) => {
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result);
            req.onerror   = () => reject(req.error);
        });
    }

    function getById(id) {
        return _tx('readonly', (store, resolve, reject) => {
            const req = store.get(id);
            req.onsuccess = () => resolve(req.result);
            req.onerror   = () => reject(req.error);
        });
    }

    function add(produto) {
        const agora = new Date().toISOString();
        const novo  = { ...produto, dataCriacao: produto.dataCriacao || agora, dataAtualizacao: produto.dataAtualizacao || agora };
        return _tx('readwrite', (store, resolve, reject) => {
            const req = store.add(novo);
            req.onsuccess = () => resolve({ ...novo, id: req.result });
            req.onerror   = () => reject(req.error);
        });
    }

    function update(produto) {
        const atualizado = { ...produto, dataAtualizacao: new Date().toISOString() };
        return _tx('readwrite', (store, resolve, reject) => {
            const req = store.put(atualizado);
            req.onsuccess = () => resolve(atualizado);
            req.onerror   = () => reject(req.error);
        });
    }

    function remove(id) {
        return _tx('readwrite', (store, resolve, reject) => {
            const req = store.delete(id);
            req.onsuccess = () => resolve(true);
            req.onerror   = () => reject(req.error);
        });
    }

    function search({ termo = '', precoMin = 0, precoMax = Infinity, ordenar = '' } = {}) {
        return getAll().then(todos => {
            let r = todos.filter(p => {
                const matchNome  = p.nome.toLowerCase().includes(termo.toLowerCase()) ||
                                   (p.descricao && p.descricao.toLowerCase().includes(termo.toLowerCase()));
                const matchPreco = p.preco >= precoMin && p.preco <= precoMax;
                return matchNome && matchPreco;
            });
            if (ordenar === 'preco-asc')  r.sort((a, b) => a.preco - b.preco);
            if (ordenar === 'preco-desc') r.sort((a, b) => b.preco - a.preco);
            if (ordenar === 'nome-az')    r.sort((a, b) => a.nome.localeCompare(b.nome));
            if (ordenar === 'nome-za')    r.sort((a, b) => b.nome.localeCompare(a.nome));
            if (ordenar === 'recente')    r.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
            return r;
        });
    }

    function getStats() {
        return getAll().then(todos => ({ total: todos.length }));
    }

    return { init, getAll, getById, add, update, delete: remove, search, getStats };

})();
