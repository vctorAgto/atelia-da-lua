# Ateliê da Lua — Vitrine online

Site de vitrine hospedado de graça no GitHub Pages, sem servidor nenhum.

- [index.html](index.html) — vitrine pública, só leitura. Qualquer cliente pode ver e clicar no WhatsApp. Sem cadastro, sem senha.
- [admin.html](admin.html) — painel de edição. Só quem tem a senha de acesso consegue cadastrar/editar/remover produtos e fotos.
- [data.json](data.json) — onde os produtos ficam guardados (é commitado no repositório).
- [style.css](style.css) / [shared.js](shared.js) — código compartilhado entre as duas telas.
- `images/` — fotos dos produtos, enviadas pelo próprio painel (criada automaticamente no primeiro upload).

Repositório: https://github.com/vctorAgto/atelia-da-lua · Site: https://vctoragto.github.io/atelia-da-lua/

⚠️ **Importante:** como o repositório é público (necessário pro GitHub Pages gratuito), os produtos e fotos do
catálogo ficam **publicamente visíveis** pra qualquer um com o link — o que é natural pra vitrine de uma loja
(são as mesmas informações que já aparecem no site).

## Publicando pela primeira vez

1. Se o repositório no GitHub ainda não existir, crie um vazio em github.com/new (mesmo nome, público).
2. No terminal, dentro desta pasta: `git init && git add . && git commit -m "Vitrine inicial"`, depois
   `git remote add origin https://github.com/vctorAgto/atelia-da-lua.git` e `git push -u origin main`.
3. No GitHub, vá em **Settings → Pages**, selecione a branch `main` e a pasta `/ (root)`.
4. Confirme que o repositório está público (Settings → General → Danger Zone → Change visibility) — sem isso o
   Pages gratuito não ativa.
5. Depois de alguns minutos o site estará em `https://vctoragto.github.io/atelia-da-lua/`.

## Acesso do painel: nome + senha

O painel não usa contas individuais de verdade — isso exigiria um servidor (o GitHub Pages é 100% estático e
gratuito, sem backend). Na prática, existe **uma senha de acesso única**, compartilhada com quem for atualizar
o catálogo. Por baixo dos panos essa senha é um token do GitHub, mas quem só vai cadastrar produtos não
precisa saber disso — só preenche "Seu nome" (aparece no histórico de alterações) e "Senha de acesso".

### Criar/trocar a senha de acesso

1. Vá em **github.com → foto de perfil → Settings → Developer settings → Personal access tokens → Fine-grained tokens**.
2. Clique em "Generate new token".
3. Em "Repository access", selecione **Only select repositories** e escolha só o `atelia-da-lua`.
4. Em "Permissions → Repository permissions", defina **Contents: Read and write**. Não precisa de mais nenhuma permissão.
5. Gere o token e copie (começa com `github_pat_...`) — essa string é a "senha de acesso" do painel.
   Você não vê ela de novo depois, então guarde num lugar seguro.
6. Se precisar revogar o acesso de alguém, revogue esse token (Settings → Developer settings → Fine-grained
   tokens → Revoke) e gere um novo pra quem continuar editando.

### Usando o painel

1. Abra `https://vctoragto.github.io/atelia-da-lua/admin.html`.
2. Preencha **Seu nome** e cole a **Senha de acesso**, clique em "Entrar".
3. Em **Configurações da vitrine**, cole o número do WhatsApp que recebe os pedidos (código do país + DDD +
   número, só dígitos — ex: `5542999039243`).
4. Clique em **"+ Novo produto"**, preencha nome/preço/categoria/foto e confirme.
5. Clique em **"Salvar no GitHub"** — isso grava tudo num commit. A vitrine pública atualiza em ~1 minuto.

A senha fica salva só no navegador de quem configurou (localStorage) — nunca é enviada pro repositório.

## Fotos dos produtos

Ao escolher uma foto no painel, ela é redimensionada automaticamente no navegador (pra caber no limite de
tamanho da API do GitHub) e enviada como um arquivo dentro de `images/`. Ao trocar ou remover a foto de um
produto, a foto antiga é apagada do repositório automaticamente.
