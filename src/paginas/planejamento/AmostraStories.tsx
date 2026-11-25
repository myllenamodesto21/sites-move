import { useState, type KeyboardEvent } from "react";
import { stories } from "../../config/amostras";

/** Sequência de Stories navegável por botões, toque nas laterais e setas do teclado. Sem avanço automático. */
export function AmostraStories() {
  const [i, setI] = useState(0);
  const n = stories.telas.length;
  const ir = (novo: number) => setI(Math.max(0, Math.min(n - 1, novo)));
  const t = stories.telas[i];

  const teclas = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") ir(i + 1);
    else if (e.key === "ArrowLeft") ir(i - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div className="grid items-center gap-8 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-12">
      <div
        role="group"
        aria-roledescription="sequência de stories"
        aria-label={`Stories: ${stories.tema}`}
        tabIndex={0}
        onKeyDown={teclas}
        className="relative mx-auto aspect-[9/16] w-full max-w-[20rem] select-none overflow-hidden rounded-[1.75rem] bg-marinho text-papel"
      >
        <div className="absolute inset-x-3 top-3 flex gap-1" aria-hidden="true">
          {stories.telas.map((_, k) => (
            <span key={k} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
              <span className={`block h-full bg-papel transition-[width] duration-300 ${k <= i ? "w-full" : "w-0"}`} />
            </span>
          ))}
        </div>
        <p className="absolute left-4 top-7 text-xs text-papel/70">studio.brasile · ilustrativo</p>

        <div key={i} className="entrar absolute inset-0 flex flex-col justify-end p-6 pb-20" aria-live="polite">
          <p className="rotulo text-bege">
            {i + 1}/{n} · {t.tipo}
          </p>
          <p className="display mt-3 text-[1.75rem] leading-[1.1]">{t.texto}</p>
          <p className="mt-3 text-sm text-papel/70">{t.apoio}</p>
        </div>

        {/* Áreas de toque nas laterais (como no Instagram) */}
        <button type="button" tabIndex={-1} aria-hidden="true" className="absolute inset-y-0 left-0 w-1/3" onClick={() => ir(i - 1)} />
        <button type="button" tabIndex={-1} aria-hidden="true" className="absolute inset-y-0 right-0 w-2/3" onClick={() => ir(i + 1)} />

        <div className="absolute inset-x-4 bottom-4 flex justify-between">
          <button
            type="button"
            onClick={() => ir(i - 1)}
            disabled={i === 0}
            className="grid size-11 place-items-center rounded-full bg-white/15 backdrop-blur disabled:opacity-30"
            aria-label="Tela anterior"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => ir(i + 1)}
            disabled={i === n - 1}
            className="grid size-11 place-items-center rounded-full bg-white/15 backdrop-blur disabled:opacity-30"
            aria-label="Próxima tela"
          >
            ›
          </button>
        </div>
      </div>

      <div>
        <p className="rotulo text-azul-medio">Sequência da semana</p>
        <p className="display mt-2 text-[1.8rem]">{stories.tema}</p>
        <ol className="mt-5 flex flex-col gap-2">
          {stories.telas.map((s, k) => (
            <li key={s.texto}>
              <button
                type="button"
                onClick={() => setI(k)}
                aria-current={k === i ? "step" : undefined}
                className="flex min-h-12 w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-offwhite aria-[current=step]:bg-offwhite"
              >
                <span className="font-titulo text-sm text-azul-medio">{k + 1}</span>
                <span>{s.texto}</span>
              </button>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-suave">Use as setas, toque nas laterais da tela ou escolha um passo da lista.</p>
      </div>
    </div>
  );
}
