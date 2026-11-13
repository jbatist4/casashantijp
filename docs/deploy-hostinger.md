# Checklist de Deploy — Hostinger (Hospedagem Compartilhada)

O site agora é **100% estático** (HTML/CSS/JS) — não precisa de WordPress, PHP,
banco de dados, plugins nem instalador. Basta enviar os arquivos.

## 1. O que enviar

Envie **todo o conteúdo da raiz do projeto** para `public_html/` (a raiz do seu
domínio na Hostinger), preservando a estrutura de pastas:

```
public_html/
├── index.html
├── evento.html
├── eventos/
├── galeria/
├── grade-horarios/
├── locacao/
├── sobre/
├── assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── data/
```

**NÃO envie**: `node_modules/`, `package.json`, `package-lock.json`,
`assets/src/` — esses arquivos são apenas para gerar o CSS durante o
desenvolvimento e não são usados pelo site no ar.

## 2. Como enviar

**Opção A — File Manager do hPanel:**
1. Compacte os arquivos/pastas acima (sem `node_modules`) em um `.zip`.
2. No hPanel, abra **File Manager** → navegue até `public_html/`.
3. Faça upload do `.zip` e extraia o conteúdo direto em `public_html/`
   (os arquivos `index.html`, `assets/`, etc. devem ficar na raiz, não dentro
   de uma subpasta extra).

**Opção B — FTP (FileZilla, etc.):**
1. Conecte usando as credenciais de FTP do hPanel.
2. Envie o conteúdo da raiz do projeto (sem `node_modules`) para `public_html/`.

## 3. Domínio e SSL

1. Em **Domínios**, aponte o domínio para a hospedagem (DNS/Nameservers).
2. Ative o **SSL gratuito** (Let's Encrypt) em **Segurança → SSL**.
3. Acesse `https://seudominio.com.br` e confirme que o cadeado aparece.

## 4. Testes finais

- [ ] Navegar por todas as páginas: `/`, `/grade-horarios/`, `/eventos/`,
  `/galeria/`, `/locacao/`, `/sobre/`.
- [ ] Testar os botões de WhatsApp em mobile e desktop.
- [ ] Cadastrar um evento de teste em `assets/data/eventos.json` (ver
  [`docs/como-adicionar-eventos.md`](como-adicionar-eventos.md)) e confirmar que
  ele aparece na Home e em `/eventos/`.
- [ ] Rodar o Google Lighthouse (Performance/SEO/Acessibilidade) em mobile.

## Atualizações futuras

Para atualizar o site depois do deploy, basta editar os arquivos localmente
(HTML para conteúdo fixo, `assets/data/eventos.json` para eventos/galeria) e
reenviar os arquivos alterados pelo File Manager ou FTP — não há cache de banco
de dados ou plugin para limpar.
