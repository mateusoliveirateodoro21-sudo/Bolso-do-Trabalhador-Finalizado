(function(){
var F=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"});
function v(i){var e=document.getElementById(i);return e?parseFloat(e.value)||0:0}
function inss(b){var t=[[1621,.075],[2902.84,.09],[4354.27,.12],[8475.55,.14]],p=0,r=0;t.forEach(function(x){var u=Math.min(b,x[0]);if(u>p)r+=(u-p)*x[1];p=x[0]});return r}
function irrf(rend,base){var a=0,d=0;if(base>4664.68){a=.275;d=908.73}else if(base>3751.05){a=.225;d=675.49}else if(base>2826.65){a=.15;d=394.16}else if(base>2428.8){a=.075;d=182.16}
var t=Math.max(0,base*a-d),r=0;if(rend<=5000)r=Math.min(312.89,t);else if(rend<=7350)r=Math.min(t,Math.max(0,978.62-.133145*rend));return Math.max(0,t-r)}
function liq(b,dep){var i=inss(b),base=Math.max(0,b-Math.max(i+dep*189.59,607.2));return{i:i,ir:irrf(b,base)}}
function pd(i){var p=document.getElementById(i).value.split("-");return new Date(+p[0],p[1]-1,+p[2])}
var C={
noturno:function(){var h=v("sal")/v("div"),n=h*v("pct")/100*v("hn"),e=h*1.5*v("he");return{hora:h,not:n,he:e,tot:n+e}},
escala:function(){var h=v("sal")/v("div"),n=h*v("pct")/100*v("hn")*v("pl"),e=h*1.5*v("he");return{hm:v("pl")*12,hora:h,not:n,he:e,tot:n+e}},
hora:function(){var h=v("sal")/v("div");return{h50:h*1.5,h100:h*2,hora:h}},
ferias:function(){var b=v("sal")+v("med"),fa=v("fal"),D=fa<=5?30:fa<=14?24:fa<=23?18:fa<=32?12:0,sd=v("vend")==1?Math.floor(D/3):0,mx=D-sd,dd=Math.min(Math.max(0,Math.round(v("dias"))),mx);if(!dd)dd=mx;var f=b/30*dd,t=f/3,a=b/30*sd,ta=a/3,c=v("ad13")==1&&D?b/2:0,l=liq(f+t,v("dep")),pz="",e=document.getElementById("ini");if(e&&e.value){var q=pd("ini");q.setDate(q.getDate()-2);pz="até "+q.toLocaleDateString("pt-BR")}var sa=Math.floor(D/3),g=function(r,k){var x=b/30*r,y=b/30*k*4/3,z=liq(x*4/3,v("dep"));return x*4/3+y-z.i-z.ir},nv=g(D,0),vd=g(D-sa,sa),sw=b/30*sa,cp={cmp:"",nv:nv,vd:vd,dif:vd-nv,sw:sw,gan:vd-nv+sw};if(!D)return{dir:"Sem direito (mais de 32 faltas)",des:"0 dias",fer:0,terco:0,abono:0,tab:0,a13:0,inss:0,ir:0,prazo:"–",cmp:"",nv:0,ab10:0,vd:0,dif:0,sw:0,gan:0,tot:0};return{dir:fa>5?D+" dias (reduzido pelas faltas)":"",des:dd+" dias"+(sd?" + "+sd+" vendidos":"")+(dd<5?" (mínimo por período: 5)":""),fer:f,terco:t,abono:a,tab:ta,a13:c,inss:l.i,ir:l.ir,prazo:pz,_pb:f+t,_pd:v("dep"),cmp:cp.cmp,nv:nv,ab10:b/30*sa*4/3,vd:vd,dif:vd-nv,sw:sw,gan:vd-nv+sw,tot:f+t+a+ta+c-l.i-l.ir}},
decimo:function(){var b=(v("sal")+v("med"))*Math.min(12,v("m"))/12,i=inss(b),ir=irrf(b,Math.max(0,b-i-v("dep")*189.59)),p=b/2;return{bruto:b,p1:p,inss:i,ir:ir,p2:b-p-i-ir,tot:b-i-ir,_pb:b,_pd:v("dep"),_ps:0}},
liquido:function(){var s=v("sal"),g=s+v("ext"),l=liq(g,v("dep")),t=v("vt")==1?s*.06:0,o=v("out");return{bruto:g,inss:l.i,ir:l.ir,vt:t,out:o,tot:g-l.i-l.ir-t-o,_pb:g,_pd:v("dep")}},
seguro:function(){var m=(v("s1")+v("s2")+v("s3"))/3,p;if(m<=2222.17)p=m*.8;else if(m<=3703.99)p=1777.74+(m-2222.17)*.5;else p=2518.65;p=Math.min(2518.65,Math.max(1621,p));
var sl=v("sol"),mt=Math.floor(v("mt")),n=0;if(sl==1)n=mt>=24?5:mt>=12?4:0;else if(sl==2)n=mt>=24?5:mt>=12?4:mt>=9?3:0;else n=mt>=24?5:mt>=12?4:mt>=6?3:0;
return{ok:n>0?"Sim, pelos meses trabalhados":"Não, faltam meses de trabalho",media:m,parc:p,n:n,tot:p*n}},
media:function(){var n=v("per"),a=[],i,e,l;for(i=1;i<=12;i++){e=document.getElementById("m"+i);l=document.querySelector("label[for=m"+i+"]");e.style.display=l.style.display=i>n?"none":"";if(i<=n)a.push(v("m"+i))}var t=a.reduce(function(x,y){return x+y},0),m=t/n;return{n:n+(n==1?" mês (o mais recente)":" meses (do mais recente para trás)"),soma:t,max:Math.max.apply(null,a),min:Math.min.apply(null,a),ter:m/3,tot:m}},
rescisao:function(){var sal=v("sal"),base=sal+v("med"),a=pd("adm"),d=pd("dem"),tp=v("tp"),av=v("av"),dep=v("dep");
var y=d.getFullYear()-a.getFullYear();if(d<new Date(a.getFullYear()+y,a.getMonth(),a.getDate()))y--;y=Math.max(0,y);
var bd=Math.min(90,30+3*y),pj=0;if(av==1&&tp==1)pj=bd;else if(av==1&&tp==3)pj=bd/2;
var vi=base/30*pj,dd=(tp==2&&av==2)?base:0,pf=new Date(d.getFullYear(),d.getMonth(),d.getDate()+Math.ceil(pj)),n13=0,avf=0;
if(tp!=4){var sm=a.getFullYear()==d.getFullYear()?a.getMonth()+(a.getDate()<=16?0:1):0,e1=d.getFullYear()==pf.getFullYear()?pf.getMonth()+(pf.getDate()>=15?1:0):12;n13=Math.max(0,e1-sm);if(pf.getFullYear()>d.getFullYear())n13+=pf.getMonth()+(pf.getDate()>=15?1:0);
var yy=d.getFullYear()-a.getFullYear(),st=new Date(a.getFullYear()+yy,a.getMonth(),a.getDate());if(st>d){yy--;st=new Date(a.getFullYear()+yy,a.getMonth(),a.getDate())}
var mm=(pf.getFullYear()-st.getFullYear())*12+pf.getMonth()-st.getMonth(),s2=new Date(st.getFullYear(),st.getMonth()+mm,st.getDate());if(s2>pf){mm--;s2=new Date(st.getFullYear(),st.getMonth()+mm,st.getDate())}
if(Math.round((pf-s2)/864e5)+1>=15)mm++;avf=Math.max(0,mm)}
var saldo=sal/30*Math.min(d.getDate(),30),dec=base/12*n13,fer=base/12*avf*4/3+(v("fv")==1?base*4/3:0);
var i1=inss(saldo),i2=inss(dec),ir1=irrf(saldo,Math.max(0,saldo-Math.max(i1+dep*189.59,607.2))),ir2=irrf(dec,Math.max(0,dec-i2-dep*189.59));
var dp=.08*(saldo+dec+vi),pc=tp==1?.4:tp==3?.2:0,sq=tp==1?1:tp==3?.8:0;
return{dias:pj,a13:n13,af:avf,saldo:saldo,avis:vi,dec:dec,fer:fer,desc:dd,inss:i1+i2,ir:ir1+ir2,multa:pc*(v("fgts")+dp),saque:sq*(v("fgts")+dp),tot:saldo+vi+dec+fer-dd-i1-i2-ir1-ir2}},
professor:function(){var b=v("ha")*v("au")*4.5,d=v("tp")==1?b/6:0,a=v("pa")/100*(b+d),c=v("c");return{base:b,dsr:d,hat:a,piso:Math.floor(5130.63/40*c*100+1e-6)/100,sala:c*2/3,ext:c/3,tot:b+d+a}},
bombeiro:function(){var p=v("sal")*v("pp")/100,h=(v("sal")+p)/v("div"),k=v("red")==1?60/52.5:1,n=h*v("pn")/100*v("hn")*v("pl")*k,e=h*1.5*v("he");return{hora:h,peri:p,not:n,he:e,tot:v("sal")+p+n+e}},
policial:function(){var h=v("sal")/v("esc"),k=v("red")==1?60/52.5:1,n=h*v("pn")/100*v("hn")*v("pl")*k,e=h*(1+v("pe")/100)*v("he");return{hm:v("esc"),hora:h,not:n,he:e,tot:n+e}},
enfermagem:function(){var P0=[4750,3325,2375][v("cargo")]||4750,j=v("jor")||44,pp=P0*Math.min(j,44)/44,s=v("sal"),ins=1621*[0,.1,.2,.4][v("ins")],h=s/(j*5),n=h*.2*v("hn"),g=s+ins+n,l=liq(g,v("dep")),df=g-pp;return{piso:P0,pp:pp,sit:df>=-0.005?"Acima do piso ✅":"Abaixo do piso: faltam "+M(-df),ins:ins,not:n,bruto:g,inss:l.i,ir:l.ir,tot:g-l.i-l.ir,_pb:g,_pd:v("dep")}},
servidor:function(){var h=v("base")/v("div"),k=v("red")==1?60/52.5:1,pe=v("pe")/100,pn=v("pn")/100,a=h*(1+pe)*v("hed"),b=h*pn*v("hn")*k,c=h*(1+pe)*(1+pn)*v("hen")*k;return{hora:h,hed:a,adn:b,hen:c,tot:a+b+c}}
};
function share(){var w=document.getElementById("wa");if(!w)return;var h=document.querySelector("h1").textContent.trim(),c=document.querySelector('link[rel=canonical]'),u=(c?c.href:location.href.split(/[?#]/)[0])+"?utm_source=whatsapp&utm_medium=share",t=document.querySelector(".total"),L=["🧮 *"+h+"*",""];
if(t){var tv=t.children[1].textContent.trim();if(tv&&tv!="–")L.push("💰 "+t.children[0].textContent.trim()+": *"+tv+"*")}
var d=document.querySelectorAll("dl dt"),e=document.querySelectorAll("dl dd"),n=0;for(var i=0;i<d.length&&n<4;i++){var x=e[i].textContent.trim();if(!x||x=="–"||/^-?R\$\s?0,00$/.test(x)||e[i].offsetParent===null)continue;L.push("• "+d[i].textContent.trim()+": "+x);n++}
L.push("");L.push("Resultado estimado.");L.push("👉 Faça a sua conta grátis: "+u);
w.href="https://wa.me/?text="+encodeURIComponent(L.join("\n"))}
function M(x){return x.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}
function P(x){return (x*100).toLocaleString("pt-BR",{maximumFractionDigits:1})+"%"}
function passo(b,dep,simp){var t=[[1621,.075],[2902.84,.09],[4354.27,.12],[8475.55,.14]],p=0,tot=0,h='<h4>1. INSS, faixa por faixa</h4><p class="pzn">Cada pedaço do salário paga a alíquota da sua faixa. Base: <b>'+M(b)+'</b></p><div class="pzf">';
t.forEach(function(x,n){var u=Math.min(b,x[0]),q=u>p?(u-p):0,val=q*x[1];tot+=val;h+='<div class="pzr'+(q>0?'':' off')+'"><span>'+(n?'De '+M(p+.01)+' a ':'Até ')+M(x[0])+'</span><span>'+(q>0?M(q)+' × '+P(x[1]):'não chega')+'</span><b>'+M(val)+'</b><i style="width:'+Math.round(q/Math.max(b,1)*100)+'%"></i></div>';p=x[0]});
h+='</div><p class="pzt">INSS total: <b>'+M(tot)+'</b>'+(b>8475.55?' (teto)':'')+'</p>';
var dd=tot+dep*189.59,us=simp&&607.2>dd,de=simp?Math.max(dd,607.2):dd,base=Math.max(0,b-de);
h+='<h4>2. Imposto de renda</h4><p class="pzn">Base: '+M(b)+' − '+(us?'desconto simplificado '+M(607.2):('INSS '+M(tot)+(dep?' − '+dep+' dependente(s) '+M(dep*189.59):'')))+' = <b>'+M(base)+'</b></p>';
var a=0,d=0;if(base>4664.68){a=.275;d=908.73}else if(base>3751.05){a=.225;d=675.49}else if(base>2826.65){a=.15;d=394.16}else if(base>2428.8){a=.075;d=182.16}
var ti=Math.max(0,base*a-d),r=0;if(b<=5000)r=Math.min(312.89,ti);else if(b<=7350)r=Math.min(ti,Math.max(0,978.62-.133145*b));
h+=a?'<p class="pzn">Tabela: '+M(base)+' × '+P(a)+' − '+M(d)+' = <b>'+M(ti)+'</b></p>':'<p class="pzn">Base até '+M(2428.8)+': faixa isenta da tabela.</p>';
if(ti>0)h+='<p class="pzn">Redução da Lei 15.270/2025 '+(b<=5000?'(renda até R$ 5.000)':b<=7350?'(renda entre R$ 5.000 e R$ 7.350)':'(acima de R$ 7.350: sem redução)')+': − <b>'+M(r)+'</b></p>';
h+='<p class="pzt">Imposto de renda: <b>'+M(Math.max(0,ti-r))+'</b></p><p class="pzs">Tabelas de 2026. Veja todas as fórmulas em <a href="como-calculamos.html">como calculamos</a>.</p>';return h}
function pzr(r){var z=document.getElementById("passo");if(!z)return;if(r._pb===undefined){z.hidden=true;return}z.hidden=false;document.getElementById("pzc").innerHTML=passo(r._pb,r._pd||0,r._ps!==0)}
function hol(){var cv=document.createElement("canvas"),W=1080,rows=[],d=document.querySelectorAll(".calc dl dt");Array.prototype.forEach.call(d,function(x){var y=x.nextElementSibling;if(!y||x.offsetParent===null||y.offsetParent===null)return;var tv=y.textContent.trim();if(!tv||tv=="–")return;rows.push([x.textContent.trim(),tv])});
var gth=document.querySelector(".g.th"),col=gth?getComputedStyle(gth).getPropertyValue("--c").trim()||"#111":"#111",H=520+rows.length*64+260;cv.width=W;cv.height=H;var c=cv.getContext("2d");
c.fillStyle="#fff";c.fillRect(0,0,W,H);c.fillStyle="#FFD400";c.fillRect(0,0,W,150);c.fillStyle="#111";c.font="900 50px Inter,Arial,sans-serif";c.fillText("Bolso do Trabalhador",60,92);c.font="700 28px Inter,Arial,sans-serif";c.fillText("HOLERITE ESTIMADO",60,132);
c.fillStyle=col;c.fillRect(0,150,W,14);c.fillStyle="#111";c.font="900 44px Inter,Arial,sans-serif";
var tt=document.querySelector("h1").textContent.trim().split(":")[0],wd=tt.split(" "),ln="",y=250;wd.forEach(function(w){var s=ln?ln+" "+w:w;if(c.measureText(s).width>W-120){c.fillText(ln,60,y);y+=56;ln=w}else ln=s});c.fillText(ln,60,y);
c.font="500 26px Inter,Arial,sans-serif";c.fillStyle="#666";c.fillText("Simulação feita em "+new Date().toLocaleDateString("pt-BR")+" com as tabelas de 2026",60,y+48);y+=110;
rows.forEach(function(r,i){c.fillStyle=i%2?"#fff":"#f5f5f5";c.fillRect(40,y-44,W-80,64);c.fillStyle="#333";c.font="500 30px Inter,Arial,sans-serif";var l=r[0];while(c.measureText(l).width>W-500&&l.length>4)l=l.slice(0,-2);if(l!=r[0])l+="…";c.fillText(l,60,y);c.fillStyle="#111";c.font="800 30px Inter,Arial,sans-serif";c.textAlign="right";c.fillText(r[1],W-60,y);c.textAlign="left";y+=64});
var tb=document.querySelector(".total");if(tb){y+=30;c.fillStyle=col;c.beginPath();if(c.roundRect)c.roundRect(40,y,W-80,120,24);else c.rect(40,y,W-80,120);c.fill();c.fillStyle="#fff";c.font="700 32px Inter,Arial,sans-serif";c.fillText(tb.children[0].textContent.trim(),70,y+72);c.font="900 52px Inter,Arial,sans-serif";c.textAlign="right";c.fillText(tb.children[1].textContent.trim(),W-70,y+78);c.textAlign="left";y+=120}
c.fillStyle="#666";c.font="500 24px Inter,Arial,sans-serif";c.fillText("Estimativa. Confira com o seu holerite e a convenção da sua categoria.",60,y+70);c.fillStyle="#111";c.font="900 34px Inter,Arial,sans-serif";c.fillText("Faça a sua conta grátis: bolsodotrabalhador.com.br",60,y+130);
cv.toBlob(function(bl){var fn="holerite-estimado.png",fl=new File([bl],fn,{type:"image/png"});if(navigator.canShare&&navigator.canShare({files:[fl]})){navigator.share({files:[fl],title:"Holerite estimado"}).catch(function(){})}else{var a=document.createElement("a");a.href=URL.createObjectURL(bl);a.download=fn;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},500)}if(window.gtag)gtag("event","holerite_imagem",{calc:k})},"image/png")}
var k=document.body.getAttribute("data-calc");if(!k)return;
function run(){var r=C[k]();Object.keys(r).forEach(function(i){var e=document.getElementById("o-"+i);if(!e)return;
var f=e.getAttribute("data-f");e.textContent=typeof r[i]=="string"?r[i]:f=="p"?r[i]+" parcelas":f=="h"?r[i].toLocaleString("pt-BR",{maximumFractionDigits:1})+" h":f=="d"?r[i].toLocaleString("pt-BR",{maximumFractionDigits:1})+" dias":f=="a"?r[i]+"/12":F.format(r[i]);if(e.hasAttribute("data-hz")){var hd=r[i]===0||r[i]==="";e.style.display=hd?"none":"";e.previousElementSibling.style.display=hd?"none":""}});pzr(r);share()}
Array.prototype.forEach.call(document.querySelectorAll("input,select"),function(e){e.addEventListener("input",run);e.addEventListener("change",run)});run();var pb=document.getElementById("pr");if(pb)pb.addEventListener("click",function(){window.print()});var hb=document.getElementById("hol");if(hb)hb.addEventListener("click",hol);
})();
