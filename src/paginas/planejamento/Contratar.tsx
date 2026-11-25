import { oferta, type EstadoCampanha } from "../../config/oferta";
import { checkoutVigente, dataBrasilia, precoVigente, reais } from "../../lib/campanha";
import { comOrigem } from "../../lib/rotas";
import { registrar } from "../../lib/medicao";
import { BotaoLink, Botao, classeBotao } from "../../componentes/Botao";
import { abrirContato } from "../../componentes/Contato";
import { Pendente } from "../../componentes/Selo";
import { CupomBlack } from "./CupomBlack";

/** Botão de contratação conforme o estado. Sem link configurado, mostra a pendência e nunca um link falso. */
export function Contratar({
  estado,
  claro = false,
  compacto = false,
  centro = false,
}: {
  estado: EstadoCampanha;
  claro?: boolean;
  compacto?: boolean;
  centro?: boolean;
}) {
  const variante = claro ? "claro" : "primario";
  const alinhar = centro ? "items-center" : "items-start";

  if (estado === "pre") {
    return (
      <div className={`flex flex-col gap-2 ${alinhar}`}>
        <Botao variante={variante} onClick={() => abrirContato("duvida-black")}>
          Tirar uma dúvida antes da abertura
        </Botao>
        {!compacto && <p className="text-sm opacity-75">A contratação abre em {dataBrasilia(oferta.campanha.inicio)}, à 0h (horário de Brasília).</p>}
      </div>
    );
  }
  if (estado === "esgotada") {
    return (
      <Botao variante={variante} onClick={() => abrirContato("duvida-black")}>
        Falar sobre a próxima disponibilidade
      </Botao>
    );
  }

  const rotulo =
    estado === "ativa" ? `Quero meu Planejamento por ${reais(oferta.campanha.preco)}` : "Contratar meu Planejamento";
  const link = checkoutVigente(estado);

  if (link) {
    const cupom = estado === "ativa" ? oferta.campanha.cupom : null;
    return (
      <div className={`flex flex-col gap-4 ${alinhar}`}>
        <BotaoLink
          variante={variante}
          href={comOrigem(link)}
          onClick={() => {
            // Leva o cupom junto: ao abrir o checkout, ele já está copiado para colar.
            if (cupom) navigator.clipboard?.writeText(cupom).catch(() => {});
            registrar("inicio_checkout", { estado, preco: String(precoVigente(estado)) });
          }}
        >
          {rotulo}
        </BotaoLink>
        {cupom && !compacto && <CupomBlack escuro={claro} className={centro ? "text-center" : ""} />}
      </div>
    );
  }
  return (
    <div className={`flex flex-col gap-3 ${alinhar}`}>
      <span aria-disabled="true" className={classeBotao(variante, "cursor-not-allowed opacity-45")}>
        {rotulo}
      </span>
      {!compacto && (
        <Pendente>
          Checkout {estado === "ativa" ? "da Black" : "regular"} ainda não informado. Preencha em src/config/oferta.ts.
        </Pendente>
      )}
    </div>
  );
}
