// RF12 – Publicar + RF13 – Status
if (!Auth.exigirLogin()) throw new Error('redirect');

const alertEl = document.getElementById('alertMsg');
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('arquivoInput');
const uploadText = document.getElementById('uploadText');

// Upload drag-and-drop (RF12.1)
uploadArea.addEventListener('click', () => fileInput.click());
uploadArea.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('drag-over'); });
uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('drag-over'));
uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    handleFile(e.dataTransfer.files[0]);
});
fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

function handleFile(file) {
    if (!file) return;
    if (file.type !== 'application/pdf') {
        showAlert(alertEl, 'Apenas arquivos PDF são aceitos');
        return;
    }
    uploadArea.classList.add('has-file');
    uploadText.textContent = `✅ ${file.name}`;
}

// RF12.2 – Enviar
document.getElementById('publicarForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert(alertEl);

    const dados = {
        titulo: document.getElementById('titulo').value.trim(),
        autor: document.getElementById('autor').value.trim(),
        genero: document.getElementById('genero').value,
        descricao: document.getElementById('descricao').value.trim(),
        arquivoUrl: fileInput.files[0] ? fileInput.files[0].name : null,
    };

    if (!dados.titulo || !dados.autor) {
        showAlert(alertEl, 'Título e autor são obrigatórios');
        return;
    }

    const btn = document.getElementById('btnEnviar');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    try {
        await Api.publicar(dados);
        showAlert(alertEl, 'Livro enviado para avaliação com sucesso! 🎉', 'success');
        e.target.reset();
        uploadArea.classList.remove('has-file');
        uploadText.textContent = 'Clique para selecionar ou arraste o PDF aqui';
        await carregarMinhasPublicacoes();
    } catch (err) {
        showAlert(alertEl, err.message || 'Erro ao enviar publicação');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Enviar para avaliação';
    }
});

// RF13 – Status das publicações
const STATUS_LABEL = { EM_ANALISE: 'Em análise', APROVADO: 'Aprovado', REJEITADO: 'Rejeitado' };
const STATUS_ICON  = { EM_ANALISE: '⏳', APROVADO: '✅', REJEITADO: '❌' };
const STATUS_TAG   = { EM_ANALISE: 'tag-yellow', APROVADO: 'tag-green', REJEITADO: 'tag-red' };

async function carregarMinhasPublicacoes() {
    const lista = await Api.getMinhasPublicacoes();
    const container = document.getElementById('minhasPublicacoes');

    if (!lista.length) {
        container.innerHTML = '<div class="empty-state"><div class="icon">📝</div><p>Nenhuma publicação enviada ainda.</p></div>';
        return;
    }

    container.innerHTML = lista.map(p => `
        <div class="status-item">
            <div class="status-icon">${STATUS_ICON[p.status]}</div>
            <div class="status-info">
                <div class="status-titulo">${p.titulo}</div>
                <div class="status-data">${p.genero} • ${formatDate(p.enviadoEm)}</div>
            </div>
            <span class="tag ${STATUS_TAG[p.status]}">${STATUS_LABEL[p.status]}</span>
        </div>
    `).join('');
}

carregarMinhasPublicacoes();
