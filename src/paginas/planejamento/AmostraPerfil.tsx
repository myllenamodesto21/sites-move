import { useState } from "react";
import { perfil } from "../../config/amostras";

/** Bio atual x proposta e função de cada destaque e fixado (toque para ver). */
export function AmostraPerfil() {
  const [versao, setVersao] = useState<"proposta" | "atual">("proposta");
  const [item, setItem] = useState<{ nome: string; funcao: string } | null>(perfil.destaques[0]);

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-12">
      {/* Telefone */}
      <div className="mx-auto w-full max-w-[22rem] rounded-[2rem] bg-white p-5 shadow-[0_1px_0_rgb(19_32_63/0.08),0_20px_50px_-30px_rgb(19_32_63/0.45)]">
        <div className="flex items-center gap-4">
          <div className="grid size-16 shrink-0 place-items-center rounded-full bg-offwhite text-[0.6rem] text-suave">marca</div>
          <div className="min-w-0">
            <p className="truncate font-semibold">{perfil.arroba}</p>
            <p className="truncate text-sm text-suave">{perfil.nome}</p>
          </div>
        </div>

        <div role="radiogroup" aria-label="Versão da bio" className="mt-4 grid grid-cols-2 rounded-full bg-offwhite p-1 text-sm">
          {(["proposta", "atual"] as const).map((v) => (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={versao === v}
              onClick={() => setVersao(v)}
              className="min-h-10 rounded-full transition-colors aria-checked:bg-marinho aria-checked:text-papel"
            >
              Bio {v}
            </button>
          ))}
        </div>

        <div className="mt-3 min-h-[7.5rem] text-[0.93rem] leading-relaxed" aria-live="polite">
          {versao === "proposta" ? (
            <p key="p" className="entrar">
              {perfil.bioProposta.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
          ) : (
            <p key="a" className="entrar italic text-suave">
              {perfil.bioAtualResumo}
            </p>
          )}
        </div>

        <p className="mt-4 text-xs text-suave">Destaques · toque para ver a função</p>
        <div className="-mx-1 mt-2 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
          {perfil.destaques.map((d) => (
            <button
              key={d.nome}
              type="button"
              aria-pressed={item?.nome === d.nome}
              onClick={() => setItem(d)}
              className="group flex shrink-0 flex-col items-center gap-1.5"
            >
              <span className="grid size-14 place-items-center rounded-full border border-linha bg-papel text-[0.6rem] font-semibold uppercase tracking-wider transition-colors group-aria-pressed:border-azul group-aria-pressed:bg-azul group-aria-pressed:text-papel">
                {d.nome.slice(0, 3)}
              </span>
              <span className="text-[0.7rem]">{d.nome}</span>
            </button>
          ))}
        </div>

        <p className="mt-4 text-xs text-suave">Fixados</p>
        <div className="mt-2 grid grid-cols-3 gap-1">
          {perfil.fixados.map((f) => (
            <button
              key={f.nome}
              type="button"
              aria-pressed={item?.nome === f.nome}
              onClick={() => setItem(f)}
              className="flex aspect-[4/5] flex-col justify-between rounded-md bg-marinho p-2 text-left text-papel transition-[outline] aria-pressed:outline-2 aria-pressed:outline-offset-2 aria-pressed:outline-azul-medio"
            >
              <span className="text-[0.5rem] uppercase tracking-wider opacity-70">{f.rotulo}</span>
              <span className="display text-[0.85rem] leading-tight">{f.nome}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Explicação */}
      <div className="flex flex-col gap-6">
        <div>
          <p className="rotulo text-azul-medio">Por que mudar</p>
          <p className="mt-2 text-lg">{perfil.porQue}</p>
        </div>
        <div className="rounded-2xl bg-offwhite p-5" aria-live="polite">
          {item ? (
            <div key={item.nome} className="entrar">
              <p className="rotulo text-suave">Função</p>
              <p className="display mt-2 text-[1.7rem]">{item.nome}</p>
              <p className="mt-2">{item.funcao}</p>
            </div>
          ) : (
            <p className="text-suave">Toque em um destaque ou fixado.</p>
          )}
        </div>
        <p className="text-sm text-suave">
          A organização é uma proposta editorial: as peças do feed são referências de composição, não artes finais nem resultado de publicação.
        </p>
      </div>
    </div>
  );
}
