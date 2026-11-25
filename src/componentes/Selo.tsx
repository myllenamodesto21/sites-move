import type { ReactNode } from "react";

type Tom = "neutro" | "pendente" | "oferta" | "fora" | "escuro";
const TONS: Record<Tom, string> = {
  neutro: "bg-marinho/[0.06] text-marinho",
  pendente: "bg-terracota/25 text-[#6b4a26]",
  oferta: "bg-azul/10 text-azul",
  fora: "bg-gelo/70 text-suave",
  escuro: "bg-white/10 text-papel",
};

export function Selo({ tom = "neutro", children, className = "" }: { tom?: Tom; children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.78rem] font-medium leading-snug ${TONS[tom]} ${className}`}>
      {children}
    </span>
  );
}

/** Aviso claro de algo que depende de configuração (link, número, arquivo). */
export function Pendente({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-terracota bg-[#f8efe4] px-3 py-2 text-left text-sm text-[#5c3f1f]">
      <span aria-hidden="true">◌</span>
      <span>
        <strong className="font-semibold">Configuração pendente.</strong> {children}
      </span>
    </span>
  );
}
