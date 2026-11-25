import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variante = "primario" | "secundario" | "claro" | "texto";

const BASE =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold leading-tight transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.98] text-center";
const VARIANTES: Record<Variante, string> = {
  primario: "bg-azul text-papel hover:bg-marinho",
  secundario: "border border-marinho/30 text-marinho hover:border-marinho hover:bg-marinho/5",
  claro: "bg-papel text-marinho hover:bg-bege",
  texto: "min-h-11 px-0 underline decoration-1 underline-offset-[6px] hover:decoration-2 rounded-none",
};

export function classeBotao(v: Variante = "primario", extra = "") {
  return `${BASE} ${VARIANTES[v]} ${extra}`;
}

export function BotaoLink({
  variante = "primario",
  className = "",
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variante?: Variante; children: ReactNode }) {
  return (
    <a className={classeBotao(variante, className)} {...props}>
      {children}
    </a>
  );
}

export function Botao({
  variante = "primario",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variante?: Variante; children: ReactNode }) {
  return (
    <button type="button" className={classeBotao(variante, className)} {...props}>
      {children}
    </button>
  );
}

export function Seta({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
