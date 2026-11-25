import { imagens } from "../config/site";
import { arquivo } from "../lib/rotas";

/**
 * Imagem configurável por código (A01, M01...). Sem arquivo, mostra um espaço
 * reservado que diz o que deve entrar ali. Carregamento sob demanda.
 */
export function Imagem({
  id,
  className = "",
  proporcao = "aspect-[4/5]",
  prioridade = false,
  mostrarLegenda = true,
}: {
  id: string;
  className?: string;
  proporcao?: string;
  prioridade?: boolean;
  mostrarLegenda?: boolean;
}) {
  const img = imagens[id];
  if (!img) return null;
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden rounded-[1.25rem] bg-azul ${proporcao}`}>
        {img.src ? (
          <img
            src={arquivo(img.src)}
            alt={img.alt}
            width={img.largura}
            height={img.altura}
            loading={prioridade ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={prioridade ? "high" : "auto"}
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={`Espaço reservado: ${img.alt}`}
            className="absolute inset-0 overflow-hidden bg-azul"
          >
            <img
              src={arquivo("marca/m-inteiro-realce.webp")}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute -bottom-[22%] -right-[24%] h-[85%] w-auto max-w-none"
            />
            <div className="absolute inset-0 flex flex-col justify-between p-5 text-papel">
              <span className="rotulo self-start rounded-full bg-white/10 px-3 py-1.5 text-[0.65rem] text-papel/85 backdrop-blur-sm">
                {id} · imagem a definir
              </span>
              <span className="max-w-[26ch] text-sm leading-snug text-papel/70">{img.pendencia}</span>
            </div>
          </div>
        )}
      </div>
      {mostrarLegenda && img.legenda && <figcaption className="mt-3 text-sm text-suave">{img.legenda}</figcaption>}
    </figure>
  );
}
