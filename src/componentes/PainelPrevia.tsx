import { useState } from "react";
import type { EstadoCampanha } from "../config/oferta";
import { previa } from "../config/site";

const ESTADOS: { id: EstadoCampanha | "auto"; nome: string }[] = [
  { id: "auto", nome: "Pela data" },
  { id: "pre", nome: "Antes" },
  { id: "ativa", nome: "Black" },
  { id: "esgotada", nome: "Lotada" },
  { id: "encerrada", nome: "Depois" },
];

/** Só na prévia de revisão: troca o estado da campanha para conferir cada versão. */
export function PainelPrevia() {
  const [aberto, setAberto] = useState(false);
  if (!previa.permitirSimulacao) return null;
  const atual = new URLSearchParams(location.search).get("estado") ?? "auto";
  const ir = (id: string) => {
    const u = new URL(location.href);
    if (id === "auto") u.searchParams.delete("estado");
    else u.searchParams.set("estado", id);
    location.href = u.toString();
  };
  return (
    <div className="fixed right-2 top-24 z-50 text-[0.8rem]">
      {aberto ? (
        <div className="entrar flex flex-col gap-2 rounded-2xl bg-preto p-3 text-papel shadow-xl">
          <p className="px-1 font-semibold">Prévia: estado da oferta</p>
          <div className="flex flex-wrap gap-1.5">
            {ESTADOS.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => ir(e.id)}
                aria-pressed={atual === e.id}
                className="min-h-9 rounded-full border border-white/20 px-3 aria-pressed:bg-papel aria-pressed:text-preto"
              >
                {e.nome}
              </button>
            ))}
          </div>
          <button type="button" className="self-start px-1 underline" onClick={() => setAberto(false)}>
            Ocultar
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAberto(true)}
          className="min-h-10 rounded-full bg-preto px-4 font-semibold text-papel shadow-lg"
        >
          Prévia
        </button>
      )}
    </div>
  );
}
