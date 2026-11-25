import { contatos } from "../config/site";
import { registrar } from "../lib/medicao";
import { arquivo } from "../lib/rotas";
import { linkWhatsApp, abrirContato } from "./Contato";
import { FundoGrafismo, TituloCinetico } from "./Movimento";
import { Seta } from "./Botao";

const GARANTIAS = [
  "Uma proposta feita para o seu negócio, não um pacote pronto.",
  "Escopo, prazo e investimento claros antes de começar.",
  "Sem compromisso: a conversa começa pela sua necessidade.",
];

const PASSOS = [
  { titulo: "Você apresenta o projeto", texto: "Pelo WhatsApp ou por e-mail, em poucos minutos." },
  { titulo: "A Move entende o seu momento", texto: "Uma conversa para levantar o que o seu negócio precisa." },
  { titulo: "Você recebe a proposta", texto: "Sob medida, com o que comunicar, em quais canais e em que ritmo." },
];

const CORPO_EMAIL = "Olá, Move!\n\nMeu negócio:\nO que eu preciso:\nPrazo desejado:\nLinks (site, Instagram):\n";

/** Chamada principal do site: levar a pessoa a pedir um orçamento e apresentar o projeto. */
export function PitchOrcamento() {
  const whats = linkWhatsApp("orcamento");
  const email = contatos.email
    ? `mailto:${contatos.email}?subject=${encodeURIComponent("Orçamento: meu projeto")}&body=${encodeURIComponent(CORPO_EMAIL)}`
    : null;

  return (
    <section id="orcamento" data-rolagem className="escuro textura relative scroll-mt-16 overflow-hidden bg-marinho py-24 text-papel md:py-36">
      <FundoGrafismo
        tom="azul"
        tamanho="max(1200px, 110%)"
        posicao="100% 100%"
        mascara="radial-gradient(55% 60% at 100% 100%, #000 30%, transparent 75%)"
        forca={80}
      />
      <img
        src={arquivo("marca/selo-claro.webp")}
        alt=""
        aria-hidden="true"
        width={360}
        height={360}
        className="girar pointer-events-none absolute -right-10 -top-10 w-36 opacity-80 md:right-[6%] md:top-24 md:w-40"
      />

      <div className="envoltorio relative grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
        <div>
          <p className="rotulo text-bege" data-revelar>
            Orçamento
          </p>
          <TituloCinetico
            como="h2"
            texto="Seu trabalho já tem valor."
            destaque="Agora ele precisa ser visto."
            className="mt-5 font-titulo text-[2.6rem] font-light leading-[1.02] tracking-[-0.03em] md:text-[4.4rem]"
            classeDestaque="font-bold text-bege"
          />
          <p className="mt-7 max-w-[48ch] text-lg text-papel/80" data-revelar>
            Conte o seu momento e apresente o seu projeto. A Move estuda o seu negócio e devolve uma proposta sob medida para colocar a sua comunicação em
            movimento.
          </p>
          <ul className="mt-8 flex flex-col gap-3" data-revelar>
            {GARANTIAS.map((g) => (
              <li key={g} className="flex items-start gap-3 text-papel/90">
                <span aria-hidden="true" className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-bege text-marinho">
                  <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.5 8.5l3 3 6-7" />
                  </svg>
                </span>
                {g}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center" data-revelar>
            {whats ? (
              <a
                href={whats}
                target="_blank"
                rel="noopener"
                onClick={() => registrar("abrir_whatsapp", { pagina: "inicio", lugar: "orcamento" })}
                className="group inline-flex min-h-14 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-bege px-7 text-[1.05rem] font-semibold text-marinho shadow-[0_18px_40px_-18px_rgba(236,220,195,0.6)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Fazer meu orçamento <Seta className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => abrirContato("orcamento")}
                className="inline-flex min-h-14 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-bege px-7 text-[1.05rem] font-semibold text-marinho"
              >
                Fazer meu orçamento <Seta className="size-4" />
              </button>
            )}
            {email && (
              <a href={email} className="inline-flex min-h-14 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 font-semibold text-papel ring-1 ring-white/30 transition-colors hover:bg-white/10">
                Apresentar meu projeto por e-mail
              </a>
            )}
          </div>
        </div>

        {/* Como funciona o orçamento */}
        <div className="relative rounded-[2rem] bg-marinho/80 p-6 ring-1 ring-white/12 backdrop-blur-sm md:p-8" data-revelar>
          <p className="rotulo text-papel/60">Como funciona o orçamento</p>
          <ol className="relative mt-6 flex flex-col gap-7">
            <span aria-hidden="true" className="absolute bottom-4 left-[1.15rem] top-4 w-px bg-white/15">
              <span className="preencher-y absolute inset-0 origin-top bg-bege" />
            </span>
            {PASSOS.map((p, i) => (
              <li key={p.titulo} className="relative grid grid-cols-[2.3rem_1fr] gap-4">
                <span className="display relative grid size-[2.3rem] place-items-center rounded-full bg-bege text-[0.95rem] text-marinho">{i + 1}</span>
                <span>
                  <span className="display block text-[1.25rem] leading-tight md:text-[1.4rem]">{p.titulo}</span>
                  <span className="mt-1 block text-papel/70">{p.texto}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="manuscrita mt-8 text-[1.7rem] leading-tight text-bege">e a gente acompanha de perto.</p>
        </div>
      </div>
    </section>
  );
}
