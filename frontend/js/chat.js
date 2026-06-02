// RF17 – Chat com Assistente Virtual
if (!Auth.exigirLogin()) throw new Error('redirect');

const messages = document.getElementById('chatMessages');
const input = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

// Respostas automáticas do assistente (RF17.1)
const RESPOSTAS = [
    { pattern: /olá|oi|boa/i, resp: 'Olá! 👋 Sou o assistente da Librify. Como posso ajudar você hoje?' },
    { pattern: /reserv/i, resp: 'Para reservar um livro, acesse o catálogo, escolha o livro desejado e clique em "Reservar livro".' },
    { pattern: /devolu/i, resp: 'Os prazos de devolução são de 14 dias a partir do empréstimo. Você pode ver os detalhes no Histórico.' },
    { pattern: /publicar|enviar livro/i, resp: 'Para publicar seu livro, acesse a aba "Publicar", preencha as informações e envie o PDF para avaliação.' },
    { pattern: /catálogo|livros/i, resp: 'No catálogo você encontra todos os nossos livros. Você pode buscar por título, autor ou filtrar por categoria!' },
    { pattern: /senha|login/i, resp: 'Problemas com acesso? Você pode redefinir sua senha na tela de login, clicando em "Esqueceu a senha?".' },
    { pattern: /notificaç/i, resp: 'Você pode ver todas as suas notificações clicando no ícone 🔔 na tela inicial.' },
    { pattern: /obrigad/i, resp: 'De nada! 😊 Se precisar de mais ajuda, é só perguntar.' },
];

function botResponder(texto) {
    const match = RESPOSTAS.find(r => r.pattern.test(texto));
    return match?.resp || 'Entendi! Para mais detalhes, consulte nossa equipe de suporte em suporte@librify.com 😊';
}

function addMsg(texto, tipo) {
    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const div = document.createElement('div');
    div.className = `msg ${tipo}`;
    div.innerHTML = `${texto}<div class="msg-time">${now}</div>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
    const div = document.createElement('div');
    div.id = 'typing';
    div.className = 'typing-indicator';
    div.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

function removeTyping() {
    document.getElementById('typing')?.remove();
}

async function enviarMensagem() {
    const texto = input.value.trim();
    if (!texto) return;

    addMsg(texto, 'user');
    input.value = '';
    sendBtn.disabled = true;
    showTyping();

    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
    removeTyping();
    addMsg(botResponder(texto), 'bot');
    sendBtn.disabled = false;
    input.focus();
}

sendBtn.addEventListener('click', enviarMensagem);

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviarMensagem(); }
});

// Mensagem inicial
setTimeout(() => {
    addMsg('Olá! 👋 Sou o assistente virtual da Librify. Como posso ajudar você hoje?', 'bot');
}, 400);
