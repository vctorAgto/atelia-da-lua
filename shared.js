// Dados e funções compartilhadas entre index.html (vitrine) e admin.html (painel).

const CATEGORIES = ['Crochê', 'Bijuteria', 'Decoração', 'Outros'];

const CAT_KEY = {
  'Crochê': 'croche',
  'Bijuteria': 'bijuteria',
  'Decoração': 'decoracao',
  'Outros': 'outros'
};

const ICONS = {
  'Crochê': '🧶',
  'Bijuteria': '💍',
  'Decoração': '🕯️',
  'Outros': '🌙'
};

function utf8ToBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return btoa(binary);
}

function base64ToUtf8(b64) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder('utf-8').decode(bytes);
}

function formatPreco(preco) {
  const n = Number(preco) || 0;
  return 'R$ ' + n.toFixed(2).replace('.', ',');
}

function formatDateTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// Redimensiona/comprime a foto no navegador antes de enviar pro GitHub — a API de
// conteúdo do GitHub só aceita arquivos de até ~1MB, e fotos de celular passam disso fácil.
function resizeImageToJpegBase64(file, maxDim = 1280, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Não foi possível ler a imagem.'));
    reader.onload = () => {
      img.onerror = () => reject(new Error('Arquivo de imagem inválido.'));
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl.split(',')[1]);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function linkWhatsappProduto(numero, produto) {
  const preco = produto.preco ? ` - ${formatPreco(produto.preco)}` : '';
  const msg = `Olá! Tenho interesse neste mimo: *${produto.nome}*${preco}\n\nAinda está disponível?`;
  return `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
}
