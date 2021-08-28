let NumeroLinhasPorPagina = 6;
let IndexPagina = 1;

$(document).ready(() => getSales());
$("#PreviousPage").click(function() {
    IndexPagina --;
    getSales();
});
$("#NextPage").click(function() {
    IndexPagina ++;
    getSales();
});

function getSales(){
    var uri = `http://localhost:3000/sale/${NumeroLinhasPorPagina}/${IndexPagina}`;  
    fetch(uri, {method: 'GET', mode: 'cors', redirect: 'follow'})
    .then(response => response.text())
    .then(result => {
        $("#list-sale").remove();
        criarTabela(result);
        var array = JSON.parse(result);
        var metadata = array.metadata;
        $(".pagesbtn ul").remove();
        criarPagination(metadata.pageIndex, metadata.pageCount, metadata.hasPreviousPage, metadata.hasNextPage);
    })
    .catch(error => console.log('error', error));
}

function criarPagination(pageIndex, pageCount, hasPreviousPage, hasNextPage){
    $("#PreviousPage").prop('disabled', !hasPreviousPage);
    $("#NextPage").prop('disabled', !hasNextPage);    
    var pagination = $('.pagesbtn');
    linha = $('<ul>').addClass('pagination');
    var count = 1;
    while(count <= pageCount){
        var classe = '';
        if(count == pageIndex){
            classe = 'active';
        }
        var li = $('<li>');
        li.append(`<a href="#" id="Page${count}">${count}</a>`)
        .addClass(classe);
        linha.append(li);
        count ++;
    }
    pagination.append(linha);
}

function criarTabela(data){
    var container = $('#my-container'),
    table = $('<table>').addClass('table').attr('id', 'list-sale');

    var thead = $('<thead>');
    var tr_head = $('<tr>');
    tr_head.append('<th>' + 'Data' + '</th>');
    tr_head.append('<th>' + 'Cód Venda' + '</th>');
    tr_head.append('<th>' + 'Vendedor' + '</th>');
    tr_head.append('<th>' + 'Valor da Venda' + '</th>');
    tr_head.append('<th>' + 'Ações' + '</th>');
    thead.append(tr_head);
    table.append(thead);
  
    var tbody = $('<tbody>');
    var array = JSON.parse(data);
    array.sales.forEach(function(user) {
        var tr = $('<tr>');
        var valorVenda = 0;
        user.products.forEach((produto) => {
            console.log(produto)
            if(produto.product){
                valorVenda += produto.product.valor * produto.quantidade;
            }
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
        tbody.append(tr);
    });
    table.append(tbody);
    container.append(table);
}

function dataAtualFormatada(data){
    var dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(),
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
}