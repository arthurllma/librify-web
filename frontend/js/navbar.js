// Renderiza a navbar inferior dinamicamente em todas as páginas principais
(function() {
    const PAGES = [
        { id: 'home',      label: 'Home',     icon: '🏠', href: 'home.html' },
        { id: 'catalogo',  label: 'Catálogo', icon: '📚', href: 'catalogo.html' },
        { id: 'historico', label: 'Histórico', icon: '📋', href: 'historico.html' },
        { id: 'publicar',  label: 'Publicar',  icon: '➕', href: 'publicar.html' },
        { id: 'perfil',    label: 'Perfil',    icon: '👤', href: 'perfil.html' },
    ];

    const currentPage = document.body.dataset.page;

    const nav = document.createElement('nav');
    nav.className = 'navbar';

    PAGES.forEach(p => {
        const a = document.createElement('a');
        a.href = p.href;
        a.className = 'nav-item' + (p.id === currentPage ? ' active' : '');
        a.innerHTML = `<span class="nav-icon">${p.icon}</span><span class="nav-label">${p.label}</span>`;
        nav.appendChild(a);
    });

    document.body.appendChild(nav);
})();
