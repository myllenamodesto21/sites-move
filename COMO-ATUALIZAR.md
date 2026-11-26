# Sites Move: como atualizar

Três rotas independentes no mesmo projeto, com componentes compartilhados:

| Rota | Página | Arquivo principal |
| --- | --- | --- |
| `/` | Site oficial (carro-chefe: Gestão de Redes) | `src/paginas/PaginaInicio.tsx` |
| `/planejamento/` | Página de vendas do Planejamento (Black e regular na mesma URL) | `src/paginas/planejamento/PaginaPlanejamento.tsx` |
| `/links/` | Microsite da bio | `src/paginas/PaginaLinks.tsx` |
| `/black/` | Atalho que redireciona para `/planejamento/`, preservando a origem | `src/entradas/black.tsx` |
| `/sob-medida/` | Página de vendas dos sites, catálogos e apps sob medida (HTML, CSS e JS puros, fora do React) | `public/sob-medida/` |

Stack: Vite + React + TypeScript + Tailwind 4 (mesmas cores, fontes e regras de texto do `sistema-move`). Site estático: publica em qualquer hospedagem, inclusive Vercel.

```bash
npm install
npm run dev            # desenvolvimento
npm run build          # produção, em dist/
npm run build:previa   # prévia com caminhos relativos, em dist-previa/
```

## 1. Oferta, preços e datas: `src/config/oferta.ts`

- `regular.preco` e `regular.checkout`: preço e link do produto regular.
- `campanha.preco`, `campanha.inicio`, `campanha.fim`: condição da Black. Datas sempre com `-03:00` (horário de Brasília, o único que aparece nos sites). O início atual é 26/11 à 0h e o fim é 04/12 às 23h59. Ao mudar o início, mude também os textos de `estados.pre`.
- `campanha.checkout`: link do produto da Black.
- `campanha.agendaEsgotada: true` pausa a compra e troca o botão por contato.
- `campanha.ativa: false` desliga toda comunicação de campanha.
- `equipe.texto`: texto do bloco da equipe. `equipe.repasse.confirmado: true` mostra a regra do repasse (só enquanto a Black estiver ativa).
- `entrega`, `papelMove`, `papelCliente`, `prazo`: escopo exibido na página.

A página escolhe o estado sozinha pelo horário de Brasília:

| Estado | Quando | O que muda |
| --- | --- | --- |
| Antes | antes de `inicio` | Anuncia a data de abertura, sem venda |
| Black | entre `inicio` e `fim` | R$ 1.000, prazo, botão de compra da Black |
| Agenda preenchida | `agendaEsgotada: true` | Sem compra, botão de contato |
| Depois | após `fim` | Some toda menção à Black; R$ 1.800 e checkout regular |

O site oficial (faixa no topo) e a bio (card de destaque) seguem o mesmo estado.

Sem link de checkout, o botão aparece desativado com o aviso "Configuração pendente". Nenhum link falso é criado.

## 2. Contatos e serviços: `src/config/site.ts`

- `contatos.whatsapp`: número oficial só com dígitos (ex.: `5592900000000`). Sem ele, o contato mostra a mensagem pronta para copiar e o aviso de pendência.
- `contatos.instagram`, `email`, `privacidade`, `termos`.
- `mensagensWhatsApp`: mensagem pronta de cada serviço.
- `servicos`: textos de cada serviço no site oficial.
- `depoimento`: vídeo da Dra. Tayssa (fica oculto até `ativo: true` com arquivo e legenda).
- `previa.permitirSimulacao`: liga sozinha só no build de prévia (`npm run build:previa`). No site publicado (`npm run build`, o que a Vercel roda) não há simulação pela URL nem botão "Prévia".

## 3. Imagens: `src/config/site.ts` → `imagens`

Cada espaço tem um código (A01 foto da Andreza, A13 apresentação, A14 equipe, M01 trabalho da Move, G01 Gestão). Coloque o arquivo autorizado em `public/imagens/`, preencha `src`, `largura` e `altura`. Prefira `.webp` com até 1600 px de largura. As imagens carregam sob demanda.

## 4. Amostras do case Brasilê: `src/config/amostras.ts`

- `autorizacao`: troque `"pendente"` por `"autorizado"` quando a Andreza autorizar o recorte. Sem autorização, a amostra aparece com o selo "aguardando autorização de uso".
- `naOferta`: diz se o material integra o pacote (`incluido`, `parcial`, `fora`) e o texto explicativo.
- Os textos vêm de copies aprovadas pela cliente em 23/11/2026. Não inclua contatos, valores, financeiro ou dados de clientes.

## 5. Marca e fontes

- Logos e grafismo da IDV em `public/marca/` (exportados dos arquivos oficiais).
- Fontes oficiais: Filson Pro (títulos), Forma DJR Deck (corpo), Espiritu (manuscrita). Hoje usamos Outfit, Inter e Caveat como provisórias. Para trocar, adicione os `@font-face` com os arquivos licenciados em `src/estilos/global.css`; as variáveis `--fonte-*` já chamam os nomes oficiais primeiro.

## 6. Origem do visitante

Parâmetros `utm_*`, `fbclid`, `gclid`, `ref` e `origem` são preservados entre bio, site e oferta (e guardados na visita), seguem para o checkout e entram na mensagem do WhatsApp como "(origem: ...)".

## 7. Sites, catálogos e apps sob medida: `public/sob-medida/`

Página independente (HTML, CSS e JS puros, sem build), copiada como está para `dist/sob-medida/`. Não cita campanha nem desconto: serve para mandar a qualquer empresa.

- Tudo que muda fica em `public/sob-medida/js/config.js`: WhatsApp, mensagem padrão, pacotes, cases, perguntas frequentes e Instagram. Sem prazo nem mensalidade na página: o prazo vem na proposta e o projeto não tem mensalidade. Campo entre colchetes, como `"[PRAZO]"`, fica escondido no site até ser preenchido.
- Cada botão abre o WhatsApp com uma mensagem pronta (geral, por nicho no `data-wa-msg` do `index.html`, por pacote e por dúvida). A origem do visitante (`origem`, `utm_source` ou `ref`) entra no fim como "(origem: ...)". Para saber quem veio de qual envio, mande o link com a origem, por exemplo `moveagencia.com.br/sob-medida/?origem=condominio`.
- Prints dos cases em `public/sob-medida/assets/cases/` (WebP, 600 px de largura). Sem o arquivo, aparece o espaço "Print do case".
- É um app instalável (manifest e service worker próprios, com escopo em `/sob-medida/`). Ao mudar a página, troque `VERSAO` em `public/sob-medida/sw.js` para os celulares pegarem a versão nova.

## 8. Eventos de conversão

`src/lib/medicao.ts` envia eventos para `window.dataLayer` somente se uma ferramenta de análise for instalada: clique no CTA principal, abertura de amostra, início de checkout, abertura de contato, abertura do WhatsApp e escolha de objetivo na bio.

## Antes de publicar

- [ ] Checkout da Black e regular, WhatsApp, Instagram, privacidade e termos preenchidos
- [ ] Autorização da Andreza e imagens reais nos espaços reservados
- [ ] Texto da equipe revisado; repasse confirmado ou mantido oculto
- [ ] Descrições dos quatro pilares do Método Move validadas (`PILARES` em `PaginaInicio.tsx`)
- [ ] Testes de compra aprovada, pendente e recusada no checkout, sem compra real

## Direção de arte e movimento

- Movimento guiado pela rolagem em `src/componentes/Movimento.tsx`: `useMovimento` (variável `--p` nos blocos com `data-rolagem`), `TituloCinetico`, `TextoAceso`, `Letreiro`, `FundoGrafismo` (grafismo de ponta a ponta) e `MGigante` (o M da IDV em escala de cartaz). Classes em `src/estilos/global.css` (`paralaxe`, `preencher-x/y`, `acender`, `textura`, `girar`). Com "reduzir movimento" no aparelho, tudo fica parado e legível.
- Variações de cor do grafismo e do M em `public/marca/` (`grafismo-{azul,bege,areia,terracota,realce,marinho}`, `m-gigante-*`, `m-inteiro-*`), geradas dos arquivos oficiais. Regra: tom sobre tom (linha um pouco mais clara ou mais escura que o fundo) atrás de texto; contraste forte só onde não há texto.
- O Método Move fica dentro da seção de Gestão (`#metodo`), não como seção à parte.

## Publicação

O repositório `myllenamodesto21/sites-move` está ligado à Vercel: cada envio para a `main` publica o site. A Vercel roda `npm run build` e serve a pasta `dist`. Checkout na Eduzz (o mesmo link para o preço regular e a Black; o desconto da Black entra pelo cupom `campanha.cupom`). Testes de navegação em `testes/fluxos.cjs` (rodam sobre o build de prévia servido em http://localhost:8765/a/b/site/).
