import { useEffect, useRef, useState } from "react";
import { contatos, mensagensWhatsApp, servicos, type ServicoId } from "../config/site";
import { parametrosDeOrigem } from "../lib/rotas";
import { registrar } from "../lib/medicao";
import { Botao, BotaoLink } from "./Botao";
import { Pendente } from "./Selo";

const EVENTO = "move:contato";

/** Abre a conversa com o serviço já escolhido, de qualquer lugar da página. */
export function abrirContato(servico: ServicoId = "geral") {
  window.dispatchEvent(new CustomEvent<ServicoId>(EVENTO, { detail: servico }));
}

const TITULOS: Record<ServicoId, string> = {
  gestao: "Conversar sobre a Gestão de Redes",
  planejamento: "Tirar uma dúvida sobre o Planejamento",
  "duvida-black": "Tirar uma dúvida sobre a Black",
  jornada: "Conversar sobre a Jornada do Cliente",
  projetos: "Apresentar um projeto",
  geral: "Conversar com a Move",
  orcamento: "Fazer um orçamento",
};

const OPCOES: { id: ServicoId; nome: string }[] = [
  ...servicos.filter((s) => s.id !== "planejamento").map((s) => ({ id: s.id as ServicoId, nome: s.nome })),
  { id: "planejamento", nome: "Planejamento Estratégico" },
  { id: "geral", nome: "Ainda não sei" },
];

export function linkWhatsApp(servico: ServicoId) {
  if (!contatos.whatsapp) return null;
  const origem = parametrosDeOrigem().get("utm_source");
  const texto = mensagensWhatsApp[servico] + (origem ? ` (origem: ${origem})` : "");
  return `https://wa.me/${contatos.whatsapp}?text=${encodeURIComponent(texto)}`;
}

export function Contato() {
  const ref = useRef<HTMLDialogElement>(null);
  const [servico, setServico] = useState<ServicoId>("geral");
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    const abrir = (e: Event) => {
      const id = (e as CustomEvent<ServicoId>).detail;
      setServico(id);
      setCopiado(false);
      registrar("abrir_contato", { servico: id });
      ref.current?.showModal();
    };
    window.addEventListener(EVENTO, abrir);
    return () => window.removeEventListener(EVENTO, abrir);
  }, []);

  const wa = linkWhatsApp(servico);
  const mensagem = mensagensWhatsApp[servico];
  const fechar = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-labelledby="contato-titulo"
      onClick={(e) => e.target === ref.current && fechar()}
      className="m-0 mt-auto max-h-[92dvh] w-full max-w-none rounded-t-[1.75rem] bg-papel p-0 text-marinho backdrop:bg-marinho/50 backdrop:backdrop-blur-[2px] open:entrar md:m-auto md:max-w-lg md:rounded-[1.75rem]"
    >
      <div className="flex flex-col gap-6 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="rotulo text-azul-medio">Contato</p>
            <h2 id="contato-titulo" className="display mt-2 text-[2rem]">
              {TITULOS[servico]}
            </h2>
          </div>
          <button
            type="button"
            onClick={fechar}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-linha text-xl hover:bg-offwhite"
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        <fieldset>
          <legend className="mb-3 text-sm text-suave">Sobre o que você quer falar?</legend>
          <div className="flex flex-wrap gap-2">
            {OPCOES.map((o) => (
              <label
                key={o.id}
                className="cursor-pointer rounded-full border border-linha px-4 py-2.5 text-sm transition-colors has-[:checked]:border-marinho has-[:checked]:bg-marinho has-[:checked]:text-papel has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-azul"
              >
                <input
                  type="radio"
                  name="servico"
                  value={o.id}
                  checked={servico === o.id || (servico === "duvida-black" && o.id === "planejamento") || (servico === "orcamento" && o.id === "geral")}
                  onChange={() => setServico(o.id)}
                  className="sr-only"
                />
                {o.nome}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="rounded-2xl bg-offwhite p-4">
          <p className="text-xs text-suave">Mensagem que vai pronta</p>
          <p className="mt-1 font-medium">“{mensagem}”</p>
        </div>

        <div className="flex flex-col gap-3">
          {wa ? (
            <BotaoLink href={wa} target="_blank" rel="noopener" onClick={() => registrar("abrir_whatsapp", { servico })}>
              Abrir conversa no WhatsApp
            </BotaoLink>
          ) : (
            <>
              <Pendente>O WhatsApp oficial da Move ainda não foi informado. Preencha em src/config/site.ts.</Pendente>
              <Botao
                variante="secundario"
                onClick={() => {
                  navigator.clipboard?.writeText(mensagem).then(() => setCopiado(true), () => setCopiado(false));
                }}
              >
                {copiado ? "Mensagem copiada" : "Copiar a mensagem"}
              </Botao>
            </>
          )}
          {contatos.email && (
            <BotaoLink variante="texto" href={`mailto:${contatos.email}?subject=${encodeURIComponent(TITULOS[servico])}`}>
              Prefiro e-mail
            </BotaoLink>
          )}
        </div>
        <p className="text-xs leading-relaxed text-suave">
          A conversa começa pela sua necessidade. A proposta delimita o que faz sentido agora e o que pode ficar para outro momento.
        </p>
      </div>
    </dialog>
  );
}
