// RF05 – Home
if (!Auth.exigirLogin()) throw new Error('redirect');

const user = Auth.getUser();

// Saudação (RF05)
document.getElementById('nomeUsuario').textContent = user.nome.split(' ')[0];

async function init() {
    await carregarLivroDoMes();
    await carregarLivros();
}

// RF05.1 e RF06 – Livro do Mês
async function carregarLivroDoMes() {
    const banner = document.getElementById('livroDoMesBanner');
    try {
        const livro = await Api.getLivroDoMes();
        if (!livro) { banner.style.display = 'none'; return; }

        document.getElementById('ldmCapa').textContent = capaEmoji(livro.categoria);
        document.getElementById('ldmCapa').style.background = capaBg(livro.titulo);
        document.getElementById('ldmTitulo').textContent = livro.titulo;
        document.getElementById('ldmAutor').textContent = livro.autor;
        document.getElementById('ldmVerBtn').onclick = () => {
            window.location.href = `detalhes-livro.html?id=${livro.id}`;
        };
    } catch (e) {
        banner.style.display = 'none';
    }
}

// RF05.2 e RF05.3 – Livros em destaque e Recomendados
async function carregarLivros() {
    try {
        const livros = await Api.getLivros();
        renderScroll('destaques', livros.slice(0, 6));
        renderScroll('recomendados', [...livros].sort(() => Math.random() - 0.5).slice(0, 6));
    } catch (e) {
        console.error(e);
    }
}

function renderScroll(containerId, livros) {
    const container = document.getElementById(containerId);
    container.innerHTML = livros.map(l => `
        <a class="livro-card-mini" href="detalhes-livro.html?id=${l.id}">
            <div class="capa-mini" style="background:${capaBg(l.titulo)};color:white">
                ${capaEmoji(l.categoria)}
            </div>
            <div class="titulo-mini">${l.titulo}</div>
            <div class="autor-mini">${l.autor}</div>
            <div class="rating-mini">${'★'.repeat(Math.round(l.avaliacaoMedia))} ${l.avaliacaoMedia.toFixed(1)}</div>
        </a>
    `).join('');
}

init();
