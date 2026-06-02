// RF14 – Notificações
if (!Auth.exigirLogin()) throw new Error('redirect');

const TIPO_ICON = { reserva: '📚', prazo: '⏰', publicacao: '✍️', default: '🔔' };

async function init() {
    const notifs = await Api.getNotificacoes();
    renderNotificacoes(notifs);

    document.getElementById('btnMarcarLidas').addEventListener('click', async () => {
        await Api.marcarNotifsLidas();
        const atualizadas = notifs.map(n => ({ ...n, lida: true }));
        renderNotificacoes(atualizadas);
    });
}

function renderNotificacoes(notifs) {
    const container = document.getElementById('listaNotifs');
    const naoLidas = notifs.filter(n => !n.lida).length;

    document.getElementById('contadorNaoLidas').textContent =
        naoLidas > 0 ? `${naoLidas} não lida${naoLidas > 1 ? 's' : ''}` : 'Tudo lido';

    if (!notifs.length) {
        container.innerHTML = `<div class="empty-state"><div class="icon">🔔</div><p>Nenhuma notificação ainda.</p></div>`;
        return;
    }

    container.innerHTML = notifs.map(n => `
        <div class="notif-item ${n.lida ? '' : 'nao-lida'}">
            <div class="notif-icon ${n.tipo}">
                ${TIPO_ICON[n.tipo] || TIPO_ICON.default}
            </div>
            <div class="notif-info">
                <div class="notif-mensagem">${n.mensagem}</div>
                <div class="notif-data">${formatDate(n.criadoEm)}</div>
            </div>
            <div class="notif-dot"></div>
        </div>
    `).join('');
}

init();
