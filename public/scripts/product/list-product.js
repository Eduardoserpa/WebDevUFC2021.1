//Read
$(document).ready(function(){

    var uri = 'http://localhost:3000/product/';
  
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
    tr_head.append('<th>' + 'Produto' + '</th>');
    tr_head.append('<th>' + 'Categoria' + '</th>');
    tr_head.append('<th>' + 'Quantidade em Estoque' + '</th>');
    tr_head.append('<th>' + 'Valor (Unidade)' + '</th>');
    tr_head.append('<th>' + 'Valor (Total)' + '</th>');
    tr_head.append('<th>' + 'ID' + '</th>');
    tr_head.append('<th>' + 'Ações' + '</th>');
    table.append(tr_head);
  
    var array = JSON.parse(data);
    array.forEach(function(user) {
        var tr = $('<tr>');
        var valorTotal = user.estoque * user.valor;
        user.total = valorTotal;
        
        [ 'nome', 'categoria', 'estoque', 'valor','total','_id'].forEach(function(attr) {
            tr.append('<td>' + user[attr] + '</td>');
        });
        tr.append(
            '<td class="td-acoes">' +
                '<a href="editproduct?" rel="lightbox" title="Imagem 6">' +
                    '<img src="../../imagens/icones/edit-solid.svg" width="20" height="20" alt="" title="Editar" /></a>' +
                '<a rel="lightbox" title="Imagem 6">' +
                    '<img src="../../imagens/icones/trash-solid.svg" width="20" height="20" alt="" title="Excluir" /></a>' +
            '</td>'
        );      
        table.append(tr);
    });
  
    container.append(table);
}
/*
function filtrarTabela(data,nomeFiltro,categoriaFiltro){
    var container = $('#my-container'),
    table = $('<table>').addClass('table');
    var tr_head = $('<tr>');
    tr_head.append('<th>' + 'Produto' + '</th>');
    tr_head.append('<th>' + 'Categoria' + '</th>');
    tr_head.append('<th>' + 'Quantidade em Estoque' + '</th>');
    tr_head.append('<th>' + 'Valor (Unidade)' + '</th>');
    tr_head.append('<th>' + 'Valor (Total)' + '</th>');
    tr_head.append('<th>' + 'ID' + '</th>');
    tr_head.append('<th>' + 'Ações' + '</th>');
    table.append(tr_head);
  
    var array = JSON.parse(data);
    array.forEach(function(user) {
        if(nomeFiltro==nome || categoria==filtro){
            var tr = $('<tr>');
            var valorTotal = user.estoque * user.valor;
            user.total = valorTotal;
            
            [ 'nome', 'categoria', 'estoque', 'valor','total','_id'].forEach(function(attr) {
                tr.append('<td>' + user[attr] + '</td>');
            });
            tr.append(
                '<td class="td-acoes">' + 
                    '<a href="editproduct" rel="lightbox" title="Imagem 6">' +
                        '<img src="../../imagens/icones/edit-solid.svg" width="20" height="20" alt="" title="Editar" /></a>' +
                    '<a rel="lightbox" title="Imagem 6">' +
                        '<img src="../../imagens/icones/trash-solid.svg" width="20" height="20" alt="" title="Excluir" /></a>' + 
                '</td>'
            );
        }
        table.append(tr);
    });
    container.append(table);
}*/