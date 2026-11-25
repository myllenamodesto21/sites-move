import { estrategia } from "../../config/amostras";

/** Diagnóstico, percepção e decisão editorial em blocos que abrem. */
export function AmostraEstrategia() {
  const { diagnostico: d, percepcao: p, decisao: e } = estrategia;
  return (
    <div className="grid items-start gap-3 md:grid-cols-3 md:gap-4">
      <Bloco numero="01" titulo={d.titulo} natureza={d.natureza} aberto>
        <p>{d.texto}</p>
        <ul className="mt-3 flex flex-col gap-2">
          {d.praticas.map((x) => (
            <li key={x} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-azul-medio" />
              {x}
            </li>
          ))}
        </ul>
      </Bloco>
      <Bloco numero="02" titulo={p.titulo} natureza={p.natureza}>
        <p className="display text-2xl leading-snug">“{p.desejada}”</p>
        <dl className="mt-4 flex flex-col gap-3 text-[0.95rem]">
          <Item t="Realidade da marca" d={p.realidade} />
          <Item t="Por que importa ao público" d={p.relevancia} />
          <Item t="Lacuna de evidência" d={p.lacuna} />
        </dl>
      </Bloco>
      <Bloco numero="03" titulo={e.titulo} natureza="Decisão do planejamento">
        <p className="rotulo text-azul">{e.formula}</p>
        <p className="mt-3">{e.texto}</p>
        <p className="mt-4 text-sm text-suave">Os quatro pilares que organizam o conteúdo:</p>
        <ol className="mt-2 flex flex-col gap-1.5 text-[0.95rem]">
          {e.pilares.map((x, i) => (
            <li key={x}>
              <span className="font-titulo text-xs text-azul-medio">0{i + 1}</span> {x}
            </li>
          ))}
        </ol>
      </Bloco>
    </div>
  );
}

function Item({ t, d }: { t: string; d: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-suave">{t}</dt>
      <dd className="mt-0.5">{d}</dd>
    </div>
  );
}

function Bloco({
  numero,
  titulo,
  natureza,
  aberto,
  children,
}: {
  numero: string;
  titulo: string;
  natureza: string;
  aberto?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={aberto} className="group rounded-2xl bg-offwhite/70 open:bg-offwhite">
      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 p-5">
        <span>
          <span className="font-titulo text-xs text-azul-medio">{numero}</span>
          <span className="mt-1 block text-lg font-semibold leading-snug">{titulo}</span>
        </span>
        <span aria-hidden="true" className="text-xl transition-transform duration-300 group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="px-5 pb-5">
        <p className="mb-3 text-xs italic text-suave">{natureza}</p>
        {children}
      </div>
    </details>
  );
}
