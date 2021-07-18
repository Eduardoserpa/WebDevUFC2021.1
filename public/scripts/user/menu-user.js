
$(document).ready(function(){
  var uri = 'http://localhost:3000/user/';

  fetch(uri, {method: 'GET', mode: 'cors', redirect: 'follow'})
  .then(response => response.text())
  .then(result => {
      criarTabela(result);
  })
  .catch(error => console.log('error', error));   
});

function criarTabela(data){
  var container = $('#my-container'),
  table = $('<table>').addClass('table');
  var tr_head = $('<tr>');
  tr_head.append('<th>' + 'Nome' + '</th>');
  tr_head.append('<th>' + 'Função' + '</th>');
  tr_head.append('<th>' + 'Código' + '</th>');
  tr_head.append('<th>' + 'Email' + '</th>');
  tr_head.append('<th>' + 'Ações' + '</th>');
  table.append(tr_head);

  var array = JSON.parse(data);
  array.forEach(function(user) {
      var tr = $('<tr>');
      [ 'nome', 'tipo', '_id', 'email'].forEach(function(attr) {
          tr.append('<td>' + user[attr] + '</td>');
      });
      tr.append(
          '<td>' + 
              '<a rel="lightbox" title="Imagem 6">' +
                  '<img src="../../imagens/icones/user-friends-solid.svg" width="20" height="20" alt="" title="Cadastrar" /></a>' +
              '<a rel="lightbox" title="Imagem 6">' +
                  '<img src="../../imagens/icones/edit-solid.svg" width="20" height="20" alt="" title="Editar" /></a>' +
              '<a rel="lightbox" title="Imagem 6">' +
                  '<img src="../../imagens/icones/list-solid.svg" width="20" height="20" alt="" title="Listar" /></a>' +
              '<a rel="lightbox" title="Imagem 6">' +
                  '<img src="../../imagens/icones/trash-solid.svg" width="20" height="20" alt="" title="Excluir" /></a>' + 
          '</td>'
      );      
      table.append(tr);
  });

          container.append(table);
      }
  