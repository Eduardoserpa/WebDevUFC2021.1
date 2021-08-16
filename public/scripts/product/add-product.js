//Create
/*
$(document).ready(function(){

    var uri = 'http://localhost:3000/product/';
    //Check if it's already in the DB
    fetch(uri, {method: 'GET', mode: 'cors', redirect: 'follow'})
    .then(response => response.text())
    .then(result => {
        postProduct(result);
    })
    .catch(error => console.log('error', error));
});*/

function postProduct() {
    var uri = `http://localhost:3000/product/`;
    var nome = $('#nome').val();
    var categoria = $('#categoria').val();
    var valor = $('#valor').val();
    var quantidade = $('#quantidade').val();

    var data = JSON.stringify({
        "nome": nome,
        "categoria": categoria,
        "valor": parseFloat(valor),
        "estoque": parseInt(quantidade)
    });
    var req = new XMLHttpRequest();
    req.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        console.log(this.responseText);
        new Promise(() =>{
            console.log('promise');
            var modal = $('#modal-comp');
            modal.modal('show');
        });    }
    });
    req.open('POST',uri,false);
    req.setRequestHeader("Content-Type", "application/json"); 
    req.setRequestHeader('Access-Control-Allow-Origin', '*');
    req.setRequestHeader('Accept', '*/*');    
    req.send(data);
}