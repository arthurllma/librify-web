// RF01 – Login
const form = document.getElementById('loginForm');
const alertEl = document.getElementById('alertMsg');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert(alertEl);

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    // RF01.4 – campos obrigatórios
    if (!email || !senha) {
        showAlert(alertEl, 'Preencha todos os campos');
        return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Entrando...';

    try {
        // RF01.3 – validação de credenciais
        const data = await Api.login(email, senha);
        Auth.salvar(data);

        if (data.role === 'ADMIN') {
            window.location.href = 'pages/admin/admin-livros.html';
        } else {
            window.location.href = 'pages/home.html';
        }
    } catch (err) {
        showAlert(alertEl, err.message || 'Email ou senha incorretos');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Entrar';
    }
});
