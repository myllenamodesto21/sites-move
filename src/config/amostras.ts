/**
 * AMOSTRAS DOS ENTREGÁVEIS (case Studio Brasilê)
 *
 * Fonte: apresentação e documentos do Brasilê no Sistema Move (copies aprovadas
 * pela cliente em 23/11/2026). Só entram recortes de texto, sem contatos,
 * valores, financeiro ou dados de clientes.
 *
 * `autorizacao`:
 *  - "autorizado": Andreza autorizou o uso comercial do recorte.
 *  - "pendente": recorte real, aguardando autorização (aparece com aviso).
 *  - "ilustrativa": composição ilustrativa a partir do material real.
 * Ao receber a autorização, troque "pendente" por "autorizado".
 *
 * `naOferta` diz se o material integra o pacote e em qual.
 */

export type Autorizacao = "autorizado" | "pendente" | "ilustrativa";
export type Inclusao = { status: "incluido" | "parcial" | "fora"; texto: string };

export type Amostra = {
  id: "estrategia" | "perfil" | "calendario" | "stories" | "guia";
  nome: string;
  titulo: string;
  resumo: string;
  autorizacao: Autorizacao;
  naOferta: Inclusao;
};

export const amostras: Amostra[] = [
  {
    id: "estrategia",
    nome: "Estratégia",
    titulo: "Do que é verdade sobre o negócio a uma decisão editorial.",
    resumo: "Abra o diagnóstico, a percepção que a marca quer construir e uma decisão que muda o conteúdo.",
    autorizacao: "autorizado",
    naOferta: { status: "incluido", texto: "Integra o pacote do Planejamento Estratégico." },
  },
  {
    id: "perfil",
    nome: "Perfil",
    titulo: "Um perfil organizado. Informação fácil de encontrar.",
    resumo: "Compare a bio atual com a proposta e toque nos destaques e fixados para entender a função de cada um.",
    autorizacao: "autorizado",
    naOferta: {
      status: "parcial",
      texto:
        "A leitura do perfil integra o diagnóstico do Planejamento. A reorganização completa de bio, destaques e fixados é entrega da Jornada do Cliente.",
    },
  },
  {
    id: "calendario",
    nome: "Calendário",
    titulo: "Uma semana planejada, com motivo em cada pauta.",
    resumo: "Abra uma pauta para ver objetivo, formato, materiais e um trecho do roteiro ou do texto.",
    autorizacao: "autorizado",
    naOferta: { status: "incluido", texto: "Integra o Planejamento: 24 pautas em oito semanas, com texto-base e orientação." },
  },
  {
    id: "stories",
    nome: "Stories",
    titulo: "Uma sequência por semana, com uma ideia por tela.",
    resumo: "Navegue por uma sequência montada a partir do guia de Stories do Brasilê.",
    autorizacao: "ilustrativa",
    naOferta: {
      status: "fora",
      texto: "Apoio específico do projeto Brasilê. Não faz parte do pacote padrão do Planejamento.",
    },
  },
  {
    id: "guia",
    nome: "Guia de execução",
    titulo: "Orientação para produzir, não só para pensar.",
    resumo: "Veja uma orientação de fotografia e um checklist curto de produção.",
    autorizacao: "autorizado",
    naOferta: {
      status: "parcial",
      texto:
        "Cada pauta do Planejamento traz orientação de captação. O guia completo de fotografia foi um apoio específico do Brasilê e não faz parte do pacote padrão.",
    },
  },
];

/* ---------- Estratégia ---------- */
export const estrategia = {
  /** Mensagem central do posicionamento (documento 01 · Estratégia e bio, 23/11/2026). */
  mensagem: "Sua vida muda. Você continua merecendo cuidado.",
  diagnostico: {
    titulo: "Diagnóstico",
    texto:
      "O perfil já mostrava resultados, mas explicava pouco o processo. O cuidado aparecia nas decisões de atendimento relatadas por Andreza:",
    praticas: [
      "Avaliar previamente o cabelo e conhecer seu histórico.",
      "Orientar quando um procedimento precisa ser adiado.",
      "Dedicar atenção à finalização.",
      "Considerar preferências de acabamento.",
      "Adaptar o atendimento a algumas clientes, como mães com bebês.",
      "Investir em conforto e estrutura.",
    ],
    natureza: "Relatos da fundadora no briefing",
  },
  percepcao: {
    titulo: "Percepção que a marca quer construir",
    desejada: "Aqui sou acolhida como sou e no momento de vida em que estou.",
    realidade: "Andreza relata pausas combinadas no atendimento de mães com recém-nascidos e investimento em conforto.",
    relevancia: "Reduz a distância entre o desejo de se cuidar e uma rotina que exige atenção a outras pessoas.",
    lacuna: "Registrar cenas e depoimentos autorizados que mostrem adaptações concretas, sem prometer flexibilidade irrestrita.",
    natureza: "Hipótese estratégica, com evidência a registrar",
  },
  decisao: {
    titulo: "Decisão editorial",
    formula: "Resultado + explicação + experiência",
    texto:
      "O portfólio continua presente. Junto dele, o conteúdo passa a mostrar o conhecimento, os critérios do atendimento e as práticas de acolhimento. Quem vê só o acabamento compara pela foto e pelo preço; quem entende o processo tem mais elementos para escolher.",
    pilares: ["Cuidado em todas as fases", "Critério antes do procedimento", "Resultado que tem contexto", "Por dentro do Brasilê"],
  },
};

/* ---------- Perfil ---------- */
export const perfil = {
  arroba: "@studio.brasile",
  nome: "Studio Brasilê | Progressiva",
  bioProposta: [
    "Alisamentos e tratamentos capilares",
    "Orientação para cuidar no estúdio e em casa",
    "Agendamentos e produtos ↓",
  ],
  bioAtualResumo:
    "A bio atual repete o nome da marca e dá destaque à identificação de CEO. Ela não diz o que o estúdio faz nem qual é o próximo passo.",
  porQue: "Na proposta, o espaço explica a entrega e orienta a próxima ação. A última linha sinaliza os dois caminhos: serviços e produtos.",
  destaques: [
    { nome: "Sobre", funcao: "Quem é Andreza, como começou e como cuida de quem chega." },
    { nome: "Serviços", funcao: "Progressiva, tratamentos, corte e opções de finalização." },
    { nome: "Resultados", funcao: "Imagens autorizadas, com o contexto de cada trabalho." },
    { nome: "Produtos", funcao: "Itens confirmados, orientação de uso e como comprar. Entra após conferir o catálogo." },
    { nome: "Clientes", funcao: "Feedbacks reais e autorizados sobre a experiência." },
    { nome: "Agende", funcao: "Primeira conversa, onde consultar valores, endereço, horários e como confirmar a reserva." },
  ],
  fixados: [
    { nome: "Conheça Andreza", rotulo: "O estúdio", funcao: "Apresenta a pessoa e a trajetória por trás do Brasilê." },
    { nome: "Antes do procedimento", rotulo: "Como trabalhamos", funcao: "Mostra o critério: avaliação, histórico e quando faz sentido esperar." },
    { nome: "Seu atendimento no Brasilê", rotulo: "Sua visita", funcao: "Explica como é chegar, ser atendida e agendar pela primeira vez." },
  ],
};

/* ---------- Calendário: semana de 30/11 a 06/12/2026 ---------- */
export type Pauta = {
  dia: string;
  data: string;
  titulo: string;
  formato: string;
  pilar: string;
  exibir: boolean;
  objetivo?: string;
  materiais?: string;
  trecho?: { rotulo: string; linhas: string[] };
};

export const semana: Pauta[] = [
  { dia: "Seg", data: "30/11", titulo: "", formato: "", pilar: "", exibir: false },
  {
    dia: "Ter",
    data: "01/12",
    titulo: "Preparando o Brasilê pra receber vocês em dezembro",
    formato: "Carrossel",
    pilar: "Por dentro do Brasilê",
    exibir: false,
  },
  {
    dia: "Qua",
    data: "02/12",
    titulo: "3 cortes para quem tem progressiva e NÃO finaliza em casa",
    formato: "Reels · 90 a 110 s",
    pilar: "Critério antes do procedimento",
    exibir: true,
    objetivo:
      "Apresentar três possibilidades de corte e os limites de cada uma para quem não finaliza em casa. Efeito esperado: salvamentos e dúvidas sobre escolha de corte, aproximando a conversa da rotina real.",
    materiais:
      "Celular vertical em 1080p, tripé na altura dos olhos e luz de janela à frente. Seis cenas gravadas separadamente. Três fotos autorizadas: base reta de costas, U suave de costas e long bob de lado.",
    trecho: {
      rotulo: "Roteiro · cenas 1 e 2",
      linhas: [
        "CENA 1 · Fala: “Você tem progressiva, lava o cabelo e deixa secar sem fazer escova? Então olha esses três cortes antes de escolher sua próxima referência.”",
        "Texto na tela: 3 cortes para quem tem progressiva e NÃO finaliza em casa.",
        "CENA 2 · Andreza apresenta a base reta, com foto de costas mostrando as pontas: “Primeiro: a base reta. Se você gosta das pontas mais alinhadas e não faz questão de muito movimento, ela pode ser uma boa opção.”",
      ],
    },
  },
  { dia: "Qui", data: "03/12", titulo: "", formato: "", pilar: "", exibir: false },
  {
    dia: "Sex",
    data: "04/12",
    titulo: "Como agendar seu primeiro atendimento no Brasilê",
    formato: "Carrossel · 4 cards",
    pilar: "Critério antes do procedimento",
    exibir: true,
    objetivo:
      "Explicar o primeiro agendamento em três passos: conversa, escolha de serviço e horário, confirmação da reserva. Efeito esperado: consultas qualificadas, com expectativa e horário informados.",
    materiais: "Quatro cards simples montados no Canva por Andreza, com foto própria e texto. Valores ficam no link de agendamentos.",
    trecho: {
      rotulo: "Texto dos cards",
      linhas: [
        "1 · Sua primeira vez no Brasilê? Veja como agendar.",
        "2 · Comece pela conversa. No WhatsApp, envie foto ou vídeo do cabelo e conte o que deseja fazer.",
        "3 · Confira serviço, valor e horário. A tabela está no link de agendamentos.",
        "4 · Vamos confirmar sua reserva? Na hora de agendar, eu te explico o valor do sinal.",
      ],
    },
  },
  { dia: "Sáb", data: "05/12", titulo: "", formato: "", pilar: "", exibir: false },
  { dia: "Dom", data: "06/12", titulo: "", formato: "", pilar: "", exibir: false },
];

/** Pauta usada na narrativa (Reels de 28/11, copy aprovada). */
export const pautaPausas = {
  tema: "Tem fases em que o cuidado precisa de pausas.",
  comunica: "Acolhimento que considera a realidade da cliente.",
  legenda:
    "Já recebi mães com bebês pequenos que precisaram de pausas durante o atendimento. Nessas situações, conversamos e ajustamos o ritmo ao que era possível.",
  execucao: "Cena curta de rotina, de 6 a 10 segundos, com desenvolvimento na legenda e cuidado com as autorizações de imagem.",
};

/* ---------- Stories: sequência da semana de 21 a 27/12 ---------- */
export const stories = {
  tema: "Quem cuida de você no Brasilê",
  telas: [
    { tipo: "Câmera direta", texto: "Conte como começou atendendo em casa.", apoio: "Fala curta, em primeira pessoa." },
    { tipo: "Bastidor", texto: "Mostre o estúdio hoje.", apoio: "Um registro real do espaço, sem encenar." },
    {
      tipo: "Relato",
      texto: "Compartilhe um exemplo real de acolhimento, como pausas combinadas com mães de bebês.",
      apoio: "Sem cliente identificável sem autorização.",
    },
    { tipo: "Caixinha", texto: "O que faz você se sentir bem recebida em um salão?", apoio: "Retome duas ou três respostas depois." },
  ],
};

/* ---------- Guia de execução ---------- */
export const guia = {
  fotografia: {
    titulo: "Fotografia de resultados",
    passos: [
      "Fundo limpo e luz suave de frente ou na diagonal. Limpe a lente e fotografe na altura do rosto.",
      "Preserve a cor e a textura dos fios.",
      "Comece com uma foto de frente ou em três quartos e outra de costas. Acrescente perfil, detalhe ou um vídeo curto de movimento.",
      "Para antes e depois, repita luz e ângulo. Informe se o depois inclui maquiagem ou outra finalização.",
    ],
  },
  checklist: [
    "Prepare um canto com luz suave, fundo limpo e lente limpa.",
    "Combine o que pode fotografar e publicar, incluindo rosto e marcação.",
    "Registre frente ou três quartos e costas.",
    "Mostre a seleção à cliente e guarde a autorização.",
    "Monte a arte no modelo e confira a leitura pelo celular.",
  ],
};
