import type { CSSProperties } from "react";
import { servicos } from "../config/site";
import { estadoDaCampanha } from "../lib/campanha";
import { href } from "../lib/rotas";
import { registrar } from "../lib/medicao";
import { Cabecalho, FaixaCampanha, Pagina, Rodape } from "../componentes/Estrutura";
import { abrirContato, linkWhatsApp } from "../componentes/Contato";
import { Seta } from "../componentes/Botao";
import { FundoGrafismo, TituloCinetico } from "../componentes/Movimento";

/** Jornada do Cliente: página curta, com o caminho dos cinco canais desenhado pela rolagem. */

const estado = estadoDaCampanha();
const jornada = servicos.find((s) => s.id === "jornada")!;

const PERDAS = [
  "Te encontrou no Google, mas não achou horário, endereço ou como agendar.",
  "Abriu o link da bio e encontrou uma lista que não diz por onde começar.",
  "Chegou no WhatsApp e a conversa começou do zero, sem saber o que você oferece.",
] as const;

const CANAIS = [
  { nome: "Google", entrega: "Perfil da Empresa no Google", ganho: "Quem procura o seu serviço na região encontra você, com as informações certas." },
  { nome: "Instagram", entrega: "Organização básica do perfil", ganho: "Bio, destaques e fixados explicam em segundos o que você faz e para quem." },
  { nome: "Link na bio", entrega: "Link na bio organizado por objetivo", ganho: "Cada pessoa toca no caminho que serve para ela, sem se perder." },
  { nome: "Site", entrega: "Site de uma página, com até seis seções", ganho: "Um endereço que apresenta o seu trabalho com clareza e passa confiança." },
  { nome: "WhatsApp", entrega: "Estruturação do WhatsApp Business", ganho: "A conversa começa organizada: catálogo, mensagens e respostas prontas." },
] as const;

const PASSOS = [
  { titulo: "Conversa", texto: "Entendemos os seus canais atuais e onde as pessoas estão se perdendo." },
  { titulo: "Materiais e acessos", texto: "Você envia o que já tem. A Move organiza o resto." },
  { titulo: "Proposta com prazo", texto: "Você sabe o que será feito, em quanto tempo e por quanto." },
] as const;

export function PaginaJornada() {
  const whats = linkWhatsApp("jornada");
  const Cta = ({ className = "" }: { className?: string }) =>
    whats ? (
      <a
        href={whats}
        target="_blank"
        rel="noopener"
        onClick={() => registrar("abrir_whatsapp", { pagina: "jornada", servico: "jornada" })}
        className={`inline-flex min-h-12 items-center gap-2 rounded-full bg-bege px-6 font-semibold text-marinho transition-transform active:scale-[0.98] ${className}`}
      >
        Organizar meus canais <Seta />
      </a>
    ) : (
      <button type="button" onClick={() => abrirContato("jornada")} className={`inline-flex min-h-12 items-center gap-2 rounded-full bg-bege px-6 font-semibold text-marinho ${className}`}>
        Organizar meus canais <Seta />
      </button>
    );

  return (
    <Pagina>
      <FaixaCampanha estado={estado} />
      <Cabecalho
        noturno
        acao={{ rotulo: "Conversar", onClick: () => abrirContato("jornada") }}
      />
      <main id="conteudo" className="escuro bg-marinho text-papel">
        {/* Abertura */}
        <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-44">
          <FundoGrafismo tom="azul" tamanho="max(1000px, 105%)" posicao="0% 100%" mascara="radial-gradient(70% 70% at 0% 100%, #000 30%, transparent 75%)" forca={120} />
          <div className="envoltorio relative">
            <p className="rotulo text-bege">{jornada.nome}</p>
            <TituloCinetico
              como="h1"
              texto="Quem te encontra precisa chegar até você."
              className="display mt-5 max-w-[15ch] text-[2.8rem] leading-[1.02] md:text-[5.2rem]"
            />
            <p className="manuscrita mt-4 text-[1.9rem] leading-[1.1] text-bege md:text-[2.6rem]">sem se perder no caminho.</p>
            <p className="mt-8 max-w-[42ch] text-lg text-papel/70">
              Google, Instagram, link na bio, site e WhatsApp organizados como um só caminho, que leva o interesse até o seu atendimento.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Cta />
              {jornada.preco && (
                <p className="text-papel/70">
                  investimento de <strong className="display text-[1.5rem] text-papel">{jornada.preco}</strong>
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Onde o interesse se perde */}
        <section className="border-t border-white/10 py-20 md:py-28">
          <div className="envoltorio">
            <h2 className="display max-w-[20ch] text-[2.1rem] leading-[1.05] md:text-[3.2rem]" data-revelar>
              O interesse existe. <span className="text-papel/45">Ele só se perde no meio do caminho.</span>
            </h2>
            <ul className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3">
              {PERDAS.map((p, i) => (
                <li key={p} className="rounded-[1.5rem] bg-white/[0.04] p-6 text-[1.05rem] text-papel/75 ring-1 ring-white/10" data-revelar style={{ ["--atraso" as string]: `${i * 80}ms` } as CSSProperties}>
                  <span aria-hidden="true" className="mb-4 block h-px w-10 bg-terracota" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* O caminho: cinco canais, a linha se preenche com a rolagem */}
        <section id="caminho" className="scroll-mt-16 border-t border-white/10 py-20 md:py-28">
          <div className="envoltorio grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start" data-revelar>
              <p className="rotulo text-bege">O caminho</p>
              <h2 className="display mt-4 text-[2.2rem] leading-[1.05] md:text-[3.4rem]">Cinco canais. Uma direção.</h2>
              <p className="mt-5 max-w-[36ch] text-papel/65">{jornada.paraQuem}</p>
            </div>
            <ol data-rolagem className="relative">
              <span aria-hidden="true" className="absolute bottom-8 left-[1.15rem] top-8 w-px bg-white/12" />
              <span aria-hidden="true" className="preencher-y absolute bottom-8 left-[1.15rem] top-8 w-px origin-top bg-bege" />
              {CANAIS.map((c, i) => (
                <li key={c.nome} className="relative grid grid-cols-[2.4rem_1fr] gap-5 pb-12 last:pb-0" data-revelar style={{ ["--atraso" as string]: `${i * 60}ms` } as CSSProperties}>
                  <span className="relative z-10 grid size-[2.3rem] place-items-center rounded-full bg-bege font-titulo text-sm text-marinho">0{i + 1}</span>
                  <div>
                    <p className="rotulo text-bege/80">{c.entrega}</p>
                    <h3 className="display mt-2 text-[2rem] leading-none md:text-[2.6rem]">{c.nome}</h3>
                    <p className="mt-3 max-w-[40ch] text-papel/70">{c.ganho}</p>
                  </div>
                </li>
              ))}
              <li className="relative grid grid-cols-[2.4rem_1fr] gap-5 pt-2" data-revelar>
                <span aria-hidden="true" className="relative z-10 grid size-[2.3rem] place-items-center rounded-full bg-azul text-papel ring-2 ring-bege">
                  <Seta className="size-4 rotate-90" />
                </span>
                <p className="manuscrita self-center text-[1.8rem] leading-none text-bege">e a pessoa chega até você.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* Como funciona */}
        <section id="como-funciona" className="scroll-mt-16 border-t border-white/10 py-20 md:py-28">
          <div className="envoltorio">
            <h2 className="display text-[2.1rem] leading-[1.05] md:text-[3.2rem]" data-revelar>
              Como funciona
            </h2>
            <ol className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3">
              {PASSOS.map((p, i) => (
                <li key={p.titulo} className="rounded-[1.5rem] p-6 ring-1 ring-white/10" data-revelar style={{ ["--atraso" as string]: `${i * 80}ms` } as CSSProperties}>
                  <span className="display text-[2.4rem] leading-none text-bege/40">0{i + 1}</span>
                  <h3 className="display mt-4 text-[1.5rem]">{p.titulo}</h3>
                  <p className="mt-2 text-papel/70">{p.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Fechamento */}
        <section className="relative overflow-hidden border-t border-white/10 py-24 md:py-32">
          <div className="envoltorio relative text-center">
            <h2 className="display mx-auto max-w-[18ch] text-[2.4rem] leading-[1.03] md:text-[4rem]" data-revelar>
              Deixe o caminho pronto antes da próxima pessoa te procurar.
            </h2>
            <div className="mt-9 flex flex-col items-center gap-4" data-revelar>
              <Cta />
              <a href={href("metodo")} className="text-papel/70 underline decoration-white/30 underline-offset-[6px] hover:text-papel">
                Ver todas as entregas da Move
              </a>
            </div>
          </div>
        </section>
      </main>
      <Rodape />
    </Pagina>
  );
}
