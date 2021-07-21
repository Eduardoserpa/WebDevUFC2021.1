
$(document).ready(function(){
    var uri = 'http://localhost:3000/sale/';
  
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
    tr_head.append('<th>' + 'Data' + '</th>');
    tr_head.append('<th>' + 'Cód Venda' + '</th>');
    tr_head.append('<th>' + 'Vendedor' + '</th>');
    tr_head.append('<th>' + 'Valor da Venda' + '</th>');
    tr_head.append('<th>' + 'Ações' + '</th>');
    table.append(tr_head);
  
    var array = JSON.parse(data);
    array.forEach(function(user) {
        var tr = $('<tr>');
        var valorVenda = 0;
        // user.products.forEach((product) => {
        //     valorVenda += product
        // });

        [ 'date', '_id', 'user', 'valor'].forEach(function(attr) {
            var date = new Date(user['date']);
            var _date = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
            var value = attr === 'date' ? _date : user[attr];
            
            if(attr === 'valor') value = valorVenda;

            tr.append('<td>' + value + '</td>');
        });
        tr.append(
            '<td class="td-acoes">' + 
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
    