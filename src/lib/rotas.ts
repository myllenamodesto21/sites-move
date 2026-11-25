/**
 * Endereços entre as três páginas, preservando a origem do visitante
 * (utm_*, fbclid, gclid, ref, origem) do Instagram até o contato ou checkout.
 */
const PREVIA = import.meta.env.MODE === "previa";
const CHAVES = /^(utm_[a-z]+|fbclid|gclid|ref|origem|estado)$/;
const MEMORIA = "move-origem";

export type Rota = "inicio" | "planejamento" | "links" | "privacidade" | "termos";
const CAMINHOS: Record<Rota, string> = { inicio: "", planejamento: "planejamento/", links: "links/", privacidade: "privacidade/", termos: "termos/" };

/** Lê a origem da URL atual; se não houver, usa a que ficou guardada nesta visita. */
export function parametrosDeOrigem(): URLSearchParams {
  const atuais = new URLSearchParams(window.location.search);
  const origem = new URLSearchParams();
  atuais.forEach((v, k) => CHAVES.test(k) && origem.set(k, v));
  try {
    if ([...origem.keys()].some((k) => k !== "estado")) {
      sessionStorage.setItem(MEMORIA, origem.toString());
    } else {
      const guardada = new URLSearchParams(sessionStorage.getItem(MEMORIA) ?? "");
      guardada.forEach((v, k) => !origem.has(k) && k !== "estado" && origem.set(k, v));
    }
  } catch {
    /* navegação privada: segue só com a URL */
  }
  return origem;
}

function raiz() {
  return document.querySelector<HTMLMetaElement>('meta[name="raiz"]')?.content ?? "/";
}

export function href(rota: Rota, opcoes: { hash?: string; params?: Record<string, string> } = {}) {
  const base = PREVIA ? `${raiz()}${CAMINHOS[rota]}index.html` : `/${CAMINHOS[rota]}`;
  const q = parametrosDeOrigem();
  Object.entries(opcoes.params ?? {}).forEach(([k, v]) => q.set(k, v));
  const s = q.toString();
  return `${base}${s ? `?${s}` : ""}${opcoes.hash ? `#${opcoes.hash}` : ""}`;
}

/** Acrescenta a origem a um link externo (checkout). */
export function comOrigem(url: string) {
  const u = new URL(url);
  parametrosDeOrigem().forEach((v, k) => k !== "estado" && !u.searchParams.has(k) && u.searchParams.set(k, v));
  return u.toString();
}

/** Caminho de um arquivo de /public (logos, imagens), válido na prévia e em produção. */
export function arquivo(caminho: string) {
  return PREVIA ? `${raiz()}${caminho}` : `/${caminho}`;
}
