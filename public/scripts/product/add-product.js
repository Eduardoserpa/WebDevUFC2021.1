$(document).ready(function(){
  var idUrl = getUrlParameter('id');
  if(idUrl){
    $('#produtoTitle').text('Editar Produto');
    var uri = `http://localhost:3000/product/${idUrl}`;  
    fetch(uri, {method: 'GET', mode: 'cors', redirect: 'follow'})
    .then(response => response.text())
    .then(result => {
      var resp = JSON.parse(result); 
      $('#nome').val(resp.nome);
      $('#categoria').val(resp.categoria);
      $('#valor').val(resp.valor);
      $('#quantidade').val(resp.estoque);
    })
    .catch(error => console.log('error', error));
  }
});

// $('#btn-gravar').click(function() {
//   var file = $('#file')[0].files[0];
//   const data = new FormData();
//   data.append('image', file);

//   console.log($('#file')[0]);
//   var req = new XMLHttpRequest();
//   req.addEventListener("readystatechange", function() {
//   if(this.readyState === 4) {
//       new Promise(() =>{
//         //$('#modal-comp').modal('show');
//         console.log('POST SUCCESS');
//       });
//     }
//   });

//   req.open('POST','http://localhost:3000/product/image',false);
//   req.setRequestHeader('Access-Control-Allow-Origin', '*');
//   req.setRequestHeader('Accept', '*/*');    
//   req.send(data);
// });

function postProduct() {
  var uri = `http://localhost:3000/product/`;
  var nome = $('#nome').val();
  var categoria = $('#categoria').val();
  var valor = $('#valor').val();
  var quantidade = $('#quantidade').val();
  var file = $('#file')[0].files[0];
  var formdata = new FormData();
  formdata.append("nome", nome);
  formdata.append("categoria", categoria);
  formdata.append("valor", parseInt(valor));
  formdata.append("estoque", parseInt(quantidade));
  formdata.append("productImage", file, file.name);


  var req = new XMLHttpRequest();
  req.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
      new Promise(() =>{
        if(req.status === 200 || req.status === 201){
          $('#modal-comp').modal('show');
        }
      });
    }
  });
  var idUrl = getUrlParameter('id');
  if(idUrl){
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