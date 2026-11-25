import { useEffect, useRef, useState } from "react";
import { oferta } from "../../config/oferta";
import { estrategia, perfil, semana } from "../../config/amostras";
import { dataBrasilia, emCampanha, estadoDaCampanha, parcelasBlack, prazoCampanha, reais } from "../../lib/campanha";
import { href } from "../../lib/rotas";
import { registrar } from "../../lib/medicao";
import { Cabecalho, Pagina, Rodape } from "../../componentes/Estrutura";
import { Seta } from "../../componentes/Botao";
import { abrirContato } from "../../componentes/Contato";
import { Faq, type Pergunta } from "../../componentes/Faq";
import { Letreiro, TituloCinetico } from "../../componentes/Movimento";
import { Demonstracao } from "./Demonstracao";
import { Contratar } from "./Contratar";
import { Contador } from "./Contador";
import { CenaDaDor } from "./CenaDaDor";

const estado = estadoDaCampanha();
const campanha = emCampanha(estado);
const c = oferta.campanha;
const economia = oferta.regular.preco - c.preco;
const parcelas = parcelasBlack();
const pauta = semana.find((d) => d.exibir && d.trecho)!;

function atualizarSeo() {
  if (estado === "ativa") document.title = `Black Move | Planejamento de ${reais(oferta.regular.preco)} por ${reais(c.preco)}`;
  else if (estado === "pre") document.title = `Black Move | Planejamento por ${reais(c.preco)} a partir de ${dataBrasilia(c.inicio)}`;
}

const EYEBROW: Record<typeof estado, string> = {
  pre: `Black Move · começa em ${dataBrasilia(c.inicio)}`,
  ativa: `Black Move · até ${dataBrasilia(c.fim)}`,
  esgotada: "Black Move · agenda preenchida",
  encerrada: oferta.produto,
  "sem-campanha": oferta.produto,
};


export function PaginaPlanejamento() {
  useEffect(atualizarSeo, []);
  const heroi = useRef<HTMLElement>(null);
  const preco = useRef<HTMLElement>(null);
  const barra = useBarraFixa(heroi, preco);
  const duvida = () => abrirContato(campanha ? "duvida-black" : "planejamento");

  return (
    <Pagina>
      <div className="noite min-h-svh text-papel">
        {estado === "encerrada" && new URLSearchParams(location.search).has("de-black") && (
          <p className="bg-bege py-3 text-center text-sm text-marinho">A Black encerrou. O Planejamento continua.</p>
        )}
        <Cabecalho
          noturno
          itens={[
            { rotulo: "A entrega", href: "#entregaveis" },
            { rotulo: "Como funciona", href: "#como-funciona" },
            { rotulo: campanha ? "Preço da Black" : "Investimento", href: "#investimento" },
            { rotulo: "Dúvidas", href: "#duvidas" },
          ]}
          acao={{ rotulo: "Tirar uma dúvida", onClick: duvida }}
        />
        <main id="conteudo" className="escuro">
          {/* 1. Abertura: o desejo e o preço */}
          <section ref={heroi} className="holofote relative overflow-hidden">
            <div className="envoltorio grid gap-12 pb-16 pt-10 md:pb-24 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
              <div className="relative z-10">
                <p className="rotulo surgir inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-4 py-2 text-bege ring-1 ring-white/10">
                  {campanha && <span aria-hidden="true" className="pulso size-1.5 rounded-full bg-terracota" />}
                  {EYEBROW[estado]}
                </p>
                <TituloCinetico
                  texto="O planejamento que a Andreza recebeu."
                  destaque="Agora para o seu negócio."
                  classeDestaque="text-bege"
                  className="display mt-6 text-[2.55rem] sm:text-[3.4rem] lg:text-[4.4rem]"
                />
                <p className="surgir mt-6 max-w-[48ch] text-[1.05rem] text-papel/70 md:text-lg" style={{ ["--atraso" as string]: "650ms" }}>
                  Estratégia, perfil e 24 pautas escritas para oito semanas, pelo mesmo método do Studio Brasilê. Você sabe exatamente o que postar, por que postar e como produzir.
                </p>

                <div className="surgir mt-8" style={{ ["--atraso" as string]: "800ms" }}>
                  <PrecoDrama />
                </div>

                <div className="surgir mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ ["--atraso" as string]: "950ms" }}>
                  <a
                    href="#investimento"
                    onClick={() => registrar("clique_cta_principal", { pagina: "planejamento" })}
                    className="group inline-flex min-h-14 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-bege px-7 text-[1.02rem] font-semibold text-marinho shadow-[0_18px_50px_-18px_rgba(236,220,195,0.55)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    {estado === "ativa" ? "Quero a mesma entrega" : estado === "pre" ? "Ver a condição da Black" : "Quero o meu Planejamento"}
                    <Seta className="size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a href="#entregaveis" className="inline-flex min-h-12 items-center justify-center gap-2 px-2 text-[0.95rem] text-papel/80 underline decoration-white/30 underline-offset-[6px] hover:text-papel">
                    Ver a entrega da Andreza
                  </a>
                </div>
                <Contador estado={estado} className="surgir mt-9" />
              </div>

              <LequeDaEntrega />
            </div>
          </section>

          {/* Faixa da Black */}
          <section aria-label={campanha ? "Black Move" : "O que a entrega reúne"} className="border-y border-white/10 py-4 md:py-5">
            <Letreiro
              itens={
                campanha
                  ? ["Black Move", `De ${reais(oferta.regular.preco)} por ${reais(c.preco)}`, `${dataBrasilia(c.inicio)} a ${dataBrasilia(c.fim)}`, "24 pautas escritas", "Vagas por ordem de contratação"]
                  : ["Diagnóstico", "Estratégia", "24 pautas", "Oito semanas", "Dois meses de acompanhamento"]
              }
              classeItem="font-titulo text-[1.6rem] font-semibold uppercase tracking-[-0.01em] text-transparent [-webkit-text-stroke:1px_rgba(236,220,195,0.7)] md:text-[2.4rem]"
              separador={<span className="text-[1.4rem] text-terracota md:text-[2rem]">✦</span>}
              duracao={40}
            />
          </section>

          {/* 2. A dor, em cena */}
          <CenaDaDor />

          {/* 3. A virada: antes e depois no Brasilê */}
          <section id="virada" className="relative py-20 md:py-28">
            <div className="envoltorio">
              <div className="max-w-3xl" data-revelar>
                <p className="rotulo text-bege">O que muda</p>
                <h2 className="display mt-4 text-[2.3rem] md:text-[3.6rem]">
                  O trabalho era o mesmo. <span className="text-papel/45">O que mudou foi o jeito de mostrar.</span>
                </h2>
              </div>
              <ol className="mt-12 flex flex-col gap-4 md:mt-16 md:gap-5">
                {VIRADAS.map((v, i) => (
                  <li key={v.tema} className="virada grid overflow-hidden rounded-[1.75rem] ring-1 ring-white/10 md:grid-cols-[0.8fr_auto_1.2fr]" data-revelar style={{ ["--atraso" as string]: `${i * 60}ms` }}>
                    <div className="bg-white/[0.025] p-6 md:p-8">
                      <p className="text-xs uppercase tracking-[0.18em] text-papel/40">Antes · {v.tema}</p>
                      <p className="mt-3 text-[1.02rem] text-papel/55">{v.antes}</p>
                    </div>
                    <div aria-hidden="true" className="flex items-center justify-center bg-white/[0.025] md:bg-transparent">
                      <span className="seta-virada grid size-11 place-items-center rounded-full bg-bege text-marinho">
                        <Seta className="size-4 rotate-90 md:rotate-0" />
                      </span>
                    </div>
                    <div className="depois p-6 md:p-8">
                      <p className="text-xs uppercase tracking-[0.18em] text-bege">Com a Move</p>
                      <div className="mt-3">{v.depois}</div>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-6 max-w-3xl text-sm text-papel/45">
                Recortes reais do trabalho do Studio Brasilê. A Move fez a estratégia, os textos e as orientações; a Andreza produziu e publicou. O case mostra a entrega, sem números de vendas ou seguidores.
              </p>
            </div>
          </section>

          {/* 4. A entrega por dentro */}
          <section id="entregaveis" className="relative py-20 md:py-28">
            <div aria-hidden="true" className="holofote-baixo pointer-events-none absolute inset-0" />
            <div className="envoltorio relative">
              <div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr] md:items-end" data-revelar>
                <div>
                  <p className="rotulo text-bege">Abra a entrega</p>
                  <h2 className="display mt-4 text-[2.3rem] md:text-[3.4rem]">Mexa no que a Andreza recebeu.</h2>
                </div>
                <p className="text-papel/65 md:pb-2">
                  Toque nas abas. Cada amostra mostra se aquele material entra no seu pacote. O método é o mesmo; a estratégia é feita para o seu negócio.
                </p>
              </div>
              <div className="mesa mt-10 overflow-hidden rounded-[2rem] bg-offwhite p-3 text-marinho md:p-6" data-revelar>
                <Demonstracao contido />
              </div>
            </div>
          </section>

          {/* 5. O preço: de 1.800 por 1.000 */}
          <section id="investimento" ref={preco} className="relative overflow-hidden py-20 md:py-28">
            <div className="envoltorio">
              <div className="max-w-3xl" data-revelar>
                <p className="rotulo text-bege">{campanha ? "Black Move" : "Investimento"}</p>
                <h2 className="display mt-4 text-[2.3rem] md:text-[3.6rem]">
                  {campanha ? (
                    <>
                      Tudo isso vale {reais(oferta.regular.preco)}. <span className="text-bege">Na Black, sai por {reais(c.preco)}.</span>
                    </>
                  ) : (
                    <>Oito semanas de conteúdo com direção, do diagnóstico à última pauta.</>
                  )}
                </h2>
              </div>

              <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                <Cupom />
                <div className="flex flex-col gap-6 rounded-[2rem] bg-gradient-to-b from-[#16224a] to-[#0c1430] p-6 ring-1 ring-white/12 md:p-10 lg:sticky lg:top-24" data-revelar>
                  <BlocoPreco />
                  <Contratar estado={estado} claro />
                  <Contador estado={estado} />
                  <p className="text-sm text-papel/60">{oferta.pagamento}</p>
                  {oferta.equipe.repasse.confirmado && estado === "ativa" && (
                    <p className="rounded-2xl bg-white/[0.06] p-4 text-sm text-papel/80">{oferta.equipe.repasse.texto}</p>
                  )}
                  <button type="button" onClick={duvida} className="self-start text-left text-sm text-papel/80 underline underline-offset-4 hover:text-papel">
                    Tem uma dúvida sobre a entrega? Converse com a Move.
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Como funciona */}
          <section id="como-funciona" className="border-t border-white/10 py-20 md:py-28">
            <div className="envoltorio">
              <div className="grid gap-5 md:grid-cols-2 md:items-end" data-revelar>
                <div>
                  <p className="rotulo text-bege">Como funciona</p>
                  <h2 className="display mt-4 text-[2.2rem] md:text-[3.2rem]">Depois do briefing, em até sete dias úteis, oito semanas planejadas.</h2>
                </div>
                <p className="text-papel/60 md:pb-2">{oferta.prazo}</p>
              </div>
              <ol data-rolagem className="relative mt-12 grid gap-0 md:grid-cols-4 md:gap-6">
                <span aria-hidden="true" className="absolute left-0 right-0 top-0 hidden h-px bg-white/12 md:block">
                  <span className="preencher-x absolute inset-0 origin-left bg-bege" />
                </span>
                {PASSOS.map((p, i) => (
                  <li key={p.t} className="relative border-t border-white/10 py-6 md:border-0 md:pt-8" data-revelar style={{ ["--atraso" as string]: `${i * 80}ms` }}>
                    <span className="font-titulo text-sm text-bege">0{i + 1}</span>
                    <p className="display mt-2 text-[1.5rem]">{p.t}</p>
                    <p className="mt-2 text-papel/60">{p.d}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-10 grid gap-3 md:grid-cols-2" data-revelar>
                <PapelDe titulo="A Move faz" itens={oferta.papelMove} destaque />
                <PapelDe titulo="Você executa" itens={oferta.papelCliente} />
              </div>
              <p className="mt-5 text-sm text-papel/50">
                {oferta.naoInclui} Quer delegar também a produção e a publicação?{" "}
                <a className="text-papel/80 underline underline-offset-4" href={href("inicio", { hash: "gestao" })}>
                  Conheça a Gestão de Redes
                </a>
                .
              </p>
            </div>
          </section>

          {/* 7. Dúvidas */}
          <section id="duvidas" className="border-t border-white/10 py-20 md:py-28">
            <div className="envoltorio grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
              <div data-revelar>
                <p className="rotulo text-bege">Dúvidas</p>
                <h2 className="display mt-4 text-[2.2rem] md:text-[2.8rem]">Antes de garantir a sua.</h2>
              </div>
              <Faq itens={perguntas()} escuro />
            </div>
          </section>

          {/* 8. Fechamento */}
          <section className="fechamento relative overflow-hidden py-24 md:py-36">
            <div className="envoltorio relative text-center" data-revelar>
              <p className="manuscrita text-[2rem] text-bege md:text-[2.6rem]">a Andreza recebeu.</p>
              <h2 className="display mx-auto mt-2 max-w-4xl text-[2.6rem] md:text-[4.6rem]">Agora é a vez do seu negócio.</h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-papel/65">
                {campanha
                  ? `De ${reais(oferta.regular.preco)} por ${reais(c.preco)}${parcelas ? ` (ou ${parcelas} no cartão)` : ""} com o cupom ${c.cupom ?? "da Black"}, ${prazoCampanha()}, enquanto houver agenda.`
                  : "Conheça seu público, organize o que sua marca precisa comunicar e tenha as próximas oito semanas planejadas."}
              </p>
              <div className="mt-9 flex flex-col items-center gap-4">
                <Contratar estado={estado} claro centro />
                <button type="button" onClick={duvida} className="min-h-11 text-[0.95rem] text-papel/75 underline underline-offset-4 hover:text-papel">
                  Tirar uma dúvida no WhatsApp
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Rodape />

      {/* Barra fixa no celular: aparece depois da abertura e some no preço */}
      <div
        aria-hidden={!barra}
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#070b18]/95 text-papel backdrop-blur-md transition-transform duration-300 md:hidden ${
          barra ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="envoltorio flex items-center justify-between gap-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <p className="text-sm leading-tight text-papel/80">
            <PrecoCurto />
          </p>
          <a href="#investimento" tabIndex={barra ? 0 : -1} className="min-h-11 shrink-0 rounded-full bg-bege px-5 py-3 text-sm font-semibold text-marinho">
            {estado === "pre" || estado === "esgotada" ? "Ver condição" : "Garantir"}
          </a>
        </div>
      </div>
    </Pagina>
  );
}

/* ---------- Abertura ---------- */

/** O preço da Black como protagonista: o antigo riscado, o novo em destaque. */
function PrecoDrama() {
  if (estado === "ativa" || estado === "pre") {
    return (
      <div>
        <p className="flex flex-wrap items-end gap-x-4 gap-y-1">
          <span className="sr-only">
            De {reais(oferta.regular.preco)} por {reais(c.preco)}
          </span>
          <span aria-hidden="true" className="flex items-baseline gap-2 pb-2 text-papel/50">
            <span className="text-sm">De</span>
            <span className="riscado font-titulo text-[1.7rem] font-medium md:text-[2rem]">{reais(oferta.regular.preco)}</span>
            <span className="text-sm">por</span>
          </span>
          <span aria-hidden="true" className="preco-novo font-titulo text-[4.2rem] font-semibold leading-[0.9] tracking-[-0.04em] text-bege md:text-[5.6rem]">
            {reais(c.preco)}
          </span>
        </p>
        <p className="mt-3 text-sm text-papel/60">
          {estado === "ativa" ? (
            <>
              {parcelas && <>Ou <strong className="font-semibold text-papel">{parcelas}</strong> no cartão. </>}Você economiza <strong className="font-semibold text-papel">{reais(economia)}</strong>{c.cupom && <> com o cupom <strong className="font-semibold tracking-wide text-bege">{c.cupom}</strong></>}. Até {dataBrasilia(c.fim)}, enquanto houver agenda.
            </>
          ) : (
            <>
              {parcelas && <>Ou {parcelas} no cartão. </>}Só de {dataBrasilia(c.inicio)} a {dataBrasilia(c.fim)}. A Black começa em {dataBrasilia(c.inicio)}, à 0h (horário de Brasília).
            </>
          )}
        </p>
      </div>
    );
  }
  if (estado === "esgotada") return <p className="display text-[1.8rem] text-bege">A agenda da Black foi preenchida.</p>;
  return (
    <p className="flex items-baseline gap-3">
      <span className="font-titulo text-[3.6rem] font-semibold leading-none tracking-[-0.04em] text-bege">{reais(oferta.regular.preco)}</span>
      <span className="text-papel/60">entrega completa</span>
    </p>
  );
}

/** Três peças reais da entrega do Brasilê, em leque. */
function LequeDaEntrega() {
  return (
    <div className="leque relative mx-auto h-[25rem] w-full max-w-[26rem] sm:h-[28rem] lg:h-[32rem] lg:max-w-[30rem]" aria-label="Peças da entrega do Studio Brasilê">
      <div aria-hidden="true" className="leque-brilho" />
      <article className="carta carta-1">
        <p className="carta-rotulo">Estratégia · Studio Brasilê</p>
        <p className="mt-auto text-[0.72rem] uppercase tracking-[0.16em] text-azul-medio">Mensagem central</p>
        <p className="display mt-2 text-[1.55rem] leading-[1.08]">“{estrategia.mensagem}”</p>
        <p className="mt-3 text-[0.8rem] text-suave">{estrategia.decisao.formula}</p>
      </article>
      <article className="carta carta-2">
        <p className="carta-rotulo">Perfil · bio proposta</p>
        <div className="mt-4 flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-marinho font-titulo text-sm font-semibold text-bege">SB</span>
          <div className="min-w-0">
            <p className="truncate text-[0.85rem] font-semibold">{perfil.arroba}</p>
            <p className="truncate text-[0.72rem] text-suave">{perfil.nome}</p>
          </div>
        </div>
        <ul className="mt-4 flex flex-col gap-1 text-[0.82rem] leading-snug">
          {perfil.bioProposta.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <div className="mt-auto flex gap-2 pt-4">
          {perfil.destaques.slice(0, 4).map((d) => (
            <span key={d.nome} className="flex flex-col items-center gap-1">
              <span className="size-8 rounded-full bg-gelo ring-2 ring-papel ring-offset-1 ring-offset-gelo" />
              <span className="text-[0.58rem] text-suave">{d.nome}</span>
            </span>
          ))}
        </div>
      </article>
      <article className="carta carta-3">
        <p className="carta-rotulo">
          Pauta · {pauta.dia} {pauta.data}
        </p>
        <p className="mt-3 inline-flex self-start rounded-full bg-azul/10 px-2.5 py-1 text-[0.7rem] font-medium text-azul">{pauta.formato}</p>
        <p className="display mt-3 text-[1.3rem] leading-[1.1]">{pauta.titulo}</p>
        <p className="mt-auto border-t border-linha pt-3 text-[0.78rem] leading-snug text-suave">{pauta.trecho!.linhas[0].replace("CENA 1 · Fala: ", "Cena 1 · ")}</p>
      </article>
    </div>
  );
}

/* ---------- Antes e depois ---------- */

const VIRADAS = [
  {
    tema: "Perfil",
    antes: "Uma bio que repetia o nome da marca e não dizia o que o estúdio faz, nem o próximo passo.",
    depois: (
      <div className="rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
        <p className="text-sm font-semibold">{perfil.arroba}</p>
        <ul className="mt-2 flex flex-col gap-0.5 text-[0.98rem] text-papel/85">
          {perfil.bioProposta.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-papel/55">{perfil.porQue}</p>
      </div>
    ),
  },
  {
    tema: "Mensagem",
    antes: "Um cuidado que existia no atendimento, mas aparecia pouco no perfil.",
    depois: (
      <>
        <p className="display text-[1.7rem] leading-[1.1] md:text-[2.1rem]">“{estrategia.mensagem}”</p>
        <p className="mt-3 text-papel/60">Uma mensagem central para todo conteúdo, a partir do que a Andreza já fazia no estúdio.</p>
      </>
    ),
  },
  {
    tema: "Conteúdo",
    antes: "Resultado sem contexto. Quem vê só o acabamento compara pela foto e pelo preço.",
    depois: (
      <>
        <p className="display text-[1.7rem] leading-[1.1] md:text-[2.1rem]">{estrategia.decisao.formula}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {estrategia.decisao.pilares.map((p) => (
            <li key={p} className="rounded-full bg-white/[0.06] px-3 py-1.5 text-sm text-papel/80 ring-1 ring-white/10">
              {p}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    tema: "A semana",
    antes: "Abrir o Instagram sem saber o que postar.",
    depois: (
      <>
        <p className="text-sm text-papel/55">
          {pauta.dia} {pauta.data} · {pauta.formato} · {pauta.pilar}
        </p>
        <p className="display mt-2 text-[1.5rem] leading-[1.12] md:text-[1.8rem]">{pauta.titulo}</p>
        <p className="mt-3 border-l-2 border-bege/60 pl-4 text-papel/70">{pauta.trecho!.linhas[0].replace("CENA 1 · Fala: ", "")}</p>
        <p className="mt-3 text-sm text-papel/50">Objetivo, roteiro, materiais e chamada para ação em cada uma das 24 pautas.</p>
      </>
    ),
  },
];

/* ---------- Preço ---------- */

/** A entrega como um cupom: cada item, o total cheio e o total da Black. */
function Cupom() {
  return (
    <div className="cupom relative rounded-[1.75rem] bg-papel p-6 text-marinho md:p-9" data-revelar>
      <div className="flex items-center justify-between gap-4 border-b border-dashed border-marinho/25 pb-4">
        <p className="rotulo text-azul">O que você recebe</p>
        <p className="text-xs text-suave">{oferta.produto}</p>
      </div>
      <ul className="divide-y divide-dashed divide-marinho/15">
        {oferta.entrega.map((e, i) => (
          <li key={e.item} className="grid grid-cols-[1.6rem_1fr] gap-3 py-4" data-revelar style={{ ["--atraso" as string]: `${i * 50}ms` }}>
            <span aria-hidden="true" className="mt-0.5 grid size-6 place-items-center rounded-full bg-marinho text-bege">
              <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.5 8.5l3 3 6-7" />
              </svg>
            </span>
            <span>
              <strong className="font-semibold">{e.item}</strong>
              <span className="block text-[0.95rem] text-suave">{e.texto}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-2 border-t-2 border-marinho pt-4">
        <p className="flex items-baseline justify-between gap-4">
          <span className="text-suave">Valor da entrega</span>
          <span className={`font-titulo text-xl ${campanha ? "text-suave line-through decoration-terracota decoration-2" : "font-semibold"}`}>{reais(oferta.regular.preco)}</span>
        </p>
        {campanha && c.cupom && (
          <p className="mt-2 flex items-baseline justify-between gap-4 text-[0.95rem]">
            <span className="text-suave">
              Cupom <strong className="font-semibold tracking-wide text-marinho">{c.cupom}</strong>
            </span>
            <span className="font-titulo text-terracota">- {reais(economia)}</span>
          </p>
        )}
        {campanha && (
          <p className="mt-2 flex items-baseline justify-between gap-4">
            <span className="font-semibold">Na Black Move</span>
            <span className="font-titulo text-[2.2rem] font-semibold leading-none tracking-[-0.03em] text-azul">{reais(c.preco)}</span>
          </p>
        )}
        {campanha && parcelas && <p className="mt-1 text-right text-sm text-suave">ou {parcelas} no cartão</p>}
      </div>
    </div>
  );
}

function BlocoPreco() {
  if (estado === "ativa") {
    return (
      <div>
        <p className="text-papel/60">
          De <s className="decoration-terracota decoration-2">{reais(oferta.regular.preco)}</s> por
        </p>
        <p className="mt-1 font-titulo text-[4.4rem] font-semibold leading-none tracking-[-0.04em] text-bege">{reais(c.preco)}</p>
        {parcelas && <p className="mt-2 text-papel/75">ou <strong className="font-semibold text-papel">{parcelas}</strong> no cartão</p>}
        <p className="mt-4 inline-flex rounded-full bg-terracota/20 px-3 py-1 text-sm font-medium text-bege">Você economiza {reais(economia)}</p>
        <p className="mt-4 text-sm text-papel/60">Condição válida {prazoCampanha()}. As vagas seguem a ordem de contratação.</p>
      </div>
    );
  }
  if (estado === "pre") {
    return (
      <div>
        <p className="text-papel/60">A Black começa em {dataBrasilia(c.inicio)}.</p>
        <p className="mt-1 font-titulo text-[4.4rem] font-semibold leading-none tracking-[-0.04em] text-bege">{reais(c.preco)}</p>
        <p className="mt-4 text-sm text-papel/60">
          De {dataBrasilia(c.inicio)} a {dataBrasilia(c.fim)}. {parcelas ? `Ou ${parcelas} no cartão. ` : ""}Depois, o preço volta para {reais(oferta.regular.preco)}.
        </p>
      </div>
    );
  }
  if (estado === "esgotada") {
    return (
      <div>
        <p className="display text-[2rem] leading-tight">A agenda desta condição foi preenchida.</p>
        <p className="mt-3 text-sm text-papel/60">Fale com a Move sobre a próxima disponibilidade.</p>
      </div>
    );
  }
  return <p className="font-titulo text-[4rem] font-semibold leading-none tracking-[-0.04em] text-bege">{reais(oferta.regular.preco)}</p>;
}

function PrecoCurto() {
  if (estado === "ativa")
    return (
      <>
        De <s>{reais(oferta.regular.preco)}</s> por <strong className="text-bege">{reais(c.preco)}</strong> até {dataBrasilia(c.fim)}
      </>
    );
  if (estado === "pre")
    return (
      <>
        Black: <strong className="text-bege">{reais(c.preco)}</strong> de {dataBrasilia(c.inicio)} a {dataBrasilia(c.fim)}
      </>
    );
  if (estado === "esgotada") return <>Agenda da Black preenchida</>;
  return (
    <>
      Investimento: <strong className="text-bege">{reais(oferta.regular.preco)}</strong>
    </>
  );
}

/* ---------- Como funciona ---------- */

const PASSOS = [
  { t: "Garanta a sua", d: "Conclua o pagamento no checkout." },
  { t: "Conte o seu negócio", d: "Responda ao formulário e participe do briefing de uma hora." },
  { t: "Receba a direção", d: "Estratégia e 24 pautas apresentadas numa reunião de 30 minutos." },
  { t: "Coloque em prática", d: "Execute com acompanhamento pelo WhatsApp durante os dois meses." },
];

function PapelDe({ titulo, itens, destaque = false }: { titulo: string; itens: readonly string[]; destaque?: boolean }) {
  return (
    <div className={`rounded-[1.5rem] p-6 ring-1 md:p-7 ${destaque ? "bg-white/[0.06] ring-white/15" : "ring-white/10"}`}>
      <p className={`rotulo ${destaque ? "text-bege" : "text-papel/50"}`}>{titulo}</p>
      <p className="mt-3 text-papel/80">{itens.join(" · ")}</p>
    </div>
  );
}

function perguntas(): Pergunta[] {
  const base: Pergunta[] = [
    { p: "Vou receber exatamente o que a Andreza recebeu?", r: "Você recebe a mesma base: diagnóstico, estratégia pelo Método Move e pautas escritas com orientação, construídas para o seu negócio. Alguns materiais do projeto dela, como os guias de Stories e de fotografia, foram complementos daquela consultoria; em cada amostra você vê o que entra no pacote." },
    { p: "A Move grava, edita e publica?", r: "Nesta consultoria, a Move entrega estratégia, textos e orientações. A execução fica com você ou com quem você contratar." },
    { p: "São 24 posts prontos para publicar?", r: "São 24 pautas escritas e orientadas. Você ainda realiza a produção da imagem ou do vídeo, a edição e a publicação." },
    { p: "Meu negócio precisa ser de beleza?", r: "Não. O Brasilê demonstra uma aplicação. O Planejamento é para prestadores de serviços que precisam de direção para executar o conteúdo." },
    { p: "Preciso de muitos seguidores?", r: "Não. O ponto de partida é o negócio e o momento em que ele está." },
    { p: "Quando recebo?", r: oferta.prazo },
    { p: "Como funciona o acompanhamento?", r: "Pelo WhatsApp durante os dois meses de execução do calendário, para orientar a aplicação da entrega." },
    {
      p: "Posso parcelar?",
      r: `Sim. O pagamento é por Pix ou cartão${parcelas && campanha ? `, e na Black o cartão sai em até ${parcelas}` : ""}. O valor total com as condições do parcelamento aparece no checkout antes de você concluir.`,
    },
    ...(campanha && c.cupom
      ? [{ p: "Como garanto o preço da Black?", r: `No checkout, aplique o cupom ${c.cupom}. Ele tira ${reais(economia)} do valor e o Planejamento sai por ${reais(c.preco)}. Ao clicar no botão de compra desta página, o cupom já fica copiado.` }]
      : []),
    { p: "Existe garantia de seguidores ou vendas?", r: "A entrega é de estratégia e orientação. Resultados dependem também da execução, da oferta, do atendimento e do contexto do negócio." },
    { p: "Posso desistir?", r: "Sim. Em compras pelo site, você tem 7 dias corridos para desistir, com devolução integral, como prevê o Código de Defesa do Consumidor." },
  ];
  if (campanha) base.push({ p: "O preço continua depois da Black?", r: `Não. A partir de 05/12, o preço volta para ${reais(oferta.regular.preco)}.` });
  return base;
}

/** Mostra a barra fixa entre o fim da abertura e o início do preço. */
function useBarraFixa(heroi: React.RefObject<HTMLElement | null>, preco: React.RefObject<HTMLElement | null>) {
  const [passouHeroi, setPassou] = useState(false);
  const [noPreco, setNoPreco] = useState(false);
  useEffect(() => {
    if (!heroi.current || !preco.current) return;
    const a = new IntersectionObserver(([e]) => setPassou(!e.isIntersecting && e.boundingClientRect.top < 0));
    const b = new IntersectionObserver(([e]) => setNoPreco(e.isIntersecting || e.boundingClientRect.top < 0));
    a.observe(heroi.current);
    b.observe(preco.current);
    return () => {
      a.disconnect();
      b.disconnect();
    };
  }, [heroi, preco]);
  return passouHeroi && !noPreco;
}
