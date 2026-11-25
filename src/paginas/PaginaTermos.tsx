import { oferta } from "../config/oferta";
import { empresa } from "../config/site";
import { dataBrasilia, emCampanha, estadoDaCampanha, horaBrasilia, reais } from "../lib/campanha";
import { href } from "../lib/rotas";
import { Bloco, CanaisDeContato, PaginaLegal } from "../componentes/Legal";
import { Pendente } from "../componentes/Selo";

/** Data da última revisão do texto. Mude junto com qualquer alteração abaixo. */
const ATUALIZADA_EM = "25/11/2026";

const c = oferta.campanha;
const estado = estadoDaCampanha();
const linkClasse = "font-semibold text-azul underline underline-offset-4";

export function PaginaTermos() {
  return (
    <PaginaLegal
      rotulo="Termos de uso"
      titulo="As regras do jogo, ditas com clareza."
      resumo="Estes termos valem para quem usa os sites da Move e para quem contrata os serviços apresentados neles. Leia antes de contratar."
      atualizadaEm={ATUALIZADA_EM}
    >
      <Bloco titulo="Quem oferece">
        <p>
          Os serviços são prestados pela {empresa.razaoSocial ?? empresa.nome}
          {empresa.cnpj ? `, CNPJ ${empresa.cnpj}` : ""}
          {empresa.endereco ? `, com endereço em ${empresa.endereco}` : ""}.
        </p>
        {(!empresa.razaoSocial || !empresa.cnpj || !empresa.endereco) && (
          <p>
            <Pendente>Razão social, CNPJ e endereço da Move ainda não foram informados. Preencha em src/config/site.ts (empresa).</Pendente>
          </p>
        )}
        <p>
          Atendimento: <CanaisDeContato />.
        </p>
      </Bloco>

      <Bloco titulo="Uso dos sites">
        <p>
          Os sites apresentam a Move, os serviços e as condições de contratação. As informações podem ser atualizadas a qualquer momento. Valem sempre as
          condições publicadas no momento da contratação.
        </p>
        <p>
          Textos, marca, identidade visual, o Método Move e os materiais de exemplo publicados aqui pertencem à Move ou são usados com autorização. Não podem
          ser copiados ou reutilizados sem permissão por escrito.
        </p>
      </Bloco>

      <Bloco titulo="Planejamento Estratégico">
        <p>
          O {oferta.produto} é contratado direto pela{" "}
          <a className={linkClasse} href={href("planejamento")}>
            página do serviço
          </a>
          , com pagamento na plataforma de checkout indicada nela. {oferta.pagamento}
        </p>
        <p>O que está incluído:</p>
        <ul>
          {oferta.entrega.map((e) => (
            <li key={e.item}>
              <strong className="font-semibold text-marinho">{e.item}:</strong> {e.texto}
            </li>
          ))}
        </ul>
        <p>{oferta.naoInclui}</p>
        <p>
          <strong className="font-semibold text-marinho">Prazo:</strong> {oferta.prazo} O prazo depende da sua participação: o formulário preenchido e a
          reunião de briefing realizada.
        </p>
        <p>
          <strong className="font-semibold text-marinho">Valor:</strong> {reais(oferta.regular.preco)} na condição regular.
          {c.ativa && emCampanha(estado) && (
            <>
              {" "}
              Na {c.nome}, {reais(c.preco)} para compras feitas de {dataBrasilia(c.inicio)} a {dataBrasilia(c.fim)} até {horaBrasilia(c.fim).replace(":", "h")} (horário de Brasília), enquanto houver agenda disponível.
            </>
          )}
        </p>
        {c.ativa && emCampanha(estado) && (
          <p>As vagas da condição especial seguem a ordem de contratação. Quando a agenda lota, a compra pela condição especial é pausada.</p>
        )}
      </Bloco>

      <Bloco titulo="Direito de arrependimento">
        <p>
          Em compras feitas pelo site, você pode desistir em até 7 dias corridos a partir da contratação, com devolução integral do valor pago, como prevê o
          artigo 49 do Código de Defesa do Consumidor. Basta avisar a Move por um dos canais de atendimento.
        </p>
        <p>A devolução é feita pelo mesmo meio de pagamento, conforme as regras da plataforma de checkout e da operadora do cartão.</p>
      </Bloco>

      <Bloco titulo="Gestão de Redes e demais serviços">
        <p>
          Gestão de Redes Sociais, Jornada do Cliente e projetos sob orçamento são contratados por proposta e contrato próprios, que definem escopo, volume,
          prazos, valores, forma de pagamento e regras de cancelamento. Nesses casos, o contrato prevalece sobre estes termos naquilo que for específico.
        </p>
      </Bloco>

      <Bloco titulo="O que cabe a você">
        <ul>
          <li>Passar informações verdadeiras e completas sobre o seu negócio.</li>
          <li>Participar das etapas combinadas e aprovar o que for enviado dentro dos prazos.</li>
          <li>
            Enviar apenas materiais (fotos, vídeos, textos, marcas) que você tem direito de usar, com as autorizações de imagem das pessoas que aparecem
            neles.
          </li>
          <li>
            Conferir se o conteúdo segue as regras do seu conselho ou órgão profissional, quando houver (por exemplo, nas áreas da saúde e do direito), antes de
            publicar.
          </li>
          <li>Produzir e publicar o conteúdo, quando o serviço contratado não incluir essas etapas.</li>
        </ul>
      </Bloco>

      <Bloco titulo="O que cabe à Move">
        <ul>
          <li>Entregar o que foi contratado, com qualidade e nos prazos combinados.</li>
          <li>Manter sigilo sobre as informações, os materiais e os acessos que você compartilhar.</li>
          <li>Orientar com base no Método Move e na experiência da equipe, com acompanhamento próximo.</li>
        </ul>
      </Bloco>

      <Bloco titulo="Resultados">
        <p>
          A Move se compromete com a estratégia, a qualidade e a execução do que foi contratado. Números como alcance, seguidores, contatos e vendas dependem de
          fatores que fogem do controle da agência (a execução do cliente, o mercado e as regras das plataformas) e, por isso, não são garantidos.
        </p>
      </Bloco>

      <Bloco titulo="Direitos sobre o que é entregue">
        <p>
          Depois do pagamento, você pode usar livremente no seu negócio os textos, as pautas e os materiais entregues. O Método Move, os modelos e as
          ferramentas de trabalho da agência continuam sendo da Move, e a entrega não pode ser revendida ou repassada como serviço a terceiros.
        </p>
        <p>A Move só mostra o seu trabalho como case ou portfólio com a sua autorização.</p>
      </Bloco>

      <Bloco titulo="Privacidade">
        <p>
          O tratamento dos seus dados segue a{" "}
          <a className={linkClasse} href={href("privacidade")}>
            Política de privacidade
          </a>{" "}
          e a Lei Geral de Proteção de Dados (Lei 13.709/2018).
        </p>
      </Bloco>

      <Bloco titulo="Mudanças e foro">
        <p>
          Estes termos podem ser atualizados. A versão publicada no momento da contratação é a que vale para ela, e a data da última atualização fica no topo
          desta página.
        </p>
        <p>
          Para resolver qualquer questão, vale o foro do domicílio do consumidor, como prevê o Código de Defesa do Consumidor.
        </p>
      </Bloco>
    </PaginaLegal>
  );
}
