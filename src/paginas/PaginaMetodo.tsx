import type { CSSProperties, ReactNode } from "react";
import { servicos } from "../config/site";
import { estadoDaCampanha } from "../lib/campanha";
import { href } from "../lib/rotas";
import { registrar } from "../lib/medicao";
import { Cabecalho, FaixaCampanha, Pagina, Rodape } from "../componentes/Estrutura";
import { abrirContato } from "../componentes/Contato";
import { Seta } from "../componentes/Botao";
import { FundoGrafismo, TituloCinetico } from "../componentes/Movimento";

/**
 * Método e entregas: o conceito que guia todo serviço da Move e, embaixo, um cartão imersivo
 * por entrega. No computador, os cartões se empilham na rolagem só com CSS (sticky); no celular, que tem cartões mais altos que a tela, eles seguem em lista para o botão de cada um nunca ficar escondido.
 */

const estado = estadoDaCampanha();

const PRINCIPIOS = [
  {
    titulo: "Começa pela sua verdade",
    texto: "Um processo validado extrai o seu repertório, a sua experiência e o seu critério. É isso que deixa o conteúdo com a sua cara, e não com cara de Google.",
  },
  {
    titulo: "Estratégia antes do post",
    texto: "Nada é publicado sem motivo. Cada peça tem objetivo, linha e público definidos a partir do que o negócio precisa agora.",
  },
  {
    titulo: "A Move fica por perto",
    texto: "Acompanhamento próximo, com leitura dos sinais e ajuste do caminho junto com você. Por isso os clientes ficam anos.",
  },
] as const;

const ETAPAS = [
  { nome: "Diagnosticar", texto: "Entendemos a sua marca, o seu negócio e o que realmente diferencia o seu trabalho." },
  { nome: "Investigar", texto: "Olhamos para quem você quer alcançar: as situações, as dúvidas e o que pesa na decisão." },
  { nome: "Definir percepção", texto: "Escolhemos o que as pessoas precisam perceber sobre você antes de contratar." },
  { nome: "Traduzir", texto: "Transformamos isso em mensagem, linhas de conteúdo, pautas e canais." },
  { nome: "Sustentar", texto: "Acompanhamos os resultados e mantemos o caminho vivo, mês a mês." },
] as const;

type Entrega = {
  id: (typeof servicos)[number]["id"];
  metodo: string;
  cor: string;
  acao: ReactNode;
};

const botao = "inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-semibold transition-transform active:scale-[0.98]";

const ENTREGAS: Entrega[] = [
  {
    id: "gestao",
    metodo: "O método inteiro, todo mês: a Move pensa, escreve, produz, publica e lê os resultados com você.",
    cor: "bg-azul text-papel",
    acao: (
      <button type="button" onClick={() => abrirContato("gestao")} className={`${botao} bg-papel text-azul`}>
        Conversar sobre a gestão <Seta />
      </button>
    ),
  },
  {
    id: "planejamento",
    metodo: "Diagnóstico, estratégia e pautas escritas pelo método. Você produz e publica, com a Move acompanhando.",
    cor: "bg-bege text-marinho",
    acao: (
      <a href={href("planejamento")} onClick={() => registrar("clique_cta_principal", { pagina: "metodo" })} className={`${botao} bg-marinho text-papel`}>
        {estado === "ativa" ? "Ver a condição da Black" : "Conhecer o Planejamento"} <Seta />
      </a>
    ),
  },
  {
    id: "jornada",
    metodo: "A percepção definida no método aplicada aos seus canais, do primeiro contato até a conversa no WhatsApp.",
    cor: "bg-papel text-marinho",
    acao: (
      <a href={href("jornada")} className={`${botao} bg-azul text-papel`}>
        Ver a Jornada do Cliente <Seta />
      </a>
    ),
  },
  {
    id: "projetos",
    metodo: "O mesmo critério em uma entrega delimitada, com escopo, prazo e orçamento claros.",
    cor: "bg-marinho text-papel ring-1 ring-white/15",
    acao: (
      <button type="button" onClick={() => abrirContato("projetos")} className={`${botao} bg-bege text-marinho`}>
        Apresentar meu projeto <Seta />
      </button>
    ),
  },
];

export function PaginaMetodo() {
  return (
    <Pagina>
      <FaixaCampanha estado={estado} />
      <Cabecalho
        noturno
        itens={[
          { rotulo: "Conceito", href: "#conceito" },
          { rotulo: "Método", href: "#etapas" },
          { rotulo: "Entregas", href: "#entregas" },
        ]}
        acao={{ rotulo: "Conversar", onClick: () => abrirContato("geral") }}
      />
      <main id="conteudo" className="escuro bg-marinho text-papel">
        {/* Abertura */}
        <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-44">
          <FundoGrafismo tom="azul" tamanho="max(1100px, 110%)" posicao="100% 0%" mascara="radial-gradient(70% 70% at 100% 0%, #000 30%, transparent 75%)" forca={120} />
          <div className="envoltorio relative">
            <p className="rotulo text-bege">Método Move</p>
            <TituloCinetico
              como="h1"
              texto="Um método. Toda entrega passa por ele."
              className="display mt-5 max-w-[15ch] text-[2.9rem] leading-[1.02] md:text-[5.6rem]"
            />
            <p className="manuscrita mt-4 max-w-[24ch] text-[1.9rem] leading-[1.1] text-bege md:text-[2.6rem]">
              o melhor do seu negócio, visível antes da contratação.
            </p>
            <p className="mt-8 max-w-[44ch] text-lg text-papel/70">
              Gestão, planejamento, canais ou um projeto pontual: muda o tamanho da entrega, não o cuidado com que ela é pensada.
            </p>
          </div>
        </section>

        {/* Conceito de entrega */}
        <section id="conceito" className="scroll-mt-16 border-t border-white/10 py-20 md:py-28">
          <div className="envoltorio">
            <h2 className="display max-w-[18ch] text-[2.2rem] leading-[1.05] md:text-[3.4rem]" data-revelar>
              O que você recebe em qualquer entrega da Move.
            </h2>
            <ol className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
              {PRINCIPIOS.map((p, i) => (
                <li
                  key={p.titulo}
                  className="rounded-[1.75rem] bg-white/[0.04] p-7 ring-1 ring-white/10"
                  data-revelar
                  style={{ ["--atraso" as string]: `${i * 90}ms` } as CSSProperties}
                >
                  <span className="display text-[2.8rem] leading-none text-bege/40">0{i + 1}</span>
                  <h3 className="display mt-6 text-[1.6rem] leading-tight">{p.titulo}</h3>
                  <p className="mt-3 text-papel/70">{p.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* As cinco etapas */}
        <section id="etapas" className="scroll-mt-16 border-t border-white/10 py-20 md:py-28">
          <div className="envoltorio grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div data-revelar>
              <p className="rotulo text-bege">O caminho</p>
              <h2 className="display mt-4 text-[2.2rem] leading-[1.05] md:text-[3.4rem]">Cinco etapas, da sua história ao seu perfil.</h2>
              <p className="mt-5 max-w-[38ch] text-papel/65">
                Cada etapa tem um critério para avançar. Nada vai para o calendário antes de fazer sentido para o seu negócio.
              </p>
            </div>
            <ol className="relative">
              <span aria-hidden="true" className="absolute bottom-6 left-[1.15rem] top-6 w-px bg-gradient-to-b from-bege/60 via-white/15 to-white/5" />
              {ETAPAS.map((e, i) => (
                <li key={e.nome} className="relative grid grid-cols-[2.4rem_1fr] gap-5 pb-10 last:pb-0" data-revelar style={{ ["--atraso" as string]: `${i * 70}ms` } as CSSProperties}>
                  <span className="relative z-10 grid size-[2.3rem] place-items-center rounded-full bg-bege font-titulo text-sm text-marinho">0{i + 1}</span>
                  <div className="pt-0.5">
                    <h3 className="display text-[1.7rem] leading-tight md:text-[2.1rem]">{e.nome}</h3>
                    <p className="mt-2 max-w-[44ch] text-papel/70">{e.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* As entregas: cartões que se empilham */}
        <section id="entregas" className="scroll-mt-16 border-t border-white/10 pb-24 pt-20 md:pb-32 md:pt-28">
          <div className="envoltorio">
            <div className="max-w-3xl" data-revelar>
              <p className="rotulo text-bege">As entregas</p>
              <h2 className="display mt-4 text-[2.2rem] leading-[1.05] md:text-[3.4rem]">Escolha o tamanho da ajuda. O método vem junto.</h2>
            </div>
            <ol className="mt-12 flex flex-col gap-6 md:mt-16">
              {ENTREGAS.map((e, i) => {
                const s = servicos.find((x) => x.id === e.id)!;
                return (
                  <li key={e.id} className="pilha md:sticky" style={{ top: `calc(6rem + ${i} * 1.1rem)` }}>
                    <article className={`relative overflow-hidden rounded-[2rem] p-7 shadow-[0_-20px_50px_-30px_rgba(0,0,0,0.7)] md:p-12 ${e.cor}`}>
                      <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
                        <div>
                          <p className="flex items-baseline gap-3">
                            <span className="display text-[2.4rem] leading-none opacity-35">0{i + 1}</span>
                            {s.preco && <span className="rounded-full bg-current/10 px-3 py-1 text-sm font-semibold">{s.preco}</span>}
                          </p>
                          <h3 className="display mt-4 text-[2.1rem] leading-[1.04] md:text-[3.2rem]">{s.nome}</h3>
                          <p className="mt-3 max-w-[40ch] text-[1.05rem] opacity-80">{s.paraQuem}</p>
                          <p className="manuscrita mt-5 max-w-[30ch] text-[1.45rem] leading-[1.15] opacity-90 md:text-[1.7rem]">{e.metodo}</p>
                        </div>
                        <div className="flex flex-col justify-between gap-8">
                          <ul className="flex flex-col gap-2.5">
                            {s.entrega.map((x) => (
                              <li key={x} className="flex gap-3 border-b border-current/15 pb-2.5 text-[0.98rem]">
                                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-current opacity-60" />
                                {x}
                              </li>
                            ))}
                          </ul>
                          <div>{e.acao}</div>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      </main>
      <Rodape />
    </Pagina>
  );
}
