array = [];

$( "#add-produto").click(function() {
    var produto = $('#produto').val();
    var quantidade = $('#quantidade').val();
    var data = { produto: produto, quantidade: quantidade };
    if(validaForm(data)){
        array.push(data);
        addTabela(data);
    }
});


function validaForm(data){
    if(!data.produto || !data.quantidade){
        return false;
    }
    else{
        return true;
    }
}

function addTabela(data){
    var table = $('table');
    var tr = $('<tr>');
    tr.append('<td>' + data.produto + '</td>');
    tr.append('<td>' + data.quantidade + '</td>');
    table.append(tr);  
}
    
/*function postProduct() {
    var uri = `http://localhost:3000/sale/`;
    var produto = $('#produto').val();
    var vendedor = $('#vendedor').val();
    var quantidade = $('#quantidade').val();

    var data = JSON.stringify({
        "produto": produto,
        "vendedor": vendedor,
        "quantidade": quantidade
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
}*/