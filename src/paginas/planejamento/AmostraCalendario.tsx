import { useState } from "react";
import { semana, type Pauta } from "../../config/amostras";

/** Uma semana do calendário; cada pauta abre objetivo, formato, materiais e trecho. */
export function AmostraCalendario() {
  const primeira = semana.findIndex((p) => p.exibir);
  const [aberta, setAberta] = useState(primeira);
  const p = semana[aberta];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10">
      <div>
        <p className="mb-3 text-sm text-suave">Semana de 30/11 a 06/12 · toque em uma pauta</p>
        <ol className="flex flex-col gap-2">
          {semana.map((d, i) => (
            <li key={d.data}>
              <Dia pauta={d} ativa={i === aberta} onAbrir={() => setAberta(i)} />
            </li>
          ))}
        </ol>
      </div>
      {p?.exibir && <DetalhePauta key={p.data} pauta={p} />}
    </div>
  );
}

function Dia({ pauta: d, ativa, onAbrir }: { pauta: Pauta; ativa: boolean; onAbrir: () => void }) {
  const cabeca = (
    <span className="flex w-12 shrink-0 flex-col text-left leading-tight">
      <span className="text-xs text-suave">{d.dia}</span>
      <span className="font-titulo font-bold">{d.data}</span>
    </span>
  );
  if (!d.titulo) {
    return (
      <div className="flex min-h-12 items-center gap-4 rounded-xl px-4 py-2 text-sm text-suave/70">
        {cabeca}
        <span>Sem publicação</span>
      </div>
    );
  }
  if (!d.exibir) {
    return (
      <div className="flex min-h-16 items-center gap-4 rounded-xl border border-dashed border-linha px-4 py-3">
        {cabeca}
        <span className="min-w-0">
          <span className="block text-sm text-suave">{d.formato} · {d.pilar}</span>
          <span className="block text-sm">Pauta em aprovação pela cliente. Conteúdo não exibido.</span>
        </span>
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={onAbrir}
      aria-expanded={ativa}
      className={`flex min-h-16 w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-colors ${
        ativa ? "bg-marinho text-papel" : "bg-offwhite hover:bg-bege/60"
      }`}
    >
      {cabeca}
      <span className="min-w-0 flex-1">
        <span className={`block text-xs ${ativa ? "text-papel/70" : "text-suave"}`}>{d.formato}</span>
        <span className="block font-medium leading-snug">{d.titulo}</span>
      </span>
    </button>
  );
}

function DetalhePauta({ pauta: p }: { pauta: Pauta }) {
  return (
    <article className="entrar rounded-2xl bg-offwhite p-5 md:p-7" aria-live="polite">
      <p className="rotulo text-azul-medio">Pauta aberta · {p.pilar}</p>
      <h4 className="display mt-2 text-[1.7rem] leading-tight">{p.titulo}</h4>
      <dl className="mt-5 grid gap-4 text-[0.95rem]">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-suave">Objetivo</dt>
          <dd className="mt-1">{p.objetivo}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-suave">Formato</dt>
          <dd className="mt-1">{p.formato}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-suave">Materiais e captação</dt>
          <dd className="mt-1">{p.materiais}</dd>
        </div>
      </dl>
      {p.trecho && (
        <div className="mt-5 rounded-xl bg-papel p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-suave">{p.trecho.rotulo}</p>
          <div className="mt-2 flex flex-col gap-2 font-[450] leading-relaxed">
            {p.trecho.linhas.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        </div>
      )}
      <p className="mt-4 text-xs text-suave">Copy aprovada pela cliente em 23/11/2026. Produção e publicação por Andreza.</p>
    </article>
  );
}
