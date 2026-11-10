/* =====================================================================
   GASTE O PRÊMIO DA MEGA DA VIRADA — configuração (edite só esta parte)
   ===================================================================== */

// 1) VALOR ESTIMADO DO PRÊMIO, em reais, só números (sem ponto, vírgula ou R$).
//    Exemplo: const PREMIO = 100000000;   (cem milhões)
//    Use o valor estimado divulgado pela Caixa. Se deixar 0, a própria pessoa digita o valor.
const PREMIO = 0;

// 2) De onde veio o valor (aparece na tela). Exemplo: "estimativa divulgada pela Caixa em 10/11/2026"
const PREMIO_FONTE = "";

// 3) LINKS DE AFILIADO DA AMAZON (SiteStripe → "Texto"). Deixe "" para não mostrar o link.
const AMAZON = {
  celular: "https://link.amazon/B08LNfVVI",
  notebook: "https://link.amazon/B0212eEas",
  tv: "https://link.amazon/B0aHeiJgw",
  livros: ""
};

// 4) ITENS (id único, emoji, nome, preço APROXIMADO em reais, e opcionalmente amz = chave do AMAZON).
//    Pode trocar preços, nomes e emojis, ou apagar e incluir linhas.
const ITENS = [
  { id: "bala",     e: "🍬", n: "Bala de goma (1 pacote)",              p: 1 },
  { id: "pastel",   e: "🥟", n: "Pastel de feira com caldo de cana",    p: 15 },
  { id: "pizza",    e: "🍕", n: "Pizza todo dia por 10 anos",           p: 219000 },
  { id: "picanha",  e: "🥩", n: "Picanha por 1 ano",                    p: 9000 },
  { id: "churrasco",e: "🔥", n: "Churrasco para o bairro inteiro",      p: 8000 },
  { id: "celular",  e: "📱", n: "Celular top de linha",                 p: 8000, amz: "celular" },
  { id: "tv", e: "📺", n: "TV grande para a sala",                 p: 3000, amz: "tv" },
  { id: "notebook", e: "💻", n: "Notebook para trabalhar",              p: 5000, amz: "notebook" },
  { id: "livros",   e: "📚", n: "Biblioteca com 500 livros",            p: 25000, amz: "livros" },
  { id: "dividas",  e: "🧾", n: "Quitar as dívidas da família",         p: 15000 },
  { id: "moto",     e: "🏍️", n: "Moto 0 km",                            p: 18000 },
  { id: "popular",  e: "🚗", n: "Carro popular",                        p: 80000 },
  { id: "luxo",     e: "🏎️", n: "Carro de luxo",                        p: 800000 },
  { id: "viagem",   e: "✈️", n: "Viagem de 15 dias ao exterior (casal)",p: 40000 },
  { id: "carnaval", e: "🎭", n: "Camarote no Carnaval",                 p: 30000 },
  { id: "faculdade",e: "🎓", n: "Faculdade particular (4 anos)",        p: 120000 },
  { id: "negocio",  e: "🏪", n: "Abrir um negócio",                     p: 150000 },
  { id: "caridade", e: "❤️", n: "Doação para caridade",                 p: 100000 },
  { id: "apto",     e: "🏢", n: "Apartamento de 2 quartos",             p: 500000 },
  { id: "praia",    e: "🏖️", n: "Casa na praia",                        p: 1500000 },
  { id: "salario",  e: "💵", n: "Salário mínimo por 50 anos (R$ 1.621 × 13 × 50)", p: 1053650 },
  { id: "iate",     e: "🛥️", n: "Iate",                                 p: 3000000 },
  { id: "ilha",     e: "🏝️", n: "Ilha particular",                      p: 20000000 },
  { id: "jato",     e: "🛩️", n: "Jatinho executivo",                    p: 50000000 }
];

/* =====================================================================
   FIM DA CONFIGURAÇÃO — o código abaixo não precisa ser editado
   ===================================================================== */
(function () {
  var URL_SITE = "https://bolsodotrabalhador.com.br/gaste-a-mega-da-virada.html";
  var $ = function (id) { return document.getElementById(id); };
  var BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  var NUM = new Intl.NumberFormat("pt-BR");
  var reduz = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var premio = PREMIO > 0 ? Math.round(PREMIO) : 0;
  var qtd = {}, shown = 0, raf = 0;
  ITENS.forEach(function (it) { qtd[it.id] = 0; });

  function gasto() { return ITENS.reduce(function (t, it) { return t + it.p * qtd[it.id]; }, 0); }
  function saldo() { return premio - gasto(); }
  function el(tag, cls, txt) { var x = document.createElement(tag); if (cls) x.className = cls; if (txt != null) x.textContent = txt; return x; }

  function buildGrid() {
    var g = $("mg-itens"); g.textContent = "";
    ITENS.forEach(function (it) {
      var c = el("article", "mg-card"); c.id = "it-" + it.id;
      c.appendChild(el("div", "mg-e", it.e)).setAttribute("aria-hidden", "true");
      c.appendChild(el("h3", "", it.n));
      c.appendChild(el("p", "mg-p", "≈ " + BRL.format(it.p)));
      var q = el("div", "mg-q");
      var m = el("button", "", "−"); m.type = "button"; m.setAttribute("aria-label", "Diminuir " + it.n); m.dataset.a = "-"; m.dataset.id = it.id;
      var i = el("input"); i.type = "number"; i.min = "0"; i.value = "0"; i.inputMode = "numeric"; i.setAttribute("aria-label", "Quantidade: " + it.n); i.dataset.id = it.id;
      var p = el("button", "", "+"); p.type = "button"; p.setAttribute("aria-label", "Aumentar " + it.n); p.dataset.a = "+"; p.dataset.id = it.id;
      q.appendChild(m); q.appendChild(i); q.appendChild(p); c.appendChild(q);
      var link = it.amz && AMAZON[it.amz];
      if (link) {
        var a = el("a", "mg-amz", "Ver na Amazon"); a.href = link; a.target = "_blank"; a.rel = "sponsored noopener";
        c.appendChild(a);
        c.appendChild(el("span", "mg-aff", "link de afiliado"));
      }
      g.appendChild(c);
    });
  }

  function maxMais(it) { return Math.floor(saldo() / it.p); }

  function setQ(id, n) {
    var it = ITENS.filter(function (x) { return x.id === id; })[0];
    n = Math.max(0, Math.floor(n) || 0);
    var limite = qtd[id] + maxMais(it);
    qtd[id] = Math.min(n, limite);
    refresh();
  }

  function anima(alvo) {
    if (raf) cancelAnimationFrame(raf);
    var de = shown, t0 = null, dur = reduz ? 0 : 450;
    function passo(t) {
      if (t0 === null) t0 = t;
      var k = dur ? Math.min(1, (t - t0) / dur) : 1;
      shown = de + (alvo - de) * (1 - Math.pow(1 - k, 3));
      $("mg-saldo").textContent = BRL.format(Math.round(shown));
      if (k < 1) raf = requestAnimationFrame(passo); else { raf = 0; shown = alvo; $("mg-saldo").textContent = BRL.format(alvo); }
    }
    raf = requestAnimationFrame(passo);
  }

  function frase(pct, sobra) {
    if (sobra === 0) return "Zerou! Você gastou tudo e ainda sobrou estilo. Agora volta para a vida real 😄";
    if (pct === 0) return "Você ainda não gastou nada. Dinheiro parado… e a inflação agradece 😅";
    if (pct < 25) return "Começou devagar. O resto vai render uns bons churrascos 🍖";
    if (pct < 50) return "Gastou com juízo, mas ainda tem muito saldo para sonhar 💭";
    if (pct < 75) return "Já passou da metade! O gerente do banco está sorrindo 😎";
    if (pct < 100) return "Quase lá! Falta pouco para você chegar ao zero 🏁";
    return "Zerou!";
  }

  function refresh() {
    var s = saldo(), g = gasto(), pct = premio ? Math.min(100, (g / premio) * 100) : 0, n = 0;
    anima(s);
    $("mg-sr").textContent = "Saldo restante: " + BRL.format(s);
    $("mg-bar").style.width = pct.toFixed(2) + "%";
    $("mg-pct").textContent = pct.toFixed(pct < 10 && pct > 0 ? 2 : 0).replace(".", ",") + "% gasto";
    ITENS.forEach(function (it) {
      var c = $("it-" + it.id), q = qtd[it.id]; n += q;
      c.querySelector("input").value = q;
      c.querySelector("[data-a='-']").disabled = q <= 0;
      c.querySelector("[data-a='+']").disabled = it.p > s;
      c.classList.toggle("on", q > 0);
    });
    $("mg-n").textContent = NUM.format(n) + (n === 1 ? " item" : " itens");
    // recibo
    var ul = $("mg-lista"); ul.textContent = "";
    ITENS.forEach(function (it) {
      if (qtd[it.id] > 0) {
        var li = el("li"); li.appendChild(el("span", "", NUM.format(qtd[it.id]) + "× " + it.e + " " + it.n));
        li.appendChild(el("b", "", BRL.format(it.p * qtd[it.id]))); ul.appendChild(li);
      }
    });
    $("mg-vazio").hidden = n > 0;
    $("mg-r-gasto").textContent = BRL.format(g);
    $("mg-r-sobra").textContent = BRL.format(s);
    $("mg-r-frase").textContent = frase(pct, s);
    $("mg-troco").disabled = s < 1;
    $("mg-zap").dataset.n = n;
  }

  function zap() {
    var g = gasto(), s = saldo(), n = 0, top = [];
    ITENS.forEach(function (it) { if (qtd[it.id] > 0) { n += qtd[it.id]; top.push({ it: it, v: it.p * qtd[it.id] }); } });
    top.sort(function (a, b) { return b.v - a.v; });
    var linhas = top.slice(0, 3).map(function (x) { return x.it.e + " " + NUM.format(qtd[x.it.id]) + "× " + x.it.n; }).join("\n");
    var txt = "🎰 Gastei " + BRL.format(g) + " do prêmio (estimado) da Mega da Virada!\n" +
      (linhas ? linhas + "\n" : "") + (s === 0 ? "💸 Zerei o saldo!\n" : "💰 Sobraram " + BRL.format(s) + "\n") +
      "Jogo de brincadeira. Tente você 👉 " + URL_SITE;
    window.open("https://wa.me/?text=" + encodeURIComponent(txt), "_blank", "noopener");
  }

  function rendimentos() {
    var t = $("mg-rend-body"); t.textContent = "";
    [0.5, 0.8, 1].forEach(function (taxa) {
      var tr = el("tr"); tr.appendChild(el("td", "", String(taxa).replace(".", ",") + "% ao mês"));
      var td = el("td", "", BRL.format(Math.round(premio * taxa / 100))); tr.appendChild(td); t.appendChild(tr);
    });
    var custom = parseFloat(($("mg-taxa").value || "").replace(",", "."));
    $("mg-rend-custom").textContent = isFinite(custom) && custom >= 0 ? BRL.format(Math.round(premio * custom / 100)) + " por mês" : "—";
  }

  function iniciar(v) {
    premio = Math.round(v); shown = premio;
    $("mg-setup").hidden = true; $("mg-jogo").hidden = false; $("mg-edu").hidden = false;
    $("mg-premio").textContent = BRL.format(premio);
    $("mg-fonte").textContent = PREMIO_FONTE ? "Valor estimado (" + PREMIO_FONTE + ")" : "Valor estimado do prêmio";
    $("mg-saldo").textContent = BRL.format(premio);
    buildGrid(); rendimentos(); refresh();
    ajustaTopo();
  }

  function ajustaTopo() {
    var h = document.querySelector("header");
    document.documentElement.style.setProperty("--hh", (h ? h.offsetHeight : 62) + "px");
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("button[data-a]");
    if (!b) return;
    var id = b.dataset.id; setQ(id, qtd[id] + (b.dataset.a === "+" ? 1 : -1));
  });
  document.addEventListener("change", function (e) {
    var i = e.target;
    if (i && i.matches && i.matches("#mg-itens input")) setQ(i.dataset.id, parseFloat(i.value));
  });
  window.addEventListener("resize", ajustaTopo);
  $("mg-comecar").addEventListener("click", function () {
    var v = parseFloat($("mg-valor").value);
    if (!(v > 0)) { $("mg-erro").textContent = "Digite um valor maior que zero."; return; }
    $("mg-erro").textContent = ""; iniciar(v);
  });
  $("mg-reset").addEventListener("click", function () { ITENS.forEach(function (it) { qtd[it.id] = 0; }); refresh(); window.scrollTo({ top: 0, behavior: reduz ? "auto" : "smooth" }); });
  $("mg-reset2").addEventListener("click", function () { $("mg-reset").click(); });
  $("mg-recibo-btn").addEventListener("click", function () { $("recibo").scrollIntoView({ behavior: reduz ? "auto" : "smooth" }); });
  $("mg-zap").addEventListener("click", zap);
  $("mg-troco").addEventListener("click", function () { setQ("bala", qtd["bala"] + Math.floor(saldo())); });
  $("mg-taxa").addEventListener("input", rendimentos);

  if (premio > 0) iniciar(premio);
  else { $("mg-setup").hidden = false; }
})();
