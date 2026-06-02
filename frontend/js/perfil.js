// RF15 – Perfil
if (!Auth.exigirLogin()) throw new Error('redirect');

const user = Auth.getUser();

document.getElementById('perfilNome').textContent = user.nome;
document.getElementById('perfilEmail').textContent = user.email;
document.getElementById('perfilAvatar').textContent = user.nome.charAt(0).toUpperCase();
