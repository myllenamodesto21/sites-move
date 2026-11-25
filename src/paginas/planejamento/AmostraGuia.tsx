import { useState } from "react";
import { guia } from "../../config/amostras";

/** Orientação de fotografia e checklist de produção que dá para marcar. */
export function AmostraGuia() {
  const [feitos, setFeitos] = useState<Set<number>>(new Set());
  const alternar = (i: number) =>
    setFeitos((f) => {
      const n = new Set(f);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });

  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-10">
      <div>
        <p className="rotulo text-azul-medio">Orientação de fotografia</p>
        <p className="display mt-2 text-[1.7rem]">{guia.fotografia.titulo}</p>
        <ol className="mt-5 flex flex-col gap-4">
          {guia.fotografia.passos.map((p, i) => (
            <li key={p} className="grid grid-cols-[2rem_1fr] gap-2">
              <span className="font-titulo text-sm text-azul-medio">0{i + 1}</span>
              <span>{p}</span>
            </li>
          ))}
        </ol>
      </div>
      <fieldset className="rounded-2xl bg-offwhite p-5 md:p-6">
        <legend className="sr-only">Checklist de produção</legend>
        <div className="flex items-baseline justify-between gap-4">
          <p className="rotulo text-azul-medio">Checklist de produção</p>
          <p className="text-sm text-suave" aria-live="polite">
            {feitos.size} de {guia.checklist.length}
          </p>
        </div>
        <ul className="mt-4 flex flex-col gap-1">
          {guia.checklist.map((c, i) => (
            <li key={c}>
              <label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-papel/70">
                <input
                  type="checkbox"
                  checked={feitos.has(i)}
                  onChange={() => alternar(i)}
                  className="mt-0.5 size-5 shrink-0 accent-[var(--move-azul)]"
                />
                <span className={feitos.has(i) ? "text-suave line-through" : ""}>{c}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </div>
  );
}
