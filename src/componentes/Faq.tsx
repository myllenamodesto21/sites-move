export type Pergunta = { p: string; r: string };

export function Faq({ itens, escuro = false }: { itens: Pergunta[]; escuro?: boolean }) {
  return (
    <div className={`divide-y ${escuro ? "divide-white/15 border-white/15" : "divide-linha border-linha"} border-y`}>
      {itens.map((i) => (
        <details key={i.p} className="group">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium">
            <span>{i.p}</span>
            <span
              aria-hidden="true"
              className="grid size-8 shrink-0 place-items-center rounded-full border border-current/25 text-base transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className={`max-w-[62ch] pb-6 ${escuro ? "text-papel/80" : "text-suave"}`}>{i.r}</p>
        </details>
      ))}
    </div>
  );
}
