import type { ReactNode } from "react";
import { arquivo } from "../../lib/rotas";

/**
 * A entrega do Studio Brasilê contada ao longo da página, com prints reais do site de estratégia
 * que a Andreza recebeu no portal da Move (autorizados em 24/11/2026). Cada capítulo é um
 * conceito da entrega: a copy vende a ideia e o print prova que ela existe.
 */

type Print = { src: string; alt: string; largura: number; altura: number; origem?: "planejamento" | "portal" };

type Capitulo = {
  id: string;
  rotulo: string;
  titulo: ReactNode;
  texto: string;
  /** O que aquela parte resolve para quem compra. */
  ganho: string;
  prints: readonly Print[];
};

const CAPITULOS: readonly Capitulo[] = [
  {
    id: "site",
    rotulo: "Um site só da sua marca",
    titulo: (
      <>
        Nada de PDF esquecido na pasta. <span className="text-bege">Um site com a sua estratégia.</span>
      </>
    ),
    texto:
      "O planejamento da Andreza chegou num endereço só dela, escrito para o negócio dela. Abre no celular, na hora de gravar, e começa pelo objetivo: o que o perfil precisa fazer pelo estúdio.",
    ganho: "Você para de depender da memória ou de um arquivo perdido. Abre o link antes de gravar e lembra para onde o perfil está indo.",
    prints: [{ src: "entrega/plan-abertura.webp", alt: "Abertura do planejamento estratégico do Studio Brasilê, com o título e o objetivo", largura: 1170, altura: 812 }],
  },
  {
    id: "publico",
    rotulo: "Quem você quer alcançar",
    titulo: (
      <>
        Não é um público genérico. <span className="text-bege">São situações reais da sua cliente.</span>
      </>
    ),
    texto:
      "A Move transforma o que a Andreza vive no atendimento em situações concretas: quem precisa de tempo para se cuidar, quem está comparando profissionais, quem quer cuidar melhor do cabelo. Cada uma vira motivo de conteúdo.",
    ganho: "Você para de falar para todo mundo e passa a responder a dúvida que trava a cliente antes de agendar.",
    prints: [{ src: "entrega/plan-situacoes.webp", alt: "Três situações da cliente do Studio Brasilê descritas no planejamento", largura: 1170, altura: 445 }],
  },
  {
    id: "percepcao",
    rotulo: "Como você quer ser lembrada",
    titulo: (
      <>
        A frase que a cliente <span className="text-bege">vai pensar sobre você.</span>
      </>
    ),
    texto:
      "O planejamento define o que as pessoas precisam perceber antes de agendar, e como cada percepção aparece no conteúdo. No Brasilê, a prioridade foi deixar visível o critério da Andreza.",
    ganho: "Cada post reforça o mesmo motivo para escolherem você, e não a concorrente mais barata.",
    prints: [
      { src: "entrega/plan-percepcao.webp", alt: "Percepção central do Studio Brasilê: No Brasilê, meu momento de vida é considerado", largura: 1170, altura: 450 },
      { src: "entrega/plan-prioridade.webp", alt: "Prioridade do primeiro ciclo: Andreza tem conhecimento e critério para me orientar", largura: 1170, altura: 505 },
    ],
  },
  {
    id: "pilares",
    rotulo: "Pilares de conteúdo",
    titulo: (
      <>
        Assuntos que só você pode falar. <span className="text-bege">Cada um com um motivo.</span>
      </>
    ),
    texto:
      "Cada pilar diz o que abordar, por que ele existe e em que formato funciona melhor. É daí que saem as pautas, sem tema solto de qualquer perfil.",
    ganho: "Acaba o branco na hora de postar: o assunto já tem motivo e formato.",
    prints: [{ src: "entrega/plan-pilar.webp", alt: "Pilar Cuidado em todas as fases, com o que abordar, por que existe e os formatos", largura: 1170, altura: 490 }],
  },
  {
    id: "rotina",
    rotulo: "Da estratégia para a rotina",
    titulo: (
      <>
        Você sabe o que fazer <span className="text-bege">e em que ordem.</span>
      </>
    ),
    texto:
      "O planejamento termina num caminho prático: alinhar a direção, planejar o mês e produzir com orientação. Para a Andreza, três posts por semana com o que gravar e o que separar.",
    ganho: "Você sai sabendo o que fazer nesta semana, não só o que a marca deveria ser.",
    prints: [{ src: "entrega/plan-rotina.webp", alt: "Como a estratégia vira rotina: alinhar a direção, planejar o mês e orientar a produção", largura: 1170, altura: 529 }],
  },
  {
    id: "pauta",
    rotulo: "E no sistema da Move",
    titulo: (
      <>
        Abriu o dia, <span className="text-bege">sabe o que gravar.</span>
      </>
    ),
    texto:
      "Depois do planejamento, cada conteúdo ganha data, formato e roteiro cena a cena no portal da Move. A Andreza começou atendendo no banheiro de casa; a Move transformou isso em conteúdo que aproxima.",
    ganho: "Você grava sem improvisar: o objetivo, a cena e a fala já estão escritos.",
    prints: [
      { src: "entrega/pauta.webp", alt: "Pauta aberta com objetivo, ideia central e como produzir", largura: 1144, altura: 1090, origem: "portal" },
      { src: "entrega/roteiro.webp", alt: "Roteiro da pauta dividido em cenas", largura: 1144, altura: 495, origem: "portal" },
    ],
  },
];

/**
 * Palavras da Andreza no WhatsApp durante a entrega, copiadas sem mudar nada (só o trecho do elogio).
 * Quando chegar o depoimento oficial, troque esta lista.
 */
const FALAS_DA_ANDREZA = [
  "Amigaaaa que perfeição a proposta. Nossa eu amei do início ao fim. Você é ótimaaa no que faz 👏🏻👏🏻",
  "Eu emocionei aqui ta 🥺\nVocê soube captar exatamente o que eu quero",
  "Ótimooo, amando as ideias. Tu soube captar exatamente o que preciso e o tipo de assuntos pra gente soltar.",
] as const;

export function EntregaDesdobrada() {
  return (
    <section id="entregaveis" aria-labelledby="titulo-entrega" className="relative overflow-x-clip py-20 md:py-28">
      <div aria-hidden="true" className="holofote-baixo pointer-events-none absolute inset-0" />
      <div className="envoltorio relative">
        <div className="max-w-3xl" data-revelar>
          <p className="rotulo text-bege">A entrega, por dentro</p>
          <h2 id="titulo-entrega" className="display mt-4 text-[2.3rem] leading-[1.04] md:text-[3.6rem]">
            Isto é o que a Andreza recebeu. <span className="text-papel/45">Não é modelo, é a entrega real.</span>
          </h2>
          <p className="mt-5 max-w-[46ch] text-lg text-papel/70">
            Role e veja, peça por peça, o planejamento que organizou o perfil do Studio Brasilê e o que cada parte resolve. No seu, tudo é feito para o seu negócio.
          </p>
        </div>

        <ol className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-36">
          {CAPITULOS.map((c, i) => (
            <li key={c.id} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
              <div className={`${i % 2 ? "md:order-2" : ""}`} data-revelar>
                <p className="flex items-center gap-3 text-bege">
                  <span className="display text-[2.6rem] leading-none text-bege/35 md:text-[3.4rem]">0{i + 1}</span>
                  <span className="rotulo">{c.rotulo}</span>
                </p>
                <h3 className="display mt-4 text-[1.9rem] leading-[1.08] md:text-[2.6rem]">{c.titulo}</h3>
                <p className="mt-4 max-w-[44ch] text-[1.05rem] leading-relaxed text-papel/70">{c.texto}</p>
                <p className="mt-6 max-w-[44ch] border-l-2 border-bege/60 pl-4 text-[1.05rem] leading-relaxed text-papel">
                  <span className="rotulo mb-1 block text-bege">O que resolve para você</span>
                  {c.ganho}
                </p>
              </div>
              <div className={`relative ${i % 2 ? "md:order-1" : ""}`} data-revelar style={{ ["--atraso" as string]: "120ms" }}>
                <div aria-hidden="true" className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-[radial-gradient(60%_60%_at_50%_50%,rgb(26_56_128/0.45),transparent_70%)]" />
                <div className="relative flex flex-col gap-4">
                  {c.prints.map((p, k) => (
                    <Janela key={p.src} print={p} deslocada={k > 0} />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* O que a Andreza disse ao receber */}
        <figure className="mt-20 grid gap-8 rounded-[2rem] bg-white/[0.04] p-6 ring-1 ring-white/10 md:mt-28 md:grid-cols-[0.8fr_1.2fr] md:gap-12 md:p-10" data-revelar>
          <figcaption>
            <p className="rotulo text-bege">Quem recebeu</p>
            <p className="display mt-3 text-[1.9rem] leading-[1.08] md:text-[2.4rem]">O que a Andreza disse ao ver o planejamento.</p>
            <p className="mt-3 text-sm text-papel/55">Mensagens dela no WhatsApp, do jeito que chegaram.</p>
          </figcaption>
          <div className="flex flex-col gap-2.5">
            {FALAS_DA_ANDREZA.map((f, i) => (
              <blockquote
                key={i}
                className="relative max-w-[34ch] whitespace-pre-line rounded-[1.1rem] rounded-tl-sm bg-[#1f2c34] px-4 py-3 text-[1rem] leading-snug text-[#e9edef] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)]"
                style={{ marginLeft: `${(i % 2) * 1.25}rem` }}
              >
                {f}
              </blockquote>
            ))}
            <p className="mt-1 text-sm text-papel/60">Andreza, Studio Brasilê</p>
          </div>
        </figure>

        <p className="mt-12 max-w-3xl text-sm text-papel/45">
          Prints reais do planejamento e do portal do Studio Brasilê, publicados com autorização da Andreza. O método é o mesmo; a estratégia, os pilares e as pautas são feitos para o seu negócio.
        </p>
      </div>
    </section>
  );
}

/** O print dentro de uma janela de navegador, para ler como tela de verdade. */
function Janela({ print, deslocada }: { print: Print; deslocada: boolean }) {
  return (
    <figure className={`janela overflow-hidden rounded-[1.25rem] bg-[#ece8e5] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/15 ${deslocada ? "md:ml-10 md:-mt-10" : ""}`}>
      <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-black/5 bg-[#f6f3f1] px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#d8ae82]" />
        <span className="size-2.5 rounded-full bg-[#d5d6db]" />
        <span className="size-2.5 rounded-full bg-[#d5d6db]" />
        <span className="ml-3 truncate rounded-full bg-black/[0.05] px-3 py-0.5 text-[0.7rem] text-marinho/55">{print.origem === "portal" ? "portal da Move · Minha estratégia" : "Planejamento estratégico · Studio Brasilê"}</span>
      </div>
      <div className="p-3 md:p-4">
        <img src={arquivo(print.src)} alt={print.alt} width={print.largura} height={print.altura} loading="lazy" decoding="async" className="block h-auto w-full" />
      </div>
    </figure>
  );
}
