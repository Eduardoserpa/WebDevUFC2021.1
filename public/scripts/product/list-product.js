$(document).ready(function(){
    var uri = 'http://localhost:3000/product/';  
    fetch(uri, {method: 'GET', mode: 'cors', redirect: 'follow'})
    .then(response => response.text())
    .then(result => {
        criarTabela(result);
    })
    .catch(error => console.log('error', error));
});

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

function criarTabela(data){
    var container = $('#my-container'),
    table = $('<table>').addClass('table');
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
    array.forEach(function(user) {
        var tr = $('<tr>');
        var valorTotal = user.estoque * user.valor;
        user.total = valorTotal;        
        [ '_id', 'nome', 'categoria', 'estoque', 'valor','total'].forEach(function(attr) {
            tr.append('<td>' + user[attr] + '</td>');
        });
        tr.append(
            '<td>' +         
                '<button type="submit" class="btn btn-primary" onClick="excluirProduto()">Excluir</button>' +
                '<button type="submit" class="btn btn-warning" onClick="editarProduto()">Editar</button>' +
            '</td>'
        );  
        // tr.append(
        //     '<td>' +         
        //         '<button type="submit" class="btn btn-warning" onClick="excluirProduto()">Editar</button>' +
        //     '</td>'
        // );
        table.append(tr);
    });  
    container.append(table);
}