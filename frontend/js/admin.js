// RF18–RF21 – Painel Administrativo
if (!Auth.exigirAdmin()) throw new Error('redirect');

const alertEl = document.getElementById('alertMsg');
let livroEditandoId = null;

async function init() {
    await carregarLivros();
    await carregarPendentes();
    await carregarLivrosParaMes();
}

// ── RF19 – Gestão de Livros ────────────────────────────────────────────────
async function carregarLivros() {
    const livros = await Api.adminGetLivros();
    const container = document.getElementById('listaLivros');

    container.innerHTML = livros.map(l => `
        <div class="livro-admin-item">
            <div style="font-size:28px;width:40px;text-align:center">${capaEmoji(l.categoria)}</div>
            <div class="livro-admin-info">
                <div class="livro-admin-titulo">${l.titulo}</div>
                <div class="livro-admin-autor">${l.autor} • ${l.categoria}</div>
            </div>
            <div class="livro-admin-actions">
                <button class="btn-sm btn-sm-primary" onclick="abrirFormLivro(${l.id})">✏️</button>
                <button class="btn-sm btn-sm-danger" onclick="excluirLivro(${l.id}, '${l.titulo.replace(/'/g,"\\'")}')">🗑️</button>
            </div>
        </div>
    `).join('');
}

function abrirFormLivro(id = null) {
    livroEditandoId = id;
    const modal = document.getElementById('modalLivro');
    document.getElementById('modalTitulo').textContent = id ? 'Editar Livro' : 'Novo Livro';

    if (id) {
        Api.getLivro(id).then(l => {
            document.getElementById('fTitulo').value = l.titulo;
            document.getElementById('fAutor').value = l.autor;
            document.getElementById('fCategoria').value = l.categoria;
            document.getElementById('fDescricao').value = l.descricao || '';
            document.getElementById('fCapaUrl').value = l.capaUrl || '';
        });
    } else {
        document.getElementById('formLivro').reset();
    }

    modal.classList.add('show');
}

document.getElementById('formLivro').addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = {
        titulo: document.getElementById('fTitulo').value.trim(),
        autor: document.getElementById('fAutor').value.trim(),
        categoria: document.getElementById('fCategoria').value.trim(),
        descricao: document.getElementById('fDescricao').value.trim(),
        capaUrl: document.getElementById('fCapaUrl').value.trim(),
    };

    try {
        if (livroEditandoId) {
            await Api.adminEditarLivro(livroEditandoId, dados);
            showAlert(alertEl, 'Livro atualizado com sucesso!', 'success');
        } else {
            await Api.adminCriarLivro(dados);
            showAlert(alertEl, 'Livro cadastrado com sucesso!', 'success');
        }
        document.getElementById('modalLivro').classList.remove('show');
        await carregarLivros();
        await carregarLivrosParaMes();
    } catch (err) {
        showAlert(alertEl, err.message);
    }
});

async function excluirLivro(id, titulo) {
    if (!confirm(`Excluir "${titulo}"?`)) return;
    await Api.adminExcluirLivro(id);
    showAlert(alertEl, 'Livro excluído.', 'success');
    await carregarLivros();
}

document.getElementById('btnNovoLivro').addEventListener('click', () => abrirFormLivro());
document.getElementById('fecharModalLivro').addEventListener('click', () => {
    document.getElementById('modalLivro').classList.remove('show');
});

// ── RF20 – Aprovação de Publicações ───────────────────────────────────────
async function carregarPendentes() {
    const lista = await Api.adminGetPendentes();
    const container = document.getElementById('listaPendentes');

    if (!lista.length) {
        container.innerHTML = '<div class="empty-state"><div class="icon">✅</div><p>Nenhuma publicação pendente.</p></div>';
        return;
    }

    container.innerHTML = lista.map(p => `
        <div class="pub-item">
            <div class="pub-titulo">${p.titulo}</div>
            <div class="pub-autor">por ${p.autor}</div>
            <div class="pub-meta">${p.genero || '—'} • Enviado em ${formatDate(p.enviadoEm)}</div>
            <div class="pub-actions">
                <button class="btn-sm btn-sm-success" onclick="avaliarPub(${p.id}, 'APROVADO')">✅ Aprovar</button>
                <button class="btn-sm btn-sm-danger" onclick="avaliarPub(${p.id}, 'REJEITADO')">❌ Rejeitar</button>
            </div>
        </div>
    `).join('');
}

async function avaliarPub(id, status) {
    await Api.adminAvaliarPublicacao(id, status);
    showAlert(alertEl, `Publicação ${status === 'APROVADO' ? 'aprovada' : 'rejeitada'}.`, 'success');
    await carregarPendentes();
}

// ── RF21 – Livro do Mês ────────────────────────────────────────────────────
async function carregarLivrosParaMes() {
    const livros = await Api.adminGetLivros();
    const select = document.getElementById('selectLivroDoMes');
    select.innerHTML = livros.map(l =>
        `<option value="${l.id}" ${l.livroDoMes ? 'selected' : ''}>${l.titulo} – ${l.autor}</option>`
    ).join('');
}

document.getElementById('btnDefinirMes').addEventListener('click', async () => {
    const id = document.getElementById('selectLivroDoMes').value;
    if (!id) return;
    await Api.adminDefinirLivroDoMes(id);
    showAlert(alertEl, 'Livro do mês definido com sucesso! 📖', 'success');
    await carregarLivros();
    await carregarLivrosParaMes();
});

// Expor funções globais usadas nos onclick do HTML
window.abrirFormLivro = abrirFormLivro;
window.excluirLivro = excluirLivro;
window.avaliarPub = avaliarPub;

init();
