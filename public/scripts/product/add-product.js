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

function postProduct() {
  var uri = `http://localhost:3000/product/`;
  var nome = $('#nome').val();
  var categoria = $('#categoria').val();
  var valor = $('#valor').val();
  var quantidade = $('#quantidade').val();
  var data = JSON.stringify({
    "nome": nome,
    "categoria": categoria,
    "valor": parseInt(valor),
    "estoque": parseInt(quantidade)
  });
  var req = new XMLHttpRequest();
  req.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
      new Promise(() =>{
        $('#modal-comp').modal('show');
      });
    }
  });
  var idUrl = getUrlParameter('id');
  if(idUrl){
    req.open('PUT',uri + idUrl,false);
    req.setRequestHeader("Content-Type", "application/json"); 
    req.setRequestHeader('Access-Control-Allow-Origin', '*');
    req.setRequestHeader('Accept', '*/*');    
    req.send(data);
  }else{
    req.open('POST',uri,false);
    req.setRequestHeader("Content-Type", "application/json"); 
    req.setRequestHeader('Access-Control-Allow-Origin', '*');
    req.setRequestHeader('Accept', '*/*');    
    req.send(data);
  }
}

$('#modal-comp').on('hidden.bs.modal', function () {

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

// $( "#btn-gravar" ).mouseover(function() {
//     console.log('teste');
//     var modal = $('#modal-comp');
//     modal.modal('show');
//   });

//   const fetchDataBtn = document.querySelector("#btn-gravar");
//   const getData = function () {
//     console.log('teste');
//     var modal = $('#modal-comp');
//     modal.modal('show');
//   };

//   fetchDataBtn.addEventListener("hover", getData);


// function postProduct() {

//     var uri = `http://localhost:3000/product/`;
//     var nome = $('#nome').val();
//     var categoria = $('#categoria').val();
//     var valor = $('#valor').val();
//     var quantidade = $('#quantidade').val();

//     var data = JSON.stringify({
//         "nome": nome,
//         "categoria": categoria,
//         "valor": parseInt(valor),
//         "estoque": parseInt(quantidade)
//     });
//     var req = new XMLHttpRequest();
//     req.addEventListener("readystatechange", function() {
//     if(this.readyState === 4) {
//         console.log(this.responseText);

//         new Promise(() =>{
//             console.log('promise');
//             var modal = $('#modal-comp');
//             modal.modal('show');
//         });
//     }
//     });
//     req.open('POST',uri,false);
//     req.setRequestHeader("Content-Type", "application/json"); 
//     req.setRequestHeader('Access-Control-Allow-Origin', '*');
//     req.setRequestHeader('Accept', '*/*');    
//     req.send(data);
// }