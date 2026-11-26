/**
 * DADOS GERAIS DOS TRÊS SITES
 * Contatos, serviços, imagens e opções da prévia.
 * Deixe `null` o que ainda não foi confirmado: o site mostra
 * "configuração pendente" em vez de inventar um link.
 */

/**
 * Identificação da empresa, exigida em páginas com venda online (Decreto 7.962/2013).
 * Deixe `null` até confirmar: os Termos mostram "configuração pendente".
 */
export const empresa = {
  nome: "Move Agência Digital",
  razaoSocial: "55.345.216 Myllena Modesto Oliveira" as string | null,
  cnpj: "55.345.216/0001-80" as string | null,
  endereco: "Rua Raimundo Nonato Castro, 773, Ponta Negra, Manaus (AM)" as string | null,
};

export const contatos = {
  /** Número oficial da Move só com dígitos, com DDI e DDD. Ex.: "5592900000000". */
  whatsapp: "559284135839" as string | null,
  email: "contato@moveagencia.com.br" as string | null,
  /** Endereço completo do perfil oficial. */
  instagram: "https://www.instagram.com/moveagencia.com.br/" as string | null,
};

/** Identificadores usados em links (?servico=) e nas mensagens. */
export type ServicoId = "planejamento" | "gestao" | "jornada" | "projetos" | "duvida-black" | "geral" | "orcamento";

export const mensagensWhatsApp: Record<ServicoId, string> = {
  planejamento: "Olá, Move! Tenho uma dúvida sobre o Planejamento Estratégico.",
  "duvida-black": "Olá, Move! Vim pela Black do Planejamento e tenho uma dúvida.",
  gestao: "Olá, Move! Quero entender a gestão das redes do meu negócio.",
  jornada: "Olá, Move! Quero organizar meus canais e o caminho até o atendimento.",
  projetos: "Olá, Move! Tenho um projeto específico (site, identidade, carrossel ou edição) para avaliar.",
  geral: "Olá, Move! Quero entender qual serviço faz sentido para meu negócio.",
  orcamento: "Olá, Move! Quero fazer um orçamento e apresentar o meu projeto.",
};

export type Servico = {
  id: Exclude<ServicoId, "duvida-black" | "geral">;
  nome: string;
  resumo: string;
  paraQuem: string;
  entrega: string[];
  comoContratar: string;
  cta: string;
  /** "pagina" leva à página de vendas; "contato" abre a conversa com o serviço já escolhido. */
  destino: "pagina" | "contato";
  preco?: string;
};

export const servicos: Servico[] = [
  {
    id: "gestao",
    nome: "Gestão de Redes Sociais",
    resumo: "Uma equipe para colocar sua comunicação em movimento, todos os meses, pelo Método Move.",
    paraQuem: "Para quem quer delegar a operação das redes e manter direção e continuidade.",
    entrega: [
      "Diagnóstico e direção de marca",
      "Foco e calendário de cada mês",
      "Roteiro e legenda",
      "Design ou edição contratados",
      "Aprovação, programação e publicação",
      "Leitura de métricas e reunião de fechamento",
    ],
    comoContratar: "Conversa, levantamento da necessidade, proposta, contrato e início do ciclo. O volume e os formatos são definidos na proposta.",
    cta: "Conversar sobre a gestão",
    destino: "contato",
  },
  {
    id: "planejamento",
    nome: "Planejamento Estratégico",
    resumo: "Consultoria para você ou sua equipe executarem o conteúdo com direção.",
    paraQuem: "Para quem quer continuar produzindo, com estratégia e textos prontos para executar.",
    entrega: ["Diagnóstico e briefing de 60 min", "Estratégia pelo Método Move", "24 pautas escritas para oito semanas", "Acompanhamento por dois meses"],
    comoContratar: "Contratação direta pela página, com pagamento no checkout.",
    cta: "Conhecer o Planejamento",
    destino: "pagina",
  },
  {
    id: "jornada",
    nome: "Jornada do Cliente",
    resumo: "O caminho até o seu atendimento, organizado em cinco canais.",
    paraQuem: "Para quem recebe interesse, mas perde pessoas entre o perfil e a conversa.",
    entrega: [
      "Site de uma página, com até seis seções",
      "Link na bio organizado por objetivo",
      "Perfil da Empresa no Google",
      "Organização básica do Instagram",
      "Estruturação do WhatsApp Business",
    ],
    comoContratar: "Conversa sobre os canais atuais, envio de materiais e acessos, proposta com prazo.",
    cta: "Organizar meus canais",
    destino: "contato",
  },
  {
    id: "projetos",
    nome: "Projetos sob orçamento",
    resumo: "Sites, identidade visual e demandas avulsas, como carrossel e edição de vídeo.",
    paraQuem: "Para quem tem uma necessidade específica e delimitada.",
    entrega: ["Sites e landing pages", "Identidade visual", "Apresentações interativas", "Carrosséis e edição de vídeo avulsos"],
    comoContratar: "Envie objetivo, data desejada e materiais. A Move apresenta escopo, prazo e orçamento.",
    cta: "Apresentar meu projeto",
    destino: "contato",
  },
];

/**
 * Imagens. Ao receber o arquivo autorizado, coloque em /public/imagens/
 * e preencha `src` (ex.: "imagens/andreza-estudio.webp"), largura e altura.
 * Sem `src`, a página mostra um espaço reservado identificado.
 */
export type ImagemConfig = {
  src: string | null;
  alt: string;
  legenda?: string;
  largura?: number;
  altura?: number;
  pendencia: string;
};

export const imagens: Record<string, ImagemConfig> = {
  A01: {
    src: null,
    alt: "Andreza no Studio Brasilê",
    legenda: "Andreza, Studio Brasilê",
    pendencia: "Foto real de Andreza no estúdio. Conferir arquivo original e autorização comercial.",
  },
  A13: {
    src: null,
    alt: "Apresentação do planejamento do Studio Brasilê",
    legenda: "Planejamento desenvolvido para o Studio Brasilê",
    pendencia: "Recorte da apresentação pública revisada.",
  },
  A14: {
    src: "fotos/equipe-move.webp",
    largura: 1200,
    altura: 1500,
    alt: "Retrato de quem acompanha os clientes na Move",
    pendencia: "Foto real e autorizada da equipe ou bastidor de trabalho.",
  },
  M01: {
    src: null,
    alt: "Trabalho de estratégia em andamento na Move",
    legenda: "Do diagnóstico à orientação de conteúdo",
    pendencia: "Fotografia real de trabalho da Move.",
  },
  G01: {
    src: null,
    alt: "Calendário e produção da Gestão de Redes",
    legenda: "Gestão de Redes: do calendário à publicação",
    pendencia: "Material próprio da modalidade Gestão (não usar o case de consultoria).",
  },
};

export const depoimento = {
  /** Vídeo da Dra. Tayssa: só aparece com arquivo, legenda e autorização conferidos. */
  ativo: false,
  nome: "Dra. Tayssa Guimarães",
  video: null as string | null,
  capa: null as string | null,
  legendas: null as string | null,
};

/** Opções da prévia de revisão. A simulação (?estado=) e o botão "Prévia" só existem no build de prévia, nunca no site publicado. */
export const previa = {
  permitirSimulacao: import.meta.env.MODE === "previa",
};
