// RF03 – Recuperação de Senha
const form = document.getElementById('recuperarForm');
const alertEl = document.getElementById('alertMsg');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert(alertEl);

    const email = document.getElementById('email').value.trim();

    if (!email) {
        showAlert(alertEl, 'Preencha o campo de email');
        return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    try {
        // RF03.1 e RF03.2
        const data = await Api.recuperarSenha(email);
        showAlert(alertEl, data.mensagem || 'Instruções enviadas para seu email', 'success');
        form.reset();
    } catch (err) {
        showAlert(alertEl, err.message || 'Erro ao processar solicitação');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Enviar instruções';
    }
});
