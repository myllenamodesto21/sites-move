import { FUSO, oferta, type EstadoCampanha } from "../config/oferta";
import { previa } from "../config/site";

const ESTADOS: EstadoCampanha[] = ["pre", "ativa", "esgotada", "encerrada", "sem-campanha"];

/** Estado da campanha agora (ou na data informada), com simulação opcional pela URL (?estado=). */
export function estadoDaCampanha(agora: Date = new Date()): EstadoCampanha {
  if (previa.permitirSimulacao && typeof window !== "undefined") {
    const simulado = new URLSearchParams(window.location.search).get("estado") as EstadoCampanha | null;
    if (simulado && ESTADOS.includes(simulado)) return simulado;
  }
  const c = oferta.campanha;
  if (!c.ativa) return "sem-campanha";
  const t = agora.getTime();
  if (t < Date.parse(c.inicio)) return "pre";
  if (t > Date.parse(c.fim)) return "encerrada";
  return c.agendaEsgotada ? "esgotada" : "ativa";
}

/** Durante pré-abertura, ativa e esgotada a página fala da campanha. */
export const emCampanha = (e: EstadoCampanha) => e === "pre" || e === "ativa" || e === "esgotada";

export function precoVigente(e: EstadoCampanha) {
  return e === "ativa" ? oferta.campanha.preco : oferta.regular.preco;
}

export function checkoutVigente(e: EstadoCampanha): string | null {
  if (e === "ativa") return oferta.campanha.checkout;
  if (e === "encerrada" || e === "sem-campanha") return oferta.regular.checkout;
  return null; // pré-abertura e agenda esgotada não vendem
}

/** Valor com centavos (ex.: parcelas). */
export const reaisCentavos = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

/** "12x de R$ 103,42" quando a Black tem parcelamento informado. */
export function parcelasBlack() {
  const p = oferta.campanha.parcelas;
  return p ? `${p.vezes}x de ${reaisCentavos(p.valor)}` : null;
}

export const reais = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function dataBrasilia(iso: string, opcoes: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit" }) {
  return new Intl.DateTimeFormat("pt-BR", { timeZone: FUSO, ...opcoes }).format(new Date(iso));
}

export function horaBrasilia(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", { timeZone: FUSO, hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}

/** Ex.: "até 04/12 às 23h59 (horário de Brasília)". */
export function prazoCampanha() {
  const f = oferta.campanha.fim;
  return `até ${dataBrasilia(f)} às ${horaBrasilia(f).replace(":", "h")} (horário de Brasília)`;
}
