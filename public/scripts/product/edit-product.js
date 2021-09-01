//Update or Delete
/*
$(document).ready(function(){

    var uri = 'http://localhost:3000/product/';
    //Find the entry to change or remove
    fetch(uri, {method: 'GET', mode: 'cors', redirect: 'follow'})
    .then(response => response.text())
    .then(result => {
        putProduct(result);
    })
    .catch(error => console.log('error', error));
});*/

function putProduct() {
    var uri = `http://localhost:3000/product/`;

    var nome = $('#nome').val();
    var categoria = $('#categoria').val();
    var id = $('#_id').val();
    var valor = $('#valor').val();
    var quantidade = $('#quantidade').val();
    uri.append(id);
    window.alert(uri);

    var data = JSON.stringify({
        "nome": nome,
        "categoria": categoria,
        "valor": parseFloat(valor),
        "estoque": parseInt(quantidade)
    });
    var req = new XMLHttpRequest();
    req.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            new Promise(() =>{
                var modal = $('#modal-comp');
                modal.modal('show');
            });    
        }
    });
    req.open("PUT",uri,false);
    req.setRequestHeader("Content-Type", "application/json"); 
    req.setRequestHeader('Access-Control-Allow-Origin', '*');
    req.setRequestHeader('Accept', '*/*');    
    req.send(data);
}

function deleteProduct() {
    var uri = `http://localhost:3000/product/`;
    var id = $('#_id').val();
    uri.append(id);
    window.alert(uri);

    var req = new XMLHttpRequest();
    req.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        new Promise(() =>{
            var modal = $('#modal-comp');
            modal.modal('show');
        });    }
    });
    req.open("DELETE",uri,false);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader('Access-Control-Allow-Origin', '*');
    req.setRequestHeader('Accept', '*/*');
}