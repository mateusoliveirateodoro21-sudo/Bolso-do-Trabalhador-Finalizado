(function(){
var F=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"});
function v(i){return parseFloat(document.getElementById(i).value)||0}
function inss(b){var t=[[1621,.075],[2902.84,.09],[4354.27,.12],[8475.55,.14]],p=0,r=0;t.forEach(function(x){var u=Math.min(b,x[0]);if(u>p)r+=(u-p)*x[1];p=x[0]});return r}
function irrf(rend,base){var a=0,d=0;if(base>4664.68){a=.275;d=908.73}else if(base>3751.05){a=.225;d=675.49}else if(base>2826.65){a=.15;d=394.16}else if(base>2428.8){a=.075;d=182.16}
var t=Math.max(0,base*a-d),r=0;if(rend<=5000)r=Math.min(312.89,t);else if(rend<=7350)r=Math.min(t,Math.max(0,978.62-.133145*rend));return Math.max(0,t-r)}
function liq(b,dep){var i=inss(b),base=Math.max(0,b-Math.max(i+dep*189.59,607.2));return{i:i,ir:irrf(b,base)}}
function pd(i){var p=document.getElementById(i).value.split("-");return new Date(+p[0],p[1]-1,+p[2])}
var C={
noturno:function(){var h=v("sal")/v("div"),n=h*v("pct")/100*v("hn"),e=h*1.5*v("he");return{hora:h,not:n,he:e,tot:n+e}},
escala:function(){var h=v("sal")/v("div"),n=h*v("pct")/100*v("hn")*v("pl"),e=h*1.5*v("he");return{hm:v("pl")*12,hora:h,not:n,he:e,tot:n+e}},
hora:function(){var h=v("sal")/v("div");return{h50:h*1.5,h100:h*2,hora:h}},
ferias:function(){var b=v("sal")+v("med"),f=b/30*v("dias"),t=f/3,a=v("dias")==20?b/30*10*4/3:0,g=f+t,l=liq(g,v("dep"));return{fer:f,terco:t,abono:a,inss:l.i,ir:l.ir,tot:g+a-l.i-l.ir}},
decimo:function(){var b=(v("sal")+v("med"))*Math.min(12,v("m"))/12,i=inss(b),ir=irrf(b,Math.max(0,b-i-v("dep")*189.59)),p=b/2;return{bruto:b,p1:p,inss:i,ir:ir,p2:b-p-i-ir,tot:b-i-ir}},
liquido:function(){var s=v("sal"),g=s+v("ext"),l=liq(g,v("dep")),t=v("vt")==1?s*.06:0,o=v("out");return{bruto:g,inss:l.i,ir:l.ir,vt:t,out:o,tot:g-l.i-l.ir-t-o}},
seguro:function(){var m=(v("s1")+v("s2")+v("s3"))/3,p;if(m<=2222.17)p=m*.8;else if(m<=3703.99)p=1777.74+(m-2222.17)*.5;else p=2518.65;p=Math.min(2518.65,Math.max(1621,p));
var sl=v("sol"),mt=Math.floor(v("mt")),n=0;if(sl==1)n=mt>=24?5:mt>=12?4:0;else if(sl==2)n=mt>=24?5:mt>=12?4:mt>=9?3:0;else n=mt>=24?5:mt>=12?4:mt>=6?3:0;
return{ok:n>0?"Sim, pelos meses trabalhados":"Não, faltam meses de trabalho",media:m,parc:p,n:n,tot:p*n}},
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
servidor:function(){var h=v("base")/v("div"),k=v("red")==1?60/52.5:1,pe=v("pe")/100,pn=v("pn")/100,a=h*(1+pe)*v("hed"),b=h*pn*v("hn")*k,c=h*(1+pe)*(1+pn)*v("hen")*k;return{hora:h,hed:a,adn:b,hen:c,tot:a+b+c}}
};
function share(){var w=document.getElementById("wa");if(!w)return;var L=[document.querySelector("h1").textContent],d=document.querySelectorAll("dl dt"),e=document.querySelectorAll("dl dd");
for(var i=0;i<d.length;i++)L.push(d[i].textContent+": "+e[i].textContent);
var t=document.querySelector(".total");L.push(t.children[0].textContent+": "+t.children[1].textContent);L.push("");L.push("Calcule o seu: "+location.href.split("#")[0]);
w.href="https://wa.me/?text="+L.map(encodeURIComponent).join("%0A")}
var k=document.body.getAttribute("data-calc");if(!k)return;
function run(){var r=C[k]();Object.keys(r).forEach(function(i){var e=document.getElementById("o-"+i);
var f=e.getAttribute("data-f");e.textContent=typeof r[i]=="string"?r[i]:f=="p"?r[i]+" parcelas":f=="h"?r[i].toLocaleString("pt-BR",{maximumFractionDigits:1})+" h":f=="d"?r[i].toLocaleString("pt-BR",{maximumFractionDigits:1})+" dias":f=="a"?r[i]+"/12":F.format(r[i])});share()}
Array.prototype.forEach.call(document.querySelectorAll("input,select"),function(e){e.addEventListener("input",run)});run();var pb=document.getElementById("pr");if(pb)pb.addEventListener("click",function(){window.print()});
})();
