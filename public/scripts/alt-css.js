const botaoCss = document.getElementById("altcss");
const cookieValue = JSON.parse(localStorage.getItem('modeCss'));
const botaoSair = document.getElementById("bnt-sair");

if(cookieValue === null || cookieValue === 'ligth'){
  changeCSS('styles/style.css', 0);
  botaoCss.value = "DARK MODE" 
  localStorage.setItem('modeCss', JSON.stringify('ligth'));
}
else{
  changeCSS('styles/style-ligth.css', 0);
  botaoCss.value = "LIGTH MODE";
  localStorage.setItem('modeCss', JSON.stringify('dark'));
}


botaoCss.addEventListener("click", function(){
  
const cookieValue1 = JSON.parse(localStorage.getItem('modeCss'));
  if(cookieValue1 === 'ligth'){
    changeCSS('styles/style-ligth.css', 0);
    botaoCss.value = "LIGTH MODE"
    localStorage.setItem('modeCss', JSON.stringify('dark'));
    
  }
  else{
    changeCSS('styles/style.css', 0);
    botaoCss.value = "DARK MODE" 
    localStorage.setItem('modeCss', JSON.stringify('ligth'));
  }
})

function changeCSS(cssFile, cssLinkIndex) {

  var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

  var newlink = document.createElement("link");
  newlink.setAttribute("rel", "stylesheet");
  newlink.setAttribute("type", "text/css");
  newlink.setAttribute("href", cssFile);
  document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}

function logout(){
  document.cookie = 'user= ;'
  window.location.replace('/login')
}