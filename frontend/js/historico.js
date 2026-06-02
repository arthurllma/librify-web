// RF10 – Histórico + RF11 – Meus Livros
if (!Auth.exigirLogin()) throw new Error('redirect');

const STATUS_LABEL = { RESERVADO: 'Reservado', EMPRESTADO: 'Emprestado', DEVOLVIDO: 'Devolvido', CANCELADO: 'Cancelado' };
const STATUS_TAG = { RESERVADO: 'tag-blue', EMPRESTADO: 'tag-yellow', DEVOLVIDO: 'tag-green', CANCELADO: 'tag-red' };

let abaAtiva = 'todos';

async function init() {
    const historico = await Api.getHistorico();
    renderHistorico(historico);

    document.querySelectorAll('.tab').forEach(t => {
        t.addEventListener('click', () => {
            abaAtiva = t.dataset.tab;
            document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
            t.classList.add('active');
            filtrar(historico);
        });
    });
}

function filtrar(historico) {
    if (abaAtiva === 'todos') return renderHistorico(historico);
    if (abaAtiva === 'ativos') return renderHistorico(
        historico.filter(r => r.status === 'RESERVADO' || r.status === 'EMPRESTADO'));
    if (abaAtiva === 'concluidos') return renderHistorico(
        historico.filter(r => r.status === 'DEVOLVIDO'));
}

function renderHistorico(lista) {
    const container = document.getElementById('historicoLista');
    if (!lista.length) {
        container.innerHTML = `<div class="empty-state"><div class="icon">📋</div><p>Nenhum registro encontrado.</p></div>`;
        return;
    }
    container.innerHTML = lista.map(r => `
        <div class="historico-item">
            <div class="historico-capa" style="background:${capaBg(r.livro.titulo)};color:white">
                ${capaEmoji(r.livro.categoria)}
            </div>
            <div class="historico-info">
                <div class="historico-titulo">${r.livro.titulo}</div>
                <div class="historico-autor">${r.livro.autor}</div>
                <span class="tag ${STATUS_TAG[r.status]}">${STATUS_LABEL[r.status]}</span>
                <div class="historico-datas" style="margin-top:8px">
                    <div class="data-row"><span class="label">Reservado em:</span>${formatDate(r.dataReserva)}</div>
                    <div class="data-row"><span class="label">Empréstimo:</span>${formatDate(r.dataEmprestimo)}</div>
                    <div class="data-row"><span class="label">Devolução:</span>${formatDate(r.dataDevolucao)}</div>
                </div>
            </div>
        </div>
    `).join('');
}

init();
