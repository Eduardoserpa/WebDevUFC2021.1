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
        user.products.forEach((produto) => {
            valorVenda += produto.product.valor * produto.quantidade;
        });

        [ 'date', '_id', 'user', 'valor'].forEach(function(attr) {
            var date = new Date(user['date']);
            var value = attr === 'date' ? dataAtualFormatada(date) : user[attr];
            
            if(attr === 'valor') value = valorVenda.toFixed(2);
            if(attr === 'user') value = user[attr].nome;

            tr.append('<td>' + value + '</td>');
        });
        tr.append(
            '<td>' +      
            '<button type="submit" class="btn btn-light btn-lg btn-table">' +
            '<a rel="lightbox" title="Imagem 6"><img src="../../imagens/icones/list-solid.svg" width="15" height="15" alt="" title="Detalhes"/></a>'+ 
            '</button>' +   
                '<button type="submit" class="btn btn-primary btn-lg btn-table" onClick="excluirProduto()">Excluir</button>' +
                '<button type="submit" class="btn btn-warning btn-lg btn-table" onClick="editarProduto()">Editar</button>' +
            '</td>'
        );     
        table.append(tr);
    });
    container.append(table);
}

function dataAtualFormatada(data){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
}