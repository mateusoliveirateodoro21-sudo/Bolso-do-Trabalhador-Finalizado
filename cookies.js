(function(){
var K="bt_cookies_ok";
try{if(localStorage.getItem(K))return}catch(e){}
function go(){
var st=document.createElement("style");
st.textContent=".ckb{position:fixed;left:12px;right:12px;bottom:12px;z-index:60;max-width:720px;margin:0 auto;background:#fff;color:#111;border:1.5px solid #111;border-radius:14px;padding:14px 16px;box-shadow:5px 5px 0 #ffd400;font:15px/1.5 system-ui,-apple-system,Segoe UI,sans-serif;display:flex;gap:12px;align-items:center;flex-wrap:wrap}.ckb p{margin:0;flex:1 1 260px}.ckb a{color:inherit;font-weight:700}.ckb button{font:inherit;font-weight:800;padding:9px 18px;border-radius:10px;border:1.5px solid #111;background:#ffd400;color:#111;cursor:pointer}.ckb button:focus-visible,.ckb a:focus-visible{outline:3px solid #111;outline-offset:2px}@media(prefers-color-scheme:dark){.ckb{background:#1c1c1c;color:#fff;border-color:#fff}}@media print{.ckb{display:none}}";
document.head.appendChild(st);
var d=document.createElement("div");d.className="ckb";d.setAttribute("role","region");d.setAttribute("aria-label","Aviso de cookies");
d.innerHTML='<p>Usamos cookies e tecnologias semelhantes para medir o acesso ao site e, quando houver, exibir anúncios. Ao continuar navegando, você concorda com isso. Saiba mais na <a href="privacidade.html">política de privacidade</a>.</p><button type="button">Entendi</button>';
d.querySelector("button").addEventListener("click",function(){try{localStorage.setItem(K,"1")}catch(e){}d.remove()});
document.body.appendChild(d)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go()})();
