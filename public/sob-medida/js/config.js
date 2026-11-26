/*
 * Todos os dados editáveis do site ficam aqui.
 * Tudo que está entre colchetes, como "[PRAZO]", é provisório: enquanto
 * não for preenchido, o site esconde o campo (ou mostra um texto padrão).
 */
const CONFIG = {
  whatsapp: "559284135839",           // DDI + DDD + número, só dígitos
  whatsappMsg: "Oi, Myllena! Vi o site e quero saber mais sobre um site ou app sob medida.",
  pacotes: [
    { nome: "Catálogo Online", prazo: "[PRAZO]",
      inclui: "Produtos com foto e preço, carrinho e pedido enviado pronto pro WhatsApp",
      paraQuem: "Confeitaria, moda, semijoias, marmitas, artesanato" },
    { nome: "Site Profissional", prazo: "[PRAZO]",
      inclui: "Página de apresentação, serviços, depoimentos e botão de agendamento ou WhatsApp",
      paraQuem: "Médicos, nutricionistas, estética, reformas, aulas, consultores" },
    { nome: "Jornada Completa", prazo: "[PRAZO]", selo: "Mais completo",
      inclui: "Site + link da bio + página de vendas ou captura + atendimento automático no WhatsApp",
      paraQuem: "Criadores de conteúdo, profissionais de saúde com conteúdo, infoprodutores" },
    { nome: "App Sob Medida", prazo: "Sob consulta",
      inclui: "App instalável no celular com duas frentes: gestão para o prestador (agenda, pedidos, orçamentos, clientes) e área do cliente (pedir, agendar, acompanhar)",
      paraQuem: "Quem tem um processo próprio e quer parar de depender de planilha e WhatsApp" }
  ],
  manutencao: "[VALOR]/mês",
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
  // Respostas das perguntas frequentes. Enquanto estiver "[RESPOSTA]",
  // o site mostra um convite para perguntar no WhatsApp.
  faq: [
    { pergunta: "Quanto tempo leva?", resposta: "[RESPOSTA]" },
    { pergunta: "Preciso ter domínio ou hospedagem?", resposta: "[RESPOSTA]" },
    { pergunta: "Consigo atualizar sozinho(a) depois?", resposta: "[RESPOSTA]" },
    { pergunta: "Tem manutenção mensal?", resposta: "[RESPOSTA]" },
    { pergunta: "Como funciona o pagamento?", resposta: "[RESPOSTA]" }
  ],
  instagram: "@myllamdesto"
};
