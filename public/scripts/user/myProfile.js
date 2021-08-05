
$(document).ready(function(){
  var session = sessionStorage.getItem('id');
  var uri = 'http://localhost:3000/user/' + session;

  fetch(uri, {method: 'GET', mode: 'cors', redirect: 'follow'})
  .then(response => response.text())
  .then(result => {
    var user = JSON.parse(result);
    var label_nome = $('#label-nome');
    label_nome.append(user.nome);
    var label_perfil = $('#label-perfil');
    label_perfil.append(user.tipo);
    var label_email = $('#label-email');
    label_email.append(user.email);
    var label_codigo = $('#label-codigo');
    label_codigo.append(user._id);
  })
  .catch(error => console.log('error', error));   
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