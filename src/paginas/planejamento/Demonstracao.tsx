import { useRef, useState, type KeyboardEvent } from "react";
import { amostras, type Amostra } from "../../config/amostras";
import { registrar } from "../../lib/medicao";
import { Selo } from "../../componentes/Selo";
import { AmostraEstrategia } from "./AmostraEstrategia";
import { AmostraPerfil } from "./AmostraPerfil";
import { AmostraCalendario } from "./AmostraCalendario";
import { AmostraStories } from "./AmostraStories";
import { AmostraGuia } from "./AmostraGuia";

const CONTEUDO: Record<Amostra["id"], () => React.JSX.Element> = {
  estrategia: AmostraEstrategia,
  perfil: AmostraPerfil,
  calendario: AmostraCalendario,
  stories: AmostraStories,
  guia: AmostraGuia,
};

const AUTORIZACAO = {
  autorizado: { texto: "Recorte real autorizado · Studio Brasilê", tom: "neutro" as const },
  pendente: { texto: "Recorte real · aguardando autorização de uso", tom: "pendente" as const },
  ilustrativa: { texto: "Amostra ilustrativa, montada a partir do guia real", tom: "pendente" as const },
};

const INCLUSAO = { incluido: "oferta", parcial: "neutro", fora: "fora" } as const;
const INCLUSAO_ROTULO = { incluido: "Incluído no pacote", parcial: "Incluído em parte", fora: "Fora do pacote padrão" };

export function Demonstracao({ contido = false }: { contido?: boolean }) {
  const [ativa, setAtiva] = useState(0);
  const abas = useRef<(HTMLButtonElement | null)[]>([]);

  const escolher = (i: number, focar = false) => {
    setAtiva(i);
    registrar("abrir_amostra", { amostra: amostras[i].id });
    if (focar) abas.current[i]?.focus();
    abas.current[i]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  };

  const teclas = (e: KeyboardEvent) => {
    const n = amostras.length;
    if (e.key === "ArrowRight") escolher((ativa + 1) % n, true);
    else if (e.key === "ArrowLeft") escolher((ativa - 1 + n) % n, true);
    else if (e.key === "Home") escolher(0, true);
    else if (e.key === "End") escolher(n - 1, true);
    else return;
    e.preventDefault();
  };

  const a = amostras[ativa];
  const Conteudo = CONTEUDO[a.id];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Amostras dos entregáveis"
        onKeyDown={teclas}
        className={`flex snap-x gap-2 overflow-x-auto pb-2 [scrollbar-width:none] ${contido ? "scroll-px-1 px-1 pt-1" : "-mx-5 px-5 md:mx-0 md:px-0"}`}
      >
        {amostras.map((am, i) => (
          <button
            key={am.id}
            ref={(el) => {
              abas.current[i] = el;
            }}
            role="tab"
            id={`aba-${am.id}`}
            aria-selected={i === ativa}
            aria-controls={`painel-${am.id}`}
            tabIndex={i === ativa ? 0 : -1}
            onClick={() => escolher(i)}
            className="flex min-h-12 shrink-0 snap-start items-center gap-2 rounded-full border border-marinho/20 px-5 text-[0.95rem] transition-colors aria-selected:border-marinho aria-selected:bg-marinho aria-selected:text-papel"
          >
            <span className="font-titulo text-xs opacity-60">0{i + 1}</span>
            {am.nome}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`painel-${a.id}`}
        aria-labelledby={`aba-${a.id}`}
        tabIndex={0}
        key={a.id}
        className="entrar mt-6 rounded-[1.75rem] bg-papel p-5 ring-1 ring-linha md:p-10"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h3 className="display text-[1.9rem] md:text-[2.5rem]">{a.titulo}</h3>
            <p className="mt-3 text-suave">{a.resumo}</p>
          </div>
          <div className="flex flex-col gap-2 md:max-w-xs md:items-end md:text-right">
            <Selo tom={INCLUSAO[a.naOferta.status]}>{INCLUSAO_ROTULO[a.naOferta.status]}</Selo>
            <p className="text-sm leading-snug text-suave">{a.naOferta.texto}</p>
          </div>
        </div>
        <div className="mt-8">
          <Conteudo />
        </div>
        <p className="mt-8 border-t border-linha pt-4">
          <Selo tom={AUTORIZACAO[a.autorizacao].tom}>{AUTORIZACAO[a.autorizacao].texto}</Selo>
        </p>
      </div>
    </div>
  );
}
