/*
 * Todos os dados editáveis do site ficam aqui.
 * Tudo que está entre colchetes, como "[RESULTADO REAL]", é provisório: enquanto
 * não for preenchido, o site esconde o campo (ou mostra um texto padrão).
 */
const CONFIG = {
  whatsapp: "559284135839",           // DDI + DDD + número, só dígitos
  whatsappMsg: "Oi, Myllena! Vi o site e quero saber mais sobre um site ou app sob medida.",
  pacotes: [
    { nome: "Catálogo Online",
      inclui: "Produtos com foto e preço, carrinho e pedido enviado pronto pro WhatsApp",
      paraQuem: "Confeitaria, moda, semijoias, marmitas, artesanato" },
    { nome: "Site Profissional",
      inclui: "Página de apresentação, serviços, depoimentos e botão de agendamento ou WhatsApp",
      paraQuem: "Médicos, nutricionistas, estética, reformas, aulas, consultores" },
    { nome: "Jornada Completa", selo: "Mais completo",
      inclui: "Site + link da bio + página de vendas ou captura + atendimento automático no WhatsApp",
      paraQuem: "Criadores de conteúdo, profissionais de saúde com conteúdo, infoprodutores" },
    { nome: "App Sob Medida",
      inclui: "App instalável no celular com duas frentes: gestão para o prestador (agenda, pedidos, orçamentos, clientes) e área do cliente (pedir, agendar, acompanhar)",
      paraQuem: "Quem tem um processo próprio e quer parar de depender de planilha e WhatsApp" }
  ],
  cases: [
    { nome: "Vanuza Empreendimentos", tipo: "Catálogo de vendas + app de gestão",
      antes: "[COMO VENDIA ANTES]",
      depois: "Catálogo com categorias e promoções, pedido direto no WhatsApp e a gestão da loja num app que abre com a digital.",
      resultado: "[RESULTADO REAL]",
      link: "https://vanuza-loja.vercel.app", imagem: "assets/cases/case-catalogo.webp" },
    { nome: "Move Agência Digital", tipo: "Site institucional",
      antes: "[CONTEXTO]",
      depois: "Site que apresenta o método, a gestão de redes e a jornada do cliente, com caminho direto para conversar com a Move.",
      resultado: "[RESULTADO REAL]",
      link: "https://www.moveagencia.com.br", imagem: "assets/cases/case-move.webp" }
  ],
  // Perguntas frequentes, na ordem em que aparecem.
  faq: [
    { pergunta: "Funciona para o meu tipo de serviço?",
      resposta: "Se você vende, atende ou agenda, funciona. A ferramenta é feita em cima de como você trabalha hoje, por isso todo projeto começa com uma conversa sobre o seu processo." },
    { pergunta: "Quanto tempo leva?",
      resposta: "Depende do tamanho do projeto. Depois da primeira conversa, você recebe a proposta em até 24h, já com o prazo de entrega combinado para o seu caso." },
    { pergunta: "Preciso ter domínio ou hospedagem?",
      resposta: "Não precisa ter nada pronto. Se você já tem um domínio, usamos o seu. Se não tem, a gente orienta a escolha e configura tudo para o site ficar no ar com o seu endereço." },
    { pergunta: "O app precisa ser baixado na loja?",
      resposta: "Não. Ele abre pelo link e a pessoa adiciona à tela de início, como na simulação acima. Fica com ícone próprio, abre em tela cheia e não depende de aprovação de loja de aplicativos." },
    { pergunta: "Consigo atualizar sozinho(a) depois?",
      resposta: "Sim. A entrega inclui treinamento para você trocar fotos, preços, produtos e textos sem depender de ninguém. No catálogo da Vanuza, por exemplo, a gestão da loja fica num app no celular." },
    { pergunta: "Tem mensalidade?",
      resposta: "Não. Depois da entrega, o projeto é seu, sem mensalidade com a Move. Se um dia quiser uma mudança maior ou uma função nova, é só chamar que a gente orça à parte." },
    { pergunta: "Como funciona o pagamento?",
      resposta: "As condições vêm na proposta, de acordo com o tamanho do projeto. Chama no WhatsApp para conhecer as formas de pagamento." }
  ],
  instagram: "@myllamdesto"
};
