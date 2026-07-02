# Ateliê da Lua — Vitrine online

Site de vitrine para o Ateliê da Lua: os clientes veem os produtos e clicam para pedir direto no WhatsApp, sem cadastro. Você (admin) gerencia os produtos e fotos por um painel com usuário e senha.

- **Vitrine (`/`)** — pública, qualquer visitante vê e clica no WhatsApp. Sem login.
- **Painel (`/admin`)** — protegido por login, só você acessa para cadastrar/editar/excluir produtos.

## Rodando localmente

```bash
npm install
npm run dev
```

Copie `.env.example` para `.env.local` e preencha as variáveis (veja abaixo). Depois abra http://localhost:3000.

Sem configurar o Vercel Blob, os produtos e imagens ficam salvos localmente em `./data` e `./public/uploads` — ótimo para testar antes de publicar.

## Publicando na Vercel (deixa o site no ar)

Subir o código no GitHub guarda o projeto, mas quem deixa o site acessível na internet é a hospedagem. Recomendado: **Vercel** (grátis, conecta direto no repositório).

1. Acesse [vercel.com](https://vercel.com), entre com sua conta do GitHub.
2. Clique em **Add New → Project** e importe o repositório `atelia-da-lua`.
3. Antes de clicar em Deploy, vá em **Environment Variables** e adicione:

   | Nome | Valor |
   |---|---|
   | `NEXT_PUBLIC_WHATSAPP_NUMERO` | número completo com código do país e DDD, só números. Ex: `5542999039243` |
   | `ADMIN_USER` | o nome de usuário que você quer usar para entrar no `/admin` |
   | `ADMIN_PASSWORD_HASH` | gerado no passo 4 abaixo |
   | `JWT_SECRET` | qualquer frase longa e aleatória (ex: gere em https://www.uuidgenerator.net/) |

4. Para gerar o `ADMIN_PASSWORD_HASH`, rode localmente (troque `suasenha` pela senha que você quer usar):
   ```bash
   npm run hash-password -- suasenha
   ```
   Copie o texto gerado (começa com `$2b$...`) e cole em `ADMIN_PASSWORD_HASH` na Vercel.

5. Clique em **Deploy**. Depois de publicado, ainda dentro do projeto na Vercel:
   - Vá na aba **Storage** → **Create Database** → **Blob**.
   - Conecte esse Blob store ao projeto (isso adiciona a variável `BLOB_READ_WRITE_TOKEN` automaticamente). É onde ficam guardados os produtos e as fotos cadastradas — sem isso, cada novo deploy apagaria o catálogo.
   - Depois de conectar o Blob, faça um **redeploy** (Deployments → menu "..." → Redeploy) para a variável entrar em vigor.

6. Pronto! O site estará em algo como `https://atelia-da-lua.vercel.app`. Acesse `/admin` para cadastrar os primeiros produtos.

## Atualizando o site depois

Sempre que quiser mudar alguma coisa no código, basta enviar (`git push`) pro GitHub — a Vercel publica a atualização sozinha automaticamente.

Para o dia a dia (cadastrar produto, trocar foto, mudar preço), não precisa mexer no código: é tudo pelo painel `/admin`.
