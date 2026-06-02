// RF07 – Catálogo
if (!Auth.exigirLogin()) throw new Error('redirect');

const grid = document.getElementById('livrosGrid');
const searchInput = document.getElementById('searchInput');
const categoriasContainer = document.getElementById('categorias');

let todosLivros = [];
let categoriaAtiva = null;

async function init() {
    todosLivros = await Api.getLivros();
    renderCategorias();
    renderLivros(todosLivros);
}

function renderCategorias() {
    const cats = ['Todos', ...new Set(todosLivros.map(l => l.categoria))];
    categoriasContainer.innerHTML = cats.map(c => `
        <button class="categoria-chip${c === 'Todos' ? ' active' : ''}"
                onclick="filtrarCategoria('${c}')">${c}</button>
    `).join('');
}

// RF07.2 – filtro por categoria
function filtrarCategoria(cat) {
    categoriaAtiva = cat === 'Todos' ? null : cat;
    document.querySelectorAll('.categoria-chip').forEach(el => {
        el.classList.toggle('active', el.textContent === cat);
    });
    aplicarFiltros();
}

// RF07.1 – busca por título/autor
searchInput.addEventListener('input', aplicarFiltros);

function aplicarFiltros() {
    const busca = searchInput.value.toLowerCase();
    let lista = todosLivros;
    if (busca) lista = lista.filter(l =>
        l.titulo.toLowerCase().includes(busca) || l.autor.toLowerCase().includes(busca));
    if (categoriaAtiva) lista = lista.filter(l => l.categoria === categoriaAtiva);
    renderLivros(lista);
}

// RF07.3 – exibição de cada livro
function renderLivros(livros) {
    if (!livros.length) {
        grid.innerHTML = '<p class="no-results">Nenhum livro encontrado.</p>';
        return;
    }
    grid.innerHTML = livros.map(l => `
        <a class="livro-card" href="detalhes-livro.html?id=${l.id}">
            <div class="capa" style="background:${capaBg(l.titulo)};color:white;font-size:52px">
                ${capaEmoji(l.categoria)}
            </div>
            <div class="info">
                <div class="titulo">${l.titulo}</div>
                <div class="autor">${l.autor}</div>
                <div class="rating">
                    <span class="star">★</span>
                    <span>${l.avaliacaoMedia.toFixed(1)}</span>
                    <span>(${l.totalAvaliacoes})</span>
                </div>
            </div>
        </a>
    `).join('');
}

init();
