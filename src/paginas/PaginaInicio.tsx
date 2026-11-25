import { useEffect, useRef, useState } from "react";
import { contatos, depoimento, type ServicoId } from "../config/site";
import { estadoDaCampanha } from "../lib/campanha";
import { arquivo } from "../lib/rotas";
import { registrar } from "../lib/medicao";
import { Cabecalho, FaixaCampanha, Pagina, Rodape } from "../componentes/Estrutura";
import { Botao, Seta } from "../componentes/Botao";
import { abrirContato, linkWhatsApp } from "../componentes/Contato";
import { Faq } from "../componentes/Faq";
import { Imagem } from "../componentes/Imagem";
import { CaminhoDoMetodo } from "../componentes/CaminhoDoMetodo";
import { PitchOrcamento } from "../componentes/PitchOrcamento";
import { Contagem, FundoGrafismo, Letreiro, MGigante, TextoAceso, TituloCinetico } from "../componentes/Movimento";

const estado = estadoDaCampanha();

/* O ciclo de cada mês, contado pelo que muda para a cliente. */
const CICLO_GESTAO = [
  { nome: "Estratégia", titulo: "Você sabe o que comunicar, e por quê.", texto: "Antes de qualquer post, a Move define o que este mês precisa fazer a sua marca avançar." },
  { nome: "Calendário", titulo: "Seu mês organizado antes de começar.", texto: "Pautas e datas planejadas a partir da sua rotina e do que você tem para mostrar. Nada decidido em cima da hora." },
  { nome: "Roteiro e legenda", titulo: "Você não precisa escrever.", texto: "A Move escreve o que será dito e mostrado em cada peça, no tom da sua marca." },
  { nome: "Produção", titulo: "Peças prontas, com cara de marca.", texto: "Design ou edição feitos pela equipe, conforme o escopo contratado." },
  { nome: "Aprovação e publicação", titulo: "Você aprova. A Move publica.", texto: "Tudo chega organizado para sua aprovação no prazo combinado. A programação e a publicação ficam com a Move." },
  { nome: "Análise", titulo: "Cada mês aprende com o anterior.", texto: "Leitura dos resultados e reunião de fechamento para decidir o que manter, ajustar ou testar no próximo ciclo." },
];

/* Números da Move (informados pela Myllena em 25/11/2026). */
const NUMEROS = [
  { valor: 4, prefixo: "+", sufixo: "", rotulo: "anos de mercado" },
  { valor: 20, prefixo: "+", sufixo: "", rotulo: "negócios atendidos" },
  { valor: 4, prefixo: "", sufixo: "", rotulo: "estados com a nossa equipe" },
  { valor: 3, prefixo: "+", sufixo: "", rotulo: "estados com clientes" },
];

export function PaginaInicio() {
  useContatoPelaUrl();
  return (
    <Pagina>
      <FaixaCampanha estado={estado} />
      <Cabecalho
        sobreEscuro
        itens={[
          { rotulo: "Gestão", href: "#gestao" },
          { rotulo: "Método", href: "#metodo" },
          { rotulo: "Sobre", href: "#sobre" },
          { rotulo: "Orçamento", href: "#orcamento" },
          { rotulo: "Contato", href: "#contato" },
        ]}
        acao={{ rotulo: "Conversar com a Move", onClick: () => abrirContato("geral") }}
      />
      <main id="conteudo">
        {/* Abertura: o M da IDV em escala de cartaz */}
        <section data-rolagem className="escuro textura relative overflow-hidden bg-azul text-papel lg:-mt-16">
          <div aria-hidden="true" className="m-entrada absolute inset-x-0 top-0 h-[42svh] overflow-hidden lg:inset-0 lg:h-auto">
            <MGigante
              inteiro
              className="absolute left-[6%] top-[16%] h-[125%] w-auto max-w-none lg:left-auto lg:right-[61vw] lg:top-[15%] lg:h-[108%]"
              forca={220}
            />
          </div>
          <img
            src={arquivo("marca/selo-claro.webp")}
            alt=""
            aria-hidden="true"
            width={360}
            height={360}
            className="girar pointer-events-none absolute right-5 top-[calc(42svh-3.5rem)] z-[2] w-24 lg:bottom-14 lg:left-[calc(39vw-4rem)] lg:right-auto lg:top-auto lg:w-32"
          />
          <div className="envoltorio relative grid min-h-[calc(100svh-4rem)] content-end pb-14 pt-[calc(42svh+2.5rem)] lg:min-h-[100svh] lg:grid-cols-[34vw_1fr] lg:content-center lg:pb-20 lg:pt-24 xl:grid-cols-[32vw_1fr]">
            <div className="lg:col-start-2 lg:pl-6 xl:pl-12">
              <p className="rotulo surgir text-bege" style={{ ["--atraso" as string]: "100ms" }}>Agência digital · Estratégia e conteúdo</p>
              <TituloCinetico
                texto="Estratégia para mostrar o"
                destaque="valor do seu trabalho."
                className="mt-5 font-titulo text-[2.6rem] font-light leading-[1.02] tracking-[-0.035em] sm:text-[3.4rem] lg:text-[4rem] xl:text-[4.6rem]"
              />
              <p className="surgir mt-6 max-w-[46ch] text-lg text-papel/80" style={{ ["--atraso" as string]: "650ms" }}>
                Sua maneira de atender, suas escolhas e sua experiência dizem muito sobre o seu negócio. A Move transforma isso em posicionamento, conteúdo e uma gestão de redes que mantém tudo em movimento.
              </p>
              <p aria-hidden="true" className="surgir manuscrita mt-10 -rotate-2 text-[1.9rem] text-bege lg:mt-10 lg:text-[2.2rem]" style={{ ["--atraso" as string]: "1100ms" }}>
                Marketing com processo e movimento.
              </p>
            </div>
          </div>
          <span aria-hidden="true" className="pointer-events-none absolute bottom-8 right-6 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-papel/60 lg:right-10 lg:flex">
            Role
            <span className="relative h-10 w-px overflow-hidden bg-white/20">
              <span className="rolar-indicador absolute inset-x-0 top-0 h-1/2 bg-bege" />
            </span>
          </span>
        </section>

        {/* Palavras da marca */}
        <section aria-label="Palavras da Move" className="border-y border-marinho/10 bg-bege py-6 text-marinho md:py-8">
          <Letreiro
            itens={["Estratégia", "Continuidade", "Parceria", "Método", "Movimento"]}
            classeItem="display text-[2.6rem] md:text-[4.6rem]"
            separador={<span className="manuscrita text-[2rem] text-azul md:text-[3.2rem]">e</span>}
            duracao={36}
          />
        </section>

        {/* Identificação: o texto acende com a rolagem */}
        <section className="relative overflow-hidden py-24 md:py-36">
          <FundoGrafismo
            tom="bege"
            tamanho="max(900px, 70%)"
            posicao="120% 115%"
            mascara="radial-gradient(55% 60% at 100% 100%, #000 25%, transparent 75%)"
            forca={80}
          />
          <div className="envoltorio relative">
            <p className="rotulo text-azul" data-revelar>O ponto de partida</p>
            <h2 className="display mt-5 max-w-[18ch] text-[2.4rem] md:text-[4rem]" data-revelar>
              O seu trabalho tem detalhes que a comunicação ainda não mostra?
            </h2>
            <TextoAceso
              className="mt-10 max-w-[30ch] font-titulo text-[1.55rem] font-light leading-[1.3] tracking-[-0.01em] text-marinho md:mt-14 md:text-[2.4rem]"
              texto="Você sabe por que faz determinadas escolhas. Conhece as perguntas que seus clientes trazem. Mas, na hora de comunicar, tudo isso se perde entre assuntos genéricos e posts soltos. Começamos por essa realidade."
            />
            <p className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 font-titulo text-base font-medium text-azul" data-revelar>
              O que você faz <Seta /> o que precisa ser percebido <Seta /> como comunicar
            </p>
          </div>
        </section>

        {/* Gestão de Redes, com o Método Move dentro */}
        <Gestao />

        {depoimento.ativo && depoimento.video && (
          <section className="bg-offwhite py-20">
            <div className="envoltorio">
              <h2 className="display text-[2.2rem]">A experiência de quem trabalha com a Move.</h2>
              <video className="mt-8 w-full rounded-[1.5rem]" controls preload="none" poster={depoimento.capa ?? undefined}>
                <source src={depoimento.video} />
                {depoimento.legendas && <track kind="captions" src={depoimento.legendas} srcLang="pt-BR" label="Português" default />}
              </video>
              <p className="mt-3 text-sm text-suave">{depoimento.nome}</p>
            </div>
          </section>
        )}

        {/* Sobre: o M azul sangra pelo canto */}
        <section id="sobre" data-rolagem className="relative scroll-mt-16 overflow-hidden py-24 md:py-36">
          <MGigante
            tom="bege"
            inteiro
            forca={120}
            className="absolute -right-[12%] top-[4%] hidden h-[62%] w-auto max-w-none md:block"
          />
          <div className="envoltorio relative grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
            <div data-revelar>
              <p className="rotulo text-azul">Sobre a Move</p>
              <h2 className="display mt-4 text-[2.4rem] md:text-[3.6rem]">
                Para quem leva o próprio nome <span className="font-bold text-azul">a sério.</span>
              </h2>
              <p className="mt-6 text-lg text-suave">
                Há mais de 4 anos no mercado, a Move já trabalhou ao lado de grandes empresas e hoje desenvolve estratégia e conteúdo para prestadores de serviços, com atenção especial aos negócios de saúde.
              </p>
              <p className="mt-4 text-lg text-suave">
                Somos remote first: nossa equipe está espalhada por 4 estados do Brasil, e nossos clientes, por mais de 3.
              </p>
              <div className="mt-8 rounded-[1.5rem] bg-azul p-6 text-papel md:p-7">
                <p className="manuscrita text-[1.9rem] leading-tight text-bege md:text-[2.2rem]">Aqui, atendemos e acompanhamos de perto.</p>
                <p className="mt-3 text-papel/85">
                  De muitos diferenciais, esse é um dos maiores. O acompanhamento é personalizado e cresce junto com cada negócio. Por isso nossa taxa de churn é baixa: os clientes ficam com a gente por anos.
                </p>
              </div>
            </div>
            <Imagem id="A14" proporcao="aspect-[4/5]" mostrarLegenda={false} />
          </div>
          <div className="envoltorio relative mt-16 md:mt-20">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] bg-linha ring-1 ring-linha md:grid-cols-4">
            {NUMEROS.map((n, i) => (
              <div key={n.rotulo} className="flex flex-col-reverse bg-papel p-6 md:p-8" data-revelar style={{ ["--atraso" as string]: `${i * 90}ms` }}>
                <dt className="mt-1 text-[0.95rem] text-suave">{n.rotulo}</dt>
                <dd className="display text-[3rem] leading-none text-azul md:text-[4rem]">
                  <Contagem valor={n.valor} prefixo={n.prefixo} sufixo={n.sufixo} />
                </dd>
              </div>
            ))}
          </dl>
          </div>
        </section>

        {/* Pitch de conversão: orçamento e projeto */}
        <PitchOrcamento />

        {/* Dúvidas */}
        <section className="bg-offwhite py-24 md:py-32">
          <div className="envoltorio grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <div data-revelar>
              <p className="rotulo text-azul">Dúvidas</p>
              <h2 className="display mt-4 text-[2.4rem] md:text-[3.2rem]">Perguntas frequentes.</h2>
            </div>
            <Faq
              itens={[
                { p: "Preciso contratar todos os serviços?", r: "Não. A conversa começa pela sua necessidade. A proposta delimita o que faz sentido agora e o que pode ficar para outro momento." },
                { p: "Quantos posts a Gestão inclui?", r: "O volume e os formatos são definidos na proposta, conforme o objetivo, a complexidade e a matéria-prima disponível." },
                { p: "A Move responde meus clientes?", r: "O atendimento de mensagens e comentários fica com a sua equipe, salvo contratação específica." },
                { p: "O Planejamento inclui produção e publicação?", r: "Inclui estratégia, textos e orientações para você executar. Design, edição e publicação não fazem parte do pacote padrão." },
                { p: "Posso contratar só uma peça ou um projeto?", r: "Sim. Envie sua necessidade e os materiais disponíveis para avaliarmos o escopo." },
                { p: "A Move atende apenas a área da saúde?", r: "Atendemos prestadores de serviços, com atenção especial ao segmento de saúde." },
              ]}
            />
          </div>
        </section>

        {/* Contato: os canais diretos da Move */}
        <section id="contato" data-rolagem className="escuro textura relative overflow-hidden bg-azul py-20 text-papel md:py-28">
          <FundoGrafismo tom="realce" tamanho="max(1000px, 90%)" posicao="100% 50%" mascara="radial-gradient(50% 80% at 100% 50%, #000 25%, transparent 75%)" />
          <div className="envoltorio relative grid gap-10 md:grid-cols-[1fr_1fr] md:items-end md:gap-16">
            <div data-revelar>
              <p className="rotulo text-bege">Contato</p>
              <h2 className="display mt-4 text-[2.4rem] leading-[1.05] md:text-[3.6rem]">Fale com a Move do jeito que preferir.</h2>
              <p className="manuscrita mt-4 text-[1.8rem] text-bege md:text-[2.2rem]">Marketing com processo e movimento.</p>
            </div>
            <ul className="flex flex-col gap-3" data-revelar>
              {[
                contatos.whatsapp && { rotulo: "WhatsApp", valor: whatsappLegivel(contatos.whatsapp), href: linkWhatsApp("geral"), externo: true },
                contatos.email && { rotulo: "E-mail", valor: contatos.email, href: `mailto:${contatos.email}`, externo: false },
                contatos.instagram && { rotulo: "Instagram", valor: "@moveagencia.com.br", href: contatos.instagram, externo: true },
              ]
                .filter((c): c is { rotulo: string; valor: string; href: string; externo: boolean } => Boolean(c && c.href))
                .map((c) => (
                  <li key={c.rotulo}>
                    <a
                      href={c.href}
                      target={c.externo ? "_blank" : undefined}
                      rel={c.externo ? "noopener" : undefined}
                      onClick={() => c.rotulo === "WhatsApp" && registrar("abrir_whatsapp", { pagina: "inicio", lugar: "contato" })}
                      className="group flex min-h-16 items-center justify-between gap-4 rounded-2xl bg-white/[0.07] px-5 py-3 ring-1 ring-white/15 transition-[background-color,color] hover:bg-papel hover:text-marinho"
                    >
                      <span>
                        <span className="block text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-bege group-hover:text-azul">{c.rotulo}</span>
                        <span className="mt-0.5 block text-[1.05rem]">{c.valor}</span>
                      </span>
                      <Seta className="size-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      </main>
      <Rodape />
    </Pagina>
  );
}

function Gestao() {
  const [passo, setPasso] = useState(0);
  const itens = useRef<(HTMLLIElement | null)[]>([]);

  /* O passo em destaque acompanha a rolagem (o do centro da tela). */
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setPasso(Number((e.target as HTMLElement).dataset.passo))),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    itens.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const atual = CICLO_GESTAO[passo];
  return (
    /* overflow-x-clip (e não hidden) para a caixa do ciclo conseguir ficar presa na tela.
       A textura fica só nos blocos de abertura e do ciclo: sobre a seção inteira, ela prendia a
       cena do Método numa camada de mistura e, no iPhone, a cena tremia ao rolar. */
    <section id="gestao" className="escuro relative overflow-x-clip bg-marinho text-papel">
      {/* Abertura da gestão: a linha fica no canto e o texto tem fundo limpo */}
      <div data-rolagem className="textura textura-funde relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32">
        <FundoGrafismo
          tom="azul"
          tamanho="max(1100px, 95%)"
          posicao="100% 0%"
          mascara="radial-gradient(75% 85% at 100% 0%, #000 30%, transparent 72%)"
          forca={160}
        />
        <div className="envoltorio relative">
          <p className="rotulo text-bege" data-revelar>Para quem quer delegar as redes</p>
          <h2 className="display mt-5 max-w-[14ch] text-[2.8rem] md:text-[5.2rem]" data-revelar>
            Gestão de Redes <span className="font-light text-papel/70">Sociais.</span>
          </h2>
          <div className="mt-10 grid gap-8 border-t border-white/12 pt-8 md:mt-14 md:grid-cols-[0.9fr_1.1fr] md:items-start md:gap-16 md:pt-10" data-revelar>
            <p className="manuscrita text-[2rem] leading-[1.15] text-bege md:text-[2.4rem]">Uma equipe para colocar sua comunicação em movimento.</p>
            <p className="text-lg leading-relaxed text-papel/80 md:pt-1">
              Você continua atendendo. A Move cuida das suas redes do começo ao fim: estratégia, calendário, roteiro, produção, publicação e análise. Todo mês, no tom da sua marca e com você aprovando cada peça.
            </p>
          </div>
        </div>
      </div>

      {/* O ciclo de cada mês: rolagem guiada, contado pelo que você ganha */}
      <div className="envoltorio relative pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="max-w-3xl" data-revelar>
          <p className="rotulo text-bege/80">O ciclo de cada mês</p>
          <h3 className="display mt-4 text-[2.1rem] md:text-[3.2rem]">Todo mês, sua marca avança. Sem você carregar o processo.</h3>
        </div>
        <div className="mt-12 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="hidden lg:block">
            <div className="sticky top-[18vh] overflow-hidden rounded-[2rem] bg-azul p-10" aria-hidden="true">
              <img
                src={arquivo("marca/m-inteiro-realce.webp")}
                alt=""
                className="absolute -bottom-[30%] -right-[18%] h-[110%] w-auto max-w-none"
              />
              <p className="relative font-titulo text-sm text-bege">
                Etapa {passo + 1} de {CICLO_GESTAO.length}
              </p>
              <p key={passo} className="entrar contorno display relative mt-4 text-[8rem] leading-none text-bege">0{passo + 1}</p>
              <p key={`t${passo}`} className="entrar display relative mt-6 max-w-[14ch] text-[2.6rem] leading-[1.05]">{atual.nome}</p>
              <div className="relative mt-10 flex gap-1.5">
                {CICLO_GESTAO.map((c, i) => (
                  <span key={c.nome} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= passo ? "bg-bege" : "bg-white/15"}`} />
                ))}
              </div>
            </div>
          </div>
          <ol data-rolagem className="relative">
            <span aria-hidden="true" className="absolute bottom-0 left-[1.15rem] top-0 w-px bg-white/12" />
            <span aria-hidden="true" className="preencher-y absolute bottom-0 left-[1.15rem] top-0 w-px bg-bege" />
            {CICLO_GESTAO.map((c, i) => (
              <li
                key={c.nome}
                ref={(el) => {
                  itens.current[i] = el;
                }}
                data-passo={i}
                className={`relative grid grid-cols-[2.4rem_1fr] gap-5 pb-12 transition-opacity duration-500 lg:min-h-[46vh] lg:pb-0 ${
                  passo === i ? "lg:opacity-100" : "lg:opacity-35"
                }`}
              >
                <span
                  className={`relative z-10 grid size-[2.3rem] place-items-center rounded-full font-titulo text-sm transition-colors duration-500 ${
                    i <= passo ? "bg-bege text-marinho" : "bg-marinho text-papel/70 ring-1 ring-white/25"
                  }`}
                >
                  0{i + 1}
                </span>
                <div className="pt-1">
                  <p className="rotulo text-bege/80">{c.nome}</p>
                  <h4 className="display mt-2 text-[1.8rem] leading-tight md:text-[2.4rem]">{c.titulo}</h4>
                  <p className="mt-3 max-w-[42ch] text-lg text-papel/75">{c.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Método Move dentro da gestão: um caminho que a pessoa percorre */}
      <CaminhoDoMetodo />

      {/* Escopo e chamada */}
      <div className="envoltorio relative py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div data-revelar>
            <Imagem id="G01" proporcao="aspect-[4/3]" />
          </div>
          <div className="flex flex-col gap-6" data-revelar>
            <h3 className="display text-[2.2rem] leading-[1.05] md:text-[3rem]">Você entra com o que só você sabe. A Move faz o resto.</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10">
                <p className="rotulo text-bege">Você</p>
                <p className="mt-2 text-papel/85">Conta sobre o seu negócio, grava os materiais combinados e aprova no prazo.</p>
              </div>
              <div className="rounded-2xl bg-bege p-6 text-marinho">
                <p className="rotulo text-azul">A Move</p>
                <p className="mt-2">Pensa a estratégia, escreve, produz o que foi contratado, publica e lê os resultados com você.</p>
              </div>
            </div>
            <p className="text-sm text-papel/65">Atendimento de direct e comentários, captação presencial e mídia paga não entram automaticamente no escopo.</p>
            <div className="mt-2 flex flex-col gap-4 border-t border-white/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[40ch] text-papel/80">Começa com uma conversa sobre o momento do seu negócio. Depois, você recebe uma proposta com volume, formatos e prazos definidos.</p>
              <Botao variante="claro" className="shrink-0" onClick={() => abrirContato("gestao")}>
                Quero delegar minhas redes <Seta />
              </Botao>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Abre o contato já no serviço quando a URL traz ?servico= (vindo da bio, por exemplo). */
function useContatoPelaUrl() {
  useEffect(() => {
    const s = new URLSearchParams(location.search).get("servico") as ServicoId | null;
    if (s && ["gestao", "jornada", "projetos", "planejamento", "geral", "duvida-black"].includes(s)) {
      const t = setTimeout(() => abrirContato(s), 350);
      return () => clearTimeout(t);
    }
  }, []);
}

function whatsappLegivel(n: string) {
  return `+${n.slice(0, 2)} ${n.slice(2, 4)} ${n.slice(4, 8)}-${n.slice(8)}`;
}
