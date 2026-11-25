import { useEffect, useState } from "react";
import { oferta, type EstadoCampanha } from "../../config/oferta";

/** Contagem regressiva da Black (fim na campanha ativa, início na pré-abertura), no horário de Brasília. */
export function Contador({ estado, className = "" }: { estado: EstadoCampanha; className?: string }) {
  const c = oferta.campanha;
  const alvo = estado === "ativa" ? Date.parse(c.fim) : estado === "pre" ? Date.parse(c.inicio) : null;
  const [agora, setAgora] = useState(() => Date.now());
  useEffect(() => {
    if (!alvo) return;
    const t = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(t);
  }, [alvo]);
  if (!alvo || alvo <= agora) return null;
  const s = Math.floor((alvo - agora) / 1000);
  const partes = [
    { v: Math.floor(s / 86400), r: "dias" },
    { v: Math.floor((s % 86400) / 3600), r: "horas" },
    { v: Math.floor((s % 3600) / 60), r: "min" },
    { v: s % 60, r: "seg" },
  ];
  return (
    <div className={className}>
      <p className="text-xs uppercase tracking-[0.18em] text-papel/55">{estado === "ativa" ? "A condição termina em" : "A Black começa em"}</p>
      <div className="mt-2 flex gap-1.5" role="timer" aria-label={`${partes[0].v} dias, ${partes[1].v} horas e ${partes[2].v} minutos`}>
        {partes.map((p, i) => (
          <span key={p.r} aria-hidden="true" className="flex items-baseline gap-1">
            <span className="flex min-w-[3.4rem] flex-col items-center rounded-xl bg-white/[0.07] px-2 py-2 ring-1 ring-white/10">
              <span className="font-titulo text-[1.35rem] font-semibold leading-none tabular-nums">{String(p.v).padStart(2, "0")}</span>
              <span className="mt-1 text-[0.6rem] uppercase tracking-wider text-papel/50">{p.r}</span>
            </span>
            {i < 3 && <span className="text-papel/25">:</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
