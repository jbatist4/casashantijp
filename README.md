# Casa Shanti — Site Institucional

Site institucional da **Casa Shanti**, espaço de yoga e bem-estar localizado na Bessa, João Pessoa – PB. O projeto é um site estático com HTML semântico, CSS compilado via Tailwind CSS v4 e JavaScript vanilla, hospedado na Hostinger.

🔗 **Repositório GitHub:** [github.com/jbatist4/casashantijp](https://github.com/jbatist4/casashantijp)

---

## Visão Geral

| Item | Detalhe |
|---|---|
| Tipo | Site estático (sem framework, sem build server) |
| Deploy | Upload de `.zip` no painel da Hostinger |
| Idioma | Português (pt-BR) |
| Analytics | Google Analytics 4 — `G-5V7VY43KMC` |

### Páginas

| Rota | Descrição |
|---|---|
| `/` | Home — hero, próximo evento, modalidades, espaço, links rápidos |
| `/grade-horarios/` | Grade de aulas, horários e planos de mensalidade |
| `/eventos/` | Lista de eventos futuros e passados |
| `/galeria/` | Galeria de memórias por álbum |
| `/locacao/` | Locação de sala e salão para terapeutas e eventos |
| `/recursos/` | Ferramentas interativas para a prática (Japamala, Pranayama, Brahma Muhurta, Respiração Coletiva, Shavasana) |
| `/sobre/` | História, equipe e localização |
| `/evento.html` | Detalhe dinâmico de evento (parâmetro `?slug=`) |

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| HTML5 | — | Estrutura de todas as páginas |
| [Tailwind CSS](https://tailwindcss.com/) | v4 | Estilização utilitária; compilado via CLI |
| CSS customizado | — | Paleta de cores extraída da logo (variáveis CSS em `style.css`) |
| JavaScript vanilla | ES5/ES6 | Interatividade sem dependências de runtime |
| [Web Audio API](https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Audio_API) | — | Sons binaurais e bipes nas ferramentas de prática |
| [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) | — | Fonte display (títulos) — Google Fonts |
| [Poppins](https://fonts.google.com/specimen/Poppins) | — | Fonte sans-serif (corpo) — Google Fonts |
| Node.js / npm | — | Apenas para compilar o Tailwind (devDependency) |

### Estrutura de arquivos

```
casashantijp/
├── index.html                      # Home
├── evento.html                     # Detalhe de evento (dinâmico via JS)
├── grade-horarios/index.html
├── eventos/index.html
├── galeria/index.html
├── locacao/index.html
├── recursos/index.html
├── sobre/index.html
├── assets/
│   ├── css/
│   │   └── style.css               # CSS compilado (Tailwind + overrides de paleta)
│   ├── src/
│   │   └── input.css               # Entrada do build Tailwind
│   ├── js/
│   │   ├── main.js                 # Menu mobile
│   │   ├── eventos.js              # Renderização de eventos/galeria via JSON
│   │   └── gallery-lightbox-v2.js  # Lightbox de imagens
│   ├── images/                     # Todas as imagens do site
│   └── data/
│       └── eventos.json            # Dados de eventos e álbuns de galeria
└── package.json
```

---

## Como Rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior (apenas para compilar o CSS)
- Qualquer servidor HTTP estático para visualizar localmente (o `fetch()` de `eventos.json` exige um servidor — não funciona abrindo o HTML diretamente no navegador)

### 1. Instalar dependências

```bash
npm install
```

### 2. Compilar o CSS

```bash
npm run build
```

O arquivo compilado será gerado em `assets/css/style.css`.

> Durante o desenvolvimento, use `npm run watch` para recompilar automaticamente ao salvar alterações nos arquivos HTML ou em `assets/src/input.css`.

### 3. Servir localmente

```bash
# Com npx (sem instalação prévia)
npx serve .

# Com Python
python -m http.server 3000

# Com VS Code — extensão Live Server (botão "Go Live")
```

Acesse `http://localhost:3000` no navegador.

---

## Deploy na Hostinger

1. Execute `npm run build` para garantir que o CSS está atualizado.
2. Gere o `.zip` do projeto excluindo: `node_modules/`, `.git/`, ZIPs anteriores e arquivos de desenvolvimento.
3. No painel da Hostinger, acesse **Gerenciador de Arquivos → public_html**, faça upload e extraia o `.zip`.

> **Atenção:** o ZIP deve ser criado com barras normais `/` nas entradas — o servidor Linux da Hostinger não reconhece barras invertidas `\` na estrutura de pastas. No Windows, use `System.IO.Compression.ZipFile` em vez de `Compress-Archive`.

---

## Dados de Eventos e Galeria

O arquivo `assets/data/eventos.json` centraliza todos os eventos e álbuns de fotos. O script `assets/js/eventos.js` lê esse arquivo em tempo de execução e renderiza dinamicamente:

- O card de "Próximo Evento" na Home
- A grade de eventos em `/eventos/`
- Os álbuns em `/galeria/`
- O detalhe individual em `/evento.html?slug=...`

Para adicionar um evento ou álbum, edite `eventos.json` seguindo a estrutura dos registros existentes.

---

## Autor

**Jorge Batista**  
* Desenvolvedor Web & Consultor de Soluções Digitais  
* **GitHub:** [github.com/jbatist4](https://github.com/jbatist4)  
* **LinkedIn:** [linkedin.com/in/jbatist4321](https://www.linkedin.com/in/jbatist4321/)  
* **E-mail:** jbatist4321@gmail.com