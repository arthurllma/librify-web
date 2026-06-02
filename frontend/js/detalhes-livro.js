// RF08 – Detalhes do Livro + RF09 – Avaliações
if (!Auth.exigirLogin()) throw new Error('redirect');

const id = new URLSearchParams(location.search).get('id');
if (!id) location.href = 'catalogo.html';

let notaSelecionada = 0;

async function init() {
    const [livro, avaliacoes] = await Promise.all([
        Api.getLivro(id),
        Api.getAvaliacoes(id)
    ]);
    renderLivro(livro);
    renderAvaliacoes(avaliacoes);
}

function renderLivro(l) {
    document.title = `Librify – ${l.titulo}`;
    const capa = document.getElementById('livroCapaEl');
    capa.textContent = capaEmoji(l.categoria);
    capa.style.background = capaBg(l.titulo);
    capa.style.color = 'white';

    document.getElementById('livroTitulo').textContent = l.titulo;
    document.getElementById('livroAutor').textContent = l.autor;
    document.getElementById('livroCat').textContent = l.categoria;
    document.getElementById('livroDescricao').textContent = l.descricao || 'Sem descrição disponível.';
    document.getElementById('livroMediaNota').textContent = l.avaliacaoMedia.toFixed(1);
    document.getElementById('livroEstrelasMedia').textContent = starsHtml(Math.round(l.avaliacaoMedia));
    document.getElementById('livroTotalAval').textContent = `(${l.totalAvaliacoes} avaliações)`;

    // RF08.1 – Reservar
    document.getElementById('btnReservar').addEventListener('click', async () => {
        try {
            await Api.reservar(id);
            showToast('Reserva realizada com sucesso! 📚');
        } catch (e) {
            showToast(e.message, 'error');
        }
    });

    // RF08.1 – Avaliar
    document.getElementById('btnAvaliar').addEventListener('click', () => {
        document.getElementById('modalAvaliacao').classList.add('show');
    });
}

// RF09.4 – lista de avaliações
function renderAvaliacoes(avaliacoes) {
    const container = document.getElementById('listaAvaliacoes');
    if (!avaliacoes.length) {
        container.innerHTML = '<p style="color:var(--gray);font-size:13px;text-align:center;padding:16px 0">Seja o primeiro a avaliar!</p>';
        return;
    }
    container.innerHTML = avaliacoes.map(a => `
        <div class="avaliacao-item">
            <div class="avaliacao-header">
                <span class="avaliacao-autor">${a.user.nome}</span>
                <span class="avaliacao-data">${formatDate(a.criadoEm)}</span>
            </div>
            <div class="avaliacao-nota">${starsHtml(a.nota)}</div>
            ${a.comentario ? `<div class="avaliacao-texto">${a.comentario}</div>` : ''}
        </div>
    `).join('');
}

// RF09.1 – sistema de estrelas
document.querySelectorAll('.stars-input .star').forEach(star => {
    star.addEventListener('click', () => {
        notaSelecionada = Number(star.dataset.valor);
        document.querySelectorAll('.stars-input .star').forEach((s, i) => {
            s.classList.toggle('active', i < notaSelecionada);
        });
    });
});

// RF09.2 – envio de avaliação
document.getElementById('formAvaliacao').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!notaSelecionada) { showToast('Selecione uma nota', 'error'); return; }

    const comentario = document.getElementById('comentarioInput').value;

    try {
        await Api.avaliar(id, notaSelecionada, comentario);
        document.getElementById('modalAvaliacao').classList.remove('show');
        showToast('Avaliação enviada! ⭐');
        await init();
    } catch (e) {
        showToast(e.message, 'error');
    }
});

document.getElementById('fecharModal').addEventListener('click', () => {
    document.getElementById('modalAvaliacao').classList.remove('show');
});

function showToast(msg, type = 'success') {
    const t = document.createElement('div');
    t.style.cssText = `position:fixed;bottom:80px;left:50%;transform:translateX(-50%);
        background:${type === 'error' ? 'var(--error)' : 'var(--dark)'};color:white;
        padding:10px 20px;border-radius:24px;font-size:13px;font-weight:600;
        z-index:999;max-width:320px;text-align:center;`;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

init();
