var uri = 'http://localhost:3000/product/';

$(document).ready(function(){
  var idUrl = getUrlParameter('id');
  if(idUrl) {
    $('#produtoTitle').text('Editar Produto');
    fetch((uri + idUrl), {method: 'GET', mode: 'cors', redirect: 'follow'})
    .then(response => response.text())
    .then(result => {
      var resp = JSON.parse(result); 
      $('#nome').val(resp.nome);
      $('#categoria').val(resp.categoria);
      $('#valor').val(resp.valor);
      $('#quantidade').val(resp.estoque);
      if(resp.productImage){
        document.getElementById("preview").src = (`http://localhost:3000/${resp.productImage}`).replace('\\','/');
      }
    })
    .catch(error => console.log('error', error));
  }
});

$("#btn-gravar").click(function() {
  var nome = $('#nome').val();
  var categoria = $('#categoria').val();
  var valor = $('#valor').val();
  var quantidade = $('#quantidade').val();
  var file = $('#file')[0].files[0];
  if(nome && categoria && valor && quantidade) {
    postProduct(nome, categoria, valor, quantidade, file);
  }else{
    var msg = 'Preencha todos os campos do formulário';
    $('label[id*="modal-alert"]').text('');
    $('#modal-alert').append(`<label id="loginHelp" class="form-text text-muted">${msg}</label>`);
    $('#modal-comp').modal('show');
  }
});

function postProduct(nome, categoria, valor, quantidade, file) {
  var formdata = new FormData();
  formdata.append("nome", nome);
  formdata.append("categoria", categoria);
  formdata.append("valor", parseInt(valor));
  formdata.append("estoque", parseInt(quantidade));
  if(file){
    formdata.append("productImage", file, file.name);
  }

  var req = new XMLHttpRequest();
  req.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
      new Promise(() =>{
        if(req.status === 200 || req.status === 201){
          var msg = 'Produto cadastrado com sucesso';
          $('label[id*="modal-alert"]').text('');
          $('#modal-alert').append(`<label id="loginHelp" class="form-text text-muted">${msg}</label>`);
          $('#modal-comp').modal('show');
        }
      });
    }
  });
  var idUrl = getUrlParameter('id');
  if(idUrl){
    var data = JSON.stringify({
      "nome": nome,
      "categoria": categoria,
      "valor": parseInt(valor),
      "estoque": parseInt(quantidade)
    });
    req.open('PUT',uri + idUrl,true);
    req.setRequestHeader("Content-Type", "application/json"); 
    req.setRequestHeader('Access-Control-Allow-Origin', '*');
    req.setRequestHeader('Accept', '*/*');    
    req.send(data);
  }else{
    req.open('POST',uri,true);
    req.setRequestHeader('Access-Control-Allow-Origin', '*');
    req.setRequestHeader('Accept', '*/*');    
    req.send(formdata);
  }
};

$('#modal-comp').on('hidden.bs.modal',function() {  
  window.location.reload();
});

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;
  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
};

function readImage() {
  if (this.files && this.files[0]) {
      var file = new FileReader();
      file.onload = function(e) {
          document.getElementById("preview").src = e.target.result;
      };       
      file.readAsDataURL(this.files[0]);
  }
}
$("#file").change(function (){
  if (this.files && this.files[0]) {
    var file = new FileReader();
    file.onload = function(e) {
        document.getElementById("preview").src = e.target.result;
    };       
    file.readAsDataURL(this.files[0]);
}
});