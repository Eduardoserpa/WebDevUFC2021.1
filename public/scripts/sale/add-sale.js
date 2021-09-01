array = [];

$( "#add-produto").click(function() {
  console.log('teste');
    var produto = $('#produto').val();
    var quantidade = $('#quantidade').val();
    var data = { 
        product: produto.split(" ")[0], 
        quantidade: parseInt(quantidade) 
    };
    if(validaForm(data)){

        var exist = false;
        array.forEach(element => {
            if(element.product == data.product){
                element.quantidade += data.quantidade;
                exist = true;
            }
        });
        if(!exist){ array.push(data); }
        console.log(array);
        addTabela(array);
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

$( "#cancelar" ).click(function() {
    $("#table-sale tbody").remove(); 
    $('#produto').val('');
    $('#quantidade').val('');
    array = [];
})

function addTabela(array){
    $("#table-sale tbody").remove(); 
    var table = $('table');
    var tbody = $('<tbody>');

    array.forEach(data => {
        var tr = $('<tr>');
        tr.append('<td>' + data.product + '</td>');
        tr.append('<td>' + data.quantidade + '</td>');
        tbody.append(tr);
    });
    table.append(tbody);  
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