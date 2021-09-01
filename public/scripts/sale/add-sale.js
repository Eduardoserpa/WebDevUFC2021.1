$(document).ready(function(){
    var idUrl = getUrlParameter('id');
    if(idUrl){
      $('#saleTitle').text('Editar Venda');
      var uri = `http://localhost:3000/sale/${idUrl}`; 
      fetch(uri, {method: 'GET', mode: 'cors', redirect: 'follow'})
      .then(response => response.text())
      .then(result => {
        var resp = JSON.parse(result); 
        console.log(resp);
        $('#user').val(resp.user);
        $('#date').val(resp.date);
        $('#products').val(resp.products);
      })
      .catch(error => console.log('error', error));
    }
  });
  
  function postSale() {
    var uri = `http://localhost:3000/sale/`;
    var user = $('#user').val();
    var date = $('#date').val();
    var products = $('#products').val();
    var data = JSON.stringify({
      "user": user,
      "date": date,
      "products": products
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