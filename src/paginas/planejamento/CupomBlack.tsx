import { useState } from "react";
import { oferta } from "../../config/oferta";
import { reais } from "../../lib/campanha";

/** Cupom da Black com botão de copiar. O desconto só entra no checkout com o cupom aplicado. */
export function CupomBlack({ escuro = true, className = "" }: { escuro?: boolean; className?: string }) {
  const cupom = oferta.campanha.cupom;
  const [copiado, setCopiado] = useState(false);
  if (!cupom) return null;
  const copiar = () => {
    navigator.clipboard
      ?.writeText(cupom)
      .then(() => {
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2200);
      })
      .catch(() => {});
  };
  return (
    <div className={className}>
      <div
        className={`inline-flex items-center gap-3 rounded-2xl border border-dashed py-2 pl-4 pr-2 ${
          escuro ? "border-bege/60 bg-bege/[0.08]" : "border-azul/50 bg-azul/[0.05]"
        }`}
      >
        <span className="flex flex-col leading-tight">
          <span className={`text-[0.65rem] uppercase tracking-[0.16em] ${escuro ? "text-papel/55" : "text-suave"}`}>Cupom</span>
          <span className={`font-titulo text-[1.15rem] font-semibold tracking-[0.06em] ${escuro ? "text-bege" : "text-azul"}`}>{cupom}</span>
        </span>
        <button
          type="button"
          onClick={copiar}
          className={`min-h-10 rounded-xl px-3.5 text-sm font-semibold transition-colors ${
            escuro ? "bg-bege text-marinho hover:bg-papel" : "bg-azul text-papel hover:bg-marinho"
          }`}
        >
          <span aria-live="polite">{copiado ? "Copiado" : "Copiar"}</span>
        </button>
      </div>
      <p className={`mt-2 text-sm ${escuro ? "text-papel/60" : "text-suave"}`}>
        Aplique no checkout para o desconto de {reais(oferta.regular.preco - oferta.campanha.preco)}.
      </p>
    </div>
  );
}
