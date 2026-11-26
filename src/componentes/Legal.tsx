import type { ReactNode } from "react";
import { contatos } from "../config/site";
import { Cabecalho, Pagina, Rodape } from "./Estrutura";
import { abrirContato } from "./Contato";
import { FundoGrafismo } from "./Movimento";

export const whatsappFormatado = contatos.whatsapp
  ? `+${contatos.whatsapp.slice(0, 2)} ${contatos.whatsapp.slice(2, 4)} ${contatos.whatsapp.slice(4, 8)}-${contatos.whatsapp.slice(8)}`
  : null;

/** Página de texto legal (privacidade, termos) com o visual da Move. */
export function PaginaLegal({
  rotulo,
  titulo,
  resumo,
  atualizadaEm,
  children,
}: {
  rotulo: string;
  titulo: string;
  resumo: string;
  atualizadaEm: string;
  children: ReactNode;
}) {
  return (
    <Pagina>
      <Cabecalho
        acao={{ rotulo: "Conversar com a Move", onClick: () => abrirContato("geral") }}
      />
      <main id="conteudo" className="bg-papel">
        <div className="escuro textura relative overflow-hidden bg-marinho pb-16 pt-32 text-papel md:pb-20 md:pt-40">
          <FundoGrafismo tom="azul" tamanho="max(900px, 80%)" posicao="100% 0%" mascara="radial-gradient(45% 55% at 100% 0%, #000 25%, transparent 70%)" forca={40} />
          <div className="envoltorio relative">
            <p className="rotulo text-bege">{rotulo}</p>
            <h1 className="display mt-4 max-w-[18ch] text-[2.4rem] leading-[1.05] md:text-[3.6rem]">{titulo}</h1>
            <p className="mt-5 max-w-[52ch] text-lg text-papel/75">{resumo}</p>
            <p className="mt-6 text-sm text-papel/55">Atualizada em {atualizadaEm}.</p>
          </div>
        </div>
        <div className="envoltorio max-w-[60rem] py-12 md:py-20">{children}</div>
      </main>
      <Rodape />
    </Pagina>
  );
}

export function Bloco({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section className="border-t border-marinho/10 py-9 md:grid md:grid-cols-[14rem_1fr] md:gap-10" data-revelar>
      <h2 className="display text-[1.35rem] leading-tight text-marinho md:text-[1.5rem]">{titulo}</h2>
      <div className="mt-3 space-y-3 text-[1.02rem] leading-relaxed text-marinho/80 md:mt-0 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-1.5">{children}</div>
    </section>
  );
}

const classeLink = "font-semibold text-azul underline underline-offset-4";

/** Os canais oficiais, em uma frase. */
export function CanaisDeContato() {
  const canais: ReactNode[] = [];
  if (contatos.whatsapp)
    canais.push(
      <a key="w" className={classeLink} href={`https://wa.me/${contatos.whatsapp}`} target="_blank" rel="noopener">
        {whatsappFormatado}
      </a>,
    );
  if (contatos.email)
    canais.push(
      <a key="e" className={classeLink} href={`mailto:${contatos.email}`}>
        {contatos.email}
      </a>,
    );
  if (contatos.instagram)
    canais.push(
      <a key="i" className={classeLink} href={contatos.instagram} target="_blank" rel="noopener">
        Instagram
      </a>,
    );
  return (
    <>
      {canais.map((c, i) => (
        <span key={i}>
          {i > 0 && (i === canais.length - 1 ? " ou " : ", ")}
          {["pelo WhatsApp ", "pelo e-mail ", "pelo "][["w", "e", "i"].indexOf(String((c as { key: string }).key))]}
          {c}
        </span>
      ))}
    </>
  );
}
