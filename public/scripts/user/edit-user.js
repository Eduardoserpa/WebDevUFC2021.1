$(document).ready(function(){

    var idUrl = getUrlParameter('id');
    if(idUrl){
      var uri = `http://localhost:3000/user/${idUrl}`;  
      fetch(uri, {method: 'GET', mode: 'cors', redirect: 'follow'})
      .then(response => response.text())
      .then(result => {
        var resp = JSON.parse(result); 
        $('#nome').val(resp.nome);
        $('#perfil').val(resp.tipo);
        
        $('#email').val(resp.email);
      })
      .catch(error => console.log('error', error));
    }
  });
  
  function putUser() {
    var uri = `http://localhost:3000/user/`;
    var nome = $('#nome').val();
    var tipo = $('#perfil').val();
    var email = $('#email').val();
    var senha1 = $('#senha1').val();
    var senha2 = $('#senha2').val();

    if(senha1 === '' && senha2 ===''){
      var data = JSON.stringify({
        "nome": nome,
        "tipo": tipo,
        "email": email
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

    }else{
      let textoSenha1 = document.getElementById('verSenha1');
      let textoSenha2 = document.getElementById('verSenha2');
      if(senha1.length < 6){
        
        textoSenha1.innerText = `A senha deve possuir no mínimo 6 caracteres.`;
        
      }else{
        textoSenha1.innerText = ``
        if(senha1 !== senha2){
          textoSenha2.innerText = `As senhas devem ser as mesmas!`;
        }
        else{
          textoSenha2.innerText = ``;
          var data = JSON.stringify({
            "nome": nome,
            "tipo": tipo,
            "email": email,
            "senha" : senha1
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

      }
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