# Como adicionar/editar Eventos

O site é estático (HTML/CSS/JS puro). Os Eventos (próximos e realizados/galeria)
são controlados por um único arquivo:

```
assets/data/eventos.json
```

As páginas Home (`/`), `/eventos/`, `/galeria/` e `/evento.html?slug=...` leem esse
arquivo via JavaScript (`assets/js/eventos.js`) e montam os cards e a página de
detalhe automaticamente. Para adicionar, editar ou remover um evento, basta editar
este JSON e subir o arquivo atualizado para o servidor — não é necessário criar
páginas HTML novas.

## Formato de cada evento

```json
{
  "slug": "shantifloat-2-edicao",
  "title": "Shantifloat - 2ª Edição Oficial",
  "status": "proximo",
  "data": "2026-07-18",
  "hora": "19:00",
  "valor": 70,
  "local": "Piscina iluminada da Casa Shanti",
  "vagas_limitadas": true,
  "mensagem_whatsapp": "Olá! Quero me inscrever no Shantifloat - 2ª Edição.",
  "imagem": "/assets/images/flyer-shantifloat.jpg",
  "excerpt": "Uma noite de imersão com flutuação na piscina iluminada, música e meditação.",
  "conteudo": "<p>Texto completo do evento, em HTML simples (parágrafos, listas, etc).</p>",
  "galeria": []
}
```

### Campos

| Campo | Obrigatório | Descrição |
|---|---|---|
| `slug` | Sim | Identificador único usado na URL: `/evento.html?slug=SEU-SLUG`. Use apenas letras minúsculas, números e hífens. |
| `title` | Sim | Título do evento. |
| `status` | Sim | `"proximo"` → aparece na Home e em `/eventos/`. `"realizado"` → aparece em `/galeria/` (com a galeria de fotos, se houver). |
| `data` | Recomendado | Data no formato `AAAA-MM-DD`. Usada para ordenar e exibir por extenso. |
| `hora` | Não | Horário, ex: `"19:00"`. |
| `valor` | Não | Número (sem "R$"), ex: `70` ou `70.5`. Omita ou deixe `""` se não houver valor. |
| `local` | Não | Local do evento. |
| `vagas_limitadas` | Não | `true` para mostrar o selo "Vagas Limitadas" (apenas em eventos `"proximo"`). |
| `mensagem_whatsapp` | Não | Texto pré-preenchido no botão "Reservar via WhatsApp". Se omitido, usa uma mensagem padrão com o título do evento. |
| `imagem` | Não | Caminho da imagem de capa, ex: `/assets/images/flyer-shantifloat.jpg`. Coloque o arquivo em `assets/images/`. |
| `excerpt` | Não | Texto curto exibido no card (Home/`/eventos/`). |
| `conteudo` | Não | Texto completo (HTML) exibido na página de detalhe. |
| `galeria` | Não | Lista de caminhos de imagens (ex: `["/assets/images/evento-foto1.jpg", ...]`), exibidas em `/galeria/evento` quando `status` for `"realizado"`. |

## Exemplo: cadastrar um evento próximo

1. Adicione a foto de capa em `assets/images/`.
2. Adicione um objeto ao array em `assets/data/eventos.json`, com `"status": "proximo"`.
3. Suba `assets/data/eventos.json` (e a imagem) para o servidor.

## Exemplo: mover um evento para a Galeria (depois que aconteceu)

1. Mude `"status"` de `"proximo"` para `"realizado"`.
2. Adicione as fotos do evento em `assets/images/` e liste os caminhos em `"galeria"`.
3. Suba os arquivos atualizados.

## Dicas

- Mantenha as fotos em formato horizontal (paisagem) quando possível, e evite
  arquivos muito grandes (acima de 2-3 MB) para o site carregar rápido.
- O array `eventos.json` pode ficar vazio (`[]`) — nesse caso, as seções de
  "Próximo Evento" e "Eventos" mostram as mensagens padrão de "nenhum evento por
  enquanto".
