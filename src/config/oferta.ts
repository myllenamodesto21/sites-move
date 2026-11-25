/**
 * OFERTA DO PLANEJAMENTO ESTRATÉGICO MOVE
 * ---------------------------------------
 * Tudo o que muda entre campanha e oferta regular fica aqui:
 * preços, datas, checkout, escopo, textos de estado e regra do repasse.
 * As três páginas (site, /planejamento e /links) leem deste arquivo.
 *
 * Horários: sempre no horário de Brasília (-03:00). O site mostra só o horário de Brasília.
 * Links: deixe `null` enquanto não houver link real. A página mostra
 * "configuração pendente" e nunca cria um link falso.
 * Instruções completas: COMO-ATUALIZAR.md na raiz do projeto.
 */

export type EstadoCampanha = "pre" | "ativa" | "esgotada" | "encerrada" | "sem-campanha";

export const FUSO = "America/Sao_Paulo";

export const oferta = {
  produto: "Planejamento Estratégico Move",

  regular: {
    preco: 1800,
    /** Link do produto regular na plataforma de checkout (Eduzz). */
    checkout: "https://chk.eduzz.com/1W32745Q92" as string | null,
  },

  campanha: {
    /** false desliga toda comunicação de campanha (a página fica no modo regular). */
    ativa: true,
    nome: "Black do Planejamento Estratégico Move",
    nomeCurto: "Black do Planejamento",
    preco: 1000,
    /** Início e fim no horário de Brasília. */
    inicio: "2026-11-26T00:00:00-03:00",
    fim: "2026-12-04T23:59:59-03:00",
    /** Link do checkout da Black. Na Eduzz é o mesmo produto: o desconto entra pelo cupom. */
    checkout: "https://chk.eduzz.com/1W32745Q92" as string | null,
    /** Cupom que aplica o desconto da Black no checkout (null quando o link já traz o preço da Black). */
    cupom: "BLACKMOVE" as string | null,
    /** Parcelamento no cartão mostrado nos pitchs (conforme a Eduzz, com juros). */
    parcelas: { vezes: 12, valor: 103.42 } as { vezes: number; valor: number } | null,
    /** true quando a agenda desta condição lotar: pausa a compra. */
    agendaEsgotada: false,
  },

  pagamento: "Pix ou cartão. Condições de parcelamento apresentadas no checkout.",

  /** Entrega igual nos dois modos (ficha da oferta, 24/11/2026). */
  entrega: [
    { item: "Diagnóstico", texto: "Formulário e leitura do seu negócio, público, perfil e caminho até a contratação." },
    { item: "Briefing", texto: "Reunião online de 60 minutos para aprofundar as informações." },
    { item: "Estratégia", texto: "Posicionamento, público, percepções, narrativa e territórios de conteúdo pelo Método Move." },
    { item: "Calendário", texto: "24 pautas em oito semanas, na referência de três publicações por semana, com data sugerida." },
    { item: "Texto e orientação", texto: "Ideia central, formato, texto-base, orientação de captação e chamada para ação em cada pauta." },
    { item: "Entrega", texto: "Reunião online de 30 minutos para apresentar o trabalho." },
    { item: "Acompanhamento", texto: "WhatsApp durante os dois meses de execução do calendário." },
  ],

  papelMove: ["Estudar seu negócio", "Planejar a estratégia", "Escrever as 24 pautas", "Orientar a produção", "Acompanhar a execução"],
  papelCliente: [
    "Participar do diagnóstico e do briefing",
    "Validar as informações",
    "Reunir os materiais",
    "Gravar, produzir as artes e editar",
    "Publicar e atender",
  ],
  naoInclui: "Design, edição e publicação não estão incluídos. Se precisar de ajuda pontual, peça um orçamento separado.",

  prazo:
    "Em até sete dias úteis depois do formulário e da reunião de briefing concluídos. O agendamento segue a ordem de contratação.",

  /**
   * Bloco da equipe. O texto é editável.
   * A regra do repasse só aparece quando `repasse.confirmado` for true
   * e apenas enquanto a campanha estiver ativa.
   */
  equipe: {
    titulo: "Quem constrói a Move",
    texto:
      "A Move trabalha com uma equipe de colaboradores que participam da estratégia, da produção e do acompanhamento de cada cliente. Cada entrega passa por mais de uma pessoa antes de chegar até você.",
    foto: "A14",
    repasse: {
      confirmado: false,
      texto: "40% do lucro desta ação será dividido entre os quatro colaboradores que participam da construção da Move.",
    },
  },
} as const;

/** Mensagens que mudam conforme o estado da campanha. */
export const textosDoEstado: Record<EstadoCampanha, { faixa: string | null; selo: string | null }> = {
  pre: { faixa: "A Black do Planejamento começa em 26/11. Conheça a entrega.", selo: "Começa em 26/11" },
  ativa: { faixa: "Black do Planejamento: R$ 1.000 até 04/12. Conheça a entrega.", selo: "Condição da Black" },
  esgotada: {
    faixa: "A agenda da Black foi preenchida. Fale com a Move sobre a próxima disponibilidade.",
    selo: "Agenda preenchida",
  },
  encerrada: { faixa: null, selo: null },
  "sem-campanha": { faixa: null, selo: null },
};
