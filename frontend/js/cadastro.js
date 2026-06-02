// RF02 – Cadastro
Auth.exigirLogin() && (window.location.href = '../pages/home.html'); // já logado → home

const form = document.getElementById('cadastroForm');
const alertEl = document.getElementById('alertMsg');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert(alertEl);

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    // RF01.4 estendido
    if (!nome || !email || !senha) {
        showAlert(alertEl, 'Preencha todos os campos');
        return;
    }

    // RF02.3 – validação de senha
    const senhaRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!senhaRegex.test(senha)) {
        showAlert(alertEl, 'A senha deve ter pelo menos 8 caracteres, incluindo um número e uma letra maiúscula');
        return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Cadastrando...';

    try {
        await Api.cadastrar(nome, email, senha);
        showAlert(alertEl, 'Cadastro realizado! Redirecionando para o login...', 'success');
        setTimeout(() => { window.location.href = '../index.html'; }, 1500);
    } catch (err) {
        // RF02.2 – email já cadastrado
        showAlert(alertEl, err.message || 'Erro ao realizar cadastro');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Cadastrar';
    }
});
