import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { oferta } from "../config/oferta";
import { contatos } from "../config/site";
import { dataBrasilia, estadoDaCampanha } from "../lib/campanha";
import { arquivo, href } from "../lib/rotas";
import { registrar } from "../lib/medicao";
import { Pagina } from "../componentes/Estrutura";
import { abrirContato, linkWhatsApp } from "../componentes/Contato";
import { Marca } from "../componentes/Marca";
import { Contagem, FundoGrafismo, Letreiro, MGigante } from "../componentes/Movimento";
import { Seta } from "../componentes/Botao";

const estado = estadoDaCampanha();
const c = oferta.campanha;

type Opcao = {
  id: "planejamento" | "gestao" | "jornada" | "projetos";
  pedido: string;
  servico: string;
  texto: string;
  cta: string;
  icone: string;
};

/** Os quatro caminhos da Move, que são também as opções do briefing. */
const OPCOES: Opcao[] = [
  {
    id: "planejamento",
    pedido: "Organizar meu conteúdo",
    servico: "Planejamento Estratégico",
    texto: "Estratégia e 24 pautas escritas para você produzir com direção, com acompanhamento por dois meses.",
    cta: "Ver o Planejamento",
    icone: "M5 4.5h14v15H5z M8.5 9h7 M8.5 12.5h7 M8.5 16h4",
  },
  {
    id: "gestao",
    pedido: "Delegar minhas redes",
    servico: "Gestão de Redes",
    texto: "A Move cuida da estratégia, do calendário, da produção e da publicação, todo mês.",
    cta: "Conversar sobre a gestão",
    icone: "M4 12a8 8 0 1 0 16 0a8 8 0 1 0 -16 0 M12 8v4l2.8 2",
  },
  {
    id: "jornada",
    pedido: "Arrumar meus canais",
    servico: "Jornada do Cliente",
    texto: "Site, link na bio, Google, Instagram e WhatsApp levando a pessoa até o seu atendimento.",
    cta: "Ver a Jornada do Cliente",
    icone: "M5 6.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0 M16 17.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0 M8 6.5h5a3 3 0 0 1 0 6h-2a3 3 0 0 0 0 6h5",
  },
  {
    id: "projetos",
    pedido: "Um projeto específico",
    servico: "Projetos sob orçamento",
    texto: "Site, identidade visual, carrossel ou edição de vídeo, com escopo e prazo definidos.",
    cta: "Apresentar meu projeto",
    icone: "M12 4l2.2 4.6 5 .7-3.6 3.5.9 5L12 15.4 7.5 17.8l.9-5L4.8 9.3l5-.7z",
  },
];

function IconeTraco({ d, className = "size-5" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

function IconeWhatsApp({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 19.5l1.2-3.6A7.8 7.8 0 1 1 8.4 18.6z" />
      <path d="M9.3 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .4-.1.6l-.5.6c.6 1.1 1.4 1.9 2.5 2.5l.6-.5c.2-.1.4-.2.6-.1l1.4.6c.3.1.4.3.4.5v.5c0 .3-.1.6-.6.8-.6.3-1.6.4-3.3-.6a9 9 0 0 1-3-3c-1-1.7-.9-2.7-.6-3.3z" />
    </svg>
  );
}

function IconeInstagram({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.7" cy="7.3" r="0.6" fill="currentColor" />
    </svg>
  );
}

function destaque() {
  const titulo = "Dois meses sabendo o que postar";
  const pitch = "A estratégia da sua marca e 24 pautas prontas para gravar, com a Move acompanhando.";
  if (estado === "ativa")
    return {
      selo: `Black · ${Math.round((1 - c.preco / oferta.regular.preco) * 100)}% off · até ${dataBrasilia(c.fim)}`,
      titulo,
      texto: pitch,
      cta: "Garantir o preço da Black",
    };
  if (estado === "pre")
    return {
      selo: `Black · ${dataBrasilia(c.inicio)} a ${dataBrasilia(c.fim)}`,
      titulo,
      texto: pitch,
      cta: "Ver a oferta da Black",
    };
  if (estado === "esgotada")
    return {
      selo: `${c.nomeCurto} · agenda preenchida`,
      titulo: "Quero direção para o meu conteúdo",
      texto: "A agenda da Black foi preenchida. Veja a entrega e fale sobre a próxima disponibilidade.",
      cta: "Ver a entrega",
    };
  return {
    selo: oferta.produto,
    titulo: "Quero direção para produzir meu conteúdo",
    texto: "Estratégia, 24 pautas e acompanhamento.",
    cta: "Conhecer o Planejamento",
  };
}

export function PaginaLinks() {
  const [objetivo, setObjetivo] = useState<Opcao["id"] | null>(null);
  const [flutuante, setFlutuante] = useState(false);
  const d = destaque();
  const escolhido = OPCOES.find((o) => o.id === objetivo);
  const whats = linkWhatsApp("geral");

  useEffect(() => {
    const ver = () => setFlutuante(window.scrollY > 520);
    ver();
    window.addEventListener("scroll", ver, { passive: true });
    return () => window.removeEventListener("scroll", ver);
  }, []);

  const escolher = (id: Opcao["id"]) => {
    const novo = objetivo === id ? null : id;
    setObjetivo(novo);
    if (novo) registrar("escolher_objetivo", { objetivo: id });
  };
  const seguir = (o: Opcao) => {
    if (o.id === "planejamento" || o.id === "jornada") {
      location.href = href(o.id);
      return;
    }
    abrirContato(o.id);
  };

  return (
    <Pagina>
      <main id="conteudo" className="relative min-h-dvh overflow-hidden bg-papel">
        {/* Topo: azul com o M e a assinatura */}
        <div data-rolagem className="textura relative h-60 overflow-hidden bg-azul md:h-72">
          <FundoGrafismo tom="realce" tamanho="max(900px, 140%)" posicao="40% 30%" forca={60} />
          <div aria-hidden="true" className="m-entrada absolute inset-0">
            <MGigante inteiro forca={90} className="absolute -right-[62%] top-[22%] h-[150%] w-auto max-w-none md:right-[6%]" />
          </div>
          <p aria-hidden="true" className="manuscrita surgir absolute left-5 top-8 -rotate-3 text-[1.5rem] text-bege md:left-[calc(50%-15rem)] md:text-[1.8rem]" style={{ ["--atraso" as string]: "500ms" }}>
            Marketing com processo
            <br />e movimento.
          </p>
        </div>

        <div className="relative mx-auto -mt-16 flex max-w-[34rem] flex-col px-5 pb-28">
          {/* Avatar com a assinatura girando em volta */}
          <div className="relative size-32">
            <svg viewBox="0 0 200 200" aria-hidden="true" className="girar absolute inset-0 size-full text-marinho">
              <defs>
                <path id="circulo-assinatura" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
              </defs>
              <circle cx="100" cy="100" r="99" className="fill-papel" />
              <text className="fill-current font-titulo text-[15px] font-semibold uppercase">
                <textPath href="#circulo-assinatura" textLength="512" lengthAdjust="spacing">
                  Agência digital · Move · Agência digital · Move ·
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-[22%] grid place-items-center rounded-full bg-azul">
              <img src={arquivo("marca/m-claro.webp")} alt="" aria-hidden="true" className="w-1/2" />
            </div>
          </div>
          <h1 className="mt-5">
            <Marca className="h-8" />
          </h1>
          <p className="display mt-4 text-[1.65rem] leading-[1.12]">Estratégia e conteúdo para mostrar o valor do seu trabalho.</p>

          {/* Contato direto, logo no topo */}
          <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
            {whats ? (
              <a
                href={whats}
                target="_blank"
                rel="noopener"
                onClick={() => registrar("abrir_whatsapp", { pagina: "links", lugar: "topo" })}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-marinho px-5 font-semibold text-papel transition-transform active:scale-[0.98]"
              >
                <IconeWhatsApp /> Falar no WhatsApp
              </a>
            ) : (
              <button type="button" onClick={() => abrirContato("geral")} className="min-h-12 rounded-full bg-marinho px-5 font-semibold text-papel">
                Falar com a Move
              </button>
            )}
            {contatos.instagram && (
              <a
                href={contatos.instagram}
                target="_blank"
                rel="noopener"
                aria-label="Instagram da Move"
                className="grid size-12 place-items-center rounded-full text-marinho ring-1 ring-marinho/20 transition-colors hover:bg-marinho hover:text-papel"
              >
                <IconeInstagram />
              </a>
            )}
          </div>

          {/* Números da Move */}
          <dl className="mt-6 grid grid-cols-3 gap-2 text-center">
            {[
              { v: 4, p: "+", r: "anos de\nmercado" },
              { v: 20, p: "+", r: "negócios\natendidos" },
              { v: 4, p: "", r: "estados com\nequipe Move" },
            ].map((n) => (
              <div key={n.r} className="flex flex-col-reverse items-center gap-1.5 rounded-2xl bg-white/70 px-2 py-3 ring-1 ring-linha">
                <dt className="min-h-[2.5em] whitespace-pre-line text-[0.75rem] leading-tight text-suave">{n.r}</dt>
                <dd className="display text-[1.9rem] leading-none text-azul">
                  <Contagem valor={n.v} prefixo={n.p} />
                </dd>
              </div>
            ))}
          </dl>

          {/* Destaque da campanha (ou do Planejamento regular) */}
          <Brilho className="mt-7 rounded-[1.75rem]">
            <a
              href={href("planejamento")}
              onClick={() => registrar("clique_cta_principal", { pagina: "links", estado })}
              className="group relative block overflow-hidden rounded-[1.75rem] bg-azul text-papel transition-transform duration-200 active:scale-[0.99]"
            >
              {/* O M da IDV entra pelo canto de baixo, ao lado do botão, sem cruzar o texto */}
              <img
                src={arquivo("marca/m-inteiro-realce.webp")}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 -right-6 h-[8rem] w-auto max-w-none transition-transform duration-700 group-hover:-translate-y-1 group-hover:rotate-[-3deg]"
              />
              <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-20 size-64 rounded-full bg-[radial-gradient(circle,rgb(106_146_193/0.35),transparent_65%)]" />
              <div className="relative p-5">
                <p className="rotulo text-bege">{d.selo}</p>
                <p className="display mt-2 text-balance text-[2.05rem] leading-[1.05]">{d.titulo}</p>
                <p className="mt-2 text-pretty text-[0.98rem] leading-snug text-papel/80">{d.texto}</p>
                {/* O botão herda o giro do antigo selo: uma luz bege corre pela borda */}
                <span className="botao-giro mt-4 flex rounded-full p-[2px]">
                  <span className="relative z-[1] inline-flex min-h-12 w-full items-center justify-between gap-2 rounded-full bg-papel px-5 font-semibold text-azul">
                    {d.cta} <Seta className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
                <div className="mt-3 text-center">
                  <Contador />
                </div>
              </div>
            </a>
          </Brilho>

          {/* Briefing de 10 segundos: as opções são os próprios caminhos */}
          <section aria-labelledby="titulo-briefing" className="escuro relative mt-8 overflow-hidden rounded-[1.75rem] bg-marinho p-5 text-papel md:p-6">
            <FundoGrafismo tom="azul" tamanho="620px" posicao="100% 0%" forca={0} mascara="radial-gradient(55% 45% at 100% 0%, #000 30%, transparent 80%)" />
            <div className="relative">
              <p className="rotulo text-bege/80">Briefing de 10 segundos</p>
              <h2 id="titulo-briefing" className="display mt-2 max-w-[16ch] text-[1.6rem] leading-[1.08]">
                O que você quer resolver agora?
              </h2>
              <div role="group" aria-labelledby="titulo-briefing" className="mt-5 grid grid-cols-2 gap-2.5">
                {OPCOES.map((o, i) => (
                  <button
                    key={o.id}
                    type="button"
                    aria-pressed={objetivo === o.id}
                    onClick={() => escolher(o.id)}
                    className="opcao-briefing group relative flex min-h-[8.5rem] flex-col justify-start gap-4 rounded-[1.25rem] p-4 text-left ring-1 ring-white/12 transition-[background-color,color,transform,box-shadow] duration-300 active:scale-[0.98] aria-pressed:bg-papel aria-pressed:text-marinho aria-pressed:ring-papel"
                    style={{ ["--atraso" as string]: `${i * 70}ms` }}
                  >
                    <span className="flex items-center justify-between">
                      <span className="grid size-10 place-items-center rounded-full bg-white/[0.08] text-bege transition-colors group-aria-pressed:bg-azul group-aria-pressed:text-papel">
                        <IconeTraco d={o.icone} />
                      </span>
                      <span aria-hidden="true" className="grid size-5 place-items-center rounded-full ring-1 ring-white/25 transition-colors group-aria-pressed:bg-azul group-aria-pressed:ring-azul">
                        <span className="size-1.5 scale-0 rounded-full bg-papel transition-transform group-aria-pressed:scale-100" />
                      </span>
                    </span>
                    <span>
                      <span className="display block text-[1.05rem] leading-tight">{o.pedido}</span>
                      <span className="mt-1 block text-[0.78rem] text-papel/55 group-aria-pressed:text-marinho/60">{o.servico}</span>
                    </span>
                  </button>
                ))}
              </div>

              {/* Resposta do briefing */}
              <div aria-live="polite" className="mt-3">
                {escolhido ? (
                  <div key={escolhido.id} className="entrar relative overflow-hidden rounded-[1.25rem] bg-bege p-5 text-marinho">
                    <p className="rotulo text-azul">Seu caminho</p>
                    <p className="display mt-1.5 text-[1.5rem] leading-tight">{escolhido.servico}</p>
                    <p className="mt-2 text-[0.95rem] text-marinho/75">{escolhido.texto}</p>
                    <div className="mt-4 flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => seguir(escolhido)}
                        className="inline-flex min-h-12 w-full items-center justify-between gap-2 rounded-full bg-azul px-5 font-semibold text-papel transition-transform active:scale-[0.98]"
                      >
                        {escolhido.cta} <Seta className="size-4" />
                      </button>
                      {escolhido.id !== "planejamento" && linkWhatsApp(escolhido.id) && (
                        <a
                          href={linkWhatsApp(escolhido.id)!}
                          target="_blank"
                          rel="noopener"
                          onClick={() => registrar("abrir_whatsapp", { pagina: "links", servico: escolhido.id })}
                          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-3 font-semibold text-azul"
                        >
                          <IconeWhatsApp /> Direto no WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="flex items-start gap-2.5 px-1 py-2 text-sm text-papel/60">
                    <span aria-hidden="true" className="mt-[0.45rem] size-1.5 shrink-0 animate-pulse rounded-full bg-bege" />
                    Toque em uma opção e a Move mostra o seu caminho.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Fechamento: um pitch da Move inteira e um botão só */}
          <section aria-labelledby="titulo-move" className="mt-14 text-center" data-revelar>
            <p className="rotulo text-azul">A Move</p>
            <h2 id="titulo-move" className="display mx-auto mt-3 max-w-[16ch] text-[2.1rem] leading-[1.04]">
              O melhor do seu negócio, <span className="manuscrita pr-1.5 text-[1.2em] text-azul">visível</span> antes da contratação.
            </h2>
            <p className="mx-auto mt-4 max-w-[34ch] text-suave">
              Estratégia, conteúdo e canais pensados pelo mesmo método, com a Move por perto. Por isso quem entra fica anos.
            </p>
            <a
              href={href("metodo")}
              onClick={() => registrar("clique_cta_principal", { pagina: "links", lugar: "fechamento" })}
              className="group mt-7 inline-flex min-h-14 items-center gap-2 rounded-full bg-marinho px-7 font-semibold text-papel transition-transform active:scale-[0.98]"
            >
              Quero conhecer a Move <Seta className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </section>

          <Letreiro
            className="-mx-5 mt-12 border-y border-marinho/10 bg-bege py-3 text-marinho"
            itens={["Estratégia", "Continuidade", "Parceria", "Método", "Movimento"]}
            classeItem="display text-[1.6rem]"
            separador={<span className="manuscrita text-[1.5rem] text-azul">e</span>}
            duracao={30}
          />

          <footer className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-suave">
            {contatos.instagram && (
              <a href={contatos.instagram} target="_blank" rel="noopener" className="min-h-11 content-center">
                Instagram
              </a>
            )}
            {whats && (
              <a href={whats} target="_blank" rel="noopener" className="min-h-11 content-center">
                WhatsApp
              </a>
            )}
            <a href={href("privacidade")} className="min-h-11 content-center">
              Privacidade
            </a>
          </footer>
        </div>

        {/* WhatsApp sempre à mão depois do topo */}
        {whats && (
          <a
            href={whats}
            target="_blank"
            rel="noopener"
            aria-label="Falar com a Move no WhatsApp"
            tabIndex={flutuante ? 0 : -1}
            onClick={() => registrar("abrir_whatsapp", { pagina: "links", lugar: "flutuante" })}
            className={`fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-marinho pl-4 pr-5 font-semibold text-papel shadow-[0_18px_40px_-14px_rgba(19,32,63,0.75)] ring-1 ring-white/10 transition-[opacity,transform] duration-300 ${
              flutuante ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
            }`}
          >
            <IconeWhatsApp className="size-6 text-bege" /> WhatsApp
          </a>
        )}
      </main>
    </Pagina>
  );
}

const reduzido = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Luz que acompanha o dedo ou o mouse, com uma leve inclinação no computador. */
function Brilho({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mover = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduzido()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--x", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--y", `${(y * 100).toFixed(1)}%`);
    if (e.pointerType === "mouse") {
      el.style.setProperty("--rx", `${((0.5 - y) * 5).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((x - 0.5) * 5).toFixed(2)}deg`);
    }
  };
  const sair = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  return (
    <div ref={ref} onPointerMove={mover} onPointerDown={mover} onPointerLeave={sair} className={`brilho relative ${className}`}>
      {children}
    </div>
  );
}

/** Contagem regressiva da campanha, no horário de Brasília. */
function Contador() {
  const alvo = estado === "ativa" ? Date.parse(c.fim) : estado === "pre" ? Date.parse(c.inicio) : null;
  const [agora, setAgora] = useState(() => Date.now());
  useEffect(() => {
    if (!alvo) return;
    const t = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(t);
  }, [alvo]);
  if (!alvo || alvo <= agora) return null;
  const s = Math.floor((alvo - agora) / 1000);
  const partes = [
    { v: Math.floor(s / 86400), r: "dias" },
    { v: Math.floor((s % 86400) / 3600), r: "horas" },
    { v: Math.floor((s % 3600) / 60), r: "min" },
    { v: s % 60, r: "seg" },
  ];
  const [d, h, m, seg] = partes.map((p) => String(p.v).padStart(2, "0"));
  return (
    <p className="text-[0.8rem] leading-tight text-papel/70" role="timer" aria-label={`${partes[0].v} dias, ${partes[1].v} horas e ${partes[2].v} minutos`}>
      {estado === "ativa" ? "Termina em" : "Começa em"}
      <span aria-hidden="true" className="ml-1.5 font-titulo text-[1rem] font-semibold tabular-nums text-papel">
        {partes[0].v > 0 && `${d}d `}{h}h {m}m {seg}s
      </span>
    </p>
  );
}
