const Api = (() => {
    const BASE_URL = 'http://localhost:8080/api';
    const MOCK = true; // false quando o backend estiver rodando

    const token = () => localStorage.getItem('librify_token');

    const headers = () => ({
        'Content-Type': 'application/json',
        ...(token() ? { 'Authorization': `Bearer ${token()}` } : {})
    });

    async function req(method, path, body) {
        const res = await fetch(`${BASE_URL}${path}`, {
            method,
            headers: headers(),
            body: body ? JSON.stringify(body) : undefined
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.erro || 'Erro no servidor');
        return data;
    }

    // ── MOCK DATA ────────────────────────────────────────────────────────────
    const MOCK_LIVROS = [
        { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis', descricao: 'Uma das obras mais importantes da literatura brasileira. Bentinho narra sua história de amor com Capitu.', categoria: 'Literatura Brasileira', capaUrl: null, avaliacaoMedia: 4.5, totalAvaliacoes: 128, livroDoMes: true, disponivel: true },
        { id: 2, titulo: 'O Alquimista', autor: 'Paulo Coelho', descricao: 'A jornada de Santiago em busca de seu tesouro pessoal e seu destino.', categoria: 'Ficção', capaUrl: null, avaliacaoMedia: 4.7, totalAvaliacoes: 342, livroDoMes: false, disponivel: true },
        { id: 3, titulo: '1984', autor: 'George Orwell', descricao: 'Uma distopia clássica sobre vigilância, controle e resistência.', categoria: 'Ficção Científica', capaUrl: null, avaliacaoMedia: 4.8, totalAvaliacoes: 521, livroDoMes: false, disponivel: true },
        { id: 4, titulo: 'Memórias Póstumas de Brás Cubas', autor: 'Machado de Assis', descricao: 'Narrado por um defunto autor, um clássico do realismo brasileiro.', categoria: 'Literatura Brasileira', capaUrl: null, avaliacaoMedia: 4.3, totalAvaliacoes: 89, livroDoMes: false, disponivel: true },
        { id: 5, titulo: 'Harry Potter e a Pedra Filosofal', autor: 'J.K. Rowling', descricao: 'O início da saga do jovem bruxo Harry Potter e sua jornada em Hogwarts.', categoria: 'Fantasia', capaUrl: null, avaliacaoMedia: 4.9, totalAvaliacoes: 987, livroDoMes: false, disponivel: true },
        { id: 6, titulo: 'Sapiens', autor: 'Yuval Noah Harari', descricao: 'Uma breve história da humanidade desde a pré-história até o presente.', categoria: 'História', capaUrl: null, avaliacaoMedia: 4.6, totalAvaliacoes: 445, livroDoMes: false, disponivel: true },
    ];

    const MOCK_AVALIACOES = {
        1: [
            { id: 1, user: { nome: 'Ana Costa' }, nota: 5, comentario: 'Obra-prima! Machado de Assis é incrível.', criadoEm: '2024-03-10' },
            { id: 2, user: { nome: 'Pedro Lima' }, nota: 4, comentario: 'Clássico obrigatório. A escrita é densa mas vale.', criadoEm: '2024-02-22' },
        ],
        2: [
            { id: 3, user: { nome: 'Carla Souza' }, nota: 5, comentario: 'Transformador! Li três vezes.', criadoEm: '2024-01-15' },
        ],
    };

    const MOCK_HISTORICO = [
        { id: 1, livro: MOCK_LIVROS[1], status: 'DEVOLVIDO', dataReserva: '2024-01-10T10:00:00', dataEmprestimo: '2024-01-12', dataDevolucao: '2024-01-26' },
        { id: 2, livro: MOCK_LIVROS[2], status: 'EMPRESTADO', dataReserva: '2024-03-01T10:00:00', dataEmprestimo: '2024-03-03', dataDevolucao: null },
        { id: 3, livro: MOCK_LIVROS[0], status: 'RESERVADO', dataReserva: '2024-03-15T10:00:00', dataEmprestimo: null, dataDevolucao: null },
    ];

    const MOCK_NOTIFICACOES = [
        { id: 1, mensagem: 'Sua reserva de "1984" foi confirmada!', tipo: 'reserva', lida: false, criadoEm: '2024-03-15T14:30:00' },
        { id: 2, mensagem: 'Prazo de devolução de "O Alquimista" em 3 dias.', tipo: 'prazo', lida: false, criadoEm: '2024-03-14T09:00:00' },
        { id: 3, mensagem: 'Seu livro "Meu Diário" foi aprovado e publicado!', tipo: 'publicacao', lida: true, criadoEm: '2024-03-10T16:00:00' },
    ];

    const MOCK_PUBLICACOES = [
        { id: 1, titulo: 'Meu Diário de Viagem', autor: 'João Silva', genero: 'Crônica', status: 'APROVADO', enviadoEm: '2024-02-20T10:00:00' },
        { id: 2, titulo: 'O Segredo das Estrelas', autor: 'João Silva', genero: 'Ficção Científica', status: 'EM_ANALISE', enviadoEm: '2024-03-12T10:00:00' },
    ];

    // ── API PÚBLICA ──────────────────────────────────────────────────────────
    return {
        // AUTH
        async login(email, senha) {
            if (MOCK) {
                if (email === 'admin@librify.com' && senha === 'Admin123')
                    return { token: 'mock-admin-token', id: 1, nome: 'Administrador', email, role: 'ADMIN' };
                if (email === 'user@librify.com' && senha === 'User123!')
                    return { token: 'mock-user-token', id: 2, nome: 'João Silva', email, role: 'USER' };
                throw new Error('Email ou senha incorretos');
            }
            return req('POST', '/auth/login', { email, senha });
        },

        async cadastrar(nome, email, senha) {
            if (MOCK) return { mensagem: 'Cadastro realizado com sucesso' };
            return req('POST', '/auth/cadastro', { nome, email, senha });
        },

        async recuperarSenha(email) {
            if (MOCK) return { mensagem: 'Instruções de recuperação enviadas para seu email' };
            return req('POST', '/auth/recuperar-senha', { email });
        },

        // LIVROS
        async getLivros(busca, categoria) {
            if (MOCK) {
                let lista = [...MOCK_LIVROS];
                if (busca) lista = lista.filter(l =>
                    l.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                    l.autor.toLowerCase().includes(busca.toLowerCase()));
                if (categoria) lista = lista.filter(l =>
                    l.categoria.toLowerCase() === categoria.toLowerCase());
                return lista;
            }
            const params = new URLSearchParams();
            if (busca) params.append('busca', busca);
            if (categoria) params.append('categoria', categoria);
            return req('GET', `/livros?${params}`);
        },

        async getLivro(id) {
            if (MOCK) {
                const livro = MOCK_LIVROS.find(l => l.id === Number(id));
                if (!livro) throw new Error('Livro não encontrado');
                return livro;
            }
            return req('GET', `/livros/${id}`);
        },

        async getLivroDoMes() {
            if (MOCK) return MOCK_LIVROS.find(l => l.livroDoMes) || null;
            return req('GET', '/livros/livro-do-mes').catch(() => null);
        },

        // AVALIAÇÕES
        async getAvaliacoes(livroId) {
            if (MOCK) return MOCK_AVALIACOES[livroId] || [];
            return req('GET', `/avaliacoes/livro/${livroId}`);
        },

        async avaliar(livroId, nota, comentario) {
            if (MOCK) return { id: Date.now(), nota, comentario };
            return req('POST', `/avaliacoes/livro/${livroId}`, { nota, comentario });
        },

        // RESERVAS
        async getHistorico() {
            if (MOCK) return MOCK_HISTORICO;
            return req('GET', '/reservas/historico');
        },

        async getAtivos() {
            if (MOCK) return MOCK_HISTORICO.filter(r => r.status === 'RESERVADO' || r.status === 'EMPRESTADO');
            return req('GET', '/reservas/ativos');
        },

        async reservar(livroId) {
            if (MOCK) return { id: Date.now(), status: 'RESERVADO' };
            return req('POST', `/reservas/livro/${livroId}`);
        },

        // PUBLICAÇÕES
        async getMinhasPublicacoes() {
            if (MOCK) return MOCK_PUBLICACOES;
            return req('GET', '/publicacoes/minhas');
        },

        async publicar(dados) {
            if (MOCK) return { id: Date.now(), ...dados, status: 'EM_ANALISE' };
            return req('POST', '/publicacoes', dados);
        },

        // NOTIFICAÇÕES
        async getNotificacoes() {
            if (MOCK) return MOCK_NOTIFICACOES;
            return req('GET', '/notificacoes');
        },

        async marcarNotifsLidas() {
            if (MOCK) return {};
            return req('PUT', '/notificacoes/marcar-lidas');
        },

        // ADMIN
        async adminGetLivros() {
            if (MOCK) return MOCK_LIVROS;
            return req('GET', '/livros');
        },

        async adminCriarLivro(dados) {
            if (MOCK) return { id: Date.now(), ...dados };
            return req('POST', '/admin/livros', dados);
        },

        async adminEditarLivro(id, dados) {
            if (MOCK) return { id, ...dados };
            return req('PUT', `/admin/livros/${id}`, dados);
        },

        async adminExcluirLivro(id) {
            if (MOCK) return {};
            return req('DELETE', `/admin/livros/${id}`);
        },

        async adminGetPendentes() {
            if (MOCK) return MOCK_PUBLICACOES.filter(p => p.status === 'EM_ANALISE');
            return req('GET', '/admin/publicacoes/pendentes');
        },

        async adminAvaliarPublicacao(id, status) {
            if (MOCK) return { id, status };
            return req('PUT', `/admin/publicacoes/${id}/status`, { status });
        },

        async adminDefinirLivroDoMes(id) {
            if (MOCK) return {};
            return req('PUT', `/admin/livros/${id}/livro-do-mes`);
        },
    };
})();
