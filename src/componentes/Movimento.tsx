import { createElement, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { arquivo } from "../lib/rotas";

const reduzido = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Grava em cada [data-rolagem] a variável --p: 0 quando o bloco entra por baixo,
 * 1 quando sai por cima. Só os blocos visíveis são calculados, uma vez por quadro,
 * e só com transform e opacity no CSS. Com movimento reduzido, tudo fica em 1.
 */
export function useMovimento() {
  useEffect(() => {
    const alvos = Array.from(document.querySelectorAll<HTMLElement>("[data-rolagem]"));
    if (reduzido() || !("IntersectionObserver" in window)) {
      alvos.forEach((a) => a.style.setProperty("--p", "1"));
      return;
    }
    const visiveis = new Set<HTMLElement>();
    let pedido = 0;
    const calcular = () => {
      pedido = 0;
      const vh = window.innerHeight;
      visiveis.forEach((el) => {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        el.style.setProperty("--p", p.toFixed(4));
      });
    };
    const agendar = () => {
      if (!pedido) pedido = requestAnimationFrame(calcular);
    };
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => (e.isIntersecting ? visiveis.add(e.target as HTMLElement) : visiveis.delete(e.target as HTMLElement)));
      agendar();
    });
    alvos.forEach((a) => obs.observe(a));
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(pedido);
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
    };
  }, []);
}

/** Título que entra palavra a palavra. `forte` marca as palavras em negrito (a partir do índice). */
export function TituloCinetico({
  texto,
  destaque,
  como = "h1",
  className = "",
  classeDestaque = "font-bold",
}: {
  texto: string;
  destaque?: string;
  como?: "h1" | "h2" | "p";
  className?: string;
  classeDestaque?: string;
}) {
  const partes = [
    ...texto.split(" ").filter(Boolean).map((w) => ({ w, forte: false })),
    ...(destaque ?? "").split(" ").filter(Boolean).map((w) => ({ w, forte: true })),
  ];
  return createElement(
    como,
    { className: `cinetico ${className}` },
    partes.map((p, i) => (
      <span key={i}>
        <span className="w">
          <span className={p.forte ? classeDestaque : undefined} style={{ ["--i" as string]: i } as CSSProperties}>
            {p.w}
          </span>
        </span>
        {i < partes.length - 1 ? " " : ""}
      </span>
    )),
  );
}

/** Parágrafo que acende palavra a palavra conforme a rolagem. */
export function TextoAceso({ texto, className = "" }: { texto: string; className?: string }) {
  const palavras = texto.split(" ").filter(Boolean);
  return (
    <p data-rolagem className={`acender ${className}`} style={{ ["--n" as string]: palavras.length } as CSSProperties}>
      {palavras.map((w, i) => (
        <span key={i} style={{ ["--i" as string]: i } as CSSProperties}>
          {w}
          {i < palavras.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

/** Faixa contínua com palavras da marca (decorativa; o texto aparece uma vez para leitores de tela). */
export function Letreiro({
  itens,
  className = "",
  classeItem = "",
  separador = "·",
  duracao = 42,
  reverso = false,
}: {
  itens: string[];
  className?: string;
  classeItem?: string;
  separador?: ReactNode;
  duracao?: number;
  reverso?: boolean;
}) {
  const linha = (oculto: boolean) => (
    <div aria-hidden={oculto || undefined} className="flex shrink-0 items-center">
      {itens.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className={classeItem}>{t}</span>
          <span aria-hidden="true" className="px-[0.45em] opacity-60">
            {separador}
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`overflow-hidden ${className}`}>
      <p className="sr-only">{itens.join(", ")}</p>
      <div aria-hidden="true" className={`letreiro ${reverso ? "letreiro-reverso" : ""}`} style={{ ["--duracao" as string]: `${duracao}s` } as CSSProperties}>
        {linha(true)}
        {linha(true)}
      </div>
    </div>
  );
}

/**
 * Grafismo da IDV ocupando a seção inteira, de ponta a ponta. A máscara deixa
 * o lado do texto limpo e leva a linha até as bordas e os cantos.
 */
export function FundoGrafismo({
  tom = "azul",
  mascara,
  tamanho = "max(1100px, 125%)",
  posicao = "60% 40%",
  opacidade = 1,
  forca = 140,
  className = "",
}: {
  tom?: "azul" | "bege" | "terracota" | "areia" | "realce" | "marinho";
  mascara?: string;
  tamanho?: string;
  posicao?: string;
  opacidade?: number;
  forca?: number;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="paralaxe absolute -inset-y-[18%] inset-x-0"
        style={
          {
            "--forca": `${-forca}px`,
            opacity: opacidade,
            backgroundImage: `url(${arquivo(`marca/grafismo-${tom}.webp`)})`,
            backgroundSize: `${tamanho} auto`,
            backgroundPosition: posicao,
            backgroundRepeat: "no-repeat",
            maskImage: mascara,
            WebkitMaskImage: mascara,
          } as CSSProperties
        }
      />
    </div>
  );
}

/** O M da IDV em escala de cartaz, sangrando para fora da seção. */
export function MGigante({
  tom = "bege",
  inteiro = false,
  className = "",
  forca = 160,
}: {
  tom?: "bege" | "azul" | "realce" | "marinho" | "papel";
  /** O M completo (com o topo arredondado), em vez do recorte de cartaz. */
  inteiro?: boolean;
  className?: string;
  forca?: number;
}) {
  return (
    <img
      src={arquivo(`marca/m-${inteiro ? "inteiro" : "gigante"}-${tom}.webp`)}
      alt=""
      aria-hidden="true"
      width={inteiro ? 1668 : 1231}
      height={inteiro ? 1768 : 1500}
      decoding="async"
      className={`paralaxe pointer-events-none select-none ${className}`}
      style={{ "--forca": `${-forca}px` } as CSSProperties}
    />
  );
}

/** Número que conta até o valor quando aparece na tela (fica parado com movimento reduzido). */
export function Contagem({ valor, prefixo = "", sufixo = "" }: { valor: number; prefixo?: string; sufixo?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [atual, setAtual] = useState(valor);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduzido() || !("IntersectionObserver" in window)) return;
    setAtual(0);
    let quadro = 0;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const inicio = performance.now();
      const passo = (t: number) => {
        const k = Math.min(1, (t - inicio) / 1400);
        setAtual(Math.round(valor * (1 - Math.pow(1 - k, 3))));
        if (k < 1) quadro = requestAnimationFrame(passo);
      };
      quadro = requestAnimationFrame(passo);
    }, { threshold: 0.6 });
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(quadro);
    };
  }, [valor]);
  return (
    <span ref={ref} aria-label={`${prefixo}${valor}${sufixo}`}>
      <span aria-hidden="true">
        {prefixo}
        {atual}
        {sufixo}
      </span>
    </span>
  );
}
