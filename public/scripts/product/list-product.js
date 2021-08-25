let NumeroLinhasPorPagina = 6;
let IndexPagina = 1;

$(document).ready(() => getProducts(`http://localhost:3000/product/${NumeroLinhasPorPagina}/${IndexPagina}`));
$("#PreviousPage").click(function() {
    IndexPagina --;
    var uri = `http://localhost:3000/product/${NumeroLinhasPorPagina}/${IndexPagina}`;
    getProducts(uri);
});
$("#NextPage").click(function() {
    IndexPagina ++;
    var uri = `http://localhost:3000/product/${NumeroLinhasPorPagina}/${IndexPagina}`;
    getProducts(uri);
});

$("#consultar-btn").click(function() {
    var produto = $('#produto').val();
    var categoria = $('#categoria').val();
    var uri = `http://localhost:3000/product/`;

    if(produto) uri += `?produto=${produto.split(" ")[2]}`;
    if(categoria) uri += `?categoria=${categoria}`;

    getProducts(uri);
});

function getProducts(uri){
    fetch(uri, {method: 'GET', mode: 'cors', redirect: 'follow'})
    .then(response => response.text())
    .then(result => {
        $("#list-product").remove();
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
function editarProduto(){
    var id =  event.target.parentNode.parentNode.childNodes[0].innerText;
    sessionStorage.setItem('id-editar',id);
    window.location.replace('/addProduct?id=' + id);
}

function excluirProduto(){
    var id =  event.target.parentNode.parentNode.childNodes[0].innerText;
    sessionStorage.setItem('id-delete',id);
    $('#myModal').modal('show');
}

function deleteProduct() {
    var id = sessionStorage.getItem('id-delete');
    console.log('session ' + id);
    var uri = `http://localhost:3000/product/` + id;

    var req = new XMLHttpRequest();
    req.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            new Promise(() =>{
                $('#modal-comp').modal('show');
            });
        }
    });
    req.open("DELETE", uri);
    req.setRequestHeader('Access-Control-Allow-Origin', '*');
    req.setRequestHeader('Accept', '*/*');    
    req.send();
}

$('#modal-comp').on('hidden.bs.modal', function () {
    window.location.reload();
});

function criarTabela(data){
    var container = $('#my-container'),
    table = $('<table>').addClass('table').attr('id', 'list-product');;
    var tr_head = $('<tr>');
    tr_head.append('<th>' + 'Código' + '</th>');
    tr_head.append('<th>' + 'Produto' + '</th>');
    tr_head.append('<th>' + 'Categoria' + '</th>');
    tr_head.append('<th>' + 'Quantidade em Estoque' + '</th>');
    tr_head.append('<th>' + 'Valor (Unidade)' + '</th>');
    tr_head.append('<th>' + 'Valor (Total)' + '</th>');
    tr_head.append('<th>' + 'Ações' + '</th>');
    table.append(tr_head);
  
    var array = JSON.parse(data);
    array.products.forEach(function(user) {
        var tr = $('<tr>');
        var valorTotal = user.estoque * user.valor;
        user.total = valorTotal;        
        [ '_id', 'nome', 'categoria', 'estoque', 'valor','total'].forEach(function(attr) {
            tr.append('<td>' + user[attr] + '</td>');
        });
        tr.append(
            '<td>' +         
                '<button type="submit" class="btn btn-primary btn-lg btn-table" onClick="excluirProduto()">Excluir</button>' +
                '<button type="submit" class="btn btn-warning btn-lg btn-table" onClick="editarProduto()">Editar</button>' +
            '</td>'
        );
        table.append(tr);
    });  
    container.append(table);
}