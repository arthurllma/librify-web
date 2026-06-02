// RF16 – Configurações
if (!Auth.exigirLogin()) throw new Error('redirect');

// RF16.2 – Sair da conta
document.getElementById('btnSair').addEventListener('click', () => {
    if (confirm('Deseja sair da conta?')) {
        Auth.logout();
    }
});

// RF16.1 – Alterar senha (placeholder)
document.getElementById('btnAlterarSenha').addEventListener('click', () => {
    alert('Funcionalidade de alteração de senha será implementada em breve.');
});
