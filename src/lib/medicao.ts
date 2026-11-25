/**
 * Eventos de conversão. Não há ferramenta de análise instalada:
 * os eventos vão para window.dataLayer apenas se ela existir.
 */
type Evento =
  | "clique_cta_principal"
  | "abrir_amostra"
  | "inicio_checkout"
  | "abrir_contato"
  | "abrir_whatsapp"
  | "escolher_objetivo";

export function registrar(evento: Evento, dados: Record<string, string> = {}) {
  const w = window as unknown as { dataLayer?: unknown[] };
  if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event: evento, ...dados });
}
