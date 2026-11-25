import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { perfil, semana } from "../../config/amostras";

const pauta = semana.find((d) => d.exibir && d.trecho)!;

type Passo = { rotulo: string; titulo: ReactNode; texto: string; tela: () => React.JSX.Element };

/** A dor de quem cria o próprio conteúdo, contada na tela do celular, até a virada no Brasilê. */
const PASSOS: Passo[] = [
  {
    rotulo: "Toda semana",
    titulo: (
      <>
        Você domina o que faz. <span className="text-papel/45">Mas, na hora de postar, a tela fica assim.</span>
      </>
    ),
    texto: "A legenda em branco, o cursor piscando e a mesma pergunta de sempre.",
    tela: TelaLegenda,
  },
  {
    rotulo: "Sem direção",
    titulo: (
      <>
        Aí você copia o que viralizou. <span className="text-papel/45">Posta o que dá, quando dá.</span>
      </>
    ),
    texto: "Trend, template pronto, “5 dicas que ninguém te conta”. Funciona para alguém. Não necessariamente para você.",
    tela: TelaExplorar,
  },
  {
    rotulo: "Sem identidade",
    titulo: (
      <>
        E o seu perfil fica <span className="manuscrita font-normal text-bege">com cara de qualquer um.</span>
      </>
    ),
    texto: "Mesmo formato, mesma legenda, mesmo tom de todo mundo do seu segmento.",
    tela: TelaPerfilIgual,
  },
  {
    rotulo: "Sem motivo para escolher",
    titulo: (
      <>
        O resultado aparece. <span className="text-papel/45">Você, não.</span>
      </>
    ),
    texto: "Quem vê só o acabamento compara pela foto e pelo preço. E a conversa começa e termina no “quanto custa?”.",
    tela: TelaMensagens,
  },
  {
    rotulo: "A virada",
    titulo: (
      <>
        No Studio Brasilê, o cuidado já existia. <span className="text-bege">Faltava aparecer.</span>
      </>
    ),
    texto: "O perfil mostrava resultados, mas explicava pouco o processo. Com a Move, a Andreza ganhou direção: o que dizer, para quem e em qual pauta.",
    tela: TelaComMove,
  },
];

export function CenaDaDor() {
  const ref = useRef<HTMLElement>(null);
  const total = PASSOS.length;
  const [ativo, setAtivo] = useState(0);

  useEffect(() => {
    let pedido = 0;
    const calcular = () => {
      pedido = 0;
      const el = ref.current;
      if (!el) return;
      const curso = el.offsetHeight - window.innerHeight;
      const p = Math.min(0.9999, Math.max(0, -el.getBoundingClientRect().top / curso));
      setAtivo(Math.floor(p * total));
    };
    const agendar = () => {
      if (!pedido) pedido = requestAnimationFrame(calcular);
    };
    calcular();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      cancelAnimationFrame(pedido);
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
    };
  }, [total]);

  const virada = ativo === total - 1;

  // As telas são desenhadas em 260 px de largura e escalam para o tamanho do celular.
  const celular = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = celular.current;
    if (!el || !("ResizeObserver" in window)) return;
    const obs = new ResizeObserver(() => {
      const tela = el.querySelector<HTMLElement>(".celular-tela");
      if (tela) el.style.setProperty("--s", String(tela.clientWidth / 260));
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Por que o conteúdo trava"
      className="cena-dor relative"
      data-virada={virada || undefined}
      style={{ height: `calc(100svh + ${total - 1} * 75svh)` } as CSSProperties}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div aria-hidden="true" className="cena-dor-fundo" />
        <div className="envoltorio relative flex h-full flex-col justify-center gap-5 pb-20 pt-[4.5rem] md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-16 md:py-0">
          {/* Celular */}
          <div className="order-first flex justify-center md:order-last">
            <div ref={celular} className="celular" aria-hidden="true">
              <div className="celular-ilha" />
              {PASSOS.map((p, i) => (
                <div key={i} className="celular-tela" data-estado={i === ativo ? "agora" : i < ativo ? "antes" : "depois"}>
                  <div className="tela-escala">
                    <p.tela />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Texto */}
          <div className="relative min-h-[15.5rem] sm:min-h-[14rem] md:min-h-[24rem]">
            {PASSOS.map((p, i) => (
              <div key={i} className="frase-dor" data-estado={i === ativo ? "agora" : i < ativo ? "antes" : "depois"} aria-hidden={i !== ativo}>
                <p className={`rotulo flex items-center gap-3 ${i === total - 1 ? "text-bege" : "text-papel/50"}`}>
                  <span className="font-titulo tabular-nums">0{i + 1}</span>
                  <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
                  {p.rotulo}
                </p>
                <h2 className="display mt-4 max-w-[18ch] text-[1.95rem] sm:text-[2.6rem] lg:text-[3.9rem]">{p.titulo}</h2>
                <p className="mt-4 max-w-[44ch] text-[0.98rem] text-papel/60 md:text-lg">{p.texto}</p>
              </div>
            ))}
            <div aria-hidden="true" className="absolute -bottom-2 left-0 flex items-center gap-2 md:bottom-0">
              {PASSOS.map((_, i) => (
                <span key={i} className={`h-[3px] rounded-full transition-all duration-500 ${i === ativo ? "w-10 bg-bege" : i < ativo ? "w-4 bg-papel/40" : "w-4 bg-papel/15"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Telas do celular ---------- */

function Topo({ titulo, claro = false }: { titulo: string; claro?: boolean }) {
  return (
    <div className={`flex items-center justify-between border-b px-4 pb-2.5 pt-9 text-[0.72rem] font-semibold ${claro ? "border-marinho/10" : "border-white/10"}`}>
      <span className="text-[1rem] leading-none">‹</span>
      <span>{titulo}</span>
      <span className={claro ? "text-azul" : "text-azul-medio"}>Avançar</span>
    </div>
  );
}

function TelaLegenda() {
  return (
    <div className="flex h-full flex-col">
      <Topo titulo="Nova publicação" />
      <div className="mx-4 mt-4 grid aspect-square place-items-center rounded-lg bg-white/[0.06] ring-1 ring-white/10">
        <svg viewBox="0 0 24 24" className="size-8 text-papel/25" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="10" r="1.6" />
          <path d="M4 17l5-5 4 4 3-3 4 4" />
        </svg>
      </div>
      <div className="mx-4 mt-4 rounded-lg bg-white/[0.04] p-3 text-[1rem]">
        <span className="digitando text-papel/85">o que eu posto hoje?</span>
        <span className="cursor" />
      </div>
      <div className="mt-auto flex flex-col gap-2 px-4 pb-5 text-[0.68rem] text-papel/35">
        <span className="border-t border-white/10 pt-2">Marcar pessoas</span>
        <span className="border-t border-white/10 pt-2">Adicionar localização</span>
      </div>
    </div>
  );
}

const VIRAIS = [
  "5 dicas que ninguém te conta",
  "POV: você no primeiro dia",
  "Você sabia?",
  "Trend do momento",
  "3 erros que você comete",
  "Antes e depois",
  "Comente EU QUERO",
  "Rotina de quem empreende",
  "Não faça isso",
];

function TelaExplorar() {
  return (
    <div className="flex h-full flex-col">
      <div className="mx-3 mt-9 rounded-lg bg-white/[0.07] px-3 py-2 text-[0.68rem] text-papel/45">Pesquisar</div>
      <div className="relative mt-3 flex-1 overflow-hidden">
        <div className="rolar-feed grid grid-cols-3 gap-[2px]">
          {[...VIRAIS, ...VIRAIS].map((v, i) => (
            <div key={i} className={`flex aspect-[3/4] items-end p-1.5 ${i % 4 === 0 ? "bg-[#2a3456]" : i % 3 === 0 ? "bg-[#1f2945]" : "bg-[#252e4d]"}`}>
              <span className="text-[0.62rem] font-semibold leading-tight text-papel/80">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TelaPerfilIgual() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-4 pt-10">
        <span className="size-11 shrink-0 rounded-full bg-white/10" />
        <div className="grid flex-1 grid-cols-3 text-center text-[0.6rem] text-papel/50">
          <span>
            <b className="block text-[0.8rem] text-papel/85">87</b>posts
          </span>
          <span>
            <b className="block text-[0.8rem] text-papel/85">···</b>seguidores
          </span>
          <span>
            <b className="block text-[0.8rem] text-papel/85">···</b>seguindo
          </span>
        </div>
      </div>
      <p className="px-4 pt-2 text-[0.72rem] font-semibold">Seu negócio</p>
      <p className="px-4 text-[0.66rem] text-papel/45">Seu nome · Seu nome · Seu nome</p>
      <div className="mt-4 grid grid-cols-3 gap-[2px]">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="flex aspect-[3/4] flex-col items-center justify-center gap-1 bg-[#222b47] p-1 text-center">
            <span className="h-[3px] w-6 rounded bg-papel/25" />
            <span className="text-[0.5rem] font-semibold uppercase tracking-wide text-papel/40">dica do dia</span>
            <span className="h-[3px] w-4 rounded bg-papel/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TelaMensagens() {
  const msgs = ["Oi! Quanto custa?", "Qual o valor?", "Faz quanto?", "Quanto tá?"];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 pb-2.5 pt-9 text-[0.72rem] font-semibold">
        <span className="text-[1rem] leading-none">‹</span> Mensagens
      </div>
      <ul className="flex flex-col">
        {msgs.map((m, i) => (
          <li key={m} className="mensagem flex items-center gap-3 px-4 py-3" style={{ ["--i" as string]: i } as CSSProperties}>
            <span className="size-9 shrink-0 rounded-full bg-white/10" />
            <span className="min-w-0 flex-1">
              <span className="block text-[0.8rem] font-semibold text-papel/85">Nova mensagem</span>
              <span className="block truncate text-[0.85rem] text-papel/70">{m}</span>
            </span>
            <span className="size-2 rounded-full bg-azul-medio" />
          </li>
        ))}
      </ul>
      <p className="mt-auto px-4 pb-6 text-center text-[0.62rem] text-papel/35">E depois do preço, silêncio.</p>
    </div>
  );
}

function TelaComMove() {
  return (
    <div className="flex h-full flex-col bg-papel text-marinho">
      <div className="flex items-center gap-3 px-4 pt-10">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-marinho font-titulo text-[0.7rem] font-semibold text-bege">SB</span>
        <div className="min-w-0">
          <p className="truncate text-[0.78rem] font-semibold">{perfil.arroba}</p>
          <p className="truncate text-[0.62rem] text-suave">Bio proposta pela Move</p>
        </div>
      </div>
      <ul className="px-4 pt-2 text-[0.78rem] leading-snug">
        {perfil.bioProposta.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <div className="flex gap-2.5 px-4 pt-3">
        {perfil.destaques.slice(0, 5).map((d) => (
          <span key={d.nome} className="flex flex-col items-center gap-1">
            <span className="size-8 rounded-full bg-bege ring-1 ring-marinho/15" />
            <span className="text-[0.5rem] text-suave">{d.nome}</span>
          </span>
        ))}
      </div>
      <div className="mx-3 mt-4 rounded-xl bg-bege p-3">
        <p className="text-[0.52rem] font-bold uppercase tracking-[0.14em] text-azul">
          Pauta · {pauta.dia} {pauta.data} · {pauta.formato.split(" ·")[0]}
        </p>
        <p className="mt-1.5 font-titulo text-[0.95rem] font-semibold leading-tight">{pauta.titulo}</p>
        <p className="mt-1.5 text-[0.6rem] leading-snug text-suave">Objetivo, roteiro, materiais e chamada para ação.</p>
      </div>
      <p className="manuscrita mt-auto pb-5 text-center text-[1.15rem] text-azul">com a Move por perto</p>
    </div>
  );
}
