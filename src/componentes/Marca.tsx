import { arquivo } from "../lib/rotas";

/** Logotipo oficial (arquivos da IDV em /public/marca). */
export function Marca({ className = "", claro = false, tamanho = "md" }: { className?: string; claro?: boolean; tamanho?: "md" | "lg" }) {
  return (
    <img
      src={arquivo(`marca/move-${claro ? "claro" : "azul"}.webp`)}
      alt="Move Agência Digital"
      width={640}
      height={158}
      className={`${tamanho === "lg" ? "h-10" : "h-7"} w-auto ${className}`}
    />
  );
}

/** Símbolo M oficial, usado como ícone independente. */
export function Simbolo({ className = "", claro = false }: { className?: string; claro?: boolean }) {
  return <img src={arquivo(`marca/m-${claro ? "claro" : "azul"}.webp`)} alt="" aria-hidden="true" width={320} height={302} className={className} />;
}

/** Grafismo da IDV: linha orgânica contínua. */
export function Grafismo({ className = "", tom = "azul" }: { className?: string; tom?: "azul" | "bege" }) {
  return (
    <img
      src={arquivo(`marca/grafismo-${tom}.webp`)}
      alt=""
      aria-hidden="true"
      width={1600}
      height={901}
      loading="lazy"
      decoding="async"
      className={`pointer-events-none select-none ${className}`}
    />
  );
}
