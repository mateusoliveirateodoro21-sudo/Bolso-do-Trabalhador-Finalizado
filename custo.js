/* Quanto do seu trabalho custa isso? — JS puro, sem bibliotecas. */
/* ===== EDITE AQUI: exemplos prontos (preços aproximados, em reais) ===== */
var EXEMPLOS = [
  {id:"celular", e:"📱", n:"Celular", p:1800},
  {id:"geladeira", e:"🧊", n:"Geladeira", p:3500},
  {id:"cesta", e:"🧺", n:"Cesta básica", p:800},
  {id:"gasolina", e:"⛽", n:"Gasolina do mês", p:450},
  {id:"aluguel", e:"🏠", n:"Aluguel", p:1500},
  {id:"iphone", e:"🍎", n:"iPhone", p:7000},
  {id:"passagem", e:"✈️", n:"Passagem de avião", p:1200},
  {id:"tv", e:"📺", n:"TV", p:2500},
  {id:"pizza", e:"🍕", n:"Pizza", p:60},
  {id:"mercado", e:"🛒", n:"Compras do mês", p:1200}
];
/* ===== Jornadas: horas por semana, divisor mensal, horas por dia de trabalho ===== */
var JORNADAS = {
  "44": {nome:"44 horas semanais", div:220, dia:8.8},
  "40": {nome:"40 horas semanais", div:200, dia:8},
  "36": {nome:"36 horas semanais", div:180, dia:7.2},
  "30": {nome:"30 horas semanais", div:150, dia:6},
  "12x36": {nome:"12x36", div:180, dia:12}
};
var URL_SITE = "https://bolsodotrabalhador.com.br/quanto-do-seu-trabalho-custa.html";
var CHAVE = "bt_custo";
(function(){
"use strict";
var F = new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"});
var N1 = new Intl.NumberFormat("pt-BR",{maximumFractionDigits:1});
function $(i){return document.getElementById(i)}
function num(s){
  s = String(s||"").trim().replace(/[^\d.,]/g,"");
  if(s.indexOf(",")>-1) s = s.replace(/\./g,"").replace(",",".");
  else if(/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g,"");
  var n = parseFloat(s); return isFinite(n)&&n>0 ? n : 0;
}
/* Tabelas 2026 — mesma lógica da calculadora de salário líquido do site */
function inss(b){var t=[[1621,.075],[2902.84,.09],[4354.27,.12],[8475.55,.14]],p=0,r=0;t.forEach(function(x){var u=Math.min(b,x[0]);if(u>p)r+=(u-p)*x[1];p=x[0]});return r}
function irrf(rend,base){var a=0,d=0;if(base>4664.68){a=.275;d=908.73}else if(base>3751.05){a=.225;d=675.49}else if(base>2826.65){a=.15;d=394.16}else if(base>2428.8){a=.075;d=182.16}
var t=Math.max(0,base*a-d),r=0;if(rend<=5000)r=Math.min(312.89,t);else if(rend<=7350)r=Math.min(t,Math.max(0,978.62-.133145*rend));return Math.max(0,t-r)}
function liquido(b,dep){var i=inss(b),base=Math.max(0,b-Math.max(i+dep*189.59,607.2));return b-i-irrf(b,base)}

var produtos = [];
var ultimo = {nome:"", preco:0};

function perfil(){
  var s = num($("ct-sal").value), tipo = $("ct-tipo").value, j = JORNADAS[$("ct-jor").value] || JORNADAS["44"];
  var dep = Math.max(0, Math.floor(num($("ct-dep").value)));
  var liq = tipo==="bruto" ? liquido(s,dep) : s;
  if(!s) return null;
  return {sal:s, tipo:tipo, liq:liq, hora:liq/j.div, div:j.div, dia:j.dia, j:j, plantao:$("ct-jor").value==="12x36"};
}
function fh(h){
  if(h<1/60) return "menos de 1 minuto";
  var t = Math.round(h*60), hh = Math.floor(t/60), mm = t%60;
  if(hh===0) return mm+" min";
  return hh+(hh===1?" hora":" horas")+(mm?" e "+mm+" min":"");
}
function horasTxt(h){ return h>=1 ? N1.format(Math.round(h*10)/10)+(Math.round(h*10)/10===1?" hora":" horas") : fh(h); }
function diasTxt(d,pl){
  var x = Math.round(d*10)/10, u = pl ? (x===1?"plantão":"plantões") : (x===1?"dia":"dias");
  return N1.format(x)+" "+u+" de trabalho";
}
function comparacao(p, preco){
  var h = preco/p.hora, d = h/p.dia;
  if(p.plantao){
    if(d<=1) return "É menos de um plantão de 12 horas só para pagar isso.";
    return "É como fazer "+N1.format(Math.round(d*10)/10)+" plantões de 12 horas só para pagar isso.";
  }
  var semanas = d/5, meses = preco/p.liq;
  if(d<=0.05) return "Isso é só alguns minutos do seu expediente.";
  if(d<=1) return "É como trabalhar "+fh(h)+" do seu dia só para pagar isso.";
  if(d<=5){
    var n = Math.ceil(d-1e-9), dias=["segunda","terça","quarta","quinta","sexta"];
    if(n===1) return "É como trabalhar a segunda-feira inteira só para pagar isso.";
    if(n===5) return "É como trabalhar a semana inteira, de segunda a sexta, só para pagar isso.";
    return "É como trabalhar de segunda a "+dias[n-1]+" só para pagar isso.";
  }
  if(meses<1) return "É como trabalhar "+N1.format(Math.round(semanas*10)/10)+" semanas só para pagar isso.";
  return "É como trabalhar "+N1.format(Math.round(meses*10)/10)+(Math.round(meses*10)/10===1?" mês":" meses")+" de salário só para pagar isso.";
}
function semana(d,pl){
  var el=$("ct-sem"); if(pl){el.innerHTML="";el.hidden=true;return}
  el.hidden=false;
  var nomes=["Seg","Ter","Qua","Qui","Sex"], h="", rest=d;
  for(var i=0;i<5;i++){var f=Math.max(0,Math.min(1,rest));rest-=1;h+='<span class="ct-dia"><i style="height:'+Math.round(f*100)+'%"></i><b>'+nomes[i]+'</b></span>'}
  if(d>5) h+='<span class="ct-mais">+ '+N1.format(Math.round((d-5)*10)/10)+' dias</span>';
  el.innerHTML=h;
}
function msg(t,ok){var e=$("ct-erro");e.textContent=t||"";e.className="err"+(ok?" ok":"")}

function calcular(){
  var p = perfil(), preco = num($("ct-preco").value);
  if(!p){msg("Informe o seu salário para calcular.");return}
  if(!preco){msg("Informe o preço do produto ou clique num dos exemplos.");return}
  msg("");
  var h = preco/p.hora, d = h/p.dia, pctMes = Math.min(100, h/p.div*100);
  ultimo = {nome:($("ct-nome").value||"").trim()||"Esse produto", preco:preco, h:h, d:d};
  $("ct-r-tit").textContent = ultimo.nome+" · "+F.format(preco);
  $("ct-r-h").textContent = horasTxt(h);
  $("ct-r-d").textContent = diasTxt(d,p.plantao);
  $("ct-r-cmp").textContent = comparacao(p,preco);
  $("ct-r-hora").textContent = F.format(p.hora);
  $("ct-r-pct").textContent = N1.format(Math.round(h/p.div*1000)/10)+"% das "+p.div+" horas do seu mês";
  $("ct-bar").style.width = pctMes+"%";
  semana(d,p.plantao);
  $("ct-resultado").hidden = false;
  $("ct-resultado").scrollIntoView({behavior:window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"nearest"});
  $("ct-sr").textContent = "Isso custa "+horasTxt(h)+", ou "+diasTxt(d,p.plantao)+".";
  resumoPerfil(p);
  salvar();
}
function resumoPerfil(p){
  var t = "Valor da sua hora: "+F.format(p.hora)+" (salário "+(p.tipo==="bruto"?"líquido estimado ":"líquido ")+F.format(p.liq)+" ÷ "+p.div+" horas por mês)";
  $("ct-hora").textContent = p ? t : "";
  $("ct-estim").hidden = !(p && p.tipo==="bruto");
}
function atualizaPerfil(){
  var p = perfil();
  $("ct-dep-box").hidden = $("ct-tipo").value!=="bruto";
  if(p) resumoPerfil(p); else {$("ct-hora").textContent="";$("ct-estim").hidden=true}
  var cu = $("ct-jor").value==="12x36";
  $("ct-j-info").textContent = cu ? "12x36: cerca de 15 plantões de 12 horas por mês, ou 180 horas trabalhadas." :
    "Divisor mensal: "+(JORNADAS[$("ct-jor").value]||{}).div+" horas"+($("ct-jor").value==="44"?" (o divisor da CLT para 44 horas semanais).":" (estimativa proporcional).");
}
function addProduto(){
  var p = perfil(), preco = num($("ct-preco").value);
  if(!p){msg("Informe o seu salário primeiro.");return}
  if(!preco){msg("Informe o preço antes de adicionar à lista.");return}
  if(produtos.length>=30){msg("A lista chegou ao limite de 30 itens.");return}
  produtos.push({nome:($("ct-nome").value||"").trim()||"Produto "+(produtos.length+1), preco:preco});
  msg("Item adicionado à lista.",true);
  listar();
}
function listar(){
  var p = perfil(), box=$("ct-lista-box"), ul=$("ct-lista");
  box.hidden = produtos.length===0; ul.innerHTML="";
  if(!produtos.length||!p) return;
  var tot=0;
  produtos.forEach(function(x,i){
    tot+=x.preco;
    var li=document.createElement("li"),a=document.createElement("span"),b=document.createElement("span"),bt=document.createElement("button");
    a.textContent=x.nome+" · "+F.format(x.preco); b.textContent=horasTxt(x.preco/p.hora);
    bt.type="button";bt.textContent="×";bt.setAttribute("aria-label","Remover "+x.nome);bt.setAttribute("data-rm",i);
    li.appendChild(a);li.appendChild(b);li.appendChild(bt);ul.appendChild(li);
  });
  var h=tot/p.hora,d=h/p.dia;
  $("ct-t-valor").textContent=F.format(tot);
  $("ct-t-h").textContent=horasTxt(h);
  $("ct-t-d").textContent=diasTxt(d,p.plantao);
  $("ct-t-pct").textContent=N1.format(Math.round(tot/p.liq*1000)/10)+"% do seu salário líquido"+(p.tipo==="bruto"?" estimado":"");
}
function salvar(){
  try{ localStorage.setItem(CHAVE, JSON.stringify({sal:$("ct-sal").value,tipo:$("ct-tipo").value,jor:$("ct-jor").value,dep:$("ct-dep").value})) }catch(e){}
}
function carregar(){
  try{
    var s = localStorage.getItem(CHAVE); if(!s) return;
    var o = JSON.parse(s); if(!o||typeof o!=="object") return;
    if(o.sal) $("ct-sal").value = String(o.sal).slice(0,14);
    if(o.tipo==="bruto"||o.tipo==="liquido") $("ct-tipo").value=o.tipo;
    if(JORNADAS[o.jor]) $("ct-jor").value=o.jor;
    if(o.dep) $("ct-dep").value=String(o.dep).slice(0,2);
    $("ct-salvo").hidden=false;
  }catch(e){}
}
function apagar(){
  try{ localStorage.removeItem(CHAVE) }catch(e){}
  $("ct-sal").value="";$("ct-dep").value="0";$("ct-tipo").value="liquido";$("ct-jor").value="44";
  produtos=[];listar();$("ct-resultado").hidden=true;$("ct-salvo").hidden=true;
  atualizaPerfil();msg("Dados apagados deste navegador.",true);
}
function zap(){
  if(!ultimo.h) return;
  var t = "⏰ Descobri quanto do meu trabalho custa isso!\n"+
    "🛒 "+ultimo.nome+" ("+F.format(ultimo.preco)+") = "+horasTxt(ultimo.h)+" de trabalho"+(ultimo.d>=1?" (~"+N1.format(Math.round(ultimo.d*10)/10)+" dias)":"")+" 😅\n"+
    "👉 Calcule o seu: "+URL_SITE;
  window.open("https://wa.me/?text="+encodeURIComponent(t),"_blank","noopener");
}
function zapLista(){
  var p=perfil(); if(!p||!produtos.length) return;
  var tot=0; produtos.forEach(function(x){tot+=x.preco});
  var h=tot/p.hora,d=h/p.dia;
  var t="📋 Minhas contas custam "+horasTxt(h)+" de trabalho (~"+N1.format(Math.round(d*10)/10)+" dias) 😮\n"+
    "👉 Calcule o seu: "+URL_SITE;
  window.open("https://wa.me/?text="+encodeURIComponent(t),"_blank","noopener");
}
function montaExemplos(){
  var box=$("ct-ex");
  EXEMPLOS.forEach(function(x){
    var b=document.createElement("button");b.type="button";b.className="ct-ex";b.setAttribute("data-ex",x.id);
    b.innerHTML='<span aria-hidden="true">'+x.e+'</span> '+x.n; box.appendChild(b);
  });
}
document.addEventListener("click",function(e){
  var t=e.target.closest("button"); if(!t) return;
  if(t.hasAttribute("data-ex")){
    var x=EXEMPLOS.filter(function(q){return q.id===t.getAttribute("data-ex")})[0];
    if(x){$("ct-nome").value=x.n;$("ct-preco").value=String(x.p).replace(".",",");
      Array.prototype.forEach.call(document.querySelectorAll(".ct-ex"),function(b){b.setAttribute("aria-pressed",b===t?"true":"false")});
      if(perfil()) calcular(); else msg("Agora informe o seu salário acima para ver o resultado.")}
  } else if(t.hasAttribute("data-rm")){produtos.splice(+t.getAttribute("data-rm"),1);listar()}
  else if(t.id==="ct-calc") calcular();
  else if(t.id==="ct-add") addProduto();
  else if(t.id==="ct-apagar") apagar();
  else if(t.id==="ct-zap") zap();
  else if(t.id==="ct-zap2") zapLista();
  else if(t.id==="ct-limpa"){produtos=[];listar()}
});
["ct-sal","ct-tipo","ct-jor","ct-dep"].forEach(function(i){$(i).addEventListener("input",function(){atualizaPerfil();listar();salvar()});$(i).addEventListener("change",function(){atualizaPerfil();listar();salvar()})});
$("ct-form").addEventListener("submit",function(e){e.preventDefault();calcular()});
montaExemplos();carregar();atualizaPerfil();
/* para testes */
window.__custo={liquido:liquido,num:num};
})();
