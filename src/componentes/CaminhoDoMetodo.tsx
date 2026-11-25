import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Método Move contado como o caminho de uma pauta, numa cena de tela cheia guiada pela rolagem.
 * A seção é alta; dentro dela, um palco fica preso na tela enquanto a pessoa rola, e a cena
 * avança por cinco capítulos: a pauta nasce do especialista, ganha formato, ganha a cara dele
 * e segue acompanhada. Com movimento reduzido, os capítulos trocam sem animação.
 */

const CAPITULOS = [
  { titulo: "Tudo começa com você.", linha: "Uma conversa sobre o que você sabe, vive e defende. É desse material que o conteúdo nasce." },
  { titulo: "Seu repertório vira pauta.", linha: "Cada assunto sai da sua experiência e do seu critério. Nada de tema que qualquer perfil poderia postar." },
  { titulo: "No formato que prende.", linha: "Formatos virais a serviço da sua ideia: o formato faz a pessoa parar, o seu conteúdo faz ela ficar." },
  { titulo: "Com a sua cara.", linha: "Seu jeito de falar, seus exemplos, seu ponto de vista. Um conteúdo que só você poderia fazer." },
  { titulo: "E a Move do seu lado.", linha: "Acompanhamento próximo, todo mês. Lemos os sinais com você e ajustamos o caminho junto." },
] as const;

/** A conta da Move, que acende parte por parte e serve de índice do caminho. */
const CONTA = [
  { texto: "Seu repertório", capitulo: 1 },
  { sinal: "+" },
  { texto: "formatos virais", capitulo: 2 },
  { sinal: "=" },
  { texto: "conteúdo com a sua cara", capitulo: 3, destaque: true },
  { texto: "com a Move por perto", capitulo: 4, manuscrita: true },
] as const;

const FRAGMENTOS = [
  { texto: "o que você sabe", lugar: "left-[-18%] top-[12%] -rotate-6" },
  { texto: "o que você vive", lugar: "right-[-20%] top-[38%] rotate-3" },
  { texto: "o que você defende", lugar: "left-[-12%] bottom-[14%] rotate-2" },
];

const reduzido = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

export function CaminhoDoMetodo() {
  const secao = useRef<HTMLDivElement>(null);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    let quadro = 0;
    const medir = () => {
      quadro = 0;
      const el = secao.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const curso = r.height - window.innerHeight;
      setProgresso(Math.min(1, Math.max(0, -r.top / Math.max(1, curso))));
    };
    const agendar = () => {
      if (!quadro) quadro = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
    };
  }, []);

  const etapa = Math.min(CAPITULOS.length - 1, Math.floor(progresso * CAPITULOS.length));
  const irPara = (i: number) => {
    const el = secao.current;
    if (!el) return;
    const topo = el.getBoundingClientRect().top + scrollY;
    const curso = el.offsetHeight - innerHeight;
    scrollTo({ top: topo + ((i + 0.5) / CAPITULOS.length) * curso, behavior: reduzido() ? "auto" : "smooth" });
  };

  return (
    <div id="metodo" className="relative scroll-mt-0 bg-marinho">
      {/* Abertura do método */}
      <div className="envoltorio relative flex min-h-[72svh] flex-col items-center justify-center py-24 text-center">
        <p className="rotulo text-bege" data-revelar>
          Método Move · o que guia a gestão
        </p>
        <h3 className="display mt-6 max-w-[16ch] text-[2.8rem] leading-[1.02] md:text-[5.4rem]" data-revelar>
          Conteúdo com a sua cara.
        </h3>
        <p className="manuscrita mt-3 text-[2.2rem] leading-none text-bege md:text-[3.6rem]" data-revelar>
          não com cara de Google.
        </p>
        <p className="mt-8 max-w-[38ch] text-lg text-papel/70" data-revelar>
          Siga o caminho de uma pauta, da sua cabeça até o seu perfil.
        </p>
        <span aria-hidden="true" className="mt-12 block h-14 w-px origin-top bg-gradient-to-b from-bege to-transparent rolar-indicador" />
      </div>

      {/* O palco: alto o bastante para a rolagem conduzir os cinco capítulos */}
      <div ref={secao} className="relative" style={{ height: `calc(100svh + ${CAPITULOS.length} * 75svh)` }}>
        <div className="caminho-palco textura sticky top-0 h-[100svh] overflow-hidden" data-etapa={etapa}>
          <LinhaDoCaminho progresso={progresso} />

          <div className="envoltorio relative grid h-full grid-rows-[1fr_auto_auto] pb-5 pt-20 md:pb-8 md:pt-24 lg:grid-cols-[1fr_1fr] lg:grid-rows-[1fr_auto] lg:gap-x-12">
            {/* Texto do capítulo */}
            <div className="relative z-10 order-2 flex flex-col justify-end lg:order-1 lg:justify-center">
              <p className="rotulo flex items-center gap-3 text-bege/80">
                <span className="tabular-nums">0{etapa + 1}</span>
                <span className="h-px w-10 bg-bege/40" aria-hidden="true" />
                <span className="text-papel/45 tabular-nums">0{CAPITULOS.length}</span>
              </p>
              <ol className="relative mt-4 grid">
                {CAPITULOS.map((c, i) => (
                  <li
                    key={c.titulo}
                    aria-current={i === etapa ? "step" : undefined}
                    className={`capitulo col-start-1 row-start-1 ${i === etapa ? "ativo" : i < etapa ? "passado" : ""}`}
                  >
                    <h4 className="display text-[2.1rem] leading-[1.02] md:text-[3.4rem] lg:text-[4.2rem]">
                      {c.titulo.split(" ").map((w, k) => (
                        <span key={k}>
                          <span className="palavra" style={{ "--k": k } as CSSProperties}>
                            {w}
                          </span>{" "}
                        </span>
                      ))}
                    </h4>
                    <p className="mt-4 max-w-[36ch] text-[1.02rem] text-papel/75 md:mt-6 md:text-lg">{c.linha}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* A pauta que se transforma */}
            <div aria-hidden="true" className="relative order-1 grid place-items-center py-6 lg:order-2 lg:row-span-1 lg:py-0">
              <PautaEmCena etapa={etapa} />
            </div>

            {/* A conta da Move: índice do caminho */}
            <nav aria-label="Etapas do Método Move" className="relative z-10 order-3 mt-5 border-t border-white/12 pt-4 lg:col-span-2 lg:mt-0 md:pt-5">
              <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[0.95rem] md:gap-x-4 md:text-[1.35rem]">
                {CONTA.map((t, i) =>
                  "sinal" in t ? (
                    <span key={i} aria-hidden="true" className="display text-bege/50">
                      {t.sinal}
                    </span>
                  ) : (
                    <button
                      key={i}
                      type="button"
                      onClick={() => irPara(t.capitulo)}
                      className={`conta-termo rounded-full transition-[color,background-color,opacity] duration-700 ${
                        "manuscrita" in t ? "manuscrita text-[1.25em] leading-none" : "display"
                      } ${"destaque" in t ? "px-3 py-0.5" : ""} ${
                        etapa >= t.capitulo
                          ? "destaque" in t
                            ? "bg-bege text-marinho"
                            : "manuscrita" in t
                              ? "text-bege"
                              : "text-papel"
                          : "text-papel/25"
                      }`}
                    >
                      {t.texto}
                    </button>
                  ),
                )}
              </p>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

/** A linha orgânica da IDV, desenhada pela rolagem de ponta a ponta do palco. */
function LinhaDoCaminho({ progresso }: { progresso: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 size-full opacity-60 md:opacity-100">
      <path
        d="M-80 820 C 200 720, 420 900, 700 800 S 880 560, 1080 730 S 1390 580, 1300 340 S 1060 70, 860 190 S 980 -30, 1540 40"
        fill="none"
        stroke="var(--move-azul)"
        strokeWidth="64"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1"
        style={{ strokeDashoffset: 1 - (0.08 + progresso * 0.92), transition: "stroke-dashoffset 120ms linear" }}
      />
    </svg>
  );
}

/** O objeto da cena: uma pauta que nasce, vira vídeo, ganha assinatura e segue acompanhada. */
function PautaEmCena({ etapa }: { etapa: number }) {
  const video = etapa >= 2;
  return (
    <div className="cena relative" data-etapa={etapa}>
      {/* Conteúdos genéricos, que saem de cena quando a pauta ganha a sua cara */}
      <div className={`generico generico-esq ${etapa === 3 ? "visivel" : ""}`}>
        <span className="rotulo">10 dicas de…</span>
        <span className="mt-3 block h-2 w-4/5 rounded bg-current opacity-30" />
        <span className="mt-2 block h-2 w-3/5 rounded bg-current opacity-30" />
        <span className="riscado manuscrita">cara de Google</span>
      </div>
      <div className={`generico generico-dir ${etapa === 3 ? "visivel" : ""}`}>
        <span className="rotulo">Você sabia que…</span>
        <span className="mt-3 block h-2 w-4/5 rounded bg-current opacity-30" />
        <span className="mt-2 block h-2 w-2/5 rounded bg-current opacity-30" />
      </div>

      {/* Fragmentos do especialista, que viram a pauta */}
      {FRAGMENTOS.map((f, i) => (
        <span
          key={f.texto}
          className={`fragmento manuscrita absolute z-20 whitespace-nowrap rounded-full bg-bege px-4 py-1.5 text-[1.15rem] text-marinho md:text-[1.35rem] ${f.lugar} ${etapa === 0 ? "" : "absorvido"}`}
          style={{ "--k": i } as CSSProperties}
        >
          {f.texto}
        </span>
      ))}

      {/* O cartão */}
      <div className={`cartao relative z-10 overflow-hidden rounded-[1.75rem] ${video ? "bg-azul text-papel" : "bg-papel text-marinho"}`}>
        {/* 0: a página em branco */}
        <div className={`camada ${etapa === 0 ? "ativa" : ""} p-6`}>
          <p className="rotulo text-azul/70">Sua próxima pauta</p>
          <div className="mt-6 space-y-3">
            <span className="block h-3 w-4/5 rounded-full bg-marinho/10" />
            <span className="block h-3 w-3/5 rounded-full bg-marinho/10" />
            <span className="cursor-piscando block h-6 w-[2px] bg-azul" />
          </div>
        </div>

        {/* 1: a pauta, escrita a partir do repertório */}
        <div className={`camada ${etapa === 1 ? "ativa" : ""} flex flex-col p-6`}>
          <p className="rotulo text-azul">Pauta · do seu repertório</p>
          <p className="display mt-4 text-[1.1rem] leading-[1.12] md:text-[1.7rem]">A pergunta que eu mais escuto, e o que ninguém responde.</p>
          <div className="mt-auto space-y-2.5 border-t border-marinho/10 pt-4 text-[0.82rem] text-marinho/70">
            <p className="flex justify-between"><span>Origem</span><span className="text-marinho">sua experiência</span></p>
            <p className="flex justify-between"><span>Por quê</span><span className="text-marinho">seu critério</span></p>
          </div>
        </div>

        {/* 2 a 4: o vídeo */}
        <div className={`camada ${video ? "ativa" : ""} flex flex-col p-5`}>
          <div className="flex items-center justify-between">
            <span className="whitespace-nowrap rounded-full bg-white/15 px-2.5 py-1 text-[0.6rem] font-semibold md:px-3 md:text-[0.72rem] uppercase tracking-[0.14em]">Formato viral</span>
            <span className="text-[0.75rem] text-papel/70">0:07</span>
          </div>
          <p className="display mt-auto text-[1.05rem] leading-[1.12] md:text-[1.6rem]">A pergunta que eu mais escuto, e o que ninguém responde.</p>
          <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/20">
            <span className="barra-video block h-full w-full origin-left rounded-full bg-bege" />
          </div>
          <span className="play absolute left-1/2 top-[34%] md:top-[38%] grid size-12 -translate-x-1/2 md:size-16 -translate-y-1/2 place-items-center rounded-full bg-papel/95 text-azul">
            <svg viewBox="0 0 24 24" className="ml-1 size-6" fill="currentColor"><path d="M7 4.5v15l12.5-7.5z" /></svg>
          </span>
          <div className="absolute right-4 top-[46%] hidden flex-col gap-3 md:flex text-papel/80">
            {["M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z", "M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6a2.5 2.5 0 0 1-2.5 2.5H11l-4 3.5V15A2.5 2.5 0 0 1 5 12.5z", "M5 12l14-7-5 14-2.5-5.5z"].map((d) => (
              <svg key={d} viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d={d} /></svg>
            ))}
          </div>
        </div>

      </div>

      {/* 3: a assinatura, escrita por cima do cartão */}
      <span className={`assinatura manuscrita absolute -left-[20%] -top-[13%] z-40 -rotate-[9deg] whitespace-nowrap text-[2rem] leading-none text-bege drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)] md:-left-[30%] md:-top-[12%] md:text-[3rem] ${etapa >= 3 ? "visivel" : ""}`}>
        com a sua cara
      </span>

      {/* 4: o acompanhamento */}
      <div className={`acompanha absolute -bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full bg-papel py-2 pl-2 pr-5 text-marinho shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] ${etapa >= 4 ? "visivel" : ""}`}>
        <span className="grid size-9 place-items-center rounded-full bg-azul text-[0.8rem] font-bold text-papel">M</span>
        <span className="text-[0.85rem] leading-tight">
          <span className="block font-semibold">Leitura do mês com a Move</span>
          <span className="block text-marinho/65">o que manter, ajustar e testar</span>
        </span>
      </div>
      <span className={`orbita ${etapa >= 4 ? "visivel" : ""}`} />
    </div>
  );
}
