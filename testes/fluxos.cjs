const { chromium } = require('playwright');
const B='http://localhost:8765/a/b/site/';
const ok=(c,m)=>{console.log((c?'OK   ':'FALHA')+' '+m); if(!c) process.exitCode=1;};
(async()=>{
  const b=await chromium.launch();
  const nova=async(w=390,opts={})=>{const p=await b.newPage({viewport:{width:w,height:800},...opts});p.on('pageerror',e=>ok(false,'erro JS: '+e.message));return p;};
  // 1. Instagram -> bio -> oferta -> checkout/contato
  let p=await nova();
  await p.goto(B+'links/index.html?utm_source=instagram&utm_medium=bio&estado=ativa');
  await p.click('text=Ver a entrega e a condição');
  await p.waitForLoadState();
  ok(p.url().includes('planejamento/index.html')&&p.url().includes('utm_source=instagram'),'bio → planejamento preserva utm: '+p.url());
  ok(await p.isVisible('text=De R$ 1.800 por'),'preço da Black visível no topo');
  await p.click('text=Ver a entrega da Andreza');
  ok(p.url().endsWith('#entregaveis'),'CTA inicial leva à demonstração');
  const dy=await p.evaluate(()=>[document.getElementById('entregaveis').offsetTop,document.getElementById('investimento').offsetTop]);
  ok(dy[0]<dy[1],'demonstração fica acima do preço');
  ok((await p.getAttribute('#investimento a:has-text("Quero meu Planejamento por R$ 1.000")','href')).startsWith('https://chk.eduzz.com/1W32745Q92')&&(await p.getAttribute('#investimento a:has-text("Quero meu Planejamento")','href')).includes('utm_source=instagram'),'checkout da Eduzz com origem');
  ok(await p.isVisible('#investimento >> text=BLACKMOVE')&&await p.isVisible('text=12x de R$ 103,42'),'cupom e parcelas visíveis');
  ok(await p.locator('text=Configuração pendente').count()===0,'sem pendência de checkout');
  await p.click('#investimento >> text=Tem uma dúvida sobre a entrega');
  ok(await p.isVisible('dialog[open] >> text=Vim pela Black do Planejamento'),'contato da Black com mensagem contextual');
  await p.keyboard.press('Escape');
  ok(!(await p.isVisible('dialog[open]')),'Esc fecha o contato');
  // demo: teclado e toque
  await p.click('#aba-estrategia'); await p.keyboard.press('ArrowRight');
  ok(await p.getAttribute('#aba-perfil','aria-selected')==='true','seta → troca de amostra (teclado)');
  await p.click('[role=radio]:has-text("Bio atual")'); await p.waitForTimeout(300); ok(await p.isVisible('text=identificação de CEO'),'perfil: comparação bio atual');
  await p.click('button:has-text("Clientes")'); ok(await p.isVisible('text=Feedbacks reais e autorizados'),'perfil: toque no destaque mostra função');
  await p.click('#aba-calendario'); await p.click('text=Como agendar seu primeiro');
  ok(await p.isVisible('text=Texto dos cards'),'calendário: abre pauta com trecho');
  await p.click('#aba-stories'); await p.click('[aria-label="Próxima tela"]');
  ok(await p.isVisible('text=2/4'),'stories: botão avança');
  await p.focus('[aria-roledescription="sequência de stories"]'); await p.keyboard.press('ArrowRight');
  ok(await p.isVisible('text=3/4'),'stories: seta do teclado avança');
  await p.click('#aba-guia'); await p.click('text=Combine o que pode fotografar');
  ok(await p.isVisible('text=1 de 5'),'guia: checklist marca item');
  // 2. bio -> gestão contato
  p=await nova(); await p.goto(B+'links/index.html?utm_source=instagram');
  await p.click('button:has-text("Delegar minhas redes")');
  ok(await p.getAttribute('button:has-text("Delegar minhas redes")','aria-pressed')==='true','seletor de objetivo marca escolha');
  ok((await p.getAttribute('main > div a:has-text("Falar no WhatsApp")','href')).startsWith('https://wa.me/559284135839'),'bio: WhatsApp real no topo');
  ok(await p.isVisible('a[href*="instagram.com/moveagencia.com.br"]'),'bio: Instagram real');
  await p.click('button:has-text("Conversar sobre a gestão")');
  ok(await p.isVisible('dialog[open] >> text=gestão das redes do meu negócio'),'bio → contato de gestão contextual');
  // privacidade
  p=await nova(); await p.goto(B+'links/index.html');
  await p.click('footer >> text=Privacidade'); await p.waitForLoadState();
  ok(p.url().includes('privacidade/index.html') && await p.isVisible('text=Seus direitos'),'bio → página de privacidade');
  // 3. site oficial -> serviço -> contato
  p=await nova(1440); await p.goto(B+'index.html?utm_source=google');
  ok(!(await p.$('#servicos')) && !(await p.$('#case')),'site: sem Outros caminhos e sem case');
  const orc=await p.getAttribute('#orcamento a:has-text("Fazer meu orçamento")','href');
  ok(orc.startsWith('https://wa.me/559284135839') && decodeURIComponent(orc).includes('orçamento'),'site → orçamento no WhatsApp');
  ok((await p.getAttribute('#orcamento a:has-text("por e-mail")','href')).startsWith('mailto:contato@moveagencia.com.br'),'site → orçamento por e-mail');
  ok(await p.isVisible('#contato >> text=contato@moveagencia.com.br'),'site: e-mail no contato');
  await p.click('footer >> text=Termos de uso'); await p.waitForLoadState();
  ok(p.url().includes('termos/index.html') && await p.isVisible('text=Direito de arrependimento') && p.url().includes('utm_source=google'),'site → termos preserva utm');
  // 4. contato via URL (?servico=)
  p=await nova(); await p.goto(B+'index.html?servico=gestao'); await p.waitForTimeout(600);
  ok(await p.isVisible('dialog[open] >> text=Gestão de Redes'),'?servico=gestao abre contato');
  // 5. estados por data real (relógio)
  for (const [data,esperado] of [['2026-11-24T20:00:00-03:00','pre'],['2026-11-25T23:59:00-03:00','pre'],['2026-11-26T00:01:00-03:00','ativa'],['2026-11-28T12:00:00-03:00','ativa'],['2026-12-04T23:58:00-03:00','ativa'],['2026-12-05T00:01:00-03:00','encerrada']]){
    p=await nova(); await p.clock.setFixedTime(new Date(data)); await p.goto(B+'planejamento/index.html');
    const t=await p.textContent('h1 ~ div, section');
    const txt=(await p.evaluate(()=>document.body.innerText)).replace(/\u00a0/g,' ');
    const temBlack=/Black/.test(txt), preco1000=txt.includes('R$ 1.000');
    if(esperado==='encerrada') ok(!temBlack&&!preco1000&&txt.includes('R$ 1.800'),`${data}: pós-campanha sem Black e com R$ 1.800`);
    else if(esperado==='pre') ok(txt.includes('começa em 26/11')&&!(await p.isVisible('text=Quero meu Planejamento por')),`${data}: pré-abertura sem venda`);
    else ok(txt.includes('De R$ 1.800 por R$ 1.000'),`${data}: Black ativa`);
  }
  p=await nova(); await p.clock.setFixedTime(new Date('2026-12-05T09:00:00-04:00')); await p.goto(B+'links/index.html');
  ok(await p.isVisible('text=Conhecer o Planejamento')&&!(await p.evaluate(()=>/Black|R\$ 1\.000/.test(document.body.innerText))),'bio pós-campanha leva ao Planejamento regular');
  p=await nova(); await p.clock.setFixedTime(new Date('2026-12-05T09:00:00-04:00')); await p.goto(B+'index.html');
  ok(!(await p.evaluate(()=>/Black/.test(document.body.innerText))),'site oficial pós-campanha sem faixa da Black');
  p=await nova(); await p.goto(B+'black/index.html?utm_source=story'); await p.waitForURL(/planejamento/);
  ok(p.url().includes('utm_source=story'),'/black redireciona preservando origem');
  // 6. largura sem rolagem horizontal
  for (const w of [360,390,768,1440]) for (const pg of ['index.html','planejamento/index.html','links/index.html','privacidade/index.html','termos/index.html']){
    p=await nova(w); await p.goto(B+pg+'?estado=ativa'); const sw=await p.evaluate(()=>document.documentElement.scrollWidth);
    ok(sw<=w,`${pg} em ${w}px sem rolagem horizontal (${sw})`); await p.close();
  }
  // 7. movimento reduzido
  p=await nova(390,{reducedMotion:'reduce'}); await p.goto(B+'planejamento/index.html');
  const op=await p.evaluate(()=>getComputedStyle(document.querySelector('[data-revelar]')).opacity);
  ok(op==='1','movimento reduzido: conteúdo visível sem animação');
  await b.close();
})();
