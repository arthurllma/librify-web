const Auth = (() => {
    const TOKEN_KEY = 'librify_token';
    const USER_KEY = 'librify_user';

    return {
        salvar(data) {
            localStorage.setItem(TOKEN_KEY, data.token);
            localStorage.setItem(USER_KEY, JSON.stringify({
                id: data.id,
                nome: data.nome,
                email: data.email,
                role: data.role
            }));
        },

        getToken() { return localStorage.getItem(TOKEN_KEY); },

        getUser() {
            const u = localStorage.getItem(USER_KEY);
            return u ? JSON.parse(u) : null;
        },

        isLogado() { return !!this.getToken(); },

        isAdmin() { return this.getUser()?.role === 'ADMIN'; },

        logout() {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            window.location.href = rootPath() + 'index.html';
        },

        // Redireciona para login se não estiver logado
        exigirLogin() {
            if (!this.isLogado()) {
                window.location.href = rootPath() + 'index.html';
                return false;
            }
            return true;
        },

        // Redireciona para login se não for admin
        exigirAdmin() {
            if (!this.isLogado() || !this.isAdmin()) {
                window.location.href = rootPath() + 'index.html';
                return false;
            }
            return true;
        }
    };
})();

// Calcula o caminho relativo até a raiz com base na profundidade da página atual
function rootPath() {
    const depth = (window.location.pathname.match(/\//g) || []).length;
    const isFile = window.location.pathname.endsWith('.html');
    if (!isFile) return '';
    const parts = window.location.pathname.split('/');
    const frontendIdx = parts.findIndex(p => p === 'frontend');
    if (frontendIdx === -1) return '';
    const levelsAfterFrontend = parts.length - frontendIdx - 2;
    return '../'.repeat(levelsAfterFrontend);
}

// Utilitários gerais
function showAlert(el, msg, type = 'error') {
    el.textContent = msg;
    el.className = `alert alert-${type} show`;
}

function hideAlert(el) {
    el.className = 'alert';
}

function starsHtml(nota, max = 5) {
    let html = '';
    for (let i = 1; i <= max; i++) {
        html += i <= nota ? '★' : '☆';
    }
    return html;
}

function formatDate(dateStr) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('pt-BR');
}

function capaBg(titulo) {
    const colors = ['#1A73E8','#34A853','#EA4335','#FBBC04','#9C27B0','#00BCD4','#FF5722','#607D8B'];
    const idx = titulo.charCodeAt(0) % colors.length;
    return colors[idx];
}

function capaEmoji(categoria) {
    const map = {
        'Ficção': '📖', 'Ficção Científica': '🚀', 'Fantasia': '🧙',
        'Literatura Brasileira': '🇧🇷', 'História': '📜', 'Romance': '💕',
        'Terror': '👻', 'Suspense': '🔍', 'Crônica': '✍️',
    };
    return map[categoria] || '📚';
}
