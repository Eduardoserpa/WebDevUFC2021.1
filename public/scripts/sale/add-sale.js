array = [];

$( "#add-produto").click(function() {
    var produto = $('#produto').val();
    var quantidade = $('#quantidade').val();
    var data = { product: produto.split(" ")[0], quantidade: quantidade };
    if(validaForm(data)){
        array.push(data);
        addTabela(data);
    }
});


function validaForm(data){
    if(!data.product || !data.quantidade){
        return false;
    }
    else{
        return true;
    }
}

function addTabela(data){
    var table = $('table');
    var tr = $('<tr>');
    tr.append('<td>' + data.product + '</td>');
    tr.append('<td>' + data.quantidade + '</td>');
    table.append(tr);  
}
function postSale() {
    var uri = `http://localhost:3000/sale/`;
    if(array.length !== 0){
        var usuario = sessionStorage.getItem('id');
        var data = JSON.stringify({
          "user": usuario,
          "date": (new Date()).toJSON(),
          "products": array
        });
    
        var req = new XMLHttpRequest();
        req.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            new Promise(() =>{
              $('#modal-comp').modal('show');
            });
          }
        });
    
        req.open('POST',uri,false);
        req.setRequestHeader("Content-Type", "application/json"); 
        req.setRequestHeader('Access-Control-Allow-Origin', '*');
        req.setRequestHeader('Accept', '*/*');    
        req.send(data);
    }    
  }    