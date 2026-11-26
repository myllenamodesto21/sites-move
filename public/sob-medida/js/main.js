/* Move | Sites, catálogos e apps sob medida. Monta o site a partir do CONFIG (js/config.js). */
(function () {
  "use strict";

  var C = window.CONFIG || (typeof CONFIG !== "undefined" ? CONFIG : {});
  var raiz = document.documentElement;
  var reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Utilidades ---------- */

  // "[PRAZO]" e afins contam como não preenchidos.
  function preenchido(v) {
    if (v === undefined || v === null) return false;
    var t = String(v).trim();
    return t !== "" && !/\[[^\]]*\]/.test(t);
  }

  // Origem do visitante (origem, utm_source, ref), como no resto do site da Move:
  // entra no fim da mensagem para saber de onde veio cada contato.
  var origem = "";
  try {
    var q = new URLSearchParams(location.search);
    origem = q.get("origem") || q.get("utm_source") || q.get("ref") || "";
    if (origem) sessionStorage.setItem("move-sob-medida-origem", origem);
    else origem = sessionStorage.getItem("move-sob-medida-origem") || "";
  } catch (e) { /* navegação privada: segue sem origem */ }

  function linkWhats(msg) {
    var texto = (msg || C.whatsappMsg || "") + (origem ? " (origem: " + origem.slice(0, 40) + ")" : "");
    return "https://wa.me/" + String(C.whatsapp || "").replace(/\D/g, "") +
      "?text=" + encodeURIComponent(texto);
  }

  function el(tag, classe, texto) {
    var e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto !== undefined) e.textContent = texto;
    return e;
  }

  var ICONES = {
    mensagem: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    seta: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    "seta-baixo": '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
    baixar: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    bolo: '<path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/>',
    estetoscopio: '<path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>',
    brilho: '<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/>',
    martelo: '<path d="m15 12-8.37 8.37a1 1 0 1 1-3-3L12 9"/><path d="m18 15 4-4"/><path d="m21.5 11.5-1.91-1.91A2 2 0 0 1 19 8.17V7l-2.26-2.26a6 6 0 0 0-4.2-1.76L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.17a2 2 0 0 1 1.42.59L18.5 14.5"/>',
    video: '<path d="m16 13 5.22 3.48a.5.5 0 0 0 .78-.42V7.87a.5.5 0 0 0-.75-.43L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    celular: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    relogio: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    presente: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
    compartilhar: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m16 6-4-4-4 4"/><path d="M12 2v13"/>',
    externo: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    mais: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    cadeado: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    "mais-quadrado": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/>',
    calendario: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
    mapa: '<path d="M14.1 6.03a2 2 0 0 0 1.79 0l3.66-1.83A1 1 0 0 1 21 5.1v12.28a1 1 0 0 1-.55.9l-4.56 2.28a2 2 0 0 1-1.79 0l-4.2-2.1a2 2 0 0 0-1.79 0l-3.66 1.83A1 1 0 0 1 3 19.38V7.1a1 1 0 0 1 .55-.9l4.56-2.28a2 2 0 0 1 1.79 0z"/><path d="M15 5.76v15"/><path d="M9 3.24v15"/>',
    imagem: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>'
  };

  function svg(nome) {
    return '<svg class="icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (ICONES[nome] || "") + "</svg>";
  }

  function desenharIcones(escopo) {
    (escopo || document).querySelectorAll("i[data-icone]").forEach(function (i) {
      i.outerHTML = svg(i.getAttribute("data-icone"));
    });
  }

  /* ---------- Textos vindos do CONFIG ---------- */

  function montarTextos() {
    var insta = String(C.instagram || "").replace(/^@/, "");
    document.querySelectorAll("[data-instagram]").forEach(function (a) {
      if (!insta) { a.remove(); return; }
      a.href = "https://instagram.com/" + encodeURIComponent(insta);
      a.textContent = "@" + insta;
    });
  }

  /* ---------- Pacotes ---------- */

  function montarPacotes() {
    var caixa = document.querySelector("[data-pacotes]");
    (C.pacotes || []).forEach(function (p) {
      var c = el("article", "pacote aparecer");
      if (preenchido(p.selo)) c.classList.add("pacote--destaque");

      if (preenchido(p.selo)) {
        var topo = el("div", "pacote__topo");
        topo.appendChild(el("span", "pacote__selo", p.selo));
        c.appendChild(topo);
      }

      c.appendChild(el("h3", "pacote__nome", p.nome));
      c.appendChild(el("p", "pacote__inclui", p.inclui));

      var dl = el("dl", "pacote__dados");
      if (preenchido(p.paraQuem)) {
        dl.appendChild(el("dt", "", "Para quem"));
        dl.appendChild(el("dd", "", p.paraQuem));
      }
      c.appendChild(dl);

      var msg = "Oi, Myllena! Quero um orçamento do pacote " + p.nome + ".";
      var a = el("a", "botao " + (preenchido(p.selo) ? "botao--destaque" : "botao--contorno"));
      a.href = linkWhats(msg);
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("data-wa-pronto", "");
      a.innerHTML = "Pedir orçamento" + svg("seta");
      a.setAttribute("aria-label", "Pedir orçamento do pacote " + p.nome);
      c.appendChild(a);

      caixa.appendChild(c);
    });
  }

  /* ---------- Cases ---------- */

  function placeholderCase() {
    var d = el("div", "print-vazio");
    d.innerHTML = svg("imagem") + "<span>Print do case</span><i></i><i></i><i></i>";
    return d;
  }

  function montarCases() {
    var caixa = document.querySelector("[data-cases]");
    (C.cases || []).forEach(function (cs, n) {
      var bloco = el("article", "case aparecer");
      if (n % 2) bloco.classList.add("case--invertido");

      var visual = el("div", "case__visual");
      var cel = el("div", "celular");
      cel.setAttribute("data-parallax", "0.04");
      var tela = el("div", "celular__tela");
      tela.appendChild(placeholderCase());
      cel.appendChild(tela);
      visual.appendChild(cel);
      bloco.appendChild(visual);
      carregarPrint(cs.imagem, tela, "Print do " + (preenchido(cs.nome) ? cs.nome : "case"));

      var corpo = el("div", "case__corpo");
      if (preenchido(cs.tipo) && preenchido(cs.nome)) corpo.appendChild(el("p", "rotulo", cs.tipo));
      corpo.appendChild(el("h3", "case__nome", preenchido(cs.nome) ? cs.nome : (preenchido(cs.tipo) ? cs.tipo : "Case")));

      var ad = el("div", "case__antes-depois");
      // Sem o "antes", vira um quadro só com o que foi feito.
      var colunas = preenchido(cs.antes)
        ? [["Antes", cs.antes], ["Depois", cs.depois]]
        : [["O que foi feito", cs.depois]];
      if (colunas.length === 1) ad.classList.add("case__antes-depois--um");
      colunas.forEach(function (par) {
        if (!preenchido(par[1])) return;
        var col = el("div", "case__coluna");
        col.appendChild(el("p", "rotulo", par[0]));
        col.appendChild(el("p", "", par[1]));
        ad.appendChild(col);
      });
      if (ad.children.length) corpo.appendChild(ad);

      if (preenchido(cs.resultado)) corpo.appendChild(el("p", "case__resultado", cs.resultado));

      if (preenchido(cs.link)) {
        var a = el("a", "botao botao--contorno");
        a.href = cs.link;
        a.target = "_blank";
        a.rel = "noopener";
        a.innerHTML = "Ver ao vivo" + svg("externo");
        corpo.appendChild(a);
      }
      bloco.appendChild(corpo);
      caixa.appendChild(bloco);
    });
  }

  // Só troca o placeholder pelo print se a imagem existir de fato.
  function carregarPrint(src, tela, alt, prioridade) {
    if (!preenchido(src)) return;
    var img = new Image();
    img.decoding = "async";
    img.loading = prioridade ? "eager" : "lazy";
    img.alt = alt;
    img.width = 390;
    img.height = 844;
    img.className = "celular__print celular__print--carregando";
    img.onload = function () {
      Array.prototype.slice.call(tela.children).forEach(function (f) { if (f !== img) f.remove(); });
      img.classList.remove("celular__print--carregando");
    };
    img.onerror = function () { img.remove(); };
    img.src = src;
    tela.appendChild(img);
  }

  /* ---------- Perguntas frequentes ---------- */

  function montarFaq() {
    var caixa = document.querySelector("[data-faq]");
    (C.faq || []).forEach(function (f) {
      var d = el("details", "faq__item aparecer");
      var s = el("summary");
      s.appendChild(el("span", "", f.pergunta));
      s.insertAdjacentHTML("beforeend", svg("mais"));
      d.appendChild(s);
      var r = el("div", "faq__resposta");
      if (preenchido(f.resposta)) {
        r.appendChild(el("p", "", f.resposta));
      } else {
        var p = el("p");
        p.append("Depende do seu projeto. ");
        var a = el("a", "", "Chama no WhatsApp");
        a.href = linkWhats("Oi, Myllena! Tenho uma dúvida: " + f.pergunta);
        a.target = "_blank";
        a.rel = "noopener";
        a.setAttribute("data-wa-pronto", "");
        p.appendChild(a);
        p.append(" que a gente explica direitinho.");
        r.appendChild(p);
      }
      d.appendChild(r);
      caixa.appendChild(d);
    });
  }

  /* ---------- Links do WhatsApp ---------- */

  function montarLinks() {
    document.querySelectorAll("a[data-wa]").forEach(function (a) {
      a.href = linkWhats(a.getAttribute("data-wa-msg") || C.whatsappMsg);
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  /* ---------- Aparecer ao rolar ---------- */

  var observador = null;
  function observarReveal(lista) {
    if (reduzMovimento || !("IntersectionObserver" in window)) {
      lista.forEach(function (e) { e.classList.add("visivel"); });
      return;
    }
    if (!observador) {
      observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (en) {
          if (en.isIntersecting) {
            var alvo = en.target;
            alvo.classList.add("visivel");
            observador.unobserve(alvo);
            setTimeout(function () { alvo.style.transitionDelay = ""; }, 1300);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    }
    lista.forEach(function (e) {
      // Atraso em cascata entre irmãos.
      var irmaos = e.parentElement ? Array.prototype.filter.call(e.parentElement.children, function (x) { return x.classList.contains("aparecer"); }) : [];
      var i = irmaos.indexOf(e);
      if (i > 0) e.style.transitionDelay = Math.min(i * 70, 350) + "ms";
      observador.observe(e);
    });
  }

  /* ---------- Parallax suave ---------- */

  function iniciarParallax() {
    if (reduzMovimento) return;
    var itens = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
    if (!itens.length) return;
    var pedido = false;
    function quadro() {
      pedido = false;
      var meio = window.innerHeight / 2;
      itens.forEach(function (e) {
        var r = e.getBoundingClientRect();
        if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
        var fator = parseFloat(e.getAttribute("data-parallax")) || 0;
        var centro = r.top + r.height / 2 - (parseFloat(e.style.getPropertyValue("--py")) || 0);
        e.style.setProperty("--py", ((meio - centro) * fator).toFixed(1) + "px");
      });
    }
    window.addEventListener("scroll", function () {
      if (!pedido) { pedido = true; requestAnimationFrame(quadro); }
    }, { passive: true });
    quadro();
  }

  /* ---------- Botão fixo do WhatsApp (a partir da segunda seção) ---------- */

  function iniciarFlutuante() {
    var botao = document.querySelector("[data-flutuante]");
    var hero = document.getElementById("hero");
    var fecho = document.getElementById("fechamento");
    if (!("IntersectionObserver" in window)) { botao.classList.add("flutuante--visivel"); return; }
    var heroVisivel = true, fechoVisivel = false;
    function aplicar() { botao.classList.toggle("flutuante--visivel", !heroVisivel && !fechoVisivel); }
    new IntersectionObserver(function (e) { heroVisivel = e[0].isIntersecting; aplicar(); }).observe(hero);
    new IntersectionObserver(function (e) { fechoVisivel = e[0].isIntersecting; aplicar(); }, { threshold: 0.3 }).observe(fecho);
  }

  /* ---------- PWA ---------- */

  function iniciarPwa() {
    if ("serviceWorker" in navigator && location.protocol !== "file:") {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("sw.js").catch(function () { /* segue sem offline */ });
      });
    }

    var instalado = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
    if (instalado) return;

    var botoes = document.querySelectorAll("[data-instalar]");
    var dica = document.querySelector("[data-dica-ios]");
    var ua = navigator.userAgent;
    var ios = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    var pedido = null;

    if (ios) {
      botoes.forEach(function (b) {
        b.hidden = false;
        b.setAttribute("aria-expanded", "false");
        b.addEventListener("click", function () {
          dica.hidden = !dica.hidden;
          b.setAttribute("aria-expanded", String(!dica.hidden));
        });
      });
      return;
    }

    window.addEventListener("beforeinstallprompt", function (ev) {
      ev.preventDefault();
      pedido = ev;
      botoes.forEach(function (b) { b.hidden = false; });
    });
    botoes.forEach(function (b) {
      b.addEventListener("click", function () {
        if (!pedido) return;
        pedido.prompt();
        pedido.userChoice.finally(function () {
          pedido = null;
          botoes.forEach(function (x) { x.hidden = true; });
        });
      });
    });
    window.addEventListener("appinstalled", function () {
      botoes.forEach(function (x) { x.hidden = true; });
    });
  }

  /* ---------- Simulação: vira app ---------- */

  function iniciarSimulacao() {
    var fig = document.querySelector("[data-simulacao]");
    if (!fig) return;
    var legenda = document.querySelector("[data-legenda]");
    var passos = document.querySelectorAll("[data-passos] li");
    var etapas = [
      { tempo: 2800, passo: 0, texto: "Abre o link no celular" },
      { tempo: 1900, passo: 1, texto: "Adiciona à Tela de Início" },
      { tempo: 1500, passo: 2, texto: "Toca no ícone, como qualquer app" },
      { tempo: 1300, passo: 3, texto: "Abre como app" },
      { tempo: 3000, passo: 3, texto: "Tela cheia, até com a digital" }
    ];
    var atual = 0, timer = null;

    function mostrar(n) {
      atual = n;
      fig.setAttribute("data-etapa", n);
      legenda.textContent = etapas[n].texto;
      passos.forEach(function (li) { li.classList.toggle("ativo", Number(li.getAttribute("data-passo")) === etapas[n].passo); });
    }
    function proxima() {
      timer = setTimeout(function () { mostrar((atual + 1) % etapas.length); proxima(); }, etapas[atual].tempo);
    }

    if (reduzMovimento || !("IntersectionObserver" in window)) { mostrar(2); return; }
    mostrar(0);
    new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { if (!timer) proxima(); }
      else { clearTimeout(timer); timer = null; }
    }, { threshold: 0.35 }).observe(fig);
  }

  /* ---------- Início ---------- */

  function iniciar() {
    desenharIcones();
    montarTextos();
    montarPacotes();
    montarCases();
    montarFaq();
    montarLinks();

    // Hero: o print do case 1 entra no lugar da tela desenhada, se existir.
    var c1 = (C.cases || [])[0];
    if (c1) carregarPrint(c1.imagem, document.querySelector("[data-hero-tela]"), "Print do catálogo " + (preenchido(c1.nome) ? c1.nome : ""), true);

    observarReveal(document.querySelectorAll(".aparecer:not(.visivel)"));
    iniciarParallax();
    iniciarFlutuante();
    iniciarSimulacao();
    iniciarPwa();
    raiz.classList.add("pronto");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
