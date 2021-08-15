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
    