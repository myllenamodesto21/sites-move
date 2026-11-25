import type { ReactNode } from "react";
import { arquivo } from "../../lib/rotas";

/**
 * A entrega do Studio Brasilê contada ao longo da página, com prints reais do site de estratégia
 * que a Andreza recebeu no portal da Move (autorizados em 24/11/2026). Cada capítulo é um
 * conceito da entrega: a copy vende a ideia e o print prova que ela existe.
 */

type Print = { src: string; alt: string; largura: number; altura: number };

type Capitulo = {
  id: string;
  rotulo: string;
  titulo: ReactNode;
  texto: string;
  provas?: readonly string[];
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
      "A Andreza abre no celular, na hora de gravar. Direção, estratégia, calendário e orientações no mesmo lugar, escritos para o negócio dela e atualizados pela Move a cada ajuste.",
    provas: ["Abre no celular", "Atualizado pela Move", "Tudo em um link"],
    prints: [{ src: "entrega/portal-visao.webp", alt: "Visão geral da estratégia do Studio Brasilê no portal da Move, com a direção da marca", largura: 1200, altura: 1500 }],
  },
  {
    id: "posicionamento",
    rotulo: "Posicionamento",
    titulo: (
      <>
        A Move encontra o que você já faz de diferente <span className="text-bege">e coloca em palavras.</span>
      </>
    ),
    texto:
      "No Brasilê, o diferencial estava no atendimento e não aparecia no perfil: critério para indicar ou adiar um procedimento, finalização atenta e acolhimento de verdade. Agora cada decisão vem com o que significa e como aplicar no dia a dia.",
    provas: ["O que significa", "Como aplicar"],
    prints: [{ src: "entrega/posicionamento.webp", alt: "Decisão de posicionamento do Studio Brasilê, com o que significa e como aplicar", largura: 1144, altura: 650 }],
  },
  {
    id: "mensagem",
    rotulo: "Mensagem central",
    titulo: (
      <>
        Uma frase que segura <span className="text-bege">todo o conteúdo.</span>
      </>
    ),
    texto:
      "Quando a mensagem é clara, cada post reforça a mesma ideia e a cliente entende por que escolher você. A do Brasilê virou um convite, nunca uma cobrança por aparência.",
    prints: [{ src: "entrega/mensagem.webp", alt: "Mensagem central do Studio Brasilê: Sua vida muda. Você continua merecendo cuidado.", largura: 1144, altura: 535 }],
  },
  {
    id: "linhas",
    rotulo: "Linhas de conteúdo",
    titulo: (
      <>
        Assuntos que só você pode falar. <span className="text-bege">Nunca mais tema de qualquer perfil.</span>
      </>
    ),
    texto:
      "Cada linha nasce do que a marca vive e responde perguntas reais da cliente. É daí que saem as pautas, com motivo para existir.",
    provas: ["Cuidado em todas as fases", "Critério antes do procedimento", "Resultado que tem contexto", "Por dentro do Brasilê"],
    prints: [{ src: "entrega/linhas.webp", alt: "Linhas de conteúdo do Studio Brasilê com o que cada uma responde", largura: 1144, altura: 1095 }],
  },
  {
    id: "calendario",
    rotulo: "Plano de conteúdo",
    titulo: (
      <>
        Abriu o dia, <span className="text-bege">sabe o que postar.</span>
      </>
    ),
    texto:
      "Cada conteúdo tem data, formato e a linha a que pertence. Acaba o domingo à noite pensando no que postar na semana.",
    provas: ["Data", "Formato", "Linha de conteúdo"],
    prints: [{ src: "entrega/plano.webp", alt: "Plano de conteúdo do Studio Brasilê com datas, formatos e linhas", largura: 1144, altura: 1125 }],
  },
  {
    id: "pauta",
    rotulo: "Pauta pronta para gravar",
    titulo: (
      <>
        A história dela, <span className="text-bege">contada do jeito dela.</span>
      </>
    ),
    texto:
      "Cada pauta traz o objetivo, a ideia central, como produzir e o roteiro cena a cena. A Andreza começou atendendo no banheiro de casa; a Move transformou isso em conteúdo que aproxima. No seu planejamento, a matéria-prima é a sua história.",
    provas: ["Objetivo", "Ideia central", "Como produzir", "Roteiro"],
    prints: [
      { src: "entrega/pauta.webp", alt: "Pauta aberta com objetivo, ideia central e como produzir", largura: 1144, altura: 1090 },
      { src: "entrega/roteiro.webp", alt: "Roteiro da pauta dividido em cenas", largura: 1144, altura: 495 },
    ],
  },
];

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
            Role e veja, peça por peça, o planejamento que organizou o perfil do Studio Brasilê. No seu, tudo é feito para o seu negócio.
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
                {c.provas && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {c.provas.map((p) => (
                      <li key={p} className="rounded-full bg-white/[0.06] px-3.5 py-1.5 text-sm text-papel/80 ring-1 ring-white/10">
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
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

        <p className="mt-16 max-w-3xl text-sm text-papel/45 md:mt-24">
          Prints reais do portal do Studio Brasilê, publicados com autorização da Andreza. O planejamento é o mesmo método; a estratégia, as linhas e as pautas são feitas para o seu negócio.
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
        <span className="ml-3 truncate rounded-full bg-black/[0.05] px-3 py-0.5 text-[0.7rem] text-marinho/55">portal da Move · Minha estratégia</span>
      </div>
      <div className="p-3 md:p-4">
        <img src={arquivo(print.src)} alt={print.alt} width={print.largura} height={print.altura} loading="lazy" decoding="async" className="block h-auto w-full" />
      </div>
    </figure>
  );
}
