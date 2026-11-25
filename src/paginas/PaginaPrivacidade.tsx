import { href } from "../lib/rotas";
import { Bloco, CanaisDeContato, PaginaLegal } from "../componentes/Legal";

/** Data da última revisão do texto. Mude junto com qualquer alteração abaixo. */
const ATUALIZADA_EM = "25/11/2026";

export function PaginaPrivacidade() {
  return (
    <PaginaLegal
      rotulo="Política de privacidade"
      titulo="Seus dados, tratados com o mesmo cuidado que o seu negócio."
      resumo="Esta página explica, em linguagem simples, o que a Move faz com as informações de quem visita os sites e conversa com a agência."
      atualizadaEm={ATUALIZADA_EM}
    >
      <Bloco titulo="Quem somos">
        <p>
          A Move Agência Digital cuida de estratégia, conteúdo e presença digital para prestadores de serviços. É a Move quem decide como as informações
          descritas aqui são usadas.
        </p>
      </Bloco>

      <Bloco titulo="Ao navegar nos sites">
        <p>Os sites da Move não pedem cadastro e não têm formulário de dados pessoais.</p>
        <p>
          Para saber de onde veio a sua visita (por exemplo, do link da bio no Instagram), o seu navegador guarda essa origem apenas no seu aparelho, durante
          a visita, e a leva junto até a conversa ou a página de pagamento. A Move não recebe essa informação sem que você clique em um contato.
        </p>
        <p>Hoje, os sites não usam ferramentas de análise de terceiros nem cookies de publicidade. Se isso mudar, esta página será atualizada antes.</p>
      </Bloco>

      <Bloco titulo="Ao falar com a Move">
        <p>
          Os botões de contato abrem o WhatsApp ou o seu e-mail com uma mensagem já escrita, que você pode editar antes de enviar. O que você contar na
          conversa (nome, telefone, e-mail, informações sobre o seu negócio) é usado para responder, entender a sua necessidade e preparar uma proposta.
        </p>
        <p>A conversa no WhatsApp segue também a política de privacidade do próprio aplicativo.</p>
      </Bloco>

      <Bloco titulo="Ao contratar">
        <p>
          O pagamento é feito na plataforma de checkout indicada na página de cada serviço, que segue a própria política de privacidade. A Move recebe apenas
          os dados necessários para identificar a compra, emitir os documentos fiscais e começar o atendimento.
        </p>
        <p>Durante o trabalho, as informações, os materiais e os acessos que você compartilha são usados somente para executar o serviço contratado.</p>
      </Bloco>

      <Bloco titulo="Por quanto tempo">
        <p>
          Os dados ficam guardados enquanto forem necessários para o atendimento, para o contrato e para cumprir obrigações legais, como as fiscais. Depois
          disso, são apagados ou anonimizados.
        </p>
      </Bloco>

      <Bloco titulo="O que a Move não faz">
        <p>A Move não vende, não aluga e não compartilha os seus dados com terceiros para fins de publicidade.</p>
      </Bloco>

      <Bloco titulo="Seus direitos">
        <p>
          Pela Lei Geral de Proteção de Dados (Lei 13.709/2018), você pode pedir, a qualquer momento, para saber quais dados a Move tem sobre você, corrigir,
          atualizar ou pedir a exclusão deles, quando a lei permitir.
        </p>
      </Bloco>

      <Bloco titulo="Contato">
        <p>
          Para qualquer pedido sobre os seus dados, fale com a Move <CanaisDeContato />.
        </p>
        <p>
          Veja também os{" "}
          <a className="font-semibold text-azul underline underline-offset-4" href={href("termos")}>
            Termos de uso
          </a>
          .
        </p>
      </Bloco>
    </PaginaLegal>
  );
}
