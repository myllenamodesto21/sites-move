import { useEffect, useState, type ReactNode } from "react";
import type { EstadoCampanha } from "../config/oferta";
import { textosDoEstado } from "../config/oferta";
import { contatos } from "../config/site";
import { arquivo, href } from "../lib/rotas";
import { Marca } from "./Marca";
import { abrirContato, Contato } from "./Contato";
import { PainelPrevia } from "./PainelPrevia";
import { useRevelar } from "./Revelar";
import { useMovimento } from "./Movimento";
import { Seta } from "./Botao";

/** Moldura comum: pular para o conteúdo, contato e painel da prévia. */
export function Pagina({ children }: { children: ReactNode }) {
  useRevelar();
  useMovimento();
  return (
    <>
      <a
        href="#conteudo"
        className="fixed left-3 top-3 z-[60] -translate-y-24 rounded-full bg-marinho px-5 py-3 text-papel focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      {children}
      <Contato />
      <PainelPrevia />
    </>
  );
}

/** Faixa discreta da campanha, que leva à página do Planejamento. */
export function FaixaCampanha({ estado }: { estado: EstadoCampanha }) {
  const texto = textosDoEstado[estado].faixa;
  if (!texto) return null;
  return (
    <a
      href={href("planejamento")}
      className="group block bg-marinho text-papel"
    >
      <span className="envoltorio flex min-h-11 items-center justify-center gap-2 py-2 text-center text-sm">
        {texto}
        <Seta className="size-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
      </span>
    </a>
  );
}

export type ItemMenu = { rotulo: string; href: string; pagina?: string };

/** O mesmo menu em todas as páginas: o site inteiro interligado. */
function menuDoSite(): ItemMenu[] {
  return [
    { rotulo: "Gestão de Redes", href: href("inicio", { hash: "gestao" }), pagina: "inicio" },
    { rotulo: "Método", href: href("metodo"), pagina: "metodo" },
    { rotulo: "Jornada do Cliente", href: href("jornada"), pagina: "jornada" },
    { rotulo: "Planejamento", href: href("planejamento"), pagina: "planejamento" },
    { rotulo: "Links", href: href("links"), pagina: "links" },
  ];
}

/** Qual página do menu está aberta agora, pelo endereço. */
function paginaAtual() {
  const p = location.pathname.replace(/index\.html$/, "");
  const achada = ["metodo", "jornada", "planejamento", "black", "links"].find((n) => p.includes(`/${n}/`));
  return achada === "black" ? "planejamento" : achada ?? "inicio";
}

export function Cabecalho({
  acao,
  sobreEscuro = false,
  noturno = false,
}: {
  /** Antigo menu por seção da página; hoje todas as páginas usam o menu do site. */
  itens?: ItemMenu[];
  /** Cabeçalho sempre escuro (páginas no clima da Black). */
  noturno?: boolean;
  acao?: { rotulo: string; onClick: () => void };
  /** Começa transparente sobre uma abertura escura e fica sólido depois da rolagem. */
  sobreEscuro?: boolean;
}) {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  useEffect(() => {
    if (!sobreEscuro) return;
    const largo = matchMedia("(min-width: 1024px)");
    const ver = () => setRolou(!largo.matches || window.scrollY > 48);
    largo.addEventListener("change", ver);
    ver();
    window.addEventListener("scroll", ver, { passive: true });
    return () => {
      window.removeEventListener("scroll", ver);
      largo.removeEventListener("change", ver);
    };
  }, [sobreEscuro]);
  const claro = noturno || (sobreEscuro && !rolou && !aberto);
  const itens = menuDoSite();
  const atual = paginaAtual();
  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color,color] duration-500 ${
        noturno
          ? "escuro border-b border-white/10 bg-[#070b18]/85 text-papel backdrop-blur-md"
          : claro
            ? "border-b border-transparent bg-transparent text-papel"
            : "border-b border-linha/70 bg-papel/90 text-marinho backdrop-blur-md"
      }`}
    >
      <div className="envoltorio flex h-16 items-center justify-between gap-4">
        <a href={href("inicio")} aria-label="Move, página inicial" className="-ml-1 rounded-lg p-1">
          <Marca claro={claro} />
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {itens.map((i) => (
            <a
              key={i.href}
              href={i.href}
              aria-current={i.pagina === atual && i.pagina !== "inicio" ? "page" : undefined}
              className={`relative text-[0.95rem] aria-[current=page]:font-semibold aria-[current=page]:after:scale-x-100 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                claro ? "text-papel/80 hover:text-papel" : "text-suave hover:text-marinho"
              }`}
            >
              {i.rotulo}
            </a>
          ))}
          {acao && (
            <button
              type="button"
              onClick={acao.onClick}
              className={`min-h-11 rounded-full px-5 text-[0.9rem] font-semibold transition-colors ${
                noturno ? "bg-bege text-marinho hover:bg-papel" : claro ? "bg-papel text-marinho hover:bg-bege" : "bg-marinho text-papel hover:bg-azul"
              }`}
            >
              {acao.rotulo}
            </button>
          )}
        </nav>
        <button
          type="button"
          className={`grid size-11 place-items-center rounded-full border lg:hidden ${claro ? "border-white/30" : "border-linha"}`}
          aria-expanded={aberto}
          aria-controls="menu-movel"
          onClick={() => setAberto((a) => !a)}
        >
          <span className="sr-only">{aberto ? "Fechar menu" : "Abrir menu"}</span>
          <span aria-hidden="true" className="flex w-4 flex-col gap-[5px]">
            <span className={`h-px bg-current transition-transform ${aberto ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px bg-current transition-transform ${aberto ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>
      {aberto && (
        <nav id="menu-movel" aria-label="Principal" className={`entrar border-t lg:hidden ${noturno ? "border-white/10" : "border-linha"}`}>
          <ul className="envoltorio flex flex-col py-2">
            {itens.map((i) => (
              <li key={i.href}>
                <a
                  href={i.href}
                  aria-current={i.pagina === atual && i.pagina !== "inicio" ? "page" : undefined}
                  onClick={() => setAberto(false)}
                  className={`flex min-h-13 items-center justify-between border-b py-3 text-lg ${noturno ? "border-white/10" : "border-linha/60"}`}
                >
                  {i.rotulo}
                  <Seta />
                </a>
              </li>
            ))}
            {acao && (
              <li className="py-4">
                <button
                  type="button"
                  onClick={() => {
                    setAberto(false);
                    acao.onClick();
                  }}
                  className={`min-h-12 w-full rounded-full px-5 font-semibold ${noturno ? "bg-bege text-marinho" : "bg-marinho text-papel"}`}
                >
                  {acao.rotulo}
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}

function LinkOuPendente({ url, children }: { url: string | null; children: ReactNode }) {
  return url ? (
    <a href={url} className="hover:text-papel" target={url.startsWith("http") ? "_blank" : undefined} rel="noopener">
      {children}
    </a>
  ) : (
    <span title="Link pendente de configuração" className="text-papel/40">
      {children} <span className="text-[0.7rem]">(pendente)</span>
    </span>
  );
}

export function Rodape() {
  return (
    <footer className="escuro textura relative overflow-hidden bg-marinho text-papel">
      <div className="envoltorio grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Marca tamanho="lg" claro />
          <p className="mt-4 max-w-[34ch] text-papel/70">Estratégia, conteúdo e presença digital para prestadores de serviços.</p>
        </div>
        <nav aria-label="Páginas">
          <p className="rotulo text-papel/50">Páginas</p>
          <ul className="mt-4 flex flex-col gap-3 text-papel/80">
            <li><a className="hover:text-papel" href={href("inicio", { hash: "gestao" })}>Gestão de Redes</a></li>
            <li><a className="hover:text-papel" href={href("metodo")}>Método e entregas</a></li>
            <li><a className="hover:text-papel" href={href("jornada")}>Jornada do Cliente</a></li>
            <li><a className="hover:text-papel" href={href("planejamento")}>Planejamento Estratégico</a></li>
            <li><a className="hover:text-papel" href={href("links")}>Links rápidos</a></li>
          </ul>
        </nav>
        <div>
          <p className="rotulo text-papel/50">Contato</p>
          <ul className="mt-4 flex flex-col gap-3 text-papel/80">
            <li>
              <button type="button" className="hover:text-papel" onClick={() => abrirContato("geral")}>
                Conversar com a Move
              </button>
            </li>
            <li><LinkOuPendente url={contatos.instagram}>Instagram</LinkOuPendente></li>
            <li><LinkOuPendente url={contatos.email ? `mailto:${contatos.email}` : null}>{contatos.email ?? "E-mail"}</LinkOuPendente></li>
            <li><LinkOuPendente url={href("privacidade")}>Privacidade</LinkOuPendente></li>
            <li><LinkOuPendente url={href("termos")}>Termos de uso</LinkOuPendente></li>
          </ul>
        </div>
      </div>
      <div className="envoltorio flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-white/10 pt-6 text-sm text-papel/50">
        <span>© {new Date().getFullYear()} Move Agência Digital</span>
        <span className="manuscrita text-lg text-bege/70">Marketing com processo e movimento.</span>
      </div>
      {/* A marca gigante fecha a página, sem nenhuma linha cruzando as letras */}
      <div className="envoltorio pointer-events-none select-none pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8" aria-hidden="true">
        <img src={arquivo("marca/move-claro.webp")} alt="" width={640} height={158} loading="lazy" className="w-full opacity-[0.09]" />
      </div>
    </footer>
  );
}
